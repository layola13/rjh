/**
 * Application service for managing layout insets and spacing
 * Extends the base Service class to provide application-level layout management
 */

import { Service } from '../service';

/**
 * Represents a collection of registered spacing values for a specific position
 */
interface SpacingRegistry {
  [key: string]: number;
}

/**
 * Defines all possible layout positions that can be managed
 */
interface ApplicationLayout {
  /** Top bar spacing registry */
  bar: SpacingRegistry;
  /** Top inset registry */
  top: SpacingRegistry;
  /** Left inset registry */
  left: SpacingRegistry;
  /** Inset footer registry */
  insetFooter: SpacingRegistry;
  /** Right inset registry */
  right: SpacingRegistry;
  /** Bottom inset registry */
  bottom: SpacingRegistry;
  /** Footer spacing registry */
  footer: SpacingRegistry;
}

/**
 * Layout position keys
 */
type LayoutPosition = keyof ApplicationLayout;

/**
 * Application service class for managing layout spacing and insets
 * 
 * This service allows components to register and unregister spacing values
 * for different layout positions (bar, top, left, right, bottom, footer, etc.)
 * and automatically calculates the total spacing for each position.
 */
export declare class Application extends Service {
  /** Static property identifier for this service */
  static readonly property: 'application';

  /** Current total bar spacing */
  bar: number;

  /** Current total top inset */
  top: number;

  /** Current total left inset */
  left: number;

  /** Current total inset footer spacing */
  insetFooter: number;

  /** Current total right inset */
  right: number;

  /** Current total bottom inset */
  bottom: number;

  /** Current total footer spacing */
  footer: number;

  /** Internal registry of all spacing values by position */
  application: ApplicationLayout;

  /**
   * Register a spacing value for a specific component and position
   * 
   * @param componentId - Unique identifier for the component registering the spacing
   * @param position - The layout position to register spacing for
   * @param value - The spacing value in pixels
   */
  register(componentId: string, position: LayoutPosition, value: number): void;

  /**
   * Unregister a spacing value for a specific component and position
   * 
   * @param componentId - Unique identifier for the component to unregister
   * @param position - The layout position to unregister from
   */
  unregister(componentId: string, position: LayoutPosition): void;

  /**
   * Update the total spacing for a specific position
   * Recalculates the sum of all registered spacing values for the given position
   * 
   * @param position - The layout position to update
   */
  update(position: LayoutPosition): void;
}