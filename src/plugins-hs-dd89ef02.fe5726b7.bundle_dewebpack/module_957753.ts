interface Cowall {
  partner?: Cowall;
  from: CowallNode;
  to: CowallNode;
  setFlagOn(flag: number): void;
  setFlagOff(flag: number): void;
  updateConnectedEdges(): void;
}

interface CowallNode {
  parents: Record<string, unknown>;
  setFlagOn(flag: number): void;
  setFlagOff(flag: number): void;
}

export default class HideCowallCommand extends HSApp.Cmd.Command {
  private cowall: Cowall;

  constructor(cowall: Cowall) {
    super(cowall);
    this.cowall = cowall;
  }

  onExecute(): void {
    HSApp.Selection.Manager.unselect(this.cowall);
    
    this.cowall.setFlagOn(HSCore.Model.EntityFlagEnum.hidden);
    
    if (this.cowall.partner) {
      this.cowall.partner.setFlagOn(HSCore.Model.EntityFlagEnum.hidden);
    }
    
    if (Object.keys(this.cowall.from.parents).length === 1) {
      this.cowall.from.setFlagOn(HSCore.Model.EntityFlagEnum.hidden);
    }
    
    if (Object.keys(this.cowall.to.parents).length === 1) {
      this.cowall.to.setFlagOn(HSCore.Model.EntityFlagEnum.hidden);
    }

    const updateRoomWall = (wall?: Cowall): void => {
      if (wall) {
        const roomWall = HSCore.Util.Wall.getRoomWallIn(wall);
        if (roomWall) {
          roomWall.onEntityDirty();
        }
      }
    };

    this.cowall.updateConnectedEdges();
    updateRoomWall(this.cowall);
    updateRoomWall(this.cowall.partner);
    this.mgr.complete(this);
  }

  onUndo(): void {
    this.cowall.setFlagOff(HSCore.Model.EntityFlagEnum.hidden);
    this.cowall.from.setFlagOff(HSCore.Model.EntityFlagEnum.hidden);
    this.cowall.to.setFlagOff(HSCore.Model.EntityFlagEnum.hidden);
    
    if (this.cowall.partner) {
      this.cowall.partner.setFlagOff(HSCore.Model.EntityFlagEnum.hidden);
    }
    
    this.cowall.updateConnectedEdges();
  }

  onRedo(): void {
    this.cowall.setFlagOn(HSCore.Model.EntityFlagEnum.hidden);
    
    if (this.cowall.partner) {
      this.cowall.partner.setFlagOn(HSCore.Model.EntityFlagEnum.hidden);
    }
    
    this.cowall.updateConnectedEdges();
  }

  isInteractive(): boolean {
    return true;
  }

  getDescription(): string {
    return "隐藏墙体";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}