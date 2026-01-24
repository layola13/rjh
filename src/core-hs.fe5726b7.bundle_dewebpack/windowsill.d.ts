import { ExtrudedBody } from './ExtrudedBody';

/**
 * Parameters for WindowSill entity
 */
interface WindowSillParameters {
  /** Array of 2D points defining the window sill outline */
  points: THREE.Vector2[];
  
  /** Edge profile configuration for molding */
  edgeProfile?: EdgeProfile;
  
  /** Indices of points where primary molding should be applied */
  moldingIndices?: number[];
  
  /** Indices of points where secondary molding should be applied */
  secondMoldingIndices?: number[];
  
  /** Whether to flip the molding direction */
  moldingFlip?: boolean;
}

/**
 * Configuration for edge profile used in molding
 */
interface EdgeProfile {
  /** The profile shape definition */
  profile: unknown;
  
  /** Profile size in X dimension */
  XSize: number;
  
  /** Profile size in Y dimension */
  YSize: number;
}

/**
 * Molding data structure passed to webCAD document
 */
interface MoldingData {
  /** Profile configuration */
  profile: unknown;
  
  /** Profile size in X dimension */
  profileSizeX: number;
  
  /** Profile size in Y dimension */
  profileSizeY: number;
}

/**
 * Entity with parameters property
 */
interface WindowSillEntity {
  parameters?: WindowSillParameters;
}

/**
 * WindowSill component - represents an extruded architectural window sill with optional molding
 * 
 * Extends ExtrudedBody to provide specialized functionality for window sill elements,
 * including automatic molding application based on edge profiles and point indices.
 */
export class WindowSill extends ExtrudedBody {
  /** Original points array before any transformations */
  private originalPoints: THREE.Vector2[];
  
  /** Reference to the webCAD document for adding molding elements */
  private _webCADDocument: {
    addMolding(
      id: string,
      paths1: THREE.Vector2[][],
      paths2: THREE.Vector2[][],
      options: { data: MoldingData },
      offset: number,
      flip?: boolean
    ): void;
  };
  
  /** Entity containing window sill parameters */
  protected entity: WindowSillEntity;

  constructor(
    arg1: unknown,
    arg2: unknown,
    arg3: unknown,
    arg4: unknown
  ) {
    super(arg1, arg2, arg3, arg4);
  }

  /**
   * Update callback triggered when entity parameters change
   * 
   * Handles:
   * - Point winding order normalization (converts clockwise to counter-clockwise)
   * - Primary and secondary molding application based on indices
   */
  onUpdate(): void {
    const parameters = this.entity.parameters;
    if (!parameters) return;

    const {
      points,
      edgeProfile,
      moldingIndices,
      secondMoldingIndices
    } = parameters;

    if (!points) return;

    // Ensure counter-clockwise winding order
    if (points && THREE.ShapeUtils.isClockWise(points)) {
      parameters.points.reverse();
    }

    super.onUpdate();

    /**
     * Apply molding to specified point indices
     * 
     * @param indices - Array of point indices where molding should be applied
     */
    const applyMolding = (indices?: number[]): void => {
      if (indices && indices.length > 1 && edgeProfile) {
        const selectedPoints = indices.map(index => this.originalPoints[index]);
        
        const moldingData: MoldingData = {
          profile: edgeProfile.profile,
          profileSizeX: edgeProfile.XSize,
          profileSizeY: edgeProfile.YSize
        };

        this._webCADDocument.addMolding(
          HSCore.Util.String.randomGUID(),
          [selectedPoints],
          [selectedPoints],
          { data: moldingData },
          0,
          this.entity.parameters?.moldingFlip
        );
      }
    };

    // Apply primary molding
    applyMolding(moldingIndices);
    
    // Apply secondary molding
    applyMolding(secondMoldingIndices);
  }
}