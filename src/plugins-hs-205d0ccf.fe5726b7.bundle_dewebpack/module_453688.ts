interface TransactionRequest {
  type: string;
  params: unknown[];
}

interface TransactionManager {
  createRequest(type: string, params: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface CommandContext {
  transManager: TransactionManager;
}

interface LogClickRatio {
  id: string;
  name: string;
}

interface CommandParams {
  activeSection: string;
  activeSectionName: string;
  clicksRatio: LogClickRatio;
}

declare namespace HSFPConstants {
  enum RequestType {
    FreezeWall = 'FreezeWall'
  }
  
  enum LogGroupTypes {
    WallOperation = 'WallOperation'
  }
}

declare namespace HSApp.Cmd {
  class Command {
    context: CommandContext;
  }
}

export default class FreezeWallCommand extends HSApp.Cmd.Command {
  private fp: unknown;
  private isLocked: boolean;

  constructor(fp: unknown, isLocked: boolean) {
    super();
    this.fp = fp;
    this.isLocked = isLocked;
  }

  onExecute(params: unknown): void {
    const request = this.context.transManager.createRequest(
      HSFPConstants.RequestType.FreezeWall,
      [this.fp, params]
    );
    this.context.transManager.commit(request);
  }

  getDescription(): string {
    return `${this.isLocked ? '锁定墙体' : '解锁墙体'}`;
  }

  getCurrentParams(): CommandParams {
    return {
      activeSection: HSFPConstants.LogGroupTypes.WallOperation,
      activeSectionName: '墙体操作',
      clicksRatio: {
        id: 'freezeWall',
        name: '锁墙'
      }
    };
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}