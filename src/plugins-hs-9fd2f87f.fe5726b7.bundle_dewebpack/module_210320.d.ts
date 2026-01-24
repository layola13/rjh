/**
 * 柜体子内容高度调整事务请求
 * 用于处理台面高度变化时，自动调整柜体上方内容（如水槽、装饰件等）的Z轴位置
 */

import { Transaction, Model } from 'HSCore';
import { ContentTypeEnum } from 'HSCatalog';

/**
 * 内容项的Z轴位置信息
 * [原始Z位置, 调整后Z位置]
 */
type PositionTuple = [originalZ: number, adjustedZ: number];

/**
 * 柜体内容映射表
 * Key: 内容对象
 * Value: 位置元组
 */
type ContentMap = Map<any, PositionTuple>;

/**
 * 柜体映射表
 * Key: 柜体对象
 * Value: 该柜体的内容映射表
 */
type CabinetMap = Map<any, ContentMap>;

/**
 * 对象元数据中的平面信息接口
 */
interface ObjectPlaneInfo {
  metadata?: {
    extension?: {
      objInfo?: {
        planes?: {
          cbnt_snap_plane?: {
            points?: Array<{ z?: number }>;
          };
        };
      };
    };
    contentType?: any;
  };
}

/**
 * 柜体接口
 */
interface Cabinet {
  /** Z轴位置 */
  z: number;
  /** Z轴长度 */
  ZLength: number;
  /** Z轴缩放比例 */
  ZScale: number;
  /** 柜体内的内容项 */
  contents: Record<string, Content>;
  /** 内容类型 */
  contentType: any;
  /** 获取子元素 */
  getChild(moldingType: Model.CabinetMoldingEnum): MoldingChild | null;
}

/**
 * 内容项接口
 */
interface Content {
  /** 内容类型 */
  contentType: any;
  /** Z轴位置（可修改） */
  z: number;
  /** 元数据 */
  metadata?: unknown;
}

/**
 * 线条装饰子元素接口
 */
interface MoldingChild {
  /** 路径数组 */
  paths?: Array<Array<{ z?: number }>>;
}

/**
 * 柜体子内容高度调整事务请求类
 * 继承自HSCore事务请求基类
 * 
 * @remarks
 * 当台面高度发生变化时，此类负责：
 * 1. 记录所有需要调整的内容项的原始位置
 * 2. 计算并应用新的Z轴位置
 * 3. 支持撤销/重做操作
 */
declare class CabinetSubContentHeightAdjustmentRequest extends Transaction.Request {
  /** 记录上一次操作的位置映射，用于撤销操作 */
  private _previousMap: CabinetMap;
  
  /** 需要处理的柜体数组 */
  private readonly _cabinets: Cabinet[];
  
  /** 台面高度调整值 */
  private readonly _height: number;

  /**
   * 构造函数
   * @param cabinets - 需要调整的柜体数组
   * @param height - 台面高度调整值
   */
  constructor(cabinets: Cabinet[], height: number);

  /**
   * 提交事务时调用
   * 生成当前位置映射并应用新的高度调整
   */
  onCommit(): void;

  /**
   * 撤销操作时调用
   * 恢复到调整前的位置
   */
  onUndo(): void;

  /**
   * 重做操作时调用
   * 重新应用高度调整
   */
  onRedo(): void;

  /**
   * 生成位置映射表
   * 遍历所有柜体及其内容，计算需要调整的内容项的原始位置和目标位置
   * 
   * @returns 柜体与内容的位置映射关系
   * 
   * @remarks
   * 处理两种类型的内容：
   * 1. ext_OnTopCenterOfContent类型（如水槽）：基于柜体顶部位置调整
   * 2. ext_OnTopOfOthers类型（如台面装饰）：基于NoDripEdge线条的Z位置调整
   */
  private _generationMap(): CabinetMap;

  /**
   * 调整子内容的Z轴位置
   * 
   * @param positionMap - 位置映射表
   * @param applyAdjustment - true表示应用调整后的位置，false表示恢复原始位置
   * 
   * @remarks
   * 遍历映射表中的所有内容项，根据applyAdjustment参数决定使用原始位置还是调整后位置
   */
  private _adjustsubcontent(positionMap: CabinetMap, applyAdjustment: boolean): void;
}

export default CabinetSubContentHeightAdjustmentRequest;

/**
 * 工具函数：从对象路径获取值
 * @param path - 属性路径数组
 * @param obj - 目标对象
 * @returns 路径对应的值，如果路径不存在则返回undefined
 */
declare function getValueByPath(path: string[], obj: unknown): unknown;