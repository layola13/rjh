/**
 * 图层实体类型定义文件
 * @module LayerEntity
 */

/**
 * 点坐标类型 [x, y] 或 [x, y, z]
 */
type Point2D = [number, number];
type Point3D = [number, number, number];

/**
 * 边界矩形接口
 */
interface Bound {
  /**
   * 获取左上角坐标
   */
  getTopLeft(): { x: number; y: number };
  
  /**
   * 获取右下角坐标
   */
  getBottomRight(): { x: number; y: number };
}

/**
 * 房间接口
 */
interface Room {
  /** 房间信息列表 */
  roomInfos: unknown[];
  
  /** 原始2D路径 */
  rawPath2d: unknown;
}

/**
 * 楼板接口
 */
interface Slab {
  /** 楼板ID */
  id: string;
  
  /** 楼板厚度（米） */
  thickness: number;
}

/**
 * 图层类型枚举
 */
type LayerType = 'normalLayer' | 'ceilingLayer' | 'outdoorLayer' | 'undergroundLayer';

/**
 * 图层源数据接口
 */
interface LayerSourceData {
  /** 实体ID */
  id: string;
  
  /** 实体类名 */
  Class: string;
  
  /** 图层高度（米） */
  height: number;
  
  /** 显示名称 */
  displayName: string;
  
  /** 边界矩形 */
  bound: Bound;
  
  /** 地板楼板集合 */
  floorSlabs: Record<string, Slab>;
  
  /** 天花板楼板集合 */
  ceilingSlabs: Record<string, Slab>;
  
  /**
   * 遍历所有房间
   * @param callback 房间回调函数
   */
  forEachRoom(callback: (room: Room) => void): void;
}

/**
 * 楼层平面图场景接口
 */
interface FloorplanScene {
  /** 天花板图层 */
  ceilingLayer: { id: string };
  
  /** 室外图层 */
  outdoorLayer: { id: string };
  
  /**
   * 获取图层海拔高度
   * @param layer 图层数据
   * @returns 海拔高度（米）
   */
  getLayerAltitude(layer: LayerSourceData): number;
  
  /**
   * 判断是否为地下图层
   * @param layer 图层数据
   * @returns 是否为地下图层
   */
  isUndergroundLayer(layer: LayerSourceData): boolean;
}

/**
 * 应用实例接口
 */
interface HSAppInstance {
  /** 楼层平面图 */
  floorplan: {
    /** 场景对象 */
    scene: FloorplanScene;
  };
}

/**
 * 数据类型枚举
 */
declare enum DataType {
  String = 'String',
  Number = 'Number',
  ArrayPoint2D = 'ArrayPoint2D',
  StringArray = 'StringArray'
}

/**
 * 参数类
 */
declare class Parameter {
  /**
   * 创建参数实例
   * @param name 参数名称
   * @param value 参数值
   * @param type 数据类型（可选）
   */
  constructor(name: string, value: unknown, type?: DataType);
}

/**
 * 实例数据类
 */
declare class InstanceData {
  /**
   * 创建实例数据
   * @param id 实体ID
   */
  constructor(id: string);
  
  /**
   * 添加多个参数
   * @param params 参数列表
   */
  addParameter(...params: Parameter[]): void;
}

/**
 * 实体类型配置接口
 */
interface EntityTypeConfig {
  /** 类类型名称 */
  classType: string;
}

/**
 * 构建上下文接口
 */
interface BuildContext {
  /** 图层索引 */
  index?: number;
}

/**
 * 接受实体基类
 */
declare class AcceptEntity {
  /**
   * 设置实例数据
   * @param data 实例数据对象
   */
  protected setInstanceData(data: InstanceData): void;
  
  /**
   * 设置实体类型
   * @param config 类型配置
   */
  protected setType(config: EntityTypeConfig): void;
}

/**
 * 图层实体类
 * 用于表示建筑楼层的3D实体对象，包含图层的几何信息、房间布局、楼板配置等
 */
export declare class LayerEntity extends AcceptEntity {
  /**
   * 构造图层实体
   */
  constructor();
  
  /**
   * 构建子实体（当前为空实现）
   */
  protected buildChildren(): void;
  
  /**
   * 构建实体数据
   * @param sourceData 图层源数据
   * @param context 构建上下文
   */
  protected buildEntityData(sourceData: LayerSourceData, context: BuildContext): void;
  
  /**
   * 从源数据提取实例数据
   * @param sourceData 图层源数据
   * @param context 构建上下文
   * @returns 实例数据对象
   * 
   * @remarks
   * 提取的数据包括：
   * - center: 图层中心点坐标 [x, y, z]
   * - size: 图层尺寸 [宽度, 深度, 高度]
   * - parentId: 父实体ID
   * - designArea: 设计面积（平方米）
   * - grossFloorArea: 建筑面积（平方米）
   * - innerArea: 使用面积（平方米）
   * - index: 图层索引
   * - displayName: 显示名称
   * - wallHeight: 墙体高度（米）
   * - wallThickness: 墙体厚度（米，默认0.24）
   * - slabThickness: 楼板厚度（米，默认0.1）
   * - layerType: 图层类型（普通/天花板/室外/地下）
   * - floorSlabIds: 地板楼板ID数组
   * - ceilingSlabIds: 天花板楼板ID数组
   */
  protected getInstanceData(sourceData: LayerSourceData, context: BuildContext): InstanceData;
}

/**
 * 全局工具类命名空间
 */
declare namespace HSApp {
  namespace App {
    /**
     * 获取应用实例
     */
    function getApp(): HSAppInstance;
  }
  
  namespace Util {
    namespace Layer {
      /**
       * 获取图层建筑面积
       * @param layer 图层数据
       * @returns 建筑面积（平方米）
       */
      function getLayerGrossFloorArea(layer: LayerSourceData): number;
      
      /**
       * 获取图层使用面积
       * @param layer 图层数据
       * @returns 使用面积（平方米）
       */
      function getLayerGrossInternalArea(layer: LayerSourceData): number;
    }
  }
}

/**
 * 工具函数命名空间
 */
declare namespace Utils {
  /**
   * 格式化数字数组（保留精度）
   * @param values 数值或数值数组
   * @returns 格式化后的值
   */
  function formatNumberPoints(values: number | number[]): number | number[];
  
  /**
   * 计算2D路径面积
   * @param path 路径数据
   * @returns 面积（平方米）
   */
  function getArea(path: unknown): number;
}

/**
 * 获取父实体ID
 * @param entity 实体对象
 * @returns 父实体ID
 */
declare function getParentId(entity: { id: string }): string;

export { DataType, InstanceData, Parameter };