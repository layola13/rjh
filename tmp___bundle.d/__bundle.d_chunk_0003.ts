}

declare module "23668" {
    export const exports: any;
}

declare module "23741" {
    export const ConcealedWork: any;
    export const ConcealedWork_IO: any;
    // Original Name: g
    export class ConcealedWork_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    // Original Name: p
    export class ConcealedWork extends import("86829").ConcealedWorkCompEntity {
        getIO(): any;
        addPowerSys(powerSys: any): any;
        removePowerSys(powerSys: any): any;
        getPowerSys(id: any): any;
        addLightControlSys(lightControlSys: any): any;
        removeLightControlSys(lightControlSys: any): any;
        getTubeTreesByComp(componentType: any): any;
        addTubeTree(tubeTree: any): any;
        removeTubeTree(tubeTree: any): any;
        getTubeTree(id: any): any;
        addLightTree(lightTree: any): any;
        removeLightTree(lightTree: any): any;
        getLightTree(id: any): any;
        removeTree(tree: any): any;
    }
    export const length: any;
}

declare module "237698" {
    export const g: any;
    export const writable: any;
    export const exports: any;
}

declare module "2387" {
    export const PaintHandler: any;
    // Original Name: f
    export class PaintHandler {
        constructor(...args: any[]);
        setCustomGraphicsDataAsyncHandler(module: any): any;
        setCustomSurfaceGraphicsDataAsyncHandler(module: any): any;
        getGeometryDataFromMaterial(module: any, exports: any): any;
        _isFitFaceMaterial(module: any): any;
        getGraphicsDataFromPaintData(module: any, exports: any): any;
        getFaceGraphicsDataFromMaterial(module: any, exports: any, require: any): any;
        getFaceGraphicsDataFromMaterialAsync(module: any, exports: any, require: any): any;
        getSurfaceGraphicsDataFromMaterial(module: any, exports: any, require: any): any;
        getSurfaceGraphicsDataFromMaterialAsync(module: any, exports: any, require: any): any;
        convertSegmentMesh(module: any, exports: any): any;
        mergeMeshArray(module: any): any;
        getNormalGraphicsData(module: any, exports: any, require: any): any;
        mergeMeshDefs(module: any, exports: any): any;
        mergeGraphicData(module: any): any;
        getPaints(module: any): any;
        getBound(module: any): any;
        _freeBlocksClipNormalBlocks(module: any, exports: any): any;
        _regionClippedByBlocks(module: any, exports: any): any;
        _blocksClippedByRegion(module: any, exports: any, require: any): any;
        _getPaintData(module: any, exports: any, require: any, i: any, n: any): any;
        _getGridData(module: any, exports: any, require: any): any;
    }
    export const _mixPaintCache: any;
    export const _customGraphicsDataAsyncHandler: any;
    export const _customSurfaceGraphicsDataAsyncHandler: any;
    export const isBrick: any;
    export const x: any;
    export const y: any;
    export const path: any;
    export const innerPath: any;
    export const holes: any;
    export const length: any;
    export const matBound: any;
    export const left: any;
    export const top: any;
    export const outer: any;
    export const tileSize_x: any;
    export const tileSize_y: any;
    export const material: any;
    export const mixData: any;
    export const dataType: any;
    export const absoluteuv: any;
    export const faceIndices: any;
    export const vertexPositions: any;
    export const vertexNormals: any;
    export const vertexUVs: any;
    export const indices: any;
    export const bound: any;
    export const pavingOption: any;
    export const supportPolygon: any;
    export const grid: any;
    export const isFlatPaint: any;
    export const isDistrict: any;
    export const isRepeatPaint: any;
    export const const: any;
    export const : any;
    export const free: any;
    export const rotation: any;
    export const textureURI: any;
    export const useGeneratedMaterial: any;
    export const normalTexture: any;
    export const normalTileSize_x: any;
    export const normalTileSize_y: any;
    export const seamColor: any;
    export const seamWidth: any;
    export const seamMaterial: any;
    export const originalMaterial: any;
    export const isSeam: any;
    export const boundaries: any;
    export const offsetX: any;
    export const offsetY: any;
    export const patterns: any;
    export const freePolygons: any;
    export const gridPolygons: any;
    export const leftTop: any;
    export const groovingChamferHashCode: any;
    export const customizedTextureURI: any;
    export const brickData: any;
    export const paints: any;
    export const bottomFaceGeometries: any;
    export const data: any;
    export const type: any;
    export const paintData: any;
    export const userDefined: any;
    export const textureURIDefault: any;
    export const color: any;
    export const colorMode: any;
    export const bg: any;
}

declare module "23875" {
    export const ParametricContentSubpart: any;
    export const ParametricContentSubpart_IO: any;
    // Original Name: l
    export class ParametricContentSubpart_IO extends import("6087").ParametricContentBase_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const eId: any;
    // Original Name: c
    export class ParametricContentSubpart extends import("6087").ParametricContentBase {
        constructor(module: any, exports: any, ...args: any[]);
        getSDKData(module: any, exports: any, require: any, i: any): any;
        initModelDocument(module: any, exports: any, require: any): any;
        getOpenDocumentExtra(module: any, exports: any): any;
        isContentInRoom(module: any, exports: any): any;
        getEIdPath(): any;
        updateModelFromData(module: any, exports: any): any;
        updateSubpartMeta(module: any, exports: any): any;
        getFrontProjectionPlane(): any;
        getTopProjectionPlane(): any;
        updateSubpart(): any;
        getDocFile(): any;
        getIO(): any;
    }
    export const parent: any;
    export const systemParams: any;
    export const XLength: any;
    export const YLength: any;
    export const ZLength: any;
    export const XScale: any;
    export const YScale: any;
    export const ZScale: any;
    export const docFile: any;
    export const subpartMatrix: any;
    export const subpartParams: any;
    export const visible: any;
    export const hideFaces: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const XRotation: any;
    export const YRotation: any;
    export const ZRotation: any;
}

declare module "23895" {
    export const exec: any;
    export const test: any;
}

declare module "23964" {
    export const at: any;
}

declare module "2410" {
    export const PAssemblyRotation: any;
    export const length: any;
}

declare module "24187" {
    export const exports: any;
}

declare module "24194" {
    export const ContinuousCurve2d: any;
    export const ContinuousCurve3d: any;
    // Original Name: n
    export class ContinuousCurve3d extends import("55256").SmoothPoly3d {
        constructor(module: any, ...args: any[]);
        clone(): any;
        getCoedges(): any;
        isSeamDirection(module: any): any;
    }
    export const _coedges: any;
    export const _map: any;
    // Original Name: r
    export class ContinuousCurve2d extends import("55256").SmoothPoly2d {
        clone(): any;
        getSectorArea(): any;
    }
}

declare module "24200" {
    export const exports: any;
}

declare module "24292" {
    export const LayerInfo: any;
    export const FloorRoomInfo: any;
    export const WallLoopInfo: any;
    // Original Name: s
    export class WallLoopInfo extends import("40239").TgRoomInfo {
        constructor(module: any, exports: any, ...args: any[]);
    }
    export const _isolatedWallFaces: any;
    export const _wallsInRoomSide: any;
    // Original Name: l
    export class FloorRoomInfo extends import("40239").TgRoomInfo {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        getNextWallFace(module: any): any;
        getPrevWallFace(module: any): any;
    }
    export const floor: any;
    export const _ceilingFace: any;
    export const _interiorWalls: any;
    // Original Name: c
    export class LayerInfo extends import("93363").TgLayerInfo {
        init(): any;
        getFaceWallLoopInfo(module: any): any;
        getFloorRoomInfo(module: any): any;
        getCeilingRoomInfo(module: any): any;
        getFaceRoomInfo(module: any): any;
        getWallRoomsInfo(module: any): any;
    }
    export const _wallLoopInfos: any;
    export const _floorsFloorRoomInfo: any;
    export const _ceilingsFloorRoomInfo: any;
    export const ceilingFace: any;
}

declare module "24422" {
    export const UVCoordHelper: any;
    export const globalCoordinateSystem: any;
    export const customData: any;
    export const length: any;
    export const x: any;
    export const y: any;
    export const z: any;
}

declare module "24469" {
    export const PBox: any;
    export const PBox_IO: any;
    export class s extends import("67997").PModel_IO {
        dump(module: any, exports: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const length: any;
    export const XLength: any;
    export const YLength: any;
    export const ZLength: any;
    export const __XLength: any;
    export const __YLength: any;
    export const __ZLength: any;
    export class l extends import("67997").PModel {
        constructor(...args: any[]);
        create(module: any): any;
        forEachState(module: any): any;
        clone(): any;
        verify(): any;
        getIO(): any;
        isContentInRoom(module: any): any;
        isContentInLoop(module: any): any;
        refreshBoundInternal(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
    }
    export const localId: any;
    export const material: any;
    export const __value: any;
    export const x: any;
    export const y: any;
    export const z: any;
}

declare module "24567" {
    export const length: any;
    export const Entity: any;
    export const Entity_IO: any;
    export const EntityFlagEnum: any;
    // Original Name: f
    export class Entity_IO extends import("2558").IBase {
        setInternalFields(module: any): any;
        instance(): any;
        mustDeepClone(module: any): any;
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
        postLoad(module: any, exports: any): any;
        migrateLoad(module: any, exports: any, require: any): any;
    }
    export const _Entity_IO_instance: any;
    export const p: any;
    export const c: any;
    export const _flag: any;
    export const flag: any;
    export const userDefined: any;
    export const dumpedEntities: any;
    export const invalidIds: any;
    export const idGenerator: any;
    export const _parents: any;
    // Original Name: m
    export class Entity extends import("2558").IObject {
        constructor(module: any, exports: any, ...args: any[]);
        registerClass(module: any, exports: any): any;
        getClass(module: any): any;
        instanceOf(module: any): any;
        getClassName(): any;
        setIdByMigrate(module: any): any;
        refreshBoundInternal(): any;
        generateId(): any;
        setFlagOn(module: any, exports: any): any;
        setFlagOff(module: any, exports: any): any;
        _setFlag(module: any): any;
        destroy(): any;
        isRoot(): any;
        getRoot(): any;
        hasChild(module: any): any;
        hasParent(module: any): any;
        hasSingleParent(module: any): any;
        isOrphan(): any;
        getChildrenByType(module: any): any;
        restoreChildren(module: any, exports: any): any;
        restoreParents(module: any, exports: any): any;
        _addToParent(module: any): any;
        _removeFromParent(module: any, exports: any): any;
        _addParentReference(module: any): any;
        _removeParentReference(module: any, exports: any): any;
        addChild(module: any, exports: any): any;
        isValidChild(module: any): any;
        removeChild(module: any, exports: any, require: any, i: any): any;
        removeChildPlus(module: any, exports: any): any;
        removeAllChildren(module: any, exports: any, require: any): any;
        removeFromParent(module: any): any;
        remove(): any;
        replaceChildren(module: any, exports: any, require: any, i: any, n: any): any;
        replaceParent(module: any): any;
        _replaceParent(module: any, exports: any, require: any): any;
        onChildAdded(module: any): any;
        onChildRemoved(module: any, exports: any): any;
        onAddedToParent(module: any): any;
        onRemovingFromParent(module: any, exports: any): any;
        onRemovedFromParent(module: any, exports: any): any;
        onDirty(module: any): any;
        forEachChild(module: any, exports: any): any;
        onChildDirty(module: any, exports: any): any;
        dirty(module: any, exports: any): any;
        dirtyGeometry(module: any): any;
        dirtyMaterial(module: any): any;
        dirtyPosition(module: any): any;
        dirtyPreview(module: any): any;
        canSelect(): any;
        canEdit(): any;
        isValid(): any;
        getUniqueParent(): any;
        getFirstParent(): any;
        getFirstParentOfType(module: any): any;
        getFirstParentOfNonTypes(module: any): any;
        getParentsInPath(): any;
        transact(module: any, exports: any, require: any): any;
        canTransact(): any;
        canTransactField(): any;
        recycle(module: any): any;
        getIO(): any;
        verifyBeforeDump(): any;
        dump(module: any, exports: any, require: any): any;
        load(module: any, exports: any): any;
        postLoad(module: any): any;
        migrateLoad(module: any, exports: any): any;
        needDump(): any;
        copyFrom(module: any): any;
        clone(): any;
        buildEntityFromDump(module: any, exports: any): any;
        getDumpedClassName(module: any): any;
        loadFromDump(module: any, exports: any, require: any): any;
        loadFromDumpById(module: any, exports: any, require: any): any;
        isEntityDumpData(module: any): any;
        getExistingEntity(module: any, exports: any): any;
        loadEntityFromDump(module: any, exports: any): any;
        load(module: any, exports: any): any;
        getConstructors(): any;
        loadEntity(module: any, exports: any): any;
        loadEntityById(module: any, exports: any): any;
        _dispatchInvalidateSubgraph(module: any): any;
        _invalidateSubgraph(): any;
        traverse(module: any, exports: any): any;
        travers(module: any, exports: any): any;
        verify(module: any): any;
        onEntityDirty(): any;
        getProxyObject(): any;
        getProxyId(): any;
        refreshEntityList(module: any): any;
    }
    export const _boundDirty: any;
    export const _int_flag: any;
    export const _id: any;
    export const _doc: any;
    export const boundInternal: any;
    export const _children: any;
    export const signalDirty: any;
    export const signalRemoved: any;
    export const signalChildAdded: any;
    export const signalChildRemoved: any;
    export const signalParentReplaced: any;
    export const _previewParams: any;
    export const _Class: any;
    export const _logger: any;
    export const Class: any;
    export const id: any;
    export const _tag: any;
    export const previewParams: any;
    export const _disposed: any;
    export const logger: any;
    export const type: any;
    export const Geometry: any;
    export const options: any;
    export const removed: any;
    export const entities: any;
    export const l: any;
    export const data: any;
    export const migrateFaceMapping: any;
    export const signalEntityCreated: any;
}

declare module "24616" {
    export const FaceInfo: any;
    export const face: any;
}

declare module "24768" {
    export const MixPaveIntegration: any;
    // Original Name: l
    export class MixPaveIntegration {
        getMeshs(module: any, exports: any, require: any, i: any): any;
        getMeshsAsync(module: any, exports: any, require: any, n: any): any;
        getMeshsByArc(module: any, exports: any, require: any, i: any): any;
        getMeshsByArcAsync(module: any, exports: any, require: any, n: any): any;
        _getMeshs(module: any, exports: any): any;
        convertMesh(module: any): any;
        _reverseMeshDef(module: any): any;
        _preFaceGroupOffset(module: any): any;
        _endFaceGroupOffset(module: any, exports: any, require: any): any;
        constructor(...args: any[]);
    }
    export const mixpaint: any;
    export const length: any;
    export const holes: any;
    export const bottomFaceGeometries: any;
    export const colorMode: any;
    export const transform: any;
    export const x: any;
    export const y: any;
    export const dimension: any;
    export const ins: any;
}

declare module "24866" {
    export const exports: any;
}

declare module "249" {
    export const DEBUG: any;
    export const NWTK: any;
    export const ClipperLibWasm: any;
    export const ClipperLibInstance: any;
    export const PolygonToolWasm: any;
    export const PolygontoolLibWrapper: any;
    export const PolygonToolInstance: any;
    export const DiySdk: any;
    export const GeLib: any;
    export const WebCADModelAPI: any;
}

declare module "25396" {
    export const LayerTxnState: any;
    // Original Name: n
    export class LayerTxnState extends import("72664").EntityTxnState {
        constructor(module: any, exports: any, ...args: any[]);
        postRestore(module: any, exports: any): any;
    }
}

declare module "25527" {
    export const FloorUtil: any;
}

declare module "2558" {
    export const IObject: any;
    export const IBase: any;
    // Original Name: r
    export class IBase {
        setEntityFields(module: any, exports: any): any;
        constructor(...args: any[]);
    }
    // Original Name: a
    export class IObject extends IBase {
        constructor(...args: any[]);
        raiseFieldChanged(module: any, exports: any, require: any): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        isFlagOn(module: any, exports: any): any;
        isFlagOff(module: any, exports: any): any;
        setFlagOn(module: any, exports: any, require: any): any;
        setFlagOff(module: any, exports: any, require: any): any;
        resetTempFlag(): any;
        getValueByPaths(module: any): any;
        defineField(module: any, exports: any, require: any): any;
        defineEntityMapField(module: any, exports: any, require: any): any;
        defineKeyEntityMapField(module: any, exports: any, require: any): any;
        updateField(module: any, exports: any): any;
        setInternalFields(module: any): any;
        destroy(): any;
    }
    export const _id: any;
    export const _oid: any;
    export const _flag: any;
    export const _tempFlag: any;
    export const _disposed: any;
    export const signalFlagChanged: any;
    export const signalFieldChanged: any;
    export const defineStateField: any;
    export const _max_oid: any;
}

declare module "25589" {
    export const length: any;
    export const BoundaryBlock: any;
    export const BoundaryBlock_IO: any;
    // Original Name: h
    export class BoundaryBlock_IO extends import("42395").MixBlock_IO {
        instance(): any;
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const _BoundaryBlock_IO_Instance: any;
    export const grid: any;
    export const pattern: any;
    // Original Name: u
    export class BoundaryBlock extends import("42395").MixBlock {
        constructor(module: any, exports: any, ...args: any[]);
        getIO(): any;
        verify(): any;
        getClonedDumpData(): any;
        clone(): any;
        partOfGrid(): any;
        create(module: any, exports: any): any;
        _setGrid(module: any): any;
        containsParamTemplate(): any;
        containsGrid(): any;
        onPatternDirty(module: any): any;
        onPatternReset(module: any): any;
        onPatternResetOverride(module: any): any;
        _onPatternChanged(): any;
        getInnerBoundaryPoints(): any;
    }
    export const parent: any;
    export const points: any;
    export const holes: any;
    export const originPoints: any;
    export const __grid: any;
    export const _flag: any;
    export const type: any;
    export const Material: any;
}

declare module "25637" {
    export const EXT_EN_GEO_ELEMENT_TYPE: any;
    export const EN_SINGLE: any;
    export const EN_CONTINUOUS: any;
}

declare module "25641" {
    export const InteractiveModel: any;
    export const IInteractable: any;
}

declare module "25678" {
    export const ISweeperParent: any;
    export const MoldingSweepHelper: any;
    // Original Name: s
    export class MoldingSweepHelper extends import("38096").SweepHelper {
        getMoldingProfile(module: any, exports: any, require: any): any;
        calcMoldingProfileLoop(module: any): any;
        calcMoldingParameters(module: any, exports: any, require: any, i: any): any;
        genShape3dsFrom2ds(module: any): any;
        generateMaybeParams(module: any): any;
        getInstance(): any;
    }
    export const length: any;
    export const x: any;
    export const y: any;
    export const _moldingInstance: any;
}

declare module "25779" {
    export const ObjectPool: any;
    export class ObjectPool {
        constructor(...args: any[]);
        getInstance(): any;
        get(type: any): any;
        registerCreator(e: any, t: any): any;
        _findAvailableObjectFromPool(e: any): any;
        _addObjectToPool(e: any, t: any): any;
        logPoolStatus(): any;
    }
    export const _poolByType: any;
    export const _customCreatorByType: any;
    export const ins: any;
    export const xIsDisposed: any;
}

declare module "25921" {
    export const toFixed: any;
}

declare module "25981" {
    export const ColorModeEnum: any;
}

declare module "25994" {
    export const exports: any;
}

declare module "26005" {
    export enum ComponentTypeDump {
    }
    export const Joint: any;
    export const Device: any;
    export const StrongElec: any;
    export const WeakElec: any;
    export const HotWater: any;
    export const ColdWater: any;
    export const GBCircuit: any;
    export const GBPowerSys: any;
}

declare module "26429" {
    export const EquationConstraint: any;
    // Original Name: EquationConstraint
    export class EquationConstraint extends constraint_1.Constraint {
        constructor(e: any, ...args: any[]);
        init(e: any, t: any): any;
        refresh(e: any): any;
        compute(): any;
        dump(e: any): any;
        load(e: any, t: any): any;
        logerror(e: any): any;
        verify(): any;
        verifyBeforeDump(): any;
    }
    export const Class: any;
    export const logger: any;
    export const equation: any;
    export const isAssignmentExpression: any;
    export const localId: any;
    export const type: any;
    export const length: any;
    export const value: any;
    export const equationVariables: any;
}

declare module "2647" {
    export const WallFaceAssemblyDecorator: any;
    export const WallFaceAssemblyApi: any;
    export const WallFaceAssembly: any;
    export const SpaceAssembly_IO: any;
    export const SpaceAssembly: any;
}

declare module "26502" {
    export const makeObj: any;
}

declare module "26551" {
    export const length: any;
}

declare module "26564" {
    export const RelationshipManager: any;
    export const doc: any;
    export const _context: any;
    export const _sweepPathRelation: any;
    export const _faceVisibleRelation: any;
    export const _contentInRoomRelation: any;
    export const _sceneObj: any;
}

declare module "26643" {
    export const length: any;
    export const WindowWall_IO: any;
    export const WindowWall: any;
    // Original Name: l
    export class WindowWall_IO extends import("82060").ExtrudedBody_IO {
        load(module: any, exports: any, require: any): any;
    }
    // Original Name: c
    export class WindowWall extends import("82060").ExtrudedBody {
        constructor(module: any, exports: any, ...args: any[]);
        initByParameters(module: any): any;
        onParametersChanged(): any;
        getIO(): any;
    }
    export const innerFrom: any;
    export const innerTo: any;
    export const outerFrom: any;
    export const outerTo: any;
    export const elevation: any;
    export const height: any;
    export const direction: any;
    export const materialData: any;
    export const points: any;
}

declare module "26668" {
    export const Constants: any;
    export const ColorModeEnum: any;
    export const texture: any;
    export const color: any;
    export const blend: any;
}

declare module "26743" {
    export const b: any;
    export const a: any;
    export const c: any;
    export const d: any;
    export const f: any;
    export const h: any;
    export const e: any;
    export const i: any;
    export const o: any;
    export const n: any;
    export const p: any;
    export const q: any;
    export const j: any;
    export const s: any;
    export const m: any;
    export const r: any;
    export const k: any;
    export const l: any;
    export const g: any;
    export const x: any;
    export const B: any;
    export const y: any;
    export const A: any;
    export const z: any;
    export const C: any;
    export const u: any;
    export const t: any;
    export const v: any;
    export const w: any;
    export const libtess: any;
    export const gluDeleteTess: any;
    export const gluTessProperty: any;
    export const gluGetTessProperty: any;
    export const gluTessNormal: any;
    export const gluTessCallback: any;
    export const gluTessVertex: any;
    export const gluTessBeginPolygon: any;
    export const gluTessBeginContour: any;
    export const gluTessEndContour: any;
    export const gluTessEndPolygon: any;
    export const exports: any;
}

declare module "26747" {
    export const log: any;
    export const debug: any;
    export const info: any;
    export const warning: any;
    export const error: any;
    export const time: any;
    export const timeEnd: any;
    export const dataAnalyse: any;
    export const logger: any;
    export const setCollector: any;
    export const registerProcessor: any;
    export const unregisterProcessor: any;
    export const assert: any;
}

declare module "26749" {
    export const ExtraordinaryPoint2d: any;
    // Original Name: r
    export class ExtraordinaryPoint2d extends import("71518").ExtraordinarySketchBase {
        constructor(module: any, ...args: any[]);
        create(module: any, exports: any, require: any): any;
        setX(module: any): any;
        setY(module: any): any;
        setType(module: any): any;
        getCode(module: any): any;
    }
    export const _x: any;
    export const _y: any;
    export const _type: any;
}

declare module "268" {
    export const SVGUtil: any;
    export const String: any;
    export const State: any;
    export const SignalEvent: any;
    export const SignalHook: any;
    export const Signal: any;
    export const RoomInfoManager: any;
    export const RoomInfo: any;
    export const ProfileParser: any;
    export const Polygon: any;
    export const PAssemblyRotation: any;
    export const PAssemblyPath: any;
    export const PAssemblyBody: any;
    export const PAssembly: any;
    export const ParametricDIYMaterial: any;
    export const ParametricCeilingHelper: any;
    export const PaintMaterial: any;
    export const Paints: any;
    export const ObjectPool: any;
    export const Object: any;
    export const Matrix3DHandler: any;
    export const Math: any;
    export const Loop: any;
    export const Layer: any;
    export const JSONRetrocycle: any;
    export const JSONDecycle: any;
    export const IDGeneratorType: any;
    export const IDGenerator: any;
    export const Geometry: any;
    export const Flag: any;
    export const Entity: any;
    export const Meta: any;
    export const DocCrypto: any;
    export const CustomizedTile: any;
    export const CustomizedModel: any;
    export const NCustomizedParametricModel: any;
    export const NCParametricModelMaterial: any;
    export const NCPBackgroundWallBase: any;
    export const NCustomizedFeatureModel: any;
    export const CustomizedFeatureModel: any;
    export const CurveInfo: any;
    export const Curve2d: any;
    export const CryptoJS: any;
    export const Constraint: any;
    export const BoundaryUtil: any;
    export const Bound: any;
    export const BrepBound: any;
    export const BackgroundPath: any;
    export const Array: any;
    export const AffineTransform: any;
    export const Molding: any;
    export const Floor: any;
    export const Face: any;
    export const Edge: any;
    export const Content: any;
    export const Ceiling: any;
    export const Pano: any;
    export const EnRoofLoopPositionType: any;
    export const EnRoofLoopType: any;
    export const IRoofLoop: any;
    export const IRoofLoopBaseInfo: any;
    export const Roof: any;
    export const SnapPoint: any;
    export const ExtraordinarySketch2d: any;
    export const FaceMoldingFitHelper: any;
    export const OpeningSnapHelper: any;
    export const MeshTransform: any;
    export const NCPClipTaskManagerState: any;
    export const INCPClipTask: any;
    export const NCPClipTaskManager: any;
    export const Material: any;
    export const SplitSpaceMixpaint: any;
    export const DoorStoneMixpaint: any;
    export const FloorMixpaint: any;
    export const CWContentUtil: any;
    export const NCustomizedFaceGroupLightSlot: any;
    export const NCustomizedFaceGroup: any;
    export const Joint: any;
    export const TgSlab: any;
    export const TgWall: any;
    export const CustomizedPMDwg: any;
    export const NCustomizedDwg: any;
    export const INCustomizedDwgData: any;
    export const FaceDwg: any;
    export const IFaceDwgData: any;
    export const FaceGroup: any;
    export const SameLineFace: any;
    export const RetryUtil: any;
    export const Skybox: any;
    export const DEntityUtils: any;
    export const Grid: any;
    export const Pattern: any;
    export const Sketch2d: any;
    export const WallPathResolver: any;
    export const WallIntersectResolver: any;
    export const Version: any;
    export const Url: any;
    export const Unit: any;
    export const Transform: any;
    export const Transaction: any;
    export const Wall: any;
    export const Slab: any;
    export const Room: any;
    export const Point: any;
    export const Opening: any;
}

declare module "26843" {
    export const ObjectPool: any;
    export const Object: any;
    export const Molding: any;
    export const Matrix3DHandler: any;
    export const Math: any;
    export const Loop: any;
    export const Layer: any;
    export const JSONRetrocycle: any;
    export const JSONDecycle: any;
    export const IDGeneratorType: any;
    export const IDGenerator: any;
    export const Geometry: any;
    export const Floor: any;
    export const Flag: any;
    export const NCustomizedFaceGroupLightSlot: any;
    export const NCustomizedFaceGroup: any;
    export const CustomizedPMDwg: any;
    export const NCustomizedDwg: any;
    export const FaceDwg: any;
    export const INCustomizedDwgData: any;
    export const IFaceDwgData: any;
    export const FaceGroup: any;
    export const SameLineFace: any;
    export const Face: any;
    export const Entity: any;
    export const Edge: any;
    export const Meta: any;
    export const DocCrypto: any;
    export const CustomizedTile: any;
    export const CustomizedModel: any;
    export const NCPClipTaskManagerState: any;
    export const INCPClipTask: any;
    export const NCPClipTaskManager: any;
    export const NCustomizedParametricModel: any;
    export const NCParametricModelMaterial: any;
    export const NCPBackgroundWallBase: any;
    export const NCustomizedFeatureModel: any;
    export const CustomizedFeatureModel: any;
    export const CurveInfo: any;
    export const Curve2d: any;
    export const CryptoJS: any;
    export const Content: any;
    export const Constraint: any;
    export const Ceiling: any;
    export const BoundaryUtil: any;
    export const Bound: any;
    export const BrepBound: any;
    export const BackgroundPath: any;
    export const Array: any;
    export const AffineTransform: any;
    export const Roof: any;
    export const FaceMoldingFitHelper: any;
    export const OpeningSnapHelper: any;
    export const MeshTransform: any;
    export const Material: any;
    export const CWContentUtil: any;
    export const RetryUtil: any;
    export const Skybox: any;
    export const DEntityUtils: any;
    export const SplitSpaceMixpaint: any;
    export const FloorMixpaint: any;
    export const DoorStoneMixpaint: any;
    export const Grid: any;
    export const Pattern: any;
    export const SnapPoint: any;
    export const ExtraordinarySketch2d: any;
    export const Sketch2d: any;
    export const WallPathResolver: any;
    export const WallIntersectResolver: any;
    export const Joint: any;
    export const TgSlab: any;
    export const TgWall: any;
    export const Wall: any;
    export const Version: any;
    export const Url: any;
    export const Unit: any;
    export const Transform: any;
    export const Transaction: any;
    export const SVGUtil: any;
    export const String: any;
    export const State: any;
    export const Slab: any;
    export const SignalEvent: any;
    export const SignalHook: any;
    export const Signal: any;
    export const RoomInfoManager: any;
    export const RoomInfo: any;
    export const Room: any;
    export const ProfileParser: any;
    export const Polygon: any;
    export const Point: any;
    export const PAssemblyRotation: any;
    export const PAssemblyPath: any;
    export const PAssemblyBody: any;
    export const PAssembly: any;
    export const ParametricDIYMaterial: any;
    export const ParametricCeilingHelper: any;
    export const PaintMaterial: any;
    export const Paints: any;
    export const Opening: any;
    export const EnRoofLoopPositionType: any;
    export const EnRoofLoopType: any;
    export const IRoofLoop: any;
    export const IRoofLoopBaseInfo: any;
}

declare module "26885" {
    export const CustomizedPlatform: any;
    // Original Name: r
    export class CustomizedPlatform extends import("10653").CustomizedFeatureModel {
        constructor(module: any, ...args: any[]);
        _getZOffsetScale(): any;
        onSketchDirty(module: any): any;
        moveAttachedContents(module: any, exports: any): any;
    }
    export const height: any;
    export const z: any;
}

declare module "2703" {
    export const length: any;
    export const Floorplan: any;
    export const Floorplan_IO: any;
    export const FloorplanDisplayAreaEnum: any;
    export const Outer: any;
    export const Inside: any;
    export const Used: any;
    // Original Name: j
    export class Floorplan_IO {
        instance(): any;
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
        constructor(...args: any[]);
    }
    export const _Floorplan_IO_instance: any;
    export const _flag: any;
    export const flag: any;
    export const userDefined: any;
    export const global_wall_height3d: any;
    export const globalWallWidth: any;
    export const displayLengthUnit: any;
    export const displayLengthPrecisionDigits: any;
    export const displayAreaUnit: any;
    export const displayAreaPrecisionDigits: any;
    export const environmentColor: any;
    export const isWallFreezed: any;
    export const displayAreaType: any;
    export const skybox: any;
    export const scene: any;
    export const renderOptions: any;
    export const snapshots: any;
    export const lightgroups: any;
    export const wallJoints: any;
    export const __displayLengthUnit: any;
    export const __isWallFreezed: any;
    export const __displayAreaType: any;
    export const __displayLengthPrecisionDigits: any;
    export const __displayAreaUnit: any;
    export const __displayAreaPrecisionDigits: any;
    export const __environmentColor: any;
    export const __skybox: any;
    export const _id: any;
    // Original Name: z
    export class Floorplan extends import("2558").IObject {
        constructor(module: any, ...args: any[]);
        onFieldChanged(module: any, exports: any, require: any): any;
        init(): any;
        getIdGenerator(module: any): any;
        generateId(): any;
        initCameras(module: any): any;
        assignExt(module: any): any;
        addLightGroup(module: any, exports: any): any;
        removeLightGroupById(module: any): any;
        refreshBoundInternal(): any;
        forEachPoint(module: any, exports: any): any;
        forEachOperatePoint(module: any, exports: any): any;
        forEachOpening(module: any, exports: any): any;
        forEachParametricOpenings(module: any, exports: any): any;
        forEachRoof(module: any, exports: any): any;
        _addCamera(module: any): any;
        _removeCamera(module: any): any;
        destroy(): any;
        open(module: any, exports: any, require: any, i: any): any;
        dirtyMixpaintPolygons(): any;
        clear(): any;
        findRoom(module: any, exports: any): any;
        forEachActiveWall(module: any, exports: any): any;
        forEachWall(module: any, exports: any): any;
        forEachStructure(module: any, exports: any): any;
        forEachBeam(module: any, exports: any): any;
        forEachSlab(module: any, exports: any): any;
        forEachFloor(module: any, exports: any): any;
        forEachRoom(module: any, exports: any): any;
        forEachCeiling(module: any, exports: any): any;
        forEachContent(module: any, exports: any): any;
        forEachGroup(module: any, exports: any): any;
        forEachNgWall(module: any, exports: any): any;
        forEachFaceContent(module: any, exports: any): any;
        forEachWallFace(module: any, exports: any): any;
        forEachStructureFace(module: any, exports: any): any;
        forEachMaterial(module: any, exports: any): any;
        forEachPAssembly(module: any, exports: any): any;
        forEachMolding(module: any, exports: any): any;
        forEachPocket(module: any, exports: any): any;
        forEachDIY2(module: any, exports: any): any;
        forEachContentAndDIY2(module: any, exports: any): any;
        getIO(): any;
        verify(): any;
        _verifyCameras(): any;
        _verifyLights(): any;
        saveToJSON(module: any): any;
        saveToString(module: any): any;
        jsonToString(module: any, exports: any): any;
        forEachConstraint(module: any, exports: any): any;
        _getAllMetadata(module: any, exports: any, require: any, i: any): any;
        forEachWallFaceAssembly(module: any, exports: any): any;
        forEachPModel(module: any, exports: any): any;
        forEachPattern(module: any, exports: any): any;
        forEachContentOfType(module: any, exports: any, require: any): any;
        loadEntities(module: any, exports: any): any;
    }
    export const Class: any;
    export const logger: any;
    export const ext: any;
    export const signalUnderlayChanged: any;
    export const entityList: any;
    export const cameras: any;
    export const _snapshots: any;
    export const _idGenerators: any;
    export const _tgLayerInfo: any;
    export const _isMigration: any;
    export const _isV2Design: any;
    export const _migrateEntityIdsMap: any;
    export const docMgr: any;
    export const designMetadata: any;
    export const id: any;
    export const signalActiveCameraChanged: any;
    export const stateManager: any;
    export const constraintManager: any;
    export const patternManager: any;
    export const suppressed: any;
    export const grid: any;
    export const geometryManager: any;
    export const relationshipManager: any;
    export const associationManager: any;
    export const wallJointManager: any;
    export const __active_camera: any;
    export const active_camera: any;
    export const midPoint: any;
    export const type: any;
    export const openJsonParseStartTime: any;
    export const openJsonParseEndTime: any;
    export const loading: any;
    export const openLoadEntitiesStartTime: any;
    export const openLoadEntitiesEndTime: any;
    export const openPostProcessStartTime: any;
    export const openPostProcessEndTime: any;
    export const mixpaint: any;
    export const material: any;
    export const OrthView: any;
    export const owner: any;
    export const saveDesign: any;
    export const materialsData: any;
    export const productsMap: any;
    export const dumpedEntities: any;
    export const shallowSaveMeta: any;
    export const ignoreMixPaintTextureURI: any;
    export const Material: any;
    export const textureURI: any;
    export const metadata: any;
    export const _meta: any;
    export const dumpStartTime: any;
    export const dumpEndTime: any;
    export const dumpStringifyStartTime: any;
    export const dumpStringifyEndTime: any;
    export const patterns: any;
    export const products: any;
    export const states: any;
    export const constraints: any;
    export const associations: any;
    export const materials: any;
    export const data: any;
    export const statesData: any;
    export const entities: any;
    export const invalidIds: any;
    export const l: any;
    export const isV2Design: any;
    export const migrateEntitiesMap: any;
    export const migrateEntityIdsMap: any;
    export const wall2FaceMap: any;
    export const migrateWallFaceChangedMap: any;
    export const migrateFaceMapping: any;
    export const migrateMustUpdateFace: any;
    export const migrateSkipMixpaint: any;
    export const isUpgradeMigrateError: any;
    export const faceGroupId: any;
    export const faceGroupBoundMap: any;
    export const paintData: any;
    export const partsInfo: any;
}

declare module "27103" {
    export const exports: any;
}

declare module "27252" {
    export const f: any;
}

declare module "27445" {
    export const length: any;
    export const BeamBuilder: any;
    export const BeamBuilder_IO: any;
    // Original Name: y
    export class faceEntity extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const fM: any;
    export const faceMap: any;
    // Original Name: _
    export class BeamBuilder extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        hasTopoKey(module: any): any;
        build(): any;
    }
    export const _layer: any;
    export const originKey: any;
    export const type: any;
    export const holes: any;
    export const s: any;
    export const require: any;
    export const i: any;
    export const mixpaint: any;
    export const material: any;
}

declare module "27496" {
    export const exports: any;
}

declare module "27648" {
    export const StrongElecComp: any;
    // Original Name: r
    export class StrongElecComp extends import("15770").TreeComp {
        dump(): any;
        load(module: any, exports: any): any;
    }
    export const _referObject: any;
    export const Type: any;
}

declare module "27705" {
    export const CustomizedModelMolding_IO: any;
    export const CustomizedModelMolding: any;
    // Original Name: s
    export class CustomizedModelMolding_IO extends import("14502").Molding_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const materialData: any;
    export const parameters: any;
    export const profileId: any;
    export const validateNormal: any;
    export const validateNormals: any;
    export const metadata: any;
    // Original Name: l
    export class CustomizedModelMolding extends import("14502").Molding {
        constructor(module: any, exports: any, ...args: any[]);
        getIO(): any;
        constructMetaData(module: any, exports: any, require: any, i: any, n: any, r: any, a: any, s: any): any;
        initByMeta(module: any): any;
        getMetadataFilterKeys(): any;
        _parseProfileMetaData(module: any): any;
        getProfileFullData(): any;
        dirtyGeometry(): any;
        dirtyMaterial(module: any): any;
        _getGraphicsDataFromParent(module: any, exports: any): any;
        getGraphicsData(): any;
        getGraphicsDataAsync(): any;
        applyToCustomizedModel(module: any): any;
        getMaterialData(): any;
        updateMetadata(module: any): any;
        getParameters(): any;
        isContentInLoop(module: any, exports: any): any;
        canTransactField(): any;
    }
    export const _parameters: any;
    export const signalMaterialChanged: any;
    export const signalWebCADDocChanged: any;
    export const profileWidth: any;
    export const profileHeight: any;
    export const offsetX: any;
    export const offsetY: any;
    export const keepProfileCordinate: any;
    export const moldingId: any;
    export const contentType: any;
    export const id: any;
    export const options: any;
    export const data: any;
    export const flipHorizontal: any;
    export const flipVertical: any;
    export const considerYRayNegate: any;
    export const documentId: any;
    export const relativeIndices: any;
}

declare module "27838" {
    export const length: any;
    export const Scene_IO: any;
    export const Scene: any;
    // Original Name: C
    export class Scene_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
        _addHost(module: any, exports: any, require: any): any;
        postLoad(module: any, exports: any): any;
    }
    export const exclude: any;
    export const rootLayer: any;
    export const activeLayer: any;
    export const outdoorLayer: any;
    export const ceilingLayer: any;
    export const layers: any;
    export const dumpedEntities: any;
    export const _sunPath: any;
    export const sunPath: any;
    export const _previewLayer: any;
    export const previewLayer: any;
    export const _rootLayer: any;
    export const _activeLayer: any;
    export const _ceilingLayer: any;
    export const _outdoorLayer: any;
    export const host: any;
    export const topoPathers: any;
    export const size: any;
    export const splitCurves: any;
    // Original Name: S
    export class Scene extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        create(): any;
        isRoot(): any;
        destroy(): any;
        getBaseHeight(): any;
        setBaseHeight(module: any): any;
        setLayers(module: any): any;
        getLayerAltitude(module: any): any;
        dirtyLayerPosition(module: any, exports: any): any;
        else: any;
        for(require: any): any;
    }
    export const _layers: any;
    export const __baseHeight: any;
    export const signalActiveLayerChanged: any;
    export const signalLayerAdded: any;
    export const signalLayerDeleted: any;
    export const signalBaseHeightChanged: any;
    export const baseHeight: any;
    export const height: any;
    export const nextLayer: any;
    export const prev: any;
    export const next: any;
    export const previousLayer: any;
    export const id: any;
    export const _children: any;
    export const type: any;
    export const Geometry: any;
}

declare module "2797" {
    export const length: any;
    export const DMolding: any;
    export const DMolding_IO: any;
    // Original Name: d
    export class DMolding_IO extends import("20551").Content_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const seekId: any;
    export const localId: any;
    export const name: any;
    export const customizationContentType: any;
    export const isFunctionComponent: any;
    export const imodelParentId: any;
    export const fixK: any;
    export const fixS: any;
    export const XSize: any;
    export const YSize: any;
    export const paths: any;
    export const masterId: any;
    export const __seekId: any;
    export const __localId: any;
    export const __customizationContentType: any;
    export const __isFunctionComponent: any;
    export const __imodelParentId: any;
    export const __fixK: any;
    export const __fixS: any;
    export const __metadata: any;
    export const __paths: any;
    export const material: any;
    export const __masterId: any;
    // Original Name: h
    export class DMolding extends import("20551").Content {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any): any;
        getPaths(): any;
        verify(): any;
        getIO(): any;
        update(module: any): any;
        refreshBoundInternal(): any;
        forEachContent(module: any, exports: any): any;
        isContentInRoom(module: any, exports: any): any;
        isContentInLoop(module: any, exports: any): any;
        isSameMolding(module: any): any;
        isContentValid(): any;
        canTransactField(): any;
        getUniqueParent(): any;
        getProxyId(): any;
        getProxyObject(): any;
    }
    export const metadata: any;
}

declare module "27974" {
    export const FloorMixpaintUtil: any;
    export const length: any;
}

declare module "28020" {
    export const Manager: any;
    // Original Name: h
    export class Manager {
        constructor(...args: any[]);
        instance(): any;
        registerCreator(module: any, exports: any): any;
        createParametricModel(module: any, exports: any): any;
    }
    export const _creators: any;
    export const _instance: any;
}

declare module "28031" {
    export const exports: any;
}

declare module "28094" {
    export const exports: any;
}

declare module "2810" {
    export const length: any;
    export const WindowFrame_IO: any;
    export const WindowFrame: any;
    // Original Name: s
    export class WindowFrame_IO extends import("48961").ParametricModel_IO {
    }
    // Original Name: l
    export class WindowFrame extends import("48961").ParametricModel {
        constructor(module: any, exports: any, ...args: any[]);
        initByParameters(module: any): any;
        getIO(): any;
    }
    export const from: any;
    export const to: any;
    export const elevation: any;
    export const height: any;
    export const window: any;
    export const seamWidth: any;
}

declare module "28309" {