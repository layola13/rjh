/**
 * 鼠标滚轮模块
 * 处理鼠标滚轮事件，实现数值增减的旋转效果
 * @module mousewheel
 */

/**
 * 鼠标滚轮选项配置
 */
interface MousewheelOptions {
  /** 每次滚轮滚动时的步进值 */
  step: number;
}

/**
 * 鼠标滚轮处理器接口
 */
interface MousewheelHandler {
  /** 当前是否正在旋转（处理滚轮事件） */
  spinning: boolean;
  
  /** 鼠标滚轮定时器ID */
  mousewheelTimer: number | undefined;
  
  /** 配置选项 */
  options: MousewheelOptions;
  
  /**
   * 鼠标滚轮事件处理函数
   * @param event - 鼠标滚轮事件对象
   * @param delta - 滚轮滚动方向和距离（正数向上，负数向下）
   * @returns 是否成功处理事件
   */
  (event: MouseEvent, delta: number): boolean | void;
  
  /**
   * 开始旋转（内部方法）
   * @param event - 鼠标事件对象
   * @returns 是否成功启动
   */
  _start(event: MouseEvent): boolean;
  
  /**
   * 执行旋转动画（内部方法）
   * @param value - 旋转的值（带方向）
   * @param event - 鼠标事件对象
   */
  _spin(value: number, event: MouseEvent): void;
  
  /**
   * 停止旋转（内部方法）
   * @param event - 鼠标事件对象
   */
  _stop(event: MouseEvent): void;
  
  /**
   * 延迟执行函数（内部方法）
   * @param callback - 回调函数
   * @param delay - 延迟时间（毫秒）
   * @returns 定时器ID
   */
  _delay(callback: () => void, delay: number): number;
}