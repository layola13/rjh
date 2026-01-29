import React, { Component, CSSProperties } from 'react';
import { IconfontView, Button, SmartText } from './ui-components';
import { RecommendListContainer } from './recommend-list-container';

interface ModelItem {
  id: string;
  [key: string]: unknown;
}

interface ModelData {
  items: ModelItem[];
  [key: string]: unknown;
}

interface EntityMetadata {
  categories: string[];
  productStyle?: string;
}

interface Entity {
  id: string;
  metadata: EntityMetadata;
}

interface AutoRecommendData {
  isShowAutoRecommendItem: boolean;
  floor: unknown;
  entity: Entity;
}

interface RecommendDecorationsData {
  isShowRecommendDecorationsItem: boolean;
  entity: Entity;
}

interface RecommendDialogData {
  autoRecommendData: AutoRecommendData;
  recommendDecorationsData: RecommendDecorationsData;
  modelData: ModelData;
  entity?: Entity;
  hideDialogCallback?: () => void;
}

interface RecommendDialogProps {
  data: RecommendDialogData;
}

interface RecommendDialogState {
  data: RecommendDialogData;
  showDialog: boolean;
}

interface RecommendModelsPlugin {
  getNoShowDialog(): boolean;
  setNoShowDialog(value: boolean): void;
}

interface AutoRecommendPlugin {
  startRecommendFromRecommendPopup(floor: unknown, entity: Entity): void;
}

interface RecommendAccessoriesPlugin {
  startRecommendProcess(entity: Entity): void;
}

interface PluginManager {
  getPlugin(pluginType: string): RecommendModelsPlugin | AutoRecommendPlugin | RecommendAccessoriesPlugin;
}

interface UserTrackLogger {
  push(event: string, data: unknown): void;
}

interface EventTrack {
  track(group: string, event: string, data: Record<string, string>): void;
}

interface App {
  pluginManager: PluginManager;
  userTrackLogger: UserTrackLogger;
}

declare global {
  const HSApp: {
    App: {
      getApp(): App;
    };
    Util: {
      EventTrack: {
        instance(): EventTrack;
      };
      EventGroupEnum: {
        Recommendation: string;
      };
    };
  };
  const HSFPConstants: {
    PluginType: {
      RecommendModels: string;
      AutoRecommend: string;
      RecommendAccessories: string;
    };
  };
  const ResourceManager: {
    getString(key: string): string;
  };
}

export default class RecommendDialog extends Component<RecommendDialogProps, RecommendDialogState> {
  private recommendModelsPlugin?: RecommendModelsPlugin;
  private _app: App;

  constructor(props: RecommendDialogProps) {
    super(props);
    
    this.state = {
      data: props.data,
      showDialog: true
    };
    
    this._app = HSApp.App.getApp();
    this.recommendModelsPlugin = HSApp.App.getApp().pluginManager.getPlugin(
      HSFPConstants.PluginType.RecommendModels
    ) as RecommendModelsPlugin;
  }

  hideDialog(shouldTrack: boolean): void {
    if (!this.state.showDialog) {
      return;
    }

    this.setState({ showDialog: false });
    
    this.props.data.hideDialogCallback?.();
    
    if (shouldTrack) {
      this._app.userTrackLogger.push('recommend.collocations.dialog', {
        activeSection: 'recommend',
        activeSectionName: '智能推荐',
        clicksRatio: {
          id: 'closeDialog',
          name: '关闭智能推荐弹框'
        }
      });
    }
  }

  showDialog(): void {
    this.setState({ showDialog: true });
  }

  private _clickAutoRecommend(): void {
    const app = HSApp.App.getApp();
    const { floor, entity } = this.state.data.autoRecommendData;
    const autoRecommendPlugin = app.pluginManager.getPlugin(
      HSFPConstants.PluginType.AutoRecommend
    ) as AutoRecommendPlugin;
    
    autoRecommendPlugin.startRecommendFromRecommendPopup(floor, entity);
  }

  componentWillReceiveProps(nextProps: RecommendDialogProps): void {
    const { data } = nextProps;
    
    if (data !== this.state.data) {
      this.setState({
        data,
        showDialog: true
      });
    }
  }

  private _clickRecommendAccessories(): void {
    const { entity } = this.state.data.recommendDecorationsData;
    const app = HSApp.App.getApp();
    const accessoriesPlugin = app.pluginManager.getPlugin(
      HSFPConstants.PluginType.RecommendAccessories
    ) as RecommendAccessoriesPlugin;
    
    accessoriesPlugin.startRecommendProcess(entity);
    
    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Recommendation,
      'accessories_button_click_event',
      {
        sTargetModelCategory: entity.metadata.categories[0] || '',
        sTargetModelStyle: entity.metadata.productStyle || ''
      }
    );
  }

  private _sessionHideRecommendForSessionn(): void {
    this.recommendModelsPlugin?.setNoShowDialog(true);
    this.hideDialog(false);
    
    this._app.userTrackLogger.push('recommend.collocations.dialog', {
      activeSection: 'recommend',
      activeSectionName: '智能推荐',
      clicksRatio: {
        id: 'hideDialog',
        name: '点击智能推荐面板-不再显示按钮'
      }
    });
  }

  render(): React.ReactNode {
    const { showDialog, data } = this.state;
    const { autoRecommendData, recommendDecorationsData, modelData, entity } = data;
    const { isShowAutoRecommendItem } = autoRecommendData;
    const { isShowRecommendDecorationsItem } = recommendDecorationsData;
    
    const noShowDialog = this.recommendModelsPlugin?.getNoShowDialog() ?? false;
    const hasModelItems = modelData?.items?.length ?? 0;
    
    if (!showDialog || noShowDialog || (!isShowAutoRecommendItem && !isShowRecommendDecorationsItem && !hasModelItems)) {
      return null;
    }
    
    let dialogClassName = 'recommend-collocations-dialog ';
    if (!isShowAutoRecommendItem && !isShowRecommendDecorationsItem) {
      dialogClassName += 'recommend-collocations-dialog__nobutton ';
    }
    
    const buttonModifierClass = isShowAutoRecommendItem && isShowRecommendDecorationsItem 
      ? ' have-two-btns' 
      : '';
    
    const dialogStyle: CSSProperties = {};
    const iconStyle: CSSProperties = { fontSize: '16px' };

    return (
      <div className={dialogClassName} style={dialogStyle}>
        <div className="recommend-collocations-header">
          <p className="recommend-header-title">
            {ResourceManager.getString('plugin_auto_recommend_title')}
          </p>
          <p 
            className="recommend-header-noShow" 
            onClick={() => this._sessionHideRecommendForSessionn()}
          >
            {ResourceManager.getString('recommend_confirm_dont_show_again')}
          </p>
          <IconfontView
            showType="hs_xian_guanbi"
            customClass="recommend-collocations-close"
            customStyle={iconStyle}
            hoverBgColor="#f5f5f5"
            iconOnclick={() => this.hideDialog(true)}
          />
        </div>
        
        <RecommendListContainer
          entityId={entity?.id}
          modelData={modelData}
        />
        
        {(isShowAutoRecommendItem || isShowRecommendDecorationsItem) && (
          <div className="recommend-collocations-buttons">
            {isShowAutoRecommendItem && (
              <Button
                className={`recommend-collocations-header-auto-recommend${buttonModifierClass}`}
                onClick={() => this._clickAutoRecommend()}
              >
                <IconfontView
                  showType="hs_mian_quanbuzhankai"
                  customStyle={iconStyle}
                />
                <SmartText>
                  {ResourceManager.getString('recommend_auto_recommend')}
                </SmartText>
              </Button>
            )}
            
            {isShowRecommendDecorationsItem && (
              <Button
                className="recommend-collocations-header-recommend-accessories"
                onClick={() => this._clickRecommendAccessories()}
              >
                <IconfontView
                  showType="hs_mian_quanbuzhankai"
                  customStyle={iconStyle}
                />
                <SmartText>
                  {ResourceManager.getString('recommend_accessories')}
                </SmartText>
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }
}