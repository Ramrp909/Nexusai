# NexusAI Figma AI - Quick Prompt

Copy and paste into Figma AI Code Generator:

---

```
CREATE A COMPLETE NEXUSAI DASHBOARD DESIGN SYSTEM

STACK: React 18 + TypeScript + Tailwind CSS 4 + Radix-UI
PLATFORM: Desktop Only (1280px+)
THEME: Light + Dark Mode

DESIGN TOKENS:
Colors:
- Primary Light: #06B6D4 | Primary Dark: #10B981
- Text Light: #0F172A | Text Dark: #F1F5F9
- Background Light: #FFFFFF | Background Dark: #0F172A
- Border: rgba(255,255,255,0.3) light | rgba(255,255,255,0.05) dark
- Muted: #64748B light | #94A3B8 dark

Typography:
- H1: 32px bold | H2: 24px semibold | Label: 12px uppercase tracking-wider
- Body: 14px regular | Caption: 10px regular

Spacing: 8-point grid (4px, 8px, 16px, 24px, 32px, 48px)
Radius: Cards 28-32px | Buttons 8-12px
Shadow: blur 20px, rgba(59,130,246,0.06) light | rgba(16,185,129,0.06) dark

LAYOUT - Desktop Cockpit Dashboard:

┌─ HEADER (h-16) ──────────────────────────┐
│ Logo | Status | Theme Toggle | Notifications │
└─────────────────────────────────────────┘

┌─ NAV RAIL (80px) ──┬─ MAIN GRID ─────────┐
│ [Icons x5]         │ [Driver]  [AI]  [Status] │
│                    │ [Monitor] [Center] [Metrics] │
│                    │          │       [Alerts] │
│                    ├─────────────────────────┤
│                    │ [Controls] [AI Assistant] │
└────────────────────┴──────────────────────┘

COMPONENTS TO CREATE:

1. HEADER (CockpitHeader)
   - 3-section layout: Logo (left) | Status (center) | Controls (right)
   - Elements: Car icon + "NEXUS AI" + "Smart Vehicle System"
   - Status: Green pulse dot + "Tesla Model S"
   - Controls: Weather, Bell, Sun/Moon toggle
   - Style: Glass effect, 16px gap, rounded 28px

2. NAV RAIL (NavRail) - 80px wide, vertical icons
   - 5 icons: Home, Dashboard, AI, Settings, Profile
   - Hover: scale 1.02, highlight
   - Active: primary color background
   - Style: rounded 28px, subtle border + shadow

3. DRIVER MONITOR (Left column, full height)
   - Webcam feed placeholder
   - Header: "Driver Monitoring" + "Active" indicator
   - Features: Facial detection overlay, drowsiness alert
   - Buttons: Minimize, Settings
   - Style: rounded 32px

4. AI CENTER (Middle column, full height)
   - Header: "AI Navigation" + "Autonomous Assistance Active"
   - Radar visualization: 3 concentric circles (opacity 0.3, 0.2, 0.1)
   - Detection dots with pulse animation
   - Distance + Speed display
   - Style: rounded 32px, animated radar ring rotation

5. VEHICLE STATUS (Right top, 1/3 height)
   - Header: "Vehicle Status" + "Active" badge
   - Display: Speed (large), Speedometer, Gear (D/N/R/P), Battery
   - Icons: lucide-react
   - Style: rounded 28px

6. VEHICLE METRICS (Right middle, 1/3 height)
   - Header: "Vehicle Metrics"
   - 4 metric items: RPM, Temperature, Fuel, G-Force
   - Each with mini gauge/bar
   - Values in monospace
   - Style: rounded 28px

7. AI ALERTS (Right bottom, 1/3 height)
   - Header: "AI Alerts" + count badge
   - Alert list (scrollable, up to 3 visible)
   - Alert format: Icon | Message | Badge (color-coded)
   - Warning = yellow | Alert = red
   - Style: rounded 28px

8. VEHICLE CONTROLS (Bottom left, 1.2fr)
   - 8 buttons grid (2x4): AC, Seat, Ambient, Camera, Hazard, Lock, WiFi, More
   - Each: Icon + label below (12px)
   - AC: shows temperature popup when hovered
   - Hazard/Lock: show confirmation dialog when clicked
   - Style: rounded 16px, hover scale 1.02
   - Active states: Cyan/Emerald highlight, gray when inactive

9. AI ASSISTANT (Bottom right, 0.8fr)
   - Microphone icon (pulsing when active)
   - Waveform animation (3-4 bars)
   - Text: "AI Assistant" + "Ready"
   - Style: rounded 28px, animated waveform

ALL COMPONENTS:
- Light + Dark mode variants
- States: default, hover (scale 1.02), active (color), disabled (opacity 0.5), focus (2px ring)
- Animations: 200-300ms ease-out
- Focus ring: 2px cyan/emerald
- Glass effect on containers (backdrop blur)
- Shadows with color tint matching primary

COLORS - COMPONENT USAGE:
- Primary: Status indicators, active buttons, focus rings
- Danger: Hazard, Lock, alert badges (red/orange)
- Warning: Yellow badges, caution alerts
- Muted: Disabled, secondary text, inactive controls
- Background: Cards, containers (semi-transparent white/dark)

SPACING GUIDE:
- Header height: 64px (h-16)
- NavRail width: 80px
- Main gaps: 16px
- Card padding: 12-16px
- Button padding: 8-12px

ANIMATIONS:
- Status dots: pulse 2s infinite
- Radar rings: continuous slow rotation
- Waveform: bars animate up/down (audio viz style)
- Hover: scale 1.02 in 200ms
- Theme change: 300ms transition
- Alert appear: slide up + fade in

ACCESSIBILITY:
- Focus states visible (2px ring)
- aria-labels on all buttons
- Keyboard navigation (Tab through controls)
- Contrast: 4.5:1 text, 3:1 UI (WCAG AA)
- Screen reader support: semantic HTML + roles
- prefers-reduced-motion: supported

OUTPUT FORMAT:
- Create as Figma components (not frames)
- Enable auto-layout
- Create nested component structure
- Use Figma variables for colors
- Name layers: [Component]/[Variant]/[State]
- Generate Tailwind CSS tokens
- Export as React-ready code
- Include light + dark mode

EXACT LAYOUT DIMENSIONS:
- Full width: 1280px+ (desktop only)
- Header: 64px height
- NavRail: 80px width
- Main grid: 3 columns (grid-cols-3, gap-4)
- Right stack: 3 equal rows
- Bottom controls: 2 columns (1.2fr | 0.8fr), 128px height
- Total height: Full viewport - 64px (header) - 16px (gaps)

PRIORITY ORDER:
1. Design tokens (colors, typography, spacing)
2. Layout grid structure
3. Header component
4. NavRail component
5. All grid cards (6 cards)
6. Bottom controls section
7. All animations + states
8. Light + dark theme variants

READY TO GENERATE: YES - Copy this prompt directly into Figma AI Code Generator.
```

---

## How to Use:

1. **Open Figma** → Go to your workspace
2. **Plugins** → Click "Code" or search "AI Design"
3. **Copy the prompt above** (from triple backticks)
4. **Paste into Figma AI** and click Generate
5. **Wait 5-10 minutes** for design system creation
6. **Review components** using quality checklist below

---

## Quality Checklist After Generation:

- [ ] Header displays correctly (logo, status, controls aligned)
- [ ] NavRail shows all 5 icons vertically
- [ ] Main grid is 3 columns with proper spacing
- [ ] Driver Monitor takes full left column height
- [ ] AI Center takes full middle column height
- [ ] Right side has 3 equal-height cards (Status, Metrics, Alerts)
- [ ] Bottom section has 2 columns (Controls larger, Assistant smaller)
- [ ] All corners rounded (28-32px on cards, 8-12px on buttons)
- [ ] Light mode: white backgrounds, cyan primary, gray text
- [ ] Dark mode: dark slate backgrounds, emerald primary, light text
- [ ] Hover states applied (scale 1.02 on buttons)
- [ ] Focus rings visible (2px cyan/emerald)
- [ ] Animations present (pulse, rotate, slide)
- [ ] All 9 components present and positioned correctly
- [ ] Components use nested structure
- [ ] Auto-layout enabled on all sections
- [ ] Tailwind tokens exported
- [ ] Ready for React implementation

---

## Component Structure Tree:

```
CockpitLayout (Main Container)
├── CockpitHeader
│   ├── Logo Section (Car icon + Text)
│   ├── Status Section (Pulse indicator + Model name)
│   └── Controls Section (Weather, Bell, Theme)
├── MainGrid (flex, gap-3)
│   ├── NavRail (80px, vertical)
│   │   └── Icon Buttons x5
│   └── ContentArea (flex-1)
│       ├── TopGrid (grid-cols-3)
│       │   ├── DriverMonitor
│       │   ├── AICenter
│       │   └── RightStack (grid-rows-3)
│       │       ├── VehicleStatus
│       │       ├── VehicleMetrics
│       │       └── AIAlerts
│       └── BottomControls (grid-cols-[1.2fr_0.8fr])
│           ├── VehicleControls
│           └── AIAssistant
```

---

**Total Components:** 9  
**Total States per Component:** 5-7  
**Total Variants:** 14+ (light/dark + states)  
**Estimated Generation Time:** 5-10 minutes  
**Output:** Complete production-ready design system  

✅ **Ready to Paste into Figma AI Now!**
