import { HSCore, HSCatalog, HSFPConstants } from './types';

interface PasteContentOptions {
  dataContent: any;
  selectedContent?: any;
  contentsJSON: ContentsJSON;
  floorplan: Floorplan;
  productsMap?: Map<string, any>;
  position?: Position;
  altKey?: boolean;
  entity?: any;
  rotation?: number;
}

interface Position {
  x: number;
  y: number;
  z: number;
}

interface ContentsJSON {
  data: any[];
  states: any[];
  constraints: any[];
  materials?: any[];
  products: any[];
}

interface Floorplan {
  scene: {
    activeLayer: Layer;
  };
}

interface Layer {
  hasChild(entity: any): boolean;
  removeChild(id: string): void;
}

interface LoadContext {
  data: Record<string, any>;
  statesData: Record<string, any>;
  constraintsData: Map<string, any>;
  materialsData: Map<string, any>;
  productsMap: Map<string, any>;
  entities: Record<string, any>;
  materials: Map<string, any>;
  states: Record<string, any>;
  constraints: Record<string, any>;
  idGenerator: any;
  materialIdGenerator: any;
  stateIdGenerator: any;
  constraintIdGenerator: any;
}

interface ContentSpec {
  content: any;
  host: any;
  parent: Layer;
}

export default class PasteContentTransaction extends HSCore.Transaction.Common.StateRequest {
  private dataContent: any;
  private selectedContent: any;
  private childContents: any[];
  private contentsJSON: ContentsJSON;
  private floorplan: Floorplan;
  private productsMap: Map<string, any>;
  private position?: Position;
  private altKey: boolean;
  private pasteContent: any | null;
  private entity?: any;
  private rotation?: number;
  private contentSpec?: any;
  private _contentSpec?: any;

  constructor(options: PasteContentOptions) {
    super();
    
    this.dataContent = options.dataContent;
    this.selectedContent = options.selectedContent || {};
    this.childContents = Object.values(this.selectedContent.contents || {});
    this.contentsJSON = options.contentsJSON;
    this.floorplan = options.floorplan;
    this.productsMap = options.productsMap || new Map();
    this.position = options.position;
    this.altKey = options.altKey || false;
    this.pasteContent = null;
    this.entity = options.entity;
    this.rotation = options.rotation;
  }

  private generateContext(): LoadContext | null {
    const contentsJSON = this.contentsJSON;
    if (!contentsJSON) {
      return null;
    }

    const EntityUtil = HSCore.Util.Entity;
    const entityIdMap = new Map();
    const materialIdMap = new Map();
    const stateIdMap = new Map();
    const constraintIdMap = new Map();
    const materialsDataMap = new Map<string, any>();
    const statesData: Record<string, any> = {};
    const constraintsDataMap = new Map<string, any>();
    const productsMap = this.productsMap;

    const context: LoadContext = {
      data: {},
      statesData,
      constraintsData: constraintsDataMap,
      materialsData: materialsDataMap,
      productsMap,
      entities: {},
      materials: new Map(),
      states: {},
      constraints: {},
      idGenerator: EntityUtil.createIDGeneratorForClone(
        entityIdMap,
        HSCore.Util.IDGeneratorType.Entity
      ),
      materialIdGenerator: EntityUtil.createIDGeneratorForClone(
        materialIdMap,
        HSCore.Util.IDGeneratorType.Material
      ),
      stateIdGenerator: EntityUtil.createIDGeneratorForClone(
        stateIdMap,
        HSCore.Util.IDGeneratorType.State
      ),
      constraintIdGenerator: EntityUtil.createIDGeneratorForClone(
        constraintIdMap,
        HSCore.Util.IDGeneratorType.Constraint
      )
    };

    contentsJSON.data.forEach((dataItem) => {
      context.data[dataItem.id] = dataItem;
    });

    contentsJSON.states.forEach((stateItem) => {
      statesData[stateItem.id] = stateItem;
    });

    contentsJSON.states.forEach((stateItem) => {
      const state = HSCore.State.State.loadFromDump(stateItem, context);
      context.states[stateItem.id] = state;
    });

    contentsJSON.constraints.forEach((constraintItem) => {
      constraintsDataMap.set(constraintItem.id, constraintItem);
    });

    contentsJSON.constraints.forEach((constraintItem) => {
      const constraint = HSCore.Constraint.Constraint.loadFromDump(constraintItem, context);
      context.constraints[constraintItem.id] = constraint;
    });

    if (contentsJSON.materials) {
      contentsJSON.materials.forEach((materialItem) => {
        materialsDataMap.set(materialItem.id, materialItem);
      });

      contentsJSON.materials.forEach((materialItem) => {
        const material = HSCore.Material.MaterialData.loadFromDump(materialItem, context);
        context.materials.set(materialItem.id, material);
      });
    }

    contentsJSON.products.forEach((productItem) => {
      if (
        productItem &&
        (!productsMap.has(productItem.id) ||
          HSCatalog.ProductTypeEnum.PAssembly === productItem.productType)
      ) {
        const productMeta = HSCatalog.Meta.load(productItem);
        productsMap.set(productItem.id, productMeta);
      }
    });

    return context;
  }

  onCommit(): any {
    const context = this.generateContext();
    const entity = HSCore.Model.Entity.loadFromDump(this.dataContent, context);

    if (this.position) {
      entity.x = this.position.x;
      entity.y = this.position.y;
      entity.z = this.position.z;
    }

    if (this.rotation !== undefined) {
      entity.rotation = this.rotation;
    }

    this.addContent(entity);

    this.childContents.forEach((childContent) => {
      childContent.assignTo(entity);
    });

    if (entity instanceof HSCore.Model.PAssembly) {
      this._contentSpec = HSCore.Util.Content.getPAssemblySpec(entity);
    } else if (entity instanceof HSCore.Model.CornerWindow) {
      entity.buildPartsInfo();
    }

    super.onCommit([]);

    this.pasteContent = entity;
    return entity;
  }

  canTransactField(): boolean {
    return true;
  }

  onUndo(): void {
    if (this.pasteContent instanceof HSCore.Model.PAssembly) {
      this.contentSpec = HSCore.Util.Content.removePAssembly(this.pasteContent);
    } else {
      this.pasteContent.setFlagOn(HSCore.Model.EntityFlagEnum.removed);
    }

    if (this.altKey) {
      this.childContents.forEach((childContent) => {
        childContent.assignTo(this.selectedContent);
      });
    }

    super.onUndo([]);
  }

  onRedo(): void {
    if (this.contentSpec) {
      HSCore.Util.Content.addPAssembly(this.contentSpec);
    }

    if (this.altKey) {
      this.childContents.forEach((childContent) => {
        childContent.assignTo(this.pasteContent);
      });
    }

    super.onRedo([]);
  }

  private addContentToActiveLayer(entity: any): void {
    if (this.floorplan.scene.activeLayer.hasChild(entity)) {
      this.floorplan.scene.activeLayer.removeChild(entity.ID);
    }

    HSCore.Util.Content.addContent(this.getContentSpec(entity));
  }

  private addContent(entity: any): void {
    if (entity.members) {
      entity.members.forEach((member: any) => {
        this.addContent(member);
      });
    }

    this.addContentToActiveLayer(entity);
  }

  private getContentSpec(entity: any): ContentSpec {
    return {
      content: entity,
      host: entity.getHost(),
      parent: this.floorplan.scene.activeLayer
    };
  }

  getDescription(): string {
    return "粘贴物品";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}