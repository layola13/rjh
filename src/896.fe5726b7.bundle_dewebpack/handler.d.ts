/**
 * VIP会员处理模块
 * 负责管理用户VIP信息、权益展示和购买流程
 */

import type { HSCore } from './core-types';
import type { VipType, VipStatus, VipRecordStatus } from './vip-types';

/**
 * VIP信息接口
 */
export interface VipInfo {
  /** VIP类型 */
  vipType: VipType;
  /** VIP状态 */
  status: VipStatus;
  /** 过期时间戳(毫秒) */
  expireTime?: number;
  /** 是否即将过期 */
  isAboutToExpire?: boolean;
  /** 是否为VIP */
  isVip?: boolean;
  /** 是否显示促销 */
  showSale?: boolean;
}

/**
 * VIP周期记录
 */
export interface VipCycleRecord {
  vipType: VipType;
  status: VipRecordStatus;
  expireTime?: number;
}

/**
 * VIP API响应
 */
export interface VipApiResponse<T = unknown> {
  data?: {
    code?: string;
    data?: T;
  };
}

/**
 * 市场模态框选项
 */
export interface MarketModalOptions {
  /** 关闭回调 */
  onClose?: () => void;
  /** 其他选项 */
  [key: string]: unknown;
}

/**
 * 用户登录完成事件数据
 */
export interface LoginCompletedData {
  isLogin: boolean;
  [key: string]: unknown;
}

/**
 * VIP会员处理器
 * 管理会员信息获取、展示、购买等核心功能
 */
export declare class Handler {
  /** 当前用户VIP信息 */
  private useVipInfo: VipInfo | undefined;
  
  /** VIP信息是否已添加到用户界面 */
  private useVipInfoAdded: boolean;
  
  /** 市场模态框实例 */
  private markertModal: unknown;
  
  /** VIP信息变更信号 */
  readonly vipInfoChangedSignal: HSCore.Util.Signal<VipInfo>;

  constructor();

  /**
   * 初始化处理器
   * 监听登录状态并加载VIP数据
   */
  init(): void;

  /**
   * 获取当前VIP信息
   * @returns 当前用户的VIP信息
   */
  getVipInfo(): VipInfo | undefined;

  /**
   * 初始化数据
   * 获取并更新VIP信息，刷新UI
   */
  initData(): Promise<void>;

  /**
   * 初始化浮动按钮信息
   * 渲染VIP浮动入口
   */
  initFloatInfo(): Promise<void>;

  /**
   * 初始化用户信息区域
   * 更新用户菜单中的VIP信息展示
   */
  initUserInfo(): void;

  /**
   * 获取VIP数据
   * 并行请求用户VIP、记录和过期通知，聚合处理结果
   * @returns 聚合后的VIP信息
   */
  getData(): Promise<VipInfo>;

  /**
   * 获取VIP周期记录
   * 判断是否有历史订阅记录
   * @returns 是否无历史记录(用于显示促销)
   */
  fetchVipCycleRecords(): Promise<boolean | undefined>;

  /**
   * 跳转到购买页面
   * 打开VIP购买页并记录埋点
   */
  toBuyPage(): void;

  /**
   * 记录数据埋点
   * 根据当前环境发送用户行为追踪
   */
  recordData(): void;

  /**
   * 显示市场模态框
   * 展示会员权益中心或图片详情
   * @param param1 - 第一个参数(具体用途待确认)
   * @param sourcePage - 来源页面标识
   * @param options - 模态框选项
   */
  showMarketModal(
    param1: unknown,
    sourcePage: string,
    options?: MarketModalOptions
  ): void;

  /**
   * 关闭市场模态框
   */
  closeMarketModal(): void;

  /**
   * 刷新权益信息
   * 重新初始化数据并通知相关插件更新
   */
  refreshBenefits(): void;
}