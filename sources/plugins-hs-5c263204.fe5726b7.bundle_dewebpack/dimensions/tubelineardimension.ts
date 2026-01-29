import { HSApp } from './HSApp';

export class TubeLinearDimension extends HSApp.View.T3d.LinearDimension {
  protected _createLine(
    startPoint: THREE.Vector3,
    endPoint: THREE.Vector3,
    material: THREE.Material
  ): THREE.Object3D {
    const viewSpaceStart = HSApp.View.T3d.Util.ModelSpaceToViewSpace(startPoint);
    const viewSpaceEnd = HSApp.View.T3d.Util.ModelSpaceToViewSpace(endPoint);
    
    const lineGeometry = HSApp.View.T3d.Util.createLineGeometry(
      viewSpaceStart,
      viewSpaceEnd
    );
    
    return T3Dx.Three2T3d.createMeshNode(lineGeometry, material);
  }
}