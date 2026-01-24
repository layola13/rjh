/**
 * Product builder for creating product metadata objects from raw data.
 * Handles conversion of customized rooms and styler templates into standardized product structures.
 */

import { HSCatalog } from './catalog';
import { Utils } from './utils';

/**
 * Display area unit types for room measurements
 */
export enum DisplayAreaUnit {
  SquareMeters = 'sqm',
  SquareFeet = 'sqft'
}

/**
 * Product type enumeration
 */
export enum ProductType {
  StylerTemplate = 'StylerTemplate',
  FullRoom = 'FullRoom'
}

/**
 * Content type wrapper for product classification
 */
export interface ContentType {
  type: string;
  category?: string;
}

/**
 * Customized room data structure containing design and layout information
 */
export interface CustomizedRoom {
  /** Room area in square units */
  roomArea: number;
  /** Room type identifier */
  roomType: string;
  /** Room style identifier */
  roomStyle: string;
  /** Creator's unique identifier */
  creator: string;
  /** Design unique identifier */
  designId: string;
  /** Room unique identifier */
  roomId: string;
  /** Number of bathrooms (FullRoom only) */
  bathroomCount?: number;
  /** Number of bedrooms (FullRoom only) */
  bedroomCount?: number;
  /** Number of living rooms (FullRoom only) */
  livingroomCount?: number;
}

/**
 * Raw product data input structure
 */
export interface RawProductData {
  /** Product unique identifier */
  id: string;
  /** Product display name */
  name: string;
  /** Product description text */
  description: string;
  /** Product thumbnail/preview image URL */
  image: string;
  /** Content type classification */
  contentType: string | ContentType;
  /** Customized room configuration */
  customizedRoom: CustomizedRoom;
  /** JSON data URL for full product details */
  jsonUrl?: string;
  /** Copyright information */
  copyright?: string;
  /** Data type identifier */
  dataType?: string;
  /** Whether to show favorite button */
  showFavorite?: boolean;
  /** Favorites collection identifier */
  favoritesId?: string;
  /** Image rendering unique identifier */
  imageRenderingUid?: string;
  /** Image rendering type/format */
  imageRenderingType?: string;
  /** Design version for images */
  imageDesignVersion?: string;
  /** Whether product supports selection */
  supportSelect?: boolean;
  /** Whether product has panoramic view */
  hasPano?: boolean;
  /** Product sell type classification */
  sellType?: string;
  /** Whether product is paid content */
  paid?: boolean;
}

/**
 * Minimal product metadata structure
 */
export interface ProductMini {
  /** Product unique identifier */
  id: string;
  /** Product display name */
  name: string;
  /** Product description */
  description: string;
  /** Product image URL */
  image: string;
  /** Product type classification */
  productType: ProductType;
  /** Content type wrapper */
  contentType: ContentType;
}

/**
 * Extended product metadata with room details
 */
export interface ProductMetadata extends ProductMini {
  /** Formatted area display string */
  area?: string;
  /** Localized room type name */
  roomTypeName?: string;
  /** Localized room style name */
  roomStyleName?: string;
  /** Creator GUID */
  creatorGuid?: string;
  /** Design identifier */
  designId?: string;
  /** Room identifier */
  roomId?: string;
  /** Full customized room object */
  customizedRoom?: CustomizedRoom;
  /** JSON data URL */
  jsonUrl?: string;
  /** Copyright information */
  copyright?: string;
  /** Data type */
  dataType?: string;
  /** Show favorite flag */
  showFavorite?: boolean;
  /** Favorites ID */
  favoritesId?: string;
  /** Image rendering UID */
  imageRenderingUid?: string;
  /** Image rendering type */
  imageRenderingType?: string;
  /** Image design version */
  imageDesignVersion?: string;
  /** Support select flag */
  supportSelect?: boolean;
  /** Has panoramic view flag */
  hasPano?: boolean;
  /** Sell type */
  sellType?: string;
  /** Paid content flag */
  paid?: boolean;
  /** Bathroom count (FullRoom only) */
  bathroomCount?: number;
  /** Bedroom count (FullRoom only) */
  bedroomCount?: number;
  /** Living room count (FullRoom only) */
  livingroomCount?: number;
}

/**
 * Product builder utility class for converting raw product data into structured metadata
 */
export default class ProductBuilder {
  /**
   * Builds a complete product metadata object from raw product data
   * @param rawData - Raw product data from API or storage
   * @returns Processed product metadata with all relevant fields populated
   */
  static build(rawData: RawProductData): ProductMetadata;

  /**
   * Converts raw product data to minimal product representation
   * @param rawData - Raw product data
   * @returns Minimal product metadata with basic fields
   * @private
   */
  private static _toProductMini(rawData: RawProductData): ProductMini;

  /**
   * Executes registered metadata processors on the product
   * @param product - Product metadata to process
   * @param rawData - Original raw product data
   * @private
   */
  private static _executeProcessors(
    product: ProductMetadata,
    rawData: RawProductData
  ): void;
}