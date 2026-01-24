import React from 'react';

/**
 * 图片按钮的数据配置接口
 */
interface ImageButtonData {
  /** 图片源地址 */
  src?: string;
  /** 面板位置配置 */
  panelPosition?: string | number;
  /** 背景颜色（十六进制数字） */
  color?: number | string;
  /** 自定义CSS类名 */
  className?: string;
  /** 工具提示文本 */
  tooltip?: string;
  /** 标签文本 */
  label?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 点击事件处理函数 */
  onclick?: (event: React.MouseEvent) => void;
  /** 元数据对象 */
  meta?: ProductMetadata | null;
  /** 搜索ID，用于异步加载元数据 */
  seekId?: string;
  /** 异步参数Promise，返回图片源 */
  asyncParam?: Promise<{ imgSrc?: string }>;
  /** 异步文本参数Promise，返回显示文本 */
  asyncTextParam?: Promise<{ text?: string }>;
}

/**
 * 产品元数据接口
 */
interface ProductMetadata {
  /** 是否显示收藏按钮 */
  showfavorite?: boolean;
  [key: string]: unknown;
}

/**
 * 图片按钮组件的属性接口
 */
interface ImageButtonProps {
  /** 按钮配置数据 */
  data: ImageButtonData;
  /** 图片源地址 */
  src?: string;
  /** 组件ID */
  id?: string;
  /** 背景颜色 */
  color?: string;
  /** 标签文本 */
  label?: string;
  /** 自定义CSS类名 */
  className?: string;
  /** 自定义图片类名 */
  imageCustom?: string;
  /** 右侧第一行文本 */
  rightFirstLineText?: string;
  /** 右侧第二行文本 */
  rightSecondLineText?: string;
}

/**
 * 图片按钮组件的状态接口
 */
interface ImageButtonState {
  /** 按钮配置数据 */
  data: ImageButtonData;
  /** 图片源地址 */
  src?: string;
  /** 组件ID */
  id?: string;
  /** 面板位置 */
  panelPosition?: string | number;
  /** 背景颜色 */
  color?: number | string;
  /** CSS类名 */
  className?: string;
  /** 自定义图片类名 */
  imageCustom?: string;
  /** 显示的文本内容 */
  text?: string;
  /** 产品元数据 */
  metadata?: ProductMetadata | null;
}

/**
 * 图片按钮React组件
 * 
 * 支持以下功能：
 * - 显示图片或纯色背景
 * - 异步加载图片和文本
 * - 鼠标悬停显示详情面板
 * - 根据 seekId 加载产品元数据
 * - 自适应文本长度（超过5个字符双行显示）
 */
declare class ImageButton extends React.Component<ImageButtonProps, ImageButtonState> {
  /**
   * 图片按钮DOM元素引用
   */
  private imgbtn: HTMLElement | null;

  /**
   * 组件属性类型验证
   */
  static propTypes: {
    data: unknown;
    src: unknown;
    id: unknown;
    color: unknown;
    label: unknown;
    className: unknown;
    imageCustom: unknown;
    rightFirstLineText: unknown;
    rightSecondLineText: unknown;
  };

  /**
   * 组件默认属性值
   */
  static defaultProps: {
    data: Record<string, never>;
    src: string;
    id: string;
    color: string;
    label: string;
    className: string;
    imageCustom: string;
    rightFirstLineText: string;
    rightSecondLineText: string;
  };

  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: ImageButtonProps);

  /**
   * 组件挂载后的生命周期钩子
   * - 处理异步参数加载
   * - 设置背景颜色
   * - 加载元数据
   */
  componentDidMount(): void;

  /**
   * 组件接收新属性时的生命周期钩子（已废弃但仍在使用）
   * @param nextProps - 新的组件属性
   */
  UNSAFE_componentWillReceiveProps(nextProps: ImageButtonProps): void;

  /**
   * 组件更新后的生命周期钩子
   * - 更新背景颜色样式
   */
  componentDidUpdate(): void;

  /**
   * 根据 seekId 设置元数据
   * @param seekId - 产品搜索ID
   */
  setMetadataBySeekId(seekId: string): void;

  /**
   * 显示详情面板
   */
  showDetailsPanel(): void;

  /**
   * 隐藏详情面板
   */
  hideDetailsPanel(): void;

  /**
   * 渲染详情面板
   * - 显示产品大图和详细信息
   */
  renderDetailsPanel(): void;

  /**
   * 卸载详情面板
   */
  renderUnmountDetailsPanel(): void;

  /**
   * 渲染组件
   */
  render(): React.ReactElement;
}

export default ImageButton;