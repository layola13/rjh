/**
 * Slider marks component props interface
 */
export interface SliderMarksProps {
  /** CSS class name for the marks container */
  className?: string;
  /** Whether the slider is vertical */
  vertical?: boolean;
  /** Whether the slider is reversed */
  reverse?: boolean;
  /** Mark definitions - key is the value, value is label or mark config */
  marks: Record<string, MarkConfig | React.ReactNode>;
  /** Whether the range between marks is included/highlighted */
  included?: boolean;
  /** Upper bound value for active marks */
  upperBound?: number;
  /** Lower bound value for active marks */
  lowerBound?: number;
  /** Maximum slider value */
  max: number;
  /** Minimum slider value */
  min: number;
  /** Callback when a mark label is clicked */
  onClickLabel?: (event: React.MouseEvent | React.TouchEvent, value: number) => void;
}

/**
 * Mark configuration object
 */
export interface MarkConfig {
  /** Label content to display */
  label?: React.ReactNode;
  /** Custom inline styles for the mark */
  style?: React.CSSProperties;
}

/**
 * Renders slider marks/labels at specified positions
 * 
 * @param props - Component props
 * @returns React element containing mark labels
 * 
 * @example
 *