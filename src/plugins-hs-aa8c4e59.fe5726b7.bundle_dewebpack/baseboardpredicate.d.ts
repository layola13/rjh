/**
 * 模型类型谓词模块
 * 提供各种建筑构件类型的判断谓词类
 */

import { Predicate } from './Predicate';
import { ModelClassName } from './ModelClassName';

/**
 * 模型类型信息接口
 */
export interface ModelType {
  /** 类别类型 */
  classType: ModelClassName;
  /** 内容类型 */
  contentType?: string;
}

/**
 * 模型分类信息接口
 */
export interface ModelCategory {
  /** 分类类型 */
  categoryType: string;
}

/**
 * 可执行谓词判断的模型接口
 */
export interface ModelEntity {
  /** 模型类型 */
  type: ModelType;
  /** 模型分类（可选） */
  category?: ModelCategory;
}

/**
 * 基础类型谓词
 * 根据classType、contentType和categoryType判断模型是否匹配
 */
export declare class TypePredicate extends Predicate {
  /** 类别类型 */
  readonly classType: ModelClassName;
  /** 内容类型（可选） */
  readonly contentType?: string;
  /** 分类类型（可选） */
  readonly categoryType?: string;

  /**
   * 构造函数
   * @param classType - 模型类别类型
   * @param contentType - 内容类型（可选）
   * @param categoryType - 分类类型（可选）
   */
  constructor(classType: ModelClassName, contentType?: string, categoryType?: string);

  /**
   * 执行谓词判断
   * @param entity - 待判断的模型实体
   * @returns 是否匹配谓词条件
   */
  execute(entity: ModelEntity): boolean;
}

/**
 * 图层谓词
 * 判断模型是否为图层类型
 */
export declare class LayerPredicate extends TypePredicate {
  constructor();
}

/**
 * 房间谓词
 * 判断模型是否为房间类型
 */
export declare class RoomPredicate extends TypePredicate {
  constructor();
}

/**
 * 类型数组谓词
 * 根据多个classType进行判断
 */
export declare class TypeArrayPredicate extends Predicate {
  /** 类别类型集合 */
  readonly classTypes: Set<ModelClassName>;
  /** 内容类型（可选） */
  readonly contentType?: string;
  /** 分类类型（可选） */
  readonly categoryType?: string;

  /**
   * 构造函数
   * @param classTypes - 类别类型数组
   * @param contentType - 内容类型（可选）
   * @param categoryType - 分类类型（可选）
   */
  constructor(classTypes: ModelClassName[], contentType?: string, categoryType?: string);

  /**
   * 执行谓词判断
   * @param entity - 待判断的模型实体
   * @returns 是否匹配谓词条件
   */
  execute(entity: ModelEntity): boolean;
}

/**
 * 面谓词
 * 判断模型是否为地面、面或天花板类型
 */
export declare class FacePredicate extends TypeArrayPredicate {
  constructor();
}

/**
 * 墙体谓词
 * 判断模型是否为墙体类型
 */
export declare class WallPredicate extends TypePredicate {
  constructor();
}

/**
 * 板材谓词
 * 判断模型是否为板材类型
 */
export declare class SlabPredicate extends TypePredicate {
  constructor();
}

/**
 * 铺装谓词
 * 判断模型是否为混合涂料铺装类型
 */
export declare class PavePredicate extends TypePredicate {
  constructor();
}

/**
 * 开口谓词
 * 判断模型是否为洞口、门、窗或开口类型
 */
export declare class OpeningPredicate extends TypeArrayPredicate {
  constructor();
}

/**
 * 参数化窗谓词
 * 判断模型是否为参数化窗户类型（转角窗、飘窗、转角平窗、普通窗）
 */
export declare class ParametricWindowPredicate extends TypeArrayPredicate {
  constructor();
}

/**
 * 参数化开口谓词
 * 判断模型是否为参数化开口类型
 */
export declare class ParametricOpeningPredicate extends TypeArrayPredicate {
  constructor();
}

/**
 * 窗套谓词
 * 判断模型是否为窗套类型
 */
export declare class PocketPredicate extends TypePredicate {
  constructor();
}

/**
 * 参数化窗套谓词
 * 判断模型是否为参数化窗套或自定义模型线脚类型
 */
export declare class ParametricPocketPredicate extends TypeArrayPredicate {
  constructor();
}

/**
 * 内容物谓词
 * 判断模型是否为内容物、软布或窗帘类型
 */
export declare class ContentPredicate extends TypeArrayPredicate {
  constructor();
}

/**
 * 普通线脚谓词
 * 判断模型是否为线脚、墙面线脚、顶角线或踢脚线类型
 */
export declare class NormalMoldingPredicate extends TypeArrayPredicate {
  constructor();
}

/**
 * 自定义线脚谓词
 * 判断模型是否为自定义线脚、灯槽或灯带类型
 */
export declare class CustomizedMoldingPredicate extends TypeArrayPredicate {
  constructor();
}

/**
 * 新版自定义线脚谓词
 * 判断模型是否为新版自定义线脚、灯槽或灯带类型
 */
export declare class NCustomizedMoldingPredicate extends TypeArrayPredicate {
  constructor();
}

/**
 * 顶角线谓词
 * 判断模型是否为顶角线类型
 */
export declare class CornicePredicate extends TypeArrayPredicate {
  constructor();
}

/**
 * 踢脚线谓词
 * 判断模型是否为踢脚线类型
 */
export declare class BaseboardPredicate extends TypeArrayPredicate {
  constructor();
}

/**
 * 自定义背景墙谓词
 * 判断模型是否为自定义背景墙类型（新版或旧版）
 */
export declare class CustomizedBackgroundWallPredicate extends TypeArrayPredicate {
  constructor();
}

/**
 * 自定义吊顶谓词
 * 判断模型是否为自定义吊顶类型（新版或旧版）
 */
export declare class CustomizedCeilingPredicate extends TypeArrayPredicate {
  constructor();
}

/**
 * 自定义地台谓词
 * 判断模型是否为自定义地台类型（新版或旧版）
 */
export declare class CustomizedPlatformPredicate extends TypeArrayPredicate {
  constructor();
}

/**
 * 隐蔽工程谓词
 * 判断模型是否为隐蔽工程类型
 */
export declare class ConcealedWorkPredicate extends TypePredicate {
  constructor();
}

/**
 * 参数化窗台谓词
 * 判断模型是否为参数化窗台类型
 */
export declare class NParametricWindowSillPredicate extends TypeArrayPredicate {
  constructor();
}