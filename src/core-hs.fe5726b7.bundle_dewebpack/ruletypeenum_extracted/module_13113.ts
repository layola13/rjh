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
  distance?: number;
}

interface LightDefaults {
  intensity: number;
  temperature: number;
  ies?: string;
}

export default class CeilingLightComputer extends BaseLight {
  _compute(
    element: any,
    room: any,
    renderOptions: RenderOptions,
    param: any
  ): LightConfig[] {
    if (room.isCeilingFaceHidden()) {
      return [];
    }

    const elementPosition = element.getPosition();
    const adjustedPosition = this._adjustPosition(elementPosition, room, -0.75) || elementPosition;
    const mainPosition: Position = {
      ...elementPosition,
      ...adjustedPosition
    };

    const defaultHeight = this.getDefaultHeight(room);
    const { intensity, temperature, ies }: LightDefaults = super.getDefaultLight(element, room, renderOptions);
    const elementSize: Size = element.getSize();

    // Check safe height constraints for specific templates
    const safeHeightLimit = room.getCeilingHeight() * HSConstants.RenderLight.SAFE_HEIGHT_SCALE;
    if (
      (renderOptions.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.NIGHT && elementSize.z > safeHeightLimit) ||
      (renderOptions.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.CHILLY_3 && elementSize.z > safeHeightLimit)
    ) {
      return [];
    }

    const lights: LightConfig[] = [{
      type: HSCore.Model.LightTypeEnum.SpotLight,
      temperature,
      intensity,
      position: mainPosition,
      height: defaultHeight,
      ies
    }];

    const maxDimension = Math.max(elementSize.x, elementSize.y);
    if (maxDimension > 1.5) {
      let direction: THREE.Vector2 | undefined;
      let halfDistance = maxDimension / 2;

      const rotation = element.getRotation();
      const rotationRadians = Math.abs(rotation % 180) > 2 ? THREE.Math.degToRad(rotation) : undefined;

      // Handle grouped light elements with similar dimensions
      if (Math.abs(elementSize.x - elementSize.y) < 0.4 && element instanceof LightContentGroup) {
        const elementOutline = element.getOutline();
        const childOutline = element.getChildren()[0].getOutline();
        const elementBounds = new THREE.Box2();
        const childBounds = new THREE.Box2();

        if (rotationRadians) {
          let rotatedElementPoints = elementOutline.map(point =>
            new THREE.Vector2(point.x, point.y).rotateAround(elementPosition, rotationRadians)
          );
          elementBounds.setFromPoints(rotatedElementPoints);

          let rotatedChildPoints = childOutline.map(point =>
            new THREE.Vector2(point.x, point.y).rotateAround(elementPosition, rotationRadians)
          );
          childBounds.setFromPoints(rotatedChildPoints);
        } else {
          elementBounds.setFromPoints(elementOutline);
          childBounds.setFromPoints(childOutline);
        }

        const elementBoundsSize = elementBounds.getSize(new THREE.Vector2());
        const childBoundsSize = childBounds.getSize(new THREE.Vector2());

        if (elementBoundsSize.x > childBoundsSize.x + 0.2 && elementBoundsSize.y > childBoundsSize.y + 0.2) {
          if (elementBoundsSize.x > elementBoundsSize.y) {
            direction = new THREE.Vector2(1, 0);
            halfDistance = elementSize.x / 2;
          } else {
            direction = new THREE.Vector2(0, 1);
            halfDistance = elementSize.y / 2;
          }
        } else if (elementBoundsSize.x > childBoundsSize.x + 0.2) {
          direction = new THREE.Vector2(1, 0);
          halfDistance = elementSize.x / 2;
        } else {
          direction = new THREE.Vector2(0, 1);
          halfDistance = elementSize.y / 2;
        }
      } else {
        direction = elementSize.x > elementSize.y ? new THREE.Vector2(1, 0) : new THREE.Vector2(0, 1);
      }

      if (rotationRadians && direction) {
        direction.rotateAround(new THREE.Vector2(0, 0), -rotationRadians);
      }

      const centerPoint = new THREE.Vector2(elementPosition.x, elementPosition.y);
      const { distance: distanceToEdge }: ClosestEdgeResult = this.getClosestEdge(room, centerPoint, direction);

      if (distanceToEdge !== undefined && distanceToEdge < 0.5 + halfDistance) {
        halfDistance = distanceToEdge - 0.5;
      }

      // First additional light position
      const firstLightPoint = centerPoint.clone().add(direction!.clone().multiplyScalar(halfDistance));
      let firstAdjusted = this._adjustPosition(firstLightPoint, room, 0.75) || firstLightPoint;
      const firstLightPosition: Position = {
        ...elementPosition,
        ...firstAdjusted
      };

      // Second additional light position
      const secondLightPoint = centerPoint.clone().sub(direction!.clone().multiplyScalar(halfDistance));
      let secondAdjusted = this._adjustPosition(secondLightPoint, room, 0.75) || secondLightPoint;
      const secondLightPosition: Position = {
        ...elementPosition,
        ...secondAdjusted
      };

      const firstAdditionalLight: LightConfig = {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: firstLightPosition,
        height: defaultHeight,
        ies
      };

      const secondAdditionalLight: LightConfig = {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: secondLightPosition,
        height: defaultHeight,
        ies
      };

      lights.push(firstAdditionalLight);
      lights.push(secondAdditionalLight);
    }

    return lights;
  }
}