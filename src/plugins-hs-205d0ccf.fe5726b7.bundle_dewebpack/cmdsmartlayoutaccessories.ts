import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';
import { HSCatalog } from './HSCatalog';
import { SmartLayoutUtil } from './SmartLayoutUtil';

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

interface SoftClothData {
  meta?: unknown;
  host?: unknown;
}

interface AlgorithmItem {
  id: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  softClothData?: SoftClothData;
  sub_list?: AlgorithmItem[];
}

type AlgorithmData = Map<string, AlgorithmItem[]>;

interface ProductData {
  [key: string]: unknown;
}

interface TransactionManager {
  createRequest(requestType: string, params: unknown[]): TransactionRequest;
  commit(request: TransactionRequest, merge?: boolean): void;
}

interface TransactionRequest {
  result: DModel;
}

interface DModel {
  contentType: {
    isTypeOf(type: string): boolean;
  };
}

interface Context {
  transManager: TransactionManager;
}

interface CommandManager {
  complete(command: CmdSmartLayoutAccessories): void;
}

export class CmdSmartLayoutAccessories extends HSApp.Cmd.Command {
  private _anchorContent?: DModel;
  private _models: DModel[];
  private _algorithmData: AlgorithmData;
  private _productData: ProductData[];
  private _previousData: unknown[];
  private _transMgr!: TransactionManager;
  private _mergePreviousRequest!: boolean;
  
  public output?: DModel[];
  public context!: Context;
  public mgr!: CommandManager;

  constructor(
    models: DModel[],
    algorithmData: AlgorithmData,
    productData: ProductData[] = [],
    previousData: unknown[] = [],
    anchorContent?: DModel
  ) {
    super();
    this._models = models;
    this._algorithmData = algorithmData;
    this._productData = productData;
    this._previousData = previousData;
    this._mergePreviousRequest = false;
    this._anchorContent = anchorContent;
  }

  public onExecute(): DModel[] {
    if (this._models.length === 0) {
      return [];
    }

    let result: DModel[] = [];
    const algorithmData = this._algorithmData;
    const productData = this._productData;
    const previousData = this._previousData;

    this._transMgr = this.context.transManager;
    this._mergePreviousRequest = false;

    previousData.forEach((data) => {
      const deleteRequest = this._transMgr.createRequest(
        HSFPConstants.RequestType.DeleteProduct,
        [data]
      );
      this._transMgr.commit(deleteRequest, this._mergePreviousRequest);
      this._mergePreviousRequest = true;
    });

    for (const [anchorId, items] of algorithmData.entries()) {
      items.forEach((item) => {
        const anchorContent = this._anchorContent ?? this._models[0];
        const targetModel = SmartLayoutUtil.getDModelById(anchorId) ?? anchorContent;
        result = result.concat(this._addProducts(productData, item, targetModel, []));
      });
    }

    this.output = result;
    this.mgr.complete(this);
    return result;
  }

  private _addProducts(
    productData: ProductData[],
    item: AlgorithmItem,
    parentModel: DModel,
    accumulator: DModel[]
  ): DModel[] {
    const product = productData[item.id];
    
    const position: Position = {
      x: item.position[0],
      y: item.position[1],
      z: item.position[2]
    };

    const rotation: Rotation = {
      x: item.rotation[0],
      y: item.rotation[1],
      z: item.rotation[2]
    };

    const scale: Scale = {
      XScale: item.scale[0],
      YScale: item.scale[1],
      ZScale: item.scale[2]
    };

    const addRequest = this._transMgr.createRequest(
      HSFPConstants.RequestType.AddProduct,
      [product, position, rotation.z, scale, parentModel]
    );
    
    this._transMgr.commit(addRequest, this._mergePreviousRequest);
    
    const addedModel = addRequest.result;

    if (addedModel.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_SoftCloth)) {
      this._addSoftCloth(addedModel, item.softClothData);
    }

    if (item.sub_list) {
      item.sub_list.forEach((subItem) => {
        const subResults = this._addProducts(productData, subItem, addedModel, accumulator);
        accumulator = subResults;
      });
    }

    this._mergePreviousRequest = true;
    accumulator.push(addedModel);
    
    return accumulator;
  }

  private _addSoftCloth(model: DModel, softClothData: SoftClothData = {}): void {
    const placeSoftClothRequest = this._transMgr.createRequest(
      HSFPConstants.RequestType.PlaceSoftCloth,
      [model, softClothData.meta, softClothData.host]
    );
    this._transMgr.commit(placeSoftClothRequest);
  }
}