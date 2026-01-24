/**
 * Babylon.js Legacy Procedural Textures Module
 * 
 * This module re-exports procedural texture classes from the core library
 * and attaches them to the global BABYLON namespace for backwards compatibility.
 * 
 * @module proceduralTextures/legacy
 */

// ============================================================================
// Core Exports
// ============================================================================

export {
  /** Procedural texture that generates a brick pattern */
  BrickProceduralTexture,
  
  /** Procedural texture that generates animated clouds */
  CloudProceduralTexture,
  
  /** Procedural texture that generates animated fire effect */
  FireProceduralTexture,
  
  /** Procedural texture that generates grass patterns */
  GrassProceduralTexture,
  
  /** Procedural texture that generates marble patterns */
  MarbleProceduralTexture,
  
  /** Procedural texture that generates normal maps */
  NormalMapProceduralTexture,
  
  /** Procedural texture that generates Perlin noise */
  PerlinNoiseProceduralTexture,
  
  /** Procedural texture that generates road markings */
  RoadProceduralTexture,
  
  /** Procedural texture that generates starfield patterns */
  StarfieldProceduralTexture,
  
  /** Procedural texture that generates wood grain patterns */
  WoodProceduralTexture
} from '@lts/proceduralTextures';

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Global namespace for Babylon.js objects
 * Ensures backwards compatibility with legacy code using global BABYLON object
 */
declare global {
  interface Window {
    BABYLON?: typeof import('@lts/proceduralTextures');
  }

  namespace NodeJS {
    interface Global {
      BABYLON?: typeof import('@lts/proceduralTextures');
    }
  }
}

/**
 * Base class for all procedural textures
 * Generates texture data programmatically rather than from image files
 */
export interface ProceduralTexture {
  /** Updates the texture content */
  render(useCameraPostProcess?: boolean): void;
  
  /** Resets the texture */
  reset(): void;
  
  /** Disposes the texture and frees resources */
  dispose(): void;
}

/**
 * Configuration options for brick procedural texture
 */
export interface BrickProceduralTextureConfig {
  /** Number of bricks horizontally */
  numberOfBricksHeight?: number;
  
  /** Number of bricks vertically */
  numberOfBricksWidth?: number;
  
  /** Color of the joints between bricks */
  jointColor?: Color3;
  
  /** Color of the bricks */
  brickColor?: Color3;
}

/**
 * Configuration options for cloud procedural texture
 */
export interface CloudProceduralTextureConfig {
  /** Number of octaves for cloud generation */
  skyOctaves?: number;
  
  /** Color of the sky */
  skyColor?: Color3;
  
  /** Color of the clouds */
  cloudColor?: Color3;
}

/**
 * Configuration options for fire procedural texture
 */
export interface FireProceduralTextureConfig {
  /** Animation speed of the fire */
  speed?: Vector2;
  
  /** Intensity shift of the fire colors */
  fireColors?: Color3[];
}

/**
 * Configuration options for wood procedural texture
 */
export interface WoodProceduralTextureConfig {
  /** Amplitude of the wood grain pattern */
  ampScale?: number;
  
  /** Color of the wood */
  woodColor?: Color3;
}

/**
 * RGB color representation
 */
export interface Color3 {
  r: number;
  g: number;
  b: number;
}

/**
 * 2D vector representation
 */
export interface Vector2 {
  x: number;
  y: number;
}