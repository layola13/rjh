import { Point } from './types';

interface DimensionLine {
  from: Point;
  to: Point;
}

interface SnapResult {
  offset?: Point;
  indicateLines?: [Point, Point][];
}

interface Command {
  entity: any;
  modelLayer: any;
  moveBeginPosition?: Point;
  receive(event: string, data: any): void;
}

interface Context {
  application: {
    appSettings: {
      orthoModeOn: boolean;
    };
  };
  path(): SVGElement;
  text(): SVGElement;
}

interface Layer {
  hasChild(element: any): boolean;
  appendChild(element: any): void;
}

interface SVGElement {
  attr(attrs: Record<string, any>): SVGElement;
  hide(): void;
  show(): void;
}

/**
 * MoveSlabProfileEdge allows moving slab profile edges with snapping and alignment features
 */
export class MoveSlabProfileEdge extends HSApp.View.SVG.Temp {
  private floorplan: any;
  private current: any;
  private dimensionLines: DimensionLine[] = [];
  private dimensionDisplay: SVGElement[] = [];
  private snapCheckWalls: any[] = [];
  private alignmentLines: SVGElement[] = [];
  private cmd: Command;
  private inference: any;
  private element?: SVGElement[];
  private beginPosition?: Point;
  private lastPosition?: Point;
  private beginCursorOffset?: Point;
  private snapResult?: SnapResult;
  private context: Context;
  private layer: Layer;
  private drawing: any;

  constructor(context: Context, layer: Layer, command: Command) {
    super(context, layer, command, false);
    this.context = context;
    this.layer = layer;
    this.cmd = command;
    this.inference = new HSApp.View.SVG.EdgeInference(context);
    this.reset();
  }

  reset(): void {
    this.floorplan = HSApp.App.getApp().floorplan;
    this.current = undefined;
    this.dimensionLines = [];
    this.dimensionDisplay = this.dimensionDisplay || [];
    this.snapCheckWalls = [];
  }

  onDraw(): void {
    if (!this.current) {
      this._build();
    }

    if (this.element) {
      if (!this.layer.hasChild(this.drawing)) {
        for (let i = 0; i < this.element.length; i++) {
          this.layer.appendChild(this.element[i]);
        }
      }

      for (let i = 0; i < 10; i++) {
        const dimensionLine = this.dimensionLines[i];
        const pathElement = this.dimensionDisplay[2 * i];
        const textElement = this.dimensionDisplay[2 * i + 1];

        if (dimensionLine) {
          const from = dimensionLine.from;
          const to = dimensionLine.to;
          assert(from && to, "dimension points invalid");

          if (HSCore.Util.Math.isSamePoint(from, to, 0.1)) {
            pathElement.hide();
            textElement.hide();
          }
        } else {
          pathElement.hide();
          textElement.hide();
        }
      }
    } else {
      this.element = [];

      for (let i = 0; i < 10; i++) {
        const pathElement = this.context.path().attr({
          "stroke-dasharray": "-"
        }).hide();

        const textElement = this.context.text().attr({
          "font-size": "20px",
          fill: "#0000FF"
        }).hide();

        this.dimensionDisplay.push(pathElement, textElement);
        this.element.push(pathElement, textElement);
      }

      for (let i = 0; i < 6; i++) {
        const alignmentLine = this.context.path().attr({
          "stroke-width": 1,
          stroke: "#ff521d"
        }).hide();

        this.alignmentLines.push(alignmentLine);
        this.element.push(alignmentLine);
      }

      this.element.push(this.drawing);
      this.onDraw();
    }
  }

  private _build(): void {
    this.current = this.getCurrentEdge();
    this.dimensionLines.push({
      from: this.current.from,
      to: this.current.to
    });

    const nextEdge = this.current.next;
    if (nextEdge && nextEdge.ID !== this.current.ID) {
      this.dimensionLines.push({
        from: nextEdge.from,
        to: nextEdge.to
      });
    }

    const prevEdge = this.current.prev;
    if (prevEdge && prevEdge.ID !== this.current.ID) {
      this.dimensionLines.push({
        from: prevEdge.from,
        to: prevEdge.to
      });
    }

    this.snapCheckWalls = this.getSnapCheckWalls();
  }

  private getSnapCheckWalls(): any[] {
    const modelLayer = this.cmd.modelLayer;
    const layers: any[] = [];

    if (modelLayer) {
      layers.push(modelLayer);
      if (modelLayer.prev) {
        layers.push(modelLayer.prev);
      }
    }

    const walls: any[] = [];
    layers.forEach((layer) => {
      layer.forEachWall((wall: any) => {
        if (wall.isValid()) {
          walls.push(wall);
        }
      }, this);
    });

    return walls;
  }

  private getCurrentEdge(): any {
    return this.cmd.entity;
  }

  private hideAlignmentLines(): void {
    for (let i = 0; i < this.alignmentLines.length; i++) {
      this.alignmentLines[i].hide();
    }
  }

  private updateAlignmentLines(indicateLines?: [Point, Point][]): void {
    this.hideAlignmentLines();

    if (indicateLines) {
      for (let i = 0; i < this.alignmentLines.length; i++) {
        const alignmentLine = this.alignmentLines[i];
        if (indicateLines.length > i) {
          const line = indicateLines[i];
          HSApp.View.SVG.Util.UpdateSnappedLineSVGElements(
            this.context,
            line[0],
            line[1],
            alignmentLine
          );
          alignmentLine.show();
        }
      }
    }
  }

  onMouseDown(event: MouseEvent, screenX: number, screenY: number): void {
    const modelPoint = HSApp.View.SVG.Util.ScreenPointToModel([screenX, screenY], this.context);
    this.beginPosition = {
      x: modelPoint[0],
      y: modelPoint[1]
    };

    this.cmd.receive(`gizmo.${event.type}`, {
      position: this.beginPosition,
      event: event
    });

    this.draw();
  }

  onMouseMove(event: MouseEvent, screenX: number, screenY: number): void {
    if (!this.lastPosition || this.lastPosition.x !== screenX || this.lastPosition.y !== screenY) {
      this.lastPosition = {
        x: screenX,
        y: screenY
      };

      this.hideAlignmentLines();

      if (this.current) {
        const modelPoint = HSApp.View.SVG.Util.ScreenPointToModel([screenX, screenY], this.context);
        const currentPosition: Point = {
          x: modelPoint[0],
          y: modelPoint[1]
        };

        const currentEdge = this.current;

        if (!this.beginPosition) {
          this.beginPosition = this.cmd.moveBeginPosition!;
          const middle = currentEdge.middle;
          this.beginCursorOffset = {
            x: middle.x - this.beginPosition.x,
            y: middle.y - this.beginPosition.y
          };

          this.inference.setSourceEdge(currentEdge);
          this.inference.setSnapWalls(this.snapCheckWalls);
          this.inference.setSnapLines(this.getSnapLines());
        }

        if (this.context.application.appSettings.orthoModeOn) {
          const deltaX = currentPosition.x - this.beginPosition.x;
          const deltaY = currentPosition.y - this.beginPosition.y;

          if (Math.abs(deltaX) >= Math.abs(deltaY)) {
            currentPosition.y = this.beginPosition.y;
          } else {
            currentPosition.x = this.beginPosition.x;
          }
        }

        this.snapResult = {};

        if (!event.ctrlKey) {
          const targetPoint: Point = {
            x: currentPosition.x + this.beginCursorOffset!.x,
            y: currentPosition.y + this.beginCursorOffset!.y
          };

          this.inference.solve(targetPoint, this.snapResult, {
            isBlockSnapEndPoint: event.altKey
          });
        }

        this.updateAlignmentLines(this.snapResult.indicateLines);

        const offset: Point = {
          x: currentPosition.x - this.beginPosition.x,
          y: currentPosition.y - this.beginPosition.y
        };

        if (this.snapResult.offset) {
          offset.x += this.snapResult.offset.x;
          offset.y += this.snapResult.offset.y;
        }

        this.cmd.receive("gizmo.mousemove", {
          offset: offset,
          event: event
        });

        this.draw();
      } else {
        this.draw();
      }
    }
  }

  private getSnapLines(): [Point, Point][] {
    const lines: [Point, Point][] = [];
    const currentEdge = this.getCurrentEdge();

    currentEdge.getUniqueParent().forEachCoEdge((edge: any) => {
      if (edge !== currentEdge) {
        const from = edge.from;
        const to = edge.to;
        lines.push([
          { x: from.x, y: from.y },
          { x: to.x, y: to.y }
        ]);
      }
    });

    return lines;
  }

  onCleanup(): void {
    super.onCleanup();
    this.reset();
  }
}