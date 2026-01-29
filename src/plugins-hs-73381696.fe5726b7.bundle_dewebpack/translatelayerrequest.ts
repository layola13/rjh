import { HSCore } from './HSCore';
import { isLayerSlabsEdited } from './utils';

interface TranslationTargets {
  layer: HSCore.Model.Layer | undefined;
  slabs: HSCore.Model.FloorSlab[];
  walls: HSCore.Model.Wall[];
  structures: HSCore.Model.Structure[];
  beams: HSCore.Model.Beam[];
  sketchmodels: HSCore.Model.NCustomizedSketchModel[];
  parametricopenings: HSCore.Model.ParametricOpening[];
  faces: Set<HSCore.Model.Face>;
  openings: HSCore.Model.Opening[];
  contents: HSCore.Model.Content[];
  dcontents: Array<
    | HSCore.Model.DAssembly
    | HSCore.Model.DContent
    | HSCore.Model.DExtruding
    | HSCore.Model.DHole
    | HSCore.Model.DWindow
    | HSCore.Model.DSweep
  >;
  auxiliaryLines: HSCore.Model.AuxiliaryLine[];
}

interface Point2D {
  x: number;
  y: number;
}

export class TranslateLayerRequest extends HSCore.Transaction.Common.StateRequest {
  public targetLayer: HSCore.Model.Layer;
  public sketch2d: unknown;
  public offset: Point2D;
  private _targets: TranslationTargets | undefined;
  private _floorplan: HSCore.Model.Floorplan;

  constructor(
    floorplan: HSCore.Model.Floorplan,
    targetLayer: HSCore.Model.Layer,
    offset: Point2D
  ) {
    super();
    this.targetLayer = targetLayer;
    this.offset = offset;
    this._floorplan = floorplan;
  }

  public doRequest(): void {
    this._reset();
    this._collect();
    this._translate();
  }

  private _reset(): void {
    this._targets = {
      layer: undefined,
      slabs: [],
      walls: [],
      structures: [],
      beams: [],
      sketchmodels: [],
      parametricopenings: [],
      faces: new Set(),
      openings: [],
      contents: [],
      dcontents: [],
      auxiliaryLines: [],
    };
  }

  private _collect(): void {
    if (!this._targets) return;

    this._targets.layer = this.targetLayer;
    this._targets.slabs.push(...Object.values(this.targetLayer.floorSlabs));

    this.targetLayer.forEachWall((wall: HSCore.Model.Wall) => {
      this._targets!.walls.push(wall);
    });

    this.targetLayer.forEachStructure((structure: HSCore.Model.Structure) => {
      this._targets!.structures.push(structure);
    });

    this.targetLayer.forEachBeam((beam: HSCore.Model.Beam) => {
      this._targets!.beams.push(beam);
    });

    Object.values(this.targetLayer.faces).forEach((face: HSCore.Model.Face) => {
      this._targets!.faces.add(face);
    });

    this.targetLayer.forEachOpening((opening: HSCore.Model.Opening) => {
      this._targets!.openings.push(opening);
    });

    this.targetLayer.forEachParametricOpening((opening: HSCore.Model.ParametricOpening) => {
      this._targets!.parametricopenings.push(opening);
    });

    this.targetLayer.forEachContent((content: HSCore.Model.Content) => {
      if (
        content instanceof HSCore.Model.DAssembly ||
        content instanceof HSCore.Model.DContent ||
        content instanceof HSCore.Model.DExtruding ||
        content instanceof HSCore.Model.DHole ||
        content instanceof HSCore.Model.DWindow ||
        content instanceof HSCore.Model.DSweep
      ) {
        if (content.parent instanceof HSCore.Model.Layer) {
          this._targets!.dcontents.push(content);
        }
      } else {
        if (
          content.host instanceof HSCore.Model.PAssembly ||
          content.host instanceof HSCore.Model.PContent ||
          content.host instanceof HSCore.Model.Content
        ) {
          // Skip hosted content
        } else if (content instanceof HSCore.Model.NCustomizedSketchModel) {
          this._targets!.sketchmodels.push(content);
        } else {
          this._targets!.contents.push(content);
        }

        if (content.host instanceof HSCore.Model.NCustomizedCeilingModel) {
          content.host = null;
          this._targets!.contents.push(content);
        }
      }
    });

    Object.values(this._targets.layer.children).forEach((child: unknown) => {
      if (child instanceof HSCore.Model.AuxiliaryLine) {
        this._targets!.auxiliaryLines.push(child);
      }
    });
  }

  private _isLayerSlabsEdited(): boolean {
    return this._targets?.layer ? isLayerSlabsEdited(this._targets.layer) : false;
  }

  private _translate(): boolean {
    if (!this._targets) return false;

    const offset = this.offset;

    if (this._isLayerSlabsEdited() && this._targets.layer) {
      new HSCore.Model.Geom.SplitHelper(this._targets.layer).reset(true);
    }

    this._targets.layer?.translate(offset);
    this._targets.layer?.slabBuilder.translate(offset);

    this._targets.walls.forEach((wall) => {
      wall.translate(offset);
    });

    this._targets.structures.forEach((structure) => {
      structure.translate(offset);
    });

    this._targets.beams.forEach((beam) => {
      beam.translate(offset);
    });

    this._targets.faces.forEach((face) => {
      face.translate(offset);
    });

    this._targets.sketchmodels.forEach((model) => {
      if (model instanceof HSCore.Model.NCustomizedCeilingModel) {
        model.parent.removeChild(model);
      } else if (
        model instanceof HSCore.Model.NCustomizedBackgroundWall ||
        model instanceof HSCore.Model.NCustomizedPlatform
      ) {
        model.x += offset.x;
        model.y += offset.y;
      }
    });

    this._targets.openings.forEach((opening) => {
      opening.translate(offset);
    });

    this._targets.parametricopenings.forEach((opening) => {
      opening.translate(offset);
    });

    this._targets.contents.forEach((content) => {
      content.translate(offset);
    });

    this._targets.dcontents.forEach((dcontent) => {
      dcontent.x += offset.x;
      dcontent.y += offset.y;
    });

    this._rebuildTargetLayer();

    this._targets.auxiliaryLines.forEach((line) => {
      line.translate(offset);
    });

    Object.values(this._targets.layer!.faces).forEach((face: HSCore.Model.Face) => {
      face.holes = face.holes.filter((hole: HSCore.Model.FaceHole) => {
        return hole.type !== HSCore.Model.FaceHoleType.OpeningHole;
      });
    });

    const crossLayerOpenings = this._targets.layer!.holeBuilder.holes
      .map((hole) => hole.source)
      .filter((source) => HSCore.Util.Opening.isCrossLayerOpening(source));

    this._targets.layer!.holeBuilder.buildAllWallHole(crossLayerOpenings);
    this._targets.layer!.holeBuilder.buildAllSlabHole();
    HSCore.Util.Opening.buildOpeningsInRelevantLayers(crossLayerOpenings, [this._targets.layer!]);

    return true;
  }

  public refreshParametricModel(): void {
    this.targetLayer.forEachContent((content: HSCore.Model.Content) => {
      if (content instanceof HSCore.Model.NCustomizedParametricModel) {
        content.initModelDocument(content.parameters);
      }
    });
  }

  private _rebuildTargetLayer(): void {
    const roomBuilder = this.targetLayer.roomBuilder;
    roomBuilder.mirrorBuilding = true;
    roomBuilder.build({
      spaceOptions: {
        splitData: {},
      },
    });
    roomBuilder.mirrorBuilding = false;
  }

  public onCommit(): void {
    const layers = Object.values(this._floorplan.scene.layers);
    HSCore.Util.FaceMoldingFitHelper.getInstance().startListening(layers);
    this.doRequest();
    HSCore.Util.FaceMoldingFitHelper.getInstance().autoFit();
    super.onCommit();
  }

  public onUndo(): void {
    super.onUndo();
    this.refreshParametricModel();
    HSApp.App.getApp().selectionManager.unselectAll();
  }

  public onRedo(): void {
    super.onRedo();
    this.refreshParametricModel();
    HSApp.App.getApp().selectionManager.unselectAll();
  }

  public canTransactField(): boolean {
    return true;
  }

  public getDescription(): string {
    return '平移楼层';
  }

  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.LayerOperation;
  }
}