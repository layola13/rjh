import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { EN_PROPERTY_PANEL_ITEM_TYPE } from './PropertyPanelTypes';

interface PropertyPanelNode {
  type?: EN_PROPERTY_PANEL_ITEM_TYPE | string;
  minMax?: [number, number | undefined];
  onEnter?: (node: PropertyPanelNode, value: unknown) => void;
  onRightTitleClick?: (node: PropertyPanelNode) => void;
}

interface ReceivePayload {
  node?: PropertyPanelNode;
  newValue?: unknown;
}

interface CurrentParams {
  activeSection: string;
  activeSectionName: string;
  clicksRatio: {
    id: string;
    name: string;
  };
}

interface ContentEntity {
  seekId: string;
  displayName: string;
  build(): void;
  buildMaterial(): void;
  refreshMaterial(): void;
  getHost(): unknown;
}

type ReceiveEventType =
  | 'changing'
  | 'dragMove'
  | 'changeend'
  | 'dragEnd'
  | 'onBoolInputDataChange'
  | 'Reset';

export default class ParametricContentEditTransaction extends HSCore.Transaction.Common.StateRequest {
  private _content: ContentEntity;
  private _isSuccessed: boolean = false;

  constructor(content: ContentEntity) {
    super();
    this._content = content;

    const entityLayer = HSCore.Util.Layer.getEntityLayer(this._content);
    HSCore.Util.FaceMoldingFitHelper.getInstance().startListening(entityLayer);
  }

  doReceive(eventType: ReceiveEventType, payload: ReceivePayload): boolean {
    const { node, newValue } = payload;
    const app = HSApp.App.getApp();
    const sizeLimitUnlock = app.designMetadata.get('sizeLimitUnlock');

    switch (eventType) {
      case 'changing':
      case 'dragMove':
      case 'changeend':
      case 'dragEnd':
      case 'onBoolInputDataChange':
        if (node?.onEnter) {
          let adjustedValue = newValue;

          if (
            (node.type === EN_PROPERTY_PANEL_ITEM_TYPE.FLOAT ||
              node.type === EN_PROPERTY_PANEL_ITEM_TYPE.INTEGER) &&
            !sizeLimitUnlock &&
            Array.isArray(node.minMax) &&
            typeof adjustedValue === 'number'
          ) {
            const [minValue, maxValue] = node.minMax;
            if (adjustedValue < minValue) {
              adjustedValue = minValue;
            } else if (maxValue !== undefined && adjustedValue > maxValue) {
              adjustedValue = maxValue;
            }
          }

          node.onEnter(node, adjustedValue);

          if (node.type === 'MATERIIAL') {
            this._content.buildMaterial();
          }

          this._isSuccessed = true;
        }
        break;

      case 'Reset':
        if (node?.onRightTitleClick) {
          node.onRightTitleClick(node);
          this._isSuccessed = true;
        }
        break;
    }

    const contextualToolsPlugin = app.pluginManager.getPlugin(
      HSFPConstants.PluginType.ContextualTools
    );
    contextualToolsPlugin?.refresh(undefined, { refreshStatusBar: false });

    const propertyBarPlugin = app.pluginManager.getPlugin(
      HSFPConstants.PluginType.PropertyBar
    );
    propertyBarPlugin?.update();

    return this._isSuccessed;
  }

  onReceive(eventType: ReceiveEventType, payload: ReceivePayload): boolean {
    return this.doReceive(eventType, payload);
  }

  onCommit(): boolean {
    this._content.build();
    HSCore.Util.FaceMoldingFitHelper.getInstance().autoFit();

    if (this._content.getHost() instanceof HSCore.Model.NCustomizedParametricRoof) {
      const host = this._content.getHost() as HSCore.Model.NCustomizedParametricRoof;
      host.dirtyClipGeometry();
      host.dirtyFaceMaterials();
    }

    super.onCommit();
    return this._isSuccessed;
  }

  onUndo(): void {
    super.onUndo();

    if (this._content.getHost() instanceof HSCore.Model.NCustomizedParametricRoof) {
      const host = this._content.getHost() as HSCore.Model.NCustomizedParametricRoof;
      host.dirtyClipGeometry();
      host.dirtyFaceMaterials();
    }

    this._content.refreshMaterial();
  }

  onRedo(): void {
    super.onRedo();

    if (this._content.getHost() instanceof HSCore.Model.NCustomizedParametricRoof) {
      const host = this._content.getHost() as HSCore.Model.NCustomizedParametricRoof;
      host.dirtyClipGeometry();
      host.dirtyFaceMaterials();
    }

    this._content.refreshMaterial();
  }

  canTransactField(): boolean {
    return true;
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }

  getDescription(): string {
    return '编辑参数化门窗';
  }

  getCurrentParams(): CurrentParams {
    return {
      activeSection: 'contentEdit',
      activeSectionName: '模型操作',
      clicksRatio: {
        id: this._content.seekId,
        name: this._content.displayName,
      },
    };
  }
}