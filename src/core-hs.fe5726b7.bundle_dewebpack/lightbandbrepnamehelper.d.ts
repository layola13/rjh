/**
 * 灯带Brep拓扑命名辅助类
 * 用于重建和管理3D几何体的拓扑命名，确保面的唯一标识
 */
export declare class LightBandBrepnameHelper {
  /**
   * 拓扑命名缓存，用于检测重复命名
   */
  private topoNameCaches: string[];

  /**
   * 获取单例实例
   * @returns LightBandBrepnameHelper的唯一实例
   */
  static getInstance(): LightBandBrepnameHelper;

  /**
   * 私有构造函数，确保单例模式
   */
  private constructor();

  /**
   * 重建Brep拓扑命名
   * @param sweepGeometry - 扫掠几何体对象，包含路径和轮廓信息
   * @param curveSweepFacesMap - 曲线到扫掠面的映射关系
   */
  reconstructBrepNames(
    sweepGeometry: SweepGeometry,
    curveSweepFacesMap: Map<CurveWithUserData, (Face | undefined)[]>
  ): void;

  /**
   * 根据曲线获取对应的扫掠面集合
   * @param curve - 带用户数据的曲线对象
   * @param curveSweepFacesMap - 曲线到扫掠面的映射关系
   * @returns 过滤后的面数组，排除undefined值
   */
  getCurveSweepFaces(
    curve: CurveWithUserData,
    curveSweepFacesMap: Map<CurveWithUserData, (Face | undefined)[]>
  ): Face[] | undefined;

  /**
   * 为扫掠几何体的所有面分配拓扑命名
   * @param sweepGeometry - 扫掠几何体对象
   * @param curveSweepFacesMap - 曲线到扫掠面的映射关系
   */
  toponameFaces(
    sweepGeometry: SweepGeometry,
    curveSweepFacesMap: Map<CurveWithUserData, (Face | undefined)[]>
  ): void;

  /**
   * 检查拓扑命名是否重复
   * @param topoName - 待检查的拓扑命名字符串
   * @returns 如果命名未重复返回true，重复则返回false并输出断言错误
   */
  checkTopoName(topoName: string): boolean;
}

/**
 * 扫掠几何体接口
 */
interface SweepGeometry {
  /**
   * 获取3D扫掠路径
   * @returns 路径段数组，每段可能包含用户数据标签
   */
  getSweepPath3D(): PathSegment[];

  /**
   * 获取扫掠轮廓曲线
   * @returns 轮廓曲线数组
   */
  getSweepProfile(): CurveWithUserData[];
}

/**
 * 带用户数据的曲线对象
 */
interface CurveWithUserData {
  userData?: {
    /** 曲线唯一标识 */
    id: string;
  };
}

/**
 * 路径段对象
 */
interface PathSegment {
  userData?: {
    /** 路径段标签 */
    tag: string;
  };
}

/**
 * 面对象
 */
interface Face {
  /** 面的拓扑命名标签 */
  tag?: string;
  userData?: {
    /** 面在扫掠路径中的索引 */
    faceIndex: number;
  };
}