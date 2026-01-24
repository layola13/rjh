/**
 * Module: module_j
 * 
 * Transforms input data through a two-stage processing pipeline.
 * First applies dt() transformation, then ut() transformation.
 * 
 * @param input - The input value to be processed
 * @returns The transformed result after applying both dt and ut transformations
 */
declare function moduleJ<T, U, R>(input: T): R;

export default moduleJ;