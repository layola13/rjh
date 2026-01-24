/**
 * 拍照功能数据模型模块
 * 提供拍照相关的数据结构定义
 */

/**
 * 拍照数据容器类
 * 用于管理多个拍照项的集合
 */
export declare class TakePhotoData {
  /**
   * 拍照项数组
   */
  data: TakePhotoItem[];

  /**
   * 构造函数
   * 初始化空的拍照项数组
   */
  constructor();
}

/**
 * 拍照项类
 * 表示单个拍照记录或配置项
 */
export declare class TakePhotoItem {
  constructor();
}

/**
 * 拍照背景参数类
 * 用于配置拍照时的背景相关参数
 */
export declare class TakePhotoBackgroundPara {
  constructor();
}