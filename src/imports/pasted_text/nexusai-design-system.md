# 🎯 SYSTEM PROMPT FOR FIGMA AI

Copy and paste this entire prompt into your Figma AI code generator or design-to-code tool:

---

### PRIMARY PROMPT

```
You are creating a complete design system and component library for NexusAI, 
an autonomous vehicle dashboard application built with React 18, Tailwind CSS 4, 
and Radix-UI components.

PROJECT NAME: NexusAI Smart Vehicle System Dashboard
TARGET PLATFORM: React + TypeScript + Tailwind CSS
DESIGN TOKENS: CSS variables and Tailwind configuration
COMPONENT FRAMEWORK: Radix-UI primitives with custom styling

DESIGN SYSTEM REQUIREMENTS:
All components must use the design tokens specified below. No hard-coded colors or spacing.
All components must be fully accessible (WCAG 2.1 AA compliant).
All components must support responsive design (xs, sm, md, lg, xl breakpoints).
All components must support light and dark modes.
```

---

## COLOR PALETTE SPECIFICATION

### Primary Colors
- **Cyan-50:** #CFFAFE
- **Cyan-100:** #A5F3FC
- **Cyan-500:** #06B6D4 (Primary brand)
- **Cyan-600:** #0891B2 (Hover)
- **Cyan-900:** #164E63

### Secondary Colors
- **Blue-500:** #3B82F6 (Light theme)
- **Blue-600:** #2563EB (Hover)

### Semantic Colors
- **Green-500:** #22C55E (Success, operational)
- **Amber-500:** #F59E0B (Warning, caution)
- **Red-500:** #EF4444 (Danger, error)

### Neutral Palette
- **Neutral-50:** #F8FAFC
- **Neutral-100:** #F1F5F9
- **Neutral-200:** #E2E8F0
- **Neutral-300:** #CBD5E1
- **Neutral-400:** #94A3B8
- **Neutral-500:** #64748B
- **Neutral-600:** #475569
- **Neutral-700:** #334155
- **Neutral-800:** #1E293B
- **Neutral-900:** #0F172A
- **Neutral-950:** #020617

### Dark Mode Colors
- **Emerald-400:** #10B981 (replaces Cyan for dark mode)
- **Amber-400:** #FBBF24 (warm alternative)
- **Slate-900:** #0F172A (dark background)
- **Slate-800:** #1E293B (dark surfaces)

**Usage Guidelines:**
- Text: Use Neutral-700 (light) / Neutral-100 (dark)
- Backgrounds: Use Neutral-50 (light) / Slate-900 (dark)
- Status indicators: Never use color alone - always pair with icons/text
- Minimum contrast: 4.5:1 for text, 3:1 for UI components (WCAG AA)

---

## TYPOGRAPHY SYSTEM

### Font Stack
Primary: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`

### Typography Styles

#### Display - H1
- Size: 48px (desktop) / 32px (mobile)
- Weight: Bold (700)
- Line Height: 1.2 (57.6px)
- Letter Spacing: -0.5px

#### Display - H2
- Size: 32px (desktop) / 24px (mobile)
- Weight: Semibold (600)
- Line Height: 1.2 (38.4px)
- Letter Spacing: -0.25px

#### Display - H3
- Size: 24px (desktop) / 20px (mobile)
- Weight: Semibold (600)
- Line Height: 1.25 (30px)
- Letter Spacing: 0px

#### Body - Regular
- Size: 16px
- Weight: Regular (400)
- Line Height: 1.5 (24px)
- Letter Spacing: 0px

#### Body - Small
- Size: 14px
- Weight: Regular (400)
- Line Height: 1.5 (21px)
- Letter Spacing: 0px

#### Label
- Size: 13px
- Weight: Medium (500)
- Line Height: 1.5 (20px)
- Letter Spacing: 0.5px

#### Caption
- Size: 11px / 10px
- Weight: Medium (500)
- Line Height: 1.4 (15px)
- Letter Spacing: 0.1em (uppercase)

#### Monospace - Metrics
- Size: 28px - 48px
- Weight: Semibold (600)
- Font: JetBrains Mono (or monospace fallback)

---

## SPACING & GRID SYSTEM

### Spacing Scale (8-point grid)
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px
- 4xl: 96px

### Responsive Breakpoints
- xs: 375px (mobile phones)
- sm: 640px (tablets portrait)
- md: 768px (tablets landscape)
- lg: 1024px (small laptops)
- xl: 1280px (desktop)
- 2xl: 1536px (large desktop)

### Grid Layout
- 12-column grid
- Gutter: 24px (lg) between columns
- Margin: 24px (lg) on sides, 16px on mobile

---

## SHADOW SYSTEM

```
sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
md: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
lg: 0 4px 20px rgba(59, 130, 246, 0.06)
xl: 0 8px 30px rgba(16, 185, 129, 0.06)
elevated: 0 4px 20px rgba(59, 130, 246, 0.1)
prominent: 0 8px 32px rgba(59, 130, 246, 0.15)
interactive: 0 2px 8px rgba(0, 0, 0, 0.08)
```

---

## ANIMATION & TRANSITION TIMING

```
Fast: 150ms ease-out
Base: 200ms ease-out
Slow: 300ms ease-out
Smooth: 250ms cubic-bezier(0.4, 0, 0.2, 1)
```

### Common Animations
- Button hover: scale 1.02 over 150ms
- Button click: scale 0.98 (pressed effect)
- Modal enter: fade-in + slide-up over 300ms
- Modal exit: fade-out + slide-down over 200ms
- Status pulse: opacity [1, 0.5, 1] over 2s infinite
- Focus ring: fade-in over 200ms

---

## COMPONENT SPECIFICATIONS

### 1. BUTTON COMPONENT

**Variants:** Primary, Secondary, Danger, Ghost  
**Sizes:** Small (32px), Medium (40px), Large (48px)

#### Primary Button
```
Default:  BG: Cyan-500, Text: White
Hover:    BG: Cyan-600, Scale: 1.02
Active:   BG: Cyan-700, Scale: 0.98
Disabled: BG: Neutral-200, Text: Neutral-400, Opacity: 0.5
Focus:    Ring: 2px Cyan-500/50, Offset: 2px
```

#### Secondary Button
```
Default:  Border: 1px Cyan-500, Text: Cyan-500, BG: Transparent
Hover:    BG: Cyan-50
Active:   BG: Cyan-100
Disabled: Border: 1px Neutral-300, Text: Neutral-400
```

#### Danger Button
```
Default:  BG: Red-500, Text: White
Hover:    BG: Red-600
Active:   BG: Red-700
Disabled: BG: Red-200, Text: Red-400
```

**All Buttons Must Have:**
- Visible focus ring (2px Cyan-500/50)
- Hover scale animation (150ms)
- Disabled state (opacity 0.5, cursor not-allowed)
- Loading state (spinner icon, text opacity 0.6)
- Semantic `<button>` element
- aria-label for icon-only buttons

---

### 2. NAVBAR COMPONENT

**Layout:** Sticky horizontal bar, 3 sections (left, center, right)

#### Left Section
- Logo: 40x40px with Cyan gradient background
- Branding: "NEXUS AI" text + "Smart Vehicle System" subtitle
- Responsive: Shrinks on mobile

#### Center Section (Hidden on xs/sm)
- Vehicle model: "Tesla Model S" in pill-shaped badge
- Status dot: Green pulsing indicator
- Background: Neutral-100/80 with backdrop-blur

#### Right Section (Responsive)
```
Desktop (lg+):  AI Status | Weather | Notifications | Time | Profile | Theme
Tablet (md):    Notifications | Profile | Theme
Mobile (xs/sm): Notifications | Theme only
```

**Specifications:**
- Height: 64px
- Padding: 16px (lg) / 12px (md) / 8px (xs)
- Background: Neutral-50/80 (light) / Slate-900/80 (dark) with backdrop-blur
- Border: 1px Neutral-200/50 (light) / Slate-700/50 (dark)
- Z-index: 40 (sticky positioning)

**Interactive Elements:**
- Notification bell: Shows red dot if unread, opens dropdown on click
- Profile icon: Opens user menu dropdown
- Theme toggle: Switches between light/dark mode with animation
- AI Status badge: Shows current AI state (Active/Inactive)

**Responsive Behavior:**
```
xs (<640px):  Hide weather, hide time, hide profile label, compress gaps
sm (640-768px): Hide time, show notifications
md (768-1024px): Show all except time on very small screens
lg+ (1024px+): Full layout, all elements visible
```

---

### 3. VEHICLE STATUS COMPONENT

**Layout:** Speedometer (left) + Status icons + Gear selector (right)

#### Speedometer (100x100px)
```
Background Ring:  Border: 10px Neutral-200/20
Active Arc:       Border: 10px, colors: Blue-500 (light) / Emerald-400 (dark)
                  Rotate: 42deg based on speed (0-180°)
Inner Circle:     Background: Neutral-800/40 with backdrop-blur
                  Display: Large speed number (72) + unit (km/h)
```

#### Speed Display
- Size: 48px (monospace)
- Color: Foreground color
- Value: Number 0-200+
- Unit: "km/h" caption

#### Status Icons (Right side, 4 items)
```
Icon 1: BatteryCharging - Active: Cyan background/icon, Inactive: Gray
Icon 2: Navigation - Active: Cyan, Inactive: Gray
Icon 3: BatteryCharging - Active: Cyan, Inactive: Gray
Icon 4: Waves - Active: Cyan, Inactive: Gray

Active Style:    BG: Blue-500/12, Text: Blue-500, Shadow: 0 0 18px rgba(59,130,246,0.15)
Dark Mode:       BG: Emerald-400/12, Text: Emerald-400, Shadow: 0 0 22px rgba(16,185,129,0.15)
Inactive Style:  Text: Neutral-600/50
```

#### Gear Selector Strip (Bottom)
```
Background:  Neutral-800/30 with backdrop-blur, rounded-2xl, border: 1px Neutral-700/20
Layout:      4 equal-width buttons (P, R, N, D)
Active Gear: Text: Cyan-500, Scale: 1.1
Other Gears: Text: Neutral-600/50, opacity 0.7
```

**Responsive Behavior:**
```
xs/sm:  Speedometer: 80x80px, Icons: 36x36px, Stack layout
md:     Speedometer: 100x100px, Icons: 48x48px, Side layout
lg+:    Full size, standard layout
```

**Accessibility:**
- Speedometer aria-label: "Current speed: 72 km/h"
- Status icons: Role="button", aria-pressed, aria-label
- Gear selector: Role="group" aria-label="Transmission gear", keyboard nav with arrow keys
- All elements keyboard accessible (Tab + arrow keys)

---

### 4. VEHICLE CONTROLS COMPONENT

**Layout:** 8 equal-width control buttons in horizontal flex row

**Controls:**
1. AC (Air Conditioning)
2. Seat (Heating/Cooling)
3. Ambient (Lighting)
4. Camera (Reverse view)
5. Hazard (Warning lights) - SAFETY CRITICAL
6. Lock (Door locks) - SAFETY CRITICAL
7. Wifi (Connectivity)
8. More (Additional controls)

#### Control Button Style
```
Size:       72px height, flex: 1 width
Padding:    8px (icon area) + 4px (label)
Rounded:    16px (xl)
Icon:       24x24px
Label:      10px, tracking-wide, uppercase

Active State:
  BG:       Blue-500/10 (light) or Emerald-400/10 (dark)
  Text:     Blue-500 (light) or Emerald-400 (dark)
  Shadow:   0 0 18px rgba(59,130,246,0.1)
  Hover:    Scale 1.02, stronger shadow

Inactive State:
  BG:       Transparent
  Text:     Neutral-600/60
  Opacity:  0.6

Danger (Hazard):
  BG:       Red-500/10
  Text:     Red-400
  Shadow:   0 0 18px rgba(239,68,68,0.12)
  Requires: Confirmation dialog
```

#### AC Popup Temperature Control
```
Position:      Above AC button, centered horizontally
Size:          120px width, 56px height
Rounded:       16px (2xl)
Background:    White/80 (light) or Slate-800/90 (dark) with backdrop-blur
Border:        1px Neutral-200/50 (light) or Neutral-700/50 (dark)
Shadow:        md shadow

Layout:        [−] [22°C] [+]
Buttons:       32x32px with minus/plus symbols
Font:          14px, medium weight

Temperature Range: 16°C - 30°C (enforced bounds)
Animation:     Fade-in 200ms + slide-up 16px
Dismiss:       Click outside, click AC again, or Escape key
```

#### Safety Confirmations (Hazard & Lock)

**Hazard Confirmation Dialog:**
```
Title:       "Enable Hazard Lights?"
Message:     "This will activate your vehicle's hazard warning system."
Icon:        AlertTriangle (red)
Buttons:     [Cancel] [Enable]
Auto-close:  No (requires user action)
Color:       Red theme
```

**Lock Confirmation Dialog:**
```
Title:       "Lock All Doors?"
Message:     "All vehicle doors will be locked."
Icon:        Lock icon
Buttons:     [Cancel] [Lock]
Auto-close:  No (requires user action)
```

**Responsive Behavior:**
```
xs (<640px):  Stack 2x4 layout, AC popup repositioned below button
sm (640-768px): Stack 2x4 layout, AC popup adjusted
md (768px+):  1x8 horizontal layout, standard AC popup positioning
```

**Accessibility:**
- All controls: Semantic `<button>` elements
- All controls: aria-label describing action + current state
- AC popup: Dialog role, focus trap, keyboard accessible
- Temperature: aria-live region for value updates
- Safety dialogs: AlertDialog role with focus management
- All: Keyboard operable (Tab navigation, Enter/Escape to activate)

---

### 5. AI CENTER (NAVIGATION VISUALIZATION)

**Layout:** Full-height visualization container with interactive overlays

#### Background Elements

**Grid Pattern:**
```
SVG or CSS pattern overlay
Opacity:    6%
Color:      Foreground
Grid size:  36px x 36px
```

**Radar Rings (3 concentric circles):**
```
Outer:      280px diameter
Middle:     220px diameter
Inner:      160px diameter
Border:     1px solid
Color:      Blue-500/10 (light) or Emerald-400/10 (dark)
```

**Lane Guides (2 vertical dashed lines):**
```
Left lane:  36% from left edge
Right lane: 36% from right edge
Border:     1px dashed, foreground/10
Height:     Full container height
```

**Route Path (center vertical line):**
```
Position:   Center horizontal
Height:     Full container
Width:      2px
Color:      Blue-500/30 (light) or Emerald-400/30 (dark)
```

#### Vehicle Indicator (Center-Bottom)
```
Position:   Center-bottom (50% x ~35% from bottom)
Size:       64x96px
Rounded:    24px
Background: Blue-500/10 (light) or Emerald-400/10 (dark)
Border:     1px Blue-500/40 or Emerald-400/40
Icon:       Car icon (28x28px), Blue-500 or Emerald-400
Animation:  Subtle pulse, 2s repeat, opacity [1, 0.7, 1]
```

#### Detection Labels

**Vehicle Detection:**
```
Position:   26% from top, 32% from left
Size:       ~60x20px
Border:     1px Amber-400/40
Text:       "Vehicle", 9px, tracking-wide, Amber-400
Background: Transparent
```

**Park Assist:**
```
Position:   24% from bottom, 18% from right
Icon:       Radar icon (12x12px)
Text:       "Park Assist", 9px
Color:      Blue-500 (light) or Emerald-400 (dark)
```

#### HUD Telemetry Display

**Top-Right Corner:**
```
Destination
Downtown Hub

Font:       12px, semi-bold
Color:      Foreground
```

**Top-Left Corner:**
```
🧭 Route Optimized
📍 Lane Tracking Active

Font:       10px, tracking-wide
Color:      Muted foreground
```

**Bottom Footer:**
```
ETA: 18m | Traffic: Moderate | Weather: 24°

Font:       10px, tracking-wide, uppercase
Layout:     Flex space-between
Color:      Muted foreground + values in primary color
```

**Responsive Behavior:**
```
xs/sm:  Visualization height: 60% of container, text smaller
md:     Visualization height: 80% of container
lg+:    Visualization height: 100% (minus footer)
```

**Accessibility:**
- Main container: role="img" aria-label with full description
- Description: "AI navigation visualization: Route to [destination], ETA [time] minutes. Three radar detection rings. Vehicle centered. Lane tracking active. [Additional details]."
- Text alternative: sr-only div with all telemetry data
- Detection labels: Optional keyboard navigation to expand details

---

### 6. DRIVER MONITOR COMPONENT

**Layout:** Split view - Webcam feed (left) + Status cards (right)

#### Webcam Section
```
Size:           Responsive, aspect ratio 16:9 or 4:3
Rounded:        24px (xl)
Background:     Black
Border:         1px Neutral-200/50 (light) or Neutral-700/50 (dark)
Content:        Live video from React Webcam component

Privacy Indicator (when camera on):
  Position:     Top-right corner
  Style:        3px red dot (pulsing)
  Animation:    Opacity [1, 0.6, 1] every 2 seconds
  Label:        "Camera On" (visible on hover)
  Audio alert:  Optional beep on activation
```

#### Status Cards Grid (2x2 or 1x4)
```
Card Specs:
  Padding:      16px (md)
  Rounded:      16px (lg)
  Background:   Neutral-100/50 (light) or Neutral-900/50 (dark) with backdrop-blur
  Border:       1px Neutral-200/50 or Neutral-700/50

Layout:
  xs/sm:        2x2 grid, full width
  md:           2x2 grid with webcam side
  lg:           2x2 or 4x1 depending on space
  xl:           4x1 horizontal layout
```

#### Status Cards (4 total)

**Card 1: AI Status**
```
Label:    "AI Status"
Icon:     Target icon (24x24px)
Values:   "Scanning" / "Driver Detected" / "Drowsiness Detected" / "No Driver"
Colors:   
  Scanning:             Cyan-500
  Detected:             Green-500
  Drowsy:               Red-500
  Not detected:         Gray
Font:     Label: 11px medium uppercase, Value: 18px semibold
```

**Card 2: Driver Attention**
```
Label:    "Driver Attention"
Icon:     Eye icon (24x24px)
Values:   Percentage (95%) or status (Drowsy)
Colors:   Green-500 (good), Red-500 (drowsy)
Font:     Same as above
```

**Card 3: Face Count**
```
Label:    "Face Count"
Icon:     Camera icon (24x24px)
Values:   Number (1, 2, etc.)
Colors:   Cyan-500 (detected), Red-500 (not detected)
Font:     Same as above
```

**Card 4: Posture Status**
```
Label:    "Posture Status"
Icon:     Circle icon (24x24px)
Values:   "Good" / "Unknown"
Colors:   Green-500 (good), Gray (unknown)
Font:     Same as above
```

#### Drowsiness Alert Overlay
```
Trigger:       isDrowsy === true
Animation:     Fade-in + scale 0.95 → 1 over 200ms
Style:         Full-width red banner
Background:    Red-500 gradient to Red-600
Text Color:    White
Content:       
  Icon:        ⚠️ (warning emoji)
  Title:       "DROWSINESS DETECTED"
  Message:     "Rest recommended immediately"
  Font:        Title: 16px bold, Message: 14px regular

Behavior:
  Duration:    Persistent until acknowledged
  Sound alert: Yes (beep audio)
  Auto-dismiss: No (requires user action)
  Action:      "Acknowledged" button to dismiss
```

#### Compact Toggle Button
```
Position:      Bottom-right corner
Icon:          Minimize2 (compact) / Maximize2 (expand)
Size:          40x40px
Label:         aria-label="Toggle monitor size"
Behavior:      Collapses/expands monitor display
```

#### Permission Request UI (Before Mounting)
```
Title:       "Camera Access Required"
Message:     "NexusAI needs camera access to monitor driver behavior for safety."
Subtext:     "We only process this locally on your device. No data is sent to servers."

Buttons:
  Primary:   "Allow Camera Access" (Cyan-500 background)
  Secondary: "Not Now" (outline style)

Responsive:  Center modal on all screen sizes
```

**Responsive Behavior:**
```
xs/sm:  Stack vertically (webcam 50% height, cards below)
md:     Side-by-side (webcam 50% width, cards on right)
lg+:    Optimized horizontal layout
```

**Accessibility:**
- Webcam: aria-label="Live camera feed for driver monitoring"
- Privacy indicator: role="img" aria-label="Camera is active"
- Status cards: aria-live="polite" aria-atomic="true" for updates
- Drowsiness alert: role="alert", keyboard accessible with focus on dismiss button
- All elements: Keyboard operable (Tab navigation)

---

### 7. ALERT PANEL COMPONENT

**Layout:** Voice assistant card + System alerts (4 cards)

#### Voice Assistant Card
```
Title:       "Voice Assistant"
Subtitle:    "Ready to assist"
Icon:        Microphone (24x24px) in Cyan-500 circle (40x40px)
Background:  Gradient-to-br from-Cyan-500/10 to-Blue-500/10
Border:      1px Cyan-200/50 (light) or Cyan-900/50 (dark)
Padding:     lg (24px)
Rounded:     2xl (16px)

Waveform Animation:
  Bars:       20 vertical bars
  Height:     Variable, 20% - 100%
  Color:      Gradient cyan-500 → blue-500
  Animation:  Staggered, each bar delayed 50ms
  Duration:   1s per cycle, infinite loop
  Easing:     easeInOut
  Sync:       Should ideally sync with audio input (real implementation)
```

#### System Alert Cards (4 cards below, stacked)

**Alert Card Structure:**
```
Padding:      lg (24px)
Rounded:      2xl (16px)
Border:       1px colored border
Background:   Gradient-to-br color-500/10
Icon:         40x40px circle background with icon

Layout:       Icon (left) + [Title, Message] (center) + Close (right)
Icon area:    40x40px circle, background: color-500
Title:        16px semibold, foreground
Message:      14px regular, muted-foreground
Close:        X button, top-right
```

**Alert 1: AI Assistant Active (Green)**
```
Icon:         CheckCircle
Title:        "AI Assistant Active"
Message:      "All systems operational"
Colors:       Green-500 (icon bg), Green-200 border (light) / Green-900 (dark)
Background:   Green-500/10
```

**Alert 2: Driver Focus (Blue)**
```
Icon:         Info
Title:        "Driver Focus"
Message:      "Attention level optimal"
Colors:       Blue-500, Blue-200 border (light) / Blue-900 (dark)
Background:   Blue-500/10
```

**Alert 3: Rest Suggestion (Amber)**
```
Icon:         AlertTriangle
Title:        "Rest Suggestion"
Message:      "Consider a break in 45 minutes"
Colors:       Amber-500, Amber-200 border (light) / Amber-900 (dark)
Background:   Amber-500/10
```

**Alert 4: Navigation (Cyan)**
```
Icon:         Navigation
Title:        "Navigation"
Message:      "Route optimized for efficiency"
Colors:       Cyan-500, Cyan-200 border (light) / Cyan-900 (dark)
Background:   Cyan-500/10
```

**Animation:**
```
Enter:        Fade-in (0→1) + slide-up (20px) over 300ms ease-out
Exit:         Fade-out (1→0) + slide-down (-20px) over 200ms ease-out
```

**Responsive Behavior:**
```
xs/sm:  Stack vertically, full width minus padding
md+:    Display in grid or flex layout
```

**Accessibility:**
- Container: role="region" aria-label="Alerts and notifications"
- Each card: Close button has aria-label="Dismiss [alert title]"
- Alert content: Semantic structure with title > message hierarchy
- Dynamic alerts: aria-live="polite" when alerts change

---

### 8. NOTIFICATION SYSTEM

**Style:** Toast notifications, top-right corner, stacking

#### Toast Notification
```
Position:       Top-right corner, 16px margin from edges
Max width:      400px
Padding:        md (16px)
Rounded:        lg (16px)
Background:     Neutral-50 (light) or Slate-800 (dark) with backdrop-blur
Border:         1px Neutral-200 (light) or Slate-700 (dark)
Shadow:         md shadow
Z-index:        1500 (toasts)

Layout:         [Icon] [Title + Message] [Close (X)]
Icon:           20x20px, colored by type
Title:          14px semibold, one line
Message:        13px regular, one line (or two lines max)
Close button:   16x16px X icon, optional

Max visible:    3 toasts stacked vertically
Stack gap:      8px between toasts
```

#### Toast Types

**Success (Green):**
```
Icon:          CheckCircle
Background:    Green-50 or Green-950 (dark)
Text:          Green-700 or Green-100 (dark)
Border:        1px Green-200 or Green-800
```

**Info (Blue):**
```
Icon:          Info
Background:    Blue-50 or Blue-950 (dark)
Text:          Blue-700 or Blue-100 (dark)
Border:        1px Blue-200 or Blue-800
```

**Warning (Amber):**
```
Icon:          AlertTriangle
Background:    Amber-50 or Amber-950 (dark)
Text:          Amber-700 or Amber-100 (dark)
Border:        1px Amber-200 or Amber-800
```

**Error (Red):**
```
Icon:          AlertCircle
Background:    Red-50 or Red-950 (dark)
Text:          Red-700 or Red-100 (dark)
Border:        1px Red-200 or Red-800
```

#### Auto-dismiss Timing
```
Success:       3-5 seconds
Info:          3-5 seconds
Warning:       5-10 seconds
Error/Critical: 10 seconds or no auto-dismiss
Manual dismiss: X button always available
```

**Animation:**
```
Enter:         Fade-in + slide-in from right over 200ms
Exit:          Fade-out + slide-out to right over 150ms
```

**Responsive Behavior:**
```
xs:            Full width minus 16px padding
sm+:           Max 400px width, positioned top-right corner
```

**Accessibility:**
- Container: role="status" aria-live="polite" aria-atomic="true"
- Close button: aria-label="Dismiss [notification type]"
- Each toast: Keyboard accessible, Tab to close button, Enter to dismiss

---

### 9. NAVBAR DROPDOWN MENUS

#### Notification Dropdown
```
Trigger:       Bell icon with badge
Position:      Below navbar, right-aligned to bell icon
Width:         320px
Max height:    400px (scrollable)
Background:    Neutral-50 (light) / Slate-800 (dark)
Border:        1px Neutral-200 (light) / Slate-700 (dark)
Rounded:       lg (16px)
Shadow:        lg shadow
Z-index:       1000 (dropdown layer)

Content:
  Header:      "Notifications" (14px semibold)
  Items:       List of notifications (max 5, scroll for more)
  Footer:      "View All" link / "Clear All" button

Notification Item:
  Padding:     md (16px)
  Border:      Bottom 1px divider (except last)
  Hover:       BG: Neutral-100 (light) / Slate-700 (dark)
  Left Border: 3px Cyan-500 if unread
  Content:     Icon + Title + Time + Message
  Action:      Mark as read / Dismiss on click
```

#### Profile Dropdown Menu
```
Trigger:       User icon + "Driver" label
Position:      Below navbar, right-aligned
Width:         200px
Background:    Neutral-50 (light) / Slate-800 (dark)
Border:        1px Neutral-200 (light) / Slate-700 (dark)
Rounded:       lg (16px)
Shadow:        lg shadow
Z-index:       1000

Menu Items:
  1. Profile Settings       (click → navigate to /profile)
  2. Vehicle Settings       (click → navigate to /vehicle)
  3. Preferences            (click → navigate to /preferences)
  ─────────────────────────── (divider)
  4. Help & Support         (click → open help modal)
  5. About                  (click → open about modal)
  ─────────────────────────── (divider)
  6. Logout                 (click → logout)

Item Style:
  Padding:     md (16px) md (16px)
  Hover:       BG: Neutral-100 (light) / Slate-700 (dark)
  Font:        14px regular
  Icon:        16x16px, left side
```

#### Theme Toggle
```
Trigger:       Sun (light mode) / Moon (dark mode) icon
Behavior:      Direct toggle on click (no dropdown)
Animation:     Icon rotates 180° over 300ms
Effect:        Entire app theme switches
```

**Accessibility (All Dropdowns):**
- Button: aria-expanded, aria-haspopup="menu"
- Container: role="menu"
- Items: role="menuitem"
- Keyboard: Arrow keys to navigate, Enter/Space to activate, Escape to close
- Focus: Focus trap within dropdown, closes on blur

---

## RESPONSIVE DESIGN SPECIFICATIONS

### Breakpoint Strategy

#### XS (375px - Mobile Phone)
```
Grid:          4 columns
Gutter:        16px
Margin:        16px sides
Font scale:    0.9x
Components:    Stack vertically where needed
Navbar:        Minimal icons only
Navigation:    Hidden drawer (slide-in)
Modals:        Full screen with 16px padding
Tooltips:      Below element, constrained to viewport
```

#### SM (640px - Tablet Portrait)
```
Grid:          8 columns
Gutter:        20px
Margin:        20px sides
Font scale:    0.95x
Components:    2-column layouts possible
Navbar:        Show more info, hide some right elements
Navigation:    Visible at side
Modals:        80% width, centered
```

#### MD (768px - Tablet Landscape)
```
Grid:          12 columns
Gutter:        24px
Margin:        24px sides
Font scale:    1x
Components:    Multi-column layouts
Navbar:        Full layout
Navigation:    Full sidebar
Modals:        Centered, max 500px width
```

#### LG (1024px - Small Laptop)
```
Grid:          12 columns
Gutter:        24px
Margin:        32px sides
Font scale:    1x
Components:    Optimized multi-column
Navbar:        Full layout with all elements
Navigation:    Full sidebar visible
Content:       Max-width containers
```

#### XL (1280px+) & 2XL (1536px+)
```
Grid:          12 columns
Gutter:        32px
Margin:        40-48px sides
Font scale:    1x
Components:    Full-width optimized
Spacing:       Generous spacing
Content:       Full-width with max-width constraints
```

### Mobile-First Implementation
- Start with xs styles (mobile)
- Progressively enhance for larger screens
- Use Tailwind responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`

---

## DARK MODE SPECIFICATION

### Implementation
- CSS variables with light/dark values
- Toggle in navbar (Sun/Moon icon)
- Persist preference in localStorage
- Smooth transition (200ms) between modes
- All components support both modes

### Color Overrides (Dark Mode)
```
Primary:       Cyan-500 → Emerald-400
Secondary:     Blue-500 → Amber-400
Background:    Neutral-50 → Slate-900
Surface:       Neutral-100 → Slate-800
Text:          Neutral-900 → Neutral-50
Text secondary: Neutral-600 → Neutral-400
Border:        Neutral-200 → Slate-700

All shadows use dark-compatible colors
All hover states adjust for dark mode
Contrasts maintained at 4.5:1 ratio
```

---

## ACCESSIBILITY REQUIREMENTS

### WCAG 2.1 Level AA Compliance

#### Keyboard Navigation
- All interactive elements must be reachable via Tab key
- Tab order must be logical (left-to-right, top-to-bottom)
- Focus indicators must be visible (2px ring, Cyan-500)
- Escape key closes modals/dropdowns
- Arrow keys navigate menus/selects

#### Screen Reader Support
- Semantic HTML (`<button>`, `<input>`, `<label>`)
- aria-labels on icon-only buttons
- aria-live regions for dynamic content
- role attributes where needed (menu, status, etc.)
- alt-text descriptions for icons

#### Color & Contrast
- Text contrast minimum 4.5:1 (WCAG AA)
- UI components minimum 3:1 contrast
- Never rely on color alone (pair with icons/text)
- Status indicated by icon + color + text

#### Motor & Accessibility
- Touch targets minimum 48x48px
- No hover-only interactions (provide keyboard alternative)
- No time-based actions (or provide extension)
- No flashing elements (> 3 per second)

#### Motion & Animation
- Support `prefers-reduced-motion` media query
- Option to disable animations
- No auto-playing animations
- Smooth, non-jarring transitions

---

## STATE MANAGEMENT & INTERACTION PATTERNS

### Button States
```
Default  → Hover (scale 1.02) → Active (scale 0.98) → Disabled (opacity 0.5)
Focus overlay visible in all states
Loading state: spinner icon + dimmed text
Error state: red border + error icon + message below
```

### Status Indicators
```
Active:    Bright color + pulsing animation (2s cycle) + icon
Inactive:  Dimmed gray + no animation
Loading:   Spinner animation + muted color
Error:     Red color + alert icon + no animation
```

### Form Interactions
```
Default:     Normal styling
Focus:       2px ring (Cyan-500), offset 2px
Hover:       Slightly lighter background
Filled:      User input visible
Error:       Red border + error message + icon
Disabled:    Gray colors + cursor not-allowed
Loading:     Spinner overlay
```

### Modal/Dialog Behavior
```
Open:        Fade-in + scale animation (200ms)
Close:       Fade-out + scale animation (150ms)
Focus:       Trap focus within modal
Dismiss:     Escape key, click backdrop (if dismissible), click X button
Backdrop:    Dark overlay with pointer-events: none or click-to-dismiss
```

---

## IMPLEMENTATION CODE PATTERNS

### Button Implementation
```tsx
<button
  className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 
             active:scale-95 focus:ring-2 focus:ring-cyan-500/50 
             disabled:opacity-50 disabled:cursor-not-allowed
             transition-all duration-150"
  aria-label="Action description"
  disabled={isLoading}
  onClick={handleClick}
>
  {isLoading ? <Spinner /> : "Button text"}
</button>
```

### Accessible Icon Button
```tsx
<button
  className="p-2 hover:bg-neutral-100 rounded-lg focus:ring-2"
  aria-label="Close notification"
  onClick={handleDismiss}
>
  <X className="w-5 h-5" />
</button>
```

### Status Indicator
```tsx
<div className="flex items-center gap-2" role="img" aria-label={`Status: ${status}`}>
  <div className={`w-3 h-3 rounded-full bg-${color}-500`} />
  <span className="sr-only">{status}</span>
  <Icon className={`text-${color}-500`} />
</div>
```

### Dark Mode Toggle
```tsx
<button
  onClick={toggleTheme}
  className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
>
  {isDark ? <Sun /> : <Moon />}
</button>
```

---

## COMPONENT EXPORT STRUCTURE (For Figma)

**Recommended File Organization:**

```
NEXUS AI Design System/
│
├─ 🎨 Foundations/
│  ├─ Colors (color swatches)
│  ├─ Typography (text styles)
│  ├─ Spacing (spacing tokens)
│  ├─ Shadows (shadow styles)
│  └─ Animations (animation specs)
│
├─ 🧬 Components/
│  ├─ Buttons/
│  │  ├─ Button/Primary/[Size]/[State]
│  │  ├─ Button/Secondary/[Size]/[State]
│  │  ├─ Button/Danger/[Size]/[State]
│  │  └─ Button/Ghost/[Size]/[State]
│  │
│  ├─ Navigation/
│  │  ├─ Navbar/Default/[State]
│  │  ├─ NavRail/[Icon]/[State]
│  │  └─ Breadcrumb
│  │
│  ├─ Cards/
│  │  ├─ Basic Card
│  │  ├─ Metric Card
│  │  └─ Status Card
│  │
│  ├─ Inputs/
│  │  ├─ Text Input/[State]
│  │  ├─ Select/[State]
│  │  ├─ Toggle/[State]
│  │  └─ Slider/[State]
│  │
│  ├─ Feedback/
│  │  ├─ Alert/[Type]
│  │  ├─ Badge/[Type]
│  │  ├─ Progress
│  │  ├─ Toast/[Type]
│  │  └─ Modal/[Type]
│  │
│  ├─ Vehicle-Specific/
│  │  ├─ VehicleStatus/[Speed]/[Gear]
│  │  ├─ VehicleControls/[Control]/[State]
│  │  ├─ DriverMonitor/[Mode]/[Alert]
│  │  ├─ AICenter/Navigation
│  │  ├─ TelemetryPanel/[Metric]
│  │  ├─ AlertPanel/[AlertType]
│  │  └─ NotificationSystem/Toast/[Type]
│
├─ 📱 Responsive Variants/
│  ├─ xs (375px)
│  ├─ sm (640px)
│  ├─ md (768px)
│  ├─ lg (1024px)
│  └─ xl (1280px+)
│
└─ 🎭 Theme Variants/
   ├─ Light Theme (all components)
   └─ Dark Theme (all components)
```

---

## FINAL INSTRUCTIONS FOR FIGMA AI

**Generate the following:**

1. ✅ Complete design system with all tokens
2. ✅ All 9 vehicle dashboard components with full specifications
3. ✅ All UI primitive components (buttons, inputs, cards, etc.)
4. ✅ Responsive variants for xs, sm, md, lg, xl breakpoints
5. ✅ Light and dark mode versions of all components
6. ✅ All component states (default, hover, active, disabled, loading, error, focus)
7. ✅ Animation specifications and micro-interactions
8. ✅ Accessibility annotations (ARIA roles, labels)
9. ✅ Component library structure for handoff to developers
10. ✅ Interactive prototypes showing key user flows

**Priority Components** (Create first):
1. Button component (all variants)
2. Navbar with dropdown menus
3. VehicleStatus with speedometer
4. VehicleControls with AC popup and safety dialogs
5. DriverMonitor with privacy indicator

**Output Format:**
- Figma components with variants
- Design tokens as variables
- Auto-layout enabled
- Asset export ready
- Developer handoff documentation
