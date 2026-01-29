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

declare namespace HSFPConstants {
  namespace RequestType {
    namespace OutdoorDrawing {
      const DeleteVertex: string;
    }
  }
  namespace LogGroupTypes {
    const OutdoorDrawing: string;
  }
}

declare namespace HSApp {
  namespace Cmd {
    abstract class Command {
      protected context: CommandContext;
      abstract onExecute(): void;
      abstract getDescription(): string;
      abstract getCategory(): string;
    }
  }
}

export class CmdDeleteVertex extends HSApp.Cmd.Command {
  private readonly sketch2dBuilder: Sketch2DBuilder;
  private readonly vertex: Vertex;

  constructor(sketch2dBuilder: Sketch2DBuilder, vertex: Vertex) {
    super();
    this.sketch2dBuilder = sketch2dBuilder;
    this.vertex = vertex;
  }

  public onExecute(): void {
    const { transManager, selectionManager } = this.context;
    const request = this._createRequest();
    transManager.commit(request);
    selectionManager.unselectAll();
  }

  private _createRequest(): unknown {
    return this.context.transManager.createRequest(
      HSFPConstants.RequestType.OutdoorDrawing.DeleteVertex,
      [this.sketch2dBuilder, this.vertex]
    );
  }

  public getDescription(): string {
    return "外部区域绘制-删除顶点";
  }

  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.OutdoorDrawing;
  }
}