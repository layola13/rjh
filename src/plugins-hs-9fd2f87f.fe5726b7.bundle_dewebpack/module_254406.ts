interface IContext {
  transManager: ITransactionManager;
}

interface ITransactionManager {
  commit(request: IRequest): void;
  createRequest(requestType: string, args: unknown[]): IRequest;
}

interface IRequest {
  receive(event: string, data: unknown): void;
}

abstract class Command {
  protected context!: IContext;
  
  abstract onComplete(): void;
  abstract onExecute(): void;
  abstract onReceive(event: string, data: unknown): boolean;
}

class EditNCustomizedModelLightSlotCommand extends Command {
  private readonly _content: unknown;
  private readonly _lightSlotId: unknown;
  private readonly _requestType: string;
  private _request?: IRequest;

  constructor(content: unknown, lightSlotId: unknown) {
    super();
    this._content = content;
    this._lightSlotId = lightSlotId;
    this._requestType = HSFPConstants.RequestType.EditNCustomizedModelLightSlot;
    this._request = undefined;
  }

  private _commitRequest(): void {
    if (this._request) {
      this.context.transManager.commit(this._request);
    }
  }

  onComplete(): void {
    this._commitRequest();
    super.onComplete();
  }

  onExecute(): void {
    const transManager = this.context.transManager;
    this._request = transManager.createRequest(this._requestType, [
      this._content,
      this._lightSlotId
    ]);
  }

  onReceive(event: string, data: unknown): boolean {
    switch (event) {
      case "ceilingchanging":
      case "ceilingchangeend":
        this._request?.receive(event, data);
        break;
    }
    return super.onReceive(event, data);
  }
}

export default EditNCustomizedModelLightSlotCommand;