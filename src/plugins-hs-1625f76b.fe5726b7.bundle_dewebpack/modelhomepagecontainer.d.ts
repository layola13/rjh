/**
 * Module: ModelHomePageContainer
 * Exports: PageType enum and ModelHomePageContainer component
 */

/**
 * Page type enumeration for different catalog pages
 */
export enum PageType {
  /** Home page of model library */
  homePage = "homePage",
  /** Product listing page */
  ProductPage = "ProductPage",
  /** Topic/Special subject page */
  topicPage = "topicPage",
  /** Model detail page */
  ModelPage = "ModelPage",
  /** Commission-based model page */
  commissionPage = "commissionPage",
  /** Brand showcase page */
  brandPage = "brandPage",
  /** Activity/Campaign page */
  activityPage = "activityPage",
  /** Image search results page */
  searchPicPage = "searchPicPage",
  /** JiYouJia (极有家) brand page */
  jiyoujiaPage = "jiyoujiaPage"
}

/**
 * Category data structure from catalog API
 */
export interface CatalogCategory {
  /** Category unique identifier */
  id: string;
  /** Category display name */
  name: string;
  /** Parent category ID */
  parentId?: string;
  /** Category attributes for filtering */
  attributes?: CategoryAttribute[];
  /** Custom attributes (e.g., page type markers) */
  custAttr?: string;
  /** Nested subcategories */
  categories?: CatalogCategory[];
  /** Extended information object */
  extInfo?: {
    /** Pool ID for category-based pools */
    poolId?: number;
    [key: string]: unknown;
  };
}

/**
 * Category attribute for advanced filtering
 */
export interface CategoryAttribute {
  /** Attribute type identifier (e.g., "attr-pool-tag-id") */
  typeId: string;
  /** Attribute ID */
  id: string;
  /** Free-form attribute values */
  free?: string[];
  /** Selected attribute values */
  selected?: string[];
}

/**
 * Catalog data structure passed to container
 */
export interface CatalogData {
  /** Root category list */
  categories: CatalogCategory[];
  /** Catalog display name */
  name: string;
  /** Custom attributes */
  custAttr?: string;
}

/**
 * Search configuration for catalog products/activities
 */
export interface SearchConfig {
  /** Pagination offset */
  offset: number;
  /** Number of results per page */
  limit: number;
  /** Category tree root ID */
  treeId: string;
  /** Search query text */
  text?: string;
  /** Pool identifier for filtered results */
  poolId?: number | string;
  /** Pool tag attribute IDs (comma-separated) */
  attrPoolTagId?: string;
  /** Selected category IDs (comma-separated) */
  categoriesIds?: string;
  /** Filter visibility by size authorization */
  filterShowAuth?: string;
}

/**
 * Header back button configuration
 */
export interface HeaderBackData {
  /** Callback when back button is clicked */
  onHeaderBack: () => void;
  /** Text displayed on back button */
  backTitle: string;
}

/**
 * Topic/Special subject item data
 */
export interface TopicItem {
  /** Topic unique identifier */
  id: string;
  /** Topic title */
  title: string;
  /** Cover image URL */
  coverImage: string;
  /** Topic description */
  description?: string;
  /** Associated model count */
  modelCount?: number;
}

/**
 * Model recommendation image configuration
 */
export interface ModelRecommendConfig {
  /** Image source URL */
  img: string;
  /** CSS class names for styling */
  className: string;
  /** Whether to hide this recommendation */
  isHidden?: boolean;
  /** Click handler with optional event and category data */
  onClick: (event?: React.MouseEvent, category?: CatalogCategory) => void;
}

/**
 * Props for ModelHomePageContainer component
 */
export interface ModelHomePageContainerProps {
  /** Initial catalog data with categories */
  catalogData: CatalogData;
}

/**
 * Main container component for model library home page
 * Handles navigation between different page types and renders appropriate content
 * 
 * @param props - Component properties
 * @returns React component for model home page
 */
export declare const ModelHomePageContainer: React.FC<ModelHomePageContainerProps>;

export default ModelHomePageContainer;