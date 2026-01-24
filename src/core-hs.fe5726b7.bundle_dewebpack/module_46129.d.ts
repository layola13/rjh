/**
 * State utility class for managing and traversing various state objects in the HSCore system.
 * Provides methods to convert paths to array states and collect states from document hierarchies.
 */
declare class StateUtil {
  /**
   * Converts an array of path coordinates into HSCore ArrayState objects.
   * Each path is represented as an array of points with x, y, z coordinates.
   * 
   * @param paths - Array of paths, where each path is an array of coordinate objects
   * @returns Array of HSCore.State.ArrayState objects representing the converted paths
   * 
   * @example
   * const paths = [
   *   [{ x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 }],
   *   [{ x: 2, y: 2, z: 2 }, { x: 3, y: 3, z: 3 }]
   * ];
   * const arrayStates = StateUtil.pathsToArrayStates(paths);
   */
  static pathsToArrayStates(paths: Array<Array<{ x: number; y: number; z: number }>>): HSCore.State.ArrayState[];

  /**
   * Recursively collects and processes state objects from a given entity.
   * Handles various state types including ArrayState, PointState, Point2DState, Arc2DState.
   * 
   * @param entity - The entity to collect states from (can be a model object or state container)
   * @param callback - Function to call for each collected state
   * @param context - Optional context object to use as 'this' when calling the callback
   * 
   * @remarks
   * Processes the following state types:
   * - HSCore.State.ArrayState: Iterates through children and collects their coordinate states
   * - HSCore.State.PointState: Collects x, y, z coordinate states
   * - HSCore.State.Point2DState: Collects x, y coordinate states
   * - HSCore.State.Arc2DState: Collects x, y, centerAngle states
   * - HSCore.State.State: Collects if __persistable is true
   * - Arrays: Recursively processes ArrayState elements
   * 
   * Also handles special model classes (NgPAssembly, NgPattern) by iterating their states.
   */
  static collectStates(
    entity: any,
    callback: (state: HSCore.State.State) => void,
    context?: any
  ): void;

  /**
   * Iterates through all states in a document, applying a callback to each state.
   * Traverses both content and pattern hierarchies within the document.
   * 
   * @param callback - Function to execute for each state found
   * @param document - Optional document to traverse. If not provided, uses the active document
   * 
   * @remarks
   * The method:
   * 1. Iterates through all content items in the document
   * 2. Iterates through all patterns in the document
   * 3. For each item, calls collectStates to process nested state hierarchies
   */
  static forEachState(
    callback: (state: HSCore.State.State) => void,
    document?: HSCore.Doc.Document
  ): void;
}

/**
 * Global namespace declarations for HSCore framework types
 */
declare namespace HSCore {
  namespace State {
    /**
     * Base state class with persistable flag
     */
    class State {
      __persistable?: boolean;
      init(config: { value: number }): void;
    }

    /**
     * Container for an array of point states
     */
    class ArrayState {
      children: Array<PointState | Point2DState | Arc2DState>;
      addPoint(point: PointState | Point2DState | Arc2DState): void;
    }

    /**
     * 3D point state with x, y, z coordinates
     */
    class PointState {
      __x: State;
      __y: State;
      __z: State;
    }

    /**
     * 2D point state with x, y coordinates
     */
    class Point2DState {
      __x: State;
      __y: State;
    }

    /**
     * 2D arc state with x, y coordinates and center angle
     */
    class Arc2DState {
      __x: State;
      __y: State;
      __centerAngle: State;
    }
  }

  namespace Doc {
    /**
     * Document manager interface
     */
    interface DocumentManager {
      activeDocument: Document;
    }

    /**
     * Get the global document manager instance
     */
    function getDocManager(): DocumentManager;

    /**
     * Document interface with content and pattern traversal methods
     */
    interface Document {
      forEachContent(callback: (content: any) => void): void;
      forEachPattern(callback: (pattern: any) => void): void;
    }
  }
}

/**
 * Constants for HSCore model classes
 */
declare namespace HSConstants {
  enum ModelClass {
    NgPAssembly = 'NgPAssembly',
    NgPattern = 'NgPattern'
  }
}

export { StateUtil };