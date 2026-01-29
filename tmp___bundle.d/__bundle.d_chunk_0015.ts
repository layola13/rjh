    export const XLength: any;
    export const YLength: any;
    export const ZLength: any;
    export const rotation: any;
    export const XRotation: any;
    export const YRotation: any;
    export const ZRotation: any;
    export const __YLength: any;
    export const material: any;
    export const id: any;
    export const type: any;
    export const loading: any;
    export const __XLength: any;
}

declare module "83936" {
    export const SlabFaceInfo: any;
    // Original Name: n
    export class SlabFaceInfo extends import("24616").FaceInfo {
        constructor(module: any, exports: any, ...args: any[]);
    }
    export const isAux: any;
}

declare module "84100" {
    export const set: any;
    export const size: any;
    export const has: any;
    export const keys: any;
    export const prototype: any;
    export const exports: any;
}

declare module "84202" {
    export const length: any;
    export const DecorateSketch2d: any;
    export const DecorateSketch2d_IO: any;
    // Original Name: l
    export class DecorateSketch2d_IO extends import("46583").Sketch2d_IO {
        instance(): any;
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const _DecorateSketch2d_IO_instance: any;
    export const extrusionValueMap: any;
    export const convert3dMatrix: any;
    export const _extrusionValueMap: any;
    export const idGenerator: any;
    export class c extends import("81346").Sketch2dBuilder {
        copyFaceProps(module: any, exports: any): any;
    }
    // Original Name: d
    export class DecorateSketch2d extends import("46583").Sketch2d {
        constructor(module: any, exports: any, ...args: any[]);
        _processFieldChanged(module: any): any;
        getIO(): any;
        getExtrusionValue(module: any): any;
        createBuilder(): any;
        setExtrusionValue(module: any, exports: any): any;
        copyFace(module: any, exports: any, require: any): any;
    }
    export const _boundDirty: any;
    export const id: any;
}

declare module "84236" {
    export const writable: any;
}

declare module "84333" {
    export const length: any;
    export const NCustomizedModelLightSlot: any;
    export const NCustomizedModelLightSlot_IO: any;
    // Original Name: I
    export class NCustomizedModelLightSlot_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
        _migrate(module: any): any;
    }
    export const parameters: any;
    export const coord: any;
    export const facematerialmap: any;
    export const id: any;
    export const name: any;
    export const sketchComId: any;
    export const tag: any;
    export const defaultmaterialmap: any;
    export const lightSlotId: any;
    export const hasSelfHostLightBand: any;
    export const material: any;
    // Original Name: w
    export class NCustomizedModelLightSlot extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        dirty(module: any, exports: any): any;
        init(module: any): any;
        destroy(): any;
        getFaceTagByMeshKey(module: any): any;
        getGraphicsData(): any;
        getGraphicsDataAsync(): any;
        clone(): any;
        copyFrom(module: any): any;
        getTopProjection(module: any, exports: any): any;
        getBottomProjection(module: any): any;
        getFrontProjection(module: any): any;
        updateProjectionTypesFlag(module: any): any;
        _updateProjectionMaterialData(module: any): any;
        getFaceProjectionPlane(module: any, exports: any): any;
        getFaceProjectionMathPlane(module: any, exports: any): any;
        getSweepPath3D(): any;
        getSweepProfile(): any;
        getOriginSweepProfile(): any;
        getLocalCoordinate(): any;
        getBrep(): any;
        combineMaterialGraphics(module: any): any;
        getMeshKeyByFaceTag(module: any): any;
        dirtyFaceMaterial(module: any, exports: any): any;
        getAllMoldings(): any;
        getAllLightBands(): any;
        getSelfHostLightBand(): any;
        generateSelfHostLightBand(): any;
        deleteSelfHostLightBand(): any;
        calcParametricLightSlotHostMoldingSweepPath(): any;
        calcInnerLightBandSweepPath(): any;
        calcEdgePath(): any;
        isPathClose(): any;
        getHost(): any;
        getIO(): any;
        updateExistence(): any;
        findRelatedMoldings(module: any): any;
        findRelatedLightBands(module: any): any;
        dirtyGeometry(module: any): any;
        dirtyClipGeometry(module: any): any;
        copy(module: any, exports: any, require: any): any;
        getRelyerById(module: any): any;
        _getFaceGraphicData(module: any): any;
        getFacePaths(module: any, exports: any): any;
        setDefaultMaterialDataInternal(module: any, exports: any): any;
        setFaceMaterialInternal(module: any, exports: any): any;
        refreshFaceMaterial(module: any, exports: any): any;
        _onFaceMaterialDirty(module: any): any;
    }
    export const signalMaterialChanged: any;
    export const _initedLightBand: any;
    export const topProjection: any;
    export const bottomProjection: any;
    export const frontProjection: any;
    export const _graphicsData: any;
    export const signalClipDirty: any;
    export const _previewMode: any;
    export const Geometry: any;
    export const _brepcache: any;
    export const options: any;
    export const unioned: any;
    export const surfaceArea: any;
    export const contours: any;
    export const isLightBand: any;
    export const isLightSlot: any;
    export const isMolding: any;
    export const materialData: any;
    export const xRay: any;
    export const surface: any;
    export const relyer: any;
    export const flipVertical: any;
    export const aLength: any;
    export const userData: any;
    export const bLength: any;
    export const fpMaterialData: any;
    export const lightBandId: any;
    export const faceIndex: any;
    export const parent: any;
    export const _boundDirty: any;
    export const lightBandInitialized: any;
    export const target: any;
    export const outer: any;
    export const holes: any;
    export const faceEntity: any;
    export const faceId: any;
    export const mixpaint: any;
    export const projections: any;
    export const paths: any;
    export const x: any;
    export const y: any;
    export const __parameters: any;
}

declare module "84418" {
    export const ConstraintFactory: any;
    export const PositionConstraint: any;
    export const EquationConstraint: any;
    export const Constraint: any;
}

declare module "84507" {
    export const length: any;
    export const Camera_IO: any;
    export const CameraFlagEnum: any;
    export const CameraViewTypeEnum: any;
    export const CameraTypeEnum: any;
    export const Camera: any;
    export const FirstPerson: any;
    export const OrbitView: any;
    export const OrthView: any;
    export const Perspective: any;
    export const Orthographic: any;
    export const toggleOff: any;
    // Original Name: d
    export class Camera_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const type: any;
    export const view_type: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const target_x: any;
    export const target_y: any;
    export const target_z: any;
    export const horizontal_fov: any;
    export const pitch: any;
    export const near: any;
    export const clip: any;
    export const zoom: any;
    export const __x: any;
    export const __y: any;
    export const __z: any;
    export const __target_x: any;
    export const __target_y: any;
    export const __target_z: any;
    export const __horizontal_fov: any;
    export const __pitch: any;
    export const __near: any;
    export const __clip: any;
    export const __zoom: any;
    // Original Name: h
    export class Camera extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        verify(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        create(module: any): any;
        reset(module: any): any;
        getIO(): any;
        refreshBoundInternal(): any;
        isValid(): any;
        move(module: any, exports: any): any;
        moveTo(module: any, exports: any): any;
        clone(): any;
    }
    export const __view_type: any;
    export const __render_fov: any;
    export const outline: any;
    export const _flag: any;
}

declare module "84600" {
    export const CircuitComp: any;
    export const CircuitCompEnum: any;
    export const GBCircuit: any;
    // Original Name: n
    export class CircuitComp extends import("8467").Component {
    }
}

declare module "8467" {
    export const Component: any;
    // Original Name: o
    export class Component {
        constructor(...args: any[]);
        refs(): any;
        clone(): any;
        dump(): any;
    }
    export const _referObject: any;
}

declare module "85311" {
    export const exports: any;
}

declare module "85383" {
    export const constructor: any;
    export const dotAll: any;
    export const raw: any;
    export const sticky: any;
    export const length: any;
    export const groups: any;
    export const prototype: any;
}

declare module "85409" {
    export const Util: any;
    export const id: any;
    export const type: any;
    export const partner: any;
    export const length: any;
    export const outerLoop: any;
    export const outer: any;
    export const innerLoops: any;
    export const holes: any;
}

declare module "85425" {
    export const StateRequest: any;
    // Original Name: l
    export class StateRequest extends import("46382").Request {
        constructor(...args: any[]);
        canTransact(): any;
        canTransactField(): any;
        transact(module: any, exports: any, require: any, i: any): any;
        tryCreateEntityProxyUndoRedoObject(module: any): any;
        onPreCommit(): any;
        onCommit(): any;
        onPostCommit(): any;
        restore(module: any, exports: any): any;
        onUndo(): any;
        onRedo(): any;
        onCompose(module: any, exports: any): any;
    }
    export const txnStates: any;
    export const before: any;
    export const after: any;
    export const materialsData: any;
    export const productsMap: any;
    export const isTransacting: any;
    export const isDuringRestore: any;
    export const entityMapDuringTransacting: any;
    export const needRestoreAssociation: any;
    export const proxyUndoRedoObjs: any;
    export const data: any;
    export const associations: any;
    export const type: any;
    export const __onCommitInvoked: any;
    export const activeRequest: any;
    export const lastType: any;
    export const dataAfter: any;
    export const afterMaterialsData: any;
}

declare module "85436" {
    export const Door_IO: any;
    export const Door: any;
    // Original Name: c
    export class Door_IO extends import("86866").Opening_IO {
        load(module: any, exports: any, require: any): any;
    }
    // Original Name: d
    export class Door extends import("86866").Opening {
        constructor(module: any, exports: any, ...args: any[]);
        getIO(): any;
        open(module: any): any;
        close(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        onHostChanged(): any;
        onSwingChanged(): any;
        getDoorOffset(): any;
        canOpen(): any;
        _getAxisInfo(): any;
        updateOpenStatus(module: any): any;
        _getBottomFaceDefaultMaterial(): any;
        getBaseboardCutterInfo(module: any): any;
    }
    export const topView: any;
    export const Resources: any;
    export const __isOpened: any;
    export const isOpened: any;
    export const metadata: any;
    export const length: any;
    export const __angle: any;
    export const __anchorAxis: any;
    export const __anchor: any;
    export const y: any;
    export const _bottomFaceDefaultMaterial: any;
}

declare module "85492" {
    export const MergePoint: any;
    export const Disjoint: any;
    export const TgWallUtil: any;
    export const getRegionPath: any;
    export const userData: any;
    export const radius: any;
    // Original Name: b
    export class TgWallUtil {
        _handleFacesFromBody(module: any, exports: any): any;
        _unionBodys(module: any, exports: any): any;
        _handleShellForRoofUseUnion(module: any, exports: any, require: any): any;
        c: any;
        constructor(...args: any[]);
    }
    export const length: any;
    export const bodys: any;
    export const material: any;
    export const mixpaint: any;
    export const faceEntity: any;
    export const oldId: any;
    export const height3d: any;
    export const tag: any;
    export const index: any;
    export const wallInfos: any;
    export const type: any;
    export const from: any;
    export const to: any;
    export const crossPath: any;
    export const path: any;
    export const between: any;
    export const jointType: any;
    export const PI2: any;
    export const wall: any;
    export const pointType: any;
    export const width: any;
    export const curve: any;
    export const EN_LINE_2D: any;
    export const x: any;
    export const y: any;
    export const exports: any;
    export const EN_ARC_2D: any;
    export const holes: any;
    export const host: any;
    export const wall2PTInEdges: any;
    export const dumpPtEges: any;
    export const rregion: any;
    // Original Name: T
    export class Disjoint {
        constructor(...args: any[]);
        clear(): any;
        find(module: any): any;
        merge(module: any, exports: any): any;
    }
    export const set: any;
    // Original Name: x
    export class MergePoint {
        constructor(module: any, ...args: any[]);
        clear(): any;
        merge(module: any): any;
        _mergeex(module: any, exports: any, require: any, i: any, n: any): any;
    }
    export const tol: any;
    export const _tmp: any;
    export const _disjoint: any;
}

declare module "85493" {
    export const MoldingUtil: any;
    export const Mitre: any;
    export const type: any;
    export const XSize: any;
    export const YSize: any;
    export const height: any;
    export const thickness: any;
    export const entityAttribute: any;
    export const offset: any;
    export const holes: any;
    export const length: any;
    export const index: any;
    export const isAux: any;
    export const topoPathers: any;
    export const from: any;
    export const to: any;
    export const host: any;
    export const startParam: any;
    export const isInWall: any;
}

declare module "85689" {
    export const length: any;
    export const Opening_IO: any;
    export const OpeningFaceType: any;
    export const Opening: any;
    export const top: any;
    export const bottom: any;
    export const side: any;
    // Original Name: P
    export class Opening_IO extends import("72132").Content_IO {
        load(module: any, exports: any, require: any): any;
    }
    export const __isOpened: any;
    export const __angle: any;
    export const __anchor: any;
    export const __anchorAxis: any;
    export const subCategory: any;
    export const __profile: any;
    export const profile: any;
    export const __swing: any;
    export const __doorStoneMaterialEnabled: any;
    export const _isDefaultAlign: any;
    export const __thickness: any;
    export const thickness: any;
    export const __indent: any;
    export const __archHeight: any;
    export const _needUpdateFaces: any;
    export class E {
        constructor(module: any, ...args: any[]);
        toPolygon(module: any): any;
    }
    export const points: any;
    // Original Name: M
    export class Opening extends import("72132").Content {
        getIndentVector(): any;
        getIndentDirection(): any;
        constructor(module: any, ...args: any[]);
        canOpen(): any;
        migrateContentMetaData(module: any): any;
        updateProfile(module: any): any;
        supportPM(): any;
        initByMeta(module: any, exports: any, require: any, i: any): any;
        updateByPM(module: any, exports: any, require: any): any;
        getMetadataFilterKeys(): any;
        _initFaceSets(): any;
        verify(): any;
        destroy(): any;
        resize(module: any, exports: any, require: any, i: any): any;
        _getAngle(): any;
        _validateOpenStatus(): any;
        addFace(module: any, exports: any): any;
        getFaces(module: any): any;
        _getFaces(module: any): any;
        getFaceType(module: any): any;
        setFaces(module: any, exports: any): any;
        _setFacesObj(module: any, exports: any): any;
        _setFaces(module: any, exports: any): any;
        _getBottomFaceDefaultMaterial(): any;
        getThickness(): any;
        setThickness(module: any): any;
        _setThickness(module: any): any;
        dirtyFaces(): any;
        forEachFace(module: any, exports: any): any;
        getDoorStoneFace(): any;
        getBottomFace(): any;
        getZeroHeightBottomFace(): any;
        isDoorStoneMaterialEnabled(): any;
        setDoorStoneMaterialStatus(module: any): any;
        toggleDoorStoneAlignSide(): any;
        getDoorStoneAlignSideStatus(): any;
        getBottomFaceMaterial(): any;
        setBottomFaceMaterial(module: any): any;
        _setBottomFaceMaterial(module: any): any;
        getIO(): any;
        _flipSwing(module: any): any;
        _buildDefaultRectangleProfile(): any;
        forEachMaterial(module: any, exports: any): any;
    }
    export const PI: any;
    export const __isDefaultAlign: any;
    export const _faces: any;
    export const signalPocketAdded: any;
    export const signalPocketRemoved: any;
    export const signalHostChanged: any;
    export const _materialSignalHook: any;
    export const YLength: any;
    export const ZLength: any;
    export const _baseProfile: any;
    export const _disposed: any;
    export const XScale: any;
    export const ZScale: any;
    export const YScale: any;
    export const topFaces: any;
    export const bottomFaces: any;
    export const sideFaces: any;
    export const _bottomFaceDefaultMaterial: any;
    export const z: any;
    export const doorStoneMaterialEnabled: any;
    export const baseProfile: any;
    export const _bottomFace: any;
    export const isDefaultAlign: any;
    export const bottomFaceMaterial: any;
    export const _bottomFaceMaterial: any;
    export const material: any;
    export const swing: any;
    export const SWING_SCALE_TABLE: any;
    export const x: any;
    export const y: any;
}

declare module "8569" {
    export const writable: any;
}

declare module "85828" {
    export const Transaction: any;
    export const length: any;
    export const id: any;
    export const webCADDocument: any;
    export const p: any;
    export const dumps: any;
    export const entities: any;
    export const productsMap: any;
    export const materialsData: any;
    export const statesMap: any;
    export const constraintMap: any;
    export const shallowDumps: any;
    export const associations: any;
    export const data: any;
    export const materials: any;
    export const states: any;
    export const constraints: any;
    export const invalidIds: any;
    export const duringRestore: any;
    export const dispatchEvent: any;
    export const openings: any;
    export const contents: any;
    export const rotation: any;
    export const host: any;
    export const parameters: any;
    export const partsInfo: any;
    export const children: any;
    export const members: any;
    export const pAssembly: any;
    export const ID: any;
    export const from: any;
    export const to: any;
    export const cx: any;
    export const cy: any;
    export const height3d: any;
    export const association: any;
    export const _flag: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const __parameters: any;
}

declare module "86260" {
    export const NCustomizedParametricModelUtil: any;
    export const doc: any;
    export const z: any;
    export const YSize: any;
    export const moldingId: any;
    export const slotId: any;
}

declare module "86352" {
    export const find: any;
}

declare module "86442" {
    export const CustomizedBackgroundWall_IO: any;
    export const CustomizedBackgroundWall: any;
    // Original Name: r
    export class CustomizedBackgroundWall_IO extends import("10653").CustomizedFeatureModel_IO {
        load(module: any, exports: any, require: any): any;
    }
    export const convert3dMatrix: any;
    // Original Name: a
    export class CustomizedBackgroundWall extends import("10653").CustomizedFeatureModel {
        constructor(module: any, exports: any, ...args: any[]);
        getIO(): any;
        _getZOffsetScale(): any;
    }
}

declare module "86511" {
    export const exports: any;
}

declare module "86517" {
    export const ParametricCurtain: any;
    export const ParametricCurtain_IO: any;
    // Original Name: r
    export class ParametricCurtain_IO extends import("6087").ParametricContentBase_IO {
    }
    // Original Name: a
    export class ParametricCurtain extends import("6087").ParametricContentBase {
        getIO(): any;
    }
}

declare module "86583" {
    export const OpeningUtil: any;
    export const outerWallSide: any;
    export const length: any;
}

declare module "86587" {
    export const ExportSceneData: any;
    // Original Name: l
    export class ExportSceneData {
        getSceneDataAsync(module: any, exports: any, require: any): any;
        _collectGroups(module: any): any;
        _dealPanoConnectInfo(module: any): any;
        _designOpen(module: any, exports: any): any;
        getRenderSceneData(module: any): any;
        _fillMaterialDataAsync(module: any, exports: any): any;
        constructor(...args: any[]);
    }
    export const type: any;
    export const jid: any;
    export const members: any;
    export const inDoors: any;
    export const outDoors: any;
    export const left: any;
    export const top: any;
    export const z: any;
    export const target_x: any;
    export const target_y: any;
    export const near: any;
    export const far: any;
    export const allLights: any;
    export const pengpaiParams: any;
    export const renderpara: any;
    export const hsMaterialParameter: any;
    export const contentType: any;
    export const colorMode: any;
    export const texture: any;
    export const normaltexture: any;
}

declare module "86753" {
    // Original Name: r
    export class default extends import("42288").default {
        _compute(module: any, exports: any, require: any, i: any): any;
        _isValid(module: any, exports: any, require: any): any;
    }
    export const templateKey: any;
    export const z: any;
    export const x: any;
    export const y: any;
}

declare module "86761" {
    export const isArray: any;
    export const exports: any;
}

declare module "86812" {
    export const state: any;
    export const get: any;
    export const has: any;
    export const set: any;
    export const facade: any;
    export const exports: any;
}

declare module "86829" {
    export const length: any;
    export const ConcealedWorkCompEntity: any;
    export const ConcealedWorkCompEntity_IO: any;
    // Original Name: s
    export class ConcealedWorkCompEntity_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const components: any;
    export const size: any;
    export const comps: any;
    // Original Name: l
    export class ConcealedWorkCompEntity extends import("24567").Entity {
        constructor(...args: any[]);
        getIO(): any;
        addComponent(module: any): any;
        removeComponent(module: any): any;
        getComponent(module: any): any;
        _addCWEntity(module: any, exports: any): any;
    }
    export const referObject: any;
    export const id: any;
}

declare module "86866" {
    export const length: any;
    export const Opening_IO: any;
    export const OpeningFaceType: any;
    export const Opening: any;
    export const top: any;
    export const bottom: any;
    export const side: any;
    // Original Name: A
    export class Opening_IO extends import("20551").Content_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
        postLoad(module: any, exports: any): any;
        migrateLoad(module: any, exports: any, require: any): any;
        _migratePMOpeningFrontProfile(module: any): any;
    }
    export const isOpened: any;
    export const animations: any;
    export const subCategory: any;
    export const profile: any;
    export const swing: any;
    export const doorStoneMaterialEnabled: any;
    export const _isDoorStoneMaterialEnabled: any;
    export const isDefaultAlign: any;
    export const _isDefaultAlign: any;
    export const thickness: any;
    export const indent: any;
    export const archHeight: any;
    export const fP: any;
    export const bottomFaceMaterial: any;
    export const dumpedEntities: any;
    export const hostRoofFaceId: any;
    export const __isOpened: any;
    export const __angle: any;
    export const __anchor: any;
    export const __anchorAxis: any;
    export const __profile: any;
    export const __swing: any;
    export const __doorStoneMaterialEnabled: any;
    export const _bottomFaceMaterial: any;
    export const __thickness: any;
    export const __indent: any;
    export const __archHeight: any;
    export const _needUpdateFaces: any;
    export const originKey: any;
    export class B {
        constructor(module: any, ...args: any[]);
        toPolygon(module: any): any;
    }
    export const points: any;
    // Original Name: U
    export class Opening extends import("20551").Content {
        getIndentVector(): any;
        getIndentNormal2(): any;
        getIndentDirection(): any;
        getIndentNormal3(): any;
        getIndentDirection3(): any;
        getIndentVector3(): any;
        constructor(module: any, exports: any, ...args: any[]);
        canOpen(): any;
        migrateContentMetaData(module: any): any;
        supportPM(): any;
        initByMeta(module: any, exports: any, require: any, i: any): any;
        refreshFrontProfile(module: any): any;
        updateByPM(module: any, exports: any, require: any): any;
        getMetadataFilterKeys(): any;
        _initFaceSets(): any;
        verify(): any;
        destroy(): any;
        resize(module: any, exports: any, require: any, i: any): any;
        updateProfile(module: any): any;
        _getAngle(): any;
        _validateOpenStatus(): any;
        getFaces(module: any): any;
        _getFaces(module: any): any;
        getFaceType(module: any): any;
        setFaces(module: any, exports: any): any;
        _getBottomFaceDefaultMaterial(): any;
        getThickness(): any;
        setThickness(module: any): any;
        _setThickness(module: any): any;
        dirtyFaces(): any;
        forEachFace(module: any, exports: any): any;
        getDoorStoneFace(): any;
        getBottomFaces(): any;
        getBottomFace(): any;
        getZeroHeightBottomFace(): any;
        isDoorStoneMaterialEnabled(): any;
        setDoorStoneMaterialStatus(module: any): any;
        _onDoorStoneMaterialStatusChanged(): any;
        toggleDoorStoneAlignSide(): any;
        getDoorStoneAlignSideStatus(): any;
        _onDefaultAlignChanged(module: any, exports: any): any;
        getBottomFaceMaterial(): any;
        setBottomFaceMaterial(module: any): any;
        _setBottomFaceMaterial(module: any): any;
        forEachPocket(module: any, exports: any): any;
        canAddPocket(): any;
        getPocket(): any;
        getPocketSize(): any;
        isShowPocket(): any;
        addPocket(module: any, exports: any): any;
        removePocket(module: any): any;
        onChildRemoved(module: any, exports: any): any;
        onPocketAdded(): any;
        onPocketRemoved(): any;
        onPocketSizeChanged(): any;
        getIO(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        updateMixPaintAndAlignFaces(): any;
        updateFaceMixPaint(module: any): any;
        onSwingChanged(): any;
        _updateFaceMixpaint(module: any): any;
        _flipSwing(module: any): any;
        mirror(module: any): any;
        translate(module: any): any;
        _notifyHost(): any;
        _buildDefaultRectangleProfile(): any;
        _setHost(module: any): any;
        onHostChanged(): any;
        build(module: any): any;
        refreshBoundInternal(): any;
        forEachMaterial(module: any, exports: any): any;
        _getHostFace(module: any): any;
        updateHostFace(): any;
        exports: any;
    }
    export const PI: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const signalValidityChanged: any;
    export const signalDragChanged: any;
    export const __isDefaultAlign: any;
    export const _faces: any;
    export const frontProfile: any;
    export const signalPocketAdded: any;
    export const signalPocketRemoved: any;
    export const signalHostChanged: any;
    export const _materialSignalHook: any;
    export const _blockFieldChange: any;
    export const YLength: any;
    export const ZLength: any;
    export const _pocket: any;
    export const _baseProfile: any;
    export const XLength: any;
    export const height: any;
    export const _disposed: any;
    export const XScale: any;
    export const ZScale: any;
    export const YScale: any;
    export const masterId: any;
    export const id: any;
    export const _bottomFaceDefaultMaterial: any;
    export const sideFaces: any;
    export const material: any;
    export const hidden: any;
    export const type: any;
    export const ZRotation: any;
    export const _hostWalls: any;
    export const _hostRoofFaceId: any;
    export const YTotalSize: any;
    export const XTotalSize: any;
    export const outerWallSide: any;
    export const left: any;
    export const hostFace: any;
    export const loading: any;
    export const parent: any;
    export const outerThickness: any;
    export const Outer: any;
    export const surface: any;
    export const cutPath: any;
    export const host: any;
    export const SWING_SCALE_TABLE: any;
}

declare module "86918" {
    export const ExportLights: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const XRotation: any;
    export const YRotation: any;
    export const ZRotation: any;
    export const width: any;
    export const height: any;
    export const skylightPortal: any;
    export const rotationPoint: any;
    export const hostInstanceId: any;
    export const type: any;
    export const FirstPerson: any;
    export const length: any;
    export const target_x: any;
    export const target_y: any;
    export const const: any;
    export const null: any;
    export const id: any;
    export const intensity: any;
    export const contentID: any;
    export const content: any;
    export const paths: any;
    export const bandIndex: any;
    export const lightBandIndex: any;
    export const meshRef: any;
    export const entityId: any;
    export const temperature: any;
    export const rgb: any;
    export const hiddenList: any;
    export const XSize: any;
    export const global_wall_height3d: any;
    export const height3d: any;
    export const sunlight: any;
    export const lightGroupId: any;
    export const sunlightOptions: any;
    export const options: any;
    export const appliedTemplate: any;
    export const Default: any;
    export const templateKey: any;
    export const Class: any;
    export const filterColor: any;
    export const position: any;
    export const target: any;
    export const sizeMultiplier: any;
    export const volumeLight: any;
    export const members: any;
    export const name: any;
    export const presetVirtualLights: any;
    export const removed: any;
    export const affectSpecular: any;
}

declare module "86998" {
    export const ProjectionHelper: any;
    export const BigXY: any;
    // Original Name: r
    export class BigXY {
        constructor(module: any, exports: any, ...args: any[]);
    }
    export const _x: any;
    export const _y: any;
    // Original Name: a
    export class ProjectionHelper {
        export2DProjection(module: any, exports: any, require: any): any;
        exportSimple2DProjection(module: any, exports: any, require: any): any;
        getSurffaceArea(module: any, exports: any): any;
        calcProjectionContours(module: any, exports: any): any;
        getContours(module: any): any;
        getPolygons(module: any): any;
        isTheSamePlane(module: any, exports: any): any;
        judgeFacePoseType(module: any, exports: any): any;
        calcFaceDistance(module: any, exports: any): any;
        calcContinousFaceDistance(module: any, exports: any): any;
        projectFace(module: any, exports: any, require: any): any;
        projectContinousFace(module: any, exports: any, require: any): any;
        projectNonPlaneFace(module: any, exports: any, require: any): any;
        getInstance(): any;
        constructor(...args: any[]);
    }
    export const facetag: any;
    export const excludeFaceTags: any;
    export const length: any;
    export const distanceWithDirection: any;
    export const distance: any;
    export const tag: any;
    export const entityTag: any;
    export const _instance: any;
    export const xyPlane: any;
}

declare module "87004" {
    export const CWContentUtil: any;
    export const toHostMaxDistance: any;
    export const getHost: any;
    export const length: any;
    export const z: any;
}

declare module "87067" {
    // Original Name: n
    export class default extends import("42288").default {
        _compute(module: any, exports: any, require: any, i: any): any;
    }
    export const y: any;
}

declare module "8711" {
    export const SpaceInfo: any;
    export const path: any;
    export const floors: any;
    export const ceilings: any;
    export const slabFaces: any;
    export const structureFaces: any;
    export const beamFaces: any;
    export const structures: any;
    export const beams: any;
    export const _layer: any;
}

declare module "87281" {
    export const length: any;
    export const Group_IO: any;
    export const GroupFlagEnum: any;
    export const Group: any;
    // Original Name: d
    export class Group_IO extends import("20551").Content_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const members: any;
    export const group: any;
    // Original Name: h
    export class Group extends import("20551").Content {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any): any;
        getMetadataFilterKeys(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        add(module: any): any;
        addItem(module: any): any;
        remove(module: any): any;
        removeItem(module: any): any;
        _setMembers(module: any): any;
        _addMember(module: any): any;
        _removeMember(module: any): any;
        replaceParent(module: any): any;
        forEachMember(module: any, exports: any): any;
        hasMember(module: any, exports: any): any;
        hasContent(module: any, exports: any): any;
        include(module: any): any;
        exclude(module: any): any;
        _rotate(module: any, exports: any, require: any): any;
        flipAll(): any;
        toFlatMemberList(module: any): any;
        toFlatGroupList(): any;
        setFlagOn(module: any, exports: any): any;
        setFlagOff(module: any, exports: any): any;
        getIO(): any;
        refreshBoundInternal(): any;
        _updateOutline(): any;
        _invalidateSubgraph(): any;
        _onXYZChanged(module: any, exports: any): any;
        _move(module: any): any;
        resize(module: any, exports: any, require: any): any;
        isMemberScalable(module: any): any;
        isMemberSizeCounted(module: any): any;
        _refreshProperties(): any;
        isValidHost(module: any): any;
        verify(): any;
    }
    export const __members: any;
    export const assignTo: any;
    export const hasContent: any;
    export const removed: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const flip: any;
    export const rotation: any;
    export const Class: any;
    export const NgGroup: any;
    export const XLength: any;
    export const YLength: any;
    export const __x: any;
    export const __y: any;
    export const outline: any;
    export const left: any;
    export const top: any;
    export const XSize: any;
    export const YSize: any;
    export const ZSize: any;
    export const __z: any;
    export const ZLength: any;
    export const _host: any;
}

declare module "87416" {
    export const AlignToWallTypeEnum: any;
    export const Beam: any;
    export const edge: any;
    export const center: any;
    // Original Name: a
    export class Beam extends import("43113").CustomizedModel {
        constructor(module: any, exports: any, ...args: any[]);
    }
    export const traverseBodyGraphicsData: any;
    export const _graphicsData: any;
    export const alignToWallType: any;
    export const roomSnapEnable: any;
}

declare module "87524" {
    export const exports: any;
}

declare module "87593" {
    export const GenericTree: any;
    // Original Name: n
    export class GenericTree {
        constructor(...args: any[]);
        addMap(module: any): any;
        _traverseIdMap(module: any): any;
        removeMap(module: any): any;
        clone(): any;
        dump(): any;
    }
    export const _idMap: any;
    export const _root: any;
    export const root: any;
    export const rt: any;
}

declare module "87836" {
    export const exports: any;
}

declare module "87861" {
    export const Util: any;
    // Original Name: d
    export class Util {
        getNCPContentClipPlanes(module: any): any;
        getNCPWorldMt(module: any, exports: any): any;
        getHostFaceClipContentPlanes(module: any, exports: any, require: any): any;
        getContentBox(module: any, exports: any): any;
        isBoxIntersectPlane(module: any, exports: any): any;
        ModelSpaceToViewSpace(module: any): any;
        getMaterialObject(module: any): any;
        getContentBound(module: any): any;
        getContentBoundTransformed(module: any, exports: any): any;
        getContentNode(module: any): any;
        getVerticalToWall(module: any): any;
        meshDefToGeometry(module: any): any;
        bufferGeometrytoMeshDef(module: any): any;
        getSeekIdSortByArea(module: any): any;
        constructExtrudeMesh(module: any, exports: any, require: any, i: any): any;
        dealMoldingMaterial(module: any, exports: any, require: any, i: any): any;
        setGraphicMaterialParam(module: any, exports: any, require: any, i: any, n: any): any;
        isConcaveConer(module: any, exports: any): any;
        getWallGeometryInfo(module: any, exports: any): any;
        GetContentGridhandler(module: any): any;
        getPocketOffsetIntoWall(module: any): any;
        getWallGeometryInfoExt(module: any): any;
        getExtrudeSurfaceGeometry(module: any, exports: any, require: any, i: any): any;
        projectionTo3DPaths(module: any, exports: any, require: any, i: any): any;
        getFgiMeshDef(module: any): any;
        getMoldingUvTransform(module: any): any;
        getCustomizedModelUvTransform(module: any, exports: any): any;
        getNCustomizedModelFgiMeshDef(module: any, exports: any): any;
        applyCustomizedModelMaterialToUV(module: any, exports: any): any;
        getUvTransformCommon(module: any, exports: any): any;
        applyMaterialToUV(module: any, exports: any): any;
        getPocketSideFaceUvTransform(module: any): any;
        applyPocketFrameMaterialToUV(module: any, exports: any): any;
        applyMoldingMaterialToUV(module: any, exports: any): any;
        applyCustomizedMoldingMaterialToUV(module: any, exports: any): any;
        applyWallMaterialToUV(module: any, exports: any): any;
        applyMatrix4ToVector3Array(module: any, exports: any, require: any): any;
        applyMatrix3ToVector3Array(module: any, exports: any, require: any): any;
        getRoomArea(module: any): any;
        getContentRotationQuaternion(module: any): any;
        constructor(...args: any[]);
    }
    export const exDir: any;
    export const length: any;
    export const PI: any;
    export const z: any;
    export const y: any;
    export const isCustomized: any;
    export const textureURI: any;
    export const parent: any;
    export const x: any;
    export const ZSize: any;
    export const tileSize_x: any;
    export const tileSize_y: any;
    export const normalTexture: any;
    export const override: any;
    export const normalTileSizeX: any;
    export const normalTileSizeY: any;
    export const right: any;
    export const innerPath: any;
    export const outerPath: any;
    export const fromPath: any;
    export const toPath: any;
    export const scaleRule: any;
    export const profileSizeX: any;
    export const moldingMaterialRotation: any;
    export const rotation: any;
    export const normalTileSize_x: any;
    export const normalTileSize_y: any;
    export const offsetX: any;
    export const offsetY: any;
    export const uvCenter: any;
    export const customData: any;
}

declare module "8812" {
    export const exports: any;
}

declare module "88143" {
    export const ExtraordinaryCircleArc2d: any;
    // Original Name: a
    export class ExtraordinaryCircleArc2d extends import("35656").ExtraordinaryCurve2d {
        constructor(module: any, exports: any, require: any, i: any, ...args: any[]);
        create(module: any, exports: any, require: any, i: any): any;
        setFrom(module: any): any;
        setTo(module: any): any;
        setCCW(module: any): any;
        setCenter(module: any): any;
        split(module: any): any;
        toMathCurve(): any;
    }
    export const _from: any;
    export const _to: any;
    export const _center: any;
    export const _isCCW: any;
    export const radius: any;
}

declare module "88318" {
    export const dotAll: any;
    export const exports: any;
}

declare module "88321" {
    export enum ParametricDoorWindowSystemVariablesName {
    }
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
}

declare module "88399" {
    export const WeakElecComp: any;
    // Original Name: r
    export class WeakElecComp extends import("15770").TreeComp {
        dump(): any;
        load(module: any, exports: any): any;
    }
    export const _referObject: any;
    export const Type: any;
}

declare module "88429" {
    export const length: any;
    export const DSweep: any;
    export const DSweep_IO: any;
    // Original Name: g
    export class DSweep_IO extends import("8202").ContentBase_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
        _migrateOldData(module: any, exports: any): any;
        _isOldDump(module: any): any;
        _isOldPathsDump(module: any): any;
    }
    export const productsMap: any;
    export const seekId: any;
    export const localId: any;
    export const name: any;
    export const customizationContentType: any;
    export const isFunctionComponent: any;
    export const imodelParentId: any;
    export const fixK: any;
    export const fixS: any;
    export const __paths: any;
    export const paths: any;
    export const material: any;
    export const metadata: any;
    export const __profileRefYDir: any;
    export const profileRefYDir: any;
    export const profileTransform: any;
    export const modelCutPlanes: any;
    export const masterId: any;
    export const __localId: any;
    export const __customizationContentType: any;
    export const __isFunctionComponent: any;
    export const __imodelParentId: any;
    export const __fixK: any;
    export const __fixS: any;
    export const _metadata: any;
    export const __metadata: any;
    export const __material: any;
    export const __profileTransform: any;
    export const __modelCutPlanes: any;
    export const __masterId: any;
    export const x: any;
    export const y: any;
    export const XSize: any;
    export const YSize: any;
    export const customizationVersion: any;
    // Original Name: p
    export class DSweep extends import("8202").ContentBase {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any): any;
        getPaths(): any;
        verify(): any;
        getIO(): any;
        update(module: any): any;
        setMaterial(module: any, exports: any): any;
        getMaterial(): any;
        refreshBoundInternal(): any;
        isContentInRoom(module: any, exports: any): any;
        isContentInLoop(module: any, exports: any): any;
        canTransactField(): any;
        getUniqueParent(): any;
        getProxyId(): any;
        getProxyObject(): any;
    }
    export const _seekId: any;
    export const __name: any;
    export const outline: any;
    export const __host: any;
    export const __x: any;
    export const __y: any;
    export const __z: any;
    export const z: any;
}

declare module "88442" {
    export const exports: any;
}

declare module "88567" {
    export const ColdWaterComp: any;
    // Original Name: r
    export class ColdWaterComp extends import("15770").TreeComp {
        dump(): any;
        load(module: any, exports: any): any;
    }
    export const _referObject: any;
    export const Type: any;
}

declare module "88644" {
    export const CustomizedTileUtil: any;
    export const type: any;
}

declare module "88801" {
    export const MixHost: any;
    // Original Name: n
    export class MixHost {
        constructor(...args: any[]);
        clone(): any;