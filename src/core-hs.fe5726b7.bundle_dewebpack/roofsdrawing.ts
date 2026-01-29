import { EntityField } from './decorators';
import { Entity, Entity_IO } from './Entity';
import { ExtraordinaryGuideline } from './ExtraordinaryGuideline';
import { RoofDrawingRegion } from './RoofDrawingRegion';
import { RoofsDrawingSketch2dBuilder } from './RoofsDrawingSketch2dBuilder';
import { Loader } from './Loader';

interface GuidelineData {
  c: unknown;
  f: unknown;
  e: unknown;
  t: unknown;
}

interface SketchData {
  background: unknown;
  faces: unknown[];
  guidelines: ExtraordinaryGuideline[];
}

interface SerializedData {
  gls?: GuidelineData[];
}

interface DumpOptions {
  [key: string]: unknown;
}

class RoofsDrawingIO extends Entity_IO {
  dump(
    entity: RoofsDrawing,
    metadata?: unknown,
    includeChildren: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    const result = super.dump(entity, undefined, includeChildren, options);
    const serializedData = result[0] as SerializedData;

    if (entity.bkgSketchData?.guidelines.length) {
      serializedData.gls = entity.bkgSketchData.guidelines.map((guideline) => {
        return {
          c: guideline.curve.dump(),
          f: guideline.fromAnchor,
          e: guideline.endAnchor,
          t: guideline.type
        };
      });
    }

    return result;
  }

  load(entity: RoofsDrawing, data: SerializedData, context: unknown): void {
    super.load(entity, data, context);

    if (data.gls) {
      const guidelines = data.gls.map((guidelineData) =>
        ExtraordinaryGuideline.create(
          Loader.load(guidelineData.c),
          guidelineData.f,
          guidelineData.e,
          guidelineData.t
        )
      );

      const sketchData: SketchData = {
        background: RoofsDrawingSketch2dBuilder.createSuperLargeBackground(),
        faces: [],
        guidelines
      };

      Entity_IO.setEntityFields(entity, {
        bkgSketchData: sketchData
      });
    }
  }
}

export class RoofsDrawing extends Entity {
  @EntityField()
  bkgSketchData?: SketchData;

  private _bkgSketchBuilder?: RoofsDrawingSketch2dBuilder;

  getIO(): Entity_IO {
    return RoofsDrawingIO.instance();
  }

  destroy(): void {
    super.destroy();
    this.clearBuilder();
  }

  getBuilder(): RoofsDrawingSketch2dBuilder {
    if (!this._bkgSketchBuilder) {
      this._bkgSketchBuilder = new RoofsDrawingSketch2dBuilder(this);
    }
    return this._bkgSketchBuilder;
  }

  clearBuilder(): void {
    this._bkgSketchBuilder = undefined;
  }

  get drawingRegions(): RoofDrawingRegion[] {
    return Object.values(this._children).filter(
      (child): child is RoofDrawingRegion => child instanceof RoofDrawingRegion
    );
  }

  getSketch(): SketchData {
    if (!this.bkgSketchData) {
      this.bkgSketchData = {
        background: RoofsDrawingSketch2dBuilder.createSuperLargeBackground(),
        faces: [],
        guidelines: []
      };
    }
    return this.bkgSketchData;
  }

  setSketch(sketchData: SketchData): void {
    this.bkgSketchData = sketchData;
  }

  updateSketch(sketchData: SketchData): void {
    this.bkgSketchData = { ...sketchData };
  }

  getDrawingRegionByRoofId(roofId: unknown): RoofDrawingRegion | undefined {
    return this.drawingRegions.find((region) => region.roofId === roofId);
  }

  initDrawingRegionsByRoofs(roofs: unknown[]): void {
    roofs.forEach((roof) => {
      const region = new RoofDrawingRegion();
      region.initByRoof(roof);
      if (region.isValid()) {
        this.addChild(region);
      }
    });
  }

  isValid(): boolean {
    return !!(this.bkgSketchData?.guidelines.length);
  }
}

Entity.registerClass(HSConstants.ModelClass.RoofsDrawing, RoofsDrawing);