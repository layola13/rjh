import { HSCore, HSCatalog } from './635589';

let idCounter = 0;

export function idGenerator(): string {
  idCounter++;
  return idCounter.toString();
}

interface Floor {
  roomType: HSCore.Model.RoomTypeEnum;
}

interface ContentFilter {
  floor: Floor;
  _isParametricContent(content: HSCore.Model.Content): boolean;
}

type ContentItem = HSCore.Model.Content | HSCore.Model.Group | HSCore.Model.Content[];

export function getTargetContent(item: ContentItem, result: HSCore.Model.Content[]): void {
  if (item instanceof Array) {
    item.forEach((element) => {
      getTargetContent(element, result);
    });
  } else if (item instanceof HSCore.Model.Group) {
    item.forEachMember((member) => {
      getTargetContent(member, result);
    });
  } else if (item instanceof HSCore.Model.Content && isTargetContent(item)) {
    result.push(item);
  }
}

function isRoomTypeValid(content: HSCore.Model.Content, roomType: HSCore.Model.RoomTypeEnum): boolean {
  const RoomType = HSCore.Model.RoomTypeEnum;
  
  switch (roomType) {
    case RoomType.Bedroom:
    case RoomType.SecondBathroom:
    case RoomType.MasterBathroom:
    case RoomType.ElderlyRoom:
    case RoomType.NannyRoom:
      return content.contentType.isTypeOf([
        HSCatalog.ContentTypeEnum.SingleSeatSofa,
        HSCatalog.ContentTypeEnum.Table,
        HSCatalog.ContentTypeEnum.Dresser,
        "coffee table - round",
        "coffee table - irregular shape",
        HSCatalog.ContentTypeEnum.CoffeTable,
        HSCatalog.ContentTypeEnum.Chair,
        "armchair",
        "single bed",
        "king-size bed",
        HSCatalog.ContentTypeEnum.StorageUnit,
        HSCatalog.ContentTypeEnum.Armoire,
        HSCatalog.ContentTypeEnum.FloorBasedKitchenCabinet,
        HSCatalog.ContentTypeEnum.NightTable,
        HSCatalog.ContentTypeEnum.MediaUnit,
        HSCatalog.ContentTypeEnum.FloorBasedMediaUnit,
        HSCatalog.ContentTypeEnum.HutchBuffet,
        "side table",
        HSCatalog.ContentTypeEnum.TelevisionWallAttached,
        HSCatalog.ContentTypeEnum.TelevisionOnTopOfOthers,
        HSCatalog.ContentTypeEnum.Rug
      ]);
    default:
      return false;
  }
}

function isContentValidForRoom(this: ContentFilter, content: HSCore.Model.Content): boolean {
  return (
    content.isContentInRoom(this.floor) &&
    !(content instanceof HSCore.Model.Group) &&
    !this._isParametricContent(content) &&
    isRoomTypeValid(content, this.floor.roomType)
  );
}

export function isTargetContent(content: HSCore.Model.Content, filter?: ContentFilter): boolean {
  if (!content.isFlagOff(HSCore.Model.EntityFlagEnum.removed)) {
    return false;
  }

  if (
    !content.contentType ||
    content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_CeilingAttached) ||
    content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedPersonalizedModel) ||
    content instanceof HSCore.Model.Opening ||
    content instanceof HSCore.Model.CornerWindow ||
    content instanceof HSCore.Model.Door ||
    content instanceof HSCore.Model.Window ||
    content instanceof HSCore.Model.BayWindow ||
    content instanceof HSCore.Model.CornerFlatWindow ||
    content instanceof HSCore.Model.POrdinaryWindow ||
    content instanceof HSCore.Model.ParametricOpening
  ) {
    return false;
  }

  if (!filter) {
    return false;
  }

  return isContentValidForRoom.call(filter, content);
}