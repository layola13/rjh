import { Hole } from './Hole';
import { WebCadDocument } from './WebCadDocument';
import { WindowSill as WindowSillBase } from './WindowSill';
import * as THREE from 'three';

class WindowSill extends WindowSillBase {
  private _matrixLocal!: THREE.Matrix4;

  constructor(
    entity: HSCore.Model.Parametrization.WindowSill,
    context: WebCadDocument,
    parent: Window
  ) {
    super(entity, new WebCadDocument(), context, parent);
  }

  onUpdatePosition(): void {
    const matrix = new THREE.Matrix4();
    const parent = this.entity.getUniqueParent();
    
    if (parent) {
      matrix.makeScale(1 / parent.XScale, 1 / parent.YScale, 1 / parent.ZScale);
    }
    
    this._matrixLocal = matrix;
  }
}

export class Window extends Hole {
  constructor(
    entity: HSCore.Model.Parametrization.Window,
    context: WebCadDocument,
    parent: unknown
  ) {
    super(entity, context, parent);
  }

  onInit(): void {
    const windowSill = this.entity.getWindowSill();
    
    if (windowSill) {
      const sillObject = this.createSillObject(windowSill);
      
      if (sillObject && this.childNodes) {
        this.childNodes.set(windowSill.id, sillObject);
      }
    }
    
    super.onInit();
  }

  createSillObject(entity: HSCore.Model.Parametrization.WindowSill): WindowSill {
    return new WindowSill(entity, this.context, this);
  }

  onChildAdded(event: { data: { entity?: HSCore.Model.Parametrization.Entity } }): void {
    const entity = event.data.entity;
    
    if (!entity) {
      return;
    }
    
    if (entity instanceof HSCore.Model.Parametrization.WindowSill) {
      const sillObject = this.createSillObject(entity);
      
      if (this.childNodes) {
        this.childNodes.set(entity.id, sillObject);
      }
    } else {
      super.onChildAdded(event);
    }
  }
}