/**
 * 3D空间点坐标接口
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 2D空间点坐标接口
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * 辅助线段定义
 */
interface AuxiliaryLine {
  /** 线段端点数组 */
  points: Point3D[] | Point2D[];
}

/**
 * 捕捉点信息
 */
interface SnapPointInfo {
  /** 捕捉点坐标数组 */
  snapPoint: Point3D[];
  /** 捕捉线段集合 */
  snapLines?: AuxiliaryLine[];
  /** 自定义天花板中心标识 */
  customizedCeilingCenter?: 'center' | string;
}

/**
 * 内容中心信息
 */
interface ContentCenterInfo {
  /** 捕捉点坐标（单个或数组） */
  snapPoint?: Point3D;
  snapPoints?: Point3D[];
  /** 中心类型标识 */
  centerInfo?: 'center' | string;
  isCenter?: 'center' | string;
}

/**
 * 墙体线段信息
 */
interface WallLineHost {
  /** 起始点 */
  from: Point2D;
  /** 终止点 */
  to: Point2D;
}

/**
 * 捕捉结果数据
 */
interface SnappingResultData {
  /** 捕捉类型 */
  type: HSApp.Snapping.SnappingResultType;
  /** 捕捉信息 */
  snapInfo?: SnapPointInfo;
  /** 内容中心信息 */
  contentCenter?: ContentCenterInfo;
  /** 墙体宿主信息 */
  host?: WallLineHost;
  /** 墙体内外线捕捉线段 */
  snapLine?: Point2D[];
  /** 家具边缘捕捉点 */
  snapPoints?: Point3D[];
}

/**
 * 移动捕捉事件数据
 */
interface MoveSnappedEventData {
  /** 捕捉结果数组 */
  data?: SnappingResultData[];
}

/**
 * 命令对象接口（扩展自HSCore）
 */
interface CommandObject {
  /** 关联的3D内容对象 */
  content?: HSCore.Model.Beam | unknown;
  /** 当前操作对象 */
  current?: {
    content?: HSCore.Model.Beam | unknown;
    signalMoveSnapped?: unknown;
  };
  /** 移动捕捉信号 */
  signalMoveSnapped?: unknown;
}

/**
 * 信号钩子接口
 */
interface SignalHook {
  /** 监听信号事件 */
  listen(signal: unknown, callback: (data: MoveSnappedEventData) => void): void;
}

/**
 * 捕捉辅助线显示类
 * @description 用于在移动对象时显示智能捕捉的辅助线，支持天花板、灯具、墙体等多种捕捉类型
 */
declare class SnappingAuxiliaryLineView extends HSApp.View.SVG.Snap2d {
  /**
   * 信号钩子管理器
   */
  protected signalHook: SignalHook;

  /**
   * 关联的命令对象
   */
  protected cmd: CommandObject;

  /**
   * 构造函数
   * @param element - DOM元素
   * @param namespace - 命名空间
   * @param commandObject - 命令对象，包含内容和信号配置
   */
  constructor(element: HTMLElement, namespace: string, commandObject: CommandObject);

  /**
   * 接收移动捕捉事件的回调函数
   * @description 处理各种捕捉类型（天花板、灯具线、墙体等）并绘制相应的辅助线
   * @param eventData - 移动捕捉事件数据
   */
  protected onReceive(eventData: MoveSnappedEventData): void;

  /**
   * 准备并绘制辅助线
   * @param lines - 辅助线段数组
   */
  protected prepareAuxiliaryLines(lines: AuxiliaryLine[]): void;

  /**
   * 显示家具边缘辅助线
   * @param lines - 辅助线段数组
   */
  protected showFurnitureAuxiliaryLines(lines: AuxiliaryLine[]): void;

  /**
   * 重置辅助线显示
   */
  protected reset(): void;
}

/**
 * HSApp命名空间 - 捕捉相关
 */
declare namespace HSApp.Snapping {
  /**
   * 捕捉结果类型枚举
   */
  enum SnappingResultType {
    /** 天花板面板 */
    CeilingPanel = 'CeilingPanel',
    /** 灯具布线 */
    LightingLines = 'LightingLines',
    /** 天花板 */
    Ceiling = 'Ceiling',
    /** 墙体中线 */
    WallMidLine = 'WallMidLine',
    /** 墙体内外线 */
    WallInnerOuterLine = 'WallInnerOuterLine',
    /** 家具边缘点 */
    FurnitureEgdePoint = 'FurnitureEgdePoint'
  }
}

/**
 * HSApp命名空间 - 视图相关
 */
declare namespace HSApp.View.SVG {
  /**
   * 2D捕捉视图基类
   */
  class Snap2d {
    constructor(element: HTMLElement, namespace: string, commandObject: unknown);
  }
}

/**
 * HSCore命名空间 - 模型相关
 */
declare namespace HSCore.Model {
  /**
   * 梁/灯具模型类
   */
  class Beam {}
}

/**
 * HSCore命名空间 - 工具类
 */
declare namespace HSCore.Util.Content {
  /**
   * 判断内容是否为吸顶灯
   * @param content - 内容对象
   * @returns 是否为吸顶灯
   */
  function isCeilingLight(content: unknown): boolean;
}

/**
 * 默认导出：捕捉辅助线显示类
 */
export default SnappingAuxiliaryLineView;