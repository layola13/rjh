/**
 * EZHome User VIP System Type Definitions
 * 用户会员系统类型定义
 */

// ============================================================================
// Core Enums & Constants
// ============================================================================

/**
 * 会员类型枚举
 */
export enum VipType {
  /** 非会员 */
  NotVip = 'notVip',
  /** 基础会员 */
  Base = 'base',
  /** 高级会员 */
  High = 'high'
}

/**
 * 会员状态枚举
 */
export enum VipStatus {
  /** 使用中 */
  InUse = 'in_use',
  /** 已过期 */
  Finished = 'finished'
}

/**
 * 市场类型枚举
 */
export enum MarketType {
  /** 会员服务 */
  Member = 'member',
  /** 渲染图 */
  Rendergraph = 'rendergraph',
  /** 视频 */
  Video = 'video'
}

// ============================================================================
// User VIP Info
// ============================================================================

/**
 * 用户会员信息接口
 */
export interface UserVipInfo {
  /** 会员类型 */
  vipType: VipType;
  /** 会员状态 */
  status: VipStatus;
  /** 过期时间戳 */
  expireTime?: number;
  /** 是否即将过期（7天内） */
  isAboutToExpire?: boolean;
  /** 是否为会员 */
  isVip?: boolean;
  /** 是否展示促销信息 */
  showSale?: boolean;
}

/**
 * 会员周期记录
 */
export interface VipCycleRecord {
  /** 会员类型 */
  vipType: VipType;
  /** 记录状态 */
  status: VipStatus;
  /** 开始时间 */
  startTime?: number;
  /** 结束时间 */
  endTime?: number;
}

// ============================================================================
// Room Style & Attributes
// ============================================================================

/**
 * 房间风格属性处理器
 */
export interface RoomStyleProcessor {
  /** 房间风格属性名称 */
  roomStyleAttrName: string;
  /** 无风格标识 */
  roomStyleNone: string;
  /** 设置房间风格属性ID */
  setRoomStyleAttributeId(attributeId: string): void;
  /** 处理元数据 */
  process(metadata: unknown, productInfo: ProductInfo): unknown;
}

/**
 * 产品信息接口
 */
export interface ProductInfo {
  /** 产品类型 */
  productType: string;
  /** 属性列表 */
  attributes: ProductAttribute[];
}

/**
 * 产品属性
 */
export interface ProductAttribute {
  /** 属性ID */
  id: string;
  /** 属性名称 */
  name: string;
  /** 属性值列表 */
  values: ProductAttributeValue[];
}

/**
 * 产品属性值
 */
export interface ProductAttributeValue {
  /** 值ID */
  id: string;
  /** 值内容 */
  value: string;
}

/**
 * 风格选项
 */
export interface StyleOption {
  /** 风格代码 */
  code: string;
  /** 风格名称 */
  name: string;
}

// ============================================================================
// UI Components
// ============================================================================

/**
 * 用户信息项组件属性
 */
export interface UserInfoItemProps {
  /** 用户会员信息 */
  userVipInfo: UserVipInfo;
  /** 点击回调 */
  onClick?: () => void;
}

/**
 * 悬浮按钮组件属性
 */
export interface FloatButtonProps {
  /** 用户会员信息 */
  userVipInfo: UserVipInfo;
  /** 是否展开 */
  isExpand?: boolean;
  /** 点击回调 */
  onClick?: () => void;
}

/**
 * 悬浮按钮信息配置
 */
export interface FloatButtonInfo {
  /** 背景色（单色或渐变） */
  background: string | [string, string];
  /** 图标URL */
  icon: string;
  /** 显示文本 */
  text: string;
  /** 右侧图标颜色 */
  rightIconColor: string;
}

/**
 * 可拖拽组件属性
 */
export interface DraggableProps {
  /** 子元素 */
  children: React.ReactNode;
  /** CSS类名 */
  className?: string;
  /** 点击回调 */
  onClick?: () => void;
  /** 默认位置 */
  defaultPosition?: Position;
  /** 位置变化回调 */
  onPositionChange?: (position: Position) => void;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

/**
 * 位置坐标
 */
export interface Position {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 缩放容器组件属性
 */
export interface ScaleAbleProps {
  /** 子元素 */
  children: React.ReactNode;
  /** 缩放比例 */
  scale: number;
}

// ============================================================================
// Pricing Market Modal
// ============================================================================

/**
 * 定价市场弹窗属性
 */
export interface PricingMarketProps {
  /** 市场类型 */
  type: MarketType;
  /** 来源页面标识 */
  sourcePage: string;
  /** 兑换数量 */
  redeemNum?: number;
  /** 关闭回调 */
  onClose?: () => void;
}

/**
 * 定价市场弹窗状态
 */
export interface PricingMarketState {
  /** iframe宽度 */
  iframeWidth: number;
  /** 来源页面 */
  sourcePage: string;
  /** 是否可见 */
  visible: boolean;
  /** 是否加载中 */
  loading: boolean;
  /** 是否显示关闭按钮 */
  showCloseBtn: boolean;
}

// ============================================================================
// Handler & Plugin
// ============================================================================

/**
 * 会员信息处理器
 */
export declare class VipInfoHandler {
  /** 当前使用的会员信息 */
  useVipInfo?: UserVipInfo;
  /** 会员信息是否已添加到用户界面 */
  useVipInfoAdded: boolean;
  /** 市场弹窗实例 */
  marketModal?: unknown;
  /** 会员信息变更信号 */
  vipInfoChangedSignal: Signal<UserVipInfo>;

  constructor();

  /**
   * 初始化数据
   */
  init(): void;

  /**
   * 获取会员信息
   */
  getVipInfo(): UserVipInfo | undefined;

  /**
   * 初始化数据（异步）
   */
  initData(): Promise<void>;

  /**
   * 初始化悬浮信息
   */
  initFloatInfo(): Promise<void>;

  /**
   * 初始化用户信息
   */
  initUserInfo(): void;

  /**
   * 获取数据
   */
  getData(): Promise<UserVipInfo>;

  /**
   * 跳转到购买页面
   */
  toBuyPage(): void;

  /**
   * 记录数据
   */
  recordData(): void;

  /**
   * 显示市场弹窗
   * @param type 市场类型
   * @param sourcePage 来源页面
   * @param options 额外选项
   */
  showMarketModal(type: MarketType, sourcePage: string, options?: Partial<PricingMarketProps>): void;

  /**
   * 关闭市场弹窗
   */
  closeMarketModal(): void;

  /**
   * 刷新权益信息
   */
  refreshBenefits(): void;

  /**
   * 获取会员周期记录
   */
  fetchVipCycleRecords(): Promise<boolean | undefined>;
}

/**
 * 用户VIP插件
 */
export declare class UserVipPlugin {
  /** 插件名称 */
  readonly name: string;
  /** 插件描述 */
  readonly description: string;
  /** 处理器实例 */
  readonly handler: VipInfoHandler;

  constructor();

  /**
   * 激活插件
   * @param environment 环境对象
   * @param plugins 插件映射
   */
  onActive(environment: unknown, plugins: Record<string, unknown>): void;

  /**
   * 获取会员信息
   */
  getVipInfo(): UserVipInfo | undefined;

  /**
   * 获取会员信息变更信号
   */
  getVipInfoChangedSignal(): Signal<UserVipInfo>;

  /**
   * 显示市场弹窗
   */
  showMarketModal(type?: MarketType, sourcePage?: string, options?: Partial<PricingMarketProps>): void;

  /**
   * 关闭市场弹窗
   */
  closeMarketModal(): void;

  /**
   * 刷新权益
   */
  refreshBenefits(): void;

  /**
   * 获取会员信息（别名）
   */
  getMemberInfo(): UserVipInfo | undefined;
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * 获取用户信息项UI元素
 * @param userVipInfo 用户会员信息
 * @param onClick 点击回调
 */
export function getUserInfoItem(userVipInfo: UserVipInfo, onClick?: () => void): React.ReactElement;

/**
 * 渲染悬浮按钮
 * @param userVipInfo 用户会员信息
 * @param onClick 点击回调
 */
export function renderFloatButton(userVipInfo: UserVipInfo, onClick?: () => void): void;

/**
 * 渲染市场弹窗
 * @param type 市场类型
 * @param sourcePage 来源页面
 * @param options 额外选项
 */
export function renderMarketModal(
  type: MarketType,
  sourcePage: string,
  options?: Partial<PricingMarketProps>
): unknown;

/**
 * 卸载市场弹窗
 */
export function unmountMarketModal(): void;

/**
 * 获取用户会员信息底部内容
 * @param userVipInfo 用户会员信息
 */
export function getUserInfoBottom(userVipInfo: UserVipInfo): React.ReactElement | null;

/**
 * 获取用户信息右上角图标
 * @param userVipInfo 用户会员信息
 */
export function getUserInfoTopRightIcon(userVipInfo: UserVipInfo): React.ReactElement;

/**
 * 获取会员配置
 * @param vipType 会员类型标识
 */
export function getConfig(vipType: string): VipConfig;

// ============================================================================
// VIP Configuration
// ============================================================================

/**
 * 会员配置接口
 */
export interface VipConfig {
  /** 配置名称（多语言key） */
  name: string;
  /** 图标URL（可能根据状态不同） */
  icon: string | Record<VipStatus, string>;
  /** 获取用户信息CSS类名 */
  getUserInfoClassName?: (userVipInfo: UserVipInfo) => string | undefined;
  /** 用户信息标题配置 */
  userInfoTitle: (userVipInfo: UserVipInfo) => { name?: string; color?: string };
  /** 获取用户信息项样式 */
  getUserInfoItemStyle?: (userVipInfo: UserVipInfo) => React.CSSProperties;
  /** 获取用户信息底部内容 */
  getUserInfoBottom?: (userVipInfo: UserVipInfo) => React.ReactElement | null;
  /** 获取用户信息右上角图标 */
  getUserInfoTopRightIcon?: (userVipInfo: UserVipInfo) => React.ReactElement;
  /** 获取悬浮按钮信息 */
  getFloatButtonInfo: (userVipInfo: UserVipInfo) => FloatButtonInfo | false;
}

// ============================================================================
// API Functions
// ============================================================================

/**
 * 获取用户VIP信息
 */
export function getUserVip(): Promise<UserVipInfo>;

/**
 * 获取VIP记录列表
 */
export function getVipRecords(): Promise<VipCycleRecord[]>;

/**
 * 检查VIP过期通知
 */
export function vipNoticeCheckExpire(): Promise<boolean>;

/**
 * 处理MTOP接口返回结果
 * @param promise 接口Promise
 */
export function handleMtopResult<T>(promise: Promise<unknown>): Promise<T>;

// ============================================================================
// Signal Type
// ============================================================================

/**
 * 信号对象（观察者模式）
 */
export interface Signal<T = unknown> {
  /** 监听信号 */
  listen(callback: (data: T) => void): void;
  /** 取消监听 */
  unlisten(callback: (data: T) => void): void;
  /** 触发信号 */
  dispatch(data: T): void;
}

// ============================================================================
// React Components Export
// ============================================================================

export declare const UserInfoItem: React.FC<UserInfoItemProps>;
export declare const FloatButton: React.FC<FloatButtonProps>;
export declare const Draggable: React.FC<DraggableProps>;
export declare const ScaleAble: React.FC<ScaleAbleProps>;
export declare const PricingMarket: React.ComponentClass<PricingMarketProps, PricingMarketState>;
export declare const ExpireTimeDesc: React.FC<{ userVipInfo: UserVipInfo }>;
export declare const RenewalButton: React.FC;

// ============================================================================
// Module Augmentation
// ============================================================================

declare global {
  interface Window {
    /** NWTK全局对象 */
    NWTK: {
      mtop: {
        User: {
          userVipGet(): Promise<unknown>;
          vipRecordsQuery(): Promise<unknown>;
          vipNoticeCheckExpire(): Promise<unknown>;
        };
        MemberGrade: {
          fetchVipCycleRecords(): Promise<unknown>;
        };
      };
    };
  }
}