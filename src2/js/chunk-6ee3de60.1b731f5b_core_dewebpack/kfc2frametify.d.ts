import makerjs from 'makerjs';
import { Dock, EdgeJointWay } from './Dock';
import { WinPolygon, PolygonCreator } from './WinPolygon';
import { DoubleEarsFrametify } from './DoubleEarsFrametify';

/**
 * KFC2 frame transformation class
 * Extends DoubleEarsFrametify to create specialized polygon frames with inner and outer paths
 */
export class Kfc2Frametify extends DoubleEarsFrametify {
  /**
   * The polygon being processed
   */
  protected poly: WinPolygon;

  /**
   * Inner edges of the frame
   */
  protected innerEdges: makerjs.IPathSegment[];

  /**
   * Outer path segments of the frame
   */
  protected outsidePath: makerjs.IPathSegment[];

  /**
   * Creates a new Kfc2Frametify instance
   * @param polygon - The window polygon to transform into a KFC2 frame
   */
  constructor(polygon: WinPolygon) {
    super(polygon);
    this.poly = polygon;
    this.innerEdges = [];
    this.outsidePath = [];
  }

  /**
   * Generates the inner polygons of the frame based on height adjustments
   * @param heights - Array of height values for adjusting pulling heights
   * @returns Array of three WinPolygon objects representing inner frame sections
   */
  innerPolygons(heights: number[]): WinPolygon[] {
    this.analyse(heights);

    // Create first polygon from outside path and inner edges
    const polygon1 = new WinPolygon(
      PolygonCreator.Ins.joinPointsWithSegment([
        this.outsidePath[3].start,
        this.innerEdges[1].start,
        this.innerEdges[2].start,
        this.innerEdges[2].end
      ])
    );

    // Create second polygon with translated points based on pulling height
    const heightOffset = this.poly.pullingHeight[4] - heights[0];
    const offsetVector = makerjs.vector(0, -1).multiply(heightOffset);
    
    const polygon2 = new WinPolygon(
      PolygonCreator.Ins.joinPointsWithSegment([
        this.innerEdges[3].start,
        this.innerEdges[4].start.translate(offsetVector),
        this.innerEdges[5].start.translate(offsetVector),
        this.innerEdges[5].end
      ])
    );

    // Configure polygon2 properties
    polygon2.edDock.docks[1] = Dock.None();
    polygon2.polyId.pos = 0;

    // Create third polygon
    const polygon3 = new WinPolygon(
      PolygonCreator.Ins.joinPointsWithSegment([
        this.outsidePath[5].end,
        this.innerEdges[6].start,
        this.innerEdges[7].start,
        this.innerEdges[7].end
      ])
    );
    polygon3.polyId.pos = 1;

    return [polygon1, polygon2, polygon3];
  }

  /**
   * Generates bar polygons for the frame structure
   * @param heights - Array of height values (unused in function body)
   * @param jointWays - Array of edge joint ways to be configured
   * @returns Array of bar shapes with configured joint properties
   */
  barPolygons(heights: number[], jointWays: EdgeJointWay[]): makerjs.IPathSegment[] {
    // Configure joint ways for specific edges
    jointWays[3] = EdgeJointWay.Default;
    jointWays[6] = EdgeJointWay.Default;
    jointWays[4] = EdgeJointWay.Vertical;
    jointWays[5] = EdgeJointWay.Vertical;

    // Create bars from outside path and inner edges
    const bars = this.createBar(this.outsidePath, this.innerEdges, jointWays);

    // Mark bar 4 as virtual
    bars[4].virtual = true;

    // Adjust bar 3 by intersecting with polygon edge 0
    const bar3Shape = bars[3].mulShape;
    const edge0Line = makerjs.line(this.poly.edge(0).start, this.poly.edge(0).end);
    const bar3Line = makerjs.line(bar3Shape.start, bar3Shape.end);
    const intersection3 = bar3Line.intersect(edge0Line)[0];
    bars[3].mulShape = makerjs.segment(intersection3, bar3Shape.end);

    // Adjust bar 5 by intersecting with polygon edge 0
    const bar5Shape = bars[5].mulShape;
    const bar5Line = makerjs.line(bar5Shape.start, bar5Shape.end);
    const intersection5 = bar5Line.intersect(edge0Line)[0];
    bars[5].mulShape = makerjs.segment(bar5Shape.start, intersection5);

    return bars;
  }
}