import { default as BaseCommand } from './BaseCommand';

export class CmdMoveWFAOpening extends BaseCommand {
  private readonly _moveRequest: any;

  constructor(entity: any, options: { hostFace: any }) {
    super(entity, undefined, options);
    
    this._moveRequest = HSApp.App.getApp()
      .transManager
      .createRequest(
        HSFPConstants.RequestType.MoveWFAOpening,
        [entity, options.hostFace]
      );
  }

  protected _updateMouseTipsMsg(event: any, message: any): void {
    // Implementation intentionally empty
  }
}