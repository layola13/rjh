/**
 * 收件箱提示气泡组件类型定义
 * @module InboxHintPopover
 */

/**
 * 收件箱提示数据结构
 */
export interface InboxHint {
  /** 主标题 */
  title: string;
  /** 副标题（alertTime=2时使用） */
  titleSecond: string;
  /** 主标题多语言键值 */
  titleMdsKeyValue?: string;
  /** 副标题多语言键值 */
  titleSecondMdsKeyValue?: string;
  /** 主内容 */
  content: string;
  /** 副内容（alertTime=2时使用） */
  contentSecond: string;
  /** 主链接名称 */
  linkName: string;
  /** 副链接名称（alertTime=2时使用） */
  linkNameSecond: string;
  /** 主链接名称多语言键值 */
  linkNameMdsKeyValue?: string;
  /** 副链接名称多语言键值 */
  linkNameSecondMdsKeyValue?: string;
  /** 主链接URL */
  linkUrl: string;
  /** 副链接URL（alertTime=2时使用） */
  linkSecondUrl: string;
  /** 头部主色 */
  headerColor: string;
  /** 头部渐变副色 */
  headerSecondColor: string;
  /** 按钮主色 */
  buttonColor: string;
  /** 按钮渐变副色 */
  buttonSecondColor: string;
  /** 按钮字体颜色 */
  buttonFontColor?: string;
  /** 链接类型，'copyAndOpenMarket' 表示复制并打开市场弹窗 */
  linkType?: string;
  /** 需要复制的值（当linkType为copyAndOpenMarket时使用） */
  copyValue?: string;
  /** 来源页面标识 */
  sourcePage?: string;
  /** 标题多语言键（用于埋点） */
  titleMdsKey?: string;
}

/**
 * 组件属性接口
 */
export interface InboxHintPopoverProps {
  /** 收件箱提示数据 */
  inboxHint: InboxHint | null;
  /** 
   * 警告时间类型
   * 1 - 使用主数据（title, content, linkName, linkUrl）
   * 2 - 使用副数据（titleSecond, contentSecond等）
   */
  alertTime: 1 | 2;
  /** 隐藏气泡回调函数 */
  hidePopover: () => void;
}

/**
 * 计算后的显示内容
 */
interface ComputedContent {
  /** 最终显示的标题 */
  title: string;
  /** 最终显示的内容 */
  content: string;
  /** 最终显示的链接名称 */
  linkName: string;
  /** 最终显示的链接URL */
  linkUrl: string;
}

/**
 * 收件箱提示气泡组件
 * 根据alertTime值动态选择显示主数据或副数据
 * 
 * @param props - 组件属性
 * @returns React元素或null（当inboxHint为空时）
 */
declare function InboxHintPopover(props: InboxHintPopoverProps): JSX.Element | null;

export default InboxHintPopover;