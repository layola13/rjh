/**
 * Defines used by the NormalMaterial shader.
 * Extends the base MaterialDefines to include normal material specific flags.
 */
export declare class NormalMaterialDefines extends MaterialDefines {
    /** Enables diffuse texture support */
    DIFFUSE: boolean;
    
    /** Enables clip plane 1 */
    CLIPPLANE: boolean;
    /** Enables clip plane 2 */
    CLIPPLANE2: boolean;
    /** Enables clip plane 3 */
    CLIPPLANE3: boolean;
    /** Enables clip plane 4 */
    CLIPPLANE4: boolean;
    /** Enables clip plane 5 */
    CLIPPLANE5: boolean;
    /** Enables clip plane 6 */
    CLIPPLANE6: boolean;
    
    /** Enables alpha testing */
    ALPHATEST: boolean;
    /** Enables depth pre-pass */
    DEPTHPREPASS: boolean;
    /** Enables point size rendering */
    POINTSIZE: boolean;
    /** Enables fog effect */
    FOG: boolean;
    
    /** Enables light 0 */
    LIGHT0: boolean;
    /** Enables light 1 */
    LIGHT1: boolean;
    /** Enables light 2 */
    LIGHT2: boolean;
    /** Enables light 3 */
    LIGHT3: boolean;
    
    /** Light 0 is a spotlight */
    SPOTLIGHT0: boolean;
    /** Light 1 is a spotlight */
    SPOTLIGHT1: boolean;
    /** Light 2 is a spotlight */
    SPOTLIGHT2: boolean;
    /** Light 3 is a spotlight */
    SPOTLIGHT3: boolean;
    
    /** Light 0 is a hemispheric light */
    HEMILIGHT0: boolean;
    /** Light 1 is a hemispheric light */
    HEMILIGHT1: boolean;
    /** Light 2 is a hemispheric light */
    HEMILIGHT2: boolean;
    /** Light 3 is a hemispheric light */
    HEMILIGHT3: boolean;
    
    /** Light 0 is a directional light */
    DIRLIGHT0: boolean;
    /** Light 1 is a directional light */
    DIRLIGHT1: boolean;
    /** Light 2 is a directional light */
    DIRLIGHT2: boolean;
    /** Light 3 is a directional light */
    DIRLIGHT3: boolean;
    
    /** Light 0 is a point light */
    POINTLIGHT0: boolean;
    /** Light 1 is a point light */
    POINTLIGHT1: boolean;
    /** Light 2 is a point light */
    POINTLIGHT2: boolean;
    /** Light 3 is a point light */
    POINTLIGHT3: boolean;
    
    /** Enables shadow for light 0 */
    SHADOW0: boolean;
    /** Enables shadow for light 1 */
    SHADOW1: boolean;
    /** Enables shadow for light 2 */
    SHADOW2: boolean;
    /** Enables shadow for light 3 */
    SHADOW3: boolean;
    /** Enables shadows globally */
    SHADOWS: boolean;
    
    /** Light 0 uses ESM shadow mapping */
    SHADOWESM0: boolean;
    /** Light 1 uses ESM shadow mapping */
    SHADOWESM1: boolean;
    /** Light 2 uses ESM shadow mapping */
    SHADOWESM2: boolean;
    /** Light 3 uses ESM shadow mapping */
    SHADOWESM3: boolean;
    
    /** Light 0 uses Poisson shadow sampling */
    SHADOWPOISSON0: boolean;
    /** Light 1 uses Poisson shadow sampling */
    SHADOWPOISSON1: boolean;
    /** Light 2 uses Poisson shadow sampling */
    SHADOWPOISSON2: boolean;
    /** Light 3 uses Poisson shadow sampling */
    SHADOWPOISSON3: boolean;
    
    /** Light 0 uses PCF shadow filtering */
    SHADOWPCF0: boolean;
    /** Light 1 uses PCF shadow filtering */
    SHADOWPCF1: boolean;
    /** Light 2 uses PCF shadow filtering */
    SHADOWPCF2: boolean;
    /** Light 3 uses PCF shadow filtering */
    SHADOWPCF3: boolean;
    
    /** Light 0 uses PCSS shadow filtering */
    SHADOWPCSS0: boolean;
    /** Light 1 uses PCSS shadow filtering */
    SHADOWPCSS1: boolean;
    /** Light 2 uses PCSS shadow filtering */
    SHADOWPCSS2: boolean;
    /** Light 3 uses PCSS shadow filtering */
    SHADOWPCSS3: boolean;
    
    /** Enables normal vectors */
    NORMAL: boolean;
    /** Enables UV channel 1 */
    UV1: boolean;
    /** Enables UV channel 2 */
    UV2: boolean;
    
    /** Number of bone influences per vertex */
    NUM_BONE_INFLUENCERS: number;
    /** Number of bones per mesh */
    BonesPerMesh: number;
    
    /** Enables GPU instancing */
    INSTANCES: boolean;
    /** Enables lighting calculations */
    LIGHTING: boolean;
    /** Applies image processing in post-process instead of shader */
    IMAGEPROCESSINGPOSTPROCESS: boolean;
    /** Skips final color clamping */
    SKIPFINALCOLORCLAMP: boolean;
}

/**
 * A material that renders mesh normals as colors.
 * Useful for debugging normal calculations and mesh topology.
 */
export declare class NormalMaterial extends PushMaterial {
    /**
     * The diffuse texture for the material.
     * This texture modulates the normal color output.
     */
    diffuseTexture: Nullable<BaseTexture>;
    
    /**
     * The diffuse color of the material.
     * Used to tint the normal visualization.
     * @default Color3(1, 1, 1)
     */
    diffuseColor: Color3;
    
    /**
     * Disables lighting calculations when true.
     * When disabled, only normals are displayed without lighting influence.
     * @default false
     */
    disableLighting: boolean;
    
    /**
     * Maximum number of simultaneous lights that can affect this material.
     * @default 4
     */
    maxSimultaneousLights: number;
    
    /**
     * Creates a new NormalMaterial instance.
     * @param name - The name of the material
     * @param scene - The scene the material belongs to
     */
    constructor(name: string, scene: Scene);
    
    /**
     * Determines if the material needs alpha blending.
     * @returns True if alpha is less than 1
     */
    needAlphaBlending(): boolean;
    
    /**
     * Determines if the material needs alpha blending for a specific mesh.
     * @param mesh - The mesh to check
     * @returns True if material alpha < 1 or mesh visibility < 1
     */
    needAlphaBlendingForMesh(mesh: AbstractMesh): boolean;
    
    /**
     * Determines if the material needs alpha testing.
     * @returns Always false for NormalMaterial
     */
    needAlphaTesting(): boolean;
    
    /**
     * Gets the texture used for alpha testing.
     * @returns Always null for NormalMaterial
     */
    getAlphaTestTexture(): Nullable<BaseTexture>;
    
    /**
     * Checks if the material is ready to render for a specific submesh.
     * @param mesh - The mesh to render
     * @param subMesh - The submesh to check
     * @param useInstances - Whether GPU instancing is enabled
     * @returns True if the material is ready to render
     */
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
    
    /**
     * Binds the material to the current render state for a submesh.
     * @param world - The world matrix
     * @param mesh - The mesh being rendered
     * @param subMesh - The submesh being rendered
     */
    bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
    
    /**
     * Gets all animatable textures in the material.
     * @returns Array of animatable textures
     */
    getAnimatables(): IAnimatable[];
    
    /**
     * Gets all active textures currently used by the material.
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
     * Disposes the material and releases all associated resources.
     * @param forceDisposeEffect - Force disposal of the effect
     * @param forceDisposeTextures - Force disposal of textures
     */
    dispose(forceDisposeEffect?: boolean, forceDisposeTextures?: boolean): void;
    
    /**
     * Creates a clone of this material.
     * @param name - The name for the cloned material
     * @returns A new NormalMaterial instance
     */
    clone(name: string): NormalMaterial;
    
    /**
     * Serializes the material to a JSON object.
     * @returns Serialized material data
     */
    serialize(): unknown;
    
    /**
     * Gets the class name of the material.
     * @returns "NormalMaterial"
     */
    getClassName(): string;
    
    /**
     * Parses a serialized NormalMaterial from JSON.
     * @param source - The serialized material data
     * @param scene - The scene to create the material in
     * @param rootUrl - The root URL for texture loading
     * @returns A new NormalMaterial instance
     */
    static Parse(source: unknown, scene: Scene, rootUrl: string): NormalMaterial;
}