export interface FeedbackQueryData {
  modelObj?: {
    text: string;
    value: string;
  };
  selected?: undefined;
  module?: string;
  env?: string;
}

export interface FeedbackContext {
  model?: {
    id: string;
    name?: string;
  };
  selected?: {
    metadata?: {
      id: string;
      name: string;
      productType: string;
    };
  };
}

export interface FeedbackQueryHandler {
  id: string;
  fn: (context?: FeedbackContext) => FeedbackQueryData | undefined;
  order: number;
  name: string;
}

export const handleFeedbackQueryDataArr: FeedbackQueryHandler[] = [
  {
    id: "imageBrowser",
    fn: function (): FeedbackQueryData | undefined {
      const app = HSApp.App.getApp();
      const imageBrowserPlugin = app.pluginManager.getPlugin(
        "hsw.plugin.renderImageBrowserPlugin.Plugin"
      );

      if (imageBrowserPlugin && imageBrowserPlugin.getIsInImageBrowserEnv()) {
        return {
          selected: undefined
        };
      }

      return undefined;
    },
    order: 100,
    name: "图册环境"
  },
  {
    id: "model",
    fn: function (context?: FeedbackContext): FeedbackQueryData | undefined {
      if (!context) {
        return undefined;
      }

      const { model, selected } = context;

      if (model != null && model.id) {
        return {
          modelObj: {
            text: model.name || "",
            value: model.id
          },
          selected: undefined
        };
      }

      if (selected?.metadata) {
        const { id, name, productType } = selected.metadata;
        const moduleType = productType === "3D" ? "model.3d" : "model.2d";

        return {
          modelObj: {
            text: name,
            value: id
          },
          module: moduleType,
          env: moduleType
        };
      }

      return undefined;
    },
    order: 200,
    name: "模型"
  }
];