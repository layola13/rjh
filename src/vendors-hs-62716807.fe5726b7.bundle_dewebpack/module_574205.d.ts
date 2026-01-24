/**
 * Context for managing inline collapsed state in a menu or navigation component.
 * This context is typically used to control the expansion/collapse behavior of inline menu items.
 */

import { Context } from 'react';

/**
 * Shape of the inline collapse context value
 */
export interface InlineCollapseContextValue {
  /**
   * Whether the inline menu items are currently collapsed
   * @default false
   */
  inlineCollapsed: boolean;
}

/**
 * React context for sharing inline collapse state across menu components
 */
declare const InlineCollapseContext: Context<InlineCollapseContextValue>;

export default InlineCollapseContext;