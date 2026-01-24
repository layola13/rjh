/**
 * Babylon.js Procedural Textures Legacy Module
 * 
 * This module provides legacy exports for procedural texture generation.
 * It re-exports all procedural texture classes from the main index and ensures
 * backward compatibility by attaching them to the global BABYLON namespace.
 */

/**
 * Procedural texture that generates a brick pattern.
 * Useful for creating realistic brick walls and surfaces.
 */
export class BrickProceduralTexture {}

/**
 * Procedural texture that generates dynamic cloud patterns.
 * Can be animated to create moving cloud effects.
 */
export class CloudProceduralTexture {}

/**
 * Procedural texture that simulates fire and flame effects.
 * Provides animated, realistic fire rendering.
 */
export class FireProceduralTexture {}

/**
 * Procedural texture that generates grass patterns.
 * Ideal for terrain and ground surface rendering.
 */
export class GrassProceduralTexture {}

/**
 * Procedural texture that creates marble-like patterns.
 * Generates realistic marble surface effects with veining.
 */
export class MarbleProceduralTexture {}

/**
 * Procedural texture that generates normal maps.
 * Used for adding surface detail through normal mapping without additional geometry.
 */
export class NormalMapProceduralTexture {}

/**
 * Procedural texture based on Perlin noise algorithm.
 * Generates natural-looking random noise patterns for various effects.
 */
export class PerlinNoiseProceduralTexture {}

/**
 * Procedural texture that generates road surface patterns.
 * Creates asphalt-like textures with road markings.
 */
export class RoadProceduralTexture {}

/**
 * Procedural texture that generates starfield backgrounds.
 * Creates realistic space and night sky effects with stars.
 */
export class StarfieldProceduralTexture {}

/**
 * Procedural texture that generates wood grain patterns.
 * Produces realistic wood surface textures with natural grain.
 */
export class WoodProceduralTexture {}

/**
 * Global namespace augmentation for Babylon.js
 * Ensures all procedural textures are available on the global BABYLON object
 * for backward compatibility with older code.
 */
declare global {
  interface Window {
    BABYLON?: {
      BrickProceduralTexture?: typeof BrickProceduralTexture;
      CloudProceduralTexture?: typeof CloudProceduralTexture;
      FireProceduralTexture?: typeof FireProceduralTexture;
      GrassProceduralTexture?: typeof GrassProceduralTexture;
      MarbleProceduralTexture?: typeof MarbleProceduralTexture;
      NormalMapProceduralTexture?: typeof NormalMapProceduralTexture;
      PerlinNoiseProceduralTexture?: typeof PerlinNoiseProceduralTexture;
      RoadProceduralTexture?: typeof RoadProceduralTexture;
      StarfieldProceduralTexture?: typeof StarfieldProceduralTexture;
      WoodProceduralTexture?: typeof WoodProceduralTexture;
      [key: string]: unknown;
    };
  }

  const BABYLON: Window['BABYLON'];
}