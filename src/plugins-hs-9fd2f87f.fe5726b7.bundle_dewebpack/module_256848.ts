import { HSCore } from './HSCore';
import * as _ from 'lodash';

interface LightSlotParameters {
  [key: string]: unknown;
}

interface LightSlotEntity {
  lightSlotId: string;
  parameters: LightSlotParameters;
  dirtyGeometry(): void;
  getUniqueParent(): ParentEntity | null | undefined;
  refreshFaceMaterial(): void;
}

interface ParentEntity {
  dirtyGeometry(): void;
}

interface EntityWithChildren {
  children: Record<string, LightSlotEntity>;
}

type MessageType = 'ceilingchanging' | 'ceilingchangeend' | string;

export default class LightSlotStateRequest extends HSCore.Transaction.Common.StateRequest {
  private _lightSlot: LightSlotEntity;
  private _parameters: LightSlotParameters;

  constructor(entity: EntityWithChildren, lightSlotId: string) {
    super();
    this._lightSlot = this.getLightSlotEntityById(entity, lightSlotId);
    this._parameters = this._lightSlot.parameters;
  }

  onReceive(messageType: MessageType, data: LightSlotParameters): void {
    switch (messageType) {
      case 'ceilingchanging':
      case 'ceilingchangeend':
        this.changeProfileData(data);
        break;
    }
    super.onReceive(messageType, data);
  }

  changeProfileData(newData: LightSlotParameters): void {
    if (!this._parameters || !newData) {
      return;
    }

    const clonedParameters = _.cloneDeep(this._parameters);
    Object.assign(clonedParameters, newData);
    this._lightSlot.parameters = clonedParameters;
    this._lightSlot.dirtyGeometry();
    
    const parent = this._lightSlot.getUniqueParent();
    parent?.dirtyGeometry();
    
    this._lightSlot.refreshFaceMaterial();
  }

  canTransactField(): boolean {
    return true;
  }

  onUndo(): void {
    super.onUndo();
    this._lightSlot.refreshFaceMaterial();
  }

  onRedo(): void {
    super.onRedo();
    this._lightSlot.refreshFaceMaterial();
  }

  private getLightSlotEntityById(entity: EntityWithChildren, lightSlotId: string): LightSlotEntity {
    return Object.values(entity.children).find(
      (child: LightSlotEntity) => child.lightSlotId === lightSlotId
    )!;
  }
}