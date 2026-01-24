/**
 * Layer module - Manages floor plan layers and building elements
 * Contains layer management, slab handling, and element organization
 */

import { Entity, Entity_IO } from './Entity';
import { Signal, SignalHook } from './Signal';
import { Slab, SlabFaceType } from './Slab';
import { Wall, WallFaceType } from './Wall';
import { Material } from './Material';
import { Content, ContentBase } from './Content';
import { Face } from './Face';
import { RoomBuilder } from './RoomBuilder';
import { HoleBuilder } from './HoleBuilder';
import { BeamBuilder } from './BeamBuilder';
import { SlabBuilder } from './SlabBuilder';
import { Underlay, ExtraordinaryGuideline } from './Underlay';
import { MoldingTypeEnum } from './Molding';
import { Vector2, Matrix3, Curve, Loop } from './Geometry';
import { EntityEventType, EntityFlagEnum } from './EntityTypes';
import { Mitre } from './Mitre';
import { NCustomizedParametricRoof } from './Roof';

/**
 * Layer type enumeration
 */
export enum LayerTypeEnum {
  /** Normal layer */
  LayerTypeNormal = 1,
  /** Basement layer */
  LayerTypeBasement = 2
}

/**
 * Layer flag enumeration for layer states
 */
export enum LayerFlagEnum {
  /** Normal state */
  normal = 256,
  /** Deactivated state */
  deActive = 512,
  /** Active state */
  active = 1024
}

/**
 * Slab type classification
 */
export enum SlabType {
  /** Floor slab */
  floor = "floor",
  /** Ceiling slab */
  ceiling = "ceiling",
  /** Other slab types */
  other = "other"
}

/**
 * Element type categories for organizing layer children
 */
const enum ElementType {
  Slab = "slab",
  Molding = "molding",
  Opening = "opening",
  ParametricOpening = "popening",
  ParametricDoor = "pdoor",
  Content = "content",
  Wall = "wall",
  Group = "group",
  Light = "light",
  Face = "face",
  ConcealedWork = "cwork",
  Floor = "floor",
  Ceiling = "ceiling",
  Structure = "structure",
  Beam = "beam",
  AuxiliaryLine = "auxiliaryline",
  WallFaceAssembly = "wfassembly",
  RoofsDrawing = "roofsDrawing"
}

/**
 * Sketch 2D guideline data
 */
interface Sketch2dGuideline {
  /** Guideline curve */
  curve: Curve;
  /** Start anchor point */
  fromAnchor: Vector2;
  /** End anchor point */
  endAnchor: Vector2;
  /** Guideline type */
  type: number;
}

/**
 * Sketch 2D hole data
 */
interface Sketch2dHole {
  /** Hole boundary loop */
  loop: Loop;
  /** Hole identifier */
  id: string;
}

/**
 * Interior auxiliary face collection by wall face type
 */
interface InteriorAuxFaceMap {
  [WallFaceType.top]: Record<string, Face>;
  [WallFaceType.bottom]: Record<string, Face>;
}

/**
 * Entity map organized by element type
 */
type ChildrenMap = Record<ElementType, Record<string, Entity>>;

/**
 * Signal data for slab thickness changes
 */
interface SlabThicknessChangedData {
  oldValue: number;
  newValue: number;
}

/**
 * Layer serialization/deserialization handler
 */
export class Layer_IO extends Entity_IO {
  /**
   * Serialize layer to dump format
   * @param entity - Layer entity to dump
   * @param callback - Optional post-dump callback
   * @param includeGeometry - Whether to include geometry data
   * @param options - Additional dump options
   * @returns Serialized layer data array
   */
  dump(
    entity: Layer,
    callback?: (result: any[], source: Layer) => void,
    includeGeometry: boolean = true,
    options: Record<string, any> = {}
  ): any[];

  /**
   * Deserialize layer from dump format
   * @param entity - Target layer entity
   * @param data - Serialized layer data
   * @param context - Load context
   */
  load(entity: Layer, data: any, context: any): void;

  /**
   * Post-load processing for layer
   * @param entity - Loaded layer entity
   * @param context - Load context
   */
  postLoad(entity: Layer, context: any): void;

  /**
   * Migrate legacy layer data format
   * @param entity - Layer entity
   * @param data - Legacy data
   * @param context - Migration context
   */
  migrateLoad(entity: Layer, data: any, context: any): void;
}

/**
 * Layer entity - Represents a building level/floor in the floor plan
 * Manages walls, slabs, rooms, and other architectural elements
 */
export class Layer extends Entity {
  /** Default layer height in 3D (mm) */
  private __height: number;
  
  /** Slab thickness (mm) */
  private __slabThickness: number;
  
  /** Floor slabs collection */
  private __floorSlabs: Record<string, Slab>;
  
  /** Ceiling slabs collection */
  private __ceilingSlabs: Record<string, Slab>;
  
  /** Roofs collection */
  private _roofs: Record<string, NCustomizedParametricRoof>;
  
  /** Previous layer (below) */
  private __prev?: Layer;
  
  /** Next layer (above) */
  private __next?: Layer;
  
  /** Underlay image data */
  private __underlay?: Underlay;
  
  /** Gusset group for structural connections */
  private _gussetGroup?: Entity;
  
  /** Display name of the layer */
  displayName: string;
  
  /** 2D sketch guidelines */
  slabSketch2dGuildLines: ExtraordinaryGuideline[];
  
  /** 2D sketch holes */
  slabSketch2dHoles: Sketch2dHole[];
  
  /** Slab editor state */
  slabeditor?: any;
  
  /** Signal dispatched when slab thickness changes */
  signalSlabThicknessChanged: Signal<SlabThicknessChangedData>;
  
  /** Signal hook for wainscot updates */
  private _signalHookWainScot: SignalHook;
  
  /** Room builder for managing room geometry */
  roomBuilder: RoomBuilder;
  
  /** Hole builder for managing openings */
  holeBuilder: HoleBuilder;
  
  /** Beam builder for structural beams */
  beamBuilder: BeamBuilder;
  
  /** Slab builder for floor/ceiling slabs */
  slabBuilder: SlabBuilder;
  
  /** Interior auxiliary faces by type */
  interiorAuxFaces: InteriorAuxFaceMap;
  
  /** Children organized by element type */
  childrenMap: ChildrenMap;

  /**
   * Create a new layer
   * @param id - Entity identifier
   * @param doc - Parent document
   * @param height - Initial height (default: 2800mm)
   * @param slabThickness - Initial slab thickness (default: 120mm)
   */
  static create(
    id?: string,
    doc?: any,
    height?: number,
    slabThickness?: number
  ): Layer;

  /**
   * Get layer height (mm)
   */
  get height(): number;
  set height(value: number);

  /**
   * Get slab thickness (mm)
   */
  get slabThickness(): number;
  set slabThickness(value: number);

  /**
   * Get underlay image data
   */
  get underlay(): Underlay | undefined;
  set underlay(value: Underlay | undefined);

  /**
   * Get previous layer (below)
   */
  get prev(): Layer | undefined;
  set prev(value: Layer | undefined);

  /**
   * Get next layer (above)
   */
  get next(): Layer | undefined;
  set next(value: Layer | undefined);

  /**
   * Get floor slabs collection
   */
  get floorSlabs(): Record<string, Slab>;
  set floorSlabs(value: Record<string, Slab>);

  /**
   * Get ceiling slabs collection
   */
  get ceilingSlabs(): Record<string, Slab>;
  set ceilingSlabs(value: Record<string, Slab>);

  /**
   * Get parent floor plan
   */
  get parent(): Entity | undefined;

  /**
   * Get all parent entities
   */
  get parents(): Record<string, Entity>;

  /**
   * Get gusset group for structural connections
   */
  get gussetGroup(): Entity | undefined;
  set gussetGroup(value: Entity | undefined);

  /**
   * Get slabs by type
   * @param type - Slab type (floor/ceiling/other)
   */
  getSlabs(type: SlabType): Record<string, Slab>;

  /**
   * Set slabs collection for a specific type
   * @param type - Slab type
   * @param slabs - Slabs array
   */
  setSlabs(type: SlabType, slabs: Slab[]): void;

  /**
   * Check if slab is a floor slab
   * @param slab - Slab to check
   */
  isFloorSlab(slab: Slab): boolean;

  /**
   * Check if slab is a ceiling slab
   * @param slab - Slab to check
   */
  isCeilingSlab(slab: Slab): boolean;

  /**
   * Get slab type classification
   * @param slab - Slab to classify
   */
  getSlabType(slab: Slab): SlabType;

  /**
   * Add a floor slab
   * @param slab - Slab to add
   * @returns True if added successfully
   */
  addFloorSlab(slab: Slab): boolean;

  /**
   * Add a ceiling slab
   * @param slab - Slab to add
   * @returns True if added successfully
   */
  addCeilingSlab(slab: Slab): boolean;

  /**
   * Iterate over all walls
   * @param callback - Function called for each wall
   * @param context - Callback context
   */
  forEachWall(callback: (wall: Wall) => void, context?: any): void;

  /**
   * Iterate over all floor slabs
   * @param callback - Function called for each floor slab
   * @param context - Callback context
   */
  forEachFloorSlab(callback: (slab: Slab) => void, context?: any): void;

  /**
   * Iterate over all ceiling slabs
   * @param callback - Function called for each ceiling slab
   * @param context - Callback context
   */
  forEachCeilingSlab(callback: (slab: Slab) => void, context?: any): void;

  /**
   * Iterate over all roofs
   * @param callback - Function called for each roof
   * @param context - Callback context
   */
  forEachRoof(callback: (roof: NCustomizedParametricRoof) => void, context?: any): void;

  /**
   * Iterate over all floor faces
   * @param callback - Function called for each floor
   * @param context - Callback context
   */
  forEachFloor(callback: (floor: Entity) => void, context?: any): void;

  /**
   * Iterate over all ceiling faces
   * @param callback - Function called for each ceiling
   * @param context - Callback context
   */
  forEachCeiling(callback: (ceiling: Entity) => void, context?: any): void;

  /**
   * Iterate over all rooms
   * @param callback - Function called for each room
   * @param context - Callback context
   */
  forEachRoom(callback: (room: Entity) => void, context?: any): void;

  /**
   * Iterate over all materials
   * @param callback - Function called for each material with entity and face type
   * @param context - Callback context
   */
  forEachMaterial(
    callback: (material: Material, entity: Entity, faceType: number) => void,
    context?: any
  ): void;

  /**
   * Iterate over all faces (non-auxiliary)
   * @param callback - Function called for each face
   * @param context - Callback context
   */
  forEachFace(callback: (face: Face) => void, context?: any): void;

  /**
   * Iterate over all structural faces
   * @param callback - Function called for each structural face
   * @param context - Callback context
   */
  forEachStructureFace(callback: (face: Face) => void, context?: any): void;

  /**
   * Iterate over all beam faces
   * @param callback - Function called for each beam face with aux flag
   * @param context - Callback context
   */
  forEachBeamFace(callback: (face: Face, isAux: boolean) => void, context?: any): void;

  /**
   * Get all walls
   */
  get walls(): Record<string, Wall>;

  /**
   * Get all slabs
   */
  get slabs(): Record<string, Slab>;

  /**
   * Get all moldings
   */
  get moldings(): Record<string, Entity>;

  /**
   * Get all openings
   */
  get openings(): Record<string, Entity>;

  /**
   * Get all contents
   */
  get contents(): Record<string, Content>;

  /**
   * Get all auxiliary lines
   */
  get auxiliaryLines(): Record<string, Entity>;

  /**
   * Get all structures
   */
  get structures(): Record<string, Entity>;

  /**
   * Get all beams
   */
  get beams(): Record<string, Entity>;

  /**
   * Get all parametric openings
   */
  get parametricOpenings(): Record<string, Entity>;

  /**
   * Get all roofs
   */
  get roofs(): Record<string, NCustomizedParametricRoof>;

  /**
   * Get all faces (non-auxiliary)
   */
  get faces(): Record<string, Face>;

  /**
   * Get all auxiliary faces
   */
  get auxFaces(): Record<string, Face>;

  /**
   * Get all groups
   */
  get groups(): Record<string, Entity>;

  /**
   * Get all lights
   */
  get lights(): Record<string, Entity>;

  /**
   * Get all wall face assemblies
   */
  get wallFaceAssemblies(): Entity[];

  /**
   * Get concealed work entity
   */
  get concealedWork(): Entity | undefined;

  /**
   * Get roofs drawing entity
   */
  get roofsDrawing(): Entity | undefined;

  /**
   * Get structural faces
   */
  get structureFaces(): Face[];

  /**
   * Get structural auxiliary faces
   */
  get structureAuxFaces(): Face[];

  /**
   * Get layer information
   */
  get layerInfo(): any;

  /**
   * Verify layer integrity and update slabs
   */
  verify(): boolean;

  /**
   * Check if layer is valid (not orphaned and not hidden)
   */
  isValid(): boolean;

  /**
   * Remove all children of specific types
   * @param types - Element types to remove
   */
  removeAllChildrenByTypes(types: ElementType[]): void;

  /**
   * Clear all parent references
   */
  clearParents(): void;

  /**
   * Remove all free-floating faces not attached to entities
   */
  clearFreeFaces(): void;

  /**
   * Hook wainscot content signals for automatic updates
   * @param content - Wainscot content to hook
   */
  hookWainScotSignal(content: Content): void;

  /**
   * Mirror layer geometry
   * @param transform - Mirror transformation
   */
  mirror(transform: { matrix3: Matrix3 }): void;

  /**
   * Mirror builders (room, slab, beam)
   * @param transform - Mirror transformation
   */
  mirrorBuilders(transform: { matrix3: Matrix3 }): void;

  /**
   * Translate layer by offset
   * @param offset - Translation vector
   */
  translate(offset: Vector2): void;

  /**
   * Add interior auxiliary face
   * @param face - Face to add
   * @param faceType - Wall face type (top/bottom)
   */
  addInteriorAuxFace(face: Face, faceType: WallFaceType): void;

  /**
   * Remove interior auxiliary face
   * @param face - Face to remove
   */
  removeInteriorAuxFace(face: Face): void;

  /**
   * Get serialization handler
   */
  getIO(): Layer_IO;

  /**
   * Refresh internal bounding box
   */
  refreshBoundInternal(): void;

  /**
   * Called when child entity is added
   * @param child - Added child entity
   */
  onChildAdded(child: Entity): void;

  /**
   * Called when child entity is removed
   * @param child - Removed child entity
   */
  onChildRemoved(child: Entity): void;

  /**
   * Called when entity field changes
   * @param fieldName - Changed field name
   * @param oldValue - Previous value
   * @param newValue - New value
   */
  onFieldChanged(fieldName: string, oldValue: any, newValue: any): void;

  /**
   * Clean up and destroy layer
   */
  destroy(): void;
}