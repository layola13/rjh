/**
 * glTF 1.0 loader module
 * Provides interfaces, utilities, and extensions for loading glTF 1.0 assets
 */

// ============================================================================
// Enums
// ============================================================================

/**
 * Blending function types for material rendering
 */
export enum EBlendingFunction {
    /** Zero blending factor */
    ZERO = 0,
    /** One blending factor */
    ONE = 1,
    /** Source color blending factor */
    SRC_COLOR = 768,
    /** One minus source color blending factor */
    ONE_MINUS_SRC_COLOR = 769,
    /** Source alpha blending factor */
    SRC_ALPHA = 770,
    /** One minus source alpha blending factor */
    ONE_MINUS_SRC_ALPHA = 771,
    /** Destination alpha blending factor */
    DST_ALPHA = 772,
    /** One minus destination alpha blending factor */
    ONE_MINUS_DST_ALPHA = 773,
    /** Destination color blending factor */
    DST_COLOR = 774,
    /** One minus destination color blending factor */
    ONE_MINUS_DST_COLOR = 775,
    /** Source alpha saturate blending factor */
    SRC_ALPHA_SATURATE = 776,
}

/**
 * Component data types for accessor elements
 */
export enum EComponentType {
    /** 8-bit signed integer */
    BYTE = 5120,
    /** 8-bit unsigned integer */
    UNSIGNED_BYTE = 5121,
    /** 16-bit signed integer */
    SHORT = 5122,
    /** 16-bit unsigned integer */
    UNSIGNED_SHORT = 5123,
    /** 32-bit unsigned integer */
    UNSIGNED_INT = 5125,
    /** 32-bit floating point */
    FLOAT = 5126,
}

/**
 * Face culling modes for rendering
 */
export enum ECullingType {
    /** Cull front faces */
    FRONT = 1028,
    /** Cull back faces */
    BACK = 1029,
    /** Cull both front and back faces */
    FRONT_AND_BACK = 1032,
}

/**
 * Parameter data types for shader uniforms and attributes
 */
export enum EParameterType {
    /** 8-bit signed integer */
    BYTE = 5120,
    /** 8-bit unsigned integer */
    UNSIGNED_BYTE = 5121,
    /** 16-bit signed integer */
    SHORT = 5122,
    /** 16-bit unsigned integer */
    UNSIGNED_SHORT = 5123,
    /** 32-bit signed integer */
    INT = 5124,
    /** 32-bit unsigned integer */
    UNSIGNED_INT = 5125,
    /** 32-bit floating point */
    FLOAT = 5126,
    /** 2D floating point vector */
    FLOAT_VEC2 = 35664,
    /** 3D floating point vector */
    FLOAT_VEC3 = 35665,
    /** 4D floating point vector */
    FLOAT_VEC4 = 35666,
    /** 2D integer vector */
    INT_VEC2 = 35667,
    /** 3D integer vector */
    INT_VEC3 = 35668,
    /** 4D integer vector */
    INT_VEC4 = 35669,
    /** Boolean value */
    BOOL = 35670,
    /** 2D boolean vector */
    BOOL_VEC2 = 35671,
    /** 3D boolean vector */
    BOOL_VEC3 = 35672,
    /** 4D boolean vector */
    BOOL_VEC4 = 35673,
    /** 2x2 floating point matrix */
    FLOAT_MAT2 = 35674,
    /** 3x3 floating point matrix */
    FLOAT_MAT3 = 35675,
    /** 4x4 floating point matrix */
    FLOAT_MAT4 = 35676,
    /** 2D texture sampler */
    SAMPLER_2D = 35678,
}

/**
 * Shader types
 */
export enum EShaderType {
    /** Fragment/pixel shader */
    FRAGMENT = 35632,
    /** Vertex shader */
    VERTEX = 35633,
}

/**
 * Texture filtering modes
 */
export enum ETextureFilterType {
    /** Nearest neighbor filtering */
    NEAREST = 9728,
    /** Linear interpolation filtering */
    LINEAR = 9729,
    /** Nearest mipmap nearest filtering */
    NEAREST_MIPMAP_NEAREST = 9984,
    /** Linear mipmap nearest filtering */
    LINEAR_MIPMAP_NEAREST = 9985,
    /** Nearest mipmap linear filtering */
    NEAREST_MIPMAP_LINEAR = 9986,
    /** Linear mipmap linear filtering (trilinear) */
    LINEAR_MIPMAP_LINEAR = 9987,
}

/**
 * Texture internal format types
 */
export enum ETextureFormat {
    /** Alpha channel only */
    ALPHA = 6406,
    /** RGB color format */
    RGB = 6407,
    /** RGBA color format with alpha */
    RGBA = 6408,
    /** Luminance (grayscale) format */
    LUMINANCE = 6409,
    /** Luminance with alpha format */
    LUMINANCE_ALPHA = 6410,
}

/**
 * Texture coordinate wrapping modes
 */
export enum ETextureWrapMode {
    /** Clamp texture coordinates to edge */
    CLAMP_TO_EDGE = 33071,
    /** Mirror texture coordinates at boundaries */
    MIRRORED_REPEAT = 33648,
    /** Repeat texture coordinates */
    REPEAT = 10497,
}

// ============================================================================
// Classes
// ============================================================================

/**
 * Extension for loading binary glTF 1.0 files (.glb)
 * Handles embedded binary data in glTF assets
 */
export class GLTFBinaryExtension {
    /** Extension name identifier */
    public readonly name: string;
    
    /** Whether this extension is enabled */
    public enabled: boolean;
    
    constructor();
    
    /**
     * Load binary glTF data
     * @param scene - The scene to load into
     * @param data - Binary glTF data
     * @param rootUrl - Root URL for resolving relative paths
     * @param onSuccess - Callback invoked on successful load
     * @param onError - Callback invoked on error
     */
    public loadRuntimeAsync(
        scene: unknown,
        data: ArrayBufferView,
        rootUrl: string,
        onSuccess?: () => void,
        onError?: (message: string) => void
    ): void;
}

/**
 * Base loader class for glTF 1.0 assets
 * Provides core functionality for parsing and importing glTF scenes
 */
export class GLTFLoaderBase {
    /** Current loading state */
    public state: unknown;
    
    constructor();
    
    /**
     * Dispose of loader resources
     */
    public dispose(): void;
    
    /**
     * Import mesh from glTF data
     * @param meshesNames - Names of meshes to import
     * @param scene - Target scene
     * @param data - glTF JSON data
     * @param rootUrl - Root URL for resolving paths
     * @param onSuccess - Success callback
     * @param onProgress - Progress callback
     * @param onError - Error callback
     */
    public importMeshAsync(
        meshesNames: string | string[],
        scene: unknown,
        data: unknown,
        rootUrl: string,
        onSuccess?: (meshes: unknown[], particleSystems: unknown[], skeletons: unknown[]) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (message: string) => void
    ): void;
    
    /**
     * Load glTF scene
     * @param scene - Target scene
     * @param data - glTF JSON data
     * @param rootUrl - Root URL for resolving paths
     * @param onSuccess - Success callback
     * @param onProgress - Progress callback
     * @param onError - Error callback
     */
    public loadAsync(
        scene: unknown,
        data: unknown,
        rootUrl: string,
        onSuccess?: () => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (message: string) => void
    ): void;
}

/**
 * Main glTF 1.0 loader
 * Orchestrates loading of glTF assets with extension support
 */
export class GLTFLoader extends GLTFLoaderBase {
    /** Registered loader extensions */
    public extensions: Record<string, GLTFLoaderExtension>;
    
    constructor();
    
    /**
     * Register a loader extension
     * @param extension - Extension to register
     */
    public registerExtension(extension: GLTFLoaderExtension): void;
}

/**
 * Base class for glTF loader extensions
 * Allows customization of loading behavior
 */
export abstract class GLTFLoaderExtension {
    /** Extension name identifier */
    public abstract readonly name: string;
    
    /** Whether this extension is enabled */
    public enabled: boolean;
    
    /**
     * Load runtime data asynchronously
     * @param scene - Target scene
     * @param data - glTF data
     * @param rootUrl - Root URL
     * @param onSuccess - Success callback
     * @param onError - Error callback
     * @returns True if extension handled the load
     */
    public loadRuntimeAsync?(
        scene: unknown,
        data: unknown,
        rootUrl: string,
        onSuccess?: () => void,
        onError?: (message: string) => void
    ): boolean;
    
    /**
     * Load runtime extensions data
     * @param scene - Target scene
     * @param data - glTF data
     * @param rootUrl - Root URL
     * @param onSuccess - Success callback
     * @returns True if extension handled the load
     */
    public loadRuntimeExtensionsAsync?(
        scene: unknown,
        data: unknown,
        rootUrl: string,
        onSuccess?: () => void
    ): boolean;
}

/**
 * Extension for loading glTF materials common extension (KHR_materials_common)
 * Provides support for common material properties
 */
export class GLTFMaterialsCommonExtension extends GLTFLoaderExtension {
    public readonly name: string;
    
    constructor();
    
    /**
     * Load material runtime data
     * @param scene - Target scene
     * @param material - Material data
     * @param onSuccess - Success callback
     */
    public loadMaterialAsync(
        scene: unknown,
        material: unknown,
        onSuccess: (material: unknown) => void
    ): void;
}

/**
 * Utility functions for glTF 1.0 loading
 * Provides helper methods for data processing and conversion
 */
export class GLTFUtils {
    /**
     * Get byte stride from accessor
     * @param accessor - glTF accessor object
     * @returns Byte stride value
     */
    public static getByteStrideFromType(accessor: unknown): number;
    
    /**
     * Get texture filter mode
     * @param mode - glTF filter mode value
     * @returns Corresponding texture filter constant
     */
    public static getTextureFilterMode(mode: number): number;
    
    /**
     * Get wrap mode from glTF value
     * @param mode - glTF wrap mode value
     * @returns Corresponding wrap mode constant
     */
    public static getWrapMode(mode: number): number;
    
    /**
     * Decode buffer view to typed array
     * @param view - Buffer view to decode
     * @param componentType - Component data type
     * @returns Decoded typed array
     */
    public static decodeBufferView(view: ArrayBufferView, componentType: EComponentType): ArrayBufferView;
    
    /**
     * Set matrix value from array
     * @param matrix - Target matrix
     * @param array - Source array
     * @param offset - Array offset
     */
    public static setMatrix(matrix: unknown, array: number[], offset: number): void;
}