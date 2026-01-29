import { B2Processor } from './B2Processor';
import { backendCatalogHelper } from './backendCatalogHelper';
import { categoryHandle } from './categoryHandle';
import {
  turnNumberArrayToSize,
  isGlobal,
  dollarTransfer,
  addEntityContentToElement,
  contentTypeIsTypeOf,
  setObjectParameterValues
} from './utils';
import { resourceManager } from './resourceManager';

interface Category {
  seekId: string;
  categoryType: string;
  displayName: string;
  brand: string;
  brandId: string;
  price: number;
  textureUrl: string;
  size: number[];
  nickName?: string;
  name?: string;
  id?: string;
}

interface EntitySource {
  assemblySeekId?: string;
}

interface Entity {
  category: Category;
  source?: EntitySource;
  type: {
    contentType: string;
  };
  getParameterValue(key: string): unknown;
}

interface ContentData {
  seekId: string;
  categoryType: string;
  category: string;
  image?: string;
  size: string;
  realSizeList?: string[];
  name: string;
  brand: string;
  brandId: string;
  price: number;
  count: number;
  roomId: unknown;
  unit: string;
  categoryTypeId?: string;
  imageType?: string;
  isBelongTwoRooms?: boolean;
}

interface Context {
  contents: Entity[];
  openings: Entity[];
  customizedEntities: Entity[];
  customizationPMEntities: Entity[];
}

export class B2Content extends B2Processor {
  protected context!: Context;

  /**
   * Build BOM2 data from all content entities
   */
  buildBom2Data(): ContentData[] {
    const results: ContentData[] = [];

    this.context.contents.forEach((entity) => {
      const data = this.buildNormalContentData(entity);
      if (data) {
        results.push(data);
      } else {
        console.error('buildNormalContentData error:', entity);
      }
    });

    this.context.openings.forEach((entity) => {
      const data = this.buildOpeningContentData(entity);
      if (data) {
        results.push(data);
      } else {
        console.error('buildOpeningContentData error:', entity);
      }
    });

    this.context.customizedEntities.forEach((entity) => {
      const data = this.buildCustomizedContentData(entity);
      if (data) {
        results.push(data);
      } else {
        console.error('buildCustomizedContentData error:', entity);
      }
    });

    this.context.customizationPMEntities.forEach((entity) => {
      const data = this.buildNormalContentData(entity);
      if (data) {
        results.push(data);
      } else {
        console.error('customizationPMEntities error:', entity);
      }
    });

    return results;
  }

  /**
   * Build content data for normal entities
   */
  buildNormalContentData(entity: Entity): ContentData | null {
    const { category } = entity;
    const {
      seekId,
      categoryType,
      displayName,
      brand,
      brandId,
      price,
      textureUrl,
      size
    } = category;

    const realSize = entity.getParameterValue('realSize') as number[] | undefined;
    const paramSize = entity.getParameterValue('size') as number[] | undefined;
    const metaSize = entity.getParameterValue('metaSize') as number[] | undefined;

    const finalSize = metaSize ?? (paramSize ?? size);
    const validCategory = backendCatalogHelper.getValidCategory(categoryType);

    const contentData: ContentData = {
      seekId: entity.source?.assemblySeekId ?? seekId,
      categoryType: backendCatalogHelper.getCategoryTypeName(validCategory),
      category: validCategory,
      image: textureUrl,
      size: turnNumberArrayToSize(finalSize),
      realSizeList: realSize
        ? [turnNumberArrayToSize(realSize)]
        : paramSize
        ? [turnNumberArrayToSize(paramSize)]
        : undefined,
      name: displayName,
      brand,
      brandId,
      price: isGlobal() ? dollarTransfer(price) : price,
      count: 1,
      roomId: entity.getParameterValue('roomId'),
      unit: resourceManager.getString('numberUnit')
    };

    addEntityContentToElement(entity, contentData);
    return contentData;
  }

  /**
   * Build content data for customized entities
   */
  buildCustomizedContentData(entity: Entity): ContentData | null {
    const baseData = this.buildNormalContentData(entity);
    const categoryInfo = categoryHandle.getCategoryByEntity(entity);

    if (!baseData) {
      return null;
    }

    try {
      baseData.image = undefined;
      baseData.categoryType = categoryInfo?.nickName ?? categoryInfo?.name ?? '';

      const contentType = entity.type.contentType;
      baseData.categoryTypeId = categoryInfo?.id;

      if (contentTypeIsTypeOf(contentType, /ceiling/)) {
        baseData.imageType = 'customizedCeiling';
        baseData.name = isGlobal() ? 'Custom Ceiling' : '自定义吊顶';
        baseData.categoryTypeId = 'ceiling';
      } else if (contentTypeIsTypeOf(contentType, /platform/)) {
        baseData.imageType = 'customizedPlatform';
        baseData.name = isGlobal() ? 'Custom Platform' : '自定义地台';
        baseData.categoryTypeId = 'building_components';
      } else if (
        contentTypeIsTypeOf(contentType, /feature wall/) ||
        contentTypeIsTypeOf(contentType, /background wall/)
      ) {
        baseData.imageType = 'customizedWall';
        baseData.name = isGlobal() ? 'Custom Background Wall' : '自定义背景墙';
        baseData.categoryTypeId = 'background_wall';
      } else {
        baseData.imageType = 'swimPool';
        baseData.name = isGlobal() ? 'Custom' : '自定义';
      }

      return baseData;
    } catch (error) {
      const err = error as Error;
      console.error(`buildCustomized error:${err.message}${err.stack}`);
    }

    return baseData;
  }

  /**
   * Build content data for opening entities
   */
  buildOpeningContentData(entity: Entity): ContentData | null {
    const baseData = this.buildNormalContentData(entity);

    if (!baseData) {
      return null;
    }

    setObjectParameterValues(
      baseData,
      entity,
      {
        isBelongTwoRooms: 'isBelongTwoRooms'
      },
      true
    );

    return baseData;
  }
}