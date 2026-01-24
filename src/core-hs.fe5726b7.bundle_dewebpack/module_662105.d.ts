/**
 * HSCatalog Module Type Definitions
 * 
 * This module provides the HSCatalog functionality exposed on the global object.
 * Original module ID: 662105, depends on module 12883
 */

/**
 * Global namespace extension for HSCatalog
 */
declare global {
  /**
   * The HSCatalog instance exposed on the global object
   */
  const HSCatalog: HSCatalogInstance;
}

/**
 * Main HSCatalog interface
 * Represents the catalog system instance
 */
export interface HSCatalogInstance {
  // Add specific methods and properties based on the actual implementation
  // Example properties (customize based on actual module 12883 exports):
  
  /**
   * Initialize the catalog system
   * @param config - Configuration options for the catalog
   */
  init?(config?: HSCatalogConfig): void;
  
  /**
   * Get catalog items
   * @returns Array of catalog items
   */
  getItems?(): HSCatalogItem[];
  
  /**
   * Add an item to the catalog
   * @param item - The item to add
   */
  addItem?(item: HSCatalogItem): void;
  
  /**
   * Remove an item from the catalog
   * @param id - The ID of the item to remove
   */
  removeItem?(id: string | number): void;
}

/**
 * Configuration options for HSCatalog
 */
export interface HSCatalogConfig {
  /**
   * Enable debug mode
   */
  debug?: boolean;
  
  /**
   * Custom data source URL
   */
  dataSource?: string;
  
  /**
   * Additional configuration options
   */
  [key: string]: unknown;
}

/**
 * Represents a single catalog item
 */
export interface HSCatalogItem {
  /**
   * Unique identifier for the item
   */
  id: string | number;
  
  /**
   * Display name of the item
   */
  name: string;
  
  /**
   * Optional description
   */
  description?: string;
  
  /**
   * Additional metadata
   */
  metadata?: Record<string, unknown>;
}

export {};