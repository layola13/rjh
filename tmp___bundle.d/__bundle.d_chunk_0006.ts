    export const __anchor: any;
    export const y: any;
}

declare module "41923" {
    export const SketchEncoder: any;
    // Original Name: s
    export class SketchEncoder {
        generateEncodedSketchFaces(module: any): any;
        encodeSketchFace(module: any, exports: any): any;
        encodeSketchCurve(module: any): any;
        encodeSketchLine2d(module: any): any;
        encodeSketchCircle2d(module: any): any;
        encodeSketchCircleArc2d(module: any): any;
        getInstance(): any;
        constructor(...args: any[]);
    }
    export const _instance: any;
    export const _MINEXTRUSION: any;
}

declare module "42020" {
    export const assign: any;
}

declare module "42052" {
    export const length: any;
    export const Polygon: any;
    export const Polygon_IO: any;
    // Original Name: p
    export class Polygon_IO extends import("62888").Region_IO {
        instance(): any;
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const _Polygon_IO_instance: any;
    export const originPoints: any;
    export const __outerLoop: any;
    export const outerLoop: any;
    export const __innerLoops: any;
    export const innerLoops: any;
    // Original Name: f
    export class Polygon extends import("62888").Region {
        constructor(module: any, exports: any, ...args: any[]);
        init(module: any, exports: any): any;
        setOuterLoop(module: any, exports: any): any;
        setInnerLoops(module: any, exports: any): any;
        _getGeomPolygons(): any;
        _setGeomPolygons(module: any): any;
        hasWaistline(): any;
        getAllRegions(): any;
        getRegionIndex(module: any): any;
        insertWaistline(module: any, exports: any): any;
        insertWaistlineRegion(module: any, exports: any): any;
        removeWaistline(module: any): any;
        getWaistLineNeighbors(module: any): any;
        getWaistlines(): any;
        updateLayout(): any;
        fixWaistlineLayout(): any;
        getIO(): any;
        clone(): any;
        getWires(): any;
        getAllCurves(): any;
        bounding(): any;
        getBounding(): any;
        refreshBoundInternal(): any;
        isPointInside(module: any): any;
        getAllPoints(): any;
        getDiscretePoints(): any;
        hasBackgroundPoint(): any;
        hasBackgroundCurve(): any;
        isBackground(): any;
        isOuterLoopContainsCircle(): any;
        isOuterLoopContainsCircleArc(): any;
        onChildDirty(module: any, exports: any): any;
        createPolygon(module: any, exports: any): any;
        offset(module: any, exports: any): any;
        transform(module: any): any;
        getOuterPoints(): any;
        getPath(): any;
        getDiscretePath(): any;
        toPolygon(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        destroy(): any;
    }
    export const curves: any;
    export const holes: any;
    export const parentgrid: any;
    export const layout: any;
    export const left: any;
    export const top: any;
    export const boundInternal: any;
    export const x: any;
    export const y: any;
    export const center: any;
    export const m00_: any;
    export const m01_: any;
    export const m10_: any;
    export const m11_: any;
    export const _disposed: any;
}

declare module "42288" {
    export const _contentTypes: any;
    export const _categories: any;
    export const _priority: any;
    export const _config: any;
    export const _ruleType: any;
    export const ruleType: any;
    export const sourceContentType: any;
    export const length: any;
    export const templateKey: any;
    export const REALISTIC: any;
    export const type: any;
    export const NATURE_3: any;
    export const NIGHT: any;
    export const CHILLY_3: any;
    export const default: any;
}

declare module "42389" {
}

declare module "42395" {
    export const length: any;
    export const GridTypeEnum: any;
    export const MixBlock: any;
    export const MixBlock_IO: any;
    // Original Name: d
    export class MixBlock_IO extends import("57027").Shape_IO {
        instance(): any;
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const _MixBlock_IO_instance: any;
    export const points: any;
    export const originPoints: any;
    // Original Name: h
    export class MixBlock extends import("57027").Shape {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any, exports: any): any;
        getIO(): any;
        partOfGrid(): any;
        offset(module: any, exports: any): any;
        transform(module: any): any;
        bounding(): any;
        getPath(): any;
        getDiscretePath(): any;
        getDiscretePoints(): any;
        getOuterPoints(): any;
        toPolygon(): any;
        copyFrom(module: any): any;
        clone(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
    }
    export const __points: any;
    export const __holes: any;
    export const parent: any;
    export const x: any;
    export const y: any;
    export const m00_: any;
    export const m01_: any;
    export const m10_: any;
    export const m11_: any;
    export const holes: any;
}

declare module "42612" {
    export const writable: any;
}

declare module "42622" {
    export const OutdoorSpaceTypeEnum: any;
    export const RoomTypeEnum: any;
    export const Hallway: any;
    export const LivingRoom: any;
    export const DiningRoom: any;
    export const LivingDiningRoom: any;
    export const Balcony: any;
    export const Bedroom: any;
    export const MasterBedroom: any;
    export const SecondBedroom: any;
    export const KidsRoom: any;
    export const ElderlyRoom: any;
    export const CloakRoom: any;
    export const StorageRoom: any;
    export const LaundryRoom: any;
    export const NannyRoom: any;
    export const Kitchen: any;
    export const Bathroom: any;
    export const BathroomDryArea: any;
    export const MasterBathroom: any;
    export const SecondBathroom: any;
    export const Library: any;
    export const Lounge: any;
    export const Auditorium: any;
    export const EquipmentRoom: any;
    export const Corridor: any;
    export const Aisle: any;
    export const Terrace: any;
    export const Stairwell: any;
    export const Outdoors: any;
    export const Courtyard: any;
    export const Garage: any;
    export const Entrance: any;
    export const Openspace: any;
    export const OtherRoom: any;
    export const Office: any;
    export const Studio: any;
    export const PublicInterior: any;
    export const PublicExterior: any;
    export const ResidentialExterior: any;
    export const EntranceHallway: any;
    export const Basement: any;
    export const Den: any;
    export const PorchBalcony: any;
    export const HomeCinema: any;
    export const FloorPlan: any;
    export const Sketch: any;
    export const ProductShowcase: any;
    export const none: any;
    export const OtherSpace: any;
}

declare module "42640" {
    export const tesselator: any;
    export const polygon: any;
    export const default: any;
    export const PolygonTools: any;
    export const polygon_tools_version: any;
    export const polygon_tools_rev: any;
}

declare module "42768" {
    export enum GeometryObjectType {
        Arc2d = 2,
        Circle2d = 3,
        LineSegment2d = 4,
        Point2d = 1,
        PolyCurve2d = 5,
    }
    export const Unknown: any;
    export const Point2d: any;
    export const Arc2d: any;
    export const Circle2d: any;
    export const LineSegment2d: any;
    export const PolyCurve2d: any;
}

declare module "42922" {
    export const length: any;
    export const SpotPhysicalLight_IO: any;
    export const SpotPhysicalLight: any;
    // Original Name: d
    export class SpotPhysicalLight_IO extends import("75089").SpotLight_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const name: any;
    export const contentID: any;
    export const topView: any;
    export const __contentID: any;
    export const __topView: any;
    // Original Name: h
    export class SpotPhysicalLight extends import("75089").SpotLight {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any): any;
        isVirtual(): any;
        hasAreaSize(): any;
        reset(): any;
        getIO(): any;
        getIesPosition(module: any): any;
        getIesDir(module: any, exports: any): any;
        getRenderParameters(): any;
        refreshBoundInternal(): any;
        updateRotationToTarget(): any;
        getBoundingData(): any;
    }
    export const _iesMatrixCache: any;
    export const type: any;
    export const XRotation: any;
    export const YRotation: any;
    export const ZRotation: any;
    export const _iesConfig: any;
    export const content: any;
    export const targetDir: any;
    export const __IES: any;
    export const __iesUrl: any;
    export const __isPublicIES: any;
    export const ZSize: any;
    export const position: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const XTarget: any;
    export const ZTarget: any;
    export const targetEnabled: any;
    export const temperature: any;
    export const intensity: any;
    export const entityId: any;
    export const IES: any;
    export const iesUrl: any;
    export const isPublicIES: any;
    export const close: any;
    export const rgb: any;
    export const affectSpecular: any;
    export const intensityScale: any;
    export const iesRotations: any;
}

declare module "43039" {
    export const exports: any;
}

declare module "43113" {
    export const length: any;
    export const CustomizedModel_IO: any;
    export const CustomizedModel: any;
    // Original Name: S
    export class CustomizedModel_IO extends import("20551").Content_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
        postLoad(module: any, exports: any): any;
    }
    export const webCADDocument: any;
    export const draggable: any;
    export const pamatricPath: any;
    export const apiVersion: any;
    export const faceMaterials: any;
    export const hostPolygon: any;
    export const _hostPolygon: any;
    export const matMap: any;
    export const isPreloading: any;
    export const _pamatricPath: any;
    export const _apiVersion: any;
    export const _faceMaterials: any;
    export const data: any;
    export const Class: any;
    export const host: any;
    export const _webCADDocument: any;
    export const useColor: any;
    export const colorMode: any;
    export const _matMap: any;
    // Original Name: P
    export class CustomizedModel extends import("20551").Content {
        constructor(module: any, exports: any, ...args: any[]);
        _setHost(module: any): any;
        _getWebCADDocument(): any;
        _setWebCADDocument(module: any): any;
        setWebCADDocumentQuietly(module: any): any;
        _setWebCADDocument_Quietly(module: any): any;
        clearProjections(): any;
        isFaceSupportPaintMaterial(module: any): any;
        isValidFace(module: any): any;
        hasFaceMaterial(module: any): any;
        createFaceMaterial(module: any): any;
        getNormalFaceMaterialData(module: any): any;
        getFaceMaterial(module: any): any;
        removeFaceMaterial(module: any): any;
        setFaceMaterial(module: any, exports: any, require: any): any;
        _addFaceMaterialListener(module: any): any;
        _removeFaceMaterialListener(module: any): any;
        _onFaceMaterialDirty(module: any): any;
        onFaceMaterialChanged(module: any): any;
        refreshFaceMaterial(module: any, exports: any): any;
        setFaceMaterialData(module: any, exports: any): any;
        dirtyFaceMaterial(module: any, exports: any, require: any): any;
        isMoldingFace(module: any): any;
        _getMoldingId(module: any): any;
        _getFaceGraphicData(module: any): any;
        getFacePaths(module: any, exports: any): any;
        getFaceProjectionPlane(module: any, exports: any): any;
        getFacePlaneProject(module: any, exports: any): any;
        getDefaultSizeRange(module: any): any;
        parseWebCADDocument(module: any): any;
        stringifyWebCADDocument(module: any): any;
        initByMeta(module: any, exports: any, require: any): any;
        getMetadataFilterKeys(): any;
        getIO(): any;
        _postMigrationAfterLoad(module: any): any;
        _migrateJSONForUnitChange(module: any): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        moveAttachedContents(module: any, exports: any): any;
        dirtyChildModels(module: any): any;
        getChildrenByClass(module: any): any;
        getChildByWebDocId(module: any): any;
        getMoldingEntityById(module: any): any;
        getMoldingEntities(): any;
        getLightSlotEntities(): any;
        getLightBandEntities(): any;
        addMoldingEntity(module: any): any;
        removeMoldingEntity(module: any): any;
        getLightSlotEntityById(module: any): any;
        addLightSlotEntity(module: any): any;
        removeLightSlotEntity(module: any): any;
        getLightBandEntityById(module: any): any;
        addLightBandEntity(module: any): any;
        removeLightBandEntity(module: any): any;
        getModelObjStr(): any;
        canAddContent(module: any): any;
        setFlagOn(module: any, exports: any): any;
        setFlagOff(module: any, exports: any): any;
        assignTo(module: any): any;
        getGraphicsData(): any;
        getGraphicsDataAsync(): any;
        getHighResolutionGraphicsDataAsync(): any;
        _dealGraphicsDatas(module: any): any;
        _loadGraphicsDataAsync(module: any, exports: any): any;
        dirtyGeometry(module: any): any;
        dirtyMaterial(module: any): any;
        _loadGraphicsData(module: any): any;
        getLocalToWorldTransform(module: any): any;
        getMoldings(): any;
        refreshBoundInternalAsync(): any;
        refreshBoundInternal(): any;
        getMoldingsInfo(): any;
        _updateProjectionMaterialData(module: any): any;
        _calcProjectionContours(module: any): any;
        getTopProjectionAsync(module: any, exports: any): any;
        getTopProjection(module: any, exports: any): any;
        getBottomProjection(module: any): any;
        clipFrontProjection(module: any): any;
        getFrontProjection(module: any): any;
        getTopProjectionPlane(): any;
        getBottomProjectionPlane(): any;
        getFrontProjectionPlane(): any;
        updateSmartCustomizedCeiling(module: any, exports: any, require: any, i: any): any;
        updateCustomizedCeiling(module: any): any;
        getLightBandData(): any;
        _generateLightBandObjStr(): any;
        getLightBandOverallLength(): any;
        getLightBandTopProjection(): any;
        getLightBandBottomProjection(): any;
        getLightBandFrontProjection(): any;
        refreshMaterialData(): any;
        setMaterialData(module: any, exports: any, require: any): any;
    }
    export const topProjection: any;
    export const bottomProjection: any;
    export const frontProjection: any;
    export const lightBandTopProjection: any;
    export const lightBandBottomProjection: any;
    export const lightBandFrontProjection: any;
    export const moldings: any;
    export const _graphicsData: any;
    export const _graphicsDataPromise: any;
    export const topOffset: any;
    export const signalWebCADDocChanged: any;
    export const _materialManager: any;
    export const contentType: any;
    export const metadata: any;
    export const _int_webCADDocument_Quietly: any;
    export const topProjectionNeedUpdate: any;
    export const type: any;
    export const target: any;
    export const xRay: any;
    export const surfaceArea: any;
    export const contours: any;
    export const circularReference: any;
    export const customData: any;
    export const webCADDocumentPromise: any;
    export const dataType: any;
    export const userFreeData: any;
    export const initialXLength: any;
    export const initialYLength: any;
    export const initialZLength: any;
    export const sizeRangeType: any;
    export const value: any;
    export const moldingId: any;
    export const lightSlotId: any;
    export const lightBandId: any;
    export const faces: any;
    export const edges: any;
    export const contents: any;
    export const updatedFaces: any;
    export const updatedEdges: any;
    export const removedGroupDocIds: any;
    export const children: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const XScale: any;
    export const YScale: any;
    export const ZScale: any;
    export const flip: any;
    export const XRotation: any;
    export const YRotation: any;
    export const ZRotation: any;
    export const customizedParent: any;
    export const rotation: any;
    export const outline: any;
    export const materialData: any;
    export const unioned: any;
    export const paths: any;
    export const left: any;
    export const top: any;
    export const ceilingHeight: any;
    export const parametricCeilingType: any;
    export const OlderCascadeCeiling: any;
    export const autoFillGap: any;
    export const __XLength: any;
    export const XLength: any;
    export const __YLength: any;
    export const YLength: any;
    export const __ZLength: any;
    export const ZLength: any;
    export const __XScale: any;
    export const __YScale: any;
    export const __ZScale: any;
    export const __XRotation: any;
    export const __YRotation: any;
    export const __ZRotation: any;
    export const __x: any;
    export const __y: any;
    export const __z: any;
    export const _boundDirty: any;
    export const needUpdateMaterial: any;
    export const : any;
    export const const: any;
    export const error: any;
    export const fpMaterialData: any;
    export const material: any;
    export const area: any;
    export const constant: any;
    export const normal: any;
    export const id: any;
    export const seekId: any;
    export const customizedProductUrl: any;
    export const logger: any;
    export const useCacheProjection: any;
    export const SizeRangeTypeEnum: any;
}

declare module "43247" {
    export const exports: any;
}

declare module "43297" {
    export const length: any;
    export const Line2d: any;
    export const Line2d_IO: any;
    // Original Name: d
    export class Line2d_IO extends import("46088").Curve2d_IO {
        instance(): any;
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const _Line2d_IO_Instance: any;
    export const ln: any;
    export const __start: any;
    export const __end: any;
    // Original Name: h
    export class Line2d extends import("46088").Curve2d {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any, exports: any): any;
        _setStart(module: any): any;
        _setEnd(module: any): any;
        getIO(): any;
        toTHREECurve(): any;
        refreshBoundInternal(): any;
        offset(module: any, exports: any): any;
        createSubCurve(module: any, exports: any): any;
        getTangent(module: any): any;
        getDiscretePoints(): any;
        verify(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
    }
    export const start: any;
    export const end: any;
    export const from: any;
}

declare module "43446" {
    export const WebCadMoldingDocument: any;
    export const dirty: any;
    export const _moldings: any;
    export const _documentJSON: any;
    export const _meshes: any;
    export const _highResolutionMeshes: any;
    export const length: any;
    export const normal: any;
    export const verticalLine: any;
    export const dir: any;
    export const customData: any;
    export const uvBasePoints: any;
    export const cachedID: any;
    export const isDuringFastComputation: any;
    export const profile: any;
    export const profileHigh: any;
}

declare module "43584" {
    export const length: any;
    export const Underlay_IO: any;
    export const Underlay: any;
    // Original Name: a
    export class Underlay_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const x: any;
    export const y: any;
    export const width: any;
    export const height: any;
    export const url: any;
    export const show: any;
    export const showSnapPoint: any;
    export const cadPoints: any;
    export const parallelLines: any;
    export const __x: any;
    export const __y: any;
    export const __width: any;
    export const __height: any;
    export const __url: any;
    export const __show: any;
    export const __showSnapPoint: any;
    export const __cadPoints: any;
    export const __parallelLines: any;
    // Original Name: s
    export class Underlay extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any): any;
        isRoot(): any;
        reset(): any;
        set(module: any): any;
        getData(): any;
        getIO(): any;
        verify(): any;
        showBackground(module: any): any;
    }
}

declare module "43600" {
    export const MaterialDecorator: any;
    export const _material: any;
}

declare module "43762" {
    export enum NodeCompEnum {
    }
    export const NodeComp: any;
    export const Joint: any;
    export const Device: any;
    // Original Name: r
    export class NodeComp extends import("8467").Component {
    }
}

declare module "43807" {
    export const isSupersetOf: any;
}

declare module "43832" {
    export const length: any;
    export const PatternGrid: any;
    export const PatternGrid_IO: any;
    // Original Name: h
    export class PatternGrid_IO extends import("1288").MixGrid_IO {
        instance(): any;
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const _PatternGrid_IO_instance: any;
    export const fullPavingOption: any;
    // Original Name: u
    export class PatternGrid extends import("1288").MixGrid {
        constructor(module: any, exports: any, ...args: any[]);
        create(): any;
        canEdit(): any;
        createPolygons(): any;
        addModifiedBlocks(module: any): any;
        removeModifiedBlock(module: any): any;
        getModifiedBlock(module: any): any;
        getModifiedBlockByKey(module: any): any;
        clearModifiedBlocks(): any;
        _findPolygonIndex(module: any): any;
        getIO(): any;
        getStartPointWithBoundary(module: any): any;
        migratePattern(module: any, exports: any): any;
        createPattern(module: any, exports: any): any;
        updatePatternPolygon(module: any, exports: any): any;
        updateBlockMaterialMap(module: any): any;
        getChildMaterials(): any;
        onDirty(module: any): any;
        onPatternReset(module: any): any;
        onPatternResetOverride(module: any): any;
        dirtyBlocks(module: any): any;
        refreshMaterial(module: any): any;
        recomputeTemplate(module: any): any;
        recomputeFullPaving(): any;
        update(): any;
        isValid(): any;
        getOriginalMaterialData(module: any, exports: any): any;
    }
    export const _fullPavingOption: any;
    export const _patternBlocks: any;
    export const _gridPavingOption: any;
    export const blocks: any;
    export const pavingOption: any;
    export const material: any;
    export const grid: any;
    export const x: any;
    export const y: any;
    export const sliderOffsetX: any;
    export const sliderOffsetY: any;
    export const rotation: any;
    export const __polygons: any;
    export const polygons: any;
    export const type: any;
    export const Material: any;
    export const _floorplan: any;
}

declare module "43874" {
    export const DocManager: any;
    // Original Name: r
    export class DocManager {
        constructor(...args: any[]);
        instance(): any;
        clear(): any;
    }
    export const wallCachedData: any;
    export const geometries: any;
    export const wallProviderMap: any;
    export const slabProviderMap: any;
    export const scene: any;
}

declare module "43942" {
    export const Arc2DState: any;
    export const Point2DState: any;
    export const PointState: any;
    export const ArrayState: any;
    export const State: any;
}

declare module "43953" {
    export const exports: any;
}

declare module "43988" {
    export const getAutoSunLightAngles: any;
    export const getFocusContentAndOpening: any;
    export const XSize: any;
    export const YSize: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export class h {
        constructor(module: any, exports: any, ...args: any[]);
        lerp(module: any): any;
    }
    export const min: any;
    export const max: any;
    export const ZSize: any;
    export const floor: any;
    export const length: any;
    export const roomType: any;
    export const left: any;
    export const top: any;
    export class S {
        constructor(module: any, exports: any, ...args: any[]);
        _getScreenPt(module: any): any;
        isPointInFocus(module: any): any;
        isPointInView(module: any): any;
        getContentProjectRectInFocus(module: any): any;
        getContentPercentInView(module: any): any;
        isContentInViewBox(module: any): any;
        _getContentProjectBound(module: any, exports: any): any;
        findLargestContentInFocus(module: any): any;
    }
    export const camera: any;
    export const canvasSize: any;
    export const w: any;
    export const threeCamera: any;
    export const type: any;
    export const target: any;
    export const clip: any;
    export const near: any;
    export const far: any;
    export const l: any;
    export const exports: any;
    export const focusBox: any;
    export const viewBox: any;
    export const width: any;
    export class P {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        _isValidContent(module: any): any;
        _getContentsInCamera(): any;
        _getContentsInFocus(): any;
        _isPriorityContent(module: any): any;
        _getFocusContents(): any;
        getContentsOpening(module: any): any;
        getContentLightSetting(module: any): any;
        getSunPos(module: any, exports: any, require: any, i: any): any;
        getVifaSunlightAngles(module: any, exports: any): any;
        getDuskSunlightAngles(module: any, exports: any): any;
        getSunlightAngles(module: any, exports: any): any;
    }
    export const room: any;
    export const contents: any;
    export const viewbox: any;
    export const target_x: any;
    export const target_y: any;
    export const PI: any;
    export const windowPos: any;
    export class E extends P {
        _getFocusContents(): any;
    }
    export class M extends P {
        _getFocusContents(): any;
    }
    export class v extends P {
    }
    export class b extends P {
    }
}

declare module "43989" {
    export const exports: any;
}

declare module "44029" {
    export const length: any;
    export const Wall_IO: any;
    export const WallFlagEnum: any;
    export const WallTypeEnum: any;
    export const WallSurfaceTypeEnum: any;
    export const WallFaceType: any;
    export const Wall: any;
    export const dimensionOff: any;
    export const hoverOn: any;
    export const clickOn: any;
    export const heightEditable: any;
    export const transparent: any;
    export const left: any;
    export const right: any;
    export const top: any;
    export const bottom: any;
    export const front: any;
    export const back: any;
    export const inner: any;
    export const outer: any;
    export const from: any;
    export const to: any;
    export const outerfrom: any;
    export const outerto: any;
    export const generic: any;
    export const gypsum_generic: any;
    export const brick_generic: any;
    export const concrete: any;
    // Original Name: b
    export class Wall_IO extends import("99338").Entity_IO {
        load(module: any, exports: any, require: any, i: any): any;
    }
    export const __from: any;
    export const __to: any;
    export const __width: any;
    export const __height3d: any;
    export const wallType: any;
    export const isLoadBearing: any;
    export const curve: any;
    export const __curve: any;
    export const parentIds: any;
    export const _faces: any;
    // Original Name: x
    export class Wall extends import("99338").Entity {
        constructor(module: any, ...args: any[]);
        verify(): any;
        validate(module: any): any;
        _setFrom(module: any): any;
        _setTo(module: any): any;
        getFrom(): any;
        getTo(): any;
        getWidth(): any;
        getHeight3d(): any;
        getCurve(): any;
        copyProperty(module: any): any;
        isArcWall(): any;
        getTangent(module: any): any;
        getPointAt(module: any): any;
        unshelveredWallGeometry(): any;
        getFrontBackSideFace(module: any, exports: any): any;
        getFaces(module: any): any;
        _getFaces(module: any): any;
        setFaces(module: any, exports: any): any;
        _setFacesObj(module: any, exports: any): any;
        getFaceType(module: any): any;
        _setFaces(module: any, exports: any): any;
        forEachFace(module: any, exports: any): any;
        removeFromParent(module: any): any;
        destroy(): any;
        getValidCoEdge(): any;
        getParentRoom(): any;
        isShared(): any;
        getIO(): any;
        modelSpaceToUVWSpace(module: any): any;
        UVWSpaceToModelSpace(module: any): any;
        getConnectedEdges(): any;
        isValidChild(module: any): any;
        hookWainScotSignal(module: any): any;
        isValid(): any;
        canEdit(): any;
        canSelect(module: any): any;
        forEachSurface(module: any, exports: any): any;
        getMaterial(module: any): any;
        setContents(module: any): any;
        addContent(module: any): any;
        removeContent(module: any): any;
        hasContent(module: any, exports: any): any;
        _setContents(module: any): any;
        _addContent(module: any): any;
        _removeContent(module: any): any;
        forEachContent(module: any, exports: any): any;
        forEachContentExceptOpenings(module: any, exports: any): any;
        setOpenings(module: any): any;
        addOpening(module: any): any;
        removeOpening(module: any): any;
        hasOpening(module: any): any;
        _setOpenings(module: any): any;
        _addOpening(module: any): any;
        _removeOpening(module: any): any;
        forEachOpening(module: any, exports: any): any;
        updateFaces(module: any): any;
        _needSplit(module: any): any;
    }
    export const __wallType: any;
    export const __isLoadBearing: any;
    export const __contents: any;
    export const __openings: any;
    export const signalContentAdded: any;
    export const signalContentRemoved: any;
    export const signalCustomizedWallAttachedModelAdded: any;
    export const signalCustomizedWallAttachedModelRemoved: any;
    export const signalOpeningAdded: any;
    export const signalOpeningRemoved: any;
    export const _signalHookWainScot: any;
    export const outline: any;
    export const x: any;
    export const y: any;
    export const outerWallSide: any;
    export const width: any;
    export const height3d: any;
    export const leftFaces: any;
    export const rightFaces: any;
    export const topFaces: any;
    export const bottomFaces: any;
    export const frontFaces: any;
    export const backFaces: any;
    export const _disposed: any;
    export const z: any;
    export const u: any;
    export const v: any;
    export const w: any;
    export const contents: any;
    export const hasContent: any;
    export const openings: any;
}

declare module "44122" {
    export const name: any;
}

declare module "44292" {
    export const writable: any;
    export const initMetaManager: any;
}

declare module "44369" {
    export const SlabUtil: any;
    export const z: any;
    export const thickness: any;
    export const outerLoop: any;
    export const innerLoops: any;
    export const baseProfile: any;
    export const type: any;
    export const length: any;
    export const outer: any;
    export const oldId: any;
    export const addShells: any;
    export const slab: any;
    export const id: any;
    export const newFace: any;
    export const oldSlab: any;
    export const roomType: any;
    export const roomTypeDisplayName: any;
    export const masterId: any;
    export const bottom: any;
    export const topoKey: any;
    export const isAux: any;
    export const linkSlabInfo: any;
    export const mixpaint: any;
    export const mixPave: any;
    export const material: any;
    export const faceEntity: any;
}

declare module "44427" {
    export const RoomBuilderTxnState: any;
    // Original Name: n
    export class RoomBuilderTxnState extends import("72664").EntityTxnState {
        constructor(module: any, exports: any, ...args: any[]);
        postRestore(module: any, exports: any): any;
    }
}

declare module "44540" {
    export const SoftCloth: any;
    // Original Name: n
    export class SoftCloth extends import("50265").Content {
        constructor(module: any, exports: any, require: any, ...args: any[]);
    }
}

declare module "4464" {
    export const FgiParser: any;
    export const length: any;
    export const y: any;
    export const z: any;
    export const vertexPositions: any;
    export const vertexUVs: any;
    export const vertexNormals: any;
    export const faceIndices: any;
    export const seekId: any;
    export const normalTexture: any;
    export const type: any;
    export const modelComponent: any;
    export const modelJid: any;
    export const colorMode: any;
    export const jid: any;
    export const opacityMask: any;
    export const diffuseMapUvTransform: any;
    export const UVTransform: any;
    export const normalMapUvTransform: any;
    export const normalUVTransform: any;
    export const parentSeekId: any;
    export const parentJid: any;
    export const r: any;
    export const g: any;
    export const b: any;
    // Original Name: m
    export class FgiParser {
        constructor(module: any, ...args: any[]);
        parseFgiData(module: any): any;
        parse(): any;
        _fixClipBoxMesh(module: any, exports: any, require: any): any;
        _parse(module: any): any;
    }
    export const fgiData: any;
    export const context: any;
    export const err: any;
    export const bounding: any;
    export const position: any;
    export const localPosition: any;
    export const matrixWorld: any;
    export const x: any;
    export const clipInfo: any;
    export const clipBoxMesh: any;
    export const : any;
    export const const: any;
    export const this: any;
    export const matrixLocal: any;
    export const instancedArraysEnabled: any;
    export const Mesh: any;
    export const refPocketMaterial: any;
    export const contentType: any;
    export const roomArea: any;
    export const clipMeshes: any;
    export const uid: any;
    export const components: any;
    export const poseData: any;
    export const component: any;
    export const material: any;
    export const color: any;
    export const uv_override: any;
    export const pocketMaterial: any;
    export const customAttrs: any;
    export const pocketMaterialMap: any;
    export const instanceid: any;
    export const normaltexture: any;
    export const texture: any;
    export const entityId: any;
    export const ref: any;
    export const localpos: any;
    export const localrot: any;
    export const localscale: any;
    export const isDoor: any;
    export const pos: any;
    export const rot: any;
    export const scale: any;
    export const componentModifiers: any;
    export const break: any;
}

declare module "44681" {
    export const StructureFaceInfo: any;
    // Original Name: l
    export class StructureFaceInfo extends import("24616").FaceInfo {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        _getCurve(): any;
    }
    export const _rawFaceInfo: any;
    export const _loopInfo: any;
    export const curve: any;
}

declare module "44783" {
    export const LayerSketchUtil: any;
    // Original Name: a
    export class LayerSketchUtil {
        createLayerSketch2dData(module: any): any;
        constructor(...args: any[]);
    }
    export const HoleTopoTag: any;
}

declare module "44873" {
    export const cacheManager: any;
    export const _meshMap: any;
    export const _metaMap: any;
    export const _materialInfoMap: any;
}

declare module "45066" {
    export const Layout_IO: any;
    export const Layout: any;
    export const RegionLayoutItem: any;
    export const LayoutModelClassName: any;
    export const LayoutItem: any;
    export const StretchType: any;
    export const fix: any;
    export const expand: any;
    // Original Name: a
    export class LayoutItem {
        constructor(module: any, ...args: any[]);
        copyFrom(module: any): any;
        dump(module: any): any;
        load(module: any, exports: any): any;
        dumpDataToJSON(): any;
        loadDataFromJSON(): any;
        registerClass(module: any, exports: any): any;
        buildFromJSON(module: any, exports: any): any;
        buildItemFromJSON(): any;
    }
    export const _stretch: any;
    export const Class: any;
    export const stretch: any;
    export const constructorByClass: any;
    // Original Name: s
    export class RegionLayoutItem extends LayoutItem {
        constructor(module: any, exports: any, ...args: any[]);
        getClassName(): any;
        getGeometry(): any;
        onParentGeomChanged(module: any): any;
        clone(): any;
        copyFrom(module: any): any;
        dump(module: any): any;
        load(module: any, exports: any): any;
    }
    export const _region: any;
    export const region: any;
    // Original Name: l
    export class Layout extends LayoutItem {
        constructor(...args: any[]);
        copyFrom(module: any): any;
        traverse(module: any, exports: any): any;
        getGeometry(): any;
        getAllRegions(): any;
        getItemCount(): any;
        itemAt(module: any): any;
        insertRegion(module: any, exports: any, require: any): any;
        removeRegion(module: any): any;
        insertLayoutItem(module: any, exports: any): any;
        removeLayoutItem(module: any): any;
        getItemIndex(module: any): any;
        getRegionItem(module: any): any;
        getChildLayouts(): any;
        dump(module: any): any;
        load(module: any, exports: any): any;
    }
    export const _items: any;
    export const items: any;
    export const data: any;
}

declare module "45193" {
    export const exports: any;
}

declare module "4526" {
    export const Config: any;
}

declare module "45312" {
    export const Window_IO: any;
    export const Window: any;
    // Original Name: u
    export class Window_IO extends import("86866").Opening_IO {
        load(module: any, exports: any, require: any): any;
    }
    export const __indent: any;
    export const __thickness: any;
    // Original Name: g
    export class Window extends import("86866").Opening {
        constructor(module: any, exports: any, ...args: any[]);
        getWindowSills(): any;
        getWindowSill(): any;
        addSill(): any;
        removeSill(): any;
        canAddSill(): any;
        isShowSill(): any;
        getSillHeight(): any;
        createWindowSill(): any;
        getIndentVector(): any;
        getIndentVector3(): any;
        _setThickness(module: any): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        onPocketAdded(): any;
        onPocketRemoved(): any;
        onPocketSizeChanged(): any;
        onHostChanged(): any;
        getWindowSillSide(): any;
        buildPartsInfo(module: any, exports: any): any;
        getIO(): any;
    }
    export const topView: any;
    export const Resources: any;
    export const z: any;
    export const length: any;
    export const indent: any;
    export const thickness: any;
    export const _boundDirty: any;
    export const PI: any;
    export const partsInfo: any;
    export const parameters: any;
}

declare module "45381" {
    export const constructor: any;
    export const flags: any;
    export const exec: any;
    export const exports: any;
}

declare module "45406" {
    export const PExtruding: any;
    export const PExtruding_IO: any;
    export class d extends import("67997").PModel_IO {
        dump(module: any, exports: any): any;
        load(module: any, exports: any): any;
    }
    export const length: any;
    export const height: any;
    export const paths: any;
    export const __paths: any;
    export const __height: any;
    export class h extends import("67997").PModel {
        constructor(...args: any[]);
        create(module: any): any;
        defineValueProperties(): any;
        verify(): any;
        getIO(): any;
        update(module: any): any;
        isContentInRoom(module: any): any;
        isContentInLoop(module: any): any;
        refreshBoundInternal(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        getPaths(): any;
        getTopPaths(): any;
        forEachState(module: any): any;
        forEachPath(module: any): any;
        setDirection(module: any): any;
        _getPolygonBoundingBox3d(module: any): any;
    }
    export const localId: any;
    export const material: any;
    export const __value: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const minX: any;
    export const children: any;
    export const _direction: any;
    export const square: any;
    export const center: any;
    export const XSize: any;
    export const YSize: any;
    export const ZSize: any;
}

declare module "45424" {
    export const mergeObject: any;
}

declare module "45573" {
    export const exports: any;
}

declare module "45585" {
    export const RoomInfo: any;
    export const RoomInfoManager: any;
    export const min: any;
    export const max: any;
    export const length: any;
    export const y1: any;
    export const x1: any;
    export const x: any;
    export const y: any;
    export const value: any;
    export const PI: any;
    export class a {
        constructor(module: any, ...args: any[]);
    }
    export const Polygon: any;
    export const Edges: any;
    export const EdgesInfo: any;
    export const openings: any;
}

declare module "45793" {
    export const length: any;
    export const GuideLine2d: any;
    export const GuideLine2d_IO: any;
    // Original Name: c
    export class __start extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const ln: any;
    export const __end: any;
    // Original Name: d
    export class GuideLine2d extends import("24567").Entity {
        create(module: any, exports: any): any;
        _setStart(module: any): any;
        _setEnd(module: any): any;
        verify(): any;
        getIO(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
    }
    export const start: any;
    export const end: any;
}

declare module "45950" {
    export const CopyHelper: any;
    // Original Name: r
    export class CopyHelper {
        calcMatchingCoedgePath(module: any, exports: any, require: any): any;
        calcMatchingFace(module: any, exports: any, require: any): any;
        getMatchingFace(module: any, exports: any, require: any): any;
        getMatchingCoedge(module: any, exports: any): any;
        judgeSameFace(module: any, exports: any, require: any): any;
        pointInPTS(module: any, exports: any): any;
        getCoedgeByTag(module: any, exports: any): any;
        getFaceByTag(module: any, exports: any): any;
        getBrep2BrepMatrix(module: any, exports: any): any;
        getInstance(): any;
        constructor(...args: any[]);
    }
    export const tag: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const _instance: any;
}

declare module "45994" {
    export const exports: any;
}

declare module "46088" {
    export const length: any;
    export const Curve2d: any;
    export const Curve2d_IO: any;
    // Original Name: s
    export class Curve2d_IO extends import("24567").Entity_IO {
        instance(): any;
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const _Curve2d_IO_instance: any;
    export const isbackground: any;
    export const isbk: any;
    export const __isbackground: any;
    // Original Name: l
    export class Curve2d extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        toTHREECurve(): any;
        createSubCurve(module: any, exports: any): any;
        isBackground(): any;
        getIO(): any;
        getOuterWires(): any;
        getPolygons(): any;
        onChildDirty(module: any, exports: any): any;
        verify(): any;
        getArcPoints(module: any, exports: any): any;
    }
}

declare module "46129" {
    export const StateUtil: any;
    export class i {
        pathsToArrayStates(module: any): any;
        collectStates(module: any, exports: any, require: any): any;
        forEachState(module: any, exports: any): any;
        constructor(...args: any[]);
    }
    export const length: any;
}

declare module "46276" {
    export const ContentUtil: any;
    export const isNearToFloor: any;
    export const z: any;
    export const Class: any;
    export const NCPBackgroundWallUnit: any;
    export const contentType: any;
    export const parent: any;
    export const length: any;
    export const guests: any;
    export const forEachContent: any;
    export const excludedMembers: any;
    export const hiddenMembers: any;
    export const id: any;
    export const XLength: any;
    export const YLength: any;
    export const ZLength: any;
    export const parts: any;
    export const counterTop: any;
    export const contents: any;
    export const x: any;
    export const y: any;
    export const swing: any;
    export const PI: any;
    export const thickness: any;
    export const rotation: any;
    export const XScale: any;
    export const height3d: any;
    export const ZScale: any;
    export const sideB: any;
    export const wall: any;
    export const ID: any;
}

declare module "46368" {
    export const PavingOption: any;
    export const PavingPointTypeEnum: any;
    export const Default: any;
    export const DefaultNormal: any;
    export const UserDefined: any;
    // Original Name: r
    export class PavingOption {
        constructor(module: any, ...args: any[]);
        create(module: any): any;
        dump(): any;
        getArgs(): any;
        getPavingOptionForFGI(): any;
        clone(module: any): any;
        equals(module: any): any;
        _setFrom(module: any): any;
    }
    export const _type: any;
    export const _point: any;
    export const _rotation: any;
    export const type: any;
    export const point: any;
    export const rotation: any;
    export const _sliderOffsetX: any;
    export const _sliderOffsetY: any;
    export const _defaultOffsetX: any;
    export const _defaultOffsetY: any;
    export const x: any;
    export const y: any;
    export const defaultOffsetX: any;
    export const defaultOffsetY: any;
    export const sliderOffsetX: any;
    export const sliderOffsetY: any;
    export const DefaultOption: any;
}

declare module "46382" {
    export const Request: any;
    export const type: any;
    export const isCommitted: any;
    export const result: any;
    export const args: any;
    export const messages: any;
    export const signalComposed: any;
}

declare module "46385" {
    export const length: any;
    export const Slab_IO: any;
    export const SlabFaceType: any;
    export const Slab: any;
    export const top: any;
    export const bottom: any;
    export const side: any;
    // Original Name: h
    export class Slab_IO extends import("99338").Entity_IO {