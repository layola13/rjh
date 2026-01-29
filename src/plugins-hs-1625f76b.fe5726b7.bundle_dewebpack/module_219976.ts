interface RoomData {
  roomArea: number;
  roomStyle: string;
  roomType: string;
  roomId: string;
  models: unknown[];
  modelCollocationId: string;
  name: string;
  description: string;
  coverUrl: string;
  onlineStatus: string;
}

interface ProductMini {
  id: string;
  name: string;
  description: string;
  image: string;
  status: string;
  contentType: any;
  isMiniProduct: boolean;
  canCustomized: boolean;
}

interface ExtendedProductMini extends ProductMini {
  area: string;
  roomStyleName: string;
  roomTypeName: string;
  roomId: string;
  models: unknown[];
}

class ModelCollocationBuilder {
  static build(roomData: RoomData): ExtendedProductMini {
    const floorplan = HSApp.App.getApp().floorplan;
    const productMini = this._toProductMini(roomData);
    
    return {
      ...productMini,
      area: HSApp.Util.UnitFormater.toAreaDisplayString(
        roomData.roomArea,
        floorplan.displayAreaUnit,
        floorplan.displayAreaPrecisionDigits,
        true
      ),
      roomStyleName: Utils.getRoomNameAttribute("roomStyleAttribute", roomData.roomStyle),
      roomTypeName: Utils.getRoomNameAttribute("roomTypeAttribute", roomData.roomType),
      roomId: roomData.roomId,
      models: roomData.models
    };
  }

  private static _toProductMini(roomData: RoomData): ProductMini {
    return {
      id: roomData.modelCollocationId,
      name: roomData.name,
      description: roomData.description,
      image: roomData.coverUrl,
      status: roomData.onlineStatus,
      contentType: new HSCatalog.ContentType(HSCatalog.ContentTypeEnum.ModelCollocation),
      isMiniProduct: false,
      canCustomized: false
    };
  }
}

export default ModelCollocationBuilder;