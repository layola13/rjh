/**
 * 创建迭代器辅助函数
 * 用于遍历可迭代对象（数组、Map、Set等）
 * @template T 迭代元素类型
 * @param collection 要迭代的集合
 * @returns 迭代器对象，包含 s(start)、n(next)、e(error)、f(finally) 方法
 */
declare function createIterator<T>(
  collection: Iterable<T> | ArrayLike<T>
): {
  /** 启动迭代器 */
  s(): void;
  /** 获取下一个元素 */
  n(): IteratorResult<T>;
  /** 处理错误 */
  e(error: unknown): void;
  /** 清理资源 */
  f(): void;
};

/**
 * 数组转换辅助函数
 * 将类数组对象转换为真实数组
 * @template T 数组元素类型
 * @param arrayLike 类数组对象
 * @param length 可选的长度限制
 * @returns 转换后的数组
 */
declare function arrayLikeToArray<T>(
  arrayLike: ArrayLike<T>,
  length?: number
): T[];

/**
 * 3D空间位置配置接口
 */
interface PositionConfig {
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 起始X坐标 */
  startX: number;
  /** 起始Y坐标 */
  startY: number;
  /** 起始Z坐标 */
  startZ: number;
  /** 顶部偏移量 */
  topOffset: number;
  /** 起始Y坐标方程（字符串表达式） */
  startYEQ?: string;
  /** 起始X坐标方程（字符串表达式） */
  startXEQ?: string;
  /** 奇偶间隙方程（字符串表达式） */
  evenOddGapEQ?: string;
}

/**
 * 添加6个基础状态变量（宽、深、高、x、y、z）
 * @param id 状态ID前缀
 * @param assembly 目标装配体
 * @param config 位置配置（可选，用于设置初始x/y值）
 */
declare function addBasicStates(
  id: string,
  assembly: HSCore.Model.PAssembly,
  config?: Partial<PositionConfig>
): void;

/**
 * 添加横板的约束方程
 * 计算横板的宽、深、高、x、y、z位置
 * @param id 横板ID
 * @param assembly 目标装配体
 * @param config 位置配置
 */
declare function addHorizontalBoardConstraints(
  id: string,
  assembly: HSCore.Model.PAssembly,
  config: PositionConfig
): void;

/**
 * 添加竖板的约束方程
 * 计算竖板的宽、深、高、x、y、z位置
 * @param id 竖板ID
 * @param assembly 目标装配体
 * @param config 位置配置
 */
declare function addVerticalBoardConstraints(
  id: string,
  assembly: HSCore.Model.PAssembly,
  config: PositionConfig
): void;

/**
 * 创建拉伸几何体（带圆角路径）
 * @param id 几何体ID
 * @param assembly 目标装配体
 * @param index 索引（未使用）
 * @param material 材质ID
 * @param segmentCount 圆角分段数（字符串或数字，默认10段）
 */
declare function createExtrudedGeometry(
  id: string,
  assembly: HSCore.Model.PAssembly,
  index: number,
  material: string,
  segmentCount?: string | number
): void;

/**
 * 添加圆角路径的点状态
 * 创建4个关键点和若干圆弧插值点，用于生成带圆角的拉伸路径
 * @param id 路径ID前缀
 * @param assembly 目标装配体
 * @param config 位置配置
 * @param segmentCount 圆角分段数（字符串或数字，默认10段）
 */
declare function addRoundedPathPoints(
  id: string,
  assembly: HSCore.Model.PAssembly,
  config: PositionConfig,
  segmentCount?: string | number
): void;

/**
 * 创建长方体模型
 * @param id 模型ID
 * @param assembly 目标装配体
 * @param description 模型描述
 * @param material 材质ID
 */
declare function createBoxModel(
  id: string,
  assembly: HSCore.Model.PAssembly,
  description: string,
  material: string
): void;

/**
 * 生成网格分隔板系统
 * 根据可用空间自动计算并创建横板和竖板
 * @param parentAssembly 父级装配体（包含空间尺寸状态）
 */
declare function generateGridSystem(parentAssembly: HSCore.Model.PAssembly): void;

/**
 * 查找指定装配体中的网格参数子装配体
 * @param assembly 要搜索的装配体
 * @returns 找到的网格参数装配体，未找到返回null
 */
declare function findGridParamAssembly(
  assembly: HSCore.Model.PAssembly
): HSCore.Model.PAssembly | null;

/**
 * 清理网格装配体中的所有板子和相关状态/约束
 * @param gridAssembly 网格装配体
 */
declare function cleanupGridAssembly(gridAssembly: HSCore.Model.PAssembly): void;

/**
 * 调整网格分隔系统
 * @param assembly 目标装配体
 * @param shouldCleanup 是否先清理现有网格（默认false）
 * @returns 是否成功调整网格
 */
export declare function adjustGrid(
  assembly: HSCore.Model.PAssembly,
  shouldCleanup?: boolean
): boolean;

/**
 * 网格后处理器
 * 在装配体加载后自动生成网格系统
 * @param source 源对象（未使用）
 * @param assembly 目标装配体
 */
export declare function gridPostProcessor(
  source: unknown,
  assembly: HSCore.Model.PAssembly
): void;