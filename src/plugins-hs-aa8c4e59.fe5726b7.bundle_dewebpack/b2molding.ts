import { B2Processor } from './B2Processor';
import { backendCatalogHelper } from './backendCatalogHelper';
import { turnNumberArrayToSize, isGlobal, dollarTransfer, addEntityContentToElement } from './utils';
import { PocketPredicate } from './PocketPredicate';
import { resourceManager } from './resourceManager';

interface FilterOptions {
  hardload?: boolean;
}

interface BuildBom2DataOptions {
  filterOptions?: FilterOptions;
}

interface Category {
  seekId: string;
  categoryType: string;
  textureUrl: string;
  displayName: string;
  size: number[];
  brand: string;
  brandId: string;
  price: number;
}

interface Molding {
  category: Category;
  getParameterValue(key: string): unknown;
  getParent(): Molding | null;
}

interface Opening {
  children: unknown[];
}

interface MoldingData {
  seekId: string;
  categoryType: string;
  category: string;
  image: string;
  name: string;
  size: string;
  roomId: unknown;
  brand: string;
  brandId: string;
  price: number;
  count: unknown;
  unit: string;
  unitTypeStr: string;
}

interface Context {
  moldings: Molding[];
  openings: Opening[];
  dbApi: {
    findAll(children: unknown[], predicate: PocketPredicate): Molding[];
  };
}

export class B2Molding extends B2Processor {
  private context!: Context;

  buildBom2Data(options?: BuildBom2DataOptions): MoldingData[] {
    if (options?.filterOptions?.hardload !== true) {
      return [];
    }

    const result: MoldingData[] = [];

    this.context.moldings.forEach((molding) => {
      result.push(this.buildMoldingData(molding));
    });

    for (const opening of this.context.openings) {
      const pockets = this.context.dbApi.findAll(
        opening.children,
        new PocketPredicate()
      );
      
      pockets.forEach((pocket) => {
        result.push(this.buildMoldingData(pocket));
      });
    }

    return result;
  }

  buildMoldingData(entity: Molding): MoldingData {
    const {
      seekId,
      categoryType,
      textureUrl,
      displayName,
      size,
      brand,
      brandId,
      price
    } = entity.category;

    const validCategoryType = backendCatalogHelper.getValidCategoryType(categoryType);

    let roomId = entity.getParameterValue('roomId');
    if (!roomId && entity.getParent()) {
      roomId = entity.getParent()?.getParameterValue('roomId');
    }

    const moldingData: MoldingData = {
      seekId,
      categoryType: backendCatalogHelper.getCategoryTypeName(validCategoryType),
      category: validCategoryType,
      image: textureUrl,
      name: displayName,
      size: turnNumberArrayToSize(size),
      roomId,
      brand,
      brandId,
      price: isGlobal() ? dollarTransfer(price) : price,
      count: entity.getParameterValue('length'),
      unit: resourceManager.getString('lengthUnit'),
      unitTypeStr: 'length'
    };

    addEntityContentToElement(entity, moldingData);

    return moldingData;
  }
}