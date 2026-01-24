/**
 * Builder utility class providing error logging, face validation and cleanup operations
 * for 3D model building operations in HSCore
 */
export declare class BuilderUtil {
  /**
   * Log error with detailed context information
   * @param category - Error category for classification
   * @param message - Error message text
   * @param error - Error object or error message string
   * @param description - Additional description of the error context
   * @param errorInfo - Supplementary error information
   */
  static logError(
    category: string,
    message: string,
    error: Error | string,
    description?: string,
    errorInfo?: Record<string, unknown>
  ): void;

  /**
   * Log warning message
   * @param category - Warning category for classification
   * @param message - Warning message text
   */
  static logWarning(category: string, message: string): void;

  /**
   * Clean orphaned faces that have no master face reference
   * Removes faces from the model that are not properly connected
   * @param model - The 3D model containing faces to validate
   * @param target - Target object containing the faceMap to clean
   */
  static cleanFreeFaces(
    model: {
      faces: Record<string, HSCore.Model.Face | undefined>;
      auxFaces: Record<string, HSCore.Model.Face | undefined>;
      children: Record<string, unknown>;
      removeChild(faceId: string): void;
    },
    target: {
      faceMap: Map<string, unknown>;
    }
  ): void;

  /**
   * Validate face map integrity against model children
   * Checks for orphaned face references and logs validation errors
   * @param entity - Entity containing document and children references
   * @param faceMap - Map of face IDs to face data
   * @param context - Context identifier for error logging
   * @param operation - Operation name for error logging
   */
  static validateFaceMap(
    entity: {
      doc: {
        docMgr: {
          transManager: {
            activeRequest: unknown;
          };
        };
      };
      children: Record<string, unknown>;
    },
    faceMap: Map<string, unknown>,
    context: string,
    operation: string
  ): void;
}

/**
 * Global HSCore namespace for 3D modeling
 */
declare namespace HSCore {
  namespace Model {
    /**
     * Represents a 3D face in the model
     */
    interface Face {
      /**
       * Get the master face this face is derived from
       * @returns The master face or null if this is a root face
       */
      getMaster(): Face | null;
    }
  }
}

/**
 * Batch request for grouping multiple operations
 */
declare class BatchRequest {
  /**
   * Get the currently active request within this batch
   */
  getActiveRequest(): unknown;
}

/**
 * State restoration request
 */
declare class StateRequest {
  /**
   * Indicates whether this request is currently restoring state
   */
  readonly isRestoring: boolean;
}

/**
 * Global logging interface
 */
declare const log: {
  /**
   * Log an error with context
   * @param message - Error message
   * @param category - Error category
   * @param flag - Error flag
   * @param context - Additional context object
   */
  error(
    message: string,
    category: string,
    flag?: boolean,
    context?: {
      errorStack?: Error;
      description?: string;
      errorInfo?: Record<string, unknown>;
    }
  ): void;

  /**
   * Log a warning message
   * @param message - Warning message
   * @param category - Warning category
   */
  warning(message: string, category: string): void;
};