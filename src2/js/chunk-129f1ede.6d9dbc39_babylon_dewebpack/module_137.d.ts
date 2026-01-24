import { TransformNode } from '@babylonjs/core';
import { Scene } from '@babylonjs/core';

/**
 * Result status for generation operations
 */
interface GenResult {
  /** Status code: 1 = success, 0 = failure */
  status: number;
  /** Error message if operation failed */
  message?: string;
}

/**
 * 3D point representation in space
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Slide track configuration defining start and end points
 */
interface SlideTrack {
  /** Starting point of the slide track */
  startPt: Point3D;
  /** Ending point of the slide track */
  endPt: Point3D;
}

/**
 * Profile configuration for slide track generation
 */
interface SlideTrackFixedProfile {
  /** DXF file path or identifier */
  dxfPath: string;
  /** Additional profile metadata */
  [key: string]: unknown;
}

/**
 * Generation options for slide track creation
 */
interface SlideTrackGenerationOptions {
  /** Profile configurations for the slide track */
  profiles: SlideTrackFixedProfile[];
  /** Optional: 3D frame information flag */
  frame_3D_info?: boolean;
  /** Collection of fixed group meshes */
  fixedGroup: TransformNode[];
}

/**
 * Options for model generation
 */
interface ModelGenerationOptions {
  /** Name identifier for the generated model */
  name: string;
  /** Additional generation parameters */
  [key: string]: unknown;
}

/**
 * Parsed DXF data structure
 */
interface DXFData {
  /** Geometry entities from DXF */
  entities: unknown[];
  /** Layer information */
  layers: unknown[];
  /** Additional DXF metadata */
  [key: string]: unknown;
}

/**
 * Side track fixed extension handler for generating 3D slide track models
 * from DXF profiles in a Babylon.js scene
 */
export default class SideTrackFixedExtension {
  /** Active Babylon.js scene instance */
  private static scene: Scene;

  /**
   * Initialize the extension with a Babylon.js scene
   * @param scene - The Babylon.js scene to render slide tracks in
   */
  static Init(scene: Scene): void;

  /**
   * Asynchronously generate 3D slide track models from configuration
   * 
   * @param slideTracks - Array of slide track definitions with start/end points
   * @param parentNode - Parent transform node to attach generated models to
   * @param options - Generation options including profiles and grouping settings
   * @returns Promise resolving to generation result with status and optional error message
   * 
   * @example
   *