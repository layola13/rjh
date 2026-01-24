import { B2Processor } from './b2processor';
import { RoomTypeOrderEnum } from './constants';

/**
 * Room data structure for BOM (Bill of Materials) export
 */
export interface RoomBomData {
  /** Unique identifier for the room instance */
  ID: string;
  /** Type of the room (e.g., bedroom, living room, kitchen) */
  roomType: string;
  /** Display name for the room type, defaults to "未命名" if not set */
  roomTypeDisplayName: string;
  /** Area of the room in square units */
  area: number;
  /** Layer identifier where the room is located */
  layerId: string;
}

/**
 * Room entity interface with parameter access methods
 */
export interface Room {
  /** Get the unique instance identifier */
  getInstanceId(): string;
  /** Get a parameter value by key */
  getParameterValue(key: string): any;
}

/**
 * Context interface containing room collection
 */
export interface B2RoomContext {
  /** Collection of all rooms in the scene */
  rooms: Room[];
}

/**
 * B2Room - BOM2 processor for room data extraction and formatting
 * 
 * Handles the conversion of room entities to structured BOM data,
 * including sorting by room type and display name.
 */
export declare class B2Room extends B2Processor {
  /** Context containing room data */
  context: B2RoomContext;

  /**
   * Build BOM2 data for all rooms in the context
   * 
   * Extracts room information, sorts by room type order and display name,
   * and returns formatted BOM data array.
   * 
   * @returns Array of room BOM data sorted by type and name
   * @throws Logs error to HSApp error logger if processing fails
   */
  buildBom2Data(): RoomBomData[];

  /**
   * Build BOM data for a single room entity
   * 
   * Extracts key parameters from the room including ID, type,
   * display name, area, and layer information.
   * 
   * @param room - The room entity to process
   * @returns Structured room BOM data object
   */
  buildRoomBomData(room: Room): RoomBomData;
}