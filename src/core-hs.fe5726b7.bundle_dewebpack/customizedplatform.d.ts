/**
 * CustomizedPlatform Model
 * 
 * Represents a customized platform feature that can manage attached content positioning
 * based on sketch geometry and extrusion heights.
 * 
 * @module CustomizedPlatform
 */

import { CustomizedFeatureModel } from './CustomizedFeatureModel';
import { Entity } from './Entity';

/**
 * Represents a point in 2D space
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * Represents a face with outer boundary, inner holes, and extrusion height
 */
interface FaceGeometry {
  /** Outer boundary points of the face */
  outer: Point2D[];
  /** Inner hole boundaries of the face */
  holes: Point2D[][];
  /** Extrusion height of the face */
  height: number;
}

/**
 * Represents content that can be attached to the platform
 */
interface AttachedContent {
  /** X coordinate of the content */
  x: number;
  /** Y coordinate of the content */
  y: number;
  /** Z coordinate of the content */
  z: number;
}

/**
 * Face object from sketch
 */
interface SketchFace {
  /** Unique identifier of the face */
  id: string;
  /** Outer loop of the face */
  outerLoop: {
    getDiscretePoints(): Point2D[];
  };
  /** Inner loops (holes) of the face */
  innerLoops: Array<{
    getDiscretePoints(): Point2D[];
  }>;
}

/**
 * Sketch object containing face geometry
 */
interface Sketch {
  /** Collection of faces in the sketch */
  faces: SketchFace[];
  /**
   * Gets the extrusion value for a given face
   * @param faceId - The ID of the face
   * @returns The extrusion height value
   */
  getExtrusionValue(faceId: string): number;
}

/**
 * CustomizedPlatform class
 * 
 * Extends CustomizedFeatureModel to provide platform-specific functionality
 * including automatic positioning of attached content based on sketch face geometry.
 */
export class CustomizedPlatform extends CustomizedFeatureModel {
  /** Sketch geometry defining the platform shape */
  sketch: Sketch;
  
  /** Z-coordinate offset of the platform */
  z: number;

  /**
   * Creates a new CustomizedPlatform instance
   * @param data - Initialization data for the platform
   */
  constructor(data: unknown) {
    super(data);
  }

  /**
   * Gets the Z-axis offset scale factor
   * @returns Always returns 0 for platform features
   * @protected
   */
  protected _getZOffsetScale(): number {
    return 0;
  }

  /**
   * Called when the sketch geometry is modified
   * Triggers repositioning of attached content based on new sketch geometry
   * @param event - The sketch dirty event data
   */
  onSketchDirty(event: unknown): void {
    super.onSketchDirty(event);
    this.moveAttachedContents('sketch');
  }

  /**
   * Moves attached content based on platform transformations
   * 
   * For 'z' or 'sketch' axis changes, recalculates content positions based on
   * which face polygon they fall within, setting their Z height accordingly.
   * 
   * @param axis - The axis or property being modified ('x', 'y', 'z', 'sketch', etc.)
   * @param delta - Optional delta value for position changes
   */
  moveAttachedContents(axis: string, delta?: number): void {
    if (axis === 'z' || axis === 'sketch') {
      // Build geometry data for all faces in the sketch
      const faceGeometries: FaceGeometry[] = this.sketch.faces.map((face) => ({
        outer: face.outerLoop.getDiscretePoints(),
        holes: face.innerLoops.map((loop) => loop.getDiscretePoints()),
        height: this.sketch.getExtrusionValue(face.id)
      }));

      // Update Z position for each attached content based on face containment
      this.forEachContent((content: AttachedContent) => {
        const point = new HSCore.Util.Math.Vec2(content.x, content.y);
        
        for (const faceGeometry of faceGeometries) {
          if (HSCore.Util.Math.isPointInPolygonWithHoles(
            point,
            faceGeometry.outer,
            faceGeometry.holes,
            false
          )) {
            content.z = faceGeometry.height + this.z;
            break;
          }
        }
      });
    } else if (delta != null) {
      super.moveAttachedContents(axis, delta);
    }
  }

  /**
   * Iterates over each attached content item
   * @param callback - Function to call for each content item
   * @protected
   */
  protected forEachContent(callback: (content: AttachedContent) => void): void {
    // Implementation inherited from parent class
  }
}

// Register the CustomizedPlatform class with the entity system
Entity.registerClass(HSConstants.ModelClass.CustomizedPlatform, CustomizedPlatform);

/**
 * Global HSCore utility namespace (ambient declaration)
 */
declare global {
  namespace HSCore {
    namespace Util {
      namespace Math {
        class Vec2 {
          constructor(x: number, y: number);
        }
        function isPointInPolygonWithHoles(
          point: Vec2,
          outerBoundary: Point2D[],
          holes: Point2D[][],
          includeEdge: boolean
        ): boolean;
      }
    }
  }

  namespace HSConstants {
    namespace ModelClass {
      const CustomizedPlatform: string;
    }
  }
}