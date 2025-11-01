# Design Guidelines: Team Collaboration Platform

## Design Approach

**Reference-Based Approach**: Drawing inspiration from Unstop, LinkedIn, and modern SaaS platforms (Linear, Notion) that prioritize clean information architecture and efficient user workflows. The design emphasizes scannable member profiles, intuitive filtering, and streamlined team creation.

**Core Principles**:
- Information clarity over visual flair
- Scannable card-based layouts for rapid member browsing
- Persistent, accessible filtering controls
- Professional, trustworthy aesthetic suitable for academic/professional collaboration

---

## Typography

**Font Stack**: 
- Primary: Inter or DM Sans (modern, highly legible for interfaces)
- Monospace: JetBrains Mono (for tech stack tags)

**Hierarchy**:
- Page Headers: text-3xl font-bold (Member Directory, Create Team)
- Section Headers: text-xl font-semibold (Filter Categories, Team Details)
- Card Titles: text-lg font-semibold (Member Names)
- Body Text: text-base font-normal (Skills, descriptions)
- Labels/Meta: text-sm font-medium (Year, Event Date)
- Micro-copy: text-xs (Helper text, counts)

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 3, 4, 6, 8, 12, 16** for consistent rhythm
- Component padding: p-4 to p-6
- Section gaps: gap-6 to gap-8
- Page margins: px-6 lg:px-12
- Vertical sections: py-8 to py-12

**Grid Structure**:
- Member Cards: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- Filter + Content: Two-column layout with sticky sidebar (25% / 75% split on desktop)
- Team Cards: `grid grid-cols-1 lg:grid-cols-2 gap-8`

**Container Strategy**:
- Max-width: `max-w-7xl mx-auto` for main content
- Full-width filter sidebar on mobile (collapsible drawer)
- Cards: Fixed aspect ratio with overflow handling

---

## Component Library

### Navigation Header
- Horizontal navigation bar with fixed positioning
- Logo/brand (left), primary actions (right): "Browse Members", "Create Team", "My Teams"
- Search bar centered or right-aligned: w-full max-w-md with icon prefix
- Height: h-16, shadow-sm for subtle elevation
- User profile avatar (top-right corner, size-10)

### Member Directory Layout

**Filter Sidebar** (Desktop: w-64 sticky, Mobile: Slide-out drawer):
- Collapsible sections with chevron indicators
- "Graduation Year" dropdown/checkbox group
- "Skills" multi-select with search
- "Tech Stack" tag cloud or checkbox list
- "Clear All Filters" link at bottom (text-sm, underline on hover)
- Active filter count badge
- Spacing: space-y-6 between filter groups

**Member Cards**:
- Compact card design with rounded-lg borders
- Avatar (size-16) top-left or centered
- Name as card header (text-lg font-semibold)
- Graduation year badge (text-xs, px-2 py-1, rounded-full)
- Skills section: Flex-wrapped tags (text-xs, px-2 py-1, rounded)
- Tech stack icons or text labels (max 5 visible, "+3 more" overflow)
- Quick action: "Add to Team" button (secondary style, w-full at card bottom)
- Hover state: Subtle lift (shadow-md) and border highlight
- Padding: p-4 to p-6

**Empty States**:
- Centered illustration placeholder
- "No members found" heading (text-xl)
- Suggestion text: "Try adjusting your filters"
- Reset filters button

### Team Creation Interface

**Modal/Slide-over Panel** (Preference: Modal for focused task):
- Semi-transparent backdrop (backdrop-blur-sm)
- Modal width: max-w-2xl
- Header: "Create New Team" with close button (×)
- Form sections clearly separated with space-y-6

**Form Fields**:
- Event Name: Full-width input (h-12, px-4, rounded-lg)
- Event Date: Date picker with calendar icon
- Required Tech Stack: Multi-select tag input (allow typing + suggestions)
- Team Size: Number input or stepper
- Description: Textarea (h-32, resize-none)
- Each field with label (text-sm font-medium, mb-2)

**Selected Members Section**:
- "Team Members (0/5)" header with count
- Grid of mini member cards (avatar + name, size-12 avatar)
- Remove button (× icon, top-right of mini card)
- "+Add Members" button opens member selector

**Modal Footer**:
- Sticky bottom bar with actions
- "Cancel" (secondary button) and "Create Team" (primary button)
- Spacing: space-x-3 between buttons, py-4

### Team Display Cards

**Team Overview Cards**:
- Larger cards than member cards (min-h-48)
- Event name as prominent header (text-xl font-bold)
- Event date with calendar icon (text-sm)
- Tech stack badges (horizontally scrollable if needed)
- Member avatars in overlapping stack (first 4 visible, "+2" indicator)
- Progress indicator if applicable (e.g., "3/5 members")
- "View Details" button (secondary style)
- Padding: p-6

### Secondary Components

**Tag System**:
- Skill tags: Rounded-full, px-3 py-1, text-xs font-medium
- Tech stack tags: Rounded-md, px-2 py-1, with tech icon if available
- Removable tags (in filters): × button on hover

**Badges**:
- Year badges: Circular or pill-shaped, text-xs
- Status indicators: Dot + text (e.g., "Available", "In Team")

**Search Bar**:
- Left-aligned search icon (heroicons magnifying-glass)
- Placeholder: "Search members by name or skills..."
- Clear button (×) appears when text entered
- Height: h-12, rounded-lg

**Dropdowns/Select Menus**:
- Custom styled with chevron-down icon
- Dropdown panel: shadow-lg, rounded-lg, max-h-60 overflow-y-auto
- Options with hover state highlighting

---

## Page Layouts

### Member Directory Page
1. **Header Navigation** (h-16, fixed top)
2. **Page Title Section** (py-8): "Member Directory" + result count
3. **Main Content** (flex layout):
   - Left: Filter Sidebar (w-64, pr-8, sticky top-24)
   - Right: Member Grid (flex-1, grid layout as specified)
4. **Pagination** (centered, py-8): Page numbers with prev/next arrows

### Team Creation Flow
- Triggered from floating action button or header CTA
- Modal overlay centered on screen
- Maintains context of current page in background (blurred)

### My Teams Dashboard
- Grid of team cards (2-column on desktop)
- Quick filters: "Active", "Completed", "All"
- Each team card expandable or links to detail view

---

## Interaction Patterns

**Filtering**:
- Instant filter application (no "Apply" button needed)
- Loading skeleton states during filter refresh
- Filter count badges update in real-time

**Card Interactions**:
- Hover: Subtle elevation and border emphasis
- Click on member card: Opens detail modal or navigates to profile
- "Add to Team" button: Adds to selection, shows checkmark feedback

**Form Validation**:
- Inline error messages below fields (text-sm, with icon)
- Disabled submit button until required fields completed
- Success state: Brief confirmation toast notification

---

## Responsive Behavior

**Mobile (< 768px)**:
- Single column member grid
- Filter sidebar becomes bottom sheet or slide-out drawer
- Triggered by "Filters" button with badge count
- Stacked form fields in team creation

**Tablet (768px - 1024px)**:
- Two-column member grid
- Condensed filter sidebar or toggleable

**Desktop (> 1024px)**:
- Three-column member grid
- Persistent filter sidebar
- Larger team creation modal

---

## Accessibility

- All interactive elements have focus states with visible outline
- Form labels properly associated with inputs
- ARIA labels for icon-only buttons
- Keyboard navigation support (Tab, Enter, Esc for modals)
- Alt text for member avatars (member name)
- Sufficient contrast ratios maintained throughout

---

## Images

**No hero images required** for this application-focused interface. Instead:

**Member Avatars**: Circular profile images (placeholder: initials on solid background)
**Empty State Illustrations**: Simple line illustrations for "No results" states
**Tech Stack Icons**: Use Font Awesome or similar icon library for technology logos (React, Python, etc.)

The design prioritizes functional clarity over decorative imagery, keeping focus on the member information and team creation workflows.