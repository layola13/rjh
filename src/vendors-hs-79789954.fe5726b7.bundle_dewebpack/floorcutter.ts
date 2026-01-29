import { Loop, MathAlg, Tolerance } from './math-core';
import { Polygon, CURVE_CURVE_OVERLAP_RESULTS } from './polygon';
import { ConvexUShapeFeature, ConvexRightHalfUShapeFeature, ConvexLeftHalfUShapeFeature, ConvexBalconyFeature, ConvexDoorHallFeature } from './convex-features';
import { ConcaveUShapeFeature } from './concave-features';
import { ConvexLShapeFeature } from './l-shape-feature';
import { ConvexHallwayShapeFeature } from './hallway-feature';
import { OpeningsExtractor } from './openings-extractor';
import { FeatureExtractor } from './feature-extractor';
import { findLineGroupInCurves } from './curve-utils';

interface Point {
  x: number;
  y: number;
}

interface Curve {
  getLength(): number;
  getStartPt(): Point;
  getEndPt(): Point;
  containsProjectedPt(pt: Point): boolean;
  getParamAt(pt: Point): number;
}

interface PolygonLike {
  getCornerPts(): Point[];
  getCenter(): Point;
}

interface Opening {
  // Define opening properties based on actual structure
}

interface FloorContext {
  openings: Opening[];
  hintBoxes: unknown[];
  minBoxDimension: number;
}

interface Feature {
  type: string;
  selfPolygon: Polygon;
  toPolygon: Polygon;
  getOverlapCurveWith(curves: Curve[]): OverlapResult | null;
}

interface OverlapResult {
  overlapCurve: Curve;
  floorCurve: Curve;
  feature: Feature;
}

interface LineGroup {
  line: Line;
  group: number;
  index: number;
}

interface Line {
  getRange(): Range;
  getParamAt(pt: Point): number;
  getLength(): number;
}

interface Range {
  min: number;
  max: number;
  getLength(): number;
  clamp(value: number): number;
}

interface PositionParams {
  startParam: number;
  endParam: number;
  centerParam: number;
}

interface FeatureHostInfo {
  group: number;
  hostCurveIndex: number;
  openingIndex: number;
  posParam: PositionParams;
  type: string;
  feature: Feature;
  openingFloorOverlapCurve: Curve;
  contentType: string;
  categoryId: string;
  hostCurveLength: number;
  linkRoomType: string;
  zBottom: number;
  zTop: number;
  openingType: string;
}

interface FeatureHostInfos {
  bottomProfileGeomCollectionWKT: string;
  centerPtsGeomCollectionWKT: string;
  centerPtsMultiPointWKT: string;
  hostCurveIndexStr: string;
  count: number;
  normalizedType: string;
  openingType: string;
  hostInfos: FeatureHostInfo[];
}

interface FloorResult {
  floorOuterLoop: Loop;
  featureHostInfos: FeatureHostInfos;
}

type FeatureClass = new (...args: unknown[]) => unknown;

const DEFAULT_FEATURE_CLASSES: FeatureClass[] = [
  ConcaveUShapeFeature,
  ConvexUShapeFeature,
  ConvexRightHalfUShapeFeature,
  ConvexLeftHalfUShapeFeature,
  ConvexLShapeFeature,
  ConvexHallwayShapeFeature,
  ConvexBalconyFeature,
  ConvexDoorHallFeature
];

const DEFAULT_Z_TOP = 2.8;
const DEFAULT_Z_BOTTOM = 0;
const FORBIDDEN_AREA_SCALE_FACTOR = 0.99;
const MAX_ITERATIONS = 100;
const MIN_CURVE_COUNT = 5;
const AREA_THRESHOLD_RATIO = 0.5;
const MIN_OVERLAP_LENGTH = 0.5;

class Floorcutter {
  protected targetPolygon: Polygon;
  protected currentPolygon: Polygon;
  protected forbiddenAreaLoops: Loop[];
  protected floorContext: FloorContext;
  protected extractors: FeatureExtractor[];
  protected featureLists: Feature[][] = [];
  protected currentStepExtractedFeatures: Feature[] = [];

  constructor(
    outerLoop: Point[],
    openings: Opening[],
    forbiddenAreas: PolygonLike[] = [],
    featureClasses: FeatureClass[] = DEFAULT_FEATURE_CLASSES
  ) {
    const polygon = new Polygon(outerLoop);
    this.targetPolygon = polygon;
    this.currentPolygon = polygon;
    this.forbiddenAreaLoops = forbiddenAreas.map(
      area => new Loop(area.getCornerPts()).scale(FORBIDDEN_AREA_SCALE_FACTOR, area.getCenter())
    );
    this.floorContext = {
      openings,
      hintBoxes: [],
      minBoxDimension: Infinity
    };
    this.extractors = featureClasses.map(
      FeatureClass => new FeatureExtractor(FeatureClass, this.floorContext)
    );
  }

  protected get isMeetTerminateCondition(): boolean {
    return (
      this.targetPolygon.curves.length < MIN_CURVE_COUNT ||
      this.currentStepExtractedFeatures.length === 0 ||
      this.currentPolygon.curves.length < MIN_CURVE_COUNT
    );
  }

  execute(): FloorResult[] {
    let iterationCount = 0;
    const areaThreshold = AREA_THRESHOLD_RATIO * this.targetPolygon.area;

    do {
      const extractedFeatures: Feature[] = [];

      for (const extractor of this.extractors) {
        const features = extractor.extractFrom(this.currentPolygon);

        for (const feature of features) {
          if (this._isFeatureIntersectForbiddenArea(feature)) {
            this.forbiddenAreaLoops.push(feature.selfPolygon.outerLoop);
          } else {
            if (!(feature.toPolygon.area > areaThreshold)) break;
            this.currentPolygon = feature.toPolygon;
            extractedFeatures.push(feature);
          }
        }
      }

      this.featureLists.push(extractedFeatures);
      this.currentStepExtractedFeatures = extractedFeatures;
      iterationCount++;
    } while (!this.isMeetTerminateCondition && iterationCount < MAX_ITERATIONS);

    const validFeatureHostInfos = this._getValidFeatureHostInfos(this.featureLists.flat());
    const results: FloorResult[] = [];

    if (!validFeatureHostInfos.length) return results;

    for (let i = 0; i < validFeatureHostInfos.length; i++) {
      const filteredFeatures = this._filterOutNonAdjacentFeature(
        validFeatureHostInfos.slice(0, i + 1)
      );
      const lastFeature = filteredFeatures.at(-1)!.feature;

      results.push({
        floorOuterLoop: lastFeature.toPolygon.outerLoop,
        featureHostInfos: this._getFeatureHostInfos(filteredFeatures)
      });
    }

    return results;
  }

  protected _filterOutNonAdjacentFeature(featureInfos: FeatureHostInfo[]): FeatureHostInfo[] {
    if (featureInfos.length < 2) return featureInfos;

    const lastFeatureInfo = featureInfos.at(-1)!;
    const lastFeature = lastFeatureInfo.feature;
    const lastOuterLoop = lastFeature.toPolygon.outerLoop;

    const intersectingFeatures = featureInfos.filter(({ feature }) =>
      MathAlg.PositionJudge.loopToLoop(
        feature.selfPolygon.outerLoop,
        lastOuterLoop,
        undefined,
        true
      ) === MathAlg.LoopLoopPositonType.INTERSECT
    );

    const adjacentFeatures: FeatureHostInfo[] = [];
    const lastPolygonCurves = lastFeature.toPolygon.curves;

    for (let featureInfo of intersectingFeatures) {
      const openingOverlapCurve = featureInfo.openingFloorOverlapCurve;
      const matchingCurve = lastPolygonCurves.find(curve =>
        CURVE_CURVE_OVERLAP_RESULTS.includes(
          MathAlg.PositionJudge.curveCurveOverlap(curve, openingOverlapCurve)
        )
      );

      if (
        matchingCurve &&
        (!matchingCurve.containsProjectedPt(openingOverlapCurve.getStartPt()) ||
          !matchingCurve.containsProjectedPt(openingOverlapCurve.getEndPt()))
      ) {
        featureInfo = this._updateFeatureHostInfo(featureInfo, lastPolygonCurves) ?? featureInfo;
      }

      if (featureInfo) {
        adjacentFeatures.push(featureInfo);
      }
    }

    return adjacentFeatures;
  }

  protected _updateFeatureHostInfo(
    featureInfo: FeatureHostInfo,
    curves: Curve[]
  ): FeatureHostInfo | null {
    const updatedInfo = this._getFeatureHostInfo(featureInfo.feature, curves);
    if (!updatedInfo) return null;

    featureInfo.posParam = updatedInfo.posParam;
    return featureInfo;
  }

  protected _getFeatureHostInfos(featureInfos: FeatureHostInfo[]): FeatureHostInfos {
    return {
      bottomProfileGeomCollectionWKT: '',
      centerPtsGeomCollectionWKT: '',
      centerPtsMultiPointWKT: '',
      hostCurveIndexStr: '',
      count: featureInfos.length,
      normalizedType: 'centroid',
      openingType: 'feature',
      hostInfos: featureInfos
    };
  }

  protected _getValidFeatureHostInfos(features: Feature[]): FeatureHostInfo[] {
    const validInfos: FeatureHostInfo[] = [];
    if (features.length < 1) return validInfos;

    for (const feature of features) {
      const hostInfo = this._getFeatureHostInfo(
        feature,
        feature.toPolygon.outerLoop.getAllCurves()
      );
      if (hostInfo) {
        validInfos.push(hostInfo);
      }
    }

    return OpeningsExtractor.sortOpeningHostInfos(validInfos);
  }

  protected _getFeatureHostInfo(
    feature: Feature,
    curves: Curve[],
    minOverlapLength: number = MIN_OVERLAP_LENGTH
  ): FeatureHostInfo | null {
    let hostInfo: FeatureHostInfo | null = null;
    const overlapResult = feature.getOverlapCurveWith(curves);

    if (!overlapResult?.overlapCurve || overlapResult.overlapCurve.getLength() <= minOverlapLength) {
      return null;
    }

    const lineGroup = findLineGroupInCurves(overlapResult.floorCurve, curves);
    if (!lineGroup) return null;

    const { overlapCurve } = overlapResult;
    const line = lineGroup.line;
    const range = line.getRange();
    const rangeLength = range.getLength();
    const rangeMin = range.min;

    const startParam = range.clamp(line.getParamAt(overlapCurve.getStartPt()));
    const endParam = range.clamp(line.getParamAt(overlapCurve.getEndPt()));

    const normalizedStartParam = (startParam - rangeMin) / rangeLength;
    const normalizedEndParam = (endParam - rangeMin) / rangeLength;

    const minParam = Math.min(normalizedStartParam, normalizedEndParam);
    const maxParam = Math.max(normalizedStartParam, normalizedEndParam);
    const centerParam = (minParam + maxParam) / 2;

    hostInfo = {
      group: lineGroup.group,
      hostCurveIndex: lineGroup.index,
      openingIndex: -1,
      posParam: {
        startParam: minParam,
        endParam: maxParam,
        centerParam
      },
      type: overlapResult.feature.type,
      feature: overlapResult.feature,
      openingFloorOverlapCurve: overlapCurve,
      contentType: 'feature',
      categoryId: 'feature-category',
      hostCurveLength: line.getLength(),
      linkRoomType: 'none',
      zBottom: DEFAULT_Z_BOTTOM,
      zTop: DEFAULT_Z_TOP,
      openingType: 'feature'
    };

    return hostInfo;
  }

  protected _isFeatureIntersectForbiddenArea(feature: Feature): boolean {
    return this.forbiddenAreaLoops.some(
      forbiddenLoop =>
        MathAlg.PositionJudge.loopToLoop(
          forbiddenLoop,
          feature.selfPolygon.outerLoop,
          Tolerance.LENGTH_EPS,
          true
        ) !== MathAlg.LoopLoopPositonType.OUT
    );
  }
}

class RegionDivider extends Floorcutter {
  execute(): FloorResult[] {
    let iterationCount = 0;

    do {
      const extractedFeatures: Feature[] = [];

      for (const extractor of this.extractors) {
        const features = extractor.extractFrom(this.currentPolygon);

        for (const feature of features) {
          if (this._isFeatureIntersectForbiddenArea(feature)) {
            this.forbiddenAreaLoops.push(feature.selfPolygon.outerLoop);
          } else {
            this.currentPolygon = feature.toPolygon;
            extractedFeatures.push(feature);
          }
        }
      }

      this.featureLists.push(extractedFeatures);
      this.currentStepExtractedFeatures = extractedFeatures;
      iterationCount++;
    } while (!this.isMeetTerminateCondition && iterationCount < MAX_ITERATIONS);

    const validFeatureHostInfos = this._getValidFeatureHostInfos(this.featureLists.flat());
    const results: FloorResult[] = [];

    if (!validFeatureHostInfos.length) return results;

    for (let i = 0; i < validFeatureHostInfos.length; i++) {
      const filteredFeatures = this._filterOutNonAdjacentFeature(
        validFeatureHostInfos.slice(0, i + 1)
      );
      const lastFeature = filteredFeatures.at(-1)!.feature;

      results.push({
        floorOuterLoop: lastFeature.toPolygon.outerLoop,
        featureHostInfos: this._getFeatureHostInfos(filteredFeatures)
      });
    }

    return results;
  }

  protected _isFeatureIntersectForbiddenArea(_feature: Feature): boolean {
    return false;
  }
}

export { Floorcutter, RegionDivider };