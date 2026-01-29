import React, { Component, MouseEvent } from 'react';
import CeilingImageButton from './CeilingImageButton';
import ImageButton from './ImageButton';
import IconfontView from './IconfontView';
import { DropImageButton } from './DropImageButton';

interface FreeTrialInfo {
  text: string;
}

interface BuyVipInfo {
  icon: string;
}

interface ToolbarItem {
  type: string;
  label?: string;
  icon?: string;
  iconHover?: string;
  onMouseEnter?: (e: MouseEvent) => void;
  onMouseLeave?: (e: MouseEvent) => void;
  onMouseDown?: (e: MouseEvent) => void;
  onClick?: (e: MouseEvent) => void;
  draggable?: boolean;
  onDrag?: (e: MouseEvent) => void;
  onDragEnd?: (e: MouseEvent) => void;
  onDragStart?: (e: MouseEvent) => void;
  hotkey?: string;
  registerHotkey?: boolean;
  remarks?: string;
  commandValidate?: () => boolean;
  hoverColor?: string;
  disable?: boolean;
  disableTooltip?: string;
  isBeta?: boolean;
  showNewCallBack?: () => void;
  currentFreeTrial?: FreeTrialInfo;
  freeTrialClick?: (value: boolean) => void;
  buyVip?: BuyVipInfo;
  buyVipClick?: () => void;
  editStatus?: boolean;
  values?: ToolbarItem[];
}

interface HouseTypePanelProps {
  type?: string;
  isSettingVisible?: boolean;
  settingDescription?: string;
  values: ToolbarItem[];
  iconfontStyle?: React.CSSProperties;
  isSmallMode?: boolean;
  enable?: boolean;
}

interface HouseTypePanelState {
  dropDown: boolean;
}

export default class HouseTypePanel extends Component<HouseTypePanelProps, HouseTypePanelState> {
  constructor(props: HouseTypePanelProps) {
    super(props);
    this.state = {
      dropDown: true
    };
  }

  dropDownClick = (): void => {
    this.setState({
      dropDown: !this.state.dropDown
    });
  };

  settingOnClick = (): void => {
    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Toolbar,
      'toolbar_wall_setting_event'
    );
    HSApp.App.getApp()
      .pluginManager.getPlugin(HSFPConstants.PluginType.UserSetting)
      .show(2);
  };

  toolBarCheckWallClosedClick = (): void => {
    const persistencePlugin = HSApp.App.getApp()
      .pluginManager.getPlugin('hsw.plugin.persistence.Plugin');
    
    if (persistencePlugin) {
      persistencePlugin.checkRoomClosed();
    }
  };

  render(): React.ReactElement {
    const {
      type,
      isSettingVisible,
      settingDescription,
      values,
      iconfontStyle,
      isSmallMode,
      enable = true
    } = this.props;

    const renderedItems: React.ReactElement[] = [];

    values.forEach((item, index) => {
      if (item.type === 'ceiling-imagebutton') {
        renderedItems.push(
          <CeilingImageButton
            key={index}
            item={item}
            onMouseDown={item.onMouseDown}
          />
        );
      } else if (item.type === 'drop-image-button') {
        renderedItems.push(
          <DropImageButton
            key={index}
            label={item.label}
            currentFreeTrial={item.currentFreeTrial}
            items={item.values ?? []}
            dropLocation={(index + 1) % 3 === 0 ? 'right' : 'left'}
            showNewCallBack={item.showNewCallBack}
          />
        );
      } else {
        const editModeClass = isSmallMode && !item.editStatus ? 'image-button-edit-model' : '';
        
        renderedItems.push(
          <div key={index} className={editModeClass}>
            <ImageButton
              label={item.label}
              type={item.type}
              icon={item.icon}
              iconHover={item.iconHover}
              onMouseEnter={item.onMouseEnter}
              onMouseLeave={item.onMouseLeave}
              onMouseDown={item.onMouseDown}
              onClick={item.onClick}
              draggable={item.draggable}
              onDrag={item.onDrag}
              onDragEnd={item.onDragEnd}
              onDragStart={item.onDragStart}
              hotkey={item.hotkey}
              registerHotkey={item.registerHotkey}
              remarks={item.remarks}
              commandValidate={item.commandValidate}
              iconfontStyle={iconfontStyle}
              hoverColor={item.hoverColor}
              disable={item.disable}
              disableTooltip={item.disableTooltip}
              isBeta={item.isBeta}
              showNewCallBack={item.showNewCallBack}
            />
            {item.currentFreeTrial && (
              <div
                className="freeTrialItem"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  item.freeTrialClick?.(true);
                }}
              >
                {item.currentFreeTrial.text}
              </div>
            )}
            {item.buyVip && (
              <div
                className="vipIcon"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  item.buyVipClick?.();
                }}
              >
                <img src={item.buyVip.icon} />
              </div>
            )}
          </div>
        );
      }
    });

    const panelClassName = enable ? 'house-type-panel' : 'house-type-panel house-type-panel-edit-model';

    return (
      <div className={panelClassName}>
        {!isSmallMode && (type || isSettingVisible) && (
          <div className="title">
            {type && <span className="text">{type}</span>}
            {isSettingVisible && (
              <div className="setting">
                <IconfontView
                  customClass="more-arrow"
                  showType="hs_huahuxing_shezhi"
                />
                <span className="setting-text" onClick={this.settingOnClick}>
                  {settingDescription}
                </span>
              </div>
            )}
          </div>
        )}
        {this.state.dropDown && <div className="component">{renderedItems}</div>}
      </div>
    );
  }
}