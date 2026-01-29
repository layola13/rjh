import { Vector3 } from './Vector3';
import { nearlyEquals } from './mathUtils';
import { Logger } from './Logger';

interface TransformOptions {
  needFlip?: boolean;
  order?: string;
}

interface TransformData {
  x?: number;
  y?: number;
  z?: number;
  XRotation?: number;
  YRotation?: number;
  ZRotation?: number;
  XScale?: number;
  YScale?: number;
  ZScale?: number;
  ZLength?: number;
  flip?: boolean;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface UnitTransformData {
  unitPos: THREE.Vector3;
  unitQuat: THREE.Quaternion;
  unitScale: THREE.Vector3;
}

/**
 * Convert degrees to radians
 */
const degreesToRadians = (degrees: number): number => {
  return ((degrees || 0) % 360) * Math.PI / 180;
};

export const TransUtil = {
  /**
   * Transform points to XY plane matrix with up direction
   */
  toXYPlanMatrixUp(points: Point3D[], upDirection?: THREE.Vector3): THREE.Matrix4 {
    const boundingBox = new THREE.Box3();
    
    if (!points) {
      return new THREE.Matrix4();
    }
    
    points.forEach((point) => {
      boundingBox.expandByPoint(new THREE.Vector3(point.x, point.y, point.z));
    });
    
    const center = boundingBox.getCenter(new THREE.Vector3());
    return this.toXYPlanMatrixUpEx(points, center, upDirection);
  },

  /**
   * Transform points to XY plane matrix with explicit center and up direction
   */
  toXYPlanMatrixUpEx(points: Point3D[], center: THREE.Vector3, upDirection?: THREE.Vector3): THREE.Matrix4 {
    const localToWorld = this._getLocalToWorld(points, upDirection);
    const worldToLocal = new THREE.Matrix4().copy(localToWorld).invert();
    
    return new THREE.Matrix4()
      .makeTranslation(-center.x, -center.y, -center.z)
      .premultiply(worldToLocal);
  },

  /**
   * Compute local to world transformation matrix
   */
  _getLocalToWorld(points: Point3D[], upDirection?: THREE.Vector3): THREE.Matrix4 {
    const normal = this._computeNormal(points) || new THREE.Vector3(0, 0, 1);
    let xAxis: THREE.Vector3;
    let yAxis: THREE.Vector3;
    
    if (upDirection) {
      if (nearlyEquals(normal.z, 1) || nearlyEquals(normal.z, -1)) {
        xAxis = upDirection.clone();
        yAxis = normal.clone().cross(xAxis);
      } else {
        yAxis = upDirection.clone();
        xAxis = yAxis.clone().cross(normal);
        
        if (normal.z > 0) {
          xAxis.multiplyScalar(-1);
        }
        
        if (yAxis.angleTo(normal) > Math.PI / 2) {
          xAxis.multiplyScalar(-1);
        }
        
        yAxis = normal.clone().cross(xAxis);
      }
      
      return new THREE.Matrix4().makeBasis(
        xAxis.normalize(),
        yAxis.normalize(),
        normal.normalize()
      );
    } else {
      if (nearlyEquals(normal.z, 0)) {
        yAxis = new THREE.Vector3(0, 0, 1);
        xAxis = yAxis.clone().cross(normal);
      } else {
        xAxis = new THREE.Vector3(1, 0, 0);
        yAxis = normal.clone().cross(xAxis);
      }
      
      return new THREE.Matrix4().makeBasis(
        xAxis.normalize(),
        yAxis.normalize(),
        normal.normalize()
      );
    }
  },

  /**
   * Compute normal vector from points
   */
  _computeNormal(points: Point3D[]): THREE.Vector3 | null {
    const threePoints = points.map((point) => new THREE.Vector3(point.x, point.y, point.z));
    const normal = GeLib.PolygonUtils.getPolygonNormal(threePoints);
    
    Logger.console.assert(!!normal, "Invalid normal got from face loop!");
    return normal;
  },

  /**
   * Convert to THREE.js coordinate system matrix
   */
  toTHREEMatrix(matrix: THREE.Matrix4): THREE.Matrix4 {
    const resultMatrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3(1, 1, 1);
    
    matrix.decompose(position, quaternion, scale);
    
    resultMatrix.compose(
      new THREE.Vector3(position.x, position.z, -position.y),
      new THREE.Quaternion(quaternion.x, quaternion.z, -quaternion.y, quaternion.w),
      new THREE.Vector3(scale.x, scale.z, scale.y)
    );
    
    return resultMatrix;
  },

  /**
   * Convert to model coordinate system matrix
   */
  toModelMatrix(matrix: THREE.Matrix4): THREE.Matrix4 {
    const resultMatrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3(1, 1, 1);
    
    matrix.decompose(position, quaternion, scale);
    
    resultMatrix.compose(
      new THREE.Vector3(position.x, -position.z, position.y),
      new THREE.Quaternion(quaternion.x, -quaternion.z, quaternion.y, quaternion.w),
      new THREE.Vector3(scale.x, scale.z, scale.y)
    );
    
    return resultMatrix;
  },

  /**
   * Convert matrix position to specified unit
   */
  convertMatrixUnit(matrix: THREE.Matrix4, unit?: HSCore.Util.Unit.LengthUnitTypeEnum): THREE.Matrix4 {
    const targetUnit = unit || HSCore.Util.Unit.LengthUnitTypeEnum.centimeter;
    const position = new THREE.Vector3().setFromMatrixPosition(matrix);
    
    const convertedX = HSCore.Util.Unit.ConvertMeterToCustom(targetUnit, position.x);
    const convertedY = HSCore.Util.Unit.ConvertMeterToCustom(targetUnit, position.y);
    const convertedZ = HSCore.Util.Unit.ConvertMeterToCustom(targetUnit, position.z);
    
    matrix.setPosition(new THREE.Vector3(convertedX, convertedY, convertedZ));
    return matrix;
  },

  /**
   * Revert matrix position from specified unit to meters
   */
  revertMatrixUnit(matrix: THREE.Matrix4, unit?: HSCore.Util.Unit.LengthUnitTypeEnum): THREE.Matrix4 {
    const sourceUnit = unit || HSCore.Util.Unit.LengthUnitTypeEnum.centimeter;
    const position = new THREE.Vector3().setFromMatrixPosition(matrix);
    
    const convertedX = HSCore.Util.Unit.ConvertToMeter(sourceUnit, position.x);
    const convertedY = HSCore.Util.Unit.ConvertToMeter(sourceUnit, position.y);
    const convertedZ = HSCore.Util.Unit.ConvertToMeter(sourceUnit, position.z);
    
    matrix.setPosition(new THREE.Vector3(convertedX, convertedY, convertedZ));
    return matrix;
  },

  /**
   * Convert coordinate system origin to specified unit
   */
  convertCoordUnit(coord: any, unit?: HSCore.Util.Unit.LengthUnitTypeEnum): any {
    const targetUnit = unit || HSCore.Util.Unit.LengthUnitTypeEnum.centimeter;
    const originData = coord.getOrigin().data.map((value: number) => 
      HSCore.Util.Unit.ConvertMeterToCustom(targetUnit, value)
    );
    
    const clonedCoord = coord.clone();
    clonedCoord.setOrigin(new Vector3(originData));
    return clonedCoord;
  },

  /**
   * Revert coordinate system origin from specified unit to meters
   */
  revertCoordUnit(coord: any, unit?: HSCore.Util.Unit.LengthUnitTypeEnum): any {
    const sourceUnit = unit || HSCore.Util.Unit.LengthUnitTypeEnum.centimeter;
    const originData = coord.getOrigin().data.map((value: number) => 
      HSCore.Util.Unit.ConvertToMeter(sourceUnit, value)
    );
    
    const clonedCoord = coord.clone();
    clonedCoord.setOrigin(new Vector3(originData));
    return clonedCoord;
  },

  /**
   * Get transformation matrix between two paths
   */
  getConvertPathMatrix(sourcePath: THREE.Vector3[], targetPath: THREE.Vector3[]): THREE.Matrix4 {
    function buildPathMatrix(path: THREE.Vector3[]): THREE.Matrix4 {
      const origin = path[0];
      const xVector = new THREE.Vector3().subVectors(path[1], path[0]);
      const yVector = new THREE.Vector3().subVectors(path[2], path[0]);
      const zVector = new THREE.Vector3().crossVectors(xVector, yVector);
      
      const matrix = new THREE.Matrix4();
      matrix.set(
        origin.x, origin.y, origin.z, 1,
        xVector.x, xVector.y, xVector.z, 0,
        yVector.x, yVector.y, yVector.z, 0,
        zVector.x, zVector.y, zVector.z, 0
      );
      matrix.transpose();
      
      return matrix;
    }
    
    const sourceMatrix = buildPathMatrix(sourcePath);
    const targetMatrix = buildPathMatrix(targetPath);
    const inverseSourceMatrix = new THREE.Matrix4().copy(sourceMatrix).invert();
    
    return new THREE.Matrix4().multiplyMatrices(targetMatrix, inverseSourceMatrix);
  },

  /**
   * Compute local transformation matrix from transform data
   */
  computeLocalTransform(transformData: TransformData, options?: TransformOptions): THREE.Matrix4 {
    const opts = options || {};
    
    const posX = transformData.x || 0;
    const posY = transformData.y || 0;
    const posZ = transformData.z || 0;
    
    const rotX = -degreesToRadians(transformData.XRotation || 0);
    const rotY = -degreesToRadians(transformData.YRotation || 0);
    const rotZ = -degreesToRadians(transformData.ZRotation || 0);
    
    let scaleX = transformData.XScale || 1;
    if (opts.needFlip && transformData.flip !== undefined) {
      scaleX = transformData.flip ? -scaleX : scaleX;
    }
    
    const scaleY = transformData.YScale || 1;
    const scaleZ = transformData.ZScale || 1;
    const zLength = transformData.ZLength || 0;
    
    const scaleMatrix = new THREE.Matrix4().makeScale(scaleX, scaleY, scaleZ);
    const rotationOrder = opts.order || "XYZ";
    const euler = new THREE.Euler(rotX, rotY, rotZ, rotationOrder);
    const rotationMatrix = new THREE.Matrix4().makeRotationFromEuler(euler);
    
    const offsetMatrix = new THREE.Matrix4().makeTranslation(0, 0, -zLength / 2);
    const centerMatrix = new THREE.Matrix4().makeTranslation(0, 0, (zLength * scaleZ) / 2);
    
    const transformMatrix = offsetMatrix.clone();
    transformMatrix.premultiply(scaleMatrix);
    transformMatrix.premultiply(rotationMatrix);
    transformMatrix.premultiply(centerMatrix);
    
    const finalPosition = new THREE.Vector3();
    finalPosition.setFromMatrixPosition(transformMatrix);
    
    transformMatrix.setPosition(new THREE.Vector3(
      posX + finalPosition.x,
      posY + finalPosition.y,
      posZ + finalPosition.z
    ));
    
    return transformMatrix;
  },

  /**
   * Compute world transformation matrix for entity
   */
  computeWorldTransform(transformData: TransformData, options: TransformOptions = {}): THREE.Matrix4 {
    const baseHeight = HSCore.Util.Layer.getEntityBaseHeight(transformData);
    const heightMatrix = new THREE.Matrix4().makeTranslation(0, 0, baseHeight);
    const localMatrix = this.computeLocalTransform(transformData, options);
    
    return new THREE.Matrix4().multiplyMatrices(heightMatrix, localMatrix);
  },

  /**
   * Get unit transformation data with identity values
   */
  getUnitTransData(): UnitTransformData {
    return {
      unitPos: new THREE.Vector3(0, 0, 0),
      unitQuat: new THREE.Quaternion(),
      unitScale: new THREE.Vector3(1, 1, 1)
    };
  }
};