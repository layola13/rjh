/**
 * Material management module for 3D scene rendering
 * Handles creation, caching, and configuration of various material types
 */

import * as BABYLON from 'babylonjs';

/**
 * Enum defining all available profile types for materials
 */
export enum ProfileTypesEnum {
  LXC = 'LXC',
  LXCIN = 'LXCIN',
  LXCOUT = 'LXCOUT',
  HardwareLock = 'HardwareLock',
  HardwareHinge = 'HardwareHinge',
  HardwareHingePro = 'HardwareHingePro',
  HardwareLockHookLock = 'HardwareLockHookLock',
  HardwareLockHookLockHandle = 'HardwareLockHookLockHandle',
  HardwareCrecentLock = 'HardwareCrecentLock',
  Transparent = 'Transparent',
  HardwareKfcHandleLeft = 'HardwareKfcHandleLeft',
  HardwareKfcHandleRight = 'HardwareKfcHandleRight',
  CommercialHandle2Left = 'CommercialHandle2Left',
  CommercialHandle2Right = 'CommercialHandle2Right',
  JT = 'JT',
  KK = 'KK',
  GD = 'GD',
  Obb = 'Obb',
  KfcHandle = 'KfcHandle',
  Point = 'Point',
  MarkLine = 'MarkLine',
  HardwareHandle = 'HardwareHandle',
  GlassExport = 'GlassExport',
  Boolean = 'Boolean',
  Background = 'Background',
  BrickWallOut = 'BrickWallOut',
  BrickWallIn = 'BrickWallIn',
  Flyscreen = 'Flyscreen',
  AxisFront = 'AxisFront',
  AxisBack = 'AxisBack',
  AxisLeft = 'AxisLeft',
  AxisRight = 'AxisRight',
  AxisUp = 'AxisUp',
  AxisDown = 'AxisDown',
}

/**
 * Configuration interface for web environment settings
 */
interface IWebEnvironment {
  WebEnviroment: boolean;
}

/**
 * Texture resource interface
 */
interface ITextureResource {
  fileTexture: BABYLON.Texture;
}

/**
 * Texture manager interface
 */
interface ITextureManager {
  GetTextureFromName(name: string): ITextureResource;
}

/**
 * Material manager class - handles all material creation and caching for the 3D scene
 */
export default class MaterialManager {
  /** Static URL for photography background texture */
  static readonly TakePhotoBG: string = 'https://mobilecctokshow.oss-cn-qingdao.aliyuncs.com/BabylonJS/Texture/Test/00.jpg';

  /** Reference to the Babylon.js scene */
  private static Scene?: BABYLON.Scene;

  /** Cache of created materials mapped by profile type */
  private static Mats?: Map<string, BABYLON.Material>;

  /** Specialized material for arc glass rendering */
  private static mat_arcGlass?: BABYLON.PBRMaterial;

  /** Material for handle objects */
  private static mat_handle?: BABYLON.PBRMaterial;

  /** Shader material for line rendering */
  private static mat_line?: BABYLON.ShaderMaterial;

  /**
   * Initialize the material manager with a scene reference
   * @param scene - The Babylon.js scene to associate materials with
   */
  static Init(scene: BABYLON.Scene): void;

  /**
   * Initialize the arc glass PBR material with preset properties
   */
  static InitArcGlass(): void;

  /**
   * Clean up and dispose all cached materials
   * Releases GPU resources and clears internal caches
   */
  static Clean(): void;

  /**
   * Get or create a material based on profile type
   * @param profileType - The type of profile material to retrieve
   * @returns The material instance, or undefined if profile type is invalid
   */
  static GetProfileType(profileType: ProfileTypesEnum | string | null): BABYLON.Material | undefined;

  /**
   * Get the specialized arc glass material
   * Creates it if it doesn't exist
   * @returns The arc glass PBR material
   */
  static GetArcGlassProfile(): BABYLON.PBRMaterial;

  /**
   * Create a PBR material with sphere reflection using HDR environment
   * @returns A new PBR material with HDR cube texture reflection
   */
  static GetSphereReflection(): BABYLON.PBRMaterial;

  /**
   * Create a skybox material with cube texture
   * @returns Standard material configured for skybox rendering
   */
  static GetSkyboxMat(): BABYLON.StandardMaterial;

  /**
   * Get the appropriate glass material based on environment
   * Returns arc glass for web, export glass otherwise
   * @returns The glass material instance
   */
  static GetGlassMat(): BABYLON.Material;

  /**
   * Dispose and clear the arc glass material
   */
  static ClearGlassMat(): void;

  /**
   * Set the color of the glass material
   * @param color - The new color to apply
   */
  static SetGlassColor(color: BABYLON.Color3): void;

  /**
   * Asynchronously load and compile line shader material
   * Fetches vertex and fragment shaders from remote URLs
   * @returns Promise that resolves when shader is loaded
   */
  static DoLLineShader(): Promise<void>;

  /**
   * Get or create the handle material
   * @returns PBR material configured for handle rendering
   */
  static GetHandleMat(): BABYLON.PBRMaterial;
}