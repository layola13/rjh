import { EntityField } from './decorators';
import { Entity } from './Entity';
import { RoofsDrawingSketch2dBuilder, Sketch2dData, RegionDefinition, CurveSegment } from './RoofsDrawingSketch2dBuilder';
import { NCustomizedParametricRoof } from './NCustomizedParametricRoof';
import { Unit } from './Unit';

interface RoofParameters {
  roomLoop?: {
    isEmpty(): boolean;
    getAllCurves(): Array<{ clone(): any; scale(factor: number): any }>;
    isAnticlockwise(): boolean;
  };
}

export class RoofDrawingRegion extends Entity {
  @EntityField()
  private _sketchData?: Sketch2dData;

  @EntityField()
  private _roofId: string = "";

  private _sketchBuilder?: RoofsDrawingSketch2dBuilder;

  needDump(): boolean {
    return false;
  }

  destroy(): void {
    super.destroy();
    this.clearBuilder();
  }

  get roofId(): string {
    return this._roofId;
  }

  set roofId(value: string) {
    this._roofId = value;
  }

  get roof(): NCustomizedParametricRoof | undefined {
    const entity = this._roofId ? this._doc.getEntityById(this._roofId) : undefined;
    return entity && entity instanceof NCustomizedParametricRoof ? entity : undefined;
  }

  get outerLoop(): any {
    const face = this._sketchData?.faces[0];
    if (face) {
      return face.toMathPolygon().getLoops()[0];
    }
  }

  getBuilder(): RoofsDrawingSketch2dBuilder {
    if (!this._sketchBuilder) {
      this._sketchBuilder = new RoofsDrawingSketch2dBuilder(this);
    }
    return this._sketchBuilder;
  }

  clearBuilder(): void {
    this._sketchBuilder = undefined;
  }

  getSketch(): Sketch2dData {
    if (!this._sketchData) {
      this._sketchData = {
        background: RoofsDrawingSketch2dBuilder.createSuperLargeBackground(),
        faces: [],
        guidelines: []
      };
    }
    return this._sketchData;
  }

  setSketch(sketch: Sketch2dData): void {
    this._sketchData = sketch;
  }

  updateSketch(sketch: Sketch2dData): void {
    this._sketchData = { ...sketch };
  }

  initByRoof(roof: NCustomizedParametricRoof): void {
    const { roomLoop } = roof.parameters as RoofParameters;
    
    if (!roomLoop || roomLoop.isEmpty()) {
      return;
    }

    const MM_TO_METER_SCALE = Unit.ConvertToMeter("mm", 1);
    const curveSegments: CurveSegment[] = roomLoop.getAllCurves().map((curve) => ({
      curve: curve.clone().scale(MM_TO_METER_SCALE)
    }));

    if (!roomLoop.isAnticlockwise()) {
      curveSegments.reverse();
    }

    const region: RegionDefinition = {
      outer: curveSegments,
      holes: [],
      topo: `-1_${RoofsDrawingSketch2dBuilder.RegionTopoTag}`
    };

    const builder = this.getBuilder();
    builder.addRegions([region]);
    builder.updateAppendix();
    this._roofId = roof.id;
  }

  isValid(): boolean {
    return this._sketchData?.faces.length === 1;
  }
}

Entity.registerClass(HSConstants.ModelClass.RoofDrawingRegion, RoofDrawingRegion);