import * as THREE from 'three';

interface Vector3Like {
  x: number;
  y: number;
  z: number;
}

interface TransformData {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

interface MaterialData {
  seekId?: string;
  offsetX: number;
  offsetY: number;
  rotation: number;
  initTileSize_x: number;
  initTileSize_y: number;
}

interface CameraData {
  fov: number;
}

interface PostMessageData {
  type: string;
  msgId: string;
  data?: any;
}

interface MessageEvent {
  data: {
    msgId: string;
    type: string;
  };
}

interface Material {
  signalDirty: any;
  offsetX: number;
  offsetY: number;
  rotation: number;
  initTileSize_x: number;
  initTileSize_y: number;
  saveToJSON(): { data: MaterialData[] };
}

interface Entity {
  x: number;
  y: number;
  z: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  XScale: number;
  YScale: number;
  ZScale: number;
  seekId: string;
  id: string;
  materialsMap: Map<string, Material>;
  meshMaterials: Map<string, Material>;
  signalMaterialChanged: any;
}

interface IFrameWithViewer extends HTMLIFrameElement {
  contentWindow: Window & {
    viewer?: {
      cameraControls: {
        update(): void;
      };
      render(): void;
    };
    syncScene(data: PostMessageData): void;
  };
}

export function yUp(x: number, y: number, z: number): THREE.Vector3;
export function yUp(vector: [number, number, number]): THREE.Vector3;
export function yUp(vector: Vector3Like): THREE.Vector3;
export function yUp(...args: any[]): THREE.Vector3 {
  let x: number;
  let y: number;
  let z: number;

  if (args.length === 3) {
    x = args[0];
    y = args[1];
    z = args[2];
  } else if (Array.isArray(args[0])) {
    [x, y, z] = args[0];
  } else {
    const vector = args[0];
    x = vector.x;
    y = vector.y;
    z = vector.z;
  }

  return new THREE.Vector3(x, z, -y);
}

export class ContentPBRMaterialReplaceStyler {
  private iframe?: IFrameWithViewer;
  private restoreTask: Array<() => void> = [];
  private signalHook: any;
  private materialPartMap: Map<string, MaterialData> = new Map();
  private app: any;
  private entity?: Entity;

  constructor() {
    this.app = (window as any).HSApp.App.getApp();
    this.signalHook = new (window as any).HSCore.Util.SignalHook(this);
  }

  private messageHandler = (event: MessageEvent): void => {
    if (event.data.msgId === 'loaded' && event.data.type === 'scene') {
      (window as any).HSApp.UI.FullScreenLoading.hide();

      const baseHeight = (window as any).HSCore.Util.Layer.getEntityBaseHeight(this.entity);

      this.postMessage({
        type: 'model',
        msgId: 'transform',
        data: {
          position: [this.entity!.x, this.entity!.z + baseHeight, -this.entity!.y],
          rotation: [this.entity!.XRotation, -this.entity!.ZRotation, this.entity!.YRotation],
          scale: [this.entity!.XScale, this.entity!.ZScale, this.entity!.YScale]
        }
      });

      this.updateCamera();

      this.entity!.materialsMap.forEach((material) => {
        this.updateMaterial(this.entity!, material);
      });

      this.signalHook.listen(this.app.signalNewAnimationFrame, () => {
        const renderingContext = this.app.getActive3DView().renderingMgr.context;
        
        if (renderingContext.needsRendering && this.iframe?.contentWindow) {
          renderingContext.needsRendering = false;
          this.updateCamera();
          this.iframe.contentWindow.viewer?.cameraControls.update();
          this.iframe.contentWindow.viewer?.render();
        }
      });
    }
  };

  public init(entity: Entity): void {
    (window as any).HSApp.UI.FullScreenLoading.show(
      (window as any).ResourceManager.getString('load_product_start')
    );

    const previousRenderingMode = this.app.appSettings.renderingMode;
    this.app.appSettings.renderingMode = '';
    
    this.restoreTask.push(() => {
      this.app.appSettings.renderingMode = previousRenderingMode;
    });

    this.entity = entity;
    this.initIframe(entity);
    this.changeEntityMaterial(entity);
    this.selectChange(entity);
    this.changeCamera();
  }

  public destroy(): void {
    this.signalHook.unlistenAll();
    this.iframe?.remove();
    
    this.restoreTask.forEach((task) => task());
    this.restoreTask.length = 0;
    
    window.removeEventListener('message', this.messageHandler);
  }

  private initIframe(entity: Entity): void {
    const iframe = document.createElement('iframe') as IFrameWithViewer;
    iframe.src = `/view3dpbr/index.html?model=${entity.seekId}`;
    iframe.style.cssText = `
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      pointer-events: none;
    `;

    document.querySelector('#editor3d')?.appendChild(iframe);
    this.iframe = iframe;
    
    window.addEventListener('message', this.messageHandler);
  }

  private changeEntityMaterial(entity: Entity): void {
    const materialDirtyHandler = (event: any): void => {
      this.updateMaterial(entity, event.target);
    };

    entity.materialsMap.forEach((material) => {
      this.signalHook.listen(material.signalDirty, materialDirtyHandler);
    });

    this.signalHook.listen(entity.signalMaterialChanged, (event: any) => {
      if (event.data.newMaterial) {
        this.updateMaterial(entity, event.data.newMaterial);
        this.signalHook.listen(event.data.newMaterial.signalDirty, materialDirtyHandler);
      } else {
        this.postMessage({
          type: 'material',
          msgId: 'set_material',
          data: {
            part: event.data.component
          }
        });
      }

      if (event.data.oldMaterial) {
        this.signalHook.unlisten(event.data.oldMaterial.signalDirty, materialDirtyHandler);
      }
    });
  }

  private selectChange(entity: Entity): void {
    this.signalHook.listen(this.app.selectionManager.signalSelectionChanged, () => {
      const selectedMeshName = this.app.selectionManager.selected(false)[0]?.meshName;
      
      this.postMessage({
        type: 'model',
        msgId: 'selected',
        data: selectedMeshName
      });
    });

    const displayListItem = this.app.getActive3DView().displayList[entity.id];
    
    this.signalHook.listen(displayListItem?.signalContentMeshHover, (event: any) => {
      const isMouseOver = event?.data.type === 'onMouseOver';
      const meshName = isMouseOver ? event?.data.param.meshName : '';
      
      this.postMessage({
        type: 'model',
        msgId: 'hover',
        data: meshName
      });
    });
  }

  private changeCamera(): void {
    const cameraSignal = (window as any).HSApp.App.getApp()
      .environmentManager.activeEnvironment._camera.signalFieldChanged;
    
    this.signalHook.listen(cameraSignal, () => {
      this.updateCamera();
    });
  }

  private getPlugin(pluginName: string): any {
    return this.app.pluginManager.getPlugin(pluginName);
  }

  private updateCamera(): void {
    const renderPlugin = this.getPlugin('hsw.plugin.render.Plugin');
    const handler = renderPlugin.getHandler();
    const viewportOption = handler.getViewportOption();
    const cameraData = handler._getCamera(viewportOption);
    
    const camera = this.app.getActive3DView().camera;
    const aspect = camera.getAspect();
    const fov = camera.getFov();
    
    const horizontalFov = (180 / Math.PI) * (2 * Math.atan(Math.tan(fov * Math.PI / 180 * 0.5) * aspect));
    
    cameraData.fov = horizontalFov;
    
    this.postMessage({
      type: 'camera',
      msgId: 'set_camera',
      data: cameraData
    });
  }

  private updateMaterial(entity: Entity, material: Material): void {
    const meshMaterialEntries = [...entity.meshMaterials.entries()];
    const materialsMapEntries = [...entity.materialsMap.entries()];
    const allEntries = [...meshMaterialEntries, ...materialsMapEntries];
    
    const partNames = allEntries
      .filter(([, mat]) => mat === material)
      .map(([partName]) => partName);

    partNames.forEach((partName) => {
      const materialData = material.saveToJSON().data[0];
      materialData.offsetX = material.offsetX;
      materialData.offsetY = material.offsetY;
      materialData.rotation = material.rotation;
      materialData.initTileSize_x = material.initTileSize_x;
      materialData.initTileSize_y = material.initTileSize_y;

      let messageId = 'update_material';
      const cachedMaterial = this.materialPartMap.get(partName);
      
      if (cachedMaterial?.seekId !== materialData.seekId) {
        messageId = 'set_material';
      }

      this.materialPartMap.set(partName, materialData);

      this.postMessage({
        type: 'material',
        msgId: messageId,
        data: {
          part: partName,
          material: materialData
        }
      });
    });
  }

  private postMessage(data: PostMessageData): void {
    this.iframe?.contentWindow?.syncScene(data);
  }
}