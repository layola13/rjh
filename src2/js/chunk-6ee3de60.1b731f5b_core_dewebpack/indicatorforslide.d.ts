/**
 * Module: IndicatorForSlide
 * Provides visual indicators for sliding window/door hardware
 */

import Point from './geometry'; // Assuming module 0 exports Point utilities
import { Indicator, WinPolygon } from './indicators'; // Module 1
import { 
  PushSashHardwareManager, 
  SlideHardwareManager, 
  OpenDirection 
} from './hardware'; // Module 13

/**
 * Shape representation for indicator graphics
 */
interface IndicatorShape {
  /** Polygon geometry */
  poly: WinPolygon;
  /** Whether the shape should be rendered with dashed lines */
  dashed: boolean;
}

/**
 * Point-like object with translation methods
 */
interface TranslatablePoint {
  x: number;
  y: number;
  translate(x: number, y: number): TranslatablePoint;
}

/**
 * Indicator component for sliding window/door hardware
 * Renders directional arrows showing the opening direction
 */
export class IndicatorForSlide extends Indicator {
  /** Hardware manager controlling this indicator */
  private readonly manager: PushSashHardwareManager | SlideHardwareManager;
  
  /** Map of opening directions to rotation angles (in radians) */
  private readonly angleMap: Map<OpenDirection, number>;
  
  /** Collection of shapes comprising the indicator */
  protected shapes: IndicatorShape[] = [];

  /**
   * Creates an indicator for sliding hardware
   * @param manager - The hardware manager instance
   */
  constructor(manager: PushSashHardwareManager | SlideHardwareManager) {
    super(manager);
    this.manager = manager;
    this.angleMap = new Map([
      [OpenDirection.Left, 0],
      [OpenDirection.Right, Math.PI],
      [OpenDirection.Up, Math.PI / 2],
      [OpenDirection.Down, Math.PI / 2 * 3]
    ]);
  }

  /**
   * Gets the opening direction for the indicator
   * For push sash hardware, uses the slide property; otherwise uses openDirection
   */
  get openDirection(): OpenDirection {
    return this.manager instanceof PushSashHardwareManager 
      ? this.manager.slide 
      : this.manager.openDirection;
  }

  /**
   * Determines if this indicator should be ignored (not rendered)
   * @returns true if the opening direction is None or the sash is fixed
   */
  ignore(): boolean {
    return this.openDirection === OpenDirection.None || this.manager.sash.isFixed;
  }

  /**
   * Creates the indicator shapes (arrow and optional tail)
   * @returns this instance for method chaining
   */
  createShapes(): this {
    const box = this.polygon.box;
    const width = box.xmax - box.xmin;
    const height = box.ymax - box.ymin;

    // Create arrow shapes with appropriate dimensions
    const arrowSize = this.manager instanceof PushSashHardwareManager || !this.manager.isVertical
      ? { length: width / 3, thickness: height / 5 }
      : { length: height / 3, thickness: width / 5 };

    const arrowTip = this.arrowShapes(arrowSize.length, arrowSize.thickness);

    // Add tail for slide hardware with pullup enabled (horizontal only)
    if (
      this.manager instanceof SlideHardwareManager &&
      this.manager.pullupEnabled &&
      !this.manager.isVertical
    ) {
      this.makeTail(arrowTip, arrowSize.thickness, this.openDirection);
    }

    // Rotate shapes according to opening direction
    const rotationAngle = this.angleMap.get(this.openDirection) ?? 0;
    this.shapes.forEach(shape => {
      shape.poly.rotate(rotationAngle, Point.point());
    });

    // Translate shapes to center of bounding box
    const center = this.polygon.box.center;
    const translation = Point.vector(center.x, center.y);
    this.shapes.forEach(shape => {
      shape.poly.translate(translation);
    });

    return this;
  }

  /**
   * Creates arrow head and shaft shapes
   * @param length - Arrow length
   * @param thickness - Arrow thickness
   * @returns The endpoint of the arrow shaft
   */
  private arrowShapes(length: number, thickness: number): TranslatablePoint {
    const tipSize = thickness / 5;
    const startPoint = Point.point(-length / 2, 0);

    // Create arrow head (two lines forming a V)
    const headPoint1 = startPoint.translate(tipSize, tipSize);
    const headPoint2 = startPoint.translate(tipSize, -tipSize);

    const headPolygon = new WinPolygon();
    headPolygon.add(Point.segment(headPoint1, startPoint));
    headPolygon.add(Point.segment(startPoint, headPoint2));
    headPolygon.done();

    this.shapes.push({
      poly: headPolygon,
      dashed: false
    });

    // Create arrow shaft (horizontal line)
    const endPoint = startPoint.translate(length, 0);
    const shaftPolygon = new WinPolygon();
    shaftPolygon.add(Point.segment(startPoint, endPoint));
    shaftPolygon.done();

    this.shapes.push({
      poly: shaftPolygon,
      dashed: false
    });

    return endPoint;
  }

  /**
   * Creates a tail line for pullup indicators
   * @param startPoint - Starting point of the tail
   * @param thickness - Tail thickness
   * @param direction - Opening direction (affects tail orientation)
   */
  private makeTail(
    startPoint: TranslatablePoint, 
    thickness: number, 
    direction: OpenDirection
  ): void {
    const tailPolygon = new WinPolygon();
    const verticalOffset = direction === OpenDirection.Left ? 1 : -1;
    const endPoint = startPoint.translate(0, thickness * verticalOffset);

    tailPolygon.add(Point.segment(startPoint, endPoint));
    tailPolygon.done();

    this.shapes.push({
      poly: tailPolygon,
      dashed: false
    });
  }
}