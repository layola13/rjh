import { HSApp } from './HSApp';

export class CmdEditNCustomizedMolding extends HSApp.Cmd.Command {
  private _molding: unknown[];
  private _requestType: number;
  private _request: unknown | undefined;

  constructor(molding: unknown | unknown[]) {
    super();
    this._molding = Array.isArray(molding) ? molding : [molding];
    this._requestType = HSFPConstants.RequestType.EditNCustomizedMolding;
    this._request = undefined;
  }

  private _commitRequest(): void {
    if (this._request) {
      this.context.transManager.commit(this._request);
    }
  }

  onComplete(): void {
    this._commitRequest();
    super.onComplete([]);
  }

  onExecute(): void {
    const transManager = this.context.transManager;
    this._request = transManager.createRequest(this._requestType, [this._molding]);
  }

  onReceive(event: unknown, data: unknown): boolean {
    this._request?.receive?.(event, data);
    return super.onReceive(event, data) === true;
  }
}