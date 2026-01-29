import React from 'react';
import { Button, SmartText, DraggableModal, IconfontView } from './components';
import { DropButton } from './DropButton';
import { HSApp } from './HSApp';
import { SelectRoomAux2DView } from './SelectRoomAux2DView';

interface DraggableConfig {
  used: boolean;
  onStart: () => void;
  onStop: (event: unknown, data: unknown) => void;
}

interface ZoomableConfig {
  used: boolean;
  borderWidth: number;
  width: () => { min: number; max: number };
  height: () => { min: number; max: number };
  direction: string[];
  onZoomStart: () => void;
  onZooming: (dimensions: { width: number; height: number }) => void;
  onZoomEnd: () => void;
}

interface SnapSettingConfig {
  snapoffset: number;
  direction: string;
  setPosition: () => { x: number; y: number };
}

interface DraggableModalOptions {
  className: string;
  initialWidth: number;
  initialHeight: number;
  defaultPositionX: number;
  initialIsModal: boolean;
  draggable: DraggableConfig;
  zoomable: ZoomableConfig;
  snapSetting: SnapSettingConfig;
  enableToggleModal: boolean;
  setClickModalZIndex: (zIndex: number) => void;
  onToggle: (isOpen: boolean, data: unknown) => void;
  scrollType: string;
}

interface DropButtonItem {
  key: string;
  label: string;
  onMouseDown: (event: React.MouseEvent) => void;
}

interface TopbarDropButton {
  key: string;
  currentItemKey: string;
  items: DropButtonItem[];
}

interface ThumbnailViewProps {
  onDragStart: () => void;
  onDragEnd: (event: unknown, data: unknown) => void;
  onZoomStart: () => void;
  onZooming: (dimensions: { width: number; height: number; padding: number }) => void;
  onZoomEnd: () => void;
  onClickModal: (zIndex: number) => void;
  onToggle: (isOpen: boolean, data: unknown) => void;
  onSwitch3DView: (viewMode: HSApp.View.ViewModeEnum) => void;
  handler: {
    createSelectRoomAux2DView: () => void;
  };
  onToggleSingleRoomMode: () => void;
  onExitElevation: () => void;
  onSwitchView: () => void;
  showExitElevationBtn: boolean;
  showSingleRoomModeBtn: boolean;
  isSingleRoomMode: boolean;
  visible: boolean;
  simple: boolean;
}

interface ThumbnailViewState {
  currentSelectedTab: 'view' | 'room';
}

export class ThumbnailView extends React.Component<ThumbnailViewProps, ThumbnailViewState> {
  private draggableModalOptions: DraggableModalOptions;
  private thumbnailModal?: DraggableModal;
  private rootContainerNode?: HTMLDivElement;
  private rootEditorContainerNode?: HTMLDivElement;
  private readonly viewPadding = 16;
  private _topbarDropButtons: TopbarDropButton[];

  constructor(props: ThumbnailViewProps) {
    super(props);

    this.state = {
      currentSelectedTab: 'view'
    };

    this.draggableModalOptions = {
      className: 'thumbnailview-draggable hs-hover-shadow',
      initialWidth: 240,
      initialHeight: 180,
      defaultPositionX: -8,
      initialIsModal: false,
      draggable: {
        used: true,
        onStart: () => {
          this.props.onDragStart();
        },
        onStop: (event: unknown, data: unknown) => {
          this.props.onDragEnd(event, data);
        }
      },
      zoomable: {
        used: true,
        borderWidth: 13,
        width: () => {
          const clientWidth = document.documentElement.clientWidth;
          return {
            min: 240,
            max: clientWidth < 240 ? 260 : clientWidth
          };
        },
        height: () => {
          const snappingStatus = this.thumbnailModal?.getSnappingStatus?.();
          const clientHeight = document.documentElement.clientHeight;
          let maxHeight = snappingStatus ? clientHeight - 50 - 8 : clientHeight - 200 - 50 - 16;
          maxHeight = maxHeight < 180 ? 200 : maxHeight;
          return {
            min: 180,
            max: maxHeight
          };
        },
        direction: ['left-bottom'],
        onZoomStart: () => {
          this.props.onZoomStart();
        },
        onZooming: (dimensions: { width: number; height: number }) => {
          this.props.onZooming({
            width: dimensions.width,
            height: dimensions.height,
            padding: this.viewPadding
          });
        },
        onZoomEnd: () => {
          this.props.onZoomEnd();
        }
      },
      snapSetting: {
        snapoffset: 15,
        direction: 'right',
        setPosition: () => {
          return {
            x: -8,
            y: 0
          };
        }
      },
      enableToggleModal: true,
      setClickModalZIndex: (zIndex: number) => {
        this.props.onClickModal(zIndex);
      },
      onToggle: (isOpen: boolean, data: unknown) => {
        this.props.onToggle(isOpen, data);
      },
      scrollType: 'simple'
    };

    this._topbarDropButtons = [
      {
        key: 'view',
        currentItemKey: '3dView',
        items: [
          {
            key: '3dView',
            label: ResourceManager.getString('viewsetting_birdview'),
            onMouseDown: (event: React.MouseEvent) => {
              this.setState({
                currentSelectedTab: 'view'
              });
              this.props.onSwitch3DView(HSApp.View.ViewModeEnum.OrbitView);
            }
          },
          {
            key: 'roamView',
            label: ResourceManager.getString('viewsetting_roam'),
            onMouseDown: (event: React.MouseEvent) => {
              this.setState({
                currentSelectedTab: 'view'
              });
              this.props.onSwitch3DView(HSApp.View.ViewModeEnum.FirstPerson);
            }
          }
        ]
      },
      {
        key: 'room',
        currentItemKey: 'selectRoom',
        items: [
          {
            key: 'selectRoom',
            label: ResourceManager.getString('select_room'),
            onMouseDown: (event: React.MouseEvent) => {
              this.props.handler.createSelectRoomAux2DView();
              this.setState({
                currentSelectedTab: 'room'
              });
              HSApp.Util.EventTrack.instance().track(
                HSApp.Util.EventGroupEnum.ThumbnailView,
                'select_room_view_event'
              );
            }
          }
        ]
      }
    ];
  }

  private handleViewModeChange(mode: string): void {
    switch (mode) {
      case 'showAllRooms':
        this.props.onToggleSingleRoomMode();
        break;
      case 'exitElevation':
        this.props.onExitElevation();
        break;
      case 'switchTo2dOr3d':
        this.props.onSwitchView();
        break;
    }

    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.ThumbnailView,
      'view_mode_change_event',
      { type: mode }
    );
  }

  private _renderShowAllRoomsBtn(): React.ReactElement {
    const exitSingleRoomLabel = ResourceManager.getString('resizeWidget_exit_single_room_mode');
    return (
      <Button
        className="thumbnail-view-button"
        type="default"
        size="middle"
        onClick={() => this.handleViewModeChange('showAllRooms')}
      >
        <SmartText className="buttonText">{exitSingleRoomLabel}</SmartText>
      </Button>
    );
  }

  private _renderExitElevationBtn(): React.ReactElement {
    return (
      <Button
        className="thumbnail-view-button"
        type="default"
        size="middle"
        onClick={() => this.handleViewModeChange('exitElevation')}
      >
        <SmartText className="buttonText">
          {ResourceManager.getString('resizeWidget_exit_elevation_mode')}
        </SmartText>
      </Button>
    );
  }

  private _renderTopbarButtons(): React.ReactElement[] {
    this._updateViewModeButton();
    return this._topbarDropButtons.map((button) => {
      return (
        <DropButton
          key={button.key}
          items={button.items}
          currentItemKey={button.currentItemKey}
          isSelected={this.state.currentSelectedTab === button.key}
        />
      );
    });
  }

  private _updateViewModeButton(): void {
    let currentViewKey = '';
    const viewMode3D = HSApp.App.getApp().viewMode3D;
    
    if (viewMode3D === HSApp.View.ViewModeEnum.OrbitView) {
      currentViewKey = '3dView';
    } else if (viewMode3D === HSApp.View.ViewModeEnum.FirstPerson) {
      currentViewKey = 'roamView';
    }
    
    this._topbarDropButtons[0].currentItemKey = currentViewKey;
  }

  private _renderSwitchTo2dOr3dBtn(): React.ReactElement {
    const is3DActive = HSApp.App.getApp().is3DViewActive();
    const buttonLabel = ResourceManager.getString(
      is3DActive ? 'resizeWidget_resize_3D' : 'resizeWidget_resize_2D'
    );
    
    return (
      <Button
        className="thumbnail-view-button"
        type="default"
        size="middle"
        onClick={() => this.handleViewModeChange('switchTo2dOr3d')}
      >
        <SmartText className="buttonText">{buttonLabel}</SmartText>
        <IconfontView
          showType="hs_xian_changeview"
          customClass="switcher-icon"
          customStyle={{ fontSize: '11px' }}
        />
      </Button>
    );
  }

  private isSelectRoomAux2DVisible(): boolean {
    return (
      !this.props.showExitElevationBtn &&
      this.props.showSingleRoomModeBtn &&
      this.state.currentSelectedTab === 'room'
    );
  }

  private _isTopbarButtonsVisible(): boolean {
    return !this.props.showExitElevationBtn && this.props.showSingleRoomModeBtn;
  }

  private _isSwitchTo2dOr3dBtnVisible(): boolean {
    return !(
      this.props.showExitElevationBtn ||
      (this.props.showSingleRoomModeBtn && this.state.currentSelectedTab !== 'view')
    );
  }

  private _isShowAllRoomsBtnVisible(): boolean {
    return (
      !this.props.showExitElevationBtn &&
      this.props.showSingleRoomModeBtn &&
      this.props.isSingleRoomMode &&
      this.state.currentSelectedTab === 'room'
    );
  }

  render(): React.ReactElement {
    const { showExitElevationBtn, visible, simple } = this.props;
    const isSelectRoomVisible = this.isSelectRoomAux2DVisible();

    return (
      <DraggableModal
        {...this.draggableModalOptions}
        ref={(modal: DraggableModal) => {
          this.thumbnailModal = modal;
        }}
        className={`${this.draggableModalOptions.className} ${
          visible ? 'thumbnail-view-visible' : 'thumbnail-view-hidden'
        }`}
        style={{
          position: 'absolute',
          zIndex: 110,
          top: 50,
          right: 0
        }}
      >
        <div
          id="thumbnail-view"
          className="thumbnail-view-container"
          ref={(node: HTMLDivElement) => {
            this.rootContainerNode = node;
          }}
        >
          <div
            className={`thumbnail-view-editor-container ${
              isSelectRoomVisible ? 'hidden-container' : ''
            }`}
            ref={(node: HTMLDivElement) => {
              this.rootEditorContainerNode = node;
            }}
          />
          <div
            className={`thumbnail-view-aux-container ${
              isSelectRoomVisible ? '' : 'hidden-container'
            }`}
          >
            <SelectRoomAux2DView handler={this.props.handler} />
          </div>
          <div className="thumbnail-view-topbar">
            {this._isTopbarButtonsVisible() && this._renderTopbarButtons()}
          </div>
          <div
            className={`thumbnail-view-actions ${
              simple ? 'thumbnail-view-actions-hidden' : 'thumbnail-view-actions-visible'
            }`}
          >
            {showExitElevationBtn && this._renderExitElevationBtn()}
            {this._isSwitchTo2dOr3dBtnVisible() && this._renderSwitchTo2dOr3dBtn()}
            {this._isShowAllRoomsBtnVisible() && this._renderShowAllRoomsBtn()}
          </div>
        </div>
      </DraggableModal>
    );
  }
}