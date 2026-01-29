import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

interface TransactionManager {
  createRequest(requestType: string, params: unknown[]): Request;
  commit(request: Request): void;
}

interface Request {
  // Define request properties based on your application's needs
}

interface CommandContext {
  transManager: TransactionManager;
}

interface CommandManager {
  complete(command: Command): void;
}

abstract class Command {
  protected context!: CommandContext;
  protected mgr?: CommandManager;
  
  abstract onExecute(): void;
}

type LightSlot = unknown; // Replace with actual LightSlot type from your codebase

export class CmdDeleteNCustomizedModelLightSlot extends Command {
  private _lightSlot: LightSlot[];
  private _request?: Request;

  constructor(lightSlot: LightSlot | LightSlot[]) {
    super();
    this._lightSlot = Array.isArray(lightSlot) ? lightSlot : [lightSlot];
  }

  onExecute(): void {
    const transManager = this.context.transManager;
    this._request = transManager.createRequest(
      HSFPConstants.RequestType.DeleteNCustomizedModelLightSlot,
      [this._lightSlot]
    );
    transManager.commit(this._request);
    this.mgr?.complete(this);
  }
}