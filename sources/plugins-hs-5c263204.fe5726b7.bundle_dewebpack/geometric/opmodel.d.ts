/**
 * Model operation handler for floor plan manipulation
 * Handles room layout, furniture placement, and model operations
 */

import { OperationId, BaseOperation } from './base-operation';
import { OperationParamType } from './operation-param-type';

/**
 * Floor information for room operations
 */
export interface Floor {
  id: string;
  roomType?: string;
  [key: string]: unknown;
}

/**
 * Room list item with floor and options
 */
export interface RoomListItem {
  floor: Floor;
  options: RoomOptions;
}

/**
 * Options for room operations
 */
export interface RoomOptions {
  seekIds?: string[];
  notClearExists?: boolean;
  [key: string]: unknown;
}

/**
 * Model information for placement operations
 */
export interface ModelInfo {
  type: string;
  brand?: string;
  roomId?: string;
  roomType?: string;
  [key: string]: unknown;
}

/**
 * Operation parameters
 */
export interface OperationParams {
  subType: OperationParamType;
  roomId: string;
  roomType: string;
  modelInfos: ModelInfo[];
  [key: string]: unknown;
}

/**
 * Operation execution context
 */
export interface OperationContext {
  operationType?: string;
  params: OperationParams;
  reply: string;
  isQuestionTone: number;
  recommendedOperationTypes?: string[];
  [key: string]: unknown;
}

/**
 * Product search parameters
 */
export interface ProductSearchParams {
  limit: number;
  branch?: string;
  currentRoom: {
    roomId?: string;
  };
  text: string;
  treeId: string;
  filterShowAuth: string;
  order: string;
}

/**
 * Product search result item
 */
export interface ProductItem {
  id: string;
  [key: string]: unknown;
}

/**
 * Product search response
 */
export interface ProductSearchResponse {
  data: {
    items: ProductItem[];
  };
}

/**
 * Application instance interface
 */
export interface App {
  floorplan: {
    scene: {
      activeLayer: {
        forEachFloor: (callback: (floor: Floor) => void) => void;
      };
    };
  };
  transManager: {
    startSession: () => TransactionSession;
  };
  pluginManager: {
    getPlugin: (pluginType: string) => Plugin;
  };
}

/**
 * Transaction session for managing operations
 */
export interface TransactionSession {
  commit: () => void;
}

/**
 * Plugin interface
 */
export interface Plugin {
  constraintLayoutPlugin?: {
    handleApplyRooms: (rooms: RoomListItem[]) => Promise<void>;
  };
  signal?: {
    dispatch: (payload: { action: string; payload: unknown }) => void;
  };
}

/**
 * Model operation handler
 * Manages room layout, furniture placement, and model operations in the floor plan
 */
export declare class OpModel extends BaseOperation {
  /**
   * Application instance
   */
  protected app: App;

  /**
   * Creates a new OpModel instance
   */
  constructor();

  /**
   * Gets the unique operation identifier
   * @returns The operation ID for model operations
   */
  static getId(): OperationId;

  /**
   * Retrieves all available room lists from the active floor plan layer
   * @returns Array of room list items with floor and options
   */
  getRoomLists(): RoomListItem[];

  /**
   * Executes the operation based on the provided context
   * Handles layout, placement, and other model operations
   * @param context - Operation execution context
   */
  onExecute(context: OperationContext): void;

  /**
   * Performs room layout operation
   * Applies constraint layout to specified rooms
   * @param context - Operation execution context
   * @param roomLists - Available room list items
   */
  layoutRooms(context: OperationContext, roomLists: RoomListItem[]): void;

  /**
   * Places models/furniture in specified rooms
   * Searches for products and places them using constraint layout
   * @param modelInfos - Array of model information to place
   * @param roomLists - Available room list items
   * @param context - Operation execution context
   */
  placeModels(
    modelInfos: ModelInfo[],
    roomLists: RoomListItem[],
    context: OperationContext
  ): void;

  /**
   * Deletes models from the floor plan
   * @todo Implementation pending
   */
  deleteModels(): void;

  /**
   * Resizes models in the floor plan
   * @todo Implementation pending
   */
  ResizeModels(): void;

  /**
   * Callback invoked when operation completes
   * @param status - Operation status ('success' or 'fail')
   * @param message - Result message
   * @param context - Operation execution context
   */
  protected onFinish(
    status: 'success' | 'fail',
    message: string,
    context: OperationContext
  ): void;
}