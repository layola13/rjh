import { FaceGizmo } from './FaceGizmo';
import { HSApp } from './HSApp';
import { Vector3, Quaternion } from './Math';

interface Layer {
  id: string | number;
}

interface Canvas3D {
  getDisplayObjectByID(id: string | number): DisplayObject;
}

interface DisplayObject {
  groups: {
    face: FaceGroup;
  };
}

interface FaceGroup {
  addChild(node: T3DNode): void;
  removeChild(gizmo: FaceGizmo): void;
}

interface T3DNode {
  clear(): void;
  getComponentsInChildren(componentType: any): MeshComponent[];
}

interface MeshComponent {
  getMaterial(): Material;
}

interface Material {
  setRenderGroupId(id: number): void;
}

interface App {
  getActive3DView(): Canvas3D;
}

interface Position {
  x: number;
  y: number;
  z: number;
}

export class WFABgFace {
  private readonly _layer: Layer;
  private readonly _app: App;
  private readonly _canvas3d: Canvas3D;
  private _faceGizmo?: FaceGizmo;

  constructor(layer: Layer) {
    this._layer = layer;
    this._app = HSApp.App.getApp();
    this._canvas3d = this._app.getActive3DView();
  }

  /**
   * Initialize the background face with dimensions, position and normal
   * @param width - Width of the face
   * @param height - Height of the face
   * @param position - Position vector
   * @param normal - Normal vector
   */
  init(width: number, height: number, position: Position, normal: Position): void {
    const displayObject = this._canvas3d.getDisplayObjectByID(this._layer.id);
    
    this._faceGizmo = new FaceGizmo();
    this._faceGizmo.width = width;
    this._faceGizmo.height = height;
    this._faceGizmo.position = new Vector3(position.x, position.z, -position.y);

    const defaultNormal = new Vector3(0, 0, 1);
    const targetNormal = new Vector3(normal.x, normal.z, -normal.y);
    const rotationAxis = Vector3.Cross(defaultNormal, targetNormal).normalize();
    const rotationAngle = Vector3.GetAngleBetweenVectors(defaultNormal, targetNormal, rotationAxis);

    this._faceGizmo.rotation = Quaternion.RotationAxis(rotationAxis, rotationAngle);
    this._faceGizmo.color = 0xE8E978; // 15263976 in hex
    this._faceGizmo.initialize();

    this._faceGizmo.node.getComponentsInChildren(T3D.MeshComponent).forEach((meshComponent: MeshComponent) => {
      meshComponent.getMaterial().setRenderGroupId(0);
    });

    this._faceGizmo.show();
    displayObject.groups.face.addChild(this._faceGizmo.node);
  }

  /**
   * Cleanup and destroy the face gizmo
   */
  destroy(): void {
    if (!this._faceGizmo) {
      return;
    }

    const displayObject = this._canvas3d.getDisplayObjectByID(this._layer.id);
    
    this._faceGizmo.hide();
    this._faceGizmo.node.clear();
    this._faceGizmo.onCleanup();
    displayObject.groups.face.removeChild(this._faceGizmo);
    this._faceGizmo = undefined;
  }
}