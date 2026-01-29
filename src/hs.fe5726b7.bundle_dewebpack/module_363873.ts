import { HSCatalog, HSCore } from './dependencies';

interface BoundingBox {
  xLen: number;
  yLen: number;
  zLen: number;
}

interface TileSize {
  x: number;
  y: number;
}

interface Color {
  colorNumber?: string;
  colorGroup?: string;
  displayName?: string;
}

interface OtherInfo {
  canCustomized?: string;
  multifacetType?: string;
}

interface Variation {
  id: string;
  name: string;
  description?: string;
  image: string;
  sku?: string;
  boundingBox?: BoundingBox;
}

interface VariationMini {
  id: string;
  name: string;
  description?: string;
  image: string;
  sku?: string;
  boundingBox?: BoundingBox;
}

interface ContextMenuItem {
  id: string;
  onclick?: (product: ProductSource) => void;
  onclickItem?: (product: unknown) => void;
}

interface ContextMenu {
  items?: ContextMenuItem[];
}

interface ProductSource {
  id: string;
  name: string;
  image: string;
  images?: string[];
  thumbnail?: string;
  aerialViewImage?: string;
  variations?: Variation[];
  unit?: string;
  contentType?: string;
  otherInfo?: OtherInfo;
  boundingBox?: BoundingBox;
  tileSize?: TileSize;
  color?: Color;
  contextmenu?: ContextMenu;
}

interface ProductMini extends ProductSource {
  imageAerial?: string;
  variations?: VariationMini[];
  unit: string;
  contentType: HSCatalog.ContentType;
  productType: HSCatalog.ProductTypeEnum;
  canCustomized: boolean;
  XLength?: number;
  YLength?: number;
  ZLength?: number;
  color?: number;
  colorStyle?: string;
  colorNumber?: string;
  colorGroup?: string;
  displayName?: string;
  tileSize_x?: number;
  tileSize_y?: number;
  multifacet?: boolean;
}

type ProcessedDataProcessor = (productMini: ProductMini, productSource: ProductSource) => void;

const ATTR_CAN_CUSTOMIZED_VALUE_YES = "attr-can-customized-value-yes";
const ATTR_MULTIFACET_TYPE_TILE = "attr-multifacetType-tile";
const RENAME_ACTION_ID = "rename";
const DEFAULT_UNIT = "cm";
const HEX_COLOR_LENGTH = 6;

export default class ProductBuilder {
  private static productBuilder?: ProductBuilder;
  private processors: ProcessedDataProcessor[] = [];

  static getInstance(): ProductBuilder {
    if (!this.productBuilder) {
      this.productBuilder = new ProductBuilder();
    }
    return this.productBuilder;
  }

  build(productSource: ProductSource): ProductMini {
    const productMini = this._toProductMini(productSource);
    
    let XLength: number | undefined;
    let YLength: number | undefined;
    let ZLength: number | undefined;
    let color: number | undefined;
    let colorStyle: string | undefined;
    let colorNumber: string | undefined;
    let colorGroup: string | undefined;
    let displayName: string | undefined;
    let tileSize_x: number | undefined;
    let tileSize_y: number | undefined;
    let multifacet: boolean | undefined;

    switch (productMini.productType) {
      case HSCatalog.ProductTypeEnum.PAssembly:
      case HSCatalog.ProductTypeEnum.PAssemblyPackage:
      case HSCatalog.ProductTypeEnum.Assembly:
      case HSCatalog.ProductTypeEnum.Model:
        XLength = this._toXLength(productSource.boundingBox, productSource.unit);
        YLength = this._toYLength(productSource.boundingBox, productSource.unit);
        ZLength = this._toZLength(productSource.boundingBox, productSource.unit);
        break;

      case HSCatalog.ProductTypeEnum.Profile:
        XLength = this._toXLength(productSource.boundingBox, productSource.unit);
        YLength = this._toYLength(productSource.boundingBox, productSource.unit);
        break;

      case HSCatalog.ProductTypeEnum.Material:
        color = Number.parseInt(productSource.name);
        
        if (productMini.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Paint)) {
          const hexColor = color ? color.toString(16) : "";
          colorStyle = "#" + new Array(HEX_COLOR_LENGTH - hexColor.length + 1).join("0") + hexColor;
          colorNumber = productSource.color?.colorNumber || "";
          colorGroup = productSource.color?.colorGroup || "";
          displayName = productSource.color?.displayName || "";
          break;
        }

        if (productMini.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_all_seamfiller)) {
          const hexColor = color ? color.toString(16) : "";
          colorStyle = "#" + new Array(HEX_COLOR_LENGTH - hexColor.length + 1).join("0") + hexColor;
          colorNumber = productSource.color?.colorNumber || "";
          displayName = productSource.color?.displayName || "";
        }

        tileSize_x = this._toTileSize_x(productSource.tileSize, productMini.unit);
        tileSize_y = this._toTileSize_y(productSource.tileSize, productMini.unit);
        multifacet = productSource.otherInfo?.multifacetType === ATTR_MULTIFACET_TYPE_TILE;
    }

    Object.assign(productMini, {
      XLength,
      YLength,
      ZLength,
      color,
      colorStyle,
      colorNumber,
      colorGroup,
      displayName,
      tileSize_x,
      tileSize_y,
      multifacet
    });

    this._executeProcessors(productMini, productSource);

    if (productMini.productType !== HSCatalog.ProductTypeEnum.StylerTemplate &&
        productMini.productType !== HSCatalog.ProductTypeEnum.FullRoom) {
      this._handleContextMenu(productMini);
    }

    return productMini;
  }

  addProcessedDataProcessor(processor: ProcessedDataProcessor): void {
    this.processors.push(processor);
  }

  private _executeProcessors(productMini: ProductMini, productSource: ProductSource): void {
    this.processors.forEach((processor) => {
      processor(productMini, productSource);
    });
  }

  private _handleContextMenu(productMini: ProductMini): void {
    if (productMini.contextmenu?.items) {
      productMini.contextmenu.items = productMini.contextmenu.items.map((item) => {
        item.onclickItem = item.onclick;
        item.onclick = (product: ProductSource) => {
          HSCatalog.Manager.instance().getCustomizedProductById(product.id).then((customizedProduct) => {
            if (item.id === RENAME_ACTION_ID) {
              customizedProduct.name = product.name;
              customizedProduct.image = product.image;
              customizedProduct.images = [product.image];
              customizedProduct.thumbnail = product.image;
            }
            item.onclickItem?.(customizedProduct);
          });
        };
        return item;
      });
    }
  }

  private _toProductMini(productSource: ProductSource): ProductMini {
    const aerialViewImage = productSource.aerialViewImage;
    const variations = productSource.variations;
    const unit = productSource.unit;
    const otherInfo = productSource.otherInfo;
    const contentType = this.toContentType(productSource);

    return Object.assign({}, productSource, {
      imageAerial: aerialViewImage,
      variations: this._toVariationMini(variations),
      unit: this._toUnit(unit),
      contentType,
      productType: HSCatalog.Util.getProductType(productSource, contentType),
      canCustomized: otherInfo?.canCustomized === ATTR_CAN_CUSTOMIZED_VALUE_YES
    });
  }

  toContentType(productSource: ProductSource): HSCatalog.ContentType {
    const contentTypeStr = productSource.contentType;
    let contentType = new HSCatalog.ContentType(contentTypeStr);
    const productType = HSCatalog.Util.getProductType(productSource, contentType);

    if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.Unknown) &&
        productType === HSCatalog.ProductTypeEnum.Material) {
      contentType = new HSCatalog.ContentType(HSCatalog.ContentTypeEnum.Material);
    }

    return contentType;
  }

  private _toVariationMini(variations?: Variation[]): VariationMini[] | undefined {
    if (!variations) return undefined;

    return variations.map((variation) => ({
      id: variation.id,
      name: variation.name,
      description: variation.description,
      image: variation.image,
      sku: variation.sku,
      boundingBox: variation.boundingBox
    }));
  }

  private _toUnit(unit?: string): string {
    return unit || DEFAULT_UNIT;
  }

  private _toXLength(boundingBox?: BoundingBox, unit?: string): number {
    return boundingBox ? HSCore.Util.Unit.ConvertToMeter(this._toUnit(unit), boundingBox.xLen) : 0;
  }

  private _toYLength(boundingBox?: BoundingBox, unit?: string): number {
    return boundingBox ? HSCore.Util.Unit.ConvertToMeter(this._toUnit(unit), boundingBox.yLen) : 0;
  }

  private _toZLength(boundingBox?: BoundingBox, unit?: string): number {
    return boundingBox ? HSCore.Util.Unit.ConvertToMeter(this._toUnit(unit), boundingBox.zLen) : 0;
  }

  private _toTileSize_x(tileSize?: TileSize, unit?: string): number | undefined {
    if (!tileSize) return undefined;
    return HSCore.Util.Unit.ConvertToMeter(unit || DEFAULT_UNIT, tileSize.x);
  }

  private _toTileSize_y(tileSize?: TileSize, unit?: string): number | undefined {
    if (!tileSize) return undefined;
    return HSCore.Util.Unit.ConvertToMeter(unit || DEFAULT_UNIT, tileSize.y);
  }

  private _toPrice(priceArray?: Array<{ price?: string }>): string | undefined {
    return priceArray?.[0]?.price ? parseFloat(priceArray[0].price).toFixed(2) : undefined;
  }
}