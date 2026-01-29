import { Polygon } from './Polygon';

interface FloorContext {
  // Add specific properties based on your application's floor context
  [key: string]: unknown;
}

interface FeatureMatcher {
  matcher(polygon: Polygon, context: FloorContext): number[][];
}

interface Feature {
  fromPolygon: Polygon;
  toPolygon: Polygon;
}

type FeatureConstructor<T extends Feature> = new (
  fromPolygon: Polygon,
  matchedPolygon: Polygon,
  floorContext: FloorContext
) => T;

export class FeatureExtractor<T extends Feature> {
  private readonly featureClazz: FeatureConstructor<T> & FeatureMatcher;
  private readonly floorContext: FloorContext;

  constructor(
    featureClazz: FeatureConstructor<T> & FeatureMatcher,
    floorContext: FloorContext
  ) {
    this.featureClazz = featureClazz;
    this.floorContext = floorContext;
  }

  extractFrom(sourcePolygon: Polygon): T[] {
    let currentPolygon = sourcePolygon;
    let matchedPolygon = this._getMatchedPolygon(currentPolygon);
    const extractedFeatures: T[] = [];

    while (matchedPolygon) {
      const feature = new this.featureClazz(
        currentPolygon,
        matchedPolygon,
        this.floorContext
      );

      feature.toPolygon = feature.fromPolygon.cut(feature);

      if (feature.fromPolygon.area === feature.toPolygon.area) {
        console.error('fromPolygon cut out feature remains the same.');
        break;
      }

      currentPolygon = feature.toPolygon;
      extractedFeatures.push(feature);
      matchedPolygon = this._getMatchedPolygon(currentPolygon);
    }

    return extractedFeatures;
  }

  private _getMatchedPolygon(polygon: Polygon): Polygon | null {
    const matchedCoordinates = this.featureClazz.matcher(
      polygon,
      this.floorContext
    );
    return matchedCoordinates.length > 0
      ? new Polygon(matchedCoordinates)
      : null;
  }
}