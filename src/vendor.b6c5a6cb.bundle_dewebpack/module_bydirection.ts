enum Direction {
  N = 'N',
  S = 'S',
  E = 'E',
  W = 'W',
  NE = 'NE',
  SE = 'SE',
  SW = 'SW',
  NW = 'NW'
}

function getDirectionByVector(deltaX: number, deltaY: number): Direction {
  const absX = Math.abs(deltaX);
  const absY = Math.abs(deltaY);
  
  // Primarily vertical movement
  if (2 * absX <= absY) {
    return deltaY >= 0 ? Direction.S : Direction.N;
  }
  
  // Primarily horizontal movement
  if (2 * absY <= absX) {
    return deltaX > 0 ? Direction.E : Direction.W;
  }
  
  // Diagonal movement
  if (deltaY > 0) {
    return deltaX > 0 ? Direction.SE : Direction.SW;
  }
  
  return deltaX > 0 ? Direction.NE : Direction.NW;
}