/**
 * 二维点坐标（64位整数表示）
 */
interface Point64 {
  /** X坐标低32位 */
  x_low: number;
  /** X坐标高32位 */
  x_high: number;
  /** Y坐标低32位 */
  y_low: number;
  /** Y坐标高32位 */
  y_high: number;
}

/**
 * 二维向量（浮点数表示）
 */
interface Vector2D {
  x: number;
  y: number;
}

/**
 * 动态数组缓冲区
 */
interface DynamicBuffer<T> {
  /** 数据起始指针 */
  start: number;
  /** 当前数据结束指针 */
  end: number;
  /** 缓冲区容量结束指针 */
  capacity: number;
}

/**
 * 几何形状配置
 */
interface ShapeConfig {
  /** 半径或尺寸 */
  radius: number;
  /** 最小步长 */
  minStep?: number;
  /** 形状类型: 0=多边形, 1=椭圆, 2=自定义 */
  shapeType: number;
  /** 是否闭合路径 */
  isClosed: boolean;
  /** 平滑度参数 */
  smoothness?: number;
}

/**
 * 路径生成器状态
 */
interface PathGeneratorState {
  /** 输入配置参数（偏移16字节） */
  config: ShapeConfig;
  
  /** 输出路径点集合（偏移16字节） */
  outputPaths: DynamicBuffer<DynamicBuffer<Point64>>;
  
  /** 临时顶点缓冲区（偏移28字节） */
  tempVertices: DynamicBuffer<Point64>;
  
  /** 工作缓冲区（偏移40字节） */
  workBuffer: DynamicBuffer<Point64>;
  
  /** 法线向量缓冲区（偏移52字节） */
  normals: DynamicBuffer<Vector2D>;
  
  /** 半径值（偏移64字节） */
  radiusValue: number;
  
  /** 旋转相关参数（偏移72-76字节） */
  rotationState: [number, number];
  
  /** 正弦值（偏移80字节） */
  sinValue: number;
  
  /** 余弦值（偏移88字节） */
  cosValue: number;
  
  /** 缩放系数（偏移96字节） */
  scaleFactor: number;
  
  /** 步长角度（偏移104字节） */
  angleStep: number;
  
  /** 几何形状数组（偏移144字节） */
  shapes: number[];
}

/**
 * 初始化路径生成器并生成路径点
 * 
 * @param state - 路径生成器状态对象指针
 * @param offset - 偏移量（正值为外扩，负值为内缩）
 * 
 * @remarks
 * 此函数执行以下操作：
 * 1. 清空之前的路径数据
 * 2. 根据偏移量计算缩放因子和步长
 * 3. 计算每个顶点的法线向量
 * 4. 根据形状类型生成对应的路径点
 * 5. 处理闭合路径的首尾连接
 */
declare function generateOffsetPath(
  state: number,
  offset: number
): void;

/**
 * 处理单个顶点的偏移
 * 
 * @param state - 状态指针
 * @param vertexIndex - 顶点索引
 * @param indexBuffer - 索引缓冲区指针
 * @param mode - 处理模式
 */
declare function processVertex(
  state: number,
  vertexIndex: number,
  indexBuffer: number,
  mode: number
): void;

/**
 * 贝塞尔曲线模式处理
 * 
 * @param state - 状态指针
 * @param startIndex - 起始索引
 * @param endIndex - 结束索引
 */
declare function processBezierMode(
  state: number,
  startIndex: number,
  endIndex: number
): void;

/**
 * 四边形模式处理
 * 
 * @param state - 状态指针
 * @param startIndex - 起始索引
 * @param endIndex - 结束索引
 */
declare function processQuadMode(
  state: number,
  startIndex: number,
  endIndex: number
): void;

/**
 * 计算反正切值（atan）
 * 
 * @param value - 输入值
 * @returns 反正切结果
 */
declare function arctan(value: number): number;

/**
 * 计算正弦值
 * 
 * @param angle - 角度（弧度）
 * @param buffer - 临时缓冲区
 * @returns 正弦值
 */
declare function sine(angle: number, buffer: number): number;

/**
 * 计算余弦值
 * 
 * @param angle - 角度（弧度）
 * @param buffer - 临时缓冲区
 * @returns 余弦值
 */
declare function cosine(angle: number, buffer: number): number;

/**
 * 扩展/收缩路径缓冲区
 * 
 * @param buffer - 缓冲区指针
 * @param requiredSize - 所需大小
 */
declare function resizeBuffer(
  buffer: number,
  requiredSize: number
): void;

/**
 * 追加路径点到输出缓冲区
 * 
 * @param outputBuffer - 输出缓冲区指针
 * @param sourceBuffer - 源缓冲区指针
 */
declare function appendPathPoints(
  outputBuffer: number,
  sourceBuffer: number
): void;

/**
 * 内存分配函数
 * 
 * @param size - 字节数
 * @returns 分配的内存指针
 */
declare function allocateMemory(size: number): number;

/**
 * 内存释放函数
 * 
 * @param ptr - 内存指针
 */
declare function freeMemory(ptr: number): void;

/**
 * 内存拷贝函数
 * 
 * @param dest - 目标指针
 * @param src - 源指针
 * @param size - 字节数
 * @returns 目标指针
 */
declare function copyMemory(
  dest: number,
  src: number,
  size: number
): number;

/**
 * 向量归一化
 * 
 * @param x - X分量
 * @param y - Y分量
 * @returns 归一化后的向量 [x, y]
 */
declare function normalizeVector(x: number, y: number): [number, number];

/**
 * 浮点数转64位整数（带舍入）
 * 
 * @param value - 浮点数值
 * @returns [低32位, 高32位]
 */
declare function floatToInt64(value: number): [number, number];

/** 数学常量：PI */
declare const PI: 3.141592653589793;

/** 数学常量：2*PI */
declare const TWO_PI: 6.283185307179586;

/** 最小值阈值 */
declare const EPSILON: 1e-20;

/** 最大缓冲区元素数 */
declare const MAX_BUFFER_ELEMENTS: 268435455;