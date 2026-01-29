/**
 * Utility class for handling background path operations in 3D models.
 * Provides methods to extract and convert curve and discrete paths from various model types.
 */
export declare class BackgroundPathUtil {
  /**
   * Extracts curve path data from a model entity.
   * Supports Face, CustomizedPMModel, CustomizedModel, NCustomizedFeatureModel, and NCustomizedModelLightSlot types.
   * 
   * @param entity - The model entity to extract path from
   * @param paintInfo - Optional paint information for customized models
   * @returns A curve path object containing outer boundary and holes
   */
  static getCurvePath(
    entity: HSCore.Model.Face | HSCore.Model.CustomizedPMModel | HSCore.Model.CustomizedModel | HSCore.Model.NCustomizedFeatureModel | HSCore.Model.NCustomizedModelLightSlot,
    paintInfo?: unknown
  ): CurvePath;

  /**
   * Extracts discrete path data (vector arrays) from a model entity.
   * Discretizes curves into high-precision vector points.
   * 
   * @param entity - The model entity to extract path from
   * @param paintInfo - Optional paint information for customized models
   * @returns A discrete path object with outer boundary and holes as vector arrays
   */
  static getDiscretePath(
    entity: HSCore.Model.Face | HSCore.Model.CustomizedModel | HSCore.Model.CustomizedPMModel | HSCore.Model.NCustomizedFeatureModel | HSCore.Model.NCustomizedModelLightSlot,
    paintInfo?: unknown
  ): DiscretePath;

  /**
   * Converts a discrete path (vectors) to a curve path (lines).
   * 
   * @param discretePath - The discrete path with vector arrays
   * @returns A curve path with line segments
   */
  static toCurvePath(discretePath: DiscretePath): CurvePath;
}

/**
 * Represents a curve path with outer boundary and optional holes.
 * Lines are geometric line segments connecting points.
 */
export interface CurvePath {
  /** Outer boundary as an array of line segments */
  outer: unknown[];
  /** Optional array of holes, each represented as line segments */
  holes?: unknown[][];
}

/**
 * Represents a discrete path with outer boundary and optional holes.
 * Vectors are individual points in 2D/3D space.
 */
export interface DiscretePath {
  /** Outer boundary as an array of vectors */
  outer: unknown[];
  /** Optional array of holes, each represented as vectors */
  holes?: unknown[][];
}

/**
 * Information about paint applied to a face.
 * Contains 2D path data for rendering.
 */
export interface FacePaintInfo {
  /** Array of 2D face paths, first element is outer, rest are holes */
  facePaths2d: unknown[][];
}

/**
 * Global namespace for HSCore model types.
 */
declare global {
  namespace HSCore {
    namespace Model {
      /** Represents a geometric face in the 3D model */
      class Face {
        /** Raw 2D path data with outer boundary and holes */
        rawPath2d: {
          outer: unknown[];
          holes: unknown[][];
        };
      }

      /** Customized polymesh model with mixed paint support */
      class CustomizedPMModel {
        /** Current mixed paint face information */
        curMixPaintFaceInfo?: FacePaintInfo;
      }

      /** Base customized model type */
      class CustomizedModel {}

      /** Customized feature model type */
      class NCustomizedFeatureModel {}

      /** Customized model with light slot support */
      class NCustomizedModelLightSlot {}
    }
  }
}