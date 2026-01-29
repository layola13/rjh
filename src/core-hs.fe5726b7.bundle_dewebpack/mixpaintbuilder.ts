import { Sketch2dBuilder } from './Sketch2dBuilder';

interface ChangeBackgroundOptions {
  keepBackgroundCurve?: boolean;
}

interface BackgroundInfo {
  curveInfos: unknown[];
}

interface Mixpaint {
  backgroundMaterial: HSCore.Material.MaterialData;
}

interface Background {
  isSameBackground(other: Background): boolean;
}

interface Curve {
  // Add specific curve properties as needed
}

interface Face extends HSCore.Model.Polygon {
  material: HSCore.Material.MaterialData;
  getAllCurves(): Curve[];
}

export class MixpaintBuilder extends Sketch2dBuilder {
  private readonly mixpaint: Mixpaint;
  private defaultMaterial: HSCore.Material.MaterialData;

  constructor(mixpaint: Mixpaint, defaultMaterial: HSCore.Material.MaterialData) {
    super(mixpaint);
    this.defaultMaterial = defaultMaterial;
    this.mixpaint = mixpaint;
  }

  createFace(points: unknown, normal: unknown): HSCore.Model.Polygon {
    const polygon = new HSCore.Model.Polygon();
    polygon.init(points, normal);

    let material = this.defaultMaterial;
    material = this.defaultMaterial instanceof HSCore.Material.MaterialData
      ? material.clone()
      : HSCore.Material.MaterialData.create(this.defaultMaterial);

    polygon.setMaterial(material);
    this._addEntity(polygon);

    return polygon;
  }

  changeBackground(background: Background, options?: ChangeBackgroundOptions): boolean {
    if (this.background.isSameBackground(background)) {
      return false;
    }

    this.background = background;
    this.sketch2d.background = background;

    const largestFace = this._getLargestBackgroundFace();
    const previousCurves = largestFace ? largestFace.getAllCurves() : [];

    let newDefaultMaterial = this.mixpaint.backgroundMaterial;
    if (largestFace) {
      newDefaultMaterial = largestFace.material;
    }
    this.defaultMaterial = newDefaultMaterial;

    this.preBuild();

    const { curveInfos } = this.getBackgroundInfo();
    this.addCurvesFromInfos(curveInfos, false);

    if (!options?.keepBackgroundCurve) {
      this._removeNoBackgroundCurve(previousCurves);
    }

    this._removeOutsideCurves();
    this.tryMergeReduntPoints();
    this.sketch2d.faces = this.updateFacesFromNoCrossCurves();
    this.postBuild();

    return true;
  }

  protected _getLargestBackgroundFace(): Face | null {
    // Implementation inherited or to be implemented
    return null;
  }

  protected getBackgroundInfo(): BackgroundInfo {
    // Implementation inherited or to be implemented
    return { curveInfos: [] };
  }

  protected addCurvesFromInfos(curveInfos: unknown[], flag: boolean): void {
    // Implementation inherited or to be implemented
  }

  protected _removeNoBackgroundCurve(curves: Curve[]): void {
    // Implementation inherited or to be implemented
  }

  protected _removeOutsideCurves(): void {
    // Implementation inherited or to be implemented
  }

  protected tryMergeReduntPoints(): void {
    // Implementation inherited or to be implemented
  }

  protected updateFacesFromNoCrossCurves(): unknown[] {
    // Implementation inherited or to be implemented
    return [];
  }
}