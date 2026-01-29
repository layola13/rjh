enum ProductType {
  Material = 'Material',
  Model = 'Model'
}

enum FeedbackModule {
  Material2D = 'model.2d',
  Model3D = 'model.3d'
}

const MATERIAL_2D_REPORT_REASONS: readonly string[] = [
  'report-2d-reason-texture-not-seamless',
  'report-2d-reason-texture-repeat',
  'report-2d-reason-texture-distort',
  'report-2d-reason-texture-blur',
  'report-2d-reason-material-render-bad',
  'report-2d-reason-others'
];

const MODEL_3D_REPORT_REASONS: readonly string[] = [
  'report-3d-reason-face-break',
  'report-3d-reason-face-black',
  'report-3d-reason-direction-issue',
  'report-3d-reason-dimension-issue',
  'report-3d-reason-stick-issue',
  'report-3d-reason-default-height-issue',
  'report-3d-reason-render-displace',
  'report-3d-reason-render-material-bad',
  'report-3d-reason-others'
];

const FEEDBACK_OBJECT_TYPE_2D = 30;
const FEEDBACK_OBJECT_TYPE_3D = 40;

interface PluginMetadata {
  name: string;
  description: string;
  dependencies: string[];
}

interface ModelInfo {
  id: string;
  type: ProductType;
  name: string;
}

interface FeedbackConfig {
  module: FeedbackModule;
  model: ModelInfo;
  style: {
    type: string;
  };
  productType: ProductType;
  tpzzModelNeedUpdate?: boolean;
}

interface ReportPanelProps {
  problemList: readonly string[];
  feedbackObject: number;
  seekId: string;
}

interface ProductThumbnailProps {
  imgSrc: string;
  onClose: () => void;
}

interface FeedbackPlugin {
  showFeedbackEntry(config: FeedbackConfig): void;
}

interface PluginManager {
  getPlugin(pluginType: string): FeedbackPlugin;
}

interface App {
  pluginManager: PluginManager;
  getApp(): App;
}

declare const HSApp: {
  App: App;
  Config: {
    TENANT: string;
  };
  Plugin: {
    IPlugin: new (...args: any[]) => any;
    registerPlugin(name: string, plugin: any): void;
  };
};

declare const HSCatalog: {
  ProductTypeEnum: {
    Material: ProductType;
    Model: ProductType;
  };
};

declare const HSFPConstants: {
  PluginType: {
    Feedback: string;
  };
};

declare const ReactDOM: {
  render(element: any, container: Element | null): void;
  unmountComponentAtNode(container: Element): boolean;
};

declare const React: {
  createElement(component: any, props?: any, ...children: any[]): any;
};

declare const $: (selector: string) => {
  append(html: string): void;
  addClass(className: string): void;
  removeClass(className: string): void;
};

declare const ReportPanelComponent: React.ComponentType<ReportPanelProps>;
declare const ModelApplyPanelComponent: React.ComponentType;
declare const UploadPinhuaPopupComponent: React.ComponentType;
declare const ProductThumbnailComponent: React.ComponentType<ProductThumbnailProps>;

class CatalogPopupPlugin extends HSApp.Plugin.IPlugin {
  constructor() {
    super({
      name: 'catalog popup plugin',
      description: 'popup for catalog',
      dependencies: []
    } as PluginMetadata);
  }

  onActive(event?: unknown, context?: unknown): void {
    $('#plugin-container').append('<div id="catalog_popup_panel_collection"></div>');
    $('#catalog_popup_panel_collection').addClass('hide');
  }

  showReportPanel(
    seekId: string,
    productType: ProductType,
    productName: string,
    needsUpdate?: boolean
  ): void {
    const app = HSApp.App.getApp();

    if (HSApp.Config.TENANT === 'fp') {
      $('#catalog_popup_panel_collection').removeClass('hide');
      const container = document.querySelector('#catalog_popup_panel_collection');

      const isMaterial = productType === HSCatalog.ProductTypeEnum.Material;
      const problemList = isMaterial ? MATERIAL_2D_REPORT_REASONS : MODEL_3D_REPORT_REASONS;
      const feedbackObject = isMaterial ? FEEDBACK_OBJECT_TYPE_2D : FEEDBACK_OBJECT_TYPE_3D;

      ReactDOM.render(
        React.createElement(ReportPanelComponent, {
          problemList,
          feedbackObject,
          seekId
        }),
        container
      );
    } else {
      const feedbackPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.Feedback);
      const isMaterial = productType === HSCatalog.ProductTypeEnum.Material;

      feedbackPlugin.showFeedbackEntry({
        module: isMaterial ? FeedbackModule.Material2D : FeedbackModule.Model3D,
        model: {
          id: seekId,
          type: productType,
          name: productName
        },
        style: {
          type: 'small'
        },
        productType,
        tpzzModelNeedUpdate: needsUpdate
      });
    }
  }

  showModelApplyPanel(): void {
    $('#catalog_popup_panel_collection').removeClass('hide');
    const container = document.querySelector('#catalog_popup_panel_collection');
    ReactDOM.render(React.createElement(ModelApplyPanelComponent, null), container);
  }

  showUploadPinhuaPopup(): void {
    const container = document.querySelector('.popupcontainer');
    ReactDOM.render(React.createElement(UploadPinhuaPopupComponent, null), container);
  }

  showProductThumbnail(product: { legendImg: string }): void {
    const container = document.querySelector('.popupcontainer');
    const element = React.createElement(ProductThumbnailComponent, {
      imgSrc: product.legendImg,
      onClose: () => ReactDOM.unmountComponentAtNode(container!)
    });
    ReactDOM.render(element, container);
  }
}

HSApp.Plugin.registerPlugin('hsw.plugin.catalogpopup.Plugin', CatalogPopupPlugin);