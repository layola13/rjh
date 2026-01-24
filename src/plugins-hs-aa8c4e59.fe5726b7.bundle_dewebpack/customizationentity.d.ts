/**
 * CustomizationEntity 模块类型定义
 * 用于处理定制化实体的核心类，支持橱柜、衣柜等家居定制场景
 */

import { HSCore, HSConstants } from './HSCore';
import { Parameter, InstanceData, DataType } from './InstanceData';
import { AcceptEntity } from './AcceptEntity';
import { CustomizationParamKey, CustomizationContentType } from './CustomizationTypes';

/**
 * 样式和材质信息接口
 */
export interface SAMInfo {
  /** 资源唯一标识 */
  seekId?: string;
  /** 分类ID */
  category?: string;
  /** 显示名称 */
  name?: string;
  /** 阿里模型ID */
  aliModel?: string;
}

/**
 * 材质信息接口
 */
export interface MaterialInfo {
  /** 资源唯一标识 */
  seekId?: string;
  /** 分类类型 */
  category?: string;
  /** 显示名称 */
  name?: string;
  /** 阿里模型ID */
  aliModel?: string;
}

/**
 * 详细卡片子项数据
 */
export interface DetailCardChild {
  /** 样式信息 */
  style?: SAMInfo;
  /** 材质信息 */
  material?: SAMInfo;
}

/**
 * 详细卡片信息
 */
export interface DetailCardInfo {
  /** 样式信息 */
  style?: SAMInfo;
  /** 材质信息 */
  material?: MaterialInfo;
}

/**
 * 详细卡片数据结构
 */
export interface DetailCardData {
  /** 基础信息 */
  info: DetailCardInfo;
  /** 子项列表 */
  children: DetailCardChild[];
}

/**
 * 分类数据接口
 */
export interface CategoryData {
  /** 分类类型 */
  categoryType?: string;
  /** 显示名称 */
  displayName?: string;
  /** 阿里模型ID */
  aliModelId?: string;
  /** 尺寸 [长, 宽, 高] */
  size?: [number, number, number];
}

/**
 * 定制化实体类
 * 继承自 AcceptEntity，用于处理家居定制场景中的各类实体对象
 * 支持橱柜、衣柜、门板、抽屉等多种定制化组件
 */
export declare class CustomizationEntity extends AcceptEntity {
  /**
   * 验证分类UUID列表
   * 包含所有支持的定制化组件分类标识
   */
  private static readonly _validateCategories: readonly string[];

  /**
   * 验证分类枚举名称列表
   * 与 _validateCategories 一一对应，提供可读性更强的枚举名
   */
  private static readonly _validateCategoriesEnum: readonly string[];

  /**
   * 分类数据
   */
  category?: CategoryData;

  /**
   * 源数据对象
   */
  source?: HSCore.Model.DContent;

  /**
   * 接受并处理内容对象
   * @param content - HSCore 内容模型对象
   * @returns 当前实例（支持链式调用）
   */
  accept(content: HSCore.Model.DContent): this;

  /**
   * 构建实体数据
   * 设置实例数据、类型和分类信息
   * @param content - HSCore 内容模型对象
   */
  buildEntityData(content: HSCore.Model.DContent): void;

  /**
   * 构建详细卡片数据
   * 将详细卡片数据作为参数添加到实例中
   * @param content - HSCore 内容模型对象
   */
  buildDetailCardData(content: HSCore.Model.DContent): void;

  /**
   * 获取详细卡片数据
   * 根据内容类型（造型、台面组件、普通组件）生成不同结构的卡片数据
   * @param content - HSCore 内容模型对象
   * @returns 详细卡片数据结构
   */
  getDetailCardData(content: HSCore.Model.DContent): DetailCardData;

  /**
   * 递归获取子项数据
   * @param entity - 定制化实体或其他实体对象
   * @param childrenArray - 用于存储子项数据的数组
   */
  private getData(entity: CustomizationEntity, childrenArray: DetailCardChild[]): void;

  /**
   * 获取材质信息
   * @param materialParam - 材质参数对象
   * @returns 材质信息或 undefined
   */
  private getMaterial(materialParam?: Parameter): MaterialInfo | undefined;

  /**
   * 获取样式和材质信息（SAM: Style And Material）
   * @param metadata - 元数据对象
   * @returns SAM 信息或 undefined
   */
  private getSAMInfo(metadata?: any): SAMInfo | undefined;

  /**
   * 构建子实体
   * 递归创建所有有效的子定制化实体
   * @param content - 父级内容对象
   */
  buildChildren(content: HSCore.Model.DContent): void;

  /**
   * 获取实例数据
   * 提取房间ID、定制化类型等关键参数
   * @param content - HSCore 内容模型对象
   * @returns 实例数据对象
   */
  getInstanceData(content: HSCore.Model.DContent): InstanceData;

  /**
   * 递归创建子实体
   * 遍历内容对象的子项，验证并创建符合条件的定制化实体
   * @param content - 父级内容对象
   */
  private _createChildRecursively(content: HSCore.Model.DContent): void;

  /**
   * 验证组件是否为有效的定制化组件
   * 检查内容类型或分类是否在支持列表中
   * @param content - 待验证的内容对象
   * @returns 是否为有效定制化组件
   */
  private _validatecomponent(content: HSCore.Model.DContent): boolean;

  /**
   * 获取完整的分类数据
   * 包含基础分类信息和尺寸数据
   * @param content - HSCore 内容模型对象
   * @returns 完整的分类数据
   */
  getCompleteCategoryData(content: HSCore.Model.DContent): CategoryData;

  /**
   * 获取基础分类数据
   * 从内容对象生成分类数据（不包含尺寸）
   * @param content - HSCore 内容模型对象
   * @returns 基础分类数据
   */
  private _getBaseCategoryData(content: HSCore.Model.DContent): CategoryData;
}

/**
 * 支持的定制化组件分类枚举
 */
export type CustomizationCategoryType =
  | 'wallCabinet'              // 吊柜
  | 'wallCabinetSub'           // 吊柜子柜
  | 'wallCabinetCorner'        // 吊柜转角柜
  | 'wallCabinetFiveAngle'     // 吊柜五角柜
  | 'floorCabinet'             // 地柜
  | 'floorCabinetSub'          // 地柜子柜
  | 'floorCabinetCorner'       // 地柜转角柜
  | 'floorCabinetFiveAngle'    // 地柜五角柜
  | 'counter'                  // 台面
  | 'wardrobeBase'             // 衣柜底柜
  | 'wardrobeBaseSub'          // 衣柜底柜子柜
  | 'wardrobeTop'              // 衣柜顶柜
  | 'wardrobeTopSub'           // 衣柜顶柜子柜
  | 'wardrobeTopCorner'        // 衣柜顶柜转角
  | 'wardrobeTopFiveAngle'     // 衣柜顶柜五角
  | 'universalBaseCabinet'     // 通用底柜
  | 'universalBaseCabinetSub'  // 通用底柜子柜
  | 'universalBaseCabinetCorner' // 通用底柜转角
  | 'universalBaseCabinetFiveAngle' // 通用底柜五角
  | 'universalWallCabinet'     // 通用吊柜
  | 'universalWallCabinetSub'  // 通用吊柜子柜
  | 'universalWallCabinetCorner' // 通用吊柜转角
  | 'universalWallCabinetFiveAngle' // 通用吊柜五角
  | 'tatami'                   // 榻榻米
  | 'functionCabinet'          // 功能柜
  | 'wallPanel'                // 墙板
  | 'romanColumn'              // 罗马柱
  | 'sealPlate'                // 封板
  | 'seeLightBoard'            // 见光板
  | 'externalPanel'            // 外侧板
  | 'externalFascia'           // 外立面
  | 'coveredDoor'              // 覆盖门
  | 'cuttedDoorPanel'          // 裁切门板
  | 'slidingDoorLeaf'          // 移门门扇
  | 'drawer'                   // 抽屉
  | 'handle'                   // 拉手
  | 'cabinetHandle'            // 柜体拉手
  | 'embeddedHandle'           // 嵌入式拉手
  | 'basket'                   // 拉篮
  | 'sink'                     // 水槽
  | 'rangeHood'                // 油烟机
  | 'cooktop';                 // 灶具