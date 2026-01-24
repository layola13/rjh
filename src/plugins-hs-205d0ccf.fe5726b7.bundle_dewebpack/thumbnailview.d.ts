import React from 'react';
import { DraggableModal, Button, SmartText, IconfontView } from './ui-components';
import { DropButton } from './DropButton';
import { SelectRoomAux2DView } from './SelectRoomAux2DView';
import { HSApp } from './HSApp';

/**
 * 缩略图视图的属性接口
 */
interface ThumbnailViewProps {
  /** 是否显示退出立面模式按钮 */
  showExitElevationBtn: boolean;
  /** 是否显示单房间模式按钮 */
  showSingleRoomModeBtn: boolean;
  /** 是否处于单房间模式 */
  isSingleRoomMode: boolean;
  /** 是否可见 */
  visible: boolean;
  /** 是否简化模式 */
  simple: boolean;
  /** 处理器实例 */
  handler: ThumbnailViewHandler;
  /** 拖拽开始回调 */
  onDragStart: () => void;
  /** 拖拽结束回调 */
  onDragEnd: (event: MouseEvent, data: DragData) => void;
  /** 缩放开始回调 */
  onZoomStart: () => void;
  /** 缩放中回调 */
  onZooming: (size: ViewSize) => void;
  /** 缩放结束回调 */
  onZoomEnd: () => void;
  /** 点击模态框回调 */
  onClickModal: (zIndex: number) => void;
  /** 切换模态框回调 */
  onToggle: (isModal: boolean, isSnapped: boolean) => void;
  /** 切换3D视图回调 */
  onSwitch3DView: (viewMode: HSApp.View.ViewModeEnum) => void;
  /** 切换单房间模式回调 */
  onToggleSingleRoomMode: () => void;
  /** 退出立面模式回调 */
  onExitElevation: () => void;
  /** 切换视图回调 */
  onSwitchView: () => void;
}

/**
 * 缩略图视图的状态接口
 */
interface ThumbnailViewState {
  /** 当前选中的标签页 */
  currentSelectedTab: 'view' | 'room';
}

/**
 * 拖拽数据接口
 */
interface DragData {
  x: number;
  y: number;
}

/**
 * 视图尺寸接口
 */
interface ViewSize {
  width: number;
  height: number;
  padding: number;
}

/**
 * 缩放尺寸接口
 */
interface ZoomSize {
  width: number;
  height: number;
}

/**
 * 位置接口
 */
interface Position {
  x: number;
  y: number;
}

/**
 * 尺寸范围接口
 */
interface SizeRange {
  min: number;
  max: number;
}

/**
 * 下拉按钮项接口
 */
interface DropButtonItem {
  key: string;
  label: string;
  onMouseDown: (event: React.MouseEvent) => void;
}

/**
 * 下拉按钮配置接口
 */
interface DropButtonConfig {
  key: string;
  currentItemKey: string;
  items: DropButtonItem[];
}

/**
 * 可拖拽模态框选项接口
 */
interface DraggableModalOptions {
  className: string;
  initialWidth: number;
  initialHeight: number;
  defaultPositionX: number;
  initialIsModal: boolean;
  draggable: {
    used: boolean;
    onStart: () => void;
    onStop: (event: MouseEvent, data: DragData) => void;
  };
  zoomable: {
    used: boolean;
    borderWidth: number;
    width: () => SizeRange;
    height: () => SizeRange;
    direction: string[];
    onZoomStart: () => void;
    onZooming: (size: ZoomSize) => void;
    onZoomEnd: () => void;
  };
  snapSetting: {
    snapoffset: number;
    direction: string;
    setPosition: () => Position;
  };
  enableToggleModal: boolean;
  setClickModalZIndex: (zIndex: number) => void;
  onToggle: (isModal: boolean, isSnapped: boolean) => void;
  scrollType: string;
}

/**
 * 缩略图视图处理器接口
 */
interface ThumbnailViewHandler {
  createSelectRoomAux2DView: () => void;
}

/**
 * 可拖拽模态框引用接口
 */
interface DraggableModalRef {
  getSnappingStatus?: () => boolean;
}

/**
 * 缩略图视图组件
 * 提供3D/2D视图的缩略图预览功能，支持拖拽、缩放和视图模式切换
 */
export class ThumbnailView extends React.Component<ThumbnailViewProps, ThumbnailViewState> {
  /** 可拖拽模态框配置选项 */
  private draggableModalOptions: DraggableModalOptions;
  
  /** 缩略图模态框引用 */
  private thumbnailModal?: DraggableModalRef;
  
  /** 根容器节点引用 */
  private rootContainerNode?: HTMLDivElement;
  
  /** 根编辑器容器节点引用 */
  private rootEditorContainerNode?: HTMLDivElement;
  
  /** 视图内边距（像素） */
  private readonly viewPadding: number = 16;
  
  /** 顶部栏下拉按钮配置 */
  private _topbarDropButtons: DropButtonConfig[];

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
        onStop: (event: MouseEvent, data: DragData) => {
          this.props.onDragEnd(event, data);
        }
      },
      zoomable: {
        used: true,
        borderWidth: 13,
        width: (): SizeRange => {
          const clientWidth = document.documentElement.clientWidth;
          return {
            min: 240,
            max: clientWidth < 240 ? 260 : clientWidth
          };
        },
        height: (): SizeRange => {
          const isSnapped = this.thumbnailModal?.getSnappingStatus?.();
          const clientHeight = document.documentElement.clientHeight;
          let maxHeight = isSnapped 
            ? clientHeight - 50 - 8 
            : clientHeight - 200 - 50 - 16;
          
          return {
            min: 180,
            max: maxHeight < 180 ? 200 : maxHeight
          };
        },
        direction: ['left-bottom'],
        onZoomStart: () => {
          this.props.onZoomStart();
        },
        onZooming: (size: ZoomSize) => {
          this.props.onZooming({
            width: size.width,
            height: size.height,
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
        setPosition: (): Position => {
          return { x: -8, y: 0 };
        }
      },
      enableToggleModal: true,
      setClickModalZIndex: (zIndex: number) => {
        this.props.onClickModal(zIndex);
      },
      onToggle: (isModal: boolean, isSnapped: boolean) => {
        this.props.onToggle(isModal, isSnapped);
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
              this.setState({ currentSelectedTab: 'view' });
              this.props.onSwitch3DView(HSApp.View.ViewModeEnum.OrbitView);
            }
          },
          {
            key: 'roamView',
            label: ResourceManager.getString('viewsetting_roam'),
            onMouseDown: (event: React.MouseEvent) => {
              this.setState({ currentSelectedTab: 'view' });
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
              this.setState({ currentSelectedTab: 'room' });
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

  /**
   * 处理视图模式变化
   * @param mode - 视图模式类型
   */
  private handleViewModeChange(mode: 'showAllRooms' | 'exitElevation' | 'switchTo2dOr3d'): void {
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

  /**
   * 渲染显示所有房间按钮
   */
  private _renderShowAllRoomsBtn(): React.ReactElement {
    const label = ResourceManager.getString('resizeWidget_exit_single_room_mode');
    return (
      <Button
        className="thumbnail-view-button"
        type="default"
        size="middle"
        onClick={() => this.handleViewModeChange('showAllRooms')}
      >
        <SmartText className="buttonText">{label}</SmartText>
      </Button>
    );
  }

  /**
   * 渲染退出立面模式按钮
   */
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

  /**
   * 渲染顶部栏按钮组
   */
  private _renderTopbarButtons(): React.ReactElement[] {
    this._updateViewModeButton();
    return this._topbarDropButtons.map((buttonConfig) => (
      <DropButton
        key={buttonConfig.key}
        items={buttonConfig.items}
        currentItemKey={buttonConfig.currentItemKey}
        isSelected={this.state.currentSelectedTab === buttonConfig.key}
      />
    ));
  }

  /**
   * 更新视图模式按钮的当前选中项
   */
  private _updateViewModeButton(): void {
    let currentKey = '';
    const viewMode = HSApp.App.getApp().viewMode3D;

    if (viewMode === HSApp.View.ViewModeEnum.OrbitView) {
      currentKey = '3dView';
    } else if (viewMode === HSApp.View.ViewModeEnum.FirstPerson) {
      currentKey = 'roamView';
    }

    this._topbarDropButtons[0].currentItemKey = currentKey;
  }

  /**
   * 渲染2D/3D切换按钮
   */
  private _renderSwitchTo2dOr3dBtn(): React.ReactElement {
    const is3DActive = HSApp.App.getApp().is3DViewActive();
    const label = ResourceManager.getString(
      is3DActive ? 'resizeWidget_resize_3D' : 'resizeWidget_resize_2D'
    );

    return (
      <Button
        className="thumbnail-view-button"
        type="default"
        size="middle"
        onClick={() => this.handleViewModeChange('switchTo2dOr3d')}
      >
        <SmartText className="buttonText">{label}</SmartText>
        <IconfontView
          showType="hs_xian_changeview"
          customClass="switcher-icon"
          customStyle={{ fontSize: '11px' }}
        />
      </Button>
    );
  }

  /**
   * 判断选择房间辅助2D视图是否可见
   */
  private isSelectRoomAux2DVisible(): boolean {
    return (
      !this.props.showExitElevationBtn &&
      this.props.showSingleRoomModeBtn &&
      this.state.currentSelectedTab === 'room'
    );
  }

  /**
   * 判断顶部栏按钮是否可见
   */
  private _isTopbarButtonsVisible(): boolean {
    return !this.props.showExitElevationBtn && this.props.showSingleRoomModeBtn;
  }

  /**
   * 判断2D/3D切换按钮是否可见
   */
  private _isSwitchTo2dOr3dBtnVisible(): boolean {
    return !(
      this.props.showExitElevationBtn ||
      (this.props.showSingleRoomModeBtn && this.state.currentSelectedTab !== 'view')
    );
  }

  /**
   * 判断显示所有房间按钮是否可见
   */
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
        ref={(ref: DraggableModalRef) => {
          this.thumbnailModal = ref;
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
          ref={(ref: HTMLDivElement) => {
            this.rootContainerNode = ref;
          }}
        >
          <div
            className={`thumbnail-view-editor-container ${
              isSelectRoomVisible ? 'hidden-container' : ''
            }`}
            ref={(ref: HTMLDivElement) => {
              this.rootEditorContainerNode = ref;
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