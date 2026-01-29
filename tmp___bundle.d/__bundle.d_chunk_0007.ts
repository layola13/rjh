        load(module: any, exports: any, require: any, i: any): any;
    }
    export const __height: any;
    export const __thickness: any;
    export const __baseProfile: any;
    export const _faces: any;
    export const openings: any;
    export const _flag: any;
    // Original Name: u
    export class Slab extends import("99338").Entity {
        constructor(module: any, ...args: any[]);
        setFlagOn(module: any, exports: any): any;
        getBaseProfile(): any;
        _setBaseProfile(module: any): any;
        getThickness(): any;
        getFace(module: any): any;
        getFaces(module: any): any;
        _getFaces(module: any): any;
        getFaceType(module: any): any;
        _setFaces(module: any, exports: any): any;
        getMaterial(module: any): any;
        destroy(): any;
        getIO(): any;
        forEachFace(module: any, exports: any): any;
        getBaseLayer(): any;
        getUnderLayer(): any;
        getUniqueParent(): any;
        verify(): any;
        hasOpening(module: any): any;
        _setOpenings(module: any): any;
        _addOpening(module: any): any;
        _removeOpening(module: any): any;
        _verifyBaseProfile(): any;
        forEachOpening(module: any, exports: any): any;
    }
    export const __openings: any;
    export const signalOpeningAdded: any;
    export const signalOpeningRemoved: any;
    export const x: any;
    export const y: any;
    export const _disposed: any;
    export const thickness: any;
    export const height: any;
}

declare module "46537" {
    export const rejection: any;
    export const notified: any;
    export const promise: any;
    export const reason: any;
    export const done: any;
    export const value: any;
    export const state: any;
    export const facade: any;
    export const prototype: any;
    export const type: any;
    export const parent: any;
    export const reactions: any;
    export const ok: any;
    export const fail: any;
    export const domain: any;
    export const resolve: any;
    export const reject: any;
    export const f: any;
    export const Promise: any;
}

declare module "46558" {
    export const REALISTIC_DECORATE_SPOT_INTENSITY: any;
    export const REALISTIC_SPOT_TEMPERATURE: any;
    export const REALISTIC_SPOT_INTENSITY: any;
    export const CHILLY_3_SPOT_TEMPERATURE: any;
    export const CHILLY_3_SPOT_INTENSITY: any;
    export const NATURE_3_SPOT_TEMPERATURE: any;
    export const NATURE_3_DECORATE_SPOT_INTENSITY: any;
    export const NATURE_3_SPOT_INTENSITY: any;
    export const NIGHT_SPOT_TEMPERATURE: any;
    export const NIGHT_SPOT_INTENSITY: any;
    export const SAFE_HEIGHT_SCALE: any;
    export const DESK_LIGHTING_CONTENT_TYPES: any;
    export const CELLING_LIGHTING_WITHOUT_DOWNLIGHT_CONTENT_TYPES: any;
    export const CELLING_LIGHTING_CONTENT_TYPES: any;
    export const FILL_LIGHT_NUM_7: any;
    export const FILL_LIGHT_NUM_6: any;
    export const FILL_LIGHT_NUM_5: any;
    export const FILL_LIGHT_NUM_4: any;
    export const FILL_LIGHT_NUM_3: any;
    export const FILL_LIGHT_NUM_2: any;
    export const FILL_LIGHT_NUM_1: any;
    export const SPOT_LIGHT_NUM_15: any;
    export const SPOT_LIGHT_NUM_14: any;
    export const SPOT_LIGHT_NUM_13: any;
    export const SPOT_LIGHT_NUM_12: any;
    export const SPOT_LIGHT_NUM_11: any;
    export const SPOT_LIGHT_NUM_10: any;
    export const SPOT_LIGHT_NUM_9: any;
    export const SPOT_LIGHT_NUM_8: any;
    export const SPOT_LIGHT_NUM_7: any;
    export const SPOT_LIGHT_NUM_6: any;
    export const SPOT_LIGHT_NUM_5: any;
    export const SPOT_LIGHT_NUM_4: any;
    export const SPOT_LIGHT_NUM_3: any;
    export const SPOT_LIGHT_NUM_2: any;
    export const SPOT_LIGHT_NUM_1: any;
}

declare module "46559" {
    export const NCPClipTaskManager: any;
    export const TaskManagerState: any;
    export const Pending: any;
    export const Running: any;
    export const Finished: any;
    // Original Name: a
    export class NCPClipTaskManager {
        enable(): any;
        disable(): any;
        addClipTask(module: any, exports: any, require: any): any;
        _completeTask(module: any): any;
        clearTask(module: any): any;
        clearAllTasks(): any;
        constructor(...args: any[]);
    }
    export const _enabled: any;
    export const taskFn: any;
    export const entity: any;
    export const _state: any;
    export const size: any;
    export const _clipTaskMap: any;
    export const clipTaskSignal: any;
    export const _signalHook: any;
}

declare module "46583" {
    export const length: any;
    export const Sketch2d_IO: any;
    export const Sketch2d: any;
    // Original Name: y
    export class Sketch2d extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        isRoot(): any;
        getIO(): any;
        _setBackground(module: any): any;
        transform(module: any): any;
        removeAllFaces(module: any, exports: any, require: any): any;
        getBackgroundOuter(): any;
        getAllCurves(): any;
        getAllPoints(): any;
        createBuilder(): any;
        initWithBackground(module: any, exports: any): any;
        changeBackground(module: any, exports: any): any;
        isSameBackground(module: any): any;
        clear(module: any): any;
        addPaths(module: any, exports: any): any;
        addCirclePath(module: any, exports: any): any;
        updateAfterChanges(module: any, exports: any, require: any, i: any, n: any): any;
        postBuild(): any;
        removeCurves(module: any, exports: any, require: any): any;
        removeFace(module: any): any;
        addCurvesPath(module: any, exports: any): any;
        addBackground(module: any): any;
        refreshBoundInternal(): any;
        copyFace(module: any, exports: any, require: any): any;
        forEachFace(module: any, exports: any): any;
        addGuideLine(module: any, exports: any): any;
        removeGuideLines(module: any): any;
        verify(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        _processFieldChanged(module: any): any;
        dispatchCopyFace2dSignal(module: any, exports: any, require: any, i: any): any;
        dispatchFace2dAddedSignal(module: any): any;
        dispatchBuildCompleteSignal(module: any): any;
        dirtyMaterial(module: any): any;
        applyTransform(module: any, exports: any, require: any, i: any, n: any): any;
        destroy(): any;
        mirror(module: any): any;
    }
    export const _background: any;
    export const face2dAdded: any;
    export const face2dCopied: any;
    export const signalBuildComplete: any;
    export const center: any;
    export const radius: any;
    export const clockwise: any;
    export const curves: any;
    export const background: any;
    export const _boundDirty: any;
    export const faces: any;
    export const hasBackground: any;
    export const x: any;
    export const y: any;
    export const id: any;
    // Original Name: _
    export class Sketch2d_IO extends import("24567").Entity_IO {
        instance(): any;
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const _Sketch2d_IO_instance: any;
}

declare module "46612" {
    export const length: any;
    export const Layer_IO: any;
    export const SlabType: any;
    export const LayerTypeEnum: any;
    export const Layer: any;
    export const LayerTypeNormal: any;
    export const LayerTypeBasement: any;
    export const Slab: any;
    export const Molding: any;
    export const Opening: any;
    export const Content: any;
    export const Wall: any;
    export const Group: any;
    export const Light: any;
    export const floor: any;
    export const ceiling: any;
    export const other: any;
    // Original Name: m
    export class Layer_IO extends import("99338").Entity_IO {
        load(module: any, exports: any, require: any, i: any): any;
    }
    export const floorSlabs: any;
    export const ceilingSlabs: any;
    export const __prev: any;
    export const __next: any;
    export const __height: any;
    export const __slabThickness: any;
    export const slabThickness: any;
    export const displayName: any;
    // Original Name: y
    export class Layer extends import("99338").Entity {
        constructor(module: any, ...args: any[]);
        create(module: any): any;
        getThickness(): any;
        getHeight(): any;
        verify(): any;
        _verifyChildren(): any;
        getPrev(): any;
        setPrev(module: any): any;
        _onPrevChanged(module: any, exports: any): any;
        getNext(): any;
        setNext(module: any): any;
        _onNextChanged(module: any, exports: any): any;
        _updateChildrenMap(module: any, exports: any): any;
        getSlabType(module: any): any;
        getSlabs(module: any): any;
        _getSlabs(module: any): any;
        setSlabs(module: any, exports: any): any;
        _setSlabsObj(module: any, exports: any): any;
        _setSlabs(module: any, exports: any): any;
        isFloorSlab(module: any): any;
        isCeilingSlab(module: any): any;
        setFloorSlabs(module: any): any;
        setCeilingSlabs(module: any): any;
        onChildAdded(module: any): any;
        onChildRemoved(module: any, exports: any): any;
        findWall(module: any, exports: any): any;
        forEachPoint(module: any, exports: any): any;
        forEachFloorSlab(module: any, exports: any): any;
        forEachCeilingSlab(module: any, exports: any): any;
        forEachFloor(module: any, exports: any): any;
        _forEachEntity(module: any, exports: any, require: any): any;
        forEachRoom(module: any, exports: any): any;
        findSlab(module: any, exports: any): any;
        destroy(): any;
        getIO(): any;
        isValid(): any;
        removeAllChildrenByTypes(module: any): any;
        forEachSlab(module: any, exports: any): any;
        forEachWall(module: any, exports: any): any;
        forEachOpening(module: any, exports: any): any;
    }
    export const __floorSlabs: any;
    export const __ceilingSlabs: any;
    export const signalSlabThicknessChanged: any;
    export const childrenMap: any;
    export const prev: any;
    export const next: any;
}

declare module "4676" {
    export const unshift: any;
}

declare module "46973" {
    export const NCPBackgroundWallBase: any;
    export const NCPBackgroundWallBase_IO: any;
    export const onParamsChangedCallback: any;
    // Original Name: v
    export class NCPBackgroundWallBase_IO extends import("78283").NCustomizedParametricModel_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const useMinMax: any;
    export const parameters: any;
    export const propertyRecord: any;
    // Original Name: b
    export class NCPBackgroundWallBase extends import("78283").NCustomizedParametricModel {
        constructor(module: any, exports: any, ...args: any[]);
        initByMeta(module: any, exports: any, require: any): any;
        initBySize(): any;
        initBackgroundWall(module: any, exports: any, require: any): any;
        initModelDocument(module: any, exports: any, require: any): any;
        initBackgroundWallDocument(module: any, exports: any, require: any): any;
        openDocument(module: any, exports: any): any;
        getDocFile(): any;
        generateChildren(module: any, exports: any): any;
        generateSubpart(module: any, exports: any): any;
    }
    export const dependentSeekIds: any;
    export const _dirtyClip: any;
    export const _signalHook: any;
    export const parametricMeta: any;
    export const targetFaceInfo: any;
    export const roomHeight: any;
    export const uuid: any;
    export const roomLoop: any;
    export const eId: any;
    export const data: any;
    export const contentType: any;
    export const isSourceModel: any;
    export const length: any;
    export const uId: any;
    export const srcModel: any;
    export const srcId: any;
    export const splitPlanes: any;
    export const _graphicsData: any;
    export const getGraphicsData: any;
    export const unioned: any;
    export const contours: any;
    export const faces: any;
    export const edges: any;
    export const z: any;
    export const x: any;
    export const wdh: any;
    export const YSize: any;
    export const XSize: any;
    export const newOuter: any;
    export const D: any;
    export const y: any;
    export const XScale: any;
    export const ZScale: any;
    export const YScale: any;
    export const XLength: any;
    export const W: any;
    export const ZLength: any;
    export const H: any;
    export const YLength: any;
    export const rotation: any;
    export const outline: any;
    export const topProjection: any;
    export const frontProjection: any;
    export const distanceWithDirection: any;
    export const distance: any;
    export const paths: any;
    export const _clipTask: any;
    export const snappedInfo: any;
    export const type: any;
    export const ZRotation: any;
}

declare module "46976" {
    export const for: any;
    export const exports: any;
}

declare module "47068" {
    export const exports: any;
}

declare module "470769" {
    export enum CustomizationContentType {
    }
    export enum ParametricDoorWindowSystemVariablesName {
    }
    export const g: any;
    export const Config: any;
    export const GraphicsObjectType: any;
    export const TemplateRenderBinding: any;
    export const RenderTemplate: any;
    export const RenderType: any;
    export const TEMPLATE_EMPTY_SET: any;
    export const EMPTY_TEMPLATE: any;
    export const TEMPLATE_NAME_V3: any;
    export const TEMPLATE_V3_SET: any;
    export const TEMPERATURE_NAME: any;
    export const IMAGE: any;
    export const PANORAMA: any;
    export const AERIAL: any;
    export const TOPVIEW: any;
    export const VIDEO: any;
    export const Common: any;
    export const AerialAndTopview: any;
    export const exports: any;
    export const ClassSNameToLName: any;
    export const ClassLNameToSName: any;
    export const ModelClass: any;
    export const Constants: any;
    export const ColorModeEnum: any;
    export const texture: any;
    export const color: any;
    export const blend: any;
    export const REALISTIC_DECORATE_SPOT_INTENSITY: any;
    export const REALISTIC_SPOT_TEMPERATURE: any;
    export const REALISTIC_SPOT_INTENSITY: any;
    export const CHILLY_3_SPOT_TEMPERATURE: any;
    export const CHILLY_3_SPOT_INTENSITY: any;
    export const NATURE_3_SPOT_TEMPERATURE: any;
    export const NATURE_3_DECORATE_SPOT_INTENSITY: any;
    export const NATURE_3_SPOT_INTENSITY: any;
    export const NIGHT_SPOT_TEMPERATURE: any;
    export const NIGHT_SPOT_INTENSITY: any;
    export const SAFE_HEIGHT_SCALE: any;
    export const DESK_LIGHTING_CONTENT_TYPES: any;
    export const CELLING_LIGHTING_WITHOUT_DOWNLIGHT_CONTENT_TYPES: any;
    export const CELLING_LIGHTING_CONTENT_TYPES: any;
    export const FILL_LIGHT_NUM_7: any;
    export const FILL_LIGHT_NUM_6: any;
    export const FILL_LIGHT_NUM_5: any;
    export const FILL_LIGHT_NUM_4: any;
    export const FILL_LIGHT_NUM_3: any;
    export const FILL_LIGHT_NUM_2: any;
    export const FILL_LIGHT_NUM_1: any;
    export const SPOT_LIGHT_NUM_15: any;
    export const SPOT_LIGHT_NUM_14: any;
    export const SPOT_LIGHT_NUM_13: any;
    export const SPOT_LIGHT_NUM_12: any;
    export const SPOT_LIGHT_NUM_11: any;
    export const SPOT_LIGHT_NUM_10: any;
    export const SPOT_LIGHT_NUM_9: any;
    export const SPOT_LIGHT_NUM_8: any;
    export const SPOT_LIGHT_NUM_7: any;
    export const SPOT_LIGHT_NUM_6: any;
    export const SPOT_LIGHT_NUM_5: any;
    export const SPOT_LIGHT_NUM_4: any;
    export const SPOT_LIGHT_NUM_3: any;
    export const SPOT_LIGHT_NUM_2: any;
    export const SPOT_LIGHT_NUM_1: any;
    export const Position: any;
    export const Resources: any;
    export const RenderLight: any;
    export const Render: any;
    export const RequestType: any;
    export const FunctionCabinet: any;
    export const SlidingDoorSideBoard: any;
    export const SideDecoration: any;
    export const Drawer_Fascias: any;
    export const Cooktop: any;
    export const Refrigerator: any;
    export const EmbeddedLight: any;
    export const Countertop: any;
    export const NoDripEdge: any;
    export const Backsplash: any;
    export const CabLightStrip: any;
    export const Hinge: any;
    export const WBTopLine: any;
    export const WBToeKick: any;
    export const WBWaistLine: any;
    export const WBFrame: any;
    export const WBDecoration: any;
    export const ParametricModel: any;
    export const ThreeDModel: any;
    export const Other: any;
    export const Group: any;
    export const TopLayer: any;
    export const Function: any;
    export const Component: any;
    export const Appendix: any;
    export const EmbeddedElectronics: any;
    export const Hardware: any;
    export const Hardware_Small: any;
    export const Hardware_Function: any;
    export const BoardBase: any;
    export const CustomDoorsAndWindows: any;
    export const Func_ClothesRail: any;
    export const Func_HorizontalBoard: any;
    export const Func_VerticalBoard: any;
    export const Func_BackBoard: any;
    export const Ornament: any;
    export const Func_Unkown: any;
    export const ProtectWallBoard: any;
    export const Func_Drawer: any;
    export const Func_Drawer_Outer: any;
    export const Func_Drawer_Inner: any;
    export const Func_Drawer_Box: any;
    export const Func_Drawer_Face: any;
    export const Wardrobe: any;
    export const Cupboard: any;
    export const BathroomCabinet: any;
    export const SystemCabinet: any;
    export const Handle: any;
    export const Hardware_Tail: any;
    export const RoomDoor: any;
    export const CabinetDoor: any;
    export const RoomWindow: any;
    export const Tatami: any;
    export const VentilationWallAttached: any;
    export const VentilationCeilingAttached: any;
    export const VentilationBottomAttached: any;
    export const EmbeddedSterilizationCabinet: any;
    export const EmbeddedDishwasher: any;
    export const EmbeddedOven: any;
    export const EmbeddedSteamingoven: any;
    export const CommonBoard: any;
    export const CutBoard: any;
    export const MoveBoard: any;
    export const GlassBoard: any;
    export const VerticalBoard: any;
    export const WallCabinet: any;
    export const FloorCabinet: any;
    export const HightCabinet: any;
    export const HalfHightCabinet: any;
    export const UpCabinet: any;
    export const CabinetSkirting: any;
    export const DoorLeftHand: any;
    export const DoorRightHand: any;
    export const Wardrobe_WallCabinet: any;
    export const Wardrobe_UpCabinet: any;
    export const Wardrobe_DownCabinet: any;
    export const Wardrobe_Fundation: any;
    export const Cupboard_FloorCabinet: any;
    export const Cupboard_WallCabinet: any;
    export const Cupboard_OnStageCabinet: any;
    export const Cupboard_HightCabinet: any;
    export const Cupboard_HalfHightCabinet: any;
    export const Cupboard_WallMountedSystem: any;
    export const BathroomCabinet_GroundFloorCabine: any;
    export const BathroomCabinet_WallFloorCabinet: any;
    export const BathroomCabinet_MirrorCabinet: any;
    export const SystemCabinet_Tatami: any;
    export const SystemCabinet_DeskCabinet: any;
    export const SystemCabinet_DressingTableCabinet: any;
    export const SystemCabinet_FoldingDesk: any;
    export const SystemCabinet_HouseHoldCabinet: any;
    export const SystemCabinet_BetweenHallCabinet: any;
    export const SystemCabinet_TVStandCabinet: any;
    export const SystemCabinet_Cellarette: any;
    export const SystemCabinet_BalconyCabinet: any;
    export const SystemCabinet_BayCabinet: any;
    export const Rail: any;
    export const SlidingDoor: any;
    export const EmbeddedSlidingDoor: any;
    export const ExternalSlidingDoor: any;
    export const SlidingDoorLeaf: any;
    export const SideHungDoor: any;
    export const TatamiDoor: any;
    export const WBConcaveCorner: any;
    export const WBExporsedCorner: any;
    export const FrontCloseBoardWithFrame: any;
    export const TopCloseBoardBetweenTwo: any;
    export const UpCloseBoard: any;
    export const TopCloseBoard: any;
    export const CeilingCloseBoard: any;
    export const FrontCloseBoard: any;
    export const RoomSingleSideHungDoor: any;
    export const RoomDoubleSideHungDoor: any;
    export const RoomParentChildDoor: any;
    export const RoomSlidingDoor: any;
    export const RoomDoorPocket: any;
    export const KitchenWaterCabinet: any;
    export const ShowerRoomWaterCabinet: any;
    export const HoodTopCabinet: any;
    export const CookTopFloorCabinet: any;
    export const EmbeddedElectronicsCabinet: any;
    export const BackBoard: any;
    export const BackgroundBoard: any;
    export const StorageBoard: any;
    export const CeilingOrnament: any;
    export const WallOrnament: any;
    export const AboveOrnament: any;
    export const Sink: any;
    export const TopLine: any;
    export const Skirting: any;
    export const LightLine: any;
    export const ShowerRoom: any;
    export const CountertopWaterStopper: any;
    export const CountertopEdge: any;
    export const FasciaBoard: any;
    export const Normal: any;
    export const CupboardCabinetFloor: any;
    export const CupboardCabinetUpper: any;
    export const CupboardCabinetWall: any;
    export const WardrobeCabinetFloor: any;
    export const WardrobeCabinetUpper: any;
    export const WardrobeCabinetSlidingDoorFrame: any;
    export const SystemCabinetFloor: any;
    export const SystemCabinetUpper: any;
    export const SystemCabinetWall: any;
    export const SingleDoorWidth: any;
    export const SingleDoorDepth: any;
    export const SingleDoorHeight: any;
    export const SingleDoorMaterial: any;
    export const SingleDoorLeftRightDoorOpenDirection: any;
    export const SingleDoorInsideOutsideDoorOpenDirection: any;
    export const SingleDoorGroundClearance: any;
    export const OrdinaryWindowWidth: any;
    export const OrdinaryWindowDepth: any;
    export const Indent: any;
    export const OrdinaryWindowHeight: any;
    export const OrdinaryWindowMaterial: any;
    export const OrdinaryWindowGroundClearance: any;
    export const BayWindowWidth: any;
    export const BayWindowDepth: any;
    export const BayWindowHeight: any;
    export const BayWindowMaterial: any;
    export const BayWindowGroundClearance: any;
    export const FloorBasedWindowWidth: any;
    export const FloorBasedWindowDepth: any;
    export const FloorBasedWindowHeight: any;
    export const FloorBasedWindowMaterial: any;
    export const FloorBasedWindowGroundClearance: any;
    export const CornerWindowLeftWidth: any;
    export const CornerWindowRightWidth: any;
    export const CornerWindowLeftDepth: any;
    export const CornerWindowRightDepth: any;
    export const CornerWindowHeight: any;
    export const CornerWindowMaterial: any;
    export const CornerWindowGroundClearance: any;
    export const CornerBayWindowLeftWidth: any;
    export const CornerBayWindowRightWidth: any;
    export const CornerBayWindowLeftDepth: any;
    export const CornerBayWindowRightDepth: any;
    export const CornerBayWindowHeight: any;
    export const CornerBayWindowMaterial: any;
    export const CornerBayWindowGroundClearance: any;
    export const InnerBayWindowWidth: any;
    export const InnerBayWindowDepth: any;
    export const InnerBayWindowHeight: any;
    export const InnerBayWindowMaterial: any;
    export const InnerBayWindowGroundClearance: any;
    export const SpecialShapedInnerBayWindowWidth: any;
    export const SpecialShapedInnerBayWindowLeftDepth: any;
    export const SpecialShapedInnerBayWindowRightDepth: any;
    export const SpecialShapedInnerBayWindowHeight: any;
    export const SpecialShapedInnerBayWindowMaterial: any;
    export const SpecialShapedInnerBayWindowGroundClearance: any;
    export const CurvedBayWindowWidth: any;
    export const CurvedBayWindowDepth: any;
    export const CurvedBayWindowHeight: any;
    export const CurvedBayWindowMaterial: any;
    export const CurvedBayWindowGroundClearance: any;
    export const CurvedBayWindowChordHeight: any;
    export const DoorWindowWidth: any;
    export const DoorWindowDepth: any;
    export const DoorWindowHeight: any;
    export const DoorWindowMaterial: any;
    export const DoorWindowGroundClearance: any;
    export const DoorWindowLeftRightDoorOpenDirection: any;
    export const SpecialShapedWindowWidth: any;
    export const SpecialShapedWindowDepth: any;
    export const SpecialShapedWindowHeight: any;
    export const SpecialShapedWindowMaterial: any;
    export const SpecialShapedWindowGroundClearance: any;
    export const CurvedWindowSashWidth: any;
    export const CurvedWindowSashDepth: any;
    export const CurvedWindowSashHeight: any;
    export const CurvedWindowSashMaterial: any;
    export const CurvedWindowSashChordHeight: any;
    export const StraightWindowSashWidth: any;
    export const StraightWindowSashDepth: any;
    export const StraightWindowSashHeight: any;
    export const StraightWindowSashMaterial: any;
    export const LShapedWindowSashLeftWidth: any;
    export const LShapedWindowSashRightWidth: any;
    export const LShapedWindowSashLeftDepth: any;
    export const LShapedWindowSashRightDepth: any;
    export const LShapedWindowSashHeight: any;
    export const LShapedWindowSashMaterial: any;
    export const LShapedWindowSashAngle: any;
    export const UShapedWindowSashWidth: any;
    export const UShapedWindowSashLeftWidth: any;
    export const UShapedWindowSashRightWidth: any;
    export const UShapedWindowSashDepth: any;
    export const UShapedWindowSashLeftDepth: any;
    export const UShapedWindowSashRightDepth: any;
    export const UShapedWindowSashHeight: any;
    export const UShapedWindowSashMaterial: any;
    export const UShapedWindowSashLeftAngle: any;
    export const UShapedWindowSashRightAngle: any;
    export const PolygonalWindowSashLeftWidth: any;
    export const PolygonalWindowSashRightWidth: any;
    export const PolygonalWindowSashWidth1: any;
    export const PolygonalWindowSashWidth2: any;
    export const PolygonalWindowSashLeftDepth: any;
    export const PolygonalWindowSashRightDepth: any;
    export const PolygonalWindowSashDepth1: any;
    export const PolygonalWindowSashDepth2: any;
    export const PolygonalWindowSashHeight: any;
    export const PolygonalWindowSashMaterial: any;
    export const PolygonalWindowSashLeftAngle: any;
    export const PolygonalWindowSashRightAngle: any;
    export const PolygonalWindowSashAngle: any;
    export const writable: any;
}

declare module "4718" {
    export const MixPaintCache: any;
    export const _mixPaintCache: any;
    export const _lastClearTime: any;
}

declare module "47195" {
    export const MaterialData: any;
    // Original Name: g
    export class MaterialData {
        constructor(module: any, ...args: any[]);
        create(module: any): any;
        _setMetadata(module: any): any;
        suppressSignal(): any;
        unsuppressSignal(): any;
        _updateField(module: any, exports: any, require: any, i: any, n: any): any;
        _dispatchValueChanging(module: any, exports: any, require: any, i: any): any;
        _dispatchValueChanged(module: any, exports: any, require: any, i: any): any;
        _bindChildMaterial(module: any, exports: any): any;
        _unbindChildMaterial(module: any): any;
        bindOwnerObject(module: any, exports: any, require: any): any;
        unbindOwnerObject(module: any): any;
        setMaterialData(module: any): any;
        copyFrom(module: any): any;
        reset(): any;
        toMaterialObj(): any;
        fromMaterialObj(module: any): any;
        toJSON(): any;
        toJson(): any;
        clone(module: any): any;
        equals(module: any): any;
        destroy(): any;
        dump(module: any): any;
        c(this: any, __userDefined: any): any;
    }
    export const _suppressSignal: any;
    export const _disposed: any;
    export const id: any;
    export const signalValueChanging: any;
    export const signalValueChanged: any;
    export const _signalHook: any;
    export const __metadata: any;
    export const seekId: any;
    export const __seekId: any;
    export const metadata: any;
    export const length: any;
    export const blend: any;
    export const blendColor: any;
    export const __seamMaterial: any;
    export const textureURI: any;
    export const textureURIDefault: any;
    export const color: any;
    export const name: any;
    export const __categoryId: any;
    export const __tileSize_x: any;
    export const __tileSize_y: any;
    export const initTileSize_x: any;
    export const initTileSize_y: any;
    export const __offsetX: any;
    export const __offsetY: any;
    export const __rotation: any;
    export const __textureRotation: any;
    export const __normalTexture: any;
    export const __normalTileSize_x: any;
    export const __normalTileSize_y: any;
    export const __flipX: any;
    export const __flipY: any;
    export const __seamFillerSupported: any;
    export const __seamColor: any;
    export const __seamWidth: any;
    export const __blendColor: any;
    export const __colorMode: any;
    export const __defaultoffsetX: any;
    export const __defaultoffsetY: any;
    export const __refSeekId: any;
    export const __parentSeekId: any;
    export const __paintData: any;
    export const __userDefined: any;
    export const __iconSmallURI: any;
    export const __isCustomized: any;
    export const __customizedTextureURI: any;
    export const tileSize_x: any;
    export const tileSize_y: any;
    export const iconSmallURI: any;
    export const __name: any;
    export const __textureURI: any;
    export const __textureURIDefault: any;
    export const __color: any;
    export const __initTileSize_x: any;
    export const __initTileSize_y: any;
    export const colorMode: any;
    export const offsetX: any;
    export const offsetY: any;
    export const rotation: any;
    export const flipX: any;
    export const flipY: any;
    export const normalParams: any;
    export const normalTexture: any;
    export const normalTileSize_x: any;
    export const normalTileSize_y: any;
    export const fit: any;
    export const userDefined: any;
    export const notExtendImageToFitFace: any;
    export const categoryId: any;
    export const textureRotation: any;
    export const seamFillerSupported: any;
    export const seamColor: any;
    export const seamWidth: any;
    export const defaultoffsetX: any;
    export const defaultoffsetY: any;
    export const refSeekId: any;
    export const parentSeekId: any;
    export const seamMaterial: any;
    export const paintData: any;
    export const isCustomized: any;
    export const customizedTextureURI: any;
    export const isTransparent: any;
    export const seamMatId: any;
    export const materialsData: any;
    export const materialIdGenerator: any;
    export const materials: any;
    export const Class: any;
}

declare module "4720" {
    export const DHoleProvider: any;
    // Original Name: n
    export class DHoleProvider extends import("67629").IDataProvider {
        constructor(module: any, ...args: any[]);
        getFacePath(module: any, exports: any): any;
        _convertToWorldSpace(module: any): any;
    }
    export const _entity: any;
}

declare module "47264" {
    export const length: any;
    export const Floor_IO: any;
    export const RoomSurfaceTypeEnum: any;
    export const RoomFlagEnum: any;
    export const Floor: any;
    export const ceilingOff: any;
    export const hoverOn: any;
    export const clickOn: any;
    export const dimensionOff: any;
    export const roomtypeOff: any;
    export const floor: any;
    export const ceiling: any;
    // Original Name: h
    export class Floor_IO extends import("82625").Face_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
        migrateLoad(module: any, exports: any, require: any): any;
    }
    export const roomType: any;
    export const roomTypeDisplayName: any;
    export const data: any;
    export const generated: any;
    export const seekId: any;
    export const __roomType: any;
    export const __roomTypeDisplayName: any;
    // Original Name: u
    export class Floor extends import("82625").Face {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any, exports: any, require: any, i: any): any;
        getIO(): any;
        forEachWall(module: any, exports: any): any;
        forEachSurface(module: any, exports: any): any;
        forEachStructureFace(module: any, exports: any): any;
    }
}

declare module "47324" {
    export const Sketch2BrepHelper: any;
    // Original Name: f
    export class Sketch2BrepHelper {
        generateBrep(module: any, exports: any): any;
        calcSketchBrepMp(module: any, exports: any): any;
        matchFace(module: any, exports: any): any;
        else: any;
        for(: any, exports: any, of: any, i: any): any;
        constructor(...args: any[]);
    }
    export const userData: any;
    export const id: any;
    export const length: any;
    export const value: any;
    export const errorStr: any;
    export const x: any;
    export const y: any;
    export const ONEDGE: any;
    export const type: any;
    export const _instance: any;
}

declare module "47341" {
    export const isAlloyDoorWindow: any;
    export const getDHolesOfDModel: any;
    export const isFlagOnTraceComponentParents: any;
    export const isFlagOnTraceParents: any;
    export const isDModel: any;
    export const ProfileUtil: any;
    export const BoundUtil: any;
}

declare module "47391" {
    export const DContent: any;
    // Original Name: c
    export class DContent extends import("50265").Content {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        toGraphicsData(): any;
        resizeMaterial(module: any): any;
        onUpdatePosition(): any;
        updateWorldMatrix(module: any): any;
        handleContentGraphicsData(module: any, exports: any): any;
    }
    export const needClip: any;
    export const clipper: any;
    export const forEachChild: any;
    export const bounding: any;
    export const textureType: any;
    export const stretch: any;
    export const tileSize_x: any;
    export const tileSize_y: any;
    export const _matrixLocal: any;
    export const matrix: any;
    export const _matrixWorld: any;
    export const needUpdateMatrix: any;
    export const clipMeshes: any;
    export const parent: any;
    export const meshKey: any;
    export const length: any;
    export const clipInfo: any;
    export const z: any;
    export const ZLength: any;
    export const x: any;
    export const y: any;
    export const startCutPolygons: any;
    export const XLength: any;
    export const entity: any;
    export const textureRotation: any;
    export const rotation: any;
}

declare module "47414" {
    export const length: any;
    export const WaterJetTile: any;
    export const WaterJetTile_IO: any;
    // Original Name: c
    export class WaterJetTile_IO extends import("20551").Content_IO {
        instance(): any;
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const _WaterJetTile_IO_instance: any;
    export const position: any;
    export const material: any;
    export const templateInfo: any;
    export const __opacityMaskImage: any;
    export const opacityMaskImage: any;
    export const __position: any;
    export const __material: any;
    export const seamColor: any;
    export const seamWidth: any;
    export const __templateData: any;
    export const __x: any;
    export const __y: any;
    export const __z: any;
    // Original Name: d
    export class WaterJetTile extends import("20551").Content {
        constructor(module: any, exports: any, ...args: any[]);
        create_(module: any, exports: any, require: any): any;
        setDefaultSize(): any;
        hasOpacityMaskImage(): any;
        getOverriddenTemplateInfo(): any;
        restoreTemplateData(module: any): any;
        getIO(): any;
        migrateContentMetaData(module: any): any;
        getMetadataFilterKeys(): any;
        clone(): any;
        _getClonedProperties(module: any): any;
        getClonedDumpData(): any;
        updateTemplateData(module: any, exports: any): any;
        _onTemplateDataChanged(): any;
        _parseOuterFaces(): any;
        getInnerFaces(): any;
        _parseInnerFaces(): any;
        getOuterPaths(): any;
        getOuterPoints(): any;
        _calculateOuterPoints(): any;
        getInternalBound(): any;
        _calculateInternalBound(): any;
        getLocalMatrix(): any;
        getPavingOption(): any;
        resize(module: any, exports: any, require: any): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        __updateMaterial(): any;
        destroy(): any;
    }
    export const __ZLength: any;
    export const __outerFaces: any;
    export const __innerFaces: any;
    export const __innerFacesDirty: any;
    export const __outerPoints: any;
    export const __outerPointsDirty: any;
    export const __internalBound: any;
    export const metadata: any;
    export const __isScalable: any;
    export const XScale: any;
    export const YScale: any;
    export const ZRotation: any;
    export const textureURI: any;
    export const params: any;
    export const flipX: any;
    export const materials: any;
    export const seamInfo: any;
    export const templateData: any;
    export const path: any;
    export const XLength: any;
    export const YLength: any;
    export const seekId: any;
    export const tileSize_x: any;
    export const tileSize_y: any;
    export const _host: any;
    export const _disposed: any;
    export const create: any;
}

declare module "47636" {
    export const PositionConstraint: any;
    // Original Name: n
    export class PositionConstraint extends import("48855").Constraint {
        constructor(module: any, ...args: any[]);
        init(module: any, exports: any): any;
        compute(): any;
        dump(module: any): any;
        load(module: any, exports: any): any;
        verify(): any;
        verifyBeforeDump(): any;
    }
    export const Class: any;
    export const computeChain: any;
    export const localId: any;
    export const type: any;
    export const states: any;
    export const output: any;
    export const value: any;
}

declare module "47730" {
    export const exports: any;
}

declare module "47816" {
    export const isPolygon2dDumpDataArray: any;
    export const isPolygon2dDumpData: any;
    export const Polygon2d: any;
    // Original Name: r
    export class Polygon2d {
        constructor(...args: any[]);
        create(module: any): any;
        assign(module: any): any;
        load(module: any): any;
        dump(): any;
        clone(): any;
        setFromDiscretePolygon(module: any): any;
        toDiscretePolygon(module: any): any;
        isPointInside(module: any, exports: any, require: any): any;
        isPointOnOutline(module: any, exports: any): any;
        isSamePolygon2d(module: any, exports: any): any;
        assignArray(module: any, exports: any): any;
        loadArray(module: any, exports: any): any;
    }
    export const outer: any;
    export const holes: any;
    export const x: any;
}

declare module "47847" {
    export const GussetSurface: any;
    // Original Name: u
    export class GussetSurface extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        destroy(): any;
        needDump(): any;
        canTransact(): any;
        onFaceEntityDirty(module: any): any;
        _onFaceEntityFieldChanged(module: any): any;
        _onFaceEntityFlagChanged(module: any): any;
        isValid(): any;
        equalsSurface(module: any, exports: any): any;
        equalsMixPaint(module: any): any;
        getMixPaint(module: any, exports: any): any;
        findHost(module: any): any;
        _computeBrickPositions(module: any, exports: any, require: any): any;
        update(): any;
    }
    export const unselectable: any;
    export const _faceEntity: any;
    export const _faceId: any;
    export const _isCustomizedModel: any;
    export const _modelInstanceMap: any;
    export const _signalHook: any;
    export const _disposed: any;
    export const hidden: any;
    export const faceGroupId: any;
    export const holes: any;
    export const length: any;
    export const pavingOption: any;
    export const x: any;
    export const y: any;
    export const _faceMatrix: any;
    export const faceId: any;
    export const id: any;
    export const positionDirty: any;
    export const needUpdateMatrix: any;
}

declare module "48056" {
    export const at: any;
}

declare module "48146" {
    export const length: any;
    export const PhysicalLight_IO: any;
    export const PhysicalLight: any;
    // Original Name: l
    export class PhysicalLight_IO extends import("3577").Light_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const name: any;
    export const contentID: any;
    export const topView: any;
    export const __contentID: any;
    export const __topView: any;
    // Original Name: c
    export class PhysicalLight extends import("3577").Light {
        constructor(module: any, exports: any, ...args: any[]);
        create(): any;
        isVirtual(): any;
        hasAreaSize(): any;
        reset(): any;
        getIO(): any;
        refreshBoundInternal(): any;
        getRenderParameters(): any;
        getBoundingData(): any;
    }
    export const type: any;
    export const temperature: any;
    export const intensity: any;
    export const entityId: any;
    export const close: any;
    export const rgb: any;
    export const affectSpecular: any;
    export const intensityScale: any;
}

declare module "482" {
    export const length: any;
    export const Face2d: any;
    export const Face2d_IO: any;
    // Original Name: l
    export class Face2d_IO extends import("24567").Entity_IO {
        instance(): any;
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const _Face2d_IO_instance: any;
    export const __outerLoop: any;
    export const outerLoop: any;
    export const __innerLoops: any;
    export const innerLoops: any;
    // Original Name: c
    export class Face2d extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        init(module: any, exports: any): any;
        getIO(): any;
        setOuterLoop(module: any): any;
        onChildDirty(module: any, exports: any): any;
        setInnerLoops(module: any): any;
        getPath(): any;
        getWires(): any;
        getAllPoints(): any;
        getAllCurves(): any;
        bounding(): any;
        getBounding(): any;
        refreshBoundInternal(): any;
        isPointInside(module: any): any;
        hasBackgroundPoint(): any;
        hasBackgroundCurve(): any;
        isBackground(): any;
        isOuterLoopContainsCircle(): any;
        isOuterLoopContainsCircleArc(): any;
        clone(): any;
        verify(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
    }
    export const type: any;
    export const Geometry: any;
    export const left: any;
    export const top: any;
    export const boundInternal: any;
}

declare module "48217" {
    export const JointUtil: any;
    // Original Name: c
    export class JointUtil {
        createDIYJoints(module: any, exports: any): any;
        createDIYJoint(module: any): any;
        _convertDIYTypeToXTypeJoints(module: any): any;
        convertDIYTypeToXTypeJoints(module: any): any;
        convertJointShape(module: any, exports: any, require: any): any;
        convertToLShape(module: any, exports: any, require: any): any;
        convertToTShape(module: any, exports: any): any;
        convertLShapeToTShape(module: any, exports: any): any;
        convertTShapeToLShape(module: any, exports: any, require: any, n: any): any;
        convertTangentShapeToLShape(module: any, exports: any, require: any): any;
        convertLShapeToTangentShape(module: any, exports: any): any;
        convertLShapeToLShape(module: any, exports: any): any;
        _convertLShapeToLShape(module: any, exports: any): any;
        _convertTangentShapeToLShape(module: any, exports: any): any;
        _convertLShapeToTangentShape(module: any): any;
        _convertLShapeToTShape(module: any, exports: any, require: any): any;
        _convertTShapeToLShape(module: any, exports: any, require: any): any;
        convertLTypeToBetweenTType(module: any, exports: any, require: any): any;
        convertEndTTypeToBetweenTType(module: any, exports: any, require: any): any;
        convertBetweenTTypeToLType(module: any, exports: any, require: any): any;
        convertBetweenTTypeToEndTType(module: any, exports: any, require: any): any;
        convertEndTTypeToLType(module: any, exports: any): any;
        convertTangentTypeToLType(module: any, exports: any): any;
        convertLTypeToTangentType(module: any): any;
        isFromPointType(module: any): any;
        isToPointType(module: any): any;
        getEndPointType(module: any): any;
        isLShapedJoint(module: any): any;
        isTShapedJoint(module: any): any;
        isLShapedTJoint(module: any): any;
        getSubjectWallInfo(module: any): any;
        getPointLinkedJoints(module: any, exports: any): any;
        getPointLinkedWalls(module: any, exports: any): any;
        getJointPoint(module: any, exports: any, require: any, n: any): any;
        convertLUncrossToLCross(module: any): any;
        convertLCrossToLUncross(module: any): any;
        convertTUncrossToTCross(module: any): any;
        convertTCrossToTUncross(module: any): any;
        convertCrossToUncross(module: any): any;
        convertUnCrossToCross(module: any): any;
        getWallInfo(module: any): any;
        getDefaultLType(): any;
        getLType(module: any): any;
        getDefaultTType(): any;
        getTType(module: any): any;
        isLType(module: any): any;
        isTType(module: any): any;
        covertJointsForArcSwitch(module: any): any;
        isValidProcessJoint(module: any): any;
        constructor(...args: any[]);
    }
    export const tag: any;
    export const index: any;
    export const size: any;
    export const path: any;
    export const wallInfos: any;
    export const type: any;
    export const DIYJoint: any;
    export const XMiter: any;
    export const length: any;
    export const LCross: any;
    export const TCross: any;
    export const from: any;
    export const to: any;
}

declare module "48230" {
    // Original Name: n
    export class default extends import("42288").default {
        _compute(module: any, exports: any, require: any, i: any): any;
    }
    export const x: any;
    export const y: any;
    export const templateKey: any;
    export const REALISTIC: any;
    export const closestEdge: any;
    export const distance: any;
}

declare module "48234" {
    export const appendArray: any;
    export const isSameArray: any;
    export const resizeArray: any;
    export const length: any;
}

declare module "48584" {
    export enum EntityProxyTypeEnum {
    }
    export const EntityProxyFactory: any;
    export const EntityProxyObject: any;
    export const CustomizationProduct: any;
    export const CustomizedPMInstance: any;
    // Original Name: i
    export class EntityProxyFactory {
        registeProxyObject(e: any, t: any, o: any): any;
        getProxyObject(e: any): any;
        constructor(...args: any[]);
    }
    export const _proxyObjectById: any;
}

declare module "48711" {
    export const Session: any;
    export const _undoStack: any;
    export const _redoStack: any;
    export const _transMgr: any;
    export const _maxUndoStep: any;
    export const _toRequestFilter: any;
    export const _activeRequest: any;
    export const length: any;
    export const isCommitted: any;
}

declare module "48753" {
    export const WallTrimResolver: any;
    export const sourceWall: any;
    export const targetWall: any;
    export const sourcePoint: any;
    export const targetPoint: any;
    export const sourceGeom: any;
    export const targetGeom: any;
    export const sourceGeomNew: any;
    export const targetGeomNew: any;
    export const PI: any;
}

declare module "48755" {
    export const Position: any;
}

declare module "48855" {
    export const Constraint: any;
    // Original Name: r
    export class Constraint {
        constructor(module: any, ...args: any[]);
        init(module: any, exports: any): any;
        getClassName(): any;
        verify(): any;
        verifyBeforeDump(): any;
        dump(module: any): any;
        load(module: any, exports: any): any;
        compute(): any;
        destroy(): any;
        refresh(module: any): any;
        registerClass(module: any, exports: any): any;
        getClass(module: any): any;
        createFromDump(module: any, exports: any): any;
        dumpConstraint(module: any, exports: any): any;
        loadFromDump(module: any, exports: any): any;
        loadFromDumpById(module: any, exports: any): any;
        getExistingConstraint(module: any, exports: any): any;
    }
    export const Class: any;
    export const localId: any;
    export const type: any;
    export const inputs: any;
    export const outputs: any;
    export const id: any;
    export const _tag: any;
    export const constraintsData: any;
    export const constraintIdGenerator: any;
    export const l: any;
    export const constraints: any;
    export const _constructorByClassName: any;
}

declare module "48890" {
    export const SlabDataProvider: any;
    // Original Name: d
    export class SlabDataProvider extends import("67629").IDataProvider {
        constructor(module: any, ...args: any[]);
        clearCacheGeometryData(module: any): any;
        _validFaces(module: any): any;
        getFacePath(module: any): any;
        getFacesPath(module: any): any;
        _getHoles(): any;
        getFaceHoles(module: any): any;
        isLineOnProfileOuter(module: any, exports: any): any;
        getSideFaceGeometry(module: any): any;
        _getInnerProfile(): any;
        getFaceGeometry(module: any): any;
        _calcTopBottomFaceRawGeometry(module: any, exports: any): any;
        isValidFaceGeometry(module: any): any;
        _getTopBottomFaceRawGeometry(module: any, exports: any): any;
        _getTopBottomFaceGeometry(module: any, exports: any, require: any): any;
        getTopFaceGeometry(module: any): any;
        getBottomFaceGeometry(module: any): any;
        getCustomizedModelsOnFace(module: any): any;
    }
    export const _insideProfilePath: any;
    export const slab: any;
    export const topFaceGeometry: any;
    export const bottomFaceGeometry: any;
    export const thickness: any;
    export const x: any;
    export const y: any;
    export const bottom: any;
    export const length: any;
    export const z: any;
    export const surface: any;
    export const height3d: any;
    export const count: any;
    export const outer: any;
    export const holes: any;
    export const height: any;
    export const outdoorLayer: any;
}

declare module "48926" {
    export const PSlidingDoor: any;
    export const PSlidingDoor_IO: any;
    export class a extends import("69470").PAssembly_IO {
        dump(module: any, exports: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const length: any;
    export const hasLoadComplete: any;
    export class s extends import("69470").PAssembly {
        constructor(...args: any[]);
        create(module: any, exports: any): any;
        initByMeta(module: any, exports: any): any;
        getIO(): any;
        setMaterial(module: any): any;
        onLoftMetaChanged(module: any, exports: any, require: any, i: any): any;
        updateLoftStates(): any;
        setLoftMetas(module: any): any;
        setSelfLoftMetas(module: any): any;
        setChildrenLoftMetas(module: any): any;
        updateLoftStatesFromMetas(module: any): any;
        updateSelfLoftStatesFromMetas(module: any): any;
        updateChildrenLoftStatesFromMetas(module: any): any;
        updateUpTrackStatesFromMeta(module: any): any;
        updateDownTracksStatesFromMeta(module: any): any;
        getSlidingDoorLeafs(): any;
        getSegmentLofts(): any;
        getLoftsByContentType(module: any): any;
        getRelatedMetaDatas(): any;
        getMetadataFilterKeys(): any;
    }
    export const idsMap: any;
    export const __value: any;
    export const contentType: any;
}

declare module "48961" {
    export const length: any;
    export const ParametricModel_IO: any;
    export const ParametricModelType: any;
    export const ParametricModel: any;
    export const extrudedBody: any;
    export const window: any;
    export const windowFrame: any;
    export const wall: any;
    export const windowWall: any;
    export const windowSill: any;
    export const windowCeiling: any;
    export const windowHole: any;
    export const windowPocket: any;
    // Original Name: c
    export class ParametricModel_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const x: any;
    export const y: any;
    export const z: any;
    export const XRotation: any;
    export const YRotation: any;
    export const ZRotation: any;
    export const parameters: any;
    export const materialData: any;
    export const innerMaterialData: any;
    export const sideMaterialData: any;
    export const topMaterialData: any;
    export const bottomMaterialData: any;
    export const frame: any;
    export const _host: any;
    export const host: any;
    export const __x: any;
    export const __y: any;
    export const __z: any;
    export const __XRotation: any;
    export const __YRotation: any;
    export const __ZRotation: any;
    export const __parameters: any;
    // Original Name: d
    export class ParametricModel extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        initByParameters(module: any): any;
        getHost(): any;
        onParametersChanged(): any;
        assignTo(module: any): any;
        getMaterial(module: any): any;
        setMaterial(module: any, exports: any): any;