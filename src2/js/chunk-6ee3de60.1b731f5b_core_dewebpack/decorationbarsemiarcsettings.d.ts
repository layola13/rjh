import { DecorationBarSettings } from './DecorationBarSettings';
import { DecorationBar } from './DecorationBar';
import { DecorationShape } from './DecorationShape';
import { View } from './View';

/**
 * Settings class for semi-arc decoration bars.
 * Extends the base DecorationBarSettings to provide specific configuration
 * for semi-circular decorative bar elements.
 */
export declare class DecorationBarSemiArcSettings extends DecorationBarSettings {
  /**
   * Reference to the decoration bar instance being configured.
   */
  protected decorationBar?: DecorationBar;

  /**
   * Reference to the decoration shape instance.
   */
  protected decorationShape: DecorationShape;

  /**
   * Reference to the view instance for rendering.
   */
  protected view: View;

  /**
   * Gets the number of decoration elements in the bar.
   * Returns 0 if no decoration bar is associated.
   * 
   * @returns The count of decoration elements
   */
  get count(): number;

  /**
   * Sets the number of decoration elements in the bar.
   * When changed, triggers recreation of components, polygon update,
   * view refresh, and creates a checkpoint in the memento manager.
   * Ignores negative values and no-op if value hasn't changed.
   * 
   * @param value - The new count of decoration elements (must be non-negative)
   */
  set count(value: number);
}