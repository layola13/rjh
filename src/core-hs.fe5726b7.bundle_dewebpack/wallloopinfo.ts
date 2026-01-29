import { Wall } from './Wall';
import { TgRoomInfo } from './TgRoomInfo';
import { TgUtil } from './TgUtil';
import { TgLayerInfo } from './TgLayerInfo';

interface LoopGeometry {
  outer: any;
}

interface RoomGeometry {
  outer: any;
}

interface WallFacesInfo {
  walls: Wall[];
  faces: any[];
  loop: any;
}

interface LoopInfo {
  loopPath: any;
}

interface WallsInRoomSideMap {
  [wallId: string]: any;
}

export class WallLoopInfo extends TgRoomInfo {
  private _isolatedWallFaces?: WallFacesInfo;
  private _wallsInRoomSide?: WallsInRoomSideMap;

  constructor(roomInfo: any, layer: any) {
    super(roomInfo, layer);
  }

  get loopGeom(): any {
    return this.geometry.outer;
  }

  get loop(): LoopInfo {
    return {
      loopPath: this.geometry.outer
    };
  }

  get isolatedWallFaces(): WallFacesInfo {
    if (!this._isolatedWallFaces) {
      this._isolatedWallFaces = {
        walls: [],
        faces: [],
        loop: []
      };
    }
    return this._isolatedWallFaces;
  }

  get wallsInRoomSide(): WallsInRoomSideMap {
    if (!this._wallsInRoomSide) {
      this._wallsInRoomSide = {};
      this.wallFaces.faces.forEach((face) => {
        face.getLinkStructure().forEach((structure: any) => {
          if (structure instanceof Wall) {
            this._wallsInRoomSide![structure.id] = structure.getFaceType(face);
          }
        });
      });
    }
    return this._wallsInRoomSide;
  }

  get wallFaces(): WallFacesInfo {
    return {
      walls: this.structures.filter((structure) => structure instanceof Wall),
      faces: this.faces,
      loop: this.geometry.outer
    };
  }
}

export class FloorRoomInfo extends TgRoomInfo {
  public readonly floor: any;
  private _ceilingFace?: any;
  private _interiorWalls?: any[];
  private _wallsInRoomSide?: WallsInRoomSideMap;

  constructor(floor: any, roomInfo: any, layer: any) {
    super(roomInfo, layer);
    this.floor = floor;
  }

  get ceilingFace(): any {
    if (!this._ceilingFace) {
      this._ceilingFace = HSCore.Util.Floor.getFloorCeiling(this.floor);
    }
    return this._ceilingFace;
  }

  get loop(): LoopInfo {
    return {
      loopPath: this.geometry.outer
    };
  }

  get wallFaces(): WallFacesInfo {
    return {
      walls: this.structures.filter((structure) => structure instanceof Wall),
      faces: this.faces,
      loop: this.geometry.outer
    };
  }

  get interiorWalls(): any[] {
    if (!this._interiorWalls) {
      this._interiorWalls = HSCore.Util.Room.findInteriorWallsInRoom(this.floor);
    }
    return this._interiorWalls;
  }

  get wallsInRoomSide(): WallsInRoomSideMap {
    if (!this._wallsInRoomSide) {
      this._wallsInRoomSide = {};
      this.wallFaces.faces.forEach((face) => {
        const master = face.getMaster();
        if (master) {
          this._wallsInRoomSide![master.id] = master.getFaceType(face);
        }
      });
    }
    return this._wallsInRoomSide;
  }

  get boundWalls(): Wall[] {
    return this.structures.filter((structure) => structure instanceof Wall);
  }

  getNextWallFace(face: any): any {
    return TgUtil.getNextWallFace(face, this);
  }

  getPrevWallFace(face: any): any {
    return TgUtil.getPrevWallFace(face, this);
  }
}

export class LayerInfo extends TgLayerInfo {
  private _wallLoopInfos: WallLoopInfo[] = [];
  private _floorsFloorRoomInfo: Map<string, FloorRoomInfo> = new Map();
  private _ceilingsFloorRoomInfo: Map<string, FloorRoomInfo> = new Map();

  init(): void {
    super.init();
    const logger = log.logger('HSCore.Geometry.LayerInfo');
    
    this._wallLoopInfos = [];
    this._floorsFloorRoomInfo = new Map();
    this._ceilingsFloorRoomInfo = new Map();
    
    this._rawRoomInfos.forEach((roomInfo) => {
      const wallLoopInfo = new WallLoopInfo(roomInfo, this.layer);
      this._wallLoopInfos.push(wallLoopInfo);
    });
    
    this.layer.forEachFloor((floor: any) => {
      const roomInfo = this.layer.slabBuilder.getFloorRoomInfo(floor);
      if (!roomInfo) {
        logger.error(`no roomInfo found for Floor ${floor.id}`);
        return;
      }
      
      const floorRoomInfo = new FloorRoomInfo(floor, roomInfo, this.layer);
      this._floorsFloorRoomInfo.set(floor.id, floorRoomInfo);
      
      if (floorRoomInfo.ceilingFace) {
        this._ceilingsFloorRoomInfo.set(floorRoomInfo.ceilingFace.id, floorRoomInfo);
      }
    });
  }

  getFaceWallLoopInfo(face: any): WallLoopInfo | undefined {
    return this._wallLoopInfos.find((wallLoopInfo) => wallLoopInfo.faces.includes(face));
  }

  getFloorRoomInfo(floor: any): FloorRoomInfo | undefined {
    return this._floorsFloorRoomInfo.get(floor.id);
  }

  getCeilingRoomInfo(ceiling: any): FloorRoomInfo | undefined {
    return this._ceilingsFloorRoomInfo.get(ceiling.id);
  }

  getFaceRoomInfo(face: any): FloorRoomInfo | undefined {
    return Array.from(this._floorsFloorRoomInfo.values()).filter((roomInfo) => 
      roomInfo.faces.includes(face)
    )[0];
  }

  getWallRoomsInfo(wall: Wall): FloorRoomInfo[] {
    return Array.from(this._floorsFloorRoomInfo.values()).filter((roomInfo) => 
      roomInfo.structures.includes(wall)
    );
  }
}