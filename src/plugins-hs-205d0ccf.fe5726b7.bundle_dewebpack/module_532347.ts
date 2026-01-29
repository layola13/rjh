interface FloorplanData {
  global_wall_height3d: number;
}

interface Wall {
  ID: string;
  height3d: number;
}

interface Room {
  ID: string;
  ceilingHeight3d: number;
}

interface Floorplan {
  global_wall_height3d: number;
  forEachWall(callback: (wall: Wall) => void): void;
  forEachRoom(callback: (room: Room) => void): void;
}

interface SavedData {
  global: number;
  rooms: Record<string, number>;
  walls: Record<string, number>;
}

interface App {
  floorplan: Floorplan;
}

interface HSApp {
  App: {
    getApp(): App;
  };
  Cmd: {
    Command: new (...args: any[]) => any;
  };
}

interface HSFPConstants {
  LogGroupTypes: {
    WallOperation: string;
  };
}

declare const HSApp: HSApp;
declare const HSFPConstants: HSFPConstants;

export default class ChangeGlobalWallHeightCommand extends HSApp.Cmd.Command {
  private savedData: SavedData;
  private restoredData: SavedData;
  private fp: Floorplan;

  constructor(floorplanData: FloorplanData) {
    super();
    
    this.savedData = {
      global: floorplanData.global_wall_height3d,
      rooms: {},
      walls: {}
    };
    
    this.restoredData = {
      global: floorplanData.global_wall_height3d,
      rooms: {},
      walls: {}
    };
    
    this.fp = floorplanData as unknown as Floorplan;
  }

  private _saveToData(data: SavedData): void {
    this.fp.forEachWall((wall: Wall) => {
      data.walls[wall.ID] = wall.height3d;
    });
    
    this.fp.forEachRoom((room: Room) => {
      data.rooms[room.ID] = room.ceilingHeight3d;
    });
    
    data.global = this.fp.global_wall_height3d;
  }

  private _restoreFromData(data: SavedData): void {
    this.fp.forEachWall((wall: Wall) => {
      const height = data.walls[wall.ID];
      if (height !== undefined) {
        wall.height3d = height;
      }
    });
    
    this.fp.forEachRoom((room: Room) => {
      const ceilingHeight = data.rooms[room.ID];
      if (ceilingHeight !== undefined) {
        room.ceilingHeight3d = ceilingHeight;
      }
    });
    
    if (data.global) {
      this.fp.global_wall_height3d = data.global;
    }
  }

  private _changeHeight(height: number): void {
    HSApp.App.getApp().floorplan.global_wall_height3d = height;
  }

  public onExecute(height: number): void {
    this._saveToData(this.savedData);
    this._changeHeight(height);
  }

  public onUndo(): void {
    this._saveToData(this.restoredData);
    this._restoreFromData(this.savedData);
  }

  public onRedo(): void {
    this._restoreFromData(this.restoredData);
  }

  public getDescription(): string {
    return "修改全局墙高";
  }

  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}