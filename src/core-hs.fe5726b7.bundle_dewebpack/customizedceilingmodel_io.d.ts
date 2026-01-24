/**
 * CustomizedCeilingModel_IO - 自定义吊顶模型的 IO 处理类
 * 继承自 CustomizedFeatureModel_IO，用于处理吊顶模型的序列化和反序列化
 */
export declare class CustomizedCeilingModel_IO extends CustomizedFeatureModel_IO {
  /**
   * 获取单例实例
   */
  static instance(): CustomizedCeilingModel_IO;
}

/**
 * 面数据接口 - 描述草图面的结构
 */
interface FaceData {
  /** 外轮廓的离散点集合 */
  outer: HSCore.Util.Math.Vec2[];
  /** 内部孔洞的离散点集合数组 */
  holes: HSCore.Util.Math.Vec2[][];
  /** 挤出高度 */
  height: number;
}

/**
 * CustomizedCeilingModel - 自定义吊顶模型类
 * 继承自 CustomizedFeatureModel，实现吊顶特有的挤出和附着内容移动逻辑
 */
export declare class CustomizedCeilingModel extends CustomizedFeatureModel {
  /**
   * 构造函数
   * @param id - 模型唯一标识符，默认为空字符串
   * @param data - 初始化数据，可选
   */
  constructor(id?: string, data?: unknown);

  /**
   * 获取挤出方向
   * @returns 挤出方向值，-1 表示向下挤出（吊顶特有）
   */
  protected _getExtrudeDirection(): number;

  /**
   * 获取挤出平面
   * @param param - 平面计算参数
   * @returns 挤出平面对象，如果无法计算则返回 undefined
   */
  protected _getExtrudePlane(param: unknown): GeLib.Plane | undefined;

  /**
   * 获取挤出路径
   * @param param1 - 第一个路径参数
   * @param param2 - 第二个路径参数
   * @returns 挤出路径数组，每个路径会被反转以适应吊顶方向
   */
  protected _getExtrudePaths(param1: unknown, param2: unknown): unknown[][];

  /**
   * 获取更新后的顺时针属性
   * @param data - 包含 clockwise 属性的数据对象
   * @returns 反转后的顺时针值
   */
  protected _getUpdatedClockWise(data: { clockwise: boolean }): boolean;

  /**
   * 获取 IO 处理实例
   * @returns CustomizedCeilingModel_IO 的单例实例
   */
  getIO(): CustomizedCeilingModel_IO;

  /**
   * 草图变脏时的回调处理
   * @param event - 草图变更事件
   */
  onSketchDirty(event: unknown): void;

  /**
   * 移动附着的内容
   * @param type - 移动类型，"z" 表示 Z 轴移动，"sketch" 表示草图变更
   * @param value - 移动的值，当 type 不是 "z" 或 "sketch" 时需要提供
   */
  moveAttachedContents(type: string, value?: unknown): void;

  /**
   * 遍历所有附着内容的辅助方法（继承自父类）
   * @param callback - 对每个内容执行的回调函数
   */
  protected forEachContent(callback: (content: { x: number; y: number; z: number; ZSize: number }) => void): void;

  /** Z 轴坐标 */
  z: number;
  /** Z 轴尺寸（高度） */
  ZSize: number;
  /** 关联的草图对象 */
  sketch: Sketch;
  /** 内部草图引用（受保护） */
  protected _sketch?: Sketch;
}

/**
 * 草图接口定义
 */
interface Sketch {
  /** 草图包含的面集合 */
  faces: SketchFace[];
  /**
   * 获取背景外轮廓
   */
  getBackgroundOuter(): unknown;
  /**
   * 获取指定面的挤出值
   * @param faceId - 面的唯一标识符
   */
  getExtrusionValue(faceId: string): number;
}

/**
 * 草图面接口
 */
interface SketchFace {
  /** 面的唯一标识符 */
  id: string;
  /** 外环 */
  outerLoop: SketchLoop;
  /** 内环（孔洞）集合 */
  innerLoops: SketchLoop[];
}

/**
 * 草图环接口
 */
interface SketchLoop {
  /**
   * 获取离散点集合
   */
  getDiscretePoints(): HSCore.Util.Math.Vec2[];
}

/**
 * 全局类型声明
 */
declare global {
  namespace GeLib {
    class Plane {
      normal: THREE.Vector3;
      negate(): void;
    }

    namespace PolygonUtils {
      function getPlaneFromPolygon(points: THREE.Vector3[]): GeLib.Plane | null;
    }
  }

  namespace HSCore.Util.Math {
    class Vec2 {
      constructor(x: number, y: number);
    }

    function isPointInPolygonWithHoles(
      point: Vec2,
      outer: Vec2[],
      holes: Vec2[][],
      strict: boolean
    ): boolean;
  }

  namespace HSConstants {
    enum ModelClass {
      CustomizedCeilingModel = "CustomizedCeilingModel"
    }
  }

  namespace Entity {
    function registerClass(className: string, classConstructor: new (...args: any[]) => any): void;
  }
}

// 父类声明（假设从其他模块导入）
declare class CustomizedFeatureModel_IO {
  static instance(): CustomizedFeatureModel_IO;
}

declare class CustomizedFeatureModel {
  constructor(id: string, data?: unknown);
  protected _sketch?: Sketch;
  protected _to3dPointArray(data: unknown, param: unknown): THREE.Vector3[];
  protected _getExtrudePaths(param1: unknown, param2: unknown): unknown[][];
  onSketchDirty(event: unknown): void;
  moveAttachedContents(type: string, value: unknown): void;
  forEachContent(callback: (content: any) => void): void;
  z: number;
  ZSize: number;
  sketch: Sketch;
}