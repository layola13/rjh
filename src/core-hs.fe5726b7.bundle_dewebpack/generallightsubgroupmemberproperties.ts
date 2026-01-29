export class GeneralLightSubGroupMemberProperties {
  z: boolean = false;
  close: boolean = false;
  affectSpecular: boolean = false;
  intensity: boolean = false;
  rotation: boolean = false;
  temperature: boolean = false;
  rgb: boolean = false;
  volumeLight: boolean = false;
}

export class PointLightSubGroupMemberProperties extends GeneralLightSubGroupMemberProperties {
  radius: boolean = false;
}

export class MeshLightSubGroupMemberProperties extends GeneralLightSubGroupMemberProperties {}

export class PhysicalLightSubGroupMemberProperties extends GeneralLightSubGroupMemberProperties {}

export class RotationLightSubGroupMemberProperties extends GeneralLightSubGroupMemberProperties {
  XRotation: boolean = false;
  YRotation: boolean = false;
  ZRotation: boolean = false;
}

export class SpotLightSubGroupMemberProperties extends RotationLightSubGroupMemberProperties {
  IES: boolean = false;
}

export class SpotPhysicalLightSubGroupMemberProperties extends RotationLightSubGroupMemberProperties {
  IES: boolean = false;
}

export class AttenuatedSpotLightSubGroupMemberProperties extends SpotLightSubGroupMemberProperties {
  nearAttenuationStart: boolean = false;
  nearAttenuationEnd: boolean = false;
  farAttenuationStart: boolean = false;
  farAttenuationEnd: boolean = false;
  hotspotAngle: boolean = false;
  falloffAngle: boolean = false;
}

export class VirtualAreaLightSubGroupMemberProperties extends RotationLightSubGroupMemberProperties {
  width: boolean = false;
  height: boolean = false;
  double_flat: boolean = false;
}

export class FlatLightSubGroupMemberProperties extends VirtualAreaLightSubGroupMemberProperties {}

interface LightProperties {
  [key: string]: boolean | number | number[] | unknown;
}

const FLOAT_COMPARISON_EPSILON = 1e-4;

export class LightSubGroupCompareUtil {
  static setPropertyByValue(propertyName: string, target: Record<string, boolean>, value: boolean): void {
    target[propertyName] = value;
  }

  static updateProperty(
    propertyMap: Record<string, boolean> | null | undefined,
    lightObjects: LightProperties[] | null | undefined
  ): void {
    if (!propertyMap || !lightObjects || lightObjects.length < 1) {
      return;
    }

    Object.keys(propertyMap).forEach((propertyName) => {
      let isUniform = true;
      const firstValue = lightObjects[0][propertyName];

      if (typeof firstValue === "number") {
        for (let i = 1; i < lightObjects.length; ++i) {
          const currentValue = lightObjects[i][propertyName];
          const prevValue = lightObjects[i - 1][propertyName];

          if (
            typeof currentValue !== "number" ||
            typeof prevValue !== "number" ||
            isNaN(currentValue) ||
            isNaN(prevValue) ||
            Math.abs(currentValue - prevValue) > FLOAT_COMPARISON_EPSILON
          ) {
            isUniform = false;
            break;
          }
        }
      } else {
        for (let i = 1; i < lightObjects.length; ++i) {
          const prevObject = lightObjects[i - 1];
          const currentObject = lightObjects[i];

          if (prevObject[propertyName] !== currentObject[propertyName]) {
            if (propertyName === "rgb") {
              const prevRgb = prevObject[propertyName];
              const currentRgb = currentObject[propertyName];

              if (!Array.isArray(prevRgb) || !Array.isArray(currentRgb)) {
                isUniform = false;
                break;
              }

              if (
                prevRgb[0] !== currentRgb[0] ||
                prevRgb[1] !== currentRgb[1] ||
                prevRgb[2] !== currentRgb[2]
              ) {
                isUniform = false;
                break;
              }
            } else {
              if (typeof currentObject[propertyName] === "object") {
                console.warn("Unsupport member: " + propertyName);
              }
              isUniform = false;
              break;
            }
          }
        }
      }

      LightSubGroupCompareUtil.setPropertyByValue(propertyName, propertyMap, isUniform);
    });
  }
}