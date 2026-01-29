import { EntityField } from './EntityField';
import { Entity, EntityFlagEnum } from './Entity';
import { Light_IO, Light, LightTypeEnum } from './Light';
import {
  LightSubGroupCompareUtil,
  PointLightSubGroupMemberProperties,
  FlatLightSubGroupMemberProperties,
  VirtualAreaLightSubGroupMemberProperties,
  SpotLightSubGroupMemberProperties,
  AttenuatedSpotLightSubGroupMemberProperties,
  MeshLightSubGroupMemberProperties,
  PhysicalLightSubGroupMemberProperties,
  SpotPhysicalLightSubGroupMemberProperties,
  GeneralLightSubGroupMemberProperties,
  LightSubGroupMemberProperties
} from './LightSubGroupProperties';
import { Logger } from './Logger';

export class LightSubGroup_IO extends Light_IO {
  dump(
    entity: LightSubGroup,
    callback?: (data: unknown[], entity: LightSubGroup) => void,
    recursive: boolean = true,
    options: Record<string, unknown> = {}
  ): unknown[] {
    if (!entity.members || entity.members.length === 0) {
      return [];
    }

    let dumpData = super.dump(entity, undefined, recursive, options);
    const primaryData = dumpData[0] as Record<string, unknown>;

    primaryData.members = entity.members.map((member) => member.id);
    primaryData.memberPropertiesConfig = entity.memberPropertiesConfig;
    primaryData.groupInteractionMode = entity.groupInteractionMode;
    primaryData.contentID = entity.contentID;

    if (recursive) {
      entity.members.forEach((member) => {
        if (member.isFlagOff(EntityFlagEnum.removed)) {
          dumpData = dumpData.concat(member.dump(callback, recursive, options));
        }
      });
    }

    if (callback) {
      callback(dumpData, entity);
    }

    return dumpData;
  }

  load(
    entity: LightSubGroup,
    data: {
      members?: string[];
      memberPropertiesConfig?: LightSubGroupMemberProperties;
      groupInteractionMode?: boolean;
      contentID?: string;
    },
    context: unknown
  ): void {
    super.load(entity, data, context);

    entity.members.length = 0;

    (data.members || []).forEach((memberId) => {
      const loadedEntity = Entity.loadFromDumpById(memberId, context);
      if (loadedEntity) {
        entity.members.push(loadedEntity as Light);
        (loadedEntity as Light).group = entity;
      }
    });

    entity.members = Array.from(new Set(entity.members));
    entity.memberPropertiesConfig = data.memberPropertiesConfig;
    entity.groupInteractionMode = data.groupInteractionMode ?? true;
    entity.contentID = data.contentID;
  }
}

export class LightSubGroup extends Light {
  private __members: Light[] = [];
  private __x: number = 0;
  private __y: number = 0;
  private __z: number = 0;

  @EntityField()
  XRotation: number = 0;

  @EntityField()
  YRotation: number = 0;

  @EntityField()
  ZRotation: number = 0;

  @EntityField({
    partialSet(this: LightSubGroup, value: Light[]): void {
      this._setMembers(value);
    }
  })
  members: Light[] = [];

  @EntityField()
  memberPropertiesConfig?: LightSubGroupMemberProperties = undefined;

  @EntityField()
  groupInteractionMode: boolean = true;

  private _memberProxy?: Light = undefined;

  constructor(id: string = '') {
    super(id);
    this.type = LightTypeEnum.SubGroup;
  }

  static MemberProxyMethod = (
    firstMember: Light,
    secondMember: Light
  ): Light => {
    let member1 = firstMember;
    let member2 = secondMember;

    if (member1?.type === LightTypeEnum.SubGroup) {
      member1 = (member1 as LightSubGroup).memberProxy;
    }

    if (member2?.type === LightTypeEnum.SubGroup) {
      member2 = (member2 as LightSubGroup).memberProxy;
    }

    return member2.x + member2.y + member2.z > member1.x + member1.y + member1.z
      ? member2
      : member1;
  };

  static create(lights: Light[], updateProperties: boolean = true): LightSubGroup {
    const group = new LightSubGroup();

    lights.forEach((light) => {
      group.addMember(light);
    });

    group.memberPropertiesConfig = LightSubGroup.createMemberPropertiesConfig(
      group.memberProxy.type
    );

    if (updateProperties) {
      LightSubGroupCompareUtil.updateProperty(
        group.memberPropertiesConfig,
        group.toFlatMemberList()
      );
    }

    return group;
  }

  clone(): LightSubGroup {
    const clonedMembers: Light[] = [];

    this.members.forEach((member) => {
      const clonedMember = member.clone() as Light;
      clonedMembers.push(clonedMember);
    });

    return LightSubGroup.create(clonedMembers);
  }

  static createMemberPropertiesConfig(
    lightType: LightTypeEnum
  ): LightSubGroupMemberProperties {
    let config: LightSubGroupMemberProperties;

    switch (lightType) {
      case LightTypeEnum.PointLight:
        config = new PointLightSubGroupMemberProperties();
        break;
      case LightTypeEnum.FlatLight:
        config = new FlatLightSubGroupMemberProperties();
        break;
      case LightTypeEnum.EllipseLight:
        config = new VirtualAreaLightSubGroupMemberProperties();
        break;
      case LightTypeEnum.SpotLight:
        config = new SpotLightSubGroupMemberProperties();
        break;
      case LightTypeEnum.AttenuatedSpotLight:
        config = new AttenuatedSpotLightSubGroupMemberProperties();
        break;
      case LightTypeEnum.MeshLight:
        config = new MeshLightSubGroupMemberProperties();
        break;
      case LightTypeEnum.PhysicalLight:
      case LightTypeEnum.AsmPhysicalLight:
        config = new PhysicalLightSubGroupMemberProperties();
        break;
      case LightTypeEnum.SpotPhysicalLight:
        config = new SpotPhysicalLightSubGroupMemberProperties();
        break;
      default:
        config = new GeneralLightSubGroupMemberProperties();
        Logger.console.error('Unsupport light type for group operation: ' + lightType);
    }

    return config;
  }

  toFlatMemberList(): Light[] {
    const flatList: Light[] = [];

    const flatten = (light: Light): void => {
      if (light instanceof LightSubGroup) {
        light.members.forEach((member) => {
          flatten(member);
        });
      } else {
        flatList.push(light);
      }
    };

    flatten(this);
    return flatList;
  }

  dirtyPosition(options: Record<string, unknown> = {}): void {
    super.dirtyPosition(options);
    this.group?.dirtyPosition();
  }

  dirtyGeometry(options: Record<string, unknown> = {}): void {
    super.dirtyGeometry(options);
    this.group?.dirtyGeometry();
  }

  onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void {
    if (!this.members) {
      super.onFieldChanged(fieldName, oldValue, newValue);
      return;
    }

    if (fieldName === 'x' || fieldName === 'y' || fieldName === 'z') {
      this._onXYZChanged(fieldName, oldValue as number);
    } else if (fieldName === 'ZRotation') {
      this._rotate((newValue as number) - (oldValue as number));
    } else if (
      fieldName === 'YRotation' ||
      fieldName === 'XRotation' ||
      fieldName === 'topView' ||
      fieldName === 'model3d' ||
      fieldName === 'modelTexture' ||
      fieldName === 'XScale' ||
      fieldName === 'YScale' ||
      fieldName === 'ZScale'
    ) {
      Logger.console.assert(
        false,
        "should not change the '" + fieldName + "' in the instance of " + this.Class
      );
    }

    super.onFieldChanged(fieldName, oldValue, newValue);
  }

  addMember(light: Light): void {
    if (this.members.includes(light)) {
      return;
    }

    if (light) {
      light.targetEnabled = false;
    }

    light.group = this;

    const updatedMembers = [...this.__members];
    updatedMembers.push(light);
    this.members = updatedMembers;
    this.onEntityDirty();
  }

  removeMember(light: Light): void {
    if (!this.members.includes(light)) {
      return;
    }

    light.group = undefined;

    const updatedMembers = [...this.members];
    updatedMembers.xRemove(light);
    this.members = updatedMembers;
    this.onEntityDirty();
  }

  isVirtual(): boolean {
    return this.memberProxy.isVirtual();
  }

  hasAreaSize(): boolean {
    return true;
  }

  private _setMembers(newMembers: Light[]): void {
    const currentMembers = Object.values(this.__members);
    const targetMembers = Object.values(newMembers);

    const membersToRemove = currentMembers.filter(
      (member) => !targetMembers.includes(member)
    );
    const membersToAdd = targetMembers.filter(
      (member) => !currentMembers.includes(member)
    );

    membersToRemove.forEach((member) => {
      this._removeMember(member);
    });

    membersToAdd.forEach((member) => {
      this._addMember(member);
    });

    this.refreshBoundInternal();
    this.dirty();
  }

  private _addMember(light: Light): boolean {
    if (!light || this.__members.includes(light)) {
      return false;
    }

    this.__members.push(light);
    light.group = this;
    return true;
  }

  private _removeMember(light: Light): boolean {
    if (!light || !this.__members.includes(light)) {
      return false;
    }

    if (this._memberProxy === light) {
      this._memberProxy = undefined;
    }

    this.__members.xRemove(light);
    light.group = undefined;
    return true;
  }

  get memberProxy(): Light {
    if (!this._memberProxy) {
      this._memberProxy = this.members.reduce(LightSubGroup.MemberProxyMethod);
    }
    return this._memberProxy;
  }

  set memberProxy(light: Light) {
    if (light.isGroupChildOf(this)) {
      this._memberProxy = light;
    }
  }

  forEachMember(
    callback: (member: Light) => void,
    context?: unknown
  ): void {
    if (!callback) {
      return;
    }

    this.members.forEach((member) => {
      if (!member.isFlagOn(EntityFlagEnum.removed)) {
        callback.call(context, member);
      }
    }, this);
  }

  hasMember(light: Light, recursive: boolean = true): boolean {
    if (!light) {
      return false;
    }

    if (this.members.some((member) => member === light)) {
      return true;
    }

    if (recursive) {
      return this.members.some(
        (member) =>
          member instanceof LightSubGroup &&
          member.hasMember &&
          member.hasMember(light, recursive)
      );
    }

    return false;
  }

  private _rotate(
    angleDegrees: number,
    pivotPoint?: { x: number; y: number }
  ): void {
    if (HSCore.Util.Math.isZero(angleDegrees)) {
      return;
    }

    this.members.forEach((member) => {
      member.rotation = (member.rotation + angleDegrees) % 360;

      if (
        !pivotPoint ||
        (HSCore.Util.Math.nearlyEquals(pivotPoint.x, this.x) &&
          HSCore.Util.Math.nearlyEquals(pivotPoint.y, this.y))
      ) {
        const rotatedPoint = HSCore.Util.Math.rotatePointCW(
          { x: this.x, y: this.y },
          member,
          angleDegrees
        );
        member.x = rotatedPoint.x;
        member.y = rotatedPoint.y;
      }
    }, this);

    this.refreshBoundInternal();
  }

  setFlagOn(
    flag: EntityFlagEnum,
    value: unknown,
    applyToMembers: boolean = true
  ): void {
    if (applyToMembers) {
      this.members.forEach((member) => {
        member.setFlagOn(flag, value);
      });
    }
    super.setFlagOn(flag, value);
  }

  setFlagOff(
    flag: EntityFlagEnum,
    value: unknown,
    applyToMembers: boolean = true
  ): void {
    if (applyToMembers) {
      this.members.forEach((member) => {
        member.setFlagOff(flag, value);
      });
    }
    super.setFlagOff(flag, value);
  }

  getIO(): LightSubGroup_IO {
    return LightSubGroup_IO.instance();
  }

  refreshBoundInternal(): void {
    if (this.members.length === 0) {
      this.outline = [];
      return;
    }

    const bounds = this.boundInternal;
    bounds.reset();

    let minZ = Number.MAX_VALUE;
    let maxZ = -Number.MAX_VALUE;

    this.forEachMember((member) => {
      bounds.appendBound(member.bound);

      const isAreaLight = Light.isAreaSourceLight(member);
      let memberMinZ = member.z;
      let memberMaxZ = member.z;

      if (isAreaLight) {
        memberMinZ -= (member.ZSize || 0) / 2;
        memberMaxZ += (member.ZSize || 0) / 2;
      }

      minZ = Math.min(minZ, memberMinZ);
      maxZ = Math.max(maxZ, memberMaxZ);
    }, this);

    const left = bounds.left;
    const right = bounds.left + bounds.width;
    const top = bounds.top;
    const bottom = bounds.top + bounds.height;

    const corners: Array<{ x: number; y: number }> = [];
    corners[0] = { x: left, y: top };
    corners[1] = { x: right, y: top };
    corners[2] = { x: right, y: bottom };
    corners[3] = { x: left, y: bottom };

    const center = { x: this.x, y: this.y };

    corners.forEach((corner, index) => {
      this.outline[index] = HSCore.Util.Math.rotatePointCW(
        center,
        corner,
        this.rotation
      );
    }, this);

    this._rotate(this.rotation);

    if (this.outline.length === 0) {
      this.XSize = 0;
      this.YSize = 0;
      this.ZSize = 0;
      this.__x = 0;
      this.__y = 0;
      this.__z = 0;
    } else {
      this.XSize = HSCore.Util.Math.Vec2.distance(this.outline[0], this.outline[1]);
      this.YSize = HSCore.Util.Math.Vec2.distance(this.outline[1], this.outline[2]);
      this.ZSize = maxZ - minZ;

      this.__x =
        this.outline.reduce((sum, point) => sum + point.x, 0) / 4;
      this.__y =
        this.outline.reduce((sum, point) => sum + point.y, 0) / 4;
      this.__z = this.ZSize / 2 + minZ;
    }
  }

  private _onXYZChanged(fieldName: string, oldValue: number): void {
    const delta = (this as Record<string, number>)[fieldName] - oldValue;

    if (HSCore.Util.Math.isZero(delta)) {
      return;
    }

    const movement: Record<string, number> = {};
    movement[fieldName] = delta;
    this._move(movement);
  }

  private _move(delta: { x?: number; y?: number; z?: number }): void {
    const deltaX = delta.x || 0;
    const deltaY = delta.y || 0;
    const deltaZ = delta.z || 0;

    this.members.forEach((member) => {
      member.x += deltaX;
      member.y += deltaY;
      member.z += deltaZ;
      member.dirtyPosition();
    });

    this.dirtyPosition();
  }

  verify(): boolean {
    const validMembers = this.members.filter(
      (member) =>
        member &&
        member.isFlagOff(EntityFlagEnum.removed) &&
        member.getUniqueParent() === this.getUniqueParent()
    );

    if (validMembers.length !== this.members.length) {
      this.members = validMembers;
    }

    let isValid = true;

    if (this.members.length <= 1) {
      isValid = false;
      this.members = [];
      this.setFlagOn(
        EntityFlagEnum.removed | EntityFlagEnum.hidden,
        false,
        false
      );
    }

    return isValid;
  }

  isValid(): boolean {
    return this.members.length > 1;
  }

  onFlagChanged(event: { data: { flag: EntityFlagEnum } }): void {
    super.onFlagChanged(event);

    if (
      event.data.flag & EntityFlagEnum.selected &&
      !this.groupInteractionMode
    ) {
      if (this.isFlagOn(EntityFlagEnum.selected)) {
        this.members.forEach((member) =>
          member.setFlagOn(EntityFlagEnum.selected)
        );
      } else {
        this.members.forEach((member) =>
          member.setFlagOff(EntityFlagEnum.selected)
        );
      }
    }
  }
}

Entity.registerClass(HSConstants.ModelClass.NgLightSubGroup, LightSubGroup);