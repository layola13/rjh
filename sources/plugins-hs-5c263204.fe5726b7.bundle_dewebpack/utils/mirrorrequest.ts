import { HSCore } from './HSCore';

interface MirrorTargets {
  layers: any[];
  slabs: any[];
  walls: any[];
  structures: any[];
  beams: any[];
  sketchmodels: any[];
  parametricopenings: any[];
  faces: Set<any>;
  openings: any[];
  contents: any[];
  auxiliaryLines: any[];
}

interface MirrorInfo {
  transLen: number;
  [key: string]: any;
}

interface MirrorRequestOptions {
  floorplan: any;
  direction: string;
}

export class MirrorRequest extends HSCore.Transaction.Common.StateRequest {
  private _floorplan: any;
  private _direction: string;
  private _targets: MirrorTargets;
  private _mirrorInfo: MirrorInfo;

  constructor(options: MirrorRequestOptions, mirrorInfo: MirrorInfo) {
    super();
    this._floorplan = options.floorplan;
    this._direction = options.direction;
    this._mirrorInfo = mirrorInfo;
    this._reset();
  }

  onCommit(): void {
    const layers = Object.values(this._floorplan.scene.layers);
    HSCore.Util.FaceMoldingFitHelper.getInstance().startListening(layers);
    this.mirror(this._mirrorInfo);
    HSCore.Util.FaceMoldingFitHelper.getInstance().autoFit();
    super.onCommit([]);
  }

  onUndo(): void {
    super.onUndo([]);
    this.refreshParametricModel();
  }

  onRedo(): void {
    super.onRedo([]);
    this.refreshParametricModel();
  }

  canTransactField(): boolean {
    return true;
  }

  private _reset(): void {
    this._targets = {
      layers: [],
      slabs: [],
      walls: [],
      structures: [],
      beams: [],
      sketchmodels: [],
      parametricopenings: [],
      faces: new Set(),
      openings: [],
      contents: [],
      auxiliaryLines: []
    };
  }

  private _load(): void {
    this._reset();

    this._floorplan.scene.forEachLayer((layer: any) => {
      this._targets.layers.push(layer);
    });

    this._floorplan.forEachSlab((slab: any) => {
      this._targets.slabs.push(slab);
    });

    this._floorplan.forEachWall((wall: any) => {
      this._targets.walls.push(wall);
    });

    this._floorplan.forEachStructure((structure: any) => {
      this._targets.structures.push(structure);
    });

    this._floorplan.forEachBeam((beam: any) => {
      this._targets.beams.push(beam);
    });

    this._targets.layers.forEach((layer: any) =>
      Object.values(layer.faces).forEach((face: any) =>
        this._targets.faces.add(face)
      )
    );

    this._floorplan.forEachOpening((opening: any) => {
      this._targets.openings.push(opening);
    });

    this._floorplan.forEachParametricOpenings((parametricOpening: any) => {
      this._targets.parametricopenings.push(parametricOpening);
    });

    this._floorplan.forEachContent((content: any) => {
      if (
        content.Class !== HSConstants.ModelClass.DAssembly &&
        content.Class !== HSConstants.ModelClass.DContent &&
        content.Class !== HSConstants.ModelClass.DExtruding &&
        content.Class !== HSConstants.ModelClass.DMolding &&
        content.Class !== HSConstants.ModelClass.DSweep &&
        !(content._host instanceof HSCore.Model.PAssembly) &&
        !(content._host instanceof HSCore.Model.PContent) &&
        !(content._host instanceof HSCore.Model.Content)
      ) {
        if (content instanceof HSCore.Model.NCustomizedSketchModel) {
          this._targets.sketchmodels.push(content);
        } else {
          this._targets.contents.push(content);
        }
      }
    });

    this._targets.layers.forEach((layer: any) => {
      Object.values(layer.children).forEach((child: any) => {
        if (child instanceof HSCore.Model.AuxiliaryLine) {
          this._targets.auxiliaryLines.push(child);
        }
      });
    });
  }

  mirror(mirrorInfo: MirrorInfo): boolean {
    if (
      ![
        HSCore.Model.MirrorType.Horizontal,
        HSCore.Model.MirrorType.Vertical
      ].includes(this._direction as any)
    ) {
      return false;
    }

    this._load();

    if (mirrorInfo.transLen !== Infinity) {
      this._targets.layers.forEach((layer: any) => {
        layer.mirror(mirrorInfo);
      });

      this._targets.slabs.forEach((slab: any) => {
        slab.mirror(mirrorInfo);
      });

      this._targets.walls.forEach((wall: any) => {
        wall.mirror(mirrorInfo);
      });

      this._targets.structures.forEach((structure: any) => {
        structure.mirror(mirrorInfo);
      });

      this._targets.beams.forEach((beam: any) => {
        beam.mirror(mirrorInfo);
      });

      this._targets.faces.forEach((face: any) => {
        face.mirror(mirrorInfo);
      });

      this._targets.sketchmodels.forEach((sketchmodel: any) => {
        sketchmodel.mirror(mirrorInfo);
      });

      this._targets.openings.forEach((opening: any) => {
        opening.mirror(mirrorInfo);
      });

      this._targets.parametricopenings.forEach((parametricOpening: any) => {
        parametricOpening.mirror(mirrorInfo);
      });

      this._targets.contents.forEach((content: any) => {
        content.mirror(mirrorInfo);
      });

      this.flagMirrorBuilding(true);

      this._floorplan.scene.forEachLayer((layer: any) => {
        layer.roomBuilder.build({
          spaceOptions: {
            splitData: {}
          }
        });
      });

      this.flagMirrorBuilding(false);

      this._targets.auxiliaryLines.forEach((auxiliaryLine: any) => {
        auxiliaryLine.mirror(mirrorInfo);
      });

      this._targets.layers.forEach((layer: any) => {
        Object.values(layer.faces).forEach((face: any) => {
          face.holes = face.holes.filter((hole: any) => {
            return hole.type !== HSCore.Model.FaceHoleType.OpeningHole;
          });
        });

        const holes = layer.prev?.holeBuilder.holes
          .map((hole: any) => hole.source)
          .filter((source: any) =>
            HSCore.Util.Opening.isOpeningPartialInLayer(source, layer)
          );

        layer.holeBuilder.buildAllWallHole(holes);
        layer.holeBuilder.buildAllSlabHole();
      });

      return true;
    }

    return false;
  }

  flagMirrorBuilding(isMirrorBuilding: boolean): void {
    this._floorplan.scene.forEachLayer((layer: any) => {
      layer.roomBuilder.mirrorBuilding = isMirrorBuilding;
    });
  }

  refreshParametricModel(): void {
    this._floorplan.forEachContent((content: any) => {
      if (content instanceof HSCore.Model.NCustomizedParametricModel) {
        content.initModelDocument(content.parameters);
      }
    });
  }

  getDescription(): string {
    const directionText = this._direction === 'horizontal' ? '左右' : '上下';
    return `户型${directionText}翻转`;
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ViewOperation;
  }
}