import { Loop, Line2d, MathAlg } from './math';
import { HSCore } from './core';
import { SnapGeomHelper } from './snap-geom-helper';
import { SnapStrategy, SnapResultType, SnapBreakMode } from './snap-strategy';
import { ConstraintHelper } from './constraint-helper';
import { SublineHelper } from './subline-helper';

interface PosEntities {
  walls: HSCore.Model.Wall[];
  structures: HSCore.Model.NCustomizedStructure[];
  beams: HSCore.Model.NCustomizedBeam[];
  holes: HSCore.Model.Hole[];
  room: HSCore.Model.Room | undefined;
}

interface SnapGeometry {
  getID(): string;
}

interface SnapResult {
  id: string;
  type: SnapResultType;
  dx?: number;
  dy?: number;
  drotation?: number;
  center?: { x: number; y: number };
  master: SnapGeometry;
  client: unknown;
  loop?: Loop;
}

interface RotationResult {
  drotation: number;
  center: { x: number; y: number };
}

interface PreRotationStatus {
  rotation: number;
  clientLoop: Loop;
}

interface SnapHelperConfig {
  layer: HSCore.Model.Layer;
  snapMaster: HSCore.Model.NCustomizedStructure | HSCore.Model.NCustomizedBeam | HSCore.Model.Hole;
}

interface ExtractOptions {
  includeRoomCurves: boolean;
}

export class SnapHelper {
  private currentLayer: HSCore.Model.Layer;
  private currentMaster: HSCore.Model.NCustomizedStructure | HSCore.Model.NCustomizedBeam | HSCore.Model.Hole;
  private _posEntities: PosEntities;
  private _snapGeometries: SnapGeometry[];
  private first: SnapResult | undefined;
  private second: SnapResult | undefined;
  private preRotationStatus: PreRotationStatus | undefined;

  constructor(config: SnapHelperConfig) {
    this.currentLayer = config.layer;
    this.currentMaster = config.snapMaster;
    this._posEntities = {
      walls: [],
      structures: [],
      beams: [],
      holes: [],
      room: undefined
    };
    this._snapGeometries = [];
  }

  doSnap(): RotationResult | undefined {
    this._getSnapObjs();
    
    const masterEntities: PosEntities = {
      walls: [],
      structures: [],
      beams: [],
      holes: [],
      room: undefined
    };

    if (this.currentMaster instanceof HSCore.Model.NCustomizedStructure) {
      masterEntities.structures.push(this.currentMaster);
    } else if (this.currentMaster instanceof HSCore.Model.NCustomizedBeam) {
      masterEntities.beams.push(this.currentMaster);
    } else if (this.currentMaster instanceof HSCore.Model.Hole) {
      masterEntities.holes.push(this.currentMaster);
    }

    const masterGeometries = this._extractSnapGeom(masterEntities);
    const snapResult = this._doSnap(masterGeometries, this._snapGeometries);

    if (snapResult) {
      SublineHelper.getInstance().execute(this.first, this.second, snapResult);
    } else {
      SublineHelper.getInstance().hideAll();
    }

    return snapResult;
  }

  hideAuxiliaries(): void {
    SublineHelper.getInstance().hideAll();
  }

  private _getSnapObjs(): void {
    this._posEntities = this._filter();
    this._snapGeometries = this._extractSnapGeom(this._posEntities);
  }

  private _filter(): PosEntities {
    const entities: PosEntities = {
      walls: [],
      structures: [],
      beams: [],
      holes: [],
      room: undefined
    };

    const room = HSCore.Util.Room.getRoomContentIn(this.currentMaster, this.currentLayer);

    if (room) {
      this._filter_inroom(room, entities);
    } else {
      this._filter_outroom(this.currentLayer, entities);
    }

    entities.structures = entities.structures.filter(structure => structure !== this.currentMaster);
    entities.beams = entities.beams.filter(beam => beam !== this.currentMaster);

    return entities;
  }

  private _filter_inroom(room: HSCore.Model.Room, entities: PosEntities): void {
    const parent = room.parent;

    parent.forEachBeam((beam: HSCore.Model.NCustomizedBeam) => {
      if (beam.id !== this.currentMaster.id && beam.isContentInRoom(room)) {
        entities.beams.push(beam);
      }
    });

    parent.forEachStructure((structure: HSCore.Model.NCustomizedStructure) => {
      if (structure.id !== this.currentMaster.id && structure.isContentInRoom(room)) {
        entities.structures.push(structure);
      }
    });

    let walls: HSCore.Model.Wall[] = [];
    room.forEachStructureFace((face: HSCore.Model.StructureFace) => {
      face.getLinkStructure().forEach((linked: unknown) => {
        if (linked instanceof HSCore.Model.Wall) {
          walls.push(linked);
        }
      });
    });

    walls = Array.from(new Set(walls));
    entities.walls = walls;
  }

  private _filter_outroom(layer: HSCore.Model.Layer, entities: PosEntities): void {
    const walls = Object.values(layer.walls);
    const rooms: HSCore.Model.Room[] = [];
    const structures: HSCore.Model.NCustomizedStructure[] = [];

    layer.forEachRoom((room: HSCore.Model.Room) => {
      rooms.push(room);
    });

    layer.forEachStructure((structure: HSCore.Model.NCustomizedStructure) => {
      const isInRoom = rooms.some(room => structure.isContentInRoom(room));
      if (!isInRoom && structure !== this.currentMaster) {
        structures.push(structure);
      }
    });

    const beams: HSCore.Model.NCustomizedBeam[] = [];
    layer.forEachBeam((beam: HSCore.Model.NCustomizedBeam) => {
      const isInRoom = rooms.some(room => beam.isContentInRoom(room));
      if (!isInRoom && beam !== this.currentMaster) {
        beams.push(beam);
      }
    });

    entities.walls = walls;
    entities.structures = structures;
    entities.beams = beams;
  }

  private _extractSnapGeom(entities: PosEntities, options: ExtractOptions = { includeRoomCurves: false }): SnapGeometry[] {
    return SnapGeomHelper.getInstance().extract(entities, options);
  }

  private _doSnap(masterGeoms: SnapGeometry[], targetGeoms: SnapGeometry[]): RotationResult | undefined {
    if (masterGeoms.length === 0 || targetGeoms.length === 0) {
      return undefined;
    }

    let snapResults = SnapStrategy.getInstance().execute(masterGeoms, targetGeoms);

    if (this.currentMaster instanceof HSCore.Model.NCustomizedBeam) {
      snapResults = snapResults.filter(result => result.type !== SnapResultType.CollineRotation);
    }

    this._updateFirst(snapResults, masterGeoms);
    this._updateSecond(snapResults, masterGeoms);

    const constraintResult = ConstraintHelper.getInstance().execute(this.first, this.second);
    return this._updateRotation(constraintResult);
  }

  private _updateRotation(result: RotationResult | undefined): RotationResult | undefined {
    let output = result;

    if (output?.center && output.drotation) {
      if (this.preRotationStatus) {
        this.preRotationStatus.clientLoop = this.first?.loop ?? this.second!.loop;
      } else {
        this.preRotationStatus = {
          rotation: this.currentMaster.rotation,
          clientLoop: this.first?.loop ?? this.second!.loop
        };
      }
    } else if (this.preRotationStatus && !output) {
      let currentLoop: Loop;

      if (this.currentMaster instanceof HSCore.Model.Hole) {
        const openingHelper = new HSCore.Model.OpeningHelper(this.currentMaster);
        const curves = openingHelper.getRealFrontProfile(this.currentMaster.frontProfile).outer.map(edge => edge.curve);
        currentLoop = new Loop(curves);
      } else {
        currentLoop = new Loop(this.currentMaster.profile);
      }

      const clientLoop = this.preRotationStatus.clientLoop;

      if (MathAlg.PositionJudge.loopToLoop(currentLoop, clientLoop) === MathAlg.LoopLoopPositonType.OUT) {
        const clientLines = this.preRotationStatus.clientLoop
          .getAllCurves()
          .filter(curve => curve instanceof Line2d) as Line2d[];

        const currentPoints: { x: number; y: number }[] = [];

        if (this.currentMaster instanceof HSCore.Model.Hole) {
          const openingHelper = new HSCore.Model.OpeningHelper(this.currentMaster);
          const curves = openingHelper.getRealFrontProfile(this.currentMaster.frontProfile).outer.map(edge => edge.curve);
          const points = new Loop(curves).getAllPoints();
          currentPoints.push(...points);
        }

        const distanceResults: Array<{ center: { x: number; y: number }; minDist: number; choosedLine: Line2d }> = [];

        for (const point of currentPoints) {
          let minDistance = 1e6;
          let closestLine: Line2d | undefined;

          for (const line of clientLines) {
            if (line.containsPoint(line.getProjectedPtBy(point))) {
              const distance = MathAlg.CalculateDistance.pointToCurve2d(point, line);
              if (distance < minDistance) {
                minDistance = distance;
                closestLine = line;
              }
            }
          }

          if (closestLine) {
            distanceResults.push({
              center: point,
              minDist: minDistance,
              choosedLine: closestLine
            });
          }
        }

        distanceResults.sort((a, b) => a.minDist - b.minDist);

        if (distanceResults.length === 0 || distanceResults[0].minDist <= SnapStrategy.getInstance().intensity) {
          return undefined;
        }

        const rotationDelta = this.preRotationStatus.rotation - this.currentMaster.rotation;
        const testLine = new Line2d(distanceResults[0].center, distanceResults[1].center)
          .clone()
          .rotate(-rotationDelta * Math.PI / 180, distanceResults[0].center);

        const positionType = MathAlg.PositionJudge.curveToCurve(testLine, distanceResults[0].choosedLine);
        const center = positionType === MathAlg.CurveCuvePositonType.NOT_INTERSECT
          ? distanceResults[0].center
          : distanceResults[1].center;

        output = {
          drotation: rotationDelta,
          center
        };

        this.preRotationStatus = undefined;
      }
    }

    return output;
  }

  private _updateFirst(results: SnapResult[], masterGeoms: SnapGeometry[]): void {
    const currentMasterGeom = masterGeoms.find(geom => geom.getID() === this.first?.master.getID());

    if (currentMasterGeom && this.first && !this.first.drotation) {
      const breakResult = SnapStrategy.getInstance().exeBreakCalc(
        currentMasterGeom,
        this.first.client,
        SnapBreakMode.first
      );
      if (breakResult) {
        this.first = breakResult;
        return;
      }
    }

    if (results.length === 0) {
      this.first = undefined;
      return;
    }

    let needUpdate = false;

    if (this.first && results.find(result => this.first!.id === result.id)) {
      this.first = results.find(result => this.first!.id === result.id);
    } else {
      needUpdate = true;
    }

    if (needUpdate) {
      results.sort((a, b) => a.type - b.type);
      this.first = results.shift();
    } else {
      this.first = undefined;
    }
  }

  private _updateSecond(results: SnapResult[], masterGeoms: SnapGeometry[]): void {
    const isSameOffset = (result1: SnapResult, result2: SnapResult): boolean => {
      const dx1 = result1.dx ?? 0;
      const dy1 = result1.dy ?? 0;
      const dx2 = result2.dx ?? 0;
      const dy2 = result2.dy ?? 0;
      return Math.abs(dx1 - dx2) < 1e-4 && Math.abs(dy1 - dy2) < 1e-4;
    };

    if (results.length === 0) {
      this.second = undefined;
      return;
    }

    if (!this.first) {
      this.second = undefined;
      return;
    }

    const currentMasterGeom = masterGeoms.find(geom => geom.getID() === this.second?.master.getID());

    if (currentMasterGeom && this.second && !this.second.drotation) {
      const breakResult = SnapStrategy.getInstance().exeBreakCalc(
        currentMasterGeom,
        this.second.client,
        SnapBreakMode.second
      );

      if (breakResult) {
        const isCollinearOrOverlapOrTangent = [
          SnapResultType.Colline,
          SnapResultType.Overlap,
          SnapResultType.Tangent
        ];

        if (
          isCollinearOrOverlapOrTangent.includes(this.first.type) &&
          isCollinearOrOverlapOrTangent.includes(breakResult.type) &&
          isSameOffset(this.first, breakResult)
        ) {
          // Skip this result
        } else {
          this.second = breakResult;
          return;
        }
      }
    }

    const filteredResults = results.filter(result => !isSameOffset(result, this.first!));
    filteredResults.sort((a, b) => a.type - b.type);

    const constraintResult = ConstraintHelper.getInstance().getRelatedConstraint(this.first, filteredResults);
    this.second = constraintResult ?? undefined;
  }
}