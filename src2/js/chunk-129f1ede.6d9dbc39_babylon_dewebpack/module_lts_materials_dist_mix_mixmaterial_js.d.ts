import type { 
  Nullable, 
  Scene, 
  Mesh, 
  SubMesh, 
  AbstractMesh,
  BaseTexture,
  Texture,
  Effect,
  MaterialDefines as IMaterialDefines,
  IAnimatable,
  IEffectCreationOptions
} from '@babylonjs/core';
import type { Color3 } from '@babylonjs/core/Maths/math.color';
import type { Matrix } from '@babylonjs/core/Maths/math.vector';
import type { PushMaterial } from '@babylonjs/core/Materials/pushMaterial';

/**
 * Material defines for MixMaterial shader compilation flags
 * Controls various rendering features and optimizations
 */
export declare class MixMaterialDefines extends IMaterialDefines {
  /** Enable diffuse texture support */
  DIFFUSE: boolean;
  
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
  
  /** Enable point size rendering */
  POINTSIZE: boolean;
  
  /** Enable fog rendering */
  FOG: boolean;
  
  /** Enable specular term calculation */
  SPECULARTERM: boolean;
  
  /** Enable normal vectors */
  NORMAL: boolean;
  
  /** Enable first UV channel */
  UV1: boolean;
  
  /** Enable second UV channel */
  UV2: boolean;
  
  /** Enable vertex colors */
  VERTEXCOLOR: boolean;
  
  /** Enable vertex alpha channel */
  VERTEXALPHA: boolean;
  
  /** Number of bone influences per vertex */
  NUM_BONE_INFLUENCERS: number;
  
  /** Number of bones per mesh */
  BonesPerMesh: number;
  
  /** Enable instanced rendering */
  INSTANCES: boolean;
  
  /** Enable per-instance color */
  INSTANCESCOLOR: boolean;
  
  /** Enable second mix map texture */
  MIXMAP2: boolean;
  
  /** Apply image processing as post-process */
  IMAGEPROCESSINGPOSTPROCESS: boolean;
  
  /** Skip final color clamping */
  SKIPFINALCOLORCLAMP: boolean;
  
  constructor();
}

/**
 * MixMaterial - Advanced texture blending material for Babylon.js
 * 
 * Allows blending up to 8 diffuse textures using 1-2 mix maps as blend masks.
 * Supports standard PBR features: lighting, fog, specular, bone animations, and instancing.
 * 
 * @example
 *