/**
 * VDatePickerHeader component for Vuetify date picker
 * Provides navigation controls and formatted date display
 */

import Vue, { VNode, CreateElement } from 'vue';
import { PropType } from 'vue';

/**
 * Props interface for VDatePickerHeader component
 */
export interface VDatePickerHeaderProps {
  /** Whether the header controls are disabled */
  disabled?: boolean;
  
  /** Custom formatter function for the date display */
  format?: (value: string) => string;
  
  /** Minimum allowed date (ISO 8601 format) */
  min?: string;
  
  /** Maximum allowed date (ISO 8601 format) */
  max?: string;
  
  /** ARIA label for the next button */
  nextAriaLabel?: string;
  
  /** Icon name for the next button */
  nextIcon?: string;
  
  /** ARIA label for the previous button */
  prevAriaLabel?: string;
  
  /** Icon name for the previous button */
  prevIcon?: string;
  
  /** Whether the header is in readonly mode */
  readonly?: boolean;
  
  /** Current date value (ISO 8601 format or year number) */
  value: number | string;
}

/**
 * Data interface for VDatePickerHeader component
 */
export interface VDatePickerHeaderData {
  /** Flag indicating if the date change animation should reverse */
  isReversing: boolean;
}

/**
 * Computed properties interface
 */
export interface VDatePickerHeaderComputed {
  /** Formatter function for displaying the current date/year */
  formatter: (value: string) => string;
}

/**
 * Methods interface for VDatePickerHeader component
 */
export interface VDatePickerHeaderMethods {
  /**
   * Generates a navigation button (prev/next)
   * @param direction - Direction multiplier: -1 for previous, 1 for next
   * @returns VNode for the button
   */
  genBtn(direction: number): VNode;
  
  /**
   * Calculates the new date value after applying direction change
   * @param direction - Direction multiplier: -1 for previous, 1 for next
   * @returns New date value as string
   */
  calculateChange(direction: number): string;
  
  /**
   * Generates the header display element with formatted date
   * @returns VNode for the header
   */
  genHeader(): VNode;
}

/**
 * VDatePickerHeader component type definition
 * Combines Vue instance with component-specific interfaces
 */
export type VDatePickerHeader = Vue & 
  VDatePickerHeaderProps & 
  VDatePickerHeaderData & 
  VDatePickerHeaderComputed & 
  VDatePickerHeaderMethods & {
    /** Vuetify theme classes */
    themeClasses: Record<string, boolean>;
    
    /** Current locale from localable mixin */
    currentLocale: string;
    
    /** Sets text color (from colorable mixin) */
    setTextColor(color: string | false, data: Record<string, any>): Record<string, any>;
    
    /** Vuetify instance */
    $vuetify: {
      lang: {
        t(key: string): string;
      };
      rtl: boolean;
    };
  };

/**
 * Default export: VDatePickerHeader component definition
 */
declare const VDatePickerHeader: {
  new (): VDatePickerHeader;
};

export default VDatePickerHeader;