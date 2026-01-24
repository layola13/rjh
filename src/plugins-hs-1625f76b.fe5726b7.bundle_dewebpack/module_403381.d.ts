/**
 * Camera position management utilities for HSApp floorplan viewer
 * Provides functions to access app plugins and manage camera snapshots
 */

/**
 * Camera position snapshot data structure
 */
export interface CameraPosition {
  /** Camera position coordinates */
  position?: { x: number; y: number; z: number };
  /** Camera target/look-at coordinates */
  target?: { x: number; y: number; z: number };
  /** Camera rotation/orientation */
  rotation?: { x: number; y: number; z: number };
  /** Field of view or zoom level */
  fov?: number;
  /** Timestamp when snapshot was created */
  timestamp?: number;
  /** Optional snapshot name/label */
  name?: string;
  [key: string]: unknown;
}

/**
 * Upload file request parameters
 */
interface UploadFileOptions {
  /** S3 key path for the file */
  key: string;
  /** MIME type of the content */
  contentType: string;
}

/**
 * Camera position upload payload
 */
interface CameraPositionPayload {
  /** Design identifier */
  designId: string;
  /** Array of camera position snapshots */
  positions: CameraPosition[];
  /** Session identifier combining user session and environment */
  sid: string;
}

/**
 * HSApp application instance interface
 */
interface HSAppInstance {
  pluginManager: {
    getPlugin: (pluginType: string) => unknown;
  };
  floorplan: {
    snapshots: CameraPosition[] | unknown;
  };
  designMetadata: {
    get: (key: string) => string;
    set: (key: string, value: unknown) => void;
    flush: () => void;
  };
}

/**
 * Global HSApp namespace
 */
declare global {
  const HSApp: {
    App: {
      getApp: () => HSAppInstance;
    };
    Io: {
      Request: {
        Design: {
          uploadFile: (
            payload: CameraPositionPayload,
            options: UploadFileOptions
          ) => Promise<unknown>;
        };
      };
    };
    Config: {
      ENV: string;
    };
  };
  const HSFPConstants: {
    PluginType: {
      ContextualTools: string;
    };
  };
  const adskUser: {
    getUserSessionId: () => string;
  };
}

/**
 * Get the main HSApp application instance
 * @returns The singleton HSApp instance
 */
export function getApp(): HSAppInstance;

/**
 * Get the contextual tools plugin instance
 * @returns ContextualTools plugin from the plugin manager
 */
export function getContextualToolsPlugin(): unknown;

/**
 * Get the orbit view plugin instance
 * @returns OrbitView plugin for camera control
 */
export function getOrbitViewPlugin(): unknown;

/**
 * Get the render plugin instance
 * @returns Render plugin for scene rendering
 */
export function getRenderPlugin(): unknown;

/**
 * Retrieve all saved camera position snapshots for the current floorplan
 * @returns Array of camera position snapshots, or empty array if none exist
 */
export function getCameraPositions(): CameraPosition[];

/**
 * Save camera position snapshots to the server and update local metadata
 * Uploads positions to S3 and persists metadata reference
 * 
 * @param positions - Array of camera position snapshots to save
 * @returns Promise resolving when upload completes, or null on error
 */
export function setCameraPositions(
  positions: CameraPosition[]
): Promise<void | null>;

/**
 * Calculate optimal page size based on viewport width
 * Determines how many items can fit horizontally with 220px sidebar and 280px item width
 * 
 * @returns Number of items per page (minimum 1)
 */
export function getPageSize(): number;