# Rules

General craft rules that make an interface feel smooth and considered instead of generated. They don't impose a style. They work with whatever brand, fonts and colors a project already has.

The core idea: **plain and well-ordered beats clever.** An interface doesn't need to be cute or decorated. It needs clear hierarchy, room to breathe and smooth behavior.

The technical rules for accessibility, forms, performance, interaction and platform details are adapted from Vercel's [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines) (MIT, © 2025 Vercel Labs; see `licenses/` at the repo root).

---

## Color

1. **Contrast is never a guess.** Body text meets WCAG AA (4.5:1). Large text and icons meet 3:1. Check placeholder and disabled text too; they're the usual failures.
2. **Hierarchy comes from fewer colors, not more.** Use one accent for what matters most. Everything else stays neutral.
3. **Keep greys in one family, and few of them.** Secondary and tertiary text are steps of the same ink, not unrelated greys. Use a small set of named shades. Don't build hierarchy from many ad-hoc opacities (`/5`, `/10`, `/15`, `/40`, `/60` …) of one color.
4. **Color carries meaning consistently.** Success, error and warning always look the same, and they're never used as decoration.
5. **Dark mode is its own palette, not an inverted light mode.** Surfaces get lighter as they come forward, shadows get weaker, and saturated colors are toned down.
6. **Dark mode is wired up properly.**
   - Set `color-scheme: dark` on `<html>` so scrollbars and inputs follow.
   - `<meta name="theme-color">` matches the page background.
   - Native `<select>` gets an explicit background and text color.
7. **Use the project's palette first.** Only add a color when there's a job no existing color can do.
8. **No default blue, indigo or violet.** If the project has no brand color, don't reach for framework defaults (Tailwind `blue`/`indigo`/`violet`/`purple`, `#3b82f6`, `#6366f1` and similar). Start from neutrals, and if an accent is needed, choose it on purpose and say why.

## Typography

1. **One clear reading order.** On any screen there is one thing to read first, then a clear second, then the rest. If two things compete, one gets smaller or quieter.
2. **Build hierarchy with size, weight and color together.** Don't lean on one alone. Prefer a muted color over a smaller size when de-emphasizing.
3. **Title and description are clearly different.** A title is noticeably stronger: larger and/or heavier, in the main ink color. Its description is quieter: regular weight, muted color, comfortable line height. There is a small, consistent gap between them. They never look like two equal lines.
4. **Few sizes, reused.** A screen uses a handful of sizes and weights, not a new one per element.
5. **Readable lines.** Body text sits around 60–75 characters per line, with line height around 1.4–1.6. Headings are tighter.
6. **Large text gets slightly tighter letter spacing.** Small text keeps the font's default spacing. Slightly means a little (around −0.01 to −0.02em). Heavy negative tracking that squeezes letters together is a generated look, not a refinement.
7. **Labels and small headings are written in normal case.** Don't use all-caps, letter-spaced "eyebrow" labels, mono or not, above headings, on section titles, in navigation or as tags. Hierarchy comes from size, weight and color instead.
8. **Monospace only where it's technical.** Use it small, for code, IDs, keys, keyboard shortcuts or tabular figures. It isn't a decorative or "techy" voice for headings and labels.
9. **Typographic hygiene:**
   - `text-wrap: balance` or `text-pretty` on headings, so no single word is left alone on the last line.
   - `font-variant-numeric: tabular-nums` for number columns, counters and comparisons.
   - Use `…` instead of `...`, curly quotes instead of straight ones, and real dashes.
   - Non-breaking spaces between a number and its unit (`10&nbsp;MB`), in shortcuts (`⌘&nbsp;K`) and inside brand names.
   - Loading text ends with an ellipsis: "Loading…", "Saving…".
10. **Emphasis isn't decoration.** Don't italicize single words inside headlines for flair, and don't reach for a trendy display serif (Instrument Serif and similar) as the "designed" voice. Use the project's fonts, and use italic only where it has a meaning, like titles of works or a real stress.

## Layout and surface

1. **Nothing is cramped.** Give every element room. When in doubt, add space rather than remove it. Text never touches the edge of its container, and buttons, inputs and cards have comfortable inner padding.
2. **Padding and gaps follow a scale.** Spacing comes from a small set of values (for example 4, 8, 12, 16, 24, 32, 48). The same kind of gap always uses the same value.
3. **Spacing shows grouping.** Related things sit closer together than unrelated things. Space between sections is clearly larger than space inside them. A container's padding is at least as large as the gaps between the items inside it.
4. **Alignment is deliberate.** Elements line up to shared edges. Centering is a choice for short, focal content, not the default for everything.
5. **Separate with space first.** Spacing and grouping do most of the work. Reach for a subtle background shift next, and a divider or border only when space alone can't show the structure (tables, dense lists, form fields). Don't put a line between every section or a bordered box around every group. Shadows are layered and low-opacity.
6. **Consistent corners.** Pick a radius family and keep it.
7. **Nested corners are concentric.** When a rounded element sits inside another, the inner radius is smaller and the outer radius larger: inner radius = outer radius − padding between them. Equal radii on nested shapes look wrong.
8. **Icons are small and quiet.** Size icons to the text beside them (roughly the text's size, usually 14–20px) and match their stroke weight. Icons support a label; they are never oversized decoration. Use one icon set throughout.
9. **Content dissolves at fixed edges.** When the page scrolls under a fixed header or bottom bar, content doesn't stop at a hard line or a solid bar color. The bar's backdrop blurs progressively toward the edge: stacked `backdrop-filter: blur()` layers, each masked with a `linear-gradient`. The content's opacity fades over the same band. Inner scroll areas (sidebars, chat threads) fade their edges the same way, never with a hard cut. Don't box content into a card to avoid it.
10. **No decorative clutter.** Don't scatter watermark-like extras around the edges: corner labels, coordinates, index numbers like "01 / 05", version tags, crosshairs, grid marks, faint repeated words. Every piece of text on screen has a job. This applies to sites, apps and slides alike.
    - **No section numbering** ("01", "02.", "§3") on marketing or app sections. Numbers are for real sequences, like steps the user follows.
    - **No tags for decoration.** Pills and badges carry real status or filters. They don't sit above headings or sprinkle across cards.
    - **No code breadcrumbs.** File paths, fake terminal prompts, `// comments` or `<tags>` used as section labels or ornaments.
11. **Layout uses the platform.**
    - Use flex and grid rather than measuring with JavaScript.
    - Full-bleed layouts respect `env(safe-area-inset-*)` on notched devices.
    - Containers don't produce unwanted scrollbars; fix the overflowing content instead of hiding it everywhere.
12. **Detail matches the job.** Don't fill a screen or a mockup with over-detailed UI: fake charts, tiny stats, status dots and controls nobody will use. Show the few pieces that explain the product. Diagrams are a last resort; when one is needed, keep it to the few nodes that carry the idea. The more detailed a decorative diagram, the more generated it looks.

## States and content handling

1. **Every interactive element has hover, active, focus and disabled states.** Interactive states are more prominent than the resting state.
2. **Focus is always visible.**
   - Use `:focus-visible`, not `:focus`, so mouse clicks don't show a ring.
   - Use `:focus-within` for compound controls.
   - Never remove the outline without a replacement.
   - Sticky headers, footers and overlays must not cover the focused element.
3. **Every data state is designed:** empty, loading, error, full, very long content and very short content. Real-looking data is used to test them. Empty strings and arrays never render broken UI.
4. **Long content is handled.** Text containers truncate, clamp or wrap (`truncate`, `line-clamp`, `break-words`). Flex children that hold text get `min-width: 0` so they can shrink. Plan for short, average and very long user input.
5. **Destructive actions are reversible or confirmed.** Use a confirmation step or an undo window; never act immediately.
6. **State lives in the URL.** Filters, tabs, pagination and expanded panels are reflected in query parameters so they can be shared and deep-linked.

## Motion

The rule underneath all of these: **nothing on screen changes abruptly.** Changes of state, position, size or visibility are eased when that helps the user follow them.

Motion has a job: feedback, orientation or understanding a state change. It isn't decoration on every change. Typing, keyboard use and frequently repeated actions are never slowed down by it.

1. **Animate the small things too.** Hover, press, toggles, checkboxes, tab changes, counters, tooltips, menus and validation messages transition. Nothing snaps, but nothing lags either: input feedback stays immediate.
2. **Except focus rings, which appear instantly.** Keyboard users need to see where they are at once; a fading ring feels laggy when tabbing quickly.
3. **Nothing flashes.** No white flash between pages or themes, no flicker while loading, no content that appears and immediately reflows. Reserve space before content arrives.
4. **No screen arrives all at once.** New views, modals, sheets and panels enter with a short fade and small movement. Lists can stagger their items slightly.
5. **Short and eased.** Most UI motion lasts 150–300ms with an ease-out curve, so it starts fast and settles gently. Linear timing is only for continuous loops like spinners.
6. **Leaving is quicker than arriving.** Exits are a little faster than entrances, so the interface feels responsive.
7. **Small distances.** Elements move a few pixels and scale only slightly (around 0.95–1). Nothing flies in from far away or grows from nothing.
8. **Changes morph instead of jumping.** When something resizes, moves or swaps content, animate between the two states rather than replacing it.
9. **Loading is calm.** Skeletons or subtle indicators instead of spinners that pop in and out. A loader that would show for under about 300ms isn't shown at all.
10. **Bounce is rare.** Springy overshoot only for small, playful, tactile moments, never for panels, pages or modals.
11. **Respect reduced motion.**
    - With `prefers-reduced-motion`, swap movement for a simple fade or no animation.
    - Decorative loops stop.
    - Autoplaying motion longer than 5 seconds next to other content gets a pause, stop or hide control.
12. **Motion never blocks.** Animations can be interrupted mid-way, and the user never waits for one to finish before acting.
13. **Motion is cheap to render.**
    - Animate `transform` and `opacity`.
    - List the properties you transition; never use `transition: all`.
    - Set the right `transform-origin`.
    - For SVG, transform a `<g>` wrapper with `transform-box: fill-box; transform-origin: center`.

## Accessibility

1. **Semantic HTML first.**
   - Use `<button>` for actions, `<a>` for navigation, plus `<label>` and `<table>`.
   - Add ARIA only when HTML can't express it.
   - Never put click handlers on a `<div>` or `<span>`.
2. **Everything has a name.**
   - Icon-only buttons get an `aria-label`.
   - Every form control has a label.
   - Meaningful images get `alt`; decorative images get `alt=""`.
   - Decorative icons get `aria-hidden="true"`.
3. **Everything works from the keyboard.** Interactive elements respond to keys. Drag, swipe and pinch actions have a tap/click and keyboard alternative.
4. **Structure is navigable.** Headings go in order from `<h1>` to `<h6>`. There's a skip link to the main content. Heading anchors get `scroll-margin-top`.
5. **Changes are announced.** Toasts and validation messages use `aria-live="polite"`.
6. **Media is accessible.** Meaningful media has captions, transcripts or descriptions. Media controls work from the keyboard.
7. **Zoom is never disabled.** No `user-scalable=no` or `maximum-scale=1`.

## Forms

1. **Inputs are typed and named.**
   - Use the right `type` (`email`, `tel`, `url`, `number`) and `inputmode`.
   - Give each input a meaningful `name` and `autocomplete`.
   - Use `autocomplete="off"` on non-auth fields so password managers stay out of the way.
2. **Labels are part of the control.** Clicking a label focuses or toggles its control. A checkbox or radio and its label share one hit area with no dead zones.
3. **Never block paste.** Spellcheck is off for emails, codes and usernames.
4. **Submitting is honest.** The submit button stays enabled until the request starts, then shows progress.
5. **Errors sit next to their field.** On submit, focus moves to the first error. Each message says how to fix it, not just what's wrong.
6. **Placeholders show an example** and end with `…`.
7. **Unsaved changes are protected.** Warn before the user navigates away.
8. **Autofocus is used sparingly.** Only on desktop, and only for a single primary input.

## Touch and interaction

1. **Taps respond immediately.** Use `touch-action: manipulation`, and set `-webkit-tap-highlight-color` on purpose.
2. **Scroll stays contained.** Modals, drawers and sheets use `overscroll-behavior: contain`.
3. **Dragging is clean.** Text selection is disabled while dragging, and dragged elements are `inert`.

## Images and performance

1. **Images never shift the layout.** Every `<img>` has a width and height. Below-the-fold images lazy-load. Critical above-the-fold images load with high priority.
2. **Fonts load without jumping.** Preload critical fonts and use `font-display: swap`. Preconnect to asset and CDN domains.
3. **Video over GIF.** Use `<video autoplay muted loop playsinline>` with a still fallback.
4. **Long lists are virtualized.** Lists of more than about 50 items use virtualization or `content-visibility: auto`.
5. **Rendering stays smooth.**
   - Don't read layout (`getBoundingClientRect`, `offsetHeight`) during render.
   - Batch DOM reads and writes.
   - Keep controlled inputs cheap on every keystroke.
6. **Hydration is safe.** Inputs with `value` have `onChange` (or use `defaultValue`). Dates and times don't mismatch between server and client.

## Locale

1. Format dates, times, numbers and currency with `Intl`, never by hand.
2. Detect language from the browser's language settings, not from IP.
3. Wrap brand names, code and identifiers in `translate="no"`.

## Content

1. **Show the real thing.** Real product UI and realistic content beat abstract illustrations and placeholder text.
2. **Plain, specific copy.** Say what it does and what it turns into. Use concrete numbers instead of superlatives.
3. **Short headlines, one idea each.**
4. **Labels say what will happen.** "Save changes" rather than "Submit", and "Delete project" rather than "OK".
5. **Active voice and second person.** "Install the CLI", not "The CLI will be installed". Address the user as "you".
6. **Numerals for counts:** "8 projects", not "eight projects".
7. **Errors include the next step**, not just the problem.
8. **No em dashes (—).** Use a period, a comma, a colon or parentheses instead. Em dashes are one of the most recognizable marks of generated copy, in headlines, buttons and body text alike. Hyphens in compound words and en dashes in ranges (9–5) are fine.

## Avoid: signs of generated UI

These are defaults for when nothing else decides. If the user asked for it or the project already uses it consistently, keep it. None of these are on the level of an accessibility failure. That exception covers existing work only: never add these patterns yourself.

- Purple-to-blue gradients, glows and glassmorphism added by default.
- All-caps, wide-tracked labels, especially in mono: "FEATURES", "01. APPROACH", "SYSTEM / STATUS".
- Decorative text and marks scattered around the layout like watermarks: corner captions, coordinates, serial numbers, timestamps, crosshairs.
- Emoji used as icons, or every heading paired with an icon.
- Everything centered, everything in cards, every section in the same layout.
- Too many colors, weights and sizes on one screen.
- Generic copy: "Unlock the power of…", "Seamless", "Revolutionize", "Elevate".
- Em dashes (—) anywhere in the copy.
- Identical three-column feature grids with vague one-line descriptions.
- Default shadows that are too dark and borders on everything.
- Every group in a bordered container, and dividers between every section.
- Many shades and opacities of the same color doing the work of hierarchy.
- Small tags or pills above headings, or scattered across cards.
- Single italic words in headlines, trendy display serifs (Instrument Serif and similar) and tightly squeezed negative tracking.
- Section numbering: "01", "02", "§ 03".
- Code breadcrumbs as decoration: file paths, `~/` prompts, `// labels`, `<Section />`.
- Over-detailed UI and detailed decorative diagrams.
- Hard cuts: elements that snap, pop or flash into place.

## Avoid: in code

- `transition: all`
- `outline: none` with no focus replacement
- `<div>` or `<span>` with click handlers, or `onClick` navigation without a link
- Images without dimensions
- Inputs without labels, or icon buttons without `aria-label`
- `onPaste` with `preventDefault`
- Zoom disabled in the viewport meta tag
- Hand-formatted dates and numbers
- Large lists rendered without virtualization
- `autoFocus` without a clear reason
- Animated GIFs where a video would do
- Gesture-only actions with no tap or keyboard alternative
