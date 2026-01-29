import BaseLight from './BaseLight';
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

interface SpotLightConfig {
  type: HSCore.Model.LightTypeEnum.SpotLight;
  temperature: number;
  intensity: number;
  position: THREE.Vector2;
  height: number;
  ies: string;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
}

interface LightContent {
  getPosition(): Position;
  getSize(): Size;
  getHost(): HSCore.Model.Wall | null | undefined;
  frontForwardVec: THREE.Vector2;
}

interface RoomModel {
  isCeilingFaceHidden(): boolean;
  getCeilingHeight(): number;
}

interface RenderOptions {
  templateKey: string;
  temperature: number;
}

interface ContentNode {
  getChildren(): ContentNode[] | undefined;
  getPosition(): Position;
  getSize(): Size;
  getHost(): HSCore.Model.Wall | null | undefined;
  frontForwardVec: THREE.Vector2;
}

const DEFAULT_CEILING_GAP = 0.5;
const FORWARD_OFFSET = 0.3;
const OVERLAP_TOLERANCE = 0.2;
const CEILING_HEIGHT_THRESHOLD_RATIO = 2 / 3;
const DEFAULT_V3_INTENSITY = 1500;
const REALISTIC_INTENSITY = HSConstants.RenderLight.REALISTIC_DECORATE_SPOT_INTENSITY;
const V3_TEMPERATURE = 5500;
const LEGACY_INTENSITY = 1300;
const LEGACY_Y_ROTATION_OFFSET = 10;

export default class SpotLightComputer extends BaseLight {
  /**
   * Computes spot light configurations for content items in a room
   */
  _compute(
    content: ContentNode,
    room: RoomModel,
    renderOptions: RenderOptions,
    _unused: unknown
  ): SpotLightConfig[] {
    if (room.isCeilingFaceHidden()) {
      return [];
    }

    const contents = this._getContents(content);
    const lights: SpotLightConfig[] = [];

    contents.forEach((item) => {
      const position = item.getPosition();
      const forwardVector = item.frontForwardVec;
      const size = item.getSize();
      const host = item.getHost();

      if (host && host instanceof HSCore.Model.Wall) {
        const wallStart: Point2D = { x: host.from.x, y: host.from.y };
        const wallEnd: Point2D = { x: host.to.x, y: host.to.y };
        const perpendicular = HSCore.Util.Math.getPerpendicularIntersect(
          position,
          wallStart,
          wallEnd
        );
        const offset = new THREE.Vector2(
          position.x - perpendicular.x,
          position.y - perpendicular.y
        );

        if (offset.dot(forwardVector) < 0) {
          forwardVector.negate();
        }
      }

      let lightHeight = position.z + size.z + DEFAULT_CEILING_GAP;
      const ceilingHeight = room.getCeilingHeight();
      const maxHeight = ceilingHeight - CommonOptions.defaultGapToCeiling;

      if (lightHeight > maxHeight) {
        lightHeight = maxHeight;
      }

      const lightPosition = new THREE.Vector2(position.x, position.y);
      lightPosition.add(forwardVector.clone().multiplyScalar(FORWARD_OFFSET));

      if (isTemplateV3(renderOptions.templateKey)) {
        const itemCenterHeight = position.z + size.z / 2;
        const heightThreshold = (ceilingHeight * CEILING_HEIGHT_THRESHOLD_RATIO);

        if (itemCenterHeight < heightThreshold) {
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

        const xAngleDegrees = THREE.Math.radToDeg(
          Math.atan(FORWARD_OFFSET / (lightHeight - itemCenterHeight))
        );
        HSCore.Util.Content.rotateAroundWorldAxis(
          rotation,
          new THREE.Vector3(1, 0, 0),
          xAngleDegrees
        );

        const zAngleDegrees = 90 - THREE.Math.radToDeg(forwardVector.angle());
        HSCore.Util.Content.rotateAroundWorldAxis(
          rotation,
          new THREE.Vector3(0, 0, 1),
          zAngleDegrees
        );

        let intensity = DEFAULT_V3_INTENSITY;
        const temperature = V3_TEMPERATURE;

        if (
          renderOptions.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.REALISTIC ||
          renderOptions.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.GENERAL
        ) {
          intensity = REALISTIC_INTENSITY;
        }

        const lightConfig: SpotLightConfig = {
          type: HSCore.Model.LightTypeEnum.SpotLight,
          temperature,
          intensity,
          position: lightPosition,
          height: lightHeight,
          ies: HSConstants.RenderLight.SPOT_LIGHT_NUM_4,
          XRotation: rotation.XRotation,
          YRotation: rotation.YRotation,
          ZRotation: rotation.ZRotation,
        };

        lights.push(lightConfig);
      } else {
        const zRotation = -forwardVector.angle();
        const yRotation = 2 * Math.PI - THREE.Math.degToRad(LEGACY_Y_ROTATION_OFFSET);

        const lightConfig: SpotLightConfig = {
          type: HSCore.Model.LightTypeEnum.SpotLight,
          temperature: renderOptions.temperature,
          intensity: LEGACY_INTENSITY,
          position: lightPosition,
          height: lightHeight,
          ies: HSConstants.RenderLight.SPOT_LIGHT_NUM_5,
          XRotation: 0,
          YRotation: yRotation,
          ZRotation: zRotation,
        };

        lights.push(lightConfig);
      }
    });

    return lights;
  }

  /**
   * Flattens content hierarchy and filters overlapping items
   */
  _getContents(content: ContentNode): LightContent[] {
    const flattenContent = (node: ContentNode): LightContent[] => {
      const result: LightContent[] = [];

      if (node instanceof LightContentGroup) {
        const children = node.getChildren();
        if (children && Array.isArray(children)) {
          const flattened = children.map((child) => flattenContent(child)).flat(2);
          result.push(...flattened);
        }
      } else {
        result.push(node as LightContent);
      }

      return result;
    };

    const allContents = flattenContent(content);

    if (allContents.length < 2) {
      return allContents;
    }

    allContents.sort((a, b) => {
      const posA = a.getPosition();
      const posB = b.getPosition();
      return posB.z - posA.z;
    });

    const filteredContents: LightContent[] = [allContents.shift()!];

    allContents.forEach((item) => {
      const itemSize = item.getSize().x;
      const itemPos = item.getPosition();
      const itemPos2D = new THREE.Vector2(itemPos.x, itemPos.y);

      const hasOverlap = filteredContents.find((existing) => {
        const existingSize = existing.getSize().x;
        const existingPos = existing.getPosition();
        const existingPos2D = new THREE.Vector2(existingPos.x, existingPos.y);
        const distance = existingPos2D.sub(itemPos2D).length();

        return 2 * distance + OVERLAP_TOLERANCE < itemSize + existingSize;
      });

      if (!hasOverlap) {
        filteredContents.push(item);
      }
    });

    return filteredContents;
  }
}