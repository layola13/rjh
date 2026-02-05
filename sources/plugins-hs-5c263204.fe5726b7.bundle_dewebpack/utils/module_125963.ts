// @ts-nocheck
interface ContentItem {
  id: string;
  name: string;
  v: string;
  contentType: string;
  XLength: number;
  YLength: number;
  ZLength: number;
  ungroupable: boolean;
}

interface TransactionRequest {
  result: unknown;
}

interface TransactionManager {
  createRequest(requestType: string, params: [unknown[], ContentItem]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface SelectionManager {
  selected(): unknown[];
  unselectAll(): void;
}

interface App {
  selectionManager: SelectionManager;
}

interface Context {
  app: App;
  transManager: TransactionManager;
}

interface CommandManager {
  complete(command: Command): void;
}

abstract class Command {
  protected context!: Context;
  protected mgr!: CommandManager;
  protected output?: unknown;

  abstract onExecute(): void;
  abstract canUndoRedo(): boolean;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

export default class GroupContentsCommand extends Command {
  private readonly _members: unknown[];

  constructor(members: unknown[]) {
    super();
    this._members = members.slice();
  }

  onExecute(): void {
    const app = this.context.app;
    const contentType = HSCore.Util.Content.getGroupContentType(
      app.selectionManager.selected()
    );
    
    app.selectionManager.unselectAll();

    const groupConfig: ContentItem = {
      id: "none",
      name: ResourceManager.getString("productDetailsTab_freegroup_name"),
      v: ResourceManager.getString("productDetailsTab_freegroup_brand"),
      contentType: contentType,
      XLength: 1,
      YLength: 1,
      ZLength: 1,
      ungroupable: true
    };

    const transManager = this.context.transManager;
    const request = transManager.createRequest(
      HSFPConstants.RequestType.GroupContents,
      [this._members, groupConfig]
    );
    
    transManager.commit(request);
    this.output = request.result;
    this.mgr.complete(this);
  }

  canUndoRedo(): boolean {
    return false;
  }

  getDescription(): string {
    return "模型组合";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}