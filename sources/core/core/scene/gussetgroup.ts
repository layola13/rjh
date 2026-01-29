import { BaseObject } from './BaseObject';
import { TransUtil } from './TransUtil';

interface GraphicsObject {
  entityId: string;
  seekId: string;
  contentType: string;
  selected: boolean;
  visible: boolean;
  graphicsPath: string;
  type: string;
  matrixWorld: THREE.Matrix4;
  material?: MaterialData;
  model: unknown;
  customAttrs: CustomAttributes;
  simulatedContentId: string;
  skipComposite: boolean;
}

interface MaterialData {
  texture: THREE.Texture;
  diffuseMapUvTransform: THREE.Matrix3;
  normalMapUvTransform: THREE.Matrix3;
}

interface CustomAttributes {
  roomType: string;
}

interface ViewTranslation {
  x: number;
  y: number;
  z: number;
}

interface Brick {
  id: string;
  viewTranslation: ViewTranslation;
  viewScale: THREE.Vector3;
  viewRotation: THREE.Quaternion;
}

interface MetaData {
  variationId?: string;
  seekId: string;
  contentType: {
    getTypeString(): string;
  };
  model3d: unknown;
  modelTexture?: THREE.Texture;
}

interface ModelInstance {
  bricks: Brick[];
  metaData?: MetaData;
  metaDecorator: {
    hZLength: number;
  };
}

interface FaceEntity {
  id: string;
}

interface SurfaceEntity {
  modelInstanceMap: Map<string, ModelInstance>;
  faceMatrix?: THREE.Matrix4;
  faceEntity: FaceEntity;
  isFlagOn(flag: number): boolean;
}

interface Entity {
  id: string;
  children: Record<string, SurfaceEntity>;
}

interface Context {
  dirtyObjectMap: Map<string, GussetGroup>;
  objectMap: Map<string, BaseObject>;
}

interface GraphicsData {
  objects: GraphicsObject[];
  meshDefs: unknown[];
}

export class GussetGroup extends BaseObject {
  declare context: Context;
  declare entity: Entity;

  constructor(entity: Entity, context: Context, options: unknown) {
    super(entity, context, options);
  }

  protected _entityDirtied(entity: Entity): void {
    super._entityDirtied(entity);
    this.context.dirtyObjectMap.set(this.entity.id, this);
  }

  private _getBrickWorldMatrix(
    brick: Brick,
    faceMatrix: THREE.Matrix4,
    zOffset: number
  ): THREE.Matrix4 {
    const translation = brick.viewTranslation;
    const position = new THREE.Vector3(translation.x, translation.y, translation.z + zOffset);
    const scale = brick.viewScale;
    const rotation = brick.viewRotation;

    let matrix = new THREE.Matrix4();
    matrix.compose(position, rotation, scale);
    matrix.premultiply(faceMatrix);
    matrix = TransUtil.toModelMatrix(matrix);
    matrix = TransUtil.convertMatrixUnit(matrix, undefined);

    return matrix;
  }

  private _getMetaDataMaterial(metaData?: MetaData): MaterialData | undefined {
    if (!metaData) return undefined;

    const diffuseTransform = new THREE.Matrix3();
    const uvTransform = diffuseTransform as THREE.Matrix3 & {
      setUvTransform?(
        tx: number,
        ty: number,
        sx: number,
        sy: number,
        rotation: number,
        cx: number,
        cy: number
      ): void;
    };

    uvTransform.setUvTransform?.(0, 0, 1, 1, 0, 0, 0);

    const normalTransform = new THREE.Matrix3();

    return {
      texture: metaData.modelTexture!,
      diffuseMapUvTransform: diffuseTransform,
      normalMapUvTransform: normalTransform
    };
  }

  private _surfaceToObjects(surface: SurfaceEntity, objects: GraphicsObject[]): void {
    if (!surface) return;

    const modelInstanceMap = surface.modelInstanceMap;
    const faceMatrix = surface.faceMatrix;
    if (!faceMatrix) return;

    const baseHeight = HSCore.Util.Layer.getEntityBaseHeight(surface);
    const transformedMatrix = new THREE.Matrix4().multiplyMatrices(
      new THREE.Matrix4().makeTranslation(0, baseHeight, 0),
      faceMatrix
    );

    const faceEntityId = surface.faceEntity.id;
    const faceObject = this.context.objectMap.get(faceEntityId);
    const roomCustomAttrs = faceObject?.updateRoomCustomAttrs();

    const customAttrs: CustomAttributes = {
      roomType: roomCustomAttrs?.roomType ?? 'none'
    };

    const isSelected = surface.isFlagOn(HSCore.Model.EntityFlagEnum.selected);
    const isVisible =
      !surface.isFlagOn(HSCore.Model.EntityFlagEnum.hidden) &&
      !surface.isFlagOn(HSCore.Model.EntityFlagEnum.removed);

    modelInstanceMap.forEach((instance: ModelInstance) => {
      const bricks = instance.bricks;
      const metaData = instance.metaData;
      if (!metaData) return;

      const zLength = instance.metaDecorator.hZLength;
      const seekId = metaData.variationId ?? metaData.seekId;
      const contentTypeString = metaData.contentType.getTypeString();
      const model3d = metaData.model3d;
      const material = this._getMetaDataMaterial(metaData);

      for (let index = 0, length = bricks.length; index < length; ++index) {
        const brick = bricks[index];
        const worldMatrix = this._getBrickWorldMatrix(brick, transformedMatrix, zLength);

        objects.push({
          entityId: brick.id,
          seekId: seekId,
          contentType: contentTypeString,
          selected: isSelected,
          visible: isVisible,
          graphicsPath: `${brick.id}/model`,
          type: HSConstants.GraphicsObjectType.Model,
          matrixWorld: worldMatrix,
          material: material,
          model: model3d,
          customAttrs: customAttrs,
          simulatedContentId: seekId,
          skipComposite: true
        });
      }
    }, this);
  }

  toGraphicsData(): GraphicsData {
    const graphicsData: GraphicsData = {
      objects: [],
      meshDefs: []
    };

    const entity = this.entity;
    if (!entity) return graphicsData;

    graphicsData.objects = [];
    const objects = graphicsData.objects;

    Object.values(entity.children).forEach((surface: SurfaceEntity) => {
      this._surfaceToObjects(surface, objects);
    });

    return graphicsData;
  }
}