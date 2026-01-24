/**
 * 3D对象相等性比较接口
 * 用于比较两个3D对象的内容、位置、尺寸和旋转是否相等
 */

/**
 * 3D对象接口
 * 描述具有位置、尺寸和旋转属性的3D实体
 */
interface Object3D {
  /** X轴坐标 */
  x: number;
  /** Y轴坐标 */
  y: number;
  /** Z轴坐标 */
  z: number;
  /** X轴方向尺寸 */
  XSize: number;
  /** Y轴方向尺寸 */
  YSize: number;
  /** Z轴方向尺寸 */
  ZSize: number;
  /** X轴旋转角度 */
  XRotation: number;
  /** Y轴旋转角度 */
  YRotation: number;
  /** Z轴旋转角度 */
  ZRotation: number;
}

/**
 * 比较两个3D对象是否完全相等
 * 
 * 检查以下属性的相等性：
 * - 内容相等性（通过isSameContent方法）
 * - 位置（x, y, z坐标）
 * - 尺寸（XSize, YSize, ZSize）
 * - 旋转（XRotation, YRotation, ZRotation）
 * 
 * @param first - 第一个3D对象
 * @param second - 第二个3D对象
 * @returns 如果所有属性都近似相等则返回true，否则返回false
 */
declare function areObjects3DEqual(
  first: Object3D,
  second: Object3D
): boolean;

/**
 * 检查两个对象的内容是否相同
 * 此方法应在调用上下文中定义
 * 
 * @param first - 第一个对象
 * @param second - 第二个对象
 * @returns 如果内容相同返回true，否则返回false
 */
declare function isSameContent(
  first: Object3D,
  second: Object3D
): boolean;

/**
 * HSCore工具命名空间
 */
declare namespace HSCore {
  namespace Util {
    namespace Math {
      /**
       * 比较两个数值是否近似相等（考虑浮点数精度误差）
       * 
       * @param a - 第一个数值
       * @param b - 第二个数值
       * @param epsilon - 可选的误差容限，默认值由实现决定
       * @returns 如果两个数值近似相等返回true，否则返回false
       */
      function nearlyEquals(a: number, b: number, epsilon?: number): boolean;
    }
  }
}