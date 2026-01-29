export type RoomType =
  | 'Bathroom'
  | 'MasterBathroom'
  | 'SecondBathroom'
  | 'BathroomDryArea'
  | 'Bedroom'
  | 'SecondBedroom'
  | 'MasterBedroom'
  | 'LivingRoom'
  | 'DiningRoom'
  | 'LivingDiningRoom'
  | 'MasterBedroom'
  | 'Aisle'
  | 'CloakRoom'
  | 'KidsRoom'
  | 'Balcony'
  | 'Kitchen'
  | 'Courtyard'
  | 'Terrace';

interface DestructuredRoomId {
  designId: string;
  roomType: string;
  floorId: string;
  contentsPercentage: string;
  flip: string;
  rotation: string;
  appliedIndex: string;
}

interface FloorPlan {
  roomType: RoomType;
}

const ROOM_TYPE_GROUPS: Record<string, RoomType[]> = {
  Bathroom: ['Bathroom', 'MasterBathroom', 'SecondBathroom', 'BathroomDryArea'],
  MasterBathroom: ['Bathroom', 'MasterBathroom', 'SecondBathroom', 'BathroomDryArea'],
  SecondBathroom: ['Bathroom', 'MasterBathroom', 'SecondBathroom', 'BathroomDryArea'],
  BathroomDryArea: ['Bathroom', 'MasterBathroom', 'SecondBathroom', 'BathroomDryArea'],
  Bedroom: ['Bedroom', 'SecondBedroom', 'MasterBedroom'],
  SecondBedroom: ['Bedroom', 'SecondBedroom', 'MasterBedroom'],
  MasterBedroom: ['Bedroom', 'SecondBedroom', 'MasterBedroom'],
  LivingRoom: ['LivingRoom', 'DiningRoom', 'LivingDiningRoom'],
  DiningRoom: ['DiningRoom', 'LivingRoom', 'LivingDiningRoom'],
  LivingDiningRoom: ['LivingDiningRoom', 'LivingRoom', 'DiningRoom']
};

export const supportedRoomTypes: string[] = Object.keys(ROOM_TYPE_GROUPS);

export function destructureRoomId(roomId: string): DestructuredRoomId {
  const [designId, roomType, floorId, contentsPercentage, flip, rotation, appliedIndex] = roomId.split('_');
  
  return {
    designId,
    roomType,
    floorId,
    contentsPercentage,
    flip,
    rotation,
    appliedIndex
  };
}

export function isSupportRoomType(roomType: string): boolean {
  return (ROOM_TYPE_GROUPS[roomType]?.length ?? 0) > 0;
}

export function getFloorRoomTypes(floorPlan: FloorPlan): RoomType[] {
  return ROOM_TYPE_GROUPS[floorPlan.roomType] ?? [];
}

export function getGroupedRoomTypes(roomType: string): RoomType[] {
  return ROOM_TYPE_GROUPS[roomType];
}

export class RoomTypeUtil {
  static readonly bedrooms: RoomType[] = ['MasterBedroom', 'Bedroom', 'SecondBedroom'];
  static readonly livingrooms: RoomType[] = ['LivingRoom', 'LivingDiningRoom', 'DiningRoom'];
  static readonly bathrooms: RoomType[] = ['Bathroom', 'MasterBathroom', 'SecondBathroom', 'BathroomDryArea'];
  static readonly aisles: RoomType[] = ['Aisle'];
  static readonly cloakrooms: RoomType[] = ['CloakRoom'];
  static readonly kidsrooms: RoomType[] = ['KidsRoom'];
  static readonly balconies: RoomType[] = ['Balcony'];
  static readonly kitchens: RoomType[] = ['Kitchen'];
  static readonly courtyards: RoomType[] = ['Courtyard'];
  static readonly terraces: RoomType[] = ['Terrace'];
}