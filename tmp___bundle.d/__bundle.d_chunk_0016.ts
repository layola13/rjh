        copyFrom(module: any): any;
        isValid(): any;
        load(module: any, exports: any): any;
        dump(): any;
    }
    export const _faceEntity: any;
    export const _faceId: any;
    export const id: any;
    export const migrateEntitiesMap: any;
    export const faceEntity: any;
}

declare module "88861" {
    export const NCustomizedDwgUtil: any;
}

declare module "88874" {
    export const BayWindow: any;
    // Original Name: l
    export class BayWindow extends import("77889").CornerWindow {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any): any;
        buildPartsInfo(module: any, exports: any): any;
        _adjustAttachedContents(module: any, exports: any): any;
        isValidHost(module: any): any;
        addOpenings(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        if(: any): any;
    }
    export const partsInfo: any;
    export const showPocket: any;
    export const sideB: any;
    export const x: any;
    export const y: any;
    export const A: any;
    export const PI: any;
    export const sideA: any;
    export const sideC: any;
    export const C: any;
    export const B: any;
    export const Sill: any;
    export const SillConcret: any;
    export const Ceiling: any;
    export const elevation: any;
    export const z: any;
    export const Pocket: any;
    export const openingB: any;
    export const boundings: any;
    export const parameters: any;
    export const hideFaceKeys: any;
    export const _boundDirty: any;
    export const __ZLength: any;
    export const __XLength: any;
    export const __YLength: any;
    export const const: any;
    export const : any;
    export const __ZRotation: any;
    export const outPath: any;
    export const innerPath: any;
    export const isWall: any;
    export const middle1Path: any;
    export const middle2Path: any;
    export const wallA: any;
    export const wallD: any;
}

declare module "88992" {
    export const TopoName: any;
    // Original Name: o
    export class TopoName {
        constructor(e: any, t: any, o: any, i: any, n: any, ...args: any[]);
        clone(): any;
        dump(): any;
        load(e: any): any;
    }
    export const sourceId: any;
    export const _type: any;
    export const _index: any;
    export const _sourceIndex: any;
    export const _isSameDirection: any;
}

declare module "89012" {
    export const length: any;
    export const AttenuatedSpotLight_IO: any;
    export const AttenuatedSpotLight: any;
    // Original Name: l
    export class AttenuatedSpotLight_IO extends import("75089").SpotLight_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const IES: any;
    export const nearAttenuationStart: any;
    export const nearAttenuationEnd: any;
    export const farAttenuationStart: any;
    export const farAttenuationEnd: any;
    export const hotspotAngle: any;
    export const falloffAngle: any;
    export const __IES: any;
    // Original Name: c
    export class AttenuatedSpotLight extends import("75089").SpotLight {
        constructor(module: any, exports: any, ...args: any[]);
        create(): any;
        reset(): any;
        getIO(): any;
        getRenderParameters(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
    }
    export const type: any;
    export const RangeMin: any;
    export const RangeMax: any;
    export const DefaultNearStart: any;
    export const DefaultNearEnd: any;
    export const DefaultFarStart: any;
    export const DefaultFarEnd: any;
    export const AngleMin: any;
    export const AngleMax: any;
    export const DefaultHotspot: any;
    export const DefaultFallOff: any;
}

declare module "89090" {
    export const includes: any;
    export const length: any;
}

declare module "89497" {
    export const Background: any;
    // Original Name: c
    export class Background {
        constructor(...args: any[]);
        assign(module: any): any;
        copyFrom(module: any): any;
        clone(): any;
        equals(module: any): any;
        isSameBackground(module: any, exports: any): any;
        setFromPoints(module: any, exports: any): any;
        setFromDiscretePolygon2d(module: any, exports: any): any;
        setFromDiscretePolygon2dArray(module: any, exports: any): any;
        setFromPolygon2dDataArray(module: any): any;
        setFromPolygon2d(module: any): any;
        setFromData(module: any): any;
        toDiscretePolygons(): any;
        getFirstPolygonOuter(): any;
        isPointInside(module: any): any;
        isPointOnOutline(module: any, exports: any): any;
        migrate(module: any): any;
        load(module: any): any;
        flipY(): any;
        getMatrixFlipY(): any;
        getDoubleMiddleY(): any;
        dump(): any;
        transform(module: any): any;
        clear(): any;
        verify(): any;
    }
    export const regions: any;
    export const length: any;
    export const type: any;
    export const ClassName: any;
}

declare module "89527" {
    export const NCParametricModelMaterialUtil: any;
    export const realSize_x: any;
    export const realSize_y: any;
    export const tileSize_x: any;
    export const tileSize_y: any;
}

declare module "89675" {
    export const exports: any;
}

declare module "89724" {
    export const DataModelConvertor: any;
    // Original Name: h
    export class DataModelConvertor {
        constructor(...args: any[]);
        convertPoint2d(module: any): any;
        convertLine2d(module: any, exports: any): any;
        convertCircle2d(module: any, exports: any): any;
        convertArc2d(module: any, exports: any): any;
        convertWire(module: any): any;
        else: any;
        for(let: any, module: any, exports: any, module: any, : any, l: any, exports: any): any;
    }
    export const start: any;
    export const end: any;
    export const left: any;
    export const top: any;
}

declare module "8985" {
    export const delete: any;
    export const has: any;
    export const get: any;
    export const set: any;
    export const frozen: any;
}

declare module "899" {
    export const exports: any;
}

declare module "89920" {
    export const PointOnLineAssociation: any;
    // Original Name: r
    export class PointOnLineAssociation extends import("66605").AssociationBase {
        constructor(module: any, exports: any, ...args: any[]);
        compute(module: any): any;
        _wallVertexToLine(module: any): any;
    }
    export const isSplitEdge: any;
    export const from: any;
    export const x: any;
    export const y: any;
    export const z: any;
}

declare module "89998" {
    export const length: any;
    export const SoftCloth_IO: any;
    export const SoftCloth: any;
    // Original Name: c
    export class SoftCloth_IO extends import("20551").Content_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const simulatedContent: any;
    export const simulatedMeta: any;
    export const isSimulated: any;
    // Original Name: h
    export class SoftCloth extends import("20551").Content {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any): any;
        _setFieldValue(module: any, exports: any): any;
        _fieldValueEquals(module: any, exports: any): any;
        restoreSoftCloth(): any;
        resizeRestoreSimulatedSoftCloth(): any;
        setSimulationContent(module: any): any;
        updateSimulationMeta(): any;
        getRelatedMetaDatas(): any;
        moveAlongAxis(module: any, exports: any): any;
        rotateAround(module: any, exports: any): any;
        getIO(): any;
        destroy(): any;
    }
    export const hard: any;
    export const signalSimulatedContentChanged: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const XScale: any;
    export const YScale: any;
    export const ZScale: any;
    export const XRotation: any;
    export const YRotation: any;
    export const ZRotation: any;
    export const XLength: any;
    export const YLength: any;
    export const ZLength: any;
    export const jid: any;
    export const model3d: any;
    export const modelPosUrl: any;
    export const _disposed: any;
}

declare module "90223" {
    export const exports: any;
}

declare module "90241" {
    export const ConcealedWorkTubeTree: any;
    // Original Name: r
    export class ConcealedWorkTubeTree extends import("75312").BaseObject {
        onInit(): any;
        onChildAdded(module: any): any;
        _hasJunctionBox(module: any): any;
    }
}

declare module "90252" {
    // Original Name: n
    export class default extends import("42288").default {
        _compute(module: any, exports: any, require: any, i: any): any;
    }
    export const x: any;
    export const PI: any;
}

declare module "90279" {
    export const Sketch2dUtil: any;
    export const type: any;
    export const length: any;
    export const x: any;
    export const y: any;
    export const pointTypes: any;
    export const snapToLinePointTypes: any;
}

declare module "90413" {
    export const PContent: any;
    export const PContent_IO: any;
    export class h extends import("67997").PModel_IO {
        dump(module: any, exports: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const length: any;
    export const XLength: any;
    export const YLength: any;
    export const ZLength: any;
    export const layoutInfo: any;
    export const content: any;
    export const __XLength: any;
    export const __YLength: any;
    export const __ZLength: any;
    export const _content: any;
    export class u extends import("67997").PModel {
        constructor(...args: any[]);
        getHost(): any;
        create(module: any): any;
        getContent(): any;
        getMaterial(): any;
        setMaterial(module: any): any;
        setContent(module: any): any;
        verify(): any;
        getIO(): any;
        update(module: any): any;
        addContent(): any;
        removeContent(module: any): any;
        refreshBoundInternal(): any;
        modelBoundLine(module: any): any;
        resize(module: any, exports: any, require: any): any;
        forEachContent(module: any, exports: any): any;
        isContentValid(): any;
        isContentInRoom(module: any): any;
        isContentInLoop(module: any): any;
        updateContent(module: any): any;
        computeContent(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        flipSelf(): any;
        setFlagOn(module: any, exports: any): any;
        setFlagOff(module: any, exports: any): any;
    }
    export const localId: any;
    export const __value: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const XRotation: any;
    export const YRotation: any;
    export const ZRotation: any;
    export const Axis: any;
    export const material: any;
    export const needClip: any;
    export const logger: any;
    export const userFreeData: any;
    export const productType: any;
    export const PAssembly: any;
    export const AnimationRotation: any;
    export const contentType: any;
    export const XScale: any;
    export const YScale: any;
    export const ZScale: any;
}

declare module "90550" {
    export const LightBandBrepnameHelper: any;
    // Original Name: n
    export class LightBandBrepnameHelper {
        reconstructBrepNames(module: any, exports: any): any;
        getCurveSweepFaces(module: any, exports: any): any;
        toponameFaces(module: any, exports: any): any;
        getInstance(): any;
        constructor(...args: any[]);
        checkTopoName(module: any): any;
    }
    export const topoNameCaches: any;
    export const userData: any;
    export const id: any;
    export const tag: any;
    export const _instance: any;
}

declare module "90687" {
    export const Clipper3D: any;
    export const union: any;
    export const intersect: any;
    export const difference: any;
    export const xor: any;
    export const split: any;
    export const Union: any;
    export const Inter: any;
    export const Diff: any;
    // Original Name: d
    export class Clipper3D {
        _log(module: any, exports: any, require: any, i: any, n: any): any;
        clip2(module: any, exports: any, require: any, n: any): any;
        clipDiff(module: any, exports: any, require: any): any;
        _fixMapping2(module: any, exports: any): any;
        _fixMapping(module: any, exports: any, require: any): any;
        clipInter(module: any, exports: any, require: any): any;
        _logWhenValid(module: any, exports: any, require: any, i: any): any;
        clipUnion(module: any, exports: any, require: any): any;
        clipXor(module: any, exports: any, require: any): any;
        _getNewMap(module: any, exports: any, require: any, i: any): any;
        _mergeMap(module: any, exports: any): any;
        constructor(...args: any[]);
    }
    export const length: any;
    export const ret: any;
    export const array: any;
}

declare module "90762" {
    export const length: any;
    export const exports: any;
}

declare module "9087" {
    export const exports: any;
}

declare module "91006" {
}

declare module "91131" {
    export const ExtraordinarySketchBase: any;
    export const ExtraordinaryBackground: any;
    export const ExtraordinaryGuideline: any;
    export const ExtraordinaryFace2d: any;
    export const ExtraordinarySketch2dBuilder: any;
    export const ExtraordinaryWire: any;
    export const ExtraordinaryEdge: any;
    export const ExtraordinaryCoedge: any;
    export const ExtraordinaryPoint2d: any;
    export const ExtraordinaryLine2d: any;
    export const ExtraordinaryCurve2d: any;
    export const ExtraordinaryCircleArc2d: any;
    export const ExtraordinaryCircle2d: any;
    export const IExBuilderCurve: any;
    export const IExBuilderRegion: any;
    export const IExSketchBuilder: any;
    export const IExSketchable: any;
    export const IExSketchData: any;
    export const IExGuideLine: any;
    export const IExFace2d: any;
    export const IExWire: any;
    export const IExCoedge: any;
    export const IExEdge: any;
    export const IExCircleArc2d: any;
    export const IExCircle2d: any;
    export const IExLine2d: any;
    export const IExCurve2d: any;
    export const IExPoint2d: any;
    export const ExSketchGuidelineType: any;
    export const ExPointType: any;
    export const IExSketchBase: any;
    export const IExBackground: any;
    export const ExSketchFlagEnum: any;
}

declare module "91132" {
    export const length: any;
    export const Pattern: any;
    export const Pattern_IO: any;
    export const PatternTypeEnum: any;
    // Original Name: m
    export class Pattern_IO extends import("24567").Entity_IO {
        instance(): any;
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const _Pattern_IO_instance: any;
    export const productsMap: any;
    export const localId: any;
    export const seekId: any;
    export const XLength: any;
    export const YLength: any;
    export const Rotation: any;
    export const seam: any;
    export const states: any;
    export const constraints: any;
    export const propertiesInfos: any;
    export const anchorPointInfos: any;
    export const overrideInfos: any;
    export const material: any;
    export const groups: any;
    export const polygon: any;
    export const metadata: any;
    export const __XLength: any;
    export const __YLength: any;
    export const __Rotation: any;
    export const invalidIds: any;
    export const _seam: any;
    export const SeamColor: any;
    export const color: any;
    export const colorMode: any;
    export const useColor: any;
    export const width: any;
    // Original Name: y
    export class Pattern extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        setSeamArgs(module: any): any;
        createExt(module: any, exports: any): any;
        create(module: any, exports: any, require: any): any;
        init(module: any, exports: any): any;
        reset(): any;
        resetOverride(): any;
        destroy(): any;
        checkPattern(): any;
        insertChildren(module: any, exports: any, require: any): any;
        addProperties(module: any, exports: any): any;
        addGroups(module: any): any;
        addAnchorPoints(module: any): any;
        addStates(module: any): any;
        addState(module: any): any;
        addConstraints(module: any): any;
    }
    export const name: any;
    export const properties: any;
    export const anchorPoints: any;
    export const _polygon: any;
    export const _generatedMaterial: any;
    export const generatedMaterial: any;
    export const _ready: any;
    export const signalReset: any;
    export const signalResetOverride: any;
    export const signalSeamWidthChange: any;
    export const seamMaterial: any;
    export const seamWidth: any;
    export const resources: any;
    export const parameters: any;
    export const __value: any;
    export const readonly: any;
    export const isEditable: any;
    export const offsetX: any;
    export const brickPatternOption: any;
    export const groovingChamferData: any;
    export const _customizedTextureURIMap: any;
    export const materialSmall4Rot: any;
    export const digest: any;
    export const textureURI: any;
    export const value: any;
    export const x: any;
    export const y: any;
    export const x2: any;
    export const y2: any;
}

declare module "91304" {
    export const length: any;
    export const DContent: any;
    export const DContent_IO: any;
    // Original Name: d
    export class DContent_IO extends import("20551").Content_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
        postLoad(module: any, exports: any): any;
    }
    export const masterId: any;
    export const layoutInfo: any;
    export const cuttingInfo: any;
    export const hiddenByConstrain: any;
    export const customizationContentType: any;
    export const isFunctionComponent: any;
    export const imodelParentId: any;
    export const fixK: any;
    export const fixS: any;
    export const materialId: any;
    export const __textureType: any;
    export const textureType: any;
    export const textureMaterials: any;
    export const modelCutPlanes: any;
    export const __masterId: any;
    export const __layoutInfo: any;
    export const __cuttingInfo: any;
    export const __hiddenByConstrain: any;
    export const __customizationContentType: any;
    export const __isFunctionComponent: any;
    export const __imodelParentId: any;
    export const __fixK: any;
    export const __fixS: any;
    export const __materialId: any;
    export const value: any;
    export const angle: any;
    export const __textureMaterialMap: any;
    export const __modelCutPlanes: any;
    // Original Name: h
    export class DContent extends import("20551").Content {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any, exports: any): any;
        migrateOldDContent(): any;
        updateContentMetaData(module: any): any;
        resize(module: any, exports: any, require: any): any;
        getOriginSize(): any;
        getRealScale(): any;
        getLocalMatrix(module: any): any;
        getLocalOutLine(): any;
        getGlobalBound3dPoints(): any;
        getGlobalBoundingBox3d(): any;
        getBoundingBox3d(): any;
        getBound3dPoints(): any;
        getLocalBound3dPoints(): any;
        getLocalBoundBox3d(): any;
        verify(): any;
        getIO(): any;
        isContentInLoop(module: any, exports: any): any;
        canTransactField(): any;
        getUniqueParent(): any;
        getProxyId(): any;
        getProxyObject(): any;
    }
    export const __localId: any;
    export const textureMaterialMap: any;
    export const __XLength: any;
    export const __YLength: any;
    export const __ZLength: any;
    export const __XScale: any;
    export const __YScale: any;
    export const __ZScale: any;
    export const parent: any;
    export const Class: any;
    export const __x: any;
    export const __y: any;
    export const __z: any;
    export const metadata: any;
    export const isScalable: any;
    export const XScale: any;
    export const YScale: any;
    export const ZScale: any;
    export const topView: any;
    export const top: any;
    export const model3d: any;
    export const modelTexture: any;
    export const XLength: any;
    export const YLength: any;
    export const ZLength: any;
    export const x: any;
    export const y: any;
    export const z: any;
}

declare module "91334" {
    export const difference: any;
}

declare module "91579" {
    export const SlabExtrudeType: any;
    export const SlabRegion: any;
    export const Side: any;
    // Original Name: s
    export class SlabRegion extends import("99827").Region {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any, exports: any, require: any, i: any): any;
        extrudeBody(): any;
        clone(): any;
        mirror(module: any): any;
        translate(module: any): any;
    }
    export const _layer: any;
    export const coEdgePath: any;
    export const linkWallIds: any;
    export const outer: any;
    export const holes: any;
    export const shellWrapper: any;
    export const topoFaces: any;
}

declare module "91586" {
    export const Url: any;
}

declare module "9169" {
    export const exports: any;
}

declare module "91808" {
    export const DExtruding: any;
    // Original Name: h
    export class DExtruding extends import("34225").CabinetBase {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        onUpdate(): any;
        toGraphicsData(): any;
        _getExtrudeMaterial(module: any, exports: any, require: any): any;
        _getUVbox(module: any): any;
        _getMergedMeshByMaterial(module: any, exports: any): any;
        _mergeFlatMesh(module: any): any;
    }
    export const materialMap: any;
    export const material: any;
    export const textureType: any;
    export const length: any;
    export const _flatMesh: any;
    export const roomType: any;
    export const modelCutPlanes: any;
    export const offsetX: any;
    export const offsetY: any;
    export const tileSize_x: any;
    export const tileSize_y: any;
    export const rotation: any;
    export const diffuseMapUvTransform: any;
    export const normalMapUvTransform: any;
}

declare module "92005" {
    export const LightBandProjectionHelper: any;
    // Original Name: r
    export class LightBandProjectionHelper {
        export2DProjection(module: any, exports: any): any;
        getInstance(): any;
        constructor(...args: any[]);
    }
    export const length: any;
    export const _instance: any;
}

declare module "92141" {
    // Original Name: a
    export class default extends import("42288").default {
        init(): any;
        _interested(module: any): any;
        _compute(module: any, exports: any, require: any, i: any): any;
        _isValid(module: any, exports: any, require: any): any;
    }
    export const XLength: any;
    export const YLength: any;
    export const ZLength: any;
    export const width: any;
    export const contents: any;
    export const x: any;
    export const y: any;
    export const templateKey: any;
    export const NIGHT: any;
    export const CHILLY_3: any;
    export const z: any;
}

declare module "92255" {
    export const length: any;
    export const ConcealedWorkPowerSys: any;
    export const ConcealedWorkPowerSys_IO: any;
    // Original Name: d
    export class ConcealedWorkPowerSys_IO extends import("86829").ConcealedWorkCompEntity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const relation: any;
    export const rlt: any;
    // Original Name: h
    export class ConcealedWorkPowerSys extends import("86829").ConcealedWorkCompEntity {
        constructor(...args: any[]);
        getIO(): any;
        sortCircuits(module: any): any;
        removeSelf(): any;
        addCircuit(module: any): any;
        removeCircuit(module: any): any;
        getCircuit(module: any): any;
    }
    export const circuitType: any;
    export const circuitTypeNumber: any;
}

declare module "92291" {
    export const MaterialDataObjDecorator: any;
    export const _materialDataObj: any;
    export const normalTexture: any;
    export const initTileSize_x: any;
    export const initTileSize_y: any;
    export const offsetX: any;
    export const offsetY: any;
    export const rotation: any;
}

declare module "92589" {
    export const GenericNode: any;
    // Original Name: o
    export class GenericNode {
        constructor(e: any, ...args: any[]);
        clone(): any;
        dump(): any;
        load(e: any): any;
        addChildNode(e: any): any;
    }
    export const childNodes: any;
    export const id: any;
    export const parentNode: any;
    export const c: any;
    export const length: any;
}

declare module "92674" {
    export const ParametricModelFgiParseUtil: any;
}

declare module "92725" {
    export const AssemblyMeta: any;
    export const MetadataEnum: any;
    export const DocumentStatus: any;
    export const FloorplanVersion: any;
    export const FloorplanMeta: any;
    export const Metadata: any;
    export const getDocManager: any;
    export const DocumentManager: any;
}

declare module "92726" {
}

declare module "92826" {
    export const exports: any;
}

declare module "92910" {
    export const RoomUtil: any;
    export const length: any;
    export const host: any;
    export const roomType: any;
    export const isOpened: any;
    export const x: any;
    export const y: any;
    export const IN: any;
}

declare module "93099" {
    export const WallFaceSplitter: any;
    export const WallUtil: any;
    export const arcInfo: any;
    export const radius: any;
    export const width: any;
    export const from: any;
    export const angle: any;
    export const left: any;
    export const leftAngle: any;
    export const right: any;
    export const rightAngle: any;
    export const length: any;
    export const wall: any;
    export const nextPoint: any;
    export const ID: any;
    export const lineParam: any;
    export const PI: any;
    export const isWrapped: any;
    export const id: any;
    export const reversed: any;
    export const outerWallSide: any;
    export const isPartialOuterWall: any;
    export class y {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        _isNeighborAtPointEmpty(module: any): any;
        _wallsInNeighborAtPoint(module: any): any;
        _getNextClosestWall(module: any, exports: any, require: any): any;
        execute(): any;
        _searchNextClosestWall(module: any, exports: any): any;
        _analyzeNextWall(module: any, require: any): any;
        _recursivelyImpl(module: any, require: any, i: any): any;
    }
    export const neighborInfo: any;
    export const option: any;
    export const onlyVisible: any;
    export const sameHeight: any;
    export const to: any;
    export const current_wall: any;
    export const origin_wall: any;
    export const const: any;
    export const : any;
    export const thickness: any;
    export const x: any;
}

declare module "93159" {
    export const Face2dDecorator: any;
    export const _face2d: any;
    export const length: any;
    export const id: any;
}

declare module "9318" {
    export const Util: any;
    export const length: any;
    export const y: any;
    export const x: any;
    export const metadata: any;
    export const tileSize_x: any;
    export const tileSize_y: any;
    export const colorMode: any;
    export const seekId: any;
    export const contentType: any;
    export const pinhua: any;
    export const seamFillerSupported: any;
    export const type: any;
    export const rotation: any;
    export const seamMaterial: any;
    export const categories: any;
    export const offsetX: any;
    export const offsetY: any;
    export const color: any;
    export const defaultTextureURI: any;
    export const seamColor: any;
    export const seamWidth: any;
    export const textureURI: any;
    export const flipX: any;
    export const flipY: any;
    export const iconSmallURI: any;
    export const userDefined: any;
    export const isCustomized: any;
    export const isSeamFillerSupported: any;
    export const textureURIDefault: any;
    export const Wallwrap: any;
    export const CustomizedMaterial: any;
    export const categoryId: any;
    export const blendColor: any;
    export const normalTexture: any;
    export const normalTileSize_x: any;
    export const normalTileSize_y: any;
    export const paintData: any;
}

declare module "93222" {
    export const exports: any;
}

declare module "93363" {
    export const TgLayerInfo: any;
    export const No: any;
    export const Yes: any;
    export const Perfect: any;
    export const _wallInfoMap: any;
    export const _structureFaceInfoMap: any;
    export const _beamFaceInfoMap: any;
    export const _slabFaceInfoMap: any;
    export const _slabInfoMap: any;
    export const _rawRoomInfos: any;
    export const _structureFaceRoomInfosMap: any;
    export const _floorRoomInfosMap: any;
    export const _ceilingRoomInfosMap: any;
    export const _wallRoomInfosMap: any;
    export const _roomInfoMap: any;
    export const _spaceInfoMap: any;
    export const layer: any;
    export const isAux: any;
    export const path: any;
    export const type: any;
    export const bottom: any;
    export const outer: any;
    export const holes: any;
    export const const: any;
    export const : any;
}

declare module "93413" {
    export const Window_IO: any;
    export const Window: any;
    // Original Name: r
    export class Window_IO extends import("85689").Opening_IO {
        load(module: any, exports: any, require: any): any;
    }
    export const __indent: any;
    export const __thickness: any;
    // Original Name: a
    export class Window extends import("85689").Opening {
        constructor(module: any, ...args: any[]);
        getIndentVector(): any;
        _setThickness(module: any): any;
        getIO(): any;
    }
    export const topView: any;
    export const Resources: any;
    export const z: any;
    export const indent: any;
    export const thickness: any;
}

declare module "93596" {
    export const TransUtil: any;
    export const length: any;
    export const z: any;
    export const PI: any;
    export const x: any;
    export const y: any;
    export const XScale: any;
    export const needFlip: any;
    export const YScale: any;
    export const ZScale: any;
    export const order: any;
    export const ZLength: any;
}

declare module "93600" {
    export const TgWallInfo: any;
    export const wall: any;
    export const layer: any;
    export const outerWallSide: any;
    export const reversed: any;
    export const shared: any;
    export const regions: any;
    export const _isInteriorWall: any;
}

declare module "93608" {
    export const DeviceComp: any;
    // Original Name: s
    export class DeviceComp extends import("43762").NodeComp {
        constructor(module: any, ...args: any[]);
        clone(): any;
        dump(): any;
        load(module: any, exports: any): any;
    }
    export const offset: any;
    export const id: any;
    export const _referObject: any;
    export const Type: any;
}

declare module "93611" {
    export const length: any;
    export const Layer_IO: any;
    export const SlabType: any;
    export const LayerTypeEnum: any;
    export const LayerFlagEnum: any;
    export const Layer: any;
    export const LayerTypeNormal: any;
    export const LayerTypeBasement: any;
    export const normal: any;
    export const deActive: any;
    export const active: any;
    export const Slab: any;
    export const Molding: any;
    export const Opening: any;
    export const ParametricOpening: any;
    export const ParametricDoor: any;
    export const Content: any;
    export const Wall: any;
    export const Group: any;
    export const Light: any;
    export const Face: any;
    export const ConcealedWork: any;
    export const Floor: any;
    export const Ceiling: any;
    export const Structure: any;
    export const Beam: any;
    export const AuxiliaryLine: any;
    export const WallFaceAssembly: any;
    export const RoofsDrawing: any;
    export const floor: any;
    export const ceiling: any;
    export const other: any;
    // Original Name: w
    export class Layer_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
        postLoad(module: any, exports: any): any;
        _migrateUnderlay(module: any, exports: any): any;
        migrateLoad(module: any, exports: any, require: any): any;
    }
    export const prev: any;
    export const __prev: any;
    export const next: any;
    export const __next: any;
    export const height: any;
    export const slabThickness: any;
    export const displayName: any;
    export const floorSlabs: any;
    export const ceilingSlabs: any;
    export const sLs: any;
    export const sSHs: any;
    export const rB: any;
    export const hB: any;
    export const bB: any;
    export const sB: any;
    export const underlay: any;
    export const __height: any;
    export const __slabThickness: any;
    export const slabSketch2dGuildLines: any;
    export const slabSketch2dHoles: any;
    export const __underlay: any;
    export const material: any;
    export const data: any;
    export const url: any;
    // Original Name: D
    export class Layer extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any, exports: any, require: any, i: any): any;
        getSketch(): any;
        setSketch(module: any): any;
        updateSketch(module: any): any;
        getThickness(): any;
        setThickness(module: any): any;
        getHeight(): any;
        setHeight(module: any): any;
        verify(): any;
        _verifyChildren(): any;
        _onHeightChanged(module: any, exports: any): any;
        _onSlabThicknessChanged(module: any, exports: any): any;
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
        addFloorSlab(module: any): any;
        addCeilingSlab(module: any): any;
        onChildAdded(module: any): any;
        onChildRemoved(module: any): any;
        findWall(module: any, exports: any): any;
        forEachPoint(module: any, exports: any): any;
        forEachFloorSlab(module: any, exports: any): any;
        forEachCeilingSlab(module: any, exports: any): any;
        forEachRoof(module: any, exports: any): any;
        forEachFloor(module: any, exports: any): any;
        forEachCeiling(module: any, exports: any): any;
        _forEachEntity(module: any, exports: any, require: any): any;
        forEachRoom(module: any, exports: any): any;
        forEachMaterial(module: any, exports: any): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        onChildDirty(module: any, exports: any): any;
        findSlab(module: any, exports: any): any;
        destroy(): any;
        getIO(): any;
        isValid(): any;
        removeAllChildrenByTypes(module: any): any;
        refreshBoundInternal(): any;
        getFaceQuery(module: any): any;
        forEachSlab(module: any, exports: any): any;
        forEachMolding(module: any, exports: any): any;
        forEachOpening(module: any, exports: any): any;
        forEachParametricOpening(module: any, exports: any): any;
        forEachContent(module: any, exports: any): any;
        forEachWall(module: any, exports: any): any;
        forEachStructure(module: any, exports: any): any;
        forEachBeam(module: any, exports: any): any;
        forEachFace(module: any, exports: any): any;
        forEachGroup(module: any, exports: any): any;
        forEachLight(module: any, exports: any): any;
        forEachStructureFace(module: any, exports: any): any;
        forEachBeamFace(module: any, exports: any): any;
        forEachWallFaceAssembly(module: any, exports: any): any;
        clearParents(): any;
        clearFreeFaces(): any;
        hookWainScotSignal(module: any): any;
        mirror(module: any): any;
        mirrorBuilders(module: any): any;
        translate(module: any): any;
        addInteriorAuxFace(module: any, exports: any): any;
        removeInteriorAuxFace(module: any): any;
    }
    export const __floorSlabs: any;
    export const __ceilingSlabs: any;
    export const _roofs: any;
    export const slabeditor: any;
    export const signalSlabThicknessChanged: any;
    export const _signalHookWainScot: any;
    export const roomBuilder: any;
    export const holeBuilder: any;
    export const beamBuilder: any;
    export const slabBuilder: any;
    export const interiorAuxFaces: any;
    export const childrenMap: any;
    export const _gussetGroup: any;
    export const slabChangedFacesMap: any;
    export const height3d: any;
    export const thickness: any;
    export const isAux: any;
    export const _parents: any;
}

declare module "93776" {
    export enum TubeDiameterEnum {
        D20 = 0.02,
        D25 = 0.025,
        D32 = 0.032,
        D40 = 0.04,
    }
    export const D16: any;
    export const D20: any;
    export const D25: any;
    export const D32: any;
    export const D40: any;
}

declare module "93923" {
    export const WindowSillSideType: any;
    export const Manager: any;
    export const IWindowPocketParameters: any;
    export const WindowPocket_IO: any;
    export const WindowPocket: any;
    export const IWindowHoleProfileConfig: any;
    export const IWindowHoleParameters: any;
    export const IWindowHoleDump: any;
    export const WindowHole_IO: any;
    export const WindowHole: any;
    export const WindowCeiling_IO: any;
    export const WindowCeiling: any;
    export const IWindowSillParameters: any;
    export const WindowSill_IO: any;
    export const WindowSill: any;
    export const IWindowFrameParameters: any;
    export const Window_IO: any;
    export const WindowFrame_IO: any;
    export const Window: any;
    export const WindowFrame: any;
    export const IWindowWallParameters: any;
    export const Wall_IO: any;
    export const WindowWall_IO: any;
    export const Wall: any;
    export const WindowWall: any;
    export const IExtrudedBodyParameters: any;
    export const IExtrudedBodyDump: any;
    export const ExtrudedBody_IO: any;
    export const ExtrudedBody: any;
}

declare module "93932" {
    export const TgUtil: any;
    // Original Name: c
    export class TgUtil {
        getPrevWallFace(module: any, exports: any): any;
        getNextWallFace(module: any, exports: any): any;
        getBrepFacePath2d(module: any): any;
        convert3dCurvesTo2dCurves(module: any): any;
        convert3dCurveTo2dCurve(module: any): any;
        convert2dCurvesTo3dCurves(module: any, exports: any): any;
        convert2dCurveTo3dCurve(module: any, exports: any): any;
        convert2dPolygonTo3dPolygon(module: any, exports: any, require: any): any;
        convert3dPolygonTo2dPolygon(module: any, exports: any): any;
        convertIpathToIPolygon(module: any): any;
        convertIpathsToIPolygons(module: any): any;
        reversePath(module: any): any;
        reversedPath(module: any): any;
        clip(module: any, exports: any, require: any, i: any): any;
        s: any;
        l: any;
        constructor(...args: any[]);
    }
    export const structureFaceInfos: any;
    export const face: any;
    export const holes: any;
    export const length: any;
    export const bottom: any;
    export const EN_TRIM: any;
    export const reversed: any;
    export const outer: any;
}

declare module "94135" {
    export const DomeLightOption: any;
    // Original Name: o
    export class DomeLightOption {
        constructor(...args: any[]);
        set(e: any, t: any, o: any, i: any): any;
        get(): any;
        reset(): any;
        getVrayLightOption(): any;
    }
    export const brightness: any;
    export const reflection: any;
    export const toneIndex: any;
    export const toneTemperature: any;
    export const TemperatureMap: any;
}

declare module "94142" {
    export const WindowCeiling: any;
    // Original Name: n
    export class WindowCeiling extends import("65238").ExtrudedBody {
        constructor(module: any, exports: any, require: any, i: any, ...args: any[]);
        onUpdate(): any;
        toGraphicsDataAsync(): any;
        toGraphicsData(): any;
    }
}

declare module "9418" {
}

declare module "94331" {
    export const ParametricModel: any;
    // Original Name: a
    export class ParametricModel extends import("75312").BaseObject {
        constructor(module: any, exports: any, require: any, i: any, ...args: any[]);
        onUpdate(): any;
        toGraphicsDataAsync(): any;
        toGraphicsData(): any;
        onFlagChanged(module: any): any;
    }
    export const _webCADDocument: any;
    export const parentWebCADDoc: any;
    export const meshDefs: any;
    export const objects: any;
    export const entityId: any;
}

declare module "94351" {
    export const inspectSource: any;
    export const exports: any;
}

declare module "94448" {
    export const every: any;
}

declare module "94562" {
    export const RoomUtil: any;
    export const length: any;
    export const floorMaterial: any;
    export const ceilingMaterial: any;
    export const roomType: any;
    export const roomTypeDisplayName: any;
    export const parent: any;
    export const floors: any;
    export const geometry: any;
}

declare module "94743" {
    export const exports: any;
}

declare module "94828" {
    export const length: any;
    export const Slab_IO: any;
    export const SlabFaceType: any;
    export const Slab: any;
    export const top: any;
    export const bottom: any;
    export const side: any;
    // Original Name: p
    export class Slab_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
        migrateLoad(module: any, exports: any, require: any): any;
    }
    export const height: any;
    export const thickness: any;
    export const baseProfile: any;
    export const __height: any;
    export const __thickness: any;
    export const __baseProfile: any;
    export const _flag: any;
    export const c: any;
    export const data: any;
    // Original Name: f
    export class Slab extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any, exports: any, require: any): any;
        setFlagOn(module: any, exports: any): any;
        getBaseProfile(): any;
        setBaseProfile(module: any): any;
        _setBaseProfile(module: any): any;
        getThickness(): any;
        setThickness(module: any): any;
        _onThicknessChanged(module: any, exports: any): any;
        module: any;
    }
    export const signalOpeningAdded: any;
    export const signalOpeningRemoved: any;
    export const z: any;
    export const x: any;
    export const y: any;
    export const id: any;
    export const outdoorLayer: any;
    export const _disposed: any;
    export const _pathCache: any;
    export const type: any;
    export const Geometry: any;
    export const tileSize_x: any;
    export const tileSize_y: any;
    export const offsetX: any;
    export const offsetY: any;
}

declare module "95223" {
    export const IntelligentLightsUtil: any;
    export class h {
        constructor(module: any, ...args: any[]);
        getLightContents(): any;
        setLightContents(module: any): any;
        setCeilings(module: any): any;
        getPhysicalLights(): any;
        setPhysicalLights(module: any): any;
        getOuterPolygon(): any;
        setOuterPolygon(module: any): any;
        getHolePolygons(): any;
        setHolePolygons(module: any): any;
        getGeometry(): any;
        setContents(module: any): any;
        getContents(): any;
        setGroups(module: any): any;
        getGroups(): any;
        getInteriorEdges(): any;
        getEdges(): any;
        getArea(): any;
        setArea(module: any): any;
        setRoomType(module: any): any;
        getRoomType(): any;
        setRoomID(module: any): any;
        getRoomID(): any;
        getInnerPolygon(): any;
        setInnerPolygon(module: any): any;
        getRoomHeight(): any;
        setRoomHeight(module: any): any;
        getCeilingHeight(): any;
        getSubPolygons(): any;
        setSubPolygons(module: any): any;
        getRoomOpenings(): any;
        setRoomOpenings(module: any): any;
        isCeilingFaceHidden(): any;
        setIsCeilingFaceHidden(module: any): any;
        getLayer(): any;
        setLayer(module: any): any;
    }
    export const _interiorEdges: any;
    export const _contents: any;
    export const _groups: any;
    export const _area: any;
    export const _roomType: any;
    export const _roomID: any;
    export const _innerPolygon: any;
    export const _outerPolygon: any;
    export const _height: any;
    export const _lightContents: any;
    export const _physicalLights: any;
    export const _ceilings: any;
    export const _subPolygons: any;
    export const _openings: any;
    export const _isCeilingFaceHidden: any;
    export const _holePolygons: any;
    export const _polygon: any;
    export const _edges: any;
    export const _layer: any;
    // Original Name: g
    export class IntelligentLightsUtil {
        getFloorplanInfo(module: any, exports: any, require: any): any;
        catch(module: any): any;
        constructor(...args: any[]);
    }
    export const includeHoles: any;
    export const length: any;
    export const floor: any;
    export const min: any;
    export const contents: any;
    export const groups: any;
    export const id: any;
    export const metadata: any;
    export const intensity: any;
    export const templateKey: any;
    export const NIGHT: any;
    export const content: any;
    export const temperature: any;
    export const contentID: any;
    export const contentType: any;
    export const stack: any;
    export const IES: any;
    export const width: any;
    export const height: any;
    export const radius: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const double_flat: any;
    export const sourceContentType: any;
    export const XRotation: any;
    export const YRotation: any;
    export const ZRotation: any;
    export const layer: any;
}

declare module "95237" {
    export const ContentGridHandler: any;
    // Original Name: ContentGridHandler
    export class ContentGridHandler {
        constructor(e: any, ...args: any[]);
        hasParamSwingDoorParent(): any;
        updateSelfLocateMeshes(e: any): any;
        getSelfLocateMeshResults(e: any): any;
        n: any;
    }
    export const meshMatrix: any;
    export const PlaceHolderStartIndex: any;
    export const meshBoundings: any;
    export const sizes: any;
    export const gridMeshes: any;
    export const boundingBoxData: any;
    export const meshesMap: any;
    export const entity: any;
    export const scaleRule: any;
    export const size: any;
    export const length: any;
    export const boundingSize: any;