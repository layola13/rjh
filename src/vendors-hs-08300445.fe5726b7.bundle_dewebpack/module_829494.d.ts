/**
 * 虚拟滚动钩子返回类型
 * @description 提供虚拟滚动的事件处理器和状态更新函数
 */
export interface VirtualScrollHandlers {
  /** 滚轮事件处理器 */
  handleWheel: (event: WheelEvent) => void;
  /** 滚动事件处理器 */
  handleScroll: (event: ScrollEvent) => void;
}

/**
 * 滚动事件接口
 */
export interface ScrollEvent {
  /** 滚动详情信息 */
  detail: number;
}

/**
 * 滚轮事件接口扩展
 */
export interface WheelEvent extends Event {
  /** 水平方向滚动增量 */
  deltaX: number;
  /** 垂直方向滚动增量 */
  deltaY: number;
  /** Shift键是否按下 */
  shiftKey: boolean;
  /** 虚拟处理标记（防止重复处理） */
  _virtualHandled?: boolean;
}

/**
 * 虚拟滚动钩子
 * 
 * @param enabled - 是否启用虚拟滚动
 * @param param1 - 滚动配置参数1
 * @param param2 - 滚动配置参数2
 * @param param3 - 滚动配置参数3
 * @param param4 - 滚动配置参数4
 * @param isHorizontal - 是否为水平滚动模式
 * @param onScroll - 滚动回调函数 (offset: number, isHorizontal: boolean) => void
 * @returns 返回包含滚轮和滚动事件处理器的元组
 * 
 * @example
 *