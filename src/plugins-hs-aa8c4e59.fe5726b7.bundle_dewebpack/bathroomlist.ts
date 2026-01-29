import { HSCore } from './path-to-hscore-module';

class MetaDataUtil {
  private mateMap?: Map<unknown, unknown>;

  setMateMap(map: Map<unknown, unknown>): void {
    this.mateMap = map;
  }

  getMateData(key: unknown): unknown | undefined {
    return this.mateMap?.get(key);
  }
}

export const metaDataUtil = new MetaDataUtil();

export const BedRoomList: HSCore.Model.RoomTypeEnum[] = [
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

export const LivingRoomList: HSCore.Model.RoomTypeEnum[] = [
  HSCore.Model.RoomTypeEnum.LivingRoom,
  HSCore.Model.RoomTypeEnum.DiningRoom,
  HSCore.Model.RoomTypeEnum.LivingDiningRoom
];

export const BathRoomList: HSCore.Model.RoomTypeEnum[] = [
  HSCore.Model.RoomTypeEnum.Bathroom,
  HSCore.Model.RoomTypeEnum.MasterBathroom,
  HSCore.Model.RoomTypeEnum.SecondBathroom
];