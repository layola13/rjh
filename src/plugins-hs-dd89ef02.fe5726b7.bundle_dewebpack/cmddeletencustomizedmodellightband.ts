import { HSApp } from './518193';

export class CmdDeleteNCustomizedModelLightBand extends HSApp.Cmd.Command {
  private _lightBand: unknown;
  private _request: unknown;

  constructor(lightBand: unknown) {
    super();
    this._lightBand = lightBand;
  }

  onExecute(): void {
    const transManager = this.context.transManager;
    this._request = transManager.createRequest(
      HSFPConstants.RequestType.DeleteNCustomizedModelLightBand,
      [this._lightBand]
    );
    transManager.commit(this._request);
    
    if (this.mgr) {
      this.mgr.complete(this);
    }
  }
}