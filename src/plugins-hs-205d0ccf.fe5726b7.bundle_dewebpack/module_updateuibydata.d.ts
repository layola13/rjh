/**
 * 截图区域的位置和尺寸数据
 */
interface SnapshotRegionData {
  /** 顶部位置（距离窗口顶部的像素距离） */
  t: number;
  /** 左侧位置（距离窗口左侧的像素距离） */
  l: number;
  /** 宽度（像素） */
  w: number;
  /** 高度（像素） */
  h: number;
}

/**
 * jQuery选择器函数类型
 */
type JQuerySelector = (selector: string) => JQuery;

/**
 * 截图UI更新上下文
 */
interface SnapshotUIContext extends SnapshotRegionData {
  /**
   * jQuery选择器方法，用于选择DOM元素
   * @param selector - CSS选择器字符串
   * @returns jQuery对象
   */
  _$(selector: string): JQuery;
}

/**
 * CSS样式配置对象
 */
interface CSSProperties {
  top?: number | string;
  left?: number | string;
  width?: number | string;
  height?: number | string;
  borderTop?: string;
  borderLeft?: string;
}

/**
 * 默认模块接口，包含UI更新方法
 */
interface DefaultModule {
  /**
   * 根据数据更新UI
   * @param left - 左侧位置
   * @param top - 顶部位置
   * @param width - 宽度
   * @param height - 高度
   */
  updateUIByData(left: number, top: number, width: number, height: number): void;
}

/**
 * 根据截图区域数据更新UI布局
 * 该函数负责更新截图工具的所有UI元素位置，包括：
 * - 左右遮罩区域
 * - 上下遮罩区域
 * - 边框装饰线
 * - 辅助参考线（九宫格线）
 * 
 * @this {SnapshotUIContext} - 包含位置和尺寸数据的上下文对象
 */
declare function updateUIByData(this: SnapshotUIContext): void;

export { SnapshotRegionData, SnapshotUIContext, CSSProperties, DefaultModule, updateUIByData };