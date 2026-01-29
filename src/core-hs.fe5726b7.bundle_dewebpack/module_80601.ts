import { ParametricModel, ParametricModel_IO } from './parametricmodel';
import { Entity } from './entity';
import { Signal } from './signal';
import { EntityField } from './object';
import { Wall } from './wall';
import { OpeningUtil } from './opening';

interface ProfileConfig {
  template: string;
  paramValues: Map<string, number>;
}

interface WindowHoleParameters {
  innerFrom?: THREE.Vector2;
  innerTo?: THREE.Vector2;
  outerFrom?: THREE.Vector2;
  outerTo?: THREE.Vector2;
  topNeedFill?: boolean;
  bottomNeedFill?: boolean;
  fromSideNeedFill?: boolean;
  toSideNeedFill?: boolean;
  x?: number;
  y?: number;
  z?: number;
  elevation?: number;
  height?: number;
  materialData?: any;
  sideMaterialData?: any;
  topMaterialData?: any;
  bottomMaterialData?: any;
}

interface DumpOptions {
  [key: string]: any;
}

interface SerializedWindowHole {
  XLength: number;
  YLength: number;
  ZLength: number;
  XScale?: number;
  YScale?: number;
  ZScale?: number;
  profile: string;
}

export class WindowHole_IO extends ParametricModel_IO {
  private static _instance?: WindowHole_IO;

  public static instance(): WindowHole_IO {
    if (!WindowHole_IO._instance) {
      WindowHole_IO._instance = new WindowHole_IO();
    }
    return WindowHole_IO._instance;
  }

  public dump(
    entity: WindowHole,
    callback?: (result: SerializedWindowHole[], source: WindowHole) => void,
    includeDefaults: boolean = true,
    options: DumpOptions = {}
  ): SerializedWindowHole[] {
    const baseResult = super.dump(entity, undefined, includeDefaults, options);
    const windowHole = entity;
    const serialized = baseResult[0] as SerializedWindowHole;

    serialized.XLength = windowHole.XLength;
    serialized.YLength = windowHole.YLength;
    serialized.ZLength = windowHole.ZLength;

    if (windowHole.XScale !== 1) {
      serialized.XScale = windowHole.XScale;
    }
    if (windowHole.YScale !== 1) {
      serialized.YScale = windowHole.YScale;
    }
    if (windowHole.ZScale !== 1) {
      serialized.ZScale = windowHole.ZScale;
    }

    serialized.profile = windowHole.profile;

    if (callback) {
      callback(baseResult as SerializedWindowHole[], windowHole);
    }

    return baseResult as SerializedWindowHole[];
  }

  public load(
    entity: WindowHole,
    data: SerializedWindowHole,
    context?: any
  ): void {
    super.load(entity, data, context);

    entity.__XLength = data.XLength;
    entity.__YLength = data.YLength;
    entity.__ZLength = data.ZLength;
    entity.__XScale = data.XScale ?? 1;
    entity.__YScale = data.YScale ?? 1;
    entity.__ZScale = data.ZScale ?? 1;
    entity.profile = data.profile;
  }
}

export class WindowHole extends ParametricModel {
  @EntityField()
  public __XLength: number = 0;

  @EntityField()
  public __YLength: number = 0;

  @EntityField()
  public __ZLength: number = 0;

  @EntityField()
  public __XScale: number = 1;

  @EntityField()
  public __YScale: number = 1;

  @EntityField()
  public __ZScale: number = 1;

  @EntityField()
  public parameters: WindowHoleParameters = {
    innerFrom: new THREE.Vector2(0, 0),
    innerTo: new THREE.Vector2(0, 0),
    outerFrom: new THREE.Vector2(0, 0),
    outerTo: new THREE.Vector2(0, 0),
    topNeedFill: true,
    bottomNeedFill: true,
    fromSideNeedFill: true,
    toSideNeedFill: false
  };

  @EntityField({
    prefix: '_',
    preSet(this: WindowHole): void {
      this._notifyHost();
      const host = this._host;
      if (host?.removeOpening) {
        host.removeOpening(this);
        host.dirty();
      }
    },
    validate: (hostEntity: any) => !hostEntity || hostEntity.addOpening,
    postSet(this: WindowHole, oldValue: any, newValue: any): void {
      if (newValue) {
        newValue.addOpening(this);
        newValue.dirty();
        this._notifyHost();
      }
    }
  })
  protected _host?: any;

  public profile: string = '';
  public profileConfig: ProfileConfig;
  public signalPocketAdded: Signal;
  public signalPocketRemoved: Signal;
  protected _previewParams?: boolean;

  constructor(id: string = '', context?: any) {
    super(id, context);

    const paramValues = new Map<string, number>();
    paramValues.set('w', this.XLength);
    paramValues.set('h', this.ZLength);

    this.profileConfig = {
      template: 'M${0.5*#w#}, 0 L${0.5*#w#}, ${#h#} L${-0.5*#w#}, ${#h#} L${-0.5*#w#}, 0 L${0.5*#w#}, 0',
      paramValues
    };

    this.signalPocketAdded = new Signal(this);
    this.signalPocketRemoved = new Signal(this);
  }

  public get XLength(): number {
    return this.__XLength;
  }

  public set XLength(value: number) {
    this.__XLength = value;
  }

  public get YLength(): number {
    return this.__YLength;
  }

  public set YLength(value: number) {
    this.__YLength = value;
  }

  public get ZLength(): number {
    return this.__ZLength;
  }

  public set ZLength(value: number) {
    this.__ZLength = value;
  }

  public get XScale(): number {
    return this.__XScale;
  }

  public set XScale(value: number) {
    this.__XScale = value;
  }

  public get YScale(): number {
    return this.__YScale;
  }

  public set YScale(value: number) {
    this.__YScale = value;
  }

  public get ZScale(): number {
    return this.__ZScale;
  }

  public set ZScale(value: number) {
    this.__ZScale = value;
  }

  public get XSize(): number {
    return this.XLength * this.XScale;
  }

  public get YSize(): number {
    return this.YLength * this.YScale;
  }

  public get ZSize(): number {
    return this.ZLength * this.ZScale;
  }

  public set rotation(value: number) {
    // Intentionally empty
  }

  public get rotation(): number {
    const host = this.host;
    return host ? host.rotation : 0;
  }

  public get host(): any {
    return this._host;
  }

  public set host(value: any) {
    this._host = value;
  }

  public destroy(): void {
    if (!this._disposed) {
      this.signalPocketAdded?.dispose();
      this.signalPocketAdded = undefined as any;
      this.signalPocketRemoved?.dispose();
      this.signalPocketRemoved = undefined as any;
      super.destroy();
    }
  }

  public initByParameters(params: WindowHoleParameters): void {
    super.initByParameters(params);

    const materialManager = HSCore.Material.Manager.instance();
    let hasChanges = false;

    this.parameters.topNeedFill = true;
    this.parameters.bottomNeedFill = true;
    this.parameters.fromSideNeedFill = true;
    this.parameters.x = 0;
    this.parameters.y = 0;
    this.parameters.z = 0;

    if (params.innerFrom != null) {
      this.parameters.innerFrom = params.innerFrom;
      hasChanges = true;
    }
    if (params.innerTo != null) {
      this.parameters.innerTo = params.innerTo;
      hasChanges = true;
    }
    if (params.outerFrom != null) {
      this.parameters.outerFrom = params.outerFrom;
      hasChanges = true;
    }
    if (params.outerTo != null) {
      this.parameters.outerTo = params.outerTo;
      hasChanges = true;
    }
    if (params.topNeedFill != null) {
      this.parameters.topNeedFill = params.topNeedFill;
      hasChanges = true;
    }
    if (params.bottomNeedFill != null) {
      this.parameters.bottomNeedFill = params.bottomNeedFill;
      hasChanges = true;
    }
    if (params.fromSideNeedFill != null) {
      this.parameters.fromSideNeedFill = params.fromSideNeedFill;
      hasChanges = true;
    }
    if (params.toSideNeedFill != null) {
      this.parameters.toSideNeedFill = params.toSideNeedFill;
      hasChanges = true;
    }
    if (params.x != null) {
      this.parameters.x = params.x;
      hasChanges = true;
    }
    if (params.y != null) {
      this.parameters.y = params.y;
      hasChanges = true;
    }
    if (params.z != null) {
      this.parameters.z = params.z;
      hasChanges = true;
    }

    if (!this.parameters.materialData) {
      this.parameters.materialData = materialManager.getDefaultMaterialData('DEFAULT_WALL_WHITE_PAINT').clone();
      hasChanges = true;
    }
    if (!this.parameters.sideMaterialData) {
      this.parameters.sideMaterialData = materialManager.getDefaultMaterialData('DEFAULT_WALL_WHITE_PAINT').clone();
      hasChanges = true;
    }
    if (!this.parameters.topMaterialData) {
      this.parameters.topMaterialData = materialManager.getDefaultMaterialData('DEFAULT_WALL_WHITE_PAINT').clone();
      hasChanges = true;
    }
    if (!this.parameters.bottomMaterialData) {
      this.parameters.bottomMaterialData = materialManager.getDefaultMaterialData('DEFAULT_WALL_WHITE_PAINT').clone();
      hasChanges = true;
    }

    if (hasChanges) {
      this.onParametersChanged();
    }
  }

  public getIO(): WindowHole_IO {
    return WindowHole_IO.instance();
  }

  public onParametersChanged(): void {
    if (
      !this.parameters?.innerFrom ||
      !this.parameters?.innerTo ||
      !this.parameters?.outerFrom ||
      !this.parameters?.outerTo
    ) {
      return;
    }

    this.z = (this.parameters.elevation ?? 0) + (this.parameters.z ?? 0);
    this.ZLength = this.parameters.height ?? this.ZLength;

    const cloneVector = (vec: THREE.Vector2): THREE.Vector2 => {
      return new THREE.Vector2(vec.x, vec.y);
    };

    const innerFrom = cloneVector(this.parameters.innerFrom);
    const outerFrom = cloneVector(this.parameters.outerFrom);
    const outerTo = cloneVector(this.parameters.outerTo);
    const center = new THREE.Vector2().addVectors(innerFrom, outerTo).multiplyScalar(0.5);

    this.x = center.x;
    this.y = center.y;

    if (this.parameters.x != null && this.parameters.y != null) {
      this.x += this.parameters.x;
      this.y += this.parameters.y;
    }

    this.XLength = outerFrom.distanceTo(outerTo);
    this.YLength = outerFrom.distanceTo(innerFrom);

    this._updateProfile();

    if (this._host) {
      this._host.dirty();
    }
  }

  protected _updateProfile(): void {
    this.profileConfig.paramValues.set('w', this.XLength);
    this.profileConfig.paramValues.set('h', this.ZLength);

    let template = this.profileConfig.template;
    const placeholderRegex = /\$\{([^}]+)\}/;
    let match: RegExpExecArray | null;

    while ((match = placeholderRegex.exec(template))) {
      const expression = match[1];
      const evaluatedValue = HSCore.Util.Math.toPersistentPrecision(
        this._evaluateExpression(expression)
      );
      template = template.replace(placeholderRegex, evaluatedValue.toString());
    }

    this.profile = template;
  }

  protected _evaluateExpression(expression: string): number {
    const paramRegex = /#([^#]+)#/;
    let match: RegExpExecArray | null;

    while ((match = paramRegex.exec(expression))) {
      const paramName = match[1];
      const paramValue = this.profileConfig.paramValues.get(paramName);
      expression = expression.replace(paramRegex, String(paramValue));
    }

    return eval(expression);
  }

  public canAddPocket(): boolean {
    return true;
  }

  protected _notifyHost(): void {
    const host = this.getHost();
    if (!host) {
      return;
    }

    const options = this._previewParams === true ? { dirtyMixPaint: false } : undefined;

    if (host instanceof Wall) {
      OpeningUtil.getHostWalls(this, host).forEach((wall: Wall) => {
        wall.dirtyGeometry(options);
      });
    }
  }

  public getHost(): any {
    return this._host;
  }
}

Entity.registerClass(HSConstants.ModelClass.NgParametricWindowHole, WindowHole);