/**
 * 坐标转换工具类
 * 提供3D空间中的矩阵变换、坐标系转换、单位转换等功能
 */
declare module TransUtil {
  /**
   * 3D点坐标接口
   */
  interface Point3D {
    x: number;
    y: number;
    z: number;
  }

  /**
   * 实体变换参数接口
   */
  interface EntityTransform {
    /** X轴位置 */
    x?: number;
    /** Y轴位置 */
    y?: number;
    /** Z轴位置 */
    z?: number;
    /** X轴旋转角度（度） */
    XRotation?: number;
    /** Y轴旋转角度（度） */
    YRotation?: number;
    /** Z轴旋转角度（度） */
    ZRotation?: number;
    /** X轴缩放 */
    XScale?: number;
    /** Y轴缩放 */
    YScale?: number;
    /** Z轴缩放 */
    ZScale?: number;
    /** Z轴长度 */
    ZLength: number;
    /** 是否翻转 */
    flip?: boolean;
  }

  /**
   * 变换选项接口
   */
  interface TransformOptions {
    /** 是否需要翻转处理 */
    needFlip?: boolean;
    /** 欧拉角旋转顺序 */
    order?: string;
  }

  /**
   * 单位变换数据接口
   */
  interface UnitTransformData {
    /** 单位位置向量 */
    unitPos: THREE.Vector3;
    /** 单位四元数 */
    unitQuat: THREE.Quaternion;
    /** 单位缩放向量 */
    unitScale: THREE.Vector3;
  }

  /**
   * 将点集转换到XY平面的变换矩阵（Z轴朝上）
   * @param points - 3D点数组
   * @param center - 可选的中心点，默认使用点集包围盒中心
   * @returns 转换矩阵
   */
  function toXYPlanMatrixUp(
    points: Point3D[],
    center?: THREE.Vector3
  ): THREE.Matrix4;

  /**
   * 将点集转换到XY平面的变换矩阵（扩展版本，指定中心点）
   * @param points - 3D点数组
   * @param center - 指定的中心点
   * @param upVector - 可选的向上方向向量
   * @returns 转换矩阵
   */
  function toXYPlanMatrixUpEx(
    points: Point3D[],
    center: THREE.Vector3,
    upVector?: THREE.Vector3
  ): THREE.Matrix4;

  /**
   * 计算从局部坐标系到世界坐标系的变换矩阵（内部方法）
   * @param points - 定义平面的点集
   * @param upVector - 可选的向上方向向量
   * @returns 局部到世界的变换矩阵
   */
  function _getLocalToWorld(
    points: Point3D[],
    upVector?: THREE.Vector3
  ): THREE.Matrix4;

  /**
   * 计算点集所在平面的法向量（内部方法）
   * @param points - 3D点数组
   * @returns 归一化的法向量，如果计算失败则返回undefined
   */
  function _computeNormal(points: Point3D[]): THREE.Vector3 | undefined;

  /**
   * 将矩阵从模型坐标系转换到THREE.js坐标系
   * Y轴和Z轴交换，Y轴取反
   * @param matrix - 模型坐标系的矩阵
   * @returns THREE.js坐标系的矩阵
   */
  function toTHREEMatrix(matrix: THREE.Matrix4): THREE.Matrix4;

  /**
   * 将矩阵从THREE.js坐标系转换到模型坐标系
   * Y轴和Z轴交换，Z轴取反
   * @param matrix - THREE.js坐标系的矩阵
   * @returns 模型坐标系的矩阵
   */
  function toModelMatrix(matrix: THREE.Matrix4): THREE.Matrix4;

  /**
   * 将矩阵的位置分量从米转换为指定单位
   * @param matrix - 要转换的矩阵
   * @param unit - 目标长度单位，默认为厘米
   * @returns 转换后的矩阵（修改原矩阵）
   */
  function convertMatrixUnit(
    matrix: THREE.Matrix4,
    unit?: HSCore.Util.Unit.LengthUnitTypeEnum
  ): THREE.Matrix4;

  /**
   * 将矩阵的位置分量从指定单位转换回米
   * @param matrix - 要转换的矩阵
   * @param unit - 源长度单位，默认为厘米
   * @returns 转换后的矩阵（修改原矩阵）
   */
  function revertMatrixUnit(
    matrix: THREE.Matrix4,
    unit?: HSCore.Util.Unit.LengthUnitTypeEnum
  ): THREE.Matrix4;

  /**
   * 将坐标系的原点从米转换为指定单位
   * @param coord - 要转换的坐标系
   * @param unit - 目标长度单位，默认为厘米
   * @returns 转换后的新坐标系（不修改原对象）
   */
  function convertCoordUnit(
    coord: any, // 根据实际的坐标系类型定义
    unit?: HSCore.Util.Unit.LengthUnitTypeEnum
  ): any;

  /**
   * 将坐标系的原点从指定单位转换回米
   * @param coord - 要转换的坐标系
   * @param unit - 源长度单位，默认为厘米
   * @returns 转换后的新坐标系（不修改原对象）
   */
  function revertCoordUnit(
    coord: any, // 根据实际的坐标系类型定义
    unit?: HSCore.Util.Unit.LengthUnitTypeEnum
  ): any;

  /**
   * 计算从源路径到目标路径的变换矩阵
   * 路径由三个点定义：原点、X轴方向点、Y轴方向点
   * @param sourcePath - 源路径的三个点
   * @param targetPath - 目标路径的三个点
   * @returns 从源路径到目标路径的变换矩阵
   */
  function getConvertPathMatrix(
    sourcePath: [THREE.Vector3, THREE.Vector3, THREE.Vector3],
    targetPath: [THREE.Vector3, THREE.Vector3, THREE.Vector3]
  ): THREE.Matrix4;

  /**
   * 根据实体参数计算局部变换矩阵
   * 应用顺序：沿Z轴平移 -> 缩放 -> 旋转 -> 沿Z轴反向平移 -> 最终位置平移
   * @param entity - 实体变换参数
   * @param options - 变换选项
   * @returns 局部变换矩阵
   */
  function computeLocalTransform(
    entity: EntityTransform,
    options?: TransformOptions
  ): THREE.Matrix4;

  /**
   * 根据实体参数计算世界变换矩阵
   * 在局部变换基础上加上实体的基准高度
   * @param entity - 实体对象
   * @param options - 变换选项
   * @returns 世界变换矩阵
   */
  function computeWorldTransform(
    entity: any, // 根据实际的实体类型定义
    options?: TransformOptions
  ): THREE.Matrix4;

  /**
   * 获取单位变换数据（恒等变换）
   * @returns 包含单位位置、旋转和缩放的对象
   */
  function getUnitTransData(): UnitTransformData;
}

export { TransUtil };