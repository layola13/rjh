import Vue, { VNode, VueConstructor } from 'vue';

/**
 * VBanner 组件属性接口
 * 用于定义横幅通知组件的配置选项
 */
export interface VBannerProps {
  /**
   * 将组件设置为应用级别的横幅（固定定位）
   * @default false
   */
  app?: boolean;

  /**
   * 横幅左侧显示的图标名称
   * @default undefined
   */
  icon?: string;

  /**
   * 图标的颜色
   * @default undefined
   */
  iconColor?: string;

  /**
   * 启用单行模式，使内容在一行内显示
   * @default false
   */
  singleLine?: boolean;

  /**
   * 使横幅具有粘性定位
   * @default false
   */
  sticky?: boolean;

  /**
   * 控制横幅的显示/隐藏状态
   * @default true
   */
  value?: boolean;

  /**
   * 继承自 VSheet 的颜色属性
   * 设置横幅的背景颜色
   * @default undefined
   */
  color?: string;
}

/**
 * VBanner 组件计算属性接口
 */
export interface VBannerComputed {
  /**
   * 组件的 CSS 类名对象
   * 包含状态相关的类名
   */
  classes: Record<string, boolean>;

  /**
   * 判断是否存在图标（通过 prop 或 slot）
   */
  hasIcon: boolean;

  /**
   * 判断是否应该使用粘性定位
   * sticky 或 app 为 true 时返回 true
   */
  isSticky: boolean;

  /**
   * 组件的内联样式对象
   * 包含定位和 z-index 相关样式
   */
  styles: Partial<CSSStyleDeclaration>;
}

/**
 * VBanner 组件方法接口
 */
export interface VBannerMethods {
  /**
   * 切换横幅的显示/隐藏状态
   */
  toggle(): void;

  /**
   * 图标点击事件处理器
   * @param event - 鼠标点击事件对象
   */
  iconClick(event: MouseEvent): void;

  /**
   * 生成图标的虚拟节点
   * @returns 图标包裹在 VAvatar 中的 VNode，如果没有图标则返回 undefined
   */
  genIcon(): VNode | undefined;

  /**
   * 生成文本内容区域的虚拟节点
   * @returns 包含默认插槽内容的 VNode
   */
  genText(): VNode;

  /**
   * 生成操作按钮区域的虚拟节点
   * @returns 包含 actions 插槽内容的 VNode，如果没有则返回 undefined
   */
  genActions(): VNode | undefined;

  /**
   * 生成横幅内容区域的虚拟节点（图标 + 文本）
   * @returns 包含图标和文本的容器 VNode
   */
  genContent(): VNode;

  /**
   * 生成横幅包裹器的虚拟节点（内容 + 操作按钮）
   * @returns 包含内容和操作按钮的容器 VNode
   */
  genWrapper(): VNode;
}

/**
 * VBanner 组件事件接口
 */
export interface VBannerEvents {
  /**
   * 图标被点击时触发
   * @param event - 鼠标点击事件对象
   */
  'click:icon': MouseEvent;

  /**
   * 横幅显示/隐藏状态改变时触发
   * @param value - 新的显示状态
   */
  input: boolean;
}

/**
 * VBanner 组件插槽接口
 */
export interface VBannerSlots {
  /**
   * 默认插槽 - 横幅的主要文本内容
   */
  default?: VNode[];

  /**
   * 图标插槽 - 自定义图标内容
   * 优先级高于 icon 属性
   */
  icon?: VNode[];

  /**
   * 操作插槽 - 自定义操作按钮区域
   * @param dismiss - 关闭横幅的回调函数
   */
  actions?: (options: { dismiss: () => void }) => VNode[];
}

/**
 * VBanner 组件作用域插槽参数接口
 */
export interface VBannerScopedSlots {
  actions?: {
    /**
     * 关闭横幅的方法
     */
    dismiss: () => void;
  };
}

/**
 * VBanner 组件实例类型
 * 继承自 Vue 并混入相关的 mixin
 */
export interface VBanner extends Vue {
  // Props
  app: boolean;
  icon?: string;
  iconColor?: string;
  singleLine: boolean;
  sticky: boolean;
  value: boolean;
  color?: string;

  // Computed
  readonly classes: Record<string, boolean>;
  readonly hasIcon: boolean;
  readonly isSticky: boolean;
  readonly styles: Partial<CSSStyleDeclaration>;

  // Data (来自 toggleable mixin)
  isActive: boolean;

  // Methods
  toggle(): void;
  iconClick(event: MouseEvent): void;
  genIcon(): VNode | undefined;
  genText(): VNode;
  genActions(): VNode | undefined;
  genContent(): VNode;
  genWrapper(): VNode;

  // 继承自 VSheet 的方法
  setBackgroundColor(color: string | undefined, data: object): object;
}

/**
 * VBanner Vue 组件构造函数
 * 可用于类型推断和组件注册
 */
declare const VBanner: VueConstructor<VBanner>;

export default VBanner;