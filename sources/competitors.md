# Competitor coverage

Seven popular design skills compared against `skills/taste/rules.md` on 2026-10-27. This covers scope only. The only rules reused are Vercel's Web Interface Guidelines (MIT, credited); nothing is taken from the style-imposing skills.

## Coverage

none · light · deep

| Skill | Stance | Color | Hierarchy | Spacing | Radius | Icons | Motion | Flash / shift | States | Copy | A11y | Anti-slop | Self-check |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Anthropic frontend-design | Pushes bold direction | light | light–deep | light | light | none | light, discourages hover-everywhere | none | light | deep | light | deep | light, optional |
| Vercel web-design-guidelines | Neutral, review only | light | light | light | none | light | light, technical | light | deep | light | deep | none | medium, static |
| taste-skill | Imposes researched styles | deep | deep | deep | light–medium | light–medium | deep, spectacle | medium | deep | deep | medium | deep | deep, browser |
| ui-ux-pro-max | Imposes style catalog | deep | deep | deep | light | deep | deep, one "no snap" line | deep | deep | light | deep | light | light, checklist |
| impeccable | Leans to bold direction | deep | deep | deep | light | light | deep, "must earn its place" | light | deep | deep | deep | deep | deep, detector + render |
| kill-ai-slop | Neutral, subtractive | light | light | light | deep | light | light | none | none | light | none | deep | light, grep |
| hallmark | Imposes themes | deep | deep | deep | deep | light | deep, minimalist | deep | deep | deep | deep | deep | deep, lint + screenshots |

## What none of them claim

1. **Smooth motion as the core bar.** The others say motion must earn its place, or treat it as spectacle. None makes "nothing on screen changes abruptly" the rule under everything. Easing every small state change is required by no one; it appears only as one line among about 200 in ui-ux-pro-max.
2. **No flashes at all.** White flashes between pages or themes, screens that arrive all at once, and content that swaps instead of morphing aren't covered.
3. **Brand-neutral and generative together.** The style-imposing skills override a project's look, and the neutral ones only review or subtract.
4. **Title and description pairing.** No skill has an explicit rule.
5. **Icons sized to the text beside them.** No skill states this as a principle; hallmark only gives fixed sizes.
6. **Watermark-like clutter.** Others stop at eyebrows, ordinals and status dots. Corner captions, coordinates, crosshairs and grid marks go uncovered.
7. **A light self-check that tests motion.** The strong skills check renders and contrast, but none checks for snaps, flashes, load shift or enter/exit timing.

## Already covered elsewhere

Concentric radii (kill-ai-slop, hallmark), no eyebrow or tracked-caps labels (frontend-design, impeccable, kill-ai-slop, hallmark, taste-skill), contrast ratios, states and accessibility are common ground. They still belong in our rules, but they don't set us apart.

## Conflict to settle

hallmark and common accessibility practice keep the focus ring instant. Our motion rule lists focus among the states that transition.
