/**
 * Mood board layout application module
 * Handles the application of mood board layouts to rooms with model placement
 */

/**
 * Room instance from HSApp
 */
interface Room {
  // Room properties would be defined based on HSApp.Room structure
  [key: string]: unknown;
}

/**
 * Model information for a single item in the mood board
 */
interface ModelInfo {
  /** Unique identifier for the model */
  modelId: string;
  [key: string]: unknown;
}

/**
 * Mood board data structure containing layout information
 */
interface MoodBoardData {
  /** Array of model information to be placed in the room */
  modelInfo: ModelInfo[];
  [key: string]: unknown;
}

/**
 * Application instance from HSApp
 */
interface App {
  /** Transaction manager for handling layout operations */
  transManager: {
    createRequest(
      requestType: string,
      params: [Room, MoodBoardData, ProductMetadata]
    ): unknown;
    commitAsync(request: unknown): Promise<unknown[]>;
  };
  [key: string]: unknown;
}

/**
 * Product metadata mapped by model ID
 */
interface ProductMetadata {
  [modelId: string]: unknown;
}

/**
 * Parameters for applying mood board layout
 */
interface ApplyMoodBoardLayoutParams {
  /** Target room to apply the layout to */
  room: Room;
  /** Mood board data containing models and layout information */
  moodBoardData: MoodBoardData;
  /** Application instance */
  app: App;
  /** Whether to clear existing items before applying layout */
  clearBeforeApply?: boolean;
  /** Callback to freeze UI/process during operation */
  freezeProcess?: () => void;
  /** Callback to unfreeze UI/process after operation */
  unfreezeProcess?: () => void;
}

/**
 * Clears all items from a room
 * @param clearAll - Whether to clear all items
 * @param room - Target room to clear
 * @throws Error if clearing fails
 */
declare function cleanHouse(clearAll: boolean, room: Room): Promise<void>;

/**
 * Fetches product metadata for the models in the mood board
 * @param moodBoardData - Mood board data containing model IDs
 * @returns Product metadata mapped by model ID
 * @throws Error if fetching metadata fails
 */
declare function getProductMetadata(
  moodBoardData: MoodBoardData
): Promise<ProductMetadata>;

/**
 * Applies a mood board layout to a room
 * 
 * This function:
 * 1. Optionally clears the existing room content
 * 2. Fetches metadata for all models in the mood board
 * 3. Creates and commits a layout transaction
 * 4. Returns the IDs of successfully placed items
 * 
 * @param params - Configuration parameters for layout application
 * @returns Array of unique IDs for successfully placed items
 * @throws Error if room/data is invalid or layout application fails
 * 
 * @example
 *