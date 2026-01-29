        getIO(): any;
        refreshBoundInternal(): any;
        _copyFrom(module: any): any;
        onFieldChanged(module: any, exports: any, require: any): any;
    }
    export const __needUpdate: any;
    export const materials: any;
    export const material: any;
    export const needUpdate: any;
}

declare module "49234" {
    export const length: any;
    export const ParametricWindow_IO: any;
    export const ParametricWindowParamsEnum: any;
    export const ParametricWindowFlagEnum: any;
    export const ParametricWindow: any;
    export const dimensionOff: any;
    export const hoverOn: any;
    export const sideA: any;
    export const sideB: any;
    export const sideC: any;
    export const sideD: any;
    export const height: any;
    export const elevation: any;
    // Original Name: g
    export class ParametricWindow_IO extends import("20551").Content_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const parameters: any;
    export const partsInfo: any;
    export const __parameters: any;
    export const indent: any;
    export const metadata: any;
    // Original Name: p
    export class ParametricWindow extends import("20551").Content {
        constructor(module: any, exports: any, ...args: any[]);
        verify(): any;
        destroy(): any;
        initByMeta(module: any): any;
        getMetadataFilterKeys(): any;
        migrateContentMetaData(module: any): any;
        _initPartsInfo(module: any): any;
        _getWallInfo(module: any): any;
        _constructSideData(module: any, exports: any, require: any, i: any, n: any, r: any, a: any): any;
        getIO(): any;
        isValid(): any;
        _setHost(module: any): any;
        getHostFace(module: any): any;
        _adjustAttachedContents(module: any, exports: any): any;
        canAddContent(module: any): any;
        addOpenings(): any;
        removeOpenings(): any;
        refreshBoundInternal(): any;
        getSpecData(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        rebuildPartsInfo(): any;
        _dirtyGeometry(): any;
        _notifyHostWalls(module: any): any;
        setFlagOn(module: any, exports: any): any;
        setFlagOff(module: any, exports: any): any;
        getBOMData(): any;
        getWindowFrames(): any;
        getWindowSills(): any;
        isShowSill(): any;
        getWindowPockets(): any;
        getWindowWalls(): any;
        getWindowCeilings(): any;
        getWindowHoles(): any;
        getDefaultWindowPocketParameters(): any;
        _createChildModels(module: any, exports: any): any;
        mirror(module: any): any;
        _getMiddlePoints(module: any, exports: any): any;
    }
    export const __needUpdate: any;
    export const signalPartChanged: any;
    export const signalPartAdded: any;
    export const signalHostChanged: any;
    export const hostMaterialSignalHook: any;
    export const _previewParams: any;
    export const previewDirty: any;
    export const _disposed: any;
    export const userFreeData: any;
    export const __z: any;
    export const ZLength: any;
    export const __isScalable: any;
    export const outerWallSide: any;
    export const x: any;
    export const y: any;
    export const outline: any;
    export const __XLength: any;
    export const __YLength: any;
    export const needUpdate: any;
    export const _boundDirty: any;
}

declare module "49304" {
    export const exports: any;
}

declare module "49327" {
    // Original Name: r
    export class default extends import("42288").default {
        init(): any;
        _interested(module: any): any;
        _compute(module: any, exports: any, require: any, i: any): any;
        _buildLineSegments(module: any): any;
        _isValid(module: any, exports: any, require: any): any;
    }
    export const templateKey: any;
    export const x: any;
    export const y: any;
    export const length: any;
    export const lines: any;
    export const totalLength: any;
}

declare module "49394" {
    export const PSegmentLoft: any;
    export const PSegmentLoft_IO: any;
    // Original Name: a
    export class length extends import("62592").PMolding_IO {
        dump(module: any, exports: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const paths: any;
    export const XStart: any;
    export const YStart: any;
    export const ZStart: any;
    export const XEnd: any;
    export const YEnd: any;
    export const ZEnd: any;
    export const XLength: any;
    export const YLength: any;
    export const ZLength: any;
    export class s extends import("62592").PMolding {
        constructor(...args: any[]);
        create(module: any): any;
        getPaths(): any;
        getProfilePath(): any;
        getIO(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        updatePosition(): any;
        getTransformData(): any;
        getSize(): any;
        getProfileTransformMatrixByContentType(module: any): any;
        getPSegmentLoftContentTypes(): any;
    }
    export const material: any;
    export const localId: any;
    export const metadata: any;
    export const seekId: any;
    export const __value: any;
    export const y: any;
    export const x: any;
    export const z: any;
    export const XRotation: any;
    export const YRotation: any;
    export const ZRotation: any;
    export const PI: any;
    export const profileSizeY: any;
}

declare module "49449" {
    export const ConcealedWorkTube: any;
    export const strongElec: any;
    export const weakElec: any;
    export const hotWater: any;
    export const coldWater: any;
    // Original Name: d
    export class ConcealedWorkTube extends import("75312").BaseObject {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        OnFieldChanged(module: any): any;
        onUpdatePosition(): any;
        onUpdate(): any;
        toGraphicsData(module: any): any;
        toGraphicsDataAsync(module: any): any;
        genGraphicData(): any;
        getBounding(): any;
        getTubeMaterial(): any;
        updateMatrix(): any;
        getTubeMeshType(): any;
        getData(): any;
    }
    export const hasArcTube: any;
    export const entity: any;
    export const geometryDirty: any;
    export const needUpdateMatrix: any;
    export const ID: any;
    export const length: any;
    export const _matrixLocal: any;
    export const positionDirty: any;
    export const hidden: any;
}

declare module "4958" {
    export const BaseboardTopoPather: any;
    // Original Name: d
    export class BaseboardTopoPather extends import("19545").BaseTopoPather {
        constructor(module: any, exports: any, require: any, i: any, n: any, ...args: any[]);
        faceDirty(module: any): any;
        calcBaseSweepPath(module: any): any;
        faceChanged(module: any): any;
        calcFaceFloorCurves(module: any): any;
        cutBaseSweepPath(module: any, exports: any, require: any): any;
        extractPatchedEdges(module: any, exports: any, require: any): any;
        extractSortedSplittedBaseEdges(module: any, exports: any, require: any, n: any): any;
    }
    export const index: any;
    export const isAux: any;
    export const curve: any;
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

declare module "49604" {
    export const exports: any;
}

declare module "49608" {
    export const exports: any;
}

declare module "4968" {
    export const forEach: any;
}

declare module "49869" {
    export const exports: any;
}

declare module "49954" {
    export const length: any;
    export const exports: any;
}

declare module "50002" {
    export const exports: any;
}

declare module "50159" {
    export const HSIterableQuery: any;
    export const HSArrayQuery: any;
    export const HSQueryBase: any;
    // Original Name: o
    export class HSQueryBase {
        constructor(...args: any[]);
        includes(e: any): any;
        convert(e: any, t: any): any;
        filter(e: any): any;
        find(e: any): any;
        isEmpty(): any;
        toArray(): any;
        some(e: any): any;
        forEach(e: any): any;
    }
    export const finish: any;
    export const innerBuffer: any;
    export const _iterator: any;
}

declare module "50179" {
    export const domain: any;
    export const display: any;
    export const src: any;
    export const exports: any;
    export const create: any;
}

declare module "50265" {
    export const Content: any;
    export const DoorDirEnum: any;
    export const DoorTypeEnum: any;
    // Original Name: g
    export class Content extends import("75312").BaseObject {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        onMaterialChanged(): any;
        toBasicObject(): any;
        onUpdatePosition(): any;
        _createUvTransform(module: any): any;
        resizeMaterial(module: any): any;
        getContentMaterial(module: any, exports: any): any;
        _getRoomInfo(module: any): any;
        _getDoorType(): any;
        updateRoomCustomAttrs(): any;
        _getDoorDir(module: any): any;
        _getDiyContentTransInfo(module: any): any;
        _dealDoorLocalMatrix(module: any): any;
        _setGraphicData(module: any, exports: any, require: any): any;
        _getCurtainGraphicData(module: any, exports: any, require: any, i: any): any;
        dealWainscotGraphicsData(module: any, exports: any): any;
        _getContentMaterialData(module: any, exports: any, require: any, i: any): any;
        toGraphicsData(module: any): any;
        _createMeshDefs(module: any, exports: any, require: any, i: any, n: any, r: any): any;
        _createContentFGIData(module: any, exports: any, require: any): any;
        _createCuttingDoorFGIData(module: any, exports: any, require: any): any;
        _createCuttingDoorMeshDefs(module: any, exports: any, require: any, i: any, n: any, r: any): any;
        onParentReplaced(module: any): any;
    }
    export const contentType: any;
    export const clipper: any;
    export const geometryDirty: any;
    export const customizedParent: any;
    export const order: any;
    export const _matrixLocal: any;
    export const offsetX: any;
    export const offsetY: any;
    export const tileSize_x: any;
    export const tileSize_y: any;
    export const initTileSize_x: any;
    export const initTileSize_y: any;
    export const length: any;
    export const override: any;
    export const diffuseMapUvTransform: any;
    export const normalMapUvTransform: any;
    export const ZSize: any;
    export const XScale: any;
    export const YScale: any;
    export const ZScale: any;
    export const metadata: any;
    export const pos: any;
    export const qut: any;
    export const scl: any;
    export const meshName: any;
    export const graphicsPath: any;
    export const type: any;
    export const bounding: any;
    export const matrixLocal: any;
    export const material: any;
    export const model: any;
    export const component: any;
    export const customAttrs: any;
    export const simulatedContentId: any;
    export const pocketMaterial: any;
    export const parentSeekId: any;
    export const ID: any;
    export const y: any;
    export const clipMeshes: any;
    export const cutPlanes: any;
    export const cutObstacles: any;
    export const clipInfo: any;
    export const objectNames: any;
    export const host: any;
    export const scaleRule: any;
    export const rotation: any;
    export const textureRotation: any;
    export const contentID: any;
    export const repeatx: any;
    export const repeaty: any;
    export const position: any;
    export const scale: any;
    export const localPosition: any;
    export const localRotation: any;
    export const localScale: any;
    export const isMaterialRep: any;
    export const obj_name: any;
    export const meshMatrix: any;
    export const parent: any;
}

declare module "50271" {
    export const BoundaryUtil: any;
    export const length: any;
    export const flag: any;
    export const rotate: any;
    export const pavingPt: any;
    export const points: any;
    export const x: any;
    export const y: any;
    export const width: any;
    export const rotation: any;
}

declare module "50298" {
    export const getPolylines: any;
    export const pathBBox: any;
    export const transformPath: any;
    export const transformSvgPath: any;
    export const isArray: any;
    export const ps: any;
    export const sleep: any;
    export const toString: any;
    export const length: any;
    export const arr: any;
    export const abs: any;
    export const cache: any;
    export const count: any;
    export const qx: any;
    export const qy: any;
    export const X: any;
    export const Y: any;
    export const bx: any;
    export const by: any;
    export const x: any;
    export const y: any;
    export const curve: any;
    export const bbox: any;
}

declare module "50312" {
    export const exports: any;
}

declare module "50856" {
    export const W: any;
    // Original Name: r
    export class W {
        getEntityClassByType(module: any): any;
        registerClass(module: any, exports: any): any;
        getClass(module: any): any;
        constructor(...args: any[]);
    }
}

declare module "50922" {
    export const FaceUtil: any;
    export const outerLoop: any;
    export const length: any;
    export const innerLoops: any;
}

declare module "51048" {
    export const MixPaintUpdaterV2: any;
    export const paintData: any;
    export const mixpaint: any;
}

declare module "51181" {
    export const exports: any;
}

declare module "51298" {
    export const transformMesh: any;
    export const mathMeshToMesh: any;
    export const SurfaceLoad: any;
    export const SurfaceDump: any;
    export const Single: any;
    export const ContinuousSurface: any;
    // Original Name: l
    export class ContinuousSurface extends import("55256").Cylinder {
        constructor(module: any, exports: any, require: any, i: any, ...args: any[]);
        transformed(module: any): any;
        transform(module: any): any;
        getAllFace(): any;
        pushSinglePlane(module: any): any;
        clone(): any;
        getCurve3d(module: any): any;
        getCurve2d(module: any): any;
        getArea(module: any, exports: any): any;
        discreteMesh(module: any): any;
        dump1(): any;
        load1(module: any): any;
    }
    export const _allFace: any;
    export const length: any;
    export const x: any;
    // Original Name: c
    export class Single extends import("55256").Plane {
        constructor(module: any, exports: any, ...args: any[]);
        transformed(module: any): any;
        transform(module: any): any;
        check(module: any): any;
        getSt(): any;
        getLine3dByHalfPlane2d(module: any): any;
        clone(): any;
        getArea(module: any, exports: any): any;
        discreteMesh(module: any): any;
        dump1(): any;
        load1(module: any): any;
    }
    export const _st: any;
    export const type: any;
}

declare module "51455" {
    export const writable: any;
}

declare module "51545" {
    export const exports: any;
}

declare module "51641" {
    export const INCustomizedGraphicsFace: any;
    export const PODecorator: any;
    export const NCPCeilingDecorator: any;
    export const OpeningDecorator: any;
    export const NCPBackgroundWallBaseDecorator: any;
    export const ParametricModelDecorator: any;
}

declare module "51856" {
    export const isCircle2dDumpData: any;
    export const isICircle2d: any;
    export const Circle2d: any;
    // Original Name: c
    export class Circle2d extends import("29369").Curve2d {
        constructor(module: any, exports: any, ...args: any[]);
        getType(): any;
        assign(module: any): any;
        create(module: any): any;
        dump(): any;
        clone(): any;
        isClosed(): any;
        getDiscretePoints(module: any): any;
        _toThreeCurve(): any;
        getPoint(module: any): any;
        isSameCurve(module: any, exports: any): any;
        createSubCurve(module: any, exports: any): any;
        isPointOnCurve(module: any, exports: any): any;
        hLineIntersections(module: any): any;
    }
    export const center: any;
    export const radius: any;
    export const x: any;
    export const y: any;
    export const gt: any;
    export const geoType: any;
}

declare module "51976" {
    export const BrepBound: any;
    // Original Name: n
    export class BrepBound extends import("36369").Rect {
        constructor(module: any, exports: any, require: any, i: any, ...args: any[]);
        center(): any;
        getMin(): any;
        getMax(): any;
        isValid(module: any): any;
        expandMargin(module: any, exports: any): any;
        reset(): any;
        copy(module: any): any;
        set(module: any, exports: any, require: any, i: any): any;
        appendPoint(module: any): any;
        appendBound(module: any): any;
        isValidBound(module: any, exports: any): any;
        createFromPoints(module: any): any;
    }
    export const width: any;
    export const height: any;
    export const left: any;
    export const top: any;
    export const x: any;
    export const y: any;
    export const length: any;
}

declare module "52121" {
    export const length: any;
    export const ConcealedWorkNode: any;
    export const ConcealedWorkNode_IO: any;
    // Original Name: c
    export class ConcealedWorkNode_IO extends import("86829").ConcealedWorkCompEntity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const pos: any;
    export const position: any;
    // Original Name: d
    export class ConcealedWorkNode extends import("86829").ConcealedWorkCompEntity {
        constructor(...args: any[]);
        getIO(): any;
        _findTree(module: any): any;
        find(module: any): any;
        findNode(module: any, exports: any): any;
        traverseNode(module: any): any;
        _getPreOrder(module: any, exports: any): any;
        getPreOrderNodes(): any;
        isEmpty(): any;
        getNumberOfLinks(): any;
        getChildNodes(): any;
        getParentNode(): any;
        removeChildNode(module: any): any;
        addChildNode(module: any): any;
        removeChildNodes(module: any): any;
        getStructureNode(): any;
    }
}

declare module "52286" {
    export const NParametricOpeningFGIDecorator: any;
    // Original Name: n
    export class NParametricOpeningFGIDecorator extends import("7584").NCParametricModelFGIDecorator {
        constructor(module: any, ...args: any[]);
        getUvTransform(module: any, exports: any): any;
    }
}

declare module "52407" {
    export const PolygonTool: any;
    export const PaintBufferEx: any;
    export const MaterialMap2D: any;
    export const MaterialMap3D: any;
    export const MaterialMapBase: any;
    export const length: any;
    // Original Name: a
    export class MaterialMapBase {
        constructor(...args: any[]);
        push(module: any): any;
    }
    export const materailList: any;
    export const mtlMeshDefMap: any;
    export const hashKey: any;
    export const userDefined: any;
    export class s {
        constructor(module: any, exports: any, ...args: any[]);
        push(module: any, exports: any, require: any): any;
        toBufferWasm(): any;
        freeBuffer(module: any): any;
    }
    export const allPoint: any;
    export const polyBegin: any;
    export const polyPower: any;
    export const polyId: any;
    export const pointCount: any;
    export const polyCount: any;
    export const maxPointCount: any;
    export const maxPolyCount: any;
    // Original Name: l
    export class PaintBufferEx {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        push(module: any, exports: any, require: any, i: any): any;
    }
    export const materialIndex: any;
    export const offsetIndex: any;
    export const coordinateIndex: any;
    export const offset: any;
    export const coordinateSystem: any;
    export const currPoint: any;
    export const currId: any;
    export const currPoly: any;
    // Original Name: c
    export class PolygonTool {
        free(module: any): any;
        freePaintData(module: any): any;
        uvTransform2D(module: any): any;
        freePaintBuffers(module: any): any;
        mergePaintBuffer(module: any, exports: any, require: any): any;
        createPolygonsByPatternWasm(module: any, exports: any): any;
        toMesh(module: any, exports: any, require: any): any;
        _createModifyData(module: any): any;
        _createFreeData(module: any): any;
        _regionToPatternCfg(module: any, exports: any): any;
        _mergePaintDataAndBackground(module: any, exports: any): any;
        getTransformMatrix(module: any, exports: any): any;
        uvTransform(module: any, exports: any, require: any): any;
        freeMtIndex(module: any): any;
        toMeshEx(module: any, exports: any, require: any): any;
        constructor(...args: any[]);
    }
    export const loopCount: any;
    export const offsetX: any;
    export const offsetY: any;
    export const rotation: any;
    export const pattern: any;
    export const BYTES_PER_ELEMENT: any;
    export const len: any;
    export const begin: any;
    export const id: any;
    export const seamBuffer: any;
    export const uDir: any;
    export const vDir: any;
    export const xDir: any;
    export const yDir: any;
    export const seamWidth: any;
    export const start: any;
    export const withPattern: any;
    export const holes: any;
    export const x: any;
    export const y: any;
    export const uvTransform: any;
}

declare module "52530" {
    export const exports: any;
}

declare module "52614" {
    export const length: any;
    export const NCustomizedModelLightBand: any;
    export const NCustomizedModelLightBand_IO: any;
    // Original Name: S
    export class NCustomizedModelLightBand_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
    }
    export const parameters: any;
    export const coord: any;
    export const lightBandId: any;
    // Original Name: P
    export class NCustomizedModelLightBand extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        destroy(): any;
        clone(): any;
        copyFrom(module: any): any;
        getGraphicsData(): any;
        getGraphicsDataAsync(): any;
        getTopProjection(): any;
        getFrontProjection(): any;
        getBottomProjection(): any;
        getBottomProjectionContours(): any;
        clearProjectionCache(): any;
        dirty(module: any, exports: any): any;
        init(module: any): any;
        getSweepPath3D(): any;
        getSweepProfile(): any;
        getOriginSweepProfile(): any;
        getLocalCoordinate(): any;
        getBrep(): any;
        getIO(): any;
        updateExistence(): any;
        copy(module: any, exports: any, require: any): any;
        resetSweepPath(module: any, exports: any): any;
        getRelyerById(module: any): any;
        if(exports: any): any;
        if(exports: any, exports: any): any;
    }
    export const _graphicsData: any;
    export const signalClipDirty: any;
    export const _previewMode: any;
    export const parent: any;
    export const faceMaterialId: any;
    export const lineMaterialId: any;
    export const auxiliaryFacesForPick: any;
    export const topProjection: any;
    export const frontProjection: any;
    export const bottomProjection: any;
    export const y: any;
    export const bottomProjectionContours: any;
    export const Geometry: any;
    export const _brepcache: any;
    export const options: any;
    export const relyer: any;
    export const flipVertical: any;
    export const userData: any;
    export const id: any;
    export const profileWidth: any;
    export const profileHeight: any;
    export const _boundDirty: any;
    export const pathCoedge3dsTags: any;
    export const __parameters: any;
}

declare module "52881" {
    export const length: any;
    export const NCustomizedFeatureModel: any;
    export const NCustomizedFeatureModel_IO: any;
    // Original Name: I
    export class NCustomizedFeatureModel_IO extends import("20551").Content_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const draggable: any;
    export const facematerialmap: any;
    export const id: any;
    export const name: any;
    export const sketchComId: any;
    export const tag: any;
    export const defaultmaterialmap: any;
    export const material: any;
    // Original Name: w
    export class NCustomizedFeatureModel extends import("20551").Content {
        constructor(module: any, exports: any, ...args: any[]);
        initByMeta(module: any, exports: any, require: any): any;
        assignTo(module: any): any;
        flipSelf(): any;
        _flipModel(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        findRelatedMoldings(module: any): any;
        findRelatedLightSlots(module: any): any;
        findRelatedLightBands(module: any): any;
        dirtyGussetSurface(module: any): any;
        dirty(module: any, exports: any): any;
        resortCurves(module: any): any;
        judgeClockWise(module: any): any;
        getGraphicsData(module: any): any;
        getGraphicsDataAsync(): any;
        getHighResolutionGraphicsDataAsync(): any;
        getTopProjectionAsync(module: any, exports: any): any;
        getBrepsForTopProjection(): any;
        getTopProjectOption(): any;
        getTopProjection(module: any, exports: any): any;
        getBottomProjection(module: any): any;
        getFrontProjection(module: any): any;
        updateProjectionTypesFlag(module: any): any;
        getFacePaths(module: any, exports: any): any;
        refreshBoundInternalAsync(): any;
        refreshBoundInternal(): any;
        getTopProjectionPlane(): any;
        getBottomProjectionPlane(): any;
        getFrontProjectionPlane(): any;
        _updateProjectionMaterialData(module: any): any;
        getPathsCoplanarWithFace(module: any): any;
        getPathsOnPlane(module: any, exports: any, require: any): any;
        getLocalToWorldTransform(module: any): any;
        _loadGraphicsDataAsync(module: any, exports: any, require: any): any;
        _loadGraphicsData(module: any, exports: any, require: any, i: any): any;
        getGraphicsOption(module: any, exports: any, require: any): any;
        getLightBandData(): any;
        getLightBandTopProjection(): any;
        getLightBandBottomProjection(): any;
        getLightBandFrontProjection(): any;
        getLightSlotTopProjection(): any;
        getLightSlotBottomProjection(): any;
        getLightSlotFrontProjection(): any;
        getMoldingsByRef(module: any): any;
    }
    export const _breps: any;
    export const topOffset: any;
    export const _graphicsData: any;
    export const _graphicsDataPromise: any;
    export const topProjection: any;
    export const bottomProjection: any;
    export const frontProjection: any;
    export const lightSlotTopProjection: any;
    export const lightSlotBottomProjection: any;
    export const lightSlotFrontProjection: any;
    export const signalBrepChanged: any;
    export const metadata: any;
    export const contentType: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const options: any;
    export const unioned: any;
    export const surfaceArea: any;
    export const contours: any;
    export const isLightBand: any;
    export const isLightSlot: any;
    export const isMolding: any;
    export const rotation: any;
    export const outline: any;
    export const materialData: any;
    export const value: any;
    export const xRay: any;
    export const surface: any;
    export const paths: any;
    export const host: any;
    export const useCacheProjection: any;
    export const CONTAIN: any;
    export const seekId: any;
    export const customizedProductUrl: any;
    export const fpMaterialData: any;
    export const target: any;
    export const outer: any;
    export const holes: any;
    export const faceEntity: any;
    export const faceId: any;
    export const mixpaint: any;
    export const customData: any;
    export const area: any;
}

declare module "52884" {
    export const symmetricDifference: any;
}

declare module "53159" {
    export const f: any;
}

declare module "53209" {
    export const v: any;
    export const length: any;
    export const sort: any;
}

declare module "53250" {
    export const exports: any;
}

declare module "53355" {
    export const LightBandSweepHelper: any;
    // Original Name: r
    export class LightBandSweepHelper extends import("38096").SweepHelper {
        getLocalCoordinateBySweepPath(module: any, exports: any, require: any): any;
        getInstance(): any;
    }
    export const _lightbandInstance: any;
}

declare module "53399" {
    export const some: any;
}

declare module "53482" {
    export const exports: any;
}

declare module "53488" {
    export const WallDataProvider: any;
    // Original Name: h
    export class WallDataProvider extends import("76563").IDataProvider {
        constructor(module: any, exports: any, ...args: any[]);
        getFacePath(module: any, exports: any): any;
        _hasUnderLayer(): any;
        _getSideFaceGeometry(module: any, exports: any, require: any): any;
        _fixSideFaceGeo(module: any, exports: any): any;
        _clipFacePolygon(module: any, exports: any, require: any): any;
        _moveBottomPointsDownThickness(module: any): any;
        _cutHeight3D(module: any, exports: any): any;
        _getLeftFaceGeometry(module: any, exports: any, require: any): any;
        _getRightFaceGeometry(module: any, exports: any, require: any): any;
        _getArcRightFaceGeometry(module: any): any;
        _getArcLeftFaceGeometry(module: any): any;
        _getPathGeometry(module: any, exports: any): any;
        _getArcFaceGeometry(module: any, exports: any): any;
        _getFrontFaceGeometry(module: any, exports: any, require: any, i: any): any;
        _getBackFaceGeometry(module: any, exports: any, require: any, i: any): any;
        _getTopFaceGeometry(module: any, exports: any): any;
        _getArcTopFaceGeometry(module: any): any;
        _getArcBottomFaceGeometry(module: any): any;
        _getBottomFaceGeometry(module: any, exports: any): any;
        _getWallGeometry(): any;
    }
    export const wall: any;
    export const geometries: any;
    export const length: any;
    export const surface: any;
    export const z: any;
    export const x: any;
    export const y: any;
    export const area: any;
    export const arcInfo: any;
    export const center: any;
}

declare module "53557" {
    export const findRoomByCamera: any;
    export const roomPolygon: any;
    export const getOpeningLine: any;
    export const XSize: any;
    export const target_x: any;
    export const target_y: any;
    export const target_z: any;
    export const z: any;
    export const near: any;
}

declare module "53697" {
    export const ParametricModelContent: any;
    export const ParametricModelContent_IO: any;
    // Original Name: h
    export class ParametricModelContent_IO extends import("20551").Content_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const eId: any;
    export const uId: any;
    export const srcId: any;
    export const isSourceModel: any;
    // Original Name: u
    export class ParametricModelContent extends import("20551").Content {
        constructor(module: any, exports: any, ...args: any[]);
        destroy(): any;
        dirtyClipGeometry(module: any): any;
        initContent(module: any): any;
        isContentInRoom(module: any): any;
        initMaterial(module: any): any;
        copyFrom(module: any): any;
        updatePosition(module: any): any;
        _transformRotation(module: any): any;
        getIO(): any;
    }
    export const splitPlanes: any;
    export const signalClipDirty: any;
    export const _boundDirty: any;
    export const contentInfo: any;
    export const XScale: any;
    export const x: any;
    export const YScale: any;
    export const y: any;
    export const ZScale: any;
    export const z: any;
    export const visible: any;
    export const length: any;
    export const XRotation: any;
    export const YRotation: any;
    export const ZRotation: any;
    export const XLength: any;
    export const YLength: any;
    export const ZLength: any;
    export const materialsMap: any;
}

declare module "53735" {
    export const constructor: any;
    export const exports: any;
}

declare module "54006" {
    export const getContentRelateLight: any;
    export const LightRoomIdVisitor: any;
    export const VrayLightFactory: any;
    export const VrayLightSphere: any;
    export const VrayLightDome: any;
    export const VrayLightEllipse: any;
    export const VrayLightRectangle: any;
    export const VrayLightVirtualArea: any;
    export const FurnitureSpotLight: any;
    export const FurnitureLight: any;
    export const VrayLightAceray: any;
    export const VrayLightIESMax: any;
    export const VraySunLight: any;
    export const VrayLightMesh: any;
    export const VrayLight: any;
    export const VrayTypeNameEnum: any;
    export const VrayTypeEnum: any;
    export const AreaFlat: any;
    export const FORBID_FLAG: any;
    export const Sphere: any;
    export const Mesh: any;
    export const AreaEllipse: any;
    // Original Name: m
    export class VrayLight {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        getIndex(): any;
        toLightJson(): any;
    }
    export const nodeType: any;
    export const uid: any;
    export const roomId: any;
    export const volumeLight: any;
    export const DefaultLightIdType: any;
    // Original Name: y
    export class VrayLightMesh extends VrayLight {
        constructor(module: any, exports: any, ...args: any[]);
        toLightJson(): any;
    }
    export const color: any;
    export const intensity: any;
    export const meshRef: any;
    export const entityId: any;
    export const close: any;
    export const rgb: any;
    export const color_temperature: any;
    export const multiplier: any;
    export const ref: any;
    export const pos: any;
    export const rot: any;
    export const scale: any;
    export const DoubleSided: any;
    export const invisible: any;
    export const type: any;
    export const units: any;
    export const enabled: any;
    // Original Name: _
    export class VraySunLight extends VrayLight {
        constructor(module: any, exports: any, ...args: any[]);
        toLightJson(): any;
    }
    export const filterColor: any;
    export const position: any;
    export const target: any;
    export const sizeMultiplier: any;
    export const src_position: any;
    export const target_position: any;
    export const filter_Color: any;
    export const intensity_multiplier: any;
    export const turbidity: any;
    export const size_multiplier: any;
    export const sky_model: any;
    // Original Name: C
    export class VrayLightIESMax extends VrayLight {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        toLightJson(): any;
    }
    export const sourceContentType: any;
    export const direction: any;
    export const upVector: any;
    export const power: any;
    export const ies_file: any;
    export const iesUrl: any;
    export const isPublicIES: any;
    export const affectSpecular: any;
    // Original Name: S
    export class VrayLightAceray extends VrayLightIESMax {
        constructor(module: any, exports: any, ...args: any[]);
        toLightJson(): any;
    }
    export const nearAttenuationStart: any;
    export const nearAttenuationEnd: any;
    export const farAttenuationStart: any;
    export const farAttenuationEnd: any;
    export const hotspotAngle: any;
    export const falloffAngle: any;
    // Original Name: P
    export class FurnitureLight extends VrayLight {
        constructor(module: any, exports: any, ...args: any[]);
        toLightJson(): any;
    }
    export const temperature: any;
    export const intensityScale: any;
    export const isAssembly: any;
    export const instanceid: any;
    export const affectReflections: any;
    // Original Name: E
    export class FurnitureSpotLight extends VrayLight {
        constructor(module: any, exports: any, ...args: any[]);
        toLightJson(): any;
    }
    export const IES: any;
    export const iesRotations: any;
    export const length: any;
    // Original Name: M
    export class VrayLightVirtualArea extends VrayLight {
        constructor(module: any, exports: any, require: any, i: any, ...args: any[]);
        toLightJson(): any;
    }
    export const vrayType: any;
    export const doubleSided: any;
    export const double_flat: any;
    export const u_size: any;
    export const v_size: any;
    export const skylightPortal: any;
    export const renderVisible: any;
    // Original Name: v
    export class VrayLightRectangle extends VrayLightVirtualArea {
        constructor(module: any, exports: any, ...args: any[]);
    }
    // Original Name: b
    export class VrayLightEllipse extends VrayLightVirtualArea {
        constructor(module: any, exports: any, ...args: any[]);
    }
    // Original Name: T
    export class VrayLightDome extends VrayLight {
        constructor(module: any, exports: any, ...args: any[]);
        toLightJson(): any;
    }
    export const textureTemperature: any;
    export const affectDiffuse: any;
    export const textureType: any;
    export const castShadow: any;
    // Original Name: x
    export class VrayLightSphere extends VrayLight {
        constructor(module: any, exports: any, ...args: any[]);
        toLightJson(): any;
    }
    export const radius: any;
    export const index: any;
    // Original Name: I
    export class LightRoomIdVisitor {
        visit(module: any, exports: any, require: any): any;
        getRoomIdOfPoint(module: any, exports: any): any;
        constructor(...args: any[]);
    }
    export const roomType: any;
}

declare module "54046" {
    export const MaterialManager: any;
    export class n {
        constructor(...args: any[]);
        initMaterialData(module: any): any;
        updateMaterialData(module: any): any;
        clearMaterialData(): any;
        removeMaterialData(module: any): any;
        getMaterialData(module: any): any;
        setMoldingMaterialDirty(module: any): any;
        updateMoldingMaterialData(module: any): any;
        _generateMaterialData(module: any, exports: any): any;
        _createPlaneCeilingMaterial(module: any, exports: any): any;
        _createCornerArcCeilingMaterial(module: any, exports: any): any;
        _migrateLightSlot(module: any, exports: any): any;
        _createCircleCeilingMaterial(module: any, exports: any): any;
        _migrateCascadeCeilingLightSlotMaterial(module: any, exports: any): any;
        _migrateCascadeCeilingMoldingMaterial(module: any, exports: any): any;
        _migrateSweepPathMaterial(module: any, exports: any): any;
        _migrateSweepProfileMaterial(module: any, exports: any): any;
        _migrateCascadeCeilingSideFaceMaterial(module: any, exports: any): any;
        _createCascadeCeilingMaterial(module: any, exports: any): any;
        _createGridCeilingMaterial(module: any, exports: any): any;
        _createCornerRectCeilingMaterial(module: any, exports: any): any;
        _createOrnamentCeilingMaterial(module: any, exports: any): any;
        _createDropDownCeilingMaterial(module: any, exports: any): any;
        _createAisleGridCeilingMaterial(module: any, exports: any): any;
        _createEuropeanStyleCeilingMaterial(module: any, exports: any): any;
        _createInnerCircleCeilingMaterial(module: any, exports: any): any;
        _createSquareCeilingWithCrossBeamMaterial(module: any, exports: any): any;
        _createPitchedRoofWithCrossBeamMaterial(module: any, exports: any): any;
        _createHerringboneCeilingWithCrossBeamMaterial(module: any, exports: any): any;
        _updateMoldingMaterialData(module: any, exports: any): any;
        _updateMoldingMaterial(module: any, exports: any, require: any, i: any): any;
        _updateCircleCeilingMoldingMaterial(module: any, exports: any): any;
        _updatePlaneCeilingMoldingMaterial(module: any, exports: any): any;
        _updateCascadeCeilingMoldingMaterial(module: any, exports: any): any;
        _updateCornerRectCeilingMoldingMaterial(module: any, exports: any): any;
        _updateOrnamentCeilingMoldingMaterial(module: any, exports: any): any;
        _updateDropDownCeilingMoldingMaterial(module: any, exports: any): any;
        _updateGridCeilingMoldingMaterial(module: any, exports: any): any;
        _updateInnerCircleCeilingMoldingMaterial(module: any, exports: any): any;
        _updateEuropeanStyleCeilingMoldingMaterial(module: any, exports: any): any;
    }
    export const _originalMaterials: any;
    export const _needUpdateMoldingMaterials: any;
    export const _profileDateType: any;
    export const length: any;
    export const addLightSlotLevel2: any;
    export const addLightSlotLevel3: any;
    export const addMoldingLevel2: any;
    export const addMoldingLevel3: any;
    export const gridXNum: any;
    export const gridYNum: any;
    export const rotation: any;
    export const addInnerMolding: any;
    export const addMolding: any;
    export const addOuterMolding: any;
}

declare module "54421" {
    export const prototype: any;
    export const next: any;
    export const exports: any;
}

declare module "54695" {
    export const CustomizedPMInstanceModel: any;
    export const CustomizedPMInstanceModel_IO: any;
    // Original Name: l
    export class CustomizedPMInstanceModel_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const instanceId: any;
    export const originPos: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const XRotation: any;
    export const xRotation: any;
    export const YRotation: any;
    export const yRotation: any;
    export const ZRotation: any;
    export const zRotation: any;
    export const xScale: any;
    export const yScale: any;
    export const zScale: any;
    export const xLength: any;
    export const yLength: any;
    export const zLength: any;
    export const contentType: any;
    export const duringRestore: any;
    // Original Name: c
    export class CustomizedPMInstanceModel extends import("24567").Entity {
        constructor(module: any, ...args: any[]);
        isDiyDocOpened(): any;
        clearProjections(): any;
        initByData(module: any): any;
        updateByData(module: any): any;
        _createNewMetadata(): any;
        getIO(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        getDefaultMaterialData(): any;
        resize(module: any, exports: any, require: any): any;
        getTransformMatrix(): any;
        refreshBoundInternal(): any;
        getLightBandBottomProjection(): any;
        getBreps(module: any): any;
        getBrepsWithPave(): any;
        getTopProjection(): any;
        getBottomProjection(): any;
        getPathsCoplanarWithFace(module: any): any;
        isContentInRoom(module: any): any;
        getHost(): any;
        _getMatrixAndBoxForHost(): any;
        _calcProfile2dForHost(module: any): any;
        getHostRoom(): any;
    }
    export const outline: any;
    export const _topProjectionNeedUpdate: any;
    export const _bottomProjectionNeedUpdate: any;
    export const XSize: any;
    export const YSize: any;
    export const ZSize: any;
    export const XScale: any;
    export const YScale: any;
    export const ZScale: any;
    export const _topProjection: any;
    export const _bottomProjection: any;
    export const _lightBandBottomProjection: any;
    export const __instanceId: any;
    export const __originPos: any;
    export const contentTypeStr: any;
    export const __contentType: any;
    export const __x: any;
    export const __y: any;
    export const __z: any;
    export const __XLength: any;
    export const __YLength: any;
    export const __ZLength: any;
    export const __XScale: any;
    export const __YScale: any;
    export const __ZScale: any;
    export const __XRotation: any;
    export const __YRotation: any;
    export const __ZRotation: any;
    export const XLength: any;
    export const YLength: any;
    export const ZLength: any;
    export const length: any;
}

declare module "547" {
    export const keys: any;
    export const exports: any;
}

declare module "55067" {
    export const length: any;
    export const ConcealedWorkTubeTree: any;
    export const ConcealedWorkTubeTree_IO: any;
    // Original Name: l
    export class ConcealedWorkTubeTree_IO extends import("99757").ConcealedWorkTree_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const dia: any;
    export const diameter: any;
    // Original Name: c
    export class ConcealedWorkTubeTree extends import("99757").ConcealedWorkTree {
        constructor(...args: any[]);
        getIO(): any;
        findTube(module: any): any;
    }
}

declare module "55098" {
    export const CeilingUtil: any;
    export const isSplitCeiling: any;
    export const length: any;
    export const divideInfo: any;
}

declare module "55162" {
    export const PaintService: any;
}

declare module "55173" {
    export enum EntityTransactionType {
        Deletion = 2,
        Modification = 3,
        Recycling = 4,
    }
    export const Creation: any;
    export const Deletion: any;
    export const Modification: any;
    export const Recycling: any;
}

declare module "55256" {
    export const exports: any;
}

declare module "55287" {
    export const exports: any;
}

declare module "5538" {
    export const exports: any;
}

declare module "55391" {
    export const NCPBackgroundWallContent: any;
    export const NCPBackgroundWallContent_IO: any;
    // Original Name: a
    export class NCPBackgroundWallContent_IO extends import("53697").ParametricModelContent_IO {
    }
    // Original Name: s
    export class NCPBackgroundWallContent extends import("53697").ParametricModelContent {
        isContentInRoom(module: any, exports: any): any;
        getIO(): any;
    }
}

declare module "5543" {
    export const length: any;
    export const VirtualAreaLight_IO: any;
    export const VirtualAreaLight: any;
    // Original Name: l
    export class VirtualAreaLight_IO extends import("81334").DirectionLight_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const width: any;
    export const height: any;
    export const double_flat: any;
    export const renderVisible: any;
    export const __width: any;
    export const __height: any;
    export const __double_flat: any;
    export const __renderVisible: any;
    // Original Name: c
    export class VirtualAreaLight extends import("81334").DirectionLight {
        constructor(module: any, exports: any, ...args: any[]);
        create(): any;
        reset(): any;
        getIO(): any;
        constructPath(module: any): any;
        refreshBoundInternal(): any;
        getArea(): any;
        hasAreaSize(): any;
        getRenderParameters(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        getBoundingData(): any;
    }
    export const XSize: any;
    export const YSize: any;
    export const ZSize: any;
    export const temperature: any;
    export const intensity: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const skylightPortal: any;
    export const rgb: any;
    export const affectSpecular: any;
    export const close: any;
    export const sourceContentType: any;
}

declare module "55483" {
    export const RoofUtil: any;
    export const EnRoofLoopType: any;
    export const EnRoofLoopPositionType: any;
    export const Valid: any;
    export const Hide: any;
    export const Intersect: any;
    export const NORMAL: any;
    export const INCLUDE_ARC: any;
    export const RECT: any;
    export const CONVEX_POLY: any;
    // Original Name: y
    export class RoofUtil {
        getAnotherFaceInPair(module: any, exports: any): any;
        getAllRoofs(): any;
        getProjectedPtOnRoof(module: any, exports: any, require: any, n: any): any;
        getOpeningRotationOnRoofFace(module: any, exports: any, require: any): any;
        getRoofObstacleInfos(module: any): any;
        _getOpeningObstacleInfo(module: any): any;
        _getParametricObstacleInfo(module: any): any;
        _getLoopsWithPosition(module: any, exports: any, require: any, n: any): any;
        r: any;
        constructor(...args: any[]);
    }
    export const tag: any;
    export const baseCoord: any;
    export const length: any;
    export const onlySelf: any;
    export const type: any;
    export const INTERSECT: any;
    export const PI: any;
    export const generatedType: any;
    export const children: any;
    export const x: any;
    export const y: any;
    export const const: any;
    export const : any;
}

declare module "55570" {
    export const exports: any;
}

declare module "55811" {
    export const WindowPocket: any;
    // Original Name: s
    export class WindowPocket extends import("94331").ParametricModel {
        constructor(module: any, exports: any, require: any, i: any, ...args: any[]);
        onUpdate(): any;
        _constructMeshObject(module: any, exports: any, require: any, i: any, r: any): any;
        toGraphicsDataAsync(): any;
        toGraphicsData(): any;
    }
    export const _moldingWebCadDocument: any;
    export const length: any;
    export const xRay: any;
    export const insideThickness: any;
    export const customData: any;
    export const tileSize_x: any;
    export const tileSize_y: any;
    export const normalTileSize_x: any;
    export const normalTileSize_y: any;
    export const moldingMaterialRotation: any;
    export const rotation: any;
    export const normalTexture: any;
    export const seekId: any;
    export const diffuseMapUvTransform: any;
    export const normalMapUvTransform: any;
    export const pocketMaterial: any;
    export const entityId: any;
    export const seekIds: any;
    export const roomType: any;