/**
 * 底图设置组件类型定义
 * @module UnderlayImageSetting
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * 滑块数值变更事件详情
 */
interface SliderChangeDetail {
  /** 新的数值 */
  value: number;
}

/**
 * 滑块数值变更事件
 */
interface SliderChangeEvent {
  detail: SliderChangeDetail;
}

/**
 * 滑块选项配置
 */
interface SliderOptions {
  /** 单位类型 */
  unitType: string;
  /** 显示精度（小数位数） */
  displayDigits: number;
  /** 是否包含单位 */
  includeUnit: string;
  /** 是否只读 */
  readOnly: boolean;
  /** 验证规则 */
  rules: {
    /** 数值范围 */
    range: {
      /** 最小值 */
      min: number;
      /** 最大值 */
      max: number;
    };
    /** 是否仅允许正数 */
    positiveOnly: boolean;
  };
}

/**
 * 滑块组件数据配置
 */
interface SliderData {
  /** CSS类名 */
  className: string;
  /** 标签文本 */
  label: string;
  /** 当前值 */
  value: number;
  /** 是否延迟触发 */
  delay: boolean;
  /** 配置选项 */
  options: SliderOptions;
  /** 值变更回调 */
  onValueChange: (event: SliderChangeEvent) => void;
}

/**
 * 复选框组件数据配置
 */
interface CheckBoxData {
  /** CSS类名 */
  className: string;
  /** 是否禁用 */
  disabled: boolean;
  /** 选中状态 */
  status: 'checked' | '';
  /** 显示文本 */
  text: string;
  /** 点击回调 */
  onclick: () => void;
}

/**
 * 底图图层接口
 */
interface UnderlayLayer {
  /** 底图URL */
  url?: string;
  /** 是否显示 */
  show: boolean;
  /** 显示/隐藏底图方法 */
  showBackground(visible: boolean): void;
}

/**
 * 场景图层接口
 */
interface SceneLayer {
  /** 底图配置 */
  underlay?: UnderlayLayer;
}

/**
 * 场景接口
 */
interface Scene {
  /** 当前激活图层 */
  activeLayer: SceneLayer;
  /** 激活图层变更信号 */
  signalActiveLayerChanged: unknown;
  /** 遍历所有图层 */
  forEachLayer(callback: (layer: SceneLayer) => void): void;
}

/**
 * 平面图接口
 */
interface Floorplan {
  /** 场景对象 */
  scene: Scene;
}

/**
 * 命令接口
 */
interface Command {
  /** 接收命令参数 */
  receive(action: string, params: { layer: SceneLayer }): void;
}

/**
 * 命令管理器接口
 */
interface CommandManager {
  /** 创建命令 */
  createCommand(commandType: string): Command;
  /** 执行命令 */
  execute(command: Command): void;
  /** 完成命令 */
  complete(): void;
}

/**
 * 插件接口
 */
interface Plugin {
  /** 显示插件 */
  show(): void;
  /** 刷新插件 */
  refresh(options?: unknown, config?: { refreshStatusBar: boolean }): void;
}

/**
 * 插件管理器接口
 */
interface PluginManager {
  /** 获取指定类型插件 */
  getPlugin(pluginType: string): Plugin;
}

/**
 * 应用设置接口
 */
interface AppSettings {
  /** SVG墙体不透明度 */
  svgWallOpacity: number;
  /** 设置视图项 */
  setViewItem(key: string, value: boolean): void;
}

/**
 * HSApp应用接口
 */
interface HSApp {
  /** 平面图对象 */
  floorplan: Floorplan;
  /** 命令管理器 */
  cmdManager: CommandManager;
  /** 插件管理器 */
  pluginManager: PluginManager;
  /** 应用设置 */
  appSettings: AppSettings;
}

/**
 * 底图设置组件属性
 */
interface UnderlayImageSettingProps {
  /** 组件配置数据 */
  data?: {
    /** 是否禁用 */
    disable?: boolean;
  };
}

/**
 * 底图设置组件状态
 */
interface UnderlayImageSettingState {
  /** 是否显示弹出框 */
  showPopup: boolean;
  /** 底图PNG是否删除 */
  bgPngDelete: boolean;
  /** 是否显示图片查看器 */
  showImageView: boolean;
}

/**
 * 底图设置组件类
 * 用于管理平面图底图的显示、透明度和相关操作
 */
declare class UnderlayImageSetting extends React.Component<
  UnderlayImageSettingProps,
  UnderlayImageSettingState
> {
  /** 属性类型验证 */
  static propTypes: {
    data: PropTypes.Requireable<object>;
  };

  /** 默认属性值 */
  static defaultProps: {
    data: {};
  };

  /** HSApp应用实例 */
  private app: HSApp;

  /** DOM容器元素 */
  private containerDom: HTMLDivElement | null;

  /** 信号钩子管理器 */
  private signalHook: unknown;

  /** 鼠标按下时的X坐标 */
  private x?: number;

  /** 鼠标按下时的Y坐标 */
  private y?: number;

  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: UnderlayImageSettingProps);

  /**
   * 组件挂载后的生命周期钩子
   */
  componentDidMount(): void;

  /**
   * 组件卸载前的生命周期钩子
   */
  componentWillUnmount(): void;

  /**
   * 初始化组件
   * 创建容器、加载资源、监听信号
   */
  private init(): void;

  /**
   * 关闭弹出框处理
   * 清理监听器和卸载组件
   */
  private handleClosePop(): void;

  /**
   * 打开底图PNG点击处理
   */
  private onOpenBackgroundPngClk(): void;

  /**
   * 打开图片查看器
   * 渲染ImageView组件显示底图
   */
  private openImageView(): void;

  /**
   * 鼠标进入事件处理
   * 显示设置弹出框
   */
  private onMouseEnter(): void;

  /**
   * 鼠标离开事件处理
   * 隐藏设置弹出框
   */
  private onMouseLeave(): void;

  /**
   * 重新缩放点击处理
   */
  private onRescaleClick(): void;

  /**
   * 删除底图PNG点击处理
   * 检查登录状态后执行删除
   */
  private onDeleteBackgroundPngClk(): void;

  /**
   * 记录鼠标按下位置
   * @param event - 鼠标事件
   */
  private recordMouseDown(event: MouseEvent): void;

  /**
   * 更新弹出框状态
   * 根据点击位置判断是否关闭弹出框
   * @param event - 鼠标事件
   */
  private updatePopupStatus(event: MouseEvent): void;

  /**
   * 删除底图确认对话框
   * 执行删除底图命令并刷新相关插件
   */
  private deleteUnderlayimgMsgBox(): void;

  /**
   * 渲染组件
   * @returns React元素
   */
  render(): React.ReactElement;
}

export default UnderlayImageSetting;