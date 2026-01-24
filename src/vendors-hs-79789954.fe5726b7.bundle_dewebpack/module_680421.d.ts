/**
 * 几何计算工具模块
 * 提供数学运算、向量、多边形、矩阵、曲线等几何算法工具集
 */

/**
 * 容差配置
 * 用于浮点数比较和几何计算的精度控制
 */
export declare const Tolerance: any;

/**
 * 位置类型枚举
 * 定义点、线、面等几何元素的相对位置关系
 */
export declare const PositionType: any;

/**
 * 数学工具类
 * 提供基础数学运算函数（角度、弧度、插值等）
 */
export declare const MathUtils: any;

/**
 * 向量工具类
 * 提供2D/3D向量运算（加减乘除、点积、叉积、归一化等）
 */
export declare const VectorUtils: any;

/**
 * 多边形工具类
 * 提供多边形判定、面积计算、点包含测试等功能
 */
export declare const PolygonUtils: any;

/**
 * 线段工具类
 * 提供线段相交、距离计算、投影等功能
 */
export declare const LineUtils: any;

/**
 * 矩阵工具类
 * 提供矩阵变换、求逆、转置等线性代数运算
 */
export declare const MatrixUtils: any;

/**
 * 平面工具类
 * 提供平面方程、点到平面距离、投影等功能
 */
export declare const PlaneUtils: any;

/**
 * 圆弧工具类
 * 提供圆弧计算、圆弧拟合、圆弧转换等功能
 */
export declare const ArcUtils: any;

/**
 * 曲线工具类
 * 提供贝塞尔曲线、样条曲线等曲线运算
 */
export declare const CurveUtils: any;

/**
 * Clipper裁剪工具类
 * 基于Clipper库的多边形布尔运算（并、交、差）
 */
export declare const ClipperUtils: any;

/**
 * CSG（构造实体几何）工具类
 * 提供3D实体布尔运算
 */
export declare const CsgUtils: any;

/**
 * CSG Three.js工具类
 * Three.js场景下的CSG运算封装
 */
export declare const CsgT3dUtils: any;

/**
 * 树节点基类
 * 用于构建层级数据结构
 */
export declare const TreeNode: any;

/**
 * 最小环搜索器
 * 用于在图结构中查找最小闭合路径
 */
export declare const MiniLoopSearcher: any;

/**
 * 最近线段搜索器
 * 空间中快速查找最近的线段
 */
export declare const NearestLineSearcher: any;

/**
 * 二叉堆数据结构
 * 提供优先队列功能，支持高效的最小值/最大值查询
 */
export declare const BinaryHeap: any;

/**
 * K-D树（K维树）
 * 用于多维空间的快速最近邻搜索
 */
export declare const KdTree: any;

/**
 * K-D树工厂
 * 提供K-D树的创建和配置方法
 */
export declare const KdTreeFactory: any;

/**
 * 轴对齐包围盒（Axis-Aligned Bounding Box）
 * 用于碰撞检测和空间查询优化
 */
export declare const AABB: any;

/**
 * AABB树
 * 基于包围盒的空间索引树，用于加速碰撞检测
 */
export declare const AABBTree: any;