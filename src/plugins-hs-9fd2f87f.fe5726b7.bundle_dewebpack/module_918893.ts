interface LightSlot {
  // Define properties based on actual usage
  [key: string]: unknown;
}

interface TransactionManager {
  createRequest(requestType: string, args: unknown[]): Request;
  commit(request: Request): void;
}

interface Request {
  // Define request structure
  [key: string]: unknown;
}

interface CommandContext {
  transManager: TransactionManager;
}

declare namespace HSFPConstants {
  enum RequestType {
    ToggleSelfHostLightBand = 'ToggleSelfHostLightBand'
  }
}

declare namespace HSApp.Cmd {
  class Command {
    context: CommandContext;
    onExecute(): void;
  }
}

class ToggleSelfHostLightBandCommand extends HSApp.Cmd.Command {
  private readonly _lightSlot: LightSlot | null;
  private readonly _checked: boolean;
  private _request?: Request;

  constructor(lightSlot: LightSlot | null, checked: boolean) {
    super();
    this._lightSlot = lightSlot;
    this._checked = checked;
  }

  onExecute(): void {
    if (this._lightSlot) {
      const transManager = this.context.transManager;
      this._request = transManager.createRequest(
        HSFPConstants.RequestType.ToggleSelfHostLightBand,
        [this._lightSlot, this._checked]
      );
      transManager.commit(this._request);
    }
  }
}

export default ToggleSelfHostLightBandCommand;