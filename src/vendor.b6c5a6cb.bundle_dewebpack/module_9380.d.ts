/**
 * Particle system components for rendering large numbers of sprites efficiently.
 * Provides optimized batch rendering for particle effects.
 */

import type { BLEND_MODES, TYPES } from '@pixi/constants';
import type { Container } from '@pixi/display';
import type { Matrix } from '@pixi/math';
import type { Geometry, Buffer, Shader, State, ObjectRenderer } from '@pixi/core';
import type { BaseTexture, Texture } from '@pixi/core';

/**
 * Properties configuration for particle rendering optimization.
 */
export interface ParticleContainerProperties {
  /** Enable custom vertices or scale */
  vertices?: boolean;
  /** Enable custom scale */
  scale?: boolean;
  /** Enable position updates */
  position?: boolean;
  /** Enable rotation */
  rotation?: boolean;
  /** Enable custom UVs */
  uvs?: boolean;
  /** Enable tint color */
  tint?: boolean;
  /** Enable alpha transparency */
  alpha?: boolean;
}

/**
 * Buffer property descriptor for particle attributes.
 */
export interface ParticleBufferProperty {
  /** Shader attribute name */
  attributeName: string;
  /** Number of components per vertex */
  size: number;
  /** Function to upload data to GPU */
  uploadFunction: ParticleUploadFunction;
  /** Data type (FLOAT, UNSIGNED_BYTE, etc.) */
  type?: TYPES;
  /** Offset in the buffer stride */
  offset: number;
}

/**
 * Upload function signature for particle buffer data.
 */
export type ParticleUploadFunction = (
  children: ParticleChild[],
  startIndex: number,
  count: number,
  buffer: Float32Array | Uint32Array,
  stride: number,
  offset: number
) => void;

/**
 * Minimal interface for objects that can be rendered as particles.
 */
export interface ParticleChild {
  /** Texture for this particle */
  _texture: Texture;
  /** Position coordinates */
  position: { x: number; y: number };
  /** Scale factors */
  scale: { x: number; y: number };
  /** Rotation angle in radians */
  rotation: number;
  /** Anchor point */
  anchor: { x: number; y: number };
  /** Opacity (0-1) */
  alpha: number;
  /** Tint color as RGB integer */
  _tintRGB: number;
}

/**
 * Optimized container for rendering large numbers of similar sprites (particles).
 * Achieves high performance through batched rendering and minimal feature set.
 * 
 * @example
 *