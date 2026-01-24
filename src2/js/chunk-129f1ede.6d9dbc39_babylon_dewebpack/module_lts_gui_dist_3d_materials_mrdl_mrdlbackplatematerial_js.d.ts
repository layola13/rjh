import { 
  Color4, 
  Constants, 
  Effect, 
  EffectFallbacks, 
  Engine, 
  Material, 
  MaterialDefines, 
  MaterialHelper, 
  Matrix, 
  Mesh, 
  PushMaterial, 
  Scene, 
  SerializationHelper, 
  SubMesh, 
  Texture, 
  Vector3, 
  Vector4, 
  VertexBuffer 
} from '@babylonjs/core';

/**
 * Material defines for MRDL (Mixed Reality Design Language) Backplate material
 * Extends the base MaterialDefines with specific shader feature flags
 */
export declare class MRDLBackplateMaterialDefines extends MaterialDefines {
  /**
   * Enables iridescence effect on the backplate
   * @defaultValue true
   */
  IRIDESCENCE_ENABLE: boolean;

  /**
   * Enables smooth edge rendering
   * @defaultValue true
   */
  SMOOTH_EDGES: boolean;

  /**
   * Indicates if normals are required for this material
   * @defaultValue true
   */
  _needNormals: boolean;

  constructor();
}

/**
 * MRDL Backplate Material - A specialized material for Mixed Reality UI backplates
 * 
 * This material provides advanced visual features including:
 * - Rounded corners with per-corner radius control
 * - Border/outline rendering
 * - Iridescent effects
 * - Gradient coloring
 * - Edge highlights
 * - Smooth edge anti-aliasing
 * 
 * @remarks
 * Part of the Mixed Reality Design Language (MRDL) material system.
 * Typically used for UI panels and backplates in 3D GUI systems.
 */
export declare class MRDLBackplateMaterial extends PushMaterial {
  /**
   * Default URL for the iridescent texture map
   */
  static readonly IRIDESCENT_MAP_TEXTURE_URL: string;

  /**
   * Base corner radius for the backplate
   * @defaultValue 0.3
   */
  radius: number;

  /**
   * Width of the border line around the backplate
   * @defaultValue 0.003
   */
  lineWidth: number;

  /**
   * Whether sizes are specified in absolute units (true) or relative units (false)
   * @defaultValue false
   */
  absoluteSizes: boolean;

  /**
   * Filter width for edge smoothing (internal shader parameter)
   * @defaultValue 1
   */
  _filterWidth: number;

  /**
   * Base fill color of the backplate
   * @defaultValue Color4(0, 0, 0, 1) - Black
   */
  baseColor: Color4;

  /**
   * Color of the border line
   * @defaultValue Color4(0.2, 0.262745, 0.4, 1) - Dark blue-gray
   */
  lineColor: Color4;

  /**
   * Radius multiplier for top-left corner
   * @defaultValue 1
   */
  radiusTopLeft: number;

  /**
   * Radius multiplier for top-right corner
   * @defaultValue 1
   */
  radiusTopRight: number;

  /**
   * Radius multiplier for bottom-left corner
   * @defaultValue 1
   */
  radiusBottomLeft: number;

  /**
   * Radius multiplier for bottom-right corner
   * @defaultValue 1
   */
  radiusBottomRight: number;

  /**
   * Animation rate parameter (internal)
   * @defaultValue 0
   */
  _rate: number;

  /**
   * Color of the highlight effect
   * @defaultValue Color4(0.239216, 0.435294, 0.827451, 1) - Blue
   */
  highlightColor: Color4;

  /**
   * Width of the highlight border
   * @defaultValue 0
   */
  highlightWidth: number;

  /**
   * Transform parameters for highlight positioning (scale.x, scale.y, offset.x, offset.y)
   * @defaultValue Vector4(1, 1, 0, 0)
   */
  _highlightTransform: Vector4;

  /**
   * Highlight intensity multiplier (internal)
   * @defaultValue 1
   */
  _highlight: number;

  /**
   * Intensity of the iridescent effect
   * @defaultValue 0.45
   */
  iridescenceIntensity: number;

  /**
   * Intensity of iridescence at edges
   * @defaultValue 1
   */
  iridescenceEdgeIntensity: number;

  /**
   * Tint color applied to iridescence
   * @defaultValue Color4(1, 1, 1, 1) - White (no tint)
   */
  iridescenceTint: Color4;

  /**
   * Texture used for iridescent color mapping
   */
  _iridescentMapTexture: Texture;

  /**
   * Angle of gradient/iridescence effects in degrees
   * @defaultValue -45
   */
  _angle: number;

  /**
   * Fade out intensity at edges
   * @defaultValue 1
   */
  fadeOut: number;

  /**
   * Whether iridescence is reflected/mirrored
   * @defaultValue true
   */
  _reflected: boolean;

  /**
   * Frequency of gradient patterns
   * @defaultValue 1
   */
  _frequency: number;

  /**
   * Vertical offset for gradient effects
   * @defaultValue 0
   */
  _verticalOffset: number;

  /**
   * Primary gradient color
   * @defaultValue Color4(0.74902, 0.74902, 0.74902, 1) - Light gray
   */
  gradientColor: Color4;

  /**
   * Gradient color at top-left corner
   * @defaultValue Color4(0.00784314, 0.294118, 0.580392, 1) - Dark blue
   */
  topLeftGradientColor: Color4;

  /**
   * Gradient color at top-right corner
   * @defaultValue Color4(0.305882, 0, 1, 1) - Purple
   */
  topRightGradientColor: Color4;

  /**
   * Gradient color at bottom-left corner
   * @defaultValue Color4(0.133333, 0.258824, 0.992157, 1) - Bright blue
   */
  bottomLeftGradientColor: Color4;

  /**
   * Gradient color at bottom-right corner
   * @defaultValue Color4(0.176471, 0.176471, 0.619608, 1) - Dark blue
   */
  bottomRightGradientColor: Color4;

  /**
   * Width of edge fade effect
   * @defaultValue 0.5
   */
  edgeWidth: number;

  /**
   * Power/falloff of edge fade
   * @defaultValue 1
   */
  edgePower: number;

  /**
   * Blend factor between edge effect and line gradient
   * @defaultValue 0.5
   */
  edgeLineGradientBlend: number;

  /**
   * Creates a new MRDL Backplate material
   * @param name - Name of the material
   * @param scene - The scene the material belongs to
   */
  constructor(name: string, scene: Scene);

  /**
   * Determines if the material needs alpha blending
   * @returns Always returns false (no alpha blending needed)
   */
  needAlphaBlending(): boolean;

  /**
   * Determines if the material needs alpha testing
   * @returns Always returns false (no alpha testing needed)
   */
  needAlphaTesting(): boolean;

  /**
   * Gets the texture used for alpha testing
   * @returns Always returns null (no alpha test texture)
   */
  getAlphaTestTexture(): Nullable<Texture>;

  /**
   * Checks if the material is ready to render for a specific mesh/submesh
   * @param mesh - The mesh to check
   * @param subMesh - The submesh to check
   * @returns True if the material effect is compiled and ready
   */
  isReadyForSubMesh(mesh: Mesh, subMesh: SubMesh): boolean;

  /**
   * Binds the material data to shader uniforms for rendering
   * @param world - World transformation matrix of the mesh
   * @param mesh - The mesh being rendered
   * @param subMesh - The submesh being rendered
   */
  bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;

  /**
   * Gets list of animatable textures/properties
   * @returns Empty array (no animatable properties)
   */
  getAnimatables(): Array<unknown>;

  /**
   * Disposes of material resources
   * @param forceDisposeEffect - Whether to force dispose of the shader effect
   */
  dispose(forceDisposeEffect?: boolean): void;

  /**
   * Clones the material
   * @param name - Name for the cloned material
   * @returns New instance of MRDLBackplateMaterial
   */
  clone(name: string): MRDLBackplateMaterial;

  /**
   * Serializes the material to a JSON object
   * @returns Serialized material data
   */
  serialize(): unknown;

  /**
   * Gets the class name of the material
   * @returns "MRDLBackplateMaterial"
   */
  getClassName(): string;

  /**
   * Parses a serialized material
   * @param source - Serialized material data
   * @param scene - Scene to create the material in
   * @param rootUrl - Root URL for loading resources
   * @returns Parsed MRDLBackplateMaterial instance
   */
  static Parse(source: unknown, scene: Scene, rootUrl: string): MRDLBackplateMaterial;
}