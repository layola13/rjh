import { v4 as uuidv4 } from 'uuid';

interface ProductQueryParams {
  requestId?: string;
  limit?: number;
  imgUrl?: string;
  category?: string;
  boxStr?: string;
  [key: string]: unknown;
}

interface ImageSearchParams {
  imgUrl: string;
  category: string;
  boxStr: string;
  requestId: string;
}

interface MtopResponse<T = unknown> {
  ret?: string[];
  data?: T;
}

interface ProductBuilder {
  productBuilder(data: unknown): unknown;
}

const DEFAULT_PRODUCT_LIMIT = 150;

/**
 * Generic mtop request wrapper with error handling
 */
async function mtopRequest<T>(
  mtopMethod: (params?: unknown, options?: unknown) => Promise<MtopResponse<T>>,
  params?: unknown,
  options?: unknown
): Promise<T> {
  try {
    const response = await mtopMethod(params, options);
    
    if (
      response?.ret?.[0]?.includes('SUCCESS') &&
      response.data
    ) {
      return response.data;
    }
    
    return Promise.reject(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * Fetch product data from catalog
 */
export function getData(params: ProductQueryParams): Promise<unknown> {
  const catalogLib = HSApp.Catalog.Manager.getHSCatalogLib();
  const builderInstance: ProductBuilder = new (window as any).ProductBuilderClass();
  const productBuilder = builderInstance.productBuilder.bind(builderInstance);
  const requestId = uuidv4();

  const queryParams: ProductQueryParams = {
    ...params,
    requestId,
    limit: DEFAULT_PRODUCT_LIMIT
  };

  return catalogLib.ProductDatabase.getProducts(
    queryParams,
    inspirationImageSearch,
    productBuilder
  );
}

/**
 * Search products by inspiration image
 */
export function inspirationImageSearch(params: ProductQueryParams): Promise<unknown> {
  const searchParams: ImageSearchParams = {
    imgUrl: params.imgUrl ?? '',
    category: params.category ?? '',
    boxStr: params.boxStr ?? '',
    requestId: params.requestId ?? ''
  };

  return mtopRequest(
    NWTK.mtop.Catalog.InspirationImageSearch,
    { data: searchParams }
  );
}

/**
 * Get available image recognition categories
 */
export function getInspirationImageRecognizeCategory(): Promise<unknown> {
  return mtopRequest(NWTK.mtop.Catalog.getInspirationImageRecognizeCategory);
}

/**
 * Recognize and categorize an image
 */
export function recognizeImage(imageUrl: string): Promise<unknown> {
  return mtopRequest(
    NWTK.mtop.Catalog.InspirationImageRecognize,
    { data: { imgUrl: imageUrl } }
  );
}