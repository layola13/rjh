/**
 * Defines the specific preprocessor directives for the Fluent material shader compilation.
 * Controls which visual features are enabled in the material rendering pipeline.
 */
export interface FluentMaterialDefines {
  /** Enables inner glow effect rendering */
  INNERGLOW: boolean;
  /** Enables border rendering around mesh edges */
  BORDER: boolean;
  /** Enables interactive hover light effect */
  HOVERLIGHT: boolean;
  /** Enables albedo texture sampling */
  TEXTURE: boolean;
}

/**
 * A specialized material implementing Microsoft Fluent Design System aesthetics.
 * Provides modern UI effects including inner glow, borders, hover lighting, and texture support.
 * Designed for 3D GUI elements in Babylon.js applications.
 */
export declare class FluentMaterial {
  /**
   * Creates a new Fluent material instance.
   * @param name - Unique identifier for the material
   * @param scene - The Babylon.js scene this material belongs to
   */
  constructor(name: string, scene: unknown);

  /**
   * Intensity multiplier for the inner glow effect (0-1 range recommended).
   * Higher values produce more prominent glow.
   * @default 0.5
   */
  innerGlowColorIntensity: number;

  /**
   * RGB color of the inner glow effect.
   * @default Color3(1, 1, 1) - White glow
   */
  innerGlowColor: unknown; // Color3 type

  /**
   * Base RGB color of the material surface (albedo).
   * @default Color3(0.3, 0.35, 0.4) - Neutral blue-gray
   */
  albedoColor: unknown; // Color3 type

  /**
   * Enables rendering of border outlines on mesh edges.
   * @default false
   */
  renderBorders: boolean;

  /**
   * Width of the rendered border in world space units.
   * @default 0.5
   */
  borderWidth: number;

  /**
   * Controls anti-aliasing smoothness of border edges.
   * Lower values create sharper edges.
   * @default 0.02
   */
  edgeSmoothingValue: number;

  /**
   * Minimum alpha threshold for border visibility.
   * Values below this are clipped to prevent artifacts.
   * @default 0.1
   */
  borderMinValue: number;

  /**
   * Enables dynamic hover light effect that follows cursor position.
   * @default false
   */
  renderHoverLight: boolean;

  /**
   * Radius of the hover light sphere of influence in world units.
   * @default 0.01
   */
  hoverRadius: number;

  /**
   * RGBA color of the hover light effect (includes alpha for intensity).
   * @default Color4(0.3, 0.3, 0.3, 1) - Subtle gray highlight
   */
  hoverColor: unknown; // Color4 type

  /**
   * World-space 3D position of the hover light center.
   * @default Vector3.Zero()
   */
  hoverPosition: unknown; // Vector3 type

  /**
   * Optional albedo texture for surface color variation.
   * When set, modulates the albedoColor property.
   */
  albedoTexture: unknown | null; // BaseTexture type

  /**
   * Determines if the material requires alpha blending pass.
   * @returns True when material alpha is not fully opaque
   */
  needAlphaBlending(): boolean;

  /**
   * Determines if the material requires alpha testing pass.
   * @returns Always false - this material doesn't use alpha testing
   */
  needAlphaTesting(): boolean;

  /**
   * Retrieves the texture used for alpha testing.
   * @returns Always null - not used by this material
   */
  getAlphaTestTexture(): null;

  /**
   * Checks if the material shader is compiled and ready for a specific submesh.
   * Handles texture loading, shader compilation, and preprocessor directive management.
   * @param mesh - The parent mesh being rendered
   * @param subMesh - The specific submesh to check readiness for
   * @returns True when shader is compiled and all resources are loaded
   */
  isReadyForSubMesh(mesh: unknown, subMesh: unknown): boolean;

  /**
   * Binds material uniforms and textures to the shader for a submesh render.
   * Updates GPU state with current material property values.
   * @param worldMatrix - The mesh's world transformation matrix
   * @param mesh - The mesh being rendered
   * @param subMesh - The specific submesh being rendered
   */
  bindForSubMesh(worldMatrix: unknown, mesh: unknown, subMesh: unknown): void;

  /**
   * Retrieves all active textures currently used by the material.
   * @returns Array of active texture references
   */
  getActiveTextures(): unknown[];

  /**
   * Checks if a specific texture is used by this material.
   * @param texture - The texture to search for
   * @returns True if the texture is referenced by this material
   */
  hasTexture(texture: unknown): boolean;

  /**
   * Disposes the material and releases associated GPU resources.
   * @param forceDisposeEffect - When true, forces shader effect disposal even if shared
   */
  dispose(forceDisposeEffect?: boolean): void;

  /**
   * Creates a deep copy of this material with a new name.
   * @param name - Name for the cloned material
   * @returns New FluentMaterial instance with copied properties
   */
  clone(name: string): FluentMaterial;

  /**
   * Serializes the material to a JSON-compatible object for persistence.
   * @returns Plain object containing all serializable properties
   */
  serialize(): Record<string, unknown>;

  /**
   * Returns the class name identifier for serialization/reflection.
   * @returns "FluentMaterial"
   */
  getClassName(): string;

  /**
   * Reconstructs a FluentMaterial instance from serialized data.
   * @param source - Serialized material data
   * @param scene - Target scene for the deserialized material
   * @param rootUrl - Base URL for resolving relative texture paths
   * @returns Newly created FluentMaterial instance
   */
  static Parse(source: unknown, scene: unknown, rootUrl: string): FluentMaterial;
}