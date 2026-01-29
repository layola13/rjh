/**
 * VRay lighting system type definitions
 * Module: VrayTypeEnum (ID: 54006)
 * Provides classes and enums for managing various VRay light types
 */

/**
 * Enum for VRay light type identifiers
 */
export enum VrayTypeEnum {
  VrayLightIESMax = "VrayLightIESMax",
  VraySunLight = "VraySunLight",
  VrayLightAceray = "VrayLightAceray",
  VrayLightRectangle = "VrayLightRectangle",
  VrayLightEllipse = "VrayLightEllipse",
  VrayLightSphere = "VrayLightSphere",
  VrayLightMesh = "VrayLightMesh",
  VrayLightDome = "VrayLightDome",
  FurnitureLight = "FurnitureLight",
  FurnitureSpotLight = "FurnitureSpotLight"
}

/**
 * Enum for VRay light node type names used in rendering
 */
export enum VrayTypeNameEnum {
  VrayLightIESMax = "VRayIES",
  VrayLightAceray = "AceraySpotLight",
  VraySunLight = "VraySun",
  VrayLightDome = "VrayLightDome",
  FurnitureLight = "FurnitureLight",
  FurnitureSpotLight = "FurnitureSpotLight",
  VrayLightRectangle = "VRayLight",
  VrayLightSphere = "VRayLight",
  VrayLightMesh = "VRayLight",
  VrayLightEllipse = "VRayLight"
}

/**
 * 3D vector representing position, direction, or color (RGB/XYZ)
 */
export type Vector3 = [number, number, number];

/**
 * RGBA color representation
 */
export type ColorRGBA = [number, number, number, number];

/**
 * Quaternion for rotation representation
 */
export type Quaternion = [number, number, number, number];

/**
 * RGB color representation
 */
export type RGB = [number, number, number];

/**
 * Content source type interface
 */
export interface SourceContentType {
  getTypeString(): string;
}

/**
 * IES rotation configuration
 */
export interface IESRotation {
  targetDir: Vector3;
}

/**
 * Base configuration for light construction
 */
export interface BaseLightConfig {
  volumeLight?: boolean;
  close?: boolean;
  rgb?: RGB;
  affectSpecular?: boolean;
  sourceContentType?: SourceContentType;
}

/**
 * Configuration for mesh-based lights
 */
export interface MeshLightConfig extends BaseLightConfig {
  temperature: string;
  intensity: string;
  meshRef?: string;
  entityId?: string;
}

/**
 * Configuration for sun lights
 */
export interface SunLightConfig extends BaseLightConfig {
  filterColor?: ColorRGBA;
  intensity: string;
  position?: Vector3;
  target?: Vector3;
  sizeMultiplier?: number;
}

/**
 * Configuration for IES lights
 */
export interface IESLightConfig extends BaseLightConfig {
  x: number;
  y: number;
  z: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  temperature: string;
  intensity: string;
  IES: string;
  iesUrl?: string;
  isPublicIES?: boolean;
  rotationPoint(x: number, y: number, z: number, rx: number, ry: number, rz: number): Vector3;
}

/**
 * Configuration for Aceray spot lights
 */
export interface AcerayLightConfig extends IESLightConfig {
  nearAttenuationStart: number;
  nearAttenuationEnd: number;
  farAttenuationStart: number;
  farAttenuationEnd: number;
  hotspotAngle: number;
  falloffAngle: number;
}

/**
 * Configuration for furniture lights
 */
export interface FurnitureLightConfig extends BaseLightConfig {
  temperature: string;
  intensity: string;
  entityId?: string;
  intensityScale?: number;
  isAssembly?: boolean;
}

/**
 * Configuration for furniture spot lights
 */
export interface FurnitureSpotLightConfig extends FurnitureLightConfig {
  IES?: string;
  iesUrl?: string;
  isPublicIES?: boolean;
  iesRotations?: IESRotation[];
}

/**
 * Configuration for virtual area lights (rectangle/ellipse)
 */
export interface VirtualAreaLightConfig extends BaseLightConfig {
  x: number;
  y: number;
  z: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  temperature: string;
  intensity: string;
  width: number;
  height: number;
  double_flat?: boolean;
  skylightPortal?: boolean;
  renderVisible?: boolean;
  rotationPoint(x: number, y: number, z: number, rx: number, ry: number, rz: number): Vector3;
}

/**
 * Configuration for dome lights
 */
export interface DomeLightConfig extends BaseLightConfig {
  intensity: number;
  textureTemperature: number;
  affectDiffuse?: boolean;
  textureType?: string;
  castShadow?: boolean;
}

/**
 * Configuration for sphere lights
 */
export interface SphereLightConfig extends BaseLightConfig {
  x: number;
  y: number;
  z: number;
  temperature: string;
  intensity: string;
  radius: number;
}

/**
 * JSON representation of a light object for serialization
 */
export interface LightJson {
  uid: string;
  nodeType: string;
  roomId: string;
  volumeLight: boolean;
  [key: string]: unknown;
}

/**
 * Room data structure for spatial queries
 */
export interface RoomData {
  ID: string;
  roomType?: string;
  [key: string]: unknown;
}

/**
 * Layout data containing room information
 */
export interface LayoutData {
  forEachRoom(callback: (room: RoomData) => void): void;
  lightgroups?: {
    [key: string]: {
      members: Array<{ contentID: string; [key: string]: unknown }>;
    };
  };
}

/**
 * Base abstract class for all VRay light types
 */
export declare abstract class VrayLight {
  /** Default light ID type suffix */
  static readonly DefaultLightIdType: string;

  /** Unique identifier for the light (format: "index/type") */
  uid: string;

  /** Node type identifier from VrayTypeNameEnum */
  nodeType: string;

  /** Associated room ID or "none" */
  roomId: string;

  /** Whether volume lighting is enabled */
  volumeLight: boolean;

  /**
   * Constructs a new VRay light instance
   * @param index - Numeric index for the light
   * @param nodeType - Type name from VrayTypeNameEnum
   * @param config - Base configuration options
   */
  constructor(index: number, nodeType: string, config: BaseLightConfig);

  /**
   * Extracts the numeric index from the UID
   * @returns The index portion of the UID
   */
  getIndex(): string;

  /**
   * Serializes the light to JSON format
   * @returns Light data as JSON object
   */
  toLightJson(): LightJson;
}

/**
 * Mesh-based light that uses geometry as light source
 */
export declare class VrayLightMesh extends VrayLight {
  /** Color temperature in Kelvin */
  color: number;

  /** Light intensity multiplier */
  intensity: number;

  /** Reference to mesh geometry */
  meshRef: string;

  /** Entity identifier */
  entityId: string;

  /** Whether the light is disabled */
  close: boolean;

  /** RGB color override */
  rgb?: RGB;

  constructor(index: number, config: MeshLightConfig);
  toLightJson(): LightJson;
}

/**
 * Sun/directional light simulating sunlight
 */
export declare class VraySunLight extends VrayLight {
  /** Color filter applied to sun light */
  filterColor: ColorRGBA;

  /** Intensity multiplier */
  intensity: number;

  /** Source position in 3D space */
  position: Vector3;

  /** Target position the sun points toward */
  target: Vector3;

  /** Sun disk size multiplier */
  sizeMultiplier: number;

  constructor(index: number, config?: SunLightConfig);
  toLightJson(): LightJson;
}

/**
 * IES profile-based light (photometric)
 */
export declare class VrayLightIESMax extends VrayLight {
  /** Light position in 3D space */
  position: Vector3;

  /** Direction vector the light points toward */
  direction: Vector3;

  /** Up vector for light orientation */
  upVector: Vector3;

  /** Color temperature in Kelvin */
  color: number;

  /** Light power/intensity */
  power: number;

  /** Intensity multiplier */
  intensity: number;

  /** IES profile file path */
  ies_file: string;

  /** URL to IES file */
  iesUrl?: string;

  /** Whether IES file is publicly accessible */
  isPublicIES?: boolean;

  /** RGB color override */
  rgb?: RGB;

  /** Whether light affects specular reflections */
  affectSpecular: boolean;

  /** Whether the light is disabled */
  close?: boolean;

  /** Source content type metadata */
  sourceContentType?: SourceContentType;

  constructor(index: number, config: IESLightConfig, nodeType?: string);
  toLightJson(): LightJson;
}

/**
 * Aceray spot light with attenuation and cone angle controls
 */
export declare class VrayLightAceray extends VrayLightIESMax {
  /** Near attenuation start distance */
  nearAttenuationStart: number;

  /** Near attenuation end distance */
  nearAttenuationEnd: number;

  /** Far attenuation start distance */
  farAttenuationStart: number;

  /** Far attenuation end distance */
  farAttenuationEnd: number;

  /** Hotspot cone angle in degrees */
  hotspotAngle: number;

  /** Falloff cone angle in degrees */
  falloffAngle: number;

  constructor(index: number, config: AcerayLightConfig);
  toLightJson(): LightJson;
}

/**
 * Furniture-based area light
 */
export declare class FurnitureLight extends VrayLight {
  /** Color temperature in Kelvin */
  temperature: number;

  /** Light intensity */
  intensity: number;

  /** Entity identifier */
  entityId: string;

  /** Whether the light is disabled */
  close: boolean;

  /** RGB color override */
  rgb?: RGB;

  /** Whether light affects specular reflections */
  affectSpecular: boolean;

  /** Intensity scale factor */
  intensityScale?: number;

  /** Whether this is an assembly light */
  isAssembly: boolean;

  constructor(index: number, config: FurnitureLightConfig);
  toLightJson(): LightJson;
}

/**
 * Furniture-based spot light with IES profile
 */
export declare class FurnitureSpotLight extends VrayLight {
  /** Color temperature in Kelvin */
  temperature: number;

  /** Light intensity */
  intensity: number;

  /** Entity identifier */
  entityId: string;

  /** IES profile file path */
  ies_file: string;

  /** URL to IES file */
  iesUrl: string;

  /** Whether IES file is publicly accessible */
  isPublicIES?: boolean;

  /** Whether the light is disabled */
  close: boolean;

  /** RGB color override */
  rgb?: RGB;

  /** Whether light affects specular reflections */
  affectSpecular: boolean;

  /** Intensity scale factor */
  intensityScale?: number;

  /** IES rotation configurations */
  iesRotations?: IESRotation[];

  constructor(index: number, config: FurnitureSpotLightConfig);
  toLightJson(): LightJson;
}

/**
 * Base class for virtual area lights (rectangle and ellipse)
 */
export declare abstract class VrayLightVirtualArea extends VrayLight {
  /** VRay internal light type enum value */
  vrayType: number;

  /** Color temperature in Kelvin */
  color: number;

  /** Light intensity multiplier */
  intensity: number;

  /** Light position in 3D space */
  position: Vector3;

  /** Direction vector */
  direction: Vector3;

  /** Up vector for orientation */
  upVector: Vector3;

  /** Whether light emits from both sides */
  doubleSided: boolean;

  /** Width of the light (U dimension) */
  u_size: number;

  /** Height of the light (V dimension) */
  v_size: number;

  /** Whether this acts as a skylight portal */
  skylightPortal: boolean;

  /** RGB color override */
  rgb?: RGB;

  /** Whether light affects specular reflections */
  affectSpecular: boolean;

  /** Whether the light is disabled */
  close?: boolean;

  /** Source content type metadata */
  sourceContentType?: SourceContentType;

  /** Whether light is visible in render */
  renderVisible: boolean;

  constructor(index: number, vrayType: number, nodeType: string, config: VirtualAreaLightConfig);
  toLightJson(): LightJson;
}

/**
 * Rectangular area light
 */
export declare class VrayLightRectangle extends VrayLightVirtualArea {
  constructor(index: number, config: VirtualAreaLightConfig);
}

/**
 * Elliptical area light
 */
export declare class VrayLightEllipse extends VrayLightVirtualArea {
  constructor(index: number, config: VirtualAreaLightConfig);
}

/**
 * Dome/environment light for IBL (Image-Based Lighting)
 */
export declare class VrayLightDome extends VrayLight {
  /** Light intensity multiplier */
  intensity: number;

  /** Texture color temperature adjustment */
  textureTemperature: number;

  /** Whether light affects specular reflections */
  affectSpecular: boolean;

  /** Whether light affects diffuse shading */
  affectDiffuse: boolean;

  /** Whether the light is disabled */
  close?: boolean;

  /** Type of texture used */
  textureType?: string;

  /** Whether dome light casts shadows */
  castShadow?: boolean;

  constructor(index: number, config: DomeLightConfig);
  toLightJson(): LightJson;
}

/**
 * Spherical point light
 */
export declare class VrayLightSphere extends VrayLight {
  /** Light position in 3D space */
  position: Vector3;

  /** Color temperature in Kelvin */
  color: number;

  /** Light intensity multiplier */
  intensity: number;

  /** Sphere radius */
  radius: number;

  /** RGB color override */
  rgb?: RGB;

  /** Whether light affects specular reflections */
  affectSpecular: boolean;

  /** Whether the light is disabled */
  close?: boolean;

  /** Source content type metadata */
  sourceContentType?: SourceContentType;

  constructor(index: number, config: SphereLightConfig);
  toLightJson(): LightJson;
}

/**
 * Factory class for creating VRay light instances
 */
export declare class VrayLightFactory {
  /** Current index counter for light creation */
  private index: number;

  constructor();

  /**
   * Creates a new light instance based on type
   * @param lightType - Type of light to create from VrayTypeEnum
   * @param config - Configuration object for the light
   * @returns New light instance
   * @throws Error if light type is invalid
   */
  build(lightType: VrayTypeEnum, config: unknown): VrayLight;

  /**
   * Resets the index counter
   * @param startIndex - New starting index (default: 100000)
   */
  resetIndex(startIndex?: number): void;
}

/**
 * Visitor pattern implementation for assigning room IDs to lights
 */
export declare class LightRoomIdVisitor {
  /**
   * Assigns room ID to a light based on its position and layout
   * @param light - Light instance to process
   * @param roomData - Optional room data for direct assignment
   * @param layout - Layout data containing room information
   * @throws Error if light type is not recognized
   */
  static visit(light: VrayLight, roomData: RoomData | undefined, layout: LayoutData): void;

  /**
   * Determines which room a 2D point belongs to
   * @param point - 2D point (THREE.Vector2)
   * @param layout - Layout data to query
   * @returns Room ID string or "none" if not found
   */
  static getRoomIdOfPoint(point: unknown, layout: LayoutData): string;
}

/**
 * Retrieves lights related to a specific content ID
 * @param contentID - Content identifier to match
 * @param lightGroupKey - Light group key to search within
 * @param layout - Layout data containing light group information
 * @returns Array of matching light members
 */
export declare function getContentRelateLight(
  contentID: string,
  lightGroupKey: string | undefined,
  layout: LayoutData
): Array<{ contentID: string; [key: string]: unknown }>;