import { Vector2 } from './Vector2';
import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { DiffCWRouteController } from './DiffCWRouteController';

interface RouteStyleConfig {
  stroke: string;
  "stroke-width": number;
  "stroke-linecap": string;
  "pointer-events": string;
}

interface ArrowStyleConfig {
  stroke: string;
  "stroke-width": number;
  fill: string;
}

interface BoundStyleConfig {
  stroke: string;
  "stroke-width": number;
  "stroke-linecap": string;
}

interface PathSegment {
  getStartPt(): { x: number; y: number; z: number; subtracted(other: any): any };
  getEndPt(): { x: number; y: number; z: number };
}

interface RouteEntity {
  path: PathSegment[];
  isFlagOn(flag: number): boolean;
  setFlagOn(flag: number, value: boolean): void;
  setFlagOff(flag: number, value: boolean): void;
}

interface SvgElement {
  attr(attributes: Record<string, any>): void;
  remove(): void;
  show(): void;
  hide(): void;
}

interface SvgPath extends SvgElement {
  marker(position: string, marker: SvgMarker): void;
}

interface SvgMarker extends SvgElement {
  path(pathData: string): SvgMarker;
}

interface SvgContext {
  path(pathData: string): SvgPath;
  marker(width: number, height: number): SvgMarker;
  application: {
    is2DViewActive(): boolean;
  };
}

interface DisplayGroup {
  appendChild(element: SvgElement, height: number): void;
  removeChild(element: SvgElement): void;
}

export class DiffCWRouteDisplay2D extends HSApp.View.SVG.Base.Display2D {
  private _element?: SvgPath | null;
  private _bound?: SvgPath | null;
  private _arrow?: SvgMarker | null;
  private _eventHooks: HSApp.View.SVG.Events.Hook[];

  private readonly _routeStyle: {
    normal: RouteStyleConfig;
    selected: RouteStyleConfig;
    hover: RouteStyleConfig;
  };

  private readonly _boundStyle: BoundStyleConfig;

  private readonly _arrowStyle: {
    normal: ArrowStyleConfig;
    selected: ArrowStyleConfig;
    hover: ArrowStyleConfig;
  };

  protected context: SvgContext;
  protected entity: RouteEntity;
  protected group: DisplayGroup;
  protected geometryDirty: boolean;
  protected positionDirty: boolean;

  constructor(
    context: SvgContext,
    entity: RouteEntity,
    group: DisplayGroup,
    layer: any,
    controller?: DiffCWRouteController
  ) {
    super(context, entity, group, layer, controller || new DiffCWRouteController(layer, context));

    this._eventHooks = [];

    this._routeStyle = {
      normal: {
        stroke: "#FFA023",
        "stroke-width": 4,
        "stroke-linecap": "round",
        "pointer-events": "none"
      },
      selected: {
        stroke: "#396EFF",
        "stroke-width": 4,
        "stroke-linecap": "round",
        "pointer-events": "none"
      },
      hover: {
        stroke: "#00F5FF",
        "stroke-width": 4,
        "stroke-linecap": "round",
        "pointer-events": "none"
      }
    };

    this._boundStyle = {
      stroke: "#FFFFFF",
      "stroke-width": 8,
      "stroke-linecap": "round"
    };

    this._arrowStyle = {
      normal: {
        stroke: "#FFFFFF",
        "stroke-width": 0.2,
        fill: "#FFA023"
      },
      selected: {
        stroke: "#FFFFFF",
        "stroke-width": 0.2,
        fill: "#396EFF"
      },
      hover: {
        stroke: "#FFFFFF",
        "stroke-width": 0.2,
        fill: "#00F5FF"
      }
    };
  }

  public init(): void {
    const context = this.context;
    const entity = this.entity;
    const pathPoints = this._getPathPoint(entity);
    const svgPathData = HSApp.View.SVG.Util.buildSvgPaths(pathPoints, false);

    this._element = context.path(svgPathData);
    this._bound = context.path(svgPathData);
    this._arrow = this._getArrow();

    this._bound.marker("end", this._arrow);
    this.updateStyle();

    const entityLayer = HSCore.Util.Layer.getEntityLayer(entity);
    this.group.appendChild(this._bound, entityLayer.height);
    this.group.appendChild(this._element, entityLayer.height);

    this.bindCommand();
    super.init();
  }

  public onDraw(): void {
    if (this.geometryDirty || this.positionDirty) {
      const entity = this.entity;
      const pathPoints = this._getPathPoint(entity);
      const svgPathData = HSApp.View.SVG.Util.buildSvgPaths(pathPoints, false);

      this._element?.attr({ d: svgPathData });
      this._bound?.attr({ d: svgPathData });
    }

    this.updateStyle();
  }

  public onCleanup(): void {
    this._eventHooks.forEach((hook) => {
      hook.dispose();
    });

    if (this._element) {
      this.group.removeChild(this._element);
      this._element.remove();
      this._element = null;
    }

    if (this._bound) {
      this.group.removeChild(this._bound);
      this._bound.remove();
      this._bound = null;
    }

    if (this._arrow) {
      this._arrow.remove();
      this._arrow = null;
    }

    this._eventHooks = [];
    super.onCleanup();
  }

  public bindCommand(): void {
    const context = this.context;
    const entity = this.entity;
    const hook = new HSApp.View.SVG.Events.Hook(this._bound, this.entity, context);

    this._eventHooks = [];
    this._eventHooks.push(hook);

    hook
      .mouseover(() => {
        if (context.application.is2DViewActive()) {
          entity.setFlagOn(HSCore.Model.WallFlagEnum.hoverOn, true);
          this.updateStyle();
        }
      })
      .mouseout(() => {
        if (context.application.is2DViewActive()) {
          entity.setFlagOff(HSCore.Model.WallFlagEnum.hoverOn, true);
          this.updateStyle();
        }
      });
  }

  public updateStyle(): void {
    const entity = this.entity;
    let routeStyle: RouteStyleConfig;
    let arrowStyle: ArrowStyleConfig;

    if (entity.isFlagOn(HSCore.Model.EntityFlagEnum.selected)) {
      routeStyle = this._routeStyle.selected;
      arrowStyle = this._arrowStyle.selected;
    } else if (entity.isFlagOn(HSCore.Model.WallFlagEnum.hoverOn)) {
      routeStyle = this._routeStyle.hover;
      arrowStyle = this._arrowStyle.hover;
    } else {
      routeStyle = this._routeStyle.normal;
      arrowStyle = this._arrowStyle.normal;
    }

    this._element!.attr(routeStyle);
    this._arrow!.path("M0, 0 L0, 1.5 L1.5, 0.75 z").attr(arrowStyle);
    this._bound!.attr(this._boundStyle);
  }

  private _getArrow(): SvgMarker {
    return this.context.marker(1.5, 1.5).attr({
      refX: 0,
      refY: 0.75
    });
  }

  private _getPathPoint(entity: RouteEntity): [Vector2, Vector2][] {
    const pathPoints: [Vector2, Vector2][] = [];

    entity.path.forEach((segment) => {
      const startPoint = segment.getStartPt();
      const endPoint = segment.getEndPt();
      const direction = startPoint.subtracted(endPoint).normalize();

      if (!HSCore.Util.Math.isZero(Math.abs(direction.z) - 1)) {
        pathPoints.push([new Vector2(startPoint), new Vector2(endPoint)]);
      }
    });

    return pathPoints;
  }

  public updateVisibleStatus(visible: boolean): void {
    if (visible) {
      this._element!.show();
      this._bound!.show();
      this._arrow!.show();
      return;
    }

    this._element!.hide();
    this._bound!.hide();
    this._arrow!.hide();
  }
}