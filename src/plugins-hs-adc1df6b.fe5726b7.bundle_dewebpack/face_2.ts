import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { ENParamRoofType } from './ENParamRoofType';

interface PolygonStyle {
  'stroke-width': number;
  stroke: string;
  fill: string;
  opacity: number;
  'vector-effect': string;
}

interface StyleSet {
  transparent: PolygonStyle;
  normal: PolygonStyle;
  selected: PolygonStyle;
  hover: PolygonStyle;
}

interface TitleStyle {
  'font-family': string;
  'alignment-baseline': string;
  'text-anchor': string;
  fill: string;
  stroke: string;
  'font-weight': number;
  'font-size': number;
  'pointer-events': string;
}

interface TitleStyleSet {
  normal: TitleStyle;
  selected: TitleStyle;
}

interface PolygonElement {
  polygon: any;
  mask: any;
}

interface ViewBoxChangedEvent {
  data?: {
    scaleChanged?: boolean;
  };
}

export class Face extends HSApp.View.SVG.ExtraordinarySketch2d.Face2d {
  private _title: any;
  private _titleStyle?: TitleStyleSet;
  private _refreshShowDimensionTimerId?: number;
  private _polygonStyle?: StyleSet;

  constructor(
    entity: any,
    canvas: any,
    context: any,
    signalHook: any
  ) {
    super(entity, canvas, context, signalHook);

    const hscanvas = this.context.hscanvas;
    this.signalHook.listen(hscanvas.signalViewBoxChanged, this._onViewBoxChanged);
  }

  private _onViewBoxChanged = (event: ViewBoxChangedEvent): void => {
    if (!event || event.data?.scaleChanged !== false) {
      if (this._refreshShowDimensionTimerId) {
        clearTimeout(this._refreshShowDimensionTimerId);
      }

      this._title?.hide();

      this._refreshShowDimensionTimerId = window.setTimeout(() => {
        this._title?.show();
        this.dirtyGraph();
      }, 400);
    }
  };

  private _getCanvasChangeRatio(): number {
    const scaleFactor = this.context.getScaleFactor();
    const viewMultiplier = this.context.application.is2DViewActive() ? 1 : 1.2;
    return 1 / scaleFactor / viewMultiplier;
  }

  protected _createPath(): void {
    super._createPath([]);

    if (!this._title) {
      this._title = this._createPolygonTitle();
    }

    this.group.appendChild(this._title);
  }

  protected _updatePath(): void {
    super._updatePath([]);
  }

  private _createPolygonElement(pathData: string): PolygonElement {
    const context = this.context;
    return {
      polygon: context.path(''),
      mask: context.path(pathData).attr(this.maskStyle.transparent)
    };
  }

  private _createPolygonTitle(): any | null {
    const mathPolygon = this.entity.srcModel.toMathPolygon();
    const loops = mathPolygon?.getLoops();

    if (loops?.length) {
      const firstLoop = loops[0];
      const centroidPoint = firstLoop.getCentroidPoint();
      const canvasPoint = this.canvas.modelPointToCanvas(centroidPoint);

      const textElement = this.context.text('');
      textElement.attr(this.titleStyle.normal);
      textElement.attr({
        x: canvasPoint.x,
        y: canvasPoint.y
      });

      return textElement;
    }

    return null;
  }

  public onDraw(): void {
    super.onDraw([]);
    this._updateTileStyle();
  }

  public onCleanup(): void {
    super.onCleanup([]);
    this._title?.remove();
  }

  private _getBgColor(): string {
    return this.entity?.canEdit() ? '#6211ff' : '#ffffff';
  }

  private _getStrokeColor(): string {
    return this.entity?.canEdit() ? '#1c1c1c' : '#ffffff';
  }

  private _getNameByType(roofType: ENParamRoofType): string {
    switch (roofType) {
      case ENParamRoofType.Plane:
        return ResourceManager.getString('roof_type_flat');
      case ENParamRoofType.Pitched:
        return ResourceManager.getString('roof_type_shed');
      case ENParamRoofType.HerringBone:
        return ResourceManager.getString('roof_type_gable');
      case ENParamRoofType.Hip:
        return ResourceManager.getString('roof_type_hip');
      case ENParamRoofType.SaltBox:
        return ResourceManager.getString('roof_type_salt_box');
      case ENParamRoofType.BoxGable:
        return ResourceManager.getString('roof_type_box_gable');
      case ENParamRoofType.Pyramid:
        return ResourceManager.getString('roof_type_pyramid');
      default:
        return ResourceManager.getString('plugin_roofdrawing_set_roof_type');
    }
  }

  get polygonStyle(): StyleSet {
    const bgColor = this._getBgColor();

    if (!this._polygonStyle || bgColor !== this._polygonStyle.normal.fill) {
      const strokeColor = this._getStrokeColor();

      this._polygonStyle = {
        transparent: {
          'stroke-width': 1,
          stroke: strokeColor,
          fill: bgColor,
          opacity: 0.1,
          'vector-effect': 'non-scaling-stroke'
        },
        normal: {
          'stroke-width': 1,
          stroke: strokeColor,
          fill: bgColor,
          opacity: 0.1,
          'vector-effect': 'non-scaling-stroke'
        },
        selected: {
          'stroke-width': 1,
          stroke: '#396efe',
          fill: '#135eff',
          opacity: 0.6,
          'vector-effect': 'non-scaling-stroke'
        },
        hover: {
          'stroke-width': 1,
          stroke: '#3DFFF2',
          fill: '#3DFFF2',
          opacity: 0.4,
          'vector-effect': 'non-scaling-stroke'
        }
      };
    }

    return this._polygonStyle;
  }

  get maskStyle(): StyleSet {
    return this.polygonStyle;
  }

  get titleStyle(): TitleStyleSet {
    if (!this._titleStyle) {
      this._titleStyle = {
        normal: {
          'font-family': 'PingFangSC-Medium',
          'alignment-baseline': 'middle',
          'text-anchor': 'middle',
          fill: '#33353B',
          stroke: 'none',
          'font-weight': 600,
          'font-size': 12,
          'pointer-events': 'none'
        },
        selected: {
          'font-family': 'PingFangSC-Medium',
          'alignment-baseline': 'middle',
          'text-anchor': 'middle',
          fill: '#ffffff',
          stroke: 'none',
          'font-weight': 600,
          'font-size': 12,
          'pointer-events': 'none'
        }
      };
    }

    return this._titleStyle;
  }

  public onFlagChanged(flag: number): void {
    super.onFlagChanged([flag]);
    this._syncPointsFlag(flag);
  }

  public onGeometryDirty(): void {
    const mathPolygon = this.entity.srcModel.toMathPolygon();
    const loops = mathPolygon?.getLoops();

    if (loops?.length) {
      const firstLoop = loops[0];
      const centroidPoint = firstLoop.getCentroidPoint();
      const canvasPoint = this.canvas.modelPointToCanvas(centroidPoint);

      this._title?.attr({
        x: canvasPoint.x,
        y: canvasPoint.y
      });
    }
  }

  private _updateTileStyle(): void {
    const entity = this.entity;
    const titleElement = this._title;

    const isSelected = entity.isFlagOn(HSCore.Model.EntityFlagEnum.selected);
    const styleToApply = isSelected ? this.titleStyle.selected : this.titleStyle.normal;
    const canvasRatio = this._getCanvasChangeRatio();

    titleElement.attr(styleToApply);
    titleElement.attr({
      'font-size': (styleToApply['font-size'] || 12) * canvasRatio
    });

    const sketchable = this.entity.builder.sketchable;
    const roofType = sketchable.roof?.parameters.roofType;
    const roofName = this._getNameByType(roofType);

    if (titleElement.plain) {
      titleElement.plain(roofName);
    }
  }

  private _syncPointsFlag(flag: number): void {
    const entity = this.entity;

    if (
      !entity.srcModel.topos.length &&
      (flag === HSCore.Model.ExSketchFlagEnum.hoverOn ||
        flag === HSCore.Model.EntityFlagEnum.selected)
    ) {
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
      const backgroundEdges = HSCore.Util.ExtraordinarySketch2d.getAllEdgesFromFaces(faces, true).filter(
        (edge: any) => edge.topos.includes('background')
      );
      const points = HSCore.Util.ExtraordinarySketch2d.getAllPointsFromEdges(backgroundEdges);

      edges.push(...points);

      const mappedModels: any[] = [];
      edges.forEach((edge: any) => {
        const mappedModel = sketch.findMapModel(edge);
        if (mappedModel) {
          mappedModels.push(mappedModel);
        }
      });

      mappedModels.forEach((model: any) => {
        if (model) {
          if (isFlagOn) {
            model.setFlagOn(drivenFlag, true);
          } else {
            model.setFlagOff(drivenFlag, true);
          }
        }
      });
    }
  }
}