/**
 * Extracts the 'y' property from an object
 * @template T - Type that contains a 'y' property
 * @param element - The input object containing a 'y' property
 * @returns The value of the 'y' property
 */
export function extractYProperty<T extends { y: unknown }>(element: T): T['y'] {
    return element.y;
}