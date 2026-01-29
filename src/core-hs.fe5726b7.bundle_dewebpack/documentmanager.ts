import { Logger } from './Logger';
import { Floorplan } from './Floorplan';
import { Manager as TransactionManager } from './TransactionManager';
import { Signal, SignalHook } from './Signal';
import { ServiceManager } from './ServiceManager';

interface DocumentActivatedPayload {
  floorplan: Floorplan;
}

interface DocumentDeactivatedPayload {
  floorplan: Floorplan;
}

interface DocumentContext {
  floorplan: Floorplan;
  context: unknown;
}

type DesignProductsMap = Map<string, unknown>;

export class DocumentManager {
  private static _instance: DocumentManager | undefined;
  
  private readonly logger: typeof Logger;
  private _activeDocument: Floorplan | undefined;
  private _lastSavedTransRequest: unknown | undefined;
  
  public readonly transManager: TransactionManager;
  public readonly signalDocumentActivated: Signal<DocumentActivatedPayload>;
  public readonly signalDocumentDeactivated: Signal<DocumentDeactivatedPayload>;
  public readonly signalMetadataChanged: Signal<Record<string, unknown>>;
  public readonly signalMigrateStatus: Signal<unknown>;
  
  private readonly _signalHook: SignalHook;

  constructor() {
    this.logger = Logger.logger('HSCore.Doc');
    this._activeDocument = undefined;
    this._lastSavedTransRequest = undefined;
    
    this.transManager = new TransactionManager();
    this.signalDocumentActivated = new HSCore.Util.Signal(this);
    this.signalDocumentDeactivated = new Signal(this);
    this.signalMetadataChanged = new Signal(this);
    this.signalMigrateStatus = new Signal(this);
    this._signalHook = new SignalHook(this);
    
    HSCore.Util.IDGenerator.register(undefined, (type: string) => 
      this.activeDocument.getIdGenerator(type)
    );
    
    this._registerPaveDependency();
  }

  public static instance(): DocumentManager {
    if (!DocumentManager._instance) {
      DocumentManager._instance = new DocumentManager();
    }
    return DocumentManager._instance;
  }

  public get isFloorplanDirty(): boolean {
    return this._lastSavedTransRequest !== this.transManager.getLatestCommittedRequest() || 
           this._lastSavedTransRequest !== this.transManager.getLatestCommittedSessionRequest();
  }

  public set isFloorplanDirty(value: boolean) {
    if (!value) {
      this._lastSavedTransRequest = this.transManager.getLatestCommittedSessionRequest() 
        ? this.transManager.getLatestCommittedSessionRequest() 
        : this.transManager.getLatestCommittedRequest();
    }
  }

  public get activeDocument(): Floorplan {
    if (!this._activeDocument) {
      this._activeDocument = new Floorplan(this);
      this._activeDocument.init();
    }
    return this._activeDocument;
  }

  public set activeDocument(document: Floorplan) {
    if (document && document !== this._activeDocument) {
      if (this._activeDocument) {
        this.signalDocumentDeactivated.dispatch({
          floorplan: this._activeDocument
        });
      }
      
      this._activeDocument = document;
      
      if (this._activeDocument) {
        this.signalDocumentActivated.dispatch({
          floorplan: this._activeDocument
        });
        
        const metadata = this._activeDocument.designMetadata.toObject();
        this.signalMetadataChanged.dispatch(metadata);
      }
    }
  }

  public setActiveDocumentSilent(document: Floorplan): void {
    this._activeDocument = document;
  }

  public get designMetadata(): unknown {
    return this.activeDocument.designMetadata;
  }

  public set designMetadata(metadata: unknown) {
    if (metadata && metadata !== this.activeDocument.designMetadata) {
      this.activeDocument.designMetadata = metadata;
    }
  }

  public get geometryManager(): unknown {
    return this.activeDocument.geometryManager;
  }

  public get associationManager(): unknown {
    return this.activeDocument.associationManager;
  }

  public init(): void {
    HSCore.Transaction.Api.register(this.transManager);
  }

  public async openDocument(
    designId: string,
    version: string,
    productType: string,
    productsMap?: DesignProductsMap
  ): Promise<DocumentContext> {
    return await this._newDocument(designId, version, productType, true, productsMap);
  }

  public async newDocument(
    designId: string,
    version: string,
    productType: string,
    setAsActive: boolean = true,
    productsMap?: DesignProductsMap
  ): Promise<DocumentContext> {
    return await this._newDocument(designId, version, productType, setAsActive, productsMap);
  }

  private async _newDocument(
    designId: string,
    version: string,
    productType: string,
    setAsActive: boolean = true,
    productsMap?: DesignProductsMap
  ): Promise<DocumentContext> {
    if (!productsMap) {
      productsMap = await HSCore.Util.Meta.getDesignProductsMap(designId, productType);
    }

    const floorplan = new Floorplan(this);

    if (setAsActive) {
      this.activeDocument = floorplan;
      floorplan.init();
      const context = await floorplan.open(designId, productType, version, productsMap);
      return {
        floorplan,
        context
      };
    } else {
      const previousDocument = this._activeDocument;
      this._activeDocument = floorplan;
      floorplan.init();
      const context = await floorplan.open(designId, productType, version, productsMap);
      this._activeDocument = previousDocument;
      return {
        floorplan,
        context
      };
    }
  }

  public clearActiveDocument(): void {
    this.transManager.clear();
    this._lastSavedTransRequest = undefined;
    
    if (this.designMetadata) {
      (this.designMetadata as any).reset();
    }
    
    if (this._activeDocument) {
      this._activeDocument.clear();
    }
  }

  private _registerPaveDependency(): void {
    const miscService = ServiceManager.getMiscService();
    
    miscService.registerContentTypeEnum(HSCatalog.ContentTypeEnum);
    miscService.registerMetaManager(HSCatalog.MetaManager.instance());
    miscService.registerSignalCreator((sender: unknown) => new HSCore.Util.Signal(sender));
    miscService.registerIDGenerator((count: number) => 
      this.activeDocument.getIdGenerator(HSCore.Util.IDGeneratorType.Pave).generate(count)
    );
    miscService.registerSvgConvertor(HSCore.Util.SVGUtil);
  }

  public registerPTInstance(instance: unknown): void {
    ServiceManager.getMiscService().registerPTInstance(instance);
  }
}

export const getDocManager = (): DocumentManager => DocumentManager.instance();