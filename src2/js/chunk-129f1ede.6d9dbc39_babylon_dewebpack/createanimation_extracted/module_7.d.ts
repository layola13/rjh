/**
 * Calculates the product of x and z properties from the input object.
 * Commonly used for area calculations or 2D coordinate transformations.
 * 
 * @param e - Object containing x and z numeric properties
 * @returns The product of e.x and e.z
 */
declare function calculateProduct(e: { x: number; z: number }): number;

export default calculateProduct;