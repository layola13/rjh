/**
 * Spark camera management module for 3D scene navigation and snapshot creation
 * @module SparkCameraModule
 */

/**
 * Camera type identifier for Spark rendering system
 */
export const SPARK_CAMERA_TYPE = "9";

/**
 * 3D camera position and orientation configuration
 */
export interface CameraConfig {
  /** Camera target X coordinate in world space */
  target_x: number;
  /** Camera target Y coordinate in world space */
  target_y: number;
  /** Camera target Z coordinate in world space */
  target_z: number;
  /** Camera position X coordinate */
  x: number;
  /** Camera position Y coordinate */
  y: number;
  /** Camera position Z coordinate */
  z: number;
  /** Horizontal field of view in degrees */
  horizontal_fov: number;
  /** Camera pitch angle in degrees */
  pitch: number;
  /** Near clipping plane distance */
  near: number;
  /** Far clipping plane distance */
  clip: number;
  /** Camera zoom level */
  zoom: number;
}

/**
 * Snapshot/Camera preset data structure
 */
export interface SnapshotData {
  /** Unique identifier for the snapshot */
  id: string;
  /** Camera configuration at snapshot time */
  camera: CameraConfig;
  /** Camera type (e.g., FirstPerson, Orthographic) */
  type: string;
  /** Display name for the snapshot */
  name: string;
  /** Render type identifier (SPARK_CAMERA_TYPE) */
  renderType: string;
  /** Thumbnail image data or URL */
  thumbnail?: ThumbnailData | string;
}

/**
 * Thumbnail image data with URL and base64 representation
 */
export interface ThumbnailData {
  /** Public URL for the thumbnail */
  url: string;
  /** Base64 encoded image data */
  img: string;
}

/**
 * Options for setting camera position with rendering context
 */
export interface SetCameraOptions {
  /** Original rendering UI configuration */
  oriRenderUI?: {
    /** Crop type (vertical/horizontal) */
    cropType?: string;
    /** Middle height value */
    midH?: number;
    /** Original canvas dimensions */
    oriCanvasSize?: {
      /** Canvas height */
      h: number;
      /** Canvas width */
      w: number;
    };
  };
  /** Render type identifier */
  renderType?: string;
}

/**
 * File upload response containing thumbnail URL
 */
export interface FileUploadResponse {
  /** Uploaded file URL or identifier */
  url?: string;
  [key: string]: unknown;
}

/**
 * Creates a new Spark camera snapshot with thumbnail generation
 * 
 * @param existingCameras - Array of existing camera snapshots for name conflict resolution
 * @param thumbnailSource - Source element or context for thumbnail capture
 * @param customId - Optional custom UUID for the snapshot (auto-generated if omitted)
 * @param customName - Optional custom name (auto-generated sequential name if omitted)
 * @returns Promise resolving to the created snapshot data with thumbnail
 * 
 * @example
 *