/**
 * Defines the material properties for the fire material effect.
 * Extends MaterialDefines to configure shader compilation flags.
 */
export declare class FireMaterialDefines extends MaterialDefines {
    /** Enable diffuse texture sampling */
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
    
    /** Enable alpha testing for transparency */
    ALPHATEST: boolean;
    
    /** Enable depth pre-pass rendering */
    DEPTHPREPASS: boolean;
    
    /** Enable point size rendering */
    POINTSIZE: boolean;
    
    /** Enable fog effect */
    FOG: boolean;
    
    /** Enable UV coordinates set 1 */
    UV1: boolean;
    
    /** Enable vertex colors */
    VERTEXCOLOR: boolean;
    
    /** Enable vertex alpha */
    VERTEXALPHA: boolean;
    
    /** Number of bones per mesh for skeletal animation */
    BonesPerMesh: number;
    
    /** Number of bone influences per vertex */
    NUM_BONE_INFLUENCERS: number;
    
    /** Enable hardware instancing */
    INSTANCES: boolean;
    
    /** Enable per-instance color */
    INSTANCESCOLOR: boolean;
    
    /** Apply image processing as post-process */
    IMAGEPROCESSINGPOSTPROCESS: boolean;
    
    /** Skip final color clamping */
    SKIPFINALCOLORCLAMP: boolean;
    
    constructor();
}

/**
 * Fire material for creating animated fire effects in Babylon.js.
 * Implements a custom shader-based material with distortion and opacity mapping.
 */
export declare class FireMaterial extends PushMaterial {
    /**
     * The main diffuse texture for the fire effect.
     */
    diffuseTexture: Nullable<Texture>;
    
    /**
     * Internal storage for diffuse texture.
     * @internal
     */
    private _diffuseTexture;
    
    /**
     * Distortion texture for creating animated fire distortion effects.
     */
    distortionTexture: Nullable<Texture>;
    
    /**
     * Internal storage for distortion texture.
     * @internal
     */
    private _distortionTexture;
    
    /**
     * Opacity texture to control fire transparency.
     */
    opacityTexture: Nullable<Texture>;
    
    /**
     * Internal storage for opacity texture.
     * @internal
     */
    private _opacityTexture;
    
    /**
     * The diffuse color of the fire.
     * @default Color3(1, 1, 1) - white
     */
    diffuseColor: Color3;
    
    /**
     * Animation speed multiplier for the fire effect.
     * @default 1.0
     */
    speed: number;
    
    /**
     * Scaled diffuse color used internally for rendering calculations.
     * @internal
     */
    private _scaledDiffuse;
    
    /**
     * Accumulated time in milliseconds for animation.
     * @internal
     */
    private _lastTime;
    
    /**
     * Creates a new instance of FireMaterial.
     * @param name - The name of the material
     * @param scene - The scene the material belongs to
     */
    constructor(name: string, scene: Scene);
    
    /**
     * Determines if the material needs alpha blending.
     * @returns Always returns false for fire material
     */
    needAlphaBlending(): boolean;
    
    /**
     * Determines if the material needs alpha testing.
     * @returns Always returns true for fire material
     */
    needAlphaTesting(): boolean;
    
    /**
     * Gets the texture used for alpha testing.
     * @returns Always returns null
     */
    getAlphaTestTexture(): Nullable<BaseTexture>;
    
    /**
     * Checks if the material is ready to render for a specific submesh.
     * @param mesh - The mesh being rendered
     * @param subMesh - The submesh being rendered
     * @param useInstances - Whether hardware instancing is used
     * @returns True if the material is ready, false otherwise
     */
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
    
    /**
     * Binds material properties to the effect for rendering a submesh.
     * @param world - The world transformation matrix
     * @param mesh - The mesh being rendered
     * @param subMesh - The submesh being rendered
     */
    bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
    
    /**
     * Gets all animatable assets in the material.
     * @returns Array of animatable textures
     */
    getAnimatables(): IAnimatable[];
    
    /**
     * Gets all active textures used by the material.
     * @returns Array of active textures
     */
    getActiveTextures(): BaseTexture[];
    
    /**
     * Checks if the material uses a specific texture.
     * @param texture - The texture to check
     * @returns True if the texture is used by this material
     */
    hasTexture(texture: BaseTexture): boolean;
    
    /**
     * Gets the class name of the material.
     * @returns The string "FireMaterial"
     */
    getClassName(): string;
    
    /**
     * Disposes the material and its resources.
     * @param forceDisposeEffect - Force disposal of the effect
     * @param forceDisposeTextures - Force disposal of textures
     */
    dispose(forceDisposeEffect?: boolean, forceDisposeTextures?: boolean): void;
    
    /**
     * Creates a clone of the material.
     * @param name - The name of the cloned material
     * @returns A new instance of FireMaterial with copied properties
     */
    clone(name: string): FireMaterial;
    
    /**
     * Serializes the material to a JSON object.
     * @returns Serialized material data
     */
    serialize(): unknown;
    
    /**
     * Parses a serialized FireMaterial.
     * @param source - The serialized material data
     * @param scene - The scene to create the material in
     * @param rootUrl - Root URL for loading textures
     * @returns A new FireMaterial instance
     */
    static Parse(source: unknown, scene: Scene, rootUrl: string): FireMaterial;
}