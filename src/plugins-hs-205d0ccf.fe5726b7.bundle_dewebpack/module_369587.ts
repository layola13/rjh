import { HSApp } from './HSApp';
import { IPlugin } from './Plugin';

interface DesignMetadata {
  get(key: string): string | undefined;
}

interface AppParams {
  locale: string;
}

interface App {
  designMetadata: DesignMetadata;
  appParams: AppParams;
  isFloorplanDirty: boolean;
  pluginManager: PluginManager;
}

interface PluginManager {
  getPlugin(pluginName: string): PersistencePlugin | RenderPlugin;
}

interface PersistencePlugin {
  save(arg1: boolean, arg2: boolean, arg3: boolean): Promise<boolean>;
}

interface RenderPlugin {
  getHandler(): RenderHandler;
}

interface RenderHandler {
  uploadSceneData(url: string, options: UploadOptions): Promise<void>;
}

interface UploadOptions {
  oss: {
    headers: {
      'x-oss-object-acl': string;
      'Content-Type': string;
    };
  };
}

interface BenefitMeta {
  link?: string;
}

interface SceneJsonResponse {
  data?: {
    aclUrl?: string;
  };
}

declare global {
  const HSFPConstants: {
    PluginType: {
      Persistence: string;
      ShareViewer: string;
    };
  };
  const adskUser: {
    getBenefitMeta(category: string, key: string): BenefitMeta | null;
  };
  const NWTK: {
    mtop: {
      Design: {
        sceneJsonUrl(params: { data: { designId: string } }): Promise<SceneJsonResponse>;
      };
    };
  };
}

class ShareViewerPlugin extends IPlugin {
  constructor() {
    super({
      name: 'share viewer',
      dependencies: [HSFPConstants.PluginType.Persistence]
    });
  }

  onActive(event: unknown, context: unknown): void {
    super.onActive?.(event, context);
  }

  jumpToShareViewer(designId?: string): void {
    const url = this.getShareViewerUrl(designId);
    window.open(url, '_blank');
  }

  getShareViewerUrl(designId?: string): string {
    const app = HSApp.App.getApp() as App;
    const actualDesignId = designId ?? app.designMetadata.get('designId');
    const benefitMeta = adskUser.getBenefitMeta('whiteLabel', 'shareViewerUrl');
    let shareViewerUrl = HSApp.Config.SHARE_VIEWER_URL as string;

    if (typeof benefitMeta?.link === 'string' && benefitMeta.link) {
      shareViewerUrl = benefitMeta.link;
    }

    return `${shareViewerUrl}?assetId=${actualDesignId}&lang=${app.appParams.locale}`;
  }

  async ensureSaved(): Promise<boolean> {
    const app = HSApp.App.getApp() as App;
    const designId = app.designMetadata.get('designId');

    if (app.isFloorplanDirty || !designId) {
      const persistencePlugin = app.pluginManager.getPlugin('hsw.plugin.persistence.Plugin') as PersistencePlugin;
      const saveResult = await persistencePlugin.save(false, true, true);
      if (!saveResult) {
        return false;
      }
    }

    await this.updateSceneUrl();
    return true;
  }

  async updateSceneUrl(designId?: string): Promise<boolean> {
    const app = HSApp.App.getApp() as App;
    const actualDesignId = designId ?? app.designMetadata.get('designId');

    if (!actualDesignId) {
      return false;
    }

    const response = await NWTK.mtop.Design.sceneJsonUrl({
      data: {
        designId: actualDesignId
      }
    });

    const aclUrl = response.data?.aclUrl;
    if (!aclUrl) {
      return false;
    }

    const renderPlugin = app.pluginManager.getPlugin('hsw.plugin.render.Plugin') as RenderPlugin;
    await renderPlugin.getHandler().uploadSceneData(aclUrl, {
      oss: {
        headers: {
          'x-oss-object-acl': 'public-read',
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }
    });

    return true;
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.ShareViewer, ShareViewerPlugin);

export { ShareViewerPlugin };