import { MathAlg, Tolerance } from './math-alg';
import { Polygon } from './polygon';
import { FeatureExtractor } from './feature-extractor';
import { findLineGroupInCurves } from './curve-utils';
import { ExpandRegionFeature } from './expand-region-feature';

interface HintBox {
  marginedBox: {
    getSize(): { x: number; y: number };
  };
}

interface Opening {
  // Define opening properties as needed
}

interface FloorContext {
  openings: Opening[];
  hintBoxes: HintBox[];
  minBoxDimension: number;
}

interface PositionParam {
  startParam: number;
  endParam: number;
  centerParam: number;
}

interface FeatureHostInfo {
  group: unknown;
  hostCurveIndex: number;
  openingIndex: number;
  posParam: PositionParam;
  feature: Feature;
  openingFloorOverlapCurve: unknown;
  contentType: string;
  categoryId: string;
  hostCurveLength: number;
  linkRoomType: string;
  zBottom: number;
  zTop: number;
  openingType: string;
}

interface FeatureHostInfoCollection {
  bottomProfileGeomCollectionWKT: string;
  centerPtsGeomCollectionWKT: string;
  centerPtsMultiPointWKT: string;
  hostCurveIndexStr: string;
  count: number;
  normalizedType: string;
  openingType: string;
  hostInfos: FeatureHostInfo[];
}

interface RegionCutResult {
  floorOuterLoop: unknown;
  featureHostInfos: FeatureHostInfoCollection;
}

interface Feature {
  selfPolygon: Polygon;
  toPolygon: Polygon;
  getOverlapCurveWith(curves: unknown[]): OverlapCurveResult | null;
}

interface OverlapCurveResult {
  featureCurve: Curve;
  floorCurve: unknown;
  feature: Feature;
}

interface Curve {
  getLength(): number;
  getStartPt(): unknown;
  getEndPt(): unknown;
}

interface Line {
  getRange(): Range;
  getParamAt(point: unknown): number;
  getLength(): number;
}

interface Range {
  getLength(): number;
  min: number;
}

interface LineGroup {
  line: Line;
  group: unknown;
  index: number;
}

type FeatureExtractorClass = new (floorContext: FloorContext) => {
  extractFrom(polygon: Polygon): Feature[];
};

const DEFAULT_FEATURE_EXTRACTORS: FeatureExtractorClass[] = [ExpandRegionFeature];

const MAX_ITERATION_COUNT = 100;
const MIN_CURVE_COUNT = 5;
const MIN_FEATURE_CURVE_LENGTH = 0.5;
const DEFAULT_Z_BOTTOM = 0;
const DEFAULT_Z_TOP = 2.8;
const FEATURE_OPENING_INDEX = -1;

export class RegionCutter {
  private readonly targetPolygon: Polygon;
  private currentPolygon: Polygon;
  private readonly forbiddenAreaLoops: unknown[];
  private readonly shouldContainHintBoxes: HintBox[];
  private readonly floorContext: FloorContext;
  private readonly extractors: FeatureExtractor[];
  private readonly featureLists: Feature[][];
  private currentStepExtractedFeatures: Feature[];

  constructor(
    outerLoop: unknown,
    openings: Opening[],
    hintBoxes: HintBox[],
    featureExtractorClasses: FeatureExtractorClass[] = DEFAULT_FEATURE_EXTRACTORS
  ) {
    this.featureLists = [];
    this.currentStepExtractedFeatures = [];

    const initialPolygon = new Polygon(outerLoop);
    this.targetPolygon = initialPolygon;
    this.currentPolygon = initialPolygon;
    this.forbiddenAreaLoops = [];
    this.shouldContainHintBoxes = hintBoxes;

    const minBoxDimension = hintBoxes.reduce(
      (minDimension, hintBox) => {
        const size = hintBox.marginedBox.getSize();
        return Math.min(minDimension, size.x, size.y);
      },
      Number.MAX_VALUE
    );

    this.floorContext = {
      openings,
      hintBoxes,
      minBoxDimension
    };

    this.extractors = featureExtractorClasses.map(
      (ExtractorClass) => new FeatureExtractor(ExtractorClass, this.floorContext)
    );
  }

  private get isMeetTerminateCondition(): boolean {
    return (
      this.currentStepExtractedFeatures.length === 0 ||
      this.targetPolygon.curves.length < MIN_CURVE_COUNT ||
      this.currentPolygon.curves.length < MIN_CURVE_COUNT
    );
  }

  public execute(): RegionCutResult[] {
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
    } while (!this.isMeetTerminateCondition && iterationCount < MAX_ITERATION_COUNT);

    const allFeatures = this.featureLists.flat();
    const validFeatureHostInfos = this._getValidFeatureHostInfos(allFeatures);
    const results: RegionCutResult[] = [];

    if (validFeatureHostInfos.length === 0) {
      return results;
    }

    for (let i = 0; i < validFeatureHostInfos.length; i++) {
      const featureSlice = validFeatureHostInfos.slice(0, i + 1);
      const adjacentFeatures = this._filterOutNonAdjacentFeature(featureSlice);
      const lastFeature = adjacentFeatures.at(-1)!.feature;

      results.push({
        floorOuterLoop: lastFeature.toPolygon.outerLoop,
        featureHostInfos: this._getFeatureHostInfos(adjacentFeatures)
      });
    }

    return results;
  }

  private _filterOutNonAdjacentFeature(features: FeatureHostInfo[]): FeatureHostInfo[] {
    if (features.length < 2) {
      return features;
    }

    const lastFeatureOuterLoop = features.at(-1)!.feature.toPolygon.outerLoop;

    return features.filter(({ feature }) => {
      const positionType = MathAlg.PositionJudge.loopToLoop(
        feature.selfPolygon.outerLoop,
        lastFeatureOuterLoop,
        undefined,
        true
      );
      return positionType === MathAlg.LoopLoopPositonType.INTERSECT;
    });
  }

  private _getFeatureHostInfos(hostInfos: FeatureHostInfo[]): FeatureHostInfoCollection {
    return {
      bottomProfileGeomCollectionWKT: '',
      centerPtsGeomCollectionWKT: '',
      centerPtsMultiPointWKT: '',
      hostCurveIndexStr: '',
      count: hostInfos.length,
      normalizedType: 'centroid',
      openingType: 'feature',
      hostInfos
    };
  }

  private _getValidFeatureHostInfos(features: Feature[]): FeatureHostInfo[] {
    const validHostInfos: FeatureHostInfo[] = [];

    if (features.length < 1) {
      return validHostInfos;
    }

    for (const feature of features) {
      const outerLoopCurves = feature.toPolygon.outerLoop.getAllCurves();
      const overlapResult = feature.getOverlapCurveWith(outerLoopCurves);

      if (!overlapResult?.featureCurve) {
        continue;
      }

      const featureCurveLength = overlapResult.featureCurve.getLength();
      if (featureCurveLength <= MIN_FEATURE_CURVE_LENGTH) {
        continue;
      }

      const lineGroup = findLineGroupInCurves(overlapResult.floorCurve, outerLoopCurves);
      if (!lineGroup) {
        continue;
      }

      const { featureCurve } = overlapResult;
      const hostLine = lineGroup.line;
      const hostLineRange = hostLine.getRange();
      const hostLineRangeLength = hostLineRange.getLength();
      const hostLineRangeMin = hostLineRange.min;

      const startParam = (hostLine.getParamAt(featureCurve.getStartPt()) - hostLineRangeMin) / hostLineRangeLength;
      const endParam = (hostLine.getParamAt(featureCurve.getEndPt()) - hostLineRangeMin) / hostLineRangeLength;
      const minParam = Math.min(startParam, endParam);
      const maxParam = Math.max(startParam, endParam);
      const centerParam = (minParam + maxParam) / 2;

      const hostInfo: FeatureHostInfo = {
        group: lineGroup.group,
        hostCurveIndex: lineGroup.index,
        openingIndex: FEATURE_OPENING_INDEX,
        posParam: {
          startParam: minParam,
          endParam: maxParam,
          centerParam
        },
        feature: overlapResult.feature,
        openingFloorOverlapCurve: overlapResult.featureCurve,
        contentType: 'feature',
        categoryId: 'feature-category',
        hostCurveLength: hostLine.getLength(),
        linkRoomType: 'none',
        zBottom: DEFAULT_Z_BOTTOM,
        zTop: DEFAULT_Z_TOP,
        openingType: 'feature'
      };

      validHostInfos.push(hostInfo);
    }

    return validHostInfos;
  }

  private _isFeatureIntersectForbiddenArea(feature: Feature): boolean {
    return this.forbiddenAreaLoops.some((forbiddenLoop) => {
      const positionType = MathAlg.PositionJudge.loopToLoop(
        forbiddenLoop,
        feature.selfPolygon.outerLoop,
        Tolerance.LENGTH_EPS,
        true
      );
      return positionType !== MathAlg.LoopLoopPositonType.OUT;
    });
  }
}