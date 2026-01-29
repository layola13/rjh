import { HSCore } from './HSCore';

interface CustomDuplicateData {
  proxyId: string;
  [key: string]: unknown;
}

interface CustomizedPm {
  webCADDocument: unknown;
  modelingDocId: string;
  getUniqueParent(): CustomizedPm | undefined;
  openDiyDocument(flag: boolean): Promise<void>;
}

interface EntityProxy {
  loadFromDuplicateData(data: CustomDuplicateData): CustomizedPm | null;
}

interface Scene {
  getCustomizedPms(): CustomizedPm[];
}

interface ActiveDocument {
  scene: Scene;
}

interface DocManager {
  activeDocument: ActiveDocument;
}

export class AddProxyDiysRequest extends HSCore.Transaction.Common.StateRequest {
  private rootModel: CustomizedPm | undefined = undefined;
  private customDuplicateDatas: CustomDuplicateData[];
  private docBefore: unknown = undefined;
  private docAfter: unknown = undefined;

  constructor(customDuplicateDatas: CustomDuplicateData[]) {
    super();
    this.customDuplicateDatas = customDuplicateDatas;
  }

  onCommit(): CustomizedPm[] {
    const content = this.createContent();
    super.onCommit([]);
    return content;
  }

  private createContent(): CustomizedPm[] {
    const docManager = HSCore.Doc.getDocManager() as DocManager;
    const customizedPms = docManager.activeDocument.scene.getCustomizedPms();
    
    this.rootModel = customizedPms.length > 0 ? customizedPms[0] : undefined;
    
    if (this.rootModel) {
      this.docBefore = this.rootModel.webCADDocument;
    }

    const results: CustomizedPm[] = [];
    
    this.customDuplicateDatas.forEach((data) => {
      const proxy = HSCore.Model.EntityProxyFactory.getProxyObject(data.proxyId) as EntityProxy | null;
      
      if (proxy) {
        const result = proxy.loadFromDuplicateData(data);
        this.rootModel = result?.getUniqueParent();
        if (result) {
          results.push(result);
        }
      }
    });

    this.docAfter = this.rootModel?.webCADDocument;
    
    return results;
  }

  async onUndo(): Promise<void> {
    if (this.rootModel) {
      if (this.docBefore) {
        this.rootModel.webCADDocument = this.docBefore;
        await this.rootModel.openDiyDocument(false);
      } else {
        DiySdk.DmDiyApi.closeDocument(this.rootModel.modelingDocId);
      }
    }
    
    super.onUndo([]);
  }

  async onRedo(): Promise<void> {
    super.onRedo([]);
    
    if (this.rootModel) {
      this.rootModel.webCADDocument = this.docAfter;
      await this.rootModel.openDiyDocument(false);
    }
  }
}