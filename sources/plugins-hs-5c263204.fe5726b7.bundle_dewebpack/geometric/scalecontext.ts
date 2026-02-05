// @ts-nocheck
export enum ScaleDirectionType {
  top = "top",
  left = "left",
  right = "right",
  bottom = "bottom"
}

export class ScaleContext {
  activeScale?: ScaleDirectionType;
  signalChange: HSCore.Util.Signal;

  constructor() {
    this.signalChange = new HSCore.Util.Signal(this);
  }

  setActiveScale(scale?: ScaleDirectionType): void {
    this.activeScale = scale;
    this.signalChange.dispatch();
  }
}

interface MeshData {
  material: {
    normal: any;
    highlight: any;
  };
  geometry: any;
}

const OPACITY = 1;
const OFFSET = 0.05;

export class WallBoardScale extends HSApp.View.Base.Gizmo {
  private static _meshData: MeshData | null = null;

  content: any;
  scaleDirType: ScaleDirectionType;
  scaleContext: ScaleContext;
  private _textureReady: boolean = false;
  private _cleanedUp: boolean = false;
  private _normalTexture?: any;
  private _highlightTexture?: any;
  meshData?: MeshData;
  node?: any;
  moveBtn?: any;
  layer?: any;
  context?: any;
  line?: any;
  positionUpdateSuspended?: boolean;
  signalHook: HSCore.Util.SignalHook;

  constructor(
    layer: any,
    displayController: any,
    content: any,
    scaleDirType: ScaleDirectionType,
    scaleContext: ScaleContext
  ) {
    super(
      layer,
      displayController,
      content,
      new ScaleDisplayController(content, layer, scaleDirType, scaleContext)
    );
    this.content = content;
    this.scaleDirType = scaleDirType;
    this.scaleContext = scaleContext;

    this.signalHook.listen(this.content.signalFieldChanged, this._onContentFieldChange);
    this.signalHook.listen(this.content.signalDirty, this._onContentFieldChange);
    this.signalHook.listen(this.scaleContext.signalChange, this._onActiveScaleChange);

    this._initMeshData().then(() => {
      this._textureReady = true;
      this.show();
    });
  }

  private async _initMeshData(): Promise<void> {
    const promises: Promise<void>[] = [];
    let meshData = WallBoardScale._meshData;

    if (!meshData) {
      meshData = {
        material: {
          normal: null,
          highlight: null
        },
        geometry: null
      };

      meshData.material.normal = HSApp.View.T3d.Util.createGizmoMaterial(
        HSApp.View.T3d.MeshBasicMaterial,
        {
          color: 0xffffff,
          opacity: OPACITY,
          cullMode: HSApp.View.T3d.RasterizerCullMode.CM_None,
          transparent: true
        }
      );

      meshData.material.highlight = HSApp.View.T3d.Util.createGizmoMaterial(
        HSApp.View.T3d.MeshBasicMaterial,
        {
          color: 0xffffff,
          opacity: OPACITY,
          cullMode: HSApp.View.T3d.RasterizerCullMode.CM_None,
          transparent: true
        }
      );

      const normalImagePath = HSConstants.Resources.images.resizePng;
      const highlightImagePath = HSConstants.Resources.images.resizeHoverPng;

      promises.push(
        ResourceManager.load(normalImagePath, HSApp.Io.Load.LoadTypeEnum.T3dContentTexture, {
          skipWebp: true
        })
          .then((texture: any) => {
            if (!this._cleanedUp && meshData?.material.normal) {
              this._normalTexture = texture;
              meshData.material.normal.setDiffuseTexture(texture);
              if (this.context) {
                this.context.needsRendering = true;
              }
            } else {
              texture.xRelease();
            }
          })
          .catch((error: Error) => {})
      );

      promises.push(
        ResourceManager.load(highlightImagePath, HSApp.Io.Load.LoadTypeEnum.T3dContentTexture, {
          skipWebp: true
        }).then((texture: any) => {
          if (!this._cleanedUp && meshData?.material.highlight) {
            this._highlightTexture = texture;
            meshData.material.highlight.setDiffuseTexture(texture);
            if (this.context) {
              this.context.needsRendering = true;
            }
          } else {
            texture.xRelease();
          }
        })
      );

      const planeGeometry = new THREE.PlaneBufferGeometry(0.1344, 0.12);
      meshData.geometry = T3Dx.Three2T3d.convertBufferGeometryToStreamingMesh(planeGeometry);
    }

    this.meshData = meshData;

    await Promise.all(promises);
    WallBoardScale._meshData = meshData;
  }

  onCleanup(): void {
    this.hide();
    this.signalHook.unlistenAll();
    HSApp.View.T3d.Util.cleanupMeshGeometry(this.line);
    super.onCleanup();
    this._cleanedUp = true;
  }

  show(): void {
    this.updateMesh();
    if (this.layer) {
      this.layer.addChild(this);
    }
    if (this.context) {
      this.context.needsRendering = true;
    }
  }

  hide(): void {
    this.layer.removeChild(this);
    if (this.context) {
      this.context.needsRendering = true;
    }
  }

  private _onActiveScaleChange = (event: any): void => {
    if (this.scaleContext.activeScale) {
      if (this.scaleContext.activeScale === this.scaleDirType) {
        this.show();
      } else {
        this.hide();
      }
    } else {
      this.show();
    }
  };

  updateMesh(): void {
    if (!this._textureReady) return;

    if (!this.node) {
      this.node = new HSApp.View.T3d.Node();
      this.moveBtn = T3Dx.Three2T3d.createMeshNode(
        this.meshData!.geometry,
        this.meshData!.material.normal
      );
      this.node.addChild(this.moveBtn);
    }

    if (!this.positionUpdateSuspended) {
      this.moveBtn.setTranslation(this._getPosition());
    }

    this.moveBtn.setRotation(this._getRotation());

    if (this.context) {
      this.context.needsRendering = true;
    }
  }

  private _getPosition(): HSApp.View.T3d.Vector3 {
    const content = this.content;
    const rotationRad = HSApp.View.T3d.DegToRad(-this.content.rotation);
    const position = new HSApp.View.T3d.Vector3(0, 0, 0);
    const contentPosSize = HSApp.Util.Content.getContentPosSize(content);

    if (this.scaleDirType === ScaleDirectionType.top) {
      const distance = contentPosSize.ZSize + OFFSET;
      position.set(0, 0, 1).scaleInPlace(distance);
      position.addInPlace(contentPosSize);
    } else if (this.scaleDirType === ScaleDirectionType.bottom) {
      const distance = OFFSET;
      position.set(0, 0, -1).scaleInPlace(distance);
      position.addInPlace(contentPosSize);
    } else if (this.scaleDirType === ScaleDirectionType.left) {
      const distance = 0.5 * contentPosSize.XSize + OFFSET;
      position.set(1, 0, 0).scaleInPlace(distance);
      HSApp.View.T3d.Quaternion.EulerToQuaternion(
        new HSApp.View.T3d.Vector3(0, 0, rotationRad)
      ).transformVectorToRef(position, position);
      position.addInPlace(contentPosSize);
      position.addInPlace({ x: 0, y: 0, z: 0.5 * contentPosSize.ZSize });
    } else if (this.scaleDirType === ScaleDirectionType.right) {
      const distance = 0.5 * contentPosSize.XSize + OFFSET;
      position.set(-1, 0, 0).scaleInPlace(distance);
      HSApp.View.T3d.Quaternion.EulerToQuaternion(
        new HSApp.View.T3d.Vector3(0, 0, rotationRad)
      ).transformVectorToRef(position, position);
      position.addInPlace(contentPosSize);
      position.addInPlace({ x: 0, y: 0, z: 0.5 * contentPosSize.ZSize });
    }

    const parent = this.content.getUniqueParent();
    let altitude = 0;
    if (parent instanceof HSCore.Model.Layer) {
      altitude = HSCore.Util.Layer.getAltitude(parent);
    }

    return new HSApp.View.T3d.Vector3(position.x, position.z + altitude, -position.y);
  }

  private _getRotation(): any {
    const rotationRad = HSApp.View.T3d.DegToRad(-this.content.rotation);

    if (this.scaleDirType === ScaleDirectionType.top) {
      return HSApp.View.T3d.Quaternion.EulerToQuaternion(
        new HSApp.View.T3d.Vector3(0, rotationRad, 0)
      );
    } else if (this.scaleDirType === ScaleDirectionType.bottom) {
      return HSApp.View.T3d.Quaternion.EulerToQuaternion(
        new HSApp.View.T3d.Vector3(0, rotationRad, Math.PI)
      );
    } else if (this.scaleDirType === ScaleDirectionType.left) {
      return HSApp.View.T3d.Quaternion.EulerToQuaternion(
        new HSApp.View.T3d.Vector3(0, rotationRad, -0.5 * Math.PI)
      );
    } else if (this.scaleDirType === ScaleDirectionType.right) {
      return HSApp.View.T3d.Quaternion.EulerToQuaternion(
        new HSApp.View.T3d.Vector3(0, rotationRad, 0.5 * Math.PI)
      );
    }

    return HSApp.View.T3d.Quaternion.EulerToQuaternion(new HSApp.View.T3d.Vector3(0, 0, 0));
  }

  private _onContentFieldChange = (event: any): void => {
    this.updateMesh();
  };

  onMouseOver(): void {
    this.moveBtn.getComponent(HSApp.View.T3d.MeshComponent).setMaterial(
      this.meshData!.material.highlight
    );
    if (this.context) {
      this.context.needsRendering = true;
    }
  }

  onMouseOut(): void {
    this.moveBtn.getComponent(HSApp.View.T3d.MeshComponent).setMaterial(
      this.meshData!.material.normal
    );
    if (this.context) {
      this.context.needsRendering = true;
    }
  }
}

interface GizmoType {
  x: number;
  y: number;
  z: number;
}

class ScaleDisplayController extends HSApp.View.Base.DisplayController {
  content: any;
  scaleContext: ScaleContext;
  scaleDirType: ScaleDirectionType;
  signalHook: HSCore.Util.SignalHook;
  private _startPosition?: number[];
  private _cmd?: any;
  private _cmdMgr: any;

  constructor(
    content: any,
    layer: any,
    scaleDirType: ScaleDirectionType,
    scaleContext: ScaleContext
  ) {
    super(content, layer);
    this.content = content;
    this.scaleContext = scaleContext;
    this.scaleDirType = scaleDirType;
    this.signalHook = new HSCore.Util.SignalHook(this);
  }

  private _getGizmoType(): GizmoType {
    switch (this.scaleDirType) {
      case ScaleDirectionType.top:
        return { x: 0, y: 0, z: 1 };
      case ScaleDirectionType.bottom:
        return { x: 0, y: 0, z: -1 };
      case ScaleDirectionType.left:
        return { x: 1, y: 0, z: 0 };
      case ScaleDirectionType.right:
        return { x: -1, y: 0, z: 0 };
    }
    return { x: 0, y: 0, z: 0 };
  }

  ondragstart(event: any): boolean {
    let currentCommand = this._cmdMgr.current;

    if (!currentCommand) {
      const content = this.content;
      const gizmoType = this._getGizmoType();
      const resizeRequestType = HSApp.Util.getResizeRequestType(content);

      currentCommand = this._cmdMgr.createCommand(
        HSFPConstants.CommandType.ResizeWallBoard,
        [content, resizeRequestType, undefined, gizmoType]
      );

      this._cmdMgr.execute(currentCommand);
      this.signalHook.listen(this._cmdMgr.signalCommandTerminated, this._onCommandTerminate);
      this._startPosition = event.position.slice(0);
      this.scaleContext.setActiveScale(this.scaleDirType);
      this._cmd = currentCommand;

      return true;
    }

    return false;
  }

  onmousedown(): void {}

  private _onCommandTerminate = (event: any): void => {
    if (event.data.cmd === this._cmd) {
      this._cmd = undefined;
      this.scaleContext.setActiveScale(undefined);
      this.signalHook.unlistenAll();
    }
  };

  composedragmoveparam(event: any): any {
    const position = event.position;

    if (position && this._startPosition) {
      event.offset[0] = position[0] - this._startPosition[0];
      event.offset[1] = position[1] - this._startPosition[1];
      event.offset[2] = position[2] - this._startPosition[2];
    }

    return event;
  }
}