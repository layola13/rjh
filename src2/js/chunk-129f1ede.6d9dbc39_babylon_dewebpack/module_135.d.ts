/**
 * Leaf generation module for glass and screen leafs in window/door systems.
 * Handles async creation of leaf components including bars, glass, hardware, and animations.
 */

import Point from './Point';
import TransformNode from './TransformNode';
import Vector2 from './Vector2';
import Vector3 from './Vector3';
import AnimationModule from './AnimationModule';
import ExplosionModule from './ExplosionModule';
import LeafUtils from './LeafUtils';
import GlassModule from './GlassModule';
import FlyScreenModule from './FlyScreenModule';
import PolygonModule from './PolygonModule';
import HardwareModule from './HardwareModule';
import LockModule from './LockModule';
import MullionModule from './MullionModule';
import ShutterModule from './ShutterModule';
import PanelModule from './PanelModule';
import MeshModule from './MeshModule';

/**
 * Hardware shape type enumeration
 */
export enum HardwareShape {
  EndpointHinge = 'EndpointHinge',
  CommercialHandle = 'CommercialHandle',
  CommercialHandle2 = 'CommercialHandle2',
  CommercialHandle3 = 'CommercialHandle3',
  CommercialHandle4 = 'CommercialHandle4',
  CommercialHandle5 = 'CommercialHandle5',
  CommercialHandle6 = 'CommercialHandle6',
  CommercialHandle7 = 'CommercialHandle7',
  CommercialHandle8 = 'CommercialHandle8',
  CommercialHandle9 = 'CommercialHandle9',
  CommercialHandle10 = 'CommercialHandle10',
  CommercialHandle11 = 'CommercialHandle11',
  CommercialHandle12 = 'CommercialHandle12',
  CommercialHandle13 = 'CommercialHandle13',
}

/**
 * Export mode enumeration
 */
export enum ExportModeEnum {
  OBJ = 'OBJ',
  GLTF = 'GLTF',
}

/**
 * Profile data structure
 */
export interface Profile {
  profileType: string;
  poszm: number;
  depthm: number;
}

/**
 * Bar structure in close object
 */
export interface Bar {
  profileId: string;
  arcHeight: number;
}

/**
 * Close object containing bars
 */
export interface CloseObject {
  bars: Bar[];
}

/**
 * Hardware item structure
 */
export interface Hardware {
  type: HardwareShape;
  x: number;
  y: number;
  length?: number;
  direction?: Vector2;
}

/**
 * Glass or screen element
 */
export interface GlassElement {
  closeObject: CloseObject;
  decBars?: unknown[];
  decPoly?: unknown;
}

/**
 * Frame polygon bounds
 */
export interface FramePolygon {
  depth_m: number;
  min_x_m: number;
  max_x_m: number;
}

/**
 * Frame 3D information
 */
export interface Frame3DInfo {
  arcFaceInner: boolean;
  frameArcHeight: number;
}

/**
 * Frame series information
 */
export interface Frame {
  seriesId: number;
}

/**
 * Profiles collection
 */
export interface ProfilesData {
  data: Profile[];
}

/**
 * Configuration data for leaf generation
 */
export interface LeafConfig {
  profiles: ProfilesData;
  profileCrosss: unknown;
  frame_polygon: FramePolygon;
  frame: Frame;
  frame_3D_info?: Frame3DInfo;
  fixedGroup: TransformNode[];
}

/**
 * Leaf data structure
 */
export interface Leaf {
  closeObject: CloseObject;
  hardwares: Hardware[];
  isOutward: boolean;
  axis: Point;
  glass: GlassElement | GlassElement[];
  flyScreen?: GlassElement | GlassElement[];
  openDirection?: string;
  axisArrow?: Vector3;
  movex: number;
  mullions?: unknown[];
  shade?: unknown;
  panel?: unknown;
  isDoor?: boolean;
}

/**
 * Generation result wrapper
 */
export interface GenResult {
  code: number;
  message?: string;
}

/**
 * Handle generation options
 */
export interface HandleOptions {
  x: number;
  y: number;
  length?: number;
  openDirection?: string;
  z: number;
}

/**
 * Hinge generation options
 */
export interface HingeOptions {
  center: Vector3;
  zPos: number;
  isDown: boolean;
}

/**
 * Leaf extension class for generating window/door leaf components
 */
export default class LeafExtension {
  private static scene: unknown;

  /**
   * Initialize the leaf extension with scene context
   * @param scene - The 3D scene instance
   */
  static Init(scene: unknown): void;

  /**
   * Asynchronously generate leafs (glass or screen) with all components
   * @param leafs - Array of leaf data to generate
   * @param parent - Parent transform node
   * @param config - Configuration data including profiles and frame info
   * @param leafType - Type of leaf: 0 = glass leaf, 1 = screen leaf
   * @returns Promise resolving to generation result
   */
  static AsyncGenLeafs(
    leafs: Leaf[],
    parent: TransformNode,
    config: LeafConfig,
    leafType?: number
  ): Promise<GenResult>;
}