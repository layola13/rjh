/**
 * Babylon.js GUI 2D Controls Module
 * 
 * This module provides a comprehensive set of 2D UI controls for creating
 * interactive user interfaces in Babylon.js applications.
 * 
 * @module @babylonjs/gui/2D/controls
 * @packageDocumentation
 */

// ============================================================================
// Base Controls
// ============================================================================

/**
 * Base class for all UI controls.
 * Provides common properties like position, size, color, and event handling.
 */
export { Control } from './control';

/**
 * Container control that can hold and organize child controls.
 * Supports layout management and clipping.
 */
export { Container } from './container';

// ============================================================================
// Button Controls
// ============================================================================

/**
 * Standard button control with click event support.
 * Can display text and respond to pointer interactions.
 */
export { Button } from './button';

/**
 * Button control with focus management capabilities.
 * Supports keyboard navigation and focus states.
 */
export { FocusableButton } from './focusableButton';

/**
 * Toggle button that maintains on/off state.
 * Useful for binary options like mute/unmute, show/hide.
 */
export { ToggleButton } from './toggleButton';

// ============================================================================
// Selection Controls
// ============================================================================

/**
 * Checkbox control for boolean input.
 * Displays a checkable box with optional label.
 */
export { Checkbox } from './checkbox';

/**
 * Radio button for mutually exclusive options.
 * Only one radio button in a group can be selected at a time.
 */
export { RadioButton } from './radioButton';

/**
 * Group of checkboxes with coordinated behavior.
 */
export { CheckboxGroup } from './selector';

/**
 * Group of radio buttons ensuring mutual exclusivity.
 */
export { RadioGroup } from './selector';

/**
 * Panel for displaying and selecting from multiple options.
 */
export { SelectionPanel } from './selector';

/**
 * Base group class for managing selector controls.
 */
export { SelectorGroup } from './selector';

// ============================================================================
// Text Controls
// ============================================================================

/**
 * Static text display control.
 * Supports text wrapping, alignment, and styling.
 */
export { TextBlock } from './textBlock';

/**
 * Text wrapping enumeration.
 * Defines how text should wrap within its container.
 */
export { TextWrapping } from './textBlock';

/**
 * Utility class for wrapping text based on available width.
 * Handles word breaking and line measurements.
 */
export { TextWrapper } from './textWrapper';

// ============================================================================
// Text Input Controls
// ============================================================================

/**
 * Single-line text input control.
 * Supports placeholder, max length, and input validation.
 */
export { InputText } from './inputText';

/**
 * Multi-line text input control with scrolling support.
 * Suitable for longer text entry like comments or descriptions.
 */
export { InputTextArea } from './inputTextArea';

/**
 * Password input control that masks entered characters.
 * Displays bullets or asterisks instead of actual text.
 */
export { InputPassword } from './inputPassword';

/**
 * Virtual on-screen keyboard control.
 * Provides touch-friendly text input for devices without physical keyboards.
 */
export { VirtualKeyboard } from './virtualKeyboard';

/**
 * Property set for defining keyboard key appearance and behavior.
 */
export { KeyPropertySet } from './virtualKeyboard';

// ============================================================================
// Shape Controls
// ============================================================================

/**
 * Rectangle shape control.
 * Supports rounded corners, borders, and fill colors.
 */
export { Rectangle } from './rectangle';

/**
 * Ellipse/circle shape control.
 * Renders circular or oval shapes with customizable appearance.
 */
export { Ellipse } from './ellipse';

/**
 * Single line drawing control.
 * Draws a straight line between two points with configurable thickness.
 */
export { Line } from './line';

/**
 * Multi-segment line control.
 * Draws connected line segments through multiple points.
 */
export { MultiLine } from './multiLine';

// ============================================================================
// Image Controls
// ============================================================================

/**
 * Image display control.
 * Supports loading from URLs, stretching modes, and slicing (9-patch).
 */
export { Image } from './image';

// ============================================================================
// Color Controls
// ============================================================================

/**
 * Color picker control for selecting colors.
 * Provides HSV color selection with preview and hex input.
 */
export { ColorPicker } from './colorpicker';

// ============================================================================
// Gradient Controls
// ============================================================================

/**
 * Base class for gradient fills.
 * Defines common properties for all gradient types.
 */
export { BaseGradient } from './gradient/BaseGradient';

/**
 * Linear gradient fill.
 * Creates a gradient along a straight line between two points.
 */
export { LinearGradient } from './gradient/LinearGradient';

/**
 * Radial gradient fill.
 * Creates a circular gradient radiating from a center point.
 */
export { RadialGradient } from './gradient/RadialGradient';

// ============================================================================
// Layout Controls
// ============================================================================

/**
 * Grid layout control.
 * Organizes child controls in rows and columns with precise positioning.
 */
export { Grid } from './grid';

/**
 * Display grid for arranging items in a flowing grid pattern.
 * Automatically wraps items based on available space.
 */
export { DisplayGrid } from './displayGrid';

/**
 * Stack panel for linear arrangement of controls.
 * Stacks children vertically or horizontally with configurable spacing.
 */
export { StackPanel } from './stackPanel';

// ============================================================================
// Slider Controls
// ============================================================================

/**
 * Base class for all slider controls.
 * Provides core functionality for value selection along a range.
 */
export { BaseSlider } from './sliders/baseSlider';

/**
 * Standard slider control.
 * Allows selecting a numeric value by dragging a thumb along a track.
 */
export { Slider } from './sliders/slider';

/**
 * Image-based slider with custom graphics.
 * Uses images for thumb and track appearance.
 */
export { ImageBasedSlider } from './sliders/imageBasedSlider';

/**
 * Scroll bar control for scrolling content.
 * Provides thumb dragging and track clicking for navigation.
 */
export { ScrollBar } from './sliders/scrollBar';

/**
 * Image-based scroll bar with custom graphics.
 * Uses images for scroll bar appearance.
 */
export { ImageScrollBar } from './sliders/imageScrollBar';

/**
 * Group of sliders with coordinated behavior.
 * Useful for managing related value inputs like RGB or XYZ.
 */
export { SliderGroup } from './selector';

// ============================================================================
// Scrolling Controls
// ============================================================================

/**
 * Scroll viewer for displaying scrollable content.
 * Automatically adds scroll bars when content exceeds viewport size.
 */
export { ScrollViewer } from './scrollViewers/scrollViewer';

// ============================================================================
// Metadata
// ============================================================================

/**
 * Module name identifier.
 * Used for module registration and debugging purposes.
 */
export { name } from './statics';