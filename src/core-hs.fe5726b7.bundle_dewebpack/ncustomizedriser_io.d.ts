/**
 * 自定义立柱模块
 * 提供立柱结构的IO操作和实体定义
 */

import { Line2d } from './geometry';
import { NCustomizedStructure, NCustomizedStructre_IO, StructureMode } from './customized-structure';
import { Entity } from './entity';

/**
 * 用户数据接口，用于存储曲线元数据
 */
interface CurveUserData {
  /** 曲线标识符：'left' | 'right' | 'front' | 'back' */
  curveid: string;
  /** 曲线索引 */
  index: number;
}

/**
 * 2D变换矩阵类型
 */
type Transform2D = unknown; // 根据实际项目定义

/**
 * 加载选项配置
 */
interface LoadOptions {
  [key: string]: unknown;
}

/**
 * 转储选项配置
 */
interface DumpOptions {
  [key: string]: unknown;
}

/**
 * 自定义立柱IO处理类
 * 负责立柱数据的序列化和反序列化
 */
export class NCustomizedRiser_IO extends NCustomizedStructre_IO {
  /**
   * 序列化立柱实体为数据对象
   * @param entity - 要序列化的实体
   * @param callback - 序列化后的回调函数
   * @param recursive - 是否递归序列化子对象
   * @param options - 序列化选项
   * @returns 序列化后的数据对象
   */
  dump(
    entity: NCustomizedRiser,
    callback?: (data: unknown, entity: NCustomizedRiser) => void,
    recursive: boolean = true,
    options: DumpOptions = {}
  ): unknown {
    const data = super.dump(entity, undefined, recursive, options);
    
    if (callback) {
      callback(data, entity);
    }
    
    return data;
  }

  /**
   * 从数据对象反序列化为立柱实体
   * @param data - 要反序列化的数据
   * @param target - 目标实体对象
   * @param options - 反序列化选项
   */
  load(data: unknown, target: NCustomizedRiser, options: LoadOptions = {}): void {
    super.load(data, target, options);
  }
}

/**
 * 自定义立柱实体类
 * 表示墙体部件中的立柱结构
 */
export class NCustomizedRiser extends NCustomizedStructure {
  /**
   * 创建立柱实例
   * @param id - 实体唯一标识符
   */
  constructor(id: string = "") {
    super(id);
    this.structureMode = StructureMode.wallpart;
  }

  /**
   * 通过元数据初始化立柱
   * @param meta - 元数据对象
   */
  initByMeta(meta: unknown): void {
    super.initByMeta(meta);
  }

  /**
   * 获取立柱的主要路径（轮廓的第一个数组）
   */
  get path(): Line2d[] {
    const profile = this.calcProfile();
    return profile ? profile[0] : [];
  }

  /**
   * 获取立柱的3D高度（考虑缩放）
   */
  get height3d(): number {
    return this.ZLength * this.ZScale;
  }

  /**
   * 设置立柱的3D高度（自动计算缩放）
   */
  set height3d(value: number) {
    this.ZLength = value / this.ZScale;
  }

  /**
   * 获取立柱的中心曲线（经过2D变换）
   */
  get curve(): Line2d {
    const line = new Line2d(
      { x: -this.XSize / 2, y: 0 },
      { x: this.XSize / 2, y: 0 }
    );
    
    const transform = this.get2DTransform();
    line.transform(transform);
    
    return line;
  }

  /**
   * 设置结构模式（当前为空实现）
   * @param mode - 结构模式
   */
  setStructureMode(mode: StructureMode): void {
    // 空实现
  }

  /**
   * 计算立柱的轮廓路径（矩形的四条边）
   * @param applyTransform - 是否应用2D变换
   * @returns 轮廓路径数组的数组
   */
  calcProfile(applyTransform: boolean = true): Line2d[][] {
    const halfWidth = this.XSize / 2;
    const halfHeight = this.YSize / 2;

    // 右边线
    const rightLine = new Line2d(
      { x: -halfWidth, y: -halfHeight },
      { x: halfWidth, y: -halfHeight }
    );
    rightLine.userData = { curveid: "right", index: 0 } as CurveUserData;

    // 前边线
    const frontLine = new Line2d(
      { x: halfWidth, y: -halfHeight },
      { x: halfWidth, y: halfHeight }
    );
    frontLine.userData = { curveid: "front", index: 0 } as CurveUserData;

    // 左边线
    const leftLine = new Line2d(
      { x: halfWidth, y: halfHeight },
      { x: -halfWidth, y: halfHeight }
    );
    leftLine.userData = { curveid: "left", index: 0 } as CurveUserData;

    // 后边线
    const backLine = new Line2d(
      { x: -halfWidth, y: halfHeight },
      { x: -halfWidth, y: -halfHeight }
    );
    backLine.userData = { curveid: "back", index: 0 } as CurveUserData;

    if (applyTransform) {
      const transform = this.get2DTransform();
      rightLine.transform(transform);
      frontLine.transform(transform);
      leftLine.transform(transform);
      backLine.transform(transform);
    }

    return [[rightLine, frontLine, leftLine, backLine]];
  }

  /**
   * 获取左侧路径
   */
  get leftPath(): Line2d | undefined {
    const profile = this.calcProfile(true);
    if (!profile) return undefined;

    const leftPaths = profile[0].filter(
      (line) => line.userData && (line.userData as CurveUserData).curveid === "left"
    );

    return leftPaths.length > 0 ? leftPaths[0] : undefined;
  }

  /**
   * 获取右侧路径
   */
  get rightPath(): Line2d | undefined {
    const profile = this.calcProfile(true);
    if (!profile) return undefined;

    const rightPaths = profile[0].filter(
      (line) => line.userData && (line.userData as CurveUserData).curveid === "right"
    );

    return rightPaths.length > 0 ? rightPaths[0] : undefined;
  }

  /**
   * 创建新的立柱实例
   * @returns 新的NCustomizedRiser实例
   */
  newSelf(): NCustomizedRiser {
    return new NCustomizedRiser();
  }

  /**
   * 获取IO处理器实例
   * @returns IO处理器单例
   */
  getIO(): NCustomizedRiser_IO {
    return NCustomizedRiser_IO.instance();
  }
}

// 注册实体类到全局注册表
Entity.registerClass(HSConstants.ModelClass.NCustomizedRiser, NCustomizedRiser);