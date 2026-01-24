/**
 * Detail card component for displaying product information with hover interactions
 * @module DetailCard
 */

import React from 'react';
import { HSCore } from '../types/hscore';
import { HSFPConstants } from '../types/constants';
import { Icons } from '../components/Icons';
import LargeViewHelper from '../helpers/LargeViewHelper';
import ReactDOM from 'react-dom';

/**
 * Message type for detail panel display
 */
type MessageType = 'tips' | undefined;

/**
 * Information data for hover interactions
 */
interface InfoData {
  msgType?: MessageType;
  msgPicture?: string;
}

/**
 * Product metadata interface
 */
interface ProductMetadata {
  packageId?: number;
  productType?: number;
  name?: string;
  showfavorite?: boolean;
  customizedLargeViewData?: unknown;
  getCustomizedLargeViewData?: () => unknown;
  isGroup?: boolean;
  id?: string;
}

/**
 * Component props
 */
interface DetailCardProps {
  data: {
    /** Additional CSS class name */
    className?: string;
    /** Product metadata */
    metadata?: ProductMetadata;
    /** Hover interaction info */
    infoData?: InfoData;
    /** Whether to hide the info icon */
    needHideIcon?: boolean;
  };
  /** Custom large view data */
  customizedLargeViewData?: unknown;
  /** Function to get customized large view data */
  getCustomizedLargeViewData?: () => unknown;
}

/**
 * Component state
 */
interface DetailCardState {
  metadata?: ProductMetadata;
  infoData?: InfoData;
  needHideIcon?: boolean;
  hoverDetailsInfo: boolean;
}

/**
 * Position coordinates for UI elements
 */
interface Position {
  top: number;
  left: number;
  right?: number;
}

/**
 * Detail card component that shows product information on hover
 * Supports both tips display and full detail panel views
 */
export default class DetailCard extends React.Component<DetailCardProps, DetailCardState> {
  private tipContainer?: HTMLElement | null;

  constructor(props: DetailCardProps) {
    super(props);

    const { metadata, infoData, needHideIcon } = props.data;

    this.state = {
      metadata,
      infoData,
      needHideIcon,
      hoverDetailsInfo: false,
    };
  }

  /**
   * @deprecated Use getDerivedStateFromProps instead
   */
  UNSAFE_componentWillReceiveProps(nextProps: DetailCardProps): void {
    const { data } = nextProps;
    this.setState(data as DetailCardState);
  }

  /**
   * Shows the details panel or tips based on message type
   * @param options - Display options including message type and picture
   */
  showDetailsPanel(options: InfoData = { msgType: undefined, msgPicture: undefined }): void {
    if (options.msgType === 'tips') {
      this.renderTips(options);
    } else {
      this.renderDetailsPanel();
    }

    this.setState({ hoverDetailsInfo: true });
  }

  /**
   * Renders tooltip with image
   * @param options - Tooltip options
   */
  renderTips(options: InfoData): void {
    const { msgType, msgPicture } = options;

    if (msgType === 'tips') {
      if (!this.state.metadata) return;

      const propertyBarPosition = HSApp.App.getApp().layoutMgr.getPosition('PropertyBar');
      const windowWidth = document.documentElement.offsetWidth;

      if (!propertyBarPosition) return;

      const tipPosition = {
        right: `${windowWidth - propertyBarPosition.left + 8}px`,
        top: `${propertyBarPosition.top}px`,
      };

      if (!this.tipContainer) {
        this.tipContainer = document.querySelector('#msg-wrapper');
      }

      if (this.tipContainer) {
        this.tipContainer.style.right = tipPosition.right;
        this.tipContainer.style.top = tipPosition.top;
        this.tipContainer.style.position = 'absolute';
        this.tipContainer.style.zIndex = '110';

        ReactDOM.render(
          <div className="msg-picture">
            <img src={msgPicture} />
          </div>,
          this.tipContainer
        );
      }
    }
  }

  /**
   * Hides the details panel or tips
   * @param options - Options including message type
   */
  hideDetailsPanel(options: InfoData = { msgType: undefined }): void {
    if (options.msgType === 'tips') {
      if (this.tipContainer) {
        ReactDOM.unmountComponentAtNode(this.tipContainer);
      }
    } else {
      LargeViewHelper.hideLargeView();
    }

    this.setState({ hoverDetailsInfo: false });
  }

  /**
   * Checks if current environment is iHome
   * @returns True if in iHome environment
   */
  isIhome(): boolean {
    const couponParam = HSApp.App.getApp().appParams.getParam('coupon');
    return !!(couponParam && couponParam.alias === 'ysjj');
  }

  /**
   * Renders the full details panel with product information
   */
  async renderDetailsPanel(): Promise<void> {
    const { customizedLargeViewData, getCustomizedLargeViewData } = this.props;

    await this.updateDataInMixpaint();

    if (!this.state.metadata) return;

    const app = HSApp.App.getApp();
    const selectedObject = app.selectionManager.selected()[0];

    const metadata: ProductMetadata = {
      ...this.state.metadata,
      showfavorite: true,
    };

    if (customizedLargeViewData) {
      metadata.customizedLargeViewData = customizedLargeViewData;
    }

    if (getCustomizedLargeViewData) {
      metadata.getCustomizedLargeViewData = getCustomizedLargeViewData;
    }

    const layoutManager = app.layoutMgr;
    const propertyBarPosition = layoutManager.getPosition('PropertyBar');
    const { top, left } = propertyBarPosition;
    const windowWidth = document.documentElement.offsetWidth;

    const panelPosition = {
      top,
      right: windowWidth - left + 8,
    };

    // Handle group display name
    if (selectedObject instanceof HSCore.Model.Group) {
      const groupName = selectedObject.displayName;
      if (groupName) {
        Object.assign(metadata, { name: groupName });
      }
    }

    // Handle proxy object name (excluding specific package ID)
    if (selectedObject.getProxyObject() && metadata.packageId !== 10894) {
      const proxyName = selectedObject.getProxyObject().getName?.(selectedObject);
      if (proxyName) {
        Object.assign(metadata, { name: proxyName });
      }
    }

    // Handle different product types
    if (metadata.productType === HSCatalog.ProductTypeEnum.Model) {
      const handleProductReplace = (product: { id?: string }): void => {
        if (!product?.id) return;

        app.catalogManager.getProductBySeekId(product.id).then((newProduct) => {
          const currentSelection = app.selectionManager.selected()[0];
          const transactionManager = app.transManager;

          const replaceRequest = transactionManager.createRequest(
            HSFPConstants.RequestType.ReplaceProduct,
            [currentSelection, newProduct, { isSmartReplace: true }]
          );

          const result = transactionManager.commit(replaceRequest);
          app.selectionManager.select(result);

          this.setState({ metadata: newProduct }, () => {
            this.showDetailsPanel();
          });
        });
      };

      LargeViewHelper.showLargeView(metadata, panelPosition, true, handleProductReplace);
    } else if (selectedObject instanceof HSCore.Model.Group) {
      Object.assign(metadata, { isGroup: true });

      const handleGroupUpload = (): void => {
        const currentGroup = app.selectionManager.selected()[0];
        app.pluginManager
          .getPlugin(HSFPConstants.PluginType.MyGroup)
          .uploadGroup(currentGroup);
      };

      LargeViewHelper.showLargeView(metadata, panelPosition, false, null, handleGroupUpload);
    } else {
      LargeViewHelper.showLargeView(metadata, panelPosition, false);
    }
  }

  /**
   * Checks if current environment is mix decoration
   * @returns True if in mix paint environment
   */
  isMixDecorationEnv(): boolean {
    return HSApp.App.getApp().activeEnvironmentId === HSFPConstants.Environment.MixPaint;
  }

  /**
   * Updates product data when in mix paint environment
   */
  async updateDataInMixpaint(): Promise<void> {
    const app = HSApp.App.getApp();
    let productId: string | undefined;

    // Check if in customized tiles command mode
    if (
      !this.isMixDecorationEnv() &&
      app.cmdManager.current?.type === HSFPConstants.CommandType.CustomizedTiles
    ) {
      const customizedTilesHandler = HSApp.PaintPluginHelper.Kernel.CustomizedTilesPluginHandler;
      const selector = customizedTilesHandler.ui.view.canvas.selector;

      if (selector.selected.length !== 0) {
        const selectedItem = selector.selected[0];

        if (selectedItem?._pattern?.params) {
          const patternUrl = selectedItem._pattern.params.url;
          productId = HSCore.Util.String.matchGUID(patternUrl);
        }
      }
    }

    if (productId) {
      const productMetadata = await app.catalogManager.getProductBySeekId(productId);
      this.setState({ metadata: productMetadata });
    }
  }

  render(): React.ReactElement {
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