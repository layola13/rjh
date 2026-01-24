/**
 * Countertop generation module for cabinet/kitchen design system
 * Handles creation of countertop assemblies with high/low configurations
 */

declare module 'module_866289' {
  import type { PAssembly } from 'HSCore.Model';
  import type { RequestType } from 'HSFPConstants';

  /** Countertop customization path point with 3D coordinates */
  export interface CountertopPathPoint {
    x: number;
    y: number;
    z: number;
  }

  /** Countertop extension dimensions in meters */
  export interface CountertopExtensions {
    left: number;
    right: number;
    front: number;
    back: number;
  }

  /** Countertop height configuration */
  export interface CountertopHeightConfig {
    /** Main countertop height */
    countertop: number;
    /** No-drip edge height */
    nodripedge: number;
    /** Backsplash height */
    backsplash: number;
    /** Vertical offset for no-drip edge */
    nodripedgeOffset: number;
  }

  /** Countertop segment data with position and extensions */
  export interface CountertopSegment {
    /** Array of path points defining the countertop boundary */
    countertop: CountertopPathPoint[];
    /** Z-axis offset position */
    z: number;
    /** Extension values for each side */
    extend: CountertopExtensions;
    /** Associated cabinet assemblies (optional) */
    cabinets?: string[];
  }

  /** Sink positioning and thickness parameters */
  export interface CountertopAdjustmentOptions {
    sinkPosition?: string;
    thickness: number;
  }

  /** Customization data stored in the design context */
  export interface CustomizationData {
    /** Whether an existing countertop is selected */
    countertopSelected: boolean;
    /** Array of custom path definitions */
    customizedPath: CountertopPathPoint[][] | CountertopPathPoint[];
    /** Selected cabinet assemblies for modification */
    selectedCabinets: PAssembly[];
  }

  /** Design context with product metadata and parameters */
  export interface DesignContext {
    customizationData?: CustomizationData;
    
    /**
     * Get parameter value by parameter ID
     * @param paramId - Parameter identifier
     */
    getValueByParamId(paramId: string): unknown;
    
    /**
     * Get numeric parameter value
     * @param paramId - Parameter identifier
     */
    getNumberByParamId(paramId: string): number;
    
    /**
     * Get product metadata by style ID
     * @param styleId - Style identifier
     */
    getMetaById(styleId: string): ProductMetadata;
  }

  /** Product metadata including material and style information */
  export interface ProductMetadata {
    seekId: string;
    profileSizeX?: number;
    profileSizeY?: number;
    profile?: string;
  }

  /** User-defined free-form product data */
  export interface UserFreeData {
    seekId: string;
    userFreeData: Record<string, unknown>;
    productDataById: Record<string, ProductMetadata>;
    userSchema?: unknown;
  }

  /** Request builder interface for design system operations */
  export interface RequestBuilder {
    /**
     * Create a request for the design system
     * @param requestType - Type of request (Add/Delete/Adjust)
     * @param data - Request payload data
     */
    createRequest(requestType: RequestType, data: unknown): unknown;
  }

  /**
   * Main function: Generate countertop creation requests based on configuration
   * Handles both high-low and standard countertop scenarios
   * 
   * @param requestBuilder - Builder for creating design system requests
   * @param productData - User product data with schema definitions
   * @param designContext - Current design context with parameters
   * @param cabinets - Array of cabinet assemblies
   * @param room - Optional room context
   * @returns Array of requests to execute
   */
  export default function generateCountertopRequests(
    requestBuilder: RequestBuilder,
    productData: UserFreeData,
    designContext: DesignContext,
    cabinets: unknown[],
    room?: unknown
  ): unknown[];

  /**
   * Generate countertop creation requests with high/low level support
   * Handles multi-level countertop configurations with connections
   * 
   * @param requestBuilder - Builder for creating design system requests
   * @param productData - User product data with schema definitions
   * @param designContext - Current design context with parameters
   * @param cabinets - Array of cabinet assemblies
   * @param room - Optional room context
   * @returns Array of requests to execute
   */
  export function generateCreateCountertopRequestsWithHighLowCountertop(
    requestBuilder: RequestBuilder,
    productData: UserFreeData,
    designContext: DesignContext,
    cabinets: unknown[],
    room?: unknown
  ): unknown[];

  /**
   * Generate countertop creation requests without high/low level support
   * Creates single-level countertop configurations
   * 
   * @param requestBuilder - Builder for creating design system requests
   * @param productData - User product data with schema definitions
   * @param designContext - Current design context with parameters
   * @param cabinets - Array of cabinet assemblies
   * @param room - Optional room context
   * @returns Array of requests to execute
   */
  export function generateCreateCountertopRequestsWithoutHighLowCountertop(
    requestBuilder: RequestBuilder,
    productData: UserFreeData,
    designContext: DesignContext,
    cabinets: unknown[],
    room?: unknown
  ): unknown[];
}