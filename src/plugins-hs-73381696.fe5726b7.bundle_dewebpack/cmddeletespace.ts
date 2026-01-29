abstract class Command {
  protected context: any;
  protected mgr: any;
  
  abstract onExecute(): void;
  onCleanup(): void {}
  canUndoRedo(): boolean {
    return true;
  }
}

interface Floor {
  getMaster(): any;
}

interface TransactionManager {
  createRequest(requestType: string, args: any[]): any;
  commit(request: any): void;
}

interface Context {
  transManager: TransactionManager;
}

declare namespace HSFPConstants {
  enum RequestType {
    DeleteSpace = 'DeleteSpace'
  }
}

export class CmdDeleteSpace extends Command {
  private floor: Floor;

  constructor(floor: Floor) {
    super();
    this.floor = floor;
  }

  onExecute(): void {
    const master = this.floor.getMaster();
    const transManager = this.context.transManager;
    const request = transManager.createRequest(
      HSFPConstants.RequestType.DeleteSpace,
      [master, this.floor]
    );
    transManager.commit(request);
    this.mgr.complete();
  }

  onCleanup(): void {
    super.onCleanup();
  }

  canUndoRedo(): boolean {
    return false;
  }
}