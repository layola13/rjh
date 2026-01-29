/**
 * Constraint collection utility for traversing and gathering constraints from a tree structure.
 * @module ConstraintUtil
 */

/**
 * Represents a node that can have child nodes.
 */
interface NodeWithChildren {
  /**
   * Iterates over each child node.
   * @param callback - Function called for each child node
   */
  forEachChild(callback: (child: NodeWithChildren) => void): void;
  
  /**
   * Iterates over each constraint (optional).
   * @param callback - Function called for each constraint
   */
  forEachConstraint?(callback: (constraint: unknown) => void): void;
}

/**
 * Callback function type for processing collected constraints.
 * @template T - The constraint type
 * @param constraint - The constraint being processed
 */
type ConstraintCallback<T = unknown> = (constraint: T) => void;

/**
 * Utility class for collecting and processing constraints from a hierarchical node structure.
 */
export declare class ConstraintUtil {
  /**
   * Recursively collects all constraints from a node and its descendants.
   * Traverses the entire tree structure, calling the callback for each constraint found.
 */
   * @template T - The constraint type
   * @param node - The root node to start collecting from
   * @param callback - Function to call for each constraint found
   * @param context - The 'this' context to use when calling the callback
   */
  static collectConstraints<T = unknown>(
    node: NodeWithChildren,
    callback: ConstraintCallback<T>,
    context?: unknown
  ): void;
}