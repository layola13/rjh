import { HSApp } from './HSApp';
import { HSConstants } from './HSConstants';
import { HSCatalog } from './HSCatalog';
import { HSFPConstants } from './HSFPConstants';
import { HSCore } from './HSCore';

interface NgContent {
  instanceOf(modelClass: string): boolean;
  contentType: {
    isTypeOf(contentType: string): boolean;
  };
}

interface NgCornerWindow extends NgContent {}
interface NgOpening extends NgContent {}
interface NgCustomizedModel extends NgContent {}
interface NgGroup extends NgContent {}

interface Beam {
  forEachContent(callback: (content: NgContent | null) => void): void;
}

interface TransactionManager {
  startSession(): TransactionSession;
  createRequest(requestType: string, args: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface TransactionSession {
  commit(): void;
}

interface TransactionRequest {}

interface CommandManager {
  complete(command: Command): void;
}

abstract class Command {
  protected mgr!: CommandManager;
}

interface RelateContents {
  toBeReassign: NgContent[];
  toBeRemoved: NgContent[];
}

export class CmdDeleteBeam extends Command {
  private beam: Beam;
  private transMgr: TransactionManager;

  constructor(beam: Beam) {
    super();
    this.beam = beam;
    this.transMgr = HSApp.App.getApp().transManager;
  }

  /**
   * Gets related contents and categorizes them into contents to be reassigned
   * and contents to be removed based on their types.
   */
  private getRelateContents(): RelateContents {
    const toBeRemoved: NgContent[] = [];
    const toBeReassign: NgContent[] = [];

    this.beam.forEachContent((content) => {
      if (!content || !content.instanceOf(HSConstants.ModelClass.NgContent)) {
        return;
      }

      if (content.instanceOf(HSConstants.ModelClass.NgCornerWindow)) {
        return;
      }

      const shouldRemove =
        content.instanceOf(HSConstants.ModelClass.NgOpening) ||
        content.instanceOf(HSConstants.ModelClass.NgCustomizedModel) ||
        content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_Wainscot) ||
        content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_WallAttached) ||
        content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ParametricOpening);

      if (shouldRemove) {
        toBeRemoved.push(content);
      } else {
        toBeReassign.push(content);
      }
    });

    return {
      toBeReassign,
      toBeRemoved,
    };
  }

  public onExecute(): void {
    const relateContents = this.getRelateContents();
    const requests: TransactionRequest[] = [];
    const session = this.transMgr.startSession();

    relateContents.toBeRemoved.forEach((content) => {
      if (content.instanceOf(HSConstants.ModelClass.NgGroup)) {
        const request = this.transMgr.createRequest(
          HSFPConstants.RequestType.DeleteAssembly,
          [content]
        );
        requests.push(request);
      } else {
        let shouldUpdateRelations: boolean | undefined;

        if (
          content instanceof HSCore.Model.Opening ||
          content instanceof HSCore.Model.ParametricOpening
        ) {
          shouldUpdateRelations = false;
        }

        const request = this.transMgr.createRequest(
          HSFPConstants.RequestType.DeleteProduct,
          [content, shouldUpdateRelations]
        );
        requests.push(request);
      }
    });

    const compositeRequest = this.transMgr.createRequest(
      HSConstants.RequestType.Composite,
      [requests]
    );
    this.transMgr.commit(compositeRequest);

    const deleteBeamRequest = this.transMgr.createRequest(
      HSFPConstants.RequestType.DeleteBeam,
      [this.beam]
    );
    this.transMgr.commit(deleteBeamRequest);

    session.commit();
    this._onComplete();
  }

  public onReceive(param1: unknown, param2: unknown): boolean {
    return super.onReceive?.(param1, param2) ?? false;
  }

  private _onComplete(): void {
    this.mgr.complete(this);
  }
}