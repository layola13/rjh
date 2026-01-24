/**
 * Constraint Layout and Dify API Type Definitions
 * Provides interfaces for layout search, room estimation, and AI-powered design recommendations
 */

/**
 * Opening host information for doors, windows, and features
 */
export interface OpeningHostInfo {
  /** Index of the host curve */
  hostCurveIndex: number;
  /** Index of the opening on the curve */
  openingIndex: number;
  /** Position parameters defining the opening location */
  posParam: {
    /** Start parameter on the curve */
    startParam: number;
    /** Center parameter on the curve */
    centerParam: number;
    /** End parameter on the curve */
    endParam: number;
  };
  /** Type of opening: 'door', 'window', or 'feature' */
  openingType: 'door' | 'window' | 'feature';
}

/**
 * Minimal furniture group information for layout matching
 */
export interface MinimalGroupInfo {
  /** Length along X-axis in meters */
  xLength: number;
  /** Length along Y-axis in meters */
  yLength: number;
  /** Furniture type identifier */
  type: string;
  /** Array of category UUIDs */
  categoryIds: string[];
}

/**
 * Opening geometry data including doors, windows, and features
 */
export interface OpeningsData {
  /** Host curve information for all openings */
  hostInfos: OpeningHostInfo[];
  /** WKT (Well-Known Text) representation of door bottom profiles */
  doorsBottomProfilesWKT: string;
  /** WKT representation of window bottom profiles */
  windowsBottomProfilesWKT: string;
}

/**
 * Centroid data for room polygon analysis
 */
export interface CentroidData {
  /** WKT polygon representation of the floor plan */
  floorPolygonWKT: string;
  /** Number of outer boundary curves */
  numOfOuterCurves?: number;
  /** Opening information (doors, windows, features) */
  openings: OpeningsData;
  /** Index indicating glazed facade presence */
  glazedFacadeIndex?: number;
}

/**
 * Polygon data with centroid information
 */
export interface PolygonData {
  /** Centroid and geometric data */
  centroid: CentroidData;
}

/**
 * Base search request parameters
 */
export interface BaseSearchRequest {
  /** Number of results to return (default: 5) */
  k?: number;
}

/**
 * Design search request parameters (for template-based search)
 */
export interface DesignSearchRequest extends BaseSearchRequest {
  /** Total area in square meters */
  area: number;
  /** Number of bedrooms */
  bedroomNum: number;
  /** Number of bathrooms */
  bathroomNum: number;
  /** Number of living rooms */
  livingroomNum: number;
  /** Excluded region/country (e.g., "美国" for USA) */
  excludedRegion?: string;
}

/**
 * Room type estimation request
 */
export interface EstimateRoomTypeRequest extends BaseSearchRequest {
  /** WKT representation of floor outer boundary */
  floorOuterWKT: string;
  /** Data source identifier */
  source: string;
}

/**
 * Layout search request with polygon and room constraints
 */
export interface LayoutSearchRequest extends BaseSearchRequest {
  /** Polygon geometric data */
  polygon: PolygonData;
  /** Number of outer boundary curves */
  numOfOuterCurves?: number;
  /** Array of target room types (e.g., ['Bedroom', 'Bathroom']) */
  roomTypes: string[];
  /** Whether to enforce strict matching rules */
  strictMode: boolean;
  /** Optional furniture group information for matching */
  groupInfos?: MinimalGroupInfo[];
  /** Origin region: 'domestic' or other */
  origin?: string;
}

/**
 * Vector-based layout search request (extends layout search with vector data)
 */
export interface LayoutSearchWithVectorRequest extends LayoutSearchRequest {
  /** Vector representation for AI-based matching */
  vector: number[];
}

/**
 * Search request by room ID
 */
export interface GroupSearchByRoomIdRequest extends BaseSearchRequest {
  /** Unique room identifier */
  roomId: string;
}

/**
 * Search request by design ID
 */
export interface GroupSearchRequest extends BaseSearchRequest {
  /** Unique design identifier */
  designId: string;
}

/**
 * Request to retrieve all rooms in a design
 */
export interface SearchRoomsOfDesignIdRequest extends BaseSearchRequest {
  /** Unique design identifier */
  designId: string;
}

/**
 * Layout search result with image metadata
 */
export interface LayoutSearchResult {
  /** Unique room identifier */
  room_id: string;
  /** Image metadata */
  image: {
    /** Image description (typically room_id) */
    desc: string;
    /** Image URL */
    src: string;
  };
  /** Similarity or relevance score */
  score?: number;
  /** Additional dynamic properties */
  [key: string]: unknown;
}

/**
 * Generic search result (for design search, room type estimation, etc.)
 */
export interface SearchResult {
  /** Additional dynamic properties */
  [key: string]: unknown;
}

/**
 * Dify AI API request for best layout selection
 */
export interface DifyGetBestLayoutIndexRequest {
  /** Target room type for recommendation */
  targetRoomType: string;
  /** Array of candidate layout image URLs */
  urls: string[];
}

/**
 * Dify AI API response
 */
export interface DifyResponse {
  /** Index of the best recommended layout (0-based) */
  bestIndex?: number;
  /** Additional response data */
  [key: string]: unknown;
}

/**
 * Constraint Layout API for searching and matching floor plans
 * Provides various search methods based on geometric, semantic, and AI-driven criteria
 */
export declare const ConstraintLayoutApi: {
  /**
   * Search design templates by room counts and area
   * Uses different search functions based on tenant (fp uses global search)
   * @param request - Design search parameters
   * @returns Array of matching design results
   */
  designSearch(request: DesignSearchRequest): Promise<SearchResult[]>;

  /**
   * Estimate room type based on floor polygon geometry
   * @param request - Floor geometry and source
   * @returns Array of similar floor plans with room type predictions
   */
  estimateRoomType(request: EstimateRoomTypeRequest): Promise<SearchResult[]>;

  /**
   * Search layouts for design copilot feature
   * @param request - Layout search parameters with polygon and constraints
   * @returns Array of matching layouts with image metadata
   */
  copilotLayoutSearch(request: LayoutSearchRequest): Promise<LayoutSearchResult[]>;

  /**
   * Main layout search with ranking (test version)
   * @param request - Layout search parameters
   * @returns Array of ranked layouts with image metadata
   */
  layoutSearch(request: LayoutSearchRequest): Promise<LayoutSearchResult[]>;

  /**
   * Group search considering floor openings (doors, windows)
   * @param request - Layout search with opening constraints
   * @returns Array of layouts matching opening configurations
   */
  layoutSearchGroupFloorOpening(request: LayoutSearchRequest): Promise<LayoutSearchResult[]>;

  /**
   * Count layouts matching floor opening criteria
   * @param request - Layout search with opening constraints
   * @returns Count result or array of matching records
   */
  layoutSearchGroupFloorOpeningCount(request: LayoutSearchRequest): Promise<SearchResult[]>;

  /**
   * Search layouts where floor concave hull covers content groups
   * @param request - Layout search parameters
   * @returns Array of layouts with covered content
   */
  layoutSearchFloorCoversContents(request: LayoutSearchRequest): Promise<LayoutSearchResult[]>;

  /**
   * Vector-based layout search (AI/ML-driven)
   * @param request - Layout search with vector representation
   * @returns Array of layouts similar to the input vector
   */
  layoutSearchWithVector(request: LayoutSearchWithVectorRequest): Promise<LayoutSearchResult[]>;

  /**
   * Retrieve group data by room ID
   * @param request - Room ID search request
   * @returns Array of group data records (up to 1000)
   */
  groupSearchByRoomId(request: GroupSearchByRoomIdRequest): Promise<SearchResult[]>;

  /**
   * Retrieve group data by design ID
   * @param request - Design ID search request
   * @returns Array of group data records (up to 1000)
   */
  groupSearch(request: GroupSearchRequest): Promise<SearchResult[]>;

  /**
   * Retrieve all rooms belonging to a design
   * @param request - Design ID request
   * @returns Array of room records (up to 50)
   */
  searchRoomsOfDesignId(request: SearchRoomsOfDesignIdRequest): Promise<SearchResult[]>;
};

/**
 * Dify AI-powered API for intelligent layout recommendations
 */
export declare const DifyApi: {
  /**
   * Get the best layout index from candidate URLs using AI evaluation
   * @param targetRoomType - Target room type for evaluation
   * @param urls - Array of candidate layout image URLs
   * @returns AI response with best layout index
   */
  getBestLayoutIndex(targetRoomType: string, urls: string[]): Promise<DifyResponse>;
};