import Flatten from '@flatten-js/core';
import { WinPolygon } from './WinPolygon';
import { Frametify, ArcUtils } from './utils';
import { SemiArcPro, CutLineType } from './SemiArcPro';

/**
 * SemiArcPro2 - Advanced semi-arc splitting algorithm
 * 
 * Extends SemiArcPro to provide enhanced semi-circular track area splitting
 * with configurable inner/outer arcs, crossties, and side areas.
 */
export class SemiArcPro2 extends SemiArcPro {
  /** Identifies this splitter type */
  readonly type: CutLineType = CutLineType.semiArcPro2;

  /** Whether side crossties are laid horizontally */
  horizontallySideCrossties: boolean = true;

  /** Height of the track area in layout units */
  trackAreaHeight: number = 0;

  /** Width of the side area in layout units */
  sideAreaWidth: number = 0;

  /** Multiplier size for scaling operations */
  private mulSize: number = 0;

  /** Frame size for boundary calculations */
  private frmSize: number = 0;

  /**
   * Returns dimension indices that should be hidden in UI
   * @returns Array containing index 0 (first dimension hidden)
   */
  get dimHiddenPos(): number[] {
    return [0];
  }

  /**
   * Splits a polygon into multiple regions using semi-arc geometry
   * 
   * @param polygon - The input polygon boundary to split
   * @param multiplierSize - Scaling factor for track width
   * @param frameSize - Offset for frame boundaries (default: 0)
   * @returns Array of WinPolygon regions representing split areas
   */
  split(
    polygon: WinPolygon,
    multiplierSize: number,
    frameSize: number = 0
  ): WinPolygon[] {
    this.polygon = polygon;
    this.mulSize = multiplierSize;
    this.frmSize = frameSize;

    if (!this.validBoundary()) {
      return [];
    }

    this.initVariables();

    // Create outer and inner semi-arcs
    const outerSemiArc = this.makeOuterSemiArc();
    this._semiArc = this.makeInnerSemiArc(outerSemiArc);

    // Generate track area regions
    const trackResult = this.makeTrackArea(this.mulSize);
    const trackPolygon = trackResult.track;

    // Create offset arcs and close the shape
    const outerOffsetArc = this.arcOffset(outerSemiArc, this.mulSize / 2);
    const innerOffsetArc = this.arcOffset(outerSemiArc, -this.mulSize / 2);
    const closedShape = this.closeShape(outerOffsetArc, innerOffsetArc);
    const middlePoint = innerOffsetArc.middle();

    // Cut main region by boundary
    const mainRegion = this.cutByBoundary(closedShape, trackPolygon, middlePoint);
    mainRegion.mulShape = outerSemiArc;

    // Cut remaining regions by main polygon
    const remainingRegions = this.cutByPolygon(trackPolygon, closedShape);
    const centerRegion = remainingRegions.find(region => region.contains(middlePoint));
    const sideRegions = remainingRegions.filter(region => region !== centerRegion);

    // Place crossties in center region
    const crossties = this.placeMiddleCrossties(
      centerRegion,
      this.middleCrosstiesCount,
      this.mulSize
    );

    return this.returnFormat([
      mainRegion,
      ...trackResult.inner,
      ...trackResult.side,
      ...crossties,
      ...sideRegions
    ]);
  }

  /**
   * Adjusts inner edge dimensions based on drag operation
   * 
   * @param edgeIndex - Index of the edge being dragged (1-4)
   * @param delta - Translation vector for the drag
   * @returns This instance for chaining
   */
  dragInnerEdge(edgeIndex: number, delta: Flatten.Vector): this {
    if (edgeIndex === 4) {
      this.trackAreaHeight += delta.y;
    } else if (edgeIndex === 1) {
      this.sideAreaWidth += delta.x;
    } else if (edgeIndex === 2) {
      this.sideAreaWidth += delta.length * (delta.y > 0 ? 1 : -1);
    } else if (edgeIndex === 3) {
      this.sideAreaWidth -= delta.x / 2;
    }
    return this;
  }

  /**
   * Serializes instance to JSON-compatible object
   * 
   * @returns Plain object representation for storage/transmission
   */
  toJSON(): SerializedSemiArcPro2 {
    return {
      name: this.type,
      l: this.location.toJSON(),
      mcc: this.middleCrosstiesCount,
      mcr: this.middleCrosstiesRatio,
      tah: this.trackAreaHeight,
      saw: this.sideAreaWidth
    };
  }

  /**
   * Deserializes JSON data to SemiArcPro2 instance
   * 
   * @param data - Serialized data object
   * @returns Reconstructed SemiArcPro2 instance
   */
  static deserialize(data: SerializedSemiArcPro2): SemiArcPro2 {
    const instance = new SemiArcPro2(
      Flatten.point(data.l.x, data.l.y)
    );
    instance.middleCrosstiesCount = data.mcc;
    instance.middleCrosstiesRatio = data.mcr || [];
    instance.trackAreaHeight = data.tah;
    instance.sideAreaWidth = data.saw;
    return instance;
  }

  /**
   * Creates a deep copy of this instance
   * 
   * @returns Cloned SemiArcPro2 with identical properties
   */
  clone(): SemiArcPro2 {
    const cloned = new SemiArcPro2(
      this.location,
      this.sameWithOuterArcCenter,
      this.arcCenter,
      this.arcRadius,
      this.arcAngle,
      this.middleCrosstiesCount,
      this.middleCrosstiesRatio,
      this.sideCrosstiesHidden,
      this.horizontallySideCrossties
    );
    cloned._semiArc = this._semiArc;
    cloned.innerEdgeIdx = this.innerEdgeIdx;
    cloned.trackAreaHeight = this.trackAreaHeight;
    cloned.sideAreaWidth = this.sideAreaWidth;
    return cloned;
  }

  /**
   * Validates that polygon boundaries meet minimum size requirements
   * 
   * @returns True if width > 1200 and height > 1300
   */
  private validBoundary(): boolean {
    const box = this.polygon.box;
    const width = box.xmax - box.xmin;
    const height = box.ymax - box.ymin;
    return width > 1200 && height > 1300;
  }

  /**
   * Initializes trackAreaHeight and sideAreaWidth with default values
   * based on polygon dimensions if not already set
   */
  private initVariables(): void {
    const box = this.polygon.box;
    const width = box.xmax - box.xmin;
    const height = box.ymax - box.ymin;

    if (!this.trackAreaHeight) {
      this.trackAreaHeight = (width / 2 + 300) < height 
        ? width / 2 
        : height - 300;
    }

    if (!this.sideAreaWidth) {
      this.sideAreaWidth = 600;
    }
  }

  /**
   * Generates inner semi-arc based on outer arc with side area offset
   * 
   * @param outerArc - The outer boundary arc
   * @returns Inner arc parallel to outer arc
   */
  private makeInnerSemiArc(outerArc: Flatten.Arc): Flatten.Arc {
    const offset = this.sideAreaWidth - this.frmSize - this.mulSize / 2;

    const arc = Flatten.Arc.arcSE(
      outerArc.center,
      outerArc.start.translate(offset, 0),
      outerArc.end.translate(-offset, 0),
      true
    );

    const startSegment = Flatten.segment(
      arc.start.translate(0, 90),
      arc.start
    );
    const endSegment = Flatten.segment(
      arc.end,
      arc.end.translate(0, 90)
    );

    const parallelEdges = Frametify.findParallelEdges(
      [startSegment, arc, endSegment],
      Array(3).fill(this.mulSize / 2),
      true,
      Flatten.ORIENTATION.CCW,
      false
    );

    return parallelEdges[1] as Flatten.Arc;
  }

  /**
   * Creates outer semi-arc spanning the polygon width
   * 
   * @returns Arc from left to right edge passing through bottom center
   */
  private makeOuterSemiArc(): Flatten.Arc {
    const box = this.polygon.box;
    const yPosition = box.ymin + this.trackAreaHeight - this.frmSize - this.mulSize / 2;

    const startPoint = Flatten.point(box.xmin, yPosition);
    const endPoint = Flatten.point(box.xmax, yPosition);
    const midPoint = Flatten.point(box.center.x, box.ymin);

    return ArcUtils.CreateArcFrom3Points(startPoint, endPoint, midPoint);
  }

  /**
   * Creates offset arc by adjusting radius
   * 
   * @param arc - Original arc
   * @param offset - Radius offset (positive = expand, negative = contract)
   * @returns New arc with adjusted radius
   */
  private arcOffset(arc: Flatten.Arc, offset: number): Flatten.Arc {
    return Flatten.arc(
      arc.center,
      arc.r.valueOf() + offset,
      arc.startAngle,
      arc.endAngle
    );
  }

  /**
   * Closes shape between two arcs with connecting segments
   * 
   * @param outerArc - Outer boundary arc
   * @param innerArc - Inner boundary arc (reversed)
   * @returns Closed polygon
   */
  private closeShape(outerArc: Flatten.Arc, innerArc: Flatten.Arc): WinPolygon {
    const reversedInner = innerArc.reverse();
    return new WinPolygon([
      outerArc,
      Flatten.segment(outerArc.end, reversedInner.start),
      reversedInner,
      Flatten.segment(reversedInner.end, outerArc.start)
    ]);
  }

  /**
   * Cuts polygon by line, returning region containing reference point
   * 
   * @param polygon - Polygon to cut
   * @param cutter - Line to cut with
   * @param referencePoint - Point to identify desired region
   * @returns Cut polygon containing reference point, or original if cut fails
   */
  private cut(
    polygon: Flatten.Polygon,
    cutter: Flatten.Line,
    referencePoint: Flatten.Point
  ): Flatten.Polygon {
    const multiline = new Flatten.Multiline([cutter]);
    const intersections = polygon.intersect(cutter);
    const splitMultiline = multiline.split(intersections);
    const cutResult = polygon.cut(splitMultiline);

    return cutResult.find(p => p.contains(referencePoint)) || polygon;
  }

  /**
   * Extracts boundary lines from polygon bounding box
   * 
   * @param polygon - Source polygon
   * @returns Object with top, bottom, left, right boundary lines
   */
  private boundary(polygon: WinPolygon): BoundaryLines {
    const box = polygon.box;
    return {
      bottom: Flatten.line(Flatten.point(0, box.ymax), Flatten.vector(0, 1)),
      top: Flatten.line(Flatten.point(0, box.ymin), Flatten.vector(0, 1)),
      left: Flatten.line(Flatten.point(box.xmin, 0), Flatten.vector(1, 0)),
      right: Flatten.line(Flatten.point(box.xmax, 0), Flatten.vector(1, 0))
    };
  }

  /**
   * Cuts shape by track polygon boundaries
   * 
   * @param shape - Shape to cut
   * @param trackPolygon - Track polygon defining boundaries
   * @param referencePoint - Point to identify desired region
   * @returns Cut WinPolygon
   */
  private cutByBoundary(
    shape: WinPolygon,
    trackPolygon: WinPolygon,
    referencePoint: Flatten.Point
  ): WinPolygon {
    let result = shape.polygon.clone();
    const boundaries = this.boundary(trackPolygon);

    result = this.cut(result, boundaries.bottom, referencePoint);
    result = this.cut(result, boundaries.top, referencePoint);
    result = this.cut(result, boundaries.left, referencePoint);
    result = this.cut(result, boundaries.right, referencePoint);

    return this.fPolygonToWinPolygon(result);
  }

  /**
   * Cuts outer polygon by inner polygon using boolean subtraction
   * 
   * @param outerPolygon - Polygon to cut from
   * @param innerPolygon - Polygon to subtract
   * @returns Array of resulting WinPolygons
   */
  private cutByPolygon(
    outerPolygon: WinPolygon,
    innerPolygon: WinPolygon
  ): WinPolygon[] {
    let outerClone = outerPolygon.polygon.clone();
    let innerClone = innerPolygon.polygon.clone();

    // Ensure orientations match
    if (outerPolygon.orientation !== innerPolygon.orientation) {
      innerClone = innerClone.reverse();
    }

    const subtractResult = Flatten.BooleanOperations.subtract(outerClone, innerClone);

    return Array.from(subtractResult.faces).map(face => {
      const poly = new Flatten.Polygon();
      poly.addFace(face);
      return this.fPolygonToWinPolygon(poly);
    });
  }

  /**
   * Converts Flatten.Polygon to WinPolygon
   * 
   * @param flattenPolygon - Source Flatten polygon
   * @returns Converted WinPolygon with first face's shapes
   */
  private fPolygonToWinPolygon(flattenPolygon: Flatten.Polygon): WinPolygon {
    const firstFace = Array.from(flattenPolygon.faces)[0];
    return new WinPolygon(firstFace.shapes);
  }
}

/**
 * Serialized representation of SemiArcPro2
 */
interface SerializedSemiArcPro2 {
  /** Type identifier */
  name: CutLineType;
  /** Location point coordinates */
  l: { x: number; y: number };
  /** Middle crossties count */
  mcc: number;
  /** Middle crossties ratio array */
  mcr: number[];
  /** Track area height */
  tah: number;
  /** Side area width */
  saw: number;
}

/**
 * Boundary lines for polygon edges
 */
interface BoundaryLines {
  /** Top horizontal boundary */
  top: Flatten.Line;
  /** Bottom horizontal boundary */
  bottom: Flatten.Line;
  /** Left vertical boundary */
  left: Flatten.Line;
  /** Right vertical boundary */
  right: Flatten.Line;
}