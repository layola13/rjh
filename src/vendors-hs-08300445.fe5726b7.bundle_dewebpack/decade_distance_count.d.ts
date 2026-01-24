/**
 * Decade panel component for date picker
 * Provides navigation and selection interface for decade ranges
 */

/**
 * Number of years difference per decade unit
 */
export const DECADE_UNIT_DIFF = 10;

/**
 * Total distance count for decade navigation (100 years)
 */
export const DECADE_DISTANCE_COUNT: number = 10 * DECADE_UNIT_DIFF;

/**
 * Configuration object for generating dates
 */
export interface GenerateConfig<DateType> {
  /**
   * Add specified number of years to a date
   */
  addYear(date: DateType, years: number): DateType;
}

/**
 * Selection source type
 */
export type SelectionSource = 'key' | 'mouse';

/**
 * Panel type for view mode switching
 */
export type PanelMode = 'year' | 'decade' | null;

/**
 * Operation reference for keyboard navigation
 */
export interface OperationRef {
  /**
   * Keyboard event handler
   */
  onKeyDown(event: React.KeyboardEvent): boolean | void;
}

/**
 * Props for the decade panel component
 */
export interface DecadePanelProps<DateType> {
  /**
   * CSS class prefix for styling
   */
  prefixCls: string;

  /**
   * Callback when view date changes
   */
  onViewDateChange(date: DateType): void;

  /**
   * Date generation configuration
   */
  generateConfig: GenerateConfig<DateType>;

  /**
   * Currently displayed date
   */
  viewDate: DateType;

  /**
   * Reference for keyboard operation handlers
   */
  operationRef: React.MutableRefObject<OperationRef>;

  /**
   * Callback when a decade is selected
   * @param date - Selected date
   * @param source - Selection source (keyboard or mouse)
   */
  onSelect(date: DateType, source: SelectionSource): void;

  /**
   * Callback when panel mode changes
   * @param mode - New panel mode
   * @param date - Associated date
   */
  onPanelChange(mode: PanelMode, date: DateType): void;
}

/**
 * Decade panel component
 * Displays a grid of decades and handles navigation/selection
 * 
 * @template DateType - The date object type used by the date library
 * @param props - Component props
 * @returns React element representing the decade panel
 */
export default function DecadePanel<DateType>(
  props: DecadePanelProps<DateType>
): React.ReactElement;