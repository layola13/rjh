/**
 * 单元格固定位置信息
 */
export interface CellFixedInfo {
  /** 左侧固定位置（像素值） */
  fixLeft?: number;
  /** 右侧固定位置（像素值） */
  fixRight?: number;
  /** 是否为最后一个左固定列 */
  lastFixLeft: boolean;
  /** 是否为第一个右固定列 */
  firstFixRight: boolean;
  /** 是否为最后一个右固定列 */
  lastFixRight: boolean;
  /** 是否为第一个左固定列 */
  firstFixLeft: boolean;
  /** 是否启用粘性定位 */
  isSticky: boolean;
}

/**
 * 列配置信息
 */
export interface ColumnConfig {
  /** 固定方向：'left' | 'right' | undefined */
  fixed?: 'left' | 'right';
}

/**
 * 固定位置映射表
 */
export interface FixedPositions {
  /** 左侧固定列的位置映射 */
  left: Record<number, number>;
  /** 右侧固定列的位置映射 */
  right: Record<number, number>;
  /** 是否启用粘性定位 */
  isSticky: boolean;
}

/**
 * 文本方向类型
 */
export type TextDirection = 'ltr' | 'rtl';

/**
 * 获取单元格固定位置信息
 * 
 * @param startIndex - 起始列索引
 * @param endIndex - 结束列索引
 * @param columns - 列配置数组
 * @param fixedPositions - 固定位置映射表
 * @param direction - 文本方向（'ltr' 或 'rtl'）
 * @returns 单元格固定位置信息对象
 */
export declare function getCellFixedInfo(
  startIndex: number,
  endIndex: number,
  columns: Array<ColumnConfig>,
  fixedPositions: FixedPositions,
  direction: TextDirection
): CellFixedInfo;