import { HSApp } from './HSApp';
import { HSCore } from './HSCore';

interface ProductMeta {
  contentType?: string;
  [key: string]: unknown;
}

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
  x: number;
  y: number;
  z: number;
}

interface DiyProxyData {
  id: string;
  [key: string]: unknown;
}

interface CustomizeProxyData {
  id: string;
  entityId?: string;
  [key: string]: unknown;
}

interface SoftModelMember {
  entityId?: string;
  meta?: ProductMeta;
  members?: SoftModelMember[];
  [key: string]: unknown;
}

interface SoftModelData {
  entityId?: string;
  meta?: ProductMeta;
  members?: SoftModelMember[];
  [key: string]: unknown;
}

interface AddProductsData {
  diyProxyData: DiyProxyData[];
  customizeProxyData: CustomizeProxyData[];
  softModelData: SoftModelData[];
}

interface TransactionRequest<T = unknown> {
  result?: T;
  [key: string]: unknown;
}

interface TransactionManager {
  startSession(): TransactionSession;
  createRequest<T = unknown>(type: string, args: unknown[]): TransactionRequest<T>;
  commit(request: TransactionRequest): void;
}

interface TransactionSession {
  commit(): void;
}

interface CommandContext {
  transManager: TransactionManager;
}

interface CommandManager {
  complete(command: Command): void;
}

abstract class Command {
  protected context!: CommandContext;
  protected mgr!: CommandManager;
  protected output?: unknown;

  abstract onExecute(): unknown;
  abstract canUndoRedo(): boolean;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

export class CmdAddProducts extends Command {
  private _data: AddProductsData;

  constructor(data: AddProductsData) {
    super();
    this._data = data;
  }

  onExecute(): unknown[] {
    HSApp.Selection.Manager.unselectAll();
    
    const session = this.context.transManager.startSession();
    const products = this.addProducts();
    
    session.commit();
    this.output = products;
    this.mgr.complete(this);
    
    return this.output;
  }

  private addProducts(): unknown[] {
    const { diyProxyData, customizeProxyData, softModelData } = this._data;
    const results: unknown[] = [];
    const customizeResultMap: Record<string, unknown> = {};

    if (diyProxyData.length > 0) {
      const diyResult = this.addDiy2(diyProxyData).result;
      if (diyResult?.length) {
        results.push(...diyResult);
      }
    }

    for (let i = 0; i < customizeProxyData.length; i++) {
      const customizeRequest = this.addCustomizeProduct(customizeProxyData[i]);
      if (customizeRequest.result) {
        customizeResultMap[customizeProxyData[i].id] = customizeRequest.result;
      }
    }

    const processModelNode = (node: SoftModelData, resultMap: Record<string, unknown>): unknown[] => {
      const nodeResults: unknown[] = [];

      if (node.members?.length) {
        const memberResults: unknown[] = [];
        for (let i = 0; i < node.members.length; i++) {
          const member = node.members[i];
          memberResults.push(...processModelNode(member, resultMap));
        }
        nodeResults.push(this.addGroup(node, memberResults).result);
      } else if (resultMap[node.entityId!]) {
        nodeResults.push(resultMap[node.entityId!]);
        delete resultMap[node.entityId!];
      } else if (node.meta) {
        nodeResults.push(this.addProduct(node).result);
      }

      return nodeResults;
    };

    for (let i = 0; i < softModelData.length; i++) {
      const model = softModelData[i];
      results.push(...processModelNode(model, customizeResultMap));
    }

    Object.keys(customizeResultMap).forEach((key) => {
      results.push(customizeResultMap[key]);
    });

    return results;
  }

  private addGroup(data: SoftModelData, contents: unknown[]): TransactionRequest {
    const { transManager } = this.context;
    const contentType = HSCore.Util.Content.getGroupContentType(contents);
    
    Object.assign(data.meta!, { contentType });

    const request = transManager.createRequest(
      HSFPConstants.RequestType.GroupContents,
      [contents, data.meta]
    );
    
    transManager.commit(request);
    return request;
  }

  private addDiy2(diyData: DiyProxyData[]): TransactionRequest<unknown[]> {
    const { transManager } = this.context;
    const request = transManager.createRequest<unknown[]>(
      HSFPConstants.RequestType.AddProxyDiysRequest,
      [diyData]
    );
    
    transManager.commit(request);
    return request;
  }

  private addCustomizeProduct(proxyData: CustomizeProxyData): TransactionRequest {
    const { transManager } = this.context;
    const request = transManager.createRequest(
      HSFPConstants.RequestType.AddProxyModelRequest,
      [proxyData]
    );
    
    transManager.commit(request);
    return request;
  }

  private addProduct(productData: SoftModelData): TransactionRequest {
    const { meta, position, rotation, scale, materialMap } = productData as {
      meta: ProductMeta;
      position?: Position;
      rotation?: Rotation;
      scale?: Scale;
      materialMap?: Map<string, unknown>;
    };

    const { transManager } = this.context;
    const requestType = HSFPConstants.RequestType.AddProduct;
    const args = [
      meta,
      position,
      rotation,
      scale,
      undefined,
      materialMap ?? new Map()
    ];

    const request = transManager.createRequest(requestType, args);
    transManager.commit(request);
    
    return request;
  }

  canUndoRedo(): boolean {
    return false;
  }

  getDescription(): string {
    return '灵感库添加物品至画布';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}