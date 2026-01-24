import type { 
  Nullable, 
  Scene, 
  SubMesh, 
  AbstractMesh, 
  Mesh,
  BaseTexture,
  Texture,
  Effect,
  IAnimatable,
  IEffectCreationOptions,
  MaterialDefines as IMaterialDefines
} from '@babylonjs/core';
import { PushMaterial } from '@babylonjs/core/Materials/pushMaterial';
import { MaterialDefines } from '@babylonjs/core/Materials/materialDefines';
import { Color3 } from '@babylonjs/core/Maths/math.color';

/**
 * Defines for terrain material shader compilation
 */
export declare class TerrainMaterialDefines extends MaterialDefines {
  /** Enable diffuse texture blending */
  DIFFUSE: boolean;
  
  /** Enable bump/normal mapping */
  BUMP: boolean;
  
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
  
  /** Enable depth pre-pass rendering */
  DEPTHPREPASS: boolean;
  
  /** Enable point size attribute */
  POINTSIZE: boolean;
  
  /** Enable fog rendering */
  FOG: boolean;
  
  /** Enable specular term calculation */
  SPECULARTERM: boolean;
  
  /** Enable normal vectors */
  NORMAL: boolean;
  
  /** Enable primary UV coordinates */
  UV1: boolean;
  
  /** Enable secondary UV coordinates */
  UV2: boolean;
  
  /** Enable vertex colors */
  VERTEXCOLOR: boolean;
  
  /** Enable vertex alpha channel */
  VERTEXALPHA: boolean;
  
  /** Number of bone influences per vertex */
  NUM_BONE_INFLUENCERS: number;
  
  /** Maximum bones per mesh */
  BonesPerMesh: number;
  
  /** Enable hardware instancing */
  INSTANCES: boolean;
  
  /** Enable per-instance color attribute */
  INSTANCESCOLOR: boolean;
  
  /** Apply image processing as post-process */
  IMAGEPROCESSINGPOSTPROCESS: boolean;
  
  /** Skip final color clamping */
  SKIPFINALCOLORCLAMP: boolean;

  constructor();
}

/**
 * Terrain material for rendering multi-textured terrain with blending and bump mapping.
 * Supports up to 3 diffuse textures and 3 bump textures blended via a mix texture.
 */
export declare class TerrainMaterial extends PushMaterial {
  /**
   * Mix/blend texture controlling texture layer blending (RGB channels)
   * @internal
   */
  private _mixTexture: Nullable<Texture>;
  
  /**
   * Gets or sets the mix texture for blending terrain layers
   */
  mixTexture: Nullable<Texture>;
  
  /**
   * First diffuse texture layer
   * @internal
   */
  private _diffuseTexture1: Nullable<Texture>;
  
  /**
   * Gets or sets the first diffuse texture
   */
  diffuseTexture1: Nullable<Texture>;
  
  /**
   * Second diffuse texture layer
   * @internal
   */
  private _diffuseTexture2: Nullable<Texture>;
  
  /**
   * Gets or sets the second diffuse texture
   */
  diffuseTexture2: Nullable<Texture>;
  
  /**
   * Third diffuse texture layer
   * @internal
   */
  private _diffuseTexture3: Nullable<Texture>;
  
  /**
   * Gets or sets the third diffuse texture
   */
  diffuseTexture3: Nullable<Texture>;
  
  /**
   * First bump/normal texture layer
   * @internal
   */
  private _bumpTexture1: Nullable<Texture>;
  
  /**
   * Gets or sets the first bump texture
   */
  bumpTexture1: Nullable<Texture>;
  
  /**
   * Second bump/normal texture layer
   * @internal
   */
  private _bumpTexture2: Nullable<Texture>;
  
  /**
   * Gets or sets the second bump texture
   */
  bumpTexture2: Nullable<Texture>;
  
  /**
   * Third bump/normal texture layer
   * @internal
   */
  private _bumpTexture3: Nullable<Texture>;
  
  /**
   * Gets or sets the third bump texture
   */
  bumpTexture3: Nullable<Texture>;
  
  /**
   * Diffuse color of the material
   */
  diffuseColor: Color3;
  
  /**
   * Specular color of the material
   */
  specularColor: Color3;
  
  /**
   * Specular power (shininess) of the material
   */
  specularPower: number;
  
  /**
   * Disables lighting calculations
   * @internal
   */
  private _disableLighting: boolean;
  
  /**
   * Gets or sets whether lighting is disabled
   */
  disableLighting: boolean;
  
  /**
   * Maximum number of simultaneous lights affecting this material
   * @internal
   */
  private _maxSimultaneousLights: number;
  
  /**
   * Gets or sets the maximum number of simultaneous lights
   */
  maxSimultaneousLights: number;

  /**
   * Creates a new terrain material
   * @param name - Name of the material
   * @param scene - Scene the material belongs to
   */
  constructor(name: string, scene: Scene);

  /**
   * Checks if the material needs alpha blending
   * @returns True if alpha blending is required
   */
  needAlphaBlending(): boolean;

  /**
   * Checks if the material needs alpha testing
   * @returns True if alpha testing is required
   */
  needAlphaTesting(): boolean;

  /**
   * Gets the texture used for alpha testing
   * @returns Null as terrain material doesn't use alpha test texture
   */
  getAlphaTestTexture(): Nullable<BaseTexture>;

  /**
   * Checks if the material is ready to render for a specific sub-mesh
   * @param mesh - The mesh to render
   * @param subMesh - The sub-mesh to check
   * @param useInstances - Whether hardware instancing is used
   * @returns True if the material is ready
   */
  isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;

  /**
   * Binds the material to a specific sub-mesh for rendering
   * @param world - World transformation matrix
   * @param mesh - The mesh being rendered
   * @param subMesh - The sub-mesh being rendered
   */
  bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;

  /**
   * Gets all animatable textures in the material
   * @returns Array of animatable objects
   */
  getAnimatables(): IAnimatable[];

  /**
   * Gets all active textures used by the material
   * @returns Array of active textures
   */
  getActiveTextures(): BaseTexture[];

  /**
   * Checks if the material uses a specific texture
   * @param texture - Texture to check
   * @returns True if the texture is used
   */
  hasTexture(texture: BaseTexture): boolean;

  /**
   * Disposes the material and releases resources
   * @param forceDisposeEffect - Force disposal of shader effects
   */
  dispose(forceDisposeEffect?: boolean): void;

  /**
   * Clones the material
   * @param name - Name of the cloned material
   * @returns Cloned terrain material
   */
  clone(name: string): TerrainMaterial;

  /**
   * Serializes the material to a JSON object
   * @returns Serialized material data
   */
  serialize(): unknown;

  /**
   * Gets the class name of the material
   * @returns "TerrainMaterial"
   */
  getClassName(): string;

  /**
   * Parses a serialized terrain material
   * @param source - Serialized material data
   * @param scene - Scene to create the material in
   * @param rootUrl - Root URL for texture loading
   * @returns Parsed terrain material
   */
  static Parse(source: unknown, scene: Scene, rootUrl: string): TerrainMaterial;
}