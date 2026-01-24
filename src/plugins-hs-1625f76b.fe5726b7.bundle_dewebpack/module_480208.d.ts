/**
 * 3D Camera Position Thumbnail Generator Module
 * Captures 3D view screenshots and manages camera position presets
 */

/**
 * Camera position data structure
 * Represents a saved camera viewpoint in 3D space
 */
interface CameraPosition {
  /** Unique identifier for the camera position */
  id: string;
  /** Display name for the camera position (format: "project_camera_position{number}") */
  name: string;
  /** URL or path to the thumbnail image */
  thumbnail: string;
  /** Camera configuration parameters */
  camera: {
    /** Target point X coordinate */
    target_x: number;
    /** Target point Y coordinate */
    target_y: number;
    /** Target point Z coordinate */
    target_z: number;
    /** Camera position X coordinate */
    x: number;
    /** Camera position Y coordinate */
    y: number;
    /** Camera position Z coordinate */
    z: number;
    /** Horizontal field of view in degrees */
    horizontal_fov: number;
    /** Pitch angle in degrees */
    pitch: number;
  };
  /** Camera type identifier */
  type: string;
}

/**
 * Client rectangle dimensions
 */
interface ClientRect {
  /** Width in pixels */
  width: number;
  /** Height in pixels */
  height: number;
}

/**
 * 3D View context interface
 */
interface View3DContext {
  /** Client rectangle containing dimensions */
  clientRect: ClientRect;
}

/**
 * Active 3D view interface
 */
interface Active3DView {
  /** 3D view context with dimensions */
  context: View3DContext;
}

/**
 * Floorplan interface containing camera information
 */
interface Floorplan {
  /** Currently active camera configuration */
  active_camera: CameraPosition['camera'] & { type: string };
}

/**
 * Application instance interface
 */
interface AppInstance {
  /**
   * Get the active 3D view
   * @returns The active 3D view object
   */
  getActive3DView(): Active3DView;

  /**
   * Save document as image
   * @param name - Document name
   * @param options - Save options
   * @param callback - Callback with image URL
   */
  saveDocument(
    name: string,
    options: {
      /** Horizontal offset in pixels */
      offsetWidth: number;
      /** Image format (e.g., "image/png") */
      format: string;
      /** Image width in pixels */
      width: number;
      /** Image height in pixels */
      height: number;
      /** Whether to capture foreground only */
      forground: boolean;
    },
    callback: (imageUrl: string) => void
  ): void;

  /** Floorplan data */
  floorplan: Floorplan;
}

/**
 * Upload file response containing file URL
 */
interface UploadFileResponse {
  /** URL of the uploaded file */
  url: string;
}

/**
 * Generate a random hexadecimal segment for UUID generation
 * @returns 4-character hexadecimal string
 */
declare function generateHexSegment(): string;

/**
 * Find the next available camera position index
 * Scans existing camera positions and returns the first unused sequential number
 * @param cameraPositions - Array of existing camera positions
 * @returns Next available position index (1-based)
 */
declare function getNextCameraPositionIndex(cameraPositions: CameraPosition[]): number;

/**
 * Capture 3D view thumbnail and save as camera position
 * Creates a screenshot of the current 3D view, uploads it, and stores it as a camera preset
 * @returns Promise that resolves when capture and save complete
 */
declare function captureThumbnail(): Promise<void>;

export default captureThumbnail;