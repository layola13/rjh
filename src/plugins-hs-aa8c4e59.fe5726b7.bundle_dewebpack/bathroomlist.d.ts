/**
 * Room type classification and metadata management utilities
 * @module BathRoomList
 */

import { HSCore } from './path/to/HSCore';

/**
 * Metadata utility class for managing room type metadata
 */
declare class MetaDataUtil {
  /**
   * Internal map storing metadata keyed by room type or identifier
   */
  private mateMap: Map<unknown, unknown>;

  /**
   * Sets the metadata map
   * @param map - The metadata map to store
   */
  setMateMap(map: Map<unknown, unknown>): void;

  /**
   * Retrieves metadata for a given key
   * @param key - The key to lookup in the metadata map
   * @returns The metadata associated with the key, or undefined if not found
   */
  getMateData(key: unknown): unknown;
}

/**
 * Singleton instance of the metadata utility
 */
export declare const metaDataUtil: MetaDataUtil;

/**
 * List of bedroom-related room types
 * Includes various bedroom categories and adjacent spaces
 */
export declare const BedRoomList: readonly [
  HSCore.Model.RoomTypeEnum.Bedroom,
  HSCore.Model.RoomTypeEnum.MasterBedroom,
  HSCore.Model.RoomTypeEnum.SecondBedroom,
  HSCore.Model.RoomTypeEnum.KidsRoom,
  HSCore.Model.RoomTypeEnum.ElderlyRoom,
  HSCore.Model.RoomTypeEnum.Library,
  HSCore.Model.RoomTypeEnum.CloakRoom,
  HSCore.Model.RoomTypeEnum.StorageRoom,
  HSCore.Model.RoomTypeEnum.NannyRoom,
  HSCore.Model.RoomTypeEnum.Lounge,
  HSCore.Model.RoomTypeEnum.Auditorium
];

/**
 * List of living room-related room types
 * Includes living spaces and dining areas
 */
export declare const LivingRoomList: readonly [
  HSCore.Model.RoomTypeEnum.LivingRoom,
  HSCore.Model.RoomTypeEnum.DiningRoom,
  HSCore.Model.RoomTypeEnum.LivingDiningRoom
];

/**
 * List of bathroom-related room types
 * Includes various bathroom categories
 */
export declare const BathRoomList: readonly [
  HSCore.Model.RoomTypeEnum.Bathroom,
  HSCore.Model.RoomTypeEnum.MasterBathroom,
  HSCore.Model.RoomTypeEnum.SecondBathroom
];