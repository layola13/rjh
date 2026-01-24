/**
 * Property tree parsing utility for parametric models
 * Handles conversion of property tree nodes to property bar UI components
 */

import { HSCore } from 'HSCore';
import { IPropertyTreeNode, IPropertyTreeNodeType } from './IPropertyTreeNode';
import { 
  EN_PROPERTY_PANEL_WIN_SUB_PART_TYPE, 
  EN_PROPERTY_PANEL_CONTENT_TYPE 
} from './PropertyPanelTypes';
import { ParametricModelPropertyBarUtil } from './ParametricModelPropertyBarUtil';

/**
 * Options for hooking property items
 */
interface PropertyTreeParseOptions {
  /** Title for the property bar */
  title: string;
  /** Basic property items to display */
  basicPropertyItems: PropertyBarItem[];
  /** Callback when boolean input data changes */
  onBoolInputDataChange: (node: IPropertyTreeNode, value: boolean) => void;
  /** Callback when reset is clicked */
  onResetClick: (node: IPropertyTreeNode) => void;
  /** Callback when basic property reset is clicked */
  onBasicPropertyResetClick: () => void;
  /** Callback when a value changes */
  onValueChange: (node: IPropertyTreeNode, value: any) => void;
  /** Callback when profile replace is clicked */
  onProfileReplaceClick: (node: IPropertyTreeNode) => void;
  /** Callback when subpart replace is clicked */
  onReplaceSubpartClick?: (entity: HSCore.Model.Entity, node: IPropertyTreeNode) => void;
  /** Hook property molding handler */
  hookPropertyMolding: (node: IPropertyTreeNode) => PropertyBarItem;
  /** Get material edit card props */
  getMaterialEditCardProps: (entity: HSCore.Model.Entity, node: IPropertyTreeNode) => MaterialEditCardProps;
}

/**
 * Property bar item configuration
 */
interface PropertyBarItem {
  id: string;
  type: string;
  label?: string;
  data?: Record<string, any>;
  items?: PropertyBarItem[];
  status?: boolean;
  disabled?: boolean;
  resetItem?: ResetItemConfig;
  onStatusChange?: (status: boolean) => void;
  getRenderItem?: () => React.ReactNode;
  uiMode?: string[];
  disableShow?: boolean;
  uniqueKey?: boolean;
}

/**
 * Reset item configuration
 */
interface ResetItemConfig {
  onResetClick: () => void;
}

/**
 * Material edit card properties
 */
interface MaterialEditCardProps {
  onRotateIconClick: () => void;
  onReplaceBtnClick: () => void;
}

/**
 * Material information structure
 */
interface MaterialInfo {
  seekId: string;
  rotation: number;
  sliderOffsetX: number;
  sliderOffsetY: number;
  maxSliderX: number;
  maxSliderY: number;
  scaleX: number;
  scaleY: number;
}

/**
 * Size range for property constraints
 */
interface SizeRange {
  minSize: number;
  maxSize: number;
}

/**
 * Dropdown list item
 */
interface DropdownItem {
  id: string;
  title: string;
}

/**
 * Utility class for parsing property trees and generating property bar configurations
 */
export declare class PropertyTreeParseUtil {
  /** The entity being configured */
  private entity: HSCore.Model.Entity;
  
  /** Command manager instance */
  private cmdMgr: any;
  
  /** Catalog plugin instance */
  private catalogPlugin: any;
  
  /** Configuration options */
  private options: PropertyTreeParseOptions | undefined;

  /**
   * Creates a new PropertyTreeParseUtil instance
   * @param entity - The entity to parse properties for
   */
  constructor(entity: HSCore.Model.Entity);

  /**
   * Hook and generate property bar items from entity parameters
   * @param options - Configuration options for property generation
   * @returns Array of property bar items
   */
  hookPropertyItem(options: PropertyTreeParseOptions): PropertyBarItem[];

  /**
   * Recursively hook a child property item based on its type
   * @param node - The property tree node to process
   * @param rootNode - The root property tree node
   * @returns Generated property bar item or undefined
   */
  hookPropertyChildItem(node: IPropertyTreeNode, rootNode: IPropertyTreeNode): PropertyBarItem | undefined;

  /**
   * Hook property items for hierarchical level nodes
   * @param node - The property tree node
   * @param rootNode - The root property tree node
   * @returns Property bar item for level nodes or undefined
   */
  private _hookPropertyLevel(node: IPropertyTreeNode, rootNode: IPropertyTreeNode): PropertyBarItem | undefined;

  /**
   * Convert options array to dropdown list format
   * @param options - Array of option values
   * @returns Array of dropdown items
   */
  private _setDropdownList(options: string[]): DropdownItem[];

  /**
   * Hook property item for FLOAT type nodes
   * @param node - Float property node
   * @returns Property bar item configuration
   */
  private _hookPropertyFLOAT(node: IPropertyTreeNode): PropertyBarItem;

  /**
   * Hook property item for INTEGER type nodes
   * @param node - Integer property node
   * @returns Property bar item configuration
   */
  private _hookPropertyINTEGER(node: IPropertyTreeNode): PropertyBarItem;

  /**
   * Hook property item for PROFILE type nodes
   * @param node - Profile property node
   * @returns Property bar item configuration
   */
  private _hookPropertyPROFILE(node: IPropertyTreeNode): PropertyBarItem;

  /**
   * Hook property item for BOOLEAN type nodes
   * @param node - Boolean property node
   * @returns Property bar item configuration
   */
  private _hookPropertyBOOLEAN(node: IPropertyTreeNode): PropertyBarItem;

  /**
   * Hook property item for STRING type nodes
   * @param node - String property node
   * @returns Property bar item configuration
   */
  private _hookPropertySTRING(node: IPropertyTreeNode): PropertyBarItem;

  /**
   * Hook property item for LABEL type nodes
   * @param node - Label property node
   * @returns Property bar item configuration
   */
  private _hookPropertyLabel(node: IPropertyTreeNode): PropertyBarItem;

  /**
   * Hook property item for MATERIAL type nodes
   * @param node - Material property node
   * @returns Array of property bar items for material configuration
   */
  private _hookPropertyMATERIIAL(node: IPropertyTreeNode): PropertyBarItem[];

  /**
   * Hook property item for subpart type nodes
   * @param node - Subpart property node
   * @returns Array of property bar items for subpart configuration
   */
  private _hookPropertySubpart(node: IPropertyTreeNode): PropertyBarItem[];

  /**
   * Get material information by variable name from entity
   * @param entity - The entity to query
   * @param variableName - The variable name identifying the material
   * @returns Material information or undefined if not found
   */
  static getMaterialInfoByVariableName(
    entity: HSCore.Model.Entity, 
    variableName: string
  ): MaterialInfo | undefined;
}