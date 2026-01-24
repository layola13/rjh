/**
 * Rebuilds functional component slots into an array of template VNodes.
 * 
 * @template T - The type of slot content
 * @param slots - Object mapping slot names to their content
 * @param createElement - Function to create VNode elements (typically Vue's h/createElement)
 * @returns Array of template VNodes with slot assignments
 */
declare function rebuildFunctionalSlots<T = unknown>(
  slots: Record<string, T>,
  createElement: (tag: string, data: SlotData, children: T) => VNode
): VNode[];

/**
 * Slot data configuration for template VNodes
 */
interface SlotData {
  /** The name of the slot */
  slot: string;
}

/**
 * Virtual Node representation
 */
interface VNode {
  // VNode structure depends on your framework implementation
  [key: string]: unknown;
}

export default rebuildFunctionalSlots;