/**
 * Price bar component for real-time model pricing display
 * @module PriceBar
 */

import type { App, CommandManager, Plugin, Transaction } from 'HSApp';
import type { Command, Request } from 'HSFPConstants';
import type { SignalHook } from 'HSCore';

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Price display information
 */
interface PriceInfo {
  /** Formatted price number string (e.g., "1,234.56") */
  num: string;
  /** Unit suffix for large numbers (K, M, B) */
  unit: string;
  /** Currency symbol */
  symbol: string;
}

/**
 * Currency unit configuration
 */
interface CurrencyUnit {
  /** Unit identifier */
  unit: string;
  /** Human-readable unit description */
  unitDesc: string;
  [key: string]: unknown;
}

/**
 * Product pricing information from API
 */
interface ProductPrice {
  /** Model/Product ID */
  modelId: string;
  /** Price value */
  price: number;
  [key: string]: unknown;
}

/**
 * BOM (Bill of Materials) content item
 */
interface BomContentItem {
  /** Unique seek identifier for product */
  seekId: string;
  /** Quantity count */
  count?: number;
  /** Regional area measurement */
  regionArea?: number;
  /** Unit type string (e.g., "area", "length") */
  unitTypeStr?: string;
  [key: string]: unknown;
}

/**
 * BOM processing configuration result
 */
interface BomProcessResult {
  config: Array<{ id: string; [key: string]: unknown }>;
  contentInfo: {
    [key: string]: BomContentItem[];
    hardload?: BomContentItem[];
  };
}

/**
 * Parsed BOM data structure
 */
interface ParsedBomData {
  /** Array of product seek IDs */
  ids: string[];
  /** All BOM content items */
  all: BomContentItem[];
  /** Hard-loaded content items */
  hardload?: BomContentItem[];
}

/**
 * User benefit check result
 */
interface BenefitCheckResult {
  useful: boolean;
  [key: string]: unknown;
}

/**
 * MTOP API response wrapper
 */
interface MtopResponse<T> {
  ret?: string[];
  data?: {
    result?: T;
  };
}

/**
 * Command terminated event data
 */
interface CommandEvent {
  data?: {
    cmd?: {
      type?: string;
    };
  };
}

/**
 * Transaction event data
 */
interface TransactionEvent {
  data?: {
    request?: Request & {
      type?: string;
      _subRequests?: Array<{ type?: string }>;
    };
  };
}

// ============================================================================
// Constants
// ============================================================================

/** Command types that trigger price recalculation (user actions) */
const COMMAND_TYPES_USER_ACTION: readonly string[] = [
  HSFPConstants.CommandType.PlaceProduct,
  HSFPConstants.CommandType.DuplicateSequence,
  HSFPConstants.CommandType.PasteSequence,
  HSFPConstants.CommandType.DeleteSelection,
] as const;

/** Command types that trigger price recalculation (clear actions) */
const COMMAND_TYPES_CLEAR_ACTION: readonly string[] = [
  HSFPConstants.CommandType.CmdClearFurniture,
  HSFPConstants.CommandType.CmdClearHardDecorations,
  HSFPConstants.CommandType.CmdClearDecorations,
  HSFPConstants.CommandType.CmdClearView,
] as const;

/** Command types that trigger price recalculation (recommendation actions) */
const COMMAND_TYPES_RECOMMEND_ACTION: readonly string[] = [
  HSFPConstants.CommandType.CmdAddRecommendAccessories,
  HSFPConstants.CommandType.AddRecommendContents,
] as const;

/** Request types that trigger price recalculation on undo/redo */
const REQUEST_TYPES_PRICE_AFFECTING: readonly string[] = [
  HSFPConstants.RequestType.OverwriteEntityRequest,
  HSFPConstants.RequestType.ReplaceProduct,
  HSFPConstants.RequestType.PasteContent,
  HSFPConstants.RequestType.DeleteProduct,
  HSFPConstants.RequestType.AddProduct,
] as const;

/** Conversion factor: square meters to square feet */
const SQUARE_METERS_TO_SQUARE_FEET = 0.092903;

/** Conversion factor: meters to feet */
const METERS_TO_FEET = 0.3048;

/** Threshold for K (thousands) formatting */
const THOUSAND_THRESHOLD = 1000;

/** Threshold for K (thousands) display */
const DISPLAY_THOUSAND_THRESHOLD = 100000;

/** Threshold for M (millions) display */
const MILLION_THRESHOLD = 1000000;

/** Threshold for B (billions) display */
const BILLION_THRESHOLD = 1000000000;

/** Debounce delay for price calculation (ms) */
const PRICE_CALCULATION_DEBOUNCE_MS = 100;

/** Tooltip hover delay (ms) */
const TOOLTIP_HOVER_DELAY_MS = 1000;

/** Decimal places for price display */
const PRICE_DECIMAL_PLACES = 2;

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Fetch multi-unit currency configuration from API
 * @returns Promise resolving to array of currency units
 */
declare function fetchCurrencyUnits(): Promise<CurrencyUnit[]>;

/**
 * Setup event listeners for price updates
 * @param signalHook - Signal hook for event management
 * @param app - Application instance
 * @param commandManager - Command manager instance
 * @param handlers - Event handler functions
 */
declare function setupEventListeners(
  signalHook: SignalHook,
  app: App,
  commandManager: CommandManager,
  handlers: {
    onCommandTerminated: (event: CommandEvent) => void;
    onDocumentOpened: () => void;
    onUndone: (event: TransactionEvent) => void;
    onRedone: (event: TransactionEvent) => void;
    onCommitted: (event: TransactionEvent) => void;
  }
): void;

/**
 * Parse BOM result to extract product IDs and items
 * @param bomResult - BOM processing result
 * @returns Parsed data with IDs and items
 */
declare function parseBomData(bomResult: BomProcessResult): ParsedBomData;

/**
 * Find new product IDs not present in price cache
 * @param newIds - Array of new product IDs
 * @param cachedIds - Set of cached product IDs
 * @returns Array of uncached product IDs
 */
declare function findUncachedIds(newIds: string[], cachedIds: Set<string>): string[];

/**
 * Fetch product prices from API
 * @param modelIds - Array of model IDs to fetch
 * @param priceUnit - Optional price unit string
 * @returns Promise resolving to array of product prices
 */
declare function fetchProductPrices(
  modelIds: string[],
  priceUnit?: string
): Promise<ProductPrice[]>;

/**
 * Convert area from square meters to square feet
 * @param squareMeters - Area in square meters
 * @returns Area in square feet
 */
declare function convertToSquareFeet(squareMeters: number): number;

/**
 * Calculate quantity considering unit conversions
 * @param item - BOM content item
 * @param displayLengthUnit - Current display unit
 * @returns Calculated quantity
 */
declare function calculateItemQuantity(
  item: BomContentItem,
  displayLengthUnit: HSCore.Util.Unit.LengthUnitTypeEnum
): number;

/**
 * Calculate total price from BOM items using cached prices
 * @param items - Array of BOM content items
 * @param priceCache - Map of product ID to price
 * @param displayLengthUnit - Current display unit
 * @returns Total price
 */
declare function calculateTotalPrice(
  items: BomContentItem[],
  priceCache: Map<string, number>,
  displayLengthUnit: HSCore.Util.Unit.LengthUnitTypeEnum
): number;

/**
 * Format price with K/M/B suffix for large numbers
 * @param price - Raw price value
 * @returns Formatted price info object
 */
declare function formatPrice(price: number): PriceInfo;

// ============================================================================
// Component Props & State
// ============================================================================

/**
 * Internal state for PriceBarComponent
 */
interface PriceBarState {
  priceInfo: PriceInfo;
  isLoading: boolean;
  showTooltip: boolean;
  selectedUnit: CurrencyUnit | undefined;
  availableUnits: CurrencyUnit[];
  showCurrencyDropdown: boolean;
}

// ============================================================================
// React Component
// ============================================================================

/**
 * Price bar component displaying real-time calculated model price
 * Features:
 * - Real-time price updates on model changes
 * - Currency unit selection
 * - Loading state indication
 * - Hover tooltip with refresh information
 * 
 * @returns Price bar React element
 */
declare function PriceBarComponent(): React.ReactElement;

// ============================================================================
// Plugin Class
// ============================================================================

/**
 * PriceBar plugin class for rendering price display in application
 */
export declare class PriceBar {
  /**
   * Plugin render order priority
   */
  order: number;

  /**
   * Constructor initializes plugin with default order
   */
  constructor();

  /**
   * Get the React component to render
   * @returns Price bar component instance
   */
  getRenderItem(): React.ReactElement;
}

export default PriceBar;