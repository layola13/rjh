/**
 * UI组件库模块声明
 * 提供了各种UI组件、控件和工具类的类型定义
 */

// ============ 导入的模块类型声明 ============

import type { PropertyBar, PropertyBarControlTypeEnum } from './property-bar';
import type { PropertyBarPopup } from './property-bar-popup';
import type { StatusBarItemTypeEnum } from './status-bar';
import type { NameRoomPopup } from './name-room-popup';
import type { AuthPopup } from './auth-popup';
import type {
  UnitInputWidget,
  UnitInputWidgetStateEnum,
  UnitInputWidgetEventsEnum,
  UnitInputWidgetChangeReasonEnum
} from './unit-input-widget';
import type { LengthInputWidget } from './length-input-widget';
import type { AreaInputWidget } from './area-input-widget';
import type { CCheckBox } from './checkbox';
import type { ColorCheckbox } from './color-checkbox';
import type { LoadingWidget } from './loading-widget';
import type { FullScreenLoading } from './full-screen-loading';
import type { SvgIcon } from './svg-icon';
import type { StatusButton } from './status-button';
import type { ExpandButton } from './expand-button';
import type { HintView } from './hint-view';
import type { PopupWindowBuilder } from './popup-window-builder';
import type { Notification } from './notification';
import type { UserGuide } from './user-guide';
import type { PageLoading, PanelLoading } from './loading';
import type { LiveHint } from './live-hint';
import type { FloatInput } from './float-input';
import type { LargeView } from './large-view';
import type { MiniImagePreviewCtrl } from './mini-image-preview';
import type { ScrollTip } from './scroll-tip';
import type { ToggleButtonWidget } from './toggle-button-widget';
import type { ToggleBtnWidget } from './toggle-btn-widget';
import type { StatusBtnWidget } from './status-btn-widget';
import type { NinePatchWidget } from './nine-patch-widget';
import type { ViewModeDropdown } from './view-mode-dropdown';
import type { Button } from './button';
import type { BubbleTooltips } from './bubble-tooltips';
import type { Popover } from './popover';
import type { DraggableContainer } from './draggable-container';
import type { NumberController } from './number-controller';
import type { ImgBtn } from './img-btn';
import type { ImageBtn } from './image-btn';
import type { LengthInput } from './length-input';
import type { DeleteOutlined } from './icons';
import type { EndPointItem, EndPointType } from './endpoint';
import type { PathItem } from './path-item';
import type {
  WallSvgAttr,
  ALWallAttr,
  AuxiliaryLineAttr,
  ActiveAuxiliaryLineAttr
} from './wall-attributes';
import type { HSCatalogLib } from './catalog-lib';

// ============ Ant Design 组件类型 ============

/**
 * Ant Design Form组件
 */
export interface AdForm {
  // 表单相关类型定义
}

/**
 * Ant Design Divider组件
 */
export interface AdDivider {
  // 分割线相关类型定义
}

/**
 * Ant Design Select组件
 */
export interface AdSelect {
  // 选择器相关类型定义
}

// ============ HS设计系统组件类型 ============

/**
 * HS设计系统 - 标签页组件
 */
export interface HSTabs {
  // 标签页相关类型定义
}

/**
 * HS设计系统 - 模态框组件
 */
export interface HSModal {
  // 模态框相关类型定义
}

/**
 * HS设计系统 - 图标组件
 */
export interface HSIcons {
  // 图标相关类型定义
}

/**
 * HS设计系统 - 可拖拽模态框组件
 */
export interface HSDraggableModal extends HSModal {
  // 可拖拽模态框相关类型定义
}

/**
 * HS设计系统 - 按钮组件
 */
export interface HSButton {
  // 按钮相关类型定义
}

/**
 * HS设计系统 - 提示组件
 */
export interface HSTooltip {
  // 提示相关类型定义
}

/**
 * HS设计系统 - 消息组件
 */
export interface HSMessage {
  // 消息相关类型定义
}

/**
 * HS设计系统 - 数字输入框组件
 */
export interface HSNumberInput {
  // 数字输入框相关类型定义
}

/**
 * HS设计系统 - 单选按钮组件
 */
export interface HSRadio {
  // 单选按钮相关类型定义
}

/**
 * HS设计系统 - 单选按钮组组件
 */
export interface HSRadioGroup {
  // 单选按钮组相关类型定义
}

/**
 * HS设计系统 - 菜单组件
 */
export interface HSMenu {
  // 菜单相关类型定义
}

/**
 * HS设计系统 - 子菜单组件
 */
export interface HSSubMenu {
  // 子菜单相关类型定义
}

/**
 * HS设计系统 - 菜单项组件
 */
export interface HSMenuItem {
  // 菜单项相关类型定义
}

/**
 * HS设计系统 - 滑块组件
 */
export interface HSSlider {
  // 滑块相关类型定义
}

/**
 * HS设计系统 - 选择器组件
 */
export interface HSSelect {
  // 选择器相关类型定义
}

/**
 * HS设计系统 - 复选框组件
 */
export interface HSCheckBox {
  // 复选框相关类型定义
}

/**
 * HS设计系统 - 复选框组组件
 */
export interface HSCheckBoxGroup {
  // 复选框组相关类型定义
}

/**
 * HS设计系统 - 选项组件
 */
export interface HSOption {
  // 选项相关类型定义
}

/**
 * HS设计系统 - 图标字体视图组件
 */
export interface HSIconfontView {
  // 图标字体视图相关类型定义
}

/**
 * HS设计系统 - 滚动组件
 */
export interface HSScroll {
  // 滚动相关类型定义
}

/**
 * HS设计系统 - 树形组件
 */
export interface HSTree {
  // 树形相关类型定义
}

/**
 * HS设计系统 - 气泡确认框组件
 */
export interface HSPopconfirm {
  // 气泡确认框相关类型定义
}

/**
 * HS设计系统 - 气泡卡片组件
 */
export interface HSPopover {
  // 气泡卡片相关类型定义
}

/**
 * HS设计系统 - 图片按钮组件
 */
export interface HSImageButton {
  // 图片按钮相关类型定义
}

/**
 * HS设计系统 - 智能文本组件
 */
export interface HSSmartText {
  // 智能文本相关类型定义
}

// ============ 材质纹理模式类型 ============

/**
 * 砖块纹理模式
 */
export type BrickPattern = unknown;

/**
 * 砖块悬停纹理模式
 */
export type BrickHoverPattern = unknown;

/**
 * 砖块选中纹理模式
 */
export type BrickSelectedPattern = unknown;

/**
 * 砖块移动纹理模式
 */
export type BrickMovingPattern = unknown;

/**
 * 砖块承重纹理模式
 */
export type BrickLoadPattern = unknown;

/**
 * 混凝土纹理模式
 */
export type ConcretePattern = unknown;

/**
 * 混凝土悬停纹理模式
 */
export type ConcreteHoverPattern = unknown;

/**
 * 混凝土选中纹理模式
 */
export type ConcreteSelectedPattern = unknown;

/**
 * 混凝土移动纹理模式
 */
export type ConcreteMovingPattern = unknown;

/**
 * 混凝土承重纹理模式
 */
export type ConcreteLoadPattern = unknown;

/**
 * 石膏纹理模式
 */
export type GypsumPattern = unknown;

/**
 * 石膏悬停纹理模式
 */
export type GypsumHoverPattern = unknown;

/**
 * 石膏选中纹理模式
 */
export type GypsumSelectedPattern = unknown;

/**
 * 石膏移动纹理模式
 */
export type GypsumMovingPattern = unknown;

/**
 * 石膏承重纹理模式
 */
export type GypsumLoadPattern = unknown;

// ============ UI命名空间声明 ============

/**
 * HSApp.UI 命名空间
 * 包含所有UI组件和工具类
 */
export declare namespace HSAppUI {
  export {
    PropertyBar,
    PropertyBarControlTypeEnum,
    PropertyBarPopup,
    StatusBarItemTypeEnum,
    NameRoomPopup,
    AuthPopup,
    UnitInputWidget,
    UnitInputWidgetStateEnum,
    UnitInputWidgetEventsEnum,
    UnitInputWidgetChangeReasonEnum,
    LengthInputWidget,
    AreaInputWidget,
    CCheckBox,
    ColorCheckbox,
    LoadingWidget,
    FullScreenLoading,
    SvgIcon,
    StatusButton,
    ExpandButton,
    HintView,
    PopupWindowBuilder,
    Notification,
    UserGuide,
    PageLoading,
    PanelLoading,
    LiveHint,
    FloatInput,
    LargeView,
    MiniImagePreviewCtrl,
    ScrollTip,
    ToggleButtonWidget,
    ToggleBtnWidget,
    StatusBtnWidget,
    NinePatchWidget,
    ViewModeDropdown,
    Button,
    BubbleTooltips,
    Popover,
    DraggableContainer,
    NumberController,
    ImgBtn,
    ImageBtn,
    LengthInput,
    AdForm,
    AdDivider,
    AdSelect,
    DeleteOutlined as AdDeleteOutlined,
    EndPointItem,
    EndPointType,
    PathItem,
    WallSvgAttr,
    ALWallAttr,
    AuxiliaryLineAttr,
    ActiveAuxiliaryLineAttr,
    HSTabs,
    HSModal,
    HSIcons,
    HSDraggableModal,
    HSButton,
    HSTooltip,
    HSMessage,
    HSNumberInput,
    HSRadio,
    HSRadioGroup,
    HSMenu,
    HSSubMenu,
    HSMenuItem,
    HSSlider,
    HSSelect,
    HSCheckBox,
    HSCheckBoxGroup,
    HSOption,
    HSIconfontView,
    HSScroll,
    HSTree,
    HSPopconfirm,
    HSPopover,
    HSImageButton,
    HSSmartText,
    HSCatalogLib
  };
}

// ============ 全局声明 ============

declare global {
  /**
   * HSApp全局对象
   */
  interface HSApp {
    Util: {
      Core: {
        /**
         * 定义模块
         * @param moduleName - 模块名称
         * @returns 模块对象
         */
        define(moduleName: string): Record<string, unknown>;
      };
    };
    UI: typeof HSAppUI;
  }

  const HSApp: HSApp;

  // 全局导出所有组件到window对象
  const PropertyBar: typeof HSAppUI.PropertyBar;
  const PropertyBarControlTypeEnum: typeof HSAppUI.PropertyBarControlTypeEnum;
  const PropertyBarPopup: typeof HSAppUI.PropertyBarPopup;
  const StatusBarItemTypeEnum: typeof HSAppUI.StatusBarItemTypeEnum;
  const NameRoomPopUp: typeof HSAppUI.NameRoomPopup;
  const AuthPopup: typeof HSAppUI.AuthPopup;
  const UnitInputWidget: typeof HSAppUI.UnitInputWidget;
  const UnitInputWidgetStateEnum: typeof HSAppUI.UnitInputWidgetStateEnum;
  const UnitInputWidgetEventsEnum: typeof HSAppUI.UnitInputWidgetEventsEnum;
  const UnitInputWidgetChangeReasonEnum: typeof HSAppUI.UnitInputWidgetChangeReasonEnum;
  const LengthInputWidget: typeof HSAppUI.LengthInputWidget;
  const AreaInputWidget: typeof HSAppUI.AreaInputWidget;
  const CCheckBox: typeof HSAppUI.CCheckBox;
  const ColorCheckbox: typeof HSAppUI.ColorCheckbox;
  const LoadingWidget: typeof HSAppUI.LoadingWidget;
  const FullScreenLoading: typeof HSAppUI.FullScreenLoading;
  const SvgIcon: typeof HSAppUI.SvgIcon;
  const StatusButton: typeof HSAppUI.StatusButton;
  const ExpandButton: typeof HSAppUI.ExpandButton;
  const HintView: typeof HSAppUI.HintView;
  const PopupWindowBuilder: typeof HSAppUI.PopupWindowBuilder;
  const Notification: typeof HSAppUI.Notification;
  const UserGuide: typeof HSAppUI.UserGuide;
  const PageLoading: typeof HSAppUI.PageLoading;
  const PanelLoading: typeof HSAppUI.PanelLoading;
  const LiveHint: typeof HSAppUI.LiveHint;
  const FloatInput: typeof HSAppUI.FloatInput;
  const LargeView: typeof HSAppUI.LargeView;
  const MiniImagePreviewCtrl: typeof HSAppUI.MiniImagePreviewCtrl;
  const ScrollTip: typeof HSAppUI.ScrollTip;
  const ToggleButtonWidget: typeof HSAppUI.ToggleButtonWidget;
  const ToggleBtnWidget: typeof HSAppUI.ToggleBtnWidget;
  const StatusBtnWidget: typeof HSAppUI.StatusBtnWidget;
  const NinePatchWidget: typeof HSAppUI.NinePatchWidget;
  const viewModeDropdown: typeof HSAppUI.ViewModeDropdown;
  const Button: typeof HSAppUI.Button;
  const BubbleTooltips: typeof HSAppUI.BubbleTooltips;
  const Popover: typeof HSAppUI.Popover;
  const DraggableContainer: typeof HSAppUI.DraggableContainer;
  const NumberController: typeof HSAppUI.NumberController;
  const ImgBtn: typeof HSAppUI.ImgBtn;
  const ImageBtn: typeof HSAppUI.ImageBtn;
  const LengthInput: typeof HSAppUI.LengthInput;
  const AdButton: typeof HSAppUI.Button;
  const AdDeleteOutlined: typeof HSAppUI.AdDeleteOutlined;
  const AdForm: typeof HSAppUI.AdForm;
  const AdDivider: typeof HSAppUI.AdDivider;
  const AdSelect: typeof HSAppUI.AdSelect;
  const EndPointItem: typeof HSAppUI.EndPointItem;
  const EndPointType: typeof HSAppUI.EndPointType;
  const PathItem: typeof HSAppUI.PathItem;
  const WallSvgAttr: typeof HSAppUI.WallSvgAttr;
  const ALWallAttr: typeof HSAppUI.ALWallAttr;
  const AuxiliaryLineAttr: typeof HSAppUI.AuxiliaryLineAttr;
  const ActiveAuxiliaryLineAttr: typeof HSAppUI.ActiveAuxiliaryLineAttr;
  const HSTabs: typeof HSAppUI.HSTabs;
  const HSModal: typeof HSAppUI.HSModal;
  const HSIcons: typeof HSAppUI.HSIcons;
  const HSDraggableModal: typeof HSAppUI.HSDraggableModal;
  const HSButton: typeof HSAppUI.HSButton;
  const HSTooltip: typeof HSAppUI.HSTooltip;
  const HSMessage: typeof HSAppUI.HSMessage;
  const HSNumberInput: typeof HSAppUI.HSNumberInput;
  const HSRadio: typeof HSAppUI.HSRadio;
  const HSRadioGroup: typeof HSAppUI.HSRadioGroup;
  const HSMenu: typeof HSAppUI.HSMenu;
  const HSSubMenu: typeof HSAppUI.HSSubMenu;
  const HSMenuItem: typeof HSAppUI.HSMenuItem;
  const HSSlider: typeof HSAppUI.HSSlider;
  const HSSelect: typeof HSAppUI.HSSelect;
  const HSCheckBox: typeof HSAppUI.HSCheckBox;
  const HSCheckBoxGroup: typeof HSAppUI.HSCheckBoxGroup;
  const HSOption: typeof HSAppUI.HSOption;
  const HSIconfontView: typeof HSAppUI.HSIconfontView;
  const HSScroll: typeof HSAppUI.HSScroll;
  const HSTree: typeof HSAppUI.HSTree;
  const HSPopconfirm: typeof HSAppUI.HSPopconfirm;
  const HSPopover: typeof HSAppUI.HSPopover;
  const HSImageButton: typeof HSAppUI.HSImageButton;
  const HSSmartText: typeof HSAppUI.HSSmartText;
  const HSCatalogLib: typeof HSAppUI.HSCatalogLib;
}

export {};