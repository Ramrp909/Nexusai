Figma Prompt: NexusAI Dashboard - Additional Features Enhancement
Project Context
Existing: AI-powered vehicle monitoring dashboard with driver profile integration and face detection capabilities. Goal: Add advanced modular components, state management UI, and enhanced user interactions for driver monitoring, vehicle controls, and AI features.

COMPONENT ARCHITECTURE
Priority: CRITICAL

1. Component Modularization
Current Issue: All components exist in single app.tsx
Required: Create separate, reusable component files in /components directory:
DriverMonitor.tsx - Driver monitoring section
VehicleStatus.tsx - Vehicle status display
VehicleMetrics.tsx - Metrics with fuel/EV toggle
TelemetryPanel.tsx - Telemetry modal panel
DriverProfile.tsx - Profile management modal
AIVisionLab.tsx - AI debugging panel (full-screen)
VehicleControls.tsx - Vehicle controls modal
AIAssistant.tsx - AI assistant sidebar
MusicPlayer.tsx - Fallback music player (minimize state)
Import Pattern: All components imported and rendered in app.tsx with proper prop drilling and state management
2. Shared AI Context (State Management)
Create: AIContext.tsx with provider pattern
State to Manage:
Current driver profile (active driver, preferences)
Vehicle mode toggle (Fuel/EV state)
Modal open/close states (all modals)
Driver monitor minimize/maximize state
Face detection status and detected profiles
UI theme/layout state
Backend API responses cache
Provider Wrapper: Wrap entire app in AIContextProvider at root level
PRIORITY 1: DRIVER MONITOR & TELEMETRY
3. Driver Monitor Hero Card - Enhanced Status Cards
Current: 4 status cards displayed
Enhancement Required:

Display first 3-4 status cards normally
Last card: "MORE" Card with Chevron Right Icon (→)
On Click of MORE Card:
Slide-in popup modal from right side (smooth animation)
Show Extended Telemetry Panel with additional status cards from backend
Include Maximize Button (↗ icon) in top-right of modal to expand to full-screen overlay
4. Telemetry Panel Modal
Type: Right-side sliding panel initially, then full-screen on maximize click
Content:
Scrollable list of additional status cards
Each card: Icon, Title, Value, Status indicator (green/yellow/red)
Real-time backend data integration points
Close Button: Top-left of modal
Maximize Button: Top-right (toggles full-screen)
Animation: Smooth slide from right (300ms ease-out)
PRIORITY 2: VEHICLE STATUS UPDATES
5. Vehicle Status Component Redesign
Remove: Battery level indicator
Add:

Headlight Status (icon + toggle indicator)
Fast Charging Icon (when charging in progress)
Wiper Status (on/off indicator)
Below Status Icons: Gear Strip (P, R, N, D indicators with current selection highlight)
Layout:

[Headlight] [Fast Charging] [Wipers]
─────────────────────────────
    [P] [R] [N] [D] ← Current Gear
PRIORITY 3: VEHICLE METRICS - FUEL/EV MODE TOGGLE
6. Vehicle Metrics Panel with Mode Toggle
Top-Right Control: Toggle Switch (Fuel ↔ EV)

On Fuel Mode: Display fuel-specific metrics

Fuel consumption (L/100km)
Fuel level percentage
Range on current fuel
Engine temperature
RPM gauge
On EV Mode: Display electric-specific metrics

Battery state of charge (%)
Energy consumption (kWh/100km)
Range on battery
Motor temperature
Regenerative braking percentage
Behavior:

Toggle switch persists state
Metrics animate/transition when switching modes
UI updates smoothly without page reload
Selected mode visually distinct (color accent)
PRIORITY 4: AI VISION LAB - DEBUG PANEL
7. AI Vision Lab Full-Screen Modal
Trigger: "AI Vision Lab" button in Navigation bar
Type: Full-screen overlay modal

Content Layout:

Header: "AI Vision Lab" title + Close Button (X) top-right

Three Main Sections:

Face Mesh Metrics

Real-time face landmarks visualization area
Confidence score percentage
Face pose (yaw, pitch, roll angles)
Detection state (active/idle)
Face Tracking Data

Bounding box coordinates (x, y, w, h)
Face ID (current tracked person)
Tracking confidence
Frame rate (fps)
Backend Response Status Cards

Response latency
Model accuracy
API status (connected/disconnected)
Error logs (scrollable)
Debug message stream
Purpose: Internal debugging tool for developers to verify face detection pipeline
Visual Style: Dark theme, monospace fonts for metrics, color-coded status indicators

PRIORITY 5: DRIVER PROFILE MANAGEMENT
8. Driver Profile Component Modal
Trigger: Profile icon in Navigation bar
Type: Centered modal window (scrollable)

Top Section - Profile Selection:

Display current active driver name
Edit Button (pencil icon) next to name
Allows editing driver name inline
Middle Section - Profile List:

List of saved driver profiles (scrollable)
Each profile item: Avatar, Name, Active indicator (badge)
Click to switch profiles
Bottom Section - Add New Profile:

"+ Add Profile" button

Opens expandable/accordion section with editable profile settings:

Profile Name input
Vehicle Controls Panel (editable):
AC Temperature slider (16°C - 32°C)
Seat Position sliders (Horizontal, Vertical, Lumbar support)
Ambient Lighting Mode selector (Off, Dim, Medium, Bright, Rainbow)
Steering Wheel Position (Tilt/Telescope)
Mirror Position (Driver side, Passenger side controls)
Sound system defaults (Volume, Equalizer preset)
Save Profile Button (prominent, bottom of modal)

Cancel Option: Close modal without saving

Data Persistence: All profiles saved to backend

PRIORITY 6: FACE DETECTION FALLBACK UI & AUTO-PROFILE
9. Face Detection Flow UI
Trigger: When face detected by system

Step 1 - Detection Intro:

Show message: "Face detected..."
Brief loading animation (2-3 seconds)
Step 2 - Profile Match & Welcome:

Display: "Welcome, [Driver Name]" (from detected profile)
Show driver avatar/profile image
Loading indicator: "Applying saved preferences..."
Step 3 - Auto-Apply Settings:

System automatically applies saved profile settings:
AC temperature adjustment
Seat position adjustment
Ambient lighting mode activation
Display customization
Smooth animation transitions (fade in preferences)
Fallback - No Profile Match:

Show: "Unknown driver detected"
Display default settings, prompt to create new profile
UI Style:

Centered card display during detection
Semi-transparent backdrop
Smooth 500ms transitions between steps
Completion message fades after 2 seconds
PRIORITY 7: AI ASSISTANT COMPONENT
10. AI Assistant Sidebar / Chat Widget
Position: Right sidebar (always visible or collapsible)
Features:

Message Stream Display: Scrollable area showing AI responses

Backend Integration Points:

Display suggestions (text recommendations)
Show warnings/alerts (safety-related)
Display tips for drivers
Response messages from backend API
Input Area:

Text input field for user queries
Send button
Clear history option
Suggested Actions:

Quick-action buttons below messages (if applicable)
Related recommendations
Styling:

Light conversation UI similar to chat applications
Timestamp on messages
System messages vs user messages distinction
Loading state animation while waiting for backend response
PRIORITY 8: VEHICLE CONTROLS MODAL
11. Vehicle Controls - Expanded Modal
Trigger: "MORE" button in Vehicle Controls section
Type: Full-screen or large centered modal

Content Organized by Category:

Climate Control

AC toggle
Temperature up/down (with digital display)
Fan speed slider
Mode selector (Auto, Manual, ECO)
Lighting Controls

Headlights (Auto, On, Off)
High beam toggle
Fog lights toggle
Interior lighting brightness slider
Ambient light color selector
Seat Adjustments

Seat position (forward/backward)
Seat height (up/down)
Lumbar support slider
Seat heating level (0-3)
Seat cooling toggle
Window & Door

Sunroof open/close slider
All windows open/close buttons
Door lock toggle
Child lock enable/disable
Sound System

Volume slider
Mute toggle
Equalizer preset selector
Bluetooth connection status
Additional Features

Wipers speed selector
Defrost toggle
Parking mode activation
Trip reset button
Controls Style:

Toggle switches for on/off controls
Sliders for continuous values
Color-coded status indicators
Group controls by category with clear section headers
PRIORITY 9: DRIVER MONITOR MINIMIZE & MUSIC PLAYER FALLBACK
12. Driver Monitor Minimize Functionality
Trigger: Minimize button on Driver Monitor header

Minimize State Behavior:

Webcam feed disappears (hidden)
Only status cards remain visible (compact grid, 2x2 or similar)
Component shrinks to ~30-40% of original height
Status cards show real-time updates
Newly Available Space:

Music Player component emerges below collapsed Driver Monitor
Music Player Features:
Album artwork display
Current track name + artist
Play/Pause controls
Next/Previous track buttons
Volume slider
Progress bar with seek capability
Playlist selector
Shuffle & Repeat toggles
Backend integration to fetch current playing track
Maximize Button: Expand Driver Monitor back to full view
Animation: Smooth 300ms transitions for collapse/expand

NAVIGATION & GLOBAL LAYOUT
13. Updated Navigation Bar
Ensure Navigation Includes:

Dashboard link
AI Vision Lab button (opens full-screen debug modal)
Driver Profile icon (opens profile management modal)
Settings link
Logout link
DESIGN SPECIFICATIONS
Colors & Theming
Primary action color: Consistent with existing brand
Status indicators: Green (active), Yellow (warning), Red (error), Gray (inactive)
Modal backdrops: Semi-transparent dark overlay (opacity: 0.6)
Glass morphism effect for modals (optional modern enhancement)
Animations & Transitions
Modal appearances: Fade + slide (300ms ease-out)
Toggle switches: Smooth 200ms transitions
Status card updates: Fade transitions (200ms)
Collapse/expand operations: 300ms ease-in-out
Responsive Design
Ensure all modals responsive on tablet/mobile
Touch-friendly control sizes (min 44px tap targets)
Horizontal scrolling for wide data sets (if needed)
Accessibility
All buttons have clear labels
Status cards have ARIA labels
Modal focus management (focus trap when modal open)
Keyboard navigation support (Tab, Enter, Escape to close modals)
BACKEND API INTEGRATION POINTS
Vehicle status data (real-time updates)
Driver profile CRUD operations
Face detection service responses
AI Vision Lab metrics (face mesh, tracking data)
AI Assistant message API
Vehicle controls command endpoints
Telemetry data retrieval
Music player track data
FILES TO CREATE (Component Structure)
/src
  /components
    - DriverMonitor.tsx
    - VehicleStatus.tsx
    - VehicleMetrics.tsx
    - TelemetryPanel.tsx
    - DriverProfile.tsx
    - AIVisionLab.tsx
    - VehicleControls.tsx
    - AIAssistant.tsx
    - MusicPlayer.tsx
  /context
    - AIContext.tsx
  - app.tsx (imports all components)
  - App.css (or styled-components setup)
SUMMARY
This enhancement transforms the dashboard into a fully modular, feature-rich application with: ✅ Separated, maintainable component architecture
✅ Centralized state management via AI Context
✅ Advanced driver profiling with face detection integration
✅ Real-time vehicle metrics with multi-mode support
✅ Comprehensive vehicle controls and monitoring
✅ Debugging capabilities for AI/ML features
✅ Fallback UI for seamless user experiences
✅ Music player integration for minimized state
✅ Modal-driven interactions for clean UI
✅ Responsive, accessible, and animated UI components

Delivery Format: Figma design file with all components, modals, and interactions defined; ready for developer handoff with component specs and state flow documentation.