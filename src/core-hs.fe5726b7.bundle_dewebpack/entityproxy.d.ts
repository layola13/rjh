/**
 * Entity proxy type enumeration
 * Defines unique identifiers for different entity proxy types
 */
export enum EntityProxyTypeEnum {
  /** Proxy ID for customization product entities */
  CustomizationProduct = "Customization-Product-Proxy-ID",
  /** Proxy ID for customized PM instance model entities */
  CustomizedPMInstance = "CustomizedPMInstanceModel-Proxy-ID"
}

/**
 * Entity size limitation configuration
 */
export interface EntitySizeLimitation {
  // Add specific properties based on actual usage
  [key: string]: unknown;
}

/**
 * Base entity proxy object class
 * Provides common functionality for entity proxy implementations
 */
export declare class EntityProxyObject {
  /**
   * Get entity size limitation configuration
   * @param entity - The entity identifier or configuration
   * @returns Size limitation configuration object
   */
  getEntitySizeLimitation(entity: unknown): EntitySizeLimitation;
}

/**
 * Proxy object constructor type
 */
export type ProxyObjectConstructor = new (...args: any[]) => EntityProxyObject;

/**
 * Factory class for managing entity proxy objects
 * Handles registration and retrieval of proxy objects by ID
 */
export declare class EntityProxyFactory {
  /**
   * Internal registry mapping proxy IDs to their constructors and metadata
   * @private
   */
  private static _proxyObjectById: Map<string, [ProxyObjectConstructor, unknown]>;

  /**
   * Register a proxy object with the factory
   * @param proxyId - Unique identifier for the proxy object
   * @param proxyConstructor - Constructor function for the proxy object
   * @param metadata - Additional metadata associated with the proxy
   */
  static registeProxyObject(
    proxyId: string,
    proxyConstructor: ProxyObjectConstructor,
    metadata: unknown
  ): void;

  /**
   * Retrieve a registered proxy object constructor by ID
   * @param proxyId - Unique identifier of the proxy object
   * @returns The proxy object constructor if found, undefined otherwise
   */
  static getProxyObject(proxyId: string): ProxyObjectConstructor | undefined;
}