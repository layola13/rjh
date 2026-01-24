/**
 * 教程日志记录器模块
 * 负责记录教程相关的用户行为和事件追踪
 * @module Logger
 */

/**
 * 文章查看事件数据接口
 */
interface ArticleViewEventData {
  /** 文章唯一标识 */
  id: string;
  /** 文章URL地址 */
  articleUrl: string;
  /** 文章标题 */
  articleTitle: string;
  /** 来源信息 */
  from?: {
    /** 来源ID */
    id: string;
    /** 来源名称 */
    name: string;
  };
}

/**
 * 文章查看打开事件参数
 */
interface ArticleViewOpenEvent {
  /** 事件数据 */
  data: ArticleViewEventData;
}

/**
 * 页面推送事件参数
 */
interface PagePushEvent {
  /** 事件数据 */
  data: unknown;
}

/**
 * 点击率统计子项
 */
interface ClicksRatioSubItem {
  /** 项目ID */
  id: string;
  /** 项目名称 */
  name: string;
  /** 嵌套子项（可选） */
  subItem?: ClicksRatioSubItem;
}

/**
 * 日志记录配置
 */
interface LogConfig {
  /** 操作类型 */
  actionType: string;
  /** 操作描述 */
  description: string;
  /** 点击率统计信息 */
  clicksRatio: ClicksRatioSubItem;
}

/**
 * 教程日志记录器类
 * 用于追踪和记录教程模块的用户交互行为
 */
export declare class Logger {
  /**
   * 构造函数
   */
  constructor();

  /**
   * 记录文章查看打开事件
   * 当用户打开教程内容时触发
   * @param event - 文章查看事件对象
   */
  articleViewOpen(event: ArticleViewOpenEvent): void;

  /**
   * 记录显示教程弹框事件
   * 当教程弹框被打开时触发
   */
  showModel(): void;

  /**
   * 处理页面推送事件
   * @param event - 页面推送事件对象
   */
  pagePush(event: PagePushEvent): void;

  /**
   * 激活日志监听器
   * 订阅所有相关信号事件
   */
  onActive(): void;

  /**
   * 停用日志监听器
   * 取消订阅所有信号事件
   */
  onDeactive(): void;
}