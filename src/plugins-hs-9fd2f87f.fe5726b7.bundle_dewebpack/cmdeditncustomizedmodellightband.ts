abstract class Command {
  abstract onComplete(args: unknown[]): void;
  abstract onExecute(): void;
  abstract onReceive(event: string, data: unknown): boolean;
  abstract getDescription(): string;
}

interface TransactionManager {
  commit(request: Request): void;
  createRequest(requestType: string, params: unknown[]): Request;
}

interface Request {
  receive(event: string, data: unknown): void;
}

interface App {
  transManager: TransactionManager;
}

interface HSAppNamespace {
  App: {
    getApp(): App;
  };
  Cmd: {
    Command: typeof Command;
  };
}

interface HSFPConstantsNamespace {
  RequestType: {
    EditNCustomizedModelLightBand: string;
  };
}

declare const HSApp: HSAppNamespace;
declare const HSFPConstants: HSFPConstantsNamespace;

type LightBandContent = unknown;
type LightBandId = string | number;

export class CmdEditNCustomizedModelLightBand extends Command {
  private _content: LightBandContent;
  private _requestType: string;
  private _request: Request | undefined;
  private _lightBandId: LightBandId;

  constructor(content: LightBandContent, lightBandId: LightBandId) {
    super();
    this._content = content;
    this._lightBandId = lightBandId;
    this._requestType = HSFPConstants.RequestType.EditNCustomizedModelLightBand;
    this._request = undefined;
  }

  private _commitRequest(): void {
    if (this._request) {
      HSApp.App.getApp().transManager.commit(this._request);
    }
  }

  onComplete(): void {
    this._commitRequest();
    super.onComplete([{}]);
  }

  onExecute(): void {
    const transManager = HSApp.App.getApp().transManager;
    this._request = transManager.createRequest(this._requestType, [
      this._content,
      this._lightBandId
    ]);
  }

  onReceive(event: string, data: unknown): boolean {
    switch (event) {
      case "flip":
      case "profileWidth":
      case "sizeReset":
        this._request?.receive(event, data);
        break;
    }
    return super.onReceive(event, data);
  }

  getDescription(): string {
    return "编辑灯带";
  }
}