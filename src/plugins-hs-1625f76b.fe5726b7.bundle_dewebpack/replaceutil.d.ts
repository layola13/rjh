/**
 * 替换工具类 - 提供内容替换、材质更新、模型创建等功能
 */
declare class ReplaceUtil {
  /**
   * 断开面的连接
   * @param face - 要断开的面对象
   */
  static disconnectFaces(face: HSCore.Model.Face): void;

  /**
   * 批量替换材质
   * @param replacements - 替换配置数组
   */
  static replaceMaterials(
    replacements: Array<{
      /** 要应用材质的面集合 */
      faces: HSCore.Model.Face[];
      /** 要应用的材质 */
      material: HSCore.Material.Material;
    }>
  ): void;

  /**
   * 从选中内容生成JSON数据（异步）
   * @param options - 导出选项
   * @returns 包含数据、状态、约束、产品、材质等信息的JSON对象
   */
  static _getSelectedInJSON(options: {
    /** 转储的数据 */
    dump: any[];
    /** 材质数据映射 */
    materialsData: Map<string, any>;
    /** 产品ID列表 */
    productIds: string[];
    /** 生成的产品列表 */
    generatedProducts: Array<{ id: string; [key: string]: any }>;
  }): Promise<{
    /** 实体数据数组 */
    data: any[];
    /** 状态数组 */
    states: any[];
    /** 约束数组 */
    constraints: any[];
    /** 产品JSON数组 */
    products: any[];
    /** 材质数据数组 */
    materials: any[];
    /** 环境ID */
    environmentId: string;
    /** 视图模式 */
    viewMode: string;
    /** 是否完整 */
    isComplete: boolean;
  }>;

  /**
   * 粘贴内容到场景
   * @param dataContent - 数据内容
   * @param contentsJSON - 内容JSON对象
   * @param productsMap - 产品映射表
   * @returns 粘贴操作的结果
   */
  static pasteContent(
    dataContent: any,
    contentsJSON: any,
    productsMap: Map<string, any>
  ): any;

  /**
   * 批量粘贴多个内容
   * @param dataContents - 数据内容数组
   * @param contentsJSON - 内容JSON对象
   * @param productsMap - 产品映射表
   * @returns 粘贴结果数组
   */
  static pasteContents(
    dataContents: any[],
    contentsJSON: any,
    productsMap: Map<string, any>
  ): any[];

  /**
   * 创建模型（异步）
   * @param modelData - 模型数据配置
   * @param swing - 开合方向
   * @returns 创建的内容数组
   */
  static createModel(
    modelData: {
      dump: any[];
      materialsData: Map<string, any>;
      productIds: string[];
      generatedProducts: Array<{ id: string; [key: string]: any }>;
    },
    swing?: number
  ): Promise<HSCore.Model.Content[]>;

  /**
   * 删除多个内容
   * @param contents - 要删除的内容数组
   */
  static deleteContents(contents: HSCore.Model.Content[]): void;

  /**
   * 移动内容到新位置
   * @param content - 要移动的开口内容
   * @param position - 目标位置
   * @param size - 尺寸配置
   * @param rotation - 旋转角度
   * @param host - 宿主对象
   */
  static moveContent(
    content: HSCore.Model.Opening,
    position: { x: number; y: number; z: number },
    size: {
      x: number;
      y: number;
      z: number;
      archHeight?: number;
      ignoreValidate?: boolean;
    },
    rotation: number,
    host: HSCore.Model.Entity
  ): void;

  /**
   * 替换开口（异步）
   * @param opening - 原开口对象
   * @param newModelData - 新模型数据
   * @returns 替换后的开口对象
   */
  static replaceOpening(
    opening: HSCore.Model.Opening & {
      x: number;
      y: number;
      z: number;
      XSize: number;
      YSize: number;
      ZSize: number;
      archHeight?: number;
      rotation: number;
      swing?: number;
      host: HSCore.Model.Entity;
    },
    newModelData: any
  ): Promise<HSCore.Model.Opening>;

  /**
   * 替换开口的面材质
   * @param replacement - 替换配置
   */
  static replaceOpeningFaces(replacement: {
    /** 开口对象 */
    opening: HSCore.Model.Opening | HSCore.Model.ParametricOpening;
    /** 新材质 */
    material?: HSCore.Material.Material;
  }): void;

  /**
   * 获取内容及其所有子内容
   * @param content - 内容对象
   * @returns 内容数组（包含所有子内容）
   */
  static getAllContents(content: HSCore.Model.Content): HSCore.Model.Content[];

  /**
   * 获取吊顶及关联的所有内容
   * @param room - 房间对象
   * @returns 吊顶及相关内容数组
   */
  static getCeilingAllContents(room: HSCore.Model.Room): HSCore.Model.Content[];

  /**
   * 替换自定义线条造型
   * @param room - 房间对象
   * @param moldingData - 线条数据（为null则删除）
   * @param clearCeiling - 是否清除吊顶所有内容
   */
  static replaceNCustomizedMolding(
    room: HSCore.Model.Room,
    moldingData: {
      profile: {
        seekId: string;
        profileHigh?: string;
        profile: string;
        profileWidth?: number;
        profileHeight?: number;
        profileSizeX?: number;
        profileSizeY?: number;
        normalTexture?: string;
        normalTextureHigh?: string;
        iconSmallURI?: string;
        contentType: { getTypeString(): string };
      };
      material: HSCore.Material.Material;
    } | null,
    clearCeiling?: boolean
  ): void;

  /**
   * 获取线条线信息（内部方法）
   * @param featureModel - 特征模型
   * @returns 线条线信息对象
   */
  static _getMoldingLineInfo(featureModel: any): {
    parent: any;
    brepFace?: any;
    pathCoedge3dsTags: string[];
    params: Record<string, any>;
  } | undefined;

  /**
   * 获取线条参数（内部方法）
   * @param lineInfo - 线条线信息
   * @param moldingData - 线条数据
   * @returns 线条参数对象
   */
  static _getMoldingParams(
    lineInfo: {
      parent: any;
      brepFace?: any;
      pathCoedge3dsTags: string[];
      params: {
        flip?: boolean;
        flipHorizontal?: boolean;
        flipVertical?: boolean;
        offsetX?: number;
        offsetY?: number;
      };
    },
    moldingData: {
      profile: {
        seekId: string;
        profileHigh?: string;
        profile: string;
        profileWidth?: number;
        profileHeight?: number;
        profileSizeX?: number;
        profileSizeY?: number;
        normalTexture?: string;
        normalTextureHigh?: string;
        iconSmallURI?: string;
        contentType: { getTypeString(): string };
      };
      material: HSCore.Material.Material;
    }
  ): {
    seekId: string;
    relyerId: string;
    profile: string;
    previewProfile: string;
    profileHeight: number;
    profileWidth: number;
    flipHorizontal: boolean;
    flipVertical: boolean;
    flip: boolean;
    offsetX: number;
    offsetY: number;
    pathCoedge3dsTags: string[];
    faceTag?: string;
    materialData: any;
    texture: string;
    normalTexture?: string;
    normalTextureHigh?: string;
    iconSmall?: string;
    contentType: string;
  };

  /**
   * 替换墙面线条
   * @param moldingData - 线条数据
   * @param wall - 墙体对象
   * @param moldingType - 线条类型（默认"baseboard"）
   */
  static replaceMolding(
    moldingData: any,
    wall: HSCore.Model.Wall,
    moldingType?: string
  ): void;

  /**
   * 添加厨房吊顶（异步）
   * @param room - 房间对象
   * @param height - 吊顶高度
   * @param materialSeekId - 材质SeekID
   */
  static addKitchenCeiling(
    room: HSCore.Model.Room,
    height: number,
    materialSeekId?: string
  ): Promise<void>;

  /**
   * 从曲线集合中匹配线段（内部方法）
   * @param curves - 曲线数组
   * @param targetLine - 目标线段
   * @param offset - 偏移距离
   * @returns 匹配结果
   */
  static _getMatchedLineFromCurves(
    curves: any[],
    targetLine: any,
    offset: number
  ): { line: any; idx: number } | undefined;

  /**
   * 查找最近的点和线（内部方法）
   * @param curves - 曲线数组
   * @param line - 线段
   * @param point - 参考点
   * @returns 最近点和线的信息
   */
  static _findClosestPtAndLine(
    curves: any[],
    line: any,
    point: any
  ): { ptOnLine: any; line: any } | undefined;

  /**
   * 根据信息拆分环路（内部方法）
   * @param curves - 曲线数组
   * @param infos - 拆分信息
   * @param additionalPoints - 附加点
   * @returns 拆分后的环路数组
   */
  static _splitLoopByInfos(
    curves: any[],
    infos: Array<{ ptOnLine: any; line: any }>,
    additionalPoints: any[]
  ): any[];

  /**
   * 计算窗帘区域（内部方法）
   * @param roomCurves - 房间曲线
   * @param contents - 内容数组
   * @returns 主环路和其他环路
   */
  static _calcCurtainRegins(
    roomCurves: any[],
    contents: HSCore.Model.Content[]
  ): { mainLoop: any; otherLoops: any[] } | undefined;

  /**
   * 将环路转换为绘制路径（内部方法）
   * @param loop - 环路对象
   * @returns 绘制路径点数组
   */
  static _covertLoopToDrawPath(loop: any): Array<{ x: number; y: number }>;

  /**
   * 添加阳台吊顶（异步）
   * @param room - 房间对象
   * @param contents - 内容数组
   * @param targetRoom - 目标房间
   * @param mainHeight - 主区域高度
   * @param otherHeight - 其他区域高度
   * @param materialSeekId - 材质SeekID
   */
  static addBalconyCeiling(
    room: HSCore.Model.Room,
    contents: HSCore.Model.Content[],
    targetRoom: HSCore.Model.Room,
    mainHeight: number,
    otherHeight: number,
    materialSeekId?: string
  ): Promise<void>;

  /**
   * 替换装配体材质（异步）
   * @param assembly - 装配体对象
   * @param material - 新材质
   * @param forceReplace - 是否强制替换
   */
  static replaceDAssemblyMaterial(
    assembly: any,
    material: HSCore.Material.Material,
    forceReplace?: boolean
  ): Promise<void>;

  /**
   * 替换所有通用窗帘为默认窗帘（异步）
   * @returns 被替换的窗帘SeekID数组
   */
  static replaceCurtains(): Promise<string[]>;
}

export { ReplaceUtil };