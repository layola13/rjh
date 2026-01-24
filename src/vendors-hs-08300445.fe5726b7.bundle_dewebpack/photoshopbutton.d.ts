/**
 * PhotoshopButton Component
 * A button component styled to match Adobe Photoshop's UI design language
 */

/**
 * Props for the PhotoshopButton component
 */
export interface PhotoshopButtonProps {
  /**
   * Click event handler
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * Text label to display in the button
   */
  label?: string;

  /**
   * Child elements to render inside the button
   */
  children?: React.ReactNode;

  /**
   * Whether the button is in an active/pressed state
   * @default false
   */
  active?: boolean;
}

/**
 * Inline styles for the button in different states
 */
interface ButtonStyles {
  button: React.CSSProperties;
}

/**
 * A button component with Photoshop-style visual design.
 * Features a gradient background, subtle borders, and box-shadow effects.
 * Supports active state styling.
 *
 * @param props - Component props
 * @returns A styled button div element
 *
 * @example
 *