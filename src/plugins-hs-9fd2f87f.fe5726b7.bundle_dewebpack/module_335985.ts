interface CustomizedModelMeta {
  [key: string]: unknown;
}

interface CustomizedModel {
  [key: string]: unknown;
}

interface TransactionManager {
  createRequest(
    requestType: string,
    params: [CustomizedModelMeta, CustomizedModel]
  ): Request;
  commit(request: Request): void;
}

interface Request {
  [key: string]: unknown;
}

interface CommandContext {
  transManager: TransactionManager;
}

interface CommandManager {
  complete(command: Command): void;
}

abstract class Command {
  context!: CommandContext;
  mgr?: CommandManager;
  
  abstract onExecute(): void;
}

class CmdAddCustomizedModelMolding extends Command {
  private readonly _meta: CustomizedModelMeta;
  private readonly _customizedModel: CustomizedModel;
  private _request?: Request;

  constructor(meta: CustomizedModelMeta, customizedModel: CustomizedModel) {
    super();
    this._meta = meta;
    this._customizedModel = customizedModel;
  }

  onExecute(): void {
    const transManager = this.context.transManager;
    this._request = transManager.createRequest(
      HSFPConstants.RequestType.AddCustomizedModelMolding,
      [this._meta, this._customizedModel]
    );
    transManager.commit(this._request);
    this.mgr?.complete(this);
  }
}

const pluginNamespace = HSApp.Util.Core.define("hsw.plugin.customizedmodeling.cmd");
pluginNamespace.CmdAddCustomizedModelMolding = CmdAddCustomizedModelMolding;

export default CmdAddCustomizedModelMolding;