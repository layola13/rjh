import React from 'react';

/**
 * 热键数据项配置
 */
export interface HotkeyItem {
  /** 热键的国际化资源键 */
  key: string;
  /** 热键组合值数组，如 ['Ctrl', 'S'] */
  value: string[];
  /** 是否显示"NEW"标记 */
  newDot?: boolean;
  /** 是否不显示加号连接符 */
  noAddIcon?: boolean;
}

/**
 * 热键数据结构：分类 -> 分组 -> 热键项
 */
export interface HotkeyData {
  [category: string]: HotkeyItem[][];
}

/**
 * 热键符号映射配置
 */
export interface HotkeySymbol {
  [key: string]: {
    mac: string;
    windows: string;
  };
}

/**
 * 热键模态框组件的Props
 */
export interface HotkeyModalProps {
  /** 关闭模态框的回调函数 */
  close: () => void;
  /** 主题样式类名 */
  theme: string;
  /** 默认选中的分类索引 */
  selectedCategory?: number;
}

/**
 * 热键模态框组件的State
 */
export interface HotkeyModalState {
  /** 当前选中的分类索引 */
  selectedCategory: number;
}

/**
 * 滚动事件参数
 */
export interface ScrollEvent {
  /** 当前滚动位置 */
  scrollTop: number;
}

/**
 * 可拖拽模态框引用类型
 */
export interface DraggableModalRef {
  // 模态框实例的方法和属性
}

/**
 * 滚动容器引用类型
 */
export interface ScrollContainerRef {
  /** 设置滚动位置 */
  setScrollTop: (scrollTop: number) => void;
}

/**
 * 热键模态框组件
 * 用于展示应用程序的所有快捷键说明，支持分类浏览、拖拽和滚动
 */
export default class HotkeyModal extends React.Component<HotkeyModalProps, HotkeyModalState> {
  /** 可拖拽模态框的引用 */
  draggableModal: React.RefObject<DraggableModalRef>;
  
  /** 滚动条容器的引用 */
  _scrollBarRef?: ScrollContainerRef;
  
  /** 热键数据的所有分类键名数组 */
  hotkeyDataKeys: string[];
  
  /** 每个分类的滚动位置范围数组 */
  scrollScopeArr: number[];

  constructor(props: HotkeyModalProps);

  /**
   * 组件挂载后，如果有默认选中的分类，滚动到对应位置
   */
  componentDidMount(): void;

  /**
   * 计算每个分类在滚动容器中的位置范围
   * @returns 位置范围数组，每个元素表示对应分类的结束位置
   */
  getScrollScope(): number[];

  /**
   * 向上滚动时的处理函数，自动更新选中的分类
   * @param event 滚动事件参数
   */
  handleScrollUp(event: ScrollEvent): void;

  /**
   * 向下滚动时的处理函数，自动更新选中的分类
   * @param event 滚动事件参数
   */
  handleScrollDown(event: ScrollEvent): void;

  /**
   * 更新滚动视图并切换选中的分类
   * @param categoryIndex 要切换到的分类索引
   */
  updateScrollView(categoryIndex: number): void;

  /**
   * 判断某个分类下是否有带"NEW"标记的热键项
   * @param hotkeyGroup 热键分组数据
   * @returns 是否存在新标记
   */
  hasDot(hotkeyGroup: HotkeyItem[][]): boolean;

  /**
   * 渲染组件
   */
  render(): React.ReactElement;
}

/**
 * 全局热键数据配置
 */
export const hotkeyData: HotkeyData;

/**
 * 热键符号的平台特定映射
 */
export const hotkeySymbol: HotkeySymbol;