import type {
  Scene,
  Mesh,
  AbstractMesh,
  SubMesh,
  RenderTargetTexture,
  Texture,
  BaseTexture,
  Effect,
  IAnimatable,
  Matrix,
  Vector2,
  Vector3,
  Color3,
  Plane,
  SmartArray,
  Engine,
  Nullable,
  Observer,
} from '@babylonjs/core';
import type { PushMaterial } from '@babylonjs/core/Materials/pushMaterial';
import type { MaterialDefines } from '@babylonjs/core/Materials/materialDefines';
import type { ImageProcessingConfiguration } from '@babylonjs/core/Materials/imageProcessingConfiguration';

/**
 * Defines for the WaterMaterial shader compilation
 */
export declare class WaterMaterialDefines extends MaterialDefines {
  /** Enable bump mapping */
  BUMP: boolean;
  /** Enable reflection texture */
  REFLECTION: boolean;
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
  /** Enable fog */
  FOG: boolean;
  /** Enable normals */
  NORMAL: boolean;
  /** Enable UV1 coordinates */
  UV1: boolean;
  /** Enable UV2 coordinates */
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
  /** Enable instanced colors */
  INSTANCESCOLOR: boolean;
  /** Enable specular term */
  SPECULARTERM: boolean;
  /** Enable logarithmic depth buffer */
  LOGARITHMICDEPTH: boolean;
  /** Use reverse depth buffer */
  USE_REVERSE_DEPTHBUFFER: boolean;
  /** Separate Fresnel calculation */
  FRESNELSEPARATE: boolean;
  /** Superimpose bump on reflection */
  BUMPSUPERIMPOSE: boolean;
  /** Bump affects reflection */
  BUMPAFFECTSREFLECTION: boolean;
  /** Enable image processing */
  IMAGEPROCESSING: boolean;
  /** Enable vignette effect */
  VIGNETTE: boolean;
  /** Vignette blend mode: multiply */
  VIGNETTEBLENDMODEMULTIPLY: boolean;
  /** Vignette blend mode: opaque */
  VIGNETTEBLENDMODEOPAQUE: boolean;
  /** Enable tone mapping */
  TONEMAPPING: boolean;
  /** Use ACES tone mapping */
  TONEMAPPING_ACES: boolean;
  /** Enable contrast adjustment */
  CONTRAST: boolean;
  /** Enable exposure adjustment */
  EXPOSURE: boolean;
  /** Enable color curves */
  COLORCURVES: boolean;
  /** Enable color grading */
  COLORGRADING: boolean;
  /** Enable 3D color grading */
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
  /** Linear reflection texture */
  IS_REFLECTION_LINEAR: boolean;
  /** Linear refraction texture */
  IS_REFRACTION_LINEAR: boolean;

  constructor();
}

/**
 * Water material for BABYLON.js
 * Simulates realistic water surfaces with reflection, refraction, waves, and foam
 */
export declare class WaterMaterial extends PushMaterial {
  /**
   * Render target size for reflection and refraction textures
   */
  renderTargetSize: Vector2;

  /**
   * Diffuse color of the water surface
   * @default Color3(1, 1, 1)
   */
  diffuseColor: Color3;

  /**
   * Specular color for highlights
   * @default Color3(0, 0, 0)
   */
  specularColor: Color3;

  /**
   * Specular power (shininess)
   * @default 64
   */
  specularPower: number;

  /**
   * Disable lighting calculations
   * @default false
   */
  disableLighting: boolean;

  /**
   * Maximum number of simultaneous lights
   * @default 4
   */
  maxSimultaneousLights: number;

  /**
   * Wind force affecting wave animation
   * @default 6
   */
  windForce: number;

  /**
   * Wind direction vector (normalized 2D)
   * @default Vector2(0, 1)
   */
  windDirection: Vector2;

  /**
   * Wave height amplitude
   * @default 0.4
   */
  waveHeight: number;

  /**
   * Bump map height intensity
   * @default 0.4
   */
  bumpHeight: number;

  /**
   * Superimpose bump texture on water surface
   * @default false
   */
  bumpSuperimpose: boolean;

  /**
   * Separate Fresnel effect calculation
   * @default false
   */
  fresnelSeparate: boolean;

  /**
   * Whether bump map affects reflection
   * @default false
   */
  bumpAffectsReflection: boolean;

  /**
   * Primary water color
   * @default Color3(0.1, 0.1, 0.6)
   */
  waterColor: Color3;

  /**
   * Blend factor for primary water color
   * @default 0.2
   */
  colorBlendFactor: number;

  /**
   * Secondary water color for depth variation
   * @default Color3(0.1, 0.1, 0.6)
   */
  waterColor2: Color3;

  /**
   * Blend factor for secondary water color
   * @default 0.2
   */
  colorBlendFactor2: number;

  /**
   * Wave length (distance between wave crests)
   * @default 0.1
   */
  waveLength: number;

  /**
   * Wave animation speed multiplier
   * @default 1.0
   */
  waveSpeed: number;

  /**
   * Number of wave iterations
   * @default 20
   */
  waveCount: number;

  /**
   * Disable automatic clip plane setup for reflections
   * @default false
   */
  disableClipPlane: boolean;

  /**
   * Enable logarithmic depth buffer for improved depth precision
   */
  useLogarithmicDepth: boolean;

  /**
   * Bump/normal map texture
   */
  bumpTexture: Nullable<Texture>;

  /**
   * Gets the refraction render target texture (read-only)
   */
  readonly refractionTexture: Nullable<RenderTargetTexture>;

  /**
   * Gets the reflection render target texture (read-only)
   */
  readonly reflectionTexture: Nullable<RenderTargetTexture>;

  /**
   * Whether the material has render target textures (always true for water)
   */
  readonly hasRenderTargetTextures: boolean;

  /**
   * Whether render targets are currently enabled (refreshing)
   */
  readonly renderTargetsEnabled: boolean;

  /**
   * Creates a new WaterMaterial instance
   * @param name - Material name
   * @param scene - The scene the material belongs to
   * @param renderTargetSize - Size of reflection/refraction textures (default: 512x512)
   */
  constructor(name: string, scene: Scene, renderTargetSize?: Vector2);

  /**
   * Adds a mesh to the render list of reflection and refraction render targets
   * @param mesh - Mesh to add
   */
  addToRenderList(mesh: AbstractMesh): void;

  /**
   * Enables or disables render target updates
   * @param enable - true to enable real-time updates, false to freeze
   */
  enableRenderTargets(enable: boolean): void;

  /**
   * Gets the render list for refraction texture
   * @returns Array of meshes being rendered to refraction texture
   */
  getRenderList(): Nullable<AbstractMesh[]>;

  /**
   * Returns whether the material needs alpha blending
   * @returns true if alpha < 1.0
   */
  needAlphaBlending(): boolean;

  /**
   * Returns whether the material needs alpha testing
   * @returns Always false for water material
   */
  needAlphaTesting(): boolean;

  /**
   * Gets the alpha test texture
   * @returns Always null for water material
   */
  getAlphaTestTexture(): Nullable<BaseTexture>;

  /**
   * Checks if the material is ready for a specific mesh/submesh
   * @param mesh - The mesh to check
   * @param subMesh - The submesh to check
   * @param useInstances - Whether instances are used
   * @returns true if ready to render
   */
  isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;

  /**
   * Binds the material to a specific mesh for rendering
   * @param world - World matrix
   * @param mesh - Mesh being rendered
   * @param subMesh - Submesh being rendered
   */
  bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;

  /**
   * Gets all animatable textures in the material
   * @returns Array of animatable objects
   */
  getAnimatables(): IAnimatable[];

  /**
   * Gets all active textures from the material
   * @returns Array of active textures
   */
  getActiveTextures(): BaseTexture[];

  /**
   * Checks whether the material uses a specific texture
   * @param texture - Texture to check
   * @returns true if texture is used
   */
  hasTexture(texture: BaseTexture): boolean;

  /**
   * Disposes the material and its resources
   * @param forceDisposeEffect - Force disposal of effect
   * @param forceDisposeTextures - Force disposal of textures
   */
  dispose(forceDisposeEffect?: boolean, forceDisposeTextures?: boolean): void;

  /**
   * Clones the material
   * @param name - Name for the cloned material
   * @returns Cloned material instance
   */
  clone(name: string): WaterMaterial;

  /**
   * Serializes the material to a JSON object
   * @returns Serialized material data
   */
  serialize(): unknown;

  /**
   * Gets the class name
   * @returns "WaterMaterial"
   */
  getClassName(): string;

  /**
   * Parses a serialized WaterMaterial
   * @param source - Serialized data
   * @param scene - Scene to create material in
   * @param rootUrl - Root URL for texture loading
   * @returns Parsed WaterMaterial instance
   */
  static Parse(source: unknown, scene: Scene, rootUrl: string): WaterMaterial;

  /**
   * Creates a default ground mesh suitable for water rendering
   * @param name - Mesh name
   * @param scene - Scene to create mesh in
   * @returns Ground mesh (512x512 with 32 subdivisions)
   */
  static CreateDefaultMesh(name: string, scene: Scene): Mesh;
}