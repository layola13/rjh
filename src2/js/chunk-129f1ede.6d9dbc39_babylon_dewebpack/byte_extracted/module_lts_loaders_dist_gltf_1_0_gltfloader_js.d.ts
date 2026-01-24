/**
 * glTF 1.0 Loader Type Definitions
 * Provides TypeScript declarations for the legacy glTF 1.0 file format loader
 */

/**
 * Token types used in shader parsing
 */
declare enum TokenType {
  /** Identifier token (variable/function names) */
  IDENTIFIER = 1,
  /** Unknown token type */
  UNKNOWN = 2,
  /** End of input token */
  END_OF_INPUT = 3
}

/**
 * Shader lexical analyzer for parsing glTF 1.0 shader code
 */
declare class ShaderTokenizer {
  private _pos: number;
  private _toParse: string;
  private _maxPos: number;
  private isLetterOrDigitPattern: RegExp;

  /** Current token type */
  currentToken: TokenType;
  /** Current identifier string */
  currentIdentifier: string;
  /** Current character string */
  currentString: string;

  /**
   * Creates a new shader tokenizer
   * @param source - The shader source code to parse
   */
  constructor(source: string);

  /**
   * Gets the next token from the input stream
   * @returns The type of the next token
   */
  getNextToken(): TokenType;

  /**
   * Peeks at the next character without consuming it
   * @returns The next character
   */
  peek(): string;

  /**
   * Reads and consumes the next character
   * @returns The consumed character
   */
  read(): string;

  /**
   * Advances the position by one character
   */
  forward(): void;

  /**
   * Checks if the end of input has been reached
   * @returns True if at end of input
   */
  isEnd(): boolean;
}

/**
 * Runtime context for glTF 1.0 asset loading
 */
interface GLTFRuntime {
  /** Extension data */
  extensions: Record<string, unknown>;
  /** Accessor definitions */
  accessors: Record<string, unknown>;
  /** Buffer data */
  buffers: Record<string, unknown>;
  /** Buffer view definitions */
  bufferViews: Record<string, unknown>;
  /** Mesh definitions */
  meshes: Record<string, unknown>;
  /** Light definitions */
  lights: Record<string, unknown>;
  /** Camera definitions */
  cameras: Record<string, unknown>;
  /** Node definitions */
  nodes: Record<string, unknown>;
  /** Image definitions */
  images: Record<string, unknown>;
  /** Texture definitions */
  textures: Record<string, unknown>;
  /** Shader definitions */
  shaders: Record<string, unknown>;
  /** Shader program definitions */
  programs: Record<string, unknown>;
  /** Sampler definitions */
  samplers: Record<string, unknown>;
  /** Rendering technique definitions */
  techniques: Record<string, unknown>;
  /** Material definitions */
  materials: Record<string, unknown>;
  /** Animation definitions */
  animations: Record<string, unknown>;
  /** Skin definitions */
  skins: Record<string, unknown>;
  /** List of used extensions */
  extensionsUsed: string[];
  /** Scene definitions */
  scenes: Record<string, unknown>;
  
  /** Total number of buffers */
  buffersCount: number;
  /** Total number of shaders */
  shaderscount: number;
  /** The Babylon.js scene */
  scene: unknown;
  /** Root URL for asset loading */
  rootUrl: string;
  /** Number of loaded buffers */
  loadedBufferCount: number;
  /** Loaded buffer view data */
  loadedBufferViews: Record<string, ArrayBuffer>;
  /** Number of loaded shaders */
  loadedShaderCount: number;
  /** Whether to import only meshes */
  importOnlyMeshes: boolean;
  /** Names of meshes to import */
  importMeshesNames?: string[];
  /** Dummy nodes for processing */
  dummyNodes: unknown[];
  /** Asset container for loaded resources */
  assetContainer: unknown | null;
  /** Current active scene */
  currentScene?: unknown;
}

/**
 * Base class for glTF 1.0 loader functionality
 */
declare class GLTFLoaderBase {
  /**
   * Creates a runtime context from glTF JSON data
   * @param parsedData - The parsed glTF JSON
   * @param scene - The target Babylon.js scene
   * @param rootUrl - The root URL for asset loading
   * @returns The created runtime context
   */
  static CreateRuntime(
    parsedData: unknown,
    scene: unknown,
    rootUrl: string
  ): GLTFRuntime;

  /**
   * Asynchronously loads a buffer
   * @param runtime - The glTF runtime context
   * @param bufferId - The buffer identifier
   * @param onSuccess - Callback on successful load
   * @param onError - Callback on load error
   * @param onProgress - Optional progress callback
   */
  static LoadBufferAsync(
    runtime: GLTFRuntime,
    bufferId: string,
    onSuccess: (data: Uint8Array) => void,
    onError: (message: string) => void,
    onProgress?: (event: ProgressEvent) => void
  ): void;

  /**
   * Asynchronously loads texture buffer data
   * @param runtime - The glTF runtime context
   * @param textureId - The texture identifier
   * @param onSuccess - Callback with loaded buffer data
   * @param onError - Callback on load error
   */
  static LoadTextureBufferAsync(
    runtime: GLTFRuntime,
    textureId: string,
    onSuccess: (data: Uint8Array | null) => void,
    onError: (message: string) => void
  ): void;

  /**
   * Creates a Babylon.js texture from buffer data
   * @param runtime - The glTF runtime context
   * @param textureId - The texture identifier
   * @param buffer - The texture buffer data
   * @param onSuccess - Callback with created texture
   */
  static CreateTextureAsync(
    runtime: GLTFRuntime,
    textureId: string,
    buffer: Uint8Array | null,
    onSuccess: (texture: unknown) => void
  ): void;

  /**
   * Asynchronously loads shader source code
   * @param runtime - The glTF runtime context
   * @param shaderId - The shader identifier
   * @param onSuccess - Callback with shader source string
   * @param onError - Callback on load error
   */
  static LoadShaderStringAsync(
    runtime: GLTFRuntime,
    shaderId: string,
    onSuccess: (source: string) => void,
    onError?: (message: string) => void
  ): void;

  /**
   * Asynchronously loads and creates a material
   * @param runtime - The glTF runtime context
   * @param materialId - The material identifier
   * @param onSuccess - Callback with created material
   * @param onError - Callback on load error
   */
  static LoadMaterialAsync(
    runtime: GLTFRuntime,
    materialId: string,
    onSuccess: (material: unknown) => void,
    onError: (message: string) => void
  ): void;
}

/**
 * Base class for glTF 1.0 loader extensions
 */
declare class GLTFLoaderExtension {
  protected _name: string;

  /**
   * Gets the extension name
   */
  get name(): string;

  /**
   * Creates a new loader extension
   * @param name - The unique extension name
   */
  constructor(name: string);

  /**
   * Attempts to load the runtime asynchronously
   * @param runtime - The glTF runtime context
   * @param data - The parsed glTF data
   * @param rootUrl - The root URL for assets
   * @param onSuccess - Success callback
   * @param onError - Error callback
   * @returns True if extension handled the load
   */
  loadRuntimeAsync(
    runtime: unknown,
    data: unknown,
    rootUrl: string,
    onSuccess: (runtime: GLTFRuntime) => void,
    onError: (message: string) => void
  ): boolean;

  /**
   * Attempts to load runtime extensions
   * @param runtime - The glTF runtime context
   * @param onSuccess - Success callback
   * @param onError - Error callback
   * @returns True if extension handled the load
   */
  loadRuntimeExtensionsAsync(
    runtime: GLTFRuntime,
    onSuccess: () => void,
    onError: (message: string) => void
  ): boolean;

  /**
   * Attempts to load a buffer
   * @param runtime - The glTF runtime context
   * @param bufferId - The buffer identifier
   * @param onSuccess - Success callback with buffer data
   * @param onError - Error callback
   * @param onProgress - Progress callback
   * @returns True if extension handled the load
   */
  loadBufferAsync(
    runtime: GLTFRuntime,
    bufferId: string,
    onSuccess: (data: Uint8Array) => void,
    onError: (message: string) => void,
    onProgress?: (event: ProgressEvent) => void
  ): boolean;

  /**
   * Attempts to load texture buffer data
   * @param runtime - The glTF runtime context
   * @param textureId - The texture identifier
   * @param onSuccess - Success callback with buffer data
   * @param onError - Error callback
   * @returns True if extension handled the load
   */
  loadTextureBufferAsync(
    runtime: GLTFRuntime,
    textureId: string,
    onSuccess: (data: Uint8Array) => void,
    onError: (message: string) => void
  ): boolean;

  /**
   * Attempts to create a texture
   * @param runtime - The glTF runtime context
   * @param textureId - The texture identifier
   * @param buffer - The texture buffer data
   * @param onSuccess - Success callback with texture
   * @param onError - Error callback
   * @returns True if extension handled creation
   */
  createTextureAsync(
    runtime: GLTFRuntime,
    textureId: string,
    buffer: Uint8Array,
    onSuccess: (texture: unknown) => void,
    onError: (message: string) => void
  ): boolean;

  /**
   * Attempts to load shader source code
   * @param runtime - The glTF runtime context
   * @param shaderId - The shader identifier
   * @param onSuccess - Success callback with source
   * @param onError - Error callback
   * @returns True if extension handled the load
   */
  loadShaderStringAsync(
    runtime: GLTFRuntime,
    shaderId: string,
    onSuccess: (source: string) => void,
    onError: (message: string) => void
  ): boolean;

  /**
   * Attempts to load a material
   * @param runtime - The glTF runtime context
   * @param materialId - The material identifier
   * @param onSuccess - Success callback with material
   * @param onError - Error callback
   * @returns True if extension handled the load
   */
  loadMaterialAsync(
    runtime: GLTFRuntime,
    materialId: string,
    onSuccess: (material: unknown) => void,
    onError: (message: string) => void
  ): boolean;

  /**
   * Registers a loader extension
   * @param extension - The extension instance to register
   */
  static RegisterExtension(extension: GLTFLoaderExtension): void;

  /**
   * Loads runtime asynchronously with extension support
   * @param scene - The Babylon.js scene
   * @param data - The parsed glTF data
   * @param rootUrl - The root URL for assets
   * @param onSuccess - Success callback with runtime
   * @param onError - Error callback
   */
  static LoadRuntimeAsync(
    scene: unknown,
    data: unknown,
    rootUrl: string,
    onSuccess: (runtime: GLTFRuntime) => void,
    onError: (message: string) => void
  ): void;

  /**
   * Loads runtime extensions asynchronously
   * @param runtime - The glTF runtime context
   * @param onSuccess - Success callback
   * @param onError - Error callback
   */
  static LoadRuntimeExtensionsAsync(
    runtime: GLTFRuntime,
    onSuccess: () => void,
    onError: (message: string) => void
  ): void;

  /**
   * Loads a buffer with extension support
   * @param runtime - The glTF runtime context
   * @param bufferId - The buffer identifier
   * @param onSuccess - Success callback with buffer data
   * @param onError - Error callback
   * @param onProgress - Progress callback
   */
  static LoadBufferAsync(
    runtime: GLTFRuntime,
    bufferId: string,
    onSuccess: (data: Uint8Array) => void,
    onError: (message: string) => void,
    onProgress?: (event: ProgressEvent) => void
  ): void;

  /**
   * Loads a texture with extension support
   * @param runtime - The glTF runtime context
   * @param textureId - The texture identifier
   * @param onSuccess - Success callback with texture
   * @param onError - Error callback
   */
  static LoadTextureAsync(
    runtime: GLTFRuntime,
    textureId: string,
    onSuccess: (texture: unknown) => void,
    onError: (message: string) => void
  ): void;

  /**
   * Loads shader source with extension support
   * @param runtime - The glTF runtime context
   * @param shaderId - The shader identifier
   * @param onSuccess - Success callback with source
   * @param onError - Error callback
   */
  static LoadShaderStringAsync(
    runtime: GLTFRuntime,
    shaderId: string,
    onSuccess: (source: string) => void,
    onError: (message: string) => void
  ): void;

  /**
   * Loads a material with extension support
   * @param runtime - The glTF runtime context
   * @param materialId - The material identifier
   * @param onSuccess - Success callback with material
   * @param onError - Error callback
   */
  static LoadMaterialAsync(
    runtime: GLTFRuntime,
    materialId: string,
    onSuccess: (material: unknown) => void,
    onError: (message: string) => void
  ): void;

  /** Registered extension instances */
  static Extensions: Record<string, GLTFLoaderExtension>;
}

/**
 * Main loader class for glTF 1.0 format files
 */
declare class GLTFLoader {
  /**
   * Disposes loader resources
   */
  dispose(): void;

  /**
   * Imports meshes asynchronously from glTF data
   * @param meshNames - Mesh name(s) to import, or empty for all
   * @param scene - The target Babylon.js scene
   * @param container - Optional asset container
   * @param data - The parsed glTF data
   * @param rootUrl - The root URL for assets
   * @param onProgress - Optional progress callback
   * @returns Promise resolving to imported assets
   */
  importMeshAsync(
    meshNames: string | string[],
    scene: unknown,
    container: unknown,
    data: unknown,
    rootUrl: string,
    onProgress?: (event: ProgressEvent) => void
  ): Promise<{
    meshes: unknown[];
    particleSystems: unknown[];
    skeletons: unknown[];
    animationGroups: unknown[];
    lights: unknown[];
    transformNodes: unknown[];
    geometries: unknown[];
  }>;

  /**
   * Loads a complete glTF scene asynchronously
   * @param scene - The target Babylon.js scene
   * @param data - The parsed glTF data
   * @param rootUrl - The root URL for assets
   * @param onProgress - Optional progress callback
   * @returns Promise that resolves when loading is complete
   */
  loadAsync(
    scene: unknown,
    data: unknown,
    rootUrl: string,
    onProgress?: (event: ProgressEvent) => void
  ): Promise<void>;
}

export { GLTFLoader, GLTFLoaderBase, GLTFLoaderExtension };