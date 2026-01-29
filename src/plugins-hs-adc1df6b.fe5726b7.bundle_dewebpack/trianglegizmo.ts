import { Vector2 } from './Vector2';
import { HSApp } from './HSApp';
import { HSCore } from './HSCore';

interface StyleAttributes {
  stroke?: string;
  fill?: string;
  opacity?: number;
  'pointer-events'?: string;
}

interface CircleStyleSet {
  selected: StyleAttributes;
  normal: StyleAttributes;
  hover: StyleAttributes;
}

interface TriangleStyleSet {
  selected: StyleAttributes;
  normal: StyleAttributes;
  hover: StyleAttributes;
}

interface ViewBoxChangedEvent {
  data?: {
    scaleChanged: boolean;
  };
}

interface MouseEventData {
  target?: HTMLElement;
  srcElement?: HTMLElement;
  clientX: number;
  clientY: number;
}

interface RoofParameter {
  name: string;
  value: number;
}

interface Curve {
  getMidPt(): Vector2;
  getDirection(): Vector2;
  clone(): Curve;
  scale(factor: number): Curve;
}

interface RoomLoop {
  clone(): RoomLoop;
  scale(factor: number): RoomLoop;
  getAllCurves(): Curve[];
}

interface RoofParameters {
  roomLoop: RoomLoop;
}

interface Roof {
  parameters: RoofParameters;
  signalDirty: any;
}

interface Entity {
  roof: Roof;
}

interface Canvas {
  modelPointToCanvas(point: number[] | Vector2): { x: number; y: number };
}

interface SVGCircleElement {
  cx(): number;
  cy(): number;
  attr(attributes: StyleAttributes | string, value?: any): void;
  remove(): void;
  node: HTMLElement;
}

interface SVGPathElement {
  attr(attributes: StyleAttributes | string, value?: any): void;
  remove(): void;
}

interface Context {
  getScaleFactor(): number;
  circle(radius: number): SVGCircleElement;
  path(pathData: string): SVGPathElement;
  hscanvas: {
    signalViewBoxChanged: any;
  };
}

interface SignalHook {
  listen(signal: any, callback: (event?: any) => void): SignalHook;
}

type ButtonTuple = [SVGCircleElement, SVGPathElement];

declare function updateMouseTips(message?: string, position?: { x: number; y: number }): void;
declare const ResourceManager: {
  getString(key: string): string;
};
declare const HSFPConstants: {
  CommandType: {
    UpdateRoofDirection: string;
  };
};

export class TriangleGizmo extends HSApp.View.SVG.Gizmo {
  private _eventHooks: HSApp.View.SVG.Events.Hook[];
  private _buttons: ButtonTuple[];
  private _scale: number;
  private _roofPitchTriangleStyle: TriangleStyleSet;
  private _roofPitchCircleStyle: CircleStyleSet;
  private _selectedIndex: number;

  protected entity: Entity;
  protected context: Context;
  protected canvas: Canvas;
  protected signalHook: SignalHook;

  constructor(context: Context, canvas: Canvas, entity: Entity) {
    super(context, canvas, entity);

    this._buttons = [];
    this._eventHooks = [];
    this._scale = 1 / context.getScaleFactor();
    this._selectedIndex = 0;

    this.signalHook
      .listen(context.hscanvas.signalViewBoxChanged, this._onViewBoxChanged.bind(this))
      .listen(entity.roof.signalDirty, this._onRoofDirty.bind(this));

    this._roofPitchCircleStyle = {
      selected: {
        stroke: '#396EFE',
        fill: '#396EFE',
        opacity: 1
      },
      normal: {
        stroke: '#7E7E7E',
        fill: '#F2F2F2',
        opacity: 0.7
      },
      hover: {
        stroke: '#7E7E7E',
        fill: '#F2F2F2',
        opacity: 0.7
      }
    };

    this._roofPitchTriangleStyle = {
      selected: {
        fill: '#FFFFFF',
        stroke: '#FFFFFF',
        'pointer-events': 'none'
      },
      normal: {
        fill: '#000000',
        'pointer-events': 'none'
      },
      hover: {
        fill: '#396EFE',
        'pointer-events': 'none'
      }
    };
  }

  private get roof(): Roof {
    return this.entity.roof;
  }

  private _onViewBoxChanged(event?: ViewBoxChangedEvent): void {
    if (!event || event.data?.scaleChanged) {
      const scaleFactor = this.context.getScaleFactor();
      this._scale = 1 / scaleFactor;

      this._buttons.forEach((button) => {
        const centerX = button[0].cx();
        const centerY = button[0].cy();
        const transform = `translate(${centerX}, ${centerY}) scale(${this._scale}) translate(${-centerX}, ${-centerY})`;

        button[0].attr('transform', transform);
        button[1].attr('transform', transform);
      });
    }
  }

  private _onRoofDirty(): void {
    this._reset();
    this.createButtons();
    this.bindEventHook();
    this._updateStyle();
    this.dirtyGraph();
  }

  public onDraw(): void {
    super.onDraw();

    if (this._buttons.length === 0) {
      this.createButtons();
      this.bindEventHook();
      this._updateStyle();
    } else {
      this.UpdateButtons();
    }
  }

  private _reset(): void {
    this._eventHooks?.forEach((hook) => {
      hook.dispose();
    });
    this._eventHooks = [];

    this._buttons.forEach((button) => {
      button[0].remove();
      button[1].remove();
    });
    this._buttons = [];
    this._selectedIndex = 0;
  }

  public onCleanup(): void {
    this._reset();
    super.onCleanup();
  }

  public createButtons(): void {
    const roof = this.roof;
    const offsetParam = HSCore.Util.Roof.getRoofParamNodes(roof).find(
      (param: RoofParameter) => param.name === 'offset'
    );
    const offsetValue = 0.001 * (offsetParam?.value || 0);

    const curves = roof.parameters.roomLoop.clone().scale(0.001).getAllCurves();
    const initialCurves = HSCore.Util.Roof.getInitialCurves(curves);

    initialCurves.forEach((curve: Curve) => {
      this._buttons.push(this.buildBtnSvg(curve, offsetValue));
    });
  }

  public UpdateButtons(): void {
    // Implementation for updating existing buttons
  }

  public bindEventHook(): void {
    this._buttons.forEach((button) => {
      const hook = new HSApp.View.SVG.Events.Hook(button[0], this.roof, this.context);
      this._eventHooks.push(hook);

      hook
        .mouseover((event: MouseEventData) => {
          this.onHover(true, event);
          return true;
        })
        .mouseout((event: MouseEventData) => {
          this.onHover(false, event);
          return true;
        })
        .mousedown((event: MouseEventData) => {
          this.onMouseDown(event);
          return true;
        });
    });
  }

  public onHover(isHovering: boolean, event: MouseEventData): void {
    const target = event.target || event.srcElement;

    if (isHovering) {
      updateMouseTips(ResourceManager.getString('roof_change_start_position'), {
        x: event.clientX,
        y: event.clientY
      });
    } else {
      updateMouseTips();
    }

    this._updateStyle(isHovering ? target : undefined);
  }

  private _updateStyle(hoveredElement?: HTMLElement): void {
    this._buttons.forEach((button) => {
      button[0].attr(this._roofPitchCircleStyle.normal);
      button[1].attr(this._roofPitchTriangleStyle.normal);
    });

    if (hoveredElement) {
      const hoveredIndex = this._buttons.findIndex((button) => button[0].node === hoveredElement);

      if (hoveredIndex !== this._selectedIndex) {
        const hoveredButton = this._buttons[hoveredIndex];
        if (hoveredButton) {
          hoveredButton[0].attr(this._roofPitchCircleStyle.hover);
          hoveredButton[1].attr(this._roofPitchTriangleStyle.hover);
        }
      }
    }

    const selectedButton = this._buttons[this._selectedIndex];
    if (selectedButton) {
      selectedButton[0].attr(this._roofPitchCircleStyle.selected);
      selectedButton[1].attr(this._roofPitchTriangleStyle.selected);
    }
  }

  public onMouseDown(event: MouseEventData): void {
    const curves = this.roof.parameters.roomLoop.clone().scale(0.001).getAllCurves();
    const initialCurves = HSCore.Util.Roof.getInitialCurves(curves);
    const target = event.target || event.srcElement;

    this._selectedIndex = this._buttons.findIndex((button) => button[0].node === target);

    const commandManager = HSApp.App.getApp().cmdManager;
    const command = commandManager.createCommand(
      HSFPConstants.CommandType.UpdateRoofDirection,
      [this.roof, initialCurves[this._selectedIndex].clone().scale(1000)]
    );

    commandManager.execute(command);
    this._updateStyle();
  }

  public buildBtnSvg(curve: Curve, offset: number): ButtonTuple {
    const CIRCLE_RADIUS = 0.2;
    const TRIANGLE_OFFSET = 0.26 * -0.2;
    const TRIANGLE_SIZE = 0.1;

    const midPoint = curve.getMidPt();
    const direction = curve.getDirection().rotate(Vector2.readonlyO(), -Math.PI / 2);
    const circleCenter = midPoint.added(direction.multiplied(offset + CIRCLE_RADIUS));

    const circleRadiusCanvas = this.canvas.modelPointToCanvas([CIRCLE_RADIUS, CIRCLE_RADIUS])[0];
    const circleCenterCanvas = this.canvas.modelPointToCanvas(circleCenter);

    const circle = this.context.circle(circleRadiusCanvas).center(circleCenterCanvas.x, circleCenterCanvas.y);
    circle.attr(this._roofPitchCircleStyle.normal);

    const triangleTip = circleCenter.added(direction.multiplied(TRIANGLE_OFFSET));
    const triangleLeft = triangleTip.added(
      direction.rotated(Vector2.readonlyO(), -Math.PI / 4).multiply(TRIANGLE_SIZE)
    );
    const triangleRight = triangleTip.added(
      direction.rotated(Vector2.readonlyO(), Math.PI / 4).multiply(TRIANGLE_SIZE)
    );

    const trianglePath = this.context.path(this._buildTrianglePaths(triangleTip, triangleLeft, triangleRight));
    trianglePath.attr(this._roofPitchTriangleStyle.normal);

    const transform = `translate(${circleCenterCanvas.x}, ${circleCenterCanvas.y}) scale(${this._scale}) translate(${-circleCenterCanvas.x}, ${-circleCenterCanvas.y})`;
    circle.attr('transform', transform);
    trianglePath.attr('transform', transform);

    return [circle, trianglePath];
  }

  private _buildTrianglePaths(tip: Vector2, left: Vector2, right: Vector2): string {
    const tipCanvas = this.canvas.modelPointToCanvas(tip);
    const leftCanvas = this.canvas.modelPointToCanvas(left);
    const rightCanvas = this.canvas.modelPointToCanvas(right);

    return `M ${tipCanvas.x} ${tipCanvas.y} L ${leftCanvas.x} ${leftCanvas.y} L ${rightCanvas.x} ${rightCanvas.y} Z`;
  }
}