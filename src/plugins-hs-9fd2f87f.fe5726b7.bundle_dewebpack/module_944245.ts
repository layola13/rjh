interface DesignMetadata {
  get(key: string): any;
  set(key: string, value: any): void;
}

interface App {
  designMetadata: DesignMetadata;
  pluginManager: PluginManager;
  errorLogger: ErrorLogger;
}

interface PluginManager {
  getPlugin(name: string): any;
}

interface ErrorLogger {
  push(message: string, details: ErrorDetails): void;
}

interface ErrorDetails {
  errorStack: Error;
  description: string;
  errorInfo: {
    info: any;
    path: {
      file: string;
      functionName: string;
    };
  };
}

interface DesignData {
  designType?: number;
  [key: string]: any;
}

interface Attributes {
  acs_asset_id?: string;
  acs_project_id?: string;
  templateId?: string;
  [key: string]: any;
}

interface Address {
  [key: string]: any;
}

interface PCDData {
  [key: string]: any;
}

interface StyleItem {
  code: string;
  [key: string]: any;
}

interface StyleData {
  [key: string]: any;
}

interface MtopResponse {
  ret: string[];
  data?: {
    items?: StyleItem[];
  };
}

interface Logger {
  error(message: any): void;
}

const DESIGN_TYPE_TEMPLATE = 4;
const DESIGN_TYPE_NORMAL = 2;

const editDesignPlugin = {
  logger: (window as any).log?.logger("plugin.editdesign") as Logger,

  tempDesign: {} as DesignData,

  projectData: [] as any[],

  styleData: {} as StyleData,

  pcdData: {} as PCDData,

  getDesignMeta(): DesignMetadata {
    return (window as any).HSApp.App.getApp().designMetadata;
  },

  isDirectSaveAgain(designId: string): boolean {
    return designId === this.getDesignMeta().get("designId");
  },

  isOwner(userId: string): boolean {
    const designMeta = this.getDesignMeta();
    return (window as any).adskUser.isLogin() && designMeta.get("userId") === userId;
  },

  isReadOnly(): boolean {
    return (window as any).HSApp.Util.Design.isReadOnly();
  },

  isPrivate(): boolean {
    return (
      this.getDesignMeta().get("documentStatus") ===
      (window as any).HSCore.Doc.DocumentStatus.Private
    );
  },

  isTemplateDesignUser(): boolean {
    return (
      (window as any).adskUser.adaId === (window as any).HSApp.Config.ADAIDFORTEMPLATES
    );
  },

  saveChanges(assetId: string | null, designData: DesignData): Promise<void> {
    if (!assetId) {
      this.tempDesign = designData;
      return Promise.resolve();
    }

    return this.postSaveDesignRequest(assetId, designData)
      .then(() => {
        const app = (window as any).HSApp.App.getApp() as App;
        app.pluginManager
          .getPlugin("hsw.plugin.persistence.Plugin")
          .refreshDesignMeta(assetId);
      })
      .catch((error: any) => {
        this.logger.error(error);
        const errorMessage = "[Plugin editdesign]: save design failed";
        const app = (window as any).HSApp.App.getApp() as App;
        app.errorLogger.push(errorMessage, {
          errorStack: new Error(errorMessage),
          description: errorMessage,
          errorInfo: {
            info: error,
            path: {
              file: "homestyler-tools-web/web/plugin/editdesign/api.js",
              functionName: "saveChanges()",
            },
          },
        });
      });
  },

  setDocumentStatus(status: any): void {
    (window as any).HSApp.App.getApp().designMetadata.set("documentStatus", status);
  },

  postSaveDesignRequest(assetId: string, designData: DesignData): Promise<any> {
    if (!designData) {
      return Promise.resolve({
        erMessage: `no data to save:${String(designData)}`,
      });
    }

    const designType = this.isTemplateDesignUser()
      ? DESIGN_TYPE_TEMPLATE
      : DESIGN_TYPE_NORMAL;
    
    designData.designType = designType;

    return (window as any).HSApp.Io.Request.Design.updateDesignByAssetId(
      assetId,
      designData
    );
  },

  getfloorplanarea(): number {
    return (window as any).HSApp.Util.Floorplan.getFloorplanArea();
  },

  getFloorplanGrossFloorArea(floorId: string): number {
    return (window as any).HSApp.Util.Floorplan.getFloorplanGrossFloorArea(floorId);
  },

  getFloorplanGrossInternalArea(floorId: string): number {
    return (window as any).HSApp.Util.Floorplan.getFloorplanGrossInternalArea(floorId);
  },

  getAttributes(): Attributes {
    return this.getDesignMeta().get("attributes") ?? {};
  },

  getAddress(): Address {
    return this.getDesignMeta().get("address") ?? {};
  },

  getAcsAssetId(): string | null {
    const attributes = this.getAttributes();
    const queryStrings = (window as any).HSApp.Util.Url.getQueryStrings();
    return queryStrings.acs_asset_id ?? attributes.acs_asset_id ?? null;
  },

  getAcsProjectId(): string | null {
    const attributes = this.getAttributes();
    const queryStrings = (window as any).HSApp.Util.Url.getQueryStrings();
    return attributes.acs_project_id ?? queryStrings.acs_project_id ?? null;
  },

  getTemplateId(): string | null {
    return this.getAttributes().templateId ?? null;
  },

  loadAddressData(): Promise<PCDData> {
    const apiUrl = `${(window as any).HSApp.Config.GET_NEW_ADDRESS_API}pcd.json`;

    if (Object.keys(this.pcdData).length > 0) {
      return Promise.resolve(this.pcdData);
    }

    return (window as any).NWTK.ajax
      .get(apiUrl)
      .then((data: PCDData) => {
        this.pcdData = data;
        return data;
      })
      .catch((error: any) => {
        return error;
      });
  },

  loadNeighborhoodData(neighborhoodId: string): Promise<any> {
    const apiUrl = `${(window as any).HSApp.Config.GET_ADDRESS_API}neighbor${neighborhoodId}.js`;

    return (window as any).NWTK.ajax
      .get(apiUrl)
      .then((data: any) => {
        return data;
      })
      .catch((error: any) => {
        return error;
      });
  },

  loadStyleData(): Promise<StyleItem[]> {
    if (Object.keys(this.styleData).length > 0) {
      return Promise.resolve(this.styleData as StyleItem[]);
    }

    return (window as any).NWTK.mtop.Design.getDesignStyles()
      .then((response: MtopResponse) => {
        const data = response.data;

        if (
          response &&
          response.ret[0].includes("SUCCESS") &&
          data?.items
        ) {
          this.styleData = data.items.filter(
            (item: StyleItem) => item.code !== "all"
          ) as any;
          return this.styleData as StyleItem[];
        }

        return this.styleData as StyleItem[];
      })
      .catch((error: any) => {
        return error;
      });
  },
};

export default editDesignPlugin;