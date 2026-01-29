import { Vector3, Loop, Polygon, MathAlg } from '../path/to/math-library';
import { HSCore } from '../path/to/hscore';
import { HSApp } from '../path/to/hsapp';
import { copyFromCopied, CURVE_CURVE_OVERLAP_RESULTS } from '../path/to/utils';

interface RoomPolygon {
  outer: Loop;
  holes: Loop[];
}

interface RoomData {
  floor: any;
  polygon: RoomPolygon;
}

interface RoomSnapshot {
  floor: any;
  polygon: RoomPolygon;
}

interface WallJointInfo {
  type: string;
  wallInfos: any[];
}

interface CopiedData {
  walls: any[];
  openings: any[];
  wallJoints: WallJointInfo[];
  slabOpenings: any[];
  structures: any[];
  beams: any[];
  splitCurves: any[];
  roomSnapshots: RoomSnapshot[];
  beforeRooms: any[];
  slabSketch2dHoles: SlabSketch2dHole[];
}

interface SlabSketch2dHole {
  id: number;
  loop: Loop;
}

interface Offset {
  x: number;
  y: number;
}

export class CopyPasteRoomsRequest extends HSCore.Transaction.Common.StateRequest {
  private floorplan: any;
  private activeLayer: any;
  private targetLayer: any;
  private toRooms: RoomData[];
  private beforeRooms: any[];
  private afterRooms: any[];
  private copied: CopiedData;
  private offset: Offset;
  private _copySlab: boolean = false;

  constructor(copiedData: any, offset: Offset, targetLayer?: any) {
    super();
    
    this.floorplan = HSApp.App.getApp().floorplan;
    this.activeLayer = this.floorplan.scene.activeLayer;
    this.targetLayer = targetLayer ?? this.activeLayer;
    this.offset = offset;
    this.copied = copyFromCopied(copiedData);
    this.toRooms = [];
    this.beforeRooms = [];
    this.afterRooms = [];
  }

  canTransactField(): boolean {
    return true;
  }

  pasteWallWithOpenings(): void {
    const { walls, openings, wallJoints } = this.copied;
    const translationVector = new Vector3(this.offset.x, this.offset.y, 0);

    walls.forEach(wall => wall.translate(translationVector));
    openings.forEach(opening => opening.translate(translationVector));

    this.targetLayer.addChild(walls);
    this.targetLayer.addChild(openings);

    const processedJoints: any[] = [];

    for (const joint of wallJoints) {
      if (joint.wallInfos.length) {
        const wallJoint = HSCore.Model.WallJoint.create(joint.type);
        wallJoint.updateWallInfos(joint.wallInfos);
        processedJoints.push(wallJoint);
      }
    }

    HSCore.Util.TgWall.processWallsJoints(walls, processedJoints);
  }

  pasteSlabOpenings(): void {
    for (const slabOpening of this.copied.slabOpenings) {
      this._translateEntity(slabOpening);
      this.targetLayer.addChild(slabOpening);
      HSCore.Util.Opening.refreshSlabOpeningHost(slabOpening);
    }
  }

  pasteStructures(): void {
    for (const structure of this.copied.structures) {
      structure.parent?.removeChild(structure);
      this._translateEntity(structure);
      this.targetLayer.addChild(structure);

      if (structure.isWallPart() && structure.ZScale === 1) {
        structure.syncLayerHeight();
      }
    }
  }

  pasteBeams(): void {
    for (const beam of this.copied.beams) {
      beam.parent?.removeChild(beam);
      this._translateEntity(beam);
      this.targetLayer.addChild(beam);
    }
  }

  pasteSpaceSplits(): void {
    const roomSplitMap = new Map<any, any[]>();

    for (const splitCurve of this.copied.splitCurves) {
      const translatedCurve = splitCurve.translate(this.offset);
      const targetRoom = this.toRooms.find(room => this._isCurveInRoom(translatedCurve, room));

      if (targetRoom) {
        const existingCurves = roomSplitMap.get(targetRoom.floor) ?? [];
        roomSplitMap.set(targetRoom.floor, [...existingCurves, translatedCurve]);
      }
    }

    const splitHelper = new HSCore.Model.Geom.SplitHelper(this.targetLayer);

    for (const [floor, curves] of roomSplitMap) {
      splitHelper.splitRegion(floor, curves);
    }
  }

  pasteRoomTypes(): void {
    const translatedSnapshots = this.copied.roomSnapshots.map(snapshot => ({
      floor: snapshot.floor,
      polygon: {
        outer: snapshot.polygon.outer.clone().translate(this.offset),
        holes: []
      }
    }));

    for (const toRoom of this.toRooms) {
      let matchingSnapshot = translatedSnapshots.find(snapshot =>
        MathAlg.PositionJudge.loopToLoop(snapshot.polygon.outer, toRoom.polygon.outer) ===
        MathAlg.LoopLoopPositonType.EQUAL
      );

      if (!matchingSnapshot) {
        const overlappingSnapshots = translatedSnapshots.filter(snapshot =>
          snapshot.polygon.outer.getAllCurves().some(snapshotCurve =>
            toRoom.polygon.outer.getAllCurves().some(roomCurve =>
              CURVE_CURVE_OVERLAP_RESULTS.includes(
                MathAlg.PositionJudge.curveCurveOverlap(snapshotCurve, roomCurve)
              )
            )
          )
        );
        matchingSnapshot = overlappingSnapshots[0];
      }

      if (matchingSnapshot) {
        toRoom.floor.roomType = matchingSnapshot.floor.roomType;
        toRoom.floor.roomTypeDisplayName = matchingSnapshot.floor.roomTypeDisplayName;
      }
    }
  }

  onCommit(): void {
    this._pasteRooms();
    super.onCommit();
  }

  private _translateEntity(entity: any): void {
    entity.x = entity.x + this.offset.x;
    entity.y = entity.y + this.offset.y;
  }

  private _pasteRooms(): boolean {
    this.beforeRooms = this.copied.beforeRooms;

    if (this.copied.walls.length > 0) {
      this.pasteWallWithOpenings();
      this.pasteSlabEdits();
      this.pasteSlabOpenings();
      this.pasteStructures();
      this.pasteBeams();
      this.targetLayer.roomBuilder.build();
      this.collectToRooms();
      this.pasteSpaceSplits();
      this.collectToRooms();
      this.pasteRoomTypes();
    }

    return true;
  }

  pasteSlabEdits(): void {
    const existingHoles = Array.from(this.targetLayer.slabSketch2dHoles);
    const maxId = existingHoles.reduce((max, hole) => Math.max(max, hole.id), 0);
    const copiedHoles = this.copied.slabSketch2dHoles;

    if (!this._copySlab) {
      const newHoles = copiedHoles.map((hole, index) => ({
        id: maxId + index + 1,
        loop: hole.loop.clone().translate(this.offset)
      }));
      existingHoles.push(...newHoles);
    }

    this.targetLayer.slabSketch2dHoles = existingHoles;
  }

  collectToRooms(): void {
    this.afterRooms = this.collectFloorplanRooms();
    this.toRooms = this.afterRooms
      .filter(room => !this.beforeRooms.includes(room))
      .map(room => ({
        floor: room,
        polygon: {
          outer: new Loop(room.worldRawPath2d.outer),
          holes: room.worldRawPath2d.holes.map(hole => new Loop(hole))
        }
      }));
  }

  collectFloorplanRooms(): any[] {
    const rooms: any[] = [];
    this.floorplan.forEachRoom((room: any) => rooms.push(room));
    return rooms;
  }

  private _isCurveInRoom(curve: any, room: RoomData): boolean {
    const loops = [room.polygon.outer, ...room.polygon.holes].map(loop => new Loop(loop));
    const polygon = new Polygon(loops);
    return MathAlg.PositionJudge.ptToPolygon(curve.getMidPt(), polygon) !== MathAlg.PtLoopPositonType.OUT;
  }
}