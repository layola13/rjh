import { LightTypeEnum } from './LightTypeEnum';

interface LightSetData {
  key: string;
  label: string;
}

export class LightSetLibrary {
  private static _lightData: Map<string, LightSetData> = new Map();

  static loadDefault(): void {
    const spotLights = [
      HSConstants.RenderLight.SPOT_LIGHT_NUM_1,
      HSConstants.RenderLight.SPOT_LIGHT_NUM_2,
      HSConstants.RenderLight.SPOT_LIGHT_NUM_3,
      HSConstants.RenderLight.SPOT_LIGHT_NUM_4,
      HSConstants.RenderLight.SPOT_LIGHT_NUM_5,
      HSConstants.RenderLight.SPOT_LIGHT_NUM_6,
      HSConstants.RenderLight.SPOT_LIGHT_NUM_7,
      HSConstants.RenderLight.SPOT_LIGHT_NUM_8,
      HSConstants.RenderLight.SPOT_LIGHT_NUM_9,
      HSConstants.RenderLight.SPOT_LIGHT_NUM_10,
      HSConstants.RenderLight.SPOT_LIGHT_NUM_11,
      HSConstants.RenderLight.SPOT_LIGHT_NUM_12,
      HSConstants.RenderLight.SPOT_LIGHT_NUM_13,
      HSConstants.RenderLight.SPOT_LIGHT_NUM_14,
      HSConstants.RenderLight.SPOT_LIGHT_NUM_15,
      HSConstants.RenderLight.FILL_LIGHT_NUM_1,
      HSConstants.RenderLight.FILL_LIGHT_NUM_2,
      HSConstants.RenderLight.FILL_LIGHT_NUM_3,
      HSConstants.RenderLight.FILL_LIGHT_NUM_4,
      HSConstants.RenderLight.FILL_LIGHT_NUM_5,
      HSConstants.RenderLight.FILL_LIGHT_NUM_6,
      HSConstants.RenderLight.FILL_LIGHT_NUM_7,
    ];

    spotLights.forEach((lightKey: string) => {
      LightSetLibrary.add({
        key: lightKey,
        label: lightKey,
      });
    });

    Object.values(LightTypeEnum).forEach((lightType: string) => {
      LightSetLibrary.add({
        key: lightType,
        label: lightType,
      });
    });
  }

  static getLightSetData(): Map<string, LightSetData> {
    return this._lightData;
  }

  static get(key: string): LightSetData | undefined {
    return LightSetLibrary._lightData.get(key);
  }

  static add(data: LightSetData): void {
    LightSetLibrary._lightData.set(data.key, data);
  }

  static delete(key: string): void {
    LightSetLibrary._lightData.delete(key);
  }
}