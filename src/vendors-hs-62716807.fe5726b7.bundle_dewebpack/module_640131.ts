export function easeInOutCubic(
  currentTime: number,
  startValue: number,
  endValue: number,
  duration: number
): number {
  const changeInValue = endValue - startValue;
  
  if ((currentTime /= duration / 2) < 1) {
    return (changeInValue / 2) * currentTime * currentTime * currentTime + startValue;
  }
  
  return (changeInValue / 2) * ((currentTime -= 2) * currentTime * currentTime + 2) + startValue;
}