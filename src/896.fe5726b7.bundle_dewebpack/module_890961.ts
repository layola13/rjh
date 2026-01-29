interface ProductAttribute {
  id: string;
  name: string;
  values: AttributeValue[];
}

interface AttributeValue {
  id: string;
}

interface Product {
  productType: string;
  attributes: ProductAttribute[];
}

interface RoomStyleData {
  roomStyle?: string;
}

interface RoomStyleProcessorConfig {
  roomStyleAttrName: string;
  roomStyleNone: string;
}

declare namespace HSCatalog {
  enum ProductTypeEnum {
    StylerTemplate = 'StylerTemplate'
  }
}

/**
 * Processes room style attributes for products
 */
class RoomStyleProcessor {
  private _roomStyleAttributeId?: string;
  private readonly _roomStyleAttributeName: string;
  private readonly _roomStyleNone: string;

  constructor(config: RoomStyleProcessorConfig) {
    this._roomStyleAttributeName = config.roomStyleAttrName;
    this._roomStyleNone = config.roomStyleNone;
  }

  /**
   * Sets the room style attribute ID for lookup
   */
  setRoomStyleAttributeId(attributeId: string): void {
    this._roomStyleAttributeId = attributeId;
  }

  /**
   * Processes product data and extracts room style information
   */
  process<T extends RoomStyleData>(data: T, product: Product): T {
    if (product.productType !== HSCatalog.ProductTypeEnum.StylerTemplate) {
      return data;
    }

    const attributes = product.attributes;
    let matchedAttribute: ProductAttribute | undefined;

    if (this._roomStyleAttributeId) {
      matchedAttribute = attributes.find(
        (attr) => attr.id === this._roomStyleAttributeId
      );
    } else {
      matchedAttribute = attributes.find(
        (attr) => attr.name === this._roomStyleAttributeName
      );
    }

    if (matchedAttribute && matchedAttribute.values.length > 0) {
      data.roomStyle = matchedAttribute.values[0].id;
    } else {
      data.roomStyle = this._roomStyleNone;
    }

    return data;
  }
}

export default RoomStyleProcessor;