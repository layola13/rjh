import { HSCore, HSCatalog } from './dependencies/core';
import { Utils } from './utils';

interface ProductItemInfo {
  title: string;
  secondtitle: string;
}

interface ProductItem {
  v?: string;
  vendor?: string;
  contentType?: any;
  productType?: string;
  roomTypeName?: string;
  area?: string;
  bedroomCount?: number;
  livingroomCount?: number;
  bathroomCount?: number;
  bedroom?: string;
  livingroom?: string;
  bathroom?: string;
  name: string;
}

interface TemplateDesignDetail {
  id: string;
  imageRenderingType: string;
  image: string;
  imageDesignVersion: string;
  copyright: string;
  roomType: string;
  roomId: string;
}

interface TemplateDesignDetailResult {
  version: string;
  copyright: string;
  imageUrl: string;
  miniImageUrl: string;
  label: string;
  isPano: boolean;
  id: string;
}

interface AttributeValue {
  id: string;
  value?: string;
  name?: string;
}

interface Attribute {
  id: string;
  newName?: string;
  values?: AttributeValue[];
}

interface FacetResults {
  attributes: Attribute[];
}

interface FilterQueryParams {
  bedroomNum?: number;
  areaRange?: string;
  roomStyle?: string;
  roomType?: string;
  roomTypes?: HSCore.Model.RoomTypeEnum[];
}

interface ProcessedFilters {
  outerFilters: Attribute[];
  restFilters: Attribute[];
  allFilters: Attribute[];
}

interface RoomTypeMapping {
  newValue?: string;
  roomTypeMap: HSCore.Model.RoomTypeEnum[];
}

const ROOM_TYPE_MAPPINGS: Record<string, RoomTypeMapping> = {
  LivingDiningRoom: {
    newValue: "model_roomtype_LivingDiningRoom",
    roomTypeMap: [
      HSCore.Model.RoomTypeEnum.LivingDiningRoom,
      HSCore.Model.RoomTypeEnum.LivingRoom
    ]
  },
  DiningRoom: {
    roomTypeMap: [HSCore.Model.RoomTypeEnum.DiningRoom]
  },
  Bedroom: {
    roomTypeMap: [
      HSCore.Model.RoomTypeEnum.Bedroom,
      HSCore.Model.RoomTypeEnum.MasterBedroom,
      HSCore.Model.RoomTypeEnum.SecondBedroom
    ]
  },
  KidsRoom: {
    roomTypeMap: [HSCore.Model.RoomTypeEnum.KidsRoom]
  },
  Kitchen: {
    roomTypeMap: [HSCore.Model.RoomTypeEnum.Kitchen]
  },
  Bathroom: {
    roomTypeMap: [
      HSCore.Model.RoomTypeEnum.Bathroom,
      HSCore.Model.RoomTypeEnum.MasterBathroom,
      HSCore.Model.RoomTypeEnum.SecondBathroom
    ]
  },
  Library: {
    roomTypeMap: [HSCore.Model.RoomTypeEnum.Library]
  }
};

const ATTRIBUTE_ID_ROOM_STYLE_1 = "1094b167-9cf4-4606-ab11-4b351e49ab77";
const ATTRIBUTE_ID_ROOM_STYLE_2 = "576a11e5-8bc0-41aa-8a54-eb1648b4cd2f";
const ATTRIBUTE_ID_ROOM_STYLE_CUSTOM = "attr-customized-roomstyle";
const ATTRIBUTE_ID_ROOM_TYPE = "204ec253-f720-4316-ab9b-4591fc17470e";
const ROOM_CATEGORY_DEFAULT = 1;
const ROOM_CATEGORY_WITH_TYPES = 2;
const MAX_OUTER_FILTERS = 3;
const THUMBNAIL_WIDTH = 63;
const THUMBNAIL_HEIGHT = 44;
const THUMBNAIL_MODE = "fill";
const BEDROOM_COUNT_ATTRIBUTE_PREFIX = "bedroomcount";
const ROOM_SIZE_RANGE_ATTRIBUTE = "roomsizerange";

export default class TemplateRoomService {
  static getWholeProductItemTextInfo(product: ProductItem): ProductItemInfo {
    let secondTitle = product.v || product.vendor || "";

    if (product.contentType) {
      if (product.productType === HSCatalog.ProductTypeEnum.StylerTemplate) {
        secondTitle = `${product.roomTypeName} | ${product.area}`;
      } else if (product.productType === HSCatalog.ProductTypeEnum.FullRoom) {
        if (HSApp.Config.TENANT === "fp") {
          secondTitle = product.area || "";
        } else if (product.bedroomCount || product.livingroomCount || product.bathroomCount) {
          const houseType = ResourceManager.getString("catalog_product_item_housetype")
            .replace("{bedroom}", String(product.bedroomCount || 0))
            .replace("{livingroom}", String(product.livingroomCount || 0))
            .replace("{bathroom}", String(product.bathroomCount || 0));
          secondTitle = `${houseType} | ${product.area}`;
        } else if (product.bedroom || product.livingroom || product.bathroom) {
          const bedroomValue = product.bedroom?.split(" ")[0] || "0";
          const houseType = ResourceManager.getString("catalog_product_item_housetype")
            .replace("{bedroom}", bedroomValue)
            .replace("{livingroom}", product.livingroom || "0")
            .replace("{bathroom}", product.bathroom || "0");
          secondTitle = `${houseType} | ${product.area}`;
        } else {
          secondTitle = `${ResourceManager.getString("unknown_houseTemplate")} | ${product.area}`;
        }
      } else if (product.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ModelCollocation)) {
        secondTitle = `${product.roomTypeName} | ${product.area}`;
      }
    }

    return {
      title: product.name,
      secondtitle: secondTitle
    };
  }

  static getTemplateDesignDetailData(roomId: string): Promise<TemplateDesignDetailResult[]> {
    return NWTK.mtop.TemplateRoom.getTemplateDesignDetailData({
      data: { roomId }
    }).then((response) => {
      return (response.data.result || []).map((item: TemplateDesignDetail) => {
        const isPanorama = item.imageRenderingType === "panorama";
        const imageUrl = isPanorama && !item.image.endsWith(".front.jpg")
          ? item.image.replace(".jpg", ".front.jpg")
          : item.image;
        const miniImageUrl = HSApp.Util.Image.getOssImageUrlWithSize(
          imageUrl,
          THUMBNAIL_WIDTH,
          THUMBNAIL_HEIGHT,
          THUMBNAIL_MODE
        );

        return {
          version: item.imageDesignVersion,
          copyright: item.copyright,
          imageUrl,
          miniImageUrl,
          label: ResourceManager.getString(`model_roomtype_${item.roomType}`),
          isPano: isPanorama,
          id: item.roomId
        };
      });
    });
  }

  static getFilterDataFromBackendOrCache(roomCategory: number = ROOM_CATEGORY_DEFAULT): Promise<{ facetResults: FacetResults }> {
    const cachedFilter = Utils.getPublicStylerFilter(roomCategory);

    if (cachedFilter) {
      if (cachedFilter.attributes) {
        cachedFilter.attributes.forEach((attr: Attribute) => {
          delete attr.newName;
        });
      }
      return Promise.resolve({ facetResults: cachedFilter });
    }

    return NWTK.mtop.Catalog.getStylerMetaData({
      data: { roomCategory }
    }).then((response) => {
      const attributePromises = [
        HSApp.App.getApp().catalogManager.getAttribute("Room Styles")
      ];

      if (roomCategory === ROOM_CATEGORY_WITH_TYPES) {
        attributePromises.push(
          HSApp.App.getApp().catalogManager.getAttribute("Room Types")
        );
      }

      return Promise.all(attributePromises).then((attributes) => {
        if (response?.data?.attributes && attributes[1]) {
          delete attributes[1].newName;

          const roomTypeAttribute = attributes[1];
          const { values, ...restProps } = roomTypeAttribute;
          const processedAttribute: Attribute = {
            ...restProps,
            values: []
          };

          values?.forEach((value: AttributeValue) => {
            if (ROOM_TYPE_MAPPINGS[value.id]) {
              const newValueIndex = processedAttribute.values!.push({ ...value });
              const mapping = ROOM_TYPE_MAPPINGS[value.id];

              if (mapping.newValue) {
                processedAttribute.values![newValueIndex - 1].value = ResourceManager.getString(mapping.newValue);
              }
              processedAttribute.values![newValueIndex - 1].name = processedAttribute.values![newValueIndex - 1].value;
            }
          });

          response.data.attributes.push(processedAttribute);
        }

        const facetResults: FacetResults = {
          attributes: response.data.attributes
        };

        Utils.setPublicStylerFilter(roomCategory, facetResults);

        return { facetResults };
      });
    });
  }

  static getPublicTemplateRoom(params: unknown): Promise<unknown> {
    return HSApp.App.getApp()
      .pluginManager.getPlugin(HSFPConstants.PluginType.Catalog)
      .BaseApiManager.dataManager.getPublicTemplateRoom(params);
  }

  static getModelChannelSearch(params: unknown): Promise<unknown> {
    return HSApp.App.getApp()
      .pluginManager.getPlugin(HSFPConstants.PluginType.Catalog)
      .BaseApiManager.dataManager.getModelChannelSearch(params);
  }

  static getMerchentPublicStylerProduct(params: unknown): Promise<unknown> {
    return HSApp.App.getApp()
      .pluginManager.getPlugin(HSFPConstants.PluginType.Catalog)
      .BaseApiManager.dataManager.getMerchentPublicStylerProduct(params);
  }

  static getMyStylerProduct(params: unknown): Promise<unknown> {
    return HSApp.App.getApp()
      .pluginManager.getPlugin(HSFPConstants.PluginType.Catalog)
      .BaseApiManager.dataManager.getMyStylerProduct(params);
  }

  static buildFiltersQueryParams(filters: Map<string, AttributeValue>): FilterQueryParams {
    const queryParams: FilterQueryParams = {};

    filters.forEach((value, key) => {
      const bedroomCountIndex = key.indexOf(BEDROOM_COUNT_ATTRIBUTE_PREFIX);
      if (bedroomCountIndex !== -1) {
        const bedroomNum = parseInt(value.id.substr(bedroomCountIndex + BEDROOM_COUNT_ATTRIBUTE_PREFIX.length + 1), 10);
        queryParams.bedroomNum = bedroomNum;
      }

      if (key.indexOf(ROOM_SIZE_RANGE_ATTRIBUTE) !== -1) {
        const rangeParts = value.id.split("-").splice(3);
        let areaRange = rangeParts[0];
        if (rangeParts.length > 1) {
          areaRange = `${rangeParts[0]}to${rangeParts[1]}`;
        }
        queryParams.areaRange = areaRange;
      }

      if (
        key === ATTRIBUTE_ID_ROOM_STYLE_1 ||
        key === ATTRIBUTE_ID_ROOM_STYLE_2 ||
        key === ATTRIBUTE_ID_ROOM_STYLE_CUSTOM
      ) {
        queryParams.roomStyle = value.id;
      }

      if (key === ATTRIBUTE_ID_ROOM_TYPE) {
        queryParams.roomType = value.id;
        if (ROOM_TYPE_MAPPINGS[value.id]) {
          queryParams.roomTypes = ROOM_TYPE_MAPPINGS[value.id].roomTypeMap;
        }
      }
    });

    return queryParams;
  }

  static processFilters(data: { facetResults: FacetResults }): ProcessedFilters {
    const attributes = data.facetResults.attributes;
    const allFilters = [...attributes].filter(
      (attr) => attr.values && attr.values.length !== 0
    );
    const outerFilters = allFilters.slice(0, MAX_OUTER_FILTERS);

    return {
      outerFilters,
      restFilters: [],
      allFilters: outerFilters
    };
  }

  static async getHouseDataUrl(roomId: string): Promise<string> {
    const response = await NWTK.mtop.TemplateRoom.getTemplateDesignMiddleDataJsonUrl({
      data: { roomId }
    });
    return response.data.result;
  }

  static async getHouseData(url: string): Promise<unknown> {
    const fetchData = async (dataUrl: string): Promise<unknown> => {
      const response = await fetch(dataUrl);
      const jsonData = await response.json();
      return jsonData;
    };

    return fetchData(url);
  }
}