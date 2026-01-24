/**
 * VDatePickerYears Component
 * A date picker component for selecting years with scroll functionality
 */

import { VNode, CreateElement } from 'vue';
import { PropType } from 'vue';

/**
 * Props interface for VDatePickerYears component
 */
interface VDatePickerYearsProps {
  /** Custom format function for displaying year */
  format?: (year: string) => string;
  /** Minimum selectable year */
  min?: number | string;
  /** Maximum selectable year */
  max?: number | string;
  /** Whether the picker is in readonly mode */
  readonly?: boolean;
  /** Currently selected year value */
  value?: number | string;
}

/**
 * Data interface for VDatePickerYears component
 */
interface VDatePickerYearsData {
  /** Default color theme for the component */
  defaultColor: string;
}

/**
 * Computed properties interface
 */
interface VDatePickerYearsComputed {
  /** Formatter function for year display */
  formatter: (year: string) => string;
}

/**
 * VDatePickerYears component declaration
 * Displays a scrollable list of years for date selection
 */
declare const VDatePickerYears: {
  name: 'v-date-picker-years';
  
  props: {
    /** Custom formatter function for year display */
    format: PropType<(year: string) => string>;
    /** Minimum selectable year (number or string) */
    min: PropType<number | string>;
    /** Maximum selectable year (number or string) */
    max: PropType<number | string>;
    /** Readonly state flag */
    readonly: PropType<boolean>;
    /** Selected year value */
    value: PropType<number | string>;
  };

  /**
   * Component data factory
   * @returns Component reactive data
   */
  data(): VDatePickerYearsData;

  computed: {
    /**
     * Returns the year formatter function
     * Uses custom format prop or creates a native locale formatter
     * @returns Formatter function that takes a year string and returns formatted output
     */
    formatter(): (year: string) => string;
  };

  /**
   * Lifecycle hook - mounted
   * Automatically scrolls to the active year or appropriate position
   */
  mounted(): void;

  methods: {
    /**
     * Generates a single year item element
     * @param year - The year to generate an item for
     * @returns VNode representing the year list item
     */
    genYearItem(year: number): VNode;

    /**
     * Generates all year items within the min-max range
     * Defaults to current year ±100 years if min/max not specified
     * @returns Array of VNodes representing year list items
     */
    genYearItems(): VNode[];
  };

  /**
   * Render function
   * @param createElement - Vue's createElement function
   * @returns VNode representing the years list container
   */
  render(createElement: CreateElement): VNode;
};

export default VDatePickerYears;

/**
 * Component emits
 * @event input - Emitted when a year is selected
 * @param {number} year - The selected year value
 */