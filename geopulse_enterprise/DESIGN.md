---
name: GeoPulse Enterprise
colors:
  surface: '#fbf8ff'
  surface-dim: '#d5d8fa'
  surface-bright: '#fbf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f2ff'
  surface-container: '#edecff'
  surface-container-high: '#e5e6ff'
  surface-container-highest: '#dee0ff'
  on-surface: '#161a33'
  on-surface-variant: '#444656'
  inverse-surface: '#2b2f49'
  inverse-on-surface: '#f0efff'
  outline: '#757688'
  outline-variant: '#c5c5d9'
  surface-tint: '#3044f3'
  primary: '#152de4'
  on-primary: '#ffffff'
  primary-container: '#3a4efb'
  on-primary-container: '#e2e3ff'
  inverse-primary: '#bdc2ff'
  secondary: '#00629e'
  on-secondary: '#ffffff'
  secondary-container: '#3ca9ff'
  on-secondary-container: '#003c63'
  tertiary: '#495400'
  on-tertiary: '#ffffff'
  tertiary-container: '#5f6d00'
  on-tertiary-container: '#d7f32d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dfe0ff'
  primary-fixed-dim: '#bdc2ff'
  on-primary-fixed: '#000965'
  on-primary-fixed-variant: '#0020dd'
  secondary-fixed: '#cfe5ff'
  secondary-fixed-dim: '#9acbff'
  on-secondary-fixed: '#001d34'
  on-secondary-fixed-variant: '#004a78'
  tertiary-fixed: '#d4f029'
  tertiary-fixed-dim: '#b9d300'
  on-tertiary-fixed: '#191e00'
  on-tertiary-fixed-variant: '#414b00'
  background: '#fbf8ff'
  on-background: '#161a33'
  surface-variant: '#dee0ff'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: -0.005em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: -0.005em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
  mono-telemetry:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style

This design system powers a mission-critical, enterprise-grade attendance and real-time geofence monitoring workspace. The emotional signature balances clinical operational precision with modern, high-energy software craftsmanship. The interface projects accountability, real-time fidelity, and uncompromising clarity, eliminating cognitive friction for workforce managers who monitor thousands of geofenced locations simultaneously.

The aesthetic blends **Modern Corporate** structure with **High-Contrast Data Density**:
- Crisp, clinical surfaces anchored by deep slate architecture.
- High-voltage kinetic accents denoting live telemetry, perimeter breaches, and verified check-ins.
- Tactile, deliberate border hierarchies using structural ice-gray gridlines instead of muddy drop shadows.
- Generous internal corner curvature nested within rigorous, metric-driven enterprise layouts.

## Colors

The palette pairs high-chroma electric spectral tones with deeply saturated institutional neutrals to communicate continuous verification and real-time telemetry.

### Primary Spectrum
- **Primary Cobalt (`#3A4EFB`)**: Used for authoritative actions, selected navigation states, primary buttons, and verified geofence boundary corridors.
- **Secondary Cyan-Blue (`#33A4FA`)**: Deployed for real-time telemetry pulses, radar sweeps, active GPS breadcrumb lines, and secondary interactive affordances.
- **Tertiary High-Voltage Lime (`#E3FF3B`)**: High-visibility status indicator reserved exclusively for positive validation states: successful check-in triggers, within-bounds verification tags, live-active operational radar badges, and high-impact micro-action anchors.

### Neutral & Structural Grid
- **Neutral / Deep Slate (`#252943`)**: Serves as the primary text color, high-contrast dark container fill, collapsed drawer navigation surface, and telemetry map overlays.
- **Slate Muted (`#646A88`)**: Secondary typography, inactive column labels, and timestamp metadata.
- **Surface Canvas (`#F7F8FC`)**: Off-white operational backdrop delivering distinction behind white dashboard panels.
- **Surface Card (`#FFFFFF`)**: Pure white base for all data cards, metrics tiles, and modal structures.
- **Structural Border (`#DEE0ED`)**: Razor-thin boundary delineating cards, split panes, and tabular rows.
- **Alert Rose (`#FF3B56`)**: Reserved strictly for geofence breaches, spoofing alerts, and automated absence warnings.

## Typography

Typographic scale is powered exclusively by **Inter** to ensure maximum legibility at compact data table scales and dense map sidebars.

- **Tabular Figures**: All numerical metrics, GPS coordinates, timestamps, and active headcounts must use `font-feature-settings: "tnum" 1, "cv05" 1` to prevent layout jitter during real-time telemetry refreshes.
- **Hierarchy Rules**: Primary labels and card headers utilize negative letter tracking for a tight, calibrated tone. Overline headers and telemetry tags use `label-sm` with positive tracking and uppercase transformation.
- **Color Association**: Headlines and dominant metric digits default to `#252943`. Meta captions and secondary status details map to `#646A88`.

## Layout & Spacing

The layout is built upon an adaptive 12-column fluid grid system optimized for information-dense operations.

### Canvas Structure
- **Desktop (1440px+)**: Multi-pane command view featuring a 260px fixed primary navigation rail, a flexible map or tabular data canvas spanning 8 to 9 columns, and a 380px contextual live-feed inspector panel spanning the remaining columns. Outer margins sit at `2rem`, gutters at `1.25rem`.
- **Tablet (768px - 1439px)**: Inspector collapses into a right slide-over sheet. Grid consolidates into 8 columns with `1.25rem` gutters.
- **Mobile (< 768px)**: Single-column stacked orientation with persistent bottom sheet drawers for live site statuses. Outer margin contracts to `1rem` with `0.75rem` vertical spacing gaps.

### Spacing Principles
- Dynamic metrics groupings use tight vertical rhythm (`space-xs` to `space-sm`).
- Complex card components maintain internal cell padding at `space-md` on compact panels and `space-lg` on primary telemetry dashboards.

## Elevation & Depth

Visual hierarchy relies on crisp borders and low-opacity ambient drop-offs tinted with `#252943`, maintaining structure even across ultra-bright monitors.

- **Level 0 (Base Canvas)**: Background at `#F7F8FC`, no shadow, structurally partitioned by `1px solid #DEE0ED`.
- **Level 1 (Card & Module Resting)**: White surface (`#FFFFFF`) framed with `1px solid #DEE0ED`. Shadow: `0 1px 3px rgba(37, 41, 67, 0.04), 0 4px 12px rgba(37, 41, 67, 0.03)`.
- **Level 2 (Hover / Active Cards / Geofence Nodes)**: Elevation lifts subtly. Shadow: `0 4px 16px rgba(58, 78, 251, 0.08), 0 2px 6px rgba(37, 41, 67, 0.06)`. Border sharpens to `#33A4FA` at 50% opacity.
- **Level 3 (Flyout Panels / Command Palette / Geofence Drawers)**: Shadow: `0 12px 32px rgba(37, 41, 67, 0.12), 0 4px 8px rgba(37, 41, 67, 0.04)`, bordered by `1px solid #DEE0ED`.
- **Radar Overlays & Spatial Glows**: Live telemetry points render with a multi-ring diffusion using `#33A4FA` and `#E3FF3B` box-shadow spreads (`0 0 0 4px rgba(51, 164, 250, 0.2)`).

## Shapes

The design uses balanced, modern geometric rounding to humanize data-heavy enterprise UI while preserving structural integrity:

- **Cards & Data Modules**: Defined between `16px` (`rounded-lg`) and `24px` (`rounded-xl`), creating distinct, pillowed content islands.
- **Primary & Secondary Action Controls**: Calibrated between `12px` and `16px` (`0.75rem` to `1rem`), delivering distinct affordance.
- **Status Tags, Verification Indicators, & Live Badges**: Locked to fully rounded pills (`9999px`) to immediately distinguish system states from actionable buttons.
- **Input Fields & Select Triggers**: Standardized to `12px` corner radii.

## Components

### Buttons
- **Primary Action**: `#3A4EFB` background, white text (`Inter 600`), `12px` to `16px` border radius, padding `10px 20px`. Hover: `#2F40D6`. Active: `#2735B8`.
- **High-Impact Validation Trigger**: `#E3FF3B` background with `#252943` text (`Inter 700`). Reserved for instant check-in approvals, geo-radius lock, or active perimeter dispatch.
- **Secondary Action**: White surface, `1px solid #DEE0ED` border, `#252943` label. Hover brings a border shift to `#3A4EFB` and an ambient background tint of `#F7F8FC`.

### Badges & Status Chips
- **Geometry**: Pill-shaped (`9999px`), padding `4px 10px`, typography set to `label-sm`.
- **In-Bounds Verified**: `#E3FF3B` background with deep slate `#252943` label, preceded by a pulsing 6px `#252943` dot.
- **Real-Time Active Tracking**: Subtle Cyan tint (`rgba(51, 164, 250, 0.12)`), `#0B72BF` text, with an animated `#33A4FA` radar ping.
- **Geofence Breach**: Light rose fill (`rgba(255, 59, 86, 0.1)`), `#FF3B56` text and border.

### Live Radar Indicator
- A composite component consisting of an 8px static core and an outer concentric ring that animates from `scale(1)` with `opacity: 0.8` to `scale(2.4)` with `opacity: 0`, cycling every 1.8 seconds.
- Color shifts contextually: `#E3FF3B` inside verified perimeter, `#33A4FA` in transit, `#FF3B56` for perimeter violation.

### Input Fields & Controls
- **Height**: 40px standard enterprise height.
- **Surfaces**: Crisp white card backdrop with `1px solid #DEE0ED` borders and `12px` border radius. Focus state drives a distinct 2px focus ring of `#3A4EFB` offset by 1px pure white space.
- **Checkboxes & Radios**: 18px dimensions with 6px border radius (checkboxes) and full circle (radios). Checked fill is `#3A4EFB` with crisp white iconography.

### Data Tables & List Rows
- **Header**: `#252943` at 70% opacity, `label-sm` uppercase, pinned with a solid `1px solid #DEE0ED` bottom baseline.
- **Row Styling**: 52px fixed height, alternating zero-fill with clean hover highlight `#F7F8FC`. Coordinates, times, and device IDs utilize tabular numeric formatting.

### Cards & Geofence Perimeter Panels
- **Structure**: White base (`#FFFFFF`), `16px` to `24px` roundedness, wrapped in `1px solid #DEE0ED`.
- **Header Zone**: Displays the geofence site name, radius badge (e.g., `500m Safe Zone`), and live headcount counter grouped compactly at top-right.