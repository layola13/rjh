import { HSApp } from './HSApp';

export class CmdFlipNCustomizedMolding extends HSApp.Cmd.Command {
  private readonly _molding: unknown;

  constructor(molding: unknown) {
    super();
    this._molding = molding;
  }

  onExecute(): void {
    const transManager = this.context.transManager;
    const request = transManager.createRequest(
      HSFPConstants.RequestType.FlipNCustomizedMolding,
      [this._molding]
    );
    transManager.commit(request);
    this.mgr.complete(this);
  }
}