/**
 * Configuration options for creating an STL model
 */
export interface StlModelOptions {
  /** Name identifier for the STL model */
  name?: string;
  /** Width dimension of the model in units */
  width?: number;
  /** Height dimension of the model in units */
  height?: number;
  /** Depth dimension of the model in units */
  depth?: number;
  /** URL path to the STL model file */
  url?: string;
}

/**
 * Represents a 3D STL model with configurable dimensions and source
 * 
 * @example
 *