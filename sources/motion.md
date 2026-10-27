# Motion

Patterns observed across the sites in the [library](library/README.md).

- **`(.22,1,.36,1)` is the shared default.** libraries.dev uses only this curve; it's also the base in Transitions.dev, Bencho, Backdrop and Mobbin.
- **Named easing tokens.** Spotted in Prod, mkdir and Designeer give their curves role names (snappy, swift, lift, swap, morph, drawer) instead of numbers.
- **iOS sheet curve for drawers.** 21st.dev, Built by Designers, Designeer and Sketch Tools use `(.32,.72,0,1)` for drawers.
- **Close faster than open.** libraries.dev opens dropdowns in 250ms and closes them in 150ms, scaling from .97. Transitions.dev uses press scales of .96–.99.
- **Reduced motion is the norm.** Mobbin, Spotted in Prod and loading.dev handle it throughout.
