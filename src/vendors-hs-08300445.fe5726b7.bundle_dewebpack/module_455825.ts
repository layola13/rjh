/**
 * React Calendar Header Component
 * Provides navigation buttons (prev/next/super-prev/super-next) for calendar views
 */

import { ReactNode, MouseEventHandler, CSSProperties } from 'react';

/**
 * Props for the calendar header component
 */
export interface CalendarHeaderProps {
  /**
   * CSS class prefix for styling
   */
  prefixCls: string;

  /**
   * Icon for previous period button
   * @default "‹"
   */
  prevIcon?: ReactNode;

  /**
   * Icon for next period button
   * @default "›"
   */
  nextIcon?: ReactNode;

  /**
   * Icon for super previous period button (e.g., previous year)
   * @default "«"
   */
  superPrevIcon?: ReactNode;

  /**
   * Icon for super next period button (e.g., next year)
   * @default "»"
   */
  superNextIcon?: ReactNode;

  /**
   * Callback fired when super previous button is clicked
   */
  onSuperPrev?: MouseEventHandler<HTMLButtonElement>;

  /**
   * Callback fired when super next button is clicked
   */
  onSuperNext?: MouseEventHandler<HTMLButtonElement>;

  /**
   * Callback fired when previous button is clicked
   */
  onPrev?: MouseEventHandler<HTMLButtonElement>;

  /**
   * Callback fired when next button is clicked
   */
  onNext?: MouseEventHandler<HTMLButtonElement>;

  /**
   * Children elements to render in the header view area
   */
  children?: ReactNode;
}

/**
 * Context value for controlling button visibility
 */
export interface CalendarHeaderContextValue {
  /**
   * Whether to hide the next navigation buttons
   */
  hideNextBtn?: boolean;

  /**
   * Whether to hide the previous navigation buttons
   */
  hidePrevBtn?: boolean;
}

/**
 * Calendar header component with navigation controls
 * Renders prev/next and super-prev/super-next buttons for calendar navigation
 */
declare const CalendarHeader: React.FC<CalendarHeaderProps>;

export default CalendarHeader;