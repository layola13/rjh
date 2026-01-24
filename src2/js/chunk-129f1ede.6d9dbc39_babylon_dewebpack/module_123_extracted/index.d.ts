/**
 * Babylon.js Procedural Textures Library - Type Definitions
 * 
 * This module provides procedurally generated textures for Babylon.js,
 * including fire, wood, marble, grass, and other texture generators.
 */

import type { Scene, Texture, ProceduralTexture, Color3, Vector2, Vector3 } from '@babylonjs/core';

// ============================================================================
// Brick Procedural Texture
// ============================================================================

/**
 * Procedural texture that generates a brick pattern.
 * Simulates realistic brick walls with customizable colors and dimensions.
 */
export class BrickProceduralTexture extends ProceduralTexture {
  /**
   * Creates a new brick procedural texture.
   * @param name - The name of the texture
   * @param size - The size of the generated texture (width and height in pixels)
   * @param scene - The scene the texture will be used in
   * @param fallbackTexture - Optional fallback texture if WebGL is not supported
   * @param generateMipMaps - Whether to generate mipmaps for the texture
   */
  constructor(
    name: string,
    size: number,
    scene: Scene,
    fallbackTexture?: Texture,
    generateMipMaps?: boolean
  );

  /** Number of bricks horizontally */
  numberOfBricksHeight: number;

  /** Number of bricks vertically */
  numberOfBricksWidth: number;

  /** Color of the brick joints/mortar */
  jointColor: Color3;

  /** Color of the bricks themselves */
  brickColor: Color3;
}

// ============================================================================
// Cloud Procedural Texture
// ============================================================================

/**
 * Procedural texture that generates realistic cloud patterns.
 * Uses noise algorithms to create natural-looking clouds.
 */
export class CloudProceduralTexture extends ProceduralTexture {
  /**
   * Creates a new cloud procedural texture.
   * @param name - The name of the texture
   * @param size - The size of the generated texture (width and height in pixels)
   * @param scene - The scene the texture will be used in
   * @param fallbackTexture - Optional fallback texture if WebGL is not supported
   * @param generateMipMaps - Whether to generate mipmaps for the texture
   */
  constructor(
    name: string,
    size: number,
    scene: Scene,
    fallbackTexture?: Texture,
    generateMipMaps?: boolean
  );

  /** Primary color of the sky/background */
  skyColor: Color3;

  /** Color of the clouds */
  cloudColor: Color3;
}

// ============================================================================
// Fire Procedural Texture
// ============================================================================

/**
 * Procedural texture that generates animated fire effects.
 * Creates realistic flames with customizable colors and animation speed.
 */
export class FireProceduralTexture extends ProceduralTexture {
  /**
   * Creates a new fire procedural texture.
   * @param name - The name of the texture
   * @param size - The size of the generated texture (width and height in pixels)
   * @param scene - The scene the texture will be used in
   * @param fallbackTexture - Optional fallback texture if WebGL is not supported
   * @param generateMipMaps - Whether to generate mipmaps for the texture
   */
  constructor(
    name: string,
    size: number,
    scene: Scene,
    fallbackTexture?: Texture,
    generateMipMaps?: boolean
  );

  /** Controls the animation speed of the fire */
  time: number;

  /** Speed multiplier for the fire animation */
  speed: Vector2;

  /** Adjusts the fire effect by offsetting color channels */
  fireColors: Color3[];
}

// ============================================================================
// Grass Procedural Texture
// ============================================================================

/**
 * Procedural texture that generates grass patterns.
 * Simulates natural grass coverage with customizable colors.
 */
export class GrassProceduralTexture extends ProceduralTexture {
  /**
   * Creates a new grass procedural texture.
   * @param name - The name of the texture
   * @param size - The size of the generated texture (width and height in pixels)
   * @param scene - The scene the texture will be used in
   * @param fallbackTexture - Optional fallback texture if WebGL is not supported
   * @param generateMipMaps - Whether to generate mipmaps for the texture
   */
  constructor(
    name: string,
    size: number,
    scene: Scene,
    fallbackTexture?: Texture,
    generateMipMaps?: boolean
  );

  /** Primary color of the grass */
  grassColor: Color3;

  /** Color of the ground/dirt beneath the grass */
  groundColor: Color3;
}

// ============================================================================
// Marble Procedural Texture
// ============================================================================

/**
 * Procedural texture that generates marble stone patterns.
 * Creates realistic marble surfaces with veins and color variations.
 */
export class MarbleProceduralTexture extends ProceduralTexture {
  /**
   * Creates a new marble procedural texture.
   * @param name - The name of the texture
   * @param size - The size of the generated texture (width and height in pixels)
   * @param scene - The scene the texture will be used in
   * @param fallbackTexture - Optional fallback texture if WebGL is not supported
   * @param generateMipMaps - Whether to generate mipmaps for the texture
   */
  constructor(
    name: string,
    size: number,
    scene: Scene,
    fallbackTexture?: Texture,
    generateMipMaps?: boolean
  );

  /** Number of tiles horizontally */
  numberOfTilesHeight: number;

  /** Number of tiles vertically */
  numberOfTilesWidth: number;

  /** Amplitude of the marble veining pattern */
  amplitude: number;

  /** Color of the marble joints/seams */
  jointColor: Color3;
}

// ============================================================================
// Normal Map Procedural Texture
// ============================================================================

/**
 * Procedural texture that generates normal maps.
 * Used for adding surface detail through lighting calculations.
 */
export class NormalMapProceduralTexture extends ProceduralTexture {
  /**
   * Creates a new normal map procedural texture.
   * @param name - The name of the texture
   * @param size - The size of the generated texture (width and height in pixels)
   * @param scene - The scene the texture will be used in
   * @param fallbackTexture - Optional fallback texture if WebGL is not supported
   * @param generateMipMaps - Whether to generate mipmaps for the texture
   */
  constructor(
    name: string,
    size: number,
    scene: Scene,
    fallbackTexture?: Texture,
    generateMipMaps?: boolean
  );

  /** Base texture to generate normals from */
  baseTexture: Texture;
}

// ============================================================================
// Perlin Noise Procedural Texture
// ============================================================================

/**
 * Procedural texture that generates Perlin noise patterns.
 * Useful for creating natural-looking random variations.
 */
export class PerlinNoiseProceduralTexture extends ProceduralTexture {
  /**
   * Creates a new Perlin noise procedural texture.
   * @param name - The name of the texture
   * @param size - The size of the generated texture (width and height in pixels)
   * @param scene - The scene the texture will be used in
   * @param fallbackTexture - Optional fallback texture if WebGL is not supported
   * @param generateMipMaps - Whether to generate mipmaps for the texture
   */
  constructor(
    name: string,
    size: number,
    scene: Scene,
    fallbackTexture?: Texture,
    generateMipMaps?: boolean
  );

  /** Current time value for animation */
  time: number;

  /** Speed of time progression for animated noise */
  timeScale: number;

  /** Scale factor for the noise pattern */
  translationSpeed: number;
}

// ============================================================================
// Road Procedural Texture
// ============================================================================

/**
 * Procedural texture that generates road surface patterns.
 * Creates asphalt roads with lane markings.
 */
export class RoadProceduralTexture extends ProceduralTexture {
  /**
   * Creates a new road procedural texture.
   * @param name - The name of the texture
   * @param size - The size of the generated texture (width and height in pixels)
   * @param scene - The scene the texture will be used in
   * @param fallbackTexture - Optional fallback texture if WebGL is not supported
   * @param generateMipMaps - Whether to generate mipmaps for the texture
   */
  constructor(
    name: string,
    size: number,
    scene: Scene,
    fallbackTexture?: Texture,
    generateMipMaps?: boolean
  );

  /** Color of the road surface */
  roadColor: Color3;
}

// ============================================================================
// Starfield Procedural Texture
// ============================================================================

/**
 * Procedural texture that generates a starfield/space background.
 * Creates a field of stars with customizable properties.
 */
export class StarfieldProceduralTexture extends ProceduralTexture {
  /**
   * Creates a new starfield procedural texture.
   * @param name - The name of the texture
   * @param size - The size of the generated texture (width and height in pixels)
   * @param scene - The scene the texture will be used in
   * @param fallbackTexture - Optional fallback texture if WebGL is not supported
   * @param generateMipMaps - Whether to generate mipmaps for the texture
   */
  constructor(
    name: string,
    size: number,
    scene: Scene,
    fallbackTexture?: Texture,
    generateMipMaps?: boolean
  );

  /** Current time for animation */
  time: number;

  /** Transparency/brightness of the stars */
  alpha: number;

  /** Density/number of stars in the field */
  beta: number;

  /** Offset in 3D space for star positioning */
  zoom: number;

  /** Overall brightness multiplier for the starfield */
  formuparam: number;

  /** Number of iterations for detail generation */
  stepsize: number;

  /** Size of individual stars */
  tile: number;

  /** Brightness level of stars */
  brightness: number;

  /** Amount of detail/complexity in the starfield */
  darkmatter: number;

  /** Amount of light distortion/bloom effect */
  distfading: number;

  /** Controls the saturation of star colors */
  saturation: number;
}

// ============================================================================
// Wood Procedural Texture
// ============================================================================

/**
 * Procedural texture that generates wood grain patterns.
 * Simulates realistic wood surfaces with grain and ring patterns.
 */
export class WoodProceduralTexture extends ProceduralTexture {
  /**
   * Creates a new wood procedural texture.
   * @param name - The name of the texture
   * @param size - The size of the generated texture (width and height in pixels)
   * @param scene - The scene the texture will be used in
   * @param fallbackTexture - Optional fallback texture if WebGL is not supported
   * @param generateMipMaps - Whether to generate mipmaps for the texture
   */
  constructor(
    name: string,
    size: number,
    scene: Scene,
    fallbackTexture?: Texture,
    generateMipMaps?: boolean
  );

  /** Amplitude of the wood grain waves */
  ampScale: number;

  /** Primary color of the wood */
  woodColor: Color3;
}

// ============================================================================
// Module Exports
// ============================================================================

/**
 * Re-export all procedural textures for convenience.
 */
export {
  BrickProceduralTexture,
  CloudProceduralTexture,
  FireProceduralTexture,
  GrassProceduralTexture,
  MarbleProceduralTexture,
  NormalMapProceduralTexture,
  PerlinNoiseProceduralTexture,
  RoadProceduralTexture,
  StarfieldProceduralTexture,
  WoodProceduralTexture
};