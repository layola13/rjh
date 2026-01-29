export function performanceDateNow(): number {
  return performance && performance.timeOrigin && performance.now
    ? performance.timeOrigin + performance.now()
    : Date.now();
}