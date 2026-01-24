import type {
  Color3,
  Vector2,
  Matrix,
  Texture,
  Scene,
  Mesh,
  AbstractMesh,
  SubMesh,
  RenderTargetTexture,
  Effect,
  MaterialDefines as IMaterialDefines,
  SmartArray,
  IImageProcessingConfigurationDefines,
} from '@babylonjs/core';

/**
 * Defines for the Water Material shader
 * Extends the base MaterialDefines to include water-specific shader flags
 */
export declare class WaterMaterialDefines extends IMaterialDefines {
  /** Enable bump/normal mapping */
  BUMP: boolean;
  
  /** Enable reflection rendering */
  REFLECTION: boolean;
  
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
  
  /** Enable first UV channel */
  UV1: boolean;
  
  /** Enable second UV channel */
  UV2: boolean;
  
  /** Enable vertex colors */
  VERTEXCOLOR: boolean;
  
  /** Enable vertex alpha */
  VERTEXALPHA: boolean;
  
  /** Number of bone influences per vertex */
  NUM_BONE_INFLUENCERS: number;
  
  /** Maximum bones per mesh */
  BonesPerMesh: number;
  
  /** Enable hardware instancing */
  INSTANCES: boolean;
  
  /** Enable per-instance colors */
  INSTANCESCOLOR: boolean;
  
  /** Enable specular term calculation */
  SPECULARTERM: boolean;
  
  /** Enable logarithmic depth buffer */
  LOGARITHMICDEPTH: boolean;
  
  /** Use reverse depth buffer (for improved precision) */
  USE_REVERSE_DEPTHBUFFER: boolean;
  
  /** Separate Fresnel calculation for refraction and reflection */
  FRESNELSEPARATE: boolean;
  
  /** Superimpose bump texture on water surface */
  BUMPSUPERIMPOSE: boolean;
  
  /** Bump map affects reflection */
  BUMPAFFECTSREFLECTION: boolean;
  
  /** Enable image processing effects */
  IMAGEPROCESSING: boolean;
  
  /** Enable vignette effect */
  VIGNETTE: boolean;
  
  /** Vignette blend mode: multiply */
  VIGNETTEBLENDMODEMULTIPLY: boolean;
  
  /** Vignette blend mode: opaque */
  VIGNETTEBLENDMODEOPAQUE: boolean;
  
  /** Enable tone mapping */
  TONEMAPPING: boolean;
  
  /** Use ACES tone mapping algorithm */
  TONEMAPPING_ACES: boolean;
  
  /** Enable contrast adjustment */
  CONTRAST: boolean;
  
  /** Enable exposure adjustment */
  EXPOSURE: boolean;
  
  /** Enable color curves */
  COLORCURVES: boolean;
  
  /** Enable color grading */
  COLORGRADING: boolean;
  
  /** Use 3D color grading LUT */
  COLORGRADING3D: boolean;
  
  /** 3D sampler green depth */
  SAMPLER3DGREENDEPTH: boolean;
  
  /** 3D sampler BGR map */
  SAMPLER3DBGRMAP: boolean;
  
  /** Enable dithering */
  DITHER: boolean;
  
  /** Apply image processing as post-process */
  IMAGEPROCESSINGPOSTPROCESS: boolean;
  
  /** Skip final color clamping */
  SKIPFINALCOLORCLAMP: boolean;

  constructor();
}

/**
 * Water Material for Babylon.js
 * Creates realistic water surfaces with reflection, refraction, waves, and wind effects
 * 
 * @example
 *