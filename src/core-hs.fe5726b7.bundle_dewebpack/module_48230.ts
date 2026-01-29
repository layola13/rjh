import BaseClass from './module_42288';

interface LightConfig {
  type: HSCore.Model.LightTypeEnum.SpotLight;
  temperature: number;
  intensity: number;
  position: THREE.Vector2;
  height: number;
  ies: string | null;
}

interface Size {
  x: number;
  y: number;
}

interface Position {
  x: number;
  y: number;
}

interface EdgeResult {
  closestEdge: unknown;
  distance: number;
}

interface RenderOptions {
  templateKey: string;
}

interface SpaceElement {
  getPosition(): Position;
  frontForwardVec: THREE.Vector2;
  getSize(): Size;
}

interface SpaceModel {
  isCeilingFaceHidden(): boolean;
}

const MINIMUM_LARGE_DIMENSION = 1.5;
const EDGE_OFFSET_DEFAULT = 0.6;
const EDGE_OFFSET_REALISTIC = 0.9;
const WALL_CLEARANCE = 0.65;

const CATEGORY_SPECIAL_LAYOUT = '4909c460-b0f0-4cd1-af59-4898c310f3f5';
const CATEGORY_TRIPLE_LIGHT = '41ac92b5-5f88-46d0-a59a-e1ed31739154';

export default class LightingComputer extends BaseClass {
  /**
   * Computes lighting configuration for a space element
   */
  _compute(
    element: SpaceElement,
    spaceModel: SpaceModel,
    renderOptions: RenderOptions,
    additionalParam: unknown
  ): LightConfig[] {
    if (spaceModel.isCeilingFaceHidden()) {
      return [];
    }

    const position = element.getPosition();
    const defaultHeight = this.getDefaultHeight(spaceModel);
    const lights: LightConfig[] = [];
    const forwardVector = element.frontForwardVec;
    const rightVector = forwardVector.clone().rotateAround(
      { x: 0, y: 0 },
      THREE.Math.degToRad(90)
    );
    const size = element.getSize();
    const { intensity, temperature, ies } = super.getDefaultLight(
      element,
      spaceModel,
      renderOptions
    );

    const isRealisticOrGeneral =
      renderOptions.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.REALISTIC ||
      renderOptions.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.GENERAL;

    if (this._isInCategory([CATEGORY_SPECIAL_LAYOUT], element)) {
      this._computeSpecialLayoutLights(
        position,
        size,
        forwardVector,
        rightVector,
        spaceModel,
        renderOptions,
        isRealisticOrGeneral,
        lights,
        defaultHeight,
        intensity,
        temperature,
        ies
      );
    } else if (
      this._isInCategory([CATEGORY_TRIPLE_LIGHT], element) ||
      (size.x >= MINIMUM_LARGE_DIMENSION && size.y >= MINIMUM_LARGE_DIMENSION)
    ) {
      this._computeTripleLights(
        position,
        size,
        forwardVector,
        rightVector,
        isRealisticOrGeneral,
        lights,
        defaultHeight,
        intensity,
        temperature,
        ies
      );
    } else if (size.x >= MINIMUM_LARGE_DIMENSION || size.y >= MINIMUM_LARGE_DIMENSION) {
      this._computeDualLights(
        position,
        size,
        forwardVector,
        rightVector,
        isRealisticOrGeneral,
        lights,
        defaultHeight,
        intensity,
        temperature,
        ies
      );
    } else {
      lights.push({
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position,
        height: defaultHeight,
        ies
      });
    }

    return lights;
  }

  private _computeSpecialLayoutLights(
    position: Position,
    size: Size,
    forwardVector: THREE.Vector2,
    rightVector: THREE.Vector2,
    spaceModel: SpaceModel,
    renderOptions: RenderOptions,
    isRealisticOrGeneral: boolean,
    lights: LightConfig[],
    defaultHeight: number,
    intensity: number,
    temperature: number,
    ies: string | null
  ): void {
    const center = new THREE.Vector2(position.x, position.y);
    let rightPosition = center.clone().add(rightVector.clone().multiplyScalar(size.x / 2));
    let leftPosition = center.clone().sub(rightVector.clone().multiplyScalar(size.x / 2));
    const frontPosition = center.clone().add(forwardVector.clone().multiplyScalar(size.y / 2));

    const rightEdge = this.getClosestEdge(spaceModel, rightPosition, rightVector);
    if (rightEdge.closestEdge && rightEdge.distance < EDGE_OFFSET_DEFAULT) {
      const adjustment = WALL_CLEARANCE - rightEdge.distance;
      rightPosition = rightPosition.sub(rightVector.clone().multiplyScalar(adjustment));
    }
    if (isRealisticOrGeneral && rightEdge.closestEdge && rightEdge.distance < EDGE_OFFSET_REALISTIC) {
      const adjustment = WALL_CLEARANCE - rightEdge.distance;
      rightPosition = rightPosition.sub(rightVector.clone().multiplyScalar(adjustment));
    }

    const leftEdge = this.getClosestEdge(spaceModel, leftPosition, rightVector);
    if (leftEdge.closestEdge && leftEdge.distance < EDGE_OFFSET_DEFAULT) {
      const adjustment = WALL_CLEARANCE - leftEdge.distance;
      leftPosition = leftPosition.add(rightVector.clone().multiplyScalar(adjustment));
    }
    if (isRealisticOrGeneral && leftEdge.closestEdge && leftEdge.distance < EDGE_OFFSET_REALISTIC) {
      const adjustment = WALL_CLEARANCE - leftEdge.distance;
      leftPosition = leftPosition.add(rightVector.clone().multiplyScalar(adjustment));
    }

    [rightPosition, leftPosition, frontPosition].forEach((pos) => {
      lights.push({
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: pos,
        height: defaultHeight,
        ies
      });
    });
  }

  private _computeTripleLights(
    position: Position,
    size: Size,
    forwardVector: THREE.Vector2,
    rightVector: THREE.Vector2,
    isRealisticOrGeneral: boolean,
    lights: LightConfig[],
    defaultHeight: number,
    intensity: number,
    temperature: number,
    ies: string | null
  ): void {
    const center = new THREE.Vector2(position.x, position.y);
    const offset = isRealisticOrGeneral ? EDGE_OFFSET_REALISTIC : EDGE_OFFSET_DEFAULT;
    let backPosition = center.clone().sub(forwardVector.clone().multiplyScalar(size.y / 2 - offset));

    const rightQuarterPosition = backPosition.clone().add(rightVector.clone().multiplyScalar(size.x / 4));
    const leftQuarterPosition = backPosition.clone().sub(rightVector.clone().multiplyScalar(size.x / 4));
    const frontPosition = center.clone().add(forwardVector.clone().multiplyScalar(size.y / 2));

    [rightQuarterPosition, leftQuarterPosition, frontPosition].forEach((pos) => {
      lights.push({
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: pos,
        height: defaultHeight,
        ies
      });
    });
  }

  private _computeDualLights(
    position: Position,
    size: Size,
    forwardVector: THREE.Vector2,
    rightVector: THREE.Vector2,
    isRealisticOrGeneral: boolean,
    lights: LightConfig[],
    defaultHeight: number,
    intensity: number,
    temperature: number,
    ies: string | null
  ): void {
    const center = new THREE.Vector2(position.x, position.y);
    const offset = isRealisticOrGeneral ? EDGE_OFFSET_REALISTIC : EDGE_OFFSET_DEFAULT;
    let primaryPosition: THREE.Vector2;
    let secondaryPosition: THREE.Vector2;

    if (size.x - size.y > 0.4) {
      primaryPosition = center.clone().add(rightVector.clone().multiplyScalar(size.x / 2 - offset));
      secondaryPosition = center.clone().sub(rightVector.clone().multiplyScalar(size.x / 2));
    } else {
      primaryPosition = center.clone().sub(forwardVector.clone().multiplyScalar(size.y / 2 - offset));
      secondaryPosition = center.clone().add(forwardVector.clone().multiplyScalar(size.y / 2));
    }

    lights.push(
      {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: primaryPosition,
        height: defaultHeight,
        ies
      },
      {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: secondaryPosition,
        height: defaultHeight,
        ies
      }
    );
  }
}