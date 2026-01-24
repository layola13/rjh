/**
 * PageType Module - Model Library Special Topic Component
 * Handles navigation between landing page, product listing, and model detail views
 */

/**
 * Pool enumeration for model library categories
 */
export enum PoolEnum {
  /** High quality model pool */
  HighQualityPool = "high_quality_pool",
  /** High commission model pool */
  HighCommissionPool = "high_commission_pool"
}

/**
 * Page type enumeration for component state management
 */
export enum PageType {
  /** Landing page view */
  LandingPage = "landingPage",
  /** Product listing page view */
  ProductPage = "ProductPage",
  /** Model detail page view */
  ModelPage = "ModelPage"
}

/**
 * Category data structure for catalog navigation
 */
interface CatalogData {
  /** Unique category identifier */
  id: string;
  /** Custom attribute identifier */
  custAttr?: string;
  /** Category metadata */
  data?: unknown;
  /** Category attributes collection */
  attributes?: Array<{
    /** Attribute type identifier */
    typeId: string;
    /** Free-form attribute values */
    free?: string[];
  }>;
}

/**
 * Categories response structure from API
 */
interface CategoriesResponse {
  /** Array of category objects */
  categories: CatalogData[];
}

/**
 * Search/query configuration for product/activity fetching
 */
interface SearchConfig {
  /** Pagination offset */
  offset: number;
  /** Result limit per page */
  limit: number;
  /** Category tree identifier */
  treeId: string;
  /** Search text query */
  text?: string;
  /** Comma-separated category IDs */
  categoriesIds?: string;
  /** Pool identifier for filtered results */
  poolId?: string;
  /** Pool tag attribute ID */
  attrPoolTagId?: string;
}

/**
 * Pool configuration for category fetching
 */
interface PoolConfig {
  /** Pool identifier */
  poolId: string;
  /** Associated category ID */
  categoryId: string;
}

/**
 * Header back button configuration
 */
interface HeaderBackData {
  /** Back button click handler */
  onHeaderBack: () => void;
  /** Back button title text */
  backTitle: string;
}

/**
 * Product page configuration object
 */
interface ProductPageConfig {
  /** Header back button data */
  headerBackData: HeaderBackData;
  /** Show tree control widget */
  showTreeControl: boolean;
  /** Catalog data for tree navigation */
  catalogData: CategoriesResponse;
  /** Show header back button */
  showHeaderBack: boolean;
  /** Search/query configuration */
  config: SearchConfig;
  /** Page title */
  title: string;
  /** Search data fetching function */
  searchData: (config: SearchConfig) => Promise<unknown>;
  /** Sub-menu identifier */
  subMenuId: string;
  /** Sub-menu data list */
  subMenuDataList: CatalogData[];
}

/**
 * Component props for SpecialTopicContainer
 */
export interface SpecialTopicContainerProps {
  /** Initial page type to display */
  pageType?: PageType;
  /** Refresh trigger number */
  refreshNum?: number;
  /** Catalog data for model detail view */
  catalogData?: CatalogData;
  /** Flag indicating navigation from "My Paid" section */
  fromMyPaid?: boolean;
  /** Entry text for landing page */
  entryText?: string;
  /** Title text for landing page */
  title?: string;
  /** Pool ID for direct pool access */
  poolId?: string;
  /** Additional props spread to component */
  [key: string]: unknown;
}

/**
 * Search products parameters
 */
interface SearchProductsParams {
  /** Category IDs filter */
  categoriesIds?: string;
  /** Search text query */
  text?: string;
}

/**
 * Special Topic Container Component
 * 
 * Main component for managing model library special topic pages.
 * Handles navigation between landing page, product listings, and model details.
 * Supports high quality and high commission model pools.
 * 
 * @param props - Component properties
 * @returns React component for special topic container
 */
declare function SpecialTopicContainer(
  props: SpecialTopicContainerProps
): JSX.Element;

export default SpecialTopicContainer;