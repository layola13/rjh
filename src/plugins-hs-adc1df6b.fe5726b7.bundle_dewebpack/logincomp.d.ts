/**
 * LoginComp 模块
 * 用户登录组件及相关功能的类型声明
 */

import * as React from 'react';

/**
 * 会员类型枚举
 */
export type MemberType = 'Pro' | 'Master' | '';

/**
 * 任务状态
 * 1: 待完成
 * 2: 待领取
 */
export type TaskStatus = 1 | 2;

/**
 * 菜单项配置
 */
export interface MenuConfig {
  /** 菜单项唯一标识 */
  key: string;
  /** 菜单链接地址 */
  link?: string;
  /** 自定义菜单名称 */
  menuName?: string;
  /** 是否显示底部分割线 */
  bottomLine?: boolean;
}

/**
 * 会员徽章信息
 */
export interface MemberBadge {
  /** 徽章名称 */
  name: string;
  /** 徽章图标URL */
  icon: string;
  /** 点击事件回调 */
  onClick?: () => void;
  /** 自定义样式类名 */
  className?: string;
}

/**
 * 企业信息
 */
export interface EnterpriseInfo {
  /** 企业名称 */
  name: string;
  /** 自定义工作台域名 */
  customWbDomain?: string;
}

/**
 * 用户信息状态
 */
export interface UserState {
  /** 未读消息数量 */
  unreadMsgNums: number;
  /** 是否需要通知提示 */
  needNoticeTip: boolean;
  /** 是否需要引导 */
  needGuide: boolean;
  /** 会员类型 */
  memberType: MemberType;
  /** 最新渲染会员类型 */
  latestRenderMemberType?: MemberType;
  /** 任务状态 */
  taskStatus: TaskStatus;
  /** 是否隐藏小红点 */
  hideRedDot: boolean;
  /** 用户积分 */
  score: number;
  /** 是否为Styler会员 */
  stylerMember: boolean;
  /** 企业信息 */
  enterpriseInfo: EnterpriseInfo | null;
  /** 徽章总数 */
  badgeTotal: number;
  /** 会员徽章数组 */
  memberBadgeArr: MemberBadge[];
  /** 会员徽章背景图URL */
  memberBadgeBg: string;
  /** Styler会员到期时间戳 */
  stylerMemberEndTime?: number;
  /** 渲染会员到期时间戳 */
  renderMemberEndTime?: number;
  /** 是否存在渲染会员资格 */
  existRenderMember?: boolean;
  /** 是否存在Styler会员资格 */
  existStylerMember?: boolean;
  /** 下拉菜单显示状态 */
  dropdownVisible: boolean;
}

/**
 * 会员提示信息配置
 */
export interface MemberTipConfig {
  /** 判断会员是否过期的函数 */
  isExpiredFunc: (state: UserState) => boolean;
  /** 判断是否为会员的函数 */
  isMemberFunc: (state: UserState) => boolean;
  /** 判断是否为普通会员的函数 */
  isUsualMemberFunc: (state: UserState) => boolean;
  /** 会员到期时间 */
  memberEndTime?: number;
  /** 会员图标URL */
  icon: string;
  /** 过期图标URL */
  expireIcon: string;
  /** 会员名称 */
  name: string;
  /** 描述文本 */
  description: string;
  /** 颜色值 */
  color: string;
}

/**
 * LoginComp 组件属性
 */
export interface LoginCompProps {}

/**
 * 用户登录组件
 * 负责用户登录状态展示、会员信息展示、用户菜单交互等功能
 */
export class LoginComp extends React.Component<LoginCompProps, UserState> {
  /** 应用实例引用 */
  app: any;
  /** DOM包装器引用 */
  fpWrapper: HTMLElement | null;

  constructor(props: LoginCompProps);

  /**
   * 获取企业信息
   */
  getEnterpriseInfo(): void;

  /**
   * 创建会员徽章项
   * @param name - 徽章名称
   * @param icon - 图标URL
   * @param route - 路由路径
   * @param onClick - 点击回调
   * @param className - 样式类名
   * @returns 会员徽章对象
   */
  createMemberItem(
    name: string,
    icon: string,
    route: string,
    onClick?: () => void,
    className?: string
  ): MemberBadge;

  /**
   * 判断用户是否未购买任何会员
   * @param state - 用户状态
   */
  isNotPurchasedMember(state: UserState): boolean;

  /**
   * 判断Styler会员是否已过期
   * @param state - 用户状态
   */
  isExpiredStylerMember(state: UserState): boolean;

  /**
   * 判断是否为有效Styler会员
   * @param state - 用户状态
   */
  isStylerMember(state: UserState): boolean;

  /**
   * 判断渲染会员是否已过期
   * @param state - 用户状态
   */
  isExpiredRenderMember(state: UserState): boolean;

  /**
   * 判断是否为有效渲染会员
   * @param state - 用户状态
   */
  isRenderMember(state: UserState): boolean;

  /**
   * 判断是否为普通渲染会员（Pro/Master）
   * @param state - 用户状态
   */
  isRenderUsualMember(state: UserState): boolean;

  /**
   * 判断是否为普通Styler会员
   * @param state - 用户状态
   */
  isStylerUsualMember(state: UserState): boolean;

  /**
   * 判断是否显示升级链接
   * @param state - 用户状态
   */
  isShowUpgradeLink(state: UserState): boolean;

  /**
   * 获取会员徽章背景图
   * @param options - 会员状态选项
   * @returns 背景图URL
   */
  getMemberBadgeBg(options: {
    existRenderMember?: boolean;
    existStylerMember?: boolean;
    memberType: MemberType;
    stylerMember: boolean;
  }): string;

  /**
   * 前往签到页面
   */
  gotoCheckIn(): void;

  /**
   * 获取用户信息
   * @param forceUpdate - 是否强制更新，默认true
   */
  getUserInfo(forceUpdate?: boolean): Promise<void>;

  /**
   * 鼠标移入监听器
   */
  mouseEnterListener(): void;

  /**
   * 组件挂载生命周期
   */
  componentDidMount(): void;

  /**
   * 组件卸载生命周期
   */
  componentWillUnmount(): void;

  /**
   * 用户登出
   */
  logOut(): void;

  /**
   * 创建新文档
   * @private
   */
  _newDocument(): void;

  /**
   * 显示用户被踢出通知
   * @param shouldReload - 是否需要重新加载
   */
  showUserKickOffNotice(shouldReload: boolean): void;

  /**
   * 跳转到工作台
   * @param target - 打开方式，默认'_self'
   */
  jump2Workbench(target?: string): void;

  /**
   * 跳转到团队工作台
   * @param target - 打开方式，默认'_self'
   */
  jump2Team(target?: string): void;

  /**
   * 切换到工作台
   */
  switchWorkbench(): void;

  /**
   * 切换到个人版
   * @param url - 跳转URL
   */
  switchPersonal(url?: string): void;

  /**
   * 处理事件跟踪
   * @param eventName - 事件名称
   */
  handleEventTrack(eventName: string): void;

  /**
   * 退出工具
   */
  exitTool(): void;

  /**
   * 处理升级操作
   * @param source - 来源标识
   */
  handleUpgrade(source?: string): void;

  /**
   * 前往积分页面
   */
  handleToPonitPage(): void;

  /**
   * 检查是否隐藏小红点
   */
  checkHideRedDot(): void;

  /**
   * 获取全局企业菜单
   * @returns React元素
   */
  getGlobalEnterpriseMenu(): React.ReactElement;

  /**
   * 检查过期时间是否在7天内
   * @param timestamp - 时间戳
   * @returns 是否即将过期
   */
  checkExpireTime(timestamp: number): boolean;

  /**
   * 获取全局个人会员信息展示
   * @returns React元素
   */
  getGlobalPersonalMemberInfo(): React.ReactElement;

  /**
   * 获取会员提示信息
   * @param config - 会员提示配置
   * @returns React元素或null
   */
  getMemberTip(config: MemberTipConfig): React.ReactElement | null;

  /**
   * 获取会员信息展示项
   * @param config - 菜单配置
   * @returns React元素或null
   */
  getMembers(config: MenuConfig): React.ReactElement | null;

  /**
   * 获取菜单项
   * @param config - 菜单配置
   * @returns React元素或null
   */
  getMeuns(config: MenuConfig): React.ReactElement | null;

  /**
   * 获取全局个人菜单
   * @param memberConfigs - 会员配置数组
   * @param menuConfigs - 菜单配置数组
   * @returns React元素
   */
  getGlobalPersonalMenu(
    memberConfigs?: MenuConfig[],
    menuConfigs?: MenuConfig[]
  ): React.ReactElement;

  /**
   * 格式化日期
   * @param timestamp - 时间戳
   * @returns 格式化后的日期字符串 (YYYY-MM-DD)
   */
  getDate(timestamp: number): string;

  /**
   * 打开下拉菜单
   */
  openDropdownMenu(): void;

  /**
   * 关闭下拉菜单
   */
  closeDropdownMenu(): void;

  /**
   * 处理下拉菜单可见性变化
   * @param visible - 是否可见
   */
  handleDropdownVisibleChange(visible: boolean): void;

  /**
   * 渲染组件
   * @returns React元素
   */
  render(): React.ReactElement;
}

/**
 * 登录插件控制器
 * 负责管理登录组件的生命周期和交互
 */
export default class LoginController {
  /** 执行顺序 */
  order: number;
  /** 应用实例引用 */
  private _app: any;
  /** 登录插件引用 */
  private _signinPlugin: any;
  /** 信号钩子 */
  private _signalHook: any;
  /** 登录组件引用 */
  private _loginCompRef: LoginComp | null;

  /**
   * 构造函数
   * @param app - 应用实例
   * @param plugins - 插件映射
   */
  constructor(app: any, plugins: Record<string, any>);

  /**
   * 跳转到设计案例详情页
   * @param designId - 设计ID
   * @private
   */
  private _jumpToDesignCaseDetail(designId: string): Promise<void>;

  /**
   * 通知状态变化
   * @param event - 事件对象
   */
  notifyStatusChanged(event: any): void;

  /**
   * 设置登录组件引用
   * @param ref - 组件引用
   */
  setLoginCompRef(ref: LoginComp | null): void;

  /**
   * 打开用户菜单
   */
  openUserMenu(): void;

  /**
   * 关闭用户菜单
   */
  closeUserMenu(): void;

  /**
   * 获取渲染项
   * @returns React元素
   */
  getRenderItem(): React.ReactElement;
}

export { LoginComp };