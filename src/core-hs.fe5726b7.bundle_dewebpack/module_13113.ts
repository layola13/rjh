import BaseLight from './BaseLight';
import { LightContentGroup } from './LightContentGroup';
import * as THREE from 'three';

interface Position {
  x: number;
  y: number;
  z: number;
}

interface Size {
  x: number;
  y: number;
  z: number;
}

interface LightConfig {
  type: HSCore.Model.LightTypeEnum;
  temperature: number;
  intensity: number;
  position: Position;
  height: number;
  ies?: string;
}

interface RenderOptions {
  templateKey: string;
}

interface ClosestEdgeResult {
  distance: number;
}

export default class CeilingLightComputer extends BaseLight {
  _compute(
    element: any,
    room: any,
    renderOptions: RenderOptions,
    context: any
  ): LightConfig[] {
    if (room.isCeilingFaceHidden()) {
      return [];
    }

    const position = element.getPosition();
    const adjustedPosition = this._adjustPosition(position, room, -0.75) || position;
    const lightPosition = { ...position, ...adjustedPosition };
    const height = this.getDefaultHeight(room);
    const { intensity, temperature, ies } = super.getDefaultLight(element, room, renderOptions);
    const size = element.getSize();

    const ceilingHeight = room.getCeilingHeight();
    const safeHeightThreshold = ceilingHeight * HSConstants.RenderLight.SAFE_HEIGHT_SCALE;

    if (
      (renderOptions.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.NIGHT ||
        renderOptions.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.CHILLY_3) &&
      size.z > safeHeightThreshold
    ) {
      return [];
    }

    const lights: LightConfig[] = [
      {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: lightPosition,
        height,
        ies,
      },
    ];

    const maxDimension = Math.max(size.x, size.y);
    const dimensionThreshold = 1.5;

    if (maxDimension > dimensionThreshold) {
      let direction: THREE.Vector2 | undefined;
      let offset = maxDimension / 2;
      const rotation = element.getRotation();
      const rotationThreshold = 2;
      const rotationRadians = Math.abs(rotation % 180) > rotationThreshold 
        ? THREE.Math.degToRad(rotation) 
        : undefined;

      const dimensionDifference = Math.abs(size.x - size.y);
      const dimensionDifferenceThreshold = 0.4;

      if (dimensionDifference < dimensionDifferenceThreshold && element instanceof LightContentGroup) {
        const outline = element.getOutline();
        const childOutline = element.getChildren()[0].getOutline();
        const outerBounds = new THREE.Box2();
        const innerBounds = new THREE.Box2();

        if (rotationRadians) {
          const rotatedOuterPoints = outline.map(
            point => new THREE.Vector2(point.x, point.y).rotateAround(position, rotationRadians)
          );
          outerBounds.setFromPoints(rotatedOuterPoints);

          const rotatedInnerPoints = childOutline.map(
            point => new THREE.Vector2(point.x, point.y).rotateAround(position, rotationRadians)
          );
          innerBounds.setFromPoints(rotatedInnerPoints);
        } else {
          outerBounds.setFromPoints(outline);
          innerBounds.setFromPoints(childOutline);
        }

        const outerSize = outerBounds.getSize();
        const innerSize = innerBounds.getSize();
        const paddingThreshold = 0.2;
        const halfPadding = 0.5;

        if (outerSize.x > innerSize.x + paddingThreshold && outerSize.y > innerSize.y + paddingThreshold) {
          if (outerSize.x > outerSize.y) {
            direction = new THREE.Vector2(1, 0);
            offset = size.x / 2;
          } else {
            direction = new THREE.Vector2(0, 1);
            offset = size.y / 2;
          }
        } else if (outerSize.x > innerSize.x + paddingThreshold) {
          direction = new THREE.Vector2(1, 0);
          offset = size.x / 2;
        } else {
          direction = new THREE.Vector2(0, 1);
          offset = size.y / 2;
        }
      } else {
        direction = size.x > size.y ? new THREE.Vector2(1, 0) : new THREE.Vector2(0, 1);
      }

      if (rotationRadians && direction) {
        direction.rotateAround(new THREE.Vector2(0, 0), -rotationRadians);
      }

      const position2D = new THREE.Vector2(position.x, position.y);
      const { distance } = this.getClosestEdge(room, position2D, direction);
      const minEdgeDistance = 0.5;

      if (distance !== undefined && distance < minEdgeDistance + offset) {
        offset = distance - minEdgeDistance;
      }

      const positiveOffsetPoint = position2D.clone().add(direction!.clone().multiplyScalar(offset));
      let adjustedPositivePosition = this._adjustPosition(positiveOffsetPoint, room, 0.75) || positiveOffsetPoint;
      const positiveLightPosition = { ...position, ...adjustedPositivePosition };

      const negativeOffsetPoint = position2D.clone().sub(direction!.clone().multiplyScalar(offset));
      const adjustedNegativePosition = this._adjustPosition(negativeOffsetPoint, room, 0.75) || negativeOffsetPoint;
      const negativeLightPosition = { ...position, ...adjustedNegativePosition };

      const positiveLightConfig: LightConfig = {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: positiveLightPosition,
        height,
        ies,
      };

      const negativeLightConfig: LightConfig = {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: negativeLightPosition,
        height,
        ies,
      };

      lights.push(positiveLightConfig);
      lights.push(negativeLightConfig);
    }

    return lights;
  }
}