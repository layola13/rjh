/**
 * Module: Fur Material for Babylon.js
 * Provides realistic fur rendering capabilities with shell-based layering technique
 */

import type { 
  Nullable, 
  Scene, 
  Mesh, 
  SubMesh, 
  AbstractMesh,
  BaseTexture,
  Texture,
  DynamicTexture,
  Effect,
  EffectFallbacks,
  IAnimatable,
  Vector3,
  Color3,
  Matrix,
  MaterialDefines as BaseMaterialDefines
} from '@babylonjs/core';

import type { PushMaterial } from '@babylonjs/core/Materials';

/**
 * Defines the properties available for fur material shader compilation
 */
export declare class FurMaterialDefines extends BaseMaterialDefines {
  /** Enable diffuse texture sampling */
  DIFFUSE: boolean;
  
  /** Enable height map for fur displacement */
  HEIGHTMAP: boolean;
  
  /** Enable primary clipping plane */
  CLIPPLANE: boolean;
  
  /** Enable secondary clipping plane */
  CLIPPLANE2: boolean;
  
  /** Enable tertiary clipping plane */
  CLIPPLANE3: boolean;
  
  /** Enable quaternary clipping plane */
  CLIPPLANE4: boolean;
  
  /** Enable quinary clipping plane */
  CLIPPLANE5: boolean;
  
  /** Enable senary clipping plane */
  CLIPPLANE6: boolean;
  
  /** Enable alpha testing */
  ALPHATEST: boolean;
  
  /** Enable depth pre-pass */
  DEPTHPREPASS: boolean;
  
  /** Enable point size rendering */
  POINTSIZE: boolean;
  
  /** Enable fog calculations */
  FOG: boolean;
  
  /** Enable normal vectors */
  NORMAL: boolean;
  
  /** Enable primary UV channel */
  UV1: boolean;
  
  /** Enable secondary UV channel */
  UV2: boolean;
  
  /** Enable vertex colors */
  VERTEXCOLOR: boolean;
  
  /** Enable vertex alpha channel */
  VERTEXALPHA: boolean;
  
  /** Number of bone influences per vertex for skinning */
  NUM_BONE_INFLUENCERS: number;
  
  /** Maximum bones per mesh */
  BonesPerMesh: number;
  
  /** Enable instanced rendering */
  INSTANCES: boolean;
  
  /** Enable per-instance color variation */
  INSTANCESCOLOR: boolean;
  
  /** Enable high-level fur effects (gravity, wind, animation) */
  HIGHLEVEL: boolean;
  
  /** Enable image processing post-process */
  IMAGEPROCESSINGPOSTPROCESS: boolean;
  
  /** Skip final color clamping in shader */
  SKIPFINALCOLORCLAMP: boolean;
  
  constructor();
}

/**
 * Advanced fur rendering material using shell-based layering technique.
 * Creates realistic fur/hair effects by rendering multiple transparent shells with offset geometry.
 * 
 * @example
 *