/**
 * 窗户滑动类型配置模块
 * 定义了各种窗户轨道类型及其对应的滑动配置
 */

/**
 * 窗户轨道类型
 * - two: 双轨
 * - three: 三轨
 * - four: 四轨
 * - five: 五轨
 * - six: 六轨
 * - eight: 八轨
 * - single_track: 单轨
 */
type WindowTrackType = 'two' | 'three' | 'four' | 'five' | 'six' | 'eight' | 'single_track';

/**
 * 滑动窗扇配置
 * 描述单个滑动窗户配置的完整信息
 */
interface SlideTypeConfig {
  /** 配置索引，用于唯一标识该配置 */
  index: number;
  
  /** 序列号，描述窗扇的开启方式和组合模式
   * 格式说明：
   * - A0-A9: 活动扇（可移动）
   * - S0-S9: 固定扇（不可移动）
   * - H0-H9: 悬窗（可倾斜开启）
   * - 连字符"-"：水平分隔
   * - 数字组合（如A0A1）：垂直分隔或组合扇
   * - "|V"后缀：垂直分割标记
   */
  serial: string;
  
  /** 窗户选项类型，对应轨道数量 */
  windowOptionType: WindowTrackType;
  
  /** 窗扇总数量（包括活动扇和固定扇） */
  sashesCount: number;
}

/**
 * 窗户滑动类型配置数据结构
 */
interface WindowSlideTypeData {
  /** 支持的轨道类型列表 */
  type_list: readonly WindowTrackType[];
  
  /** 轨道类型到国际化键的映射
   * 键：轨道类型标识
   * 值：对应的i18n翻译键路径
   */
  type_map: Readonly<Record<WindowTrackType, string>>;
  
  /** 所有支持的滑动窗户配置列表
   * 包含158种不同的窗扇组合配置
   */
  slideType: readonly SlideTypeConfig[];
}

/**
 * 窗户滑动类型配置常量
 * 包含完整的轨道类型定义和158种窗扇组合配置
 */
declare const windowSlideTypeData: WindowSlideTypeData;

export default windowSlideTypeData;
export type { WindowTrackType, SlideTypeConfig, WindowSlideTypeData };