    export const ZSize: any;
    export const temp4SelfLocate: any;
    export const name: any;
    export const width: any;
    export const height: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const matrixWorld: any;
    export const Matrixlocal: any;
    export const MatrixdoorWorld: any;
    export const dependencies: any;
    export const hscale: any;
    export const offsetcenter: any;
    export const textureRotation: any;
    export const PI: any;
    export const repeaty: any;
    export const repeatx: any;
    export const offsety: any;
    export const offsetx: any;
    export const bounding: any;
    export const obj_name: any;
    export const const: any;
    export const return: any;
    export const : any;
    export const this: any;
    export const seekId: any;
    export const textureMatrix: any;
}

declare module "95648" {
    export const exports: any;
    export const trunc: any;
}

declare module "95704" {
    export const exports: any;
}

declare module "95804" {
    export const NCustomizedParametricBackgroundWall: any;
    export const NCustomizedParametricBackgroundWall_IO: any;
    // Original Name: h
    export class NCustomizedParametricBackgroundWall_IO extends import("46973").NCPBackgroundWallBase_IO {
    }
    // Original Name: u
    export class NCustomizedParametricBackgroundWall extends import("46973").NCPBackgroundWallBase {
        constructor(module: any, exports: any, ...args: any[]);
        initBackgroundWall(module: any, exports: any): any;
        getOpenDocumentExtra(module: any, exports: any): any;
        updateModelFromData(module: any, exports: any): any;
        updatePositionFromMeta(module: any, exports: any): any;
        updateYPosition(module: any, exports: any): any;
        initModelDocument(module: any, exports: any, require: any): any;
        initBackgroundWallDocument(module: any, exports: any, require: any): any;
        getWallData(module: any, exports: any, require: any, i: any): any;
        _getValidRegions(module: any): any;
        _isFaceInfoDivisible(module: any): any;
        getIO(): any;
        getBaseboardCutterInfo(module: any): any;
        _setHost(module: any): any;
        _listenSignalOnHost(module: any): any;
        mirror(module: any): any;
    }
    export const _singleHooKOnHost: any;
    export const targetFaceInfo: any;
    export const useMinMax: any;
    export const isAutoFit: any;
    export const XLength: any;
    export const YLength: any;
    export const ZLength: any;
    export const XScale: any;
    export const YScale: any;
    export const ZScale: any;
    export const meta: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const newOuter: any;
    export const wdh: any;
    export const holes: any;
    export const length: any;
    export const host: any;
    export const type: any;
}

declare module "95810" {
    export const SunlightUtil: any;
    export const DefaultSunlightOptions: any;
    export const intensityFactor: any;
    export const sizeMultiplierFactor: any;
    export const intensity: any;
    export const sizeMultiplier: any;
}

declare module "95888" {
    export const exports: any;
}

declare module "95896" {
    export const MaterialConvertor: any;
    export const metadata: any;
    export const sliderOffsetY: any;
}

declare module "96028" {
    export const Array: any;
    export const exports: any;
}

declare module "96102" {
    export const HoleDataProvider: any;
    // Original Name: f
    export class HoleDataProvider extends import("76563").IDataProvider {
        constructor(module: any, ...args: any[]);
        getFacePath(module: any): any;
        _convertToWorldSpace(module: any): any;
        getTopOrBottomFacePath(module: any): any;
        getTopFaceGeometry(module: any): any;
        getBottomFaceGeometry(module: any): any;
        getSideFaceGeometry(module: any): any;
        _isSideFaceHiddenInSlab(module: any, exports: any): any;
    }
    export const entity: any;
    export const PI: any;
    export const ZLength: any;
    export const swing: any;
    export const x: any;
    export const y: any;
}

declare module "96181" {
    export const PaintGlobal: any;
}

declare module "9619" {
    export const ArcCurve_IO: any;
    export const ArcCurve: any;
    // Original Name: n
    export class ArcCurve_IO extends import("68469").Curve_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any, i: any): any;
    }
    export const cx: any;
    export const cy: any;
    export const clockwise: any;
    // Original Name: a
    export class ArcCurve extends import("68469").Curve {
        constructor(...args: any[]);
        mirror(module: any, exports: any): any;
        flip(): any;
        getSagitta(module: any, exports: any): any;
        getRadius(module: any, exports: any): any;
        createBySagitta(module: any, exports: any, require: any, i: any): any;
        create(module: any, exports: any): any;
        getIO(): any;
        toTHREECurve(module: any, exports: any): any;
        clone(): any;
        reverseClone(): any;
    }
}

declare module "96287" {
    export const CustomizedModelTxnState: any;
    // Original Name: n
    export class CustomizedModelTxnState extends import("72664").EntityTxnState {
        constructor(module: any, exports: any, ...args: any[]);
        postRestore(module: any, exports: any): any;
    }
}

declare module "96346" {
    export const exports: any;
}

declare module "96366" {
    export const LightingRuleManager: any;
    export const RuleTypeEnum: any;
    export const _rules: any;
}

declare module "96415" {
    export const length: any;
    export const Circle2d: any;
    export const Circle2d_IO: any;
    // Original Name: d
    export class Circle2d_IO extends import("46088").Curve2d_IO {
        instance(): any;
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const _Circle2d_IO_instance: any;
    export const center: any;
    export const radius: any;
    export const __center: any;
    export const __radius: any;
    // Original Name: h
    export class Circle2d extends import("46088").Curve2d {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any, exports: any): any;
        createSubCurve(module: any, exports: any, require: any): any;
        getDiscretePoints(): any;
        refreshBoundInternal(): any;
        offset(module: any, exports: any): any;
        toTHREECurve(): any;
        getTangent(module: any): any;
        getOuterFace2D(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        verify(): any;
        getIO(): any;
    }
    export const y: any;
    export const x: any;
}

declare module "96482" {
    export const PMolding: any;
    // Original Name: r
    export class PMolding extends import("79579").PModel {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        onUpdate(): any;
    }
    export const _webCadDocument: any;
    export const pathVertLine: any;
    export const profileDir: any;
    export const _cache: any;
    export const length: any;
    export const x: any;
    export const y: any;
    export const z: any;
}

declare module "96714" {
    export const writable: any;
}

declare module "96736" {
    export const IMaterialDumpedData: any;
    export const Util: any;
    export const IMaterialData: any;
    export const MaterialData: any;
    export const Material_IO: any;
    export const ColorModeEnum: any;
    export const TexturePaveTypeEnum: any;
    export const MaterialIdEnum: any;
    export const MaterialDataObjDecorator: any;
    export const MaterialDecorator: any;
    export const IMaterialDataToJsonResult: any;
    export const IMaterialSaveToJsonResult: any;
    export const Material: any;
    export const Manager: any;
}

declare module "96843" {
    export const PointUtil: any;
    export const from: any;
    export const to: any;
    export const length: any;
}

declare module "9690" {
    export const TgLoopUtil: any;
    export const length: any;
    export const z: any;
    export const curve: any;
}

declare module "96982" {
    export const ConstraintUtil: any;
    // Original Name: o
    export class ConstraintUtil {
        constructor(...args: any[]);
    }
    export const collectConstraints: any;
    export const forEachConstraint: any;
}

declare module "97027" {
    export const GussetGroup: any;
    // Original Name: a
    export class GussetGroup extends import("24567").Entity {
        constructor(module: any, ...args: any[]);
        destroy(): any;
        needDump(): any;
        canTransact(): any;
        onChildDirty(module: any, exports: any): any;
        listenLayer(module: any): any;
        listenPMModel(module: any): any;
        _listenFaceEntity(module: any): any;
        _unlistenFaceEntity(module: any): any;
        _onFaceEntityAdded(module: any): any;
        _onFaceEntityRemoved(module: any): any;
        addSurface(module: any, exports: any): any;
        removeSurface(module: any, exports: any): any;
        findSurface(module: any, exports: any): any;
        dirtySurface(module: any, exports: any): any;
        getGussetSurfaceParams(module: any, exports: any): any;
        getGussetGroup(module: any): any;
        removeGussetSurface(module: any): any;
        dirtyGussetSurface(module: any, exports: any): any;
    }
    export const _signalHook: any;
    export const _disposed: any;
    export const faceId: any;
    export const faceEntity: any;
    export const faceGroupId: any;
    export const gussetGroup: any;
}

declare module "97088" {
    export const CustomizedPMModel: any;
    // Original Name: a
    export class CustomizedPMModel extends import("75312").BaseObject {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        createViewModel(module: any): any;
        onInit(): any;
        onChildAdded(module: any): any;
        onChildRemoved(module: any): any;
        toGraphicsDataAsync(): any;
        toGraphicsData(): any;
        onCleanup(): any;
    }
    export const childNodes: any;
    export const geometryDirty: any;
}

declare module "97104" {
}

declare module "97264" {
    export const Util: any;
    export const BrepInfo: any;
    // Original Name: l
    export class BrepInfo {
        constructor(...args: any[]);
    }
    export const info: any;
    export const oldFace: any;
    export const oldCurveIndex: any;
    // Original Name: c
    export class Util {
        unique(module: any, exports: any): any;
        assignId(module: any, exports: any): any;
        isSeamArray(module: any, exports: any): any;
        getAllFaces(module: any): any;
        getAllEdge(module: any): any;
        traverseCoedgeWithTopoDirection(module: any, exports: any): any;
        traverseCoedge(module: any, exports: any): any;
        mergeSurface(module: any): any;
        getArea(module: any, exports: any, require: any): any;
        mergeFace(module: any, exports: any): any;
        getEdgesByVertex(module: any): any;
        getDiscreteCount(module: any, exports: any): any;
        overlap(module: any, exports: any): any;
        getBetweenPoints(module: any, exports: any, require: any): any;
        discreteArc2d(module: any, exports: any, require: any): any;
        discretePolygon(module: any, exports: any): any;
        shellFix(module: any): any;
        constructor(...args: any[]);
    }
    export const length: any;
    export const tmpsetId: any;
    export const max: any;
    export const angle: any;
    export const arc: any;
    export const points: any;
    export const userData: any;
    export const alpha: any;
    export const mapping: any;
    export const EN_ARC_2D: any;
    export const IDGenerate: any;
    export const map: any;
    export const _idcount: any;
    export const _data: any;
    export const num: any;
    export const Disjoint: any;
    export const set: any;
}

declare module "97303" {
    export const exports: any;
}

declare module "97312" {
    export const ParametricOpeningDecorator: any;
    // Original Name: f
    export class ParametricOpeningDecorator {
        constructor(module: any, ...args: any[]);
        dump(): any;
        s: any;
    }
    export const _entity: any;
    export const doorStone: any;
    export const ZRotation: any;
    export const jointCurve: any;
    export const chordHeight: any;
    export const length: any;
    export const storeProperty: any;
    export const bottomFaceMaterial: any;
    export const mixpaint: any;
    export const mixPave: any;
    export const eId: any;
    export const dependentMetaDates: any;
    export const subpartMetaDates: any;
    export const metaInfoDump: any;
    export const metaInfo: any;
}

declare module "97345" {
    export const EulerOperations: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const next: any;
    export const prev: any;
    export const from: any;
    export const to: any;
    export class g {
        mvsf(module: any): any;
        mev(module: any, exports: any, require: any): any;
        kev(module: any, exports: any, require: any): any;
        mef(module: any, exports: any, require: any): any;
        kef(module: any, exports: any): any;
        esplit(module: any, exports: any): any;
        mergeEdgesOnVertex(module: any): any;
        constructor(...args: any[]);
    }
    export const outerLoop: any;
    export const root: any;
    export const edge: any;
    export const length: any;
    export const curve: any;
    export const reversed: any;
}

declare module "97396" {
    export const CustomizedPMDwgUtil: any;
    export const matrix: any;
}

declare module "9742" {
    export enum PocketSideType {
    }
    export const Inner: any;
    export const Outer: any;
    export const Both: any;
}

declare module "97508" {
    export const ToSketchConvertor: any;
    // Original Name: p
    export class ToSketchConvertor {
        constructor(...args: any[]);
        fromMixPaveToSketch(module: any, exports: any, require: any): any;
        fromPathToBackground(module: any): any;
        mergeBackgroundWithOtherMixPaves(module: any, exports: any, require: any): any;
        fromRegionsToBackground(module: any, exports: any): any;
        _fromCurvesToPolyCurve(module: any, exports: any): any;
        toFaces(module: any): any;
        toFace(module: any): any;
        toWire(module: any): any;
        toArc2d(module: any): any;
        toCircle2d(module: any): any;
        toLine2d(module: any): any;
        toPoint2d(module: any): any;
    }
    export const _tolerance: any;
    export const _points: any;
    export const _lines: any;
    export const _circles: any;
    export const _arcs: any;
    export const idMap: any;
    export const background: any;
    export const holes: any;
    export const length: any;
    export const start: any;
    export const end: any;
    export const clockwise: any;
}

declare module "97657" {
    export enum ExPointType {
        split = 2,
    }
    export enum ExSketchGuidelineType {
    }
    export const common: any;
    export const split: any;
    export const dot: any;
}

declare module "97691" {
    export const exports: any;
}

declare module "97740" {
    export const MeshTransformUtil: any;
    // Original Name: o
    export class MeshTransformUtil {
        transformPositions3d(e: any, t: any): any;
        transformPositions3dTo2d(e: any, t: any, o: any): any;
        transformPositions2d(e: any, t: any): any;
        transformXYZ(e: any, t: any): any;
        transformedXYZ(e: any, t: any): any;
        constructor(...args: any[]);
    }
    export const x: any;
    export const y: any;
    export const z: any;
}

declare module "97771" {
    export const PaintFaceMarker: any;
    export const CommonUtil: any;
    export const PaintImageProvider: any;
    export const PaintImageManager: any;
    export const MixPaint: any;
    export const PaintsUtil: any;
    export const MaterialUtil: any;
}

declare module "97842" {
    export const JSONStringify: any;
    export const JSONParse: any;
    export const isSameMap: any;
    export const isSameArray: any;
    export const getValueByPaths: any;
    export const isObject: any;
    export const nullFunction: any;
    export const isArray: any;
    export const isValidNumber: any;
    export const isNumber: any;
    export const isBoolean: any;
    export const isDef: any;
    export const isString: any;
    export const isNull: any;
    export const typeOf: any;
    export const setIfUndefined: any;
    export const getKeys: any;
    export const createSet: any;
    export const isEmpty: any;
    export const makeDisposable: any;
    export const makeRefCounted: any;
    export const traverseObject: any;
    export const unbindMaterialData: any;
    export const bindMaterialData: any;
    export const StateEntityField: any;
    export const KeyEntityMapField: any;
    export const EntityMapField: any;
    export const EntityField: any;
    export const updateField: any;
    export const bindFieldsByState: any;
    export const defineStateField: any;
    export const defineKeyEntityMapField: any;
    export const defineEntityMapField: any;
    export const defineEntityField: any;
    export const defineReadonlyField: any;
    export const defineFields: any;
    export const defineField: any;
    export const binaryEqual: any;
    export const willChange: any;
    export const changed: any;
    export const prefix: any;
    export const postSet: any;
    export const fieldValueType: any;
    export const defaultValue: any;
    export const readonly: any;
    export const get: any;
    export const setState: any;
    export const __persistable: any;
    export const __value: any;
    export const value: any;
    export const getState: any;
    export const equals: any;
    export const xRefCount: any;
    export const xIsDisposed: any;
    export const signalDisposed: any;
    export const xDebugInfo: any;
    export const xAppendDbgInfo: any;
    export const xReset: any;
    export const circularReference: any;
}

declare module "97922" {
    export const CustomizedModelLightBand_IO: any;
    export const CustomizedModelLightBand: any;
    // Original Name: a
    export class CustomizedModelLightBand_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const backgroundFaceNormal: any;
    export const options: any;
    export const parameters: any;
    // Original Name: s
    export class CustomizedModelLightBand extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        getIO(): any;
        constructMetaData(module: any, exports: any, require: any): any;
        initByMeta(module: any): any;
        dirtyMaterial(): any;
        getHost(): any;
        assignTo(module: any): any;
        _getGraphicsDataFromParent(module: any, exports: any): any;
        getGraphicsData(): any;
        getGraphicsDataAsync(): any;
        applyToCustomizedModel(module: any): any;
        updateMetadata(module: any): any;
        getParameters(): any;
        isContentInLoop(module: any, exports: any): any;
        canTransactField(): any;
    }
    export const _host: any;
    export const metadata: any;
    export const _parameters: any;
    export const _graphicsData: any;
    export const signalMaterialChanged: any;
    export const signalWebCADDocChanged: any;
    export const path: any;
    export const documentId: any;
    export const lightBandId: any;
    export const relativeIndices: any;
}

declare module "98013" {
    export const WallUtil: any;
    export const geometry: any;
    export const length: any;
    export const id: any;
    export const right: any;
    export const from: any;
    export const to: any;
    export const width: any;
    export const z: any;
    export const wallInfos: any;
}

declare module "98096" {
    export const TxnStateFactory: any;
}

declare module "98126" {
    export const exports: any;
}

declare module "98182" {
    export const BaseboardTopoPatherV120: any;
    // Original Name: c
    export class BaseboardTopoPatherV120 extends import("19545").BaseTopoPather {
        constructor(module: any, exports: any, require: any, i: any, n: any, r: any, ...args: any[]);
        faceDirty(module: any): any;
        calcBaseSweepPath(module: any): any;
        faceChanged(module: any): any;
        calcFaceFloorCurves(module: any): any;
        cutBaseSweepPath(module: any, exports: any, require: any): any;
        extractPatchedEdges(module: any, exports: any, require: any): any;
        extractSortedSplittedBaseEdges(module: any, exports: any, require: any): any;
        extractPtInEdges(module: any, exports: any, require: any): any;
        extractCuttingCandidates(module: any): any;
        getSweepPathWithoutCutting(): any;
        getSweepPath(): any;
        splitByPoints(module: any): any;
        dump(): any;
    }
    export const hostFace: any;
    export const index: any;
    export const isAux: any;
    export const opening: any;
    export const length: any;
    export const s: any;
    export const require: any;
    export const i: any;
    export const d: any;
    export const z: any;
    export const oldId: any;
    export const to: any;
    export const from: any;
    export const facePathCache: any;
}

declare module "98283" {
    export const CommonUtil: any;
}

declare module "98307" {
    export const ModelGraphicsHelper: any;
    // Original Name: c
    export class ModelGraphicsHelper {
        getGraphicsData(module: any, exports: any): any;
        getDiscreteParameter(module: any, exports: any, require: any): any;
        convertFaceMeshData(module: any, exports: any, require: any, i: any, n: any): any;
        convertEdgeMeshData(module: any, exports: any, require: any, i: any): any;
        convertContinousFaceMeshData(module: any, exports: any, require: any, a: any): any;
        convertContinousEdgeMeshData(module: any, exports: any, require: any, n: any): any;
        isNormalSameDirection(module: any, exports: any): any;
        calcSketchDocument(module: any): any;
        offsetFaceUV(module: any, exports: any): any;
        offsetFaceUVToLeftBottom(module: any): any;
        getInstance(): any;
        constructor(...args: any[]);
    }
    export const discretePrecisionParam: any;
    export const length: any;
    export const lowPrecisionCurveLengthThreshold: any;
    export const middlePrecisionCurveLengthThreshold: any;
    export const midHighPrecisionCurveLengthThreshold: any;
    export const PI: any;
    export const meshKey: any;
    export const entityTag: any;
    export const vertexCount: any;
    export const x: any;
    export const y: any;
    export const indexCount: any;
    export const surface: any;
    export const isCeiling: any;
    export const needReverseProjectionPlane: any;
    export const bounding: any;
    export const customData: any;
    export const sketchModelData: any;
    export const area: any;
    export const faceNormal: any;
    export const faceXRay: any;
    export const faceYRay: any;
    export const last: any;
    export const smoothIndices: any;
    export const smoothFaceKeys: any;
    export const _instance: any;
}

declare module "98320" {
    export const exports: any;
    export const name: any;
    export const prototype: any;
    export const source: any;
    export const toString: any;
}

declare module "98324" {
    export const hasOwn: any;
    export const exports: any;
}

declare module "98415" {
    export const FaceGeometry: any;
    export const length: any;
    // Original Name: S
    export class FaceGeometry extends import("75312").BaseObject {
        constructor(module: any, exports: any, require: any, i: any, n: any, ...args: any[]);
        onInit(): any;
        onEntityDirty(module: any): any;
        _getTransform(module: any, exports: any, require: any): any;
        isRcpFace(): any;
        _updateFaceInfo(module: any): any;
        _updatePlaneFaceInfo(module: any, exports: any): any;
        _getProjectPolygonInfo(module: any, exports: any): any;
        _getProjectPoint(module: any, exports: any): any;
        _getFlipType(module: any, exports: any, require: any, i: any): any;
        _getPointIndex(module: any, exports: any): any;
        _isPointInHoleProfile(module: any, exports: any, require: any): any;
        getMatrixToLocal(module: any): any;
        getOpenginHostFaceXAxis(module: any): any;
        _updateSurFaceInfo(module: any): any;
        onUpdate(module: any): any;
        onUpdatePosition(module: any): any;
        _getWallFaceCustomAttrs(module: any): any;
        _isLowestFace(module: any, exports: any): any;
        _isHighestFace(module: any, exports: any): any;
        _getSlabFaceCustomAttrs(module: any): any;
        _getOpeningFaceCustomAttrs(module: any): any;
        _getFaceCustomAttrs(): any;
        updateRoomCustomAttrs(): any;
        _getFaceData(): any;
        toGraphicsDataAsync(module: any): any;
        meshToGraphicDatas(module: any, exports: any, require: any, i: any, n: any): any;
        toGraphicsData(): any;
        toPreviewData(): any;
        _getTransInfoFromGeom(module: any): any;
        _getNewMaterial(module: any): any;
        _getUVbox(module: any): any;
        _reverseMeshDefByRCP(module: any): any;
        _applyMaterialToUV(module: any, exports: any, require: any, i: any): any;
        _getFgiMeshDefWithUvTransform(module: any, exports: any, require: any): any;
        updateWorldMatrix(module: any): any;
        getBottomFacePaths(): any;
    }
    export const faceInfo: any;
    export const _provider: any;
    export const _customAttrs: any;
    export const _customRCP: any;
    export const _geometryDirty: any;
    export const positionDirty: any;
    export const holes: any;
    export const x: any;
    export const y: any;
    export const rotation: any;
    export const _matrixLocal: any;
    export const needUpdateMatrix: any;
    export const z: any;
    export const planeHoles: any;
    export const _previewData: any;
    export const parent: any;
    export const entity: any;
    export const id: any;
    export const meshKey: any;
    export const texture: any;
    export const colorMode: any;
    export const diffuseMapUvTransform: any;
    export const normalMapUvTransform: any;
    export const meshDef: any;
    export const seekIds: any;
    export const index: any;
    export const customAttrs: any;
    export const graphicsPath: any;
    export const entityId: any;
    export const _matrixWorld: any;
}

declare module "9852" {
    export const ExtraordinaryFace2d: any;
    // Original Name: a
    export class ExtraordinaryFace2d extends import("71518").ExtraordinarySketchBase {
        constructor(module: any, ...args: any[]);
        setOuterLoop(module: any): any;
        setInnerLoops(module: any): any;
        toBuilderRegion(module: any): any;
        toMathPolygon(): any;
        toPolygon(): any;
        replaceTopoName(module: any, exports: any): any;
        _reverseBuilderCurve(module: any): any;
        decodeTopoName(module: any): any;
    }
    export const _outerLoop: any;
    export const _innerLoops: any;
    export const topos: any;
    export const face: any;
    export const length: any;
}

declare module "98733" {
    export const IFaceGroupBound: any;
    export const FaceGroupConnectModeEnum: any;
    export const DataModelConvertor: any;
    export const MixPaintDecorator: any;
    export const MixPaint: any;
    export const MaterialConvertor: any;
    export const MixPaintUpdaterV3: any;
    export const MixSketch2d: any;
    export const GussetGroup: any;
    export const GussetSurface: any;
    export const GussetBlock: any;
    export const WaterJetTile: any;
    export const Waistline: any;
    export const FreePatternBlock: any;
    export const PatternBlock: any;
    export const PatternGrid: any;
    export const Seam: any;
    export const PavingPointTypeEnum: any;
    export const PavingOption: any;
    export const BoundaryBlock: any;
    export const MixBlock: any;
    export const GridTypeEnum: any;
    export const Polygon_IO: any;
    export const Polygon: any;
    export const Region: any;
    export const MixGrid_IO: any;
    export const MixGrid: any;
    export const Boundary_IO: any;
    export const Boundary: any;
    export const Block: any;
    export const PatternTypeEnum: any;
    export const Pattern: any;
}

declare module "98737" {
    export const length: any;
    export const Point2DState: any;
    // Original Name: a
    export class Point2DState extends import("18439").State {
        constructor(module: any, exports: any, ...args: any[]);
        init(module: any, exports: any): any;
        verify(): any;
        verifyBeforeDump(): any;
        dump(module: any, exports: any): any;
        load(module: any, exports: any): any;
    }
    export const localId: any;
    export const name: any;
    export const isEditable: any;
    export const id: any;
    export const x: any;
    export const y: any;
    export const Class: any;
}

declare module "98745" {
    export const exports: any;
}

declare module "98790" {
    export const FaceUtil: any;
    export const z: any;
    export const x: any;
    export const y: any;
    export const length: any;
    export const id: any;
    export const outerLoop: any;
    export const innerLoops: any;
    export const base: any;
    export const ZSize: any;
    export const PI: any;
    export const thickness: any;
    export const surfaceObj: any;
    export const offset_x: any;
    export const offsetX: any;
    export const offset_y: any;
    export const offsetY: any;
    export const localId: any;
    export const tileSize_x: any;
    export const initTileSize_x: any;
    export const tileSize_y: any;
    export const initTileSize_y: any;
    export const normalTileSizeX: any;
    export const normalTileSize_x: any;
    export const normalTileSizeY: any;
    export const normalTileSize_y: any;
    export const srcTileSize_x: any;
    export const srcTileSize_y: any;
    export const textureRotation: any;
    export const rotateCenter: any;
    export const flipX: any;
    export const flipY: any;
    export const rotation: any;
    export const sameDirWithSurface: any;
    export const min: any;
    export const max: any;
    export const holes: any;
    export const param: any;
    export const type: any;
    export const mergePaths: any;
    export const path2ds: any;
    export const surface: any;
}

declare module "98922" {
    export const StateRequest: any;
    export const DataRequest: any;
    export const CompositeStateRequest: any;
    export const CompositeRequest: any;
}

declare module "98956" {
    export const TgSlabInfo: any;
    export const _rawSlabInfo: any;
    export const slab: any;
    export const structures: any;
    export const structuresInSlab: any;
    export const faces: any;
    export const rawPath: any;
    export const rawGeometry: any;
    export const path: any;
}

declare module "99044" {
    export const PExtruding: any;
    // Original Name: a
    export class PExtruding extends import("79579").PModel {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        onUpdate(): any;
    }
    export const _webCadDocument: any;
    export const length: any;
    export const originalPaths: any;
    export const snappingFaceKeys: any;
    export const _cache: any;
}

declare module "99123" {
    export const createCurve2D: any;
    export const isPolyCurve2dDumpData: any;
    export const isCurve2dDumpData: any;
    export const PolyCurve2d: any;
    // Original Name: c
    export class PolyCurve2d {
        constructor(...args: any[]);
        assign(module: any): any;
        getType(): any;
        load(module: any): any;
        dump(): any;
        clone(): any;
        setFromPoints(module: any, exports: any): any;
        setCurves(module: any): any;
        isClosed(): any;
        getDiscretePoints(module: any): any;
        isSamePolyCurve(module: any, exports: any): any;
    }
    export const curves: any;
    export const length: any;
}

declare module "99338" {
    export const length: any;
    export const Entity: any;
    export const Entity_IO: any;
    export const EntityFlagEnum: any;
    // Original Name: p
    export class Entity_IO extends import("2558").IBase {
        setInternalFields(module: any): any;
        instance(): any;
        mustDeepClone(module: any): any;
        load(module: any, exports: any, require: any, i: any): any;
    }
    export const _Entity_IO_instance: any;
    export const _flag: any;
    export const userDefined: any;
    export const c: any;
    export const invalidIds: any;
    // Original Name: f
    export class Entity extends import("2558").IObject {
        constructor(module: any, ...args: any[]);
        registerClass(module: any, exports: any): any;
        getClass(module: any): any;
        instanceOf(module: any): any;
        getClassName(): any;
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
        replaceChildren(module: any, exports: any, require: any, i: any): any;
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
        load(module: any, exports: any, require: any): any;
        needDump(): any;
        copyFrom(module: any): any;
        clone(): any;
        buildEntityFromDump(module: any, exports: any, require: any): any;
        getDumpedClassName(module: any): any;
        loadFromDumpById(module: any, exports: any, require: any, i: any): any;
        isEntityDumpData(module: any): any;
        getExistingEntity(module: any, exports: any): any;
        getConstructors(): any;
        loadEntityById(module: any, exports: any): any;
        _dispatchInvalidateSubgraph(module: any): any;
        _invalidateSubgraph(): any;
        traverse(module: any, exports: any): any;
        travers(module: any, exports: any): any;
        verify(module: any): any;
        onEntityDirty(): any;
        getProxyObject(): any;
        getProxyId(): any;
    }
    export const _boundDirty: any;
    export const _int_flag: any;
    export const _id: any;
    export const _doc: any;
    export const boundInternal: any;
    export const _parents: any;
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
    export const idGenerator: any;
    export const entities: any;
    export const l: any;
    export const data: any;
}

declare module "99622" {
    export const frozen: any;
    export const entries: any;
    export const prototype: any;
    export const exports: any;
    export const type: any;
    export const id: any;
    export const delete: any;
    export const has: any;
}

declare module "9964" {
    export const Util: any;
    export const outer: any;
    export const bg: any;
    export const isNewFGI: any;
    export const holes: any;
    export const height: any;
    export const length: any;
    export const bound: any;
    export const x: any;
    export const y: any;
    export const top: any;
    export const left: any;
    export const width: any;
    export const X: any;
    export const Y: any;
    export const path: any;
    export const isDistrict: any;
    export const isFlatPaint: any;
}

declare module "99684" {
    export const BoundUtil: any;
    export const left: any;
    export const right: any;
    export const bottom: any;
    export const top: any;
    export const front: any;
    export const back: any;
    export const square: any;
    export const center: any;
    export const XSize: any;
    export const YSize: any;
    export const ZSize: any;
    export const length: any;
    export const forEachChild: any;
    export const ZLength: any;
    export const XLength: any;
    export const YLength: any;
}

declare module "99692" {
    export const MixPaintV3: any;
    export const MixPaintV3_IO: any;
    // Original Name: p
    export class MixPaintV3_IO extends import("24567").Entity_IO {
        instance(): any;
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const _MixPaintV3_IO_instance: any;
    export const host: any;
    export const faceGroup: any;
    // Original Name: f
    export class MixPaintV3 extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        destroy(): any;
        getIO(): any;
        isRoot(): any;
        copyFrom(module: any): any;
        getFaceIds(): any;
        clearFaceGroup(): any;
        transform(module: any): any;
        mergeBackgroundWithOtherMixPaves(module: any): any;
        updateBackgroundPolygon(module: any, exports: any): any;
        setBackgroundData(module: any, exports: any): any;
        getBackgroundPath(): any;
        getBackgroundOuter(): any;
        clear(module: any): any;
        isValidChild(module: any): any;
        onChildAdded(module: any): any;
        onChildRemoved(module: any, exports: any): any;
        onChildDirty(module: any, exports: any): any;
        getPaintData(module: any): any;
        loadMigrationData(module: any, exports: any): any;
    }
    export const _host: any;
    export const _faceGroup: any;
    export const _dataVersion: any;
    export const _sketch2d: any;
    export const _disposed: any;
    export const faceEntity: any;
    export const faceId: any;
    export const backgroundMaterial: any;
    export const mixPave: any;
    export const faceGroupId: any;
    export const faceGroupBoundMap: any;
    export const independentRegions: any;
    export const regions: any;
    export const length: any;
    export const type: any;
    export const background: any;
}

declare module "99757" {
    export const length: any;
    export const ConcealedWorkTree: any;
    export const ConcealedWorkTree_IO: any;
    // Original Name: p
    export class ConcealedWorkTree_IO extends import("86829").ConcealedWorkCompEntity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const treeData: any;
    export const tr: any;
    // Original Name: f
    export class ConcealedWorkTree extends import("86829").ConcealedWorkCompEntity {
        constructor(...args: any[]);
        getIO(): any;
        size(): any;
        getDescendantsCount(module: any): any;
        getPreOrderNodes(): any;
        getSegments(): any;
        getJoints(): any;
        _traverseSegments(module: any, exports: any): any;
        findById(module: any): any;
        find(module: any): any;
        getChildNodes(module: any): any;
        getParentNode(module: any): any;
        addChildNode(module: any, exports: any): any;
        removeNode(module: any): any;
        removeSelf(): any;
        getStructureNode(module: any): any;
        _traverseStructureNode(module: any): any;
    }
    export const root: any;
    export const content: any;
    export const parentNode: any;
}

declare module "99768" {
    export const ContentTxnState: any;
    // Original Name: s
    export class ContentTxnState extends import("72664").EntityTxnState {
        constructor(module: any, exports: any, ...args: any[]);
        transact(module: any, exports: any, require: any, i: any): any;
        commit(module: any): any;
        postRestore(module: any, exports: any): any;
    }
    export const dataBefore: any;
    export const seekId: any;
    export const dataAfter: any;
}

declare module "998" {
    export const length: any;
    export const Obstacle_IO: any;
    export const Obstacle: any;
    // Original Name: u
    export class Obstacle_IO extends import("43113").CustomizedModel_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const __responsiveHeight: any;
    export const global_wall_height3d: any;
    export const responsiveHeight: any;
    export const wallMoldings: any;
    // Original Name: p
    export class Obstacle extends import("43113").CustomizedModel {
        constructor(module: any, exports: any, ...args: any[]);
        destroy(): any;
        magicFlippingSetting(): any;
        getParentRoom(): any;
        getIO(): any;
        getMolding(module: any): any;
        _removeMoldingFromWebCadDocument(module: any): any;
        _getWebCadDocumentFacePath(module: any): any;
        _setMoldingToWebCadDocument(module: any, exports: any): any;
        setMolding(module: any, exports: any): any;
        forEachMolding(module: any): any;
        setHeight(module: any): any;
        updateHeight(module: any): any;
        traverseMoldingGraphicsData(module: any): any;
        traverseBodyGraphicsData(module: any): any;
        getGraphicsData(): any;
        setMaterialData(module: any): any;
    }
    export const _moldings: any;
    export const signalMoldingChanged: any;
    export const _disposed: any;
    export const webCADDocument: any;
    export const x: any;
    export const y: any;
    export const _graphicsData: any;
    export const normalTexture: any;
    export const tileSize_x: any;
    export const tileSize_y: any;
    export const fpMaterialData: any;
    export const docId: any;
}

declare module "99827" {
    export const Region: any;
    export const linkWallIds: any;
    export const coEdgePath: any;
    export const topoFaces: any;
    export const id: any;
    export const shellWrapper: any;
    export const brepFace: any;
}

declare module "99837" {
    export const BlockGroupMap: any;
    export const BlockGroup: any;
    export class n {
        constructor(module: any, ...args: any[]);
        computeGlobalPavingPoint(module: any, exports: any): any;
        computeLocalPavingPoint(module: any): any;
    }
    export const brickMap: any;
    export const outer: any;
    export const bbox: any;
    export const pattern: any;
    export const u: any;
    export const x: any;
    export const y: any;
    export const v: any;
    // Original Name: r
    export class BlockGroup {
        constructor(module: any, exports: any, require: any, ...args: any[]);
    }
    export const blocks: any;
    export const localIdToMassMap: any;
    export const patternCache: any;
    export const patToRotGroupMap: any;
    export const _patToCacheMap: any;
}

declare module "99856" {
    export const WallMolding: any;
    // Original Name: g
    export class WallMolding extends import("75312").BaseObject {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        onEntityDirty(module: any): any;
        needGenerateHighResolutionData(): any;
        toGraphicsData(): any;
        toGraphicsDataAsync(module: any): any;
        updateWorldMatrix(): any;
        onUpdate(): any;
        _isPointOnDoor(module: any, exports: any): any;
        _isPointsOnSamePolygon(module: any, exports: any, require: any): any;
        _isPointOnPolygons(module: any, exports: any): any;
        _isPointOnFlue(module: any, exports: any): any;
        _getObjectProfile(module: any): any;
        _getOpeningProfile(module: any, exports: any, require: any, i: any, n: any): any;
        _getValidHole(module: any, exports: any, require: any, i: any, n: any): any;
        _getPathIndexOnStructure(module: any, exports: any, require: any): any;
        filterHoleForSplittedWallFace(module: any, exports: any): any;
        pathGenerateForSplittedWallFace(module: any, exports: any, require: any, i: any): any;
        pathGenerate(module: any, exports: any, require: any, i: any, n: any, r: any, a: any, s: any): any;
        _findIndex(module: any, exports: any): any;
        _findFirstLastPointIndex(module: any, exports: any): any;
        _getArcWallWholeMoldingPaths(module: any, exports: any, require: any, i: any, n: any, r: any): any;
        else(module: any): any;
        paths: any;
        push(require: any, map: any): any;
    }
    export const _distances: any;
    export const _webCadDocument: any;
    export const DISTANCE_TOLERENCE: any;
    export const face: any;
    export const wall: any;
    export const moldingType: any;
    export const geometryDirty: any;
    export const type: any;
    export const entity: any;
    export const _matrixWorld: any;
    export const needUpdateMatrix: any;
    export const _molding: any;
    export const length: any;
    export const z: any;
    export const x: any;
    export const y: any;
    export const radius: any;
    export const width: any;
    export const arcInfo: any;
    export const paths: any;
    export const wholePaths: any;
    export const max: any;
    export const min: any;
    export const pos: any;
    export const to: any;
    export const from: any;
    export const prev: any;
    export const next: any;
    export const parent: any;
    export const ZLength: any;
    export const Baseboard: any;
    export const material: any;
    export const bKeepProfileCordinate: any;
    export const dirType: any;
    export const getPaths: any;
    export const getWholePaths: any;
    export const userData: any;
    export const height3d: any;
    export const offset: any;
    export const height: any;
    export const tileSize_x: any;
    export const tileSize_y: any;
    export const len: any;
    export const heightOffset: any;
    export const WallBoardWaistLine: any;
    export const ZSize: any;
    export const posZ: any;
    export const XLength: any;
    export const YLength: any;
}

declare module "99857" {
    export const ConstraintFactory: any;
    // Original Name: r
    export class ConstraintFactory {
        instance(): any;
        createConstraint(module: any, exports: any): any;
        constructor(...args: any[]);
    }
    export const _instance: any;
}

declare module "99868" {
    export const lastIndex: any;
    export const multiline: any;
    export const input: any;
    export const index: any;
    export const length: any;
    export const groups: any;
    export const exports: any;
}

declare module "99876" {
    export const GeometryObjectType: any;
    export const Polygon2d: any;
    export const DiscretePolygon2d: any;
    export const IPoint2d: any;
    export const Point2d: any;
    export const LineSegment2d: any;
    export const PolyCurve2d: any;
    export const Arc2d: any;
    export const Circle2d: any;
}

declare module "C" {
    export const currentPos: any;
}

declare module "F" {
}

declare module "L" {
    export const currentPos: any;
}

declare module "M" {
    export const currentPos: any;
}

declare module "Q" {
    export const currentPos: any;
}