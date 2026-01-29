import { PModel, PModel_IO } from './PModel';
import { Entity } from './Entity';
import { Content } from './Content';
import { PAssembly } from './PAssembly';
import { Material } from './Material';
import { Logger } from './Logger';

interface LayoutInfo {
  [key: string]: unknown;
}

interface CreateParameters {
  localId?: string;
  parameters?: {
    x?: number;
    y?: number;
    z?: number;
    XRotation?: number;
    YRotation?: number;
    ZRotation?: number;
    Axis?: number;
  };
  content?: unknown;
  material?: unknown;
  materialComponentName?: string;
  layoutInfo?: LayoutInfo;
  needClip?: boolean;
  userFreeData?: {
    children?: unknown;
  };
}

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadContext {
  states: Record<string, unknown>;
  invalidIds?: string[];
}

interface DumpedState {
  XLength: string;
  YLength: string;
  ZLength: string;
  layoutInfo: LayoutInfo | undefined;
  content: string;
  [key: string]: unknown;
}

export class PContent_IO extends PModel_IO {
  dump(
    entity: PContent,
    callback?: (states: unknown[], entity: PContent) => void,
    includeChildren: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    let states = super.dump(entity, undefined, includeChildren, options);
    const rootState = states[0] as DumpedState;

    entity.forEachChild((child: PContent) => {
      states = states.concat(child.dump(callback, includeChildren, options));
    });

    rootState.XLength = entity.__XLength.id;
    rootState.YLength = entity.__YLength.id;
    rootState.ZLength = entity.__ZLength.id;
    rootState.layoutInfo = entity.layoutInfo;
    rootState.content = entity._content.id;

    callback?.(states, entity);

    return states;
  }

  load(entity: PContent, serialized: DumpedState, context: LoadContext): void {
    super.load(entity, serialized, context);

    entity.__XLength = context.states[serialized.XLength];
    entity.__YLength = context.states[serialized.YLength];
    entity.__ZLength = context.states[serialized.ZLength];
    entity.layoutInfo = serialized.layoutInfo;

    if (!entity.__XLength || !entity.__YLength || !entity.__ZLength) {
      log.error(`${entity.tag} undefined state values.`, 'HSCore.Load.Error');
      context?.invalidIds?.push(entity.id);
      return;
    }

    entity.__XLength.bindObjectFieldChanged(entity, 'XLength');
    entity.__YLength.bindObjectFieldChanged(entity, 'YLength');
    entity.__ZLength.bindObjectFieldChanged(entity, 'ZLength');

    const firstChild = entity.children
      ? entity.children[Object.keys(entity.children)[0]]
      : undefined;

    if (firstChild instanceof HSCore.Model.PAssembly || firstChild instanceof HSCore.Model.Content) {
      entity._content = firstChild;
    } else {
      log.error(
        `${entity.tag} is a pcontent while some of its children are not content.`,
        'HSCore.Load.Error'
      );
      context?.invalidIds?.push(entity.id);
    }
  }
}

export class PContent extends PModel {
  public __XLength: unknown;
  public __YLength: unknown;
  public __ZLength: unknown;
  public _content: Content | PAssembly | null;
  public layoutInfo: LayoutInfo | undefined;
  public needClip?: boolean;
  public AnimationRotation?: number;
  public Axis?: number;
  public XAnimationCenter?: number;
  public YAnimationCenter?: number;
  public YAnimationCenter?: number;
  public ZAnimationCenter?: number;

  constructor(id: string = '', parent?: unknown) {
    super(id, parent);
    this.defineStateField('XLength', 0);
    this.defineStateField('YLength', 0);
    this.defineStateField('ZLength', 0);
    this._content = null;
    this.layoutInfo = undefined;
  }

  getHost(): unknown {
    return this._content?.getHost();
  }

  static create(params: CreateParameters): PContent {
    const instance = new PContent();
    instance.localId = params.localId;

    const parameters = params.parameters;
    if (parameters) {
      instance.__x.__value = parameters.x ?? 0;
      instance.__y.__value = parameters.y ?? 0;
      instance.__z.__value = parameters.z ?? 0;
      instance.__XRotation.__value = parameters.XRotation ?? 0;
      instance.__YRotation.__value = parameters.YRotation ?? 0;
      instance.__ZRotation.__value = parameters.ZRotation ?? 0;
      instance.__Axis.__value = parameters.Axis ?? 1;
    }

    instance.setContent(params.content);

    if (params.material && params.materialComponentName && instance.getContent()) {
      instance.getContent().setMaterial(
        params.materialComponentName,
        Material.create(params.material)
      );
    }

    if (params) {
      instance.layoutInfo = { ...params.layoutInfo };
      instance.needClip = !!params.needClip;
    }

    return instance;
  }

  getContent(): Content | PAssembly | null {
    return this._content;
  }

  getMaterial(): unknown {
    return this.getContent()?.material;
  }

  setMaterial(material: unknown): void {
    const content = this.getContent();
    if (
      !content ||
      content instanceof PAssembly ||
      HSCore.Util.Entity.isChildOf(this, HSCatalog.ContentTypeEnum.ParamSwingDoorLeaf) ||
      HSCore.Util.Entity.isChildOf(this, HSCatalog.ContentTypeEnum.ParamSlidingDoorLeaf)
    ) {
      return;
    }
    content.setMaterial('cbnt_body', material);
  }

  setContent(contentOrMetadata: unknown): boolean {
    if (!contentOrMetadata) {
      return false;
    }

    let content: Content | PAssembly;
    let wasSelected = false;

    if (this._content) {
      wasSelected = this._content.isFlagOn(HSCore.Model.EntityFlagEnum.selected);
      this.removeChild(this._content.id);
      this._content = null;
    }

    if (contentOrMetadata instanceof Content) {
      content = contentOrMetadata;
      if (!content.verify()) {
        this.logger?.error(
          `${this.tag}: try to set invalid child content ${content.tag}`
        );
        this.dirty();
        return false;
      }
    } else {
      const metadata = contentOrMetadata as CreateParameters;
      if (metadata.userFreeData?.children) {
        content = PAssembly.create(metadata, metadata.userFreeData);
      } else {
        content = Content.create(metadata);
        if (!content) {
          this.logger?.error(
            `${this.tag}: failed to create content with metadata ${JSON.stringify(metadata)}`
          );
        }
      }
    }

    if (wasSelected) {
      content.setFlagOn(HSCore.Model.EntityFlagEnum.selected, true);
    }

    if (this.addChild(content)) {
      this._content = content;
    }

    this.updateContent();

    const parent = this.getUniqueParent();
    if (
      parent?.metadata?.productType === HSCatalog.ProductTypeEnum.PAssembly
    ) {
      parent.compute();
    }

    this.dirty();
    return true;
  }

  verify(): boolean {
    if (!super.verify()) {
      return false;
    }

    if (!this.__XLength?.verify()) {
      log.error(`${this.tag}: invalid XLength.`, 'HSCore.Verify.Error', true);
      return false;
    }

    if (!this.__YLength?.verify()) {
      log.error(`${this.tag}: invalid YLength.`, 'HSCore.Verify.Error', true);
      return false;
    }

    if (!this.__ZLength?.verify()) {
      log.error(`${this.tag}: invalid ZLength.`, 'HSCore.Verify.Error', true);
      return false;
    }

    const invalidChild = Object.values(this.children).find(child => !child.verify());
    return !invalidChild;
  }

  getIO(): PContent_IO {
    return PContent_IO.instance();
  }

  update(params: { metadata?: unknown }): void {
    const { metadata } = params;
    if (metadata) {
      this.setContent(metadata);
    }
  }

  addContent(): void {
    // Implementation intentionally empty
  }

  removeContent(content: unknown): boolean {
    return this._content?.removeContent(content) ?? false;
  }

  refreshBoundInternal(): void {
    // Implementation intentionally empty
  }

  modelBoundLine(param: unknown): unknown {
    return this._content?.modelBoundLine(param);
  }

  resize(width: number, height: number, depth: number): void {
    this._content?.resize(width, height, depth);
  }

  forEachContent(callback: (content: unknown) => void, filter?: unknown): void {
    this._content?.forEachContent(callback, filter);
  }

  isContentValid(): boolean {
    return !!this._content && this._content.isContentValid();
  }

  isContentInRoom(room: unknown, strict: boolean = false): boolean {
    return !!this._content && this._content.isContentInRoom(room, strict);
  }

  isContentInLoop(loop: unknown, strict: boolean = false): boolean {
    return !!this._content && this._content.isContentInLoop(loop, strict);
  }

  updateContent(shouldComputeContent: boolean = false): void {
    const content = this._content;
    if (!(content instanceof HSCore.Model.Content)) {
      return;
    }

    let offsetX = 0;
    let offsetY = 0;
    let offsetZ = 0;
    let rotationX = 0;
    let rotationZ = 0;

    if (this.AnimationRotation) {
      if (this.Axis === 1) {
        rotationZ = (rotationZ + this.AnimationRotation) % 360;
        const rotatedPoint = HSCore.Util.Math.rotatePointCW(
          { x: this.XAnimationCenter, y: this.YAnimationCenter },
          { x: 0, y: 0 },
          this.AnimationRotation
        );
        offsetX = rotatedPoint.x;
        offsetY = rotatedPoint.y;
      } else if (this.Axis === 2) {
        rotationX += this.AnimationRotation % 360;
        const rotatedPoint = HSCore.Util.Math.rotatePointCW(
          { x: this.YAnimationCenter, y: this.ZAnimationCenter },
          { x: 0, y: 0 },
          this.AnimationRotation
        );
        offsetZ = rotatedPoint.y;
        offsetY = rotatedPoint.x;
      }
    }

    const matrix = HSCore.Util.Matrix3DHandler.getMatrix4(this);
    const inverseMatrix = new THREE.Matrix4();
    inverseMatrix.getInverse(matrix);

    const rotationMatrix = new THREE.Matrix4();
    rotationMatrix.extractRotation(inverseMatrix);

    let positionVector = new THREE.Vector3(offsetX, offsetY, offsetZ);
    let rotationVector = new THREE.Vector3(rotationX, 0, rotationZ);

    positionVector = positionVector.applyMatrix4(rotationMatrix);
    rotationVector = rotationVector.applyMatrix4(rotationMatrix);

    content.x = positionVector.x;
    content.y = positionVector.y;
    content.z = positionVector.z;
    content.XRotation = rotationVector.x;
    content.YRotation = rotationVector.y;
    content.ZRotation = rotationVector.z;

    if (!content.contentType) {
      Logger.console.log('content contentType is undefined, please check');
    }

    const isHandleType = [
      HSCatalog.ContentTypeEnum.CabinetHandleType1,
      HSCatalog.ContentTypeEnum.CabinetHandleType0
    ].find(type => content.contentType.isTypeOf(type));

    if (isHandleType) {
      this.XLength = content.XLength;
      this.YLength = content.YLength;
      this.ZLength = content.ZLength;
    }

    if (content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.BarLeg)) {
      this.XLength = content.XLength;
      this.YLength = content.YLength;
    }

    this.XLength = this.XLength || content.XLength;
    this.YLength = this.YLength || content.YLength;
    this.ZLength = this.ZLength || content.ZLength;

    content.Axis = this.Axis || 1;

    if (content instanceof PAssembly) {
      content.XLength = this.XLength;
      content.YLength = this.YLength;
      content.ZLength = this.ZLength;
      if (shouldComputeContent === true) {
        this.computeContent();
      }
    } else {
      content.XScale = this.XLength / content.XLength;
      content.YScale = this.YLength / content.YLength;
      content.ZScale = this.ZLength / content.ZLength;
    }
  }

  computeContent(): void {
    const content = this._content;
    if (content && typeof content.compute === 'function') {
      content.compute();
    }
  }

  onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void {
    this.dirty();

    let shouldComputeContent = true;
    const transformFields = ['x', 'y', 'z', 'XRotation', 'YRotation', 'ZRotation'];
    if (transformFields.includes(fieldName)) {
      shouldComputeContent = false;
    }

    this.updateContent(shouldComputeContent);

    const relevantFields = [
      ...transformFields,
      'XLength',
      'YLength',
      'ZLength'
    ];
    if (relevantFields.includes(fieldName)) {
      this.forEachChild((child: PContent) =>
        child.onFieldChanged(fieldName, oldValue, newValue)
      );
    }

    super.onFieldChanged(fieldName, oldValue, newValue);
  }

  flipSelf(): void {
    super.flipSelf();
    this.updateContent();
  }

  setFlagOn(flag: unknown, value: boolean): void {
    super.setFlagOn(flag, value);
    this._content?.setFlagOn(flag, value);
  }

  setFlagOff(flag: unknown, value: boolean): void {
    super.setFlagOff(flag, value);
    this._content?.setFlagOff(flag, value);
  }
}

Entity.registerClass(HSConstants.ModelClass.NgPContent, PContent);