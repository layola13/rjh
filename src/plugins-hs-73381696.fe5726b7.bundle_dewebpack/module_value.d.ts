/**
 * HSCore utility types for Slab management
 */

/**
 * Edge data structure used in outdoor layer calculations
 */
interface Edge {
  // Define specific edge properties based on your domain
  id: string;
  coordinates?: [number, number][];
  [key: string]: unknown;
}

/**
 * Slab utility for managing outdoor layer operations
 */
interface SlabUtil {
  /**
   * Updates outdoor layer slabs based on provided edges
   * @param edges - Array of edge data to process
   */
  updateOutdoorLayerSlabs(edges: Edge[]): void;
}

/**
 * HSCore utility namespace
 */
interface HSCoreUtil {
  Slab: SlabUtil;
}

interface HSCore {
  Util: HSCoreUtil;
}

/**
 * Callback handler type for commit events
 */
type OnCommitCallback = (data: unknown[]) => void;

/**
 * Module context interface
 */
interface ModuleContext {
  /** Temporary edges storage for processing */
  tempEdges: Edge[];
  
  /**
   * Commits changes and triggers callback
   * Invokes the onCommit handler with empty array after updating slabs
   */
  commit(): void;
}

declare module 'module_value' {
  export const HSCore: HSCore;
  export function invokeCallback(
    target: unknown,
    methodName: string,
    context: unknown,
    arity: number
  ): OnCommitCallback;
}