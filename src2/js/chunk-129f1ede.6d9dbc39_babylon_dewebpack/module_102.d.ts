/**
 * 门窗框架模型生成工具类
 * 用于生成门窗的各种3D模型组件，包括扫描模型、挤出模型等
 */
declare module "module_102" {
  import { Vector3, Polyline2D } from "./module_3";
  import {
    ParamTexture,
    KJLTextureEnum,
    KJLModelItem,
    KJLModelWindowItem,
    ImportPath,
    ImportExtrusionModel,
    ImportSweepModel,
    ImportWNSweepModel,
    ModelParameter,
    PathCurve
  } from "./module_115";
  import { GeometryUtils } from "./module_16";
  import { MathUtils } from "./module_8";

  /**
   * 倾斜角度参数
   */
  interface AngleParameters {
    /** 前端倾斜角度 */
    QDQGJD: string;
    /** 前侧面X轴旋转模式 */
    QSMXQMS: string;
  }

  /**
   * 后端角度参数
   */
  interface BackAngleParameters {
    /** 左端倾斜角度 */
    ZDQGJD: string;
    /** 左侧面X轴旋转模式 */
    ZZMXQMS: string;
  }

  /**
   * 边界信息
   */
  interface BoundaryInfo {
    /** X轴最小值（毫米） */
    minX_mm: number;
    /** X轴最大值（毫米） */
    maxX_mm: number;
    /** Y轴最小值（毫米） */
    minY_mm: number;
    /** Y轴最大值（毫米） */
    maxY_mm: number;
  }

  /**
   * 纹理配置接口
   */
  interface TextureConfig {
    /** 纹理ID */
    id?: string;
    /** 顶部纹理ID */
    topId?: string;
    /** 底部纹理ID */
    bottomId?: string;
    /** 侧面纹理ID */
    sideId?: string;
    /** 旋转角度 */
    angle?: number;
    /** 侧面旋转角度 */
    sideAngle?: number;
  }

  /**
   * 门窗框架模型生成器
   * 提供静态方法用于创建各种门窗组件的3D模型
   */
  export default class ModelGenerator {
    /** 推拉窗玻璃扇锁具ID */
    static lock_pk_glassleaf_id: string;
    
    /** 推拉窗纱窗扇锁具ID */
    static lock_pk_screenleaf_id: string;
    
    /** 平开窗玻璃扇锁具ID */
    static lock_tl_glassleaf_id: string;
    
    /** 平开窗纱窗扇锁具ID */
    static lock_tl_screenleaf_id: string;
    
    /** 内侧纹理 */
    static texture_in: ParamTexture;
    
    /** 外侧纹理 */
    static texture_out: ParamTexture;
    
    /** 接头纹理 */
    static texture_jt: ParamTexture;
    
    /** 纱窗纹理 */
    static texture_gauze: ParamTexture;
    
    /** 玻璃纹理 */
    static texture_glass: ParamTexture;
    
    /** 转角纹理 */
    static texture_corner: ParamTexture;
    
    /** 连接条纹理 */
    static texture_lt: ParamTexture;

    /**
     * 初始化默认纹理和锁具配置
     */
    static Init(): void;

    /**
     * 设置锁具ID
     * @param lockId - 锁具ID
     * @param windowType - 窗户类型：0=玻璃扇，1=纱窗扇
     */
    static SetLock_Id(lockId: string, windowType?: number): void;

    /**
     * 将内侧纹理应用到转角
     */
    static SetInToCorner(): void;

    /**
     * 设置指定类型的纹理
     * @param textureType - 纹理类型枚举
     * @param config - 纹理配置对象
     */
    static SetTexture(textureType: KJLTextureEnum, config: TextureConfig | null): void;

    /**
     * 设置单ID纹理（用于内侧、外侧、接头）
     * @param texture - 目标纹理对象
     * @param config - 配置对象
     */
    private static set_texture_id(texture: ParamTexture, config: TextureConfig): void;

    /**
     * 设置顶部/底部/侧面纹理
     * @param texture - 目标纹理对象
     * @param config - 配置对象
     */
    private static set_texture_topbottomside(texture: ParamTexture, config: TextureConfig): void;

    /**
     * 生成门窗框架模型项
     * @param name - 模型名称
     * @param type - 模型类型
     * @param category - 类别
     * @param translate - 平移向量 [x, y, z]
     * @param rotate - 旋转向量 [rx, ry, rz] 弧度
     * @param dimensions - 尺寸 [宽, 高, 深]
     * @param frontAngle - 前端角度参数
     * @param backAngle - 后端角度参数
     * @param innerWidth - 内部宽度（可选）
     * @param openDirection - 开启方向（可选）
     * @returns 门窗模型项
     */
    static GenKJLModelItem(
      name: string | null,
      type: string | null,
      category: string,
      translate?: number[] | null,
      rotate?: number[] | null,
      dimensions?: number[] | null,
      frontAngle?: AngleParameters | null,
      backAngle?: BackAngleParameters | null,
      innerWidth?: number,
      openDirection?: number
    ): KJLModelItem;

    /**
     * 生成窗户模型项
     * @param name - 模型名称
     * @param type - 模型类型
     * @param category - 类别
     * @param translate - 平移向量
     * @param rotate - 旋转向量
     * @param dimensions - 尺寸 [宽, 高, 深]
     * @returns 窗户模型项
     */
    static GenKJLWindowItem(
      name: string,
      type: string | null,
      category: string,
      translate?: number[] | null,
      rotate?: number[] | null,
      dimensions?: number[] | null
    ): KJLModelWindowItem;

    /**
     * 生成扫描模型（sweep model）
     * @param profile - 轮廓线
     * @param path - 路径数据
     * @param translateX - X轴平移
     * @param translateY - Y轴平移
     * @param offsetZ - Z轴偏移
     * @param offsetY - Y轴偏移
     * @param rotateMode - 旋转模式
     * @param name - 模型名称
     * @param texture - 纹理
     * @param zOffset - Z轴额外偏移
     * @param frontAngle - 前端角度
     * @param backAngle - 后端角度
     * @returns 导入扫描模型
     */
    static GenSweepModel(
      profile: Polyline2D,
      path: ImportPath,
      translateX: number,
      translateY: number,
      offsetZ: number,
      offsetY: number,
      rotateMode: number | null,
      name?: string | null,
      texture?: ParamTexture | null,
      zOffset?: number | null,
      frontAngle?: AngleParameters | null,
      backAngle?: BackAngleParameters | null
    ): ImportSweepModel | ImportWNSweepModel;

    /**
     * 生成挤出模型（extrusion model）
     * @param contour - 外轮廓点集
     * @param thickness - 厚度
     * @param yOffset - Y轴偏移
     * @param name - 模型名称
     * @param holes - 内孔轮廓数组（可选）
     * @param texture - 纹理（可选）
     * @returns 挤出模型
     */
    static GenExtrusionModel(
      contour: Vector3[],
      thickness: number,
      yOffset: number,
      name?: string | null,
      holes?: Vector3[][] | undefined,
      texture?: ParamTexture
    ): ImportExtrusionModel;

    /**
     * 生成挤出模型零件项
     * @param name - 零件名称
     * @param contour - 轮廓点集
     * @param thickness - 厚度
     * @param textureId - 纹理ID
     * @param texture - 纹理对象
     * @param translate - 平移向量，默认 [0, 0, 0]
     * @returns 挤出模型
     */
    static GenExtrusionModel_PartItem(
      name: string,
      contour: Vector3[],
      thickness: number,
      textureId: string,
      texture: ParamTexture,
      translate?: number[]
    ): ImportExtrusionModel;

    /**
     * 生成引用类型的模型项
     * @param name - 模型名称
     * @param refId - 引用ID
     * @param translate - 平移向量
     * @param rotate - 旋转向量
     * @param dimensions - 尺寸
     * @param installPosition - 安装位置
     * @returns 模型项
     */
    static GenKJLModelItem_ref(
      name: string | null,
      refId: string,
      translate?: number[] | null,
      rotate?: number[] | null,
      dimensions?: number[] | null,
      installPosition?: number | null
    ): KJLModelItem;

    /**
     * 生成标准扫描模型
     * @param profile - 轮廓线
     * @param path - 路径
     * @param translateX - X轴平移
     * @param translateY - Y轴平移
     * @param offsetZ - Z轴偏移
     * @param offsetY - Y轴偏移
     * @param rotateMode - 旋转模式
     * @param name - 模型名称
     * @param texture - 纹理
     * @param zAdjust - Z轴调整值
     * @returns 扫描模型
     */
    static genNormalSweepModel(
      profile: Polyline2D,
      path: ImportPath,
      translateX: number,
      translateY: number,
      offsetZ: number,
      offsetY: number,
      rotateMode: number | null,
      name?: string | null,
      texture?: ParamTexture | null,
      zAdjust?: number | null
    ): ImportSweepModel;

    /**
     * 生成WN扫描模型（带角度参数）
     * @param profile - 轮廓线
     * @param path - 路径
     * @param translateX - X轴平移
     * @param translateY - Y轴平移
     * @param boundary - 边界信息
     * @param rotateMode - 旋转模式
     * @param name - 模型名称
     * @param texture - 纹理
     * @param zOffset - Z轴偏移
     * @param dimensions - 尺寸
     * @param frontAngle - 前端角度参数
     * @param backAngle - 后端角度参数
     * @returns WN扫描模型
     */
    static genWNSweepModel(
      profile: Polyline2D,
      path: ImportPath,
      translateX: number,
      translateY: number,
      boundary: BoundaryInfo,
      rotateMode: number | null,
      name?: string | null,
      texture?: ParamTexture | null,
      zOffset?: number | null,
      dimensions?: number[] | null,
      frontAngle?: AngleParameters | null,
      backAngle?: BackAngleParameters | null
    ): ImportWNSweepModel;

    /**
     * 生成新版WN扫描模型（改进的坐标系统）
     * @param profile - 轮廓线
     * @param path - 路径
     * @param translateX - X轴平移
     * @param translateY - Y轴平移
     * @param boundary - 边界信息
     * @param rotateMode - 旋转模式
     * @param name - 模型名称
     * @param texture - 纹理
     * @param zOffset - Z轴偏移
     * @param dimensions - 尺寸
     * @param frontAngle - 前端角度参数
     * @param backAngle - 后端角度参数
     * @returns WN扫描模型
     */
    static genWNSweepModelNew(
      profile: Polyline2D,
      path: ImportPath,
      translateX: number,
      translateY: number,
      boundary: BoundaryInfo,
      rotateMode: number | null,
      name?: string | null,
      texture?: ParamTexture | null,
      zOffset?: number | null,
      dimensions?: number[] | null,
      frontAngle?: AngleParameters | null,
      backAngle?: BackAngleParameters | null
    ): ImportWNSweepModel;
  }
}