/**
 * Content PBR Material Replace Styler Module
 * Manages real-time PBR material preview and synchronization between main app and iframe viewer
 */

import type { HSApp } from '@hsapp/core';
import type { SignalHook } from '@hscore/util';

/**
 * Converts coordinates from Z-up to Y-up coordinate system
 * @param x - X coordinate or Vector3-like object or array
 * @param y - Y coordinate (if using separate params)
 * @param z - Z coordinate (if using separate params)
 * @returns Vector3 in Y-up coordinate system
 */
export declare function yUp(x: number, y: number, z: number): THREE.Vector3;
export declare function yUp(coords: [number, number, number]): THREE.Vector3;
export declare function yUp(vector: { x: number; y: number; z: number }): THREE.Vector3;

/**
 * Message types sent to iframe viewer
 */
interface ViewerMessage {
  type: 'model' | 'camera' | 'material' | 'scene';
  msgId: string;
  data: unknown;
}

/**
 * Model transform message data
 */
interface ModelTransformData {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

/**
 * Camera update message data
 */
interface CameraUpdateData {
  fov: number;
  position?: [number, number, number];
  target?: [number, number, number];
}

/**
 * Material update message data
 */
interface MaterialUpdateData {
  part: string;
  material?: MaterialJSON;
}

/**
 * Material JSON structure from saveToJSON
 */
interface MaterialJSON {
  seekId?: string;
  offsetX?: number;
  offsetY?: number;
  rotation?: number;
  initTileSize_x?: number;
  initTileSize_y?: number;
  [key: string]: unknown;
}

/**
 * Material change event data
 */
interface MaterialChangedData {
  component: string;
  newMaterial?: HSApp.Material;
  oldMaterial?: HSApp.Material;
}

/**
 * Signal event wrapper
 */
interface SignalEvent<T = unknown> {
  data: T;
  target?: unknown;
}

/**
 * Mesh hover event data
 */
interface MeshHoverEventData {
  type: 'onMouseOver' | 'onMouseOut';
  param: {
    meshName: string;
  };
}

/**
 * Content entity interface
 */
interface ContentEntity extends HSApp.Entity {
  x: number;
  y: number;
  z: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  XScale: number;
  YScale: number;
  ZScale: number;
  seekId: string;
  materialsMap: Map<string, HSApp.Material>;
  meshMaterials: Map<string, HSApp.Material>;
  signalMaterialChanged: HSApp.Signal<SignalEvent<MaterialChangedData>>;
}

/**
 * Display list item interface
 */
interface DisplayListItem {
  signalContentMeshHover: HSApp.Signal<SignalEvent<MeshHoverEventData>>;
}

/**
 * Iframe window with custom viewer API
 */
interface ViewerWindow extends Window {
  viewer: {
    cameraControls: {
      update(): void;
    };
    render(): void;
  };
  syncScene(message: ViewerMessage): void;
}

/**
 * Content PBR Material Replace Styler
 * Synchronizes PBR materials between the main editor and an iframe-based 3D viewer
 * Handles real-time updates of materials, camera, transforms, and user interactions
 */
export declare class ContentPBRMaterialReplaceStyler {
  /**
   * Iframe element hosting the PBR viewer
   */
  iframe?: HTMLIFrameElement;

  /**
   * Stack of cleanup functions to restore app state on destroy
   */
  restoreTask: Array<() => void>;

  /**
   * Signal management utility for event subscriptions
   */
  signalHook?: SignalHook;

  /**
   * Cache mapping mesh parts to their current material data
   */
  materialPartMap: Map<string, MaterialJSON>;

  /**
   * Main application instance
   */
  app: HSApp.Application;

  /**
   * Current content entity being styled
   */
  entity?: ContentEntity;

  /**
   * Message handler for iframe communication
   * @internal
   */
  messageHandler: (event: MessageEvent) => void;

  constructor();

  /**
   * Initialize the styler for a given entity
   * Sets up iframe viewer, syncs materials, and configures event listeners
   * @param entity - Content entity to style
   */
  init(entity: ContentEntity): void;

  /**
   * Cleanup and restore original app state
   * Removes iframe, unsubscribes from signals, and runs restore tasks
   */
  destroy(): void;

  /**
   * Create and mount iframe viewer element
   * @param entity - Entity to load in viewer
   * @internal
   */
  initIframe(entity: ContentEntity): void;

  /**
   * Set up material change listeners for the entity
   * Subscribes to material dirty signals and material swap events
   * @param entity - Entity to monitor
   * @internal
   */
  changeEntityMaterial(entity: ContentEntity): void;

  /**
   * Configure selection and hover state synchronization
   * @param entity - Entity to track interactions for
   * @internal
   */
  selectChange(entity: ContentEntity): void;

  /**
   * Subscribe to camera change events
   * @internal
   */
  changeCamera(): void;

  /**
   * Get plugin instance by name
   * @param pluginName - Fully qualified plugin name
   * @returns Plugin instance
   * @internal
   */
  getPlugin(pluginName: string): unknown;

  /**
   * Sync current camera state to iframe viewer
   * Calculates FOV and sends camera update message
   * @internal
   */
  updateCamera(): void;

  /**
   * Sync material changes to iframe viewer
   * Determines affected mesh parts and sends appropriate update/set messages
   * @param entity - Owner entity
   * @param material - Changed material instance
   * @internal
   */
  updateMaterial(entity: ContentEntity, material: HSApp.Material): void;

  /**
   * Send message to iframe viewer
   * @param message - Message object to send
   * @internal
   */
  postMessage(message: ViewerMessage): void;
}