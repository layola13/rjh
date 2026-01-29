    export const normalTexture: any;
    export const normalTextureHigh: any;
    export const iconSmall: any;
    export const contentType: any;
    export const offset: any;
    export const metadata: any;
    export const contentTypeStr: any;
    export const x: any;
    export const rotation: any;
    export const y: any;
    export const XSize: any;
    export const YSize: any;
    export const host: any;
    export const type: any;
    export const length: any;
    export const z: any;
}

declare module "646235" {
    export const HSRender: any;
    export const exports: any;
}

declare module "64701" {
    export const MixPaint: any;
    // Original Name: n
    export class MixPaint {
        updatePaintData(module: any, exports: any, require: any, r: any): any;
        constructor(...args: any[]);
    }
    export const outer: any;
    export const x: any;
    export const y: any;
    export const width: any;
    export const height: any;
    export const paints: any;
    export const path: any;
    export const length: any;
    export const grid: any;
    export const rotation: any;
    export const sliderOffsetX: any;
    export const sliderOffsetY: any;
    export const alignType: any;
    export const type: any;
    export const parent: any;
    export const seekId: any;
    export const gridPolygons: any;
    export const polygons: any;
    export const percent: any;
    export const pavingOption: any;
    export const point: any;
    export const defaultOffsetX: any;
    export const defaultOffsetY: any;
    export const material: any;
    export const tileSize_x: any;
    export const tileSize_y: any;
    export const offsetX: any;
    export const offsetY: any;
    export const flipX: any;
    export const flipY: any;
    export const right: any;
    export const left: any;
    export const bottom: any;
    export const top: any;
    export const seamMaterial: any;
    export const curDir: any;
    export const preDir: any;
}

declare module "64741" {
    export const length: any;
    export const Mitre_IO: any;
    export const Mitre: any;
    // Original Name: c
    export class Mitre_IO extends import("8302").WallMolding_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const relatedFaceIds: any;
    // Original Name: d
    export class Mitre extends import("8302").WallMolding {
        constructor(module: any, exports: any, ...args: any[]);
        getIO(): any;
        clone(): any;
    }
    export const type: any;
    export const face1: any;
}

declare module "64758" {
    export const LightSlotSweepHelper: any;
    // Original Name: r
    export class LightSlotSweepHelper extends import("38096").SweepHelper {
        getLocalCoordinateBySweepPath(module: any, exports: any, require: any): any;
        getInstance(): any;
    }
    export const _lightslotInstance: any;
}

declare module "64926" {
    export const NCustomizedCeilingModel: any;
    export const NCustomizedCeilingModel_IO: any;
    // Original Name: s
    export class NCustomizedCeilingModel_IO extends import("62229").NCustomizedSketchModel_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    // Original Name: l
    export class NCustomizedCeilingModel extends import("62229").NCustomizedSketchModel {
        constructor(module: any, exports: any, ...args: any[]);
        onSketchDirty(module: any): any;
        moveAttachedContents(module: any, exports: any): any;
        initializeContentPositionBySketch(): any;
        getSketchTransformMatrix(): any;
        mirror(module: any): any;
        getIO(): any;
        getFaceProjectionPlane(module: any, exports: any): any;
    }
    export const z: any;
    export const x: any;
    export const y: any;
    export const XLength: any;
    export const YLength: any;
    export const ZLength: any;
    export const convert3dMatrix: any;
}

declare module "65076" {
    export const exports: any;
}

declare module "65122" {
    export const NCPBackgroundWallBaseDecorator: any;
    // Original Name: l
    export class NCPBackgroundWallBaseDecorator {
        constructor(module: any, ...args: any[]);
        dump(module: any): any;
        create(module: any, exports: any, require: any, i: any): any;
        setMaterial(module: any, exports: any): any;
        _getMaterialPropertyNodes(module: any): any;
        getMaterialInfoByVariableName(module: any): any;
        getFacesInfoByVariableName(module: any): any;
        getRecordSeekIdsByRecordData(module: any): any;
        getProperties(): any;
        _traversePropertyTree(module: any, exports: any): any;
        _mapToRecordObj(module: any): any;
        getXSizeLimit(): any;
    }
    export const _entity: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const isAutoFit: any;
    export const isScalable: any;
    export const targetFaceInfo: any;
    export const XRotation: any;
    export const YRotation: any;
    export const ZRotation: any;
    export const rotation: any;
    export const offsetX: any;
    export const offsetY: any;
    export const tileSize_x: any;
    export const tileSize_y: any;
    export const lockRatio: any;
    export const scaleX: any;
    export const scaleY: any;
    export const initTileSize_x: any;
    export const initTileSize_y: any;
    export const type: any;
    export const children: any;
    export const length: any;
    export const tag: any;
    export const value: any;
}

declare module "65144" {
    export const exports: any;
}

declare module "65238" {
    export const ExtrudedBody: any;
    // Original Name: a
    export class ExtrudedBody extends import("94331").ParametricModel {
        constructor(module: any, exports: any, require: any, i: any, ...args: any[]);
        onUpdate(): any;
        _getRoom(): any;
        _createGraphicsDataFromMeshes(module: any, exports: any, require: any, i: any, r: any, a: any): any;
    }
    export const originalPoints: any;
    export const points: any;
    export const length: any;
    export const normal: any;
    export const direction: any;
    export const elevation: any;
    export const _documentJSON: any;
    export const xRay: any;
    export const plane: any;
    export const paths: any;
    export const planeOption: any;
    export const customData: any;
    export const _meshes: any;
    export const diffuseMapUvTransform: any;
    export const normalMapUvTransform: any;
    export const type: any;
    export const entityId: any;
    export const roomType: any;
}

declare module "65280" {
    export const clonePoint2ds: any;
    export const isIPoint2dArrayArray: any;
    export const isIPoint2dArray: any;
    export const isIPoint2d: any;
    export const Point2d: any;
    // Original Name: r
    export class Point2d {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any): any;
        set(module: any, exports: any): any;
        getType(): any;
        assign(module: any): any;
        dump(): any;
        load(module: any): any;
        clone(): any;
    }
    export const x: any;
    export const y: any;
}

declare module "65406" {
    export const VrayLightExporter: any;
    export const VrayTypeNameEnum: any;
    export const getDefaultSunlightForTemplate: any;
    export const getTemplateV3Property: any;
    export const syncLightGroup: any;
    export const isAppliedEmptyTemplate: any;
    export const isEmptyTemplate: any;
    export const isAppliedTemplateV3: any;
    export const isTemplateV3: any;
    export const findRoomByCamera: any;
}

declare module "65426" {
    export const String: any;
    export const length: any;
}

declare module "65468" {
    export const exports: any;
}

declare module "65581" {
    export const DDBuilder: any;
    export const AngleType: any;
    export const AllLJoint: any;
    export const AllTJoint: any;
    export const NormalL: any;
    export const JointType: any;
    export const Null: any;
    export const DIYJoint: any;
    export const XMiter: any;
    export const LMiter: any;
    export const LUncross: any;
    export const LCross: any;
    export const TUncross: any;
    export const TCross: any;
    export const Tangent: any;
    export const Left: any;
    export const Right: any;
    export const In: any;
    export const Convex: any;
    export const NonConvex: any;
    // Original Name: h
    export class DDBuilder {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        build(module: any, exports: any, require: any): any;
        isConvex(module: any, exports: any, require: any): any;
        getMovePoint(module: any, exports: any, require: any, n: any, r: any): any;
        getMovePointLineLine(module: any, exports: any, require: any, n: any, a: any): any;
        getMovePointLineArc(module: any, exports: any, require: any, n: any, r: any): any;
        getMovePointArcArc(module: any, exports: any, require: any, n: any, r: any): any;
        makeGeometryInfo(module: any): any;
        updateGeoMetryInfoPrepare(module: any, exports: any, require: any): any;
        updateGeoMetryInfo_ApplyInfo(module: any, exports: any, require: any, i: any, n: any, r: any): any;
        _curveCheck(module: any, exports: any, require: any): any;
        updateGeometryInfoT(module: any, exports: any): any;
        updateGeometryInfo(module: any): any;
        updateGeometryInfo_LCross(module: any, exports: any, require: any, i: any, n: any, r: any): any;
        updateGeometryInfo_prepare(module: any): any;
        _genLCrossJoint(module: any): any;
        _genLUncrossJoint(module: any): any;
        _genLMiterJoint(module: any): any;
        _updateGeometryInfoX(module: any, exports: any): any;
        updateGeometryInfoCommon(module: any, require: any): any;
        check(module: any): any;
        genJointPath(module: any, exports: any, require: any): any;
        genWallGeometryPath(module: any): any;
        curveInter(module: any, exports: any, require: any): any;
        validityCheck(module: any): any;
        pointInsideOffsetRegion(module: any, exports: any, require: any, n: any): any;
        regCheck(module: any, exports: any, require: any, n: any): any;
        pointsSortByCurve(module: any, exports: any, require: any): any;
        curveInter2(module: any, exports: any): any;
        getEndpointDerUpright(module: any, exports: any): any;
        subGenJointInfo(module: any, exports: any, require: any, n: any): any;
        genJointInfo(module: any, exports: any, require: any, n: any, r: any): any;
        genJointPoint(module: any, exports: any, require: any, i: any, n: any): any;
    }
    export const limitRatio: any;
    export const angtol: any;
    export const lengthtol: any;
    export const type: any;
    export const fromPath: any;
    export const fl: any;
    export const fr: any;
    export const toPath: any;
    export const tl: any;
    export const tr: any;
    export const EN_ARC_2D: any;
    export const length: any;
    export const to: any;
    export const from: any;
    export const convex: any;
    export const max: any;
    export const min: any;
    export const EN_LINE_2D: any;
    export const width: any;
    export const y: any;
    export const x: any;
    export const inside: any;
    export const positionType: any;
}

declare module "65906" {
    export const length: any;
    export const Boundary: any;
    export const Boundary_IO: any;
    // Original Name: d
    export class Boundary_IO extends import("24567").Entity_IO {
        instance(): any;
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const _Boundary_IO_Instance: any;
    export const cornerType: any;
    export const boundaryType: any;
    export const width: any;
    export const wallPolygons: any;
    export const wallCorners: any;
    export const seekId: any;
    export const isBoundaryBrick: any;
    export const boundaryMaterial: any;
    export const cornerMaterial: any;
    export const __width: any;
    export const useColor: any;
    export const colorMode: any;
    // Original Name: h
    export class Boundary extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any, exports: any, require: any, i: any, n: any, r: any, a: any, s: any, l: any): any;
        getIO(): any;
        setSeamArgs(module: any): any;
        _setWallPolygons(module: any): any;
        _setWallCorners(module: any): any;
        isNoBoundaryTile(): any;
        transform(module: any): any;
        getPoints(): any;
        getWallPolygonsMaterial(): any;
        getWallCornersMaterial(): any;
        _calculateBoundaryPoints(module: any): any;
        update(module: any, exports: any): any;
        isValid(): any;
    }
    export const __wallPolygons: any;
    export const __wallCorners: any;
    export const needUpdate: any;
    export const wallPattern: any;
    export const cornerPattern: any;
    export const m00_: any;
    export const m01_: any;
    export const m10_: any;
    export const m11_: any;
    export const x: any;
    export const y: any;
    export const pattern: any;
    export const _suitableBoundaryWidth: any;
    export const CornerTileTypeEnum: any;
    export const BoundaryTypeEnum: any;
    export const __boundaryMaterial: any;
    export const __cornerMaterial: any;
    export const __wallPattern: any;
    export const __cornerPattern: any;
}

declare module "662105" {
    export const HSCatalog: any;
    export const exports: any;
}

declare module "66263" {
    export const Version: any;
    export const length: any;
}

declare module "66306" {
    export const CustomizedCeilingModel_IO: any;
    export const CustomizedCeilingModel: any;
    // Original Name: r
    export class CustomizedCeilingModel_IO extends import("10653").CustomizedFeatureModel_IO {
    }
    // Original Name: a
    export class CustomizedCeilingModel extends import("10653").CustomizedFeatureModel {
        constructor(module: any, exports: any, ...args: any[]);
        _getExtrudeDirection(): any;
        _getExtrudePlane(module: any): any;
        _getExtrudePaths(module: any, exports: any): any;
        _getUpdatedClockWise(module: any): any;
        getIO(): any;
        onSketchDirty(module: any): any;
        moveAttachedContents(module: any, exports: any): any;
    }
    export const z: any;
}

declare module "66315" {
}

declare module "66484" {
    export const f: any;
}

declare module "66547" {
    export const getOwnPropertyNames: any;
    export const f: any;
}

declare module "66605" {
    export const AssociationBase: any;
    export const Association: any;
    // Original Name: i
    export class AssociationBase {
        constructor(e: any, t: any, ...args: any[]);
        registerClass(e: any, t: any): any;
        getClassByType(e: any): any;
        bind(e: any): any;
        unbind(e: any): any;
        unbindAll(): any;
        clear(): any;
        generateId(): any;
        isValid(): any;
        dump(e: any): any;
        load(e: any, t: any, o: any): any;
        compute(e: any): any;
    }
    export const id: any;
    export const _entity: any;
    export const _targets: any;
    export const _Class: any;
    export const length: any;
}

declare module "66805" {
    export const ExtraordinaryWire: any;
    export const _coedges: any;
    export const face: any;
}

declare module "66896" {
    export const FloorplanStat: any;
    // Original Name: i
    export class FloorplanStat {
        instance(): any;
        constructor(...args: any[]);
    }
    export const dumpEndTime: any;
    export const dumpStringifyEndTime: any;
    export const openJsonParseEndTime: any;
    export const openLoadEntitiesEndTime: any;
    export const openPostProcessEndTime: any;
}

declare module "670669" {
    export const HSCore: any;
    export const exports: any;
}

declare module "67171" {
    export const exports: any;
}

declare module "67342" {
    export const GridUtil: any;
    export const Util: any;
    export const offsetX: any;
    export const length: any;
    export const pattern: any;
    export const textureURIDefault: any;
    export const textureURI: any;
    export const freePatternBlocks: any;
    export const localId: any;
    export const totalRotation: any;
    export const rotation: any;
    export const background: any;
    export const backgroundMaterial: any;
    export const x: any;
    export const y: any;
    export const from: any;
    export const to: any;
    export const lerp: any;
    export const close: any;
    export const type: any;
    export const threeCurve: any;
    export const Circle2d: any;
    export const Line2d: any;
    export const point: any;
    export const id: any;
    export const curveType: any;
    export const partner: any;
    export const discretePts: any;
    export const outerLoop: any;
    export const outer: any;
    export const innerLoops: any;
    export const holes: any;
    export const color: any;
    export const materials: any;
    export const seekId: any;
    export const parentgrid: any;
    export const polygons: any;
}

declare module "67457" {
    export const Wall: any;
    // Original Name: n
    export class Wall extends import("65238").ExtrudedBody {
        constructor(module: any, exports: any, require: any, i: any, ...args: any[]);
        onUpdate(): any;
        toGraphicsDataAsync(): any;
        toGraphicsData(): any;
    }
}

declare module "67629" {
    export const IDataProvider: any;
}

declare module "67711" {
    export const exports: any;
}

declare module "67889" {
    export const BaseObject: any;
    export const _dirty: any;
    export const eventHook: any;
    export const entity: any;
    export const context: any;
    export const geomMgr: any;
    export const manager: any;
}

declare module "67977" {
    export const exports: any;
}

declare module "67997" {
    export const PModel: any;
    export const PModelTypes: any;
    export const PModelValueProperties: any;
    export const PModel_IO: any;
    export class l extends import("24567").Entity_IO {
        dump(module: any, exports: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const length: any;
    export const seekId: any;
    export const localId: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const XRotation: any;
    export const YRotation: any;
    export const ZRotation: any;
    export const XAnimationCenter: any;
    export const YAnimationCenter: any;
    export const ZAnimationCenter: any;
    export const Axis: any;
    export const AnimationRotation: any;
    export const AnimationOffset: any;
    export const _host: any;
    export const host: any;
    export const material: any;
    export const __x: any;
    export const __y: any;
    export const __z: any;
    export const __XRotation: any;
    export const __YRotation: any;
    export const __ZRotation: any;
    export const __XAnimationCenter: any;
    export const __YAnimationCenter: any;
    export const __ZAnimationCenter: any;
    export const __Axis: any;
    export const __AnimationRotation: any;
    export const __AnimationOffset: any;
    export const __material: any;
    export class c extends import("24567").Entity {
        constructor(...args: any[]);
        defineValueProperties(): any;
        destroy(): any;
        assignTo(module: any): any;
        setMaterial(module: any, exports: any): any;
        getMaterial(): any;
        verify(): any;
        getIO(): any;
        refreshBoundInternal(): any;
        getHost(): any;
        setHost(module: any): any;
        update(): any;
        forEachState(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        flipSelf(): any;
        forEachMaterial(module: any, exports: any): any;
        replaceParent(module: any): any;
        canTransactField(): any;
    }
    export const type: any;
    export const _seekId: any;
    export const signalPositionChanged: any;
    export const signalMaterialChanged: any;
    export const signalGeometryChanged: any;
    export const outline: any;
    export const _disposed: any;
}

declare module "68073" {
    export const length: any;
    export const FreePatternBlock: any;
    export const FreePatternBlock_IO: any;
    // Original Name: s
    export class FreePatternBlock_IO extends import("3499").PatternBlock_IO {
        instance(): any;
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const _FreePatternBlock_IO_instance: any;
    export const rotationAngle: any;
    export const pattern: any;
    // Original Name: l
    export class FreePatternBlock extends import("3499").PatternBlock {
        constructor(module: any, exports: any, ...args: any[]);
        rotate(module: any, exports: any, require: any): any;
        getIO(): any;
        create(module: any): any;
        setMaterial(module: any, exports: any): any;
        getPattern(): any;
        copyFrom(module: any): any;
        clone(): any;
    }
    export const _rotation: any;
    export const rotation: any;
    export const points: any;
    export const originPoints: any;
    export const material: any;
    export const _originalMaterial: any;
    export const originalMaterial: any;
}

declare module "68123" {
    export const BeamRecordFace: any;
    export const SlabRecordFace: any;
    export const HoleRecordFace: any;
    export const StructureRecordFace: any;
    export const getRecordFaceFinalKey: any;
    export const RecordFace: any;
    export const loadRecordFace: any;
    export const Structure: any;
    export const Hole: any;
    export const Slab: any;
    export const Beam: any;
    // Original Name: a
    export class RecordFace {
        constructor(module: any, ...args: any[]);
        isStructure(): any;
        isHole(): any;
        isBeam(): any;
        isSlab(): any;
        copyFrom(module: any): any;
        dump(): any;
    }
    export const masterId: any;
    export const originKey: any;
    export const _extraKey: any;
    export const isAux: any;
    export const oK: any;
    export const eK: any;
    export const isA: any;
    // Original Name: l
    export class StructureRecordFace extends RecordFace {
        constructor(...args: any[]);
        getRecordType(): any;
        clone(): any;
        dump(): any;
        load(module: any): any;
    }
    export const linkStructureInfos: any;
    export const length: any;
    export const sInfos: any;
    // Original Name: c
    export class HoleRecordFace extends RecordFace {
        constructor(...args: any[]);
        getRecordType(): any;
        dump(): any;
        load(module: any): any;
    }
    export const type: any;
    export const observeCoEdgeTopoNameIds: any;
    export const isBottom: any;
    export const isB: any;
    export const oCTopoIds: any;
    // Original Name: d
    export class SlabRecordFace extends RecordFace {
        constructor(...args: any[]);
        getRecordType(): any;
        clone(): any;
        dump(): any;
        load(module: any): any;
    }
    // Original Name: h
    export class BeamRecordFace extends RecordFace {
        getRecordType(): any;
        load(module: any): any;
        clone(): any;
    }
}

declare module "6814" {
    export const MixPaintV2: any;
    export const MixPaintV2_IO: any;
    // Original Name: I
    export class MixPaintV2_IO extends import("24567").Entity_IO {
        instance(): any;
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
        migrateFaceGroupId(module: any): any;
    }
    export const _MixPaintV2_IO_instance: any;
    export const background: any;
    export const backgroundMaterial: any;
    export const faceEntity: any;
    export const faceId: any;
    export const faceGroupId: any;
    export const faceGroupBoundMap: any;
    export const useColor: any;
    export const colorMode: any;
    export const migrateEntitiesMap: any;
    export const faceEntityId: any;
    export const length: any;
    // Original Name: w
    export class MixPaintV2 extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        destroy(): any;
        setBackgroundData(module: any): any;
        getBackgroundOuter(): any;
        onFaceAddContent(module: any): any;
        onFaceRemoveContent(module: any): any;
        onFaceDirty(module: any): any;
        findWaterJetTiles(module: any, exports: any): any;
        createWaterJetTiles(module: any, exports: any, require: any): any;
        removeWaterJetTiles(): any;
        removeWaterJetTile(module: any): any;
        getGrids(): any;
        getGussetBlocks(): any;
        hasGussetBlocks(): any;
        updateGussetBlocks(module: any): any;
        getIO(): any;
        isRoot(): any;
        dispatchBuildCompleteSignal(module: any): any;
        createBuilder(): any;
        _createPolygonByPaint(module: any, exports: any): any;
        transform(module: any): any;
        _transformFaceGroupBoundMap(module: any): any;
    }
    export const _faceGroupId: any;
    export const _faceGroupBoundMap: any;
    export const _dataVersion: any;
    export const _background: any;
    export const _backgroundMaterial: any;
    export const _faceEntity: any;
    export const _faceId: any;
    export const signalPatternChanged: any;
    export const signalWaterjetTileAdded: any;
    export const signalWaterjetTileRemoved: any;
    export const signalBuildComplete: any;
    export const _signalHook: any;
    export const _disposed: any;
    export const _faceEntityId: any;
    export const id: any;
    export const polygons: any;
    export const data: any;
    export const content: any;
    export const radius: any;
    export const clockwise: any;
    export const curves: any;
    export const grid: any;
    export const paints: any;
    export const boundaries: any;
    export const parent: any;
    export const path: any;
    export const waistline: any;
    export const close: any;
    export const pattern: any;
    export const localId: any;
    export const originalMaterial: any;
    export const key: any;
    export const pavingOption: any;
    export const extMaterials: any;
    export const color: any;
    export const materials: any;
    export const x: any;
    export const y: any;
    export const from: any;
    export const to: any;
    export const seamMaterial: any;
    export const mixblock: any;
    export const center: any;
    export const material: any;
    export const type: any;
}

declare module "68320" {
    export const calcCoordinateSystem: any;
    export const getNewBufferGeometryWithUvTransform: any;
    export const getNewBufferGeometryWithUvTransformForBrick: any;
    export const getNewBufferGeometry: any;
    export const matBound: any;
    export const rotation: any;
    export const point: any;
    export const width: any;
    export const height: any;
    export const x: any;
    export const y: any;
    export const isSeam: any;
    export const uvDescription: any;
    export const uvTransform: any;
}

declare module "68396" {
    export const includes: any;
    export const length: any;
}

declare module "68469" {
    export const Curve_IO: any;
    export const Curve: any;
    // Original Name: i
    export class Curve_IO {
        instance(): any;
        dump(e: any, t: any, o: any, i: any): any;
        load(e: any, t: any, o: any, i: any): any;
        constructor(...args: any[]);
    }
    export const _instance: any;
    export const Class: any;
}

declare module "68614" {
    export const promise: any;
    export const resolve: any;
    export const reject: any;
    export const f: any;
}

declare module "68620" {
    export const NCPBkgWallBaseFGIDecorator: any;
    // Original Name: r
    export class NCPBkgWallBaseFGIDecorator extends import("7584").NCParametricModelFGIDecorator {
        constructor(module: any, ...args: any[]);
        getUvTransform(module: any, exports: any): any;
        getUvTransformV0(module: any, exports: any): any;
        _getUvTransformV0(module: any, exports: any): any;
    }
    export const _model: any;
    export const x: any;
    export const y: any;
}

declare module "68681" {
    export const NCPBackgroundWallSubpart: any;
    export const NCPBackgroundWallSubpart_IO: any;
    // Original Name: l
    export class NCPBackgroundWallSubpart_IO extends import("46973").NCPBackgroundWallBase_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const eId: any;
    // Original Name: c
    export class NCPBackgroundWallSubpart extends import("46973").NCPBackgroundWallBase {
        constructor(module: any, exports: any, ...args: any[]);
        getWallData(module: any, exports: any, require: any): any;
        initModelDocument(module: any, exports: any, require: any): any;
        getOpenDocumentExtra(module: any): any;
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
    export const wdh: any;
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

declare module "68801" {
    export const exports: any;
}

declare module "68910" {
    export const Seam: any;
    // Original Name: s
    export class Seam {
        constructor(module: any, ...args: any[]);
        create(module: any): any;
        dump(): any;
        getArgs(): any;
        clone(module: any): any;
        equals(module: any): any;
        hashKey(): any;
        getSeamForFGI(): any;
        imageSrc(): any;
        isEmpty(): any;
        _setFrom(module: any): any;
    }
    export const _material: any;
    export const _width: any;
    export const colorMode: any;
    export const width: any;
}

declare module "69161" {
    export const isLineSegment2dDumpData: any;
    export const isILineSegment2d: any;
    export const LineSegment2d: any;
    // Original Name: s
    export class LineSegment2d extends import("29369").Curve2d {
        getType(): any;
        constructor(module: any, exports: any, ...args: any[]);
        assign(module: any): any;
        set(module: any, exports: any): any;
        create(module: any): any;
        createFormPoints(module: any, exports: any): any;
        dump(): any;
        clone(): any;
        getDiscretePoints(module: any): any;
        getPoint(module: any): any;
        isSameCurve(module: any, exports: any): any;
        createSubCurve(module: any, exports: any): any;
        isPointOnCurve(module: any, exports: any): any;
        hLineIntersections(module: any): any;
    }
    export const start: any;
    export const end: any;
    export const x: any;
    export const y: any;
    export const gt: any;
    export const geoType: any;
}

declare module "69278" {
    export const lastIndex: any;
    export const exports: any;
}

declare module "69346" {
    export const length: any;
    export const WallBoardWaistLine: any;
    // Original Name: l
    export class WallBoardWaistLine extends import("8302").WallMolding {
        constructor(module: any, exports: any, ...args: any[]);
        clone(): any;
        getMetadataFilterKeys(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        doAutoFit(): any;
    }
    export const __offset: any;
    export const __autoFit: any;
    export const type: any;
}

declare module "69417" {
    export const length: any;
    export const MixSketch2d: any;
    export const MixSketch2d_IO: any;
    // Original Name: v
    export class MixSketch2d_IO extends import("24567").Entity_IO {
        instance(): any;
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const _MixSketch2d_IO_instance: any;
    export const c: any;
    export const guideLines: any;
    export const mixPave: any;
    export const id: any;
    export const seekId: any;
    export const backgroundMaterial: any;
    // Original Name: b
    export class MixSketch2d extends import("46583").Sketch2d {
        clearSketch(): any;
        getRegionIdBySketchId(module: any): any;
        getSketchIdByRegionId(module: any): any;
        constructor(module: any, exports: any, ...args: any[]);
        getIO(): any;
        refreshSketchByMixPave(module: any, exports: any): any;
        refreshBackgroundByMixPave(module: any, exports: any): any;
        refreshGuideLines(module: any, exports: any): any;
        clone(): any;
        createBuilder(): any;
        setBackgroundData(module: any, exports: any, require: any): any;
        updateBackgroundFlag(): any;
        isPointInBackground(module: any): any;
        getExistingCirclesFromClipPoints(module: any): any;
        mergeWithOtherSketch2d(module: any): any;
        addPaths(module: any, exports: any): any;
        addCirclePath(module: any, exports: any): any;
        addCurvesPath(module: any, exports: any): any;
        updateMixpaintAfterChangePoints(module: any): any;
        updateMixpaintAfterChangePolygon(module: any): any;
        removeCurves(module: any, exports: any): any;
        isSameBackground(module: any): any;
        updateBackgroundPolygon(module: any, exports: any): any;
        updateAfterChanges(module: any, exports: any): any;
        createBackground(module: any): any;
        getGeomPolygons(module: any): any;
        updateGeometryChanged(module: any): any;
        dirtyGeometry(): any;
        getFace2dById(module: any): any;
        createPolygon(module: any, exports: any): any;
        getAllCurves(): any;
        getAllPoints(): any;
    }
    export const idMap: any;
    export const background: any;
    export const _host: any;
    export const regions: any;
    export const independentRegions: any;
    export const _mixPave: any;
    export const faces: any;
    export const paints: any;
    export const path: any;
    export const material: any;
    export const outerLoop: any;
    export const innerLoops: any;
}

declare module "69448" {
    export const done: any;
    export const exports: any;
}

declare module "69470" {
    export const PAssembly: any;
    export const PAssemblyRotationEnum: any;
    export const PAssemblyViewTypeEnum: any;
    export const PAssembly_IO: any;
    export class PAssembly_IO extends _content__WEBPACK_IMPORTED_MODULE_23__.Content_IO {
        dump(e: any, t: any): any;
        load(e: any, t: any, o: any): any;
    }
    export const length: any;
    export const localId: any;
    export const material: any;
    export const states: any;
    export const constraints: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const XLength: any;
    export const YLength: any;
    export const ZLength: any;
    export const XRotation: any;
    export const YRotation: any;
    export const ZRotation: any;
    export const extendParameters: any;
    export const idMap: any;
    export const animations: any;
    export const snapPlaneMesh: any;
    export const __z: any;
    export const __material: any;
    export const __isOpened: any;
    export const __translation: any;
    export const __x: any;
    export const __y: any;
    export const __XLength: any;
    export const __YLength: any;
    export const __ZLength: any;
    export const invalidIds: any;
    export const _host: any;
    export const __XRotation: any;
    export const __YRotation: any;
    export const __ZRotation: any;
    export class PAssembly extends _content__WEBPACK_IMPORTED_MODULE_23__.Content {
        constructor(...args: any[]);
        destroy(): any;
        create(e: any, t: any): any;
        migrateContentMetaData(e: any): any;
        initByMeta(e: any, t: any, o: any): any;
        getMetadataFilterKeys(): any;
        createSnappingMesh(): any;
        setMaterial(e: any, t: any): any;
        getMaterial(): any;
        getPath(): any;
        updateChildren(e: any): any;
        getChild(e: any): any;
        updateStates(e: any): any;
        getStateById(e: any): any;
        hasState(e: any): any;
        verify(): any;
        getIO(): any;
        addConstraint(e: any): any;
        removeConstraint(e: any): any;
        getConstraintsByChildId(e: any, t: any): any;
        removeConstraintsByChildId(e: any): any;
        removeConstraintsByStateId(e: any): any;
        removeConstraintsByOutputStateId(e: any): any;
        addState(e: any): any;
        removeState(e: any): any;
        removeStatesByChildId(e: any): any;
        getStatesByChildId(e: any): any;
        forEachState(e: any, t: any): any;
        forEachConstraint(e: any, t: any): any;
        clone(): any;
        perfectClone(): any;
        getDumpContext(): any;
        updateStatesAndConstraintsID(): any;
        _findDefaultValues(e: any, t: any): any;
        refreshBoundInternal(): any;
        resize(e: any, t: any, o: any): any;
        updateDefaultValues(): any;
        assignTo(e: any): any;
        _resizeGussetDoor(e: any): any;
        onFieldChanged(e: any, t: any, o: any): any;
        setFlagOn(e: any, t: any): any;
        setFlagOff(e: any, t: any): any;
        _defineStateFields(): any;
        _init(e: any, t: any): any;
        addExtendParameters(e: any): any;
        _setDefaultValues(e: any): any;
        addStates(e: any): any;
        addSizeStatesForContrains(): any;
        updateStateForContrains(e: any): any;
        updateExtendParametersState(e: any, t: any, o: any): any;
        addConstraints(e: any): any;
        insertChildren(e: any): any;
        insertChild(e: any): any;
        insertChildByMeta(e: any): any;
        canAddContent(e: any): any;
        _buildConstraintList(e: any, t: any, o: any, i: any): any;
        isContentInRoom(e: any): any;
        isContentInLoop(e: any): any;
        transact(): any;
        compute(): any;
        forEachMaterial(e: any, t: any): any;
        moveAttachedContents(e: any, t: any, o: any, i: any): any;
        rotateAttachedContents(e: any, t: any): any;
        flipSelf(): any;
        getViewPaths(): any;
        getTopPAssembly(): any;
        getRelatedMetaDatas(): any;
        getLightBandData(): any;
        replaceParent(e: any): any;
        derivePassemblys(): any;
        canTransactField(): any;
    }
    export const signalMoldingChanged: any;
    export const _disposed: any;
    export const metadata: any;
    export const productType: any;
    export const PAssemblyPackage: any;
    export const thumbnail: any;
    export const images: any;
    export const contentType: any;
    export const productDataById: any;
    export const __value: any;
    export const snappingObj: any;
    export const YSize: any;
    export const Class: any;
    export const seekId: any;
    export const contents: any;
    export const value: any;
    export const forEachState: any;
    export const l: any;
    export const id: any;
    export const inputs: any;
    export const outputs: any;
    export const _preDefaultValues: any;
    export const hidden: any;
    export const defaultValues: any;
    export const children: any;
    export const type: any;
    export const userFreeData: any;
    export const parameters: any;
    export const content: any;
    export const resource: any;
    export const unit: any;
    export const childrenData: any;
    export const rotation: any;
}

declare module "6954" {
    export const ExIdGenerator: any;
    // Original Name: o
    export class ExIdGenerator {
        generateId(e: any): any;
        getInstance(): any;
        constructor(...args: any[]);
    }
    export const _instance: any;
    export const _idGenerators: any;
}

declare module "69623" {
    export const PAssemblyPath: any;
    export const length: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const _content: any;
    export const opening: any;
    export const XLength: any;
    export const YLength: any;
    export const metadata: any;
    export const localId: any;
    export const ZRotation: any;
    export const break: any;
    export const PI: any;
}

declare module "69650" {
    export const exports: any;
}

declare module "69712" {
    export const PSegmentLoft: any;
    // Original Name: a
    export class PSegmentLoft extends import("79579").PModel {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        onUpdate(): any;
    }
    export const _webCadDocument: any;
    export const originalPaths: any;
    export const snappingFaceKeys: any;
    export const _cache: any;
}

declare module "69747" {
    export const OutdoorDrawingSketch2dBuilder: any;
    // Original Name: s
    export class OutdoorDrawingSketch2dBuilder extends import("77756").ExtraordinarySketch2dBuilder {
        constructor(module: any, ...args: any[]);
        _initByOuterDoorLayer(module: any): any;
        updateAppendix(module: any): any;
        _getPreBuildFaceRegions(module: any): any;
        _filterValidFaces(): any;
        _removeFacesWithBkg(): any;
        _isToposValid(module: any): any;
        _isToposDrawFace(module: any): any;
        _createSuperLargeBackground(): any;
    }
    export const _layer: any;
    export const slabSketch2dGuildLines: any;
    export const length: any;
    export const _sketch2d: any;
    export const faces: any;
    export const FaceTopoTag: any;
    export const DrawFaceTopoTag: any;
}

declare module "69749" {
    export const ContentInRoomRelation: any;
    export class r {
        constructor(module: any, ...args: any[]);
        getValue(module: any, exports: any): any;
        calcNewTarget(module: any, exports: any, require: any): any;
    }
    export const _stepDistance: any;
    export const _type: any;
    export const _optionStep: any;
    export const _data: any;
    export const _manager: any;
    export const _calculator: any;
    export const Geometry: any;
}

declare module "6975" {
    export const stopped: any;
    export const result: any;
    export const exports: any;
}

declare module "69829" {
    export const Unit: any;
}

declare module "70168" {
    export const protocol: any;
    export const onmessage: any;
    export const addEventListener: any;
    export const exports: any;
}

declare module "70190" {
    export const length: any;
    export const Ceiling_IO: any;
    export const Ceiling: any;
    // Original Name: d
    export class Ceiling_IO extends import("17808").Face_IO {
        load(module: any, exports: any, require: any, i: any): any;
    }
    export const __divideInfo: any;
    export const __offsetHeight3D: any;
    export const isSplitCeiling: any;
    // Original Name: h
    export class Ceiling extends import("17808").Face {
        constructor(module: any, ...args: any[]);
        getIO(): any;
        forEachSurface(module: any, exports: any): any;
    }
    export const signalContentAdded: any;
    export const signalContentRemoved: any;
}

declare module "7031" {
    export const GeometryUtil: any;
    export const arcInfo: any;
    export const length: any;
    export const arcPaths: any;
}

declare module "70465" {
    export const FaceDwgUtil: any;
    export const length: any;
    export const structureMode: any;
    export const independent: any;
}

declare module "70498" {
    export const BatchRequest: any;
    // Original Name: n
    export class BatchRequest extends import("46382").Request {
        constructor(module: any, ...args: any[]);
        getActiveRequest(): any;
        onCommit(): any;
        onUndo(): any;
        onRedo(): any;
        getComposeSpec(): any;
        onCompose(module: any, exports: any): any;
        filterRequests(module: any): any;
    }
    export const _subRequests: any;
    export const length: any;
    export const _activeRequest: any;
    export const type: any;
}

declare module "70537" {
    export const next: any;
    export const return: any;
    export const done: any;
    export const exports: any;
    export const iterator: any;
    export const type: any;
    export const nextHandler: any;
    export const counter: any;
    export const prototype: any;
}

declare module "70546" {
    export const head: any;
    export const tail: any;
    export const prototype: any;
    export const next: any;
    export const exports: any;
}

declare module "70598" {
    export const exports: any;
}

declare module "70665" {
    export const CabinetMoldingEnum: any;
    export const CustomizedCabinetComponentEnum: any;
    export const CustomizedCabinetHandleOrientation: any;
    export const CustomizedCabinetPartEnum: any;
    export const CustomizedCabinetSurfaceTypeEnum: any;
}

declare module "70759" {
    export const length: any;
    export const PointLight_IO: any;
    export const PointLight: any;
    // Original Name: s
    export class PointLight_IO extends import("3577").Light_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const radius: any;
    export const __radius: any;
    export const __XSize: any;
    export const __YSize: any;
    // Original Name: l
    export class PointLight extends import("3577").Light {
        constructor(module: any, exports: any, ...args: any[]);
        create(): any;
        reset(): any;
        getIO(): any;
        refreshBoundInternal(): any;
        getRenderParameters(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
    }
    export const type: any;
    export const YSize: any;
    export const XSize: any;
    export const ZSize: any;
    export const x: any;
    export const y: any;
    export const temperature: any;
    export const intensity: any;
    export const z: any;
    export const rgb: any;
    export const affectSpecular: any;
    export const close: any;
    export const sourceContentType: any;
}

declare module "70804" {
    export const ProfileUtil: any;
    export const x: any;
    export const y: any;
}

declare module "70947" {
    export const FloorUtil: any;
    export const length: any;
    export const id: any;
}

declare module "71009" {
    export const LightSlotBrepnameHelper: any;
    // Original Name: r
    export class LightSlotBrepnameHelper {
        reconstructBrepNames(module: any, exports: any): any;
        getCurveSweepFaces(module: any, exports: any): any;
        toponameFaces(module: any, exports: any): any;
        toponameEdges(module: any, exports: any): any;
        calcEdgeTopoName(module: any, exports: any, require: any): any;
        toponameCoEdges(module: any): any;
        get5PtIn3D(module: any): any;
        getInstance(): any;
        constructor(...args: any[]);
        checkTopoName(module: any): any;
    }
    export const topoNameCaches: any;
    export const length: any;
    export const tag: any;
    export const userData: any;
    export const id: any;
    export const topoed: any;
    export const lightslotpath: any;
    export const startPointId: any;
    export const _instance: any;
}

declare module "71077" {
    export const length: any;
    export const DOpening: any;
    export const DOpening_IO: any;
    export const top: any;
    export const bottom: any;
    export const side: any;
    // Original Name: _
    export class DOpening_IO extends import("16481").DAssembly_IO {