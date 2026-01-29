function matrixAppendRotationInv(
  matrix: Matrix,
  rotation: number,
  offsetX: number = 0,
  offsetY: number = 0
): void {
  const invertedMatrix = matrixPool[MatrixUtils.inv(rotation)];
  invertedMatrix.tx = offsetX;
  invertedMatrix.ty = offsetY;
  matrix.append(invertedMatrix);
}