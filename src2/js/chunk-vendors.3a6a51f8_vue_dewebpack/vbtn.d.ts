/**
 * VBtn component module
 * Provides a button component with Vuetify-style API
 */

/**
 * VBtn Component
 * A versatile button component supporting various visual styles, sizes, and states
 */
export declare class VBtn {
  /**
   * Creates an instance of VBtn
   * @param props - Component properties
   */
  constructor(props?: VBtnProps);
}

/**
 * Props interface for VBtn component
 */
export interface VBtnProps {
  /** Button text or content */
  text?: string;
  /** Button color variant */
  color?: string;
  /** Button size variant */
  size?: 'small' | 'default' | 'large' | 'x-large';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button has a block-level display */
  block?: boolean;
  /** Whether the button has an outlined style */
  outlined?: boolean;
  /** Whether the button has a text-only style */
  textButton?: boolean;
  /** Whether the button has a flat style */
  flat?: boolean;
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** Icon to display in the button */
  icon?: string;
  /** Click event handler */
  onClick?: (event: MouseEvent) => void;
}

/**
 * Default export of VBtn component
 */
export default VBtn;