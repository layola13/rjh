/**
 * 计算列布局的右侧偏移量
 * 
 * 基于列的键值和现有布局信息，计算每列的右侧偏移量。
 * 该函数通过useMemo优化性能，仅在依赖项变化时重新计算。
 * 
 * @template T - 列数据项的类型
 * @param columns - 列数组，每项必须包含key属性
 * @param layoutMap - 列布局信息映射表，键为列key，值为布局尺寸
 * @param dependencies - 额外的依赖项（用于控制memo重新计算）
 * @returns 包含计算后右侧偏移量的布局映射表
 */
export default function useColumnLayoutWithRightOffset<T extends ColumnItem>(
  columns: T[],
  layoutMap: Map<string | number, LayoutInfo>,
  dependencies?: unknown
): Map<string | number, LayoutInfoWithRight>;

/**
 * 列数据项接口
 */
interface ColumnItem {
  /** 列的唯一标识符 */
  key: string | number;
}

/**
 * 布局信息接口
 */
interface LayoutInfo {
  /** 宽度（像素） */
  width: number;
  /** 高度（像素） */
  height: number;
  /** 左侧偏移量（像素） */
  left: number;
  /** 顶部偏移量（像素） */
  top: number;
}

/**
 * 包含右侧偏移量的布局信息接口
 */
interface LayoutInfoWithRight extends LayoutInfo {
  /** 右侧偏移量（像素） */
  right: number;
}

/**
 * 默认布局信息常量
 */
declare const DEFAULT_LAYOUT: Readonly<LayoutInfo>;