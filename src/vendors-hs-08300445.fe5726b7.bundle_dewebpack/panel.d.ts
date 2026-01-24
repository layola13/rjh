/**
 * Panel module providing panel-related UI components
 * 
 * @module Panel
 * @remarks
 * This module exports Panel components for building panel-based interfaces.
 * The Panel component is the primary export used for creating customizable panel layouts.
 */

/**
 * Panel component for creating container layouts
 * 
 * @public
 * @remarks
 * The Panel component provides a flexible container for organizing UI elements
 * in a structured panel layout. It can be used for sidebars, content sections,
 * and other modular UI components.
 */
export class Panel {
  /**
   * Creates a new Panel instance
   * 
   * @param props - Configuration properties for the panel
   */
  constructor(props?: PanelProps);
}

/**
 * Configuration properties for Panel component
 * 
 * @public
 */
export interface PanelProps {
  /**
   * CSS class name for styling
   * @optional
   */
  className?: string;

  /**
   * Inline styles to apply to the panel
   * @optional
   */
  style?: React.CSSProperties;

  /**
   * Child elements to render inside the panel
   * @optional
   */
  children?: React.ReactNode;

  /**
   * Whether the panel is visible
   * @optional
   * @defaultValue true
   */
  visible?: boolean;
}

/**
 * Default export - Panel component
 * 
 * @public
 * @remarks
 * Provides both named and default exports for flexible import options
 */
export default Panel;

export { Panel };