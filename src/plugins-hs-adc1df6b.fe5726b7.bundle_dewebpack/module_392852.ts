import React, { Component, RefObject } from 'react';
import { DraggableModal } from './DraggableModal';
import PropertyPanel from './PropertyPanel';
import DetailsInfo from './DetailsInfo';

interface ThumbnailViewPosition {
  isModal: boolean;
  height: number;
  left: number;
  display: string;
  visibility?: 'hidden' | 'visible';
}

interface WindowPosition {
  height: number;
  width: number;
}

interface LayoutConstraintParams {
  isModal?: boolean;
  height?: number;
  left?: number;
  visibility?: 'hidden' | 'visible';
  enableUpdate?: boolean;
  display?: string;
  width?: number;
}

interface LayoutManager {
  register(name: string, element: HTMLElement, modal: boolean, config: { type: string; component: unknown }): void;
  unregister(name: string): void;
  addConstrain(source: string, target: string, callback: (params: LayoutConstraintParams) => void): void;
  getPosition(name: string): ThumbnailViewPosition | WindowPosition;
  getElementRef(name: string): ThumbnailViewRef;
  activeModal(name: string): void;
  deactiveModal(name: string, snapped: boolean): void;
  update(name: string, options: { max?: boolean; min?: boolean; left?: number }): void;
}

interface ThumbnailViewRef {
  getToggleModalShowStatus(): boolean;
  showToggleModalBtn(show: boolean): void;
  toggleModalShow(show: boolean): void;
}

interface RightViewModalRef {
  changePosition(width: number | null, top: number): void;
  setModalSize(width: number | null, height: number): void;
  toggleExtendModel(value?: boolean): void;
  getSnappingStatus(): boolean;
  getToggleModelExtendsion(): boolean;
  changeModalPosition(): void;
  showExtensionBtn(show: boolean): void;
}

interface InfoData {
  [key: string]: unknown;
}

interface CustomizedLargeViewData {
  [key: string]: unknown;
}

interface PropertyItem {
  [key: string]: unknown;
}

interface PropertyBarItem {
  label: string;
  items: PropertyItem[];
  id: string;
  floatItems?: PropertyItem[];
  onTitleChange?: (title: string) => void;
  maxLength?: number;
  editable?: boolean;
  enableDetailsInfo?: boolean;
  getCustomizedLargeViewData?: () => CustomizedLargeViewData;
  customizedLargeViewData?: CustomizedLargeViewData;
  infoData?: InfoData;
}

interface PropertyBarProps {
  item: PropertyBarItem;
  isReadonly?: boolean;
}

interface HSApp {
  App: {
    getApp(): {
      layoutMgr: LayoutManager;
      activeEnvironment: { id: string };
    };
  };
  Util: {
    EventTrack: {
      instance(): EventTracker;
    };
    EventGroupEnum: {
      Propertybar: string;
    };
    Url: {
      getQueryStrings(): { env?: string };
    };
  };
}

interface EventTracker {
  track(group: string, event: string, data: { env: string; IF_env: string }): void;
}

declare const HSApp: HSApp;

class PropertyBar extends Component<PropertyBarProps> {
  private rightViewModal?: RightViewModalRef;

  componentDidMount(): void {
    const layoutManager = HSApp.App.getApp().layoutMgr;
    const propertyElement = document.querySelector('.property-draggable') as HTMLElement;

    layoutManager.register('PropertyBar', propertyElement, false, {
      type: 'modal',
      component: this.rightViewModal,
    });

    layoutManager.addConstrain('ThumbnailView', 'PropertyBar', (params: LayoutConstraintParams) => {
      const { isModal, height, left, visibility, enableUpdate } = params;

      if (enableUpdate === false || !this.rightViewModal) {
        return;
      }

      const maxHeight = document.documentElement.clientHeight - 50 - 16;

      const updatePosition = (topPosition: number, skipToggle?: boolean): void => {
        this.rightViewModal!.changePosition(null, topPosition - 180);
        this.rightViewModal!.setModalSize(null, maxHeight - topPosition);
        if (!skipToggle) {
          this.rightViewModal!.toggleExtendModel();
        }
      };

      if (isModal !== undefined && visibility === undefined) {
        if (isModal) {
          updatePosition(-8);
          if (!this.rightViewModal.getSnappingStatus() && this.rightViewModal.getToggleModelExtendsion()) {
            this.rightViewModal.changeModalPosition();
            this.rightViewModal.toggleExtendModel();
          }
          this.rightViewModal.showExtensionBtn(false);
        } else {
          let shouldSkipToggle = false;
          if (this.rightViewModal.getToggleModelExtendsion()) {
            shouldSkipToggle = true;
          }
          const thumbnailHeight = layoutManager.getPosition('ThumbnailView').height;
          updatePosition(thumbnailHeight, shouldSkipToggle);
        }
      } else if (height !== undefined) {
        updatePosition(height, true);
      } else if (left !== undefined) {
        const thumbnailHeight = layoutManager.getPosition('ThumbnailView').height;
        if (left >= document.documentElement.clientWidth) {
          updatePosition(-8);
        } else {
          updatePosition(thumbnailHeight);
        }
      }

      if (visibility === 'hidden') {
        if (!this.rightViewModal.getSnappingStatus() && this.rightViewModal.getToggleModelExtendsion()) {
          this.rightViewModal.changeModalPosition();
          this.rightViewModal.toggleExtendModel();
        }
        this.rightViewModal.showExtensionBtn(false);
      } else if (visibility === 'visible') {
        const thumbnailPosition = layoutManager.getPosition('ThumbnailView') as ThumbnailViewPosition;
        if (!thumbnailPosition.isModal) {
          const thumbnailRef = layoutManager.getElementRef('ThumbnailView');
          this.rightViewModal.changeModalPosition();
          this.rightViewModal.toggleExtendModel();
          thumbnailRef.showToggleModalBtn(false);
        }
        this.rightViewModal.showExtensionBtn(true);
      }
    });

    layoutManager.addConstrain('Window', 'PropertyBar', (params: LayoutConstraintParams) => {
      if (!this.rightViewModal || this.rightViewModal.getSnappingStatus()) {
        return;
      }

      const { height } = params;
      const thumbnailPosition = layoutManager.getPosition('ThumbnailView') as ThumbnailViewPosition;
      let thumbnailHeight = thumbnailPosition.height;

      if (thumbnailPosition.isModal) {
        thumbnailHeight = 0;
      } else if (thumbnailPosition.left >= (params.width ?? 0)) {
        thumbnailHeight = -8;
      }

      if (height !== undefined) {
        const calculatedHeight = height - 52 - 16 - thumbnailHeight;
        if (calculatedHeight > 200) {
          this.rightViewModal.setModalSize(null, calculatedHeight);
        }
      }
    });
  }

  componentWillUnmount(): void {
    HSApp.App.getApp().layoutMgr.unregister('PropertyBar');
  }

  private getHeight(offset: number = 0): number {
    const calculatedHeight = document.documentElement.clientHeight - 52 - 8 - offset;
    return calculatedHeight > 200 ? calculatedHeight : 200;
  }

  private getOptions(): Record<string, unknown> {
    const { item } = this.props;
    const app = HSApp.App.getApp();
    const eventTracker = HSApp.Util.EventTrack.instance();

    return {
      className: 'property-draggable',
      initialWidth: 240,
      initialHeight: document.documentElement.clientHeight - 52 - 180 - 16,
      defaultPositionX: -8,
      defaultPositionY: 0,
      initialIsModal: false,
      draggable: {
        onStart: () => {
          app.layoutMgr.activeModal('PropertyBar');
        },
        onStop: (_event: unknown, isSnapped: boolean) => {
          const layoutManager = app.layoutMgr;
          const thumbnailPosition = layoutManager.getPosition('ThumbnailView') as ThumbnailViewPosition;

          if (thumbnailPosition.display === 'none') {
            if (isSnapped) {
              this.rightViewModal?.showExtensionBtn(true);
            } else if (isSnapped === false) {
              this.rightViewModal?.showExtensionBtn(false);
            }
          }

          layoutManager.deactiveModal('PropertyBar', isSnapped);
          eventTracker.track(HSApp.Util.EventGroupEnum.Propertybar, 'move_attribute_panel_event', {
            env: HSApp.Util.Url.getQueryStrings().env || 'shejijia',
            IF_env: app.activeEnvironment.id,
          });
        },
      },
      zoomable: {
        borderWidth: 8,
        height: () => ({
          min: 200,
          max: this.getHeight(),
        }),
        direction: ['top', 'bottom'],
      },
      titleSetting: {
        title: item.label,
        className: 'propertybar-title',
        extensionOptions: {
          maximize: {
            position: {
              default: { y: -188 },
            },
            size: {
              default: {
                setHeight: () => this.getHeight(),
              },
              setHeight: () => {
                app.layoutMgr.update('PropertyBar', { max: true });
                return this.getHeight();
              },
            },
          },
          minimize: {
            position: {
              default: { y: -188 },
              setPositionY: () => {
                const thumbnailPosition = app.layoutMgr.getPosition('ThumbnailView') as ThumbnailViewPosition;
                return (thumbnailPosition.isModal ? -9 : thumbnailPosition.height) - 180;
              },
            },
            size: {
              default: {
                setHeight: () => this.getHeight(188),
              },
              setHeight: () => {
                app.layoutMgr.update('PropertyBar', { min: true });
                const thumbnailHeight = (app.layoutMgr.getPosition('ThumbnailView') as ThumbnailViewPosition).height;
                const calculatedHeight = document.documentElement.clientHeight - 52 - thumbnailHeight - 16;
                return calculatedHeight > 200 ? calculatedHeight : 200;
              },
            },
          },
        },
        onTitleChange: item.onTitleChange,
        maxLength: item.maxLength,
        editable: item.editable,
        enableCloseBtn: false,
        customizedTitleContent: item.enableDetailsInfo && (
          <DetailsInfo
            getCustomizedLargeViewData={item.getCustomizedLargeViewData}
            customizedLargeViewData={item.customizedLargeViewData}
            data={item.infoData}
          />
        ),
      },
      snapSetting: {
        snapoffset: 15,
        direction: 'right',
        setPosition: () => {
          const layoutManager = app.layoutMgr;
          const thumbnailPosition = layoutManager.getPosition('ThumbnailView') as ThumbnailViewPosition;
          const thumbnailRef = layoutManager.getElementRef('ThumbnailView');
          const toggleModalShowStatus = thumbnailRef.getToggleModalShowStatus();

          let positionY = thumbnailPosition.height - 180;

          if (
            thumbnailPosition.isModal ||
            thumbnailPosition.display === 'none' ||
            !toggleModalShowStatus
          ) {
            positionY = -188;
          }

          return { x: -8, y: positionY };
        },
        setSize: () => {
          const layoutManager = app.layoutMgr;
          const thumbnailPosition = layoutManager.getPosition('ThumbnailView') as ThumbnailViewPosition;
          const thumbnailRef = layoutManager.getElementRef('ThumbnailView');
          const toggleModalShowStatus = thumbnailRef.getToggleModalShowStatus();
          const isExtended = this.rightViewModal?.getToggleModelExtendsion();

          let calculatedHeight = document.documentElement.clientHeight - 52 - thumbnailPosition.height - 16;

          if (
            thumbnailPosition.isModal ||
            thumbnailPosition.display === 'none' ||
            !toggleModalShowStatus
          ) {
            calculatedHeight = document.documentElement.clientHeight - 52 - 8;
            if (isExtended) {
              this.rightViewModal?.toggleExtendModel(isExtended);
            }
            if (thumbnailPosition.display === 'none' && toggleModalShowStatus) {
              thumbnailRef.toggleModalShow(true);
              thumbnailRef.showToggleModalBtn(true);
            }
          } else if (!isExtended) {
            this.rightViewModal?.toggleExtendModel(isExtended);
          }

          return { height: calculatedHeight };
        },
      },
      enableXScroll: false,
      enableYScroll: false,
      scrollYTip: true,
      enableToggleModal: true,
      onEnableClickCloseModal: () => false,
      setClickModalZIndex: (isActive: boolean) => {
        if (isActive) {
          app.layoutMgr.activeModal('PropertyBar');
        }
      },
      onToggle: (isExpanded: boolean) => {
        const clientWidth = document.documentElement.clientWidth;
        if (isExpanded) {
          app.layoutMgr.update('PropertyBar', { left: clientWidth - 240 });
        } else {
          app.layoutMgr.update('PropertyBar', { left: clientWidth });
        }
      },
      scrollType: 'simple',
    };
  }

  render(): React.ReactElement {
    const { item, isReadonly } = this.props;
    const { items, id, floatItems } = item;
    const options = this.getOptions();

    return (
      <DraggableModal
        {...options}
        style={{
          position: 'absolute',
          zIndex: 109,
          top: 238,
          right: 0,
        }}
        ref={(ref: RightViewModalRef) => {
          this.rightViewModal = ref;
        }}
      >
        <PropertyPanel
          isReadonly={isReadonly}
          items={items}
          key={id}
          floatItems={floatItems}
        />
      </DraggableModal>
    );
  }
}

export default PropertyBar;