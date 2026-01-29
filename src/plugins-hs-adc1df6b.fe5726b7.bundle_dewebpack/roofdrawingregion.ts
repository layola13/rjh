import { HSApp } from './HSApp';
import { RoofDrawingRegionSketch } from './RoofDrawingRegionSketch';

interface SVGGroups {
  [key: string]: SVGGElement;
}

interface FaceInteractiveModel {
  getFaceInteractiveModel(): FaceInteractiveModel | undefined;
}

interface ChildItem {
  entity: unknown;
  getFaceInteractiveModel?(): FaceInteractiveModel | undefined;
}

export class RoofDrawingRegion extends HSApp.View.SVG.Base.Display2D {
  private _svgGroups?: SVGGroups;

  constructor(
    context: unknown,
    entity: unknown,
    group: unknown,
    options: unknown
  ) {
    super(context, entity, group, options);
  }

  init(svgGroups: SVGGroups): void {
    super.init([]);
    this._svgGroups = svgGroups;
    this._initRegionSketch();
  }

  onCleanup(): void {
    super.onCleanup([]);
    this._svgGroups = undefined;
  }

  private _initRegionSketch(): void {
    const entity = this.entity as any;
    const interactiveSketch = new HSApp.ExtraordinarySketch2d.InteractiveSketch(
      entity.getSketch(),
      entity.getBuilder()
    );
    const regionSketch = new RoofDrawingRegionSketch(
      this.context,
      this,
      this.group,
      interactiveSketch
    );
    regionSketch.init(entity, this._svgGroups);
    this.addChild(regionSketch);
  }

  getFaceInteractiveModel(): FaceInteractiveModel | undefined {
    for (const childItem of this.childItems as ChildItem[]) {
      if (childItem.entity instanceof HSApp.ExtraordinarySketch2d.InteractiveModel) {
        return childItem.getFaceInteractiveModel?.();
      }
    }
    return undefined;
  }
}