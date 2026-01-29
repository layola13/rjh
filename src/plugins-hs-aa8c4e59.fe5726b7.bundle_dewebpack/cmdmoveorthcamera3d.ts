import { Vector3 } from 'three';
import { HSApp } from './HSApp';
import { HSCore } from './HSCore';

interface DragEvent {
  event: {
    pageX: number;
    pageY: number;
    wheelDeltaY?: number;
    wheelDelta?: number;
    detail?: number;
  };
}

interface Point2D {
  x: number;
  y: number;
}

interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export class CmdMoveOrthCamera3D extends HSApp.Cmd.Command {
  private _middleMouseOriginPoint?: Point2D;

  constructor(...args: unknown[]) {
    super(...args);
    this._middleMouseOriginPoint = undefined;
  }

  onExecute(): void {}

  onReceive(eventType: string, data?: DragEvent): boolean | void {
    if (eventType === 'dragstart') {
      return this.onDragStart();
    } else if (eventType === 'dragmove') {
      return this.onDragMove(data!);
    } else if (eventType === 'dragend') {
      this.onDragEnd();
      this.mgr.complete();
      return;
    } else if (eventType === 'zoom') {
      return this.onZoom(data!);
    } else {
      return super.onReceive(eventType, data);
    }
  }

  onDragStart(): boolean {
    const cameraEntity = HSApp.App.getApp().getActive3DView().camera.entity;
    if (!cameraEntity || cameraEntity.view_type !== HSCore.Model.CameraViewTypeEnum.Orthographic) {
      return false;
    }
    return true;
  }

  onDragEnd(): boolean {
    const camera = HSApp.App.getApp().getActive3DView().camera;
    const cameraEntity = camera.entity;
    
    if (!cameraEntity || cameraEntity.view_type !== HSCore.Model.CameraViewTypeEnum.Orthographic) {
      return false;
    }
    
    this._middleMouseOriginPoint = undefined;
    this.context.app.signalCameraChangeEnd.dispatch(camera);
    return true;
  }

  onDragMove(dragEvent: DragEvent): boolean {
    const camera = HSApp.App.getApp().getActive3DView().camera;
    const cameraEntity = camera.entity;
    const t3dCamera = camera.getT3dCamera();
    const clientRect = camera.context.clientRect;

    if (!cameraEntity || 
        cameraEntity.view_type !== HSCore.Model.CameraViewTypeEnum.Orthographic || 
        !t3dCamera || 
        !clientRect) {
      return false;
    }

    const delta = this._calcMiddleDragData(dragEvent, t3dCamera, clientRect.width, clientRect.height);
    
    cameraEntity.target_x += delta.x;
    cameraEntity.target_y += delta.y;
    cameraEntity.target_z += delta.z;
    cameraEntity.x += delta.x;
    cameraEntity.y += delta.y;
    cameraEntity.z += delta.z;
    
    return true;
  }

  onZoom(zoomEvent: DragEvent): boolean {
    const wheelDelta = zoomEvent.event.wheelDeltaY ?? 
                       zoomEvent.event.wheelDelta ?? 
                       -(zoomEvent.event.detail ?? 0);
    
    if (wheelDelta === 0) {
      return false;
    }

    const direction = Math.max(-1, Math.min(1, wheelDelta));
    this.changeCameraZoom(direction);
    return true;
  }

  changeCameraZoom(direction: number): void {
    const cameraEntity = HSApp.App.getApp().getActive3DView().camera.entity;
    const zoomStep = 2 * HSApp.Camera.CameraConstants.ORBITVIEW_MOUSEWHEEL_STEP;

    if (direction > 0) {
      cameraEntity.zoom -= zoomStep;
      if (cameraEntity.zoom < HSApp.Camera.CameraConstants.ORBITVIEW_CAMERA_MIN_ZOOM) {
        cameraEntity.zoom = HSApp.Camera.CameraConstants.ORBITVIEW_CAMERA_MIN_ZOOM;
      }
    } else {
      cameraEntity.zoom += zoomStep;
      if (cameraEntity.zoom > HSApp.Camera.CameraConstants.ORBITVIEW_CAMERA_MAX_ZOOM) {
        cameraEntity.zoom = HSApp.Camera.CameraConstants.ORBITVIEW_CAMERA_MAX_ZOOM;
      }
    }
  }

  private _calcMiddleDragData(
    dragEvent: DragEvent,
    t3dCamera: unknown,
    width: number,
    height: number
  ): Vector3D {
    const delta: Vector3D = { x: 0, y: 0, z: 0 };

    if (this._middleMouseOriginPoint) {
      const currentPoint = new Vector3(0, 0, 0);
      const originPoint = new Vector3(0, 0, 0);

      currentPoint.x = (dragEvent.event.pageX / width) * 2 - 1;
      currentPoint.y = ((height - dragEvent.event.pageY) / height) * 2 - 1;

      originPoint.x = (this._middleMouseOriginPoint.x / width) * 2 - 1;
      originPoint.y = ((height - this._middleMouseOriginPoint.y) / height) * 2 - 1;

      HSApp.View.T3d.Util.unprojectVector3ToCamera(currentPoint, t3dCamera);
      HSApp.View.T3d.Util.unprojectVector3ToCamera(originPoint, t3dCamera);

      delta.x = originPoint.x - currentPoint.x;
      delta.y = currentPoint.z - originPoint.z;
      delta.z = originPoint.y - currentPoint.y;
    }

    this._middleMouseOriginPoint = {
      x: dragEvent.event.pageX,
      y: dragEvent.event.pageY
    };

    return delta;
  }

  isTransient(): boolean {
    return true;
  }
}