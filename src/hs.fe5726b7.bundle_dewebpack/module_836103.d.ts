import { HSCatalog } from './catalog-types';

/**
 * Product catalog utility for managing view switching and image processing
 */
export default class CatalogHelper {
  /**
   * Automatically switches the application environment based on product type and content
   * @param product - The catalog product to evaluate for environment switching
   */
  static switchEnvironment(product: HSCatalog.Product): void {
    const app = HSApp.App.getApp();
    
    const isAssemblyType = 
      product.productType === HSCatalog.ProductTypeEnum.Assembly ||
      product.productType === HSCatalog.ProductTypeEnum.PAssembly ||
      product.productType === HSCatalog.ProductTypeEnum.PAssemblyPackage ||
      product.productType === HSCatalog.ProductTypeEnum.Model;

    if (isAssemblyType) {
      const isBeamOrObstacle = 
        product.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Beam) ||
        product.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_Obstacle);

      if (!isBeamOrObstacle || app.is2DViewActive() || app.switchTo2DView()) {
        if (app.isUnderDefaultEnvironment()) {
          const isCeiling = product.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_Ceiling);
          let targetViewMode: HSApp.View.ViewModeEnum | undefined;

          if (app.viewMode2D === HSApp.View.ViewModeEnum.Plane) {
            if (['450', '500'].includes(product.zIndex) || isCeiling) {
              targetViewMode = HSApp.View.ViewModeEnum.RCP;
            }
          } else if (app.viewMode2D === HSApp.View.ViewModeEnum.RCP) {
            const shouldSwitchToPlane =
              (['100', '200', '300'].includes(product.zIndex) && !isCeiling) ||
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
    } else if (product.productType === HSCatalog.ProductTypeEnum.Profile) {
      const isWallDecoration =
        product.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Cornice) ||
        product.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Baseboard) ||
        product.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Decoline) ||
        product.contentType.isTypeOf(HSCatalog.ContentTypeEnum.WaistlineTiles);

      const shouldSwitch =
        (app.isUnderDefaultEnvironment() || app.environmentManager.isWallCeilingPlatformEnv()) &&
        !app.is3DViewActive() &&
        isWallDecoration;

      if (shouldSwitch) {
        const viewSwitchPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.ViewSwitch);
        viewSwitchPlugin?.showAutoSwitchTip(true);

        const currentCommand = app.cmdManager.current;
        const isChangingMoldingType = currentCommand?.type === 'hsw.cmd.customizemodel.CmdChangeSmartMoldingType';

        if (!currentCommand || !isChangingMoldingType) {
          if (HSApp.Util.NCustomizedFeatureModel.isNCustomizedEnv()) {
            return;
          }
          app.switchTo3DView();
        }
      }
    } else if (product.productType === HSCatalog.ProductTypeEnum.WallFaceAssembly) {
      if (app.isUnderDefaultEnvironment()) {
        app.switchTo3DView();
      }
    }
  }

  /**
   * Generates optimized OSS (Object Storage Service) image URL with appropriate processing parameters
   * @param product - The catalog product containing image information
   * @param addRequestId - Whether to append a unique request ID to the URL
   * @returns Processed image URL with CDN optimization
   */
  static getOssImageUrl(product: HSCatalog.Product, addRequestId: boolean = false): string {
    let imageUrl = '';
    let isIHomeImage = false;

    const originalImage = product.image || (product.images?.[0] ?? '');

    if (originalImage) {
      if (this.isStylerTemplate(product)) {
        const HIGH_DPI_THRESHOLD = 1.5;
        const isHighDPI = window.devicePixelRatio > HIGH_DPI_THRESHOLD;
        const width = isHighDPI ? 492 : 246;
        const height = isHighDPI ? 276 : 138;
        
        imageUrl = `${originalImage}?x-oss-process=image/resize,m_fixed,w_${width},h_${height}/quality,Q_100`;
      } else {
        if (originalImage.includes?.('ihome')) {
          isIHomeImage = true;
          imageUrl = `${originalImage}?type=icon`;
        } else {
          const isProductionMaterial =
            originalImage.includes?.('-prod-') &&
            product.productType === HSCatalog.ProductTypeEnum.Material;

          const HIGH_DPI_THRESHOLD = 1.5;
          const isHighDPI = window.devicePixelRatio > HIGH_DPI_THRESHOLD;

          const styleType = isProductionMaterial
            ? (isHighDPI ? 'iso-large-d2' : 'iso-normal-d2')
            : (isHighDPI ? 'iso-large' : 'iso-normal');

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

    // Ensure HTTPS for non-iHome images
    if (!imageUrl.startsWith('https') && !isIHomeImage) {
      imageUrl = imageUrl.split('?')[0];
    }

    return NWTK.cdn.getCNameUrl(imageUrl);
  }

  /**
   * Checks if the product is a styler template or full room design
   * @param product - The catalog product to check
   * @returns True if product is a template type
   */
  static isStylerTemplate(product: HSCatalog.Product): boolean {
    const isTemplateProductType =
      product.productType === HSCatalog.ProductTypeEnum.StylerTemplate ||
      product.productType === HSCatalog.ProductTypeEnum.FullRoom;

    const isCollocationContent =
      product.contentType?.isTypeOf(HSCatalog.ContentTypeEnum.ModelCollocation);

    return isTemplateProductType || isCollocationContent;
  }

  /**
   * Builds content size information for a product
   * @param product - The catalog product
   * @returns Formatted size information
   */
  static buildContentSize(product: HSCatalog.Product): string {
    return HSApp.Util.Content.buildContentSize(product, true);
  }

  /**
   * Retrieves the first attribute value ID for a given attribute name
   * @param attributes - Array of product attributes
   * @param attributeName - Name of the attribute to find
   * @returns The first value ID or null if not found
   */
  static getAttributesFirstId(
    attributes: HSCatalog.Attribute[] | null | undefined,
    attributeName: string
  ): string | null {
    if (!attributes) {
      return null;
    }

    const matchingAttribute = attributes.find(attr => attr.name === attributeName);
    return matchingAttribute?.values?.[0]?.id ?? null;
  }

  /**
   * Generates a UUID for request tracking
   * @private
   */
  private static generateUUID(): string {
    // Implementation would use a proper UUID library
    return crypto.randomUUID?.() ?? Math.random().toString(36).substring(2);
  }
}