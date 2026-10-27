---
name: deburr
description: Make interfaces feel smooth and considered instead of AI-generated. Use whenever building, changing, polishing or reviewing UI (web pages, web apps, iOS/SwiftUI and React Native screens, components, dashboards, slides built in HTML), or when someone says it looks generic, cramped, janky, flashy or "AI-made". Works with the project's existing brand; never imposes a style. For native apps it goes native first: system components, Liquid Glass, SF Symbols, Dynamic Type.
---

# Deburr

The goal isn't a look. It's a feel: nothing changes abruptly, nothing is cramped, and hierarchy is obvious. Plain and well-ordered beats clever. These rules work with whatever fonts, colors and components the project already has.

The point is not to make everything obey the rules. It's to **reduce friction while keeping the product's intent.**

## Boundaries

These come before every rule in this skill.

1. **The user's request comes first.** Deburr rules never override an explicit preference from the user or a deliberate design decision in the project.
2. **Stay in the requested scope.** A small fix doesn't become a page redesign. Report unrelated problems separately instead of fixing them.
3. **A review is not permission to edit.** When asked to review, report findings and leave the files alone.
4. **Don't decorate every change with motion.** Use motion when it helps feedback, orientation or understanding a state change. Typing, keyboard use and frequently repeated actions are never delayed.
5. **A design choice is not a bug.** A mono heading, all-caps text, a gradient or a particular color used on purpose stays. These defaults are not on the same level as accessibility failures.
   - "On purpose" means the user asked for it, or the project already uses it consistently.
   - Code you write yourself gets no such pass. The rules apply in full to anything you add.
6. **Scanner findings are hints, not proof.** Read the surrounding code and the real behavior before changing anything. Never fix scanner findings automatically.
7. **Say what you couldn't check.** A clean scan does not mean accessibility, motion or the mobile experience were verified.

The full rules are in [rules.md](rules.md). The finishing check is in [check.md](check.md). Read both before your first UI change in a session.

**Building a native app?** Also read [native.md](native.md). iOS and React Native come first. In Swift, everything goes native: system components, Liquid Glass on iOS 26 and later, SF Symbols, Dynamic Type and system springs. Build custom pieces only when the SDK has nothing for the job, and make them feel like the system. Skip this only when the user is deliberately designing something original.

## How to work

### 1. Read the project before designing

- Find the existing tokens: colors, fonts, spacing, radii, shadows, easing and durations (CSS variables, Tailwind config, theme files, design system).
- Use what's there. Add a token only when no existing one can do the job, and name it in the project's style.
- If the project has no brand color, stay neutral. Don't fall back to framework blue, indigo or violet.
- Note how the project animates (CSS transitions, Motion, View Transitions…) and use the same tool.

### 2. Build with the core rules in mind

These are the ones most often missed. Everything else is in `rules.md`.

**Motion: nothing on screen changes abruptly.**
- State changes are eased where motion helps the user follow them: hover, press, toggle, checkbox, tab, tooltip, menu, counter, validation message.
- Input is never delayed: typing, keyboard navigation and repeated actions respond at once.
- New views, modals, sheets and panels enter with a short fade and small movement. Nothing appears all at once.
- Nothing flashes: no white flash between pages or themes, no flicker while loading, no layout jump when content arrives.
- Timing: 150–300ms, ease-out. Exits are a little faster than entrances. Movement is small, a few pixels with scale around 0.95–1.
- When content resizes or swaps, animate between the two states instead of replacing it.
- Focus rings are the exception: they appear instantly.
- Respect `prefers-reduced-motion`. Animate `transform` and `opacity`, and never use `transition: all`.

**Space and shape**
- Nothing is cramped. Padding and gaps come from one scale, and related things sit closer than unrelated ones.
- Nested corners are concentric: inner radius = outer radius − padding.
- Icons are small and sized to the text beside them, from one set.

**Hierarchy and color**
- Each screen has one clear thing to read first.
- A title is clearly stronger than its description.
- Text contrast meets WCAG AA. Use one accent, and keep greys in one family.

**What not to add** (defaults; keep anything the project does on purpose)
- All-caps, letter-spaced labels or eyebrows, mono or not.
- Watermark-like clutter: corner captions, coordinates, "01 / 05" counters, crosshairs.
- Mono is only for genuinely technical content, and small.
- No emoji icons, no default gradients or glassmorphism, no generic copy, no em dashes (—) in any text.

### 3. Check before you finish

Run the check in [check.md](check.md) every time you've changed UI. Fix what it finds before reporting the work as done. Never claim a check you didn't run.

## Reviewing

When asked to review rather than build, report only. Don't edit files unless the user asks for the fixes.

1. Run the same check.
2. Report findings grouped by file, most important first, as `path:line: problem → fix`. Keep each finding to one line, and add an explanation only when the fix isn't obvious.
3. Keep functional and accessibility problems separate from style suggestions:
   - **Broken or inaccessible:** failing contrast, missing focus, unusable from the keyboard or a screen reader, layout shift, missing states, flashes.
   - **Friction:** snaps, cramped spacing, unclear hierarchy.
   - **Style suggestions:** clutter and generic patterns. Mark these as suggestions, and skip anything that looks deliberate.
4. Don't propose a new visual style. Fix within the project's own language.
5. End with what you couldn't verify.
