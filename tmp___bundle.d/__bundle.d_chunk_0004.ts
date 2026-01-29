    export const ParametricModelArray: any;
    export const ParametricModelArray_IO: any;
    // Original Name: y
    export class ParametricModelArray_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const eId: any;
    // Original Name: C
    export class ParametricModelArray extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        initArray(module: any): any;
        dirtyGeometry(): any;
        getGraphicsData(): any;
        a: any;
        a: any;
        faces: any;
        forEach(): any;
    }
    export const topProjection: any;
    export const bottomProjection: any;
    export const frontProjection: any;
    export const lightBands: any;
    export const lightSlots: any;
    export const moldings: any;
    export const contents: any;
    export const signalArrayChanged: any;
    export const srcId: any;
    export const srcModel: any;
    export const splitPlane: any;
    export const matrixes: any;
    export const _graphicsData: any;
    export const meshKey: any;
    export const x: any;
    export const y: any;
    export const length: any;
    export const id: any;
    export const graphicsPath: any;
    export const unioned: any;
    export const xRay: any;
    export const const: any;
    export const parameters: any;
    export const pathCoedge3dsTags: any;
    export const lightBandId: any;
    export const lightSlotId: any;
    export const moldingId: any;
    export const uId: any;
    export const isSubpartArrayModel: any;
    export const splitPlanes: any;
}

declare module "28394" {
    export const exports: any;
}

declare module "28493" {
    export const exports: any;
}

declare module "28670" {
    export const cross: any;
    export const length: any;
    export const dot: any;
    export const normalize: any;
    export const add: any;
    export const subtract: any;
    export const sub: any;
}

declare module "28775" {
    export const NCParametricModelMaterialDataUtil: any;
    export const version: any;
    export const paveMethod: any;
    export const userDefined: any;
    export const tileSize_x: any;
    export const scaleX: any;
    export const tileSize_y: any;
    export const scaleY: any;
}

declare module "28808" {
    export const exports: any;
}

declare module "28816" {
    export const exports: any;
}

declare module "28925" {
    export const OutdoorDrawingSketch2dBuilder: any;
}

declare module "2918" {
    export const exports: any;
}

declare module "29190" {
    export const exports: any;
}

declare module "29249" {
    export const LogObject: any;
    export const Logger: any;
    export const LogLevelEnum: any;
}

declare module "29345" {
    export const StructureNode: any;
    // Original Name: n
    export class StructureNode extends import("92589").GenericNode {
        constructor(module: any, ...args: any[]);
    }
    export const childNodes: any;
    export const realNode: any;
}

declare module "29354" {
    export const length: any;
    export const CoEdge_IO: any;
    export const CoEdge: any;
    // Original Name: l
    export class CoEdge_IO extends import("99338").Entity_IO {
        load(module: any, exports: any, require: any, i: any): any;
    }
    export const __edge: any;
    export const __prev: any;
    export const __next: any;
    export const __partner: any;
    export const __reversed: any;
    // Original Name: c
    export class CoEdge extends import("99338").Entity {
        constructor(module: any, ...args: any[]);
        create(module: any, exports: any): any;
        createFromEdge(module: any): any;
        getPrev(): any;
        getNext(): any;
        getPartner(): any;
        getReversed(): any;
        _setEdge(module: any): any;
        _setPrev(module: any): any;
        _setNext(module: any): any;
        _setPartner(module: any): any;
        setLoop(module: any): any;
        getFrom(): any;
        getTo(): any;
        getIO(): any;
        verify(): any;
        validate(module: any): any;
        onAddedToParent(module: any): any;
        onRemovingFromParent(module: any, exports: any): any;
        onRemovedFromParent(module: any, exports: any): any;
        onChildDirty(module: any, exports: any): any;
    }
    export const to: any;
    export const from: any;
    export const z: any;
    export const reversed: any;
    export const coedge: any;
    export const partner: any;
    export const next: any;
    export const prev: any;
    export const edge: any;
}

declare module "29369" {
    export const Curve2d: any;
}

declare module "29391" {
    export const exports: any;
}

declare module "29461" {
    export const MigrateMixpaint: any;
    export const length: any;
    export const holes: any;
    export const mixpaint: any;
    export const faceEntity: any;
}

declare module "29594" {
    export const Cache: any;
    export const _meshDefCache: any;
    export const _objectCache: any;
    export const _entityId2ObjectKeys: any;
    export const _entityId2MeshKeys: any;
    export const _highResolutionMeshDefCache: any;
    export const _highResolutionObjectCache: any;
    export const _highResolutionEntityId2ObjectKeys: any;
    export const _highResolutionEntityId2MeshKeys: any;
    export const _option: any;
    export const size: any;
    export const length: any;
    export const entityId: any;
    export const mesh: any;
    export const clipMeshes: any;
}

declare module "29826" {
    export const AffineTransform: any;
    // Original Name: n
    export class AffineTransform {
        constructor(module: any, exports: any, require: any, i: any, n: any, r: any, ...args: any[]);
        isIdentity(): any;
        clone(): any;
        setTransform(module: any, exports: any, require: any, n: any, r: any, a: any): any;
        copyFrom(module: any): any;
        scale(module: any, exports: any): any;
        preScale(module: any, exports: any): any;
        translate(module: any, exports: any): any;
        preTranslate(module: any, exports: any): any;
        rotate(module: any, exports: any, require: any): any;
        preRotate(module: any, exports: any, require: any): any;
        shear(module: any, exports: any): any;
        preShear(module: any, exports: any): any;
        toString(): any;
        getScaleX(): any;
        getScaleY(): any;
        getTranslateX(): any;
        getTranslateY(): any;
        getShearX(): any;
        getShearY(): any;
        concatenate(module: any): any;
        preConcatenate(module: any): any;
        transform(module: any, exports: any, require: any, i: any, n: any): any;
        getDeterminant(): any;
        isInvertible(): any;
        createInverse(): any;
        getScaleInstance(module: any, exports: any): any;
        getTranslateInstance(module: any, exports: any): any;
        getShearInstance(module: any, exports: any): any;
        getRotateInstance(module: any, exports: any, require: any): any;
        setToScale(module: any, exports: any): any;
        setToTranslation(module: any, exports: any): any;
        setToShear(module: any, exports: any): any;
        setToRotation(module: any, exports: any, require: any): any;
        equals(module: any): any;
    }
    export const m00_: any;
    export const m11_: any;
    export const m10_: any;
    export const m01_: any;
    export const m02_: any;
    export const m12_: any;
}

declare module "29884" {
    export const length: any;
    export const Grid: any;
    export const Grid_IO: any;
    // Original Name: s
    export class Grid_IO extends import("24567").Entity_IO {
        instance(): any;
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const _Grid_IO_instance: any;
    export const freePatterns: any;
    export const _freePatternBlocks: any;
    // Original Name: l
    export class Grid extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        _setFreePatternBlocks(module: any): any;
        addFreePatternBlock(module: any): any;
        removeFreePatternBlock(module: any): any;
        hasGussetBlocks(): any;
        getIO(): any;
        isValid(): any;
        checkClonedResult(module: any): any;
    }
    export const _freePatterns: any;
    export const signalFreePatternBlockAdded: any;
    export const signalFreePatternBlockRemoved: any;
    export const freePatternBlocks: any;
    export const id: any;
}

declare module "30036" {
    export const keys: any;
    export const exports: any;
}

declare module "30239" {
    export const SweepPathRelation: any;
    export const SweepPathRelationHandlers: any;
    // Original Name: r
    export class SweepPathRelationHandlers {
        registerHandler(module: any, exports: any): any;
        getHandler(module: any): any;
        constructor(...args: any[]);
    }
    export const _handlers: any;
    export const _type: any;
    export const _data: any;
    export const _manager: any;
    export const Geometry: any;
}

declare module "30325" {
    export const exports: any;
}

declare module "30370" {
    export const JointComp: any;
    // Original Name: r
    export class JointComp extends import("43762").NodeComp {
        dump(): any;
        load(module: any, exports: any): any;
    }
    export const _referObject: any;
    export const Type: any;
}

declare module "30521" {
    export const exports: any;
}

declare module "30522" {
    export const EntityEventType: any;
    export const Geometry: any;
    export const Position: any;
    export const Material: any;
    export const Display: any;
    export const Preview: any;
    export const Clip: any;
}

declare module "30590" {
    export const DataRequest: any;
    // Original Name: n
    export class DataRequest extends import("46382").Request {
        constructor(module: any, exports: any, require: any, i: any, ...args: any[]);
        onCommit(): any;
        onUndo(): any;
        onRedo(): any;
    }
    export const _before: any;
    export const _after: any;
    export const _setter: any;
    export const _setterScope: any;
}

declare module "30599" {
    // Original Name: n
    export class default extends import("42288").default {
        _compute(module: any, exports: any, require: any, i: any): any;
    }
    export const y: any;
    export const position: any;
    export const ies: any;
    export const intensity: any;
    export const temperature: any;
    export const offset: any;
}

declare module "3068" {
    export const length: any;
    export const ConcealedWorkLightWire: any;
    export const ConcealedWorkLightWire_IO: any;
    // Original Name: s
    export class ConcealedWorkLightWire_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const nds: any;
    export const rte: any;
    export const route: any;
    export const nodeIds: any;
    // Original Name: l
    export class ConcealedWorkLightWire extends import("24567").Entity {
        constructor(...args: any[]);
        getIO(): any;
    }
}

declare module "30739" {
    export const startsWith: any;
    export const length: any;
}

declare module "30742" {
    export const length: any;
    export const prototype: any;
    export const constructor: any;
    export const exports: any;
}

declare module "30817" {
    export const SurfaceObj: any;
    export const getNormal: any;
    // Original Name: s
    export class SurfaceObj {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        getViewerMeshNorms(module: any, exports: any): any;
        create(module: any, exports: any, require: any, n: any): any;
        createByPlanePath(module: any): any;
        getNormal(module: any): any;
        getXAxis(): any;
        _discreteMeshs(module: any, exports: any): any;
        discreteMeshs(module: any, exports: any, require: any): any;
        getVector2(module: any): any;
        getVector3(module: any): any;
        getCurve2ds(module: any, exports: any): any;
        getCurve3ds(module: any): any;
        _getMatrixScale(): any;
        dump(): any;
        load(module: any): any;
    }
    export const _surface: any;
    export const _sameDirWithSurface: any;
    export const _matrix: any;
    export const minx: any;
    export const maxx: any;
    export const x: any;
    export const y: any;
    export const length: any;
    export const max: any;
    export const min: any;
    export const count: any;
    export const z: any;
}

declare module "30858" {
    export const exports: any;
}

declare module "30948" {
    export const CoEdge: any;
    export const getCoEdgeId: any;
    // Original Name: r
    export class CoEdge {
        constructor(module: any, ...args: any[]);
        clone(): any;
    }
    export const edgeId: any;
    export const isRev: any;
    export const topoName: any;
    export const curve: any;
}

declare module "31177" {
    export const ExtraordinaryEdge: any;
    // Original Name: r
    export class ExtraordinaryEdge extends import("71518").ExtraordinarySketchBase {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        setCurve(module: any): any;
        setCoedges(module: any): any;
        decodeTopoName(module: any): any;
    }
    export const _curve: any;
    export const topos: any;
    export const _coedges: any;
}

declare module "31192" {
    export const OBJConverter: any;
    // Original Name: n
    export class OBJConverter {
        brep2obj(module: any): any;
        getInstance(): any;
        constructor(...args: any[]);
    }
    export const _instance: any;
}

declare module "31238" {
    export const length: any;
    export const CustomSkyboxFillMode: any;
    export const SkyboxMappingType: any;
    export const SkyboxTypeEnum: any;
    export const Skybox_IO: any;
    export const Skybox: any;
    export const Default: any;
    export const Builtin: any;
    export const Custom: any;
    export const Color: any;
    export const Clamp: any;
    export const Repeat: any;
    export const ERP: any;
    export const CustomBox: any;
    // Original Name: u
    export class Skybox_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const rotation: any;
    export const intensity: any;
    export const name: any;
    export const bgColor: any;
    export const type: any;
    export const label: any;
    export const mappingType: any;
    export const fillMode: any;
    export const imageWidth: any;
    export const imageHeight: any;
    export const uvScale: any;
    export const localOffsetY: any;
    export const texelSize: any;
    export const __rotation: any;
    export const __intensity: any;
    export const __name: any;
    export const __type: any;
    export const __bgColor: any;
    export const __fillMode: any;
    export const __imageWidth: any;
    export const __imageHeight: any;
    export const __label: any;
    export const __uvScale: any;
    export const __localOffsetY: any;
    export const __texelSize: any;
    // Original Name: g
    export class Skybox extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        create(): any;
        destroy(): any;
        reset(): any;
        set(module: any): any;
        setEnabled(module: any): any;
        setImageSize(module: any, exports: any): any;
        getUVScale(): any;
        getUVOffset(): any;
        getIO(): any;
        verify(): any;
        getSkyboxColor3FromRGB255(module: any): any;
        getRenderParameters(module: any): any;
    }
    export const __enabled: any;
    export const __mappingType: any;
    export const __url: any;
    export const __indensity: any;
    export const __gridEnable: any;
    export const initialSet: any;
    export const signalEnabledChanged: any;
    export const _disposed: any;
    export const url: any;
    export const enabled: any;
    export const gridEnable: any;
    export const x: any;
    export const y: any;
}

declare module "31247" {
    export const ExtraordinaryCoedge: any;
    export const _isRev: any;
    export const _edge: any;
}

declare module "31331" {
    export const FloorplanStat: any;
}

declare module "31345" {
    export const WallUpdateV3: any;
    export const ZRotation: any;
    export const material: any;
    export const rotation: any;
    export const PI: any;
    export const point: any;
    export const sliderOffsetX: any;
    export const sliderOffsetY: any;
}

declare module "31462" {
    export const OpeningDecorator: any;
    export const _entity: any;
    export const doorStone: any;
    export const pocket: any;
    export const side: any;
    export const thickness: any;
    export const outerThickness: any;
    export const height: any;
    export const windowSill: any;
    export const extendValue: any;
    export const secondExtendValue: any;
    export const ZRotation: any;
    export const isOpened: any;
    export const isDefaultAlign: any;
    export const doorStoneMaterialEnabled: any;
    export const XScale: any;
    export const YScale: any;
    export const ZScale: any;
    export const swing: any;
    export const materialData: any;
    export const bottomFaceMaterial: any;
    export const mixpaint: any;
    export const mixPave: any;
    export const materialSeekId: any;
    export const materialRotataion: any;
    export const rotation: any;
    export const outerHeight: any;
    export const material: any;
    export const defaultPocketMaterialUrl: any;
}

declare module "31530" {
    export const MixpaintBuilder: any;
    // Original Name: a
    export class MixpaintBuilder extends import("81346").Sketch2dBuilder {
        constructor(module: any, ...args: any[]);
        createFace(module: any, exports: any): any;
        check(module: any, exports: any): any;
        changeBackground(module: any, exports: any): any;
    }
    export const background: any;
    export const faces: any;
}

declare module "31591" {
    export const INCParametricModelFGIMaterialData: any;
    export const NParametricOpeningFGIDecorator: any;
    export const NCPBkgWallBaseFGIDecorator: any;
    export const NCParametricModelFGIDecorator: any;
}

declare module "31643" {
    export const WallFaceAssemblyApi: any;
    export const _tol: any;
    export const associatedContents: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const left: any;
    export const length: any;
    export const type: any;
    export const ONEDGE: any;
    export const openingType: any;
    export const ParametricOpeningType: any;
}

declare module "32002" {
    export const GeometryFactory: any;
}

declare module "32111" {
    export const normalize: any;
    export const data: any;
    export const NATIVE: any;
    export const POLYFILL: any;
    export const exports: any;
}

declare module "32176" {
    export const length: any;
    export const SlabBuilder: any;
    export const SlabBuilder_IO: any;
    // Original Name: b
    export class SlabBuilder_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
        postLoad(module: any, exports: any): any;
    }
    export const fM: any;
    export const rDs: any;
    export const faceMap: any;
    export const material: any;
    export const mixpaint: any;
    // Original Name: T
    export class SlabBuilder extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        build(): any;
        buildCeilingFromSketch2d(module: any): any;
        buildFloorFromSketch2d(module: any): any;
        addOutdoorFace(module: any, exports: any, require: any, i: any): any;
        removeOutdoorFace(module: any): any;
        updateOutdoorFace(module: any, exports: any, require: any, i: any): any;
        prepareSlabOldInfos(): any;
    }
    export const _layer: any;
    export const roomRegionList: any;
    export const _slabRegionList: any;
    export const _roomPtRegions: any;
    export const _slabFaceToStructFaces: any;
    export const _structFaceToSlabFace: any;
    export const slabChangedFacesMap: any;
    export const _roomRegionDataList: any;
    export const rootLayer: any;
    export const type: any;
    export const id: any;
    export const floorSlabData: any;
    export const regions: any;
    export const autoRegions: any;
    export const _interiorWallRegions: any;
    export const _outWallRegions: any;
    export const _roomInfos: any;
    export const _slabInfos: any;
    export const _globalPtRegion: any;
    export const count: any;
    export const _faceObjs: any;
    export const edgeId: any;
    export const coEdge: any;
    export const index: any;
    export const pathIndex: any;
    export const groupIndex: any;
    export const originTopoKey: any;
    export const faceIds: any;
    export const size: any;
    export const structureId: any;
    export const linkWallIds: any;
    export const oldId: any;
    export const sourceId: any;
    export const roomInfo: any;
}

declare module "32218" {
    export const f: any;
}

declare module "32264" {
    export const exports: any;
}

declare module "32310" {
    export const lastIndex: any;
}

declare module "32441" {
    export const BackgroundPathUtil: any;
    export const curMixPaintFaceInfo: any;
    export const length: any;
    export const outer: any;
    export const holes: any;
}

declare module "32482" {
    export const WINDING_CW: any;
    export const WINDING_CCW: any;
    export const WINDING_UNKNOWN: any;
    export const iterator: any;
    export const ccw: any;
    export const normal: any;
    export const area: any;
    export const centroid: any;
    export const is_ccw: any;
    export const is_cw: any;
    export const winding: any;
    export const length: any;
    export const bounds: any;
    export const ensure_cw: any;
    export const ensure_ccw: any;
    export const triangulate: any;
    export const xMin: any;
    export const yMin: any;
    export const xMax: any;
    export const yMax: any;
    export const subtract: any;
    export const union: any;
    export const intersection: any;
    export const default: any;
}

declare module "32638" {
    export const NCustomizedParametricStairs: any;
    export const NCustomizedParametricStairs_IO: any;
    export const ParametricStairRotationDirectionEnum: any;
    export const ParametricStairHandrailSideEnum: any;
    export const ParametricStairTypeEnum: any;
    export const ParametricStairMaterialPartTypeEnum: any;
    export const ParametricStairPropertyTypeEnum: any;
    // Original Name: p
    export class NCustomizedParametricStairs_IO extends import("78283").NCustomizedParametricModel_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        exports: any;
    }
    export const parameters: any;
    export const roomHeight: any;
    export const propertytree: any;
    // Original Name: f
    export class NCustomizedParametricStairs extends import("78283").NCustomizedParametricModel {
        constructor(...args: any[]);
        initByMeta(module: any, exports: any, require: any): any;
        generatePropertyPanelDatas(module: any): any;
        getPropertyMap(): any;
        getFaceIdsByPartType(module: any): any;
        getPartMaterialMap(): any;
    }
    export const parametricMeta: any;
    export const stairsType: any;
    export const eId: any;
    export const __XScale: any;
    export const __YScale: any;
    export const __ZScale: any;
    export const tag: any;
    export const uuid: any;
    export const isStairs: any;
    export const xRay: any;
    export const length: any;
    export const x: any;
    export const y: any;
    export const outline: any;
    export const YSize: any;
    export const XSize: any;
    export const _boundDirty: any;
    export const material: any;
    export const _innerLightBandGraphicsData: any;
    export const documentId: any;
    export const z: any;
    export const outer: any;
    export const height: any;
}

declare module "32642" {
    export const NCustomizedBeamUtil: any;
    export const wall: any;
    export const structure: any;
    export const beam: any;
    export class f {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        getBeamFaceInfo(module: any, exports: any): any;
    }
    export const curves: any;
    export const plane: any;
    export const sameDirWithPlane: any;
    export const faceType: any;
    export const originLoop: any;
    export const results: any;
    export const holes: any;
    export const isAux: any;
    export const tag: any;
    export class m {
        constructor(module: any, exports: any, require: any, ...args: any[]);
    }
    export const _patchSurface: any;
    export const _curves: any;
    export const _reverse: any;
    // Original Name: y
    export class NCustomizedBeamUtil {
        constructor(module: any, ...args: any[]);
        build(): any;
        clearBeamHoles(module: any): any;
    }
    export const layer: any;
    export const walls: any;
    export const structures: any;
    export const beams: any;
    export const geoms: any;
    export const beamFaceGeomMp: any;
    export const wallStructureFaceMp: any;
    export const patchedBeamFaceMp: any;
    export const type: any;
    export const z: any;
    export const addShells: any;
    export const length: any;
    export const x: any;
    export const y: any;
    export const userData: any;
    export const faceMap: any;
    export const : any;
    export const id: any;
    export const const: any;
    export const return: any;
    export const ZSize: any;
    export const profile: any;
    export const top: any;
}

declare module "32994" {
    export const HalfPlane: any;
    // Original Name: a
    export class HalfPlane {
        createByLine2d(module: any): any;
        constructor(module: any, exports: any, ...args: any[]);
        distance(module: any): any;
        clone(): any;
        toLine2d(): any;
        offset(module: any): any;
        intersect(module: any): any;
        parallel(module: any, exports: any): any;
        cut(module: any, exports: any): any;
        dump(): any;
        load(module: any): any;
    }
    export const x: any;
    export const y: any;
    export const w: any;
    export const b: any;
}

declare module "33037" {
    export const PointUtil: any;
}

declare module "33046" {
    export const PSlidingDoorLeaf: any;
    export const PSlidingDoorLeafInterlaceTypeEnum: any;
    export class c extends import("69470").PAssembly {
        constructor(...args: any[]);
        create(module: any, exports: any): any;
        getMullionMetaData(): any;
        setMullionMetaData(module: any): any;
        getUpTransomMetaData(): any;
        setUpTransomMetaData(module: any): any;
        getMiddleTransomMetaData(): any;
        setMiddleTransomMetaData(module: any): any;
        getDownTransomMetaData(): any;
        setDownTransomMetaData(module: any): any;
        getDoorLeafBorderMaterialMetaData(): any;
        setDoorLeafBorderMaterialMetaData(module: any): any;
        getMostMetaByContentType(module: any): any;
        getLoftsMostMaterial(): any;
        setMaterial(module: any): any;
        setLoftMetas(module: any): any;
        updateLoftStatesFromMetas(module: any): any;
        updateMullionStatesFromMeta(module: any): any;
        updateUpTransomStatesFromMeta(module: any): any;
        updateDownTransomStatesFromMeta(module: any): any;
        updateMiddleTransomStatesFromMeta(module: any): any;
        getSegmentLofts(): any;
        getLoftsByContentType(module: any): any;
    }
    export const length: any;
    export const idsMap: any;
    export const metadata: any;
    export const count: any;
    export const material: any;
    export const doorLeafBorderMaterialMetaData: any;
    export const __value: any;
    export const contentType: any;
}

declare module "33082" {
    export const ExtraordinarySketch2d: any;
    export const id: any;
    export const curve: any;
    export const topos: any;
    export const edge: any;
    export const x: any;
    export const y: any;
    export const length: any;
}

declare module "33167" {
    export const MixPaint: any;
    // Original Name: a
    export class MixPaint extends import("99692").MixPaintV3 {
        constructor(module: any, exports: any, ...args: any[]);
        clone(): any;
        load(module: any, exports: any): any;
        loadMigrationData(module: any, exports: any): any;
        getUpdater(): any;
    }
}

declare module "33171" {
    export const OpeningFixer: any;
    // Original Name: c
    export class OpeningFixer {
        constructor(...args: any[]);
        fixOpenings(module: any): any;
        _fixPositionToWallCurve(module: any): any;
        _fixXSize(module: any): any;
        _fixPositionToWallPath(module: any): any;
        _fixOpeningProfile(module: any): any;
        _fixRotation(module: any): any;
        _fixSimilarOpenings(module: any): any;
        _editOpeningXSize(module: any, exports: any): any;
    }
    export const host: any;
    export const width: any;
    export const x: any;
    export const y: any;
    export const XSize: any;
    export const thickness: any;
    export const rotation: any;
    export const XScale: any;
    export const ins: any;
}

declare module "33307" {
    export const reduce: any;
}

declare module "33696" {
    export const CorniceTopoPather: any;
    export const CorniceHoleCutter: any;
    // Original Name: c
    export class CorniceHoleCutter {
        constructor(module: any, exports: any, require: any, i: any, ...args: any[]);
        getCorniceCutterInfo(module: any): any;
    }
    export const id: any;
    export const cutPath: any;
    export const replaceSweepCurves: any;
    export const offsetTop: any;
    // Original Name: d
    export class CorniceTopoPather extends import("19545").BaseTopoPather {
        constructor(module: any, exports: any, require: any, i: any, n: any, ...args: any[]);
        calcBaseSweepPath(module: any): any;
        cutBaseSweepPath(module: any, exports: any, require: any): any;
        calcFaceCeilingCurve(module: any): any;
        extractCuttingCandidates(module: any): any;
        l: any;
        FaceUtil: any;
        findCoplanarFaces(module: any): any;
        forEach(): any;
    }
    export const index: any;
    export const isAux: any;
    export const curve: any;
    export const z: any;
    export const length: any;
    export const const: any;
    export const : any;
    export const from: any;
    export const x: any;
    export const y: any;
    export const oldId: any;
    export const to: any;
}

declare module "33797" {
    export const writable: any;
    export const ExboolUtil: any;
    export const Collision: any;
}

declare module "34051" {
    export const ContinousHelper: any;
    export class r {
        constructor(module: any, ...args: any[]);
        getEdges(): any;
    }
    export const cface: any;
    // Original Name: a
    export class ContinousHelper {
        getContinousFaceWires(module: any): any;
        getSortedCoedge3dList(module: any, exports: any, require: any, i: any): any;
        getContinousFaceBounding(module: any): any;
        getContinousFaceArea(module: any): any;
        getInstance(): any;
        constructor(...args: any[]);
    }
    export const length: any;
    export const tag: any;
    export const _instance: any;
}

declare module "34192" {
    export const Context: any;
    export const _factory: any;
    export const configRegister: any;
    export const manager: any;
}

declare module "34225" {
    export const CabinetBase: any;
    // Original Name: s
    export class CabinetBase extends import("75312").BaseObject {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        onEntityDirty(module: any): any;
        updateMatrix(): any;
        updateRoomCustomAttrs(): any;
        _getRoomInfo(module: any): any;
        getHostRoom(module: any): any;
    }
    export const forEachChild: any;
    export const _matrixLocal: any;
}

declare module "34256" {
    export const CorniceTopoPatherV120: any;
    export const CorniceHoleCutter: any;
    // Original Name: c
    export class CorniceHoleCutter {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        getCorniceCutterInfo(module: any): any;
    }
    export const id: any;
    export const cutPath: any;
    export const replaceSweepCurves: any;
    export const offsetTop: any;
    // Original Name: d
    export class CorniceTopoPatherV120 extends import("19545").BaseTopoPather {
        constructor(module: any, exports: any, require: any, i: any, n: any, ...args: any[]);
        calcBaseSweepPath(module: any): any;
        cutBaseSweepPath(module: any, exports: any, require: any): any;
        calcFaceCeilingCurve(module: any): any;
        extractCuttingCandidates(module: any): any;
        r: any;
    }
    export const hostFace: any;
    export const index: any;
    export const isAux: any;
    export const z: any;
    export const type: any;
    export const BeamHole: any;
    export const length: any;
    export const oldId: any;
    export const to: any;
    export const from: any;
}

declare module "3442" {
    export const LightContentGroup: any;
    export const LightContent: any;
    // Original Name: i
    export class LightContent {
        constructor(e: any, t: any, ...args: any[]);
        contentType(): any;
        getContents(): any;
        getCategories(): any;
        getHost(): any;
        accept(e: any, t: any, i: any): any;
        getPosition(): any;
        getOutline(): any;
        getRotation(): any;
        getSize(): any;
        _calculateOutline(): any;
    }
    export const _contentType: any;
    export const _content: any;
    export const _position: any;
    export const _rotation: any;
    export const _size: any;
    export const _outline: any;
    export const metadata: any;
    export const _categories: any;
    export const rotation: any;
    export const _children: any;
}

declare module "34449" {
    export const NCustomizedPlatform: any;
    export const NCustomizedPlatform_IO: any;
    // Original Name: d
    export class NCustomizedPlatform_IO extends import("62229").NCustomizedSketchModel_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    // Original Name: h
    export class NCustomizedPlatform extends import("62229").NCustomizedSketchModel {
        constructor(module: any, exports: any, ...args: any[]);
        onSketchDirty(module: any): any;
        moveAttachedContents(module: any, exports: any): any;
        initializeContentPositionBySketch(): any;
        getSketchTransformMatrix(): any;
        generateBrep(module: any): any;
    }
    export const signalHook: any;
    export const host: any;
    export const height: any;
    export const z: any;
    export const x: any;
    export const y: any;
    export const XLength: any;
    export const YLength: any;
    export const ZLength: any;
    export const _breps: any;
    export const value: any;
    export const errorStr: any;
    export const breps: any;
    export const ZSize: any;
    export const convert3dMatrix: any;
}

declare module "34465" {
    export const resolve: any;
}

declare module "34701" {
    export const length: any;
    export const exports: any;
}

declare module "34724" {
    export const Curtain_IO: any;
    export const CurtainComponentEnum: any;
    export const Curtain: any;
    export const Side: any;
    export const Loop: any;
    export const Screen: any;
    export const Rail: any;
    export const RailTips: any;
    // Original Name: s
    export class Curtain_IO extends import("20551").Content_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const disabledComponents: any;
    // Original Name: l
    export class Curtain extends import("20551").Content {
        constructor(module: any, exports: any, ...args: any[]);
        destroy(): any;
        initByMeta(module: any): any;
        isComponentEnabled(module: any): any;
        disableComponentNumber(): any;
        disableComponent(module: any): any;
        enableComponent(module: any): any;
        getDisabledComponents(): any;
        getEnabledComponents(): any;
        getNormalizedComponentName(module: any): any;
        getComponentStorageKey(module: any): any;
        getComponentByStorageKey(module: any): any;
        getMaterial(module: any): any;
        setMaterial(module: any, exports: any): any;
        getMaterialList(): any;
        getIO(): any;
    }
    export const _disabledComponents: any;
    export const signalComponentDisabled: any;
    export const signalComponentEnabled: any;
    export const _disposed: any;
}

declare module "34732" {
    export const PAssemblyBody: any;
    export const length: any;
}

declare module "34769" {
    export const exports: any;
}

declare module "34877" {
    export const PointOnLineAssociation: any;
    // Original Name: r
    export class PointOnLineAssociation extends import("39646").AssociationBase {
        constructor(module: any, exports: any, ...args: any[]);
        compute(module: any): any;
        _wallVertexToLine(module: any): any;
        _extendWallToPoint(module: any, exports: any): any;
    }
    export const isSplitEdge: any;
    export const from: any;
    export const x: any;
    export const y: any;
    export const z: any;
}

declare module "34927" {
    export const length: any;
    export const CircleArc2d: any;
    export const CircleArc2d_IO: any;
    // Original Name: c
    export class CircleArc2d_IO extends import("46088").Curve2d_IO {
        instance(): any;
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const _CircleArc2d_IO_instance: any;
    export const start: any;
    export const end: any;
    export const center: any;
    export const radius: any;
    export const clockwise: any;
    export const __start: any;
    export const __end: any;
    export const __center: any;
    export const __radius: any;
    export const __clockwise: any;
    // Original Name: d
    export class CircleArc2d extends import("46088").Curve2d {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any, exports: any, require: any, i: any, n: any): any;
        toTHREECurve(): any;
        offset(module: any, exports: any): any;
        getTangent(module: any): any;
        getDiscretePoints(): any;
        createSubCurve(module: any, exports: any): any;
        _isPointInCurArc(module: any, exports: any): any;
        getArcPoints(module: any, exports: any): any;
        calSagitta(): any;
        updateCenterRadiusInfo(): any;
        _setStart(module: any): any;
        _setEnd(module: any): any;
        refreshBoundInternal(): any;
        verify(): any;
        getIO(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
    }
    export const __sagittaCache: any;
    export const y: any;
    export const x: any;
    export const from: any;
    export const id: any;
    export const sagittaCache: any;
}

declare module "3499" {
    export const length: any;
    export const PatternBlock: any;
    export const PatternBlock_IO: any;
    // Original Name: l
    export class PatternBlock_IO extends import("42395").MixBlock_IO {
        instance(): any;
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const _PatternBlock_IO_instance: any;
    export const key: any;
    export const localId: any;
    export const originalMaterial: any;
    export const _originalMaterial: any;
    export const offsetX: any;
    // Original Name: c
    export class PatternBlock extends import("42395").MixBlock {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any, exports: any): any;
        _setOriginalMaterial(module: any): any;
        getIO(): any;
        partOfGrid(): any;
        isPartOfExtPaint(): any;
        getOuterPoints(): any;
        assignFrom(module: any): any;
        setMaterial(module: any, exports: any): any;
        copyFrom(module: any): any;
        clone(): any;
        getPattern(): any;
        getMaterial(): any;
    }
    export const _key: any;
    export const _localId: any;
    export const __points: any;
    export const originPoints: any;
    export const __holes: any;
    export const metadata: any;
    export const parent: any;
    export const material: any;
    export const pavingOption: any;
}

declare module "34991" {
    export const syncLightGroup: any;
    export const getDefaultSunlightForTemplate: any;
    export const getTemplateV3Property: any;
    export const isAppliedTemplateV3: any;
    export const isTemplateV3: any;
    export const isAppliedEmptyTemplate: any;
    export const isEmptyTemplate: any;
    export const getLightInfo: any;
    export const length: any;
    export const multiplier: any;
    export const temperature: any;
    export const targetDir: any;
    export const intensity: any;
    export const contentID: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const content: any;
    export const isIntelligent: any;
    export const appliedName: any;
    export const metadata: any;
    export const members: any;
    export const ID: any;
    export const paths: any;
    export const bandIndex: any;
    export const eleId: any;
    export const IES: any;
    export const topView: any;
    export const XRotation: any;
    export const YRotation: any;
    export const ZRotation: any;
    export const affectSpecular: any;
    export const const: any;
    export const : any;
    export const type: any;
    export const PhysicalLight: any;
    export const group: any;
    export const hidden: any;
    export const contentType: any;
}

declare module "34996" {
    export const length: any;
    export const Waistline_IO: any;
    export const Waistline: any;
    // Original Name: c
    export class Waistline extends import("62888").Region {
        constructor(module: any, exports: any, ...args: any[]);
        createWaistline(module: any, exports: any, require: any, i: any): any;
        updateGeometry(): any;
        setBottomLinePaintPos(module: any): any;
        getBottomLineHeightOfPaintPos(module: any, exports: any): any;
        getUnCutBound(): any;
        getUnCutPolygon(): any;
        getIO(): any;
        clone(): any;
        bounding(): any;
        fitToLayout(module: any): any;
    }
    export const width: any;
    export const bottomLineHeight: any;
    export const __width: any;
    export const __bottomLineHeight: any;
    export const geomPolygons: any;
    export const y: any;
    export const DefaultWidth: any;
    // Original Name: d
    export class Waistline_IO extends import("62888").Region_IO {
        instance(): any;
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const _Waistline_IO_instance: any;
    export const thickness: any;
}

declare module "35141" {
    export const FaceVisibleRelation: any;
    export const _type: any;
    export const _data: any;
    export const _manager: any;
    export const Geometry: any;
}

declare module "35285" {
    export const CustomizedFeatureModelTxnState: any;
    // Original Name: r
    export class CustomizedFeatureModelTxnState extends import("99768").ContentTxnState {
        constructor(module: any, exports: any, ...args: any[]);
        postRestore(module: any, exports: any): any;
    }
}

declare module "35414" {
    export const GussetBlock: any;
    // Original Name: r
    export class GussetBlock extends import("68073").FreePatternBlock {
        constructor(module: any, exports: any, ...args: any[]);
        getThickness(module: any): any;
        getLocalCenter(): any;
        getMetaData(): any;
        create(module: any): any;
        copyFrom(module: any): any;
        clone(): any;
        getRelativeCenter(module: any, exports: any): any;
        setViewTransfrom(module: any, exports: any, require: any): any;
    }
    export const _viewTranslation: any;
    export const _viewRotation: any;
    export const _viewScale: any;
    export const x: any;
    export const y: any;
    export const pattern: any;
    export const points: any;
    export const originPoints: any;
    export const length: any;
    export const z: any;
}

declare module "35536" {
    export const ExboolUtil: any;
    export const start: any;
    export const end: any;
    export const line: any;
    export const arc: any;
    export const length: any;
    export const x: any;
    export const y: any;
    export const ctype: any;
    export const ptype: any;
    export const pt: any;
    export const curve: any;
}

declare module "35633" {
    export const stringify: any;
}

declare module "3565" {
    export const SlabUtil: any;
    export const length: any;
    export const roomLoop: any;
    export const z: any;
    export const thickness: any;
    export const baseProfile: any;
    export const height: any;
    export const bottom: any;
    export const splitFaces: any;
    export const isSplitFace: any;
    export const isSplitEdge: any;
    export const material: any;
    export const roomInfo: any;
    export const seekId: any;
    export const x: any;
    export const y: any;
}

declare module "35656" {
    export const ExtraordinaryCurve2d: any;
}

declare module "35665" {
    export const simplifyProfile: any;
    export const parseOpeningProfile: any;
    export const parse: any;
    export const length: any;
    export const currentPos: any;
}

declare module "35710" {
    export const hasIndices: any;
    export const global: any;
    export const ignoreCase: any;
    export const multiline: any;
    export const dotAll: any;
    export const unicode: any;
    export const unicodeSets: any;
    export const sticky: any;
    export const exports: any;