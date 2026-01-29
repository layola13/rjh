import { HSApp, HSFPConstants, HSCore } from './types';

class EzhomePersistencePlugin extends HSApp.Plugin.IPlugin {
  constructor() {
    super({
      name: "ezhome persistence plugin",
      description: "ezhome persist design for floorplan",
      dependencies: [
        HSFPConstants.PluginType.CommonUI,
        "hsw.plugin.persistence.Plugin"
      ]
    });
  }

  onActive(pluginContext: unknown, options: unknown): void {
    super.onActive?.(pluginContext, options);

    window.addEventListener("message", (event: MessageEvent) => {
      if (event.origin.includes(HSApp.Config.EZHOME_HOST)) {
        const messageData = event.data;
        const eventType = messageData.eType;
        const app = (pluginContext as any).app;
        const designMetadata = app.designMetadata;

        if (eventType) {
          switch (eventType) {
            case "changeStatusFromSJJ":
              designMetadata.set("documentStatus", messageData.statusValue);
              designMetadata.flush();
              break;
            case "changNameFromSJJ":
              designMetadata.set("designName", messageData.designName);
              designMetadata.flush();
              break;
          }
        }
      }
    });

    const signalHook = new HSCore.Util.SignalHook(this);
    const currentApp = HSApp.App.getApp();

    signalHook.listen(currentApp.signalMetadataChanged, (event: any) => {
      if (
        event.data.hasOwnProperty("documentStatus") ||
        event.data.hasOwnProperty("designName")
      ) {
        const attributes = currentApp.designMetadata.get("attributes");
        const designInfo = {
          designId: currentApp.designMetadata.get("designId"),
          designAttributes: attributes,
          title: currentApp.designMetadata.get("designName"),
          status: currentApp.designMetadata.get("documentStatus")
        };

        HSApp.Util.Design.postDesignInfo(designInfo);
      }
    });
  }
}

HSApp.Plugin.registerPlugin(
  "hsw.brand.ezhome.persistence.Plugin",
  EzhomePersistencePlugin
);