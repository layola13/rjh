interface Context {
  transManager: TransactionManager;
}

interface TransactionManager {
  createRequest(requestType: string, params: unknown[]): Request;
  commit(request: Request): void;
}

interface Request {
  type: string;
  params: unknown[];
}

interface App {
  context: Context;
}

interface ClicksRatio {
  id: string;
  name: string;
}

interface CurrentParams {
  activeSection: string;
  activeSectionName: string;
  clicksRatio: ClicksRatio;
}

declare namespace HSFPConstants {
  const enum RequestType {
    ChangeGlobalWidth = 'ChangeGlobalWidth'
  }
  
  const enum LogGroupTypes {
    WallOperation = 'WallOperation'
  }
}

declare namespace HSApp.Cmd {
  class Command {
    context: Context;
  }
}

export default class ChangeGlobalWidthCommand extends HSApp.Cmd.Command {
  app: App;

  constructor(app: App) {
    super();
    this.app = app;
  }

  onExecute(width: number): void {
    const request = this.context.transManager.createRequest(
      HSFPConstants.RequestType.ChangeGlobalWidth,
      [width]
    );
    this.context.transManager.commit(request);
  }

  getCurrentParams(): CurrentParams {
    return {
      activeSection: HSFPConstants.LogGroupTypes.WallOperation,
      activeSectionName: "墙体操作",
      clicksRatio: {
        id: "changeGlobalWidth",
        name: "墙体厚度调整"
      }
    };
  }

  getDescription(): string {
    return "修改全局墙宽";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}