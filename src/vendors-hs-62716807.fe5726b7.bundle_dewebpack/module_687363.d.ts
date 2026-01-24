/**
 * 对齐点类型定义
 * 用于描述元素对齐的两个参考点
 * 格式：[垂直位置][水平位置]
 * - 垂直：t(top), c(center), b(bottom)
 * - 水平：l(left), c(center), r(right)
 * 例如：'tl' = 顶部左侧, 'bc' = 底部中央
 */
type AlignPoint = string;

/**
 * 偏移量配置
 * [水平偏移, 垂直偏移]
 */
type Offset = [number, number];

/**
 * 溢出调整选项
 */
interface OverflowOptions {
  /** 是否在X轴方向自动调整（0=禁用, 1=启用） */
  adjustX: 0 | 1;
  /** 是否在Y轴方向自动调整（0=禁用, 1=启用） */
  adjustY: 0 | 1;
}

/**
 * 单个方位的对齐配置
 */
interface PlacementConfig {
  /** 对齐参考点：[目标元素点, 弹出元素点] */
  points: [AlignPoint, AlignPoint];
  /** 位置偏移量：[x偏移, y偏移] */
  offset: Offset;
  /** 溢出时的调整策略 */
  overflow?: OverflowOptions;
  /** 目标元素的偏移量（用于arrowPointAtCenter模式） */
  targetOffset?: Offset;
  /** 是否忽略抖动效果 */
  ignoreShake?: boolean;
}

/**
 * 所有支持的弹出框方位
 */
type PlacementType =
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom';

/**
 * 方位配置映射表
 * 键为方位名称，值为对应的对齐配置
 */
type PlacementsConfig = Record<PlacementType, PlacementConfig>;

/**
 * 获取对齐配置的参数接口
 */
interface GetPlacementsParams {
  /** 箭头宽度（像素），默认5 */
  arrowWidth?: number;
  /** 水平方向箭头偏移量（像素），默认16 */
  horizontalArrowShift?: number;
  /** 垂直方向箭头偏移量（像素），默认8 */
  verticalArrowShift?: number;
  /** 箭头是否指向目标元素中心，默认false */
  arrowPointAtCenter?: boolean;
  /** 
   * 自动调整溢出行为
   * - true: 启用X和Y轴调整
   * - false: 禁用调整
   * - OverflowOptions: 自定义调整配置
   */
  autoAdjustOverflow?: boolean | OverflowOptions;
}

/**
 * 根据溢出配置获取溢出选项
 * @param autoAdjustOverflow - 自动调整配置（布尔值或详细配置对象）
 * @returns 标准化的溢出选项
 */
export declare function getOverflowOptions(
  autoAdjustOverflow: boolean | OverflowOptions | undefined
): OverflowOptions;

/**
 * 获取所有方位的对齐配置
 * 
 * 用于Tooltip、Popover等浮层组件的定位计算
 * 支持12个方位的精确对齐配置，包括边缘对齐和角落对齐
 * 
 * @param params - 配置参数
 * @returns 包含所有方位配置的映射对象
 * 
 * @example
 *