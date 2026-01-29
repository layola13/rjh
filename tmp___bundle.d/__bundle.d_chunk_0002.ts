    }
    export class h extends l {
    }
    export class u extends l {
    }
    export class g extends l {
    }
    export class p extends l {
    }
    export class f extends l {
        layout(module: any, exports: any, require: any): any;
    }
    export const default: any;
}

declare module "17123" {
    export const CornerWindow: any;
    // Original Name: l
    export class CornerWindow extends import("75312").BaseObject {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        _createViewModel(module: any): any;
        onChildRemoved(module: any): any;
        updateRoomCustomAttrs(): any;
        toGraphicsDataAsync(): any;
        toGraphicsData(): any;
        onUpdate(): any;
        getClipAidCSGs(): any;
        _createClipAidCSGs(): any;
        _getBayWindowAidMesh(module: any, exports: any, require: any, i: any): any;
        onParentReplaced(module: any): any;
    }
    export const childModels: any;
    export const _clipAidCSGs: any;
    export const _webCadDocument: any;
    export const entity: any;
    export const customAttrs: any;
    export const roomType: any;
    export const type: any;
    export const updated: any;
    export const needUpdate: any;
    export const geometryDirty: any;
    export const amount: any;
    export const y: any;
    export const ZSize: any;
    export const parent: any;
    export const getHoleLoop: any;
    export const length: any;
    export const showPocket: any;
}

declare module "17135" {
    export const length: any;
    export const Vertex_IO: any;
    export const VertexMoveTypeEnum: any;
    export const Vertex: any;
    export const T: any;
    export const freeMove: any;
    export const other: any;
    // Original Name: l
    export class Vertex_IO extends import("99338").Entity_IO {
        load(module: any, exports: any, require: any, i: any): any;
    }
    export const __x: any;
    export const __y: any;
    export const __z: any;
    // Original Name: d
    export class Vertex extends import("99338").Entity {
        constructor(module: any, ...args: any[]);
        create(module: any, exports: any, require: any): any;
        set(module: any, exports: any, require: any, i: any): any;
        _validateInput(module: any, exports: any): any;
        getIO(): any;
        verify(): any;
    }
    export const x: any;
    export const y: any;
    export const z: any;
}

declare module "1726" {
    export const f: any;
}

declare module "17372" {
    export const GridFlagEnum: any;
    export const Grid: any;
    // Original Name: n
    export class Grid extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        canSelect(): any;
    }
    export const width: any;
    export const height: any;
    export const space: any;
    export const MajorLineEveryNthGridLine: any;
}

declare module "17385" {
    export const ConcealedWorkLightTree: any;
    export const ConcealedWorkLightTree_IO: any;
    // Original Name: a
    export class ConcealedWorkLightTree_IO extends import("99757").ConcealedWorkTree_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    // Original Name: s
    export class ConcealedWorkLightTree extends import("99757").ConcealedWorkTree {
        getIO(): any;
        addLightWire(module: any): any;
        removeLightWire(module: any): any;
        getLightWire(module: any): any;
    }
    export const length: any;
}

declare module "17449" {
    export const parseInt: any;
}

declare module "1752" {
    export const length: any;
    export const exports: any;
}

declare module "17535" {
    export const CompositeRequest: any;
    // Original Name: r
    export class CompositeRequest extends import("46382").Request {
        constructor(module: any, ...args: any[]);
        append(module: any): any;
        getActiveRequest(): any;
        onCommit(): any;
        onCommitAsync(): any;
        onUndo(): any;
        onRedo(): any;
    }
    export const _subRequests: any;
    export const isCommitted: any;
    export const _activeRequest: any;
    export const length: any;
}

declare module "17683" {
    export const SlabUtil: any;
    export const length: any;
}

declare module "17786" {
    export const exports: any;
}

declare module "17808" {
    export const length: any;
    export const Face_IO: any;
    export const Face: any;
    // Original Name: h
    export class Face_IO extends import("99338").Entity_IO {
        load(module: any, exports: any, require: any, i: any): any;
    }
    export const __outerLoop: any;
    export const __innerLoops: any;
    export const innerLoops: any;
    // Original Name: u
    export class Face extends import("99338").Entity {
        constructor(module: any, ...args: any[]);
        getOuterLoop(): any;
        _setOuterLoop(module: any): any;
        getInnerLoops(): any;
        _setInnerLoops(module: any): any;
        isSameInnerLoops(module: any, exports: any): any;
        removeInnerLoop(module: any): any;
        updateOuterLoopByPoints(module: any): any;
        getOuterLoopVertices(): any;
        getOuterLoopPolygon(): any;
        getClipFacePolygon(): any;
        toDiscretePolygon(): any;
        getMassProps(): any;
        forEachVertex(module: any, exports: any): any;
        getMaterial(): any;
        setMaterial(module: any): any;
        onChildRemoved(module: any): any;
        destroy(): any;
        verify(module: any): any;
        refreshBoundInternal(): any;
        getIO(): any;
        validateGeometry(): any;
        setContents(module: any): any;
        addContent(module: any): any;
        canAddContent(module: any): any;
        removeContent(module: any): any;
        hasContent(module: any, exports: any): any;
        _setContents(module: any): any;
        _addContent(module: any): any;
        _removeContent(module: any): any;
        forEachContent(module: any, exports: any): any;
        create(module: any, exports: any, require: any): any;
        _initFace(module: any, exports: any, require: any, i: any): any;
    }
    export const __contents: any;
    export const signalContentAdded: any;
    export const signalContentRemoved: any;
    export const signalCustomizedWallAttachedModelAdded: any;
    export const signalCustomizedWallAttachedModelRemoved: any;
    export const _signalHook: any;
    export const _materialSignalHook: any;
    export const outerLoop: any;
    export const material: any;
    export const contents: any;
    export const hasContent: any;
    export const __material: any;
}

declare module "17870" {
    export const reject: any;
}

declare module "17915" {
    export const WindowHole: any;
    // Original Name: a
    export class WindowHole extends import("94331").ParametricModel {
        constructor(module: any, exports: any, require: any, i: any, ...args: any[]);
        onUpdate(): any;
        _buildWebCadDocument(): any;
        _createGraphicsDataFromMeshes(module: any, exports: any, require: any, i: any): any;
        toGraphicsDataAsync(): any;
        toGraphicsData(): any;
    }
    export const _webCadDocument: any;
    export const innerFrom: any;
    export const elevation: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const length: any;
    export const meshDefs: any;
    export const objects: any;
    export const offsetFlag: any;
    export const leftUAlign: any;
    export const rightUAlign: any;
    export const maxu: any;
    export const downVAlign: any;
    export const diffuseMapUvTransform: any;
    export const normalMapUvTransform: any;
    export const entityId: any;
    export const roomType: any;
}

declare module "17947" {
    export const PaintService: any;
    // Original Name: r
    export class PaintService {
        constructor(...args: any[]);
        instance(): any;
        setCustomGraphicsDataAsyncHandler(handler: any): any;
        setCustomSurfaceGraphicsDataAsyncHandler(handler: any): any;
        getGeometryDataFromMaterial(material: any, faceType: any): any;
        getFaceGraphicsDataFromMaterial(material: any, faceType: any, faceGeometries: any): any;
        getFaceGraphicsDataFromMaterialAsync(material: any, faceType: any, faceGeometries: any): any;
        getSurfaceGraphicsDataFromMaterial(material: any, faceType: any, faceGeometries: any): any;
        getSurfaceGraphicsDataFromMaterialAsync(material: any, faceType: any, faceGeometries: any): any;
        get2DMesh(material: any, faceType: any, faceGeometries: any, options: any): any;
        getSurfaceData(face: any, bottomFaceGeometries: any): any;
        getMixPaintData(face: any, bottomFaceGeometries: any): any;
        getPinhuaPaintData(material: any): any;
        getMixPaints(face: any, faceType: any): any;
        getMixpaintDataForDWG(entity: any, faceType: any): any;
    }
    export const _instance: any;
    export const _handler: any;
    export const bottomFaceGeometries: any;
    export const length: any;
    export const y: any;
    export const rotation: any;
}

declare module "18059" {
    export const length: any;
    export const Hole_IO: any;
    export const Hole: any;
    // Original Name: Hole_IO
    export class Hole_IO extends opening_1.Opening_IO {
        setParams(e: any, t: any): any;
        updateProfile(e: any): any;
    }
    export const XLength: any;
    export const __XLength: any;
    export const __thickness: any;
    export const ZLength: any;
    export const __ZLength: any;
    export const YLength: any;
    export const __YLength: any;
    export const __profile: any;
    // Original Name: Hole
    export class Hole extends opening_1.Opening {
        constructor(e: any, ...args: any[]);
        create(e: any): any;
        initByMeta(e: any, t: any, o: any, i: any): any;
        getMetadataFilterKeys(): any;
        getIO(): any;
        setParamValue(e: any, t: any): any;
        getParamValue(e: any): any;
        getParams(): any;
        setParams(e: any): any;
        updateProfile(e: any): any;
        _updateProfile(): any;
    }
    export const __paramValues: any;
    export const _paramValues: any;
    export const metadata: any;
    export const thickness: any;
    export const profile: any;
}

declare module "18205" {
    export const AssociationManager: any;
    export const _associations: any;
    export const _target2entity: any;
    export const firstTarget: any;
    export const id: any;
    export const length: any;
    export const l: any;
    export const targets: any;
}

declare module "18243" {
    export const exports: any;
}

declare module "18347" {
    export const get: any;
    export const set: any;
    export const exports: any;
}

declare module "18430" {
    export const length: any;
    export const ConcealedWorkCircuit: any;
    export const ConcealedWorkCircuit_IO: any;
    // Original Name: l
    export class ConcealedWorkCircuit_IO extends import("86829").ConcealedWorkCompEntity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const rlts: any;
    export const relations: any;
    // Original Name: c
    export class ConcealedWorkCircuit extends import("86829").ConcealedWorkCompEntity {
        constructor(...args: any[]);
        getIO(): any;
    }
}

declare module "18439" {
    export const StateField: any;
    export const State: any;
    // Original Name: r
    export class State {
        constructor(module: any, exports: any, ...args: any[]);
        getClassName(): any;
        init(module: any, exports: any): any;
        validateNumberInput(module: any, exports: any): any;
        verify(): any;
        verifyBeforeDump(): any;
        dump(module: any, exports: any): any;
        load(module: any, exports: any): any;
        bindObjectFieldChanged(module: any, exports: any): any;
        raiseFieldChanged(module: any, exports: any, require: any): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        dispatchValueChanging(module: any, exports: any, require: any): any;
        dispatchValueChanged(module: any, exports: any, require: any): any;
        _bindChildState(module: any, exports: any): any;
        _unbindChildState(module: any): any;
        bindOwnerObject(module: any, exports: any, require: any): any;
        unbindOwnerObject(module: any): any;
        unbindObject(module: any): any;
        unbindAll(): any;
        destroy(): any;
        registerClass(module: any, exports: any): any;
        getClass(module: any): any;
        createFromDump(module: any, exports: any): any;
        dumpState(module: any, exports: any): any;
        loadFromDump(module: any, exports: any, require: any): any;
        loadFromDumpById(module: any, exports: any, require: any): any;
        getExistingState(module: any, exports: any): any;
        setValueSilent(module: any): any;
    }
    export const localId: any;
    export const name: any;
    export const isEditable: any;
    export const __value: any;
    export const __persistable: any;
    export const _disposed: any;
    export const id: any;
    export const _doc: any;
    export const _signalValueChanging: any;
    export const _signalValueChanged: any;
    export const _signalHook: any;
    export const Class: any;
    export const _tag: any;
    export const statesData: any;
    export const value: any;
    export const newValue: any;
    export const stateIdGenerator: any;
    export const l: any;
    export const states: any;
    export const _constructorByClassName: any;
    export const prefix: any;
    export const setState: any;
    export const getState: any;
    export const equals: any;
}

declare module "18506" {
    export const Matrix3DHandler: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const XScale: any;
    export const YScale: any;
    export const ZScale: any;
    export const ID: any;
    export const angle: any;
    export const w: any;
}

declare module "18687" {
    export const ExtraordinaryCircle2d: any;
    // Original Name: a
    export class ExtraordinaryCircle2d extends import("35656").ExtraordinaryCurve2d {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        create(module: any, exports: any, require: any): any;
        setCCW(module: any): any;
        setRadius(module: any): any;
        setCenter(module: any): any;
        toMathCurve(): any;
    }
    export const _center: any;
    export const _radius: any;
    export const _isCCW: any;
}

declare module "19118" {
    export const CeilingUtil: any;
    export const ceilingFace: any;
    export const length: any;
    export const z: any;
    export const isSplitEdge: any;
    export const isInnerEdge: any;
    export const isSplitCeiling: any;
    export const divideInfo: any;
}

declare module "19140" {
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
}

declare module "19342" {
    export const constructor: any;
    export const exports: any;
}

declare module "19353" {
    export const NCustomizedCircleColumn: any;
    export const NCustomizedCircleColumn_IO: any;
    // Original Name: s
    export class NCustomizedCircleColumn_IO extends import("73858").NCustomizedStructre_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    // Original Name: l
    export class NCustomizedCircleColumn extends import("73858").NCustomizedStructure {
        constructor(module: any, ...args: any[]);
        initByMeta(module: any): any;
        generateBrep(module: any, exports: any): any;
        calcProfile(module: any): any;
        getFaceDiscreteCount(module: any): any;
        newSelf(): any;
        getIO(): any;
    }
    export const ZLength: any;
    export const XLength: any;
    export const radius: any;
    export const brepcache: any;
    export const tag: any;
    export const userData: any;
}

declare module "19481" {
    export const Wall: any;
    export const Slab: any;
    export const Room: any;
    export const Point: any;
    export const Pano: any;
    export const Opening: any;
    export const Molding: any;
    export const Floor: any;
    export const Edge: any;
    export const Face: any;
    export const Content: any;
    export const Ceiling: any;
}

declare module "19533" {
}

declare module "19545" {
    export const BaseTopoPather: any;
    export const from: any;
    export const to: any;
}

declare module "1966" {
    export const length: any;
    export const IPropertyPanelData: any;
    export const IInputData: any;
    export const EN_PROPERTY_PANEL_ITEM_TYPE: any;
    export const NCustomizedParametricRoof: any;
    export const NCustomizedParametricRoof_IO: any;
    export const ParametricRoofGeneratedTypeEnum: any;
    export const AUTO: any;
    export const DRAW: any;
    // Original Name: y
    export class NCustomizedParametricRoof_IO extends import("78283").NCustomizedParametricModel_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        a: any;
        gt: any;
        exports: any;
    }
    export const parameters: any;
    export const roomHeight: any;
    export const linkWallIds: any;
    export const propertytree: any;
    export const __generatedType: any;
    // Original Name: C
    export class NCustomizedParametricRoof extends import("78283").NCustomizedParametricModel {
        constructor(module: any, exports: any, ...args: any[]);
        destroy(): any;
        initByMeta(module: any, exports: any, require: any, i: any, n: any): any;
        generatePropertyPanelDatas(module: any): any;
        getModelData(module: any): any;
        initRoof(module: any, exports: any, require: any): any;
        _enableClip(): any;
        _clipGeom(module: any): any;
        dirtyClipGeometry(module: any): any;
        getUnClippedGraphicsData(module: any): any;
        getGraphicsData(module: any): any;
        getGraphicsDataAsync(): any;
        filterFacesForFill(module: any): any;
        _listenToOpeningChanges(): any;
        Object: any;
        values(module: any, parametricOpenings: any): any;
        forEach(): any;
    }
    export const _dirtyClip: any;
    export const _signalHook: any;
    export const parametricMeta: any;
    export const roofType: any;
    export const _clipTask: any;
    export const _graphicsData: any;
    export const getGraphicsData: any;
    export const updatedEdges: any;
    export const updatedFaces: any;
    export const contents: any;
    export const removedGroupDocIds: any;
    export const id: any;
    export const type: any;
    export const defaultmaterialmap: any;
    export const thickness: any;
    export const modelData: any;
    export const roomLoop: any;
    export const breps: any;
    export const uuid: any;
    export const isRoof: any;
    export const xRay: any;
}

declare module "19842" {
    export const defaultMaterialData: any;
}

declare module "19879" {
    export const Skybox: any;
    // Original Name: o
    export class Skybox {
        getDefaultSkyboxData(e: any): any;
        getSkyboxColor3FromRGB255(e: any): any;
        getSkyboxData(e: any): any;
        constructor(...args: any[]);
    }
    export const type: any;
}

declare module "19883" {
    export const exports: any;
}

declare module "20069" {
    export const Cryptojs: any;
}

declare module "20147" {
}

declare module "20198" {
    export const exports: any;
}

declare module "2024" {
    export const WallPathResolver: any;
    // Original Name: n
    export class WallPathResolver {
        constructor(module: any, exports: any, require: any, n: any, r: any, a: any, ...args: any[]);
        execute(module: any): any;
        _refineStartEndPoints(): any;
        _createFirstAndLastCurves(module: any): any;
        _resolvePath(module: any): any;
        _preprocessPaths(): any;
        _refineBreakInfos(module: any): any;
        _mergeBreakInfosAtStart(module: any, exports: any, require: any): any;
        _mergeBreakInfosAtEnd(module: any, exports: any): any;
        _getWallCurves(module: any): any;
        _breakPathSegment(module: any, exports: any, require: any, i: any, n: any): any;
        _getIntersectedPointInfos(module: any, exports: any, require: any): any;
        _refineNearPointInfos(module: any): any;
        _getIntersectedLineWallInfos(module: any, exports: any, require: any, i: any): any;
        _getIntersectedArcWallInfos(module: any, exports: any, require: any, i: any): any;
        _filterIntersectionInfos(module: any, exports: any, require: any): any;
        _getWallCurveRange(module: any, exports: any): any;
        _createCurve(module: any, exports: any, require: any): any;
        _offsetCurve(module: any, exports: any): any;
        _offsetLine(module: any, exports: any): any;
        _offsetArc(module: any, exports: any): any;
        _getIntersectionInfo(module: any, exports: any): any;
        _refineIntersectionInfo(module: any): any;
        _getNearestIntersectInfo(module: any, exports: any, require: any): any;
        _solveIntersectPoint(module: any, exports: any, require: any, r: any, a: any): any;
        _updatePath(module: any, exports: any, require: any): any;
    }
    export const _firstWalls: any;
    export const _lastWalls: any;
    export const _path: any;
    export const _width: any;
    export const excludeWalls: any;
    export const layer: any;
    export const arcInfo: any;
    export const length: any;
    export const clockwise: any;
    export const walls: any;
    export const width: any;
    export const breakWithNext: any;
    export const breakWithPrev: any;
    export const wall: any;
    export const param: any;
    export const intersect: any;
    export const xRadius: any;
    export const isWrapped: any;
    export const thisParam: any;
    export const thatParam: any;
    export const intersectInfo: any;
    export const x: any;
    export const y: any;
}

declare module "2025" {
    export const Node: any;
    export const childNodes: any;
    export const signalHook: any;
    export const entity: any;
    export const context: any;
    export const parent: any;
}

declare module "203" {
    export const exports: any;
}

declare module "20307" {
    export const NCPContentClipper: any;
    // Original Name: a
    export class NCPContentClipper extends import("40884").ContentClipper {
        constructor(module: any, ...args: any[]);
        cutPlanesToMeshDefs(module: any, exports: any, require: any, i: any, r: any): any;
        getAllClipMeshes(module: any, exports: any): any;
        ModelSpaceToViewSpace(module: any): any;
    }
    export const ncpcontent: any;
    export const y: any;
    export const length: any;
    export const ClipBackgroundWallEnable: any;
}

declare module "20321" {
    export const exports: any;
}

declare module "20327" {
    export const PatternUtil: any;
    // Original Name: a
    export class PatternUtil {
        _getBlockOutline(module: any, exports: any, require: any): any;
        getAnchorPoints(module: any, exports: any, require: any): any;
        createPolygons(module: any, exports: any, require: any): any;
        constructor(...args: any[]);
    }
    export const length: any;
    export const x: any;
    export const y: any;
    export const key: any;
    export const point: any;
    export const defaultOffsetX: any;
    export const defaultOffsetY: any;
    export const rotation: any;
    export const isInside: any;
    export const seamWidth: any;
    export const isUnbroken: any;
    export const subPolygons: any;
}

declare module "20352" {
    export const exports: any;
}

declare module "20431" {
}

declare module "20479" {
    export const exports: any;
}

declare module "20549" {
    export const CustomizedPMInstanceModel: any;
    // Original Name: a
    export class CustomizedPMInstanceModel extends import("75312").BaseObject {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        toGraphicsData(): any;
        onCleanup(): any;
        onUpdatePosition(): any;
        _createModelMesh(module: any, exports: any): any;
    }
    export const _index: any;
    export const geometryDirty: any;
    export const _matrixLocal: any;
    export const texture: any;
    export const colorMode: any;
    export const ID: any;
    export const vertexCount: any;
    export const indexCount: any;
    export const faceIndices: any;
    export const vertexNormals: any;
    export const vertexPositions: any;
    export const vertexUVs: any;
    export const meshKey: any;
    export const faceTag: any;
    export const shapeid: any;
    export const diffuseMapUvTransform: any;
    export const normalMapUvTransform: any;
    export const normalTexture: any;
    export const isLightBandFace: any;
    export const color: any;
    export const type: any;
    export const lightBandIndex: any;
}

declare module "20551" {
    export const length: any;
    export const Content_IO: any;
    export const ContentFlagEnum: any;
    export const Content: any;
    export const Above: any;
    export const Embed: any;
    export const Under: any;
    // Original Name: f
    export class Content_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
        migrateLoad(module: any, exports: any, require: any): any;
    }
    export const productsMap: any;
    export const shallowSaveMeta: any;
    export const seekId: any;
    export const assemblySeekId: any;
    export const variationId: any;
    export const parentSeekId: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const __XRotation: any;
    export const XRotation: any;
    export const __YRotation: any;
    export const YRotation: any;
    export const __ZRotation: any;
    export const ZRotation: any;
    export const XScale: any;
    export const YScale: any;
    export const ZScale: any;
    export const __isScalable: any;
    export const isScalable: any;
    export const __flip: any;
    export const flip: any;
    export const XLength: any;
    export const YLength: any;
    export const ZLength: any;
    export const followParentAnimation: any;
    export const topView: any;
    export const modelTexture: any;
    export const model3d: any;
    export const displayName: any;
    export const installType: any;
    export const _host: any;
    export const host: any;
    export const materials: any;
    export const __poseData: any;
    export const poseData: any;
    export const skeletonSegs: any;
    export const __assemblySeekId: any;
    export const __variationId: any;
    export const __x: any;
    export const __y: any;
    export const __z: any;
    export const __XScale: any;
    export const __YScale: any;
    export const __ZScale: any;
    export const __displayName: any;
    export const __followParentAnimation: any;
    export const __XLength: any;
    export const __YLength: any;
    export const __ZLength: any;
    export const metadata: any;
    export const initTileSize_x: any;
    export const initTileSize_y: any;
    export const __skeletonSegs: any;
    export const type: any;
    export const __installType: any;
    export const Class: any;
    export const NgContent: any;
    // Original Name: m
    export class Content extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any): any;
        verify(): any;
        verifyAndUpdateContentSize(): any;
        destroy(): any;
        migrateContentMetaData(module: any): any;
        updateContentMetaData(module: any): any;
        initByMeta(module: any, exports: any, require: any, i: any): any;
        _convertIdToBasinType(module: any): any;
        getMetadataFilterKeys(): any;
        isComponentAvailable(module: any): any;
        getNormalizedComponentName(module: any): any;
        getComponentStorageKey(module: any): any;
        getComponentByStorageKey(module: any): any;
        getMaterial(module: any): any;
        setMaterial(module: any, exports: any): any;
        _setMaterialsMap(module: any): any;
        getMaterialList(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        flipSelf(): any;
        mirror(module: any): any;
        translate(module: any): any;
        moveAttachedContents(module: any, exports: any, require: any, i: any): any;
        rotateAttachedContents(module: any, exports: any): any;
        moveAlongAxis(module: any, exports: any): any;
        rotateAround(module: any, exports: any): any;
        getIO(): any;
        dealMeta(module: any, exports: any): any;
        migrateMetadata(module: any, exports: any): any;
        assignTo(module: any): any;
        verifyFaceMoldingAffect(): any;
        getHost(): any;
        _getHost(): any;
        _setHost(module: any): any;
        isValidHost(module: any): any;
        getParentRoom(): any;
        setContents(module: any): any;
        addContent(module: any): any;
        canAddContent(module: any): any;
        removeContent(module: any): any;
        hasContent(module: any, exports: any): any;
        _setContents(module: any): any;
        _addContent(module: any): any;
        _removeContent(module: any): any;
        forEachContent(module: any, exports: any): any;
        refreshBoundInternal(): any;
        modelBoundLine(module: any): any;
        resize(module: any, exports: any, require: any): any;
        getRotateQuaternion(): any;
        getLocalToWorldMatrix(): any;
        forEachMaterial(module: any, exports: any): any;
        isContentValid(): any;
        isContentInLoop(module: any, exports: any): any;
        isContentInRoom(module: any, exports: any): any;
        modelSpaceToLocalSpace(module: any): any;
        localSpaceToModelSpace(module: any): any;
        getObjectNames(): any;
        setDefaultMaterial(): any;
        getAnimationByType(module: any, exports: any): any;
        equals(module: any): any;
        onDirty(module: any): any;
        _snapToContentOnDirection(module: any, exports: any, require: any, i: any): any;
        snapTo(module: any, exports: any): any;
        getMaterialByMeshName(module: any): any;
        getInfoForSkeleton(): any;
        getCorniceCutterInfo(module: any): any;
        getBaseboardCutterInfo(module: any): any;
    }
    export const _seekId: any;
    export const _metadata: any;
    export const _materialByComponent: any;
    export const __group: any;
    export const __contents: any;
    export const outline: any;
    export const signalMaterialChanged: any;
    export const signalHostChanged: any;
    export const _meshMaterials: any;
    export const contentType: any;
    export const _disposed: any;
    export const defaultHeight: any;
    export const name: any;
    export const materialsMap: any;
    export const rotation: any;
    export const id: any;
    export const data: any;
    export const contents: any;
    export const hasContent: any;
    export const YSize: any;
    export const XSize: any;
    export const scaleRule: any;
    export const _boundDirty: any;
    export const ZSize: any;
    export const texture: any;
    export const textureURI: any;
    export const colorValue: any;
    export const color: any;
    export const uSize: any;
    export const tileSize_x: any;
    export const vSize: any;
    export const tileSize_y: any;
    export const colorMode: any;
    export const productType: any;
    export const cutPath: any;
}

declare module "20633" {
    export const IObject: any;
    export const IMeshDef: any;
    export const IGraphicsData: any;
    export const SpaceInfo: any;
    export const StructureFaceInfo: any;
    export const SlabFaceInfo: any;
    export const TgRoomInfo: any;
    export const TgUtil: any;
    export const Util: any;
    export const PaintService: any;
    export const GeometryManager: any;
}

declare module "2066" {
    export const TgFaceGeometry: any;
    // Original Name: m
    export class TgFaceGeometry extends import("75312").BaseObject {
        constructor(module: any, exports: any, require: any, i: any, ...args: any[]);
        onInit(): any;
        onEntityDirty(module: any): any;
        onUpdate(module: any): any;
        onUpdatePosition(module: any): any;
        _updateFaceInfo(module: any): any;
        _getFgiMeshDefWithUvTransform(module: any, exports: any, require: any): any;
        needGenerateHighResolutionData(): any;
        toGraphicsData(module: any): any;
    }
    export const _provider: any;
    export const _customAttrs: any;
    export const _geometryDirty: any;
    export const _previewData: any;
    export const positionDirty: any;
    export const needUpdateMatrix: any;
    export const length: any;
    export const exportByRegion: any;
    export const faceGroupTransform: any;
    export const expand: any;
    export const _graphicsCache: any;
    export const id: any;
    export const meshKey: any;
    export const texture: any;
    export const colorMode: any;
    export const diffuseMapUvTransform: any;
    export const normalMapUvTransform: any;
    export const meshDef: any;
    export const seekIds: any;
    export const customAttrs: any;
    export const index: any;
    export const graphicsPath: any;
    export const entityId: any;
    export const parent: any;
    export const entity: any;
}

declare module "20756" {
    export const length: any;
    export const exports: any;
}

declare module "20799" {
    export const Version: any;
    export const Url: any;
    export const Unit: any;
    export const SVGUtil: any;
    export const String: any;
    export const SignalEvent: any;
    export const SignalHook: any;
    export const Signal: any;
    export const ProfileParser: any;
    export const MathUtil: any;
    export const JSONRetrocycle: any;
    export const JSONDecycle: any;
    export const IDGeneratorType: any;
    export const IDGenerator: any;
    export const Flag: any;
    export const Cryptojs: any;
    export const BrepBound: any;
    export const Bound: any;
    export const ArrayUtil: any;
    export const AffineTransform: any;
}

declare module "20926" {
    export const AssociationManager: any;
    // Original Name: s
    export class AssociationManager {
        constructor(...args: any[]);
        addAssociation(module: any, exports: any, require: any, n: any): any;
        _addAssociation(module: any): any;
        _associationExists(module: any, exports: any): any;
        removeAssociation(module: any, exports: any): any;
        _removeAssociation(module: any): any;
        getAssociation(module: any): any;
        getEntityByTarget(module: any, exports: any): any;
        getEntityByTargetId(module: any, exports: any): any;
        getAssociationEntities(module: any): any;
        getAssociationEntitis(module: any): any;
        updateAssociation(module: any, exports: any, require: any): any;
        replaceAssociation(module: any, exports: any): any;
        clear(): any;
        dump(): any;
        _createFromData(module: any, exports: any, require: any): any;
        load(module: any, exports: any, require: any): any;
        forEachAssociation(module: any, exports: any): any;
        saveToData(module: any): any;
        restoreFromData(module: any): any;
        instance(): any;
    }
    export const _associations: any;
    export const _target2entity: any;
    export const id: any;
    export const length: any;
    export const l: any;
    export const targets: any;
}

declare module "20927" {
    export const length: any;
    export const Loop_IO: any;
    export const Loop: any;
    // Original Name: l
    export class Loop_IO extends import("99338").Entity_IO {
        load(module: any, exports: any, require: any, i: any): any;
    }
    export const __root: any;
    // Original Name: c
    export class Loop extends import("99338").Entity {
        constructor(module: any, ...args: any[]);
        createFromPoints(module: any): any;
        initData(module: any): any;
        appendCoEdge(module: any, exports: any): any;
        forEachCoEdge(module: any, exports: any): any;
        forEachVertex(module: any, exports: any): any;
        forEachOwnedVertex(module: any, exports: any): any;
        getCoEdges(): any;
        getLoopEdges(): any;
        getLoopVertices(): any;
        findCoEdge(module: any, exports: any): any;
        findCoEdgeToVertex(module: any): any;
        toPolygon(module: any): any;
        toDiscretePolygon(): any;
        clear(): any;
        getMassProps(): any;
        getIO(): any;
        verify(): any;
        validate(module: any): any;
    }
    export const root: any;
    export const prev: any;
    export const next: any;
    export const id: any;
    export const to: any;
}

declare module "21156" {
    export const RoomExtrudeType: any;
    export const RoomRegion: any;
    export const RoomSplitCurveType: any;
    export const Bottom: any;
    export const Top: any;
    export const Side: any;
    export const Deprecated: any;
    export const Space: any;
    export const Slab: any;
    // Original Name: c
    export class RoomRegion extends import("99827").Region {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any, exports: any, require: any, i: any): any;
        extrudeBody(): any;
        getCoEdgeTopoName(module: any): any;
        clone(module: any): any;
        cloneSplitCurves(): any;
        mirror(module: any): any;
        translate(module: any): any;
        dump(): any;
        load(module: any): any;
        loadData(module: any): any;
    }
    export const _layer: any;
    export const faceIds: any;
    export const splitCurves: any;
    export const coEdgePath: any;
    export const linkWallIds: any;
    export const id: any;
    export const outer: any;
    export const holes: any;
    export const shellWrapper: any;
    export const topoFaces: any;
    export const startData: any;
    export const endData: any;
    export const length: any;
    export const fIds: any;
    export const sCs: any;
    export const sData: any;
    export const eData: any;
    export const type: any;
}

declare module "21170" {
    export const catch: any;
}

declare module "21179" {
    export const ContentVsplitHandler: any;
    export const meshes: any;
    export const meshBoundings: any;
    export const boundingBoxData: any;
    export const entity: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const offsetcenter: any;
    export const initializedMeshes: any;
    export const initializedMeshPositions: any;
    export const bounding: any;
    export const scaleRule: any;
    export const length: any;
    export const ZSize: any;
    export const matrixWorld: any;
    export const Matrixlocal: any;
    export const MatrixdoorWorld: any;
    export const repeaty: any;
    export const repeatx: any;
    export const offsety: any;
    export const offsetx: any;
}

declare module "2121" {
    export const map: any;
}

declare module "21253" {
    export const exports: any;
}

declare module "2164" {
    export const PAssembly: any;
    // Original Name: n
    export class PAssembly extends import("34225").CabinetBase {
        constructor(module: any, exports: any, require: any, ...args: any[]);
    }
}

declare module "21766" {
    export const DHole: any;
    // Original Name: l
    export class DHole extends import("75312").BaseObject {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        onUpdate(module: any): any;
        updateMatrix(): any;
        createFaceObject(module: any): any;
        getClipAidCSGs(): any;
        _createClipAidCSGs(): any;
    }
    export const _dataProvider: any;
    export const forEachChild: any;
    export const _matrixLocal: any;
    export const childNodes: any;
    export const _clipAidCSGs: any;
    export const XSize: any;
    export const y: any;
    export const vertices: any;
    export const ZSize: any;
}

declare module "21770" {
    export const ContentUtil: any;
    export const contentType: any;
    export const x: any;
    export const y: any;
    export const length: any;
    export const currentPos: any;
}

declare module "2196" {
    export const exports: any;
}

declare module "220789" {
    export const HSPaveSDK: any;
    export const exports: any;
}

declare module "22281" {
    export const constructor: any;
    export const exports: any;
}

declare module "22352" {
    export const exports: any;
}

declare module "22451" {
    export const exports: any;
}

declare module "2264" {
    export const WindowCeiling_IO: any;
    export const WindowCeiling: any;
    // Original Name: a
    export class WindowCeiling_IO extends import("82060").ExtrudedBody_IO {
        load(module: any, exports: any, require: any): any;
    }
    // Original Name: s
    export class WindowCeiling extends import("82060").ExtrudedBody {
        constructor(module: any, exports: any, ...args: any[]);
        initByParameters(module: any): any;
        getIO(): any;
        onParametersChanged(): any;
    }
    export const direction: any;
    export const materialData: any;
}

declare module "22777" {
    export const CommonOptions: any;
    export const RuleConfig: any;
}

declare module "23005" {
    export const length: any;
    export const Point2d: any;
    export const Point2dTypeEnum: any;
    export const Point2d_IO: any;
    // Original Name: a
    export class Point2d_IO extends import("24567").Entity_IO {
        instance(): any;
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const _Point2d_IO_instance: any;
    export const x: any;
    export const y: any;
    export const isbackground: any;
    export const isbk: any;
    export const __x: any;
    export const __y: any;
    export const dispatchEvent: any;
    export const LineLineIntersect: any;
    export const LineArcIntersect: any;
    export const ArcArcIntersect: any;
    // Original Name: l
    export class Point2d extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any, exports: any, require: any): any;
        createFromPoint(module: any): any;
        getIO(): any;
        clone(): any;
        set(module: any, exports: any): any;
        offset(module: any, exports: any): any;
        verify(): any;
        isBackground(): any;
        getPolygons(): any;
        refreshBoundInternal(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
    }
    export const point2dType: any;
}

declare module "23053" {
    export const exports: any;
}

declare module "23114" {
    export const WallIntersectResolver: any;
    // Original Name: n
    export class WallIntersectResolver {
        constructor(module: any, exports: any, require: any, i: any, n: any, r: any, ...args: any[]);
        _getInnerConnectVertices(module: any): any;
        _calcBisectorIntersection(): any;
        else: any;
        for(let: any, module: any, exports: any, module: any, : any, exports: any, module: any): any;
    }
    export const sourceWall: any;
    export const sourceLeft: any;
    export const sourcePoint: any;
    export const targetWall: any;
    export const targetLeft: any;
    export const connectPoints: any;
    export const sourceGeom: any;
    export const targetGeom: any;
    export const sourceNeighbor: any;
    export const targetPoint: any;
    export const length: any;
    export const sourceParam: any;
    export const targetParam: any;
    export const ID: any;
    export const arcParams: any;
    export const arcInfo: any;
    export const from: any;
    export const PI: any;
    export const overlapAngle: any;
}

declare module "2314" {
    export const exports: any;
}

declare module "23142" {
    export const ClassSNameToLName: any;
    export const ClassLNameToSName: any;
    export const ModelClass: any;
}

declare module "23183" {
}

declare module "23408" {
    export const PAssemblyUtil: any;
    export const z: any;
    export const _content: any;
    export const length: any;
    export const localId: any;
    export const doorThickness: any;
    export const XSize: any;
    export const YSize: any;
    export const parameters: any;
    export const layoutInfo: any;
    export const needClip: any;
    export const XLength: any;
    export const value: any;
    export const ZLength: any;
}

declare module "23448" {
    export const Curve2dUtil: any;
    export const CurveInfoUtil: any;
    export const ThreeUtil: any;
    export const start: any;
    export const end: any;
    export const lerp: any;
    export const length: any;
    export const close: any;
    export const segments: any;
    export const type: any;
    export const isClosed: any;
    export const threeCurve: any;
    export const middle: any;
    export const discretePoints: any;
    export const discreetPoints: any;
    export const Circle2d: any;
    export const from: any;
    export const to: any;
    export const Line2d: any;
    export const CircleArc2d: any;
    export const x: any;
    export const y: any;
}

declare module "23462" {
    export const WebCadDocument: any;
    export const _paths: any;
    export const _moldings: any;
    export const extrudedBodies: any;
    export const dirty: any;
    export const _documentJSON: any;
    export const _meshes: any;
    export const type: any;
    export const isDuringFastComputation: any;
}

declare module "23464" {
    export const Manager: any;
    // Original Name: l
    export class Manager {
        constructor(...args: any[]);
        getLatestCommittedRequest(): any;
        getLatestCommittedSessionRequest(): any;
        clear(module: any): any;
        reset(): any;
        register(module: any, exports: any, require: any): any;
        registerNgm(module: any, exports: any, require: any): any;
        _register(module: any, exports: any, require: any): any;
        createRequest(module: any, exports: any, require: any): any;
        getReqByType(module: any): any;
        abort(module: any): any;
        commit(module: any, exports: any): any;
        commitAsync(module: any, exports: any): any;
        transact(module: any, exports: any, require: any, i: any): any;
        startBlockSignals(): any;
        stopBlockSignals(): any;
        blockSignal(module: any, exports: any): any;
        clearBlockedSignals(): any;
        startSession(module: any): any;
        _commitSession(module: any): any;
        _abortSession(): any;
        _endSession(): any;
        _terminateActiveSession(module: any): any;
        canUndo(): any;
        canRedo(): any;
        undo(): any;
        redo(): any;
        getSessionCount(): any;
        _prepareUndoRedo(): any;
        _getUndoRedoSession(): any;
        enable(): any;
        disable(): any;
        blockUndoRedo(): any;
        unblockUndoRedo(): any;
        signalDispatchCondition(module: any, exports: any): any;
        getRequestStack(module: any): any;
    }
    export const _enabled: any;
    export const _blocked: any;
    export const _suppressed: any;
    export const _undoStepCount: any;
    export const _reqByType: any;
    export const _reqParamAdapterByType: any;
    export const _enableBlockSignals: any;
    export const _blockedSignals: any;
    export const signalAborting: any;
    export const signalAborted: any;
    export const signalCommitting: any;
    export const signalCommitted: any;
    export const signalUndoRedoStateChanged: any;
    export const signalUndoing: any;
    export const signalUndone: any;
    export const signalRedoing: any;
    export const signalRedone: any;
    export const signalCreated: any;
    export const signalDispatchCondition: any;
    export const _defaultSession: any;
    export const _activeSession: any;
    export const _sessionStack: any;
    export const _undoRedoSessionStack: any;
    export const type: any;
    export const mgr: any;
    export const args: any;
    export const activeRequest: any;
    export const logger: any;
}

declare module "23472" {
    export const Sketch2dDecorator: any;
    export const _sketch2d: any;
    export const from: any;
    export const to: any;
    export const x: any;
    export const y: any;
    export const center: any;
}

declare module "23665" {