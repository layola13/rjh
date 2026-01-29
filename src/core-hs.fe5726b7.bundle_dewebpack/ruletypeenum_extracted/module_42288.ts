import { CommonOptions } from './common-options';

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
  sourceContentType?: any;
  size?: Size;
}

interface Edge {
  p0: THREE.Vector2;
  p1: THREE.Vector2;
}

interface ClosestEdgeResult {
  closestEdge: Edge | undefined;
  distance: number;
}

interface RuleConfig {
  contentTypes?: string[];
  categories?: string[];
}

interface RenderOptions {
  templateKey: string;
}

interface ContentType {
  isTypeOf(types: string[]): boolean;
}

interface SceneElement {
  contentType(): ContentType | null;
  getCategories(): string[];
  getGeometry(): THREE.Vector2[];
  getPosition(): Position;
  getSize(): Size;
  getOutline(): THREE.Vector2[];
}

interface Room {
  getCeilingHeight(): number;
  getPhysicalLights(): SceneElement[];
  getEdges(): Edge[];
}

export default class RuleVisitor {
  private _contentTypes: string[];
  private _categories: string[];
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
    element: SceneElement | null,
    room: Room,
    renderOptions: RenderOptions,
    context: any
  ): LightResult[] | null {
    if (!this._interested(element)) {
      return null;
    }

    let results = this._compute(element, room, renderOptions, context);
    
    if (!results || !Array.isArray(results) || results.length === 0) {
      return [];
    }

    results = results.filter(result => this._isValid(result, room, renderOptions));
    
    results.forEach(result => {
      result.ruleType = this._ruleType;
    });

    if (element) {
      const contentType = element.contentType();
      results.forEach(result => {
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

  private _interested(element: SceneElement | null): boolean {
    if (!element) {
      return false;
    }

    const contentType = element.contentType();
    if (!contentType || !contentType.isTypeOf(this._contentTypes)) {
      return false;
    }

    const categories = element.getCategories();
    
    if (!this._categories || this._categories.length === 0 || !categories || categories.length === 0) {
      return true;
    }

    return this._categories.find(category => categories.includes(category)) !== undefined;
  }

  protected _isInCategory(categories: string[], element: SceneElement): boolean {
    const elementCategories = element.getCategories();
    
    if (!elementCategories || elementCategories.length === 0) {
      return false;
    }

    return categories.find(category => elementCategories.includes(category)) !== undefined;
  }

  protected _compute(
    element: SceneElement | null,
    room: Room,
    renderOptions: RenderOptions,
    context: any
  ): LightResult[] | null {
    return null;
  }

  protected _adjustPosition(
    position: Position,
    element: SceneElement,
    offset: number
  ): Position | null {
    const geometry = element.getGeometry();
    const offsetPolygon = HSCore.Util.Collision.OffsetPolygon([geometry], offset)[0];

    if (!offsetPolygon) {
      return null;
    }

    if (HSCore.Util.Math.isPointInPolygon(position, offsetPolygon, true, 0.01)) {
      return null;
    }

    const closestPoint = HSCore.Util.Math.closestPointToPolygon(position, offsetPolygon);
    
    return closestPoint ? { ...position, ...closestPoint } : null;
  }

  private _isValid(light: LightResult, room: Room, renderOptions: RenderOptions): boolean {
    if (renderOptions.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.NIGHT) {
      const physicalLights = room.getPhysicalLights().filter(light => {
        const contentType = light.contentType();
        return contentType && (
          contentType.isTypeOf(HSConstants.RenderLight.CELLING_LIGHTING_CONTENT_TYPES) ||
          contentType.isTypeOf(HSConstants.RenderLight.DESK_LIGHTING_CONTENT_TYPES)
        );
      });

      if (physicalLights.length === 0) {
        return true;
      }

      let isValid = true;
      const { position } = light;

      if (position) {
        const lightPosition = new THREE.Vector2(position.x, position.y);
        isValid = !physicalLights.some(physicalLight => {
          const physicalPosition = physicalLight.getPosition();
          const physicalSize = physicalLight.getSize();
          const distance = new THREE.Vector2(physicalPosition.x, physicalPosition.y)
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
        let buffer = 0;
        buffer = light.type === HSCore.Model.LightTypeEnum.FlatLight
          ? Math.max(light.size!.length, light.size!.width) / 2
          : 0.3;

        const lightPosition = new THREE.Vector2(position.x, position.y);
        isValid = !physicalLights.some(physicalLight => {
          const outline = physicalLight.getOutline();
          const offsetOutline = HSCore.Util.Collision.OffsetPolygon([outline], buffer);
          return HSCore.Util.Math.isPointInPolygon(lightPosition, offsetOutline[0], true, 0.1);
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
      let additionalBuffer = MIN_DISTANCE / 2;
      const lightBuffer = light.type === HSCore.Model.LightTypeEnum.FlatLight
        ? Math.max(light.size!.length, light.size!.width) / 2
        : 0.3;
      
      additionalBuffer += lightBuffer;

      const lightPosition = new THREE.Vector2(position.x, position.y);
      isValid = !physicalLights.some(physicalLight => {
        const physicalPosition = physicalLight.getPosition();
        const distance = new THREE.Vector2(physicalPosition.x, physicalPosition.y)
          .sub(lightPosition)
          .length();

        if (distance < MIN_DISTANCE) {
          return true;
        }

        const physicalSize = physicalLight.getSize();
        return distance < additionalBuffer + Math.max(physicalSize.x, physicalSize.y) / 2;
      });
    }

    return isValid;
  }

  protected getDefaultHeight(room: Room): number {
    const ceilingHeight = room.getCeilingHeight();
    const availableHeight = ceilingHeight - CommonOptions.defaultGapToCeiling;
    
    return availableHeight > CommonOptions.defaultHeight
      ? CommonOptions.defaultHeight
      : availableHeight;
  }

  protected getDefaultLight(
    element: SceneElement,
    room: Room,
    renderOptions: RenderOptions
  ): LightResult {
    const position = element.getPosition();
    const height = this.getDefaultHeight(room);

    let intensity = 1300;
    let temperature = 6500;
    let ies = HSConstants.RenderLight.SPOT_LIGHT_NUM_5;

    if (renderOptions.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.NATURE_3) {
      intensity = HSConstants.RenderLight.NATURE_3_SPOT_INTENSITY;
      temperature = HSConstants.RenderLight.NATURE_3_SPOT_TEMPERATURE;
      ies = HSConstants.RenderLight.FILL_LIGHT_NUM_2;
    }

    if (renderOptions.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.NIGHT) {
      intensity = HSConstants.RenderLight.NIGHT_SPOT_INTENSITY;
      temperature = HSConstants.RenderLight.NIGHT_SPOT_TEMPERATURE;
      ies = HSConstants.RenderLight.FILL_LIGHT_NUM_1;
    }

    if (renderOptions.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.CHILLY_3) {
      intensity = HSConstants.RenderLight.CHILLY_3_SPOT_INTENSITY;
      temperature = HSConstants.RenderLight.CHILLY_3_SPOT_TEMPERATURE;
      ies = HSConstants.RenderLight.FILL_LIGHT_NUM_2;
    }

    if (
      renderOptions.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.REALISTIC ||
      renderOptions.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.GENERAL
    ) {
      intensity = HSConstants.RenderLight.REALISTIC_SPOT_INTENSITY;
      temperature = HSConstants.RenderLight.REALISTIC_SPOT_TEMPERATURE;
      ies = HSConstants.RenderLight.FILL_LIGHT_NUM_2;
    }

    return {
      type: HSCore.Model.LightTypeEnum.SpotLight,
      temperature,
      intensity,
      position,
      height,
      ies
    };
  }

  protected getClosestEdge(
    room: Room,
    point: THREE.Vector2,
    direction: THREE.Vector2
  ): ClosestEdgeResult {
    const edges = room.getEdges().filter(edge => {
      const edgeDirection = edge.p1.clone().sub(edge.p0).normalize();
      return Math.abs(edgeDirection.dot(direction)) < 0.1;
    });

    let closestEdge: Edge | undefined;
    let minDistance = 0;

    edges.forEach(edge => {
      const distance = HSCore.Util.Math.closestDistanceToSegment(point, edge.p0, edge.p1);
      
      if (minDistance === 0 || distance < minDistance) {
        minDistance = distance;
        closestEdge = edge;
      }
    });

    return {
      closestEdge,
      distance: minDistance
    };
  }
}