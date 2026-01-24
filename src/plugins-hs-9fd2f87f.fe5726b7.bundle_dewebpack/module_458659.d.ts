/**
 * Module: module_458659
 * Original ID: 458659
 * 
 * This module provides processing functions for customized meta objects
 * in the catalog system, handling context menus and data transformations
 * for user-uploaded DIY content.
 */

/**
 * Supported content types for meta processing
 */
declare const SUPPORTED_CONTENT_TYPES: [
  HSCatalog.ContentTypeEnum.NewDIYCustomizedFeaturewall,
  HSCatalog.ContentTypeEnum.NewDIYCustomizedCeiling
];

/**
 * 3D model dimension information
 */
interface ModelDimensions {
  /** Length along X-axis */
  XLength: number;
  /** Length along Y-axis */
  YLength: number;
  /** Length along Z-axis */
  ZLength: number;
}

/**
 * 3D model metadata
 */
interface ModelInfo extends ModelDimensions {
  /** Unit of measurement (e.g., "m", "cm", "mm") */
  unit?: string;
}

/**
 * User-defined free data structure
 */
interface UserFreeData {
  /** 3D model information */
  modelInfo?: ModelInfo;
  /** 3D model document reference */
  model3d?: unknown;
  /** Material mapping configuration */
  materialMap?: Record<string, unknown>;
  /** Custom parameters */
  parameters?: Record<string, unknown>;
}

/**
 * Context menu item configuration
 */
interface ContextMenuItem {
  /** Unique identifier for the menu item */
  id: string;
  /** Display name */
  name: string;
  /** Icon path */
  icon: string;
  /** Click handler function */
  onclick: (meta: MetaObject, ...args: unknown[]) => void;
}

/**
 * Context menu configuration
 */
interface ContextMenu {
  /** Menu display name */
  name: string;
  /** Array of menu items */
  items: ContextMenuItem[];
}

/**
 * Meta object with extended properties
 */
interface MetaObject {
  /** Content type identifier */
  contentType: {
    isTypeOf(types: HSCatalog.ContentTypeEnum[]): boolean;
  };
  /** Context menu configuration */
  contextmenu?: ContextMenu;
  /** User-defined free data (will be processed and removed) */
  userFreeData?: UserFreeData;
  /** Customized product URL */
  customizedProductUrl?: string;
  /** Unit of measurement */
  unit?: string;
  /** Dimension along X-axis in meters */
  XLength?: number;
  /** Dimension along Y-axis in meters */
  YLength?: number;
  /** Dimension along Z-axis in meters */
  ZLength?: number;
  /** WebCAD document reference */
  webCADDocument?: unknown;
  /** Material mapping configuration */
  materialMap?: Record<string, unknown>;
  /** Custom parameters */
  parameters?: Record<string, unknown>;
  /** Whether the object can be scaled */
  isScalable?: boolean;
}

/**
 * Catalog node with attributes
 */
interface CatalogNode {
  /** Whether the content is uploaded by user */
  isUserUpload: boolean;
}

/**
 * Processes mini meta objects by adding context menu for user-uploaded content.
 * Adds edit, rename, and delete actions to the context menu.
 * 
 * @param metaObject - The meta object to process
 * @param catalogNode - The catalog node containing metadata
 */
export declare function metaMiniProcess(
  metaObject: MetaObject,
  catalogNode: CatalogNode
): void;

/**
 * Processes full meta objects by transforming user data and adding context menu.
 * Handles 3D model information, material maps, and custom parameters.
 * 
 * @param metaObject - The meta object to process
 * @param catalogNode - The catalog node containing metadata
 * @returns The processed meta object with transformed properties
 */
export declare function metaProcess(
  metaObject: MetaObject,
  catalogNode: CatalogNode
): MetaObject;