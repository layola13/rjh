/**
 * Vuetify Components Type Definitions
 * @module @vuetify/components
 * @description Complete type definitions for all Vuetify UI components and transitions
 */

import type { Component } from 'vue';

// ============================================================================
// Layout Components
// ============================================================================

/**
 * VApp - The root application component that provides the layout structure
 */
export const VApp: Component;

/**
 * VAppBar - Application toolbar component for navigation and actions
 */
export const VAppBar: Component;

/**
 * VAppBarNavIcon - Navigation icon button for VAppBar (typically hamburger menu)
 */
export const VAppBarNavIcon: Component;

/**
 * VMain - Main content area wrapper component
 */
export const VMain: Component;

/**
 * VContent - Legacy content wrapper (deprecated, use VMain instead)
 * @deprecated Use VMain instead
 */
export const VContent: Component;

/**
 * VFooter - Application footer component
 */
export const VFooter: Component;

/**
 * VSystemBar - System status bar component (top of application)
 */
export const VSystemBar: Component;

// ============================================================================
// Grid System Components
// ============================================================================

/**
 * VContainer - Responsive container component with configurable max-width
 */
export const VContainer: Component;

/**
 * VRow - Flexbox row wrapper for grid layout
 */
export const VRow: Component;

/**
 * VCol - Flexbox column component with responsive breakpoints
 */
export const VCol: Component;

/**
 * VSpacer - Flexible spacer component for pushing content
 */
export const VSpacer: Component;

/**
 * VLayout - Legacy layout wrapper (deprecated)
 * @deprecated Use VRow/VCol instead
 */
export const VLayout: Component;

/**
 * VFlex - Legacy flex item component (deprecated)
 * @deprecated Use VCol instead
 */
export const VFlex: Component;

// ============================================================================
// Notification & Feedback Components
// ============================================================================

/**
 * VAlert - Alert/notification component with contextual styling
 */
export const VAlert: Component;

/**
 * VBanner - Prominent banner component for important messages
 */
export const VBanner: Component;

/**
 * VSnackbar - Brief popup notification component
 */
export const VSnackbar: Component;

/**
 * VDialog - Modal dialog overlay component
 */
export const VDialog: Component;

/**
 * VOverlay - Backdrop overlay component
 */
export const VOverlay: Component;

/**
 * VTooltip - Contextual tooltip component
 */
export const VTooltip: Component;

/**
 * VMessages - Validation messages display component
 */
export const VMessages: Component;

// ============================================================================
// Navigation Components
// ============================================================================

/**
 * VNavigationDrawer - Side navigation drawer component
 */
export const VNavigationDrawer: Component;

/**
 * VBottomNavigation - Bottom navigation bar for mobile
 */
export const VBottomNavigation: Component;

/**
 * VBottomSheet - Bottom sheet modal component
 */
export const VBottomSheet: Component;

/**
 * VBreadcrumbs - Breadcrumb navigation component
 */
export const VBreadcrumbs: Component;

/**
 * VBreadcrumbsItem - Individual breadcrumb item
 */
export const VBreadcrumbsItem: Component;

/**
 * VBreadcrumbsDivider - Divider between breadcrumb items
 */
export const VBreadcrumbsDivider: Component;

/**
 * VPagination - Pagination controls component
 */
export const VPagination: Component;

/**
 * VTabs - Tabbed navigation component
 */
export const VTabs: Component;

/**
 * VTab - Individual tab item
 */
export const VTab: Component;

/**
 * VTabItem - Tab panel content wrapper
 */
export const VTabItem: Component;

/**
 * VTabsItems - Container for tab panel content
 */
export const VTabsItems: Component;

/**
 * VTabsSlider - Animated indicator bar for active tab
 */
export const VTabsSlider: Component;

/**
 * VMenu - Dropdown menu component
 */
export const VMenu: Component;

// ============================================================================
// Form Components
// ============================================================================

/**
 * VForm - Form wrapper component with validation support
 */
export const VForm: Component;

/**
 * VTextField - Text input field component
 */
export const VTextField: Component;

/**
 * VTextarea - Multi-line text input component
 */
export const VTextarea: Component;

/**
 * VSelect - Select dropdown component
 */
export const VSelect: Component;

/**
 * VAutocomplete - Autocomplete input with suggestions
 */
export const VAutocomplete: Component;

/**
 * VCombobox - Combobox input (autocomplete with free text)
 */
export const VCombobox: Component;

/**
 * VCheckbox - Checkbox input component
 */
export const VCheckbox: Component;

/**
 * VSimpleCheckbox - Simplified checkbox without label
 */
export const VSimpleCheckbox: Component;

/**
 * VRadioGroup - Radio button group container
 */
export const VRadioGroup: Component;

/**
 * VRadio - Individual radio button
 */
export const VRadio: Component;

/**
 * VSwitch - Toggle switch component
 */
export const VSwitch: Component;

/**
 * VSlider - Range slider input component
 */
export const VSlider: Component;

/**
 * VRangeSlider - Dual-handle range slider
 */
export const VRangeSlider: Component;

/**
 * VFileInput - File upload input component
 */
export const VFileInput: Component;

/**
 * VOverflowBtn - Overflow button with dropdown menu
 */
export const VOverflowBtn: Component;

/**
 * VInput - Base input wrapper component
 */
export const VInput: Component;

/**
 * VLabel - Form label component
 */
export const VLabel: Component;

/**
 * VCounter - Character counter component for inputs
 */
export const VCounter: Component;

// ============================================================================
// Picker Components
// ============================================================================

/**
 * VPicker - Base picker component
 */
export const VPicker: Component;

/**
 * VDatePicker - Date selection picker component
 */
export const VDatePicker: Component;

/**
 * VDatePickerTitle - Date picker title section
 */
export const VDatePickerTitle: Component;

/**
 * VDatePickerHeader - Date picker month/year header
 */
export const VDatePickerHeader: Component;

/**
 * VDatePickerDateTable - Date picker calendar grid
 */
export const VDatePickerDateTable: Component;

/**
 * VDatePickerMonthTable - Date picker month selection table
 */
export const VDatePickerMonthTable: Component;

/**
 * VDatePickerYears - Date picker year selection list
 */
export const VDatePickerYears: Component;

/**
 * VTimePicker - Time selection picker component
 */
export const VTimePicker: Component;

/**
 * VTimePickerClock - Analog clock face for time selection
 */
export const VTimePickerClock: Component;

/**
 * VTimePickerTitle - Time picker title section
 */
export const VTimePickerTitle: Component;

/**
 * VColorPicker - Color selection picker component
 */
export const VColorPicker: Component;

/**
 * VColorPickerSwatches - Color picker preset swatches
 */
export const VColorPickerSwatches: Component;

/**
 * VColorPickerCanvas - Color picker gradient canvas
 */
export const VColorPickerCanvas: Component;

// ============================================================================
// Calendar Components
// ============================================================================

/**
 * VCalendar - Full calendar component
 */
export const VCalendar: Component;

/**
 * VCalendarCategory - Category-based calendar view
 */
export const VCalendarCategory: Component;

/**
 * VCalendarDaily - Daily calendar view
 */
export const VCalendarDaily: Component;

/**
 * VCalendarWeekly - Weekly calendar view
 */
export const VCalendarWeekly: Component;

/**
 * VCalendarMonthly - Monthly calendar view
 */
export const VCalendarMonthly: Component;

// ============================================================================
// Card & Surface Components
// ============================================================================

/**
 * VCard - Card container component
 */
export const VCard: Component;

/**
 * VCardActions - Card actions section (buttons)
 */
export const VCardActions: Component;

/**
 * VCardTitle - Card title section
 */
export const VCardTitle: Component;

/**
 * VCardSubtitle - Card subtitle section
 */
export const VCardSubtitle: Component;

/**
 * VCardText - Card body text content
 */
export const VCardText: Component;

/**
 * VSheet - Styled surface component with elevation
 */
export const VSheet: Component;

// ============================================================================
// Button Components
// ============================================================================

/**
 * VBtn - Button component with multiple variants
 */
export const VBtn: Component;

/**
 * VBtnToggle - Toggle button group component
 */
export const VBtnToggle: Component;

/**
 * VSpeedDial - Floating action button with expandable actions
 */
export const VSpeedDial: Component;

// ============================================================================
// List Components
// ============================================================================

/**
 * VList - List container component
 */
export const VList: Component;

/**
 * VListItem - Individual list item
 */
export const VListItem: Component;

/**
 * VListItemAction - List item action area
 */
export const VListItemAction: Component;

/**
 * VListItemActionText - List item action text
 */
export const VListItemActionText: Component;

/**
 * VListItemAvatar - List item avatar section
 */
export const VListItemAvatar: Component;

/**
 * VListItemContent - List item main content area
 */
export const VListItemContent: Component;

/**
 * VListItemTitle - List item primary text
 */
export const VListItemTitle: Component;

/**
 * VListItemSubtitle - List item secondary text
 */
export const VListItemSubtitle: Component;

/**
 * VListItemIcon - List item icon section
 */
export const VListItemIcon: Component;

/**
 * VListGroup - Expandable list group
 */
export const VListGroup: Component;

/**
 * VListItemGroup - Selectable list item group
 */
export const VListItemGroup: Component;

// ============================================================================
// Data Display Components
// ============================================================================

/**
 * VDataTable - Feature-rich data table component
 */
export const VDataTable: Component;

/**
 * VDataTableHeader - Data table header row
 */
export const VDataTableHeader: Component;

/**
 * VSimpleTable - Simplified table component
 */
export const VSimpleTable: Component;

/**
 * VVirtualTable - Virtualized table for large datasets
 */
export const VVirtualTable: Component;

/**
 * VEditDialog - Inline edit dialog for tables
 */
export const VEditDialog: Component;

/**
 * VTableOverflow - Table overflow wrapper
 */
export const VTableOverflow: Component;

/**
 * VDataIterator - Data iteration component with pagination
 */
export const VDataIterator: Component;

/**
 * VDataFooter - Data table/iterator footer with pagination
 */
export const VDataFooter: Component;

/**
 * VData - Base data provider component
 */
export const VData: Component;

// ============================================================================
// Media Components
// ============================================================================

/**
 * VImg - Responsive image component with lazy loading
 */
export const VImg: Component;

/**
 * VIcon - Icon component (Material Design Icons, Font Awesome, etc.)
 */
export const VIcon: Component;

/**
 * VAvatar - Avatar component for user images
 */
export const VAvatar: Component;

/**
 * VParallax - Parallax scrolling background image
 */
export const VParallax: Component;

/**
 * VCarousel - Image/content carousel component
 */
export const VCarousel: Component;

/**
 * VCarouselItem - Individual carousel slide
 */
export const VCarouselItem: Component;

// ============================================================================
// Progress & Loading Components
// ============================================================================

/**
 * VProgressLinear - Linear progress bar component
 */
export const VProgressLinear: Component;

/**
 * VProgressCircular - Circular progress spinner component
 */
export const VProgressCircular: Component;

/**
 * VSkeletonLoader - Skeleton loading placeholder component
 */
export const VSkeletonLoader: Component;

// ============================================================================
// Chip & Badge Components
// ============================================================================

/**
 * VChip - Chip component for tags and selections
 */
export const VChip: Component;

/**
 * VChipGroup - Chip group container with selection support
 */
export const VChipGroup: Component;

/**
 * VBadge - Badge overlay component for notifications
 */
export const VBadge: Component;

// ============================================================================
// Expansion & Accordion Components
// ============================================================================

/**
 * VExpansionPanels - Expansion panels container (accordion)
 */
export const VExpansionPanels: Component;

/**
 * VExpansionPanel - Individual expansion panel
 */
export const VExpansionPanel: Component;

/**
 * VExpansionPanelHeader - Expansion panel header (clickable)
 */
export const VExpansionPanelHeader: Component;

/**
 * VExpansionPanelContent - Expansion panel collapsible content
 */
export const VExpansionPanelContent: Component;

// ============================================================================
// Stepper Components
// ============================================================================

/**
 * VStepper - Multi-step form/process component
 */
export const VStepper: Component;

/**
 * VStepperHeader - Stepper header with step indicators
 */
export const VStepperHeader: Component;

/**
 * VStepperStep - Individual step indicator
 */
export const VStepperStep: Component;

/**
 * VStepperContent - Step content panel
 */
export const VStepperContent: Component;

/**
 * VStepperItems - Container for stepper content panels
 */
export const VStepperItems: Component;

// ============================================================================
// Visualization Components
// ============================================================================

/**
 * VSparkline - Inline chart/sparkline component
 */
export const VSparkline: Component;

/**
 * VRating - Star rating input component
 */
export const VRating: Component;

// ============================================================================
// Timeline Components
// ============================================================================

/**
 * VTimeline - Timeline display component
 */
export const VTimeline: Component;

/**
 * VTimelineItem - Individual timeline event item
 */
export const VTimelineItem: Component;

// ============================================================================
// Tree Components
// ============================================================================

/**
 * VTreeview - Hierarchical tree view component
 */
export const VTreeview: Component;

/**
 * VTreeviewNode - Individual tree node
 */
export const VTreeviewNode: Component;

// ============================================================================
// Toolbar Components
// ============================================================================

/**
 * VToolbar - Toolbar component for actions and navigation
 */
export const VToolbar: Component;

/**
 * VToolbarTitle - Toolbar title text
 */
export const VToolbarTitle: Component;

/**
 * VToolbarItems - Toolbar action items container
 */
export const VToolbarItems: Component;

// ============================================================================
// Utility Components
// ============================================================================

/**
 * VDivider - Visual divider line component
 */
export const VDivider: Component;

/**
 * VSubheader - Section subheader text component
 */
export const VSubheader: Component;

/**
 * VResponsive - Aspect ratio responsive wrapper
 */
export const VResponsive: Component;

/**
 * VHover - Hover state detection wrapper component
 */
export const VHover: Component;

/**
 * VLazy - Lazy rendering wrapper component
 */
export const VLazy: Component;

/**
 * VThemeProvider - Theme context provider component
 */
export const VThemeProvider: Component;

/**
 * VItemGroup - Generic selectable item group
 */
export const VItemGroup: Component;

/**
 * VItem - Generic selectable item
 */
export const VItem: Component;

/**
 * VSlideGroup - Horizontal scrollable item group
 */
export const VSlideGroup: Component;

/**
 * VSlideItem - Individual slide group item
 */
export const VSlideItem: Component;

/**
 * VWindow - Window/slides container component
 */
export const VWindow: Component;

/**
 * VWindowItem - Individual window panel
 */
export const VWindowItem: Component;

/**
 * VVirtualScroll - Virtual scrolling list for large datasets
 */
export const VVirtualScroll: Component;

// ============================================================================
// Transition Components
// ============================================================================

/**
 * VCarouselTransition - Carousel slide transition
 */
export const VCarouselTransition: Component;

/**
 * VCarouselReverseTransition - Reversed carousel slide transition
 */
export const VCarouselReverseTransition: Component;

/**
 * VTabTransition - Tab panel transition
 */
export const VTabTransition: Component;

/**
 * VTabReverseTransition - Reversed tab panel transition
 */
export const VTabReverseTransition: Component;

/**
 * VMenuTransition - Menu dropdown transition
 */
export const VMenuTransition: Component;

/**
 * VFabTransition - Floating action button transition
 */
export const VFabTransition: Component;

/**
 * VDialogTransition - Dialog modal transition
 */
export const VDialogTransition: Component;

/**
 * VDialogBottomTransition - Bottom sheet dialog transition
 */
export const VDialogBottomTransition: Component;

/**
 * VFadeTransition - Fade in/out transition
 */
export const VFadeTransition: Component;

/**
 * VScaleTransition - Scale grow/shrink transition
 */
export const VScaleTransition: Component;

/**
 * VScrollXTransition - Horizontal scroll transition
 */
export const VScrollXTransition: Component;

/**
 * VScrollXReverseTransition - Reversed horizontal scroll transition
 */
export const VScrollXReverseTransition: Component;

/**
 * VScrollYTransition - Vertical scroll transition
 */
export const VScrollYTransition: Component;

/**
 * VScrollYReverseTransition - Reversed vertical scroll transition
 */
export const VScrollYReverseTransition: Component;

/**
 * VSlideXTransition - Horizontal slide transition
 */
export const VSlideXTransition: Component;

/**
 * VSlideXReverseTransition - Reversed horizontal slide transition
 */
export const VSlideXReverseTransition: Component;

/**
 * VSlideYTransition - Vertical slide transition
 */
export const VSlideYTransition: Component;

/**
 * VSlideYReverseTransition - Reversed vertical slide transition
 */
export const VSlideYReverseTransition: Component;

/**
 * VExpandTransition - Vertical expand/collapse transition
 */
export const VExpandTransition: Component;

/**
 * VExpandXTransition - Horizontal expand/collapse transition
 */
export const VExpandXTransition: Component;