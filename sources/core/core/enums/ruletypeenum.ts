export enum VrayTypeEnum {
  VrayLightIESMax = "VrayLightIESMax",
  VraySunLight = "VraySunLight",
  VrayLightAceray = "VrayLightAceray",
  VrayLightRectangle = "VrayLightRectangle",
  VrayLightEllipse = "VrayLightEllipse",
  VrayLightSphere = "VrayLightSphere",
  VrayLightMesh = "VrayLightMesh",
  VrayLightDome = "VrayLightDome",
  FurnitureLight = "FurnitureLight",
  FurnitureSpotLight = "FurnitureSpotLight"
}

export enum VrayTypeNameEnum {
  VrayLightIESMax = "VRayIES",
  VrayLightAceray = "AceraySpotLight",
  VraySunLight = "VraySun",
  VrayLightDome = "VrayLightDome",
  FurnitureLight = "FurnitureLight",
  FurnitureSpotLight = "FurnitureSpotLight",
  VrayLightRectangle = "VRayLight",
  VrayLightSphere = "VRayLight",
  VrayLightMesh = "VRayLight",
  VrayLightEllipse = "VRayLight"
}

enum AreaType {
  AreaFlat = 0,
  FORBID_FLAG = 1,
  Sphere = 2,
  Mesh = 3,
  AreaEllipse = 4
}

export enum SlabFaceType {
  Top = "top"
}

export enum RoomTypeEnum {
  Balcony = "Balcony",
  Kitchen = "Kitchen",
  Bathroom = "Bathroom",
  MasterBathroom = "MasterBathroom",
  SecondBathroom = "SecondBathroom",
  Bedroom = "Bedroom",
  MasterBedroom = "MasterBedroom",
  SecondBedroom = "SecondBedroom",
  KidsRoom = "KidsRoom",
  ElderlyRoom = "ElderlyRoom",
  Library = "Library",
  StorageRoom = "StorageRoom",
  CloakRoom = "CloakRoom",
  NannyRoom = "NannyRoom",
  LaundryRoom = "LaundryRoom",
  Lounge = "Lounge",
  Aisle = "Aisle",
  Corridor = "Corridor",
  Office = "Office",
  PublicInterior = "PublicInterior",
  Studio = "Studio",
  Basement = "Basement",
  HomeCinema = "HomeCinema",
  Den = "Den",
  PorchBalcony = "PorchBalcony",
  EquipmentRoom = "EquipmentRoom",
  Garage = "Garage",
  Terrace = "Terrace",
  LivingRoom = "LivingRoom",
  DiningRoom = "DiningRoom",
  LivingDiningRoom = "LivingDiningRoom",
  none = "none"
}

export enum LightTypeEnum {
  SpotLight = "SpotLight",
  PointLight = "PointLight",
  FlatLight = "FlatLight",
  EllipseLight = "EllipseLight",
  AttenuatedSpotLight = "AttenuatedSpotLight",
  SpotPhysicalLight = "SpotPhysicalLight",
  PhysicalLight = "PhysicalLight",
  AsmPhysicalLight = "AsmPhysicalLight",
  MeshLight = "MeshLight",
  SubGroup = "SubGroup",
  AsmSubGroup = "AsmSubGroup"
}

export enum RuleTypeEnum {
  Unknown = "unknown",
  HeadLightRule = "head light rule",
  SingleSeatLightRule = "single seat rule",
  MultipleSeatLightRule = "multiple seat rule",
  CornerSofaLightRule = "corner sofa rule",
  BedLightRule = "bed rule",
  TableLightRule = "table rule",
  BathroomCabinetRule = "bath cabinet rule",
  CabinetRule = "cabinet rule",
  DecorativePictureRule = "decorate picture rule",
  TVCabinetRule = "TV rule",
  ToiletLightRule = "toilet rule",
  WindowLightRule = "window rule",
  DownLightRule = "down light rule"
}

interface Position {
  x: number;
  y: number;
  z?: number;
}

interface Size {
  x: number;
  y: number;
  z: number;
}

interface Rotation {
  XRotation: number;
  YRotation: number;
  ZRotation: number;
}

interface LightParameters {
  temperature: number;
  intensity: number;
  position?: Position;
  height?: number;
  size?: { width: number; length: number };
  ies?: string;
  rgb?: number[];
  close?: boolean;
  affectSpecular?: boolean;
  sourceContentType?: unknown;
  [key: string]: unknown;
}

interface ContentMetadata {
  contentType?: string;
  categories?: string[];
  extension?: {
    objInfo?: {
      lights?: Array<{
        multiplier?: number;
        temperature?: number;
        name: string;
        targetDir?: { x: number; y: number; z: number };
      }>;
    };
  };
}

interface Content {
  ID: string;
  x: number;
  y: number;
  z: number;
  XSize: number;
  YSize: number;
  ZSize: number;
  rotation?: number;
  metadata?: ContentMetadata;
  contentType?: { isTypeOf(types: string[]): boolean };
  isFlagOn?(flag: number): boolean;
  getHost?(): unknown;
}

/**
 * Light content wrapper class
 */
export class LightContent {
  private readonly _contentType: string;
  private readonly _content: Content;
  private _position?: Position;
  private _rotation?: number;
  private _size?: Size;
  private _outline?: Position[];
  private _categories?: string[];

  constructor(content: Content, contentType?: string) {
    this._contentType = contentType || content.contentType;
    this._content = content;
    
    if (content.metadata?.categories && Array.isArray(content.metadata.categories) && content.metadata.categories.length !== 0) {
      this._categories = content.metadata.categories.slice();
    }
    
    this._calculateOutline();
  }

  contentType(): string {
    return this._contentType;
  }

  getContents(): Content[] {
    return [this._content];
  }

  getCategories(): string[] | undefined {
    return this._categories;
  }

  getHost(): unknown {
    return this._content.getHost();
  }

  get frontForwardVec(): THREE.Vector2 {
    const vec = new THREE.Vector2(0, -1);
    const origin = new THREE.Vector2(0, 0);
    return vec.rotateAround(origin, THREE.Math.degToRad(-this._rotation)).normalize();
  }

  getPosition(): Position {
    return this._position;
  }

  getOutline(): Position[] {
    return this._outline;
  }

  getRotation(): number {
    return this._rotation;
  }

  getSize(): Size {
    return this._size;
  }

  private _calculateOutline(): void {
    const content = this._content;
    this._position = { x: content.x, y: content.y, z: content.z };
    
    const size: Size = {
      x: content.XSize,
      y: content.YSize,
      z: content.ZSize
    };
    
    this._rotation = content.rotation || 0;
    this._size = size;
    this._outline = HSCore.Util.Math.computeOutline(this._position, size.x, size.y, this._rotation);
  }
}

/**
 * Light content group wrapper
 */
export class LightContentGroup extends LightContent {
  private _children: LightContent[];

  constructor(content: Content, children?: LightContent[], contentType?: string) {
    super(content, contentType);
    this._children = children || [];
    this._calculateOutlineForVirtualGroup();
  }

  getContents(): Content[] {
    return this._children.reduce((acc, child) => {
      acc.push(...child.getContents());
      return acc;
    }, [this._content]);
  }

  getChildren(): LightContent[] {
    return this._children;
  }

  private _calculateOutlineForVirtualGroup(): void {
    if (this._content && this._content instanceof HSCore.Model.Group) return;
    if (!this._children || this._children.length === 0) return;

    const content = this._content;
    const childOutlines = this._children.map(child => child.getOutline());
    
    this._rotation = content.rotation || 0;
    
    const center = new THREE.Vector2(content.x, content.y);
    const rotationAngle = Math.abs(this._rotation % 180) > 2 
      ? THREE.Math.degToRad(this._rotation) 
      : undefined;
    
    const points = childOutlines.flat().map(point => {
      const vec = new THREE.Vector2(point.x, point.y);
      if (rotationAngle) {
        vec.rotateAround({ x: center.x, y: center.y }, rotationAngle);
      }
      return vec;
    });
    
    const box = new THREE.Box2();
    box.setFromPoints(points);
    const size = box.getSize();
    
    this._size = size;
    this._position = { x: center.x, y: center.y, z: content.z };
    this._outline = HSCore.Util.Math.computeOutline(center, size.x, size.y, this._rotation);
  }
}

/**
 * Base VRay light class
 */
export class VrayLight {
  static readonly DefaultLightIdType = "light";
  
  uid: string;
  nodeType: string;
  roomId: string;
  volumeLight: boolean;

  constructor(index: number, nodeType: string, options: LightParameters) {
    this.nodeType = nodeType;
    this.uid = `${index}/${VrayLight.DefaultLightIdType}`;
    this.roomId = "none";
    this.volumeLight = !!options.volumeLight;
  }

  getIndex(): string {
    return this.uid.split("/")[0];
  }

  toLightJson(): Record<string, unknown> {
    return {
      uid: this.uid,
      nodeType: this.nodeType,
      roomId: this.roomId,
      volumeLight: this.volumeLight
    };
  }
}

/**
 * FGI (Furniture Graphics Interface) Parser
 */
export class FgiParser {
  private fgiData: unknown;
  private context: {
    _IDMapMeshes: Map<string, unknown[]>;
    _MaterialJidToRef: Map<string, string>;
    _seekIdToGraphicsPath: Map<string, string>;
    _roomArea: Map<string, number>;
    _refMapTrans: Map<string, unknown[]>;
    _duplicateInstanceIdMap: Map<string, boolean>;
    _smoothMeshes: Map<string, unknown[]>;
    materialList: Set<string>;
    pocketMaterialMap: Record<string, unknown>;
    pocketMaterialUidMap: Record<string, string>;
  };

  constructor(fgiData: unknown) {
    this.fgiData = fgiData;
    this.context = {
      _IDMapMeshes: new Map(),
      _MaterialJidToRef: new Map(),
      _seekIdToGraphicsPath: new Map(),
      _roomArea: new Map(),
      _refMapTrans: new Map(),
      _duplicateInstanceIdMap: new Map(),
      _smoothMeshes: new Map(),
      materialList: new Set(),
      pocketMaterialMap: {},
      pocketMaterialUidMap: {}
    };
  }

  static parseFgiData(fgiData: unknown): Record<string, unknown> {
    const parser = new FgiParser(fgiData);
    let result: Record<string, unknown> = {};
    
    try {
      result = parser.parse();
      if (!result) throw new Error("unexpected fgi parse result!");
      result.err = 0;
    } catch (error) {
      HSCore.Logger.console.error(error);
      result = {
        err: 1,
        errMsg: error instanceof Error ? error.message : "failed"
      };
      throw error;
    }
    
    return result;
  }

  parse(): Record<string, unknown> {
    this.fgiData = this._preprocessFgiData(this.fgiData);
    return this._parse(this.fgiData);
  }

  private _preprocessFgiData(data: unknown): unknown {
    // Implementation details for coordinate conversion
    return data;
  }

  private _parse(data: unknown): Record<string, unknown> {
    // Core parsing logic
    return {};
  }
}

/**
 * VRay Light Factory
 */
export class VrayLightFactory {
  private index: number = 100000;

  build(type: VrayTypeEnum, parameters: LightParameters): VrayLight {
    let light: VrayLight | null = null;
    
    switch (type) {
      case VrayTypeEnum.VrayLightRectangle:
      case VrayTypeEnum.VrayLightEllipse:
      case VrayTypeEnum.VraySunLight:
      case VrayTypeEnum.VrayLightMesh:
      case VrayTypeEnum.VrayLightSphere:
      case VrayTypeEnum.VrayLightIESMax:
      case VrayTypeEnum.VrayLightAceray:
      case VrayTypeEnum.FurnitureLight:
      case VrayTypeEnum.FurnitureSpotLight:
      case VrayTypeEnum.VrayLightDome:
        light = new VrayLight(this.index, type, parameters);
        break;
      default:
        throw new Error("light type error");
    }
    
    this.index++;
    return light;
  }

  resetIndex(startIndex: number = 100000): void {
    this.index = startIndex;
  }
}

export const Util = {
  VrayLightFactory,
  VrayLight,
  LightContent,
  LightContentGroup
};

export const ExportLights = {
  exportAliRenderParameters(
    document: unknown,
    options: unknown,
    meshes: unknown[],
    meshToRoomIdMap: Map<string, string>
  ): { allLights: unknown[]; temperature: number } {
    return {
      allLights: [],
      temperature: 6500
    };
  }
};