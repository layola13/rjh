function inOutQuadratic(t: number): number {
  t *= 2;
  
  if (t < 1) {
    return 0.5 * t * t;
  }
  
  t--;
  return -0.5 * (t * (t - 2) - 1);
}

export default inOutQuadratic;