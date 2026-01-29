import { HSApp } from './HSApp';

interface InspirationDetailResponse {
  data?: TemplateRoomProductData;
}

interface TemplateRoomProductData {
  [key: string]: unknown;
}

interface TemplateRoomProduct {
  apply?: string;
  [key: string]: unknown;
}

interface CatalogPlugin {
  getTemplateRoomProductBuilder(): {
    build(data: TemplateRoomProductData): TemplateRoomProduct | null;
  };
}

interface AutostylerPlugin {
  importStylerTemplate(template: TemplateRoomProduct, room: unknown): void;
}

export class CmdInspirationAction extends HSApp.Cmd.Command {
  private readonly _room: unknown;
  private readonly _templateId: string;

  constructor(room: unknown, templateId: string) {
    super();
    this._room = room;
    this._templateId = templateId;
  }

  onExecute(): void {
    this._selectRoom(this._room);
  }

  private _selectRoom(room: unknown): void {
    this._getInspirationDetail()
      .then((response) => {
        if (response?.data) {
          this.mgr.complete(this);
          this._import(response.data, room);
        } else {
          this.mgr.cancel(this);
        }
      })
      .catch(() => {
        this.mgr.cancel(this);
      });
  }

  private async _getInspirationDetail(): Promise<InspirationDetailResponse | undefined> {
    if (!this._templateId) {
      return;
    }

    const requestData: Record<string, string> = {};
    
    if (HSApp.Config.TENANT === 'fp') {
      requestData.templateId = this._templateId;
    } else {
      requestData.roomId = this._templateId;
    }

    return NWTK.mtop.Catalog.getMyStylerProductDetail({
      data: requestData,
    });
  }

  private _import(data: TemplateRoomProductData, room: unknown): void {
    const catalogPlugin = HSApp.App.getApp()
      .pluginManager.getPlugin<CatalogPlugin>(HSFPConstants.PluginType.Catalog);
    
    const templateProduct = catalogPlugin?.getTemplateRoomProductBuilder().build(data);
    
    if (templateProduct) {
      templateProduct.apply = 'all';
      
      const autostylerPlugin = HSApp.App.getApp()
        .pluginManager.getPlugin<AutostylerPlugin>(HSFPConstants.PluginType.Autostyler);
      
      autostylerPlugin?.importStylerTemplate(templateProduct, room);
    }
  }

  getDescription(): string {
    return '社区灵感库应用 选择房间';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.TemplateDesign;
  }
}