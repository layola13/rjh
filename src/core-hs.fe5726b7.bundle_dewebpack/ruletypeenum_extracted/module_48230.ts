import BaseClass from './module_42288';

interface LightConfig {
  type: HSCore.Model.LightTypeEnum.SpotLight;
  temperature: number;
  intensity: number;
  position: THREE.Vector2;
  height: number;
  ies: string | null;
}

interface RoomEdgeResult {
  closestEdge: any;
  distance: number;
}

interface RenderOptions {
  templateKey: string;
}

interface LightProperties {
  intensity: number;
  temperature: number;
  ies: string | null;
}

interface RoomElement {
  getPosition(): THREE.Vector2;
  getSize(): { x: number; y: number };
  frontForwardVec: THREE.Vector2;
}

interface Room {
  isCeilingFaceHidden(): boolean;
}

const MINIMUM_ROOM_SIZE_FOR_MULTIPLE_LIGHTS = 1.5;
const WALL_DISTANCE_THRESHOLD = 0.6;
const WALL_DISTANCE_THRESHOLD_REALISTIC = 0.9;
const WALL_OFFSET_DISTANCE = 0.65;
const EDGE_OFFSET_DISTANCE = 0.6;
const EDGE_OFFSET_DISTANCE_REALISTIC = 0.9;
const SIZE_DIFFERENCE_THRESHOLD = 0.4;
const ROTATION_ANGLE_DEGREES = 90;

const KITCHEN_CATEGORY_ID = '4909c460-b0f0-4cd1-af59-4898c310f3f5';
const SPECIAL_CATEGORY_ID = '41ac92b5-5f88-46d0-a59a-e1ed31739154';

export default class LightComputeService extends BaseClass {
  /**
   * Computes ceiling light positions for a room element
   * @param element - The room element to compute lights for
   * @param room - The room configuration
   * @param renderOptions - Rendering template options
   * @param additionalParam - Additional parameter (unused)
   * @returns Array of light configurations
   */
  _compute(
    element: RoomElement,
    room: Room,
    renderOptions: RenderOptions,
    additionalParam: unknown
  ): LightConfig[] {
    if (room.isCeilingFaceHidden()) {
      return [];
    }

    const position = element.getPosition();
    const defaultHeight = this.getDefaultHeight(room);
    const lights: LightConfig[] = [];
    const forwardVector = element.frontForwardVec;
    const perpendicularVector = forwardVector
      .clone()
      .rotateAround({ x: 0, y: 0 }, THREE.Math.degToRad(ROTATION_ANGLE_DEGREES));
    const size = element.getSize();
    const { intensity, temperature, ies } = super.getDefaultLight(
      element,
      room,
      renderOptions
    );

    const isRealisticOrGeneralTemplate =
      renderOptions.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.REALISTIC ||
      renderOptions.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.GENERAL;

    if (this._isInCategory([KITCHEN_CATEGORY_ID], element)) {
      this._computeKitchenLights(
        position,
        forwardVector,
        perpendicularVector,
        size,
        room,
        renderOptions,
        defaultHeight,
        intensity,
        temperature,
        ies,
        lights,
        isRealisticOrGeneralTemplate
      );
    } else if (
      this._isInCategory([SPECIAL_CATEGORY_ID], element) ||
      (size.x >= MINIMUM_ROOM_SIZE_FOR_MULTIPLE_LIGHTS &&
        size.y >= MINIMUM_ROOM_SIZE_FOR_MULTIPLE_LIGHTS)
    ) {
      this._computeLargeLights(
        position,
        forwardVector,
        perpendicularVector,
        size,
        renderOptions,
        defaultHeight,
        intensity,
        temperature,
        ies,
        lights,
        isRealisticOrGeneralTemplate
      );
    } else if (
      size.x >= MINIMUM_ROOM_SIZE_FOR_MULTIPLE_LIGHTS ||
      size.y >= MINIMUM_ROOM_SIZE_FOR_MULTIPLE_LIGHTS
    ) {
      this._computeMediumLights(
        position,
        forwardVector,
        perpendicularVector,
        size,
        renderOptions,
        defaultHeight,
        intensity,
        temperature,
        ies,
        lights,
        isRealisticOrGeneralTemplate
      );
    } else {
      lights.push(
        this._createLightConfig(position, defaultHeight, intensity, temperature, ies)
      );
    }

    return lights;
  }

  private _computeKitchenLights(
    position: THREE.Vector2,
    forwardVector: THREE.Vector2,
    perpendicularVector: THREE.Vector2,
    size: { x: number; y: number },
    room: Room,
    renderOptions: RenderOptions,
    defaultHeight: number,
    intensity: number,
    temperature: number,
    ies: string | null,
    lights: LightConfig[],
    isRealisticOrGeneralTemplate: boolean
  ): void {
    const centerPosition = new THREE.Vector2(position.x, position.y);
    let rightPosition = centerPosition
      .clone()
      .add(perpendicularVector.clone().multiplyScalar(size.x / 2));
    let leftPosition = centerPosition
      .clone()
      .sub(perpendicularVector.clone().multiplyScalar(size.x / 2));
    const frontPosition = centerPosition
      .clone()
      .add(forwardVector.clone().multiplyScalar(size.y / 2));

    const rightEdgeResult = this.getClosestEdge(room, rightPosition, perpendicularVector);
    if (rightEdgeResult.closestEdge && rightEdgeResult.distance < WALL_DISTANCE_THRESHOLD) {
      const offset = WALL_OFFSET_DISTANCE - rightEdgeResult.distance;
      rightPosition = rightPosition.sub(perpendicularVector.clone().multiplyScalar(offset));
    }
    if (
      isRealisticOrGeneralTemplate &&
      rightEdgeResult.closestEdge &&
      rightEdgeResult.distance < WALL_DISTANCE_THRESHOLD_REALISTIC
    ) {
      const offset = WALL_OFFSET_DISTANCE - rightEdgeResult.distance;
      rightPosition = rightPosition.sub(perpendicularVector.clone().multiplyScalar(offset));
    }

    const leftEdgeResult = this.getClosestEdge(room, leftPosition, perpendicularVector);
    if (leftEdgeResult.closestEdge && leftEdgeResult.distance < WALL_DISTANCE_THRESHOLD) {
      const offset = WALL_OFFSET_DISTANCE - leftEdgeResult.distance;
      leftPosition = leftPosition.add(perpendicularVector.clone().multiplyScalar(offset));
    }
    if (
      isRealisticOrGeneralTemplate &&
      leftEdgeResult.closestEdge &&
      leftEdgeResult.distance < WALL_DISTANCE_THRESHOLD_REALISTIC
    ) {
      const offset = WALL_OFFSET_DISTANCE - leftEdgeResult.distance;
      leftPosition = leftPosition.add(perpendicularVector.clone().multiplyScalar(offset));
    }

    [rightPosition, leftPosition, frontPosition].forEach((pos) => {
      lights.push(this._createLightConfig(pos, defaultHeight, intensity, temperature, ies));
    });
  }

  private _computeLargeLights(
    position: THREE.Vector2,
    forwardVector: THREE.Vector2,
    perpendicularVector: THREE.Vector2,
    size: { x: number; y: number },
    renderOptions: RenderOptions,
    defaultHeight: number,
    intensity: number,
    temperature: number,
    ies: string | null,
    lights: LightConfig[],
    isRealisticOrGeneralTemplate: boolean
  ): void {
    const centerPosition = new THREE.Vector2(position.x, position.y);
    let backPosition = centerPosition
      .clone()
      .sub(forwardVector.clone().multiplyScalar(size.y / 2 - EDGE_OFFSET_DISTANCE));

    if (isRealisticOrGeneralTemplate) {
      backPosition = centerPosition
        .clone()
        .sub(forwardVector.clone().multiplyScalar(size.y / 2 - EDGE_OFFSET_DISTANCE_REALISTIC));
    }

    const positions = [
      backPosition.clone().add(perpendicularVector.clone().multiplyScalar(size.x / 4)),
      backPosition.clone().sub(perpendicularVector.clone().multiplyScalar(size.x / 4)),
      centerPosition.clone().add(forwardVector.clone().multiplyScalar(size.y / 2)),
    ];

    positions.forEach((pos) => {
      lights.push(this._createLightConfig(pos, defaultHeight, intensity, temperature, ies));
    });
  }

  private _computeMediumLights(
    position: THREE.Vector2,
    forwardVector: THREE.Vector2,
    perpendicularVector: THREE.Vector2,
    size: { x: number; y: number },
    renderOptions: RenderOptions,
    defaultHeight: number,
    intensity: number,
    temperature: number,
    ies: string | null,
    lights: LightConfig[],
    isRealisticOrGeneralTemplate: boolean
  ): void {
    const centerPosition = new THREE.Vector2(position.x, position.y);
    let primaryPosition: THREE.Vector2;
    let secondaryPosition: THREE.Vector2;

    if (size.x - size.y > SIZE_DIFFERENCE_THRESHOLD) {
      primaryPosition = centerPosition
        .clone()
        .add(perpendicularVector.clone().multiplyScalar(size.x / 2 - EDGE_OFFSET_DISTANCE));
      if (isRealisticOrGeneralTemplate) {
        primaryPosition = centerPosition
          .clone()
          .add(
            perpendicularVector.clone().multiplyScalar(size.x / 2 - EDGE_OFFSET_DISTANCE_REALISTIC)
          );
      }
      secondaryPosition = centerPosition
        .clone()
        .sub(perpendicularVector.clone().multiplyScalar(size.x / 2));
    } else {
      primaryPosition = centerPosition
        .clone()
        .sub(forwardVector.clone().multiplyScalar(size.y / 2 - EDGE_OFFSET_DISTANCE));
      if (isRealisticOrGeneralTemplate) {
        primaryPosition = centerPosition
          .clone()
          .sub(forwardVector.clone().multiplyScalar(size.y / 2 - EDGE_OFFSET_DISTANCE_REALISTIC));
      }
      secondaryPosition = centerPosition
        .clone()
        .add(forwardVector.clone().multiplyScalar(size.y / 2));
    }

    lights.push(
      this._createLightConfig(primaryPosition, defaultHeight, intensity, temperature, ies),
      this._createLightConfig(secondaryPosition, defaultHeight, intensity, temperature, ies)
    );
  }

  private _createLightConfig(
    position: THREE.Vector2,
    height: number,
    intensity: number,
    temperature: number,
    ies: string | null
  ): LightConfig {
    return {
      type: HSCore.Model.LightTypeEnum.SpotLight,
      temperature,
      intensity,
      position,
      height,
      ies,
    };
  }
}