import type { 
  Nullable, 
  Scene, 
  SubMesh, 
  AbstractMesh, 
  BaseTexture,
  IAnimatable,
  Effect,
  MaterialDefines as IMaterialDefines
} from '@babylonjs/core';
import type { Color3 } from '@babylonjs/core/Maths/math.color';
import type { PushMaterial } from '@babylonjs/core/Materials/pushMaterial';

/**
 * Defines the material properties for terrain rendering
 */
export class TerrainMaterialDefines extends IMaterialDefines {
  /** Enable diffuse texture blending */
  DIFFUSE: boolean;
  
  /** Enable normal/bump mapping */
  BUMP: boolean;
  
  /** Enable clipping plane 1 */
  CLIPPLANE: boolean;
  
  /** Enable clipping plane 2 */
  CLIPPLANE2: boolean;
  
  /** Enable clipping plane 3 */
  CLIPPLANE3: boolean;
  
  /** Enable clipping plane 4 */
  CLIPPLANE4: boolean;
  
  /** Enable clipping plane 5 */
  CLIPPLANE5: boolean;
  
  /** Enable clipping plane 6 */
  CLIPPLANE6: boolean;
  
  /** Enable alpha testing */
  ALPHATEST: boolean;
  
  /** Enable depth pre-pass */
  DEPTHPREPASS: boolean;
  
  /** Enable point size rendering */
  POINTSIZE: boolean;
  
  /** Enable fog calculation */
  FOG: boolean;
  
  /** Enable specular term calculation */
  SPECULARTERM: boolean;
  
  /** Enable normal vectors */
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
  
  /** Apply image processing as post-process */
  IMAGEPROCESSINGPOSTPROCESS: boolean;
  
  /** Skip final color clamping */
  SKIPFINALCOLORCLAMP: boolean;

  constructor();
}

/**
 * Material for rendering terrain with texture splatting.
 * Supports mixing up to 3 diffuse textures and 3 bump textures based on a mix texture.
 */
export class TerrainMaterial extends PushMaterial {
  /**
   * Mix texture controlling the blend between diffuse textures (R, G, B channels)
   */
  mixTexture: Nullable<BaseTexture>;
  
  /**
   * First diffuse texture (red channel of mix texture)
   */
  diffuseTexture1: Nullable<BaseTexture>;
  
  /**
   * Second diffuse texture (green channel of mix texture)
   */
  diffuseTexture2: Nullable<BaseTexture>;
  
  /**
   * Third diffuse texture (blue channel of mix texture)
   */
  diffuseTexture3: Nullable<BaseTexture>;
  
  /**
   * First bump/normal texture
   */
  bumpTexture1: Nullable<BaseTexture>;
  
  /**
   * Second bump/normal texture
   */
  bumpTexture2: Nullable<BaseTexture>;
  
  /**
   * Third bump/normal texture
   */
  bumpTexture3: Nullable<BaseTexture>;
  
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
   * Disable lighting calculations
   */
  disableLighting: boolean;
  
  /**
   * Maximum number of simultaneous lights affecting this material
   */
  maxSimultaneousLights: number;

  /**
   * Creates a new terrain material
   * @param name - Name of the material
   * @param scene - Scene to attach the material to
   */
  constructor(name: string, scene: Scene);

  /**
   * Determines if alpha blending is needed
   * @returns True if alpha is less than 1
   */
  needAlphaBlending(): boolean;

  /**
   * Determines if alpha testing is needed
   * @returns Always false for terrain material
   */
  needAlphaTesting(): boolean;

  /**
   * Gets the texture used for alpha testing
   * @returns Always null for terrain material
   */
  getAlphaTestTexture(): Nullable<BaseTexture>;

  /**
   * Checks if the material is ready to render a submesh
   * @param mesh - Mesh to render
   * @param subMesh - SubMesh to render
   * @param useInstances - Whether instancing is enabled
   * @returns True if ready to render
   */
  isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;

  /**
   * Binds the material to the submesh for rendering
   * @param world - World matrix
   * @param mesh - Mesh to bind
   * @param subMesh - SubMesh to bind
   */
  bindForSubMesh(world: Matrix, mesh: AbstractMesh, subMesh: SubMesh): void;

  /**
   * Gets the list of animatable textures in the material
   * @returns Array of animatable objects
   */
  getAnimatables(): IAnimatable[];

  /**
   * Gets the list of active textures in the material
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
   * Disposes the material and its resources
   * @param forceDisposeEffect - Force disposal of the effect
   * @param forceDisposeTextures - Force disposal of textures
   */
  dispose(forceDisposeEffect?: boolean, forceDisposeTextures?: boolean): void;

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
   * @param rootUrl - Root URL for loading resources
   * @returns Parsed terrain material
   */
  static Parse(source: unknown, scene: Scene, rootUrl: string): TerrainMaterial;
}