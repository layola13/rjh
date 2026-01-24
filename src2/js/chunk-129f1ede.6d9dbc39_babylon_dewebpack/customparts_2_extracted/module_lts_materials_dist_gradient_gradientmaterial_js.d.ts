/**
 * Gradient material module for Babylon.js
 * Provides a material that renders a gradient between two colors
 */

import { Color3 } from '@babylonjs/core/Maths/math.color';
import { MaterialDefines } from '@babylonjs/core/Materials/materialDefines';
import { PushMaterial } from '@babylonjs/core/Materials/pushMaterial';
import { Scene } from '@babylonjs/core/scene';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { SubMesh } from '@babylonjs/core/Meshes/subMesh';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import { Matrix } from '@babylonjs/core/Maths/math.vector';
import { Effect } from '@babylonjs/core/Materials/effect';
import { IAnimatable } from '@babylonjs/core/Animations/animatable.interface';

/**
 * Material defines for GradientMaterial
 * Controls shader compilation options and features
 */
export declare class GradientMaterialDefines extends MaterialDefines {
  /** Enable emissive lighting */
  EMISSIVE: boolean;
  
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
  
  /** Enable fog calculations */
  FOG: boolean;
  
  /** Enable normal vertex attribute */
  NORMAL: boolean;
  
  /** Enable first UV channel */
  UV1: boolean;
  
  /** Enable second UV channel */
  UV2: boolean;
  
  /** Enable vertex color attribute */
  VERTEXCOLOR: boolean;
  
  /** Enable vertex alpha channel */
  VERTEXALPHA: boolean;
  
  /** Number of bone influences per vertex */
  NUM_BONE_INFLUENCERS: number;
  
  /** Maximum bones per mesh */
  BonesPerMesh: number;
  
  /** Enable instanced rendering */
  INSTANCES: boolean;
  
  /** Enable instance color attribute */
  INSTANCESCOLOR: boolean;
  
  /** Apply image processing as post-process */
  IMAGEPROCESSINGPOSTPROCESS: boolean;
  
  /** Skip final color clamping */
  SKIPFINALCOLORCLAMP: boolean;

  constructor();
}

/**
 * Gradient material for Babylon.js
 * Creates a smooth gradient transition between two colors with customizable blending
 */
export declare class GradientMaterial extends PushMaterial {
  /**
   * Maximum number of simultaneous lights affecting the material
   * @default 4
   */
  maxSimultaneousLights: number;
  
  /** @internal */
  _maxSimultaneousLights: number;
  
  /**
   * Top gradient color (RGB)
   * @default Color3(1, 0, 0) - Red
   */
  topColor: Color3;
  
  /**
   * Alpha transparency of the top color
   * @default 1.0 (fully opaque)
   */
  topColorAlpha: number;
  
  /**
   * Bottom gradient color (RGB)
   * @default Color3(0, 0, 1) - Blue
   */
  bottomColor: Color3;
  
  /**
   * Alpha transparency of the bottom color
   * @default 1.0 (fully opaque)
   */
  bottomColorAlpha: number;
  
  /**
   * Vertical offset of the gradient center
   * @default 0.0
   */
  offset: number;
  
  /**
   * Scale factor for the gradient distribution
   * @default 1.0
   */
  scale: number;
  
  /**
   * Smoothness of the gradient transition
   * Higher values create softer blending
   * @default 1.0
   */
  smoothness: number;
  
  /**
   * Disables lighting calculations for the material
   * When true, only gradient colors are rendered
   * @default false
   */
  disableLighting: boolean;
  
  /** @internal */
  _disableLighting: boolean;

  /**
   * Creates a new GradientMaterial instance
   * @param name - Unique name for the material
   * @param scene - Scene to attach the material to
   */
  constructor(name: string, scene: Scene);

  /**
   * Determines if the material requires alpha blending
   * @returns true if any alpha value is less than 1.0
   */
  needAlphaBlending(): boolean;

  /**
   * Determines if the material requires alpha testing
   * @returns Always true for gradient materials
   */
  needAlphaTesting(): boolean;

  /**
   * Gets the texture used for alpha testing
   * @returns null (gradient materials don't use alpha test textures)
   */
  getAlphaTestTexture(): null;

  /**
   * Checks if the material is ready to render for a specific submesh
   * @param mesh - The mesh being rendered
   * @param subMesh - The submesh being rendered
   * @param useInstances - Whether instanced rendering is used
   * @returns true if the material effect is compiled and ready
   */
  isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;

  /**
   * Binds material data to the shader for a specific submesh
   * @param world - World transformation matrix
   * @param mesh - The mesh being rendered
   * @param subMesh - The submesh being rendered
   */
  bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;

  /**
   * Gets the list of animatable properties in the material
   * @returns Empty array (no animatable textures)
   */
  getAnimatables(): IAnimatable[];

  /**
   * Disposes the material and releases resources
   * @param forceDisposeEffect - Force disposal of the material effect
   */
  dispose(forceDisposeEffect?: boolean): void;

  /**
   * Creates a duplicate of the material
   * @param name - Name for the cloned material
   * @returns New GradientMaterial instance with copied properties
   */
  clone(name: string): GradientMaterial;

  /**
   * Serializes the material to a JSON object
   * @returns Serialized material data
   */
  serialize(): unknown;

  /**
   * Gets the class name of the material
   * @returns "GradientMaterial"
   */
  getClassName(): string;

  /**
   * Parses a serialized material from JSON
   * @param source - Serialized material data
   * @param scene - Scene to create the material in
   * @param rootUrl - Root URL for loading resources
   * @returns New GradientMaterial instance
   */
  static Parse(source: unknown, scene: Scene, rootUrl: string): GradientMaterial;
}