import { HSCatalog } from './635589';

interface Product {
  productType: HSCatalog.ProductTypeEnum;
  contentType: ContentType;
  zIndex?: string;
  image?: string;
  images?: string[];
  thumbnail?: string;
}

interface ContentType {
  isTypeOf(type: HSCatalog.ContentTypeEnum): boolean;
}

interface Attribute {
  name: string;
  values?: Array<{ id: string | number }>;
}

interface SwitchOptions {
  keepCamera?: boolean;
}

interface Plugin {
  showAutoSwitchTip(show: boolean): void;
}

interface Command {
  type: string;
}

interface App {
  getApp(): AppInstance;
}

interface AppInstance {
  is2DViewActive(): boolean;
  is3DViewActive(): boolean;
  switchTo2DView(): void;
  switchTo3DView(): void;
  isUnderDefaultEnvironment(): boolean;
  viewMode2D: HSApp.View.ViewModeEnum;
  switch2DViewMode(mode: HSApp.View.ViewModeEnum, options?: SwitchOptions): void;
  pluginManager: PluginManager;
  environmentManager: EnvironmentManager;
  cmdManager: CommandManager;
}

interface PluginManager {
  getPlugin(pluginType: string): Plugin | null;
}

interface EnvironmentManager {
  isWallCeilingPlatformEnv(): boolean;
}

interface CommandManager {
  current: Command | null;
}

declare global {
  const HSApp: {
    App: App;
    View: {
      ViewModeEnum: {
        Plane: string;
        RCP: string;
      };
    };
    Util: {
      NCustomizedFeatureModel: {
        isNCustomizedEnv(): boolean;
      };
      Url: {
        addParam(url: string, key: string, value: string): string;
      };
      Content: {
        buildContentSize(product: Product, flag: boolean): unknown;
      };
    };
  };
  const HSFPConstants: {
    PluginType: {
      ViewSwitch: string;
    };
  };
  const NWTK: {
    cdn: {
      getCNameUrl(url: string): string;
    };
  };
}

const CEILING_Z_INDEXES = ['450', '500'];
const FLOOR_Z_INDEXES = ['100', '200', '300'];
const CHANGE_MOLDING_COMMAND_TYPE = 'hsw.cmd.customizemodel.CmdChangeSmartMoldingType';
const HIGH_DPI_THRESHOLD = 1.5;
const STYLER_TEMPLATE_WIDTH_NORMAL = 246;
const STYLER_TEMPLATE_WIDTH_HIGH_DPI = 492;
const STYLER_TEMPLATE_HEIGHT_NORMAL = 138;
const STYLER_TEMPLATE_HEIGHT_HIGH_DPI = 276;
const IMAGE_QUALITY = 100;

export default class ProductHelper {
  static switchEnvironment(product: Product): void {
    const app = HSApp.App.getApp();

    if (
      product.productType === HSCatalog.ProductTypeEnum.Assembly ||
      product.productType === HSCatalog.ProductTypeEnum.PAssembly ||
      product.productType === HSCatalog.ProductTypeEnum.PAssemblyPackage ||
      product.productType === HSCatalog.ProductTypeEnum.Model
    ) {
      this.handleAssemblyEnvironment(app, product);
    } else if (product.productType === HSCatalog.ProductTypeEnum.Profile) {
      this.handleProfileEnvironment(app, product);
    } else if (product.productType === HSCatalog.ProductTypeEnum.WallFaceAssembly) {
      this.handleWallFaceAssemblyEnvironment(app);
    }
  }

  private static handleAssemblyEnvironment(app: AppInstance, product: Product): void {
    const isBeamOrObstacle =
      product.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Beam) ||
      product.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_Obstacle);

    if (!isBeamOrObstacle || app.is2DViewActive() || app.switchTo2DView(), app.isUnderDefaultEnvironment()) {
      const isCeiling = product.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_Ceiling);
      let targetViewMode: HSApp.View.ViewModeEnum | undefined;

      if (app.viewMode2D === HSApp.View.ViewModeEnum.Plane) {
        if ((product.zIndex && CEILING_Z_INDEXES.includes(product.zIndex)) || isCeiling) {
          targetViewMode = HSApp.View.ViewModeEnum.RCP;
        }
      } else if (app.viewMode2D === HSApp.View.ViewModeEnum.RCP) {
        const shouldSwitchToPlane =
          (product.zIndex && FLOOR_Z_INDEXES.includes(product.zIndex) && !isCeiling) ||
          product.contentType.isTypeOf(HSCatalog.ContentTypeEnum.SlabNiche) ||
          product.contentType.isTypeOf(HSCatalog.ContentTypeEnum.SlabOpening);

        if (shouldSwitchToPlane) {
          targetViewMode = HSApp.View.ViewModeEnum.Plane;
        }
      }

      if (targetViewMode) {
        if (app.is2DViewActive()) {
          const viewSwitchPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.ViewSwitch);
          viewSwitchPlugin?.showAutoSwitchTip(true);
        }
        app.switch2DViewMode(targetViewMode, { keepCamera: true });
      }
    }
  }

  private static handleProfileEnvironment(app: AppInstance, product: Product): void {
    const isWallCeilingOrDefault =
      app.isUnderDefaultEnvironment() || app.environmentManager.isWallCeilingPlatformEnv();

    if (!isWallCeilingOrDefault || app.is3DViewActive()) {
      return;
    }

    const isMoldingType =
      product.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Cornice) ||
      product.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Baseboard) ||
      product.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Decoline) ||
      product.contentType.isTypeOf(HSCatalog.ContentTypeEnum.WaistlineTiles);

    if (isMoldingType) {
      const viewSwitchPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.ViewSwitch);
      viewSwitchPlugin?.showAutoSwitchTip(true);

      const currentCommand = app.cmdManager.current;
      if (!currentCommand || currentCommand.type !== CHANGE_MOLDING_COMMAND_TYPE) {
        if (HSApp.Util.NCustomizedFeatureModel.isNCustomizedEnv()) {
          return;
        }
        app.switchTo3DView();
      }
    }
  }

  private static handleWallFaceAssemblyEnvironment(app: AppInstance): void {
    if (app.isUnderDefaultEnvironment()) {
      app.switchTo3DView();
    }
  }

  static getOssImageUrl(product: Product, addRequestId: boolean = false): string {
    let imageUrl = '';
    let isIHomeImage = false;
    const originalImage = product.image ?? (product.images?.[0] || '');

    if (originalImage) {
      if (this.isStylerTemplate(product)) {
        imageUrl = this.buildStylerTemplateUrl(originalImage);
      } else {
        if (originalImage.includes?.('ihome')) {
          isIHomeImage = true;
          imageUrl = `${originalImage}?type=icon`;
        } else {
          const styleType = this.determineImageStyle(originalImage, product);
          imageUrl = `${originalImage}?x-oss-process=style/${styleType}`;
        }
      }
    } else if (product.thumbnail) {
      imageUrl = product.thumbnail;
    }

    if (imageUrl && addRequestId) {
      const requestId = this.generateUUID();
      imageUrl = HSApp.Util.Url.addParam(imageUrl, 'reqid', requestId);
    }

    if (!imageUrl.startsWith('https') && !isIHomeImage) {
      imageUrl = imageUrl.split('?')[0];
    }

    return NWTK.cdn.getCNameUrl(imageUrl);
  }

  private static buildStylerTemplateUrl(imageUrl: string): string {
    const isHighDPI = window.devicePixelRatio > HIGH_DPI_THRESHOLD;
    const width = isHighDPI ? STYLER_TEMPLATE_WIDTH_HIGH_DPI : STYLER_TEMPLATE_WIDTH_NORMAL;
    const height = isHighDPI ? STYLER_TEMPLATE_HEIGHT_HIGH_DPI : STYLER_TEMPLATE_HEIGHT_NORMAL;

    return `${imageUrl}?x-oss-process=image/resize,m_fixed,w_${width},h_${height}/quality,Q_${IMAGE_QUALITY}`;
  }

  private static determineImageStyle(imageUrl: string, product: Product): string {
    const isHighDPI = window.devicePixelRatio > HIGH_DPI_THRESHOLD;
    const isProdMaterial =
      imageUrl.includes?.('-prod-') && product.productType === HSCatalog.ProductTypeEnum.Material;

    if (isProdMaterial) {
      return isHighDPI ? 'iso-large-d2' : 'iso-normal-d2';
    }

    return isHighDPI ? 'iso-large' : 'iso-normal';
  }

  static isStylerTemplate(product: Product): boolean {
    if (product.productType) {
      return (
        product.productType === HSCatalog.ProductTypeEnum.StylerTemplate ||
        product.productType === HSCatalog.ProductTypeEnum.FullRoom
      );
    }

    if (product.contentType) {
      return product.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ModelCollocation);
    }

    return false;
  }

  static buildContentSize(product: Product): unknown {
    return HSApp.Util.Content.buildContentSize(product, true);
  }

  static getAttributesFirstId(attributes: Attribute[] | null | undefined, attributeName: string): string | number | null {
    if (!attributes) {
      return null;
    }

    const targetAttribute = attributes.find(attr => attr.name === attributeName);
    return targetAttribute?.values?.[0]?.id ?? null;
  }

  private static generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, char => {
      const random = (Math.random() * 16) | 0;
      const value = char === 'x' ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  }
}