/**
 * 抽屉拉杆参数化建模模块
 * 提供拉杆的自动布局、约束计算和几何生成功能
 */

/**
 * 迭代器辅助函数的返回类型
 */
interface IteratorResult<T> {
  done: boolean;
  value?: T;
}

/**
 * 自定义迭代器接口
 */
interface CustomIterator<T> {
  s: () => void;
  n: () => IteratorResult<T>;
  e: (error: unknown) => void;
  f: () => void;
}

/**
 * 圆形拉杆配置参数
 */
interface RodCircleConfig {
  /** 圆周上的点数量 */
  circlePoint: number;
  /** 拉杆直径 */
  diameter: number;
  /** 拉杆间隙 */
  gap?: number;
  /** 整体宽度 */
  width: number;
  /** 拉杆高度（深度方向） */
  height?: number;
  /** X方向起始位置 */
  startX: number;
  /** Y方向起始位置 */
  startY: number;
  /** Z方向起始位置 */
  startZ: number;
  /** X方向起始位置的方程表达式 */
  startXEQ?: string;
  /** 奇偶间隙的方程表达式 */
  evenOddGapEQ?: string;
}

/**
 * 拉伸几何参数
 */
interface ExtrudingParameters {
  /** 拉伸高度（引用状态ID） */
  height: string;
  /** 路径点集合（二维数组） */
  paths: string[][];
  /** X坐标（引用状态ID） */
  x: string;
  /** Y坐标（引用状态ID） */
  y: string;
  /** Z坐标（引用状态ID） */
  z: string;
}

/**
 * 样式元数据
 */
interface StyleMetadata {
  id: string;
  meta: unknown;
}

/**
 * 创建可迭代对象的迭代器
 * @param iterable - 可迭代对象（数组或实现了Symbol.iterator的对象）
 * @param hasNext - 是否有下一个元素
 * @returns 自定义迭代器
 */
declare function createIterator<T>(
  iterable: Iterable<T> | ArrayLike<T>,
  hasNext?: boolean
): CustomIterator<T>;

/**
 * 将类数组对象转换为真实数组
 * @param arrayLike - 类数组对象
 * @param length - 可选的数组长度
 * @returns 转换后的数组
 */
declare function arrayLikeToArray<T>(
  arrayLike: ArrayLike<T>,
  length?: number
): T[];

/**
 * 为拉杆创建圆周路径点及其约束
 * @param rodId - 拉杆唯一标识符
 * @param assembly - 父装配体对象
 * @param config - 圆形拉杆配置参数
 */
declare function createRodPathPoints(
  rodId: string,
  assembly: HSCore.Model.PAssembly,
  config: RodCircleConfig
): void;

/**
 * 创建拉杆的拉伸几何体
 * @param rodId - 拉杆唯一标识符
 * @param assembly - 父装配体对象
 * @param config - 圆形拉杆配置参数
 * @param material - 材质定义
 */
declare function createRodExtrudingGeometry(
  rodId: string,
  assembly: HSCore.Model.PAssembly,
  config: RodCircleConfig,
  material: unknown
): void;

/**
 * 初始化参考圆的点状态
 * @param assembly - 装配体对象
 * @param config - 圆形拉杆配置参数
 */
declare function initializeReferenceCirclePoints(
  assembly: HSCore.Model.PAssembly,
  config: RodCircleConfig
): void;

/**
 * 根据样式ID查找样式元数据
 * @param styles - 样式数组
 * @param styleId - 样式ID
 * @returns 匹配的样式元数据或null
 */
declare function findStyleById(
  styles: StyleMetadata[] | undefined,
  styleId: string
): StyleMetadata | null;

/**
 * 清理拉杆装配体中的所有子实体、状态和约束
 * @param rodAssembly - 拉杆装配体对象
 */
declare function cleanupRodAssembly(
  rodAssembly: HSCore.Model.PAssembly | null | undefined
): void;

/**
 * 执行拉杆布局的核心逻辑
 * @param rootAssembly - 根装配体对象
 * @param forceRecreate - 是否强制重新创建
 */
declare function executeRodLayout(
  rootAssembly: HSCore.Model.PAssembly,
  forceRecreate?: boolean
): void;

/**
 * 动态调整拉杆数量和布局
 * @param rootAssembly - 根装配体对象
 * @param shouldCleanup - 是否在调整前清理现有拉杆
 * @returns 是否成功调整拉杆布局
 */
export declare function adjustRod(
  rootAssembly: HSCore.Model.PAssembly,
  shouldCleanup?: boolean
): boolean;

/**
 * 拉杆后处理器（用于模型加载后的初始化）
 * @param context - 处理器上下文
 * @param assembly - 目标装配体
 */
export declare function rodPostProcessor(
  context: unknown,
  assembly: HSCore.Model.PAssembly
): void;

/**
 * 全局HSCore命名空间声明
 */
declare global {
  namespace HSCore {
    namespace State {
      class State {
        localId: string;
        __value: number | string;
        name: string;
        isEditable?: boolean;
        value: number;
      }

      class PointState extends State {
        init(config: { localId: string; type: string; value: Record<string, string> }, states: Record<string, State>): void;
      }
    }

    namespace Constraint {
      class EquationConstraint {
        localId: string;
        init(config: { _des: string; localId: string; type: string; equation: string }, states: Record<string, State.State>): void;
      }
    }

    namespace Model {
      enum EntityFlagEnum {
        removed = "removed"
      }

      class PExtruding {
        static create(config: {
          localId: string;
          material: unknown;
          parameters: {
            height: number;
            paths: State.PointState[][];
            x: number;
            y: number;
            z: number;
          };
        }): PExtruding;
      }

      class PAssembly {
        ID: string;
        metadata: {
          localId: string;
          contentType?: { _types: string[] };
          styles?: StyleMetadata[];
        };
        states: Record<string, State.State>;
        constraints: Record<string, Constraint.EquationConstraint>;
        children: Record<string, PAssembly | PExtruding>;
        addState(state: State.State): void;
        removeState(state: State.State): void;
        addConstraint(constraint: Constraint.EquationConstraint): void;
        removeConstraint(constraint: Constraint.EquationConstraint): void;
        addChild(child: PAssembly | PExtruding): void;
        removeChild(childId: string): void;
        forEachChild(callback: (child: PAssembly | PExtruding) => void): void;
        compute(): void;
        dirtyGeometry(): void;
        setFlagOn(flag: EntityFlagEnum): void;
      }
    }

    namespace Util {
      namespace Object {
        function bindFieldsByState(
          target: unknown,
          fieldMap: Record<string, string>,
          states: Record<string, State.State>
        ): void;
      }

      namespace Math {
        function rotatePointCW(
          center: { x: number; y: number },
          point: { x: number; y: number },
          angleDegrees: number
        ): { x: number; y: number };
      }
    }
  }
}