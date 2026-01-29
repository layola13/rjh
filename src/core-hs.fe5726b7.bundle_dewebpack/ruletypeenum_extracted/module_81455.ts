import BaseLight from './BaseLight';

interface Position {
  x: number;
  y: number;
  z?: number;
}

interface Size {
  x: number;
  y: number;
}

interface LightConfig {
  intensity: number;
  temperature: number;
  ies: string | null;
}

interface SpotLightResult {
  type: HSCore.Model.LightTypeEnum.SpotLight;
  temperature: number;
  intensity: number;
  position: Position;
  height: number;
  ies: string | null;
}

interface Element {
  getPosition(): Position;
  getSize(): Size;
  getRotation(): number;
}

interface Target {
  isCeilingFaceHidden(): boolean;
}

class CeilingLightComputer extends BaseLight {
  /**
   * Computes ceiling light positions based on element dimensions and rotation
   */
  _compute(
    element: Element,
    target: Target,
    option1: unknown,
    option2: unknown
  ): SpotLightResult[] {
    if (target.isCeilingFaceHidden()) {
      return [];
    }

    const position = element.getPosition();
    const defaultHeight = this.getDefaultHeight(target);
    const size = element.getSize();
    const maxDimension = Math.max(size.x, size.y);
    const rotation = element.getRotation();

    const { intensity, temperature, ies } = super.getDefaultLight(
      element,
      target,
      option1
    );

    const lights: SpotLightResult[] = [
      {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position,
        height: defaultHeight,
        ies,
      },
    ];

    const MEDIUM_SIZE_THRESHOLD = 2;
    const LARGE_SIZE_THRESHOLD = 3.8;
    const EDGE_OFFSET_SMALL = 0.35;
    const EDGE_OFFSET_LARGE = 0.7;
    const ADJUSTMENT_OFFSET = -0.75;
    const ROTATION_THRESHOLD = 5;

    // Add two additional lights for medium-sized elements
    if (maxDimension >= MEDIUM_SIZE_THRESHOLD) {
      let directionVector: THREE.Vector2;
      let offsetDistance = maxDimension / 2 - EDGE_OFFSET_SMALL;

      if (maxDimension > LARGE_SIZE_THRESHOLD) {
        offsetDistance = (maxDimension - EDGE_OFFSET_LARGE) / 4;
      }

      directionVector =
        size.x > size.y
          ? new THREE.Vector2(1, 0)
          : new THREE.Vector2(0, 1);

      if (Math.abs(rotation % 180) > ROTATION_THRESHOLD) {
        directionVector.rotateAround(
          new THREE.Vector2(0, 0),
          (Math.PI * (rotation % 180)) / 180
        );
      }

      const centerPoint = new THREE.Vector2(position.x, position.y);
      const firstOffset = centerPoint
        .clone()
        .add(directionVector.clone().multiplyScalar(offsetDistance));

      let adjustedFirstPosition =
        this._adjustPosition(firstOffset, target, ADJUSTMENT_OFFSET) ?? firstOffset;
      const firstLightPosition: Position = { ...position, ...adjustedFirstPosition };

      const secondOffset = centerPoint
        .clone()
        .sub(directionVector.clone().multiplyScalar(offsetDistance));

      let adjustedSecondPosition =
        this._adjustPosition(secondOffset, target, ADJUSTMENT_OFFSET) ?? secondOffset;
      const secondLightPosition: Position = { ...position, ...adjustedSecondPosition };

      const firstAdditionalLight: SpotLightResult = {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: firstLightPosition,
        height: defaultHeight,
        ies,
      };

      const secondAdditionalLight: SpotLightResult = {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: secondLightPosition,
        height: defaultHeight,
        ies,
      };

      lights.push(firstAdditionalLight, secondAdditionalLight);
    }

    // Add two more lights for large elements
    if (maxDimension > LARGE_SIZE_THRESHOLD) {
      let directionVector: THREE.Vector2;
      const farOffsetDistance = (maxDimension - EDGE_OFFSET_LARGE) / 2;

      directionVector =
        size.x > size.y
          ? new THREE.Vector2(1, 0)
          : new THREE.Vector2(0, 1);

      if (Math.abs(rotation % 180) > ROTATION_THRESHOLD) {
        directionVector.rotateAround(
          new THREE.Vector2(0, 0),
          (Math.PI * (rotation % 180)) / 180
        );
      }

      const centerPoint = new THREE.Vector2(position.x, position.y);
      const firstFarOffset = centerPoint
        .clone()
        .add(directionVector.clone().multiplyScalar(farOffsetDistance));

      let adjustedFirstFarPosition =
        this._adjustPosition(firstFarOffset, target, ADJUSTMENT_OFFSET) ?? firstFarOffset;
      const firstFarLightPosition: Position = { ...position, ...adjustedFirstFarPosition };

      const secondFarOffset = centerPoint
        .clone()
        .sub(directionVector.clone().multiplyScalar(farOffsetDistance));

      let adjustedSecondFarPosition =
        this._adjustPosition(secondFarOffset, target, ADJUSTMENT_OFFSET) ?? secondFarOffset;
      const secondFarLightPosition: Position = { ...position, ...adjustedSecondFarPosition };

      const firstFarLight: SpotLightResult = {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: firstFarLightPosition,
        height: defaultHeight,
        ies,
      };

      const secondFarLight: SpotLightResult = {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: secondFarLightPosition,
        height: defaultHeight,
        ies,
      };

      lights.push(firstFarLight, secondFarLight);
    }

    return lights;
  }

  private _adjustPosition(
    position: THREE.Vector2,
    target: Target,
    offset: number
  ): { x: number; y: number } | null {
    // Implementation needed based on actual business logic
    return null;
  }

  private getDefaultHeight(target: Target): number {
    // Implementation needed based on actual business logic
    return 0;
  }
}

export default CeilingLightComputer;