import { HSCore } from './HSCore';
import { PerformanceLogCategory, PerformanceOperationTypes } from './PerformanceLog';

interface Structure {
  forEachContent(callback: (content: Content | null) => void): void;
}

interface Content {
  instanceOf(modelClass: string): boolean;
  contentType: ContentType;
}

interface ContentType {
  isTypeOf(type: string): boolean;
}

interface TransactionManager {
  startSession(): TransactionSession;
  createRequest(requestType: string, args: unknown[]): Request;
  commit(request: Request): void;
}

interface TransactionSession {
  commit(): void;
}

interface Request {}

interface CommandManager {
  complete(cmd: Command): void;
}

interface Command {
  mgr: CommandManager;
}

interface RelateContents {
  toBeReassign: Content[];
  toBeRemoved: Content[];
}

declare const HSApp: {
  App: {
    getApp(): {
      transManager: TransactionManager;
    };
  };
  Cmd: {
    Command: new () => Command;
  };
};

declare const HSConstants: {
  ModelClass: {
    NgContent: string;
    NgCornerWindow: string;
    NgOpening: string;
    NgCustomizedModel: string;
    NgGroup: string;
  };
  RequestType: {
    Composite: string;
  };
};

declare const HSFPConstants: {
  RequestType: {
    DeleteAssembly: string;
    DeleteProduct: string;
    DeleteStructure: string;
  };
};

declare const HSCatalog: {
  ContentTypeEnum: {
    ext_Wainscot: string;
    ext_WallAttached: string;
    ParametricOpening: string;
  };
};

declare const log: {
  logger(category: string): PerformanceLogger;
};

interface PerformanceLogger {
  time(operationType: string): void;
  timeEnd(operationType: string, log: boolean): void;
}

export class CmdDeleteStructure extends HSApp.Cmd.Command {
  private structure: Structure;
  private transMgr: TransactionManager;
  private _perfLog: PerformanceLogger;

  constructor(structure: Structure) {
    super();
    this._perfLog = log.logger(PerformanceLogCategory.Operation);
    this.structure = structure;
    this.transMgr = HSApp.App.getApp().transManager;
  }

  /**
   * Gets related contents and categorizes them into those to be reassigned and removed
   */
  getRelateContents(): RelateContents {
    const toBeRemoved: Content[] = [];
    const toBeReassign: Content[] = [];

    this.structure.forEachContent((content) => {
      if (content && content.instanceOf(HSConstants.ModelClass.NgContent)) {
        if (content.instanceOf(HSConstants.ModelClass.NgCornerWindow)) {
          return;
        }

        if (
          content.instanceOf(HSConstants.ModelClass.NgOpening) ||
          content.instanceOf(HSConstants.ModelClass.NgCustomizedModel) ||
          content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_Wainscot) ||
          content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_WallAttached) ||
          content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ParametricOpening)
        ) {
          toBeRemoved.push(content);
        } else {
          toBeReassign.push(content);
        }
      }
    });

    return {
      toBeReassign,
      toBeRemoved,
    };
  }

  /**
   * Executes the delete structure command
   */
  onExecute(): void {
    this._perfLog.time(PerformanceOperationTypes.StructureRemoved);

    const relateContents = this.getRelateContents();
    const requests: Request[] = [];
    const session = this.transMgr.startSession();

    relateContents.toBeRemoved.forEach((content) => {
      if (content.instanceOf(HSConstants.ModelClass.NgGroup)) {
        const request = this.transMgr.createRequest(
          HSFPConstants.RequestType.DeleteAssembly,
          [content]
        );
        requests.push(request);
      } else {
        let shouldUpdateRelated: boolean | undefined;

        if (
          content instanceof HSCore.Model.Opening ||
          content instanceof HSCore.Model.ParametricOpening
        ) {
          shouldUpdateRelated = false;
        }

        const request = this.transMgr.createRequest(
          HSFPConstants.RequestType.DeleteProduct,
          [content, shouldUpdateRelated]
        );
        requests.push(request);
      }
    });

    const compositeRequest = this.transMgr.createRequest(
      HSConstants.RequestType.Composite,
      [requests]
    );
    this.transMgr.commit(compositeRequest);

    const deleteStructureRequest = this.transMgr.createRequest(
      HSFPConstants.RequestType.DeleteStructure,
      [this.structure]
    );
    this.transMgr.commit(deleteStructureRequest);

    session.commit();
    this._onComplete();
    this._perfLog.timeEnd(PerformanceOperationTypes.StructureRemoved, true);
  }

  onReceive(arg1: unknown, arg2: unknown): boolean {
    return super.onReceive?.(arg1, arg2) ?? true;
  }

  private _onComplete(): void {
    this.mgr.complete(this);
  }
}