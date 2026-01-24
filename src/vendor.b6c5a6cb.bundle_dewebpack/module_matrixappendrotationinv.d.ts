/**
 * Appends an inverse rotation transformation to a matrix.
 * 
 * This function applies the inverse of a given rotation to a transformation matrix,
 * with optional translation offsets. It's commonly used in 2D graphics transformations
 * where you need to undo or reverse a previous rotation operation.
 * 
 * @param matrix - The target transformation matrix to which the inverse rotation will be appended
 * @param rotation - The rotation value (typically in radians or degrees) to be inverted
 * @param offsetX - The horizontal translation offset to apply after rotation (defaults to 0)
 * @param offsetY - The vertical translation offset to apply after rotation (defaults to 0)
 * 
 * @remarks
 * The function modifies the input matrix in-place by appending the inverse rotation transformation.
 * The inverse rotation is retrieved from a pre-computed lookup table and then translated by the given offsets.
 * 
 * @example
 *