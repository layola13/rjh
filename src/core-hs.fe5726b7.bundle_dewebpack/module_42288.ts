import { CommonOptions } from './module_22777';

interface Position {
  x: number;
  y: number;
}

interface Size {
  x: number;
  y: number;
  length: number;
  width: number;
}

interface LightResult {
  type: HSCore.Model.LightTypeEnum;
  temperature: number;
  intensity: number;
  position: Position;
  height: number;
  ies: number;
  ruleType?: string;
  sourceContentType?: ContentType;
  size?: Size;
}

interface RuleConfig {
  contentTypes?: string[];
  categories?: string[];
}

interface ContentType {
  isTypeOf(types: string[]): boolean;
}

interface Entity {
  contentType(): ContentType;
  getCategories(): string[];
  getGeometry(): any;
  getPosition(): Position;
  getSize(): Size;
  getOutline(): any;
}

interface Room {
  getCeilingHeight(): number;
  getPhysicalLights(): Entity[];
  getEdges(): Edge[];
}

interface RenderOptions {
  templateKey: string;
}

interface Edge {
  p0: THREE.Vector2;
  p1: THREE.Vector2;
}

interface ClosestEdgeResult {
  closestEdge: Edge | undefined;
  distance: number;
}

export default class LightingRule {
  private _contentTypes: string[] = [];
  private _categories: string[] = [];
  private _priority: number;
  private _config: RuleConfig;
  private _ruleType: string;

  constructor(config: RuleConfig, ruleType: string, priority: number = 10) {
    this._contentTypes = [];
    this._categories = [];
    this._priority = priority;
    this._config = config;
    this._ruleType = ruleType;
    this.init();
  }

  visit(
    entity: Entity | null,
    room: Room,
    renderOptions: RenderOptions,
    context: any
  ): LightResult[] | null {
    if (!this._interested(entity)) {
      return null;
    }

    let results = this._compute(entity, room, renderOptions, context);

    if (!results || !Array.isArray(results) || results.length === 0) {
      return [];
    }

    results = results.filter((result) =>
      this._isValid(result, room, renderOptions)
    );

    results.forEach((result) => {
      result.ruleType = this._ruleType;
    });

    if (entity) {
      const contentType = entity.contentType();
      results.forEach((result) => {
        result.sourceContentType = contentType;
      });
    }

    return results;
  }

  priority(): number {
    return this._priority;
  }

  getRuleType(): string {
    return this._ruleType;
  }

  setContentTypes(contentTypes: string[]): void {
    if (contentTypes && Array.isArray(contentTypes)) {
      this._contentTypes = contentTypes;
    }
  }

  setCategories(categories: string[]): void {
    if (categories && Array.isArray(categories)) {
      this._categories = categories;
    }
  }

  init(): void {
    if (this._config) {
      this.setContentTypes(this._config.contentTypes ?? []);
      this.setCategories(this._config.categories ?? []);
    }
  }

  private _interested(entity: Entity | null): boolean {
    if (!entity) {
      return false;
    }

    const contentType = entity.contentType();
    if (!contentType || !contentType.isTypeOf(this._contentTypes)) {
      return false;
    }

    const categories = entity.getCategories();
    if (
      !this._categories ||
      this._categories.length === 0 ||
      !categories ||
      categories.length === 0
    ) {
      return true;
    }

    return (
      this._categories.find((category) => categories.includes(category)) !==
      undefined
    );
  }

  private _isInCategory(categories: string[], entity: Entity): boolean {
    const entityCategories = entity.getCategories();
    if (!entityCategories || entityCategories.length === 0) {
      return false;
    }

    return (
      categories.find((category) => entityCategories.includes(category)) !==
      undefined
    );
  }

  protected _compute(
    entity: Entity | null,
    room: Room,
    renderOptions: RenderOptions,
    context: any
  ): LightResult[] | null {
    return null;
  }

  protected _adjustPosition(
    position: Position,
    entity: Entity,
    offset: number
  ): Position | null {
    const geometry = entity.getGeometry();
    const offsetPolygon = HSCore.Util.Collision.OffsetPolygon(
      [geometry],
      offset
    )[0];

    if (!offsetPolygon) {
      return null;
    }

    if (
      HSCore.Util.Math.isPointInPolygon(position, offsetPolygon, true, 0.01)
    ) {
      return null;
    }

    const closestPoint = HSCore.Util.Math.closestPointToPolygon(
      position,
      offsetPolygon
    );

    return closestPoint ? { ...position, ...closestPoint } : null;
  }

  private _isValid(
    light: LightResult,
    room: Room,
    renderOptions: RenderOptions
  ): boolean {
    if (renderOptions.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.NIGHT) {
      const physicalLights = room
        .getPhysicalLights()
        .filter(
          (entity) =>
            entity.contentType() &&
            (entity
              .contentType()
              .isTypeOf(
                HSConstants.RenderLight.CELLING_LIGHTING_CONTENT_TYPES
              ) ||
              entity
                .contentType()
                .isTypeOf(HSConstants.RenderLight.DESK_LIGHTING_CONTENT_TYPES))
        );

      if (physicalLights.length === 0) {
        return true;
      }

      let isValid = true;
      const { position } = light;

      if (position) {
        const lightPosition = new THREE.Vector2(position.x, position.y);
        isValid = !physicalLights.some((physicalLight) => {
          const physicalPosition = physicalLight.getPosition();
          const physicalSize = physicalLight.getSize();
          const distance = new THREE.Vector2(
            physicalPosition.x,
            physicalPosition.y
          )
            .sub(lightPosition)
            .length();
          return distance < Math.max(physicalSize.x, physicalSize.y) / 2;
        });
      }

      return isValid;
    }

    if (
      renderOptions.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.REALISTIC ||
      renderOptions.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.GENERAL
    ) {
      const physicalLights = room.getPhysicalLights();

      if (physicalLights.length === 0) {
        return true;
      }

      let isValid = true;
      const { position, height } = light;

      if (position && height) {
        let radius = 0;
        radius =
          light.type === HSCore.Model.LightTypeEnum.FlatLight
            ? Math.max(light.size!.length, light.size!.width) / 2
            : 0.3;

        const lightPosition = new THREE.Vector2(position.x, position.y);
        isValid = !physicalLights.some((physicalLight) => {
          const outline = physicalLight.getOutline();
          const offsetOutlines = HSCore.Util.Collision.OffsetPolygon(
            [outline],
            radius
          );
          return HSCore.Util.Math.isPointInPolygon(
            lightPosition,
            offsetOutlines[0],
            true,
            0.1
          );
        });
      }

      return isValid;
    }

    const physicalLights = room.getPhysicalLights();

    if (physicalLights.length === 0) {
      return true;
    }

    const MIN_DISTANCE = 0.4;
    let isValid = true;
    const { position, height } = light;

    if (position && height) {
      let lightRadius: number;
      let safetyDistance = MIN_DISTANCE / 2;

      lightRadius =
        light.type === HSCore.Model.LightTypeEnum.FlatLight
          ? Math.max(light.size!.length, light.size!.width) / 2
          : 0.3;

      safetyDistance += lightRadius;

      const lightPosition = new THREE.Vector2(position.x, position.y);
      isValid = !physicalLights.some((physicalLight) => {
        const physicalPosition = physicalLight.getPosition();
        const distance = new THREE.Vector2(
          physicalPosition.x,
          physicalPosition.y
        )
          .sub(lightPosition)
          .length();

        if (distance < MIN_DISTANCE) {
          return true;
        }

        const physicalSize = physicalLight.getSize();
        return (
          distance < safetyDistance + Math.max(physicalSize.x, physicalSize.y) / 2
        );
      });
    }

    return isValid;
  }

  protected getDefaultHeight(room: Room): number {
    const ceilingHeight = room.getCeilingHeight();
    return ceilingHeight - CommonOptions.defaultGapToCeiling >
      CommonOptions.defaultHeight
      ? CommonOptions.defaultHeight
      : ceilingHeight - CommonOptions.defaultGapToCeiling;
  }

  protected getDefaultLight(
    entity: Entity,
    room: Room,
    renderOptions: RenderOptions
  ): LightResult {
    const position = entity.getPosition();
    const height = this.getDefaultHeight(room);

    let intensity = 1300;
    let temperature = 6500;
    let iesProfile = HSConstants.RenderLight.SPOT_LIGHT_NUM_5;

    if (renderOptions.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.NATURE_3) {
      intensity = HSConstants.RenderLight.NATURE_3_SPOT_INTENSITY;
      temperature = HSConstants.RenderLight.NATURE_3_SPOT_TEMPERATURE;
      iesProfile = HSConstants.RenderLight.FILL_LIGHT_NUM_2;
    }

    if (renderOptions.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.NIGHT) {
      intensity = HSConstants.RenderLight.NIGHT_SPOT_INTENSITY;
      temperature = HSConstants.RenderLight.NIGHT_SPOT_TEMPERATURE;
      iesProfile = HSConstants.RenderLight.FILL_LIGHT_NUM_1;
    }

    if (renderOptions.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.CHILLY_3) {
      intensity = HSConstants.RenderLight.CHILLY_3_SPOT_INTENSITY;
      temperature = HSConstants.RenderLight.CHILLY_3_SPOT_TEMPERATURE;
      iesProfile = HSConstants.RenderLight.FILL_LIGHT_NUM_2;
    }

    if (
      renderOptions.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.REALISTIC ||
      renderOptions.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.GENERAL
    ) {
      intensity = HSConstants.RenderLight.REALISTIC_SPOT_INTENSITY;
      temperature = HSConstants.RenderLight.REALISTIC_SPOT_TEMPERATURE;
      iesProfile = HSConstants.RenderLight.FILL_LIGHT_NUM_2;
    }

    return {
      type: HSCore.Model.LightTypeEnum.SpotLight,
      temperature,
      intensity,
      position,
      height,
      ies: iesProfile,
    };
  }

  protected getClosestEdge(
    entity: Entity,
    point: THREE.Vector2,
    direction: THREE.Vector2
  ): ClosestEdgeResult {
    const edges = entity.getEdges().filter((edge) => {
      const edgeDirection = edge.p1.clone().sub(edge.p0).normalize();
      return Math.abs(edgeDirection.dot(direction)) < 0.1;
    });

    let closestEdge: Edge | undefined;
    let minDistance = 0;

    edges.forEach((edge) => {
      const distance = HSCore.Util.Math.closestDistanceToSegment(
        point,
        edge.p0,
        edge.p1
      );

      if (minDistance === undefined || distance < minDistance) {
        minDistance = distance;
        closestEdge = edge;
      }
    });

    return {
      closestEdge,
      distance: minDistance,
    };
  }
}