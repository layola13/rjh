/**
 * 面组工具类
 * 提供面组的识别、查询和变换操作
 */

import { MathService } from './math-service';
import { MaterialUtil } from './material-util';
import { FloorMixpaintUtil } from './floor-mixpaint-util';

/**
 * 面组配置接口
 */
interface FaceGroupConfig {
  /** 面组唯一标识符 */
  faceGroupId: string;
  /** 获取面组包含的所有面ID */
  getFaceIds(): string[];
  /** 根据ID获取变换矩阵 */
  getTransformById(id: string): Matrix | undefined;
}

/**
 * 混合绘制配置接口
 */
interface MixpaintConfig {
  /** 面组配置 */
  faceGroup?: FaceGroupConfig;
}

/**
 * 材质配置接口
 */
interface MaterialConfig {
  /** 混合绘制配置 */
  mixpaint?: MixpaintConfig;
}

/**
 * 实体基础接口
 */
interface Entity {
  /** 实体唯一标识符 */
  id: string;
  /** 实体材质配置 */
  material?: MaterialConfig;
  /** 原始2D路径 */
  rawPath2d?: Path2D;
}

/**
 * 地板实体接口
 */
interface Floor extends Entity {
  // 地板特有属性可在此扩展
}

/**
 * 2D路径类型
 */
type Path2D = unknown; // 根据实际HSCore定义调整

/**
 * 变换矩阵类型
 */
interface Matrix {
  /** 检查是否为单位矩阵 */
  isIdentity(): boolean;
}

/**
 * 文档管理器接口
 */
interface DocumentManager {
  /** 当前活动文档 */
  activeDocument: Document;
}

/**
 * 文档接口
 */
interface Document {
  /** 根据ID获取实体 */
  getEntityById(id: string): Entity | null;
}

/**
 * 面组工具类
 * 用于处理面组相关的业务逻辑
 */
export class FaceGroupUtil {
  /**
   * 判断实体是否属于面组
   * @param entity - 待检查的实体
   * @returns 如果实体属于面组则返回true
   */
  static isFaceGroup(entity: Entity): boolean {
    const material = entity.material;
    return this.isFaceGroupMixpaint(material?.mixpaint);
  }

  /**
   * 判断混合绘制配置是否包含有效面组
   * @param mixpaint - 混合绘制配置
   * @returns 如果包含有效面组则返回true
   */
  static isFaceGroupMixpaint(mixpaint?: MixpaintConfig): boolean {
    const faceGroup = mixpaint?.faceGroup;
    return !!(faceGroup && faceGroup.faceGroupId);
  }

  /**
   * 获取面组中的所有面实体
   * @param entity - 包含面组的实体
   * @returns 面组中的所有面实体数组
   */
  static getGroupFaces(entity: Entity): Entity[] {
    const faceGroup = entity.material?.mixpaint?.faceGroup;
    
    if (!faceGroup || !faceGroup.faceGroupId) {
      return [];
    }

    const documentManager: DocumentManager = (globalThis as any).HSCore.Doc.getDocManager();
    const document = documentManager.activeDocument;
    const faceIds = faceGroup.getFaceIds();
    const faces: Entity[] = [];

    faceIds.map((faceId) => {
      const face = document.getEntityById(faceId);
      if (face) {
        faces.push(face);
      }
    });

    return faces;
  }

  /**
   * 判断面组是否需要清除RCP（Rich Color Palette）
   * @param entity - 待检查的实体
   * @returns 如果需要清除RCP则返回true
   */
  static faceGroupNeedClearRCP(entity: Entity): boolean {
    const isEntityRCP = MaterialUtil.isRCP(entity);
    const hasInconsistentRCP = this.getGroupFaces(entity).some(
      (face) => MaterialUtil.isRCP(face) !== isEntityRCP
    );
    return isEntityRCP && hasInconsistentRCP;
  }

  /**
   * 获取面组的变换矩阵
   * @param entity - 实体对象
   * @returns 变换矩阵，如果不存在则返回undefined
   */
  static getFaceGroupTransform(entity: Entity): Matrix | undefined {
    const material = entity.material;
    if (material) {
      return this.getFaceGroupTransformMixpaint(entity.id, material.mixpaint);
    }
  }

  /**
   * 从混合绘制配置中获取指定ID的变换矩阵
   * @param entityId - 实体ID
   * @param mixpaint - 混合绘制配置
   * @returns 变换矩阵，如果不存在则返回undefined
   */
  static getFaceGroupTransformMixpaint(
    entityId: string,
    mixpaint?: MixpaintConfig
  ): Matrix | undefined {
    if (mixpaint) {
      return mixpaint.faceGroup?.getTransformById(entityId);
    }
  }

  /**
   * 获取铺贴轮廓路径
   * @param entity - 实体对象（可能是Floor或普通Entity）
   * @param useRcpBackground - 是否使用RCP背景
   * @returns 处理后的2D路径
   */
  static getPaveOutline(entity: Entity | Floor, useRcpBackground: boolean): Path2D {
    let outline: Path2D;

    // 根据实体类型选择不同的路径获取方式
    if (entity instanceof (globalThis as any).HSCore.Model.Floor) {
      outline = FloorMixpaintUtil.getFloorBackgroundWithOpening(entity as Floor);
    } else if (useRcpBackground) {
      outline = (globalThis as any).HSCore.Util.Face.getFaceRcpBackground(entity);
    } else {
      outline = entity.rawPath2d!;
    }

    // 应用面组变换
    const transform = this.getFaceGroupTransform(entity);
    if (transform && !transform.isIdentity()) {
      outline = MathService.ins.transformedPath(outline, transform);
    }

    return outline;
  }
}