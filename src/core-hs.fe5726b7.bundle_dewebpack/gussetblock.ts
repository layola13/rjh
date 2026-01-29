import { Entity } from './Entity';
import { FreePatternBlock } from './FreePatternBlock';
import * as THREE from 'three';

interface Point2D {
  x: number;
  y: number;
}

interface BoundingBox2D {
  min: { x: number; y: number };
  max: { x: number; y: number };
}

interface BlockMetaData {
  attrBaseline?: number;
  ZLength: number;
}

export class GussetBlock extends FreePatternBlock {
  private _viewTranslation: THREE.Vector3;
  private _viewRotation: THREE.Quaternion;
  private _viewScale: THREE.Vector3;

  constructor(id: string = '', parent?: unknown) {
    super(id, parent);
    this._viewTranslation = new THREE.Vector3();
    this._viewRotation = new THREE.Quaternion();
    this._viewScale = new THREE.Vector3(1, 1, 1);
  }

  /**
   * Calculate the thickness of the gusset block
   */
  getThickness(metaData?: BlockMetaData): number {
    const data = metaData || this.getMetaData();
    return data.attrBaseline === undefined 
      ? data.ZLength 
      : 0.001 * data.attrBaseline;
  }

  /**
   * Calculate the local center point of the gusset block
   */
  getLocalCenter(): THREE.Vector3 | undefined {
    const points = this.points;
    if (!points || points.length === 0) {
      return undefined;
    }

    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;

    for (let i = 0, len = points.length; i < len; ++i) {
      const point = points[i];
      if (point.x < minX) {
        minX = point.x;
      }
      if (point.y < minY) {
        minY = point.y;
      }
    }

    const pavingPoint = this._pavingOption.point;
    return new THREE.Vector3(minX + pavingPoint.x, minY + pavingPoint.y, 0);
  }

  /**
   * Get metadata for this block from the parent pattern
   */
  getMetaData(): BlockMetaData | undefined {
    return this.pattern?.getChildBlockMetaData();
  }

  /**
   * Factory method to create a GussetBlock from a set of points
   */
  static create(points: Point2D[]): GussetBlock {
    const block = new GussetBlock();
    block.points = points.map(point => ({ x: point.x, y: point.y }));
    block.originPoints = points.map(point => ({ x: point.x, y: point.y }));
    return block;
  }

  copyFrom(source: GussetBlock): void {
    super.copyFrom(source);
  }

  clone(): GussetBlock {
    const cloned = new GussetBlock();
    cloned.copyFrom(this);
    return cloned;
  }

  get viewTranslation(): THREE.Vector3 {
    return this._viewTranslation;
  }

  get viewRotation(): THREE.Quaternion {
    return this._viewRotation;
  }

  get viewScale(): THREE.Vector3 {
    return this._viewScale;
  }

  /**
   * Calculate the center relative to a bounding box
   */
  getRelativeCenter(checkBounds: boolean, boundingBox?: BoundingBox2D): THREE.Vector3 | undefined {
    const localCenter = this.getLocalCenter();
    if (!localCenter || !boundingBox) {
      return localCenter;
    }

    const isPointInBounds = (x: number, y: number, box: BoundingBox2D): boolean => {
      const min = box.min;
      const max = box.max;
      return x >= min.x && x <= max.x && y >= min.y && y <= max.y;
    };

    if (checkBounds && !isPointInBounds(localCenter.x, localCenter.y, boundingBox)) {
      const points = this.points;
      if (!points || points.length < 3) {
        return undefined;
      }

      const midX = 0.5 * (points[0].x + points[2].x);
      const midY = 0.5 * (points[0].y + points[2].y);
      if (!isPointInBounds(midX, midY, boundingBox)) {
        return undefined;
      }
    }

    localCenter.x -= boundingBox.min.x;
    localCenter.y -= boundingBox.min.y;
    return localCenter;
  }

  /**
   * Set the view transformation for rendering
   */
  setViewTransfrom(position: Point2D, isFlipped: boolean, metaData?: BlockMetaData): void {
    const data = metaData || this.getMetaData();
    const thickness = this.getThickness(data);
    const halfPi = 0.5 * Math.PI;
    const rotation = this.rotationAngle;
    const rotationMatrix = new THREE.Matrix4();
    const translation = this._viewTranslation;

    if (isFlipped) {
      translation.z = thickness - 0.5 * data.ZLength;
      rotationMatrix.makeRotationX(-halfPi);
      if (rotation !== 0) {
        rotationMatrix.multiply(new THREE.Matrix4().makeRotationY(-rotation));
      }
    } else {
      translation.z = 0.5 * data.ZLength - thickness;
      rotationMatrix.makeRotationX(halfPi);
      if (rotation !== 0) {
        rotationMatrix.multiply(new THREE.Matrix4().makeRotationY(rotation));
      }
    }

    translation.x = position.x;
    translation.y = position.y;
    this._viewRotation.setFromRotationMatrix(rotationMatrix);
  }
}

Entity.registerClass(HSConstants.ModelClass.GussetBlock, GussetBlock);