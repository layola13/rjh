/**
 * jQuery dotdotdot plugin - 文本截断省略号插件
 * 用于在固定高度容器中截断文本并添加省略号
 */

declare global {
  interface JQuery {
    /**
     * 应用文本截断插件
     * @param options - 插件配置选项
     * @returns jQuery 实例，支持链式调用
     */
    dotdotdot(options?: DotDotDotOptions): JQuery;
  }

  interface JQueryStatic {
    fn: {
      dotdotdot: DotDotDotPlugin;
    };
  }
}

/**
 * 插件配置选项
 */
interface DotDotDotOptions {
  /**
   * 省略号字符
   * @default "... "
   */
  ellipsis?: string;

  /**
   * 截断模式
   * - "word": 按单词截断
   * - "letter": 按字母截断
   * - "children": 按子元素截断
   * @default "word"
   */
  wrap?: 'word' | 'letter' | 'children';

  /**
   * 当按单词截断失败时，是否回退到按字母截断
   * @default true
   */
  fallbackToLetter?: boolean;

  /**
   * 最后字符处理规则
   */
  lastCharacter?: {
    /**
     * 需要移除的末尾字符列表（在添加省略号前）
     */
    remove?: string[];

    /**
     * 不需要添加省略号的末尾字符列表
     */
    noEllipsis?: string[];
  };

  /**
   * 高度容差值（像素）
   * @default 0
   */
  tolerance?: number;

  /**
   * 截断完成后的回调函数
   * @param isTruncated - 是否发生了截断
   * @param originalContent - 原始内容
   */
  callback?: (isTruncated: boolean, originalContent: JQuery) => void;

  /**
   * 在截断内容后追加的元素（CSS选择器或jQuery对象）
   */
  after?: string | JQuery | HTMLElement;

  /**
   * 固定高度值（像素）
   * 如果不设置，则使用元素自身的高度
   */
  height?: number | null;

  /**
   * 监听模式
   * - "window": 监听窗口大小变化
   * - false: 不监听
   * - 其他真值: 定时轮询元素尺寸变化
   * @default false
   */
  watch?: 'window' | boolean;

  /**
   * 窗口调整大小修复
   * 某些浏览器会在滚动条出现/消失时触发resize事件，此选项可避免不必要的更新
   * @default true
   */
  windowResizeFix?: boolean;
}

/**
 * 元素尺寸信息
 */
interface ElementDimensions {
  /** 内部宽度 */
  width: number;
  /** 内部高度 */
  height: number;
}

/**
 * 截断配置（运行时计算）
 */
interface TruncationConfig extends DotDotDotOptions {
  /** 计算后的最大高度 */
  maxHeight: number;
}

/**
 * 插件内部状态
 */
interface DotDotDotState {
  /** 追加元素的 jQuery 对象 */
  afterElement?: JQuery | false;
  /** 是否已截断 */
  isTruncated: boolean;
  /** 唯一标识符 */
  dotId: number;
}

/**
 * dotdotdot 插件主接口
 */
interface DotDotDotPlugin {
  (options?: DotDotDotOptions): JQuery;

  /**
   * 默认配置
   */
  defaults: Required<DotDotDotOptions>;

  /**
   * 默认数组配置
   */
  defaultArrays: {
    lastCharacter: {
      remove: string[];
      noEllipsis: string[];
    };
  };

  /**
   * 调试日志函数
   * @param message - 日志消息
   */
  debug: (message: string) => void;
}

/**
 * jQuery 元素扩展方法
 */
interface JQuery {
  /**
   * 绑定插件事件监听器
   * @internal
   */
  bind_events?(): JQuery;

  /**
   * 解绑插件事件监听器
   * @internal
   */
  unbind_events?(): JQuery;

  /**
   * 开始监听尺寸变化
   */
  watch?(): JQuery;

  /**
   * 停止监听尺寸变化
   */
  unwatch?(): JQuery;
}

/**
 * 自定义事件
 */
interface JQueryEventObject {
  /**
   * update.dot - 更新截断
   * @param newContent - 新内容（可选）
   */
  'update.dot'?: (newContent?: string | HTMLElement | JQuery) => void;

  /**
   * isTruncated.dot - 查询是否截断
   * @param callback - 接收截断状态的回调
   */
  'isTruncated.dot'?: (callback?: (isTruncated: boolean) => void) => void;

  /**
   * originalContent.dot - 获取原始内容
   * @param callback - 接收原始内容的回调
   */
  'originalContent.dot'?: (callback?: (content: JQuery) => void) => void;

  /**
   * destroy.dot - 销毁插件实例
   */
  'destroy.dot'?: () => void;
}

export {};