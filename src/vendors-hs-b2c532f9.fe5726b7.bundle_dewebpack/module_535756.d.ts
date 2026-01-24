/**
 * 3D向量数学工具库
 * 提供向量的基本运算功能，支持2D和3D向量
 */

/**
 * 2D或3D向量类型
 * 可以是二维 [x, y] 或三维 [x, y, z] 坐标
 */
export type Vector2D = [number, number];
export type Vector3D = [number, number, number];
export type Vector = Vector2D | Vector3D;

/**
 * 计算向量的欧几里得长度（模）
 * @param vector - 输入向量（取前3个分量）
 * @returns 向量的长度
 * @example
 * length([3, 4, 0]) // 返回 5
 */
export function length(vector: Vector): number;

/**
 * 计算两个向量的点积（内积）
 * @param vectorA - 第一个向量
 * @param vectorB - 第二个向量
 * @returns 点积结果
 * @example
 * dot([1, 2, 3], [4, 5, 6]) // 返回 32
 */
export function dot(vectorA: Vector, vectorB: Vector): number;

/**
 * 计算两个向量的叉积（外积）
 * 自动将2D向量扩展为3D（z=0）
 * @param vectorA - 第一个向量
 * @param vectorB - 第二个向量
 * @returns 3D叉积向量
 * @example
 * cross([1, 0, 0], [0, 1, 0]) // 返回 [0, 0, 1]
 */
export function cross(vectorA: Vector, vectorB: Vector): Vector3D;

/**
 * 归一化向量（转换为单位向量）
 * @param vector - 输入向量
 * @returns 长度为1的同方向向量
 * @example
 * normalize([3, 4, 0]) // 返回 [0.6, 0.8, 0]
 */
export function normalize(vector: Vector): Vector3D;

/**
 * 向量加法
 * @param vectorA - 第一个向量
 * @param vectorB - 第二个向量
 * @returns 两向量之和
 * @example
 * add([1, 2, 3], [4, 5, 6]) // 返回 [5, 7, 9]
 */
export function add(vectorA: Vector, vectorB: Vector): Vector3D;

/**
 * 向量减法（完整名称）
 * @param vectorA - 被减向量
 * @param vectorB - 减向量
 * @returns vectorA - vectorB 的结果
 * @example
 * subtract([5, 7, 9], [1, 2, 3]) // 返回 [4, 5, 6]
 */
export function subtract(vectorA: Vector, vectorB: Vector): Vector3D;

/**
 * 向量减法（简写别名）
 * @param vectorA - 被减向量
 * @param vectorB - 减向量
 * @returns vectorA - vectorB 的结果
 * @see subtract
 */
export function sub(vectorA: Vector, vectorB: Vector): Vector3D;