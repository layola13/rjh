/**
 * Room UI module - Provides UI controls for room rendering and camera settings
 */

import * as GUI from '@babylonjs/gui';
import { Scene } from '@babylonjs/core';

/**
 * Configuration interface for room UI settings
 */
export interface RoomUIConfig {
  /** Enable or disable the room UI */
  EnableRoomUI: boolean;
}

/**
 * Resource interface containing scene and room references
 */
export interface RoomResource {
  /** The room object containing rendering properties */
  room: Room;
  /** The three.js scene wrapper */
  threeScene: ThreeScene;
}

/**
 * Room interface with rendering properties
 */
export interface Room {
  /** Night lighting mix ratio (0-1) */
  uNightMix: number;
  /** Neutral lighting mix ratio (0-1) */
  uNeutralMix: number;
}

/**
 * Three.js scene wrapper interface
 */
export interface ThreeScene {
  /**
   * Changes the camera mode
   * @param mode - 0 for perspective, 1 for orthographic
   */
  ChangeCameraMode(mode: CameraMode): void;
}

/**
 * Camera mode enumeration
 */
export enum CameraMode {
  /** Perspective camera mode */
  Perspective = 0,
  /** Orthographic camera mode */
  Orthographic = 1
}

/**
 * RoomUI class - Manages the user interface for room rendering controls
 * 
 * Provides:
 * - Rendering sliders for night and neutral lighting mix
 * - Camera mode selection (perspective/orthographic)
 */
export declare class RoomUI {
  /** The Babylon.js scene instance */
  readonly scene: Scene;
  
  /** Resource object containing room and scene references */
  readonly resource: RoomResource;

  /**
   * Creates a new RoomUI instance
   * @param scene - The Babylon.js scene
   * @param resource - Resource object containing room and scene data
   */
  constructor(scene: Scene, resource: RoomResource);

  /**
   * Initializes the room UI controls
   * 
   * Creates:
   * - Fullscreen UI texture
   * - Selection panel with rendering and camera controls
   * - Sliders for uNightMix and uNeutralMix (0-1 range)
   * - Radio buttons for camera mode selection
   * 
   * Only initializes if RoomUIConfig.EnableRoomUI is true
   */
  Init(): void;
}