import { HSConstants, HSCore } from './core';
import { MathUtils } from './utils';

interface Point {
  x: number;
  y: number;
  arcInfo?: ArcInfo;
}

interface ArcInfo {
  radius: number;
  center: Point;
  clockwise: boolean;
}

interface DisplayObject {
  outline: Point[][];
  entity: Entity;
}

interface Entity {
  instanceOf(modelClass: string): boolean;
}

interface Color {
  fillColor: string;
  strokeColor: string;
  strokeDashArray?: string;
}

interface Application {
  // Define application properties as needed
}

interface Context {
  path(pathData: string): PathElement;
}

interface PathElement {
  attr(attributes: Record<string, string | number | null>): PathElement;
}

interface Layer {
  appendChild(element: PathElement): void;
  removeChild(element: PathElement): void;
}

interface BaseGizmo {
  layer?: Layer;
  context: Context;
}

const PIXEL_TO_M_FACTOR = HSFPConstants.Constants.PIXEL_TO_M_FACTOR;

export default class OutlineGizmo extends HSApp.View.Base.Gizmo implements BaseGizmo {
  displayObj: DisplayObject;
  app: Application;
  color: Color;
  elements: PathElement[];
  layer?: Layer;
  context: Context;

  constructor(
    app: { application: Application },
    layerContext: Context,
    displayObj: DisplayObject,
    color: Color
  ) {
    super(app, layerContext, displayObj.entity);
    
    this.displayObj = displayObj;
    this.app = app.application;
    this.color = color;
    this.elements = [];
  }

  onCleanup(): void {
    if (this.layer && this.elements.length > 0) {
      this.elements.forEach((element) => {
        this.layer!.removeChild(element);
      });
      this.elements = [];
    }
  }

  draw(): void {
    if (this.elements.length === 0) {
      this.displayObj.outline.forEach((outlineSegment) => {
        if (outlineSegment.length !== 0) {
          const fillPath = this.buildFillPath(outlineSegment);
          const fillElement = this.context.path(fillPath).attr({
            'fill-opacity': 0.7,
            'stroke-opacity': 0,
            fill: this.color.fillColor,
            'pointer-events': 'none'
          });

          if (this.layer) {
            this.layer.appendChild(fillElement);
            this.elements.push(fillElement);
          }

          const isWall = this.displayObj.entity.instanceOf(HSConstants.ModelClass.NgWall);
          const edgeSegments: Point[][] = [];

          if (isWall) {
            edgeSegments.push([outlineSegment[1], outlineSegment[2]]);
            edgeSegments.push([outlineSegment[3], outlineSegment[0]]);
          } else if (HSCore.Util.Content.isWallNiche(this.displayObj.entity)) {
            edgeSegments.push([outlineSegment[0], outlineSegment[1]]);
            edgeSegments.push([outlineSegment[2], outlineSegment[3]]);
            edgeSegments.push([outlineSegment[3], outlineSegment[0]]);
          } else {
            edgeSegments.push([outlineSegment[0], outlineSegment[1]]);
            edgeSegments.push([outlineSegment[2], outlineSegment[3]]);
          }

          edgeSegments.forEach((segment) => {
            const edgePath = this.buildFillPath(segment);
            const strokeElement = this.context.path(edgePath).attr({
              stroke: this.color.strokeColor,
              'stroke-width': 2,
              'stroke-linejoin': 'round',
              fill: this.color.fillColor,
              'fill-opacity': 1,
              'stroke-dasharray': isWall ? null : this.color.strokeDashArray
            });

            if (this.layer) {
              this.layer.appendChild(strokeElement);
              this.elements.push(strokeElement);
            }
          });
        }
      });
    }
  }

  buildFillPath(points: Point[]): string {
    const scaleFactor = PIXEL_TO_M_FACTOR;
    
    if (!points) {
      return '';
    }

    let pathData = `M${points[0].x * scaleFactor}, ${-points[0].y * scaleFactor}`;

    for (let index = 1, length = points.length; index <= length; index++) {
      const currentPoint = points[index - 1];
      const nextPoint = points[index % length];

      if (
        currentPoint.arcInfo &&
        nextPoint.arcInfo &&
        MathUtils.nearlyEqual(currentPoint.arcInfo.radius, nextPoint.arcInfo.radius)
      ) {
        const arcInfo = currentPoint.arcInfo;
        const arcPath = HSApp.Util.Wall.toSvgArc(
          currentPoint,
          nextPoint,
          arcInfo.center,
          arcInfo.radius,
          arcInfo.clockwise,
          scaleFactor
        );
        pathData += arcPath.slice(3).join(' ');
      } else {
        pathData += `L${nextPoint.x * scaleFactor}, ${-nextPoint.y * scaleFactor}`;
      }
    }

    pathData += 'Z';
    return pathData;
  }
}