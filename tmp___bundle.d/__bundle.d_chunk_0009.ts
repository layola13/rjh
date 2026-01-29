    export const roomArea: any;
    export const type: any;
    export const meshDefs: any;
    export const objects: any;
}

declare module "5584" {
    export const VolumeLightOption: any;
    // Original Name: o
    export class VolumeLightOption {
        constructor(e: any, t: any, o: any, ...args: any[]);
        dump(): any;
        load(e: any): any;
        clone(): any;
    }
    export const density: any;
    export const scatteringMultiplier: any;
    export const enable: any;
}

declare module "55921" {
    export const LightSubGroupCompareUtil: any;
    export const SpotPhysicalLightSubGroupMemberProperties: any;
    export const PhysicalLightSubGroupMemberProperties: any;
    export const MeshLightSubGroupMemberProperties: any;
    export const VirtualAreaLightSubGroupMemberProperties: any;
    export const FlatLightSubGroupMemberProperties: any;
    export const AttenuatedSpotLightSubGroupMemberProperties: any;
    export const SpotLightSubGroupMemberProperties: any;
    export const PointLightSubGroupMemberProperties: any;
    export const GeneralLightSubGroupMemberProperties: any;
    // Original Name: n
    export class GeneralLightSubGroupMemberProperties {
        constructor(...args: any[]);
    }
    export const z: any;
    export const close: any;
    export const affectSpecular: any;
    export const intensity: any;
    export const rotation: any;
    export const temperature: any;
    export const rgb: any;
    export const volumeLight: any;
    export const radius: any;
    export class r extends GeneralLightSubGroupMemberProperties {
        constructor(...args: any[]);
    }
    export const XRotation: any;
    export const YRotation: any;
    export const ZRotation: any;
    // Original Name: a
    export class SpotLightSubGroupMemberProperties extends r {
        constructor(...args: any[]);
    }
    export const IES: any;
    export const nearAttenuationStart: any;
    export const nearAttenuationEnd: any;
    export const farAttenuationStart: any;
    export const farAttenuationEnd: any;
    export const hotspotAngle: any;
    export const falloffAngle: any;
    // Original Name: s
    export class VirtualAreaLightSubGroupMemberProperties extends r {
        constructor(...args: any[]);
    }
    export const width: any;
    export const height: any;
    export const double_flat: any;
    // Original Name: l
    export class LightSubGroupCompareUtil {
        constructor(...args: any[]);
    }
    export const setPropertyByValue: any;
    export const updateProperty: any;
    export const length: any;
}

declare module "55944" {
    export const DWindow: any;
    // Original Name: a
    export class DWindow extends import("21766").DHole {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        onInit(): any;
        createSillObject(module: any): any;
        onChildAdded(module: any): any;
    }
    export const childNodes: any;
}

declare module "55949" {
    export const getSurfaceMeta: any;
    export const getBackgroundPath: any;
}

declare module "55995" {
    export const SignalHook: any;
    export const SignalEvent: any;
    export const Signal: any;
    export const _signalSet: any;
    export const _signalHookSet: any;
    export const _currentAddSignalSet: any;
    export const _currentAddSignalHookSet: any;
    export const _currentDisposedSignalSet: any;
    export const _currentDisposedSignalHookSet: any;
    export const _id: any;
    // Original Name: a
    export class Signal {
        constructor(module: any, ...args: any[]);
        addGlobalDispatchCondition(module: any): any;
        removeGlobalDispatchCondition(module: any): any;
        clearGlobalDispatchConditions(): any;
        disable(): any;
        enable(): any;
        dispatch(module: any): any;
        listen(module: any, exports: any): any;
        unlisten(module: any, exports: any): any;
        unlistenAll(): any;
        dispose(): any;
    }
    export const _eventsCallback: any;
    export const defaultTarget: any;
    export const _disposed: any;
    export const length: any;
    export const _disabled: any;
    export const fn: any;
    export const thisTarget: any;
    export const s_conditions: any;
    // Original Name: s
    export class SignalEvent {
        constructor(module: any, exports: any, ...args: any[]);
    }
    export const type: any;
    export const target: any;
    export const currentTarget: any;
    export const data: any;
    export const listenerToCallbackFn: any;
    export const groupMap: any;
    export const _defaultListernerScope: any;
}

declare module "56022" {
    export const DocCrypto: any;
}

declare module "56066" {
    export const length: any;
    export const HoleBuilder: any;
    export const HoleBuilder_IO: any;
    export const HoleExtrudeType: any;
    export const Bottom: any;
    export const Top: any;
    export const Side: any;
    // Original Name: L
    export class HoleBuilder_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const fM: any;
    export const holes: any;
    export const faceMap: any;
    export const _holes: any;
    // Original Name: F
    export class HoleBuilder extends import("24567").Entity {
        isRoot(): any;
        getIO(): any;
        getOpeningHelper(module: any): any;
        constructor(module: any, exports: any, ...args: any[]);
        getHole(module: any): any;
        _handleOpening(module: any, exports: any): any;
        _handleWallCollectMap(module: any, exports: any): any;
    }
    export const _layer: any;
    export const _removeHoleSet: any;
    export const sourceId: any;
    export const id: any;
    export const type: any;
    export const OpeningHole: any;
    export const paths: any;
    export const surfaceObj: any;
    export const coEdge: any;
    export const holeId: any;
    export const sameDirWithSurface: any;
    export const source: any;
    export const Slab: any;
    export const bizType: any;
    export const outers: any;
    export const wallIds: any;
    export const outer: any;
    export const size: any;
    export const selfHoles: any;
    export const updateHoleFaceIds: any;
    export const brotherDataSources: any;
    export const isBottom: any;
    export const observeCoEdgeTopoNameIds: any;
    export const s: any;
    export const require: any;
    export const i: any;
    export const d: any;
    export const masterId: any;
    export const IN: any;
    export const const: any;
    export const brepFace: any;
    export const mustExist: any;
    export const results: any;
    export const visiables: any;
    export const connectHoleTopoFaces: any;
    export const topoFaces: any;
    export const thickness: any;
    export const z: any;
    export const index: any;
    export const finalKey: any;
}

declare module "56161" {
    export const getArchHoleProfile: any;
    export const getValidParams: any;
    export const h: any;
}

declare module "56214" {
    export const NCustomizedRiser: any;
    export const NCustomizedRiser_IO: any;
    // Original Name: a
    export class NCustomizedRiser_IO extends import("73858").NCustomizedStructre_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    // Original Name: s
    export class NCustomizedRiser extends import("73858").NCustomizedStructure {
        constructor(module: any, ...args: any[]);
        initByMeta(module: any): any;
        setStructureMode(module: any): any;
        calcProfile(module: any): any;
        newSelf(): any;
        getIO(): any;
    }
    export const structureMode: any;
    export const ZLength: any;
    export const XSize: any;
    export const userData: any;
    export const YSize: any;
    export const length: any;
}

declare module "56276" {
    export const exports: any;
}

declare module "56405" {
    export const length: any;
    export const ParametricDoor: any;
    export const ParametricDoor_IO: any;
    // Original Name: u
    export class ParametricDoor_IO extends import("7325").ParametricOpening_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const doorStoneMaterialEnabled: any;
    export const swing: any;
    export const isDefaultAlign: any;
    export const bottomFaceMaterialId: any;
    export const _bottomFaceMaterial: any;
    export const bottomFaceMaterial: any;
    export const faceEntity: any;
    // Original Name: g
    export class ParametricDoor extends import("7325").ParametricOpening {
        create(module: any): any;
        constructor(module: any, exports: any, ...args: any[]);
        _onDoorStoneMaterialStatusChanged(): any;
        getFinalZRotation(): any;
        setBottomFaceMaterial(module: any): any;
        getBottomFaceMaterial(): any;
        _setBottomFaceMaterial(module: any): any;
        getConnectFloors(module: any): any;
        toggleDoorStoneAlignSide(): any;
        getDoorStoneAlignSideStatus(): any;
        _onDefaultAlignChanged(module: any, exports: any): any;
        getBottomFace(): any;
        getDoorStoneFace(): any;
        getZeroHeightBottomFace(): any;
        getRefreshFloors(module: any): any;
        isDoorStoneMaterialEnabled(): any;
        setDoorStoneMaterialStatus(module: any): any;
        updateFaceMixPaint(module: any): any;
        getPocket(): any;
        offsetOpeningCutPath(module: any, exports: any, require: any): any;
        getFaceHoleBottomProfile(): any;
        onSwingChanged(): any;
        _updateFaceMixpaint(module: any): any;
        getPocketWidth(module: any): any;
        getBaseboardCutterInfo(module: any): any;
        getIO(): any;
    }
    export const __doorStoneMaterialEnabled: any;
    export const __isDefaultAlign: any;
    export const __ZRotation: any;
    export const material: any;
    export const id: any;
    export const z: any;
}

declare module "56599" {
    export const length: any;
    export const WindowSillSideType: any;
    export const WindowSill_IO: any;
    export const WindowSill: any;
    export const INNER: any;
    export const OUTER: any;
    export const DOUBLE: any;
    // Original Name: l
    export class WindowSill_IO extends import("82060").ExtrudedBody_IO {
    }
    // Original Name: c
    export class WindowSill extends import("82060").ExtrudedBody {
        constructor(module: any, exports: any, ...args: any[]);
        initByParameters(module: any): any;
        getIO(): any;
    }
    export const direction: any;
    export const points: any;
    export const moldingIndices: any;
    export const moldingFlip: any;
    export const side: any;
    export const extendValue: any;
    export const secondExtendValue: any;
}

declare module "57027" {
    export const length: any;
    export const Shape_IO: any;
    export const Shape: any;
    // Original Name: h
    export class Shape extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        copyFrom(module: any): any;
        setMaterial(module: any): any;
        getPattern(): any;
        setPattern(module: any): any;
        _setPattern(module: any, exports: any): any;
        _onPatternChanged(module: any): any;
        onPatternSeamWidthChange(): any;
        updateMixGrid(): any;
        onPatternDirty(module: any): any;
        onPatternReset(module: any): any;
        onPatternResetOverride(module: any): any;
        getDefaultPavingPos(): any;
        isDefaultPavingPoint(): any;
        setPavingOptionArgs(module: any): any;
        resetPavingOption(): any;
        bounding(): any;
        setOriginPoints(module: any): any;
        getMixpaint(): any;
        partOfGrid(): any;
        clear(module: any): any;
        destroy(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
    }
    export const _material: any;
    export const _pattern: any;
    export const pattern: any;
    export const _pavingOption: any;
    export const originPoints: any;
    export const _patternDirtySignalHook: any;
    export const _patternResetSignalHook: any;
    export const _patternResetOverrideSignalHook: any;
    export const _patternSeamWidthChangeHook: any;
    export const material: any;
    export const polygon: any;
    export const type: any;
    export const pavingOption: any;
    export const metadata: any;
    export const id: any;
    // Original Name: u
    export class Shape_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
    }
    export const textureURI: any;
    export const colorMode: any;
    export const color: any;
    export const textureURIDefault: any;
    export const invalidIds: any;
}

declare module "57278" {
    export const WallFaceAssembly: any;
    // Original Name: u
    export class WallFaceAssembly extends import("71153").SpaceAssembly {
        create(module: any): any;
        _refreshSizeAndPosition(): any;
    }
    export const length: any;
    export const bound: any;
    export const x: any;
    export const y: any;
    export const _size: any;
    export const _position: any;
}

declare module "57362" {
    export const LayerSketch2dBuilder: any;
    // Original Name: l
    export class LayerSketch2dBuilder extends import("77756").ExtraordinarySketch2dBuilder {
        constructor(module: any, ...args: any[]);
        generateSketch(module: any, exports: any, require: any): any;
        update(module: any, exports: any, require: any): any;
        updateAppendix(): any;
        updateLayer(): any;
        _getPreBuildFaceRegions(module: any): any;
        _completeUpdate(): any;
        _updateSlabs(): any;
        _extractSlabHoles(): any;
        _extractSlabProfile(): any;
        _establishHoleFaceMap(module: any): any;
    }
    export const layer: any;
    export const faceHoleIDMp: any;
    export const _sketch2d: any;
    export const slabSketch2dHoles: any;
    export const slabSketch2dGuildLines: any;
    export const HoleTopoTag: any;
}

declare module "57678" {
    export const ParametricDoorWindowSystemVariablesName: any;
    export const CustomizationContentType: any;
    export const Resources: any;
    export const Config: any;
    export const RenderLight: any;
    export const Render: any;
    export const Position: any;
    export const GraphicsObjectType: any;
    export const RequestType: any;
    export const ClassSNameToLName: any;
    export const ClassLNameToSName: any;
    export const ModelClass: any;
    export const ColorModeEnum: any;
    export const Constants: any;
}

declare module "57983" {
    export const exports: any;
}

declare module "58" {
    export const SketchHelper: any;
    // Original Name: c
    export class SketchHelper {
        sketchFace2BrepShell(module: any): any;
        extract3DFaceCurvesFromSketch(module: any): any;
        sketchFace2BrepFace(module: any): any;
        sketchCurve2MathCurve3d(module: any): any;
        matchCurve(module: any, exports: any, require: any): any;
        getInstance(): any;
        constructor(...args: any[]);
    }
    export const addShells: any;
    export const userData: any;
    export const x: any;
    export const length: any;
    export const dist: any;
    export const clockwise: any;
    export const _instance: any;
    export const SketchTolerance: any;
}

declare module "58206" {
    export const exec: any;
}

declare module "58224" {
    export const FaceUtil: any;
    export const edge: any;
    export const from: any;
    export const to: any;
    export const length: any;
    export const width: any;
    export const thickness: any;
    export const z: any;
    export const rotation: any;
    export const PI: any;
    export const x: any;
    export const y: any;
    export const XRotation: any;
}

declare module "58317" {
    export const VertexTxnState: any;
    // Original Name: r
    export class VertexTxnState extends import("72664").EntityTxnState {
        constructor(module: any, exports: any, ...args: any[]);
        postRestore(module: any, exports: any): any;
    }
}

declare module "58588" {
    export const exports: any;
}

declare module "58869" {
    export const exports: any;
}

declare module "59130" {
    export const length: any;
    export const WallJoint_IO: any;
    export const WallJointManager: any;
    export const JointPointType: any;
    export const WallLinkInfo: any;
    export const WallJoint: any;
    export const from: any;
    export const to: any;
    export const between: any;
    // Original Name: p
    export class WallLinkInfo {
        constructor(module: any, ...args: any[]);
        resetPath(): any;
        mirror(): any;
    }
    export const wall: any;
    export const _floorplan: any;
    export const tr: any;
    export const tl: any;
    export const fl: any;
    export const fr: any;
    export const toPath: any;
    export const fromPath: any;
    export const width: any;
    // Original Name: f
    export class WallJointManager extends import("24567").Entity {
        constructor(...args: any[]);
        addJoint2Wall(module: any, exports: any): any;
        removeJointFromWall(module: any, exports: any): any;
        removeWall(module: any): any;
        removeWallJoints(module: any): any;
        getWallJoints(module: any): any;
        getWallFromJoint(module: any): any;
        getWallFromJoints(module: any): any;
        getWallToJoint(module: any): any;
        getWallToJoints(module: any): any;
        getWallEndJoint(module: any, exports: any, require: any): any;
        getWallEndJoints(module: any, exports: any, require: any): any;
        getWallBetweenJoints(module: any): any;
        getWallLink(module: any): any;
        clear(): any;
        doLoad(module: any, exports: any): any;
        doDump(module: any, exports: any, require: any): any;
        _log(module: any, exports: any): any;
        isRoot(): any;
    }
    export const _wallJointMap: any;
    export const _wallLink: any;
    export const type: any;
    export const exclude: any;
    export const order: any;
    export const _wallJointsCache: any;
    // Original Name: m
    export class WallJoint_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const sWall: any;
    export const wallInfos: any;
    export const od: any;
    // Original Name: y
    export class WallJoint extends import("24567").Entity {
        create(module: any): any;
        constructor(module: any, ...args: any[]);
        isRoot(): any;
        getIO(): any;
        addWall(module: any, exports: any): any;
        removeWall(module: any): any;
        getWallPointType(module: any): any;
        getLinkWallInfo(module: any): any;
        _updateWallInfos(module: any): any;
        updateWallInfos(module: any): any;
        destroy(): any;
    }
    export const __wallInfos: any;
}

declare module "59145" {
    export const getDistToLine: any;
    export const segmentSegmentIntersection: any;
    export const isSegmentInSideSegment: any;
    export const isPolygonInSidePolygon: any;
    export const getIntersectionInfo: any;
    export const lineLineIntersection: any;
    export const isPoint2dLeft: any;
    export const isParallel: any;
    export const rotatePointCW: any;
    export const lineLineAngleCCW: any;
    export const lineLineAngle: any;
    export const getAngleCCW: any;
    export const getAngleCW: any;
    export const getAngleHorizontaleCCW: any;
    export const getCrossValue: any;
    export const decomposeAxis: any;
    export const reverseCurve: any;
    export const transformCurve: any;
    export const transformCenterPoint: any;
    export const transformPoint: any;
    export const getDistance3: any;
    export const getDistance: any;
    export const isSamePoint3: any;
    export const isSamePoint: any;
    export const rectIntersection: any;
    export const PlaneProjector: any;
    export const Line: any;
    export const Vec2: any;
    export const Rotate: any;
    export const standardAngle: any;
    export const modulo: any;
    export const clamp: any;
    export const toRadians: any;
    export const toDegrees: any;
    export const lerp: any;
    export const isValidPoint: any;
    export const randomInRange: any;
    export const random: any;
    export const roundToTolerance: any;
    export const roundToPowerOf2: any;
    export const toPersistentPrecision: any;
    export const isZero: any;
    export const nearlyEquals: any;
    export const Pi2: any;
    export const BoundingBox2D: any;
    export const isDef: any;
    export const isValidNumber: any;
    export const isNumber: any;
    export const defaultTolerance: any;
    export const precisionDigits: any;
    export const isSegmentsProjectionOverlapped: any;
    export const isSamePolygon2D: any;
    export const isSamePolygon: any;
    export const isSamePolygonEx: any;
    export const scalePoint: any;
    export const pointLength: any;
    export const raySegmentIntersection: any;
    export const isPointOnPolygonEdge: any;
    export const isPointOnPolygon: any;
    export const isSegmentIntersectedWithPolygon: any;
    export const isPolygonOverlapped: any;
    export const isPathContainsPath: any;
    export const getClosestSegmentPoint: any;
    export const closestDistanceToSegment: any;
    export const closestPolygonToPoint: any;
    export const closestPointToPolygon: any;
    export const closestDistanceToPolygon3D: any;
    export const closestDistanceToPolygon: any;
    export const lineSegmentIntersection: any;
    export const getPointInPolygonWithHoles: any;
    export const isPointInPolygonWithHoles: any;
    export const isPointInPolygon: any;
    export const isLineSegmentIntersectPolygons: any;
    export const isLineSegmentInPolygonsOutline: any;
    export const isPathInPolygonWithHole: any;
    export const isLineSegmentInPolygonWithHole: any;
    export const isPointInPolygonWithHolesFast: any;
    export const isPointInPolygonFast: any;
    export const AreaOfPolygon: any;
    export const isPointInLineSegment: any;
    export const isClockwise: any;
    export const getMassProperties: any;
    export const getNearestParallelAngle: any;
    export const getPerpendicularIntersectExt: any;
    export const getPerpendicularIntersect: any;
    export const closestDistance: any;
    export const isPointOnLineSegment: any;
    export const isPointInLine: any;
    export const isSameLineSegment: any;
    export const isSameLine: any;
    export const getLerpPoint: any;
    export const getLerpNumber: any;
    export const isSegmentsConnected: any;
    export const getOverlappedRange: any;
    export const getOverlappedSegment: any;
    export const isSegmentsOverlapped: any;
    export const removeDuplicatePoints: any;
    export const isPointOnCurve: any;
    export const getClosetDistLineToPoint: any;
    export const getClosestDistLineToPoint: any;
    export const cubicRoots: any;
    export const squareRoots: any;
    export const getCircleFromThreePoints: any;
    export const flip: any;
    export const splitConcavePolygon: any;
    export const simplifyPolygon: any;
    export const numberInRange: any;
    export const isPointIn: any;
    export const isPointInPoly: any;
    export const isPointInLoops: any;
    export const isPointOnSeg: any;
    export const getLineCurves: any;
    export const nearlyEqualsPoint: any;
    export const findDotsAtSegment: any;
    export const bezlen: any;
    export const base3: any;
    export const getPlaneProjectionMatrix: any;
    export const getPolygonProjectionPlane: any;
    export const getCoordTransfMatrix: any;
    export const getDistancePointOnPath: any;
    export const getPointDistanceOnPath: any;
    export const getClosestPointOfSegment: any;
    export const polygonCenter: any;
    export const mergePaths: any;
    export const getCentralLineOfLineSegment: any;
    export const computeOutline: any;
    export const isPolygonInBound: any;
    export const getBounds: any;
    export const getPolygonPerimeter: any;
    export const checkIsRect: any;
    export const isPerpendicular: any;
    export const snapAngle: any;
    export const getLineAngle: any;
    export const isInRange: any;
    export const isPolygonInPolygonFast: any;
    export const isPolygonInPolygon: any;
    export const isPointInPath: any;
    export const isPolygonOnPolygon: any;
    export const isPointsOnSameSide: any;
    export const isSegmentsIncluded: any;
    export const isSameDirection: any;
    // Original Name: l
    export class BoundingBox2D {
        constructor(module: any, exports: any, require: any, i: any, ...args: any[]);
        create(module: any, exports: any, require: any, i: any): any;
        getPolygon(module: any): any;
        getBound(module: any): any;
        isValid(module: any): any;
        appendBound(module: any, exports: any): any;
        appendPoint(module: any, exports: any): any;
    }
    export const min: any;
    export const max: any;
    export const x: any;
    export const y: any;
    // Original Name: m
    export class Vec2 extends THREE.Vector2 {
        magnitude(): any;
        subtract(module: any): any;
        invert(): any;
        normalize(): any;
        squaredMagnitude(): any;
        scale(module: any): any;
        rotate(module: any, exports: any): any;
        rotateDegrees(module: any, exports: any): any;
        difference(module: any, exports: any): any;
        dot(module: any, exports: any): any;
        fromCoordinate(module: any): any;
        rotateAroundPoint(module: any, exports: any, require: any): any;
        distance(module: any, exports: any): any;
        equals(module: any, exports: any): any;
        sum(module: any, exports: any): any;
        sub(module: any, exports: any): any;
        lerp(module: any, exports: any, require: any): any;
        cross(module: any): any;
    }
    // Original Name: y
    export class Line {
        constructor(module: any, exports: any, require: any, i: any, ...args: any[]);
        getSegmentLengthSquared(): any;
        getSegmentLength(): any;
        getInterpolatedPoint(module: any): any;
        getClosestPoint(module: any, exports: any): any;
        getClosestLinearInterpolation_(module: any, exports: any): any;
        getClosestSegmentPoint(module: any, exports: any): any;
    }
    export const x0: any;
    export const y0: any;
    export const x1: any;
    export const y1: any;
    export const length: any;
    export const xDir: any;
    export const yDir: any;
    export const zDir: any;
    export const zeroPoint: any;
    export const dirX: any;
    export const dirY: any;
    export const left: any;
    export const top: any;
    export const radius: any;
    export const clockwise: any;
    export const xRay: any;
}

declare module "59199" {
    export const length: any;
    export const ConcealedWorkLightLogic: any;
    export const ConcealedWorkLightLogic_IO: any;
    // Original Name: s
    export class ConcealedWorkLightLogic_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const rlts: any;
    export const displayName: any;
    export const dpn: any;
    export const relations: any;
    // Original Name: l
    export class ConcealedWorkLightLogic extends import("24567").Entity {
        constructor(...args: any[]);
        getIO(): any;
    }
}

declare module "59256" {
    export const TgSlabUtil: any;
    // Original Name: E
    export class TgSlabUtil {
        updateLayersSlabAfterStructureChanged(module: any, exports: any, require: any, i: any, n: any): any;
        updateFloorSlabsAfterSketch2dChanged(module: any, exports: any, require: any, i: any): any;
        updateCeilingSlabsAfterSketch2dChanged(module: any, exports: any): any;
        updateCeilingAfterBeamChanged(module: any): any;
        updateLayerSlabFaces(module: any, exports: any): any;
        _udpateSlabHole(module: any, exports: any): any;
        _createOrUpdateSlabSideFaces(module: any, exports: any): any;
        getLayerFloorSlabPaths(module: any): any;
        getSlabRealPaths(module: any, exports: any): any;
        addSketchHolesToPolygon(module: any, exports: any): any;
        getSlabRealPath(module: any, exports: any): any;
        getSlabRawPath(module: any): any;
        getLayerFloorSlabRawPaths(module: any): any;
        getLayerTopRoomPaths(module: any): any;
        getLayerBottomRoomPaths(module: any, exports: any): any;
        getShellWrapper(module: any, exports: any, require: any): any;
        getLayerSlabAutoRegions(module: any): any;
        getLayerCeilingSlabAutoRegionsByIntersectCeilingRegion(module: any, exports: any): any;
        getLayerSlabRegionsInfo(module: any): any;
        getSlabMaxPath(module: any, exports: any, require: any): any;
        getOutdoorSlabPaths(module: any): any;
        getSlabShell(module: any, exports: any, require: any): any;
        getOutdoorSlabShells(module: any): any;
        getEditedSlabShells(module: any, exports: any): any;
        matchRoomRegionSplitCurves(module: any, exports: any): any;
        _getSlabRegionsAfterStructureChanged(module: any, exports: any, require: any): any;
        _updateLayerFloorSlabs(module: any, exports: any, require: any): any;
        tmp(module: any): any;
        _updateSlabAndFaces(module: any, exports: any, require: any, i: any, n: any): any;
        updateSlabProfile(module: any, exports: any, require: any): any;
        _createSlabProfile(module: any): any;
        _createOrUpdateSlabTopBottomFaces(module: any, exports: any, require: any, i: any, n: any): any;
        _setSlabFacesByBrepFaces(module: any, exports: any, require: any, i: any, n: any, s: any): any;
        _createOrUpdateSlabFace(module: any, exports: any, require: any, i: any, c: any, d: any, g: any, m: any, _: any): any;
        W: any;
        m: any;
        constructor(...args: any[]);
    }
    export const Yes: any;
    export const mirrorBuilding: any;
    export const length: any;
    export const profile: any;
    export const entity: any;
    export const userData: any;
    export const autoLoop: any;
    export const holes: any;
    export const path: any;
    export const size: any;
    export const roomRegionList: any;
    export const slabChangedFacesMap: any;
    export const baseProfile: any;
    export const y: any;
    export const x: any;
    export const bottom: any;
    export const height: any;
    export const s: any;
    export const require: any;
    export const i: any;
    export const d: any;
    export const mixpaint: any;
    export const faceEntity: any;
    export const material: any;
    export const OUT: any;
    export const id: any;
    export const top: any;
}

declare module "5932" {
    export const PAssemblyFilter: any;
}

declare module "59468" {
    export const exports: any;
}

declare module "59573" {
    export const exports: any;
}

declare module "5980" {
    export const VerticalLayout: any;
    export const minToMax: any;
    export const maxToMin: any;
    // Original Name: l
    export class VerticalLayout extends import("45066").Layout {
        constructor(...args: any[]);
        getClassName(): any;
        clone(): any;
        onParentGeomChanged(module: any): any;
        updateExpandLayoutItems(module: any, exports: any, require: any): any;
        updateExpandLayoutItem(module: any, exports: any, require: any): any;
    }
    export const _orientation: any;
    export const stretchType: any;
    export const length: any;
}

declare module "59838" {
    export const GeometryManager: any;
    export const geometries: any;
    export const _wallCachedData: any;
    export const _faceCachedData: any;
    export const entityId2GeomObject: any;
    export const _dirtyObjectMap: any;
    export const _layerInfo: any;
    export const _contentClipperInfo: any;
    export const _customizedModelCacheMap: any;
    export const _faceGeomInfoMap: any;
    export const _view3dCache: any;
    export const _fgiScene: any;
    export const layerDiscretePoints: any;
    export const floorplan: any;
    export const profileFactory: any;
    export const geometryFactory: any;
    export const _context: any;
    export const _paintService: any;
    export const signalLayerInfoChanged: any;
    export const const: any;
    export const : any;
    export const entityId: any;
    export const mesh: any;
    export const length: any;
    export const geometryDirty: any;
    export const setCustomAttrs: any;
    export const forceVisibilityMap: any;
    export const isValid: any;
    export const customAttrs: any;
    export const matrixWorld: any;
    export const isVisible: any;
    export const objects: any;
    export const visible: any;
    export const faceGeomPath: any;
    export const matrixToLocal: any;
    export const faceInfo: any;
    export const matrix: any;
    export const outer: any;
    export const holes: any;
    export const _globalSettings: any;
}

declare module "59991" {
    export const Util: any;
    // Original Name: r
    export class Util {
        getExtrudeSurfaceGeometry(module: any, exports: any, require: any, i: any): any;
        getWallGeometryInfoExt(module: any): any;
        getPoints(module: any, exports: any): any;
        getArcPoints(module: any, exports: any): any;
        constructor(...args: any[]);
    }
    export const leftPath: any;
    export const rightPath: any;
    export const fromPath: any;
    export const toPath: any;
    export const path: any;
    export const length: any;
    export const arcPaths: any;
}

declare module "60032" {
    // Original Name: n
    export class default extends import("42288").default {
        _compute(module: any, exports: any, require: any, i: any): any;
    }
}

declare module "60056" {
    export const exports: any;
}

declare module "60138" {
    export const SameLineFaceUtil: any;
    export const length: any;
    export const convert3dMatrix: any;
}

declare module "60241" {
    export const exports: any;
}

declare module "60537" {
    export const push: any;
}

declare module "6054" {
    export const NCustomizedOutlet: any;
    export const NCustomizedOutlet_IO: any;
    // Original Name: s
    export class NCustomizedOutlet_IO extends import("73858").NCustomizedStructre_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    // Original Name: l
    export class NCustomizedOutlet extends import("73858").NCustomizedStructure {
        constructor(module: any, ...args: any[]);
        setStructureMode(module: any): any;
        generateBrep(module: any, exports: any): any;
        calcProfile(module: any): any;
        getFaceDiscreteCount(module: any): any;
        syncLayerHeight(): any;
        newSelf(): any;
        getIO(): any;
    }
    export const structureMode: any;
    export const ZLength: any;
    export const radius: any;
    export const XLength: any;
    export const brepcache: any;
    export const tag: any;
    export const userData: any;
}

declare module "60585" {
    export const TubeMeshCreator: any;
    export const precision: any;
    export const waterTubeThickness: any;
    export const waterPathR: any;
    export const elecPathR: any;
    export const JunctionBoxParam: any;
    export const TubeMeshTypeEnum: any;
    export const straight: any;
    export const elecVertical: any;
    export const waterVertical: any;
    export const connectorT: any;
    export const other: any;
    export const width: any;
    export const thickness: any;
    // Original Name: c
    export class TubeMeshCreator {
        constructor(...args: any[]);
        clear(): any;
        _genBaseLoopCircle(module: any, exports: any): any;
        getDefaultMesh(module: any, require: any, n: any): any;
        getJunctionBoxMesh(): any;
        createTube(module: any, exports: any, require: any): any;
        _quaternionFromAxisAngle(module: any, exports: any, require: any, n: any): any;
        bufferToMeshDef(module: any): any;
        combineMesh(module: any, exports: any): any;
        getTransform(module: any, exports: any): any;
        getTubeTransform(module: any, exports: any, require: any): any;
        getConnectVerticalTransform(module: any, exports: any, require: any, n: any): any;
        _compose(module: any, exports: any, require: any): any;
        transToTreeMatrix(module: any): any;
        getBoundBox(module: any, require: any): any;
        calculateCrossArc(module: any): any;
    }
    export const _length: any;
    export const _diameter: any;
    export const _axisX: any;
    export const _axisY: any;
    export const _baseLoops: any;
    export const _defaultElecCorner: any;
    export const _defaultWaterCorner: any;
    export const _defaultStraight: any;
    export const _defaultJunctionBox: any;
    export const length: any;
    export const NOT_INTERSECT: any;
    export const vertexCount: any;
    export const indexCount: any;
    export const dia: any;
    export const z: any;
    export const instance: any;
}

declare module "60715" {
    export const exports: any;
}

declare module "60785" {
    export const ParametricBathroomCabinet: any;
    export const ParametricBathroomCabinet_IO: any;
    // Original Name: r
    export class ParametricBathroomCabinet_IO extends import("6087").ParametricContentBase_IO {
    }
    // Original Name: a
    export class ParametricBathroomCabinet extends import("6087").ParametricContentBase {
        getIO(): any;
    }
}

declare module "60787" {
    export const length: any;
    export const DExtruding: any;
    export const DExtruding_IO: any;
    // Original Name: g
    export class DExtruding_IO extends import("20551").Content_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const points: any;
    export const height: any;
    export const hiddenByConstrain: any;
    export const customizationContentType: any;
    export const isFunctionComponent: any;
    export const imodelParentId: any;
    export const fixK: any;
    export const fixS: any;
    export const materialId: any;
    export const __localId: any;
    export const localId: any;
    export const __direction: any;
    export const direction: any;
    export const __segmentPaths: any;
    export const segmentPaths: any;
    export const __holePathsWithDirection: any;
    export const holePathsWithDirection: any;
    export const __segmentPathsDepth: any;
    export const segmentPathsDepth: any;
    export const __textureType: any;
    export const textureType: any;
    export const __sideTextureType: any;
    export const sideTextureType: any;
    export const __holes: any;
    export const holes: any;
    export const masterId: any;
    export const modelCutPlanes: any;
    export const seekId: any;
    export const __points: any;
    export const __height: any;
    export const __hiddenByConstrain: any;
    export const __customizationContentType: any;
    export const __isFunctionComponent: any;
    export const __imodelParentId: any;
    export const __fixK: any;
    export const __fixS: any;
    export const __materialId: any;
    export const __masterId: any;
    export const __modelCutPlanes: any;
    // Original Name: p
    export class DExtruding extends import("20551").Content {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any): any;
        getPaths(): any;
        getHolePathsWithDirection(): any;
        getTopPaths(): any;
        _getTopPaths(): any;
        getGlobalBound3dPoints(): any;
        getGlobalBoundingBox3d(): any;
        getBoundingBox3d(): any;
        getBound3dPoints(): any;
        getLocalBound3dPoints(): any;
        getLocalBoundBox3d(): any;
        setMaterial(module: any, exports: any): any;
        setDirection(module: any): any;
        dirtyRecursive(): any;
        onAddedToParent(module: any): any;
        isContentInLoop(module: any, exports: any): any;
        isContentInRoom(module: any): any;
        getIO(): any;
        canTransactField(): any;
        getUniqueParent(): any;
        getProxyId(): any;
        getProxyObject(): any;
    }
    export const _seekId: any;
    export const metadata: any;
    export const EN_ARC_2D: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const material: any;
}

declare module "60812" {
    export const length: any;
    export const AuxiliaryLineFlagEnum: any;
    export const AuxiliaryLine_IO: any;
    export const AuxiliaryLine: any;
    // Original Name: s
    export class AuxiliaryLine_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const line: any;
    // Original Name: l
    export class AuxiliaryLine extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any): any;
        mirror(module: any): any;
        translate(module: any): any;
        getIO(): any;
    }
}

declare module "6087" {
    export const length: any;
    export const ParametricContentBase: any;
    export const ParametricContentBase_IO: any;
    export const onParamsChangedCallback: any;
    // Original Name: m
    export class ParametricContentBase_IO extends import("78283").NCustomizedParametricModel_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const useMinMax: any;
    export const propertyRecord: any;
    // Original Name: y
    export class ParametricContentBase extends import("78283").NCustomizedParametricModel {
        constructor(module: any, exports: any, ...args: any[]);
        initByMeta(module: any, exports: any, require: any): any;
        initParametricContentDocument(module: any, exports: any, require: any, i: any): any;
        openDocument(module: any, exports: any, require: any): any;
        initBySize(): any;
        initParametricContent(module: any, exports: any): any;
        initModelDocument(module: any, exports: any, require: any): any;
        getDocFile(): any;
        generateChildren(module: any, exports: any): any;
        generateSubpart(module: any, exports: any): any;
    }
    export const dependentSeekIds: any;
    export const parametricMeta: any;
    export const sizeInfo: any;
    export const paramTree: any;
    export const uuid: any;
    export const eId: any;
    export const seekId: any;
    export const contentType: any;
    export const isSourceModel: any;
    export const uId: any;
    export const srcModel: any;
    export const srcId: any;
    export const splitPlanes: any;
    export const unioned: any;
    export const contours: any;
    export const wdh: any;
    export const XLength: any;
    export const YLength: any;
    export const ZLength: any;
    export const XScale: any;
    export const YScale: any;
    export const ZScale: any;
    export const meta: any;
    export const rotation: any;
    export const x: any;
    export const y: any;
    export const outline: any;
    export const distanceWithDirection: any;
    export const z: any;
    export const distance: any;
    export const paths: any;
    export const type: any;
    export const ZRotation: any;
}

declare module "61009" {
    export const length: any;
    export const Edge_IO: any;
    export const Edge: any;
    // Original Name: d
    export class Edge_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const dumpedEntities: any;
    export const ln: any;
    export const coedge: any;
    export const ce: any;
    export const curve: any;
    export const isSplitEdge: any;
    export const isInnerEdge: any;
    export const __from: any;
    export const __to: any;
    export const __curve: any;
    export const __coedge: any;
    // Original Name: h
    export class Edge extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any, exports: any, require: any): any;
        isArcEdge(): any;
        getFrom(): any;
        setFrom(module: any): any;
        getTo(): any;
        setTo(module: any): any;
        getCurve(): any;
        setCurve(module: any): any;
        getCoedge(): any;
        setCoedge(module: any): any;
        _setFrom(module: any): any;
        _setTo(module: any): any;
        _updateCurve(module: any, exports: any): any;
        changeToArcEdge(module: any, exports: any): any;
        copyProperty(module: any): any;
        onRemovedFromParent(module: any, exports: any): any;
        getIO(): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        onChildDirty(module: any, exports: any): any;
        verify(): any;
        validate(module: any): any;
    }
    export const from: any;
    export const to: any;
    export const partner: any;
}

declare module "61072" {
    export const UnifyOpeningUtil: any;
    export const type: any;
    export const OpeningHole: any;
}

declare module "61084" {
    export const PointOnPointAssociation: any;
    // Original Name: a
    export class PointOnPointAssociation extends import("66605").Association {
        constructor(module: any, exports: any, ...args: any[]);
        compute(module: any): any;
    }
    export const isSplitEdge: any;
    export const from: any;
    export const x: any;
    export const y: any;
}

declare module "61127" {
    export const IMessage: any;
    export const FieldValueWrapper: any;
    export const FieldValueType: any;
    export const EntityTransactionType: any;
    export const BatchRequest: any;
    export const Manager: any;
    export const Session: any;
    export const Request: any;
    export const Common: any;
    export const Api: any;
}

declare module "61227" {
    export const prototype: any;
    export const Iterator: any;
}

declare module "61259" {
    export const exports: any;
}

declare module "61392" {
    export const intersection: any;
}

declare module "61403" {
    export const Bound: any;
    export const left: any;
    export const bottom: any;
    export const width: any;
    export const height: any;
    export const x: any;
    export const y: any;
}

declare module "61439" {
    export enum AnimationType {
    }
    export enum MirrorType {
    }
    export const rotation: any;
    export const translation: any;
    export const Horizontal: any;
    export const Vertical: any;
}

declare module "61526" {
    export const DSweep: any;
    // Original Name: c
    export class DSweep extends import("34225").CabinetBase {
        onUpdate(): any;
        toGraphicsData(): any;
        _getSweepMaterial(): any;
    }
    export const length: any;
    export const profileTransform: any;
    export const OVERLAP: any;
    export const _flatMesh: any;
    export const roomType: any;
    export const offsetX: any;
    export const offsetY: any;
    export const tileSize_x: any;
    export const tileSize_y: any;
    export const rotation: any;
    export const diffuseMapUvTransform: any;
    export const normalMapUvTransform: any;
}

declare module "61537" {
    export const length: any;
    export const Scene_IO: any;
    export const Scene: any;
    // Original Name: c
    export class Scene_IO extends import("99338").Entity_IO {
        load(module: any, exports: any, require: any, i: any): any;
    }
    export const _rootLayer: any;
    export const _activeLayer: any;
    export const _ceilingLayer: any;
    export const _outdoorLayer: any;
    export const _previewLayer: any;
    // Original Name: d
    export class Scene extends import("99338").Entity {
        constructor(module: any, ...args: any[]);
        isRoot(): any;
        destroy(): any;
        getBaseHeight(): any;
        getLayerAltitude(module: any): any;
        isUndergroundLayer(module: any): any;
        isSurfaceLayer(module: any): any;
        _addLayer(module: any): any;
        _setCeilingLayer(module: any): any;
        _setLayers(module: any): any;
        findLayer(module: any, exports: any): any;
        forEachLayer(module: any, exports: any): any;
        getLayersInOrder(): any;
        getIO(): any;
        verify(): any;
        forEachPoint(module: any, exports: any): any;
        _migrateCeiling(module: any, exports: any): any;
        _migrateWalls(module: any, exports: any): any;
        _migrateLayers(module: any, exports: any): any;
        forEachFloor(module: any, exports: any): any;
        forEachWall(module: any, exports: any): any;
    }
    export const _layers: any;
    export const __baseHeight: any;
    export const signalActiveLayerChanged: any;
    export const signalLayerAdded: any;
    export const signalBaseHeightChanged: any;
    export const ceilingLayer: any;
    export const height: any;
    export const layers: any;
    export const _children: any;
}

declare module "61602" {
    export const MeshContent: any;
    // Original Name: d
    export class MeshContent extends import("34225").CabinetBase {
        onUpdate(): any;
        toGraphicsData(): any;
        _getModelGraphicData(): any;
        _getContentBound(module: any): any;
        _getContentMaterialList(): any;
        _getContentMaterialData(module: any, exports: any, require: any): any;
        _setGraphicData(module: any, exports: any, require: any): any;
        _getContentMaterial(module: any, exports: any): any;
        _toBasicObject(module: any): any;
        _getPaveType(module: any): any;
        _getMaterial(module: any, exports: any, require: any): any;
        _getUVbox(module: any): any;
    }
    export const mesh: any;
    export const _mesh: any;
    export const roomType: any;
    export const length: any;
    export const objects: any;
    export const objectNames: any;
    export const bounding: any;
    export const scaleRule: any;
    export const meshName: any;
    export const isMaterialRep: any;
    export const index: any;
    export const pos: any;
    export const qut: any;
    export const scl: any;
    export const id: any;
    export const graphicsPath: any;
    export const type: any;
    export const matrixLocal: any;
    export const material: any;
    export const model: any;
    export const component: any;
    export const customAttrs: any;
    export const simulatedContentId: any;
    export const pocketMaterial: any;
    export const parentSeekId: any;
    export const diffuseMapUvTransform: any;
    export const normalMapUvTransform: any;
    export const offsetX: any;
    export const offsetY: any;
    export const tileSize_x: any;
    export const tileSize_y: any;
    export const rotation: any;
}

declare module "61656" {
    export const exports: any;
}

declare module "61748" {
    export const exports: any;
}

declare module "61962" {
    export const MixPaint: any;