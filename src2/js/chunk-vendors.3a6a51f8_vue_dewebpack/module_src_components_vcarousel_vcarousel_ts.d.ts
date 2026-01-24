import { VNode } from 'vue';
import VWindow from '../VWindow/VWindow';
import { VueConstructor } from 'vue';

/**
 * VCarousel组件属性接口
 * 轮播图组件,继承自VWindow的所有功能
 */
export interface VCarouselProps {
  /**
   * 是否启用连续模式
   * @default true
   */
  continuous: boolean;

  /**
   * 是否自动循环播放
   * @default false
   */
  cycle: boolean;

  /**
   * 分页指示器图标
   * @default '$delimiter'
   */
  delimiterIcon: string;

  /**
   * 轮播图高度
   * 支持数字(像素)或字符串(如'500px', '50vh')
   * @default 500
   */
  height: number | string;

  /**
   * 是否隐藏分页指示器
   * @default false
   */
  hideDelimiters: boolean;

  /**
   * 是否隐藏分页指示器背景
   * @default false
   */
  hideDelimiterBackground: boolean;

  /**
   * 自动切换间隔时间(毫秒)
   * @default 6000
   */
  interval: number | string;

  /**
   * 是否强制选中至少一项
   * @default true
   */
  mandatory: boolean;

  /**
   * 是否显示进度条
   * @default false
   */
  progress: boolean;

  /**
   * 进度条颜色
   * @default undefined
   */
  progressColor?: string;

  /**
   * 是否显示左右箭头控制按钮
   * @default true
   */
  showArrows: boolean;

  /**
   * 垂直分页指示器位置
   * 可选值: 'left' | 'right' | undefined
   * @default undefined
   */
  verticalDelimiters?: 'left' | 'right';
}

/**
 * VCarousel组件内部数据接口
 */
export interface VCarouselData {
  /**
   * 内部高度状态
   */
  internalHeight: number | string;

  /**
   * 自动切换定时器ID
   */
  slideTimeout: number | undefined;
}

/**
 * VCarousel组件计算属性接口
 */
export interface VCarouselComputed {
  /**
   * 组件CSS类名对象
   * 包含v-carousel主类和各种状态类
   */
  classes: Record<string, boolean>;

  /**
   * 是否为深色模式
   * 当设置dark属性或未设置light属性时返回true
   */
  isDark: boolean;

  /**
   * 是否为垂直分页指示器模式
   * 当verticalDelimiters属性不为null时返回true
   */
  isVertical: boolean;
}

/**
 * VCarousel组件方法接口
 */
export interface VCarouselMethods {
  /**
   * 生成左右控制箭头图标
   * 垂直模式下返回null
   * @returns VNode | null
   */
  genControlIcons(): VNode | null;

  /**
   * 生成分页指示器容器
   * @returns VNode
   */
  genDelimiters(): VNode;

  /**
   * 生成分页指示器按钮列表
   * @returns VNode
   */
  genItems(): VNode;

  /**
   * 生成进度条
   * @returns VNode
   */
  genProgress(): VNode;

  /**
   * 重启自动切换定时器
   * 清除现有定时器并在下一帧重新启动
   */
  restartTimeout(): void;

  /**
   * 启动自动切换定时器
   * 根据cycle属性和interval设置定时器
   */
  startTimeout(): void;

  /**
   * 下一张幻灯片
   * 继承自VWindow
   */
  next(): void;

  /**
   * 根据项目和索引获取值
   * 继承自VWindow
   */
  getValue(item: any, index: number): any;
}

/**
 * VCarousel组件
 * 
 * 轮播图组件,用于循环展示一组幻灯片内容
 * 支持自动播放、分页指示器、进度条等功能
 * 
 * @example
 *