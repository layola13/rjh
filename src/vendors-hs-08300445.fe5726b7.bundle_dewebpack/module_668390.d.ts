/**
 * Decade panel header component that displays the decade range and navigation controls.
 * This component renders a header showing the start and end years of a decade range
 * (e.g., "2020-2029") with navigation buttons to move between decade groups.
 */

import type { ReactElement, ReactNode } from 'react';
import type { GenerateConfig } from './GenerateConfig';

/**
 * The number of decades shown in one view (typically 10 decades = 100 years).
 */
export declare const DECADE_DISTANCE_COUNT: number;

/**
 * Props for the DecadeHeader component.
 * @template DateType - The date object type used by the date library (e.g., Date, Dayjs, Moment)
 */
export interface DecadeHeaderProps<DateType = unknown> {
  /**
   * CSS class prefix for styling (e.g., 'rc-picker').
   */
  prefixCls: string;

  /**
   * Configuration object providing date manipulation utilities.
   * Must implement methods like getYear(), setYear(), etc.
   */
  generateConfig: GenerateConfig<DateType>;

  /**
   * The currently displayed date/decade.
   */
  viewDate: DateType;

  /**
   * Callback fired when user clicks the "previous decades" navigation button.
   */
  onPrevDecades?: () => void;

  /**
   * Callback fired when user clicks the "next decades" navigation button.
   */
  onNextDecades?: () => void;
}

/**
 * Context value that may contain header display configuration.
 */
export interface PanelContext {
  /**
   * When true, the header should not be rendered.
   */
  hideHeader?: boolean;
}

/**
 * Generic header component used to wrap decade range display with navigation controls.
 * @template DateType - The date object type
 */
export interface HeaderProps<DateType = unknown> extends Omit<DecadeHeaderProps<DateType>, 'viewDate' | 'onPrevDecades' | 'onNextDecades'> {
  /**
   * Callback for "super previous" navigation (jump multiple periods back).
   */
  onSuperPrev?: () => void;

  /**
   * Callback for "super next" navigation (jump multiple periods forward).
   */
  onSuperNext?: () => void;

  /**
   * Content to display in the header (decade range text).
   */
  children?: ReactNode;
}

/**
 * Renders the header for a decade panel picker.
 * Displays a decade range (e.g., "2020-2029") with navigation controls.
 * Returns null if the context specifies hideHeader=true.
 *
 * @template DateType - The date object type used by the date library
 * @param props - Component properties
 * @returns React element or null
 *
 * @example
 *