import BaseComputer from './BaseComputer';
import { CommonOptions } from './CommonOptions';
import { LightContentGroup } from './LightContentGroup';
import { isTemplateV3 } from './templateUtils';

interface Position {
  x: number;
  y: number;
  z: number;
}

interface Rotation {
  XRotation: number;
  YRotation: number;
  ZRotation: number;
}

interface Size {
  x: number;
  y: number;
  z: number;
}

interface Point2D {
  x: number;
  y: number;
}

interface SpotLightConfig extends Position, Rotation {
  type: HSCore.Model.LightTypeEnum.SpotLight;
  temperature: number;
  intensity: number;
  position: THREE.Vector2;
  height: number;
  ies: number;
}

interface Wall {
  from: Point2D;
  to: Point2D;
}

interface Content {
  getPosition(): Position;
  frontForwardVec: THREE.Vector2;
  getSize(): Size;
  getHost(): Wall | null;
}

interface Scene {
  isCeilingFaceHidden(): boolean;
  getCeilingHeight(): number;
}

interface RenderOptions {
  templateKey: string;
  temperature: number;
}

interface ContentContainer {
  getChildren(): ContentContainer[] | undefined;
}

const SPOT_LIGHT_FORWARD_OFFSET = 0.3;
const MIN_HEIGHT_RATIO_V3 = 2 / 3;
const SPOT_LIGHT_X_ROTATION_ANGLE_DIVISOR = 0.3;
const WALL_PERPENDICULAR_BASE_ROTATION = 90;
const DEFAULT_TEMPERATURE_V3 = 5500;
const DEFAULT_INTENSITY_V3 = 1500;
const DEFAULT_INTENSITY_LEGACY = 1300;
const SPOT_LIGHT_Y_ROTATION_OFFSET = 10;
const OVERLAP_TOLERANCE = 0.2;
const CEILING_GAP_OFFSET = 0.5;

export default class SpotLightComputer extends BaseComputer {
  _compute(
    contentContainer: ContentContainer,
    scene: Scene,
    renderOptions: RenderOptions,
    _unused: unknown
  ): SpotLightConfig[] {
    if (scene.isCeilingFaceHidden()) {
      return [];
    }

    const contents = this._getContents(contentContainer);
    const spotLights: SpotLightConfig[] = [];

    contents.forEach((content) => {
      const position = content.getPosition();
      const forwardVector = content.frontForwardVec;
      const size = content.getSize();
      const host = content.getHost();

      if (host && host instanceof HSCore.Model.Wall) {
        const wallStart: Point2D = { x: host.from.x, y: host.from.y };
        const wallEnd: Point2D = { x: host.to.x, y: host.to.y };
        const perpendicularPoint = HSCore.Util.Math.getPerpendicularIntersect(
          position,
          wallStart,
          wallEnd
        );

        const vectorToWall = new THREE.Vector2(
          position.x - perpendicularPoint.x,
          position.y - perpendicularPoint.y
        );

        if (vectorToWall.dot(forwardVector) < 0) {
          forwardVector.negate();
        }
      }

      let lightHeight = position.z + size.z + CEILING_GAP_OFFSET;
      const ceilingHeight = scene.getCeilingHeight();
      const maxAllowedHeight = ceilingHeight - CommonOptions.defaultGapToCeiling;

      if (lightHeight > maxAllowedHeight) {
        lightHeight = maxAllowedHeight;
      }

      const lightPosition = new THREE.Vector2(position.x, position.y);
      lightPosition.add(forwardVector.clone().multiplyScalar(SPOT_LIGHT_FORWARD_OFFSET));

      if (isTemplateV3(renderOptions.templateKey)) {
        const contentCenterHeight = position.z + size.z / 2;
        const minHeightThreshold = (ceilingHeight * MIN_HEIGHT_RATIO_V3);

        if (contentCenterHeight < minHeightThreshold) {
          return;
        }

        const rotation: Position & Rotation = {
          x: 0,
          y: 0,
          z: 0,
          XRotation: 0,
          YRotation: 0,
          ZRotation: 0,
        };

        const verticalDistance = lightHeight - contentCenterHeight;
        const xRotationAngle = THREE.Math.radToDeg(
          Math.atan(SPOT_LIGHT_FORWARD_OFFSET / verticalDistance)
        );
        HSCore.Util.Content.rotateAroundWorldAxis(
          rotation,
          new THREE.Vector3(1, 0, 0),
          xRotationAngle
        );

        const zRotationAngle = WALL_PERPENDICULAR_BASE_ROTATION - THREE.Math.radToDeg(forwardVector.angle());
        HSCore.Util.Content.rotateAroundWorldAxis(
          rotation,
          new THREE.Vector3(0, 0, 1),
          zRotationAngle
        );

        let intensity = DEFAULT_INTENSITY_V3;
        const temperature = DEFAULT_TEMPERATURE_V3;

        if (
          renderOptions.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.REALISTIC ||
          renderOptions.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.GENERAL
        ) {
          intensity = HSConstants.RenderLight.REALISTIC_DECORATE_SPOT_INTENSITY;
        }

        const spotLight: SpotLightConfig = {
          type: HSCore.Model.LightTypeEnum.SpotLight,
          temperature,
          intensity,
          position: lightPosition,
          height: lightHeight,
          ies: HSConstants.RenderLight.SPOT_LIGHT_NUM_4,
          x: 0,
          y: 0,
          z: 0,
          XRotation: rotation.XRotation,
          YRotation: rotation.YRotation,
          ZRotation: rotation.ZRotation,
        };

        spotLights.push(spotLight);
      } else {
        const zRotation = -forwardVector.angle();
        const yRotation = 2 * Math.PI - THREE.Math.degToRad(SPOT_LIGHT_Y_ROTATION_OFFSET);

        const spotLight: SpotLightConfig = {
          type: HSCore.Model.LightTypeEnum.SpotLight,
          temperature: renderOptions.temperature,
          intensity: DEFAULT_INTENSITY_LEGACY,
          position: lightPosition,
          height: lightHeight,
          ies: HSConstants.RenderLight.SPOT_LIGHT_NUM_5,
          x: 0,
          y: 0,
          z: 0,
          XRotation: 0,
          YRotation: yRotation,
          ZRotation: zRotation,
        };

        spotLights.push(spotLight);
      }
    });

    return spotLights;
  }

  _getContents(container: ContentContainer): Content[] {
    const flattenContent = (item: ContentContainer): Content[] => {
      const result: Content[] = [];

      if (item instanceof LightContentGroup) {
        const children = container.getChildren();
        if (children && Array.isArray(children)) {
          const flattened = children.map((child) => flattenContent(child)).flat(2);
          result.push(...flattened);
        }
      } else {
        result.push(item as unknown as Content);
      }

      return result;
    };

    const allContents = flattenContent(container);

    if (allContents.length < 2) {
      return allContents;
    }

    allContents.sort((a, b) => {
      const posA = a.getPosition();
      const posB = b.getPosition();
      return posB.z - posA.z;
    });

    const filtered: Content[] = [allContents.shift()!];

    allContents.forEach((content) => {
      const contentSize = content.getSize().x;
      const contentPos = content.getPosition();
      const contentPos2D = new THREE.Vector2(contentPos.x, contentPos.y);

      const hasOverlap = filtered.find((existing) => {
        const existingSize = existing.getSize().x;
        const { x: existingX, y: existingY } = existing.getPosition();
        const existingPos2D = new THREE.Vector2(existingX, existingY);

        const distance = existingPos2D.sub(contentPos2D).length();
        const combinedRadius = (contentSize + existingSize) / 2;

        return 2 * distance + OVERLAP_TOLERANCE < combinedRadius;
      });

      if (!hasOverlap) {
        filtered.push(content);
      }
    });

    return filtered;
  }
}