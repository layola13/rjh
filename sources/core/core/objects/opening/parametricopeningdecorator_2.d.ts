/**
 * Decorator for parametric opening elements that handles face splitting and wall face classification.
 * This class provides utilities to identify and organize faces based on their relationship
 * to walls (A-side vs B-side) and their geometric overlap properties.
 */
export class ParametricOpeningDecorator {
  private readonly _opening: ParametricOpening;

  /**
   * Creates a new ParametricOpeningDecorator instance.
   * @param opening - The parametric opening element to decorate
   */
  constructor(opening: ParametricOpening);

  /**
   * Retrieves split face pairs (A and B sides) along with their corresponding wall faces.
   * The pairs are ordered such that A-faces align with A-wall faces based on geometric overlap.
   * 
   * @returns An object containing:
   *   - aFaces: Array of faces on the A-side
   *   - bFaces: Array of faces on the B-side
   *   - aWallFaces: Wall faces on the A-side
   *   - bWallFaces: Wall faces on the B-side
   */
  getSplitABFacePairs(): SplitABFacePairsResult;

  /**
   * Retrieves all faces that overlap with A-side wall faces.
   * 
   * @returns An object containing:
   *   - aFaces: Array of faces overlapping with A-wall faces
   *   - aWallFaces: Wall faces on the A-side
   */
  getAFacePairs(): AFacePairsResult;

  /**
   * Determines the A-side and B-side wall faces from the opening's host wall.
   * The classification is based on room information presence in the wall's left/right faces.
   * 
   * @private
   * @returns An object containing:
   *   - aWallFaces: Wall faces classified as A-side
   *   - bWallFaces: Wall faces classified as B-side
   */
  private _getABWallFaces(): ABWallFacesResult;

  /**
   * Extracts unordered pairs of brother faces from the opening's split face list.
   * Each face is paired with its corresponding brother face exactly once.
   * 
   * @private
   * @param opening - The parametric opening containing split faces
   * @returns Array of face pairs [face, brotherFace]
   */
  private _getUnorderedABFacePairs(opening: ParametricOpening): Array<[Face, Face]>;

  /**
   * Checks if two paths geometrically overlap.
   * 
   * @private
   * @param pathA - First path to compare
   * @param pathB - Second path to compare
   * @returns True if the paths overlap or totally overlap, false otherwise
   */
  private _isOverlap(pathA: Path, pathB: Path): boolean;
}

/**
 * Represents a parametric opening element (door, window, etc.) in a building model.
 */
export interface ParametricOpening {
  /** The host element (typically a wall) containing this opening */
  readonly host: Wall | unknown;
  
  /** List of all faces associated with this opening */
  readonly faceList: Face[];
  
  /** List of split faces created by this opening */
  readonly splitFaceList: Face[];
  
  /**
   * Retrieves the brother face corresponding to the given face ID.
   * @param faceId - ID of the face to find the brother for
   * @returns The brother face, or undefined if not found
   */
  getBrotherFace(faceId: string | number): Face | undefined;
}

/**
 * Represents a wall element in a building model.
 */
export interface Wall {
  /** Faces on the left side of the wall */
  readonly leftFaces: Record<string | number, Face>;
  
  /** Faces on the right side of the wall */
  readonly rightFaces: Record<string | number, Face>;
}

/**
 * Represents a geometric face with path and room information.
 */
export interface Face {
  /** Unique identifier for this face */
  readonly id: string | number;
  
  /** Raw geometric path defining the face boundary */
  readonly rawPath: Path;
  
  /** Array of holes (cutouts) within this face */
  readonly holesPath: Path[];
  
  /** Associated room information for this face */
  readonly roomInfos: RoomInfo[];
}

/**
 * Represents a geometric path with outer boundary and optional inner holes.
 */
export interface Path {
  /** Outer boundary curves of the path */
  readonly outer: Curve[];
}

/**
 * Represents a geometric curve element.
 */
export interface Curve {
  // Curve properties defined by the mathematical algorithm implementation
}

/**
 * Information about a room associated with a face.
 */
export interface RoomInfo {
  // Room metadata properties
}

/**
 * Result structure for split A/B face pairs operation.
 */
export interface SplitABFacePairsResult {
  /** Faces on the A-side of the opening */
  aFaces: Face[];
  
  /** Faces on the B-side of the opening */
  bFaces: Face[];
  
  /** Wall faces on the A-side */
  aWallFaces: Face[];
  
  /** Wall faces on the B-side */
  bWallFaces: Face[];
}

/**
 * Result structure for A-side face pairs operation.
 */
export interface AFacePairsResult {
  /** Faces overlapping with A-wall faces */
  aFaces: Face[];
  
  /** Wall faces on the A-side */
  aWallFaces: Face[];
}

/**
 * Result structure for A/B wall faces classification.
 */
export interface ABWallFacesResult {
  /** Wall faces classified as A-side */
  aWallFaces: Face[];
  
  /** Wall faces classified as B-side */
  bWallFaces: Face[];
}