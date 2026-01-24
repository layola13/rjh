/**
 * CSS Module Declaration
 * Defines type-safe class names for the vertical divider status bar component
 */

/**
 * CSS class names available in this module
 */
interface IVDividerStatusBarStyles {
  /** Container wrapper for the vertical divider status bar */
  'vdivider-status-bar-container': string;
  
  /** The actual vertical divider bar element with 18px height and left border */
  'vdivider-status-bar': string;
}

/**
 * CSS Module export for vertical divider status bar styles
 * @example
 * import styles from './vdivider-status-bar.module.css';
 * <div className={styles['vdivider-status-bar-container']}>
 *   <div className={styles['vdivider-status-bar']} />
 * </div>
 */
declare const styles: IVDividerStatusBarStyles;

export default styles;