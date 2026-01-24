import { Color4, Vector4, Texture, Scene, Mesh, SubMesh, Effect, MaterialDefines, PushMaterial, Constants, VertexBuffer, MaterialHelper, EffectFallbacks, SerializationHelper } from '@babylonjs/core';

/**
 * Material defines for MRDL Backplate Material
 * Extends MaterialDefines to include specific shader features
 */
export declare class MRDLBackplateMaterialDefines extends MaterialDefines {
    /** Enable iridescence effect */
    IRIDESCENCE_ENABLE: boolean;
    
    /** Enable smooth edge rendering */
    SMOOTH_EDGES: boolean;
    
    /** Indicates if normals are required */
    _needNormals: boolean;
    
    constructor();
}

/**
 * MRDL (Mixed Reality Design Language) Backplate Material
 * A specialized material for rendering UI backplates with advanced visual effects including:
 * - Rounded corners with independent radius control
 * - Iridescence effects
 * - Gradient coloring
 * - Edge highlighting
 * - Line borders
 */
export declare class MRDLBackplateMaterial extends PushMaterial {
    /**
     * Default URL for the iridescent map texture
     */
    static readonly IRIDESCENT_MAP_TEXTURE_URL: string;
    
    /**
     * Base corner radius (0-1 range)
     * @default 0.3
     */
    radius: number;
    
    /**
     * Width of the border line
     * @default 0.003
     */
    lineWidth: number;
    
    /**
     * If true, sizes are in world units; if false, sizes are relative
     * @default false
     */
    absoluteSizes: boolean;
    
    /**
     * Filter width for edge smoothing (internal parameter)
     * @internal
     * @default 1
     */
    _filterWidth: number;
    
    /**
     * Base color of the backplate
     * @default Color4(0, 0, 0, 1) - Black
     */
    baseColor: Color4;
    
    /**
     * Color of the border line
     * @default Color4(0.2, 0.262745, 0.4, 1) - Dark blue-gray
     */
    lineColor: Color4;
    
    /**
     * Radius multiplier for top-left corner
     * @default 1
     */
    radiusTopLeft: number;
    
    /**
     * Radius multiplier for top-right corner
     * @default 1
     */
    radiusTopRight: number;
    
    /**
     * Radius multiplier for bottom-left corner
     * @default 1
     */
    radiusBottomLeft: number;
    
    /**
     * Radius multiplier for bottom-right corner
     * @default 1
     */
    radiusBottomRight: number;
    
    /**
     * Animation rate parameter (internal)
     * @internal
     * @default 0
     */
    _rate: number;
    
    /**
     * Color of the highlight effect
     * @default Color4(0.239216, 0.435294, 0.827451, 1) - Blue
     */
    highlightColor: Color4;
    
    /**
     * Width of the highlight effect
     * @default 0
     */
    highlightWidth: number;
    
    /**
     * Transformation vector for highlight positioning (internal)
     * @internal
     * @default Vector4(1, 1, 0, 0)
     */
    _highlightTransform: Vector4;
    
    /**
     * Highlight intensity multiplier (internal)
     * @internal
     * @default 1
     */
    _highlight: number;
    
    /**
     * Intensity of the iridescence effect
     * @default 0.45
     */
    iridescenceIntensity: number;
    
    /**
     * Intensity of iridescence on edges
     * @default 1
     */
    iridescenceEdgeIntensity: number;
    
    /**
     * Tint color applied to iridescence
     * @default Color4(1, 1, 1, 1) - White
     */
    iridescenceTint: Color4;
    
    /**
     * Iridescence texture map (internal)
     * @internal
     */
    _iridescentMapTexture: Texture;
    
    /**
     * Angle of gradient effects in degrees (internal)
     * @internal
     * @default -45
     */
    _angle: number;
    
    /**
     * Fade out intensity
     * @default 1
     */
    fadeOut: number;
    
    /**
     * Whether effects are reflected (internal)
     * @internal
     * @default true
     */
    _reflected: boolean;
    
    /**
     * Frequency of gradient patterns (internal)
     * @internal
     * @default 1
     */
    _frequency: number;
    
    /**
     * Vertical offset for gradient patterns (internal)
     * @internal
     * @default 0
     */
    _verticalOffset: number;
    
    /**
     * Primary gradient color
     * @default Color4(0.74902, 0.74902, 0.74902, 1) - Light gray
     */
    gradientColor: Color4;
    
    /**
     * Gradient color for top-left corner
     * @default Color4(0.00784314, 0.294118, 0.580392, 1) - Dark blue
     */
    topLeftGradientColor: Color4;
    
    /**
     * Gradient color for top-right corner
     * @default Color4(0.305882, 0, 1, 1) - Purple
     */
    topRightGradientColor: Color4;
    
    /**
     * Gradient color for bottom-left corner
     * @default Color4(0.133333, 0.258824, 0.992157, 1) - Bright blue
     */
    bottomLeftGradientColor: Color4;
    
    /**
     * Gradient color for bottom-right corner
     * @default Color4(0.176471, 0.176471, 0.619608, 1) - Dark blue-purple
     */
    bottomRightGradientColor: Color4;
    
    /**
     * Width of edge effects (0-1 range)
     * @default 0.5
     */
    edgeWidth: number;
    
    /**
     * Power/intensity of edge effects
     * @default 1
     */
    edgePower: number;
    
    /**
     * Blend factor between edge line and gradient (0-1 range)
     * @default 0.5
     */
    edgeLineGradientBlend: number;
    
    /**
     * Creates a new MRDL Backplate Material instance
     * @param name - Name of the material
     * @param scene - The scene the material belongs to
     */
    constructor(name: string, scene: Scene);
    
    /**
     * Specifies if the material requires alpha blending
     * @returns Always false for this material
     */
    needAlphaBlending(): boolean;
    
    /**
     * Specifies if the material requires alpha testing
     * @returns Always false for this material
     */
    needAlphaTesting(): boolean;
    
    /**
     * Gets the texture used for alpha testing
     * @returns Always null for this material
     */
    getAlphaTestTexture(): Texture | null;
    
    /**
     * Checks if the material is ready to be rendered for a specific mesh/submesh
     * @param mesh - The mesh to check
     * @param subMesh - The submesh to check
     * @returns True if the material is ready
     */
    isReadyForSubMesh(mesh: Mesh, subMesh: SubMesh): boolean;
    
    /**
     * Binds the material to the rendering pipeline for a specific submesh
     * @param world - World matrix of the mesh
     * @param mesh - The mesh being rendered
     * @param subMesh - The submesh being rendered
     */
    bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
    
    /**
     * Gets the list of animatable properties in the material
     * @returns Empty array (no animatable properties)
     */
    getAnimatables(): Array<any>;
    
    /**
     * Disposes the material and releases resources
     * @param forceDisposeEffect - If true, forces disposal of the shader effect
     */
    dispose(forceDisposeEffect?: boolean): void;
    
    /**
     * Clones the material
     * @param name - Name for the cloned material
     * @returns A new instance of the material
     */
    clone(name: string): MRDLBackplateMaterial;
    
    /**
     * Serializes the material to a JSON object
     * @returns Serialized material data
     */
    serialize(): any;
    
    /**
     * Gets the class name of the material
     * @returns "MRDLBackplateMaterial"
     */
    getClassName(): string;
    
    /**
     * Parses a serialized material
     * @param source - Serialized material data
     * @param scene - The scene to create the material in
     * @param rootUrl - Root URL for loading resources
     * @returns Parsed material instance
     */
    static Parse(source: any, scene: Scene, rootUrl: string): MRDLBackplateMaterial;
}