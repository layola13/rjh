interface Position {
  x: number;
  y: number;
  z: number;
}

interface Rotation {
  x: number;
  y: number;
  z: number;
}

interface Scale {
  XScale: number;
  YScale: number;
  ZScale: number;
}

interface AlgorithmDataItem {
  id: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  sub_list?: AlgorithmDataItem[];
  softClothData?: SoftClothData;
}

interface SoftClothData {
  meta?: unknown;
  host?: unknown;
}

interface ProductData {
  [key: string]: unknown;
}

interface TransactionManager {
  startSession(): TransactionSession;
  createRequest(requestType: string, params: unknown[]): TransactionRequest;
  commit(request: TransactionRequest, merge?: boolean): void;
}

interface TransactionSession {
  commit(): void;
}

interface TransactionRequest {
  result: ProductResult;
}

interface ProductResult {
  contentType: {
    isTypeOf(type: string): boolean;
  };
}

interface CommandContext {
  transManager: TransactionManager;
}

interface CommandManager {
  complete(command: Command): void;
}

abstract class Command {
  protected context: CommandContext;
  protected mgr: CommandManager;
  protected output: ProductResult[];

  abstract onExecute(): ProductResult[];
}

export default function createAddProductsCommand(BaseCommand: typeof Command) {
  return class AddProductsCommand extends BaseCommand {
    private _anchorContent: unknown;
    private _algorithmData: AlgorithmDataItem[];
    private _productData: ProductData[];
    private _previousData: unknown[];
    private _isRestore: boolean;
    private _transMgr: TransactionManager;
    private _mergePreviousRequest: boolean;

    constructor(
      anchorContent: unknown,
      algorithmData: AlgorithmDataItem[] = [],
      productData: ProductData[] = [],
      previousData: unknown[] = [],
      isRestore: boolean = false
    ) {
      super();
      this._anchorContent = anchorContent;
      this._algorithmData = algorithmData;
      this._productData = productData;
      this._previousData = previousData;
      this._isRestore = isRestore;
    }

    onExecute(): ProductResult[] {
      let products: ProductResult[] = [];
      const algorithmData = this._algorithmData;
      const productData = this._productData;
      const previousData = this._previousData;

      this._transMgr = this.context.transManager;
      this._mergePreviousRequest = false;

      if (this._isRestore) {
        const session = this.context.transManager.startSession();
        previousData.forEach((data) => {
          const request = this._transMgr.createRequest(
            HSFPConstants.RequestType.DeleteProduct,
            [data]
          );
          this._transMgr.commit(request, this._mergePreviousRequest);
          this._mergePreviousRequest = true;
        });
        session.commit();
      } else {
        const session = this.context.transManager.startSession();
        algorithmData.forEach((algorithmItem) => {
          products = products.concat(
            this._addProducts(productData, algorithmItem, this._anchorContent, [])
          );
        });
        previousData.forEach((data) => {
          const request = this._transMgr.createRequest(
            HSFPConstants.RequestType.DeleteProduct,
            [data]
          );
          this._transMgr.commit(request, this._mergePreviousRequest);
          this._mergePreviousRequest = true;
        });
        this.output = products;
        session.commit();
      }

      this.mgr.complete(this);
      return products;
    }

    private _addProducts(
      productData: ProductData[],
      algorithmItem: AlgorithmDataItem,
      anchorContent: unknown,
      results: ProductResult[]
    ): ProductResult[] {
      const product = productData[algorithmItem.id];
      const position: Position = {
        x: algorithmItem.position[0],
        y: algorithmItem.position[1],
        z: algorithmItem.position[2]
      };
      const rotation: Rotation = {
        x: algorithmItem.rotation[0],
        y: algorithmItem.rotation[1],
        z: algorithmItem.rotation[2]
      };
      const scale: Scale = {
        XScale: algorithmItem.scale[0],
        YScale: algorithmItem.scale[1],
        ZScale: algorithmItem.scale[2]
      };

      const addProductRequest = this._transMgr.createRequest(
        HSFPConstants.RequestType.AddProduct,
        [product, position, rotation.z, scale, anchorContent]
      );
      this._transMgr.commit(addProductRequest, this._mergePreviousRequest);

      const productResult = addProductRequest.result;

      if (productResult.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_SoftCloth)) {
        this._addSoftCloth(productResult, algorithmItem.softClothData);
      }

      if (algorithmItem.sub_list) {
        algorithmItem.sub_list.forEach((subItem) => {
          const subResults = this._addProducts(productData, subItem, productResult, results);
          results = subResults;
        });
      }

      this._mergePreviousRequest = true;
      results.push(productResult);
      return results;
    }

    private _addSoftCloth(product: ProductResult, softClothData: SoftClothData = {}): void {
      const request = this._transMgr.createRequest(
        HSFPConstants.RequestType.PlaceSoftCloth,
        [product, softClothData.meta, softClothData.host]
      );
      this._transMgr.commit(request);
    }
  };
}