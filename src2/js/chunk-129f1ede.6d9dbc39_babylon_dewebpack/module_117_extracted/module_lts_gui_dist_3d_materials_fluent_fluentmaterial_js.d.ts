/**
 * Defines for FluentMaterial shader compilation
 * Controls which features are enabled in the material
 */
export declare class FluentMaterialDefines extends MaterialDefines {
    /** Enable inner glow effect */
    INNERGLOW: boolean;
    
    /** Enable border rendering */
    BORDER: boolean;
    
    /** Enable hover light effect */
    HOVERLIGHT: boolean;
    
    /** Enable albedo texture */
    TEXTURE: boolean;
    
    constructor();
}

/**
 * Fluent Design System material for Babylon.js GUI 3D controls
 * Implements Microsoft Fluent Design visual language with effects like:
 * - Inner glow
 * - Borders with smoothing
 * - Hover lighting
 * - Albedo texturing
 */
export declare class FluentMaterial extends PushMaterial {
    /**
     * Intensity of the inner glow effect (0-1)
     * @default 0.5
     */
    innerGlowColorIntensity: number;
    
    /**
     * Color of the inner glow effect
     * @default Color3(1, 1, 1) - white
     */
    innerGlowColor: Color3;
    
    /**
     * Base color of the material
     * @default Color3(0.3, 0.35, 0.4) - blue-grey
     */
    albedoColor: Color3;
    
    /**
     * Enable border rendering around the mesh
     * @default false
     */
    renderBorders: boolean;
    
    /**
     * Width of the border in normalized units
     * @default 0.5
     */
    borderWidth: number;
    
    /**
     * Smoothing value for border edges (anti-aliasing)
     * @default 0.02
     */
    edgeSmoothingValue: number;
    
    /**
     * Minimum threshold value for border visibility
     * @default 0.1
     */
    borderMinValue: number;
    
    /**
     * Enable hover light effect
     * @default false
     */
    renderHoverLight: boolean;
    
    /**
     * Radius of the hover light effect
     * @default 0.01
     */
    hoverRadius: number;
    
    /**
     * Color of the hover light with alpha
     * @default Color4(0.3, 0.3, 0.3, 1)
     */
    hoverColor: Color4;
    
    /**
     * World position of the hover light
     * @default Vector3.Zero()
     */
    hoverPosition: Vector3;
    
    /**
     * Internal albedo texture reference
     * @internal
     */
    _albedoTexture?: BaseTexture;
    
    /**
     * Albedo texture applied to the material
     */
    albedoTexture: BaseTexture | undefined;
    
    /**
     * Creates a new FluentMaterial instance
     * @param name - Name of the material
     * @param scene - Scene to attach the material to
     */
    constructor(name: string, scene: Scene);
    
    /**
     * Determines if the material needs alpha blending
     * @returns True if alpha < 1
     */
    needAlphaBlending(): boolean;
    
    /**
     * Determines if the material needs alpha testing
     * @returns Always false for FluentMaterial
     */
    needAlphaTesting(): boolean;
    
    /**
     * Gets the texture used for alpha testing
     * @returns Always null for FluentMaterial
     */
    getAlphaTestTexture(): Nullable<BaseTexture>;
    
    /**
     * Checks if the material is ready to render for a specific submesh
     * @param mesh - The mesh being rendered
     * @param subMesh - The submesh being rendered
     * @returns True if ready to render
     */
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh): boolean;
    
    /**
     * Binds material data to the effect for a submesh
     * @param world - World matrix
     * @param mesh - The mesh being rendered
     * @param subMesh - The submesh being rendered
     */
    bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
    
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
     * @param forceDisposeEffect - Force disposal of the effect
     */
    dispose(forceDisposeEffect?: boolean): void;
    
    /**
     * Clones the material
     * @param name - Name for the cloned material
     * @returns Cloned FluentMaterial instance
     */
    clone(name: string): FluentMaterial;
    
    /**
     * Serializes the material to a JSON object
     * @returns Serialized material data
     */
    serialize(): unknown;
    
    /**
     * Gets the class name
     * @returns "FluentMaterial"
     */
    getClassName(): string;
    
    /**
     * Parses a serialized material
     * @param source - Serialized material data
     * @param scene - Scene to create the material in
     * @param rootUrl - Root URL for asset loading
     * @returns Parsed FluentMaterial instance
     */
    static Parse(source: unknown, scene: Scene, rootUrl: string): FluentMaterial;
}