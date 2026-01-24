/**
 * 三维向量接口
 */
interface Vector3 {
  x: number;
  y: number;
  z: number;
}

/**
 * THREE.js Vector3 类型
 */
declare namespace THREE {
  class Vector3 {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    subVectors(a: Vector3, b: Vector3): Vector3;
    clone(): Vector3;
    setLength(length: number): Vector3;
    length(): number;
  }
}

/**
 * 房间标志枚举
 */
declare namespace HSCore.Model {
  enum RoomFlagEnum {
    dimensionOff = 'dimensionOff'
  }
}

/**
 * 命令类型常量
 */
declare namespace HSFPConstants {
  enum CommandType {
    MoveContent = 'MoveContent',
    MoveContents = 'MoveContents'
  }
}

/**
 * 尺寸配置接口
 */
interface PrecisionConfig {
  /** 是否为整数类型 */
  isIntType: boolean;
  /** 尺寸单位类型 */
  dimUnitType?: string;
  /** 尺寸精度位数 */
  dimPrecisionDigits?: number;
}

/**
 * 尺寸规则配置
 */
interface DimensionRules {
  /** 是否仅允许整数 */
  intOnly: boolean;
  /** 固定单位类型 */
  fixedUnitType?: string;
  /** 固定显示位数 */
  fixedDisplayDigits?: number;
}

/**
 * 尺寸数据接口
 */
interface DimensionData {
  /** 起点 */
  start: Vector3;
  /** 终点 */
  end: Vector3;
}

/**
 * 值变更事件数据
 */
interface ValueChangeEventData {
  data: {
    /** 新值 */
    value: number;
    /** 旧值 */
    oldValue: number;
    /** 尺寸数据 */
    dim: DimensionData;
  };
}

/**
 * 实体变换数据接口
 */
interface EntityTransform {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;
  /** 组位置（可选） */
  groupPosition?: Vector3;
}

/**
 * 实体接口
 */
interface Entity {
  /** 实体唯一标识 */
  id: string;
  /** 信号脏标记 */
  signalDirty?: Signal;
}

/**
 * 房间内容接口
 */
interface RoomContent {
  /**
   * 检查标志是否开启
   * @param flag 房间标志枚举
   */
  isFlagOn(flag: HSCore.Model.RoomFlagEnum): boolean;
}

/**
 * 信号接口
 */
interface Signal {
  [key: string]: unknown;
}

/**
 * 信号钩子接口
 */
interface SignalHook {
  /**
   * 监听信号
   * @param signal 信号对象
   * @param callback 回调函数
   */
  listen(signal: Signal, callback: Function): void;
}

/**
 * 命令接口
 */
interface Command {
  [key: string]: unknown;
}

/**
 * 命令管理器接口
 */
interface CommandManager {
  /**
   * 创建命令
   * @param type 命令类型
   * @param args 命令参数
   */
  createCommand(type: HSFPConstants.CommandType, args: Entity[]): Command;
  /**
   * 执行命令
   * @param command 命令对象
   */
  execute(command: Command): void;
  /**
   * 接收消息
   * @param type 消息类型
   * @param data 消息数据
   */
  receive(type: string, data: { position: Vector3 }): void;
}

/**
 * 应用上下文接口
 */
interface ApplicationContext {
  application: {
    /** 命令管理器 */
    cmdManager: CommandManager;
  };
}

/**
 * 家具尺寸标注基类
 */
declare class FurnitureDimension {
  /** 应用上下文 */
  protected context: ApplicationContext;
  /** 标注目标变换数据 */
  protected target: EntityTransform;
  /** 房间对象 */
  protected room?: RoomContent;
  /** 信号钩子 */
  protected signalHook: SignalHook;
  
  /**
   * 构造函数
   * @param param1 参数1
   * @param param2 参数2
   * @param param3 参数3（未使用）
   * @param context 应用上下文
   */
  constructor(param1: unknown, param2: unknown, param3: undefined, context: ApplicationContext);
  
  /**
   * 初始化
   * @param transform 实体变换数据
   */
  protected init(transform: EntityTransform): void;
  
  /**
   * 设置配置
   * @param config 精度配置
   */
  protected setConfig(config: PrecisionConfig): void;
  
  /**
   * 设置规则
   * @param rules 尺寸规则
   */
  protected setRules(rules: DimensionRules): void;
  
  /**
   * 激活时回调
   * @param args 激活参数
   */
  protected onActivate(args: unknown[]): void;
  
  /**
   * 更新尺寸数据
   * @param args 更新参数
   */
  protected updateDimensionData(args: unknown[]): void;
}

/**
 * 工具类命名空间
 */
declare namespace HSCore.Util {
  namespace Layer {
    /**
     * 获取实体所在图层
     * @param entity 实体对象
     */
    function getEntityLayer(entity: Entity): unknown;
  }
  
  namespace Room {
    /**
     * 获取房间内的内容
     * @param entity 实体对象
     * @param layer 图层对象
     */
    function getRoomContentIn(entity: Entity, layer: unknown): RoomContent | undefined;
  }
  
  namespace Math {
    /**
     * 判断两个数值是否近似相等
     * @param a 数值a
     * @param b 数值b
     */
    function nearlyEquals(a: number, b: number): boolean;
  }
}

/**
 * 应用工具类命名空间
 */
declare namespace HSApp.Util {
  namespace Entity {
    /**
     * 获取实体变换数据
     * @param entity 单个实体或实体数组
     */
    function getEntityTransform(entity: Entity | Entity[]): EntityTransform;
  }
}

/**
 * 家具内容尺寸标注类
 * 用于管理家具内容的尺寸标注，支持单个或多个实体的尺寸标注
 */
declare class FurnitureContentDimension extends FurnitureDimension {
  /** 关联的实体内容列表 */
  private contents: Entity[];
  /** 用于变换计算的内容列表 */
  private transformContent: Entity[];
  
  /**
   * 构造函数
   * @param param1 参数1
   * @param param2 参数2
   * @param contents 单个实体或实体数组
   * @param context 应用上下文
   * @param additionalContents 附加实体列表（可选）
   */
  constructor(
    param1: unknown,
    param2: unknown,
    contents: Entity | Entity[],
    context: ApplicationContext,
    additionalContents?: Entity[]
  );
  
  /**
   * 获取并设置标注规则
   * @param config 精度配置对象（可选）
   */
  getRules(config?: { getPrecisionConfig(): PrecisionConfig }): void;
  
  /**
   * 获取房间内的内容
   * @returns 房间内容对象，如果不存在或尺寸标注已关闭则返回undefined
   */
  getRoomContentIn(): RoomContent | undefined;
  
  /**
   * 激活标注时的回调
   * 监听所有关联实体的脏标记信号
   */
  onActivate(): void;
  
  /**
   * 当尺寸值发生变化时的回调
   * @param event 值变更事件数据
   */
  onValueChanged(event: ValueChangeEventData): void;
  
  /**
   * 根据变换内容列表更新尺寸数据
   */
  updateDimensionData(): void;
  
  /**
   * 根据原始内容列表更新尺寸数据
   */
  updateDimensionDataByContent(): void;
  
  /**
   * 检查实体是否有效
   * @param entity 待检查的实体
   * @returns 如果实体不在内容列表中返回true
   */
  private _checkContentValid(entity: Entity): boolean;
  
  /**
   * 获取实体或实体列表的变换数据
   * @param entities 实体数组
   * @returns 实体变换数据
   */
  private _getContentTransform(entities: Entity[]): EntityTransform;
  
  /**
   * 应用值变更
   * 计算新的位置并执行移动命令
   * @param event 值变更事件数据
   */
  private _applyValueChange(event: ValueChangeEventData): void;
  
  /**
   * 实体脏标记回调
   */
  private _entityDirtied(): void;
}

export default FurnitureContentDimension;