interface Position {
  position: { x: number; y: number; z: number };
  rotation: number;
  host: any;
}

interface DumpContext {
  basicContentData: any[];
  version?: string;
  states?: Record<string, any>;
  constraints?: Record<string, any>;
  entities?: Record<string, any>;
  materials?: Map<string, any>;
  idGenerator?: any;
  materialIdGenerator?: any;
  stateIdGenerator?: any;
  constraintIdGenerator?: any;
  data?: Record<string, any>;
  productsMap?: Map<string, any>;
}

interface ApplyToWholeWallBoardRequestOptions {
  positions: Position[];
  dumpContext: DumpContext;
  app: any;
  basicContent: any;
  rmContents: any[];
  rmCntHostsMap: Map<string, any>;
}

interface ContentSpec {
  content: any;
  host: any;
  parent: any;
}

export class ApplytoWholeWallBoardRequest extends HSCore.Transaction.Request {
  private readonly _positions: Position[];
  private readonly _dumpContext: DumpContext;
  private readonly _app: any;
  private readonly _basicContent: any;
  private readonly _contentHostsMap: Map<string, any>;
  private readonly _rmContents: any[];
  private readonly _rmCntHostsMap: Map<string, any>;
  private _contents?: any[];

  constructor(options: ApplyToWholeWallBoardRequestOptions) {
    super();
    this._positions = options.positions;
    this._dumpContext = options.dumpContext;
    this._app = options.app;
    this._basicContent = options.basicContent;
    this._contentHostsMap = new Map();
    this._rmContents = options.rmContents;
    this._rmCntHostsMap = options.rmCntHostsMap;
  }

  private _generateNewContents(): any[] {
    const newContents: any[] = [];
    const basicContentData = this._dumpContext.basicContentData;
    const templateData = JSON.parse(JSON.stringify(basicContentData[0]));
    
    const entityIdMap = new Map<string, string>();
    const stateIdMap = new Map<string, string>();
    const materialIdMap = new Map<string, string>();
    const constraintIdMap = new Map<string, string>();
    
    const extendedContext: DumpContext = Object.assign(this._dumpContext, {
      version: "2.3",
      states: {},
      constraints: {},
      entities: {},
      materials: new Map(),
      idGenerator: HSCore.Util.Entity.createIDGeneratorForClone(
        entityIdMap,
        HSCore.Util.IDGeneratorType.Entity
      ),
      materialIdGenerator: HSCore.Util.Entity.createIDGeneratorForClone(
        materialIdMap,
        HSCore.Util.IDGeneratorType.Material
      ),
      stateIdGenerator: HSCore.Util.Entity.createIDGeneratorForClone(
        stateIdMap,
        HSCore.Util.IDGeneratorType.State
      ),
      constraintIdGenerator: HSCore.Util.Entity.createIDGeneratorForClone(
        constraintIdMap,
        HSCore.Util.IDGeneratorType.Constraint
      ),
    });

    for (const positionData of this._positions) {
      if (positionData) {
        entityIdMap.clear();
        stateIdMap.clear();
        materialIdMap.clear();
        constraintIdMap.clear();
        
        templateData.x = positionData.position.x;
        templateData.y = positionData.position.y;
        templateData.z = positionData.position.z;
        templateData.ZRotation = positionData.rotation;
        
        extendedContext.data![templateData.id] = templateData;
        extendedContext.productsMap!.set(
          templateData.seekId,
          this._basicContent.metadata
        );
        
        const entity = HSCore.Model.Entity.loadFromDump(templateData, extendedContext);
        this._contentHostsMap.set(entity.ID, positionData.host);
        newContents.push(entity);
      }
    }
    
    return newContents;
  }

  private _getContentSpec(content: any, parent: any): ContentSpec {
    return {
      content,
      host: this._contentHostsMap.get(content.ID),
      parent,
    };
  }

  private _removeContents(contents: any[]): void {
    for (const content of contents) {
      const removeResult = HSCore.Util.Content.removeContent(content);
      content._host = removeResult.host;
    }
    HSApp.Selection.Manager.unselectAll();
  }

  private _addContents(contents: any[]): void {
    const parent = this._basicContent.getUniqueParent();
    
    for (const content of contents) {
      if (parent.hasChild(content)) {
        parent.removeChild(content.ID);
      }
      HSCore.Util.Content.addContent(this._getContentSpec(content, parent));
    }
  }

  public onUndo(): void {
    this._removeContents(this._contents!);
    
    this._rmContents.forEach((content) => {
      content.assignTo(null);
      content.assignTo(this._rmCntHostsMap.get(content.ID));
    });
    
    this._addContents(this._rmContents);
  }

  public onRedo(): void {
    this._contents!.forEach((content) => {
      content.assignTo(null);
      content.assignTo(this._contentHostsMap.get(content.ID));
    });
    
    this._addContents(this._contents!);
    this._removeContents(this._rmContents);
  }

  public onCommit(): void {
    const generatedContents = this._generateNewContents();
    
    if (generatedContents?.length) {
      this._contents = generatedContents;
      this._addContents(generatedContents);
    }
  }
}