import { Opening_IO, Opening } from './opening';
import { Entity } from './entity';
import { EntityField } from './object';

interface ParamData {
  id: string;
  value: number;
}

interface ProfileConfig {
  XLength?: string;
  YLength?: string;
  ZLength?: string;
  template: string;
  parameters: Array<{ id: string; defaultValue: number }>;
}

interface Metadata {
  profileConfig?: ProfileConfig;
  contentType: {
    isTypeOf(type: string): boolean;
  };
  hasPocket?: boolean;
}

interface DumpOptions {
  [key: string]: unknown;
}

type DumpCallback = (result: unknown[], entity: Hole) => void;

class Hole_IO extends Opening_IO {
  setParams(hole: Hole, params: ParamData[]): void {
    params.forEach((param) => {
      if (param.value !== undefined && param.value !== null) {
        hole._paramValues.set(param.id, param.value);
      }
    });
    this.updateProfile(hole);
  }

  updateProfile(hole: Hole): void {
    if (!hole.profileConfig) {
      return;
    }

    const holeWithProfile = hole;

    if (holeWithProfile.profileConfig.XLength) {
      holeWithProfile.__XLength = holeWithProfile._evaluateExp(holeWithProfile.profileConfig.XLength);
    }

    if (HSCore.Util.Content.isWallOpening(holeWithProfile)) {
      const thickness = holeWithProfile._evaluateExp("#l#");
      if (thickness !== undefined) {
        holeWithProfile.__thickness = thickness;
      }
      if (holeWithProfile.profileConfig.ZLength) {
        holeWithProfile.__ZLength = holeWithProfile._evaluateExp(holeWithProfile.profileConfig.ZLength);
      }
    } else {
      const thickness = holeWithProfile._evaluateExp("#h#");
      if (thickness !== undefined) {
        holeWithProfile.__thickness = thickness;
      }
      if (holeWithProfile.profileConfig.YLength) {
        holeWithProfile.__YLength = holeWithProfile._evaluateExp(holeWithProfile.profileConfig.YLength);
      }
    }

    let profile = holeWithProfile.profileConfig.template;
    const templateRegex = /\${([^}]+)}/;
    let match: RegExpExecArray | null;

    while ((match = templateRegex.exec(profile))) {
      const expression = match[1];
      const evaluatedValue = HSCore.Util.Math.toPersistentPrecision(
        holeWithProfile._evaluateExp(expression)
      );
      profile = profile.replace(templateRegex, evaluatedValue);
    }

    holeWithProfile.__profile = profile;
  }

  dump(entity: Hole, callback?: DumpCallback, includeMetadata: boolean = true, options: DumpOptions = {}): unknown[] {
    const result = super.dump(entity, undefined, includeMetadata, options);
    const mainData = result[0] as Record<string, unknown>;

    if (!entity.supportPM()) {
      mainData.paramData = entity.getParams();
    }

    if (callback) {
      callback(result, entity);
    }

    return result;
  }

  load(entity: Hole, data: Record<string, unknown>, context: unknown): void {
    super.load(entity, data, context);

    if (!entity.supportPM()) {
      if (data.paramData) {
        this.setParams(entity, data.paramData as ParamData[]);
      } else {
        const defaultParams: ParamData[] = [
          { id: "w", value: entity.XLength },
          { id: "h", value: entity.ZLength }
        ];
        this.setParams(entity, defaultParams);
      }
    }
  }
}

class Hole extends Opening {
  private __paramValues: Map<string, number>;

  @EntityField({
    prefix: "_",
    postSet(entity: Hole, value: Map<string, number>): void {
      entity._updateProfile();
    },
    noEvent: true
  })
  _paramValues: Map<string, number>;

  __XLength?: number;
  __YLength?: number;
  __ZLength?: number;
  __thickness?: number;
  __profile?: string;

  metadata?: Metadata;
  XLength: number = 0;
  YLength: number = 0;
  ZLength: number = 0;
  thickness: number = 0;
  z: number = 0;

  constructor(id: string = "", parent?: unknown) {
    super(id, parent);
    this.__paramValues = new Map();
    this._paramValues = new Map();
  }

  static create(metadata: Metadata): Hole {
    const hole = new Hole();
    hole.initByMeta(metadata);
    return hole;
  }

  get profileConfig(): ProfileConfig | undefined {
    return this.metadata?.profileConfig;
  }

  initByMeta(metadata: Metadata, parent?: unknown, skipUpdate: boolean = false, isClone: boolean = false): void {
    super.initByMeta(metadata, parent, skipUpdate, isClone);
    if (!skipUpdate) {
      this.updateProfile(metadata);
    }
  }

  getMetadataFilterKeys(): Set<string> {
    const keys = super.getMetadataFilterKeys();
    ["profileConfig"].forEach((key) => {
      keys.add(key);
    });
    return keys;
  }

  getIO(): Hole_IO {
    return Hole_IO.instance() as Hole_IO;
  }

  canAddPocket(): boolean {
    return (
      !!this.metadata &&
      !this.metadata.contentType.isTypeOf(HSCatalog.ContentTypeEnum.AirConditionHoleOpening) &&
      !this.metadata.hasPocket
    );
  }

  setParamValue(paramId: string, value: number): void {
    if (this.getParamValue(paramId) === value) {
      return;
    }
    const newParams = new Map(this.__paramValues);
    newParams.set(paramId, value);
    this._paramValues = newParams;
  }

  getParamValue(paramId: string): number | undefined {
    return this._paramValues.get(paramId);
  }

  getParams(): ParamData[] {
    return Array.from(this._paramValues).map((entry) => ({
      id: entry[0],
      value: entry[1]
    }));
  }

  setParams(params: ParamData[]): void {
    const newParams = new Map(this.__paramValues);
    params.forEach((param) => {
      if (param.value !== undefined && param.value !== null) {
        newParams.set(param.id, param.value);
      }
    });
    this._paramValues = newParams;
  }

  updateProfile(metadata: Metadata): void {
    if (!metadata.profileConfig) {
      return;
    }
    if (this.supportPM()) {
      return;
    }

    const defaultParams = new Map<string, number>();
    this.profileConfig!.parameters.forEach((param) => {
      defaultParams.set(param.id, param.defaultValue);
    });
    this._paramValues = defaultParams;
  }

  _updateProfile(): void {
    if (!this.profileConfig) {
      return;
    }

    if (this.profileConfig.XLength) {
      this.XLength = this._evaluateExp(this.profileConfig.XLength);
    }

    if (HSCore.Util.Content.isWallOpening(this)) {
      const thickness = this._evaluateExp("#l#");
      if (thickness !== undefined) {
        this.thickness = thickness;
      }
      if (this.profileConfig.ZLength) {
        this.ZLength = this._evaluateExp(this.profileConfig.ZLength);
      }
    } else {
      const thickness = this._evaluateExp("#h#");
      if (thickness !== undefined) {
        this.thickness = thickness;
      }
      if (this.profileConfig.YLength) {
        this.YLength = this._evaluateExp(this.profileConfig.YLength);
      }
    }

    if (this.supportPM()) {
      this.updateByPM();
    } else {
      let profile = this.profileConfig.template;
      const templateRegex = /\${([^}]+)}/;
      let match: RegExpExecArray | null;

      while ((match = templateRegex.exec(profile))) {
        const expression = match[1];
        const evaluatedValue = HSCore.Util.Math.toPersistentPrecision(
          this._evaluateExp(expression)
        );
        profile = profile.replace(templateRegex, evaluatedValue);
      }
      this.refreshFrontProfile(profile);
    }
  }

  _evaluateExp(exp: string): number {
    const paramCatchRegex = /#([^#]+)#/;
    let match: RegExpExecArray | null;

    while ((match = paramCatchRegex.exec(exp))) {
      const paramId = match[1];
      const paramValue = this._paramValues.get(paramId);
      exp = exp.replace(paramCatchRegex, String(paramValue));
    }

    return eval(exp);
  }

  getBaseboardCutterInfo(context: {
    surfaceObj: {
      surface: {
        containsPoint(point: unknown): boolean;
      };
    };
  }): Array<{ cutPath: Array<{ getStartPt(): unknown; getEndPt(): unknown }>; patchLines: unknown[] }> {
    const cutterInfo = super.getBaseboardCutterInfo(context);

    const EPSILON = 1e-6;
    if (!this.getPocket() && this.z < EPSILON) {
      cutterInfo.forEach((info) => {
        info.cutPath.forEach((segment) => {
          const startContained = context.surfaceObj.surface.containsPoint(segment.getStartPt());
          const endContained = context.surfaceObj.surface.containsPoint(segment.getEndPt());

          if (
            (startContained && !endContained) ||
            (!startContained && endContained)
          ) {
            info.patchLines.push(segment);
          }
        });
      });
    }

    return cutterInfo;
  }

  supportPM(): boolean {
    return false;
  }

  updateByPM(): void {}

  refreshFrontProfile(profile: string): void {}

  getPocket(): unknown {
    return null;
  }
}

Entity.registerClass(HSConstants.ModelClass.NgHole, Hole);

export { Hole, Hole_IO };