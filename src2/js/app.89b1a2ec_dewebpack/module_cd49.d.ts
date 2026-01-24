/**
 * 倒计时组件属性接口
 */
interface CountDownProps {
  /** 开始时间 (格式: YYYY-MM-DD HH:mm:ss) */
  startTime: string | null;
  /** 结束时间 (格式: YYYY-MM-DD HH:mm:ss) */
  endTime: string;
}

/**
 * 倒计时组件数据接口
 */
interface CountDownData {
  /** 定时器ID */
  timer: number;
  /** 天数 (两位字符串) */
  day: string;
  /** 小时 (两位字符串) */
  hour: string;
  /** 分钟 (两位字符串) */
  minute: string;
  /** 秒数 (两位字符串) */
  second: string;
}

/**
 * 顶部导航栏组件数据接口
 */
interface NormalBarData {
  /** 是否全屏 */
  is_full: boolean;
  /** 活动信息 */
  activity_info: ActivityInfo;
  /** resize定时器 */
  resize_timer: number | null;
  /** 是否显示新标签 */
  show_new_tag: boolean;
  /** 是否显示设置对话框 */
  bar_show_setting_dialog: boolean;
  /** 点击计数 */
  tapCount: number;
  /** 是否显示活动 */
  showActivity: boolean;
  /** 活动信息内容 */
  activityInfo: string | ActivityDetail;
  /** 是否永久隐藏 */
  hideAlways: number | boolean;
}

/**
 * 活动信息接口
 */
interface ActivityInfo {
  /** 活动说明 */
  note?: string;
  /** 活动结束时间 */
  end_time?: string;
  /** 活动链接 */
  url?: string;
}

/**
 * 活动详情接口
 */
interface ActivityDetail {
  /** 优惠金额 */
  money?: string;
  /** 活动图片 */
  pic?: string;
  /** 状态 (1=进行中) */
  status?: number;
  /** 活动链接 */
  link?: string;
}

/**
 * 操作栏组件数据接口
 */
interface ActionBarData {
  /** 是否展开头部 */
  expand_head: boolean;
  /** 是否全屏 */
  is_full: boolean;
  /** 左侧操作列表 */
  action_list: ActionItem[];
  /** 右侧操作列表 */
  action_right_list: ActionItem[];
  /** 是否监听离开事件 */
  listen_leave: boolean;
  /** 是否隐藏小屏logo */
  hide_sm_logo: boolean;
  /** 是否隐藏小屏更多按钮 */
  hide_sm_more: boolean;
  /** 是否隐藏大部分操作 */
  hideMostOperation: boolean;
}

/**
 * 操作项接口
 */
interface ActionItem {
  /** 操作类型 */
  action: string;
  /** 图标类名 */
  icon?: string;
  /** 显示文本 */
  label?: string;
  /** 显示设置 (all/lg/md/sm/none) */
  show?: string;
}

/**
 * 应用根组件数据接口
 */
interface AppData {
  /** 版本标识 */
  v0: boolean;
  /** 是否正在刷新 */
  refreshing: boolean;
  /** Service Worker注册对象 */
  registration: ServiceWorkerRegistration | null;
  /** Snackbar按钮文本 */
  snackBtnText: string;
  /** Snackbar带按钮文本 */
  snackWithBtnText: string;
  /** 是否显示带按钮的Snackbar */
  snackWithButtons: boolean;
  /** 超时时间 */
  timeout: number;
  /** 是否隐藏大部分操作 */
  hideMostOperation: boolean;
  /** 是否显示截面预览对话框 */
  section_preview_dialog: boolean;
  /** 型材代码映射 */
  profileCodeMap: ProfileCodeMap;
  /** SVG内容 */
  svg: string;
  /** DXF Blob数据 */
  dxf_blob: Blob | string;
}

/**
 * 型材代码映射接口
 */
interface ProfileCodeMap {
  /** 框料 */
  frame: string;
  /** 固定压条 */
  fixedBead: string;
  /** 中挺 */
  mullion: string;
  /** 扇压条 */
  sashBead: string;
  /** 扇料 */
  Sash: string;
}

/**
 * 用户信息接口
 */
interface UserInfo {
  /** 用户ID */
  fid?: number;
  /** 手机号 */
  phone_number?: string;
  /** 父账号手机号 */
  f_phone_number?: string;
  /** 头像URL */
  header_img_url?: string;
  /** 是否试用版 */
  is_ty?: boolean;
  /** 版本类型 (1=设计版, 3=专业版, 6=旗舰版) */
  version_type?: number;
  /** 版本名称 */
  version?: string;
  /** 是否永久授权 */
  permanent?: boolean;
  /** 到期时间 */
  expiration_time?: string;
  /** 试用到期时间 */
  ty_expiration_time?: string;
}

/**
 * 通用对话框组件属性接口
 */
interface CommDialogProps {
  /** 对话框宽度 */
  width?: string;
  /** 是否可见 */
  visible?: boolean;
  /** 标题 */
  title?: string;
  /** 是否显示确认按钮 */
  confirmBtn?: boolean;
  /** 确认按钮文本 */
  confirmText?: string;
  /** 是否显示取消按钮 */
  cancelBtn?: boolean;
  /** 取消按钮文本 */
  cancelText?: string;
  /** 是否使用flex布局 */
  flex?: boolean;
  /** 是否固定按钮 */
  fixedBtn?: boolean;
  /** 是否可拖拽 */
  draggable?: boolean;
  /** 按钮宽度 */
  btnWidth?: number;
  /** 背景颜色 */
  bgColor?: string;
  /** 标题颜色 */
  titleColor?: string;
  /** 是否隐藏遮罩层 */
  hideOverlay?: boolean;
  /** 是否禁用点击动画 */
  noClickAnimation?: boolean;
  /** 是否暗色主题 */
  dark?: boolean;
  /** 自定义样式类 */
  customClass?: string;
  /** 是否全屏 */
  fullscreen?: boolean;
}

/**
 * Axios响应数据接口
 */
interface ApiResponse<T = unknown> {
  /** 状态码 */
  code: number;
  /** 响应数据 */
  data?: T;
  /** 响应消息 */
  message?: string;
  /** 错误信息 */
  errors?: Record<string, string[]>;
}

/**
 * HTTP请求方法接口
 */
interface AxiosInstance {
  /** POST请求 */
  post<T = unknown>(url: string, data?: unknown): Promise<ApiResponse<T>>;
  /** GET请求 */
  get<T = unknown>(url: string, params?: unknown): Promise<ApiResponse<T>>;
  /** PUT请求 */
  put<T = unknown>(url: string, data?: unknown): Promise<ApiResponse<T>>;
  /** DELETE请求 */
  delete<T = unknown>(url: string, data?: unknown): Promise<ApiResponse<T>>;
  /** 活动接口GET请求 */
  getActivity<T = unknown>(url: string): Promise<{ data: { data: T } }>;
}

/**
 * 路由元信息接口
 */
interface RouteMeta {
  /** 是否需要认证 */
  requireAuth?: boolean;
  /** 是否独立页面 */
  independence?: boolean;
  /** 是否固定展开 */
  fixedExpend?: boolean;
  /** 是否显示额外添加按钮 */
  showExtraAddBtn?: boolean;
  /** 是否保持SunnyHouse存活 */
  keepSunnyHouseAlive?: boolean;
  /** 是否隐藏添加按钮 */
  hideAddBtn?: boolean;
  /** 页面标题 */
  title?: string;
  /** Axios路径 */
  axiosPath?: string;
}

/**
 * 提示消息类型
 */
type AlertType = 'warning' | 'success' | 'info' | 'error';

/**
 * 消息提示接口
 */
interface VMessageAPI {
  /** 警告消息 */
  warning(message: string, callback?: () => void): void;
  /** 成功消息 */
  success(message: string, callback?: () => void): void;
  /** 信息消息 */
  info(message: string, callback?: () => void): void;
  /** 错误消息 */
  error(message: string, callback?: () => void): void;
}

/**
 * 截面数据项接口
 */
interface ProfileStructItem {
  /** 型材代码 */
  profile?: string;
  /** 类型 */
  type?: string;
  /** 子项列表 */
  items?: ProfileStructItem[];
}

/**
 * 型材关系配置接口
 */
interface ProfileRelation {
  /** 源型材 */
  profile_from: string;
  /** 目标型材 */
  profile_to: string;
  /** 交叉值 */
  cross_value: number;
  /** 偏移值 */
  offset_value: string;
}

/**
 * 型材DXF配置接口
 */
interface ProfileDXF {
  /** 型材代码 */
  profile: string;
  /** DXF文件路径 */
  dxf_path: string;
}

/**
 * Vuex Store状态接口
 */
interface RootState {
  /** 是否显示活动栏 */
  activity_bar_show: boolean;
  /** 全局加载状态 */
  global_loading: boolean;
  /** 是否显示购买对话框 */
  pleasegobuy_dialog: boolean;
  /** 是否显示权限不足对话框 */
  lackauthority_dialog: boolean;
  /** 用户信息 */
  userinfo: UserInfo;
  /** 用户设置 */
  userSettings: Record<string, unknown>;
  /** XXF数据 */
  xxfData: Record<string, unknown>;
  /** 信息步骤 */
  infoStep: number;
  /** 活动数据 */
  activityData: Record<string, unknown>;
  /** 是否为APP环境 */
  isApp: boolean;
}

/**
 * Vue实例扩展接口
 */
declare module 'vue/types/vue' {
  interface Vue {
    /** Axios实例 */
    $axios: AxiosInstance;
    /** 消息提示 */
    $VMessage: VMessageAPI;
    /** 警告提示 */
    $VAlert: VMessageAPI;
    /** 事件总线 */
    bus: Vue;
    /** Cookies操作 */
    $cookies: {
      remove(key: string): void;
      set(key: string, value: unknown): void;
      get(key: string): unknown;
    };
  }
}

export {
  CountDownProps,
  CountDownData,
  NormalBarData,
  ActivityInfo,
  ActivityDetail,
  ActionBarData,
  ActionItem,
  AppData,
  ProfileCodeMap,
  UserInfo,
  CommDialogProps,
  ApiResponse,
  AxiosInstance,
  RouteMeta,
  AlertType,
  VMessageAPI,
  ProfileStructItem,
  ProfileRelation,
  ProfileDXF,
  RootState
};