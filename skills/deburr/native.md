# Native apps

Rules for iOS and React Native apps, on top of the general craft in [rules.md](rules.md): smooth motion, room to breathe, clear hierarchy, measured contrast, no clutter. The web-specific parts of `rules.md` (CSS, HTML elements, URLs) don't apply here; their intent does.

iOS and React Native come first. Android follows the same ideas with Material equivalents.

## The core rule: native first

1. **Use what the platform already provides.** If the iOS SDK has a component, control, material, animation or behavior for the job, use it rather than drawing your own:
   - navigation stacks, tab bars, toolbars, sheets, menus, context menus
   - pickers, toggles, search, lists, swipe actions, pull to refresh
   - share sheets, alerts, confirmation dialogs
   - SF Symbols, system fonts, system colors, materials, haptics

   System components bring the right motion, gestures, accessibility, Dynamic Type and dark mode for free, and they update with the OS.
2. **Use the current design language of the deployment target.** On iOS 26 and later that means Liquid Glass. Standard bars, tab bars, toolbars, sheets and controls adopt it automatically, so don't fight it with opaque custom backgrounds. Check availability (`if #available`) and fall back to system materials on older versions. Use the newest APIs the target supports, and check the current SDK documentation rather than guessing API names.
3. **When the SDK has nothing for it, build the closest native equivalent.** Make the custom piece out of system parts:
   - system font and text styles
   - semantic colors
   - materials or glass
   - SF Symbols
   - system springs
   - haptics
   - 44pt touch targets

   It should feel as if Apple shipped it.
4. **Unless the work is meant to be original.** If the user is deliberately designing a custom, branded experience (a game, an expressive brand app, a signature interaction), don't force system looks onto it. The craft rules still apply.

## Swift and SwiftUI: go fully native

When the app is written in Swift, everything follows the system:

### Structure and components

- **Navigation and tabs:** `NavigationStack`/`NavigationSplitView` and `TabView` with standard tab and toolbar items. Don't build custom bars.
- **Sheets:** `.sheet` with `presentationDetents`, `presentationBackground` and `presentationCornerRadius` only when needed. Menus go in `Menu`/`.contextMenu`, and confirmations in `.confirmationDialog`/`.alert`.
- **Lists and forms:** `List` and `Form` with standard row styles, `.swipeActions`, `.refreshable` and `.searchable`.
- **Empty states:** `ContentUnavailableView`.
- **Loading:** `ProgressView`, or `.redacted(reason: .placeholder)` for skeletons in the shape of the real content.
- **Buttons:** use system button styles. On iOS 26 and later, glass button styles exist for floating, glass-like actions. Avoid hand-drawn button chrome.

### Liquid Glass (iOS 26+)

- **Where glass goes:** on controls that float above content, such as toolbars, floating buttons and small overlays. Never on the content itself, and never stack glass on glass.
- **Custom glass:** use the system glass effect APIs rather than imitating them with blur and gradients. Group nearby glass elements in a shared container so they blend and morph together. Give elements a shared identity when one should morph into another.
- **Background:** let content extend under bars. Don't add your own backgrounds behind standard bars.
- **Fallback:** below iOS 26, use `.ultraThinMaterial`/`.regularMaterial` instead.
- **Accessibility:** respect Reduce Transparency and Increase Contrast. The system handles this for its own glass; check that custom glass stays legible.

### Type

- **Text styles:** use `.largeTitle` … `.caption2`, so text scales with Dynamic Type. Don't use fixed point sizes. If a custom size is unavoidable, scale it with `@ScaledMetric` or a relative text style.
- **Font:** use the system font (SF Pro, SF Rounded where it fits). A brand font must still support Dynamic Type.
- **Hierarchy:** comes from text style, weight and `.foregroundStyle(.secondary/.tertiary)`, not from custom grey values.

### Color

- **Semantic colors:** `.primary`, `.secondary`, `Color(.systemBackground)`, `Color(.secondarySystemBackground)` and so on. Dark mode and increased contrast then work automatically.
- **Accent:** set one accent color (the app's tint), and keep it out of decoration.

### Icons

- **Source:** use SF Symbols, sized by the text style they sit next to, not by fixed frames.
- **Rendering:** use hierarchical or palette rendering where it adds clarity.
- **Animation:** use symbol effects for symbol animation (bounce on tap, replace, variable color) instead of custom keyframes.

### Layout

- **Safe areas:** respect them, and let content extend under bars rather than padding around them.
- **Spacing and margins:** use the system's default spacing and list insets unless there's a reason not to. Keep custom padding on a consistent scale.
- **Touch targets:** at least 44×44pt, even when the visible element is smaller.
- **Keyboard:** never cover the field being edited. Use the scroll and keyboard avoidance SwiftUI provides, and dismiss the keyboard interactively on scroll.
- **Content runs edge to edge, and the screen's top and bottom dissolve it.**
  - Scrolling content fills the whole screen and passes under the status bar, the navigation bar, the tab bar and the home indicator.
  - Where it meets the top and bottom of the screen, it gradually blurs and fades, the way iOS does it: a progressive blur that gets stronger toward the edge, while the content's opacity drops.
  - There's never a hard line where content stops. Never solve this by boxing content into a card or panel, or by putting an opaque bar behind the header.
  - On iOS 26 and later this is the system scroll edge effect. Standard navigation bars, toolbars and tab bars apply it automatically, so keep content under them and don't paint backgrounds behind the bars.
  - For a custom header or bottom bar over a scroll view, apply the same system edge effect (its soft style) to that edge instead of drawing your own.
  - Below iOS 26, rebuild it from system parts: a material layer masked by a gradient, so the blur ramps in, plus a matching opacity fade on the content.
  - Don't stack your own blur on top of the system's.

### Motion

- **Animate every state change:** use `withAnimation` or `.animation(_:value:)` so nothing changes instantly.
- **Curves:** use system springs (`.smooth`, `.snappy`; `.bouncy` only for small playful moments). On iOS, springs are the native feel. What to avoid is extra, exaggerated overshoot.
- **Movement between views:** `.transition`, `matchedGeometryEffect` and navigation zoom transitions where the system offers them. `.contentTransition(.numericText())` for changing numbers.
- **Gestures:** let them drive motion directly and stay interruptible.
- **Haptics:** `.sensoryFeedback` on meaningful moments (success, selection change, impact). Don't buzz on every tap.
- **Reduce Motion:** read `accessibilityReduceMotion` and swap movement for fades.

### Accessibility

- **Labels:** every control has an accessibility label. Images and symbols that carry meaning have one, and decorative ones are hidden.
- **Grouping:** related elements are combined (`.accessibilityElement(children: .combine)`) so VoiceOver reads them as one.
- **Real controls:** use `Button` for actions, not `.onTapGesture` on a view, so VoiceOver, keyboard and pointer all work.
- **Large text:** test at the largest Dynamic Type sizes and switch to vertical layouts when text no longer fits.

## React Native

React Native should feel native too. Prefer native-backed building blocks over JavaScript imitations:

### Structure and components

- **Navigation:** use native stack navigation (react-native-screens, Expo Router's native stack) for real platform transitions, swipe-back and large titles.
- **Tabs:** use native tabs where available, so iOS gets the system tab bar (and its Liquid Glass look on iOS 26 and later).
- **System UI:** native sheets, menus, context menus and alerts where libraries expose them. Use the platform's date and time pickers.
- **Touch:** `Pressable` with visible pressed feedback. Avoid the older Touchable components.
- **Symbols:** SF Symbols on iOS through a native symbols module (for example `expo-symbols`), with a matching fallback on Android.
- **Glass and blur:** use a native glass module where available (for example Expo's glass effect view on iOS 26 and later), and fall back to native blur views. Don't fake glass with semi-transparent views and gradients.
- **Native escape hatch:** when the native UI matters more than cross-platform parity, consider rendering SwiftUI views directly (for example through Expo UI).

### Motion

- **Run animations on the UI thread:** use Reanimated (layout animations like `entering`, `exiting` and layout transitions for lists) and Gesture Handler. With the built-in `Animated` API, always set `useNativeDriver: true`.
- **Animate every change:** items added to or removed from lists, expanding rows, appearing errors.
- **Curves:** use springs that feel like the platform: well damped, with no big overshoot.
- **Haptics:** platform haptics (for example `expo-haptics`) on meaningful moments only.
- **Reduce Motion:** read it (`useReducedMotion` or `AccessibilityInfo`) and simplify motion.

### Type and color

- **Font:** the platform's system font by default, or the brand font at matched sizes.
- **Font scaling:** never set `allowFontScaling={false}` on body text. Cap extreme scaling with `maxFontSizeMultiplier` instead of disabling it.
- **Color:** platform colors for system surfaces where possible (`PlatformColor` on iOS), and a light/dark palette that follows `useColorScheme`.

### Layout

- **Safe areas:** use `react-native-safe-area-context`, not hardcoded insets.
- **Keyboard:** handle it with a proper keyboard-aware solution so inputs are never covered.
- **Content runs edge to edge, and the screen's top and bottom dissolve it.**
  - Scrolling content fills the screen and passes under the header, the tab bar and the safe areas.
  - At the top and bottom of the screen it blurs progressively and fades out, as on iOS, instead of stopping at a hard line or sitting inside a box.
  - Native stack headers and native tabs give you the system effect on iOS. Make headers transparent, so content scrolls under them, rather than putting a solid header color behind them.
  - For custom headers or bottom bars, layer a native blur view under a gradient mask (strong at the edge, clear toward the content), and fade the content's opacity over the same band.
  - Never box the scroll content into a card to hide the edge.
- **Long lists:** use virtualized lists (`FlatList`, or FlashList for heavy ones). Never `map` hundreds of rows inside a `ScrollView`.
- **Touch targets:** at least 44×44pt, using `hitSlop` when the visual is smaller.
- **Accessibility:** `accessibilityLabel`, `accessibilityRole` and `accessibilityState` on every interactive element.

## Avoid in apps

- Custom navigation bars, tab bars or back buttons that break swipe-back and system transitions.
- Fake glass made from blur, gradients and white borders where the system glass is available.
- Fixed font sizes that ignore Dynamic Type.
- Hardcoded hex colors for system surfaces, which break dark mode.
- Icons from a web icon set when an SF Symbol exists.
- Tap handlers on plain views instead of buttons.
- Content that stops at a hard line under the header or above the tab bar, or that is boxed into a card to avoid scrolling under them. The screen edges should blur and fade it.
- Solid opaque header or tab bar backgrounds that hide the scroll edge effect.
- Instant state changes: rows that pop in, sheets that cut, numbers that jump.
- Haptics on every touch.
- Spinners for loads that take a fraction of a second, and full-screen spinners where a placeholder in the content's shape would do.
