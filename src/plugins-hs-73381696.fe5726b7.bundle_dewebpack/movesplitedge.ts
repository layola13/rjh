abstract class TempBase {
  protected context: any;
  protected layer: any;
  protected drawing: any;
  protected element: any[];

  constructor(context: any, layer: any, drawing: any) {
    this.context = context;
    this.layer = layer;
    this.drawing = drawing;
  }

  abstract onCleanup(): void;
}

interface Position {
  x: number;
  y: number;
}

interface SnapResult {
  offset?: Position;
  indicateLines?: [Position, Position][];
  targets?: any[];
}

interface Edge {
  middle: Position;
  length: number;
}

interface Command {
  entity: Edge;
  moveBeginPosition?: Position;
  receive(eventType: string, payload: any): void;
}

export class MoveSplitEdge extends TempBase {
  private cmd: Command;
  private inference: any;
  private alignmentLines: any[];
  private fp: any;
  private current?: Edge;
  private beginPosition?: Position;
  private lastPosition?: Position;
  private beginCursorOffset?: Position;
  private snapResult?: SnapResult;

  constructor(context: any, layer: any, drawing: any, cmd: Command) {
    super(context, layer, drawing);
    this.cmd = cmd;
    this.inference = new HSApp.View.SVG.EdgeInference(context);
    this.alignmentLines = [];
    this.reset();
  }

  reset(): void {
    this.fp = HSApp.App.getApp().floorplan;
    this.current = undefined;
  }

  onDraw(): void {
    if (!this.current) {
      this._build();
    }

    const ctx = this.context;

    if (this.element) {
      if (!this.layer.hasChild(this.drawing)) {
        for (let i = 0; i < this.element.length; i++) {
          this.layer.appendChild(this.element[i]);
        }
      }
    } else {
      this.element = [];
      for (let i = 0; i < 6; i++) {
        const line = ctx.path().attr({
          'stroke-width': 1,
          stroke: '#ff521d'
        }).hide();
        this.alignmentLines.push(line);
        this.element.push(line);
      }
      this.element.push(this.drawing);
      this.onDraw();
    }
  }

  private _build(): void {
    this.current = this.getCurrentEdge();
  }

  getCurrentEdge(): Edge {
    return this.cmd.entity;
  }

  hideAlignmentLines(): void {
    for (let i = 0; i < this.alignmentLines.length; i++) {
      this.alignmentLines[i].hide();
    }
  }

  updateAlignmentLines(lines?: [Position, Position][]): void {
    this.hideAlignmentLines();
    if (!lines) return;

    for (let i = 0; i < this.alignmentLines.length; i++) {
      const lineElement = this.alignmentLines[i];
      if (lines.length > i) {
        const lineData = lines[i];
        HSApp.View.SVG.Util.UpdateSnappedLineSVGElements(
          this.context,
          lineData[0],
          lineData[1],
          lineElement
        );
        lineElement.show();
      }
    }
  }

  onMouseDown(event: MouseEvent, screenX: number, screenY: number): void {
    const modelPoint = HSApp.View.SVG.Util.ScreenPointToModel(
      [screenX, screenY],
      this.context
    );
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
    if (
      this.lastPosition &&
      this.lastPosition.x === screenX &&
      this.lastPosition.y === screenY
    ) {
      return;
    }

    this.lastPosition = {
      x: screenX,
      y: screenY
    };

    this.hideAlignmentLines();

    if (!this.current) {
      this.draw();
      return;
    }

    const modelPoint = HSApp.View.SVG.Util.ScreenPointToModel(
      [screenX, screenY],
      this.context
    );
    const cursorPosition: Position = {
      x: modelPoint[0],
      y: modelPoint[1]
    };

    const currentEdge = this.current;

    if (!this.beginPosition) {
      this.beginPosition = this.cmd.moveBeginPosition!;
      const edgeMiddle = currentEdge.middle;
      this.beginCursorOffset = {
        x: edgeMiddle.x - this.beginPosition.x,
        y: edgeMiddle.y - this.beginPosition.y
      };
      this.inference.setSourceEdge(currentEdge);
    }

    if (this.context.application.appSettings.orthoModeOn) {
      const deltaX = cursorPosition.x - this.beginPosition.x;
      const deltaY = cursorPosition.y - this.beginPosition.y;
      if (Math.abs(deltaX) >= Math.abs(deltaY)) {
        cursorPosition.y = this.beginPosition.y;
      } else {
        cursorPosition.x = this.beginPosition.x;
      }
    }

    this.snapResult = {};

    if (!event.ctrlKey) {
      const targetPosition: Position = {
        x: cursorPosition.x + this.beginCursorOffset!.x,
        y: cursorPosition.y + this.beginCursorOffset!.y
      };
      this.inference.solve(targetPosition, this.snapResult, {
        isBlockSnapEndPoint: event.altKey
      });
    }

    this.updateAlignmentLines(this.snapResult.indicateLines);

    const offset: Position = {
      x: cursorPosition.x - this.beginPosition.x,
      y: cursorPosition.y - this.beginPosition.y
    };

    if (this.snapResult.offset) {
      offset.x += this.snapResult.offset.x;
      offset.y += this.snapResult.offset.y;
    }

    this.cmd.receive(`gizmo.${event.type}`, {
      offset: offset,
      event: event
    });

    this.draw();
  }

  onMouseUp(event: MouseEvent, screenX: number, screenY: number): void {
    const modelPoint = HSApp.View.SVG.Util.ScreenPointToModel(
      [screenX, screenY],
      this.context
    );
    const position: Position = {
      x: modelPoint[0],
      y: modelPoint[1]
    };

    this.beginPosition = undefined;
    this.lastPosition = undefined;
    this.hideAlignmentLines();

    const snappedTargets = this.snapResult?.targets;

    this.cmd.receive(`gizmo.${event.type}`, {
      position: position,
      entities: snappedTargets,
      event: event
    });
  }

  onCleanup(): void {
    super.onCleanup();
    this.reset();
  }

  private draw(): void {
    // Implementation depends on parent class or framework
  }
}