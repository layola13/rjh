/**
 * 自定义图纸工具模块
 * 提供获取面材质的图纸数据及坐标转换功能
 */

import { Matrix4 } from 'three'; // 假设模块 55256
import { MixPaveDwgDecorator, MathService } from './math-service'; // 假设模块 20198
import { Material } from './material'; // 假设模块 40747
import { MaterialData } from './material-data'; // 假设模块 47195
import { BaseDwgUtil } from './base-dwg-util'; // 假设模块 62581
import { NCustomizedFaceGroupUtil } from './customized-face-group-util'; // 假设模块 77237
import { PaintsUtil } from './paints-util'; // 假设模块 62786

/**
 * 二维路径结构
 */
interface Curve2dPath {
  /** 外轮廓线段数组 */
  outer: Array<unknown>;
  /** 孔洞轮廓线段数组 */
  holes?: Array<Array<unknown>>;
}

/**
 * 面漆绘制信息
 */
interface FacePaintInfo {
  /** 面的二维路径集合，第一个为外轮廓，其余为孔洞 */
  facePaths2d: Array<Array<unknown>>;
  /** 世界投影矩阵 */
  worldProjectMatrix: {
    toArray(): ArrayLike<number>;
  };
}

/**
 * 图纸数据结果
 */
interface DwgDataResult {
  /** 铺装图纸数据 */
  paveDwgData: unknown;
  /** 世界坐标变换矩阵 */
  worldTransform: Matrix4;
}

/**
 * 自定义图纸工具类
 * 用于处理自定义模型面的图纸数据提取和坐标转换
 */
export class NCustomizedDwgUtil {
  /**
   * 获取指定面的图纸数据
   * @param model - 模型对象
   * @param faceId - 面ID
   * @param options - 可选配置参数
   * @returns 包含图纸数据和世界坐标变换的结果对象，若无数据则返回 undefined
   */
  static getDwgData(
    model: unknown,
    faceId: string | number,
    options?: unknown
  ): DwgDataResult | undefined {
    // 获取面材质或材质数据
    const materialOrData =
      (model as any).getFaceMaterial(faceId) ||
      (model as any).getFaceMaterialData(faceId);

    if (!materialOrData) {
      return undefined;
    }

    let paveDwgData: unknown;
    let materialData: MaterialData | undefined;
    let paintInfo: FacePaintInfo | undefined;
    let worldTransform: Matrix4 | undefined;
    let result: DwgDataResult | undefined;

    if (materialOrData instanceof Material) {
      const { mixpaint } = materialOrData;

      if (mixpaint) {
        // 检查是否为面组
        const isFaceGroup = NCustomizedFaceGroupUtil.isFaceGroup(model, faceId);
        let faceGroupTransform: unknown;
        let curve2dPaths: Curve2dPath[] | undefined;
        let needClearRCP = false;

        // 面组需要清除 RCP 标记
        if (isFaceGroup) {
          needClearRCP = NCustomizedFaceGroupUtil.faceGroupNeedClearRCP(model, faceId);
        }

        // 获取面漆信息
        paintInfo = PaintsUtil.getCustomizedModelFacePaintInfo(
          model,
          faceId,
          undefined,
          needClearRCP
        );

        if (!paintInfo) {
          return undefined;
        }

        // 获取世界坐标变换
        worldTransform = this._getWorldTransform(paintInfo);

        // 处理面组变换
        if (isFaceGroup) {
          faceGroupTransform = NCustomizedFaceGroupUtil.getFaceGroupTransform(model, faceId);
          curve2dPaths = [this._getCurve2dPath(paintInfo)];
          BaseDwgUtil.preFaceGroupTransform(curve2dPaths, faceGroupTransform);
        }

        // 生成混合铺装图纸数据
        paveDwgData = new MixPaveDwgDecorator(mixpaint.mixPave, options).getDwgData(
          curve2dPaths
        );

        // 应用面组后置变换
        if (isFaceGroup) {
          const postTransform = BaseDwgUtil.postFaceGroupTransform(faceGroupTransform);
          if (postTransform) {
            worldTransform.multiply(Matrix4.makeByMatrix3(postTransform));
          }
        }
      } else {
        materialData = materialOrData.getMaterialData();
      }
    } else if (materialOrData instanceof MaterialData) {
      materialData = materialOrData;
    }

    // 处理普通材质数据
    if (materialData) {
      paintInfo = PaintsUtil.getCustomizedModelFacePaintInfo(model, faceId);

      if (!paintInfo) {
        return undefined;
      }

      worldTransform = this._getWorldTransform(paintInfo);
      const curve2dPaths = [this._getCurve2dPath(paintInfo)];
      paveDwgData = BaseDwgUtil.getDwgDataByMaterialData(materialData, curve2dPaths);
    }

    // 组装返回结果
    if (paveDwgData && worldTransform) {
      result = {
        paveDwgData,
        worldTransform,
      };
    }

    return result;
  }

  /**
   * 将面漆信息转换为二维曲线路径
   * @param paintInfo - 面漆绘制信息
   * @returns 包含外轮廓和孔洞的二维路径对象
   * @private
   */
  private static _getCurve2dPath(paintInfo: FacePaintInfo): Curve2dPath {
    const pathData = {
      outer: paintInfo.facePaths2d[0],
      holes: paintInfo.facePaths2d.slice(1),
    };

    return {
      outer: MathService.ins.getLinesFromVectors(pathData.outer),
      holes: pathData.holes?.map((holePath) =>
        MathService.ins.getLinesFromVectors(holePath)
      ),
    };
  }

  /**
   * 从面漆信息中提取世界坐标变换矩阵（逆矩阵）
   * @param paintInfo - 面漆绘制信息
   * @returns 世界坐标变换的逆矩阵
   * @private
   */
  private static _getWorldTransform(paintInfo: FacePaintInfo): Matrix4 {
    const matrix = new Matrix4().fromArray(paintInfo.worldProjectMatrix.toArray());
    matrix.inverse();
    return matrix;
  }
}