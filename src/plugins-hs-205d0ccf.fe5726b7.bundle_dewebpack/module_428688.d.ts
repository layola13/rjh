/**
 * Room type configuration module
 * Provides predefined collections of room types for templates and merging operations
 */

import { HSCore } from './635589';

/**
 * Standard room types available for template creation
 * Includes common residential spaces like living areas, bedrooms, and bathrooms
 */
export const templateRoomTypes: readonly HSCore.Model.RoomTypeEnum[] = [
  HSCore.Model.RoomTypeEnum.DiningRoom,
  HSCore.Model.RoomTypeEnum.LivingRoom,
  HSCore.Model.RoomTypeEnum.LivingDiningRoom,
  HSCore.Model.RoomTypeEnum.Bedroom,
  HSCore.Model.RoomTypeEnum.MasterBedroom,
  HSCore.Model.RoomTypeEnum.SecondBedroom,
  HSCore.Model.RoomTypeEnum.KidsRoom,
  HSCore.Model.RoomTypeEnum.Kitchen,
  HSCore.Model.RoomTypeEnum.Bathroom,
  HSCore.Model.RoomTypeEnum.MasterBathroom,
  HSCore.Model.RoomTypeEnum.SecondBathroom,
  HSCore.Model.RoomTypeEnum.Library,
];

/**
 * Bedroom room types that can be merged together
 * Used for consolidating different bedroom categories
 */
export const mergeBedroomRoomTypes: readonly HSCore.Model.RoomTypeEnum[] = [
  HSCore.Model.RoomTypeEnum.Bedroom,
  HSCore.Model.RoomTypeEnum.MasterBedroom,
  HSCore.Model.RoomTypeEnum.SecondBedroom,
];

/**
 * Bathroom types that can be merged together
 * Used for consolidating different bathroom categories
 */
export const mergeBathroomTypes: readonly HSCore.Model.RoomTypeEnum[] = [
  HSCore.Model.RoomTypeEnum.Bathroom,
  HSCore.Model.RoomTypeEnum.MasterBathroom,
  HSCore.Model.RoomTypeEnum.SecondBathroom,
];