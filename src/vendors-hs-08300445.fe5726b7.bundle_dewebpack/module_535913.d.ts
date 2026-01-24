/**
 * Checks if a DOM element is visible in the viewport.
 * 
 * This utility determines visibility by checking:
 * - If the element has an offsetParent (indicates it's rendered)
 * - If the element has non-zero dimensions via getBBox (for SVG elements)
 * - If the element has non-zero dimensions via getBoundingClientRect
 * 
 * @param element - The DOM element to check for visibility
 * @returns True if the element is visible, false otherwise
 */
export default function isElementVisible(element: Element | null | undefined): boolean;