    export const PModel: any;
    // Original Name: c
    export class PModel extends import("34225").CabinetBase {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        onUpdate(): any;
        _onMaterialDirty(): any;
        _onPositionDirty(): any;
        _onGeometryDirty(): any;
        toGraphicsData(): any;
    }
    export const roomType: any;
    export const const: any;
    export const : any;
    export const textureRotation: any;
    export const tileSize_x: any;
    export const tileSize_y: any;
    export const offsetX: any;
    export const offsetY: any;
    export const rotation: any;
    export const uvCenter: any;
    export const customData: any;
    export const diffuseMapUvTransform: any;
    export const normalMapUvTransform: any;
    export const entityId: any;
    export const contentType: any;
    export const localId: any;
    export const type: any;
    export const lightBandIndex: any;
    export const length: any;
}

declare module "79668" {
    export const Pocket: any;
    // Original Name: y
    export class Pocket extends import("75312").BaseObject {
        constructor(module: any, exports: any, require: any, i: any, ...args: any[]);
        updateRoomCustomAttrs(): any;
        toGraphicsData(): any;
        onUpdate(): any;
        _offsetPath(module: any, exports: any, i: any, n: any): any;
        _buildWebCadDocument(): any;
        _setPathCounerClockWise(module: any, exports: any, require: any): any;
        onCleanup(): any;
        onUpdatePosition(): any;
    }
    export const _frameThickness: any;
    export const _webCadDocument: any;
    export const moldingMaterialRotation: any;
    export const refNodeName: any;
    export const diffuseMapUvTransform: any;
    export const normalMapUvTransform: any;
    export const ID: any;
    export const objects: any;
    export const openingSeekId: any;
    export const roomType: any;
    export const type: any;
    export const meshDefs: any;
    export const y: any;
    export const tag: any;
    export const length: any;
    export const x: any;
    export const PI: any;
    export const indent: any;
    export const Both: any;
    export const getPaths: any;
    export const getWholePaths: any;
    export const _moldingfront: any;
    export const outerThickness: any;
    export const XSize: any;
    export const outerHeight: any;
    export const YSize: any;
    export const _moldingouter: any;
    export const material: any;
    export const _matrixLocal: any;
}

declare module "79699" {
    export const PBox: any;
    // Original Name: r
    export class PBox extends import("79579").PModel {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        getProfile(): any;
        onUpdate(): any;
    }
    export const _webCadDocument: any;
    export const XLength: any;
    export const YLength: any;
    export const _cache: any;
}

declare module "79723" {
    export const retryAsyncFunc: any;
}

declare module "79872" {
    export const length: any;
    export const PordinaryWindow_IO: any;
    export const PordinaryWindow: any;
    // Original Name: u
    export class PordinaryWindow_IO extends import("49234").ParametricWindow_IO {
        postLoad(module: any, exports: any): any;
    }
    export const thickness: any;
    export const indent: any;
    export const width: any;
    // Original Name: g
    export class PordinaryWindow extends import("77889").CornerWindow {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any): any;
        getFrameThickness(): any;
        getWindowSillSide(): any;
        getWindowPocketSide(): any;
        buildPartsInfo(module: any, exports: any): any;
        _adjustAttachedContents(module: any, exports: any): any;
        isValidHost(module: any): any;
        addOpenings(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        if(: any): any;
    }
    export const __parameters: any;
    export const partsInfo: any;
    export const showSill: any;
    export const elevation: any;
    export const showPocket: any;
    export const sideB: any;
    export const x: any;
    export const y: any;
    export const B: any;
    export const PI: any;
    export const Sill: any;
    export const Pocket: any;
    export const openingB: any;
    export const boundings: any;
    export const parameters: any;
    export const _boundDirty: any;
    export const __ZLength: any;
    export const __XLength: any;
    export const __YLength: any;
    export const z: any;
    export const const: any;
    export const : any;
    export const __ZRotation: any;
    export const outPath: any;
    export const middle1Path: any;
    export const middle2Path: any;
}

declare module "79900" {
    // Original Name: n
    export class default extends import("42288").default {
        _compute(module: any, exports: any, require: any, i: any): any;
    }
    export const y: any;
}

declare module "79901" {
    export const Collision: any;
    export const x: any;
    export const y: any;
    export const miterLimit: any;
    export const arcTolerance: any;
    export const length: any;
    export const outer: any;
    export const holes: any;
}

declare module "79906" {
    export const LightGroupEmptyTemplateSet: any;
    export const LightGroupEmptyTemplateEnum: any;
    export const LightGroupTemplateV3Set: any;
    export const LightGroupTemplateEnum: any;
    export const LightGroup_IO: any;
    export const LightGroup: any;
    // Original Name: m
    export class LightGroup_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
        postLoad(module: any, exports: any): any;
        _migrateVirtualLights(module: any): any;
    }
    export const temperature: any;
    export const name: any;
    export const sunlightOptions: any;
    export const isSmart: any;
    export const isAutoExposure: any;
    export const highlightBurn: any;
    export const members: any;
    export const appliedTemplate: any;
    export const volumeLightAttr: any;
    export const length: any;
    export const metadata: any;
    export const renderBindingType: any;
    export const sunlightTemperature: any;
    export const owner: any;
    export const _flag: any;
    export const XRotation: any;
    export const YRotation: any;
    export const ZRotation: any;
    // Original Name: y
    export class LightGroup extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        create(arg0: any): any;
        isBindingTo(module: any): any;
        findMember(module: any): any;
        hasMember(module: any): any;
        addMember(module: any, exports: any, require: any): any;
        set(module: any): any;
        removeMember(module: any): any;
        addFriendlyIndex(module: any): any;
        removeFriendlyIndex(module: any): any;
        forEachMember(module: any, exports: any): any;
        include(module: any): any;
        getIO(): any;
        clone(module: any, exports: any): any;
        removeAllMembers(): any;
        updateFriendlyIndex(): any;
        changeFriendlyIndex(module: any, exports: any): any;
        getAvailableFriendlyIndex(module: any, exports: any): any;
        _addLightFriendlyIndex(module: any): any;
    }
    export const _friendlyIndices: any;
    export const seekId: any;
    export const volumeLightConfig: any;
    export const friendlyIndex: any;
    export const type: any;
    export const INACTIVE_FRIENDLY_INDEX: any;
}

declare module "79957" {
    // Original Name: s
    export class default extends import("42288").default {
        _compute(module: any, exports: any, require: any, i: any): any;
        _getContents(module: any): any;
    }
    export const x: any;
    export const y: any;
    export const z: any;
    export const length: any;
}

declare module "79959" {
    export const EllipseLight_IO: any;
    export const EllipseLight: any;
    // Original Name: s
    export class EllipseLight_IO extends import("5543").VirtualAreaLight_IO {
    }
    // Original Name: l
    export class EllipseLight extends import("5543").VirtualAreaLight {
        constructor(module: any, exports: any, ...args: any[]);
        create(): any;
        reset(): any;
        getIO(): any;
        getArea(): any;
        constructPath(module: any): any;
    }
    export const type: any;
    export const width: any;
    export const height: any;
    export const double_flat: any;
    export const PI: any;
}

declare module "8013" {
    export const GeometryUtil: any;
    export const getWallGeometryInfo: any;
    export const outerWallSide: any;
    export const left: any;
    export const innerPath: any;
    export const outerPath: any;
    export const fromPath: any;
    export const toPath: any;
    export const getWallDimension: any;
    export const walls: any;
    export const findWallsInLine: any;
    export const prev: any;
    export const next: any;
    export const getInnerDimension: any;
    export const length: any;
    export const _filterNerghborWalls: any;
    export const _getPrevCowalls: any;
    export const _getNextCowalls: any;
    export const getPoints: any;
    export const arcPaths: any;
    export const getArcPoints: any;
    export const getMassProperties: any;
    export const getPathPerimeter: any;
    export const getContentBaseWallScope: any;
    export const getOpeningLoop: any;
    export const x: any;
    export const y: any;
    export const parent: any;
    export const outerThickness: any;
    export const thickness: any;
    export const _getOffsetContentBase: any;
    export const z: any;
    export const _getOpeningClipLoop: any;
    export const _getCornerWindowClipLoops: any;
    export const getVerticalToWall: any;
    export const _getCustomizedClipLoops: any;
    export const xRay: any;
    export const normal: any;
    export const getContentBaseObstacleLoops: any;
    export const getWallSideFaceProfile: any;
    export const getLoopPoints: any;
    export const arcInfo: any;
}

declare module "80300" {
    export const length: any;
    export const NCustomizedBeam: any;
    export const BeamFaceType: any;
    export const BeamType: any;
    export const NCustomizedBeam_IO: any;
    // Original Name: g
    export class NCustomizedBeam_IO extends import("20551").Content_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const beamType: any;
    export const primary: any;
    export const secondary: any;
    export const left: any;
    export const right: any;
    export const top: any;
    export const bottom: any;
    export const front: any;
    export const back: any;
    // Original Name: m
    export class NCustomizedBeam extends import("20551").Content {
        constructor(module: any, ...args: any[]);
        initByMeta(module: any): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        setBeamType(module: any): any;
        isPrimary(): any;
        calcProfile(module: any): any;
        get2DTransform(): any;
        generateBrep(module: any, exports: any): any;
        getLocalToWorldTransform(): any;
        rebuild(module: any): any;
        dirtyGeometry(): any;
        dirtyPosition(): any;
        newSelf(): any;
        copy(): any;
        isArcWall(): any;
        getFaceType(module: any): any;
        isContentInRoom(module: any): any;
        mirror(module: any): any;
        translate(module: any): any;
        forEachContent(module: any, exports: any): any;
        getCorniceCutterInfo(module: any): any;
        getIO(): any;
    }
    export const signalBeamTypeChanged: any;
    export const masterId: any;
    export const isAux: any;
    export const userData: any;
    export const YSize: any;
    export const z: any;
    export const ZSize: any;
    export const XSize: any;
    export const x: any;
    export const y: any;
    export const brepcache: any;
    export const tag: any;
    export const XLength: any;
    export const YLength: any;
    export const ZLength: any;
    export const XScale: any;
    export const YScale: any;
    export const ZScale: any;
    export const XRotation: any;
    export const YRotation: any;
    export const ZRotation: any;
    export const type: any;
    export const rotation: any;
    export const BeamHole: any;
    export const id: any;
}

declare module "80534" {
    export const isArc2dDumpData: any;
    export const isIArc2d: any;
    export const Arc2d: any;
    // Original Name: l
    export class Arc2d extends import("29369").Curve2d {
        constructor(...args: any[]);
        getType(): any;
        assign(module: any): any;
        create(module: any): any;
        dump(): any;
        clone(): any;
        getDiscretePoints(module: any): any;
        _toThreeCurve(): any;
        getPoint(module: any): any;
        isSameCurve(module: any, exports: any): any;
        createSubCurve(module: any, exports: any): any;
        isPointOnCurve(module: any, exports: any): any;
        hLineIntersections(module: any): any;
    }
    export const start: any;
    export const end: any;
    export const center: any;
    export const radius: any;
    export const clockwise: any;
    export const x: any;
    export const y: any;
    export const gt: any;
    export const geoType: any;
}

declare module "80601" {
    export const length: any;
    export const WindowHole_IO: any;
    export const WindowHole: any;
    // Original Name: WindowHole_IO
    export class WindowHole_IO extends parametricmodel_1.ParametricModel_IO {
        dump(e: any, t: any, o: any, i: any): any;
        load(e: any, t: any, o: any): any;
    }
    export const XLength: any;
    export const YLength: any;
    export const ZLength: any;
    export const XScale: any;
    export const YScale: any;
    export const ZScale: any;
    export const profile: any;
    export const __XLength: any;
    export const __YLength: any;
    export const __ZLength: any;
    export const __XScale: any;
    export const __YScale: any;
    export const __ZScale: any;
    // Original Name: WindowHole
    export class WindowHole extends parametricmodel_1.ParametricModel {
        constructor(e: any, t: any, ...args: any[]);
    }
    export const profileConfig: any;
    export const innerFrom: any;
    export const innerTo: any;
    export const outerFrom: any;
    export const outerTo: any;
    export const topNeedFill: any;
    export const bottomNeedFill: any;
    export const fromSideNeedFill: any;
    export const toSideNeedFill: any;
    export const signalPocketAdded: any;
    export const signalPocketRemoved: any;
    export const _disposed: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const materialData: any;
    export const sideMaterialData: any;
    export const topMaterialData: any;
    export const bottomMaterialData: any;
    export const parameters: any;
    export const elevation: any;
    export const height: any;
    export const _host: any;
}

declare module "8066" {
    export const GussetModelInstance: any;
    export const GussetBrick: any;
    export class o {
        constructor(e: any, ...args: any[]);
        _getThickness(): any;
    }
    export const meta: any;
    export const thickness: any;
    export const hZLength: any;
    export const viewTranslation: any;
    export const viewRotation: any;
    export const viewScale: any;
    export const id: any;
    export const metaDecorator: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const bricks: any;
    export const metaData: any;
}

declare module "80880" {
    export const exports: any;
}

declare module "81063" {
    export const JunctionBox: any;
    // Original Name: c
    export class JunctionBox extends import("75312").BaseObject {
        onChildAdded(module: any): any;
        onUpdatePosition(): any;
        onUpdate(): any;
        toGraphicsData(module: any): any;
        toGraphicsDataAsync(module: any): any;
        _genGraphicData(): any;
        _getBounding(module: any): any;
        _updateMatrix(): any;
        _getMaterial(): any;
        _getGlobalPosition(module: any): any;
        _getContentOrthDisToHostFace(module: any, exports: any): any;
    }
    export const ID: any;
    export const length: any;
    export const z: any;
    export const thickness: any;
    export const D25: any;
    export const PI: any;
    export const ZSize: any;
    export const _matrixLocal: any;
}

declare module "81258" {
    export const exports: any;
}

declare module "81283" {
    export const ExtraordinaryBackground: any;
    export const _regions: any;
}

declare module "8130" {
    export const nearestTemperature: any;
}

declare module "81334" {
    export const length: any;
    export const DirectionLight_IO: any;
    export const DirectionLight: any;
    // Original Name: l
    export class DirectionLight_IO extends import("3577").Light_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const XRotation: any;
    export const YRotation: any;
    export const ZRotation: any;
    export const targetEnabled: any;
    export const XTarget: any;
    export const YTarget: any;
    export const ZTarget: any;
    export const __XRotation: any;
    export const __YRotation: any;
    export const __ZRotation: any;
    export const __rotation: any;
    export const __targetEnabled: any;
    export const __XTarget: any;
    export const __YTarget: any;
    export const __ZTarget: any;
    // Original Name: d
    export class DirectionLight extends import("3577").Light {
        constructor(module: any, exports: any, ...args: any[]);
        reset(): any;
        isTargetValid(): any;
        isVirtual(): any;
        resetTarget(): any;
        mirror(module: any, exports: any): any;
        getRenderParameters(): any;
        getIO(): any;
        updateRotationToTarget(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
    }
    export const PI: any;
    export const _boundDirty: any;
}

declare module "81346" {
    export const Sketch2dBuilder: any;
    export const tol: any;
    export const _loopClipFace: any;
    export const _faceLoopOverlapArea: any;
    export const _copyFacePropsPairs: any;
    export const currentCurves: any;
    export const currentPoints: any;
    export const oldFace2dInfoMap: any;
    export const entityMap: any;
    export const _splitCurvesMap: any;
    export const sketch2d: any;
    export const background: any;
    export const _backgroundInfo: any;
    export const isbackground: any;
    export const from: any;
    export const to: any;
    export const type: any;
    export const length: any;
    export const close: any;
    export const faces: any;
    export const Line2d: any;
    export const Circle2d: any;
    export const id: any;
    export const lerp: any;
    export const point: any;
}

declare module "81366" {
    export const CompositeStateRequest: any;
    // Original Name: r
    export class CompositeStateRequest extends import("85425").StateRequest {
        constructor(module: any, ...args: any[]);
        append(module: any): any;
        getActiveRequest(): any;
        onCommit(): any;
        onCommitAsync(): any;
    }
    export const _subRequests: any;
    export const isCommitted: any;
    export const _activeRequest: any;
    export const onCommitAsync: any;
}

declare module "81439" {
    export const isLightSlot: any;
    export const syncChildrenByWebCADDocument: any;
    export const createNCustomizedModelMolding: any;
    export const createCustomizedModelMolding: any;
    export const createNCustomizedModelLightSlot: any;
    export const createCustomizedModelLightSlot: any;
    export const createCustomizedModelLightBand: any;
    export const createNCustomizedModelLightBand: any;
    export const markParamType: any;
    export const findMaxAreaLoop: any;
    export const ParametricCustomizedCeilingLoopBuilder: any;
    export const length: any;
    export const value: any;
    export const max: any;
    export const wallIndex: any;
    export const min: any;
    export const area: any;
    export const y0: any;
    export const x1: any;
    export const type: any;
    export const materialData: any;
    export const flip: any;
    export const flipVertical: any;
    export const relativeIndices: any;
    export const path: any;
    export const room: any;
    export const pos: any;
    export const useRoomDefaultPolygon: any;
    export const openings: any;
    export const x: any;
    export const y: any;
    export const edgeIndex: any;
    export const y1: any;
}

declare module "81455" {
    // Original Name: n
    export class default extends import("42288").default {
        _compute(module: any, exports: any, require: any, i: any): any;
    }
    export const x: any;
    export const PI: any;
}

declare module "81482" {
    export const Math: any;
    export const exports: any;
}

declare module "81634" {
    export const CustomizedModel: any;
    export const CustomizedModelFace: any;
    // Original Name: f
    export class _matrixLocal {
        constructor(module: any, exports: any, ...args: any[]);
        _getFgiMeshDefWithUvTransform(module: any, exports: any, require: any): any;
        meshToGraphicDatas(module: any, exports: any, require: any, i: any, n: any): any;
        toGraphicsData(): any;
        _handleMeshDef(module: any, exports: any): any;
        _updateFaceInfo(module: any): any;
    }
    export const faceInfo: any;
    export const entity: any;
    export const faceId: any;
    export const uvTransform: any;
    export const meshKey: any;
    export const diffuseMapUvTransform: any;
    export const normalMapUvTransform: any;
    export const meshDef: any;
    export const seekIds: any;
    export const index: any;
    export const customAttrs: any;
    export const graphicsPath: any;
    export const entityId: any;
    export const paints: any;
    export const id: any;
    export class m extends import("75312").BaseObject {
        getChildFace(module: any): any;
        _entityDirtied(module: any): any;
    }
    export class y extends import("75312").BaseObject {
        getChildFace(module: any): any;
        _entityDirtied(module: any): any;
    }
    export class C extends import("75312").BaseObject {
        _entityDirtied(module: any): any;
    }
    // Original Name: S
    export class CustomizedModel extends import("50265").Content {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        _onEntityDirty(module: any): any;
        onInit(): any;
        getCustomizedFaceGeometry(module: any, exports: any, require: any): any;
        getLightBandData(): any;
        createViewModel(module: any): any;
        onChildAdded(module: any): any;
        onChildRemoved(module: any): any;
        _createOrGetContentViewModel(module: any): any;
        _toGraphicsObject(): any;
        _getRoomInfo(): any;
        updateRoomCustomAttrs(): any;
        _getModelType(module: any): any;
        _getMeshFromGraphicData(module: any): any;
        _getCatGraphicData(module: any, exports: any, require: any): any;
        _transformMesh(module: any, exports: any, require: any, i: any): any;
        _doNewMeshClip(module: any, exports: any, require: any, i: any): any;
        _doMeshClip(module: any, exports: any, require: any): any;
        toGraphicsDataAsync(module: any): any;
        needGenerateHighResolutionData(): any;
        toGraphicsData(): any;
        _dealGraphicsData(module: any, exports: any): any;
    }
    export const _cacheFaceMaterialFGI: any;
    export const geometryDirty: any;
    export const clipper: any;
    export const _cacheLightBandData: any;
    export const _clipAidCSGs: any;
    export const type: any;
    export const options: any;
    export const Geometry: any;
    export const childNodes: any;
    export const position: any;
    export const scale: any;
    export const length: any;
    export const indexCount: any;
    export const vertexCount: any;
    export const vertexNormals: any;
    export const vertexPositions: any;
    export const vertexUVs: any;
    export const faceIndices: any;
    export const needGroup: any;
    export const x: any;
    export const z: any;
    export const geometry: any;
    export const profileHigh: any;
    export const sketchModelData: any;
    export const graphicsData: any;
    export const docId: any;
    export const textureURI: any;
    export const colorMode: any;
    export const mesh: any;
    export const material: any;
    export const indices: any;
    export const fpMaterialData: any;
    export const tileSize_x: any;
    export const tileSize_y: any;
    export const moldingMaterialRotation: any;
    export const override: any;
    export const normalTileSizeX: any;
    export const normalTileSizeY: any;
    export const normalTexture: any;
    export const realType: any;
    export const matrix: any;
    export const cutObstacles: any;
    export const cutPlanes: any;
    export const xRay: any;
    export const normal: any;
    export const ZSize: any;
    export const XScale: any;
    export const YScale: any;
    export const ZScale: any;
}

declare module "81711" {
    export const exports: any;
}

declare module "81741" {
    export const HSConstants: any;
    export const exports: any;
}

declare module "81750" {
    export const PaintImageProvider: any;
    export const PaintImageManager: any;
    // Original Name: o
    export class PaintImageManager {
        constructor(...args: any[]);
        instance(): any;
    }
    export const _provider: any;
    export const _instance: any;
    // Original Name: i
    export class PaintImageProvider {
        constructor(...args: any[]);
        getBrickImageUrl(e: any): any;
        getBrickImageUrlSync(e: any): any;
        getDataImageFromCache(e: any): any;
    }
    export const _id: any;
}

declare module "81846" {
    export const FaceGroupUpdater: any;
    export const faceGroupId: any;
    export const migrateEntitiesMap: any;
    export const length: any;
    export const faceGroupBoundMap: any;
    export const cm: any;
}

declare module "81882" {
    export const SlabProfile: any;
    // Original Name: s
    export class SlabProfile extends import("67889").BaseObject {
        constructor(module: any, exports: any, ...args: any[]);
        _compute(): any;
        isValidFaceGeometry(): any;
        onEntityDirty(module: any): any;
        onEntityRemoved(): any;
        clear(): any;
        clearCachedData(): any;
        _computeProfileImpl(): any;
        _getInteriorWallPolys(): any;
    }
    export const _dirty: any;
    export const _profile: any;
    export const _provider: any;
    export const type: any;
    export const Geometry: any;
    export const length: any;
    export const arcInfo: any;
}

declare module "81884" {
    export const JSONDecycle: any;
    export const JSONRetrocycle: any;
}

declare module "81936" {
    export const SplitSpaceMixpaintUtil: any;
}

declare module "81945" {
    export const isAlloyDoorWindow: any;
    export const getDHolesOfDModel: any;
    export const isFlagOnTraceComponentParents: any;
    export const isFlagOnTraceParents: any;
    export const isDModel: any;
}

declare module "8202" {
    export enum animations {
    }
    export const length: any;
    export const ContentBase_IO: any;
    export const ContentBase: any;
    // Original Name: a
    export class ContentBase_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const x: any;
    export const y: any;
    export const z: any;
    export const XRotation: any;
    export const YRotation: any;
    export const ZRotation: any;
    export const XScale: any;
    export const YScale: any;
    export const ZScale: any;
    export const isScalable: any;
    export const flip: any;
    export const XLength: any;
    export const YLength: any;
    export const ZLength: any;
    export const isOpened: any;
    export const __x: any;
    export const __y: any;
    export const __z: any;
    export const __XRotation: any;
    export const __YRotation: any;
    export const __ZRotation: any;
    export const __XScale: any;
    export const __YScale: any;
    export const __ZScale: any;
    export const __isScalable: any;
    export const __flip: any;
    export const __XLength: any;
    export const __YLength: any;
    export const __ZLength: any;
    export const __isOpened: any;
    export const __angle: any;
    export const __anchor: any;
    export const __anchorAxis: any;
    // Original Name: s
    export class ContentBase extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        getHost(): any;
        getIO(): any;
    }
    export const __translation: any;
}

declare module "82060" {
    export const length: any;
    export const ExtrudedBody_IO: any;
    export const ExtrudedBody: any;
    // Original Name: s
    export class ExtrudedBody_IO extends import("48961").ParametricModel_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const snappingFaceKeys: any;
    export const hideFaceKeys: any;
    // Original Name: l
    export class ExtrudedBody extends import("48961").ParametricModel {
        constructor(module: any, exports: any, ...args: any[]);
        initByParameters(module: any): any;
        onParametersChanged(): any;
        addSnappingFaceKey(module: any): any;
        addHideFaceKey(module: any): any;
        getIO(): any;
    }
    export const points: any;
    export const direction: any;
    export const materialData: any;
}

declare module "82327" {
    export const GBPowerSysComp: any;
    // Original Name: a
    export class GBPowerSysComp extends import("1438").PowerSysComp {
        constructor(...args: any[]);
        clone(): any;
        dump(): any;
        load(module: any, exports: any): any;
    }
    export const houseHoldCableType: any;
    export const totalBreakerType: any;
    export const _referObject: any;
    export const Type: any;
}

declare module "82387" {
    export const Manager: any;
    // Original Name: n
    export class Manager {
        constructor(...args: any[]);
        registerCustomizedTileService(): any;
        getMetaData(module: any): any;
        setMetaData(module: any): any;
        getPatternMaterialData(module: any): any;
        setPatternMaterialData(module: any, exports: any): any;
        getMaterials(): any;
        getImageFromMaterialData(module: any): any;
        getSeamedImageFromMaterialData(module: any): any;
        getBoundaryFromMaterialData(module: any): any;
        getInnerPathsFromMaterialData(module: any): any;
        getIsRectangleFromMaterialData(module: any): any;
        isMaterialNeedToChangeDataURL(module: any): any;
        registerMaterialDataProcess(module: any, exports: any): any;
        registerSeamedImageProcess(module: any, exports: any): any;
        registerMaterialBoundaryProcess(module: any, exports: any): any;
        registerMaterialInnerPathsProcess(module: any, exports: any): any;
        registerMaterialIsRectangleProcess(module: any, exports: any): any;
        registerMaterialNeedToChangeDataURL(module: any, exports: any): any;
        registerMaterialTypeName(module: any, exports: any): any;
        registerMaterialInternalPaths(module: any, exports: any): any;
        registerPostProcessMaterialProcess(module: any, exports: any): any;
        registerMaterialGetDefaultOffsetProcess(module: any, exports: any): any;
        getCutomizedMaterialDefaultOffset(module: any): any;
        getCustomizedMaterialDefaultOffset(module: any): any;
        getMaterialTypeName(module: any): any;
        getMaterialInternalPaths(module: any): any;
        registerMaterialAreaAndSeekId(module: any, exports: any): any;
        getMaterialAreaSeekId(module: any): any;
        getMaterialMainSeekId(module: any): any;
        postProcessMaterial(module: any): any;
        getNormalMaterialData(module: any): any;
        setNormalMaterialData(module: any, exports: any): any;
        getDefaultMaterialData(module: any): any;
        registerDefaultMaterialData(module: any, exports: any): any;
        registerHandler(module: any, exports: any): any;
        instance(): any;
    }
    export const MaterialTypeEnum: any;
    export const _materialProcess: any;
    export const _materialSeamedImageProcess: any;
    export const _materialBoundaryPathProcess: any;
    export const _materialInnerPathsProcess: any;
    export const _materialIsRectangle: any;
    export const _materialNeedToChangeDataURL: any;
    export const _materialTypeName: any;
    export const _materialInnerPaths: any;
    export const _materialAreaSeek: any;
    export const _productsMap: any;
    export const _materialPostProcess: any;
    export const _materialDefaultOffset: any;
    export const _handlers: any;
    export const _normalMapMaterialData: any;
    export const _defaultMaterialData: any;
    export const _patternMaterialData: any;
    export const check: any;
    export const do: any;
    export const productType: any;
    export const Material: any;
    export const textureURIDefault: any;
    export const textureURI: any;
    export const checkMaterial: any;
    export const generateImage: any;
    export const getBoundary: any;
    export const getInnerPaths: any;
    export const isRectangle: any;
    export const postProcessMaterial: any;
    export const getDefaultOffset: any;
    export const getAreaAndSeekId: any;
    export const _instance: any;
}

declare module "82400" {
    export const LayerUtil: any;
    export const activeLayer: any;
    export const ceilingLayer: any;
    export const getUnderLayer: any;
    export const rootLayer: any;
    export const length: any;
}

declare module "8249" {
    export const OpeningUtil: any;
    export const length: any;
    export const from: any;
}

declare module "82625" {
    export enum FaceFlagEnum {
    }
    export enum FaceHoleType {
    }
    export const length: any;
    export const Face_IO: any;
    export const Face: any;
    export const singleRoomHidden: any;
    // Original Name: w
    export class Face_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
        migrateLoad(module: any, exports: any, require: any): any;
    }
    export const material: any;
    export const __outerLoop: any;
    export const outerLoop: any;
    export const innerLoops: any;
    export const hs: any;
    export const surfaceObj: any;
    export const surObj: any;
    export const dC: any;
    export const __innerLoops: any;
    export const __surfaceObj: any;
    export const __material: any;
    export const colorMode: any;
    export const color: any;
    export const faceEntity: any;
    export const moldings: any;
    export const _host: any;
    export const __holes: any;
    export const __discreteCount: any;
    export const StructureHole: any;
    export const BeamHole: any;
    export const OpeningHole: any;
    export const MoldingHole: any;
    export const ClipHole: any;
    // Original Name: D
    export class Face extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any, exports: any, require: any, i: any, n: any): any;
        _initFace(module: any, exports: any, require: any, i: any, n: any): any;
        getOuterLoop(): any;
        setOuterLoop(module: any): any;
        _setOuterLoop(module: any): any;
        getInnerLoops(): any;
        setInnerLoops(module: any): any;
        _setInnerLoops(module: any): any;
        isSameInnerLoops(module: any, exports: any): any;
        addInnerLoop(module: any): any;
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
        refreshMaterialUniquePolygon(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        onChildRemoved(module: any): any;
        onChildDirty(module: any, exports: any): any;
        destroy(): any;
        verify(module: any): any;
        refreshBoundInternal(): any;
        getIO(): any;
        mirror(module: any, exports: any): any;
        translate(module: any): any;
        validateGeometry(): any;
        Dirty(module: any): any;
        getMolding(module: any): any;
        cloneMoldingsObj(): any;
        addMolding(module: any): any;
        removeMolding(module: any, exports: any): any;
        hasMoldings(module: any): any;
        removeAllMoldings(): any;
        refreshWallMoldings(module: any): any;
        dirtyRelatedMitres(): any;
    }
    export const _clipHoles: any;
    export const __moldings: any;
    export const __contents: any;
    export const holes: any;
    export const signalContentAdded: any;
    export const signalContentRemoved: any;
    export const signalCustomizedWallAttachedModelAdded: any;
    export const signalCustomizedWallAttachedModelRemoved: any;
    export const signalFaceGeometryChanged: any;
    export const _signalHook: any;
    export const _materialSignalHook: any;
    export const _wiresCache: any;
    export const isRaw: any;
    export const outer: any;
    export const type: any;
    export const Geometry: any;
    export const face1: any;
    export const face2: any;
    export const contents: any;
    export const hasContent: any;
}

declare module "82657" {
    export enum SpaceSlabFitType {
        Deprecated = 2,
        Yes = 3,
    }
    export const length: any;
    export const RoomBuilder: any;
    export const RoomBuilder_IO: any;
    export const ExtrudeType: any;
    export const Right: any;
    export const Front: any;
    export const Back: any;
    export const Left: any;
    export const Bottom: any;
    export const Top: any;
    export const Circle: any;
    export const No: any;
    export const Deprecated: any;
    export const Yes: any;
    // Original Name: D
    export class RoomBuilder_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
        postLoad(module: any, exports: any): any;
    }
    export const fM: any;
    export const faceMap: any;
    export class H extends import("42612").HSQueryBase {
        constructor(module: any, ...args: any[]);
        getTopoFacesByTopoKey(module: any): any;
        allTopoKeys(): any;
        getRegionsByTopoKey(module: any): any;
        traverseTheRest(module: any, exports: any): any;
    }
    export const _map: any;
    export const topoFaces: any;
    export const regions: any;
    export const finish: any;
    // Original Name: O
    export class RoomBuilder extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        onFieldChanged(module: any, exports: any, require: any): any;
        isRoot(): any;
        getIO(): any;
        getWallRegion(module: any): any;
        getLinkedWallRegions(module: any): any;
        getFaceTypeByWall(module: any, exports: any): any;
        _getFacesByWall(module: any): any;
        getCoEdgeInfo(module: any): any;
        if(: any, require: any): any;
        return: any;
        i: any;
        n: any;
    }
    export const _layer: any;
    export const _coEdgeList: any;
    export const _regionList: any;
    export const _wallCoEdgeMap: any;
    export const ptRegions: any;
    export const _separator: any;
    export const _wallPtRegions: any;
    export const mirrorBuilding: any;
    export const _topoFacesQueryCache: any;
    export const _faceObjs: any;
    export const id: any;
    export const index: any;
    export const originKey: any;
    export const finalKey: any;
    export const structureMode: any;
    export const coEdge: any;
    export const ctx: any;
    export const groupBrepFace: any;
    export const s: any;
    export const require: any;
    export const i: any;
    export const d: any;
    export const discreteCount: any;
    export const mixpaint: any;
    export const faceEntity: any;
    export const material: any;
    export const isAux: any;
    export const linkStructureInfos: any;
    export const extraKey: any;
    export const coEdgeId: any;
    export const groupIndex: any;
    export const wallId: any;
    export const sourceId: any;
    export const item: any;
    export const value: any;
    export const edgeId: any;
    export const edge: any;
    export const wallIds: any;
    export const oldId: any;
    export const type: any;
    export const topoName: any;
    export const percent: any;
    export const roomRegionList: any;
    export const startData: any;
    export const endData: any;
}

declare module "82711" {
    export const exports: any;
}

declare module "82745" {
    export const exports: any;
}

declare module "82843" {
    export const exports: any;
}

declare module "82945" {
    export const SketchBrepNameHelper: any;
    // Original Name: d
    export class SketchBrepNameHelper {
        reconstructBrepNames(module: any, exports: any): any;
        sketchCurve2BrepEdges(module: any, exports: any, require: any): any;
        sketch2BrepFaces(module: any, exports: any, require: any): any;
        giveCoedge3dsToponames(module: any): any;
        matchPoint(module: any, exports: any): any;
        matchFace(module: any, exports: any): any;
        else: any;
        for(: any, exports: any, of: any, i: any): any;
        constructor(...args: any[]);
    }
    export const tag: any;
    export const userData: any;
    export const length: any;
    export const x: any;
    export const y: any;
    export const _instance: any;
}

declare module "8302" {
    export const WallMolding_IO: any;
    export const WallMolding: any;
    // Original Name: r
    export class WallMolding_IO extends import("14502").Molding_IO {
    }
    // Original Name: a
    export class WallMolding extends import("14502").Molding {
        constructor(module: any, exports: any, ...args: any[]);
        getIO(): any;
        getMetadataFilterKeys(): any;
        dirtyNeighborMoldingsByFacetype(): any;
        isValidMoldingType(module: any): any;
    }
    export const XSize: any;
    export const YSize: any;
}

declare module "83037" {
    export const MixPaintUpdaterProxy: any;
    // Original Name: o
    export class MixPaintUpdaterProxy {
        getInstance(): any;
        registerUpdater(e: any): any;
        getUpdater(): any;
        updateFromDump(e: any, t: any, o: any): any;
        updateFromPaintData(e: any, t: any, o: any): any;
        postUpdateFloorplan(e: any, t: any): any;
        constructor(...args: any[]);
    }
    export const _ins: any;
    export const _updaterConstructor: any;
    export const _updater: any;
}

declare module "83138" {
    export const Manager: any;
    // Original Name: d
    export class Manager {
        constructor(...args: any[]);
        instance(): any;
        registerCreator(module: any, exports: any): any;
        createParametricModel(module: any, exports: any, require: any, i: any): any;
    }
    export const _creators: any;
    export const _instance: any;
}

declare module "83246" {
    export const exports: any;
}

declare module "83434" {
    export const b: any;
    export const exports: any;
}

declare module "83448" {
    export const exports: any;
}

declare module "83549" {
    export const length: any;
    export const Baseboard_IO: any;
    export const Baseboard: any;
    // Original Name: p
    export class Baseboard_IO extends import("8302").WallMolding_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const offset: any;
    export const topoPathers: any;
    // Original Name: f
    export class Baseboard extends import("8302").WallMolding {
        constructor(module: any, exports: any, ...args: any[]);
        getStartTopoPather(): any;
        getEndTopoPather(): any;
        split(module: any): any;
        addTopoPather(module: any): any;
        getIO(): any;
        calcSweepPath(module: any): any;
        getConnectedPath(module: any): any;
        map(): any;
    }
    export const type: any;
    export const userData: any;
    export const parent: any;
}

declare module "83553" {
    export const CustomizedModelLightSlot_IO: any;
    export const CustomizedModelLightSlot: any;
    // Original Name: a
    export class CustomizedModelLightSlot_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const backgroundFaceNormal: any;
    export const options: any;
    export const parameters: any;
    export const validateNormal: any;
    export const validateNormals: any;
    // Original Name: s
    export class CustomizedModelLightSlot extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        getIO(): any;
        constructMetaData(module: any, exports: any, require: any): any;
        initByMeta(module: any): any;
        createDefaultMetaData(): any;
        getEntitesAppendOnLightSlot(): any;
        getEntitiesAppendOnLightSlot(): any;
        dirtyGeometry(): any;
        dirtyMaterial(module: any): any;
        _getGraphicsDataFromParent(module: any, exports: any): any;
        getGraphicsData(): any;
        getGraphicsDataAsync(): any;
        getHost(): any;
        assignTo(module: any): any;
        getFaceMaterial(module: any): any;
        applyToCustomizedModel(module: any): any;
        updateMetadata(module: any): any;
        getParameters(): any;
        isContentInLoop(module: any, exports: any): any;
        getTopProjection(): any;
        getBottomProjection(): any;
        getFrontProjection(): any;
        canTransactField(): any;
    }
    export const _host: any;
    export const metadata: any;
    export const _parameters: any;
    export const bottomProjection: any;
    export const topProjection: any;
    export const signalMaterialChanged: any;
    export const signalWebCADDocChanged: any;
    export const path: any;
    export const aLength: any;
    export const height: any;
    export const bLength: any;
    export const width: any;
    export const moldingId: any;
    export const documentId: any;
    export const lightSlotId: any;
    export const webCADDocument: any;
    export const relativeIndices: any;
    export const docId: any;
}

declare module "83630" {
    export const union: any;
}

declare module "83663" {
    export const length: any;
    export const DHole: any;
    export const DHole_IO: any;
    export class _ {
        constructor(module: any, exports: any, ...args: any[]);
        update(module: any): any;
    }
    export const _XSize: any;
    export const _YSize: any;
    export const x: any;
    export const y: any;
    // Original Name: C
    export class DHole_IO extends import("8202").ContentBase_IO {
        instance(): any;
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const _DHole_IO_instance: any;
    export const profile: any;
    export const sideFaces: any;
    export const bottomFaces: any;
    export const hostFace: any;
    export const pocket: any;
    export const host: any;
    export const bottomFaceMaterial: any;
    export const dumpedEntities: any;
    export const doorStoneMaterialEnabled: any;
    export const _isDoorStoneMaterialEnabled: any;
    export const isDefaultAlign: any;
    export const _isDefaultAlign: any;
    export const __profile: any;
    export const __sideFaces: any;
    export const __bottomFaces: any;
    export const __hostFace: any;
    export const __doorStoneMaterialEnabled: any;
    export const __isDefaultAlign: any;
    export const _bottomFaceMaterial: any;
    export const __host: any;
    // Original Name: S
    export class DHole extends import("8202").ContentBase {
        constructor(...args: any[]);
        getIO(): any;
        updateHole(module: any): any;
        setPocket(module: any): any;
        dirtyGeometry(): any;
        _createOrUpdateSideFaces(): any;
        _sortFaces(): any;
        _getBottomFaces(): any;
        setBottomFaceMaterial(module: any): any;
        _setBottomFaceMaterial(module: any): any;
        updateFaceMixPaint(module: any): any;
        _updateFaceMixpaint(module: any): any;
        assignTo(module: any): any;
        canAddPocket(): any;
        getHost(): any;
        dirtyPosition(module: any): any;
        getPocket(): any;
        getFaceType(module: any): any;
        getHostFace(module: any): any;
        toggleDoorStoneAlignSide(): any;
        getDoorStoneAlignSideStatus(): any;
        _onDefaultAlignChanged(module: any, exports: any): any;
        _getHostFace(module: any): any;
        _updateHostFace(): any;
        exports: any;
    }
    export const __pocket: any;
    export const _materialSignalHook: any;
    export const position: any;
    export const z: any;
    export const size: any;