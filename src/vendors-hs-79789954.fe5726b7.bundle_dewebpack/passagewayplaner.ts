import { MathAlg, Line2d, Loop, Point2d, Curve2d } from './math-library';
import { OpeningsExtractor } from './openings-extractor';

interface WorldRawPath2d {
  outer: Curve2d[];
}

interface FloorData {
  worldRawPath2d: WorldRawPath2d;
}

interface Opening {
  id: string;
  [key: string]: unknown;
}

interface HostInfo {
  openingId: string;
  openingFloorOverlapCurve?: Line2d;
  extendedOpeningFloorOverlapCurve?: Line2d;
  contentType: string;
}

interface PassagewayInfo extends HostInfo {
  opening?: Opening;
  loop?: Loop;
  line?: Line2d;
}

interface LoopLineResult {
  loop?: Loop;
  line?: Line2d;
}

interface IntersectResult {
  point: Point2d;
}

interface SvgMaskStyle {
  fill: string;
}

interface PassagewaySvgMask {
  loop?: Loop;
  style: SvgMaskStyle;
}

export class PassagewayPlaner {
  private readonly curvesIntersectTypes: MathAlg.CurveCuvePositonType[];
  private readonly loopsIntersectTypes: MathAlg.LoopLoopPositonType[];
  private readonly extractor: OpeningsExtractor;
  private readonly floorOuterCurves: Curve2d[];
  private readonly openings: Opening[];
  private readonly hostInfos: HostInfo[];

  constructor(floorData: FloorData) {
    this.curvesIntersectTypes = [
      MathAlg.CurveCuvePositonType.INTERSECT_IN,
      MathAlg.CurveCuvePositonType.INTERSECT_ON
    ];

    this.loopsIntersectTypes = [
      MathAlg.LoopLoopPositonType.INTERSECT,
      MathAlg.LoopLoopPositonType.EQUAL,
      MathAlg.LoopLoopPositonType.IN,
      MathAlg.LoopLoopPositonType.CONTAIN
    ];

    this.extractor = new OpeningsExtractor(floorData, "none");
    this.floorOuterCurves = floorData.worldRawPath2d.outer;

    const doors = Array.from(this.extractor.doors);
    this.openings = [...doors];
    this.hostInfos = this.extractor.getDoorHostInfos();
  }

  getOpeningPassageWay(hostInfo: HostInfo): PassagewayInfo {
    const { openingFloorOverlapCurve } = hostInfo;
    let loop: Loop | undefined;
    let line: Line2d | undefined;

    if (openingFloorOverlapCurve && openingFloorOverlapCurve instanceof Line2d) {
      const result = this.getPassageWayLoop(hostInfo);
      line = result.line;
      loop = result.loop;
    } else {
      loop = undefined;
      line = undefined;
    }

    return {
      ...hostInfo,
      opening: this.openings.find((opening) => opening.id === hostInfo.openingId),
      loop,
      line
    };
  }

  getPassageWayLoop(hostInfo: HostInfo): LoopLineResult {
    const overlapCurve = hostInfo.openingFloorOverlapCurve;
    if (!overlapCurve) {
      return { loop: undefined, line: undefined };
    }

    const outerCurves = this.floorOuterCurves;
    const rightNormal = overlapCurve.getRightNormal();
    const midPoint = overlapCurve.getMidPt();
    const offsetPoint = midPoint.clone().translate(rightNormal.multiplied(0.1));
    const testLine = new Line2d(offsetPoint, rightNormal, [0, 1000]);

    const intersectingCurve = outerCurves.find((curve) =>
      this.curvesIntersectTypes.includes(
        MathAlg.PositionJudge.curveToCurve(curve, testLine)
      )
    );

    if (intersectingCurve) {
      const projectedPoint = intersectingCurve.getProjectedPtBy(midPoint);
      const distance = this.isAsSlidingDoor(hostInfo)
        ? 0.8
        : midPoint.distanceTo(projectedPoint);
      return this.getLoopLine(hostInfo, distance);
    }

    return { loop: undefined, line: undefined };
  }

  getLoopLine(hostInfo: HostInfo, distance: number): LoopLineResult {
    const baseCurve =
      hostInfo.extendedOpeningFloorOverlapCurve ?? hostInfo.openingFloorOverlapCurve;
    
    if (!baseCurve) {
      return { loop: undefined, line: undefined };
    }

    const rightNormal = baseCurve.getRightNormal();
    const offsetCurve = baseCurve.clone().translate(rightNormal.multiplied(distance));

    return {
      loop: new Loop([
        baseCurve.getEndPt(),
        baseCurve.getStartPt(),
        offsetCurve.getStartPt(),
        offsetCurve.getEndPt()
      ]),
      line: new Line2d(baseCurve.getMidPt(), offsetCurve.getMidPt())
    };
  }

  isAsSlidingDoor(hostInfo: HostInfo): boolean {
    const isSlidingType = hostInfo.contentType.includes("sliding");
    const isWideOpening =
      hostInfo.openingFloorOverlapCurve &&
      hostInfo.openingFloorOverlapCurve.getLength() > 1.5;
    return isSlidingType || Boolean(isWideOpening);
  }

  isCrossPassageways(passageway1: PassagewayInfo, passageway2: PassagewayInfo): boolean {
    if (!passageway1.loop || !passageway2.loop || !passageway1.line || !passageway2.line) {
      return false;
    }

    let curveIntersectionCount = 0;
    for (const curve1 of passageway1.loop.getAllCurves()) {
      for (const curve2 of passageway2.loop.getAllCurves()) {
        if (
          this.curvesIntersectTypes.includes(
            MathAlg.PositionJudge.curveToCurve(curve1, curve2)
          )
        ) {
          curveIntersectionCount++;
        }
      }
    }

    const linesIntersect = this.curvesIntersectTypes.includes(
      MathAlg.PositionJudge.curveToCurve(passageway1.line, passageway2.line)
    );

    return linesIntersect || curveIntersectionCount >= 4;
  }

  getIntersectPtDistance(passageway1: PassagewayInfo, passageway2: PassagewayInfo): number {
    if (passageway1.line && passageway2.line) {
      const intersections = MathAlg.CalculateIntersect.curve2ds(
        passageway1.line,
        passageway2.line
      );
      const firstIntersection = intersections[0];
      if (firstIntersection?.point) {
        return firstIntersection.point.distanceTo(passageway1.line.getStartPt());
      }
    }
    return -1;
  }

  cutoffPassagewayByPassageway(
    targetPassageway: PassagewayInfo,
    cuttingPassageway: PassagewayInfo
  ): PassagewayInfo {
    if (!targetPassageway.line || !cuttingPassageway.loop) {
      return { ...targetPassageway };
    }

    const intersections: IntersectResult[] = [];
    for (const curve of cuttingPassageway.loop.getAllCurves()) {
      intersections.push(
        ...MathAlg.CalculateIntersect.curve2ds(targetPassageway.line, curve)
      );
    }

    const sortedIntersections = intersections.sort(
      (a, b) =>
        b.point.distanceTo(targetPassageway.line!.getStartPt()) -
        a.point.distanceTo(targetPassageway.line!.getStartPt())
    );

    const closestPoint = sortedIntersections[0]?.point;
    const result: PassagewayInfo = { ...targetPassageway };

    if (closestPoint && targetPassageway.openingFloorOverlapCurve) {
      const newDistance = closestPoint.distanceTo(targetPassageway.line.getStartPt());
      const { loop, line } = this.getLoopLine(targetPassageway, newDistance);
      result.loop = loop;
      result.line = line;
    }

    return result;
  }

  getPassageways(): PassagewayInfo[] {
    return this.hostInfos.map((hostInfo) => this.getOpeningPassageWay(hostInfo));
  }

  getMergedPassageways(): PassagewayInfo[] {
    let passageways = this.getPassageways();
    passageways = this.cutOffPassageways(passageways);
    return passageways;
  }

  expandPassagewayByIncisions(passageway: PassagewayInfo, incisions: Curve2d[]): void {
    if (!passageway.line || !passageway.openingFloorOverlapCurve) {
      return;
    }

    const relevantIncision = incisions
      .filter(
        (incision) =>
          this.curvesIntersectTypes.includes(
            MathAlg.PositionJudge.curveToCurve(passageway.line!, incision)
          ) && passageway.line!.isPerpendicularTo(incision)
      )
      .sort(
        (a, b) =>
          a.getMidPt().distanceTo(passageway.line!.getStartPt()) -
          b.getMidPt().distanceTo(passageway.line!.getStartPt())
      )[0];

    const clonedOverlapCurve = passageway.openingFloorOverlapCurve.clone();

    if (relevantIncision && clonedOverlapCurve.isLine2d()) {
      const projectedStart = clonedOverlapCurve.getProjectedPtBy(
        relevantIncision.getStartPt()
      );
      const projectedEnd = clonedOverlapCurve.getProjectedPtBy(
        relevantIncision.getEndPt()
      );

      const startExtension = Math.min(
        projectedStart.distanceTo(clonedOverlapCurve.getStartPt()),
        projectedEnd.distanceTo(clonedOverlapCurve.getStartPt())
      );

      const endExtension = Math.min(
        projectedStart.distanceTo(clonedOverlapCurve.getEndPt()),
        projectedEnd.distanceTo(clonedOverlapCurve.getEndPt())
      );

      clonedOverlapCurve.extend(startExtension, false);
      clonedOverlapCurve.extend(endExtension, true);

      passageway.extendedOpeningFloorOverlapCurve = clonedOverlapCurve;

      const { line, loop } = this.getLoopLine(passageway, passageway.line.getLength());
      passageway.line = line;
      passageway.loop = loop;
    }
  }

  cutOffPassageways(passageways: PassagewayInfo[]): PassagewayInfo[] {
    const result: PassagewayInfo[] = [];

    for (const passageway of passageways) {
      let processedPassageway = passageway;

      if (!this.isAsSlidingDoor(passageway)) {
        const crossingPassageways = passageways
          .filter(
            (other) =>
              other !== passageway &&
              !this.isAsSlidingDoor(other) &&
              this.isCrossPassageways(passageway, other)
          )
          .sort(
            (a, b) =>
              this.getIntersectPtDistance(passageway, b) -
              this.getIntersectPtDistance(passageway, a)
          );

        const closestCrossing = crossingPassageways[0];
        if (closestCrossing) {
          processedPassageway = this.cutoffPassagewayByPassageway(
            passageway,
            closestCrossing
          );
        }
      }

      result.push(processedPassageway);
    }

    return result;
  }

  getExpandMergePassageways(incisions: Curve2d[]): PassagewayInfo[] {
    let passageways = this.getPassageways();

    for (const passageway of passageways) {
      this.expandPassagewayByIncisions(passageway, incisions);
    }

    passageways = this.cutOffPassageways(passageways);
    return passageways;
  }

  getPassagewayIntersectWithIncisions(incisions: Curve2d[]): PassagewayInfo[] {
    return this.getExpandMergePassageways(incisions).filter(
      (passageway) => !this.isAsSlidingDoor(passageway)
    );
  }

  getPassagewaySvgMasks(passageways: PassagewayInfo[]): PassagewaySvgMask[] {
    const masks: PassagewaySvgMask[] = [];

    for (const passageway of passageways) {
      masks.push({
        loop: passageway.loop,
        style: {
          fill: "#477502"
        }
      });
    }

    return masks;
  }
}