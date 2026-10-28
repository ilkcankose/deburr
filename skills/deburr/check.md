# Finishing check

Run this after any UI change, before saying the work is done. Work through it in order, fix what fails, then run it again.

Check only what you changed. Problems you notice elsewhere go in the report, not in the diff.

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
- em dashes in text
- trendy display serifs, heavy negative tracking, italic accent words in headings
- long durations
- scaling from zero

The scanner reports two groups: **functional and accessibility** problems, and **style** suggestions. Treat both as hints, not proof:
- Read the surrounding code before changing anything, and never fix findings in bulk.
- A style finding that is a deliberate choice (the brand really is indigo, the mono heading is intended) stays. Say so in your report.
- If the scanner exits with an error or scans no files, the scan didn't happen. Don't report it as clean.
- A clean scan only means these patterns weren't found. It doesn't verify motion, accessibility or the mobile experience.

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
- [ ] **No generated tells:**
  - no section numbering, decorative tags or code breadcrumbs
  - no bordered box around every group, no divider between every section
  - no italic accent words or squeezed tracking
  - a few named shades instead of many opacities
  - only as much UI detail, and diagram, as the idea needs
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

## 6. Native app pass (iOS / React Native)

Skip this pass for web projects.

- [ ] **System components:** is every standard piece (navigation, tabs, sheets, menus, lists, pickers, alerts) a system component? Or a native-backed one, in React Native?
- [ ] **Glass and materials:** on iOS 26 and later, do floating controls use system glass instead of hand-made blur? Is there a fallback for older versions?
- [ ] **Text:** does all text use text styles and scale with Dynamic Type? Check at the largest size.
- [ ] **Icons and color:** are icons SF Symbols, sized to their text? Are colors semantic, so dark mode works?
- [ ] **Animation:** does every state change animate with system springs? Are list inserts and deletions animated?
- [ ] **Screen edges:** does scrolling content run under the header and the tab bar, then blur and fade progressively at the top and bottom of the screen? No hard line, and no boxed content?
- [ ] **Interaction:** are touch targets at least 44pt? Are haptics used only on meaningful moments?
- [ ] **Reduce settings:** are Reduce Motion and Reduce Transparency respected?
- [ ] **VoiceOver:** does every control have a label and a real button role?

If you can run the app in the iOS Simulator, do: trigger the states and take screenshots, in both light and dark mode.

## 7. Report

End with a short note:
- **Checked:** which steps you ran and how (scanner, browser, by reading the code).
- **Fixed:** what you changed as a result.
- **Not verified:** anything you couldn't check, and why. For example, no browser was available to watch the motion. Always include this line, even when the scan was clean.
- **Outside scope:** problems you noticed but didn't touch.
