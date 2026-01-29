import { Box3, Line2d, Loop } from './geometry';
import { BodyOperator } from './body-operator';
import { FakeContent } from './fake-content';
import { IgnoreBoxUtil } from './ignore-box-util';

export enum ConstraintType {
  Distance = "distance"
}

interface MaterialData {
  dump(): unknown;
}

interface Material {
  getMaterialData(): MaterialData;
}

interface ContentMetadata {
  categories: string[];
}

interface ContentType {
  getTypeString(): string;
}

interface Host {
  tag: string;
}

interface Content {
  seekId: string;
  metadata: ContentMetadata;
  contentType: ContentType;
  tag: string;
  getHost(): Host | null | undefined;
  id: string;
  x: number;
  y: number;
  z: number;
  XScale: number;
  YScale: number;
  ZScale: number;
  XLength: number;
  YLength: number;
  ZLength: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  flip: boolean;
  materialsMap: Map<string, Material>;
  bound: {
    width: number;
    height: number;
    center(): { x: number; y: number };
  };
  XSize: number;
  YSize: number;
  ZSize: number;
}

interface ContentBoxDump {
  seekId: string;
  categories: string[];
  contentType: string;
  tag: string;
  hostTag?: string;
  entityId: string;
  x: number;
  y: number;
  z: number;
  XScale: number;
  YScale: number;
  ZScale: number;
  XLength: number;
  YLength: number;
  ZLength: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  flip: boolean;
  materialMap: Record<string, unknown>;
}

interface FloorDump {
  worldRawPath2dDump: {
    outer: Array<{ curve: unknown }>;
  };
}

interface GroupCo {
  targetContent?: Content;
  content?: Content;
  children: Array<{ targetContent?: Content; content?: Content }>;
}

interface SoulData {
  [key: string]: unknown;
}

interface EntityDump {
  id: number;
  x: number;
  y: number;
  z: number;
  XSize: number;
  YSize: number;
  ZSize: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  flip: boolean;
  XScale: number;
  YScale: number;
  ZScale: number;
  XLength: number;
  YLength: number;
  ZLength: number;
}

interface GroupDump extends EntityDump {
  members: EntityDump[];
}

interface Position {
  x: number;
  y: number;
  z: number;
}

export function getTempContentFromContentBox(contentBox: ContentBoxDump): Content {
  return FakeContent.fromContentBoxDump(contentBox);
}

export function contentToContentBoxDump(content: Content): ContentBoxDump {
  const materialMap: Record<string, unknown> = {};
  
  content.materialsMap.forEach((material, key) => {
    materialMap[key] = material.getMaterialData().dump();
  });

  return {
    seekId: content.seekId,
    categories: content.metadata.categories,
    contentType: content.contentType.getTypeString(),
    tag: content.tag,
    hostTag: content.getHost()?.tag,
    entityId: content.id,
    x: content.x,
    y: content.y,
    z: content.z,
    XScale: content.XScale,
    YScale: content.YScale,
    ZScale: content.ZScale,
    XLength: content.XLength,
    YLength: content.YLength,
    ZLength: content.ZLength,
    XRotation: content.XRotation,
    YRotation: content.YRotation,
    ZRotation: content.ZRotation,
    flip: content.flip,
    materialMap
  };
}

export class EntityObject {
  content!: Content;
  parent?: EntityObject;
  children: EntityObject[] = [];
  box!: Box3;
  soulData: SoulData = {};
  isFixed = false;
  private _spaceConstraint?: unknown;

  static fromContent(content: Content, parent?: EntityObject): EntityObject {
    const entity = new EntityObject();
    entity.content = content;
    entity.parent = parent;
    entity.box = EntityObject.getBox3OfContent(content);
    return entity;
  }

  static fromContentBox(contentBox: ContentBoxDump, parent?: EntityObject): EntityObject {
    const content = getTempContentFromContentBox(contentBox);
    return EntityObject.fromContent(content, parent);
  }

  updatePosition(position: Position): void {
    const { x, y, z } = position;
    this.content.x = x;
    this.content.y = y;
    this.content.z = z;
  }

  getUniqueParent(): EntityObject | undefined {
    return this.parent;
  }

  add(entity: EntityObject): void {
    if (!this.children.some(child => child.content === entity.content)) {
      entity.parent = this;
      this.children.push(entity);
    }
  }

  getTopParent(): EntityObject | undefined {
    let ancestor = this.parent;
    while (ancestor?.parent) {
      ancestor = ancestor.parent;
    }
    return ancestor;
  }

  getFirstParent(): EntityObject | undefined {
    return undefined;
  }

  get spaceConstraint(): unknown {
    return this._spaceConstraint;
  }

  get id(): number {
    return parseInt(this.content.id);
  }

  setSpaceConstraint(constraint: unknown): void {
    this._spaceConstraint = constraint;
  }

  get XLength(): number {
    return this.content.XLength;
  }

  get YLength(): number {
    return this.content.YLength;
  }

  get ZLength(): number {
    return this.content.ZLength;
  }

  get XSize(): number {
    return this.content.XSize;
  }

  get YSize(): number {
    return this.content.YSize;
  }

  get ZSize(): number {
    return this.content.ZSize;
  }

  traverse(callback: (entity: EntityObject) => void): void {
    this.children.forEach(child => callback(child));
  }

  get XRotation(): number {
    return 0;
  }

  get XScale(): number {
    return this.content.XScale;
  }

  get YRotation(): number {
    return 0;
  }

  get YScale(): number {
    return this.content.YScale;
  }

  get ZRotation(): number {
    return 0;
  }

  get ZScale(): number {
    return this.content.ZScale;
  }

  get x(): number {
    return this.content.x;
  }

  get y(): number {
    return this.content.y;
  }

  get z(): number {
    return this.content.z;
  }

  get flip(): boolean {
    return this.content.flip;
  }

  dump(): EntityDump {
    const {
      id,
      x,
      y,
      z,
      XSize,
      YSize,
      ZSize,
      XRotation,
      YRotation,
      ZRotation,
      flip,
      XScale,
      YScale,
      ZScale,
      XLength,
      YLength,
      ZLength
    } = this;

    return {
      id,
      x,
      y,
      z,
      XSize,
      YSize,
      ZSize,
      XRotation,
      YRotation,
      ZRotation,
      flip,
      XScale,
      YScale,
      ZScale,
      XLength,
      YLength,
      ZLength
    };
  }

  static getBox3OfContent(content: Content): Box3 {
    const { width, height } = content.bound;
    const center = content.bound.center();
    return new Box3().setFromCenterAndSize(
      { x: center.x, y: center.y, z: content.ZSize / 2 },
      { x: width, y: height, z: content.ZSize }
    );
  }

  static getBox3OfContentBox(contentBox: ContentBoxDump): Box3 {
    const { x, y, z, XScale, YScale, ZScale, XLength, YLength, ZLength } = contentBox;
    return new Box3().setFromCenterAndSize(
      { x, y, z },
      { x: XLength * XScale, y: YLength * YScale, z: ZLength * ZScale }
    );
  }

  log(): void {
    BodyOperator.createFromEntity(this).log();
  }
}

export class RoomObject extends EntityObject {
  floorOuterCurves: Line2d[] = [];
  floorDump: FloorDump;

  constructor(floorDump: FloorDump) {
    super();
    this.floorDump = floorDump;
  }

  static fromFloorDump(floorDump: FloorDump): RoomObject {
    const room = new RoomObject(floorDump);
    const content = this.getRegionContent(floorDump);
    room.content = content;
    room.floorOuterCurves = floorDump.worldRawPath2dDump.outer.map(
      item => new Line2d().load(item.curve)
    );
    return room;
  }

  static getRegionContent(floorDump: FloorDump): Content {
    return FakeContent.fromFloor(floorDump);
  }

  setFloorOuterCurves(curves: Line2d[]): void {
    this.floorOuterCurves = curves;
    const boundingBox = new Loop(curves).getBoundingBox();
    const center = boundingBox.getCenter();
    this.content.x = center.x;
    this.content.y = center.y;
    this.content.XLength = boundingBox.getSize().x;
    this.content.YLength = boundingBox.getSize().y;
  }
}

export class RegionObject extends EntityObject {
  add(entity: EntityObject): void {
    super.add(entity);
    this.box.union(entity.box);
  }

  updatePosition(position: Position): void {
    console.log("region::updatePosition:", position);
    this.children.forEach(child => child.updatePosition(position));
  }
}

export class GroupObject extends EntityObject {
  members!: EntityObject[];

  static fromGroupCo(groupCo: GroupCo, parent?: EntityObject, ignoreBoxConfig?: unknown): GroupObject {
    if (!groupCo.targetContent && !groupCo.content || 
        groupCo.children.some(child => !child.targetContent && !child.content)) {
      throw new Error("构建GroupObject时缺少targetContent");
    }

    const group = new GroupObject();
    group.content = groupCo.targetContent || groupCo.content!;
    group.parent = parent;
    group.members = groupCo.children.map(
      child => EntityObject.fromContent(child.targetContent || child.content!)
    );

    const notIgnoreBoxIndexes = IgnoreBoxUtil.getNotIgnoreBoxMemberIdxs(groupCo, ignoreBoxConfig);
    const box = new Box3();
    
    group.members.forEach((member, index) => {
      if (notIgnoreBoxIndexes.includes(index)) {
        box.union(member.box);
      }
    });

    group.box = box;
    return group;
  }

  updatePosition(position: Position): void {
    const { x, y, z } = position;
    const deltaX = x - this.content.x;
    const deltaY = y - this.content.y;
    const deltaZ = z - this.content.z;
    
    this.content.x = x;
    this.content.y = y;
    this.content.z = z;
    
    this.members.slice(1).forEach(member => {
      member.content.x += deltaX;
      member.content.y += deltaY;
      member.content.z += deltaZ;
    });
  }

  get XLength(): number {
    return this.box.getSize().x;
  }

  get YLength(): number {
    return this.box.getSize().y;
  }

  get ZLength(): number {
    return this.box.getSize().z;
  }

  get XSize(): number {
    return this.XLength;
  }

  get YSize(): number {
    return this.YLength;
  }

  get ZSize(): number {
    return this.ZLength;
  }

  get XScale(): number {
    return 1;
  }

  get YScale(): number {
    return 1;
  }

  get ZScale(): number {
    return 1;
  }

  get x(): number {
    return this.box.getCenter().x;
  }

  get y(): number {
    return this.box.getCenter().y;
  }

  get z(): number {
    return this.box.getCenter().z - this.ZLength / 2;
  }

  dump(): GroupDump {
    return {
      ...super.dump(),
      members: this.members.map(member => member.dump())
    };
  }
}