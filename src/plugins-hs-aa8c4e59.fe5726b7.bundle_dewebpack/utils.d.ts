/**
 * Utils - 工具类
 * 提供路径交集计算和面组查询功能
 */
export declare class Utils {
  /**
   * 计算两个路径的交集
   * @param path1 - 第一个路径对象，包含外轮廓(outer)和孔洞(holes)
   * @param path2 - 第二个路径对象，包含外轮廓(outer)和孔洞(holes)
   * @returns 返回交集路径，如果无交集则返回 undefined
   * @description
   * 该方法通过以下步骤计算两个复杂路径的交集：
   * 1. 对两个路径的外轮廓进行交集运算
   * 2. 对两个路径的孔洞进行并集运算
   * 3. 返回新的路径对象，包含交集外轮廓和合并后的孔洞
   */
  static InterPath(
    path1: PathWithHoles,
    path2: PathWithHoles
  ): HSPaveSDK.Path | undefined;

  /**
   * 根据 ID 列表获取分组面对象
   * @param faceIds - 面对象 ID 数组
   * @returns 返回匹配的面对象数组
   * @description
   * 该方法遍历应用中的所有图层和楼层，查找匹配的面对象：
   * - 检查楼层本身
   * - 检查房间墙面
   * - 检查内墙面
   * 当找到所有匹配的面对象后立即返回
   */
  static getGroupFaces(faceIds: string[]): Face[];
}

/**
 * 带孔洞的路径对象
 */
interface PathWithHoles {
  /** 外轮廓坐标数组 */
  outer: number[][];
  /** 孔洞数组，每个孔洞是一个坐标数组 */
  holes: number[][][];
}

/**
 * 面对象接口
 */
interface Face {
  /** 面对象唯一标识符 */
  id: string;
  /** 其他面属性... */
  [key: string]: any;
}

/**
 * HSPaveSDK 命名空间
 */
declare namespace HSPaveSDK {
  /**
   * 路径类
   */
  class Path {
    constructor(outer: number[][], holes?: number[][][]);
    outer: number[][];
    holes?: number[][][];
  }

  /**
   * 裁剪模式枚举
   */
  enum ClipMode {
    /** 交集 */
    Inter = 'Inter',
    /** 并集 */
    Union = 'Union'
  }

  /**
   * 裁剪服务类
   */
  class ClipperService {
    /** 单例实例 */
    static readonly ins: ClipperService;

    /**
     * 路径裁剪操作
     * @param paths1 - 第一组路径
     * @param paths2 - 第二组路径
     * @param mode - 裁剪模式
     * @returns 裁剪结果路径数组
     */
    clip(paths1: Path[], paths2: Path[], mode: ClipMode): Path[];
  }
}

/**
 * HSCore 命名空间
 */
declare namespace HSCore {
  namespace Util {
    namespace Floor {
      /**
       * 查找楼层中的内墙
       * @param floor - 楼层对象
       * @returns 内墙数组
       */
      function findInteriorWallsInFloor(floor: any): InteriorWall[];
    }
  }
}

/**
 * 内墙接口
 */
interface InteriorWall {
  /**
   * 遍历内墙的所有面
   * @param callback - 回调函数，接收每个面对象
   */
  forEachFace(callback: (face: Face) => void): void;
}