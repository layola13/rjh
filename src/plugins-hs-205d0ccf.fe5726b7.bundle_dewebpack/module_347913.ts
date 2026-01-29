import { Handler } from './Handler';
import { ClipboardUtil } from './ClipboardUtil';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

abstract class IPlugin {
  protected config: PluginConfig;

  constructor(config: PluginConfig) {
    this.config = config;
  }

  abstract onActive(event: unknown, context: unknown): void;
}

class ShareCasePlugin extends IPlugin {
  private handler: Handler;

  constructor() {
    super({
      name: "share case",
      description: "share current case url",
      dependencies: []
    });

    this.handler = new Handler();
  }

  onActive(event: unknown, context: unknown): void {
    super.onActive(event, context);
  }

  hideShareCaseDialog(): void {
    this.handler.hideShareCaseView();
  }

  showShareCaseDialog(): void {
    this.handler.showShareCaseView();
  }

  copyDesignLink(): boolean {
    const designId = HSApp.App.getApp().designMetadata.get("designId");
    const designLink = HSApp.Config.TENANT === "fp"
      ? `${HSApp.PartnerConfig.USERCENTER_URL}/openShared?assetId=${designId}`
      : window.location.href;

    return ClipboardUtil.copyText(designLink);
  }

  shareCase(): void {
    this.handler.shareCase();
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.ShareCase, ShareCasePlugin);