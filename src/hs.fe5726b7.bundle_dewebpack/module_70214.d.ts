/**
 * 工具提示组件的属性接口
 */
interface TooltipWrapperProps {
  /**
   * 子元素内容
   */
  children: React.ReactNode;

  /**
   * 工具提示标题
   */
  title: React.ReactNode;

  /**
   * 主题样式类名
   */
  theme?: string;

  /**
   * 是否默认显示工具提示
   * @default true
   */
  defaultShow?: boolean;

  /**
   * 本地存储键名，用于记录工具提示的显示状态
   * @default "teaching-ability"
   */
  toolTip_Storage?: string;

  /**
   * 工具提示的弹出位置
   * @default "bottomRight"
   */
  placement?: TooltipPlacement;

  /**
   * 插件名称，用于本地存储命名空间
   * @default HSFPConstants.PluginType.TeachingAbility
   */
  pluginName?: string;
}

/**
 * 工具提示弹出位置类型
 */
type TooltipPlacement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'left'
  | 'leftTop'
  | 'leftBottom'
  | 'right'
  | 'rightTop'
  | 'rightBottom';

/**
 * HSApp 全局对象类型定义
 */
interface HSAppGlobal {
  Util: {
    /**
     * 本地存储工具类
     */
    Storage: {
      new (namespace: string): StorageInstance;
    };

    /**
     * URL 工具类
     */
    Url: {
      /**
       * 获取 URL 查询参数
       */
      getQueryStrings(): Record<string, string> | null;
    };
  };
}

/**
 * 存储实例接口
 */
interface StorageInstance {
  /**
   * 获取存储的值
   */
  get(key: string): string | null;

  /**
   * 设置存储的值
   */
  set(key: string, value: string): void;
}

/**
 * HSFP 常量定义
 */
interface HSFPConstantsInterface {
  PluginType: {
    /**
     * 教学能力插件类型
     */
    TeachingAbility: string;
  };
}

/**
 * 图标字体视图组件属性
 */
interface IconfontViewProps {
  /**
   * 图标类型
   */
  showType: string;

  /**
   * 图标点击事件处理函数
   */
  iconOnclick?: () => void;

  /**
   * 自定义样式
   */
  customStyle?: React.CSSProperties;
}

/**
 * 工具提示组件引用接口
 */
interface TooltipRef {
  /**
   * 关闭工具提示
   */
  close(): void;
}

/**
 * 工具提示组件
 * 用于显示首次使用提示，带有本地存储记忆功能
 * 
 * @param props - 组件属性
 * @returns React 组件
 */
declare function TooltipWrapper(props: TooltipWrapperProps): React.ReactElement;

export default TooltipWrapper;

/**
 * 全局类型声明
 */
declare global {
  const HSApp: HSAppGlobal;
  const HSFPConstants: HSFPConstantsInterface;

  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

/**
 * Tooltip 组件接口（来自组件库）
 */
interface TooltipComponent extends React.ForwardRefExoticComponent<TooltipComponentProps & React.RefAttributes<TooltipRef>> {}

interface TooltipComponentProps {
  /**
   * 工具提示内容
   */
  title: React.ReactNode;

  /**
   * 弹出位置
   */
  placement?: TooltipPlacement;

  /**
   * 触发方式
   */
  trigger?: 'new' | 'hover' | 'click' | 'focus' | null;

  /**
   * 浮层样式类名
   */
  overlayClassName?: string;

  /**
   * 延迟关闭时间（毫秒）
   */
  delayClose?: number;

  /**
   * 获取弹出层容器
   */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;

  /**
   * 子元素
   */
  children: React.ReactNode;
}

/**
 * IconfontView 组件类型
 */
declare const IconfontView: React.FC<IconfontViewProps>;

/**
 * Tooltip 组件类型
 */
declare const Tooltip: TooltipComponent;

export { TooltipWrapper, type TooltipWrapperProps, type TooltipPlacement, type TooltipRef };