import { Extractor } from './Extractor';
import { HSCore } from './HSCore';
import * as MathModule from './MathModule';
import { WKTUtils } from './WKTUtils';
import { ConstraintUtil } from './ConstraintUtil';
import { Loop, Vector2, Line2d } from './MathModule';
import { findLineGroupInCurves } from './CurveUtils';

interface PositionParam {
  startParam: number;
  endParam: number;
  centerParam: number;
}

interface OpeningHostInfo {
  hostCurveIndex: number;
  openingIndex: number;
  group: string;
  posParam: PositionParam;
  openingFloorOverlapCurve?: MathModule.Curve2d;
  openingId: string;
  openingType: 'door' | 'window';
  categoryId: string;
  hostCurveLength: number;
  linkRoomType: string;
  zBottom: number;
  zTop: number;
  contentType: string;
}

interface OpeningsInfo {
  bottomProfileGeomCollectionWKT: string;
  centerPtsGeomCollectionWKT: string;
  centerPtsMultiPointWKT: string;
  count: number;
  normalizedType: string;
  openingType: 'door' | 'window';
  hostCurveIndexStr: string;
  hostInfos: OpeningHostInfo[];
}

interface CurveWithIndex {
  curve: MathModule.Curve2d;
  index: number;
}

interface LineGroupResult {
  index: number;
  group: string;
  line: Line2d;
}

interface ExtractResult {
  doorsBottomProfilesWKT: string;
  windowsBottomProfilesWKT: string;
  hostInfos: OpeningHostInfo[];
}

interface OpeningHostInfosResult {
  windows: OpeningHostInfo[];
  doors: OpeningHostInfo[];
}

type NormalizeType = 'centroid' | string;

const OVERLAP_POSITION_TYPES = [
  MathModule.MathAlg.CurveCuvePositonType.OVERLAP,
  MathModule.MathAlg.CurveCuvePositonType.TOTALLY_OVERLAP
];

export class OpeningsExtractor extends Extractor {
  private windows: Set<HSCore.Model.Window | HSCore.Model.ParametricOpening>;
  private doors: Set<HSCore.Model.Opening | HSCore.Model.ParametricOpening>;
  private openingFaceMap: WeakMap<
    HSCore.Model.Opening | HSCore.Model.ParametricOpening,
    HSCore.Model.StructureFace[]
  >;
  private simplifiedFloorOuter?: MathModule.Curve2d[];
  private outerCurves: MathModule.Curve2d[];
  private translate2D?: Vector2;

  constructor(
    floor: HSCore.Model.Floor,
    normalizeType: NormalizeType = 'centroid',
    simplifiedFloorOuter?: MathModule.Curve2d[],
    outerCurves?: MathModule.Curve2d[]
  ) {
    super(floor, normalizeType);
    
    this.windows = new Set();
    this.doors = new Set();
    this.openingFaceMap = new WeakMap();
    this.simplifiedFloorOuter = simplifiedFloorOuter;
    this.outerCurves = outerCurves ?? this._getFloorOuter();
    
    if (simplifiedFloorOuter) {
      this.translate2D = this._getTranslate2D(new Loop(simplifiedFloorOuter));
    }

    floor.structureFaces.reduce<string[]>((acc, face) => {
      acc.push(...face.openings.map(opening => opening.tag.split('-')[0]));
      return acc;
    }, []);

    floor.structureFaces.forEach(face => {
      face.openings.forEach(opening => {
        const existingFaces = this.openingFaceMap.get(opening) ?? [];
        
        if (HSCore.Util.Content.isDoorOpening(opening)) {
          this.doors.add(opening);
          this.openingFaceMap.set(opening, [...existingFaces, face]);
        } else if (opening instanceof HSCore.Model.Window) {
          this.windows.add(opening);
          this.openingFaceMap.set(opening, [...existingFaces, face]);
        }
      });

      face.parametricOpenings.forEach(parametricOpening => {
        if (parametricOpening instanceof HSCore.Model.ParametricOpening) {
          const existingFaces = this.openingFaceMap.get(parametricOpening) ?? [];
          
          if (HSCore.Util.Content.isDoorOpening(parametricOpening)) {
            this.doors.add(parametricOpening);
            this.openingFaceMap.set(parametricOpening, [...existingFaces, face]);
          } else {
            this.windows.add(parametricOpening);
            this.openingFaceMap.set(parametricOpening, [...existingFaces, face]);
          }
        }
      });
    });
  }

  private _extractOpeningsInfo(
    openings: Set<HSCore.Model.Opening | HSCore.Model.ParametricOpening>,
    openingType: 'door' | 'window'
  ): OpeningsInfo {
    const bottomProfiles: MathModule.Curve2d[][] = [];
    const centerPoints: Vector2[] = [];
    const hostInfos = this._getOpeningHostInfos(openings, openingType);
    const hostCurveIndexStr = hostInfos
      .map(info => info.hostCurveIndex)
      .sort()
      .join(', ');
    const openingIds = new Set(hostInfos.map(info => info.openingId));

    openings.forEach(opening => {
      if (openingIds.has(opening.id)) {
        if (opening instanceof HSCore.Model.Opening) {
          bottomProfiles.push(opening.bottomProfile);
          centerPoints.push(new Vector2(opening.x, opening.y));
        } else if (opening instanceof HSCore.Model.ParametricOpening) {
          const profile = opening.bottomProfile[0];
          if (profile) {
            bottomProfiles.push(profile);
            centerPoints.push(
              new Vector2(opening.getCenterPoint().x, opening.getCenterPoint().y)
            );
          }
        }
      }
    });

    const translatedProfiles = bottomProfiles.map(profile =>
      profile.map(curve => curve.clone().translate(this.translate2D))
    );
    const translatedCenterPoints = centerPoints.map(point =>
      point.clone().translate(this.translate2D)
    );

    return {
      bottomProfileGeomCollectionWKT: WKTUtils.outersToGeometryCollectionWKT(translatedProfiles),
      centerPtsGeomCollectionWKT: WKTUtils.pointsToGeometryCollectionWKT(translatedCenterPoints),
      centerPtsMultiPointWKT: WKTUtils.pointsToMultiPointWKT(translatedCenterPoints),
      count: hostInfos.length,
      normalizedType: this.normalizeType,
      openingType,
      hostCurveIndexStr,
      hostInfos
    };
  }

  private _getOpeningHostInfos(
    openings: Set<HSCore.Model.Opening | HSCore.Model.ParametricOpening>,
    openingType: 'door' | 'window'
  ): OpeningHostInfo[] {
    const hostInfos = Array.from(openings)
      .map(opening => this._getOpeningHostInfo(opening, openingType))
      .flat()
      .filter(info => info.hostCurveIndex > -1 && !!info.openingFloorOverlapCurve);
    
    return OpeningsExtractor.sortOpeningHostInfos(hostInfos);
  }

  public getDoorHostInfos(): OpeningHostInfo[] {
    return this._getOpeningHostInfos(this.doors, 'door');
  }

  public getOpeningHostInfos(): OpeningHostInfosResult {
    return {
      windows: this._getOpeningHostInfos(this.windows, 'window'),
      doors: this._getOpeningHostInfos(this.doors, 'door')
    };
  }

  private _getFloorOuter(): MathModule.Curve2d[] {
    return this.simplifiedFloorOuter ?? this.floor.worldRawPath2d.outer;
  }

  private _getOpeningHostInfo(
    opening: HSCore.Model.Opening | HSCore.Model.ParametricOpening,
    openingType: 'door' | 'window'
  ): OpeningHostInfo[] {
    let hostCurveIndex = -1;
    const floorOuter = this._getFloorOuter();
    const startIndex = ConstraintUtil.getFloorOuterStartIndex(floorOuter);
    const curvesWithIndices: CurveWithIndex[] = [];

    for (let i = 0; i < floorOuter.length; i++) {
      const curve = floorOuter[(startIndex + i) % floorOuter.length];
      curvesWithIndices.push({ curve, index: i });
    }

    const faces = this.openingFaceMap.get(opening);
    const results: OpeningHostInfo[] = [];

    if (!faces) {
      return results;
    }

    for (const face of faces) {
      const faceCurve = face.faceInfo.curve;
      let openingFloorOverlapCurve: MathModule.Curve2d | undefined;
      let startParam = 0;
      let endParam = 0;
      let centerParam = 0;
      let group = 'invalid';

      if (faceCurve instanceof Line2d) {
        const matchedCurve = curvesWithIndices.find(item =>
          OVERLAP_POSITION_TYPES.includes(
            MathModule.MathAlg.PositionJudge.curveCurveOverlap(faceCurve, item.curve)
          )
        );

        if (matchedCurve?.curve instanceof Line2d) {
          const curveAsLine = matchedCurve.curve;
          const lineGroupResult = findLineGroupInCurves(curveAsLine, this.outerCurves);

          if (lineGroupResult) {
            hostCurveIndex = lineGroupResult.index;
            group = lineGroupResult.group;
            const hostLine = lineGroupResult.line;

            openingFloorOverlapCurve = opening.bottomProfile
              .flat()
              .find(curve =>
                OVERLAP_POSITION_TYPES.includes(
                  MathModule.MathAlg.PositionJudge.curveCurveOverlap(curve, curveAsLine)
                )
              )
              ?.clone();

            if (openingFloorOverlapCurve) {
              const startPoint = openingFloorOverlapCurve.getStartPt();
              const endPoint = openingFloorOverlapCurve.getEndPt();
              const range = hostLine.getRange();
              const rangeLength = range.getLength();
              const rangeMin = range.min;
              const endParamNormalized =
                (range.clamp(hostLine.getParamAt(endPoint)) - rangeMin) / rangeLength;
              const startParamNormalized =
                (range.clamp(hostLine.getParamAt(startPoint)) - rangeMin) / rangeLength;

              startParam = Math.min(endParamNormalized, startParamNormalized);
              endParam = Math.max(endParamNormalized, startParamNormalized);
              centerParam = startParam + (endParam - startParam) / 2;

              results.push({
                hostCurveIndex,
                openingIndex: 0,
                group,
                posParam: {
                  startParam,
                  endParam,
                  centerParam
                },
                openingFloorOverlapCurve: openingFloorOverlapCurve.translate(this.translate2D),
                openingId: opening.id,
                openingType,
                categoryId: opening.metadata.categories[0],
                hostCurveLength: hostLine.getLength(),
                linkRoomType:
                  opening.linkFaces.find(
                    linkFace => !linkFace.roomInfo?.floors.includes(this.floor)
                  )?.roomInfo?.floors[0]?.roomType ?? '',
                zBottom: opening.z,
                zTop: opening.z + opening.ZSize,
                contentType: opening.contentType.getTypeString()
              });
            }
          }
        }
      }
    }

    return results;
  }

  public extract(): ExtractResult {
    const doorsInfo = this._extractOpeningsInfo(this.doors, 'door');
    const windowsInfo = this._extractOpeningsInfo(this.windows, 'window');

    return {
      doorsBottomProfilesWKT: doorsInfo.bottomProfileGeomCollectionWKT,
      windowsBottomProfilesWKT: windowsInfo.bottomProfileGeomCollectionWKT,
      hostInfos: [...doorsInfo.hostInfos, ...windowsInfo.hostInfos]
    };
  }

  public static sortOpeningHostInfos(hostInfos: OpeningHostInfo[]): OpeningHostInfo[] {
    const groupedByHostCurve = new Map<number, OpeningHostInfo[]>();

    hostInfos.forEach(info => {
      const group = groupedByHostCurve.get(info.hostCurveIndex) ?? [];
      group.push(info);
      groupedByHostCurve.set(info.hostCurveIndex, group);
    });

    groupedByHostCurve.forEach(group => {
      group
        .sort((a, b) => a.posParam.startParam - b.posParam.startParam)
        .forEach((info, index) => (info.openingIndex = index));
    });

    return hostInfos;
  }
}