/**
 * Perlin noise procedural texture generator for Babylon.js
 * Generates animated Perlin noise patterns that can be used as textures
 */

import { Scene } from '@babylonjs/core/scene';
import { Nullable } from '@babylonjs/core/types';
import { ProceduralTexture } from '@babylonjs/core/Materials/Textures/Procedurals/proceduralTexture';

/**
 * Configuration options for PerlinNoiseProceduralTexture
 */
export interface IPerlinNoiseProceduralTextureOptions {
  /** Current animation time in milliseconds */
  time?: number;
  /** Time scaling factor for animation speed */
  timeScale?: number;
  /** Speed of texture translation */
  translationSpeed?: number;
}

/**
 * Serialized representation of PerlinNoiseProceduralTexture
 */
export interface IPerlinNoiseProceduralTextureSerialized {
  /** Texture name */
  name: string;
  /** Render size */
  _size: number;
  /** Whether to generate mipmaps */
  _generateMipMaps: boolean;
  /** Current animation time */
  time: number;
  /** Time scaling factor */
  timeScale: number;
  /** Translation speed */
  translationSpeed: number;
  /** Custom type identifier */
  customType: string;
}

/**
 * Procedural texture that generates animated Perlin noise patterns
 * 
 * @example
 *