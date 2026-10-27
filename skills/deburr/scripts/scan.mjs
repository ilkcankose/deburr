#!/usr/bin/env node
// Scans UI source for patterns the deburr rules flag.
// Usage: node scan.mjs [paths...]   (defaults to the current directory)
// Exits 1 when anything is found, 0 when clean.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname, relative } from "node:path";

const EXTENSIONS = new Set([
  ".css", ".scss", ".sass", ".less",
  ".html", ".htm",
  ".js", ".jsx", ".ts", ".tsx", ".mjs",
  ".vue", ".svelte", ".astro", ".mdx",
]);
const SKIP_DIRS = new Set([
  "node_modules", ".git", "dist", "build", "out", ".next", ".nuxt",
  ".svelte-kit", ".astro", ".vercel", "coverage", "vendor",
]);

const DEFAULT_ACCENT_HEX = [
  "#3b82f6", "#2563eb", "#1d4ed8", "#60a5fa", // Tailwind blue
  "#6366f1", "#4f46e5", "#4338ca", "#818cf8", // Tailwind indigo
  "#8b5cf6", "#7c3aed", "#6d28d9", "#a78bfa", // Tailwind violet
  "#a855f7", "#9333ea", "#7e22ce", "#c084fc", // Tailwind purple
];

// Each rule tests one line. `context` gives the surrounding lines when a rule needs them.
const RULES = [
  {
    id: "transition-all",
    test: (line) => /transition(-property)?\s*:\s*all\b|\btransition-all\b/.test(line),
    message: "transition on `all`; list the properties you animate (usually transform, opacity, colors)",
  },
  {
    id: "outline-removed",
    test: (line) =>
      /outline\s*:\s*(none|0)\b|\boutline-none\b/.test(line) &&
      !/focus-visible|focus:ring|focus-visible:ring|:focus-visible/.test(line),
    message: "focus outline removed with no visible replacement on the same line; make sure :focus-visible shows a ring",
  },
  {
    id: "tracked-caps",
    test: (line, context) => {
      const tailwind = /\buppercase\b/.test(line) && /\btracking-(wide|wider|widest|\[)/.test(line);
      const css =
        /text-transform\s*:\s*uppercase/.test(line) &&
        /letter-spacing\s*:\s*(0?\.[0-9]+|[1-9][0-9.]*)\s*(em|rem|px)/.test(context);
      return tailwind || css;
    },
    message: "all-caps with wide letter spacing; write labels in normal case and build hierarchy with size, weight and color",
  },
  {
    id: "default-accent",
    test: (line) => {
      const lower = line.toLowerCase();
      return (
        /\b(bg|text|border|ring|outline|from|via|to|fill|stroke|accent|caret|decoration|shadow)-(blue|indigo|violet|purple)-\d{2,3}\b/.test(line) ||
        DEFAULT_ACCENT_HEX.some((hex) => lower.includes(hex))
      );
    },
    message: "framework-default blue/indigo/violet; keep only if it is the project's brand color",
  },
  {
    id: "img-no-size",
    test: (line, context) => {
      const match = context.match(/<img\b[^>]*>/s);
      return /<img\b/.test(line) && match && !(/\bwidth=/.test(match[0]) && /\bheight=/.test(match[0])) && !/\bfill\b/.test(match[0]);
    },
    message: "<img> without width and height; set both so the layout doesn't shift",
  },
  {
    id: "zoom-disabled",
    test: (line) => /user-scalable\s*=\s*(no|0)|maximum-scale\s*=\s*1(\.0)?\b/.test(line),
    message: "zoom disabled in the viewport meta; remove user-scalable/maximum-scale",
  },
  {
    id: "three-dots",
    test: (line) => /[A-Za-z]\.\.\.(["'`<]|\s*$)/.test(line) && !/\.\.\.[A-Za-z_$({[]/.test(line),
    message: "\"...\" in visible text; use the ellipsis character \"…\"",
  },
  {
    id: "click-on-div",
    test: (line) => /<(div|span)\b[^>]*\bon(Click|click)\s*=/.test(line) || /<(div|span)\b[^>]*@click\b/.test(line),
    message: "click handler on a div/span; use <button> for actions or <a> for navigation",
  },
  {
    id: "paste-blocked",
    test: (line, context) => /onPaste|addEventListener\(\s*["']paste["']/.test(line) && /preventDefault/.test(context),
    message: "paste is blocked; never prevent pasting",
  },
  {
    id: "emoji-heading",
    test: (line) => /<h[1-6]\b[^>]*>[^<]*\p{Extended_Pictographic}/u.test(line),
    message: "emoji in a heading; use a real icon or none",
  },
  {
    id: "long-duration",
    test: (line) =>
      !/infinite/.test(line) &&
      (/\bduration-(500|700|1000)\b/.test(line) ||
        /(transition|animation)(-duration)?\s*:[^;]*(?<![\d.])(([4-9]\d\d|\d{4,})ms|([1-9]\d*(\.\d+)?|0?\.[4-9]\d*)s)\b/.test(line)),
    message: "UI transition longer than ~300ms; keep interface motion short unless it's a deliberate, large move or a loop",
  },
  {
    id: "scale-from-zero",
    test: (line) => /scale\(\s*0\s*\)|\bscale-0\b|scale:\s*0\b/.test(line),
    message: "scaling from zero; start near the final size (around 0.95) and fade in",
  },
  {
    id: "autofocus",
    test: (line) => /\bautoFocus\b|\bautofocus\b/.test(line),
    message: "autofocus; use only for a single primary input on desktop",
  },
];

function walk(path, files) {
  let stats;
  try {
    stats = statSync(path);
  } catch {
    return;
  }
  if (stats.isDirectory()) {
    for (const name of readdirSync(path)) {
      if (SKIP_DIRS.has(name) || name.startsWith(".")) continue;
      walk(join(path, name), files);
    }
  } else if (EXTENSIONS.has(extname(path)) && !/\.min\.(js|css)$/.test(path)) {
    files.push(path);
  }
}

const targets = process.argv.slice(2);
const files = [];
for (const target of targets.length ? targets : ["."]) walk(target, files);

let total = 0;
for (const file of files) {
  const text = readFileSync(file, "utf8");
  if (text.includes("deburr-ignore-file")) continue;
  const lines = text.split("\n");
  const findings = [];
  lines.forEach((line, i) => {
    if (line.includes("deburr-ignore")) return;
    const context = lines.slice(Math.max(0, i - 4), i + 6).join("\n");
    for (const rule of RULES) {
      if (rule.test(line, context)) findings.push(`${relative(".", file)}:${i + 1} ${rule.id}: ${rule.message}`);
    }
  });
  if (findings.length) {
    console.log(`\n${relative(".", file)}`);
    for (const finding of findings) console.log(`  ${finding}`);
    total += findings.length;
  }
}

if (total) {
  console.log(`\n${total} finding${total === 1 ? "" : "s"} in ${files.length} file${files.length === 1 ? "" : "s"}.`);
  console.log("Fix each one, or note why it's deliberate. Add `deburr-ignore` to a line to skip it.");
  process.exit(1);
} else {
  console.log(`Clean: ${files.length} file${files.length === 1 ? "" : "s"} scanned.`);
}
