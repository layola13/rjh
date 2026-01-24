/**
 * 3D向量数学工具库
 * 提供向量的基本运算功能（叉乘、点乘、归一化等）
 */

/**
 * 向量类型：支持2D或3D向量
 */
export type Vector = [number, number] | [number, number, number];

/**
 * 3D向量类型
 */
export type Vector3D = [number, number, number];

/**
 * 计算两个向量的叉乘
 * 
 * @param e - 第一个向量（2D或3D）
 * @param t - 第二个向量（2D或3D）
 * @returns 叉乘结果（3D向量）
 * 
 * @remarks
 * - 如果输入是2D向量，会自动扩展为3D向量（z=0）
 * - 叉乘结果垂直于两个输入向量所在平面
 */
export function cross(e: Vector, t: Vector): Vector3D;

/**
 * 计算向量的长度（模）
 * 
 * @param e - 输入向量
 * @returns 向量的欧几里得长度
 * 
 * @remarks
 * 使用公式：√(x² + y² + z²)
 */
export function length(e: Vector): number;

/**
 * 计算两个向量的点乘（内积）
 * 
 * @param e - 第一个向量
 * @param t - 第二个向量
 * @returns 点乘结果（标量）
 * 
 * @remarks
 * 点乘结果反映了两个向量的方向相似度
 */
export function dot(e: Vector, t: Vector): number;

/**
 * 归一化向量（转换为单位向量）
 * 
 * @param e - 输入向量
 * @returns 方向相同但长度为1的向量
 * 
 * @remarks
 * 如果输入向量长度为0，结果可能包含NaN
 */
export function normalize(e: Vector): Vector3D;

/**
 * 向量加法
 * 
 * @param e - 第一个向量
 * @param t - 第二个向量
 * @returns 两个向量的和
 */
export function add(e: Vector, t: Vector): Vector3D;

/**
 * 向量减法
 * 
 * @param e - 被减向量
 * @param t - 减向量
 * @returns 两个向量的差（e - t）
 */
export function subtract(e: Vector, t: Vector): Vector3D;

/**
 * 向量减法的别名
 * @see {@link subtract}
 */
export function sub(e: Vector, t: Vector): Vector3D;