import React, { Component, ReactElement } from 'react';
import { HSCore, HSCatalog, HSFPConstants } from '@/types/hscore';

interface MetadataType {
  packageId?: number;
  productType?: HSCatalog.ProductTypeEnum;
  showfavorite?: boolean;
  name?: string;
  customizedLargeViewData?: unknown;
  getCustomizedLargeViewData?: () => unknown;
  isGroup?: boolean;
}

interface InfoData {
  msgType?: 'tips' | string;
  msgPicture?: string;
}

interface DetailCardData {
  infoData: InfoData;
  needHideIcon: boolean;
  metadata?: MetadataType;
  className?: string;
}

interface DetailCardProps {
  data: DetailCardData;
  customizedLargeViewData?: unknown;
  getCustomizedLargeViewData?: () => unknown;
}

interface DetailCardState {
  metadata?: MetadataType;
  infoData: InfoData;
  needHideIcon: boolean;
  hoverDetailsInfo: boolean;
}

interface PositionStyle {
  right: string;
  top: string;
}

interface LayoutPosition {
  top: number;
  left: number;
}

interface ReplaceProductOptions {
  isSmartReplace: boolean;
}

const MSG_TYPE_TIPS = 'tips';
const IHOME_COUPON_ALIAS = 'ysjj';
const PROXY_PACKAGE_ID = 10894;
const MIXPAINT_ENV_ID = HSFPConstants.Environment.MixPaint;
const CUSTOMIZED_TILES_CMD_TYPE = HSFPConstants.CommandType.CustomizedTiles;
const DETAIL_PANEL_OFFSET = 8;
const Z_INDEX_TIP_CONTAINER = 110;

export default class DetailCard extends Component<DetailCardProps, DetailCardState> {
  private tipContainer?: HTMLElement | null;

  constructor(props: DetailCardProps) {
    super(props);
    
    const { infoData, needHideIcon, metadata } = props.data;
    
    this.state = {
      metadata,
      infoData,
      needHideIcon,
      hoverDetailsInfo: false
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: DetailCardProps): void {
    const { data } = nextProps;
    this.setState(data);
  }

  showDetailsPanel(options: InfoData = { msgType: undefined, msgPicture: undefined }): void {
    if (options.msgType === MSG_TYPE_TIPS) {
      this.renderTips(options);
    } else {
      this.renderDetailsPanel();
    }
    
    this.setState({ hoverDetailsInfo: true });
  }

  renderTips(options: InfoData): void {
    const { msgType, msgPicture } = options;
    
    if (msgType !== MSG_TYPE_TIPS) return;
    if (!this.state.metadata) return;

    const app = HSApp.App.getApp();
    const position = app.layoutMgr.getPosition('PropertyBar');
    const screenWidth = document.documentElement.offsetWidth;

    if (!position) return;

    const style: PositionStyle = {
      right: `${screenWidth - position.left + DETAIL_PANEL_OFFSET}px`,
      top: `${position.top}px`
    };

    if (!this.tipContainer) {
      this.tipContainer = document.querySelector('#msg-wrapper');
    }

    if (!this.tipContainer) return;

    this.tipContainer.style.right = style.right;
    this.tipContainer.style.top = style.top;
    this.tipContainer.style.position = 'absolute';
    this.tipContainer.style.zIndex = String(Z_INDEX_TIP_CONTAINER);

    ReactDOM.render(
      <div className="msg-picture">
        <img src={msgPicture} />
      </div>,
      this.tipContainer
    );
  }

  hideDetailsPanel(options: InfoData = { msgType: undefined }): void {
    if (options.msgType === MSG_TYPE_TIPS) {
      if (this.tipContainer) {
        ReactDOM.unmountComponentAtNode(this.tipContainer);
      }
    } else {
      LargeViewHelper.hideLargeView();
    }
    
    this.setState({ hoverDetailsInfo: false });
  }

  isIhome(): boolean {
    const app = HSApp.App.getApp();
    const coupon = app.appParams.getParam('coupon');
    return coupon?.alias === IHOME_COUPON_ALIAS;
  }

  async renderDetailsPanel(): Promise<void> {
    const { customizedLargeViewData, getCustomizedLargeViewData } = this.props;

    await this.updateDataInMixpaint();

    if (!this.state.metadata) return;

    const app = HSApp.App.getApp();
    const selectedObject = app.selectionManager.selected()[0];

    const largeViewData: MetadataType = {
      ...this.state.metadata,
      showfavorite: true
    };

    if (customizedLargeViewData) {
      largeViewData.customizedLargeViewData = customizedLargeViewData;
    }

    if (getCustomizedLargeViewData) {
      largeViewData.getCustomizedLargeViewData = getCustomizedLargeViewData;
    }

    const layoutManager = app.layoutMgr;
    const propertyBarPosition: LayoutPosition = layoutManager.getPosition('PropertyBar');
    const screenWidth = document.documentElement.offsetWidth;

    const panelPosition = {
      top: propertyBarPosition.top,
      right: screenWidth - propertyBarPosition.left + DETAIL_PANEL_OFFSET
    };

    if (selectedObject instanceof HSCore.Model.Group) {
      const displayName = selectedObject.displayName;
      if (displayName) {
        Object.assign(largeViewData, { name: displayName });
      }
    }

    const proxyObject = selectedObject.getProxyObject();
    if (proxyObject && largeViewData.packageId !== PROXY_PACKAGE_ID) {
      const proxyName = proxyObject.getName?.(selectedObject);
      if (proxyName) {
        Object.assign(largeViewData, { name: proxyName });
      }
    }

    if (largeViewData.productType === HSCatalog.ProductTypeEnum.Model) {
      const onReplaceProduct = (selectedProduct: { id?: string }): void => {
        if (!selectedProduct?.id) return;

        app.catalogManager.getProductBySeekId(selectedProduct.id).then((product) => {
          const currentSelection = app.selectionManager.selected()[0];
          const transactionManager = app.transManager;
          
          const replaceOptions: ReplaceProductOptions = { isSmartReplace: true };
          const request = transactionManager.createRequest(
            HSFPConstants.RequestType.ReplaceProduct,
            [currentSelection, product, replaceOptions]
          );
          
          const result = transactionManager.commit(request);
          app.selectionManager.select(result);
          
          this.setState({ metadata: product }, () => {
            this.showDetailsPanel();
          });
        });
      };

      LargeViewHelper.showLargeView(largeViewData, panelPosition, true, onReplaceProduct);
    } else if (selectedObject instanceof HSCore.Model.Group) {
      Object.assign(largeViewData, { isGroup: true });

      const onUploadGroup = (): void => {
        const currentSelection = app.selectionManager.selected()[0];
        const myGroupPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.MyGroup);
        myGroupPlugin.uploadGroup(currentSelection);
      };

      LargeViewHelper.showLargeView(largeViewData, panelPosition, false, null, onUploadGroup);
    } else {
      LargeViewHelper.showLargeView(largeViewData, panelPosition, false);
    }
  }

  isMixDecorationEnv(): boolean {
    const app = HSApp.App.getApp();
    return app.activeEnvironmentId === MIXPAINT_ENV_ID;
  }

  async updateDataInMixpaint(): Promise<void> {
    const app = HSApp.App.getApp();
    let productId: string | undefined;

    if (!this.isMixDecorationEnv() && 
        app.cmdManager.current?.type === CUSTOMIZED_TILES_CMD_TYPE) {
      
      const tilesHandler = HSApp.PaintPluginHelper.Kernel.CustomizedTilesPluginHandler;
      const selector = tilesHandler.ui.view.canvas.selector;

      if (selector.selected.length > 0) {
        const selectedPattern = selector.selected[0];
        
        if (selectedPattern?._pattern?.params) {
          const patternUrl = selectedPattern._pattern.params.url;
          productId = HSCore.Util.String.matchGUID(patternUrl);
        }
      }
    }

    if (productId) {
      const product = await app.catalogManager.getProductBySeekId(productId);
      this.setState({ metadata: product });
    }
  }

  render(): ReactElement {
    const { infoData, needHideIcon } = this.state;
    const { className = '' } = this.props.data;

    return (
      <div className={`detail-card ${className}`}>
        {!needHideIcon && (
          <div
            className="detail-info"
            onMouseEnter={() => this.showDetailsPanel(infoData)}
            onMouseLeave={() => this.hideDetailsPanel(infoData)}
          >
            <div className="detail-icon">
              <Icons type="hs_mian_xiangqing" />
            </div>
          </div>
        )}
      </div>
    );
  }
}