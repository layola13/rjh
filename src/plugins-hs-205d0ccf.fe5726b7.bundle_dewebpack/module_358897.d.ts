import React from 'react';
import { PropTypes } from 'prop-types';

/**
 * 渲染模式选项配置
 */
interface RenderingModeOption {
  /** 选项唯一标识符 */
  id: string;
  /** 图标类型 */
  iconType: string;
  /** 显示标签 */
  label: string;
  /** 快捷键提示 */
  hotKey?: string;
}

/**
 * 材质下拉组件的属性配置
 */
interface MaterialDropdownProps {
  /** 组件数据配置 */
  data?: {
    /** 是否禁用组件 */
    disable?: boolean;
    /** 渲染模式选项列表 */
    options: RenderingModeOption[];
    /** 选项变更回调函数 */
    onchange: (optionId: string) => void;
  };
}

/**
 * 材质下拉组件的状态
 */
interface MaterialDropdownState {
  /** 是否显示下拉列表 */
  showList: boolean;
  /** 选中项图标是否处于悬停状态 */
  selectItemImgHover?: boolean;
}

/**
 * 值变更事件数据
 */
interface ValueChangedEventData {
  data: {
    /** 变更的字段名称 */
    fieldName: string;
    /** 变更前的旧值 */
    oldValue: unknown;
  };
}

/**
 * 材质/渲染模式下拉选择器组件
 * 用于切换应用的渲染模式（如着色、线框等）
 */
declare class MaterialDropdown extends React.Component<MaterialDropdownProps, MaterialDropdownState> {
  /**
   * 组件属性类型验证
   */
  static propTypes: {
    data: PropTypes.Requireable<object>;
  };

  /**
   * 组件默认属性
   */
  static defaultProps: {
    data: {};
  };

  /**
   * 上次渲染模式缓存
   * @private
   */
  private _lastRenderMode?: string;

  /**
   * 信号钩子实例，用于监听应用设置变更
   * @private
   */
  private signalHook: any;

  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: MaterialDropdownProps);

  /**
   * 渲染模式值变更处理函数
   * 当应用设置中的渲染模式发生变化时触发
   * @param event - 值变更事件数据
   * @private
   */
  private _renderingModeValueChange(event: ValueChangedEventData): void;

  /**
   * 组件挂载完成生命周期
   * 注册渲染模式变更监听和文档点击事件监听
   */
  componentDidMount(): void;

  /**
   * 组件卸载前生命周期
   * 清理事件监听器和信号钩子
   */
  componentWillUnmount(): void;

  /**
   * 文档点击事件处理函数
   * 点击下拉列表外部区域时关闭下拉列表
   * @param event - 鼠标事件对象
   */
  documentClickedHidePopup(event: MouseEvent): void;

  /**
   * 当前材质项点击处理函数
   * 切换下拉列表的显示/隐藏状态
   */
  currentmaterialOnClick(): void;

  /**
   * 设置选中项图标为悬停状态
   */
  selectItemImgHoverStatus(): void;

  /**
   * 设置选中项图标为正常状态
   */
  selectItemImgNormalStatus(): void;

  /**
   * 渲染组件
   * @returns React元素
   */
  render(): React.ReactElement;
}

export default MaterialDropdown;