import { App } from './App';
import { View } from './View';
import { Command } from './Command';
import { ModelLayer } from './ModelLayer';
import { Vertex } from './Vertex';
import { Wall } from './Wall';
import { PointInference } from './PointInference';
import { Util } from './Util';

interface Point {
  x: number;
  y: number;
}

interface Offset {
  x: number;
  y: number;
}

interface InferenceResult {
  offset?: Offset;
  indicateLines?: [Point, Point][];
}

interface MouseMoveEvent {
  ctrlKey: boolean;
}

interface GizmoMouseMoveData {
  offset: Offset;
  event: MouseMoveEvent;
}

interface MoveSlabProfileVertexCommand {
  vertex: Vertex;
  modelLayer: ModelLayer;
  moveBeginPosition: Point;
}

export class MoveSlabProfileVertex extends View.SVG.Temp {
  private alignmentLines: any[] = [];
  private inference: PointInference;
  private cmd: MoveSlabProfileVertexCommand;
  private referencePoint?: Vertex;
  private beginPosition?: Point;
  private beginCursorOffset: Offset = { x: 0, y: 0 };
  private element?: any[];
  private drawing: any;
  private layer: any;

  constructor(
    context: any,
    layer: any,
    cmd: MoveSlabProfileVertexCommand
  ) {
    super(context, layer, cmd, false);
    
    this.inference = new HSApp.View.SVG.PointInference(context);
    this.inference.enableWallAxes = true;
    this.inference.enableWallBorders = false;
    this.cmd = cmd;
    this.reset();
  }

  reset(): void {
    this.referencePoint = undefined;
    this.beginPosition = undefined;
    this.beginCursorOffset = { x: 0, y: 0 };
    this.inference.setSnapWalls([]);
    this.inference.setSnapLines([]);
  }

  onDraw(): void {
    if (!this.referencePoint) {
      this._build();
    }

    const context = this.context;

    if (this.element) {
      if (!this.layer.hasChild(this.drawing)) {
        for (let i = 0; i < this.element.length; i++) {
          this.layer.appendChild(this.element[i]);
        }
      }
    } else {
      this.element = [];
      
      for (let i = 0; i < 2; i++) {
        const line = context.path().attr({
          'stroke-width': 1,
          stroke: '#ff521d'
        }).hide();
        
        this.alignmentLines.push(line);
        this.element.push(line);
      }

      for (let i = 0; i < this.element.length; i++) {
        this.layer.appendChild(this.element[i]);
      }

      this.element.push(this.drawing);
      this.onDraw();
    }
  }

  updateInference(): void {
    const targetVertex = this.cmd.vertex;
    const modelLayer = this.cmd.modelLayer;
    const snappableVertices: Vertex[] = [];
    const snappableWalls: Wall[] = [];
    const layers: ModelLayer[] = [modelLayer];

    if (modelLayer.prev) {
      layers.push(modelLayer.prev);
    }

    layers.forEach((layer) => {
      layer.forEachWall((wall: Wall) => {
        if (targetVertex.ID === wall.from.ID) {
          snappableVertices.push(wall.to);
        } else if (targetVertex.ID === wall.to.ID) {
          snappableVertices.push(wall.from);
        } else {
          snappableWalls.push(wall);
        }
      }, this);
    }, this);

    this.inference.setSnapWalls(snappableWalls);

    modelLayer.forEachFloorSlab((slab: any) => {
      slab.baseProfile.getLoopVertices().forEach((vertex: Vertex) => {
        if (vertex !== targetVertex) {
          snappableVertices.push(vertex);
        }
      });
    });

    const snapLines: [Point, Point][] = [];

    if (this.context.application.appSettings.orthoModeOn) {
      const horizontalLine: [Point, Point] = [
        { x: targetVertex.x, y: targetVertex.y },
        { x: targetVertex.x + 1, y: targetVertex.y }
      ];
      const verticalLine: [Point, Point] = [
        { x: targetVertex.x, y: targetVertex.y },
        { x: targetVertex.x, y: targetVertex.y + 1 }
      ];
      snapLines.push(horizontalLine, verticalLine);
    }

    snappableVertices.forEach((vertex) => {
      const horizontalLine: [Point, Point] = [
        { x: vertex.x, y: vertex.y },
        { x: vertex.x + 1, y: vertex.y }
      ];
      const verticalLine: [Point, Point] = [
        { x: vertex.x, y: vertex.y },
        { x: vertex.x, y: vertex.y + 1 }
      ];
      snapLines.push(horizontalLine, verticalLine);
    });

    this.inference.setSnapLines(snapLines);
  }

  private _build(): void {
    this.referencePoint = this.cmd.vertex;
    this.updateInference();
  }

  onMouseMove(event: MouseMoveEvent, screenX: number, screenY: number): void {
    if (!this.referencePoint) {
      return;
    }

    const modelPoint = HSApp.View.SVG.Util.ScreenPointToModel([screenX, screenY], this.context);
    const cursorPosition: Point = {
      x: modelPoint[0],
      y: modelPoint[1]
    };

    if (!this.beginPosition) {
      this.beginPosition = this.cmd.moveBeginPosition;
      this.beginCursorOffset = {
        x: this.referencePoint.x - this.beginPosition.x,
        y: this.referencePoint.y - this.beginPosition.y
      };
      this.updateInference();
    }

    const inferenceResult: InferenceResult = {};

    if (!event.ctrlKey) {
      const testPoint: Point = {
        x: cursorPosition.x + this.beginCursorOffset.x,
        y: cursorPosition.y + this.beginCursorOffset.y
      };

      if (this.inference.solve(testPoint, inferenceResult)) {
        this.updateAlignmentLines(inferenceResult.indicateLines ?? []);
      } else {
        this.hideAlignmentLines();
      }
    }

    const deltaX = cursorPosition.x - this.beginPosition.x;
    const deltaY = cursorPosition.y - this.beginPosition.y;
    const isOrthoMode = this.context.application.appSettings.orthoModeOn;

    if (isOrthoMode) {
      if (Math.abs(deltaX) >= Math.abs(deltaY)) {
        cursorPosition.y = this.beginPosition.y;
      } else {
        cursorPosition.x = this.beginPosition.x;
      }
    }

    const offset: Offset = {
      x: cursorPosition.x - this.beginPosition.x,
      y: cursorPosition.y - this.beginPosition.y
    };

    if (inferenceResult.offset) {
      if (isOrthoMode) {
        if (Math.abs(deltaX) >= Math.abs(deltaY)) {
          offset.x += inferenceResult.offset.x;
        } else {
          offset.y += inferenceResult.offset.y;
        }
      } else {
        offset.x += inferenceResult.offset.x;
        offset.y += inferenceResult.offset.y;
      }
    }

    HSApp.App.getApp().cmdManager.receive('gizmo.mousemove', {
      offset,
      event
    });
  }

  hideAlignmentLines(): void {
    for (let i = 0; i < this.alignmentLines.length; i++) {
      this.alignmentLines[i].hide();
    }
  }

  updateAlignmentLines(lines: [Point, Point][]): void {
    this.hideAlignmentLines();

    for (let i = 0; i < this.alignmentLines.length; i++) {
      const lineElement = this.alignmentLines[i];
      
      if (lines.length > i) {
        const line = lines[i];
        HSApp.View.SVG.Util.UpdateSnappedLineSVGElements(
          this.context,
          line[0],
          line[1],
          lineElement
        );
        lineElement.show();
      }
    }
  }

  onCleanup(): void {
    this.reset();
    super.onCleanup?.();
  }
}

export const ID = 148972;