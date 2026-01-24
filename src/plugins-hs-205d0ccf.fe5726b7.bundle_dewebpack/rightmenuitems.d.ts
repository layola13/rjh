/**
 * 右键菜单项标志位枚举
 * 使用位掩码（bit flags）表示不同的菜单项
 */
export enum RightMenuItems {
  /** 替换功能标志 */
  REPLACE_FLAG = 1,
  
  /** 剪切功能标志 */
  CUT_FLAG = 2,
  
  /** 复制功能标志 */
  COPY_FLAG = 4,
  
  /** 粘贴功能标志 */
  PASTE_FLAG = 8,
  
  /** 复制（重复）功能标志 */
  DUPLACATE_FLAG = 16,
  
  /** 镜像功能标志 */
  MIRROR_FLAG = 32,
  
  /** 成组功能标志 */
  GROUP_FLAG = 64,
  
  /** 隐藏功能标志 */
  HIDE_FLAG = 128,
  
  /** 重置功能标志 */
  RESET_FLAG = 256,
  
  /** 删除功能标志 */
  DELETE_FLAG = 512,
  
  /** 清空功能标志 */
  EMPLETY_FLAG = 1024,
  
  /** 清空平面图功能标志 */
  EMPLETY_FLOORPLAN_FLAG = 2048,
  
  /** 信息功能标志 */
  INFO_FLAG = 4096,
  
  /** 属性功能标志 */
  PROPERTY_FLAG = 8192,
  
  /** 收藏功能标志 */
  FAVORITE_FLAG = 16384,
  
  /** 报告功能标志 */
  REPORT_FLAG = 32768,
  
  /** 材质功能标志 */
  MATERIAL_FLAG = 65536,
  
  /** 锁定功能标志 */
  LOCK_FLAG = 131072
}

/**
 * 右键菜单状态预设组合
 * 通过组合多个菜单项标志位，定义不同场景下可用的菜单选项
 */
export enum RightMenuStatus {
  /** 分组选择状态：包含替换、剪切、复制、粘贴、复制、镜像、成组、隐藏、重置、删除、清空、清空平面图、信息、属性、收藏 */
  FLAG_GROUP_SELECT = 130815,
  
  /** 转角窗状态：包含替换、剪切、复制、粘贴、复制、镜像、成组、隐藏、重置、删除、清空、清空平面图、信息、属性、收藏、锁定 */
  FLAG_CORNER_WINDOW = 131039,
  
  /** 柜体选择状态：包含替换、剪切、复制、粘贴、复制、镜像、成组、隐藏、重置、删除、清空、信息 */
  FLAG_CABINET_SELECT = 4095,
  
  /** 墙面选择状态：包含属性、收藏、报告 */
  FLAG_WALL_FACE_SELECT = 32640,
  
  /** 房间面选择状态：包含属性、报告 */
  FLAG_ROOM_FACE_SELECT = 32512,
  
  /** DIY内容类型状态：包含替换、剪切、复制、粘贴、复制、镜像、成组、隐藏、重置、删除、清空、清空平面图、信息、属性、收藏、锁定 */
  FLAG_DIY_CONTENT_TYPE = 147455,
  
  /** 墙内容类型状态：包含清空、清空平面图、信息、属性 */
  FLAG_WALL_CONTENT_TYPE = 11904,
  
  /** 房间内容类型状态：包含清空、信息、属性 */
  FLAG_ROOM_CONTENT_TYPE = 11776,
  
  /** 台面选择状态：包含清空、信息 */
  FLAG_COUNTERTOP_SELECT = 3584,
  
  /** 平面图柜体状态：包含镜像、重置、删除 */
  FLAG_STATUS_FP_CABINET = 528,
  
  /** 环境内容选择状态：包含替换、剪切、复制、粘贴、复制、镜像、成组、隐藏、重置、删除、清空、信息 */
  FLAG_CONTENT_ENV_SELECT = 4095,
  
  /** 无内容选择状态：包含清空、清空平面图 */
  FLAG_NONE_CONTENT_SELECT = 3072,
  
  /** 自定义内容类型状态：包含剪切、复制、粘贴、复制、镜像、成组、隐藏、重置、删除、清空、清空平面图、信息、属性、收藏、锁定 */
  FLAG_CUSTOM_CONTENT_TYPE = 77566,
  
  /** 开口内容类型状态：包含替换、剪切、复制、粘贴、复制、镜像、成组、隐藏、重置、删除、清空、清空平面图、信息、属性、收藏、锁定 */
  FLAG_OPENING_CONTENT_TYPE = 131039,
  
  /** 通用内容选择状态：包含替换、剪切、复制、粘贴、复制、镜像、成组、隐藏、重置、删除、清空、清空平面图、信息、属性、收藏、锁定 */
  FLAG_COMMON_CONTENT_SELECT = 131071,
  
  /** 地板选择状态：包含清空、信息、属性、收藏、报告 */
  FLAG_FLOOR_SELECT = 27904
}

/**
 * 类型定义：右键菜单项标志位类型
 */
export type RightMenuItemsType = typeof RightMenuItems;

/**
 * 类型定义：右键菜单状态类型
 */
export type RightMenuStatusType = typeof RightMenuStatus;