import { HSApp } from './HSApp';

interface TransactionManager {
  createRequest(type: string, params: unknown[]): Request;
  commit(request: Request): void;
}

interface Request {
  // Request interface properties
}

interface Context {
  transManager: TransactionManager;
}

interface Manager {
  complete(command: CmdDeleteNCustomizedModelMolding): void;
}

type Molding = unknown;

export class CmdDeleteNCustomizedModelMolding extends HSApp.Cmd.Command {
  private _molding: Molding[];
  private _request?: Request;

  constructor(molding: Molding | Molding[]) {
    super();
    this._molding = Array.isArray(molding) ? molding : [molding];
  }

  protected onExecute(): void {
    const transactionManager: TransactionManager = this.context.transManager;
    this._request = transactionManager.createRequest(
      HSFPConstants.RequestType.DeleteNCustomizedModelMolding,
      [this._molding]
    );
    transactionManager.commit(this._request);
    
    if (this.mgr) {
      this.mgr.complete(this);
    }
  }

  protected get context(): Context {
    return (super as any).context;
  }

  protected get mgr(): Manager | undefined {
    return (super as any).mgr;
  }
}

declare namespace HSFPConstants {
  namespace RequestType {
    const DeleteNCustomizedModelMolding: string;
  }
}