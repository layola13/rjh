/**
 * Module: MyAiModelerPage
 * Component for displaying and managing AI-generated modeler items
 */

import { CSSProperties, RefObject } from 'react';

/**
 * Product item with trace information
 */
interface ProductItem {
  /** Unique identifier for the product */
  uuid: string;
  /** Trace IDs for analytics */
  traceIds?: Record<string, unknown>;
  [key: string]: unknown;
}

/**
 * Product list response from API
 */
interface ProductListResponse {
  /** Array of product items */
  items?: ProductItem[];
  /** Total count of products */
  total?: number;
  /** Trace IDs for analytics tracking */
  traceIds?: Record<string, unknown>;
}

/**
 * Query parameters for fetching products
 */
interface ProductQueryParams {
  /** Pagination offset */
  offset: number;
  /** Number of items per page */
  limit: number;
  /** Category filter */
  category?: string;
  /** Process status filter */
  processStatus?: number;
}

/**
 * Pre-configuration for product query
 */
interface PreConfig {
  /** Category ID */
  category?: string;
  /** Process status */
  processStatus?: number;
  [key: string]: unknown;
}

/**
 * Internal state for product list
 */
interface ProductListState {
  /** Loading indicator */
  isLoading: boolean;
  /** Product items array */
  items: ProductItem[];
  /** Total count of available products */
  total: number;
}

/**
 * Props for MyAiModelerPage component
 */
export interface MyAiModelerPageProps {
  /** Callback to close the panel */
  closePanel?: () => void;
  /** Whether to show back button */
  showBack?: boolean;
  /** Callback when back button is clicked */
  backClick?: () => void;
  /** Search model/filter function */
  searchModel?: (params: ProductQueryParams) => Promise<ProductListResponse>;
  /** Function to get pre-configuration */
  getPreConfig?: () => Promise<PreConfig>;
  /** Flag indicating if modeler should refresh */
  isRefreshModeler?: boolean;
  /** Callback to set refresh state */
  setRefreshModeler?: (value: boolean) => void;
  /** Callback to stop polling */
  stopPolling?: () => void;
  /** Flag indicating if generation is in progress */
  isGenerating?: boolean;
  /** Callback to set generating state */
  setIsGenerating?: (value: boolean) => void;
  /** Hint text when no results found */
  noResultHint?: string;
  /** Action component when no results found */
  noResultHintAction?: React.ReactNode;
  /** Category ID filter */
  categoryId?: string;
  /** Reference to parent page element */
  pageRef?: RefObject<HTMLDivElement>;
}

/**
 * AI Modeler Page component
 * Displays a list of AI-generated modeler items with infinite scroll and refresh capabilities
 * 
 * @param props - Component props
 * @returns React component
 */
export declare function MyAiModelerPage(props: MyAiModelerPageProps): JSX.Element;