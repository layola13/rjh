import { HSCore } from './path/to/635589';

type RoomTypeEnum = typeof HSCore.Model.RoomTypeEnum;

export const templateRoomTypes: RoomTypeEnum[keyof RoomTypeEnum][] = [
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

export const mergeBedroomRoomTypes: RoomTypeEnum[keyof RoomTypeEnum][] = [
  HSCore.Model.RoomTypeEnum.Bedroom,
  HSCore.Model.RoomTypeEnum.MasterBedroom,
  HSCore.Model.RoomTypeEnum.SecondBedroom,
];

export const mergeBathroomTypes: RoomTypeEnum[keyof RoomTypeEnum][] = [
  HSCore.Model.RoomTypeEnum.Bathroom,
  HSCore.Model.RoomTypeEnum.MasterBathroom,
  HSCore.Model.RoomTypeEnum.SecondBathroom,
];