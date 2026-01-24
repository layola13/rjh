/**
 * 对齐点类型定义
 * 用于描述元素的对齐参考点位置
 * 
 * @example
 * - 'tl': top-left (顶部左侧)
 * - 'tr': top-right (顶部右侧)
 * - 'bl': bottom-left (底部左侧)
 * - 'br': bottom-right (底部右侧)
 */
type AlignPoint = 'tl' | 'tr' | 'bl' | 'br' | 'tc' | 'bc' | 'cl' | 'cr';

/**
 * 溢出调整配置
 * 定义当元素溢出视口时的自动调整行为
 */
interface OverflowConfig {
  /**
   * 是否在X轴方向进行自动调整
   * @default 1 - 启用调整
   */
  adjustX: number;
  
  /**
   * 是否在Y轴方向进行自动调整
   * @default 1 - 启用调整
   */
  adjustY: number;
}

/**
 * 位置配置对象
 * 描述弹出层相对于目标元素的定位规则
 */
interface PlacementConfig {
  /**
   * 对齐点数组
   * @description
   * - 第一个元素：弹出层的对齐点
   * - 第二个元素：目标元素的对齐点
   * 
   * @example
   * ['bl', 'tl'] 表示弹出层的底部左侧对齐到目标元素的顶部左侧
   */
  points: [AlignPoint, AlignPoint];
  
  /**
   * 溢出处理配置
   * 控制元素超出可视区域时的自动调整策略
   */
  overflow: OverflowConfig;
  
  /**
   * 位置偏移量 [x, y]
   * @description
   * - 第一个值：X轴偏移（正值向右，负值向左）
   * - 第二个值：Y轴偏移（正值向下，负值向上）
   * 单位：像素
   */
  offset: [number, number];
}

/**
 * 位置配置映射表
 * 定义各种预设的弹出层定位方案
 */
interface PlacementsMap {
  /**
   * 顶部左对齐
   * 弹出层显示在目标元素上方，左侧对齐
   */
  topLeft: PlacementConfig;
  
  /**
   * 底部左对齐
   * 弹出层显示在目标元素下方，左侧对齐
   */
  bottomLeft: PlacementConfig;
  
  /**
   * 左侧顶部对齐
   * 弹出层显示在目标元素左侧，顶部对齐
   */
  leftTop: PlacementConfig;
  
  /**
   * 右侧顶部对齐
   * 弹出层显示在目标元素右侧，顶部对齐
   */
  rightTop: PlacementConfig;
}

/**
 * 标准（LTR）布局的位置配置
 * 适用于从左到右的文本方向（如英文、中文等）
 */
export declare const placements: PlacementsMap;

/**
 * RTL布局的位置配置
 * 适用于从右到左的文本方向（如阿拉伯语、希伯来语等）
 * 
 * @description
 * 在RTL模式下，leftTop和rightTop的对齐逻辑会互换
 */
export declare const placementsRtl: PlacementsMap;

/**
 * 默认导出标准位置配置
 * 等同于 placements
 */
declare const _default: PlacementsMap;
export default _default;