import { HSApp } from './HSApp';

interface TransactionManager {
  commit(request: unknown): void;
  createRequest(requestType: string, args: unknown[]): unknown;
}

interface SelectionManager {
  unselectAll(): void;
}

interface CommandContext {
  transManager: TransactionManager;
  selectionManager: SelectionManager;
}

interface Sketch2DBuilder {
  // Add specific properties as needed
}

interface Vertex {
  // Add specific properties as needed
}

export class CmdDeleteVertex extends HSApp.Cmd.Command {
  private sketch2dBuilder: Sketch2DBuilder;
  private vertex: Vertex;
  protected context!: CommandContext;

  constructor(sketch2dBuilder: Sketch2DBuilder, vertex: Vertex) {
    super();
    this.sketch2dBuilder = sketch2dBuilder;
    this.vertex = vertex;
  }

  onExecute(): void {
    const { transManager, selectionManager } = this.context;
    const request = this._createRequest();
    transManager.commit(request);
    selectionManager.unselectAll();
  }

  private _createRequest(): unknown {
    return this.context.transManager.createRequest(
      HSFPConstants.RequestType.SlabEdit.DeleteVertex,
      [this.sketch2dBuilder, this.vertex]
    );
  }

  getDescription(): string {
    return '楼板编辑删除顶点';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.SlabEdit;
  }
}