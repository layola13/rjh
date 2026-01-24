/**
 * 开口实体类型声明
 * 表示建筑模型中的开口（门、窗等）实体
 * @module OpeningEntity
 */

import { AcceptEntity } from './AcceptEntity';
import { Parameter, DataType } from './Parameter';
import { PocketEntity } from './PocketEntity';
import { FaceEntity } from './FaceEntity';

/**
 * 面对象接口
 * 描述3D模型中的一个面
 */
interface Face {
  /** 面的唯一标识 */
  id: string;
  /** 面的材质信息 */
  material: {
    /** 是否为混合涂料 */
    mixpaint?: boolean;
    /** 材质来源标识 */
    seekId?: string;
  };
}

/**
 * 口袋对象接口
 * 表示开口中的嵌入式结构
 */
interface Pocket {
  /** 口袋的唯一标识 */
  id: string;
}

/**
 * 房间对象接口
 */
interface Room {
  /** 房间唯一标识 */
  id: string;
}

/**
 * 宿主对象接口
 * 表示开口所附着的墙体或其他结构
 */
interface Host {
  /** 宿主对象的唯一标识 */
  id: string;
}

/**
 * 父级对象接口
 */
interface Parent {
  /** 父级对象的唯一标识 */
  id: string;
}

/**
 * 内容对象接口
 * 表示从3D模型中获取的原始开口数据
 */
interface Content {
  /** 父级对象引用 */
  parent?: Parent;
  /** 侧面列表 */
  sideFaces: Face[];
  
  /**
   * 获取口袋对象
   * @returns 口袋对象或undefined
   */
  getPocket(): Pocket | undefined;
  
  /**
   * 检查是否启用了门石材质
   * @returns 是否启用
   */
  isDoorStoneMaterialEnabled(): boolean;
  
  /**
   * 获取底部面列表
   * @returns 底部面数组
   */
  getBottomFaces(): Face[];
  
  /**
   * 获取宿主对象
   * @returns 宿主对象或undefined
   */
  getHost(): Host | undefined;
}

/**
 * 实例数据接口
 * 包含实体的参数化数据
 */
interface InstanceData {
  /**
   * 获取参数值
   * @param name - 参数名称
   * @returns 参数值
   */
  getParameterValue(name: string): any;
  
  /**
   * 添加参数
   * @param parameter - 参数对象
   */
  addParameter(parameter: Parameter): void;
}

/**
 * 工具类接口
 * 提供格式化等工具方法
 */
interface Utils {
  /**
   * 格式化数字小数点
   * @param value - 要格式化的数值
   * @returns 格式化后的字符串
   */
  formatNumberPoints(value: number): string;
}

/**
 * HSCore命名空间
 */
declare namespace HSCore {
  namespace Util {
    namespace Room {
      /**
       * 获取开口所在的房间
       * @param content - 开口内容对象
       * @returns 房间对象或undefined
       */
      function getRoomOpeningIn(content: Content): Room | undefined;
    }
  }
}

/**
 * 开口实体类
 * 继承自AcceptEntity，表示建筑模型中的开口元素（门、窗等）
 * 负责解析开口的几何数据、材质信息和空间关系
 * 
 * @extends AcceptEntity
 * @example
 * const opening = new OpeningEntity();
 * opening.accept(contentData);
 */
export declare class OpeningEntity extends AcceptEntity {
  /**
   * 开口所属的房间ID
   * 用于标识该开口位于哪个房间中
   */
  roomId: string;

  /**
   * 构造函数
   * 初始化开口实体，设置默认的roomId为空字符串
   */
  constructor();

  /**
   * 构建子实体
   * 处理开口的嵌入结构（如口袋）和面数据
   * - 添加口袋实体（如果存在）
   * - 过滤并添加有效的侧面实体（排除底面和特定材质条件）
   * 
   * @param content - 从3D模型解析的开口内容对象
   * @protected
   */
  protected buildChildren(content: Content): void;

  /**
   * 构建实体数据
   * 设置实体的类型、分类和实例数据
   * 
   * @param content - 开口内容对象
   * @protected
   */
  protected buildEntityData(content: Content): void;

  /**
   * 获取实例数据
   * 从内容对象中提取并构建完整的参数化数据，包括：
   * - 面积：由尺寸计算得出（width * depth）
   * - 图层ID：父级对象的ID
   * - 是否属于两个房间：开口是否连接两个空间
   * - 房间ID：开口所在房间的标识
   * - 宿主ID：开口所附着墙体的标识
   * 
   * @param content - 开口内容对象
   * @returns 包含所有参数的实例数据对象
   * @protected
   */
  protected getInstanceData(content: Content): InstanceData;
}

/**
 * 工具函数：从内容生成实体类型
 * @param content - 内容对象
 * @returns 实体类型字符串
 */
export declare function genEntityTypeFromContent(content: Content): string;

/**
 * 工具函数：从内容生成分类数据
 * @param content - 内容对象
 * @returns 分类数据对象
 */
export declare function genCategoryDataFromContent(content: Content): any;

/**
 * 工具函数：从内容生成实例数据
 * @param content - 内容对象
 * @returns 实例数据对象
 */
export declare function genInstanceDataFromContent(content: Content): InstanceData;

/**
 * 工具函数：检查是否属于两个房间
 * @param content - 内容对象
 * @returns 是否属于两个房间
 */
export declare function checkBelongTwoRooms(content: Content): boolean;