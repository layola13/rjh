import { Sketch2dBuilder } from './Sketch2dBuilder';
import { Face2d } from './Face2d';
import { Util } from '../utils/Util';

interface ChangeBackgroundOptions {
  forceChangeBackground?: boolean;
  keepBackgroundCurve?: boolean;
}

interface BackgroundInfo {
  curveInfos: unknown[];
}

interface Background {
  isSameBackground(other: Background): boolean;
  toDiscretePolygons(): Array<{ outer: unknown }>;
}

export class MixpaintBuilder extends Sketch2dBuilder {
  private background!: Background;

  constructor(initialData: unknown) {
    super(initialData);
  }

  createFace(param1: unknown, param2: unknown): Face2d {
    const face = new Face2d();
    face.init(param1, param2);
    this._addEntity(face);
    return face;
  }

  check(polygons: unknown[], targetArea: number): boolean {
    let totalOuterArea = 0;
    for (let i = 0; i < polygons.length; ++i) {
      totalOuterArea += Util.getOuterArea(polygons[i]);
    }
    return Math.abs(totalOuterArea) > Math.abs(0.8 * targetArea) || targetArea < 0.1;
  }

  changeBackground(newBackground: Background, options?: ChangeBackgroundOptions): boolean {
    if ((!options || !options.forceChangeBackground) && this.background.isSameBackground(newBackground)) {
      return false;
    }

    this.background = newBackground;
    this.sketch2d.background = newBackground;

    let totalBackgroundArea = 0;
    newBackground.toDiscretePolygons().forEach((polygon) => {
      totalBackgroundArea += GeLib.PolygonUtils.getArea(polygon.outer);
    });

    const largestBackgroundFace = this._getLargestBackgroundFace();
    const existingCurves = largestBackgroundFace ? largestBackgroundFace.getAllCurves() : [];

    this.preBuild();

    const { curveInfos } = this.getBackgroundInfo();
    this.addCurvesFromInfos(curveInfos, false);

    if (!options || !options.keepBackgroundCurve) {
      this._removeNoBackgroundCurve(existingCurves);
    }

    this._removeOutsideCurves();
    this.tryMergeReduntPoints();

    const updatedFaces = this.updateFacesFromNoCrossCurves();

    if (totalBackgroundArea && !this.check(updatedFaces, totalBackgroundArea)) {
      this.sketch2d.faces = [];
      this.postBuild();
      return true;
    }

    this.sketch2d.faces = updatedFaces;
    this.postBuild();
    return true;
  }

  protected _addEntity(entity: Face2d): void {
    // Implementation inherited from parent or to be defined
  }

  protected _getLargestBackgroundFace(): { getAllCurves(): unknown[] } | null {
    // Implementation to be defined
    return null;
  }

  protected preBuild(): void {
    // Implementation to be defined
  }

  protected getBackgroundInfo(): BackgroundInfo {
    // Implementation to be defined
    return { curveInfos: [] };
  }

  protected addCurvesFromInfos(curveInfos: unknown[], flag: boolean): void {
    // Implementation to be defined
  }

  protected _removeNoBackgroundCurve(curves: unknown[]): void {
    // Implementation to be defined
  }

  protected _removeOutsideCurves(): void {
    // Implementation to be defined
  }

  protected tryMergeReduntPoints(): void {
    // Implementation to be defined
  }

  protected updateFacesFromNoCrossCurves(): unknown[] {
    // Implementation to be defined
    return [];
  }

  protected postBuild(): void {
    // Implementation to be defined
  }
}