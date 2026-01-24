/**
 * Rebuilds functional component slots into an array of template elements.
 * 
 * @param slots - Object containing slot definitions, keyed by slot name
 * @param createElement - Function to create template elements (typically Vue's h/createElement)
 * @returns Array of created template elements with slot configurations
 */
export default function rebuildFunctionalSlots(
  slots: Record<string, unknown>,
  createElement: (tag: string, config: { slot: string }, content: unknown) => unknown
): unknown[] {
  const result: unknown[] = [];
  
  for (const slotName in slots) {
    if (slots.hasOwnProperty(slotName)) {
      result.push(
        createElement('template', { slot: slotName }, slots[slotName])
      );
    }
  }
  
  return result;
}