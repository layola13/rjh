import { Scene, TransformNode, Vector3, Vector2, Vector4, Mesh, MeshBuilder, Angle, Axis, Quaternion } from '@babylonjs/core';
import Point from './Point';
import Polygon from './Polygon';
import BooleanOperations from './BooleanOperations';
import CSGHelper from './CSGHelper';
import AnimationHelper from './AnimationHelper';
import MeshMerger from './MeshMerger';
import MeshGenerator from './MeshGenerator';
import SceneManager from './SceneManager';
import MaterialManager from './MaterialManager';
import TransformHelper from './TransformHelper';
import VectorHelper from './VectorHelper';
import GeometryUtils from './GeometryUtils';
import { GenResult, ProfileTypesEnum } from './types';
import { ccTypeEnum } from './enums';
import Constants from './Constants';

/**
 * Glass point definition
 */
interface GlassPoint {
  x: number;
  y: number;
}

/**
 * Glass hole definition (array of points forming a hole polygon)
 */
type GlassHole = GlassPoint[];

/**
 * Dock information for glass panels
 */
interface DockInfo {
  dockBar?: boolean;
  [key: string]: unknown;
}

/**
 * Bar definition with start/end points and attributes
 */
interface Bar {
  startPt: GlassPoint;
  endPt: GlassPoint;
  startAngle?: number;
  endAngle?: number;
  arcHeight?: number;
  attrs: {
    direction?: 'left' | 'right' | 'top' | 'bottom';
    stCutAngle?: number;
    etCutAngle?: number;
    [key: string]: unknown;
  };
  profileId?: string;
}

/**
 * Closed object containing bars
 */
interface CloseObject {
  bars: Bar[];
}

/**
 * Decorative bar options
 */
interface DecBarOptions {
  opts: GlassPoint[];
  [key: string]: unknown;
}

/**
 * Glass configuration
 */
interface GlassConfig {
  pts: GlassPoint[];
  opts?: GlassPoint[];
  holes?: GlassHole[];
  withShade?: boolean;
  hasTheft?: boolean | string;
  closeObject: CloseObject;
  dockInfos: DockInfo[];
  decBars?: DecBarOptions[];
  decPoly?: GlassPoint[];
}

/**
 * Glass plan with depth and position arrays
 */
interface GlassPlan {
  fixedbasez: number;
  fixeddepthm: number;
  fixedposzarray: number[];
  fixedposJTZArray?: number[];
  fixedjtDepth?: number;
  leafbasez: number;
  leafdepthm: number;
  leafposzarray: number[];
  leafposJTZArray?: number[];
  leafjtDepth?: number;
  guardsashbasez?: number;
  guardsashdepthm?: number;
  guardsashposzarray?: number[];
}

/**
 * Frame polygon dimensions
 */
interface FramePolygon {
  min_x_m: number;
  max_x_m: number;
  depth_m: number;
}

/**
 * 3D frame arc information
 */
interface Frame3DInfo {
  arcFaceInner: boolean;
  frameArcHeight: number;
}

/**
 * Profile type definition
 */
interface ProfileType {
  profileType?: string;
  condition?: string;
  [key: string]: unknown;
}

/**
 * Profile data container
 */
interface ProfileData {
  data?: ProfileType[];
  [key: string]: unknown;
}

/**
 * Frame definition with mullions and corners
 */
interface Frame {
  id: string;
  mullions: Bar[];
  closeObject: CloseObject;
}

/**
 * Corner definition
 */
interface Corner {
  type: string;
  hostFrameId?: string;
  cornerFrameIds?: string[];
}

/**
 * Sash frame information
 */
interface SashFrameInfo {
  serieid: number;
  glassPlan: GlassPlan;
  frame_polygon?: FramePolygon;
  frame_3D_info?: Frame3DInfo;
  profiles?: ProfileData;
  profileCrosss?: unknown;
  frame: Frame;
  corners: Corner[];
  fixedGroup?: TransformNode[];
}

/**
 * Louver line offset configuration
 */
interface LouverConfig {
  louverLineOffset: [number, number];
}

/**
 * Glass generation and rendering utility class.
 * Handles creation of glass panels, decorative bars, and hollow louvers for window frames.
 */
export default class GlassExtension {
  private static scene: Scene;

  /**
   * Initialize the glass extension with a Babylon.js scene
   * @param scene - The Babylon.js scene to render into
   */
  static Init(scene: Scene): void;

  /**
   * Generate sash glasses for window frames
   * @param glasses - Array of glass configurations
   * @param parent - Parent transform node
   * @param frameInfo - Sash frame information
   * @param baseDepth - Base depth offset for positioning
   */
  static GenSashGlasses(
    glasses: GlassConfig[],
    parent: TransformNode,
    frameInfo: SashFrameInfo,
    baseDepth: number
  ): void;

  /**
   * Generate guard sash glasses
   * @param glasses - Array of glass configurations
   * @param parent - Parent transform node
   * @param frameInfo - Sash frame information
   * @param baseDepth - Base depth offset for positioning
   */
  static GenGuardSashGlasses(
    glasses: GlassConfig[],
    parent: TransformNode,
    frameInfo: SashFrameInfo,
    baseDepth: number
  ): void;

  /**
   * Generate decorative bars for glass panels
   * @param decBars - Array of decorative bar options
   * @param parent - Parent transform node
   * @param frameInfo - Sash frame information
   * @param baseDepth - Base depth offset
   * @param isFixed - Whether this is for fixed glass (default: true)
   * @param clipPolygon - Optional polygon for boolean clipping
   */
  static GenDecBars(
    decBars: DecBarOptions[],
    parent: TransformNode,
    frameInfo: SashFrameInfo,
    baseDepth: number,
    isFixed?: boolean,
    clipPolygon?: GlassPoint[]
  ): void;

  /**
   * Asynchronously generate fixed glasses for window frames
   * @param glasses - Array of glass configurations
   * @param parent - Parent transform node
   * @param frameInfo - Sash frame information
   * @returns Promise resolving to generation result
   */
  static AsyncGenFixedGlasses(
    glasses: GlassConfig[],
    parent: TransformNode,
    frameInfo: SashFrameInfo
  ): Promise<GenResult>;

  /**
   * Generate glass joint (JT) elements
   * @param glassPlan - Glass plan with positioning data
   * @param baseDepth - Base depth offset
   * @param glassConfig - Glass configuration
   * @param parent - Parent transform node
   * @param isFixed - Whether this is for fixed glass (default: true)
   */
  static GenGlassJT(
    glassPlan: GlassPlan,
    baseDepth: number,
    glassConfig: GlassConfig,
    parent: TransformNode,
    isFixed?: boolean
  ): void;

  /**
   * Generate guard sash glass panel
   * @param glassPlan - Glass plan with positioning data
   * @param baseDepth - Base depth offset
   * @param glassConfig - Glass configuration
   * @param parent - Parent transform node
   * @param offset - Additional offset (default: 0)
   */
  static GenGuardSashGlass(
    glassPlan: GlassPlan,
    baseDepth: number,
    glassConfig: GlassConfig,
    parent: TransformNode,
    offset?: number
  ): void;

  /**
   * Generate hollow louver shading elements
   * @param glassPlan - Glass plan with positioning data
   * @param baseDepth - Base depth offset
   * @param glassConfig - Glass configuration
   * @param parent - Parent transform node
   * @param isFixed - Whether this is for fixed glass (default: true)
   * @param config - Louver configuration with line offsets
   */
  static GenHollowLouver(
    glassPlan: GlassPlan,
    baseDepth: number,
    glassConfig: GlassConfig,
    parent: TransformNode,
    isFixed?: boolean,
    config?: LouverConfig
  ): void;
}