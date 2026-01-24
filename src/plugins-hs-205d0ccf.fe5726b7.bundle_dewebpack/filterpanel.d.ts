/**
 * FilterPanel Module
 * Provides filtering functionality with dropdown menus for room types and stylers
 */

/**
 * Filter type enumeration
 * Defines available filter categories
 */
export enum FilterType {
  /** Room type filter */
  RoomType = "roomType",
  /** Styler filter */
  Styler = "styler"
}

/**
 * Individual filter option item
 */
export interface FilterOption {
  /** Unique identifier code for the filter option */
  code: string;
  /** Display name for the filter option */
  name: string;
}

/**
 * Filter item configuration
 * Represents a single filter category with its options
 */
export interface FilterItem {
  /** Type of the filter (roomType or styler) */
  type: FilterType;
  /** List of available options for this filter */
  list: FilterOption[];
}

/**
 * Active filter values
 * Maps filter types to their selected values
 */
export interface ActiveFilters {
  /** Selected room type code (optional) */
  roomType?: string;
  /** Selected styler code (optional) */
  styler?: string;
}

/**
 * FilterPanel component props
 */
export interface FilterPanelProps {
  /** Whether to show the filter panel */
  show: boolean;
  /** Array of filter items to display */
  filterItems: FilterItem[];
  /** Callback function invoked when filters change */
  callback?: (filters: ActiveFilters) => void;
}

/**
 * FilterPanel Component
 * Renders a filtering interface with dropdown menus
 * 
 * @param props - Component configuration
 * @returns React component displaying filter dropdowns
 * 
 * @example
 *