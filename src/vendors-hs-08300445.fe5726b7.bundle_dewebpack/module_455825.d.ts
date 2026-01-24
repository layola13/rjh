/**
 * Calendar/DatePicker header navigation component
 * Provides navigation buttons for switching between time periods
 */

import { ReactNode, CSSProperties, MouseEventHandler, Context } from 'react';

/**
 * Context value for controlling button visibility
 */
export interface HeaderContext {
  /** Whether to hide the next navigation button */
  hideNextBtn?: boolean;
  /** Whether to hide the previous navigation button */
  hidePrevBtn?: boolean;
}

/**
 * Props for the Header navigation component
 */
export interface HeaderProps {
  /** CSS class prefix for styling */
  prefixCls: string;
  
  /** Icon for previous period navigation (default: "‹") */
  prevIcon?: ReactNode;
  
  /** Icon for next period navigation (default: "›") */
  nextIcon?: ReactNode;
  
  /** Icon for super previous navigation (e.g., previous year, default: "«") */
  superPrevIcon?: ReactNode;
  
  /** Icon for super next navigation (e.g., next year, default: "»") */
  superNextIcon?: ReactNode;
  
  /** Callback when super previous button is clicked */
  onSuperPrev?: MouseEventHandler<HTMLButtonElement>;
  
  /** Callback when super next button is clicked */
  onSuperNext?: MouseEventHandler<HTMLButtonElement>;
  
  /** Callback when previous button is clicked */
  onPrev?: MouseEventHandler<HTMLButtonElement>;
  
  /** Callback when next button is clicked */
  onNext?: MouseEventHandler<HTMLButtonElement>;
  
  /** Content to be rendered in the header view area */
  children?: ReactNode;
}

/**
 * Header navigation component for calendar/date picker
 * Renders navigation buttons and a central view area for displaying current period
 * 
 * @param props - Component props
 * @returns React element containing navigation controls
 */
declare function Header(props: HeaderProps): JSX.Element;

export default Header;

/**
 * Context for controlling header button visibility
 */
export declare const HeaderContext: Context<HeaderContext>;