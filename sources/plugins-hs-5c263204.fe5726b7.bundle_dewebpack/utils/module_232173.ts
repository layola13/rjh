import { Matrix4, Vector3, CONST } from './math';
import { HSApp } from './app';
import { HSPaveSDK, HSCore } from './sdk';

interface Entity {
  instanceId: string;
  parent: {
    modelingDocId: string;
    _webCADDocument: unknown;
    _setWebCADDocument(doc: unknown): void;
    openDiyDocument(flag: boolean): Promise<void>;
    dirtyMaterial(): void;
  };
  getTransformMatrix(): { toArray(): number[] };
  dirtyMaterial(): void;
}

interface Ray {
  mOrigin: [number, number, number];
  mDirection: [number, number, number];
}

interface MaterialData {
  seekId: string;
  toJSON(): MaterialJSON;
  toMaterialObj(): unknown;
}

interface MaterialJSON {
  seekId?: string;
  tileSize_x?: number;
  tileSize_y?: number;
  [key: string]: unknown;
}

interface Paint {
  materialData: MaterialData;
  pattern?: unknown;
}

interface AddMaterialParams {
  materialData: MaterialData;
  paint?: Paint;
}

interface GetDiyPaveParams {
  entity: Entity;
  Ray?: Ray;
}

interface PaveInfo {
  materialData: MaterialData;
  paint: Paint;
  isParamPaint: boolean;
}

interface SuckPaveResult {
  mixPaveObj: unknown;
  pos: unknown;
}

interface UpdateResult {
  oldValue: unknown;
  newValue: unknown;
}

const ROTATION_MATRIX = Matrix4.makeRotateX(CONST.PI_2);
const SCALE_FACTOR = 1000;

/**
 * Checks if a material seek ID is valid for processing
 */
export function isSeekIdValid(seekId: string): boolean {
  return (
    seekId &&
    seekId !== HSCore.Material.MaterialIdEnum.local &&
    seekId !== HSCore.Material.MaterialIdEnum.customized &&
    !seekId.includes(HSPaveSDK.PaveMetaPrefix) &&
    !seekId.includes(HSCore.Material.MaterialIdEnum.modelMaterial)
  );
}

/**
 * Retrieves pave information for a new DIY entity at a specific ray intersection
 */
export function getNewDiyPaveInfo(params: GetDiyPaveParams): PaveInfo | false | undefined {
  const { entity, Ray } = params;
  
  if (!Ray) {
    return undefined;
  }

  const instanceId = entity.instanceId;
  const transformMatrix = entity.getTransformMatrix();
  let matrix = new Matrix4().fromArray(transformMatrix.toArray());

  if (matrix.isIdentity()) {
    matrix = undefined;
  } else {
    const translation = matrix.getTranslation().multiply(SCALE_FACTOR);
    matrix.setTranslation(translation);
  }

  const modelingDocId = entity.parent.modelingDocId;
  const origin = new Vector3(Ray.mOrigin).transform(ROTATION_MATRIX).multiply(SCALE_FACTOR);
  const direction = new Vector3(Ray.mDirection).vecTransform(ROTATION_MATRIX);

  const paveResult: SuckPaveResult | undefined = DiySdk.DmDiyApi.suckPaveInfo(
    modelingDocId,
    instanceId,
    origin,
    direction,
    matrix
  );

  if (!paveResult) {
    return undefined;
  }

  const mixPave = HSPaveSDK.MixPave.load(paveResult.mixPaveObj);
  const materialAtPoint = HSApp.PaintPluginHelper.Pave.MixPaintPluginHelper.getMaterialByPoint(
    { mixPave },
    paveResult.pos
  );

  if (!materialAtPoint || !materialAtPoint.materialData) {
    return undefined;
  }

  if (
    materialAtPoint.pattern &&
    materialAtPoint.pattern instanceof HSPaveSDK.PavePattern &&
    new HSPaveSDK.PatternTypeDecorator(materialAtPoint.pattern).isGusset()
  ) {
    return false;
  }

  return {
    materialData: materialAtPoint.materialData,
    paint: materialAtPoint,
    isParamPaint: true
  };
}

/**
 * Adds material to a new DIY entity
 */
export async function addMaterialToNewDiy(
  material: AddMaterialParams,
  context: GetDiyPaveParams
): Promise<UpdateResult | undefined> {
  const { entity, Ray } = context;
  const instanceId = entity.instanceId;
  const transformMatrix = entity.getTransformMatrix();
  let matrix = new Matrix4().fromArray(transformMatrix.toArray());

  if (matrix.isIdentity()) {
    matrix = undefined;
  } else {
    const translation = matrix.getTranslation().multiply(SCALE_FACTOR);
    matrix.setTranslation(translation);
  }

  const modelingDocId = entity.parent.modelingDocId;
  const origin = new Vector3(Ray.mOrigin).transform(ROTATION_MATRIX).multiply(SCALE_FACTOR);
  const direction = new Vector3(Ray.mDirection).vecTransform(ROTATION_MATRIX);

  const materialJSON = material.materialData.toJSON();

  if (materialJSON.tileSize_x) {
    materialJSON.tileSize_x *= SCALE_FACTOR;
  }
  if (materialJSON.tileSize_y) {
    materialJSON.tileSize_y *= SCALE_FACTOR;
  }

  if (!isSeekIdValid(material.materialData.seekId)) {
    delete materialJSON.seekId;
  }

  let paintInfo: { patternObj: unknown } | undefined;

  if (material.paint) {
    const paintMaterialData = material.paint.materialData;

    if (!HSCore.Util.Entity.isValidSeekId(paintMaterialData.seekId)) {
      return undefined;
    }

    let pattern = material.paint.pattern;
    const patternApi = new HSPaveSDK.PatternApi();

    if (!pattern) {
      const metaData = HSCore.Material.Manager.instance().getMetaData(paintMaterialData.seekId);

      if (!new HSPaveSDK.MetaDecorator(metaData).needConvertPavePattern()) {
        pattern = patternApi.createDefaultPattern(paintMaterialData.seekId);
      }

      if (HSPaveSDK.MiscManager.ins.getMeta(HSPaveSDK.PatternTypeSeekId.AlignRect)) {
        pattern = HSApp.PaintPluginHelper.Pave.MixPaintPluginHelper.createCustomizedPattern(
          HSPaveSDK.PatternTypeSeekId.AlignRect
        );
        patternApi.setMaterial(pattern, paintMaterialData.seekId);
      }
    }

    if (pattern) {
      if (pattern instanceof HSPaveSDK.DefaultPattern) {
        patternApi.setDefaultPatternArgs(pattern, {
          material: paintMaterialData.toMaterialObj()
        });
      }

      paintInfo = {
        patternObj: material.paint.pattern.dump()
      };
    }
  }

  await DiySdk.DmDiyApi.attachMaterial(
    modelingDocId,
    instanceId,
    {
      mtlInfo: materialJSON,
      paintInfo
    },
    origin,
    direction,
    matrix
  );

  const updatedDocument = DiySdk.DmDiyApi.dumpDocument(modelingDocId);
  return updateCustomizedPMInstanceModel(entity, updatedDocument, false);
}

/**
 * Updates the customized PM instance model with a new document
 */
export async function updateCustomizedPMInstanceModel(
  entity: Entity,
  newDocument: unknown,
  shouldReopen = true
): Promise<UpdateResult | undefined> {
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

  entity.parent.dirtyMaterial();
  entity.dirtyMaterial();

  return {
    oldValue: oldDocument,
    newValue: newDocument
  };
}