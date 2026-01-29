interface ProductMeta {
  // Define based on your product metadata structure
  [key: string]: unknown;
}

interface ProductData {
  // Define based on your product data structure
  [key: string]: unknown;
}

interface TransactionRequest {
  result: unknown;
}

interface TransactionManager {
  createRequest(
    requestType: string,
    params: Array<ProductMeta | ProductData | null>
  ): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface CommandManager {
  current?: Command | null;
}

interface Command {
  type?: string;
  mgr?: {
    complete(command: Command): void;
  };
}

interface App {
  transManager: TransactionManager;
  cmdManager: CommandManager;
}

declare namespace HSApp {
  namespace App {
    function getApp(): App;
  }
  namespace Cmd {
    class Command {
      onExecute(): unknown;
      canUndoRedo(): boolean;
      getDescription(): string;
      getCategory(): string;
    }
  }
}

declare namespace HSFPConstants {
  namespace RequestType {
    const AddProduct: string;
  }
  namespace CommandType {
    const CreateRoof: string;
  }
  namespace LogGroupTypes {
    const HardOperation: string;
  }
}

export default class CreateParametricRoofCommand extends HSApp.Cmd.Command {
  private readonly _productMeta: ProductMeta;
  private readonly _data: ProductData;

  constructor(productMeta: ProductMeta, data: ProductData) {
    super();
    this._productMeta = productMeta;
    this._data = data;
  }

  onExecute(): unknown {
    const app = HSApp.App.getApp();
    const transManager = app.transManager;
    const request = transManager.createRequest(
      HSFPConstants.RequestType.AddProduct,
      [this._productMeta, null, null, null, null, null, null, this._data]
    );
    transManager.commit(request);

    const result = request.result;
    const currentCommand = app.cmdManager.current;

    if (
      currentCommand?.type &&
      currentCommand.type === HSFPConstants.CommandType.CreateRoof &&
      currentCommand.mgr
    ) {
      currentCommand.mgr.complete(currentCommand);
    }

    return result;
  }

  canUndoRedo(): boolean {
    return false;
  }

  getDescription(): string {
    return "创建参数化屋顶";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.HardOperation;
  }
}