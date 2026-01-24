/**
 * Vuex Store Module
 * 
 * 应用全局状态管理模块，包含用户信息、权限对话框、画布数据等状态
 * 
 * @module VuexStore
 * @dependencies Vue, Vuex
 */

import Vue from 'vue';
import Vuex, { Store, GetterTree, MutationTree, ActionTree } from 'vuex';

/**
 * 用户信息接口
 */
export interface UserInfo {
  /** 用户ID */
  id: number;
  /** 工厂ID */
  fid?: number;
  /** 其他用户属性 */
  [key: string]: unknown;
}

/**
 * API令牌信息
 */
export interface ApiTokenInfo {
  /** 令牌字符串 */
  api_token: string;
  /** 过期时间 */
  expiration_time?: string;
  /** 用户信息 */
  user_info?: UserInfo;
}

/**
 * 用户设置接口
 */
export interface UserSettings {
  /** 长度单位: "0"=mm, "1"=cm, "2"=in */
  lenUnit?: '0' | '1' | '2';
  /** 其他设置 */
  [key: string]: unknown;
}

/**
 * 画布管理器接口
 */
export interface ShapeManager {
  /** 是否只读模式 */
  readonly: boolean;
}

/**
 * 画布对象接口
 */
export interface Canvas {
  /** 形状管理器 */
  shapeManager: ShapeManager;
  /** 其他画布属性 */
  [key: string]: unknown;
}

/**
 * 活动数据键值对
 */
export interface ActivityDataPayload {
  /** 键名 */
  key: string;
  /** 键值 */
  value: unknown;
}

/**
 * 公司模块配置
 */
export interface CompanyModules {
  /** 脚本模块 */
  script?: number;
  /** 多边形模块 */
  polygon?: number;
  /** 其他模块 */
  [key: string]: number | undefined;
}

/**
 * 长度单位返回类型
 */
export interface LengthUnit {
  /** 尺寸单位 */
  size: 'mm' | 'cm' | 'in';
  /** 面积单位 */
  area: '㎡' | 'sq.ft';
}

/**
 * 断点名称类型
 */
export type BreakpointName = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Vuex断点对象
 */
export interface VuexBreakpoint {
  /** 断点名称 */
  name: BreakpointName;
}

/**
 * 根状态接口
 */
export interface RootState {
  /** 购买对话框显示状态 */
  pleasegobuy_dialog: boolean;
  /** 缺少权限对话框显示状态 */
  lackauthority_dialog: boolean;
  /** 用户信息 */
  userinfo: UserInfo;
  /** 工具栏按钮操作 */
  barbtnaction: (() => void) | null;
  /** 活动栏显示状态 */
  activity_bar_show: boolean;
  /** 画布对象 */
  canvas: Canvas | null;
  /** 数据数组 */
  data: unknown[];
  /** 全局加载状态 */
  global_loading: boolean;
  /** 信息步骤 */
  infoStep: number | null;
  /** 用户设置 */
  userSettings: UserSettings;
  /** 阳光房数据 */
  sunnyhouse: unknown | null;
  /** XXF数据 */
  xxfData: Record<string, unknown>;
  /** 是否为App环境 */
  isApp: boolean;
  /** 活动数据 */
  activityData: Record<string, unknown>;
}

/**
 * Mutations类型定义
 */
export interface Mutations extends MutationTree<RootState> {
  /** 设置购买对话框状态 */
  Setpleasegobuy_dialog(state: RootState, value: boolean): void;
  /** 设置缺少权限对话框状态 */
  Setlackauthority_dialog(state: RootState, value: boolean): void;
  /** 获取并设置用户信息 */
  GET_USER(state: RootState, data: ApiTokenInfo | UserInfo): void;
  /** 设置活动栏显示状态 */
  set_activity_bar_show(state: RootState, value: boolean): void;
  /** 设置画布对象 */
  setCanvas(state: RootState, canvas: Canvas): void;
  /** 设置数据数组 */
  setData(state: RootState, data: unknown[]): void;
  /** 设置为非只读模式 */
  setReadOnly(state: RootState): void;
  /** 设置全局加载状态 */
  setGlobalLoading(state: RootState, value: boolean): void;
  /** 设置信息步骤 */
  setInfoStep(state: RootState, step: number | null): void;
  /** 设置用户设置 */
  setUserSettings(state: RootState, settings: UserSettings): void;
  /** 设置阳光房数据 */
  setSunnyhouse(state: RootState, data: unknown): void;
  /** 设置XXF数据 */
  setXxfData(state: RootState, data: Record<string, unknown>): void;
  /** 设置是否为App环境 */
  setIsApp(state: RootState, isApp: boolean): void;
  /** 设置活动数据 */
  setActivityData(state: RootState, payload: ActivityDataPayload): void;
}

/**
 * Getters类型定义
 */
export interface Getters extends GetterTree<RootState, RootState> {
  /** 获取变量类型 */
  gettype(): (value: unknown) => string;
  /** 判断是否为移动设备 */
  isMobileDevice(): boolean;
  /** 判断是否为移动手机 */
  isMobilePhone(): boolean;
  /** 判断是否为小屏幕 */
  is_small_screen(): (state: { breakpoint: VuexBreakpoint }) => boolean;
  /** 获取URL查询参数 */
  getQueryVariable(): (key: string, url?: string) => string | undefined;
  /** 判断是否可以使用指定模块 */
  canUseModule(): (moduleName: string) => boolean;
  /** 判断是否为WebView环境 */
  isWebView(): boolean;
  /** 获取打印URL */
  getPrintUrl(state: RootState): (ids: string) => string;
  /** 获取用户类型 */
  userType(state: RootState): 'sl' | 'ty' | 'sj';
  /** 获取长度单位 */
  getLenUnit(state: RootState): LengthUnit;
  /** 判断是否为微信环境 */
  isMicromessenger(): boolean;
  /** 判断是否为苹果设备 */
  isAppleDevice(): boolean;
  /** 判断是否为头条小程序 */
  isToutiaoMicroApp(): boolean;
  /** 判断是否为微信小程序 */
  isMp(): boolean;
}

/**
 * Actions类型定义
 */
export type Actions = ActionTree<RootState, RootState>;

declare const store: Store<RootState>;
export default store;