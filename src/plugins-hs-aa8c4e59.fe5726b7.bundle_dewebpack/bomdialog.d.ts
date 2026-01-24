/**
 * BOM (Bill of Materials) Dialog Component Module
 * Provides filtering and export functionality for materials, models, and categories
 */

import { Signal } from './HSCore';

// ============================================================================
// Enums & Constants
// ============================================================================

/**
 * Model source types for filtering
 */
export enum ModelKeysEnums {
  /** Public/shared models */
  COMMON = 'COMMON',
  /** Enterprise/team models */
  ENTERPRISE = 'ENTERPRISE',
  /** Private/personal models */
  PRIVATE = 'PRIVATE',
  /** Other model sources */
  OTHERS = 'OTHERS'
}

/**
 * Product category types for BOM export
 */
export enum CategoryKeysEnums {
  /** Tiles and flooring materials */
  MATERIAL = 'MATERIAL',
  /** Doors and door frames */
  DOOR = 'DOOR',
  /** Windows and openings */
  OPENING = 'OPENING',
  /** Background walls and feature walls */
  BACKGROUNDWALL = 'BACKGROUNDWALL',
  /** Furniture items */
  FURNITURE = 'FURNITURE',
  /** Appliances and fixtures */
  APPLIANCE = 'APPLIANCE',
  /** Hard decoration (aggregated category) */
  HARD = 'HARD',
  /** Other miscellaneous items */
  OTHERS = 'OTHERS'
}

/**
 * Dialog workflow states
 */
export type DialogState = 'filter' | 'shopTask';

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Model source selection values
 * Keys are ModelKeysEnums, values indicate selection state
 */
export interface ModelValues {
  [ModelKeysEnums.COMMON]?: boolean;
  [ModelKeysEnums.ENTERPRISE]?: boolean;
  [ModelKeysEnums.PRIVATE]?: boolean;
  [ModelKeysEnums.OTHERS]?: boolean;
}

/**
 * Category selection values
 * Keys are CategoryKeysEnums, values indicate selection state
 */
export interface CategoryValues {
  [CategoryKeysEnums.MATERIAL]?: boolean;
  [CategoryKeysEnums.DOOR]?: boolean;
  [CategoryKeysEnums.OPENING]?: boolean;
  [CategoryKeysEnums.BACKGROUNDWALL]?: boolean;
  [CategoryKeysEnums.FURNITURE]?: boolean;
  [CategoryKeysEnums.APPLIANCE]?: boolean;
  [CategoryKeysEnums.HARD]?: boolean;
  [CategoryKeysEnums.OTHERS]?: boolean;
}

/**
 * Combined filter values for BOM export
 */
export interface FilterValues {
  /** Selected model source filters */
  modelValues: ModelValues;
  /** Selected category filters */
  categoryValues: CategoryValues;
  /** Whether to include tile plan model numbers */
  tilePlanModelNumbersChecked: boolean;
  /** Optional tile task ID from CAD integration */
  tileTaskId?: string;
  /** Optional shop/supplier task ID */
  shopTaskId?: string;
}

/**
 * Shop/supplier information for task binding
 */
export interface ShopInfo {
  /** List of available shops/suppliers */
  shops: Shop[];
  /** Pre-selected channel mapping */
  selectChanelMap: Record<string, unknown>;
}

/**
 * Individual shop/supplier entity
 */
export interface Shop {
  id: string;
  name: string;
  [key: string]: unknown;
}

/**
 * Unit configuration for pricing/measurements
 */
export interface UnitConfig {
  /** Measurement unit (e.g., 'm²', 'pcs') */
  unit: string;
}

/**
 * Signal payload for dialog state updates
 */
export interface DialogStatePayload {
  /** Current dialog state */
  state: DialogState;
  /** Number of models in current selection */
  models?: number;
}

// ============================================================================
// Component Props
// ============================================================================

/**
 * Props for the BomDialog component
 */
export interface BomDialogProps {
  /** Default model source selections */
  defaultModelValues: ModelValues;
  /** Default category selections */
  defaultCategoryValues: CategoryValues;
  /** Callback when filter values change */
  onValuesChange: (values: Partial<FilterValues>) => void;
  /** Whether user is in enterprise mode */
  isEnterprise?: boolean;
  /** Cancel button handler */
  onCancel: () => void;
  /** Confirm button handler with final filter values */
  onOk: (values: FilterValues) => void;
  /** Whether shop/supplier task binding is required */
  isNeedTaskShop: boolean;
  /** 
   * Validation callback before state transition
   * @param currentState - Current dialog state
   * @param nextState - Target dialog state
   * @returns Promise resolving to true if transition allowed
   */
  canNextState?: (currentState: DialogState, nextState: DialogState) => Promise<boolean>;
  /** Handler for membership upgrade action */
  handleUpgrade: () => void;
}

/**
 * Props for the Filter component
 */
export interface FilterProps {
  /** Default model source selections */
  defaultModelValues: ModelValues;
  /** Default category selections */
  defaultCategoryValues: CategoryValues;
  /** Callback when filter values change */
  onValuesChange: (values: Partial<FilterValues>) => void;
  /** Whether user is in enterprise mode */
  isEnterprise?: boolean;
}

// ============================================================================
// Component Declarations
// ============================================================================

/**
 * Dialog title component displaying current state and model count
 * Automatically updates based on dialog state changes
 */
export declare const BomDialogTitle: React.FC;

/**
 * Main BOM dialog component
 * Handles multi-step workflow: filtering → shop task binding → export
 * 
 * @example
 *