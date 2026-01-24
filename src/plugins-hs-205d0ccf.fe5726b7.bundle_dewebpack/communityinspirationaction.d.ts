/**
 * Module: CommunityInspirationAction
 * 
 * 社区灵感操作模块，用于处理室内设计模板的应用流程
 * 支持从多种来源（欢迎页、设计模板、底图、自动建墙）加载和应用设计数据
 */

import type { Action } from 'HSApp/Action';
import type { SignalHook } from 'HSCore/Util/SignalHook';
import type { AuxCanvas } from 'HSApp/View/SVG/AuxCanvas';
import type { App } from 'HSApp/App';
import type { Face } from 'HSCore/Model/Face';
import type { Floor } from 'HSCore/Model/Floor';
import type { Plugin } from 'HSApp/Plugin';
import type { Signal } from 'HSCore/Signal';

/**
 * 插件状态变化事件数据结构
 */
interface PluginStatusEvent<T = string> {
  data: {
    status: T;
  };
}

/**
 * 欢迎页插件状态类型
 */
type WelcomeStatus = 'loadDesignData' | 'cancel';

/**
 * 设计模板插件状态类型
 */
type DesignTemplatesStatus = 'loadDesignDataTemplate' | 'loadDesignDataTemplateError' | 'cancel';

/**
 * 底图插件状态类型
 */
type UnderlayImgStatus = 
  | 'showRecognitionStep' 
  | 'buildFloorplanByImg' 
  | 'buildFloorplanByCadMultiLayer'
  | 'uploadImgFileCancel'
  | 'importImgError'
  | 'importImgCancel'
  | 'importCadError'
  | 'cancelImportCad'
  | 'cancelBuildFloorplan';

/**
 * 自动建墙插件状态类型
 */
type WallAutoBuilderStatus = 'cancelBuildFloorplan' | 'buildFloorplan';

/**
 * 选择房间对话框配置
 */
interface SelectRoomDialogOptions {
  /** 是否禁用确认按钮 */
  disableOkButton: boolean;
  /** 执行命令的回调函数 */
  executeCmd: (actionType: string) => Promise<boolean>;
}

/**
 * 辅助2D视图配置选项
 */
interface Aux2DViewOptions {
  /** 实体创建过滤器 */
  canCreateEntity: (entity: unknown) => boolean;
  /** 视图设置覆盖 */
  overrideViewSettings: {
    face: {
      /** 是否使用混合绘制 */
      useMixpaint: boolean;
      /** 样式配置 */
      style: {
        /** 获取正常状态样式 */
        getNormal: (face: Face) => FaceStyle;
        /** 获取悬停状态样式 */
        getHover: (face: Face) => FaceStyle;
        /** 获取选中状态样式 */
        getSelected: (face: Face) => FaceStyle;
      };
    };
  };
}

/**
 * 面样式配置
 */
interface FaceStyle {
  /** 填充颜色 */
  fill: string;
  /** 不透明度 (0-1) */
  opacity: number;
}

/**
 * 社区灵感操作类
 * 
 * 该类继承自Action基类，用于管理从社区灵感加载设计方案的完整流程。
 * 主要功能包括：
 * - 监听多个插件的状态变化（欢迎页、设计模板、底图、自动建墙）
 * - 显示房间选择对话框
 * - 管理辅助2D视图的创建和销毁
 * - 执行灵感应用命令
 */
export declare class CommunityInspirationAction extends Action {
  /**
   * 信号钩子，用于管理事件监听的生命周期
   * @private
   */
  private _signalHook: SignalHook<CommunityInspirationAction>;

  /**
   * 辅助2D画布视图，用于房间选择时的可视化
   * @private
   */
  private _aux2DView?: AuxCanvas;

  /**
   * 应用实例引用
   * @private
   */
  private _app: App;

  /**
   * 执行命令：将灵感应用到选中的房间
   * 
   * @param actionType - 操作类型标识符
   * @returns Promise<boolean> - 成功返回true，失败返回false
   */
  executeCmd: (actionType: string) => Promise<boolean>;

  /**
   * 构造函数
   */
  constructor();

  /**
   * 执行操作时的生命周期钩子
   * 
   * 该方法会：
   * 1. 获取并监听欢迎页插件的状态变化
   * 2. 获取并监听设计模板插件的状态变化
   * 3. 获取并监听底图插件的状态变化
   * 4. 获取并监听自动建墙插件的状态变化
   */
  onExecute(): void;

  /**
   * 销毁操作时的生命周期钩子
   * 
   * 清理资源，包括：
   * - 移除URL参数
   * - 释放信号监听
   * - 销毁辅助2D视图
   */
  onDestroy(): void;

  /**
   * 移除窗口URL参数
   * 
   * 清除actionType和templateId参数，并更新浏览器历史记录
   * @private
   */
  private _removeWindowUrlParams(): void;

  /**
   * 欢迎页插件状态变化处理器
   * 
   * @param event - 包含状态信息的事件对象
   * @private
   */
  private _onWelcomeStatusChanged(event: PluginStatusEvent<WelcomeStatus>): void;

  /**
   * 设计模板插件状态变化处理器
   * 
   * @param event - 包含状态信息的事件对象
   * @private
   */
  private _onDesignTemplatesStatusChanged(event: PluginStatusEvent<DesignTemplatesStatus>): void;

  /**
   * 底图插件状态变化处理器
   * 
   * 处理图片/CAD导入和识别流程中的各种状态
   * 
   * @param event - 包含状态信息的事件对象
   * @private
   */
  private _onUnderlayImgStatusChanged(event: PluginStatusEvent<UnderlayImgStatus>): void;

  /**
   * 设置图片自动识别一次性标志
   * 
   * 通知底图插件启用一次性自动识别功能
   * @private
   */
  private _setImageAutoRecognitionOnce(): void;

  /**
   * 自动建墙插件状态变化处理器
   * 
   * @param event - 包含状态信息的事件对象
   * @private
   */
  private _onWallAutoBuilderStatusChanged(event: PluginStatusEvent<WallAutoBuilderStatus>): void;

  /**
   * 文档打开事件处理器
   * 
   * 当设计文档成功打开后，取消监听并显示房间选择对话框
   * @private
   */
  private _onDocumentOpened(): void;

  /**
   * 显示房间选择对话框
   * 
   * 该方法会：
   * 1. 取消所有当前选择
   * 2. 显示房间选择UI（初始状态确认按钮禁用）
   * 3. 开始监听选择变化事件
   * @private
   */
  private _showSelectRoom(): void;

  /**
   * 选择变化事件处理器
   * 
   * 根据当前选择更新对话框状态：
   * - 如果选中的是Face实体，启用确认按钮
   * - 否则禁用确认按钮
   * @private
   */
  private _onSelectionChanged(): void;

  /**
   * 创建辅助2D视图
   * 
   * 初始化用于房间可视化选择的辅助画布，配置：
   * - 实体过滤器（Layer、Wall、Slab、Face）
   * - 自定义样式（正常、悬停、选中状态）
   * - Gizmo工厂
   * 
   * @param container - 画布容器元素
   */
  createAux2DView(container: HTMLElement): void;

  /**
   * 销毁辅助2D视图
   * 
   * 清理并释放辅助画布资源
   */
  destroyAux2DView(): void;

  /**
   * 调整辅助2D视图大小
   * 
   * 响应容器尺寸变化，重新计算并适配视图
   */
  resizeAux2DView(): void;
}