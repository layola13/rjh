// @ts-nocheck
import { Vector3, Quaternion, Matrix4, Box3 } from 'three';
import { ContentBox } from './ContentBox';
import { HSCore } from './HSCore';
import { Vector3 as CustomVector3, Quaternion as CustomQuaternion } from './math';
import { Box3 as CustomBox3 } from './geometry';
import { getMatrix4FromTransform } from './transform-utils';

interface BoundingBox {
  XSize: number;
  YSize: number;
  ZSize: number;
  center: { x: number; y: number; z: number };
  bottom: number;
}

interface TransformData {
  x: number;
  y: number;
  z: number;
  XScale: number;
  YScale: number;
  ZScale: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface GeometryObject {
  bounding: number[];
}

interface GeometryData {
  objects: GeometryObject[];
}

interface ViewModelData {
  id: string;
  geometry: GeometryData;
  matrix: Matrix4;
  hasArcTube?: boolean;
}

export class TubeBox extends ContentBox {
  protected boxGizmo: {
    position: CustomVector3;
    scale: CustomVector3;
    rotation: CustomQuaternion;
  };

  protected context: {
    document: {
      geometryManager: {
        getGeometryObject(id: string): ViewModelData | undefined;
      };
    };
  };

  protected contents: HSCore.Model.ConcealedWorkTube[];

  /**
   * Builds the content data by calculating transforms for contained entities
   */
  buildContentData(): void {
    const entities = this.contents;
    
    if (entities.length <= 0) {
      return;
    }

    const position = new Vector3();
    const rotation = new Quaternion();
    const scale = new Vector3(1, 1, 1);
    const transform = this.getEntityTransform(entities);

    if (transform == null) {
      return;
    }

    transform.decompose(position, rotation, scale);

    this.boxGizmo.position = new CustomVector3(position.x, position.z, -position.y);
    this.boxGizmo.scale = new CustomVector3(scale.x, scale.z, scale.y);
    this.boxGizmo.rotation = new CustomQuaternion(rotation.x, rotation.z, -rotation.y, rotation.w);
  }

  /**
   * Calculates the transform matrix for a collection of entities
   */
  getEntityTransform(entities: HSCore.Model.ConcealedWorkTube[]): Matrix4 | undefined {
    if (entities.length === 0) {
      return undefined;
    }

    // Special case: single concealed work tube
    if (entities.length === 1 && entities[0] instanceof HSCore.Model.ConcealedWorkTube) {
      const tube = entities[0];
      return this.getSingleTubeTransform(tube);
    }

    // Multiple entities: calculate combined bounding box
    const allPoints: Point3D[] = [];

    for (const entity of entities) {
      const points = this.extractBoundingPoints(entity);
      allPoints.push(...points);
    }

    const boundingBox = HSCore.Util.DEntityUtils.BoundUtil.getBoundBox(allPoints);
    const { XSize, YSize, ZSize, center, bottom } = boundingBox;
    const centerPosition = new Vector3(center.x, center.y, bottom);

    return getMatrix4FromTransform({
      x: centerPosition.x,
      y: centerPosition.y,
      z: centerPosition.z,
      XScale: XSize,
      YScale: YSize,
      ZScale: ZSize,
      XRotation: 0,
      YRotation: 0,
      ZRotation: 0
    });
  }

  /**
   * Calculates transform for a single tube entity
   */
  private getSingleTubeTransform(tube: HSCore.Model.ConcealedWorkTube): Matrix4 {
    const viewModel = this.context.document.geometryManager.getGeometryObject(tube.id);

    if (!viewModel) {
      throw new Error('ViewModel is undefined');
    }

    // Complex tube with multiple nodes or arc
    if (tube.nodeIds.length !== 2 || viewModel.hasArcTube) {
      const boundingBox = new CustomBox3();

      viewModel.geometry.objects.forEach((geometryObject) => {
        const unitType = HSCore.Util.Unit.LengthUnitTypeEnum.centimeter;
        const bounds = geometryObject.bounding.map((value) =>
          HSCore.Util.Unit.ConvertToMeter(unitType, value)
        );

        const objectBox = new CustomBox3([
          new CustomVector3(bounds[0], bounds[1], bounds[2]),
          new CustomVector3(bounds[3], bounds[4], bounds[5])
        ]);

        boundingBox.union(objectBox);
      });

      const center = boundingBox.getCenter();
      const size = boundingBox.getSize();
      const transformMatrix = new Matrix4().makeTranslation(center.x, center.y, center.z);
      transformMatrix.scale(new Vector3(size.x, size.y, size.z));

      return transformMatrix;
    }

    // Simple tube: use existing matrix
    return HSCore.Util.Transform.revertMatrixUnit(viewModel.matrix.clone());
  }

  /**
   * Extracts bounding points from an entity's geometry
   */
  private extractBoundingPoints(entity: HSCore.Model.ConcealedWorkTube): Point3D[] {
    const viewModel = this.context.document.geometryManager.getGeometryObject(entity.id);

    if (!viewModel) {
      return [];
    }

    const points: Point3D[] = [];
    const geometryObjects = viewModel.geometry.objects;

    for (const geometryObject of geometryObjects) {
      const bounds = geometryObject.bounding.map((value) =>
        HSCore.Util.Unit.ConvertToMeter(
          HSCore.Util.Unit.LengthUnitTypeEnum.centimeter,
          value
        )
      );

      points.push({ x: bounds[0], y: bounds[1], z: bounds[2] });
      points.push({ x: bounds[3], y: bounds[4], z: bounds[5] });
    }

    return points;
  }
}