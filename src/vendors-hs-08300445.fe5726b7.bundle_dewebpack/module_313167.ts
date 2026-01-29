export interface AlignConfig {
  points?: [string, string];
  offset?: [number, number];
  targetOffset?: [number, number];
  overflow?: { adjustX?: boolean; adjustY?: boolean };
  useCssRight?: boolean;
  useCssBottom?: boolean;
  useCssTransform?: boolean;
}

export interface PlacementMap {
  [placement: string]: AlignConfig;
}

export function getAlignFromPlacement(
  placementMap: PlacementMap,
  placement: string,
  align: AlignConfig
): AlignConfig {
  const placementConfig = placementMap[placement] || {};
  return { ...placementConfig, ...align };
}

export function getAlignPopupClassName(
  placementMap: PlacementMap,
  prefixCls: string,
  align: AlignConfig,
  isAlignPoint: boolean
): string {
  const points = align.points;
  if (!points) return '';

  const placements = Object.keys(placementMap);
  for (let index = 0; index < placements.length; index += 1) {
    const placement = placements[index];
    if (isSamePoints(placementMap[placement].points, points, isAlignPoint)) {
      return `${prefixCls}-placement-${placement}`;
    }
  }
  return '';
}

function isSamePoints(
  currentPoints: [string, string] | undefined,
  targetPoints: [string, string] | undefined,
  isAlignPoint: boolean
): boolean {
  if (!currentPoints || !targetPoints) return false;
  
  return isAlignPoint
    ? currentPoints[0] === targetPoints[0]
    : currentPoints[0] === targetPoints[0] && currentPoints[1] === targetPoints[1];
}