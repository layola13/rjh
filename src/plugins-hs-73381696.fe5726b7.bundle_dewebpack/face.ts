import { HSApp } from './HSApp';
import { HSCore } from './HSCore';

interface PolygonStyleConfig {
  'stroke-width': number;
  fill: string;
  opacity: number;
  'vector-effect': string;
  stroke?: string;
}

interface PolygonStyles {
  transparent: PolygonStyleConfig;
  normal: PolygonStyleConfig;
  selected: PolygonStyleConfig;
  hover: PolygonStyleConfig;
}

interface PolygonElement {
  polygon: any;
  mask: any;
}

export class Face extends HSApp.View.SVG.ExtraordinarySketch2d.Face2d {
  private _polygonStyle?: PolygonStyles;

  protected _createPolygonElement(pathData: string): PolygonElement {
    const context = this.context;
    const isHoleTopology = this.entity.srcModel.topos.includes(
      HSCore.Model.LayerSketch2dBuilder.HoleTopoTag
    );

    return {
      polygon: isHoleTopology
        ? context.path(pathData).attr(this.polygonStyle.normal)
        : context.path(pathData).attr(this.polygonStyle.transparent),
      mask: context.path(pathData).attr(this.maskStyle.transparent)
    };
  }

  protected _updatePolygonStyle(): void {
    const entity = this.entity;
    
    if (!entity.srcModel.topos.includes(HSCore.Model.LayerSketch2dBuilder.HoleTopoTag)) {
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

  protected get polygonStyle(): PolygonStyles {
    if (!this._polygonStyle) {
      this._polygonStyle = {
        transparent: {
          'stroke-width': 0,
          fill: '#ffffff',
          opacity: 0,
          'vector-effect': 'non-scaling-stroke'
        },
        normal: {
          'stroke-width': 0,
          fill: '#ffffff',
          opacity: 0,
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

  public onFlagChanged(flag: number): void {
    super.onFlagChanged(flag);
    this._syncPointsFlag(flag);
  }

  private _syncPointsFlag(flag: number): void {
    const entity = this.entity;
    
    if (entity.srcModel.topos.length > 0) {
      return;
    }

    const isRelevantFlag = 
      flag === HSCore.Model.ExSketchFlagEnum.hoverOn ||
      flag === HSCore.Model.EntityFlagEnum.selected;

    if (!isRelevantFlag) {
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
    const faceModels = [entity.srcModel];
    const edges = HSCore.Util.ExtraordinarySketch2d.getAllEdgesFromFaces(faceModels);
    const backgroundEdges = HSCore.Util.ExtraordinarySketch2d
      .getAllEdgesFromFaces(faceModels, true)
      .filter(edge => edge.topos.includes('background'));
    const points = HSCore.Util.ExtraordinarySketch2d.getAllPointsFromEdges(backgroundEdges);

    const allElements = [...edges, ...points];
    const mappedEntities = allElements
      .map(model => sketch.findMapModel(model))
      .filter(Boolean);

    mappedEntities.forEach(entityItem => {
      if (isFlagOn) {
        entityItem.setFlagOn(drivenFlag, true);
      } else {
        entityItem.setFlagOff(drivenFlag, true);
      }
    });
  }
}