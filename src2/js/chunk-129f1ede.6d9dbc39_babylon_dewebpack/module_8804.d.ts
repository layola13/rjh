/**
 * 窗扇开启方向类型
 */
type OpenDirection =
  | 'left'
  | 'right'
  | 'up'
  | 'down'
  | 'left_with_up'
  | 'right_with_up'
  | 'left_with_down'
  | 'right_with_down'
  | 'Left_Rotate'
  | 'Right_Rotate'
  | 'Down_Rotate';

/**
 * 窗扇开启方向（内开/外开）
 */
type SashDirection = 'inward' | 'outward';

/**
 * 窗扇类型选项
 */
interface SashTypeOption {
  /** 标签名称 */
  label: string;
  /** 开启方向（内开/外开） */
  direction: SashDirection;
  /** 具体开启方向 */
  openDirection: OpenDirection;
  /** 图标类名 */
  icon: string;
  /** 是否激活状态 */
  is_active: boolean;
}

/**
 * 滑动选项配置
 */
interface SlideOption {
  /** 索引 */
  index: number;
  /** 窗口选项类型 */
  windowOptionType: string;
  /** 序列号 */
  serial: string;
  /** 图片URL */
  img_url?: string;
}

/**
 * 滑动类型列表项
 */
interface SlideTypeListItem {
  /** 类型名称 */
  name: string;
  /** 索引数组 */
  index: number[];
  /** 选项列表 */
  list: SlideOption[];
}

/**
 * 工具项配置
 */
interface ToolItem {
  /** 工具标签 */
  label: string;
  /** 工具提示 */
  tips?: string;
  /** 快捷键 */
  q_key?: string;
  /** 图标类名 */
  icon: string;
  /** 操作类型 */
  action: string;
  /** 是否激活 */
  is_active: boolean;
  /** 禁用类型（版本限制） */
  disable_type?: string;
  /** 子工具列表 */
  children?: ToolItem[];
}

/**
 * 工具分组
 */
interface ToolGroup {
  /** 分组名称 */
  name: string;
  /** 分组图标 */
  icon: string;
  /** 工具内容列表 */
  content: ToolItem[];
}

/**
 * 组件载荷数据
 */
interface ComponentPayload {
  /** 开启朝向 */
  openToward?: SashDirection;
  /** 开启方向 */
  openDirection?: OpenDirection;
  /** 应用的选项索引 */
  appliedOptionIndex?: number;
  [key: string]: unknown;
}

/**
 * 用户信息
 */
interface UserInfo {
  /** 用户ID */
  id: string | number;
  /** 版本类型 */
  version_type: string;
  [key: string]: unknown;
}

/**
 * Canvas工具管理器
 */
interface ToolManager {
  /** 切换工具 */
  takeTool(action: string): void;
}

/**
 * Canvas对象
 */
interface Canvas {
  /** 工具管理器 */
  toolManager: ToolManager;
}

/**
 * 事件总线
 */
interface EventBus {
  /** 监听事件 */
  $on(event: string, callback: (...args: any[]) => void): void;
  /** 触发事件 */
  $emit(event: string, ...args: any[]): void;
}

/**
 * Vuetify断点配置
 */
interface VuetifyBreakpoint {
  /** 当前断点名称 */
  name: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Vuetify主题配置
 */
interface VuetifyTheme {
  /** 是否为暗色主题 */
  dark: boolean;
}

/**
 * Vuetify实例
 */
interface Vuetify {
  /** 断点配置 */
  breakpoint: VuetifyBreakpoint;
  /** 主题配置 */
  theme: VuetifyTheme;
}

/**
 * 左侧工具卡片组件
 */
export default interface LeftCardComponent {
  /** 组件名称 */
  name: 'left-card';

  /**
   * 组件数据
   */
  data(): {
    /** 是否显示 */
    show: boolean;
    /** 当前选中的标签索引 */
    tab_index: number;
    /** 工具列表 */
    list: ToolGroup[];
    /** 最大高度 */
    max_height: number;
    /** 键盘事件标志 */
    keyEvent: boolean;
    /** 是否隐藏大部分操作 */
    hideMost: boolean;
    /** 是否显示二级菜单 */
    secondary: boolean;
    /** 二级菜单类型 */
    secondaryType: '' | 'Slide' | 'Sash' | 'Screen';
    /** 窗扇类型列表 */
    sash_type_list: {
      /** 内开窗扇选项 */
      inwardSash: SashTypeOption[];
      /** 外开窗扇选项 */
      outwardSash: SashTypeOption[];
    };
    /** 长按计时器记录 */
    pressTimerRecord: number | string;
    /** 长按计时器 */
    pressTimer: ReturnType<typeof setTimeout> | string;
    /** 组件载荷数据 */
    payload?: ComponentPayload;
  };

  /**
   * 组件方法
   */
  methods: {
    /**
     * 检查移动端列表配置
     */
    checkMobileList(): void;

    /**
     * 通过鼠标选择工具
     * @param tool - 工具项
     * @param parentTool - 父级工具项
     * @param isDisabled - 是否禁用
     */
    pickToolByMouse(
      tool: ToolItem,
      parentTool?: ToolItem | null,
      isDisabled?: boolean
    ): void;

    /**
     * 选择附加工具（窗扇类型）
     * @param option - 窗扇类型选项
     */
    pickAdditionTool(option: SashTypeOption): void;

    /**
     * 通过键盘选择工具
     * @param action - 工具操作类型
     */
    pickToolByKeyboard(action: string): void;

    /**
     * 渲染尺寸调整
     */
    renderResize(): void;

    /**
     * 初始化组件监听器
     */
    initComListeners(): void;

    /**
     * 返回主菜单
     */
    backToPrimary(): void;

    /**
     * 长按开始
     */
    longPressStart(): void;

    /**
     * 停止长按
     */
    stopLongPress(): void;

    /**
     * 长按结束
     */
    longPressEnd(): void;
  };

  /**
   * 计算属性
   */
  computed: {
    /** 是否为小屏幕 */
    is_small_screen: boolean;
    /** 是否为超小屏幕 */
    is_xs_screen: boolean;
    /** 滑动类型列表 */
    slide_type_list: SlideTypeListItem[];
    /** 是否为移动设备 */
    isMobileDevice: boolean;
    /** Canvas对象 */
    canvas: Canvas;
    /** 用户信息 */
    userinfo: UserInfo;
  };

  /**
   * 监听器
   */
  watch: {
    /**
     * 监听标签索引变化
     * @param newIndex - 新索引
     * @param oldIndex - 旧索引
     */
    tab_index(newIndex: number, oldIndex: number): void;
  };

  /**
   * 组件创建钩子
   */
  created(): void;

  /**
   * 组件挂载钩子
   */
  mounted(): void;

  /**
   * Vuetify实例
   */
  $vuetify: Vuetify;

  /**
   * 事件总线
   */
  bus: EventBus;

  /**
   * Vue响应式设置方法
   */
  $set<T>(target: T, key: keyof T, value: any): void;

  /**
   * 国际化翻译方法
   */
  $t(key: string): string;

  /**
   * Vuex Store
   */
  $store: {
    getters: {
      is_small_screen(vuetify: Vuetify): boolean;
    };
  };
}