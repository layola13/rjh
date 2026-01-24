/**
 * 2D视图中通过键盘方向键移动内容物品的命令类
 * 支持移动墙上的开口(门窗)和其他模型对象
 */

/** 坐标偏移量 [x偏移, y偏移] */
type OffsetTuple = [x: number, y: number];

/** 按键码到偏移量的映射 */
interface KeyCodeOffsetMap {
  /** 上箭头键 (↑) */
  38?: OffsetTuple;
  /** 下箭头键 (↓) */
  40?: OffsetTuple;
  /** 左箭头键 (←) */
  37?: OffsetTuple;
  /** 右箭头键 (→) */
  39?: OffsetTuple;
}

/** 移动位置参数 */
interface MovePosition {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** 旋转角度(可选) */
  rotation?: number;
}

/** 事件参数接口 */
interface KeyboardEventParam {
  /** 键盘事件对象 */
  event: KeyboardEvent;
  /** 键盘码 */
  keyCode: number;
}

/** 命令会话接口 */
interface CommandSession {
  /** 提交会话 */
  commit(): void;
}

/** 事务管理器接口 */
interface TransactionManager {
  /** 启动会话 */
  startSession(options: { undoRedo: boolean }): CommandSession;
  /** 创建请求 */
  createRequest(requestType: string, params: unknown[]): unknown;
  /** 提交请求 */
  commit(request: unknown): void;
}

/** 命令上下文接口 */
interface CommandContext {
  /** 事务管理器 */
  transManager: TransactionManager;
}

/** 模型基类接口 */
interface Model {
  /** 实例类型检查 */
  instanceOf(className: string): boolean;
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** X方向尺寸 */
  XSize: number;
  /** 宿主对象(如墙体) */
  _host?: Wall;
  /** 宿主面 */
  hostFace?: unknown;
  /** 获取宿主对象 */
  getHost?(): Wall;
  /** 构建几何体 */
  build?(): void;
  /** 标记几何体需要更新 */
  dirtyGeometry(): void;
  /** 刷新楼层几何体 */
  refreshFloorGeometry?(): void;
  /** 刷新墙面两侧几何体 */
  refreshBothWallFaceGeometry?(): void;
}

/** 墙体曲线接口 */
interface WallCurve {
  /** 是否为圆弧 */
  isArc2d(): boolean;
  /** 投影点到曲线上 */
  getProjectedPtBy(point: Vec2): Vec2;
  /** 获取起始参数 */
  getStartParam(): number;
  /** 获取结束参数 */
  getEndParam(): number;
  /** 获取指定点的参数值 */
  getParamAt(point: Vec2): number;
  /** 获取参数位置的点 */
  getPtAt(param: number): Vec2;
  /** 获取切线向量 */
  getTangentAt(param: number): Vec2;
  /** 判断点是否在范围内 */
  IsInRangeInner(point: Vec2, start: Vec2, end: Vec2): boolean;
}

/** 墙体接口 */
interface Wall extends Model {
  /** 墙体曲线 */
  curve: WallCurve;
  /** 起点 */
  from: Vec2;
  /** 终点 */
  to: Vec2;
  /** 开口集合 */
  openings: Record<string, Model>;
}

/** 二维向量接口 */
interface Vec2 {
  x: number;
  y: number;
  /** 归一化 */
  normalize(): void;
  /** 克隆 */
  clone(): Vec2;
  /** 缩放 */
  scale(factor: number): Vec2;
  /** 减法 */
  subtract(other: Vec2): Vec2;
  /** 加法 */
  add(other: Vec2): Vec2;
  /** 点积 */
  dot(other: Vec2): number;
  /** 夹角(弧度) */
  angleTo(other: Vec2): number;
}

/** 直线接口 */
interface Line {
  /** 获取距离点最近的点 */
  getClosestPoint(x: number, y: number): Vec2;
}

/** 相邻点信息 */
interface AdjacentPointInfo {
  /** 起始点 */
  start: Vec2;
  /** 结束点 */
  end: Vec2;
  /** 是否重叠 */
  overlapped: boolean;
}

/**
 * 键盘移动内容物品命令
 * @extends HSApp.Cmd.Command
 */
export default class KeyboardMoveContentCommand {
  /** 要移动的内容物品数组 */
  private _contents: Model[];
  
  /** 模型坐标到屏幕坐标的转换比例 */
  private _modelToScreen: number;
  
  /** 当前命令会话 */
  private _session: CommandSession;
  
  /** 命令上下文 */
  protected context: CommandContext;
  
  /** 命令管理器 */
  protected mgr: {
    /** 完成命令 */
    complete(cmd: KeyboardMoveContentCommand): void;
  };

  /**
   * 构造函数
   * @param contents - 要移动的内容物品数组
   * @param modelToScreen - 模型到屏幕坐标的转换比例
   */
  constructor(contents: Model[], modelToScreen: number);

  /**
   * 命令执行时调用
   * 启动不可撤销/重做的事务会话
   */
  onExecute(): void;

  /**
   * 命令清理时调用
   * 提交事务会话
   */
  onCleanup(): void;

  /**
   * 是否支持撤销/重做
   * @returns 始终返回false,不支持撤销重做
   */
  canUndoRedo(): boolean;

  /**
   * 判断模型是否为墙体上的宿主对象
   * @param model - 要检查的模型对象
   * @returns 如果是门窗或飘窗且宿主为墙体,返回true
   */
  isHostToWall(model: Model): boolean;

  /**
   * 根据按键码计算每个内容物品的偏移量映射
   * @param offset - 基础偏移距离
   * @returns 每个物品对应的键码偏移映射数组
   */
  calculateOffset(offset: number): KeyCodeOffsetMap[];

  /**
   * 接收事件处理
   * @param eventType - 事件类型("keydown"/"keyup")
   * @param param - 事件参数
   * @returns 是否继续处理
   */
  onReceive(eventType: string, param: KeyboardEventParam): boolean;

  /**
   * 限制偏移量,确保移动后的位置合法
   * 处理墙体上开口的特殊约束(如圆弧墙、相邻开口等)
   * @param model - 要移动的模型
   * @param offset - 原始偏移量
   * @returns 修正后的位置(包含坐标和旋转角度)
   */
  private _restrictOffset(model: Model, offset: OffsetTuple): MovePosition;

  /**
   * 获取命令描述
   * @returns 命令的文字描述
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 命令所属的日志分组类型
   */
  getCategory(): string;
}

/**
 * 全局命名空间声明
 */
declare global {
  namespace HSApp {
    namespace Cmd {
      /** 命令基类 */
      class Command {
        /** 命令上下文 */
        protected context: CommandContext;
        /** 命令管理器 */
        protected mgr: unknown;
      }
    }
    namespace Util {
      namespace Opening {
        /** 判断是否为开口对象 */
        function isOpening(model: Model): boolean;
        /** 获取墙体上最近的相邻点 */
        function getClosestAdjacentPointOnWall(
          opening: Model,
          dimensionType: number
        ): AdjacentPointInfo | null;
        /** 计算开口几何信息(内部方法) */
        function _computeOpeningGeometry(params: {
          getHost(): Wall;
          XSize: number;
          x: number;
          y: number;
        }): Vec2[];
      }
    }
    namespace App {
      /** 尺寸类型枚举 */
      enum DimensionTypeEnum {
        /** 内部尺寸 */
        inner = 0
      }
    }
  }

  namespace HSCore {
    namespace Model {
      /** 墙体模型类 */
      class Wall implements Wall {}
      /** 定制化模型类 */
      class CustomizedModel implements Model {}
      /** 普通窗户类 */
      class POrdinaryWindow implements Model {
        /** 获取窗洞集合 */
        getWindowHoles(): Array<{ XSize: number }>;
      }
      /** 飘窗类 */
      class BayWindow implements Model {
        /** 获取窗洞集合 */
        getWindowHoles(): Array<{ XSize: number }>;
      }
    }
    namespace Util {
      namespace Math {
        /** 二维向量类 */
        class Vec2 implements Vec2 {
          /** 从坐标创建向量 */
          static fromCoordinate(coord: { x: number; y: number }): Vec2;
        }
        /** 直线类 */
        class Line implements Line {
          constructor(x1: number, y1: number, x2: number, y2: number);
        }
        /** 判断两个数值是否近似相等 */
        function nearlyEquals(a: number, b: number): boolean;
      }
    }
  }

  namespace HSConstants {
    /** 模型类名常量 */
    enum ModelClass {
      /** 开口 */
      NgOpening = "NgOpening",
      /** 墙体 */
      NgWall = "NgWall",
      /** 飘窗 */
      NgBayWindow = "NgBayWindow"
    }
  }

  namespace HSFPConstants {
    /** 请求类型常量 */
    enum RequestType {
      /** 移动内容 */
      MoveContent = "MoveContent"
    }
    /** 日志分组类型常量 */
    enum LogGroupTypes {
      /** 内容操作 */
      ContentOperation = "ContentOperation"
    }
  }
}