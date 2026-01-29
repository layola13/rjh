interface DrawImageParams {
  unitScale: number;
  image: string;
  box2d: Box2D;
  svgContext: SvgContext;
  svgNode: SvgNode;
}

interface Point {
  x: number;
  y: number;
}

interface Box2D {
  getCornerPts(): Point[];
}

interface StrokeOptions {
  width: number;
}

interface SvgGroup {
  polygon(points: string): SvgPolygon;
}

interface SvgPolygon {
  stroke(options: StrokeOptions): SvgPolygon;
  fill(pattern: SvgPattern): void;
}

interface SvgNode {
  group(): SvgGroup;
}

interface PatternCallback {
  (element: PatternElement): void;
}

interface PatternElement {
  image(src: string): ImageElement;
}

interface ImageElement {
  size(width: number, height: number): void;
}

interface SvgPattern {
  attr(attributes: { x: number; y: number }): void;
}

interface SvgContextInstance {
  pattern(width: number, height: number, callback: PatternCallback): SvgPattern;
}

interface SvgContext {
  context(): SvgContextInstance;
}

interface MathUtil {
  getBounds(points: Point[]): [number, number, number, number] | null;
}

interface HSCoreUtil {
  Math: MathUtil;
}

interface HSCore {
  Util: HSCoreUtil;
}

declare const HSCore: HSCore;

export class SvgCommon {
  drawImage(params: DrawImageParams): void {
    const { unitScale, image, box2d, svgContext, svgNode } = params;
    const PRECISION = 1000;

    const scaledPoints = box2d.getCornerPts().map((point) => ({
      x: Math.round(point.x * unitScale * PRECISION) / PRECISION,
      y: Math.round(-point.y * unitScale * PRECISION) / PRECISION,
    }));

    const bounds = HSCore.Util.Math.getBounds(scaledPoints);

    if (!bounds) {
      return;
    }

    const [boundsX, boundsY, boundsWidth, boundsHeight] = bounds;

    const rectangleCorners: Point[] = [
      { x: boundsX, y: boundsY },
      { x: boundsX, y: boundsY + boundsHeight },
      { x: boundsX + boundsWidth, y: boundsY + boundsHeight },
      { x: boundsX + boundsWidth, y: boundsY },
    ];

    const polygonPoints = rectangleCorners
      .map((point) => `${point.x}, ${point.y}`)
      .join(", ");

    const polygonGroup = svgNode
      .group()
      .polygon(polygonPoints)
      .stroke({ width: 0 });

    const pattern = svgContext.context().pattern(boundsWidth, boundsHeight, (element) => {
      element.image(image).size(boundsWidth, boundsHeight);
    });

    pattern.attr({
      x: boundsX,
      y: boundsY,
    });

    polygonGroup.fill(pattern);
  }
}