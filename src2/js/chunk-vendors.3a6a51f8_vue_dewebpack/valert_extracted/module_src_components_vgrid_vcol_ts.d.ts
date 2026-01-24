/**
 * VCol - Vuetify Grid Column Component
 * 
 * A functional component that provides responsive column layout within VRow.
 * Supports breakpoint-specific sizing, offsetting, ordering, and alignment.
 */

/**
 * Breakpoint names supported by the grid system
 */
type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Valid values for align-self CSS property
 */
type AlignSelfValue = 'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch';

/**
 * Column size value: boolean for auto-sizing, string/number for specific columns (1-12)
 */
type ColumnSize = boolean | string | number;

/**
 * Offset or order value: string or number representing grid units
 */
type OffsetOrderValue = string | number | null;

/**
 * Base props for column sizing across breakpoints
 */
interface BreakpointColProps {
  /** Column size at small breakpoint (sm) */
  sm?: ColumnSize;
  /** Column size at medium breakpoint (md) */
  md?: ColumnSize;
  /** Column size at large breakpoint (lg) */
  lg?: ColumnSize;
  /** Column size at extra-large breakpoint (xl) */
  xl?: ColumnSize;
}

/**
 * Props for column offsetting across breakpoints
 */
interface BreakpointOffsetProps {
  /** Offset at small breakpoint */
  offsetSm?: OffsetOrderValue;
  /** Offset at medium breakpoint */
  offsetMd?: OffsetOrderValue;
  /** Offset at large breakpoint */
  offsetLg?: OffsetOrderValue;
  /** Offset at extra-large breakpoint */
  offsetXl?: OffsetOrderValue;
}

/**
 * Props for column ordering across breakpoints
 */
interface BreakpointOrderProps {
  /** Order at small breakpoint */
  orderSm?: OffsetOrderValue;
  /** Order at medium breakpoint */
  orderMd?: OffsetOrderValue;
  /** Order at large breakpoint */
  orderLg?: OffsetOrderValue;
  /** Order at extra-large breakpoint */
  orderXl?: OffsetOrderValue;
}

/**
 * Complete props interface for VCol component
 */
interface VColProps extends BreakpointColProps, BreakpointOffsetProps, BreakpointOrderProps {
  /**
   * Default column size (applies to all breakpoints unless overridden)
   * @default false
   */
  cols?: ColumnSize;

  /**
   * Default offset (number of columns to offset)
   * @default null
   */
  offset?: OffsetOrderValue;

  /**
   * Default order (flex order property)
   * @default null
   */
  order?: OffsetOrderValue;

  /**
   * Sets align-self CSS property for the column
   * @default null
   */
  alignSelf?: AlignSelfValue | null;

  /**
   * HTML tag to render as root element
   * @default 'div'
   */
  tag?: string;
}

/**
 * Breakpoint configuration map used internally
 */
interface BreakpointConfig {
  /** Array of breakpoint-specific column prop names */
  col: string[];
  /** Array of breakpoint-specific offset prop names */
  offset: string[];
  /** Array of breakpoint-specific order prop names */
  order: string[];
}

/**
 * VCol - Functional Vue component for grid column layout
 * 
 * @example
 *