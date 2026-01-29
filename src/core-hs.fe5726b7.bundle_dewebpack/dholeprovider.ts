import { IDataProvider } from './IDataProvider';

export class DHoleProvider extends IDataProvider {
  private readonly _entity: any;

  constructor(entity: any) {
    super();
    this._entity = entity;
  }

  getFacePath(face: any, _t: any): THREE.Vector3[] {
    if (this._entity.getHost() instanceof HSCore.Model.Wall) {
      const outerLoopPolygon = face.getOuterLoopPolygon();
      if (!outerLoopPolygon) {
        return [];
      }

      const vertices = outerLoopPolygon.map(
        (point: { x: number; y: number; z: number }) =>
          new THREE.Vector3(point.x, point.y, point.z)
      );

      return vertices ? this._convertToWorldSpace(vertices) : [];
    }

    return [];
  }

  private _convertToWorldSpace(vertices: THREE.Vector3[]): THREE.Vector3[] {
    const transformMatrix = HSCore.Util.Matrix3DHandler.getMatrix4(this._entity);
    return vertices.map((vertex) => vertex.clone().applyMatrix4(transformMatrix));
  }
}