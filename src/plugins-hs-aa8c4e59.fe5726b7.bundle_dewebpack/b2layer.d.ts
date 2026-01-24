import { B2Processor } from './B2Processor';

/**
 * Layer data structure for BOM (Bill of Materials)
 */
export interface LayerBomData {
  /** Unique instance identifier */
  ID: string;
  /** Display name of the layer */
  displayName: string;
  /** Layer index position */
  index: number;
}

/**
 * Layer context interface
 */
export interface LayerContext {
  /** Collection of layer instances */
  layers: Layer[];
}

/**
 * Layer instance interface
 */
export interface Layer {
  /**
   * Get the unique instance identifier
   * @returns Instance ID
   */
  getInstanceId(): string;

  /**
   * Get parameter value by key
   * @param key - Parameter name
   * @returns Parameter value
   */
  getParameterValue(key: string): any;
}

/**
 * B2Layer processor for handling layer-related operations
 * Extends B2Processor to provide BOM data building functionality
 */
export declare class B2Layer extends B2Processor {
  /** Layer processing context */
  context: LayerContext;

  /**
   * Build BOM data for all layers in context
   * @returns Array of layer BOM data
   */
  buildBom2Data(): LayerBomData[];

  /**
   * Build BOM data for a single layer
   * @param layer - Layer instance to process
   * @returns Layer BOM data object
   */
  buildLayerBomData(layer: Layer): LayerBomData;
}