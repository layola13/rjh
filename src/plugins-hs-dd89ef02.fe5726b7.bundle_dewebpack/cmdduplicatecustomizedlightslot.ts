import { HSCore } from './HSCore';
import { CmdAddCustomizedLightSlot } from './CmdAddCustomizedLightSlot';

interface LightSlotParameters {
  parameters?: Record<string, unknown>;
  flip?: unknown;
  [key: string]: unknown;
}

interface LightSlotEntity {
  lightSlotId: string;
  getParameters(): { parameters: LightSlotParameters };
  getUniqueParent(): MaterialEntity;
  parameters?: LightSlotParameters;
}

interface MaterialEntity {
  getMaterialData(): Map<string, unknown>;
  setMaterialData(materialMap: Map<string, unknown>, options: Record<string, unknown>): void;
}

interface ReceiveEvent {
  event: {
    button: number;
  };
}

export class CmdDuplicateCustomizedLightSlot extends CmdAddCustomizedLightSlot {
  private entity: LightSlotEntity;
  private originalMaterialMap: Map<string, unknown>;

  constructor(
    lightSlotEntity: LightSlotEntity,
    context: unknown
  ) {
    let parameters: LightSlotParameters;

    if (lightSlotEntity instanceof HSCore.Model.CustomizedModelLightSlot) {
      parameters = lightSlotEntity.getParameters().parameters;
    } else if (lightSlotEntity instanceof HSCore.Model.NCustomizedModelLightSlot) {
      parameters = lightSlotEntity.parameters ?? {};
    } else {
      parameters = {};
    }

    delete parameters.flip;

    super(context, parameters, lightSlotEntity);

    this.entity = lightSlotEntity;
    const parentEntity = this.entity.getUniqueParent();
    this.originalMaterialMap = this._getMaterialMap(parentEntity);
  }

  onReceive(eventType: string, eventData: ReceiveEvent): boolean {
    const result = super.onReceive(eventType, eventData);

    if (
      !result ||
      eventType !== 'click' ||
      eventData.event.button !== 0 ||
      !this.lastAddLightSlotEntity
    ) {
      return false;
    }

    this._updateMaterial();
    return result;
  }

  complete(data: unknown): void {
    super.complete(data);
  }

  private _updateMaterial(): void {
    const newMaterialMap = this._getMaterialMap(this._lastHoveredEntity);
    let fallbackMaterial: unknown;
    const unmatchedKeys: string[] = [];

    newMaterialMap.forEach((material, key) => {
      const keyParts = key.split(':');

      if (keyParts.length > 1 && key.includes(this.lastAddLightSlotEntity.lightSlotId)) {
        let materialFound = false;

        this.originalMaterialMap.forEach((originalMaterial, originalKey) => {
          const originalKeyParts = originalKey.split(':');

          if (
            originalKeyParts.length > 1 &&
            originalKey.includes(this.entity.lightSlotId)
          ) {
            if (!fallbackMaterial) {
              fallbackMaterial = originalMaterial;
            }

            if (keyParts[1] === originalKeyParts[1]) {
              newMaterialMap.set(key, originalMaterial);
              materialFound = true;
            }
          }
        });

        if (!materialFound) {
          unmatchedKeys.push(key);
        }
      }
    });

    if (unmatchedKeys.length > 0 && fallbackMaterial) {
      unmatchedKeys.forEach((key) => {
        newMaterialMap.set(key, fallbackMaterial);
      });
    }

    this._lastHoveredEntity.setMaterialData(newMaterialMap, {});
  }

  private _getMaterialMap(entity: MaterialEntity | null | undefined): Map<string, unknown> {
    return entity ? entity.getMaterialData() : new Map<string, unknown>();
  }
}