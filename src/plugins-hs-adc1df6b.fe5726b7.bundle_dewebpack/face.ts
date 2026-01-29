import { HSApp } from './HSApp';
import { HSCore } from './HSCore';

interface PolygonStyleAttributes {
  'stroke-width': number;
  fill: string;
  opacity: number;
  'vector-effect': string;
  stroke?: string;
}

interface PolygonStyles {
  transparent: PolygonStyleAttributes;
  normal: PolygonStyleAttributes;
  selected: PolygonStyleAttributes;
  hover: PolygonStyleAttributes;
}

interface PolygonElement {
  polygon: any;
  mask: any;
}

export class Face extends HSApp.View.SVG.ExtraordinarySketch2d.Face2d {
  private _polygonStyle?: PolygonStyles;

  constructor(
    entity: any,
    context: any,
    sketch: any,
    model: any
  ) {
    super(entity, context, sketch, model, new Face2dController(model, entity));
  }

  protected _createPolygonElement(pathData: string): PolygonElement {
    const ctx = this.context;
    const includesFaceTag = this.entity.srcModel.topos.includes(
      HSCore.Model.OutdoorDrawingSketch2dBuilder.FaceTopoTag
    );

    return {
      polygon: includesFaceTag
        ? ctx.path(pathData).attr(this.polygonStyle.normal)
        : ctx.path(pathData).attr(this.polygonStyle.transparent),
      mask: ctx.path(pathData).attr(this.maskStyle.transparent)
    };
  }

  protected _updatePolygonStyle(): void {
    const entity = this.entity;
    
    if (!entity.srcModel.topos.includes(HSCore.Model.OutdoorDrawingSketch2dBuilder.FaceTopoTag)) {
      return;
    }

    const polygonElement = this.element[0];

    if (entity.isFlagOn(HSCore.Model.EntityFlagEnum.selected)) {
      polygonElement.attr(this.polygonStyle.selected);
    } else if (entity.isFlagOn(HSCore.Model.ExSketchFlagEnum.hoverOn)) {
      polygonElement.attr(this.polygonStyle.hover);
    } else {
      polygonElement.attr(this.polygonStyle.normal);
    }
  }

  get polygonStyle(): PolygonStyles {
    if (!this._polygonStyle) {
      this._polygonStyle = {
        transparent: {
          'stroke-width': 0,
          fill: '#EDF1E8',
          opacity: 1,
          'vector-effect': 'non-scaling-stroke'
        },
        normal: {
          'stroke-width': 0,
          fill: '#EDF1E8',
          opacity: 1,
          'vector-effect': 'non-scaling-stroke'
        },
        selected: {
          'stroke-width': 0,
          stroke: '#396EFE',
          fill: '#fff',
          opacity: 0,
          'vector-effect': 'non-scaling-stroke'
        },
        hover: {
          'stroke-width': 0,
          stroke: '#3DFFF2',
          fill: '#fff',
          opacity: 0,
          'vector-effect': 'non-scaling-stroke'
        }
      };
    }
    return this._polygonStyle;
  }

  onFlagChanged(flag: number): void {
    super.onFlagChanged(flag);
    this._syncPointsFlag(flag);
  }

  private _syncPointsFlag(flag: number): void {
    const entity = this.entity;

    if (entity.srcModel.topos.length > 0) {
      return;
    }

    const isHoverOrSelected =
      flag === HSCore.Model.ExSketchFlagEnum.hoverOn ||
      flag === HSCore.Model.EntityFlagEnum.selected;

    if (!isHoverOrSelected) {
      return;
    }

    const sketch = entity.sketch;
    let drivenFlag = 0;

    if (flag === HSCore.Model.EntityFlagEnum.selected) {
      drivenFlag = HSCore.Model.ExSketchFlagEnum.selectedDriven;
    } else if (flag === HSCore.Model.ExSketchFlagEnum.hoverOn) {
      drivenFlag = HSCore.Model.ExSketchFlagEnum.hoverOnDriven;
    }

    const isFlagOn = entity.isFlagOn(flag);
    const faces = [entity.srcModel];
    const edges = HSCore.Util.ExtraordinarySketch2d.getAllEdgesFromFaces(faces);
    const backgroundEdges = HSCore.Util.ExtraordinarySketch2d.getAllEdgesFromFaces(faces, true)
      .filter(edge => edge.topos.includes('background'));
    const points = HSCore.Util.ExtraordinarySketch2d.getAllPointsFromEdges(backgroundEdges);

    const allElements = [...edges, ...points];

    allElements
      .map(element => sketch.findMapModel(element))
      .forEach(mappedEntity => {
        if (isFlagOn) {
          mappedEntity.setFlagOn(drivenFlag, true);
        } else {
          mappedEntity.setFlagOff(drivenFlag, true);
        }
      });
  }
}

class Face2dController extends HSApp.View.SVG.ExtraordinarySketch2d.Face2dController {
  protected _getMoveCmdType(): string {
    return HSFPConstants.CommandType.OutdoorDrawing.MoveFaces;
  }
}