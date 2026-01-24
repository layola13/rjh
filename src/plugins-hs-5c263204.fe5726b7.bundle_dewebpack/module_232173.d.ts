/**
 * 新版DIY材质管理模块
 * 提供材质添加、铺贴信息获取和实例模型更新等功能
 */

import { Matrix4, Vector3, CONST } from 'math-library';
import { HSApp } from 'hs-app';
import { HSPaveSDK, HSCore } from 'hs-pave-sdk';

/**
 * X轴旋转90度的变换矩阵
 * 用于坐标系转换
 */
const ROTATION_MATRIX_X_90: Matrix4 = Matrix4.makeRotateX(CONST.PI_2);

/**
 * 射线信息
 */
interface RayInfo {
  /** 射线起点 */
  mOrigin: [number, number, number];
  /** 射线方向 */
  mDirection: [number, number, number];
}

/**
 * 实体对象
 */
interface Entity {
  /** 实例ID */
  instanceId: string;
  /** 获取变换矩阵 */
  getTransformMatrix(): { toArray(): number[] };
  /** 父对象 */
  parent: {
    /** 建模文档ID */
    modelingDocId: string;
    /** 内部WebCAD文档 */
    _webCADDocument: unknown;
    /** 设置WebCAD文档 */
    _setWebCADDocument(doc: unknown): void;
    /** 打开DIY文档 */
    openDiyDocument(flag: boolean): Promise<void>;
    /** 标记材质为脏 */
    dirtyMaterial(): void;
  };
  /** 标记材质为脏 */
  dirtyMaterial(): void;
}

/**
 * 材质数据
 */
interface MaterialData {
  /** 材质查找ID */
  seekId: string;
  /** 转换为JSON格式 */
  toJSON(): MaterialJSON;
  /** 转换为材质对象 */
  toMaterialObj(): unknown;
}

/**
 * 材质JSON格式
 */
interface MaterialJSON {
  /** X方向瓷砖尺寸（毫米） */
  tileSize_x?: number;
  /** Y方向瓷砖尺寸（毫米） */
  tileSize_y?: number;
  /** 材质查找ID */
  seekId?: string;
  [key: string]: unknown;
}

/**
 * 绘制信息
 */
interface Paint {
  /** 材质数据 */
  materialData: MaterialData;
  /** 铺贴图案 */
  pattern?: HSPaveSDK.PavePattern;
}

/**
 * 材质添加参数
 */
interface MaterialToAdd {
  /** 材质数据 */
  materialData: MaterialData;
  /** 绘制信息 */
  paint?: Paint;
}

/**
 * 添加材质的上下文参数
 */
interface AddMaterialContext {
  /** 目标实体 */
  entity: Entity;
  /** 射线信息 */
  Ray: RayInfo;
}

/**
 * 铺贴信息获取参数
 */
interface GetPaveInfoParams {
  /** 目标实体 */
  entity: Entity;
  /** 射线信息 */
  Ray?: RayInfo;
}

/**
 * 铺贴信息返回结果
 */
interface PaveInfoResult {
  /** 材质数据 */
  materialData: MaterialData;
  /** 绘制信息 */
  paint: Paint;
  /** 是否为参数化绘制 */
  isParamPaint: boolean;
}

/**
 * 模型更新结果
 */
interface ModelUpdateResult {
  /** 旧文档值 */
  oldValue: unknown;
  /** 新文档值 */
  newValue: unknown;
}

/**
 * 毫米到米的转换比例
 */
const MM_TO_M_SCALE = 1000;

/**
 * 验证材质查找ID是否有效
 * 排除本地材质、自定义材质、铺贴元数据和模型材质等特殊ID
 * 
 * @param seekId - 材质查找ID
 * @returns 是否为有效的可查找ID
 */
export function isSeekIdValid(seekId: string | undefined): boolean {
  return !!(
    seekId &&
    seekId !== HSCore.Material.MaterialIdEnum.local &&
    seekId !== HSCore.Material.MaterialIdEnum.customized &&
    !seekId.includes(HSPaveSDK.PaveMetaPrefix) &&
    !seekId.includes(HSCore.Material.MaterialIdEnum.modelMaterial)
  );
}

/**
 * 获取新版DIY铺贴信息
 * 通过射线检测获取实体上特定点的材质和铺贴信息
 * 
 * @param params - 包含实体和射线的参数对象
 * @returns 铺贴信息结果，如果无法获取则返回undefined；如果是护角则返回false
 */
export function getNewDiyPaveInfo(params: GetPaveInfoParams): PaveInfoResult | false | undefined {
  const { entity, Ray } = params;
  
  if (!Ray) {
    return undefined;
  }

  const instanceId = entity.instanceId;
  const transformMatrix = entity.getTransformMatrix();
  let matrix = new Matrix4().fromArray(transformMatrix.toArray());

  // 处理变换矩阵
  if (matrix.isIdentity()) {
    matrix = undefined as unknown as Matrix4;
  } else {
    const translation = matrix.getTranslation().multiply(MM_TO_M_SCALE);
    matrix.setTranslation(translation);
  }

  const modelingDocId = entity.parent.modelingDocId;
  
  // 转换射线坐标到模型空间（毫米单位）
  const rayOrigin = new Vector3(Ray.mOrigin)
    .transform(ROTATION_MATRIX_X_90)
    .multiply(MM_TO_M_SCALE);
  const rayDirection = new Vector3(Ray.mDirection)
    .vecTransform(ROTATION_MATRIX_X_90);

  // 调用底层API获取铺贴信息
  const paveInfo = DiySdk.DmDiyApi.suckPaveInfo(
    modelingDocId,
    instanceId,
    rayOrigin,
    rayDirection,
    matrix
  );

  if (!paveInfo) {
    return undefined;
  }

  // 加载混合铺贴对象
  const mixPave = HSPaveSDK.MixPave.load(paveInfo.mixPaveObj);
  const material = HSApp.PaintPluginHelper.Pave.MixPaintPluginHelper.getMaterialByPoint(
    { mixPave },
    paveInfo.pos
  );

  if (!material || !material.materialData) {
    return undefined;
  }

  // 检查是否为护角图案（护角不允许修改）
  if (
    material.pattern &&
    material.pattern instanceof HSPaveSDK.PavePattern &&
    new HSPaveSDK.PatternTypeDecorator(material.pattern).isGusset()
  ) {
    return false;
  }

  return {
    materialData: material.materialData,
    paint: material,
    isParamPaint: true,
  };
}

/**
 * 添加材质到新版DIY实体
 * 将材质和铺贴信息附加到指定实体的特定位置
 * 
 * @param materialToAdd - 要添加的材质信息
 * @param context - 添加材质的上下文（实体和射线）
 * @returns 模型更新结果的Promise，如果材质无效则返回undefined
 */
export async function addMaterialToNewDiy(
  materialToAdd: MaterialToAdd,
  context: AddMaterialContext
): Promise<ModelUpdateResult | undefined> {
  const { entity, Ray } = context;
  const instanceId = entity.instanceId;
  const transformMatrix = entity.getTransformMatrix();
  let matrix = new Matrix4().fromArray(transformMatrix.toArray());

  // 处理变换矩阵
  if (matrix.isIdentity()) {
    matrix = undefined as unknown as Matrix4;
  } else {
    const translation = matrix.getTranslation().multiply(MM_TO_M_SCALE);
    matrix.setTranslation(translation);
  }

  const modelingDocId = entity.parent.modelingDocId;
  
  // 转换射线到模型空间
  const rayOrigin = new Vector3(Ray.mOrigin)
    .transform(ROTATION_MATRIX_X_90)
    .multiply(MM_TO_M_SCALE);
  const rayDirection = new Vector3(Ray.mDirection)
    .vecTransform(ROTATION_MATRIX_X_90);

  // 准备材质JSON数据（转换尺寸单位为毫米）
  const materialJSON = materialToAdd.materialData.toJSON();
  if (materialJSON.tileSize_x) {
    materialJSON.tileSize_x *= MM_TO_M_SCALE;
  }
  if (materialJSON.tileSize_y) {
    materialJSON.tileSize_y *= MM_TO_M_SCALE;
  }

  // 移除无效的seekId
  if (!isSeekIdValid(materialToAdd.materialData.seekId)) {
    delete materialJSON.seekId;
  }

  let paintInfo: { patternObj: unknown } | undefined;

  // 处理绘制信息
  if (materialToAdd.paint) {
    const paintMaterialData = materialToAdd.paint.materialData;
    
    // 验证材质seekId有效性
    if (!HSCore.Util.Entity.isValidSeekId(paintMaterialData.seekId)) {
      return undefined;
    }

    let pattern = materialToAdd.paint.pattern;
    const patternApi = new HSPaveSDK.PatternApi();

    // 如果没有图案，尝试创建默认图案
    if (!pattern) {
      const metaData = HSCore.Material.Manager.instance().getMetaData(paintMaterialData.seekId);
      const needConvert = new HSPaveSDK.MetaDecorator(metaData).needConvertPavePattern();
      
      if (!needConvert) {
        pattern = patternApi.createDefaultPattern(paintMaterialData.seekId);
      }

      // 如果存在矩形对齐图案元数据，创建自定义图案
      if (HSPaveSDK.MiscManager.ins.getMeta(HSPaveSDK.PatternTypeSeekId.AlignRect)) {
        pattern = HSApp.PaintPluginHelper.Pave.MixPaintPluginHelper.createCustomizedPattern(
          HSPaveSDK.PatternTypeSeekId.AlignRect
        );
        patternApi.setMaterial(pattern, paintMaterialData.seekId);
      }
    }

    // 设置图案参数
    if (pattern) {
      if (pattern instanceof HSPaveSDK.DefaultPattern) {
        patternApi.setDefaultPatternArgs(pattern, {
          material: paintMaterialData.toMaterialObj(),
        });
      }

      paintInfo = {
        patternObj: materialToAdd.paint.pattern.dump(),
      };
    }
  }

  // 调用底层API附加材质
  await DiySdk.DmDiyApi.attachMaterial(
    modelingDocId,
    instanceId,
    {
      mtlInfo: materialJSON,
      paintInfo,
    },
    rayOrigin,
    rayDirection,
    matrix
  );

  // 导出更新后的文档
  const updatedDocument = DiySdk.DmDiyApi.dumpDocument(modelingDocId);
  
  return updateCustomizedPMInstanceModel(entity, updatedDocument, false);
}

/**
 * 更新自定义参数化建模实例模型
 * 更新实体的WebCAD文档并标记材质为脏
 * 
 * @param entity - 要更新的实体
 * @param newDocument - 新的文档数据
 * @param shouldReopen - 是否重新打开文档（默认false）
 * @returns 包含旧值和新值的更新结果Promise
 */
export async function updateCustomizedPMInstanceModel(
  entity: Entity,
  newDocument: unknown,
  shouldReopen = false
): Promise<ModelUpdateResult | undefined> {
  if (!entity || !newDocument || !entity.parent) {
    return undefined;
  }

  const oldDocument = entity.parent._webCADDocument;

  if (shouldReopen) {
    entity.parent._setWebCADDocument(newDocument);
    await entity.parent.openDiyDocument(false);
  } else {
    entity.parent._webCADDocument = newDocument;
  }

  // 标记材质需要重新渲染
  entity.parent.dirtyMaterial();
  entity.dirtyMaterial();

  return {
    oldValue: oldDocument,
    newValue: newDocument,
  };
}