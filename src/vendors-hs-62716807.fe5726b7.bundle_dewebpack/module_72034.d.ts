/**
 * Statistic module with Countdown component
 * Exports the main Statistic component with Countdown as a sub-component
 */

import type { StatisticProps } from './Statistic';
import type { CountdownProps } from './Countdown';

/**
 * Statistic component interface with Countdown sub-component
 */
export interface StatisticComponent extends React.FC<StatisticProps> {
  /**
   * Countdown component for displaying time-based statistics
   */
  Countdown: React.FC<CountdownProps>;
}

/**
 * Main Statistic component with Countdown functionality
 */
declare const Statistic: StatisticComponent;

export default Statistic;
export { StatisticProps, CountdownProps };