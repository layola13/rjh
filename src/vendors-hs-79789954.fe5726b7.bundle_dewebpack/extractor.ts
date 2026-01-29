import { Loop, Vector2, Polygon } from './path-to-loop-module';

type NormalizeType = 'center' | 'centroid' | 'topLeft' | 'none';

interface Floor {
  _floorplan: unknown;
  worldRawPath2d: {
    outer: unknown;
  };
}

/**
 * Extractor class for normalizing floor plan coordinates
 */
export class Extractor {
  private floorPlan: unknown;
  private floor: Floor;
  private normalizeType: NormalizeType;
  private translate2D: Vector2;

  constructor(floor: Floor, normalizeType: NormalizeType = 'center') {
    this.floorPlan = floor._floorplan;
    this.floor = floor;
    this.normalizeType = normalizeType;
    
    const loop = new Loop(this.floor.worldRawPath2d.outer);
    this.translate2D = this._getTranslate2D(loop);
  }

  /**
   * Normalizes a vector by applying translation
   */
  normalize(vector: Vector2): Vector2 {
    return vector.translate(this.translate2D);
  }

  /**
   * Checks if normalization is needed
   */
  get needNormalize(): boolean {
    return this.normalizeType !== 'none';
  }

  /**
   * Calculates the translation vector based on normalize type
   */
  private _getTranslate2D(loop: Loop): Vector2 {
    const boundingBox = loop.getBoundingBox();
    
    switch (this.normalizeType) {
      case 'center': {
        const center = boundingBox.getCenter();
        return new Vector2(-center.x, -center.y);
      }
      case 'centroid': {
        const centroid = new Polygon(loop).getCentroidPoint();
        return new Vector2(-centroid.x, -centroid.y);
      }
      case 'topLeft':
        return new Vector2(-boundingBox.min.x, -boundingBox.max.y);
      default:
        return new Vector2(0, 0);
    }
  }
}