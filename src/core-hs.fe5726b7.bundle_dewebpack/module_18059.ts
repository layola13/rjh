import { Opening_IO, Opening } from './opening';
import { Entity } from './entity';
import { EntityField } from './object';
import { ContentUtil } from './content';

interface ParamData {
  id: string;
  value: number | string | undefined | null;
}

interface ProfileConfig {
  XLength?: string;
  YLength?: string;
  ZLength?: string;
  template: string;
  parameters: Array<{ id: string; defaultValue: number | string }>;
}

interface HoleMetadata {
  profileConfig?: ProfileConfig;
  [key: string]: unknown;
}

interface HoleWithProfile extends Hole {
  __XLength?: number;
  __YLength?: number;
  __ZLength?: number;
  __thickness?: number;
  __profile?: string;
}

export class Hole_IO extends Opening_IO {
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

    const holeWithProfile = hole as HoleWithProfile;

    if (holeWithProfile.profileConfig.XLength) {
      holeWithProfile.__XLength = holeWithProfile._evaluateExp(holeWithProfile.profileConfig.XLength);
    }

    if (ContentUtil.isWallOpening(holeWithProfile)) {
      const thickness = holeWithProfile._evaluateExp('#l#');
      if (thickness !== undefined) {
        holeWithProfile.__thickness = thickness;
      }
      if (holeWithProfile.profileConfig.ZLength) {
        holeWithProfile.__ZLength = holeWithProfile._evaluateExp(holeWithProfile.profileConfig.ZLength);
      }
    } else {
      const thickness = holeWithProfile._evaluateExp('#h#');
      if (thickness !== undefined) {
        holeWithProfile.__thickness = thickness;
      }
      if (holeWithProfile.profileConfig.YLength) {
        holeWithProfile.__YLength = holeWithProfile._evaluateExp(holeWithProfile.profileConfig.YLength);
      }
    }

    let profile = holeWithProfile.profileConfig.template;
    const templateRegex = /\$\{([^}]+)\}/;
    let match: RegExpExecArray | null;

    while ((match = templateRegex.exec(profile))) {
      const expression = match[1];
      const value = HSCore.Util.Math.toPersistentPrecision(holeWithProfile._evaluateExp(expression));
      profile = profile.replace(templateRegex, value);
    }

    holeWithProfile.__profile = profile;
  }

  load(entity: Hole, data: any, context: any): void {
    super.load(entity, data, context);

    if (!entity.supportPM()) {
      if (data.paramData) {
        this.setParams(entity, data.paramData);
      } else {
        const defaultParams: ParamData[] = [
          { id: 'w', value: entity.XLength },
          { id: 'h', value: entity.ZLength }
        ];
        this.setParams(entity, defaultParams);
      }
    }
  }
}

export class Hole extends Opening {
  private __paramValues: Map<string, number | string> = new Map();

  @EntityField({
    prefix: '_',
    postSet(hole: Hole, value: Map<string, number | string>): void {
      hole._updateProfile();
    },
    noEvent: true
  })
  _paramValues: Map<string, number | string> = new Map();

  metadata?: HoleMetadata;
  XLength?: number;
  YLength?: number;
  ZLength?: number;
  thickness?: number;
  profile?: string;

  constructor(id: string = '') {
    super(id);
    this.__paramValues = new Map();
    this._paramValues = new Map();
  }

  static create(metadata: HoleMetadata): Hole {
    const hole = new Hole();
    hole.initByMeta(metadata);
    return hole;
  }

  get profileConfig(): ProfileConfig | undefined {
    return this.metadata?.profileConfig;
  }

  initByMeta(metadata: HoleMetadata, parent?: unknown, skipUpdate: boolean = false, deep: boolean = false): void {
    super.initByMeta(metadata, parent, skipUpdate, deep);
    if (!skipUpdate) {
      this.updateProfile(metadata);
    }
  }

  getMetadataFilterKeys(): Set<string> {
    const keys = super.getMetadataFilterKeys();
    ['profileConfig'].forEach((key) => {
      keys.add(key);
    });
    return keys;
  }

  getIO(): Hole_IO {
    return Hole_IO.instance();
  }

  setParamValue(paramId: string, value: number | string): void {
    if (this.getParamValue(paramId) === value) {
      return;
    }
    const newParams = new Map(this.__paramValues);
    newParams.set(paramId, value);
    this._paramValues = newParams;
  }

  getParamValue(paramId: string): number | string | undefined {
    return this._paramValues.get(paramId);
  }

  getParams(): ParamData[] {
    return Array.from(this._paramValues).map((entry) => {
      return {
        id: entry[0],
        value: entry[1]
      };
    });
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

  updateProfile(metadata: HoleMetadata): void {
    if (!metadata.profileConfig) {
      return;
    }
    if (this.supportPM()) {
      return;
    }
    const params = new Map<string, number | string>();
    metadata.profileConfig.parameters.forEach((param) => {
      params.set(param.id, param.defaultValue);
    });
    this._paramValues = params;
  }

  _updateProfile(): void {
    if (!this.profileConfig) {
      return;
    }

    if (this.profileConfig.XLength) {
      this.XLength = this._evaluateExp(this.profileConfig.XLength);
    }

    if (ContentUtil.isWallOpening(this)) {
      const thickness = this._evaluateExp('#l#');
      if (thickness !== undefined) {
        this.thickness = thickness;
      }
      if (this.profileConfig.ZLength) {
        this.ZLength = this._evaluateExp(this.profileConfig.ZLength);
      }
    } else {
      const thickness = this._evaluateExp('#h#');
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
      const templateRegex = /\$\{([^}]+)\}/;
      let match: RegExpExecArray | null;

      while ((match = templateRegex.exec(profile))) {
        const expression = match[1];
        const value = HSCore.Util.Math.toPersistentPrecision(this._evaluateExp(expression));
        profile = profile.replace(templateRegex, value);
      }

      this.profile = profile;
    }
  }

  _evaluateExp(expression: string): any {
    const paramCatchRegex = /#([^#]+)#/;
    let match: RegExpExecArray | null;

    while ((match = paramCatchRegex.exec(expression))) {
      const paramId = match[1];
      const paramValue = this._paramValues.get(paramId);
      expression = expression.replace(paramCatchRegex, String(paramValue));
    }

    return eval(expression);
  }

  supportPM(): boolean {
    return false;
  }

  updateByPM(): void {}
}

Entity.registerClass(HSConstants.ModelClass.NgHole, Hole);