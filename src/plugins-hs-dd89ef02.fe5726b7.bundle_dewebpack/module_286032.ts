export interface GeometryTolerances {
  ColineDist: number;
  PerfectWallDist: number;
  Overlap: number;
  SamePoint: number;
  ConnectedGap: number;
  Paralell: number;
  ExtendGap: number;
}

const geometryTolerances: Readonly<GeometryTolerances> = Object.freeze({
  ColineDist: 0.01,
  PerfectWallDist: 0.04,
  Overlap: 0.001,
  SamePoint: 0.00001,
  ConnectedGap: 0.01,
  Paralell: 0.01,
  ExtendGap: 0.3
});

export default geometryTolerances;