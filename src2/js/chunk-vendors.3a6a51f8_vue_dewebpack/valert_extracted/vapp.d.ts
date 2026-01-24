/**
 * Vuetify Components Type Definitions
 * 
 * This module provides TypeScript type declarations for all Vuetify UI components
 * including layouts, forms, navigation, data display, and transition components.
 * 
 * @module @vuetify/components
 */

import type { Component } from 'vue';

// ============================================================================
// Application & Layout Components
// ============================================================================

/**
 * Root application component that provides the layout structure for Vuetify apps
 */
export declare const VApp: Component;

/**
 * Top application bar component for navigation and branding
 */
export declare const VAppBar: Component;

/**
 * Navigation icon button for app bar (typically hamburger menu)
 */
export declare const VAppBarNavIcon: Component;

/**
 * Main content area component
 */
export declare const VMain: Component;

/**
 * Legacy content wrapper component (deprecated in favor of VMain)
 */
export declare const VContent: Component;

/**
 * Footer component for application bottom section
 */
export declare const VFooter: Component;

/**
 * System status bar component (typically at top of screen)
 */
export declare const VSystemBar: Component;

// ============================================================================
// Grid System Components
// ============================================================================

/**
 * Responsive container component with optional fluid width
 */
export declare const VContainer: Component;

/**
 * Grid row component for flex layout
 */
export declare const VRow: Component;

/**
 * Grid column component with responsive breakpoint support
 */
export declare const VCol: Component;

/**
 * Flexible spacer component to fill available space
 */
export declare const VSpacer: Component;

/**
 * Legacy layout component (deprecated in favor of VRow)
 */
export declare const VLayout: Component;

/**
 * Legacy flex component (deprecated in favor of VCol)
 */
export declare const VFlex: Component;

// ============================================================================
// Form Input Components
// ============================================================================

/**
 * Form container with validation support
 */
export declare const VForm: Component;

/**
 * Standard text input field
 */
export declare const VTextField: Component;

/**
 * Multi-line text input area
 */
export declare const VTextarea: Component;

/**
 * Checkbox input component
 */
export declare const VCheckbox: Component;

/**
 * Simplified checkbox without label or validation
 */
export declare const VSimpleCheckbox: Component;

/**
 * Radio button input within radio group
 */
export declare const VRadio: Component;

/**
 * Radio button group container
 */
export declare const VRadioGroup: Component;

/**
 * Toggle switch input component
 */
export declare const VSwitch: Component;

/**
 * Dropdown select input with single/multiple selection
 */
export declare const VSelect: Component;

/**
 * Autocomplete input with filtering and suggestions
 */
export declare const VAutocomplete: Component;

/**
 * Combobox input combining select and text input
 */
export declare const VCombobox: Component;

/**
 * File upload input component
 */
export declare const VFileInput: Component;

/**
 * Slider input for numeric range selection
 */
export declare const VSlider: Component;

/**
 * Dual-handle range slider component
 */
export declare const VRangeSlider: Component;

/**
 * Star rating input component
 */
export declare const VRating: Component;

/**
 * Color picker component with swatches and canvas
 */
export declare const VColorPicker: Component;

/**
 * Color swatch grid for color picker
 */
export declare const VColorPickerSwatches: Component;

/**
 * Color selection canvas for color picker
 */
export declare const VColorPickerCanvas: Component;

/**
 * Base input component wrapper
 */
export declare const VInput: Component;

/**
 * Input label component
 */
export declare const VLabel: Component;

/**
 * Character counter for text inputs
 */
export declare const VCounter: Component;

/**
 * Validation messages display component
 */
export declare const VMessages: Component;

// ============================================================================
// Button Components
// ============================================================================

/**
 * Standard button component with various styles
 */
export declare const VBtn: Component;

/**
 * Button group with toggle selection behavior
 */
export declare const VBtnToggle: Component;

/**
 * Floating action button with expandable options
 */
export declare const VSpeedDial: Component;

/**
 * Overflow menu button for additional actions
 */
export declare const VOverflowBtn: Component;

// ============================================================================
// Navigation Components
// ============================================================================

/**
 * Side navigation drawer component
 */
export declare const VNavigationDrawer: Component;

/**
 * Bottom navigation bar component
 */
export declare const VBottomNavigation: Component;

/**
 * Breadcrumb navigation component
 */
export declare const VBreadcrumbs: Component;

/**
 * Individual breadcrumb item
 */
export declare const VBreadcrumbsItem: Component;

/**
 * Breadcrumb separator divider
 */
export declare const VBreadcrumbsDivider: Component;

/**
 * Tabbed navigation component
 */
export declare const VTabs: Component;

/**
 * Individual tab header
 */
export declare const VTab: Component;

/**
 * Tab content panel
 */
export declare const VTabItem: Component;

/**
 * Container for tab content panels
 */
export declare const VTabsItems: Component;

/**
 * Active tab indicator slider
 */
export declare const VTabsSlider: Component;

/**
 * Pagination component for page navigation
 */
export declare const VPagination: Component;

// ============================================================================
// Data Display Components
// ============================================================================

/**
 * Data table component with sorting, filtering, and pagination
 */
export declare const VDataTable: Component;

/**
 * Data table header component
 */
export declare const VDataTableHeader: Component;

/**
 * Simple HTML table wrapper
 */
export declare const VSimpleTable: Component;

/**
 * Virtualized table for large datasets
 */
export declare const VVirtualTable: Component;

/**
 * Inline edit dialog for data tables
 */
export declare const VEditDialog: Component;

/**
 * Table overflow scroll wrapper
 */
export declare const VTableOverflow: Component;

/**
 * Data iterator for custom data rendering
 */
export declare const VDataIterator: Component;

/**
 * Footer with pagination controls for data components
 */
export declare const VDataFooter: Component;

/**
 * Data provider component for scoped slots
 */
export declare const VData: Component;

/**
 * Virtual scroll container for large lists
 */
export declare const VVirtualScroll: Component;

// ============================================================================
// List Components
// ============================================================================

/**
 * List container component
 */
export declare const VList: Component;

/**
 * Individual list item
 */
export declare const VListItem: Component;

/**
 * Collapsible list group
 */
export declare const VListGroup: Component;

/**
 * List item group with selection behavior
 */
export declare const VListItemGroup: Component;

/**
 * List item action container
 */
export declare const VListItem Action: Component;

/**
 * Action text within list item
 */
export declare const VListItemActionText: Component;

/**
 * List item avatar container
 */
export declare const VListItemAvatar: Component;

/**
 * Main content area of list item
 */
export declare const VListItemContent: Component;

/**
 * List item icon container
 */
export declare const VListItemIcon: Component;

/**
 * Primary title text for list item
 */
export declare const VListItemTitle: Component;

/**
 * Subtitle text for list item
 */
export declare const VListItemSubtitle: Component;

/**
 * List section subheader
 */
export declare const VSubheader: Component;

// ============================================================================
// Card Components
// ============================================================================

/**
 * Card container component
 */
export declare const VCard: Component;

/**
 * Card title section
 */
export declare const VCardTitle: Component;

/**
 * Card subtitle section
 */
export declare const VCardSubtitle: Component;

/**
 * Card text content section
 */
export declare const VCardText: Component;

/**
 * Card actions section (typically for buttons)
 */
export declare const VCardActions: Component;

// ============================================================================
// Overlay & Dialog Components
// ============================================================================

/**
 * Modal dialog component
 */
export declare const VDialog: Component;

/**
 * Bottom sheet dialog variant
 */
export declare const VBottomSheet: Component;

/**
 * Dropdown menu component
 */
export declare const VMenu: Component;

/**
 * Overlay backdrop component
 */
export declare const VOverlay: Component;

/**
 * Tooltip component for hover hints
 */
export declare const VTooltip: Component;

// ============================================================================
// Feedback Components
// ============================================================================

/**
 * Alert notification component
 */
export declare const VAlert: Component;

/**
 * Toast notification snackbar
 */
export declare const VSnackbar: Component;

/**
 * Banner notification component
 */
export declare const VBanner: Component;

/**
 * Circular progress indicator
 */
export declare const VProgressCircular: Component;

/**
 * Linear progress bar
 */
export declare const VProgressLinear: Component;

/**
 * Skeleton loader placeholder
 */
export declare const VSkeletonLoader: Component;

// ============================================================================
// Expansion & Collapse Components
// ============================================================================

/**
 * Expansion panels container
 */
export declare const VExpansionPanels: Component;

/**
 * Individual expansion panel
 */
export declare const VExpansionPanel: Component;

/**
 * Expansion panel header (clickable)
 */
export declare const VExpansionPanelHeader: Component;

/**
 * Expansion panel content (collapsible)
 */
export declare const VExpansionPanelContent: Component;

// ============================================================================
// Stepper Components
// ============================================================================

/**
 * Stepper container for multi-step workflows
 */
export declare const VStepper: Component;

/**
 * Stepper header with step indicators
 */
export declare const VStepperHeader: Component;

/**
 * Individual step indicator
 */
export declare const VStepperStep: Component;

/**
 * Content panel for a step
 */
export declare const VStepperContent: Component;

/**
 * Container for stepper content panels
 */
export declare const VStepperItems: Component;

// ============================================================================
// Media Components
// ============================================================================

/**
 * Image component with lazy loading and aspect ratio
 */
export declare const VImg: Component;

/**
 * Icon component supporting multiple icon fonts
 */
export declare const VIcon: Component;

/**
 * Avatar component for user images
 */
export declare const VAvatar: Component;

/**
 * Parallax scrolling background component
 */
export declare const VParallax: Component;

/**
 * Responsive container maintaining aspect ratio
 */
export declare const VResponsive: Component;

// ============================================================================
// Chip & Badge Components
// ============================================================================

/**
 * Chip component for tags and filters
 */
export declare const VChip: Component;

/**
 * Chip group with selection behavior
 */
export declare const VChipGroup: Component;

/**
 * Badge overlay for notifications
 */
export declare const VBadge: Component;

// ============================================================================
// Carousel & Slider Components
// ============================================================================

/**
 * Carousel component for image/content slideshows
 */
export declare const VCarousel: Component;

/**
 * Individual carousel slide
 */
export declare const VCarouselItem: Component;

/**
 * Horizontal slide group container
 */
export declare const VSlideGroup: Component;

/**
 * Individual slide item
 */
export declare const VSlideItem: Component;

/**
 * Window container for transitioning content
 */
export declare const VWindow: Component;

/**
 * Individual window panel
 */
export declare const VWindowItem: Component;

// ============================================================================
// Picker Components
// ============================================================================

/**
 * Date picker component
 */
export declare const VDatePicker: Component;

/**
 * Date picker title section
 */
export declare const VDatePickerTitle: Component;

/**
 * Date picker header with month/year navigation
 */
export declare const VDatePickerHeader: Component;

/**
 * Date picker day selection table
 */
export declare const VDatePickerDateTable: Component;

/**
 * Date picker month selection table
 */
export declare const VDatePickerMonthTable: Component;

/**
 * Date picker year selection list
 */
export declare const VDatePickerYears: Component;

/**
 * Time picker component
 */
export declare const VTimePicker: Component;

/**
 * Time picker title display
 */
export declare const VTimePickerTitle: Component;

/**
 * Time picker clock interface
 */
export declare const VTimePickerClock: Component;

/**
 * Base picker container component
 */
export declare const VPicker: Component;

// ============================================================================
// Calendar Components
// ============================================================================

/**
 * Calendar component with multiple views
 */
export declare const VCalendar: Component;

/**
 * Category view for calendar
 */
export declare const VCalendarCategory: Component;

/**
 * Daily view for calendar
 */
export declare const VCalendarDaily: Component;

/**
 * Weekly view for calendar
 */
export declare const VCalendarWeekly: Component;

/**
 * Monthly view for calendar
 */
export declare const VCalendarMonthly: Component;

// ============================================================================
// Data Visualization Components
// ============================================================================

/**
 * Sparkline chart component for inline data visualization
 */
export declare const VSparkline: Component;

/**
 * Timeline component for chronological events
 */
export declare const VTimeline: Component;

/**
 * Individual timeline event item
 */
export declare const VTimelineItem: Component;

/**
 * Tree view component for hierarchical data
 */
export declare const VTreeview: Component;

/**
 * Individual tree node component
 */
export declare const VTreeviewNode: Component;

// ============================================================================
// Toolbar Components
// ============================================================================

/**
 * Toolbar component for actions and controls
 */
export declare const VToolbar: Component;

/**
 * Toolbar items container
 */
export declare const VToolbarItems: Component;

/**
 * Toolbar title section
 */
export declare const VToolbarTitle: Component;

// ============================================================================
// Utility Components
// ============================================================================

/**
 * Material design sheet surface
 */
export declare const VSheet: Component;

/**
 * Divider line component
 */
export declare const VDivider: Component;

/**
 * Hover state detection component
 */
export declare const VHover: Component;

/**
 * Lazy loading wrapper component
 */
export declare const VLazy: Component;

/**
 * Item component for item groups
 */
export declare const VItem: Component;

/**
 * Item group selection container
 */
export declare const VItemGroup: Component;

/**
 * Theme provider for nested theme customization
 */
export declare const VThemeProvider: Component;

// ============================================================================
// Transition Components
// ============================================================================

/**
 * Carousel slide transition
 */
export declare const VCarouselTransition: Component;

/**
 * Reverse carousel slide transition
 */
export declare const VCarouselReverseTransition: Component;

/**
 * Tab switch transition
 */
export declare const VTabTransition: Component;

/**
 * Reverse tab switch transition
 */
export declare const VTabReverseTransition: Component;

/**
 * Menu open/close transition
 */
export declare const VMenuTransition: Component;

/**
 * Floating action button transition
 */
export declare const VFabTransition: Component;

/**
 * Dialog open/close transition
 */
export declare const VDialogTransition: Component;

/**
 * Bottom dialog transition
 */
export declare const VDialogBottomTransition: Component;

/**
 * Fade in/out transition
 */
export declare const VFadeTransition: Component;

/**
 * Scale transform transition
 */
export declare const VScaleTransition: Component;

/**
 * Horizontal scroll transition
 */
export declare const VScrollXTransition: Component;

/**
 * Reverse horizontal scroll transition
 */
export declare const VScrollXReverseTransition: Component;

/**
 * Vertical scroll transition
 */
export declare const VScrollYTransition: Component;

/**
 * Reverse vertical scroll transition
 */
export declare const VScrollYReverseTransition: Component;

/**
 * Horizontal slide transition
 */
export declare const VSlideXTransition: Component;

/**
 * Reverse horizontal slide transition
 */
export declare const VSlideXReverseTransition: Component;

/**
 * Vertical slide transition
 */
export declare const VSlideYTransition: Component;

/**
 * Reverse vertical slide transition
 */
export declare const VSlideYReverseTransition: Component;

/**
 * Expand/collapse transition (vertical)
 */
export declare const VExpandTransition: Component;

/**
 * Expand/collapse transition (horizontal)
 */
export declare const VExpandXTransition: Component;