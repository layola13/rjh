/**
 * 绘制线条请求模块
 * 
 * 用于处理 2D 草图绘制操作，支持多个区域（包含外轮廓和内孔）的绘制请求
 * 
 * @module DrawLineRequest
 */

declare namespace HSApp.ExtraordinarySketch2d.Request {
  /**
   * 特殊绘图请求基类
   */
  export class ExtraordinaryDrawRequest {
    constructor(builder: any, args: any[]);
  }
}

declare namespace HSCore.Model {
  /**
   * 室外绘图草图 2D 构建器
   */
  export class OutdoorDrawingSketch2dBuilder {
    /**
     * 面拓扑标签常量
     */
    static readonly FaceTopoTag: string;
  }
}

/**
 * 曲线信息接口
 */
interface CurveInfo {
  /**
   * 曲线对象
   */
  curve: any;
}

/**
 * 区域定义接口
 * 
 * 描述一个封闭区域，包含外轮廓和可选的内部孔洞
 */
interface RegionDefinition {
  /**
   * 外轮廓曲线数组
   */
  outer: CurveInfo[];
  
  /**
   * 内部孔洞数组，每个孔洞由曲线数组组成
   */
  holes: CurveInfo[][];
  
  /**
   * 拓扑标识符
   * 格式: "-1_{FaceTopoTag}"
   */
  topo: string;
}

/**
 * 输入区域接口
 * 
 * 用户提供的原始区域数据结构
 */
interface InputRegion {
  /**
   * 外轮廓曲线数组
   */
  outer: any[];
  
  /**
   * 内部孔洞数组
   */
  holes: any[][];
}

/**
 * 草图 2D 构建器选项接口
 */
interface Sketch2dBuilderOptions {
  /**
   * 要绘制的区域数组
   */
  regions: InputRegion[];
}

/**
 * 草图 2D 构建器接口
 */
interface Sketch2dBuilder {
  /**
   * 添加区域到草图
   * 
   * @param regions - 要添加的区域定义数组
   */
  addRegions(regions: RegionDefinition[]): void;
  
  /**
   * 更新附加信息
   * 
   * 在添加或修改区域后同步更新草图的附加数据
   */
  updateAppendix(): void;
}

/**
 * 绘制线条请求类
 * 
 * 继承自 ExtraordinaryDrawRequest，用于处理 2D 草图中的区域绘制操作。
 * 支持包含外轮廓和内部孔洞的复杂区域绘制。
 * 
 * @extends {HSApp.ExtraordinarySketch2d.Request.ExtraordinaryDrawRequest}
 * 
 * @example
 *