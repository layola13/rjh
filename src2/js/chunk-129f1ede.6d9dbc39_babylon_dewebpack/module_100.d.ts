/**
 * Hardware component manager for 3D scene rendering
 * Handles locks, hinges, handles and other hardware elements
 */

import { Vector2, Vector3, Vector4, MeshBuilder, TransformNode, Space, Mesh } from '@babylonjs/core';
import Vector from './Vector';
import { ProfileTypesEnum } from './ProfileTypes';
import { HardwareShape } from './HardwareShape';
import VMullionHelper from './VMullionHelper';
import ConfigManager from './ConfigManager';
import MeshPositionUpdater from './MeshPositionUpdater';
import ProfileTypeManager from './ProfileTypeManager';

/**
 * Represents the opening direction of a hardware element
 */
type OpenDirection = 'left' | 'right' | 'up' | 'down';

/**
 * Hardware item configuration
 */
interface HardwareItem {
  /** Hardware type identifier */
  type: HardwareShape;
  /** X coordinate position */
  x: number;
  /** Y coordinate position */
  y: number;
  /** Direction vector for hardware orientation */
  direction: {
    x: number;
    y: number;
  };
}

/**
 * 3D frame information for arc-shaped hardware
 */
interface Frame3DInfo {
  /** Height of the arc frame */
  frameArcHeight: number;
  /** Whether the arc face is inner-facing */
  arcFaceInner: boolean;
}

/**
 * Frame polygon boundary definition
 */
interface FramePolygon {
  /** Minimum X coordinate in meters */
  min_x_m: number;
  /** Maximum X coordinate in meters */
  max_x_m: number;
}

/**
 * Hardware container with 3D frame data
 */
interface HardwareContainer {
  /** Array of hardware items */
  hardwares?: HardwareItem[];
  /** Opening direction of the hardware */
  openDirection?: OpenDirection;
  /** Frame polygon boundaries */
  frame_polygon: FramePolygon;
  /** 3D frame information for arc calculations */
  frame_3D_info: Frame3DInfo;
}

/**
 * Point coordinate representation
 */
interface Point {
  x: number;
  y: number;
}

/**
 * V-Mullion calculation result
 */
interface VMullionInfo {
  /** Offset vector from original position */
  offset: Point;
  /** Rotation angle in radians */
  rotateRadion: number;
}

/**
 * Hardware renderer for 3D scenes
 * Manages creation and positioning of locks, hinges, and handles
 */
export default class HardwareRenderer {
  /** The Babylon.js scene instance */
  private static scene: BABYLON.Scene;

  /**
   * Initialize the hardware renderer with a scene
   * @param scene - Babylon.js scene to render hardware into
   */
  static Init(scene: BABYLON.Scene): void;

  /**
   * Generate general lock and hinge hardware meshes
   * @param hardwareContainer - Container with hardware definitions
   * @param zPosition - Z-axis position for hardware placement
   * @param parentNode - Parent transform node for hardware hierarchy
   * @param uvFlipMode - UV mapping flip mode (0 = normal, 1 = flipped)
   * @param normalDirection - Normal direction vector for hardware orientation
   * @param depth - Depth/thickness of the hardware element
   * @param createMirror - Whether to create mirrored hardware on opposite side
   */
  static GeneralLock(
    hardwareContainer: HardwareContainer,
    zPosition: number,
    parentNode: TransformNode,
    uvFlipMode?: number,
    normalDirection?: Vector2,
    depth?: number,
    createMirror?: boolean
  ): void;

  /**
   * Draw handle hardware with configurable orientation
   * @param hardwareItem - Hardware item configuration
   * @param position - 3D position vector for handle placement
   * @param parentNode - Parent transform node
   * @param createMirror - Whether to create mirrored handle on opposite side
   * @param depth - Depth offset for mirrored handle
   * @param openDirection - Opening direction ('left' or 'right')
   */
  static DrawHandle(
    hardwareItem: HardwareItem,
    position: Vector3,
    parentNode: TransformNode,
    createMirror?: boolean,
    depth?: number,
    openDirection?: OpenDirection
  ): void;

  /**
   * Generate hardware for 3D arc-shaped frames
   * Handles curved surfaces and specialized positioning
   * @param hardwareContainer - Container with hardware and frame data
   * @param zPosition - Z-axis position (unused in arc mode)
   * @param parentNode - Parent transform node
   * @param uvFlipMode - UV mapping flip mode
   * @param frameData - Additional frame data for calculations
   * @param arcDirection - Direction indicator for arc orientation
   */
  static GeneralThreeDArcLock(
    hardwareContainer: HardwareContainer,
    zPosition: number,
    parentNode: TransformNode,
    uvFlipMode: number,
    frameData: HardwareContainer,
    arcDirection: number
  ): void;
}