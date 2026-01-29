}

declare module "3577" {
    export const length: any;
    export const LightEditFlagEnum: any;
    export const Light_IO: any;
    export const LightTypeEnum: any;
    export const Light: any;
    export const PointLight: any;
    export const FlatLight: any;
    export const EllipseLight: any;
    export const SpotLight: any;
    export const AttenuatedSpotLight: any;
    export const MeshLight: any;
    export const PhysicalLight: any;
    export const SpotPhysicalLight: any;
    export const SubGroup: any;
    export const AsmPhysicalLight: any;
    export const AsmSubGroup: any;
    export const multiAction: any;
    // Original Name: d
    export class Light_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const temperature: any;
    export const intensity: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const rgb: any;
    export const affectSpecular: any;
    export const close: any;
    export const volumeLight: any;
    export const friendlyIndex: any;
    export const type: any;
    export const sourceContentType: any;
    export const group: any;
    export const XSize: any;
    export const YSize: any;
    export const ZSize: any;
    export const contentType: any;
    export const __intensity: any;
    export const __x: any;
    export const __y: any;
    export const __z: any;
    export const __close: any;
    export const __temperature: any;
    export const __rgb: any;
    export const __affectSpecular: any;
    export const __volumeLight: any;
    export const __friendlyIndex: any;
    export const __sourceContentType: any;
    export const __dataChanged: any;
    // Original Name: h
    export class Light extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        _getLightGroupTemperature(): any;
        getFriendlyIndexGroup(): any;
        getTemperature(): any;
        hasAreaSize(): any;
        isVirtual(): any;
        getInitialIntensity(): any;
        reset(): any;
        isPhysicalLight(module: any): any;
        isPhysicalAndMeshLight(module: any): any;
        isAreaSourceLight(module: any): any;
        getIO(): any;
        clone(): any;
        getHost(): any;
        isContentInRoom(): any;
        isDataChanged(): any;
        isDateChanged(): any;
        setDataInitStatus(): any;
        attachRealLight(): any;
        refreshBoundInternal(): any;
        closeLight(module: any): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        isFlagOn(module: any, exports: any, require: any): any;
        isFlagOff(module: any, exports: any, require: any): any;
        onEntityDirty(): any;
        mirror(module: any, exports: any): any;
        getRenderParameters(): any;
        isGroupChildOf(module: any): any;
        setLightEditFlag(module: any, exports: any): any;
        onFlagChanged(module: any): any;
        getBoundingData(): any;
    }
    export const owner: any;
    export const __group: any;
    export const lightEditFlag: any;
    export const rotation: any;
    export const IES: any;
    export const iesUrl: any;
    export const isPublicIES: any;
    export const outline: any;
    export const _signalHook: any;
    export const isLightGroupTemperature: any;
    export const multiplier: any;
    export const content: any;
    export const _boundDirty: any;
    export const flag: any;
    export const INACTIVE_FRIENDLY_INDEX: any;
    export const DEFAULT_SIZE: any;
}

declare module "35832" {
    export const InteractiveModel: any;
    export const _id: any;
    export const _flag: any;
    export const _tempFlag: any;
    export const signalFlagChanged: any;
    export const signalDirty: any;
    export const Temp: any;
    export const options: any;
    export const removed: any;
}

declare module "36038" {
    export const LChild: any;
    export const CurveChild: any;
    export const SpecialShapedWindow: any;
    export const DoorWindow: any;
    export const CurvedWindow: any;
    export const InnerBayWindow: any;
    export const CornerBayWindow: any;
    export const CornerWindow: any;
    export const FloorBasedWindow: any;
    export const BayWindow: any;
    export const POrdinaryWindow: any;
    export const SingleDoor: any;
}

declare module "36067" {
    export const exports: any;
}

declare module "36084" {
    export const length: any;
    export const Edge_IO: any;
    export const Edge: any;
    // Original Name: u
    export class Edge_IO extends import("99338").Entity_IO {
        load(module: any, exports: any, require: any, i: any): any;
    }
    export const __from: any;
    export const __to: any;
    export const __curve: any;
    export const isSplitEdge: any;
    export const isInnerEdge: any;
    export const coedge: any;
    export const __coedge: any;
    // Original Name: g
    export class Edge extends import("99338").Entity {
        constructor(module: any, ...args: any[]);
        create(module: any, exports: any): any;
        isArcEdge(): any;
        getFrom(): any;
        getTo(): any;
        getCurve(): any;
        getCoedge(): any;
        _setFrom(module: any): any;
        _setTo(module: any): any;
        copyProperty(module: any): any;
        onRemovedFromParent(module: any, exports: any): any;
        getIO(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        verify(): any;
        validate(module: any): any;
    }
    export const partner: any;
}

declare module "36105" {
    export const ConfigRegister: any;
    export const CONTAINER_TYPES: any;
    export const _configs: any;
    export const _availableNodes: any;
    export const _context: any;
    export const length: any;
}

declare module "36178" {
    export const exports: any;
}

declare module "36369" {
    export const Size: any;
    export const Coordinate: any;
    export const Rect: any;
    export const Box: any;
    // Original Name: n
    export class Box {
        constructor(module: any, exports: any, require: any, i: any, ...args: any[]);
        boundingBox(module: any): any;
        getWidth(): any;
        getHeight(): any;
        clone(): any;
        contains(module: any): any;
        expand(module: any, exports: any, require: any, n: any): any;
        expandToInclude(module: any): any;
        expandToIncludeCoordinate(module: any): any;
        equals(module: any, exports: any): any;
        contains(module: any, exports: any): any;
        relativePositionX(module: any, exports: any): any;
        relativePositionY(module: any, exports: any): any;
        distance(module: any, exports: any): any;
        intersects(module: any, exports: any): any;
        intersectsWithPadding(module: any, exports: any, require: any): any;
        ceil(): any;
        floor(): any;
        round(): any;
        translate(module: any, exports: any): any;
        scale(module: any, exports: any): any;
    }
    export const top: any;
    export const right: any;
    export const bottom: any;
    export const left: any;
    export const x: any;
    export const y: any;
    // Original Name: r
    export class Rect {
        constructor(module: any, exports: any, require: any, i: any, ...args: any[]);
        clone(): any;
        toBox(): any;
        createFromPositionAndSize(module: any, exports: any): any;
        createFromBox(module: any): any;
        equals(module: any, exports: any): any;
        intersection(module: any): any;
        intersection(module: any, exports: any): any;
        intersects(module: any, exports: any): any;
        intersects(module: any): any;
        difference(module: any, exports: any): any;
        difference(module: any): any;
        boundingRect(module: any): any;
        boundingRect(module: any, exports: any): any;
        contains(module: any): any;
        squaredDistance(module: any): any;
        distance(module: any): any;
        getSize(): any;
        getTopLeft(): any;
        getCenter(): any;
        getBottomRight(): any;
        ceil(): any;
        floor(): any;
        round(): any;
        translate(module: any, exports: any): any;
        scale(module: any, exports: any): any;
    }
    export const width: any;
    export const height: any;
    // Original Name: a
    export class Size {
        constructor(module: any, exports: any, ...args: any[]);
        equals(module: any, exports: any): any;
        clone(): any;
        getLongest(): any;
        getShortest(): any;
        area(): any;
        perimeter(): any;
        aspectRatio(): any;
        isEmpty(): any;
        ceil(): any;
        fitsInside(module: any): any;
        floor(): any;
        round(): any;
        scale(module: any, exports: any): any;
        scaleToCover(module: any): any;
        scaleToFit(module: any): any;
    }
    // Original Name: s
    export class Coordinate {
        constructor(module: any, exports: any, ...args: any[]);
        clone(): any;
        equals(module: any): any;
        equals(module: any, exports: any): any;
        distance(module: any, exports: any): any;
        magnitude(module: any): any;
        squaredDistance(module: any, exports: any): any;
        difference(module: any, exports: any): any;
        sum(module: any, exports: any): any;
        ceil(): any;
        floor(): any;
        round(): any;
        translate(module: any, exports: any): any;
        scale(module: any, exports: any): any;
        rotateRadians(module: any, exports: any): any;
        rotateDegrees(module: any, exports: any): any;
    }
}

declare module "36385" {
    export const length: any;
    export const WindowPocket_IO: any;
    export const WindowPocket: any;
    // Original Name: l
    export class WindowPocket_IO extends import("48961").ParametricModel_IO {
        load(module: any, exports: any, require: any): any;
    }
    export const outerMoldingSizeX: any;
    export const outerMoldingSizeY: any;
    // Original Name: c
    export class WindowPocket extends import("48961").ParametricModel {
        constructor(module: any, exports: any, ...args: any[]);
        initByParameters(module: any): any;
        getDefaultSide(): any;
        getIO(): any;
    }
    export const side: any;
}

declare module "36410" {
    export const toArray: any;
}

declare module "36455" {
    export const ISlabOpeningOldInfo: any;
    export const SurfaceObj: any;
    export const RoomSplitCurveType: any;
    export const SplitHelper: any;
    export const WallRegion: any;
    export const SlabTopoFace: any;
    export const RoomTopoFace: any;
    export const WallTopoFace: any;
    export const TopoFace: any;
    export const RoomBuilder: any;
    export const HoleBuilder: any;
    export const IArcCurveDump: any;
    export const IArcInfo: any;
    export const ArcCurve_IO: any;
    export const ArcCurve: any;
    export const ICurveDump: any;
    export const Curve_IO: any;
    export const CurveType: any;
    export const Curve: any;
}

declare module "36643" {
    export const length: any;
    export const Cornice_IO: any;
    export const Cornice: any;
    // Original Name: g
    export class Cornice_IO extends import("8302").WallMolding_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const topoPathers: any;
    export const offset: any;
    export const autoFit: any;
    // Original Name: p
    export class Cornice extends import("8302").WallMolding {
        constructor(module: any, exports: any, ...args: any[]);
        clone(): any;
        _copyFrom(module: any): any;
        getIO(): any;
        isSameMolding(module: any): any;
        getStartTopoPather(): any;
        getEndTopoPather(): any;
        split(module: any): any;
        addTopoPather(module: any): any;
        calcSweepPath(): any;
        sortpaths(module: any): any;
        onFieldChanged(module: any, exports: any, require: any): any;
    }
    export const type: any;
}

declare module "3668" {
    export const sham: any;
    export const exports: any;
}

declare module "3669" {
    export const AsmPhysicalLight_IO: any;
    export const AsmPhysicalLight: any;
    // Original Name: l
    export class AsmPhysicalLight_IO extends import("48146").PhysicalLight_IO {
        load(module: any, exports: any, require: any): any;
    }
    export const type: any;
    // Original Name: c
    export class AsmPhysicalLight extends import("48146").PhysicalLight {
        constructor(module: any, exports: any, ...args: any[]);
        create(): any;
        reset(): any;
        getIO(): any;
        createFromPhysicalLight(module: any): any;
        getRenderParameters(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
    }
    export const isAssembly: any;
    export const memberPropertiesConfig: any;
}

declare module "36695" {
    export const MixPaintUpdaterV3: any;
    // Original Name: I
    export class MixPaintUpdaterV3 {
        constructor(...args: any[]);
        getCoordinateComputer(module: any): any;
        updateFromPaintData(module: any, exports: any, require: any): any;
        updateFromDump(module: any, exports: any, require: any): any;
        postUpdateFloorplan(module: any, exports: any): any;
        _translateFloorYWithDoorHole(module: any): any;
        _updateMixPaint(module: any, exports: any): any;
        _createID(module: any): any;
        _convertPolygonToFace2d(module: any): any;
        _updateWaterJetTiles(module: any): any;
        _dumpPolygon(module: any, exports: any, require: any): any;
        _dumpRegion(module: any): any;
        _dumpWaistline(module: any): any;
        _dumpBoundary(module: any): any;
        _dumpWaterJetTile(module: any): any;
        _dumpBoundaryBlock(module: any): any;
        _dumpPatternGrid(module: any): any;
        _dumpMergedPatternBlocks(module: any): any;
        _dumpPatternBlock(module: any): any;
        _dumpPavingOption(module: any): any;
        _dumpPatternFromMixGrid(module: any, exports: any): any;
        _dumpPatternFromShape(module: any): any;
        _dumpPattern(module: any, exports: any, require: any): any;
        _dumpPatternFromPattern(module: any, exports: any): any;
        r: any;
    }
    export const _cachedComputerMap: any;
    export const _patternDumps: any;
    export const _blockGroupMap: any;
    export const _version: any;
    export const faceEntity: any;
    export const faceId: any;
    export const _coordinateComputer: any;
    export const top: any;
    export const left: any;
    export const y: any;
    export const seekId: any;
    export const backgroundMaterial: any;
    export const idMap: any;
    export const regions: any;
    export const length: any;
    export const independentRegions: any;
    export const grid: any;
    export const x: any;
    export const layout: any;
    export const id: any;
    export const cornerPattern: any;
    export const type: any;
    export const Pave: any;
    export const seam: any;
    export const width: any;
    export const p: any;
    export const rot: any;
    export const pms: any;
    export const tUrl: any;
    export const sX: any;
    export const tileSizeX: any;
    export const sY: any;
    export const tileSizeY: any;
    export const percent: any;
    export const localId: any;
    export const seamWidth: any;
    export const metadata: any;
    export const userDefined: any;
    export const offsetY: any;
    export const textureUrl: any;
}

declare module "36851" {
    export const PContent: any;
    // Original Name: r
    export class PContent extends import("79579").PModel {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        onUpdatePosition(module: any): any;
    }
    export const _matrixLocal: any;
}

declare module "36881" {
    export const WindowSill: any;
    // Original Name: n
    export class WindowSill extends import("65238").ExtrudedBody {
        constructor(module: any, exports: any, require: any, i: any, ...args: any[]);
        onUpdate(): any;
    }
    export const length: any;
}

declare module "36995" {
    export const ParametricModelDecorator: any;
    // Original Name: n
    export class ParametricModelDecorator {
        constructor(module: any, ...args: any[]);
        getModelData(): any;
        getVariableNameByRef(module: any): any;
        isTopLevelModel(): any;
        isSubpart(): any;
        getFaceTagsByVariableNames(module: any): any;
        getFacesInfoByVariableName(module: any): any;
        getMinMoveVecToWall(module: any): any;
        getParentByEntityTypes(module: any, exports: any): any;
        getTopLevelModel(): any;
        getLocalToBaseMatrix(module: any, exports: any): any;
    }
    export const entity: any;
    export const tag: any;
    export const eId: any;
    export const x: any;
    export const y: any;
    export const width: any;
    export const Class: any;
    export const parent: any;
}

declare module "37343" {
    export const lastIndex: any;
}

declare module "37354" {
    export const length: any;
    export const Pocket_IO: any;
    export const Pocket: any;
    // Original Name: c
    export class Pocket_IO extends import("14502").Molding_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const side: any;
    export const outerXSize: any;
    export const outerYSize: any;
    export const outerThickness: any;
    export const outerHeight: any;
    // Original Name: d
    export class Pocket extends import("14502").Molding {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any): any;
        verify(): any;
        getDefaultSide(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        onSizeChanged(): any;
        getIO(): any;
    }
    export const XSize: any;
    export const YSize: any;
    export const material: any;
    export const __outerXSize: any;
    export const __outerYSize: any;
    export const __side: any;
}

declare module "37475" {
}

declare module "37627" {
    export const PolygonUtil: any;
    // Original Name: i
    export class PolygonUtil {
        indexOffset(e: any, t: any, i: any): any;
        getPointIndexPosOnPolygon(e: any, t: any): any;
        getSubPathBetweenPoints(e: any, t: any, o: any): any;
        constructor(...args: any[]);
    }
    export const length: any;
    export const delta: any;
    export const x: any;
    export const y: any;
    export const sqrDist: any;
    export class r {
        constructor(e: any, t: any, ...args: any[]);
        remake(e: any, t: any): any;
        cross(e: any): any;
        crossLineSeg(e: any, t: any): any;
        offset(e: any): any;
        parallel(e: any): any;
        calc(e: any): any;
    }
    export const A: any;
    export const B: any;
    export const C: any;
    export class a {
        constructor(...args: any[]);
    }
    export const polygon: any;
}

declare module "38021" {
    export const NCustomizedFaceGroupLightSlotUtil: any;
    export const faceType: any;
    export const faceEntity: any;
    export const faceId: any;
}

declare module "38026" {
    export const ArrayState: any;
    // Original Name: l
    export class ArrayState extends import("18439").State {
        constructor(module: any, exports: any, ...args: any[]);
        addItem(module: any, exports: any): any;
        removeItem(module: any, exports: any): any;
        addPoint(module: any): any;
        removePoint(module: any): any;
        init(module: any, exports: any): any;
        verify(): any;
        verifyBeforeDump(): any;
        dump(module: any, exports: any): any;
        load(module: any, exports: any): any;
        toArray(): any;
        toPath(): any;
        _combineSamePoint(module: any): any;
    }
    export const __children: any;
    export const id: any;
    export const localId: any;
    export const name: any;
    export const isEditable: any;
    export const children: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const Class: any;
}

declare module "38096" {
    export const SweepHelper: any;
    // Original Name: r
    export class SweepHelper {
        getSweepInformation(module: any, exports: any, require: any): any;
        getSweepPath3D(module: any, exports: any, require: any, i: any, n: any): any;
        getSweepPath3DbyCoedges(module: any): any;
        isSweepPathReversed(module: any, exports: any, require: any): any;
        getLocalCoordinate(module: any, exports: any, require: any): any;
        getLocalCoordinateBySweepPath(module: any, exports: any, require: any): any;
        getSweepStartPoint(module: any, exports: any, require: any): any;
        getSweepStartPointByPath3D(module: any): any;
        getPathCoedge3ds(module: any, exports: any, require: any): any;
        reSortSweepPathByFaceDirection(module: any): any;
        isClosed(module: any): any;
        makeSweepPathContinuity(module: any): any;
        getSweepPathByFace(module: any, exports: any, require: any): any;
        getSweepPathByCoedges(module: any, exports: any): any;
        getRelatedCoedge(module: any, exports: any): any;
        getInstance(): any;
        constructor(...args: any[]);
    }
    export const userData: any;
    export const length: any;
    export const tag: any;
    export const _instance: any;
}

declare module "38222" {
    export const LightSetLibrary: any;
    // Original Name: n
    export class LightSetLibrary {
        loadDefault(): any;
        getLightSetData(): any;
        get(module: any): any;
        add(module: any): any;
        delete(module: any): any;
        constructor(...args: any[]);
    }
    export const _lightData: any;
}

declare module "38251" {
    export const exports: any;
}

declare module "38361" {
    export const ProfileFactory: any;
}

declare module "38477" {
    export const IDGeneratorType: any;
    export const IDGenerator: any;
    // Original Name: i
    export class IDGenerator {
        constructor(e: any, ...args: any[]);
        logOverlengthId(e: any, t: any, o: any): any;
        generate(e: any): any;
        getNextId(): any;
        syncId(e: any): any;
        resetId(e: any): any;
        register(e: any, t: any): any;
        getGenerator(e: any, t: any): any;
        generate(e: any, t: any, o: any): any;
    }
    export const _nextId: any;
    export const _defaultKey: any;
    export const _generators: any;
}

declare module "386" {
    export const length: any;
    export const Vertex_IO: any;
    export const VertexMoveTypeEnum: any;
    export const Vertex: any;
    export const T: any;
    export const freeMove: any;
    export const other: any;
    // Original Name: c
    export class Vertex_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const x: any;
    export const y: any;
    export const z: any;
    export const __x: any;
    export const __y: any;
    export const __z: any;
    // Original Name: h
    export class Vertex extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any, exports: any, require: any): any;
        set(module: any, exports: any, require: any, i: any): any;
        _validateInput(module: any, exports: any): any;
        offset(module: any, exports: any, require: any): any;
        mirror(module: any, exports: any): any;
        getIO(): any;
        verify(): any;
    }
    export const _onDrag: any;
    export const curve: any;
}

declare module "38776" {
}

declare module "39078" {
    export const MaterialUtil: any;
    // Original Name: m
    export class MaterialUtil {
        isOldMixPaintMaterial(module: any, exports: any): any;
        isOldCustomizedTilesMaterial(module: any, exports: any): any;
        isRCP(module: any, exports: any): any;
        getMigrateCustomizedModelRCPMatrix(module: any): any;
        getMigrateCeilingRCPMatrix(module: any): any;
        migrateSeamMaterial(module: any): any;
        migrateMaterial(module: any): any;
        migrateMaterialColor(module: any, exports: any): any;
        isSimpleMaterial(module: any): any;
        isMixPaintMaterial(module: any): any;
        isCustomizedTilesMaterial(module: any, exports: any): any;
        isStylizedMaterial(module: any): any;
        parseCustomizedTilePaintData(module: any, exports: any): any;
        getMixPaintMaterialPaintData(module: any, exports: any): any;
        migrateMaterialWithMixPaintEntity(module: any): any;
        fixMaterialWithSamePatternIssue(module: any, exports: any): any;
        safeSetMaterial(module: any, exports: any): any;
        getMixPaintEntity(module: any, exports: any): any;
        getPaintDataFromMixPaintEntity(module: any): any;
        alignHoleFaceToHostFace(module: any, exports: any, require: any): any;
        alignFace(module: any, exports: any, require: any): any;
        convertMixPaintData(module: any): any;
        getMaterialRefSeekIds(module: any): any;
        isSuspendedCeilingMeta(module: any): any;
        getPatternEntityHashKey(module: any): any;
        getChamferGroovingKey(module: any): any;
        getPatternBlockHashKey(module: any, exports: any): any;
        getPatternBlockRefTextureURIs(module: any, exports: any): any;
        getPavingOptionByMaterial(module: any, exports: any): any;
        getDefaultPaving(module: any, exports: any, require: any, i: any): any;
        getPavingOptionByMaterialData(module: any, exports: any): any;
        _calcRealPavingOption(module: any, exports: any): any;
        _getAlignPaving(module: any, exports: any): any;
        _getAlignData(module: any, exports: any, require: any): any;
        _getInterLine(module: any, exports: any, require: any): any;
        _getEasyMaterialData(module: any, exports: any): any;
        constructor(...args: any[]);
    }
    export const patterns: any;
    export const color: any;
    export const colorMode: any;
    export const mixpaint: any;
    export const seamMaterial: any;
    export const grid: any;
    export const seamFillerSupported: any;
    export const paintData: any;
    export const gridPolygons: any;
    export const material: any;
    export const userDefined: any;
    export const pinhua: any;
    export const useColor: any;
    export const pattern: any;
    export const bottomFaceMaterial: any;
    export const id: any;
    export const backgroundMaterial: any;
    export const paints: any;
    export const boundaries: any;
    export const metadata: any;
    export const length: any;
    export const colorString: any;
    export const offsetX: any;
    export const offsetY: any;
    export const defaultoffsetX: any;
    export const defaultoffsetY: any;
    export const rotation: any;
    export const x: any;
    export const y: any;
    export const defaultOffsetX: any;
    export const defaultOffsetY: any;
    export const type: any;
    export const alignType: any;
    export const dist: any;
    export const z: any;
}

declare module "39234" {
    export const ContentCustomizedHandler: any;
    export const meshMatrix: any;
    export const boundingBoxData: any;
    export const meshBoundings: any;
    export const entity: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const offsetcenter: any;
    export const length: any;
    export const obj_name: any;
    export const bounding: any;
    export const size: any;
    export const ZSize: any;
    export const textureMatrix: any;
    export const scale: any;
    export const matrixWorld: any;
    export const Matrixlocal: any;
    export const MatrixdoorWorld: any;
    export const textureRotation: any;
    export const PI: any;
    export const repeaty: any;
    export const repeatx: any;
    export const offsety: any;
    export const offsetx: any;
}

declare module "39351" {
    export const PointUtil: any;
    export const length: any;
    export const id: any;
}

declare module "39562" {
    export const MaterialUtil: any;
    export const data: any;
    export const materials: any;
}

declare module "39593" {
    export const ExtraordinaryGuideline: any;
    // Original Name: n
    export class ExtraordinaryGuideline extends import("71518").ExtraordinarySketchBase {
        constructor(module: any, exports: any, require: any, i: any, n: any, ...args: any[]);
        create(module: any, exports: any, require: any, i: any, r: any): any;
        changeType(module: any): any;
    }
    export const _curve: any;
    export const _fromAnchor: any;
    export const _endAnchor: any;
    export const _type: any;
}

declare module "39646" {
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

declare module "39943" {
    export const exports: any;
}

declare module "39989" {
    export const length: any;
    export const NCustomizedModelMolding: any;
    export const NCustomizedModelMolding_IO: any;
    // Original Name: S
    export class NCustomizedModelMolding_IO extends import("14502").Molding_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
        _migrate(module: any): any;
    }
    export const parameters: any;
    export const coord: any;
    export const metaId: any;
    export const moldingId: any;
    export const metadata: any;
    export const contentTypeStr: any;
    // Original Name: E
    export class NCustomizedModelMolding extends import("14502").Molding {
        constructor(module: any, exports: any, ...args: any[]);
        init(module: any, exports: any): any;
        destroy(): any;
        getMaterialData(): any;
        dirty(module: any, exports: any): any;
        clone(): any;
        copyFrom(module: any): any;
        getGraphicsData(): any;
        getProfileFullData(): any;
        getGraphicsDataAsync(): any;
        getSweepPath3D(): any;
        getSweepProfile(module: any): any;
        getLocalCoordinate(): any;
        getBrep(module: any): any;
        getIO(): any;
        dirtyGeometry(module: any): any;
        dirtyClipGeometry(module: any): any;
        updateExistence(): any;
        copy(module: any, exports: any, require: any): any;
        getRelyerById(module: any): any;
        if(exports: any): any;
        if(exports: any, exports: any): any;
    }
    export const _graphicsData: any;
    export const signalClipDirty: any;
    export const profileSizeX: any;
    export const profileSizeY: any;
    export const contentType: any;
    export const id: any;
    export const _previewMode: any;
    export const Geometry: any;
    export const _brepcache: any;
    export const options: any;
    export const data: any;
    export const considerYRayNegate: any;
    export const profileWidth: any;
    export const profileHeight: any;
    export const materialData: any;
    export const normalTextureUrl: any;
    export const normalTexture: any;
    export const flipHorizontal: any;
    export const fpMaterialData: any;
    export const uvs: any;
    export const faceMaterialId: any;
    export const profileData: any;
    export const offsetX: any;
    export const offsetY: any;
    export const from: any;
    export const to: any;
    export const relyer: any;
    export const parent: any;
    export const flip: any;
    export const flipVertical: any;
    export const userData: any;
    export const _boundDirty: any;
    export const unioned: any;
    export const surfaceArea: any;
    export const contours: any;
    export const isLightBand: any;
    export const isLightSlot: any;
    export const isMolding: any;
    export const __parameters: any;
}

declare module "40087" {
    export const exports: any;
}

declare module "4012" {
    export const exports: any;
}

declare module "40143" {
    export const exports: any;
}

declare module "40193" {
    export enum FieldValueType {
        Constraint = 9,
        Entity = 1,
        EntityArray = 4,
        EntityMap = 2,
        KeyEntityMap = 3,
        MaterialData = 5,
        MaterialDataField = 6,
        Metadata = 10,
        State = 7,
        StateField = 8,
    }
    export const Generic: any;
    export const Entity: any;
    export const EntityMap: any;
    export const KeyEntityMap: any;
    export const EntityArray: any;
    export const MaterialData: any;
    export const MaterialDataField: any;
    export const State: any;
    export const StateField: any;
    export const Constraint: any;
    export const Metadata: any;
}

declare module "40239" {
    export const TgRoomInfo: any;
    export const _rawRoomInfo: any;
    export const _layer: any;
    export const _worldRawPath2dMap: any;
    export const order: any;
    export const _structureFaceInfos: any;
    export const length: any;
    export const _floors: any;
    export const _ceilings: any;
    export const _beamFaces: any;
}

declare module "40269" {
    export const Flag: any;
}

declare module "40295" {
    export const FaceMoldingFitHelper: any;
    // Original Name: n
    export class FaceMoldingFitHelper {
        constructor(...args: any[]);
        startListening(module: any): any;
        autoFit(): any;
        stopAllListening(): any;
        getInstance(): any;
    }
    export const _changedFaces: any;
    export const signals: any;
    export const _instance: any;
}

declare module "40504" {
    export const EdgeUtil: any;
    export const z: any;
    export const from: any;
    export const to: any;
}

declare module "40579" {
    export const length: any;
    export const PointState: any;
    // Original Name: a
    export class PointState extends import("18439").State {
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
    export const z: any;
    export const Class: any;
}

declare module "4061" {
    export const exports: any;
}

declare module "40747" {
    export const length: any;
    export const TexturePaveTypeEnum: any;
    export const Material_IO: any;
    export const MaterialIdEnum: any;
    export const Material: any;
    export const local: any;
    export const generated: any;
    export const customized: any;
    export const modelMaterial: any;
    export const stretch: any;
    export const tile: any;
    export const mirror: any;
    export const random: any;
    export const notSpecify: any;
    // Original Name: y
    export class Material_IO extends import("24567").Entity_IO {
        instance(): any;
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
        fixPaintDataForLoading(module: any): any;
    }
    export const _Material_IO_instance: any;
    export const seekId: any;
    export const name: any;
    export const categoryId: any;
    export const productsMap: any;
    export const textureURI: any;
    export const textureURIDefault: any;
    export const iconSmallURI: any;
    export const iconLargeURI: any;
    export const color: any;
    export const colorMode: any;
    export const blendColor: any;
    export const tileSize_x: any;
    export const tileSize_y: any;
    export const initTileSize_x: any;
    export const initTileSize_y: any;
    export const rotation: any;
    export const textureRotation: any;
    export const offsetX: any;
    export const offsetY: any;
    export const flipX: any;
    export const flipY: any;
    export const normalTexture: any;
    export const normalTileSize_x: any;
    export const normalTileSize_y: any;
    export const seamFillerSupported: any;
    export const seamWidth: any;
    export const seamColor: any;
    export const isTransparent: any;
    export const seamMaterial: any;
    export const alignType: any;
    export const mixpaint: any;
    export const _seekId: any;
    export const __textureURI: any;
    export const __textureURIDefault: any;
    export const __iconSmallURI: any;
    export const __iconLargeURI: any;
    export const __color: any;
    export const __colorMode: any;
    export const __blendColor: any;
    export const __tileSize_x: any;
    export const __tileSize_y: any;
    export const __initTileSize_x: any;
    export const __initTileSize_y: any;
    export const __rotation: any;
    export const __offsetX: any;
    export const __offsetY: any;
    export const __normalTexture: any;
    export const __normalTileSize_x: any;
    export const __normalTileSize_y: any;
    export const __seamFillerSupported: any;
    export const __seamColor: any;
    export const __seamWidth: any;
    export const useColor: any;
    export const __seamMaterial: any;
    export const paintData: any;
    export const _refPatterns: any;
    export const __materialData: any;
    // Original Name: C
    export class Material extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        getUniquePolygon(): any;
        createUniquePolygon(module: any, exports: any, require: any): any;
        destroy(): any;
        dirtyForUpdate(module: any): any;
        _setMixpaint(module: any): any;
        create(module: any): any;
        verify(): any;
        initByMeta(module: any): any;
        getDumpData(module: any): any;
        copyFrom(module: any): any;
        clone(): any;
        cloneDeep(): any;
        isSame(module: any): any;
        isCatalogMaterial(): any;
        isUvTransformd(): any;
        isUvTransformed(): any;
        setUvTransform(module: any): any;
        resetUvTransform(): any;
        isSameUvTransform(module: any): any;
        updateData(module: any): any;
        set(module: any, exports: any): any;
        getRawMaterialData(): any;
        getMaterialData(): any;
        getMaterialDataForFGI(): any;
        getIO(): any;
        isRoot(): any;
        refreshBoundInternal(): any;
        onMixPaintPatternChanged(module: any): any;
        dirtyGussetSurface(): any;
        _updateVersion(): any;
        saveToJSON(module: any): any;
        jsonToDumpData(module: any): any;
        canTransactField(): any;
    }
    export const __isTransparent: any;
    export const __scalingTileSize_x: any;
    export const __scalingTileSize_y: any;
    export const __percentOffsetX: any;
    export const __percentOffsetY: any;
    export const userDefined: any;
    export const signalDirtyForUpdate: any;
    export const __version: any;
    export const __versionOfMatDataCreated: any;
    export const backgroundMaterial: any;
    export const faceEntity: any;
    export const faceId: any;
    export const _mixpaint: any;
    export const blend: any;
    export const metadata: any;
    export const __metadata: any;
    export const scalingTileSize_x: any;
    export const scalingTileSize_y: any;
    export const textureUrl: any;
    export const paints: any;
    export const pattern: any;
    export const pinhua: any;
}

declare module "40884" {
    export const ContentClipper: any;
    export const content: any;
    export const length: any;
    export const z: any;
    export const entity: any;
    export const entityId: any;
    export const x: any;
    export const y: any;
}

declare module "41086" {
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
    export const paramData: any;
    // Original Name: Hole
    export class Hole extends opening_1.Opening {
        constructor(e: any, t: any, ...args: any[]);
        create(e: any): any;
        initByMeta(e: any, t: any, o: any, i: any): any;
        getMetadataFilterKeys(): any;
        getIO(): any;
        canAddPocket(): any;
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
    export const z: any;
}

declare module "41464" {
    export const length: any;
    export const WallSurfaceTypeEnum: any;
    export const WallTypeEnum: any;
    export const WallFlagEnum: any;
    export const WallFaceType: any;
    export const Wall_IO: any;
    export const Wall: any;
    export const WallMode: any;
    export const Inner: any;
    export const Middle: any;
    export const Outer: any;
    export const dimensionOff: any;
    export const hoverOn: any;
    export const clickOn: any;
    export const heightEditable: any;
    export const transparent: any;
    export const disableAutoConnect: any;
    export const dragOn: any;
    export const left: any;
    export const right: any;
    export const top: any;
    export const bottom: any;
    export const front: any;
    export const back: any;
    export const generic: any;
    export const gypsum_generic: any;
    export const brick_generic: any;
    export const concrete: any;
    export const inner: any;
    export const outer: any;
    export const from: any;
    export const to: any;
    export const outerfrom: any;
    export const outerto: any;
    // Original Name: v
    export class Wall_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
        migrateLoad(module: any, exports: any, require: any): any;
    }
    export const width: any;
    export const height3d: any;
    export const wallType: any;
    export const isLoadBearing: any;
    export const curve: any;
    export const mode: any;
    export const __path: any;
    export const path: any;
    export const __crossPath: any;
    export const crossPath: any;
    export const userData: any;
    export const c: any;
    export const data: any;
    // Original Name: b
    export class Wall extends import("24567").Entity {
        getIO(): any;
        constructor(module: any, exports: any, ...args: any[]);
        createLineWall(module: any, exports: any, require: any, i: any, n: any, r: any, s: any, l: any): any;
        createArcWall(module: any, exports: any, require: any, i: any, n: any, r: any, s: any, l: any, c: any, d: any): any;
        create(module: any, exports: any, require: any, i: any, n: any, r: any, a: any): any;
        clone(): any;
        map(): any;
    }
    export const __fromPoint: any;
    export const __toPoint: any;
    export const __midPoint: any;
    export const id: any;
    export const isAux: any;
    export const type: any;
    export const x: any;
    export const y: any;
    export const tag: any;
    export const __rawPath: any;
    export const wallInfos: any;
    export const wall: any;
    export const pointType: any;
    export const outerWallSide: any;
    export const wallInfo: any;
    export const size: any;
}

declare module "41500" {
    export const tryFixMultiParentsData: any;
    export const segment3dToPoints: any;
    export const pointsToLine3ds: any;
    export const loadSegment2D: any;
    export const loadSegment3D: any;
    export const type: any;
    export const length: any;
}

declare module "4155" {
    export const type: any;
    export const target: any;
    export const index: any;
    export const kind: any;
    export const exports: any;
    export const Arguments: any;
}

declare module "41607" {
    export const CustomizedFeatureModelUtil: any;
    export const ignoreGenerateBrep: any;
    export const convert3dMatrix: any;
    export const content: any;
    export const keepBackgroundCurve: any;
    export const hasBackground: any;
    export const length: any;
    export const patterns: any;
    export const path: any;
    export const faceMeshName: any;
    export const faceMeshNames: any;
    export const relativeIndices: any;
    export const lightSlotId: any;
    export const validateNormal: any;
    export const validateNormals: any;
    export const lightBandId: any;
    export const wholePath: any;
    export const moldingId: any;
    export const faceGroupId: any;
    export const mixpaint: any;
    export const size: any;
    export const backgroundFaceNormal: any;
    export const backgroundNormal_molding: any;
    export const pathCoedge3dsTags: any;
    export const faceTag: any;
    export const relyerId: any;
    export const parameters: any;
    export const material: any;
    export const defaultmaterialmap: any;
    export const facematerialmap: any;
}

declare module "41685" {
    export const length: any;
    export const RoofsDrawing: any;
    export class d extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const gls: any;
    export const bkgSketchData: any;
    // Original Name: h
    export class RoofsDrawing extends import("24567").Entity {
        getIO(): any;
        destroy(): any;
        getBuilder(): any;
        clearBuilder(): any;
        getSketch(): any;
        setSketch(module: any): any;
        updateSketch(module: any): any;
        getDrawingRegionByRoofId(module: any): any;
        initDrawingRegionsByRoofs(module: any): any;
        isValid(): any;
    }
    export const _bkgSketchBuilder: any;
    export const roofId: any;
}

declare module "41861" {
    export const LogObject: any;
    export const Logger: any;
    export const LogLevelEnum: any;
    export const perf: any;
    export const debug: any;
    export const info: any;
    export const warning: any;
    export const error: any;
    // Original Name: a
    export class Logger {
        constructor(...args: any[]);
        setLevel(e: any): any;
        logger(e: any): any;
        setDefaultConsole(e: any): any;
        getLogObject(e: any): any;
        setCollector(e: any): any;
    }
    export const enabled: any;
    export const level: any;
    export const loggerMap: any;
    export const addProcessor: any;
    export const processors: any;
    export const removeProcessor: any;
    export const console: any;
    export const collector: any;
    export const instance: any;
    // Original Name: s
    export class LogObject {
        constructor(e: any, t: any, ...args: any[]);
        debug(e: any): any;
        info(e: any, t: any): any;
        warning(e: any, t: any): any;
        error(e: any, t: any, i: any): any;
        assert(e: any, t: any, i: any): any;
        _log(e: any, t: any, n: any, r: any): any;
        time(e: any): any;
        timeEnd(e: any, t: any): any;
        _logPerf(e: any, t: any): any;
    }
    export const _logger: any;
    export const _perfMap: any;
    export const category: any;
    export const silence: any;
    export const size: any;
}

declare module "41881" {
    export const Door_IO: any;
    export const Door: any;
    // Original Name: s
    export class Door_IO extends import("85689").Opening_IO {
        load(module: any, exports: any, require: any): any;
    }
    // Original Name: l
    export class Door extends import("85689").Opening {
        constructor(module: any, ...args: any[]);
        getIO(): any;
        open(module: any): any;
        close(): any;
        getDoorOffset(): any;
        canOpen(): any;
        _getAxisInfo(): any;
        updateOpenStatus(module: any): any;
    }
    export const topView: any;
    export const Resources: any;
    export const __isOpened: any;
    export const isOpened: any;
    export const metadata: any;
    export const length: any;
    export const __angle: any;
    export const __anchorAxis: any;