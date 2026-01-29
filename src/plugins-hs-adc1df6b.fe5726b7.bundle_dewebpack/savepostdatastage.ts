interface SavePostDataContext {
  isSaveas: boolean;
}

interface SavePostDataInput {
  data: DesignData;
  ext: Record<string, unknown>;
}

interface DesignData {
  ext?: string;
  attributes?: string;
}

interface AttributesData {
  audit?: unknown;
  submitForKG?: unknown;
}

interface DesignResult {
  id: string;
  versionId?: string;
  attributes?: string;
}

interface SaveResultResponse {
  status: string;
  data?: DesignMetaResult;
  info?: unknown;
}

interface DesignMetaResult {
  result?: DesignResult;
  [key: string]: unknown;
}

interface FloorplanData {
  ext: Record<string, unknown>;
}

interface DesignMetadata {
  get(key: string): string | undefined;
  set(key: string, value: string): void;
}

interface AppInstance {
  floorplan: FloorplanData;
  designMetadata: DesignMetadata;
}

interface DesignUtils {
  populateSaveDesignData(floorplan: FloorplanData, data: DesignData, param: undefined): void;
  transformResultData<T>(promise: Promise<T>): Promise<T>;
  postSaveDesignRequest(data: DesignData, isSaveas: boolean): Promise<DesignResult>;
  extractDesignExtraInfoToJson(data: DesignMetaResult): Promise<DesignMetaResult>;
  refreshDesignMeta(app: AppInstance, designId: string, shouldUpdate: boolean): Promise<DesignMetaResult>;
  populateRefreshMetaResult(app: AppInstance, result: DesignMetaResult): void;
}

declare const DesignUtils: DesignUtils;

export class SavePostDataStage {
  private app: AppInstance;

  constructor(config: { app: AppInstance }) {
    this.app = config.app;
  }

  async execute(
    context: SavePostDataContext,
    input: SavePostDataInput
  ): Promise<SaveResultResponse> {
    const { data, ext } = input;
    
    data.ext = JSON.stringify(ext);
    
    DesignUtils.populateSaveDesignData(this.app.floorplan, data, undefined);
    
    const designId = this.app.designMetadata.get("designId");
    
    if (!context.isSaveas) {
      if (designId) {
        const existingDesign = await DesignUtils.transformResultData(
          this.refreshDesignMeta(designId, false)
        );
        
        if (existingDesign?.attributes) {
          const existingAttributes: AttributesData = JSON.parse(existingDesign.attributes);
          const currentAttributes: AttributesData = data.attributes 
            ? JSON.parse(data.attributes) 
            : {};
          
          currentAttributes.audit = existingAttributes.audit;
          currentAttributes.submitForKG = existingAttributes.submitForKG;
          data.attributes = JSON.stringify(currentAttributes);
        }
      }
    } else {
      const currentAttributes: AttributesData = data.attributes 
        ? JSON.parse(data.attributes) 
        : {};
      
      delete currentAttributes.audit;
      delete currentAttributes.submitForKG;
      data.attributes = JSON.stringify(currentAttributes);
    }
    
    const saveRequest = DesignUtils.postSaveDesignRequest(data, context.isSaveas);
    const saveResult = await DesignUtils.transformResultData(saveRequest);
    
    const metadata = this.app.designMetadata;
    
    if (!saveResult?.versionId) {
      if (!metadata.get("designVersion")) {
        return Promise.reject({
          status: "error",
          info: saveResult
        });
      }
    } else {
      metadata.set("designVersion", saveResult.versionId);
    }
    
    const refreshedMeta = await DesignUtils.transformResultData(
      this.refreshDesignMeta(saveResult.id)
    );
    
    const enrichedMeta = await DesignUtils.transformResultData(
      this.extractDesignExtraInfoToJson(refreshedMeta)
    );
    
    Object.assign(this.app.floorplan.ext, ext);
    enrichedMeta.result = saveResult;
    
    return {
      status: "success",
      data: enrichedMeta
    };
  }

  extractDesignExtraInfoToJson(data: DesignMetaResult): Promise<DesignMetaResult> {
    return DesignUtils.extractDesignExtraInfoToJson(data);
  }

  refreshDesignMeta(
    designId: string,
    shouldUpdate: boolean = false
  ): Promise<DesignMetaResult> {
    return DesignUtils.refreshDesignMeta(this.app, designId, shouldUpdate).then(
      (result) => {
        DesignUtils.populateRefreshMetaResult(this.app, result);
        return result;
      }
    );
  }
}