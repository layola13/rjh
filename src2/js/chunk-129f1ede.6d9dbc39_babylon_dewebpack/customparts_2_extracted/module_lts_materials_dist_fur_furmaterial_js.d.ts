/**
 * Fur material module for Babylon.js
 * Provides realistic fur rendering with multiple shell layers
 */

import type { 
  Nullable, 
  Scene, 
  Mesh, 
  SubMesh, 
  AbstractMesh,
  BaseTexture,
  DynamicTexture,
  Texture,
  IAnimatable,
  Effect,
  Matrix,
  UniformBuffer
} from '@babylonjs/core';

import { 
  MaterialDefines,
  PushMaterial,
  Color3,
  Vector3,
  VertexBuffer,
  MaterialFlags,
  MaterialHelper,
  EffectFallbacks
} from '@babylonjs/core';

/**
 * Defines for FurMaterial shader compilation
 */
export declare class FurMaterialDefines extends MaterialDefines {
  /** Enable diffuse texture */
  DIFFUSE: boolean;
  
  /** Enable height map for fur displacement */
  HEIGHTMAP: boolean;
  
  /** Enable clip plane 1 */
  CLIPPLANE: boolean;
  
  /** Enable clip plane 2 */
  CLIPPLANE2: boolean;
  
  /** Enable clip plane 3 */
  CLIPPLANE3: boolean;
  
  /** Enable clip plane 4 */
  CLIPPLANE4: boolean;
  
  /** Enable clip plane 5 */
  CLIPPLANE5: boolean;
  
  /** Enable clip plane 6 */
  CLIPPLANE6: boolean;
  
  /** Enable alpha testing */
  ALPHATEST: boolean;
  
  /** Enable depth pre-pass */
  DEPTHPREPASS: boolean;
  
  /** Enable point size */
  POINTSIZE: boolean;
  
  /** Enable fog */
  FOG: boolean;
  
  /** Enable normals */
  NORMAL: boolean;
  
  /** Enable UV channel 1 */
  UV1: boolean;
  
  /** Enable UV channel 2 */
  UV2: boolean;
  
  /** Enable vertex colors */
  VERTEXCOLOR: boolean;
  
  /** Enable vertex alpha */
  VERTEXALPHA: boolean;
  
  /** Number of bone influences per vertex */
  NUM_BONE_INFLUENCERS: number;
  
  /** Number of bones per mesh */
  BonesPerMesh: number;
  
  /** Enable instancing */
  INSTANCES: boolean;
  
  /** Enable instance colors */
  INSTANCESCOLOR: boolean;
  
  /** Enable high-level fur features (gravity, animation) */
  HIGHLEVEL: boolean;
  
  /** Use image processing post-process */
  IMAGEPROCESSINGPOSTPROCESS: boolean;
  
  /** Skip final color clamping */
  SKIPFINALCOLORCLAMP: boolean;

  constructor();
}

/**
 * Material options for FurMaterial
 */
export interface IFurMaterialOptions {
  /** Name of the material */
  name?: string;
  
  /** Scene to attach to */
  scene?: Scene;
}

/**
 * FurMaterial - Creates realistic fur effects using shell texturing technique
 * 
 * This material renders fur by creating multiple layers (shells) of the mesh,
 * each slightly offset and with varying alpha to simulate fur depth.
 * 
 * @example
 *