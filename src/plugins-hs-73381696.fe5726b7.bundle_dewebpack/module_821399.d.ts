/**
 * Context menu strategies module
 * Provides different context menu item strategies based on model types
 */

import type { HSCore } from './HSCore';

/**
 * Represents a context menu item
 */
export interface ContextMenuItem {
  /** Unique identifier for the menu item */
  id: string;
  /** Display label for the menu item */
  label: string;
  /** Icon identifier or path */
  icon?: string;
  /** Click handler for the menu item */
  onClick?: (target: unknown) => void;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Submenu items */
  children?: ContextMenuItem[];
}

/**
 * Context menu strategy interface
 * Defines how to generate context menu items for specific model types
 */
export interface ContextMenuStrategy {
  /** Strategy identifier */
  name: string;
  
  /**
   * Determines if this strategy applies to the given selection
   * @param selection - Array of selected models
   * @returns True if strategy should be applied
   */
  isApplied: (selection: unknown[]) => boolean;
  
  /**
   * Generates context menu items for the selection
   * @param selection - Array of selected models
   * @returns Array of context menu items
   */
  getItems: (selection: unknown[]) => ContextMenuItem[];
}

/**
 * Strategy for auxiliary lines
 * Provides delete action for auxiliary line models
 */
declare const auxiliaryStrategy: ContextMenuStrategy;

/**
 * Strategy for parametric content base models
 */
export declare const ParametricContentBase: ContextMenuStrategy;

/**
 * Strategy for mesh content models
 */
export declare const meshContent: ContextMenuStrategy;

/**
 * Strategy for TPZZ models
 */
export declare const tpzz: ContextMenuStrategy;

/**
 * Strategy for face models
 */
export declare const face: ContextMenuStrategy;

/**
 * Strategy for wainscot models
 */
export declare const wainScot: ContextMenuStrategy;

/**
 * Strategy for customized models
 */
export declare const customizedModel: ContextMenuStrategy;

/**
 * Strategy for customized PM instance models
 */
export declare const customizedPMInstanceModel: ContextMenuStrategy;

/**
 * Strategy for molding models
 */
export declare const molding: ContextMenuStrategy;

/**
 * Strategy for hole models
 */
export declare const hole: ContextMenuStrategy;

/**
 * Strategy for customized structure models
 */
export declare const NCustomizedStructure: ContextMenuStrategy;

/**
 * Strategy for customized parametric roof models
 */
export declare const NCustomizedParametricRoof: ContextMenuStrategy;

/**
 * Strategy for customized parametric stairs models
 */
export declare const NCustomizedParametricStairs: ContextMenuStrategy;

/**
 * Strategy for wall models
 */
export declare const wall: ContextMenuStrategy;

/**
 * Strategy for parametric opening models
 */
export declare const parametricOpening: ContextMenuStrategy;

/**
 * Strategy for opening models
 */
export declare const opening: ContextMenuStrategy;

/**
 * Strategy for soft cloth models
 */
export declare const softCloth: ContextMenuStrategy;

/**
 * Strategy for group models
 */
export declare const group: ContextMenuStrategy;

/**
 * Strategy for content models
 */
export declare const content: ContextMenuStrategy;

/**
 * Ordered array of context menu strategies
 * Strategies are checked in order until one matches via isApplied()
 */
export declare const strategies: readonly [
  typeof ParametricContentBase,
  typeof meshContent,
  typeof tpzz,
  typeof face,
  typeof wainScot,
  typeof customizedModel,
  typeof customizedPMInstanceModel,
  typeof molding,
  typeof auxiliaryStrategy,
  typeof hole,
  typeof NCustomizedStructure,
  typeof NCustomizedParametricRoof,
  typeof NCustomizedParametricStairs,
  typeof wall,
  typeof parametricOpening,
  typeof opening,
  typeof softCloth,
  typeof group,
  typeof content
];