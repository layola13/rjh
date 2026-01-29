import { HSCatalog } from './path-to-hscatalog';
import BaseClass from './path-to-base-class';

interface OtherInfo {
  canCustomized?: string;
}

interface ImageResize {
  [key: string]: unknown;
}

interface BoundingBox {
  [key: string]: unknown;
}

interface Variation {
  [key: string]: unknown;
}

interface Unit {
  [key: string]: unknown;
}

interface ProductInput {
  modelId: string;
  name: string;
  description: string;
  imagesResize?: string[];
  renderImage?: string;
  sku: string;
  variations?: Variation[];
  status: string;
  boundingBox?: BoundingBox;
  postProcessingStatus?: string;
  brandId: string;
  brandLogo: string;
  vendor: string;
  unit?: Unit;
  isUserUpload: boolean;
  categories?: string[];
  otherInfo?: OtherInfo;
  contentType: string;
}

interface ProductMini {
  id: string;
  name: string;
  description: string;
  image: string;
  imageResized?: string;
  renderImage?: string;
  sku: string;
  variations?: unknown[];
  status: string;
  boundingBox?: BoundingBox;
  postProcessingStatus?: string;
  vendorId: string;
  vendorUrl: string;
  vendor: string;
  productType: HSCatalog.ProductTypeEnum;
  contentType: HSCatalog.ContentType;
  unit?: unknown;
  isMiniProduct: boolean;
  isUserData: boolean;
  canCustomized: boolean;
  categories?: string[];
  showfavorite: boolean;
  uuid: string;
}

const CAN_CUSTOMIZED_VALUE_YES = 'attr-can-customized-value-yes';

function generateUuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = Math.random() * 16 | 0;
    const value = char === 'x' ? random : (random & 0x3 | 0x8);
    return value.toString(16);
  });
}

export default class ProductConverter extends BaseClass {
  protected _toProductMini(product: ProductInput): ProductMini {
    const canCustomized = 
      product.otherInfo?.canCustomized === CAN_CUSTOMIZED_VALUE_YES;
    
    let contentType = new HSCatalog.ContentType(product.contentType);
    const productType = HSCatalog.Util.getProductType(product, contentType);
    
    if (
      contentType.isTypeOf(HSCatalog.ContentTypeEnum.Unknown) &&
      productType === HSCatalog.ProductTypeEnum.Material
    ) {
      contentType = new HSCatalog.ContentType(
        HSCatalog.ContentTypeEnum.Material
      );
    }
    
    return {
      id: product.modelId,
      name: product.name,
      description: product.description,
      image: this._toLargeImage(product.imagesResize),
      imageResized: product.imagesResize?.[0],
      renderImage: product.renderImage,
      sku: product.sku,
      variations: this._toVariationMini(product.variations),
      status: product.status,
      boundingBox: product.boundingBox,
      postProcessingStatus: product.postProcessingStatus,
      vendorId: product.brandId,
      vendorUrl: product.brandLogo,
      vendor: product.vendor,
      productType,
      contentType,
      unit: this._toUnit(product.unit),
      isMiniProduct: true,
      isUserData: product.isUserUpload,
      canCustomized,
      categories: product.categories,
      showfavorite: true,
      uuid: generateUuid(),
    };
  }

  protected _toLargeImage(imagesResize?: string[]): string {
    if (!imagesResize?.[0]) {
      return '';
    }
    return imagesResize[0].split(/resized/)[0] + 'iso.jpg';
  }

  protected _toVariationMini(variations?: Variation[]): unknown[] | undefined {
    return variations;
  }

  protected _toUnit(unit?: Unit): unknown | undefined {
    return unit;
  }
}