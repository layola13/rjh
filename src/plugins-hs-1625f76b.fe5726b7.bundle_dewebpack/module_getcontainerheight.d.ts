/**
 * Gets the height of a container element minus a fixed offset.
 * 
 * @remarks
 * This function calculates the height of a container by:
 * 1. Retrieving the container reference from either `e.pageRef` or a fallback `f`
 * 2. Getting the element's bounding rectangle height
 * 3. Subtracting a 60px offset (likely for headers/padding)
 * 
 * @param e - Object containing an optional pageRef property
 * @param f - Fallback reference to use if e.pageRef is not available
 * @returns The calculated container height minus 60 pixels, or -60 if no valid reference exists
 */
declare function getContainerHeight(
  e: { pageRef?: React.RefObject<HTMLElement> | null },
  f: React.RefObject<HTMLElement>
): number;

/**
 * Configuration object with optional page reference
 */
interface ContainerConfig {
  /** Optional React ref object pointing to the page container element */
  pageRef?: React.RefObject<HTMLElement> | null;
}

/**
 * Constants used in container height calculation
 */
declare const CONTAINER_HEIGHT_OFFSET: 60;
declare const HEIGHT_DIMENSION: "height";