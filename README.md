# deburr

**Take the rough edges off AI-built interfaces.**

In metalwork, *deburring* is the last pass. After a part is cut, you remove the small burrs along its edges so it's smooth to the touch. Nobody notices a deburred edge. Everybody notices one that isn't.

AI-built UI has burrs everywhere:
- A menu that snaps open.
- A theme switch that flashes white.
- A card where the text touches the edge.
- A label shouting in spaced-out capitals.
- The same indigo button every agent reaches for.

`deburr` is an agent skill that finds those edges and smooths them, without changing who your product is.

## What it does

It doesn't give your project a style. It works with the brand, fonts and colors you already have, and holds the work to three things:

**Nothing changes abruptly.**
- Every small state change is eased: hover, press, toggles, tabs, tooltips, counters, validation.
- New screens fade in instead of appearing all at once.
- Nothing flashes, and the layout never jumps when content arrives.
- Focus rings are the one exception: they appear instantly.

**Nothing is cramped.**
- Spacing comes from a scale.
- Related things sit together.
- Nested corners are concentric.
- Icons are sized to the text beside them.

**Hierarchy is obvious.**
- Each screen has one clear thing to read first.
- Titles are stronger than their descriptions.
- Contrast is measured, not guessed.

Then it checks its own work. Before the agent calls the job done, it does two things:
1. It scans the code for known problems.
2. It walks through motion, layout, contrast and states.

It reports what it checked, what it fixed and what it couldn't verify.

## Native apps

For iOS and React Native, `deburr` goes native first:
- System components over custom ones.
- Liquid Glass on iOS 26 and later.
- SF Symbols sized to their text.
- Dynamic Type everywhere.
- System springs and haptics on meaningful moments.

In Swift, everything follows the system. In React Native, native-backed navigation, tabs, glass and Reanimated come first. It builds a custom piece only when the SDK has nothing for the job, and makes it feel like the system shipped it, unless you're deliberately designing something original.

The rules are in [`native.md`](skills/deburr/native.md). The scanner also checks Swift and React Native code for:
- fixed font sizes
- tap gestures used in place of buttons
- hardcoded colors
- fake glass
- legacy touchables
- JS-thread animations
- disabled font scaling

## Install

```bash
npx skills add ilkcankose/deburr
```

Or copy `skills/deburr` into your agent's skills folder (for Claude Code, `~/.claude/skills/deburr`).

It triggers on its own whenever the agent builds, changes or reviews UI, or when you say something looks generic, cramped, janky or AI-made.

## What's inside

| File | What it is |
| --- | --- |
| [`SKILL.md`](skills/deburr/SKILL.md) | How the agent works: read the project, build with the core rules, check before finishing |
| [`rules.md`](skills/deburr/rules.md) | The full rules: color, type, layout, states, motion, accessibility, forms, touch, performance, content |
| [`native.md`](skills/deburr/native.md) | Native-first rules for iOS (SwiftUI, Liquid Glass) and React Native |
| [`check.md`](skills/deburr/check.md) | The finishing check the agent runs every time |
| [`scan.mjs`](skills/deburr/scripts/scan.mjs) | A zero-dependency scanner for problems you can find in code |

The scanner also works on its own:

```bash
node skills/deburr/scripts/scan.mjs src/
```

It flags:
- `transition: all`
- focus outlines that were removed
- all-caps tracked labels
- framework-default blues and violets
- images without dimensions
- disabled zoom
- `...` instead of `…`
- click handlers on `div`s
- emoji in headings
- em dashes in text
- sluggish durations
- elements that scale up from zero

Add `deburr-ignore` to a line, or `deburr-ignore-file` anywhere in a file, to skip it.

## Sources

The rules come from studying shipped interfaces, design-engineering writing and the tools designers actually use. The research notes and a categorized library of galleries, components, generators and references are in [`sources/`](sources/).

The technical rules for accessibility, forms, performance and platform details are adapted from Vercel's [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines) (MIT). Their license is in [`licenses/`](licenses/).

## License

[MIT](LICENSE) © 2026 Ilkcan Kose
