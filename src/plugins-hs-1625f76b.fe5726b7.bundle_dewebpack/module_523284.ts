import { HSCatalog } from './HSCatalog';
import { Utils } from './Utils';

interface CustomizedRoom {
  roomArea: number;
  roomType: string;
  roomStyle: string;
  creator: string;
  designId: string;
  roomId: string;
  bathroomCount?: number;
  bedroomCount?: number;
  livingroomCount?: number;
}

interface SourceProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  contentType: number;
  customizedRoom: CustomizedRoom;
  jsonUrl?: string;
  copyright?: string;
  dataType?: string;
  showFavorite?: boolean;
  favoritesId?: string;
  imageRenderingUid?: string;
  imageRenderingType?: string;
  imageDesignVersion?: string;
  supportSelect?: boolean;
  hasPano?: boolean;
  sellType?: string;
  paid?: boolean;
}

interface ProductMini {
  id: string;
  name: string;
  description: string;
  image: string;
  productType: number;
  contentType: HSCatalog.ContentType;
  area?: string;
  roomTypeName?: string;
  roomStyleName?: string;
  bathroomCount?: number;
  bedroomCount?: number;
  livingroomCount?: number;
  creatorGuid?: string;
  designId?: string;
  roomId?: string;
  customizedRoom?: CustomizedRoom;
  jsonUrl?: string;
  copyright?: string;
  dataType?: string;
  showFavorite?: boolean;
  favoritesId?: string;
  imageRenderingUid?: string;
  imageRenderingType?: string;
  imageDesignVersion?: string;
  supportSelect?: boolean;
  hasPano?: boolean;
  sellType?: string;
  paid?: boolean;
}

export default class ProductBuilder {
  /**
   * Builds a ProductMini object from source product data
   */
  static build(sourceProduct: SourceProduct): ProductMini {
    const floorplan = HSApp.App.getApp().floorplan;
    const productMini = this._toProductMini(sourceProduct);

    switch (productMini.productType) {
      case HSCatalog.ProductTypeEnum.StylerTemplate: {
        const area = HSApp.Util.UnitFormater.toAreaDisplayString(
          sourceProduct.customizedRoom.roomArea,
          floorplan.displayAreaUnit,
          floorplan.displayAreaPrecisionDigits,
          true
        );
        const roomTypeName = Utils.getRoomNameAttribute('roomTypeAttribute', sourceProduct.customizedRoom.roomType);
        const roomStyleName = Utils.getRoomNameAttribute('roomStyleAttribute', sourceProduct.customizedRoom.roomStyle);
        const creatorGuid = sourceProduct.customizedRoom.creator;
        const designId = sourceProduct.customizedRoom.designId;
        const roomId = sourceProduct.customizedRoom.roomId;
        const customizedRoom = sourceProduct.customizedRoom;
        const jsonUrl = sourceProduct.jsonUrl;
        const copyright = sourceProduct.copyright;
        const dataType = sourceProduct.dataType;
        const showFavorite = sourceProduct.showFavorite;
        const favoritesId = sourceProduct.favoritesId;
        const imageRenderingUid = sourceProduct.imageRenderingUid;
        const imageRenderingType = sourceProduct.imageRenderingType;
        const imageDesignVersion = sourceProduct.imageDesignVersion;
        const supportSelect = sourceProduct.supportSelect;
        const hasPano = sourceProduct.hasPano;
        const sellType = sourceProduct.sellType;
        const paid = sourceProduct.paid;

        Object.assign(productMini, {
          area,
          roomTypeName,
          roomStyleName,
          creatorGuid,
          designId,
          roomId,
          customizedRoom,
          jsonUrl,
          copyright,
          dataType,
          showFavorite,
          favoritesId,
          imageRenderingUid,
          imageRenderingType,
          imageDesignVersion,
          supportSelect,
          hasPano,
          sellType,
          paid
        });
      }

      case HSCatalog.ProductTypeEnum.FullRoom: {
        const area = HSApp.Util.UnitFormater.toAreaDisplayString(
          sourceProduct.customizedRoom.roomArea,
          floorplan.displayAreaUnit,
          floorplan.displayAreaPrecisionDigits,
          true
        );
        const roomTypeName = Utils.getRoomNameAttribute('roomTypeAttribute', sourceProduct.customizedRoom.roomType);
        const roomStyleName = Utils.getRoomNameAttribute('roomStyleAttribute', sourceProduct.customizedRoom.roomStyle);
        const bathroomCount = sourceProduct.customizedRoom.bathroomCount;
        const bedroomCount = sourceProduct.customizedRoom.bedroomCount;
        const livingroomCount = sourceProduct.customizedRoom.livingroomCount;
        const creatorGuid = sourceProduct.customizedRoom.creator;
        const designId = sourceProduct.customizedRoom.designId;
        const roomId = sourceProduct.customizedRoom.roomId;
        const customizedRoom = sourceProduct.customizedRoom;
        const jsonUrl = sourceProduct.jsonUrl;
        const copyright = sourceProduct.copyright;
        const dataType = sourceProduct.dataType;
        const showFavorite = sourceProduct.showFavorite;
        const favoritesId = sourceProduct.favoritesId;
        const imageRenderingUid = sourceProduct.imageRenderingUid;
        const imageRenderingType = sourceProduct.imageRenderingType;
        const imageDesignVersion = sourceProduct.imageDesignVersion;
        const supportSelect = sourceProduct.supportSelect;
        const hasPano = sourceProduct.hasPano;
        const sellType = sourceProduct.sellType;
        const paid = sourceProduct.paid;

        Object.assign(productMini, {
          area,
          roomTypeName,
          roomStyleName,
          bathroomCount,
          bedroomCount,
          livingroomCount,
          creatorGuid,
          designId,
          roomId,
          customizedRoom,
          jsonUrl,
          copyright,
          dataType,
          showFavorite,
          favoritesId,
          imageRenderingUid,
          imageRenderingType,
          imageDesignVersion,
          supportSelect,
          hasPano,
          sellType,
          paid
        });
      }
    }

    this._executeProcessors(productMini, sourceProduct);
    return productMini;
  }

  private static _toProductMini(sourceProduct: SourceProduct): ProductMini {
    const contentType = new HSCatalog.ContentType(sourceProduct.contentType);
    const productType = HSCatalog.Util.getProductType(sourceProduct, contentType);

    return {
      id: sourceProduct.id,
      name: sourceProduct.name,
      description: sourceProduct.description,
      image: sourceProduct.image,
      productType,
      contentType
    };
  }

  private static _executeProcessors(productMini: ProductMini, sourceProduct: SourceProduct): void {
    HSApp.App.getApp()
      .pluginManager.getPlugin(HSFPConstants.PluginType.Autostyler)
      .getMetaProcessor()
      .miniProcess(productMini, sourceProduct);
  }
}