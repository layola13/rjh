import { 
  MaterialDefines, 
  PushMaterial, 
  MaterialFlags,
  MaterialHelper,
  EffectFallbacks,
  VertexBuffer,
  Scene,
  SerializationHelper,
  Color3,
  Texture,
  BaseTexture,
  Nullable,
  SubMesh,
  AbstractMesh,
  Mesh,
  IAnimatable,
  Effect,
  IEffectCreationOptions
} from '@babylonjs/core';

/**
 * Defines the material properties for the Normal Material
 */
export declare class NormalMaterialDefines extends MaterialDefines {
  /** Diffuse texture enabled */
  DIFFUSE: boolean;
  
  /** Clip plane 1 enabled */
  CLIPPLANE: boolean;
  
  /** Clip plane 2 enabled */
  CLIPPLANE2: boolean;
  
  /** Clip plane 3 enabled */
  CLIPPLANE3: boolean;
  
  /** Clip plane 4 enabled */
  CLIPPLANE4: boolean;
  
  /** Clip plane 5 enabled */
  CLIPPLANE5: boolean;
  
  /** Clip plane 6 enabled */
  CLIPPLANE6: boolean;
  
  /** Alpha testing enabled */
  ALPHATEST: boolean;
  
  /** Depth pre-pass enabled */
  DEPTHPREPASS: boolean;
  
  /** Point size enabled */
  POINTSIZE: boolean;
  
  /** Fog enabled */
  FOG: boolean;
  
  /** Light 0 enabled */
  LIGHT0: boolean;
  
  /** Light 1 enabled */
  LIGHT1: boolean;
  
  /** Light 2 enabled */
  LIGHT2: boolean;
  
  /** Light 3 enabled */
  LIGHT3: boolean;
  
  /** Spotlight 0 enabled */
  SPOTLIGHT0: boolean;
  
  /** Spotlight 1 enabled */
  SPOTLIGHT1: boolean;
  
  /** Spotlight 2 enabled */
  SPOTLIGHT2: boolean;
  
  /** Spotlight 3 enabled */
  SPOTLIGHT3: boolean;
  
  /** Hemispheric light 0 enabled */
  HEMILIGHT0: boolean;
  
  /** Hemispheric light 1 enabled */
  HEMILIGHT1: boolean;
  
  /** Hemispheric light 2 enabled */
  HEMILIGHT2: boolean;
  
  /** Hemispheric light 3 enabled */
  HEMILIGHT3: boolean;
  
  /** Directional light 0 enabled */
  DIRLIGHT0: boolean;
  
  /** Directional light 1 enabled */
  DIRLIGHT1: boolean;
  
  /** Directional light 2 enabled */
  DIRLIGHT2: boolean;
  
  /** Directional light 3 enabled */
  DIRLIGHT3: boolean;
  
  /** Point light 0 enabled */
  POINTLIGHT0: boolean;
  
  /** Point light 1 enabled */
  POINTLIGHT1: boolean;
  
  /** Point light 2 enabled */
  POINTLIGHT2: boolean;
  
  /** Point light 3 enabled */
  POINTLIGHT3: boolean;
  
  /** Shadow 0 enabled */
  SHADOW0: boolean;
  
  /** Shadow 1 enabled */
  SHADOW1: boolean;
  
  /** Shadow 2 enabled */
  SHADOW2: boolean;
  
  /** Shadow 3 enabled */
  SHADOW3: boolean;
  
  /** Shadows enabled */
  SHADOWS: boolean;
  
  /** Exponential shadow map 0 enabled */
  SHADOWESM0: boolean;
  
  /** Exponential shadow map 1 enabled */
  SHADOWESM1: boolean;
  
  /** Exponential shadow map 2 enabled */
  SHADOWESM2: boolean;
  
  /** Exponential shadow map 3 enabled */
  SHADOWESM3: boolean;
  
  /** Poisson sampling shadow 0 enabled */
  SHADOWPOISSON0: boolean;
  
  /** Poisson sampling shadow 1 enabled */
  SHADOWPOISSON1: boolean;
  
  /** Poisson sampling shadow 2 enabled */
  SHADOWPOISSON2: boolean;
  
  /** Poisson sampling shadow 3 enabled */
  SHADOWPOISSON3: boolean;
  
  /** PCF (Percentage Closer Filtering) shadow 0 enabled */
  SHADOWPCF0: boolean;
  
  /** PCF shadow 1 enabled */
  SHADOWPCF1: boolean;
  
  /** PCF shadow 2 enabled */
  SHADOWPCF2: boolean;
  
  /** PCF shadow 3 enabled */
  SHADOWPCF3: boolean;
  
  /** PCSS (Percentage Closer Soft Shadows) 0 enabled */
  SHADOWPCSS0: boolean;
  
  /** PCSS shadow 1 enabled */
  SHADOWPCSS1: boolean;
  
  /** PCSS shadow 2 enabled */
  SHADOWPCSS2: boolean;
  
  /** PCSS shadow 3 enabled */
  SHADOWPCSS3: boolean;
  
  /** Normal vectors enabled */
  NORMAL: boolean;
  
  /** UV coordinate set 1 enabled */
  UV1: boolean;
  
  /** UV coordinate set 2 enabled */
  UV2: boolean;
  
  /** Number of bone influences per vertex */
  NUM_BONE_INFLUENCERS: number;
  
  /** Number of bones per mesh */
  BonesPerMesh: number;
  
  /** Instancing enabled */
  INSTANCES: boolean;
  
  /** Lighting enabled */
  LIGHTING: boolean;
  
  /** Image processing post-process enabled */
  IMAGEPROCESSINGPOSTPROCESS: boolean;
  
  /** Skip final color clamp */
  SKIPFINALCOLORCLAMP: boolean;

  constructor();
}

/**
 * A material that renders mesh normals as RGB colors.
 * Useful for debugging normal maps, lighting calculations, and visualizing mesh geometry.
 */
export declare class NormalMaterial extends PushMaterial {
  /**
   * Diffuse texture applied to the material
   * @internal
   */
  private _diffuseTexture: Nullable<BaseTexture>;
  
  /**
   * Gets or sets the diffuse texture
   */
  diffuseTexture: Nullable<BaseTexture>;
  
  /**
   * Diffuse color of the material (default: white)
   */
  diffuseColor: Color3;
  
  /**
   * Whether lighting is disabled for this material
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
   * Gets or sets the maximum number of simultaneous lights (default: 4)
   */
  maxSimultaneousLights: number;

  /**
   * Creates a new NormalMaterial instance
   * @param name - The name of the material
   * @param scene - The scene the material belongs to
   */
  constructor(name: string, scene: Scene);

  /**
   * Determines if the material needs alpha blending
   * @returns True if alpha is less than 1
   */
  needAlphaBlending(): boolean;

  /**
   * Determines if the material needs alpha blending for a specific mesh
   * @param mesh - The mesh to check
   * @returns True if alpha blending is needed or mesh visibility is less than 1
   */
  needAlphaBlendingForMesh(mesh: AbstractMesh): boolean;

  /**
   * Determines if the material needs alpha testing
   * @returns Always false for this material
   */
  needAlphaTesting(): boolean;

  /**
   * Gets the texture used for alpha testing
   * @returns Always null for this material
   */
  getAlphaTestTexture(): Nullable<BaseTexture>;

  /**
   * Checks if the material is ready to be rendered for a specific submesh
   * @param mesh - The mesh to render
   * @param subMesh - The submesh to check
   * @param useInstances - Whether instancing is used
   * @returns True if the material is ready
   */
  isReadyForSubMesh(
    mesh: AbstractMesh,
    subMesh: SubMesh,
    useInstances?: boolean
  ): boolean;

  /**
   * Binds the material to a mesh for rendering
   * @param world - The world matrix
   * @param mesh - The mesh to bind to
   * @param subMesh - The submesh to bind
   */
  bindForSubMesh(
    world: Matrix,
    mesh: Mesh,
    subMesh: SubMesh
  ): void;

  /**
   * Gets the animatable textures used by this material
   * @returns Array of animatable textures
   */
  getAnimatables(): IAnimatable[];

  /**
   * Gets all active textures used by this material
   * @returns Array of active textures
   */
  getActiveTextures(): BaseTexture[];

  /**
   * Checks if the material uses a specific texture
   * @param texture - The texture to check
   * @returns True if the texture is used
   */
  hasTexture(texture: BaseTexture): boolean;

  /**
   * Disposes the material and releases its resources
   * @param forceDisposeEffect - Force disposal of the effect
   */
  dispose(forceDisposeEffect?: boolean): void;

  /**
   * Clones the material
   * @param name - The name for the cloned material
   * @returns A new cloned material instance
   */
  clone(name: string): NormalMaterial;

  /**
   * Serializes the material to a JSON object
   * @returns The serialized material
   */
  serialize(): unknown;

  /**
   * Gets the class name of the material
   * @returns "NormalMaterial"
   */
  getClassName(): string;

  /**
   * Parses a serialized material
   * @param source - The serialized material data
   * @param scene - The scene to create the material in
   * @param rootUrl - The root URL for loading assets
   * @returns The parsed material instance
   */
  static Parse(
    source: unknown,
    scene: Scene,
    rootUrl: string
  ): NormalMaterial;
}