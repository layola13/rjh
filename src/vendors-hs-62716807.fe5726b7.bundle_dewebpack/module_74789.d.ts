/**
 * Link component module
 * Exports a default component with an attached Link property
 */

import type DefaultComponent from './843212';
import type LinkComponent from './134392';

/**
 * Combined component interface
 * Main component with Link property attached
 */
interface ComponentWithLink extends DefaultComponent {
  /**
   * Link component for navigation
   */
  Link: typeof LinkComponent;
}

/**
 * Default export combining the main component with Link
 */
declare const component: ComponentWithLink;

export default component;
export { LinkComponent as Link };