/**
 * SwatchesGroup component props interface
 */
export interface SwatchesGroupProps {
  /**
   * Callback function triggered when a swatch is clicked
   * @param color - The color value of the clicked swatch
   * @param event - The click event object
   */
  onClick?: (color: string, event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Callback function triggered when hovering over a swatch
   * @param color - The color value of the hovered swatch
   * @param event - The hover event object
   */
  onSwatchHover?: (color: string, event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Array of color values to display as swatches
   */
  group: string[];

  /**
   * The currently active/selected color value
   */
  active?: string;
}

/**
 * Swatch component - represents a single color swatch in the group
 */
export interface SwatchProps {
  /**
   * The color value of this swatch
   */
  color: string;

  /**
   * Whether this swatch is currently active/selected
   */
  active: boolean;

  /**
   * Whether this is the first swatch in the group
   */
  first: boolean;

  /**
   * Whether this is the last swatch in the group
   */
  last: boolean;

  /**
   * Click handler for the swatch
   */
  onClick?: (color: string, event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Hover handler for the swatch
   */
  onSwatchHover?: (color: string, event: React.MouseEvent<HTMLElement>) => void;
}

/**
 * SwatchesGroup component - displays a vertical group of color swatches
 * @param props - Component props
 * @returns React component
 */
export declare const SwatchesGroup: React.FC<SwatchesGroupProps>;

export default SwatchesGroup;