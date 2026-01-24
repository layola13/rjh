/**
 * 模型移动操作的位置规格接口
 * 定义了内容在三维空间中的位置、旋转和宿主信息
 */
interface MoveSpecification {
  /** X轴坐标 */
  x: number;
  /** Y轴坐标 */
  y: number;
  /** Z轴坐标 */
  z: number;
  /** 旋转角度 */
  rotation: number;
  /** 宿主对象（如墙面、地板等） */
  host: unknown;
}

/**
 * 可移动的内容对象接口
 * 代表场景中可以被移动的元素（如开孔、家具等）
 */
interface MovableContent {
  /** X轴坐标 */
  x: number;
  /** Y轴坐标 */
  y: number;
  /** Z轴坐标 */
  z: number;
  /** 旋转角度 */
  rotation: number;
  /** 宿主面对象，用于开孔等附着在面上的元素 */
  hostFace?: unknown;
  
  /**
   * 获取当前内容所属的宿主对象
   * @returns 宿主对象
   */
  getHost(): unknown;
  
  /**
   * 将内容分配到指定宿主
   * @param host - 目标宿主对象
   */
  assignTo(host: unknown): void;
  
  /**
   * 标记几何体为脏数据，需要重新计算
   */
  dirtyGeometry?(): void;
  
  /**
   * 刷新地板几何体
   */
  refreshFloorGeometry?(): void;
  
  /**
   * 刷新两侧墙面几何体
   */
  refreshBothWallFaceGeometry?(): void;
}

/**
 * 请求对象接口
 * 用于命令模式的请求封装
 */
interface Request {
  /** 请求类型 */
  type: string;
  /** 请求携带的数据 */
  data: unknown[];
}

/**
 * HSFPConstants 常量命名空间声明
 * 包含系统级别的常量定义
 */
declare namespace HSFPConstants {
  /**
   * 请求类型枚举
   */
  enum RequestType {
    /** 移动内容请求 */
    MoveContent = 'MoveContent'
  }
  
  /**
   * 日志分组类型枚举
   */
  enum LogGroupTypes {
    /** 内容操作相关日志 */
    ContentOperation = 'ContentOperation'
  }
}

/**
 * HSApp 工具类命名空间声明
 */
declare namespace HSApp.Util {
  /**
   * 开孔相关工具类
   */
  namespace Opening {
    /**
     * 判断对象是否为开孔类型
     * @param obj - 待检查的对象
     * @returns 是否为开孔
     */
    function isOpening(obj: unknown): boolean;
  }
}

/**
 * HSCore 核心命名空间声明
 */
declare namespace HSCore.Transaction.Common {
  /**
   * 状态请求基类
   * 实现了命令模式，支持撤销/重做操作
   */
  class StateRequest {
    /**
     * 提交操作时的回调
     */
    onCommit(): void;
    
    /**
     * 撤销操作时的回调
     */
    onUndo(): void;
    
    /**
     * 重做操作时的回调
     */
    onRedo(): void;
    
    /**
     * 判断是否可以与另一个请求合并
     * @param request - 待合并的请求
     * @returns 是否可以合并
     */
    onCompose(request: Request): boolean;
    
    /**
     * 判断是否可以记录字段级别的事务
     * @returns 是否可以记录
     */
    canTransactField(): boolean;
    
    /**
     * 获取操作描述
     * @returns 描述文本
     */
    getDescription(): string;
    
    /**
     * 获取操作分类
     * @returns 分类标识
     */
    getCategory(): string;
  }
}

/**
 * 内容移动请求类
 * 用于处理场景中内容（模型、开孔等）的移动操作，支持撤销/重做
 * 
 * @extends HSCore.Transaction.Common.StateRequest
 * 
 * @example
 *