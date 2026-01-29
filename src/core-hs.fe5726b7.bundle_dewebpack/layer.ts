import { BaseObject } from './BaseObject';
import { TransUtil } from './TransUtil';

interface Entity {
  children: Record<string, unknown>;
  [key: string]: unknown;
}

interface ChildAddedEvent {
  data: {
    entity?: unknown;
  };
}

interface DocumentManager {
  activeDocument: {
    scene: {
      getLayerAltitude(entity: Entity): number;
    };
  };
}

interface HSCoreDoc {
  getDocManager(): DocumentManager;
}

declare global {
  const HSCore: {
    Doc: HSCoreDoc;
  };
  const THREE: {
    Matrix4: new () => Matrix4;
  };

  interface Matrix4 {
    makeTranslation(x: number, y: number, z: number): Matrix4;
  }
}

export class Layer extends BaseObject {
  protected _matrixLocal?: Matrix4;

  constructor(entity: Entity, second: unknown, third: unknown) {
    super(entity, second, third);
  }

  onInit(): void {
    Object.values(this.entity.children).forEach((child) => {
      this.createViewModel(child);
    }, this);

    this._updateMatrix();
  }

  private _updateMatrix(): void {
    const altitude = HSCore.Doc.getDocManager().activeDocument.scene.getLayerAltitude(this.entity);
    this._matrixLocal = new THREE.Matrix4().makeTranslation(0, 0, altitude);
    TransUtil.convertMatrixUnit(this._matrixLocal, undefined);
  }

  onUpdatePosition(): void {
    this._updateMatrix();
  }

  onChildAdded(event: ChildAddedEvent): void {
    if (event.data.entity) {
      super.onChildAdded(event);
      this.dirtyGraph();
    }
  }
}