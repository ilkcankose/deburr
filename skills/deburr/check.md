# Finishing check

Run this after any UI change, before saying the work is done. Work through it in order, fix what fails, then run it again.

## 1. Scan the code

If Node is available, run the scanner on the files you changed, or on the source folder:

```bash
node <path-to-this-skill>/scripts/scan.mjs src/
```

It catches the patterns that can be found in code:
- `transition: all`
- focus outlines removed
- all-caps tracked labels
- default blue, indigo or violet
- images without dimensions
- disabled zoom
- `...` instead of `…`
- click handlers on `div`s
- emoji in headings
- long durations
- scaling from zero

Each finding is either a fix or a deliberate choice. If it's deliberate (for example, the brand really is indigo), say so in your report.

If Node isn't available, search for the same patterns by hand.

## 2. Motion pass

Go through every interactive element and conditional render you touched:

- [ ] **Hover and press:** does the element transition its color, background or scale? Or does it snap?
- [ ] **Small controls:** do toggles, checkboxes, radios, tabs and segmented controls animate their change?
- [ ] **Things that appear and disappear:** do tooltips, menus, popovers, toasts, validation messages and expanding sections have both an enter and an exit? Is the exit faster than the enter?
- [ ] **New screens:** do new views, modals, sheets and drawers fade or move in? Or do they appear at once?
- [ ] **Size changes:** when content changes height (accordions, list add/remove, async content), does the height animate? Or does the layout jump?
- [ ] **Theme switching:** does switching theme or route cause a white or unstyled flash?
- [ ] **Loading:**
  - Is space reserved before content arrives?
  - Are images sized?
  - Is a loader skipped when the wait is short?
- [ ] **Focus rings:** do they appear instantly?
- [ ] **Durations and easing:** do they come from tokens? Are they mostly 150–300ms with ease-out?
- [ ] **Reduced motion:** with `prefers-reduced-motion: reduce`, does movement become a fade or stop?

If a browser is available, open the page and actually trigger these states. Watch for snaps and flashes, and reload once to check for layout shift.

## 3. Layout and hierarchy pass

- [ ] **Room to breathe:** text doesn't touch container edges, and controls have comfortable padding.
- [ ] **Spacing:** spacing values come from the scale. Gaps inside a group are smaller than gaps between groups.
- [ ] **Nested corners:** inner radius = outer radius − padding.
- [ ] **Icons:** sized to their text, one set, no oversized decorative icons.
- [ ] **Reading order:** there is one obvious first thing to read on each screen.
- [ ] **Title and description:** titles are clearly stronger than their descriptions.
- [ ] **No clutter:** no all-caps tracked labels, no watermark-like extras, and mono only where it's technical.
- [ ] **Narrow screens:** check at a narrow width (around 390px) as well as a wide one. Nothing is cramped or overflowing.

## 4. Color and contrast pass

- [ ] **Contrast:** body text is at least 4.5:1, and large text and icons at least 3:1. Check muted, placeholder and disabled text, which fail most often.
- [ ] **Accent:** there is one accent and it marks what matters. No color was added that the project's palette already covers.
- [ ] **Dark mode:** if there's a dark mode, it has its own surfaces, and `color-scheme` and `theme-color` are set.

## 5. States and accessibility pass

- [ ] **Interaction states:** every interactive element has hover, active, focus-visible and disabled states.
- [ ] **Data states:** empty, loading, error and very long content all render properly.
- [ ] **Names:** icon buttons have labels, inputs have labels, and images have `alt`.
- [ ] **Keyboard:** everything works from the keyboard.

## 6. Report

End with a short note:
- **Checked:** which steps you ran and how (scanner, browser, by reading the code).
- **Fixed:** what you changed as a result.
- **Not verified:** anything you couldn't check, and why. For example, no browser was available to watch the motion.
