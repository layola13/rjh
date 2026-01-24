/**
 * 会员管理器模块
 * 负责查询和管理用户会员信息，包括会员类型、付费状态等
 */

/**
 * 会员信息接口
 */
export interface MemberInfo {
  /** 会员类型：1-普通用户, 4-企业用户 */
  memberType: number;
  /** 是否为设计师会员 */
  stylerMember: boolean;
  /** 是否为作品集会员 */
  portfolioMember?: boolean;
  /** 是否为付费会员 */
  paidMember: boolean;
  /** 是否为有效会员 */
  validMember: boolean;
  /** 企业信息（仅企业用户） */
  enterpriseInfo?: GroupInfo | false;
  /** 最新渲染的会员类型（仅企业用户） */
  latestRenderMemberType?: number;
}

/**
 * 企业组信息接口
 */
export interface GroupInfo {
  /** 是否为付费会员 */
  paidMember: boolean;
  /** 是否为有效会员 */
  validMember: boolean;
  /** 最新渲染的会员类型 */
  latestRenderMemberType?: number;
}

/**
 * 会员数据原始结构（来自服务端）
 */
export interface MemberData {
  /** 是否为企业组用户 */
  groupUser?: boolean;
  /** 企业组信息 */
  groupInfo?: GroupInfo;
  /** 会员类型 */
  memberType?: number;
  /** 是否为设计师会员 */
  stylerMember?: boolean;
  /** 是否为作品集会员 */
  portfolioMember?: boolean;
}

/**
 * 查询会员信息返回结果
 */
export interface QueryMemberResult {
  /** 格式化后的会员信息 */
  memberInfo: MemberInfo;
  /** 原始会员数据 */
  data: MemberData;
}

/**
 * 全局Window接口扩展
 */
declare global {
  interface Window {
    /** 缓存的用户会员信息（用后即焚） */
    userMemberInfo?: MemberData | null;
  }
}

/**
 * 会员管理器类
 * 提供会员信息查询、更新和格式化功能
 */
export declare class MemberManager {
  /** 格式化后的会员信息 */
  private memberInfo: MemberInfo;
  
  /** 原始会员数据 */
  private memberData?: MemberData;

  /**
   * 构造函数
   * 初始化默认会员信息
   */
  constructor();

  /**
   * 查询会员信息
   * 通过Mtop接口获取用户的会员等级和积分信息
   * @returns Promise<QueryMemberResult> 包含会员信息和原始数据的对象
   */
  queryMemberInfo(): Promise<QueryMemberResult>;

  /**
   * 更新会员信息
   * 优先使用window.userMemberInfo缓存，否则调用接口查询
   * @param forceQuery - 是否强制查询接口（默认true），为false时若已有缓存数据则不再查询
   * @returns Promise<QueryMemberResult> 包含会员信息和原始数据的对象
   */
  updateMemberInfo(forceQuery?: boolean): Promise<QueryMemberResult>;

  /**
   * 格式化会员信息
   * 将服务端返回的原始数据转换为标准的MemberInfo结构
   * @param data - 原始会员数据
   * @returns MemberInfo 格式化后的会员信息
   */
  private getMemberInfo(data: MemberData): MemberInfo;
}