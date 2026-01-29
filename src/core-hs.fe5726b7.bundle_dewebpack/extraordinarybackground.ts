interface Point {
  clone(): Point;
}

interface Curve {
  clone(): Curve;
}

interface Region {
  outer: Curve[];
  holes: Curve[][];
}

interface BuilderCurveInfo {
  curve: Curve;
  topo: string;
}

interface BuilderRegion {
  outer: BuilderCurveInfo[];
  holes: BuilderCurveInfo[][];
  topo: string;
}

export class ExtraordinaryBackground {
  private _regions: Region[];

  constructor(regions: Region[]) {
    this._regions = regions;
  }

  get regions(): Region[] {
    return this._regions.map((region) => ({
      outer: region.outer.map((curve) => curve.clone()),
      holes: region.holes.map((hole) => hole.map((curve) => curve.clone()))
    }));
  }

  setRegions(regions: Region[]): void {
    this._regions = regions;
  }

  toBuilderRegions(): BuilderRegion[] {
    return this.regions.map((region, regionIndex) => ({
      outer: region.outer.map((curve, curveIndex) => ({
        curve: curve,
        topo: `background_outer_${regionIndex}_${curveIndex}`
      })),
      holes: region.holes.map((hole, holeIndex) => 
        hole.map((curve, curveIndex) => ({
          curve: curve,
          topo: `background_hole_${regionIndex}_${holeIndex}_${curveIndex}`
        }))
      ),
      topo: "background"
    }));
  }
}