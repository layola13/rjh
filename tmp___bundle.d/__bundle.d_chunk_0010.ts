    export const MixPaintUtil: any;
    export class l {
        constructor(module: any, exports: any, ...args: any[]);
        clear(): any;
        reMake(): any;
        release(): any;
        push(module: any, exports: any, require: any): any;
        makeParam(): any;
        bufferLayerMerge(module: any): any;
        creatrMaterialSwitch(module: any): any;
        createMesh(module: any, exports: any, require: any): any;
        bufferTriangulate(module: any): any;
    }
    export const _ptrAllPoint: any;
    export const allPoint: any;
    export const _ptrPolyBegin: any;
    export const polyBegin: any;
    export const _ptrPolyId: any;
    export const polyId: any;
    export const _ptrPolyPower: any;
    export const polyPower: any;
    export const _polyLenght: any;
    export const _pointLenght: any;
    export const polyCount: any;
    export const pointCount: any;
    export const length: any;
    export const BYTES_PER_ELEMENT: any;
    export const materialIndex: any;
    export const coordinateIndex: any;
    export const offsetIndex: any;
    export const coordinateSystem: any;
    export const offset: any;
    // Original Name: c
    export class coordinateIndex {
        constructor(module: any, exports: any, ...args: any[]);
        getPaths(): any;
    }
    export const outer: any;
    export const holes: any;
    // Original Name: d
    export class MixPaintUtil {
        simplifyShape(module: any, exports: any): any;
        simplify(module: any): any;
        toGeometryData(module: any, exports: any): any;
        discretizeCurve(module: any, exports: any, require: any): any;
        calculatePavingDirections(module: any): any;
        intersectPolyTree(module: any, exports: any): any;
        constructor(...args: any[]);
    }
    export const shapes: any;
    export const bound: any;
    export const ts: any;
    export const te: any;
    export const x: any;
    export const y: any;
    export const clene: any;
    export const tileSize_x: any;
    export const tileSize_y: any;
    export const resultShapes: any;
    // Original Name: h
    export class MixPaint {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        toGeometryData(): any;
        toGraphicsData(): any;
        getSurfaceData(module: any): any;
        _calculateInWasm(): any;
        toMesh(): any;
        _calculate(): any;
        _cropPolyTree(module: any, exports: any, require: any, i: any): any;
        getPinhuaPaintData(module: any): any;
    }
    export const _options: any;
    export const _inputData: any;
    export const _background: any;
    export const lib: any;
    export const contourBuffer: any;
    export const polygonBuffer: any;
    export const uvTransform: any;
    export const material: any;
    export const directions: any;
    export const isSeam: any;
    export const isBrick: any;
    export const _result: any;
    export const meshs: any;
    export const success: any;
    export const dataType: any;
}

declare module "62016" {
    export const exports: any;
}

declare module "6205" {
    export const SewerPipe: any;
    // Original Name: r
    export class SewerPipe extends import("998").Obstacle {
        constructor(module: any, exports: any, ...args: any[]);
    }
}

declare module "62073" {
    export const isDisjointFrom: any;
}

declare module "62193" {
    export const Layer: any;
    // Original Name: r
    export class Layer extends import("75312").BaseObject {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        onInit(): any;
        _updateMatrix(): any;
        onUpdatePosition(): any;
        onChildAdded(module: any): any;
    }
    export const _matrixLocal: any;
    export const entity: any;
}

declare module "62229" {
    export const NCustomizedSketchModel: any;
    export const NCustomizedSketchModel_IO: any;
    // Original Name: y
    export class NCustomizedSketchModel_IO extends import("52881").NCustomizedFeatureModel_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const sketchId: any;
    export const sketch: any;
    // Original Name: _
    export class NCustomizedSketchModel extends import("52881").NCustomizedFeatureModel {
        constructor(module: any, exports: any, ...args: any[]);
        addChildSketch(module: any): any;
        clearChildSketch(module: any): any;
        bindSketchSignal(): any;
        onSketchBuildComplete(): any;
        onSketchDirty(module: any): any;
        onCopyFace2d(module: any): any;
    }
    export const signalSketchDirty: any;
    export const _sketchSignalHook: any;
    export const faceShells: any;
    export const _sketch: any;
    export const id: any;
    export const relyerId: any;
    export const x: any;
    export const y: any;
    export const top: any;
    export const left: any;
    export const z: any;
    export const XLength: any;
    export const YLength: any;
    export const ZLength: any;
    export const _graphicsData: any;
    export const _graphicsDataPromise: any;
    export const tag: any;
    export const _breps: any;
    export const breps: any;
    export const value: any;
    export const errorStr: any;
    export const addShells: any;
    export const length: any;
    export const defaultmaterialmap: any;
    export const facematerialmap: any;
    export const sketchComId: any;
    export const face2d: any;
    export const faceGroupId: any;
    export const faceEntity: any;
    export const faceId: any;
    export const DEFAULT_Z_OFFSET: any;
}

declare module "62266" {
    export const writable: any;
    export const SlabType: any;
    export const Slabs: any;
    export const Slab: any;
    export const TgHole: any;
    export const WallLinkInfo: any;
    export const JointPointType: any;
    export const WallJoint: any;
    export const WallSurfaceTypeEnum: any;
    export const WallMode: any;
    export const IWallDump: any;
    export const Wall_IO: any;
    export const WallFlagEnum: any;
    export const WallTypeEnum: any;
    export const WallFaceType: any;
    export const Walls: any;
    export const Wall: any;
    export const FaceFlagEnum: any;
    export const IFaceDump: any;
    export const Face_IO: any;
    export const Faces: any;
    export const FaceHoleType: any;
    export const Face: any;
    export const ILoopDump: any;
    export const Loop_IO: any;
    export const Loops: any;
    export const Loop: any;
    export const ICoEdgeDump: any;
    export const CoEdge_IO: any;
    export const CoEdges: any;
    export const CoEdge: any;
    export const IEdgeProperty: any;
    export const IEdgeDump: any;
    export const Edge_IO: any;
    export const Edges: any;
    export const Edge: any;
    export const IVertexDump: any;
    export const Vertex_IO: any;
    export const VertexMoveTypeEnum: any;
    export const Vertices: any;
    export const Vertex: any;
    export const IIDGenerator: any;
    export const IEntityLoadContext: any;
    export const IEntityDumpContext: any;
    export const IEntityDump: any;
    export const Entity_IO: any;
    export const EntityDumpCallback: any;
    export const EntityFlagEnum: any;
    export const Entities: any;
    export const Entity: any;
    export const LayerSketch2dBuilder: any;
    export const AuxiliaryLineFlagEnum: any;
    export const IAuxiliaryLineDump: any;
    export const AuxiliaryLine_IO: any;
    export const AuxiliaryLine: any;
    export const Window_IO: any;
    export const Window: any;
    export const Door: any;
    export const HoleInfo: any;
    export const IHoleDump: any;
    export const Hole_IO: any;
    export const Holes: any;
    export const Hole: any;
    export const OpeningHelper: any;
    export const IOpeningDump: any;
    export const Opening_IO: any;
    export const OpeningSwingType: any;
    export const OpeningFaceType: any;
    export const Opening: any;
    export const IContentPosition: any;
    export const IContentDump: any;
    export const Content_IO: any;
    export const ContentFlagEnum: any;
    export const Contents: any;
    export const Content: any;
    export const ISceneDump: any;
    export const Scene_IO: any;
    export const Scenes: any;
    export const Scene: any;
    export const ILayerDump: any;
    export const Layer_IO: any;
    export const LayerTypeEnum: any;
    export const LayerFlagEnum: any;
    export const Layers: any;
    export const Layer: any;
    export const PointOnPointAssociation: any;
    export const PointOnLineAssociation: any;
    export const IAssociationContext: any;
    export const IAssociationEdge: any;
    export const IAssociationDump: any;
    export const AssociationType: any;
    export const Associations: any;
    export const AssociationBase: any;
    export const Association: any;
    export const FloorplanDisplayAreaEnum: any;
    export const IFloorplanDump: any;
    export const Floorplan_IO: any;
    export const Floorplan: any;
    export const ISlabDump: any;
    export const Slab_IO: any;
    export const SlabFaceType: any;
    export const ParametricCurtain: any;
    export const ParametricModelArray_IO: any;
    export const ParametricModelArray: any;
    export const ParametricContentSubpart_IO: any;
    export const ParametricContentSubpart: any;
    export const ParametricContentBase_IO: any;
    export const ParametricContentBase: any;
    export const NCPBackgroundWallBase_IO: any;
    export const NCPBackgroundWallBase: any;
    export const NCustomizedParametricBackgroundWall_IO: any;
    export const NCustomizedParametricBackgroundWall: any;
    export const ParametricStairRotationDirectionEnum: any;
    export const ParametricStairHandrailSideEnum: any;
    export const ParametricStairTypeEnum: any;
    export const ParametricStairMaterialPartTypeEnum: any;
    export const ParametricStairPropertyTypeEnum: any;
    export const NCustomizedParametricStairs_IO: any;
    export const NCustomizedParametricStairs: any;
    export const ParametricRoofGeneratedTypeEnum: any;
    export const NCustomizedParametricRoof_IO: any;
    export const NCustomizedParametricRoof: any;
    export const NCustomizedParametricCeiling_IO: any;
    export const NCustomizedParametricCeiling: any;
    export const NCustomizedCeilingModel_IO: any;
    export const NCustomizedCeilingModel: any;
    export const NCustomizedBackgroundWall_IO: any;
    export const NCustomizedBackgroundWall: any;
    export const NCustomizedSketchModel_IO: any;
    export const NCustomizedSketchModel: any;
    export const NCustomizedFeatureModel_IO: any;
    export const NCustomizedFeatureModel: any;
    export const CustomizedPlatform: any;
    export const CustomizedBackgroundWall_IO: any;
    export const CustomizedBackgroundWall: any;
    export const CustomizedCeilingModel_IO: any;
    export const CustomizedCeilingModel: any;
    export const CustomizedFeatureModel_IO: any;
    export const CustomizedFeatureModel: any;
    export const CustomizedModelLightBand_IO: any;
    export const CustomizedModelLightBand: any;
    export const CustomizedModelLightSlot_IO: any;
    export const CustomizedModelLightSlot: any;
    export const CustomizedModelMolding_IO: any;
    export const CustomizedModelMolding: any;
    export const CustomizedModel_IO: any;
    export const CustomizedModel: any;
    export const CustomizedPMModel_IO: any;
    export const CustomizedPMModel: any;
    export const CustomizedPMInstanceModel_IO: any;
    export const CustomizedPMInstanceModel: any;
    export const DecorateSketch2d: any;
    export const SweeperConnectHelper: any;
    export const MoldingSweepHelper: any;
    export const NCustomizedBeam_IO: any;
    export const NCustomizedBeam: any;
    export const NCustomizedOutlet_IO: any;
    export const NCustomizedOutlet: any;
    export const NCustomizedRiser_IO: any;
    export const NCustomizedRiser: any;
    export const NCustomizedFlue_IO: any;
    export const NCustomizedFlue: any;
    export const NCustomizedCircleColumn_IO: any;
    export const NCustomizedCircleColumn: any;
    export const NCustomizedSquareColumn_IO: any;
    export const NCustomizedSquareColumn: any;
    export const NCustomizedStructre_IO: any;
    export const NCustomizedStructure: any;
    export const StructureFlagEnum: any;
    export const StructureFaceType: any;
    export const ILightBandParameters: any;
    export const NCustomizedModelLightBand_IO: any;
    export const NCustomizedModelLightBand: any;
    export const ILightSlotParameters: any;
    export const ParametricDoor_IO: any;
    export const ParametricDoor: any;
    export const ParametricOpening_IO: any;
    export const ParametricOpeningDecorator: any;
    export const ParametricOpening: any;
    export const NCustomizedModelLightSlot_IO: any;
    export const NCustomizedModelLightSlot: any;
    export const IMoldingParameters: any;
    export const NCustomizedModelMolding_IO: any;
    export const NCustomizedModelMolding: any;
    export const NCustomizedPlatform_IO: any;
    export const NCustomizedPlatform: any;
    export const NCustomizedParametricModel_IO: any;
    export const NCustomizedParametricModel: any;
    export const NCPBackgroundWallSubpart_IO: any;
    export const NCPBackgroundWallSubpart: any;
    export const NCPBackgroundWallArray_IO: any;
    export const NCPBackgroundWallArray: any;
    export const NCPBackgroundWallContent_IO: any;
    export const NCPBackgroundWallContent: any;
    export const NCPBackgroundWallUnit: any;
    export const ParametricModelDecorator: any;
    export const ParametricModelContent_IO: any;
    export const ParametricModelContent: any;
    export const ParametricBathroomCabinet_IO: any;
    export const ParametricBathroomCabinet: any;
    export const ParametricCurtain_IO: any;
    export const WindowTypes: any;
    export const Parametrization: any;
    export const PointFlagEnum: any;
    export const PordinaryWindow_IO: any;
    export const POrdinaryWindow: any;
    export const PordinaryWindow: any;
    export const CornerFlatWindow: any;
    export const BayWindow: any;
    export const IParametricWindowDump: any;
    export const CornerWindowParamsEnum: any;
    export const ParametricWindowParamsEnum: any;
    export const CornerWindowFlagEnum: any;
    export const ParametricWindowFlagEnum: any;
    export const CornerWindow: any;
    export const IGroupDump: any;
    export const Group_IO: any;
    export const GroupFlagEnum: any;
    export const Groups: any;
    export const Group: any;
    export const PocketSideType: any;
    export const Pocket_IO: any;
    export const IPocketDump: any;
    export const Pocket: any;
    export const RoomSurfaceTypeEnum: any;
    export const RoomFlagEnum: any;
    export const ICeilingDump: any;
    export const Ceiling_IO: any;
    export const Ceiling: any;
    export const IFloorDump: any;
    export const Floor_IO: any;
    export const Floors: any;
    export const Floor: any;
    export const ICorniceDump: any;
    export const Cornice_IO: any;
    export const Cornice: any;
    export const ICorniceTopoItem: any;
    export const CorniceTopoPather: any;
    export const IBaseboardTopoItem: any;
    export const BaseboardTopoPather: any;
    export const Baseboard: any;
    export const Mitre_IO: any;
    export const Mitre: any;
    export const WallMolding_IO: any;
    export const WallMolding: any;
    export const IMoldingDump: any;
    export const Molding_IO: any;
    export const MoldingTypeEnum: any;
    export const Moldings: any;
    export const Molding: any;
    export const DecorateSketch2d_IO: any;
    export const VolumeLightOption: any;
    export const DomeLightOption: any;
    export const MeshLight_IO: any;
    export const MeshLight: any;
    export const PointLight_IO: any;
    export const PointLight: any;
    export const GridFlagEnum: any;
    export const Grid: any;
    export const ICurtainDump: any;
    export const Curtain_IO: any;
    export const CurtainComponentEnum: any;
    export const Curtain: any;
    export const Flue: any;
    export const Obstacle_IO: any;
    export const Obstacle: any;
    export const Column: any;
    export const AlignToWallTypeEnum: any;
    export const Beam: any;
    export const PSlidingDoorLeafInterlaceTypeEnum: any;
    export const PSlidingDoorLeaf: any;
    export const PSlidingDoor_IO: any;
    export const PSlidingDoor: any;
    export const PSegmentLoft_IO: any;
    export const PSegmentLoft: any;
    export const PModelTypes: any;
    export const PModel_IO: any;
    export const PModel: any;
    export const PExtruding_IO: any;
    export const PExtruding: any;
    export const PContent_IO: any;
    export const PContent: any;
    export const PBox_IO: any;
    export const PBox: any;
    export const PMolding_IO: any;
    export const PMolding: any;
    export const PAssemblyProcessor: any;
    export const PAssemblyFilter: any;
    export const PAssemblyViewTypeEnum: any;
    export const PAssemblyRotationEnum: any;
    export const PAssembly_IO: any;
    export const PAssembly: any;
    export const ParametricWindow_IO: any;
    export const ParametricWindow: any;
    export const IParametricModelParameterDump: any;
    export const IParametricModelDump: any;
    export const IParametricModelParameters: any;
    export const ParametricModelType: any;
    export const CornerWindow_IO: any;
    export const ParametricModel_IO: any;
    export const ParametricModel: any;
    export const CameraTypeEnum: any;
    export const Cameras: any;
    export const Camera: any;
    export const EntityEventType: any;
    export const WallBoardWaistLine: any;
    export const WallBoardBaseboard: any;
    export const IUnderlayData: any;
    export const IUnderlayDump: any;
    export const Underlay_IO: any;
    export const Underlay: any;
    export const SewerPipe: any;
    export const LightGroupEmptyTemplateSet: any;
    export const LightGroupEmptyTemplateEnum: any;
    export const LightGroupTemplateV3Set: any;
    export const LightGroupTemplateEnum: any;
    export const LightGroup_IO: any;
    export const LightGroup: any;
    export const AttenuatedSpotLight_IO: any;
    export const AttenuatedSpotLight: any;
    export const LightSubGroupCompareUtil: any;
    export const SpotPhysicalLightSubGroupMemberProperties: any;
    export const PhysicalLightSubGroupMemberProperties: any;
    export const MeshLightSubGroupMemberProperties: any;
    export const AttenuatedSpotLightSubGroupMemberProperties: any;
    export const SpotLightSubGroupMemberProperties: any;
    export const VirtualAreaLightSubGroupMemberProperties: any;
    export const FlatLightSubGroupMemberProperties: any;
    export const PointLightSubGroupMemberProperties: any;
    export const AsmLightSubGroup_IO: any;
    export const AsmLightSubGroup: any;
    export const AsmPhysicalLight_IO: any;
    export const AsmPhysicalLight: any;
    export const LightSubGroup_IO: any;
    export const LightSubGroup: any;
    export const ILightMetaObjInfo: any;
    export const SpotPhysicalLight_IO: any;
    export const SpotPhysicalLight: any;
    export const PhysicalLight_IO: any;
    export const PhysicalLight: any;
    export const EllipseLight_IO: any;
    export const EllipseLight: any;
    export const FlatLight_IO: any;
    export const FlatLight: any;
    export const SpotLight_IO: any;
    export const SpotLight: any;
    export const VirtualAreaLight_IO: any;
    export const VirtualAreaLight: any;
    export const DirectionLight_IO: any;
    export const DirectionLight: any;
    export const SunlightOption: any;
    export const DExtruding_IO: any;
    export const DExtruding: any;
    export const DSweep_IO: any;
    export const DSweep: any;
    export const DOpening_IO: any;
    export const DOpening: any;
    export const DAssembly_IO: any;
    export const DAssembly: any;
    export const ContentBase_IO: any;
    export const ContentBase: any;
    export const ISimulatedContent: any;
    export const ISoftClothDump: any;
    export const SoftCloth_IO: any;
    export const SoftCloth: any;
    export const Wire: any;
    export const Sketch2dDecorator: any;
    export const SketchBackground: any;
    export const Sketch2d: any;
    export const Face2dDecorator: any;
    export const GuideLine2d: any;
    export const Face2d_IO: any;
    export const Face2d: any;
    export const Curve2d_IO: any;
    export const Curve2d: any;
    export const Circle2d_IO: any;
    export const Circle2d: any;
    export const CircleArc2d_IO: any;
    export const CircleArc2d: any;
    export const Line2d_IO: any;
    export const Line2d: any;
    export const Point2d_IO: any;
    export const Point2d: any;
    export const Geom: any;
    export const DoorDirEnum: any;
    export const DoorTypeEnum: any;
    export const OutdoorSpaceTypeEnum: any;
    export const RoomTypeEnum: any;
    export const CustomizedCabinetHandleOrientation: any;
    export const CustomizedCabinetComponentEnum: any;
    export const CustomizedCabinetSurfaceTypeEnum: any;
    export const CustomizedCabinetPartEnum: any;
    export const CabinetMoldingEnum: any;
    export const Light_IO: any;
    export const LightEditFlagEnum: any;
    export const LightTypeEnum: any;
    export const Light: any;
    export const ICameraDump: any;
    export const Camera_IO: any;
    export const CameraViewTypeEnum: any;
    export const CameraFlagEnum: any;
    export const IRoomInfo: any;
    export const ISlabInfo: any;
    export const ILayerInfo: any;
    export const CWFlagEnum: any;
    export const CWGBPowerSysComp: any;
    export const CWGBCircuitComp: any;
    export const CWColdWaterComp: any;
    export const CWHotWaterComp: any;
    export const CWWeakElecComp: any;
    export const CWStrongElecComp: any;
    export const CWDeviceComp: any;
    export const CWJointComp: any;
    export const ConcealedWorkPowerSys: any;
    export const ConcealedWorkCircuit: any;
    export const ConcealedWorkTube: any;
    export const ConcealedWorkLightWire: any;
    export const ConcealedWorkTubeTree: any;
    export const ConcealedWorkLightTree: any;
    export const ConcealedWorkLightControlSys: any;
    export const ConcealedWorkLightLogic: any;
    export const ConcealedWorkTree: any;
    export const ConcealedWorkNode: any;
    export const ConcealedWork: any;
    export const DDBuilder: any;
    export const JointType: any;
    export const EntityProxyPlaceTarget: any;
    export const EntityProxyUndoRedoObject: any;
    export const EntityProxyFactory: any;
    export const IModelSimpleType: any;
    export const EntityProxyObject: any;
    export const IDuplicateData: any;
    export const EntityProxyTypeEnum: any;
    export const ISkyboxDump: any;
    export const ISkyboxData: any;
    export const Skybox_IO: any;
    export const SkyboxMappingType: any;
    export const CustomSkyboxFillMode: any;
    export const SkyboxTypeEnum: any;
    export const Skybox: any;
    export const DWindow_IO: any;
    export const DWindow: any;
    export const DHole_IO: any;
    export const DHole: any;
    export const DContent_IO: any;
    export const DContent: any;
    export const DMolding_IO: any;
    export const DMolding: any;
    export const SpaceHole: any;
    export const SpaceHoleType: any;
    export const SpaceHoleDef: any;
    export const HostType: any;
    export const NCPConstantEnum: any;
    export const ICustomizedFunction: any;
    export const MeshContent_IO: any;
    export const MeshContent: any;
    export const CWTubeDiameterEnum: any;
    export const CWGBCircuitTypeEnum: any;
    export const CWGBWireTypeEnum: any;
    export const CWGBTubeTypeEnum: any;
    export const CWGBBreakerTypeEnum: any;
    export const CWGBTotalBreakerTypeEnum: any;
    export const CWGBHouseHoldCableTypeEnum: any;
    export const MirrorInfo: any;
    export const MirrorType: any;
    export const Structure: any;
    export const IPolygon: any;
    export const IWallInfo: any;
    export const IStructureFaceInfo: any;
    export const toJSON: any;
}

declare module "62372" {
    export const BuilderUtil: any;
    export const faceMap: any;
    export const length: any;
}

declare module "62412" {
    export const Arrangement: any;
    export const LoopFinder: any;
    export const LoopUtil: any;
    export class c {
        constructor(...args: any[]);
        addHalfEdge(module: any): any;
        setParent(module: any): any;
        _removeChild(module: any): any;
        _addChild(module: any): any;
        isInSideLoop(module: any): any;
        isShareSomeEdge(module: any): any;
        isBoundLoop(): any;
        isCCW(): any;
        isCW(): any;
        update(): any;
    }
    export const halfEdges: any;
    export const dirty: any;
    export const parent: any;
    export const children: any;
    export const _loopEdges: any;
    export const _boundEdgeIds: any;
    export const _area: any;
    export const area: any;
    export const partner: any;
    export const length: any;
    export const discretePts: any;
    export const to: any;
    export class d {
        constructor(module: any, exports: any, ...args: any[]);
        _addHalfEdge(module: any): any;
        getRootLoops(): any;
        getInnerEdges(): any;
        getOuterEdges(): any;
        getIsolateEdges(): any;
        getHalfEdgeLoop(module: any, exports: any): any;
        getCCWLoops(): any;
        search(): any;
        _outHalfEdges(module: any): any;
        _search(module: any): any;
        _findNextOutHalfEdge(module: any, exports: any): any;
        _updateLoopsParent(module: any): any;
    }
    export const edges: any;
    export const selfLoopEdges: any;
    export const outHalfEdgesMap: any;
    export const loops: any;
    export const from: any;
    export const loop: any;
    export const directionT: any;
    export const directionF: any;
    export class g {
        constructor(module: any, exports: any, require: any, ...args: any[]);
    }
    export const x: any;
    export const y: any;
    export const id: any;
    export class p {
        constructor(...args: any[]);
        _createVertex(module: any): any;
        _findPointOnVertex(module: any): any;
        _findPointOnEdges(module: any): any;
        insertPoint(module: any, exports: any): any;
        insertEdge(module: any, exports: any, require: any, i: any): any;
        insertPath(module: any, exports: any, require: any): any;
        getRegions(): any;
    }
    export const vertices: any;
    export const sourceEdges: any;
    export const loopFinder: any;
    export const lerp: any;
    export const vertexOnEdge: any;
    export const size: any;
    export const vertex: any;
    export const customData: any;
    export const z: any;
    export const associatedEdge: any;
    export const arcInfo: any;
    export const edge: any;
    export const isSplitEdge: any;
    export const splitEdgeInfo: any;
}

declare module "62581" {
    export const BaseDwgUtil: any;
}

declare module "62592" {
    export const PMolding: any;
    export const PMolding_IO: any;
    export class l extends import("67997").PModel_IO {
        dump(module: any, exports: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const length: any;
    export const seekId: any;
    export const name: any;
    export const XSize: any;
    export const YSize: any;
    export const paths: any;
    export const __metadata: any;
    export const __XSize: any;
    export const __YSize: any;
    export const __paths: any;
    export class c extends import("67997").PModel {
        constructor(...args: any[]);
        create(module: any): any;
        getPaths(): any;
        verify(): any;
        getIO(): any;
        update(module: any): any;
        refreshBoundInternal(): any;
        isContentInRoom(module: any): any;
        isContentInLoop(module: any): any;
        isSameMolding(module: any): any;
        onFieldChanged(module: any, exports: any, require: any): any;
        getLightBandData(): any;
        _generateLightBandObjStr(): any;
    }
    export const _seekId: any;
    export const localId: any;
    export const material: any;
    export const __value: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const metadata: any;
}

declare module "62615" {
    export const SlabFaceType: any;
    export const SunlightOption: any;
    export const Content: any;
    export const RoomTypeEnum: any;
    export const Floorplan: any;
    export const LightTypeEnum: any;
    export const Light: any;
    export const LightGroup: any;
    export const LightGroupTemplateEnum: any;
    export const LightGroupEmptyTemplateEnum: any;
}

declare module "62636" {
    export const EdgeOnLineAssociation: any;
    // Original Name: n
    export class EdgeOnLineAssociation extends import("39646").AssociationBase {
        constructor(module: any, exports: any, ...args: any[]);
        compute(module: any): any;
    }
}

declare module "62697" {
    export const LoopUtil: any;
    export const LoopFinder: any;
    export class h {
        constructor(...args: any[]);
        addHalfEdge(module: any): any;
        setParent(module: any): any;
        _removeChild(module: any): any;
        _addChild(module: any): any;
        isInSideLoop(module: any): any;
        isShareSomeEdge(module: any): any;
        isBoundLoop(): any;
        isCCW(): any;
        isCW(): any;
        update(): any;
    }
    export const halfEdges: any;
    export const dirty: any;
    export const parent: any;
    export const children: any;
    export const _loopEdges: any;
    export const _boundEdgeIds: any;
    export const _area: any;
    export const area: any;
    export const partner: any;
    export const length: any;
    export const discretePts: any;
    export const to: any;
    // Original Name: u
    export class LoopFinder {
        constructor(module: any, exports: any, ...args: any[]);
        _addHalfEdge(module: any): any;
        getRootLoops(): any;
        getInnerEdges(): any;
        getOuterEdges(): any;
        getIsolateEdges(): any;
        getHalfEdgeLoop(module: any, exports: any): any;
        getCCWLoops(): any;
        search(): any;
        _outHalfEdges(module: any): any;
        _search(module: any): any;
        _findNextOutHalfEdge(module: any, exports: any): any;
        _updateLoopsParent(module: any): any;
    }
    export const edges: any;
    export const selfLoopEdges: any;
    export const outHalfEdgesMap: any;
    export const loops: any;
    export const from: any;
    export const loop: any;
    export const directionT: any;
    export const directionF: any;
    export const vertex: any;
    export const lerp: any;
    export const id: any;
    export const width: any;
    export const associatedWall: any;
    export const dist: any;
    export const z: any;
}

declare module "62709" {
    export const isEleBoxIntersectRoom: any;
    export const isLoopIntersectLoop: any;
    export const isLoopValid: any;
    export const length: any;
}

declare module "62741" {
    export const Column: any;
    // Original Name: r
    export class Column extends import("998").Obstacle {
        constructor(module: any, exports: any, ...args: any[]);
    }
}

declare module "62781" {
    export const GraphicsCutter: any;
    export const PolyLine: any;
    export const TriEdge: any;
    // Original Name: a
    export class TriEdge {
        constructor(module: any, exports: any, ...args: any[]);
    }
    export const from: any;
    export const to: any;
    export const _id: any;
    // Original Name: s
    export class PolyLine {
        constructor(module: any, exports: any, ...args: any[]);
        clipByPlane(module: any): any;
        clipByLoop(module: any, exports: any): any;
        getLength(): any;
    }
    export const pts: any;
    export const indices: any;
    export const length: any;
    export const type: any;
    export const OUT: any;
    // Original Name: l
    export class GraphicsCutter {
        clipGeomByObstacles(module: any, exports: any, require: any, n: any): any;
        clipSweepGeomByObstacles(module: any, exports: any): any;
        clipMixpaveByObstacles(module: any, exports: any, require: any): any;
        clipGeomByPlanes(module: any, exports: any): any;
        clipMixpaveByPlanes(module: any, exports: any): any;
        clipPathByPlanes(module: any, exports: any): any;
        meshwire(module: any): any;
        convertMeshBack2FaceGeom(module: any, exports: any, require: any, n: any): any;
        convertMeshBack2MeshDef(module: any, exports: any, require: any): any;
        convertPolylineBack2EdgeGeom(module: any, exports: any): any;
        convertFaceGeom2Mesh(module: any, exports: any): any;
        convertEdgeGeom2PolyLine(module: any): any;
        convertMixPave2Mesh(module: any, exports: any): any;
        getInstance(): any;
        _transformMesh(module: any, exports: any, require: any, i: any): any;
        constructor(...args: any[]);
    }
    export const isSweepModel: any;
    export const contents: any;
    export const mesh: any;
    export const vertexCount: any;
    export const vertexPositions: any;
    export const vertexNormals: any;
    export const vertexUVs: any;
    export const indexCount: any;
    export const facePaths: any;
    export const bounding: any;
    export const meshKey: any;
    export const surface: any;
    export const faceNormal: any;
    export const faceXRay: any;
    export const faceYRay: any;
    export const smoothIndices: any;
    export const _instance: any;
}

declare module "62786" {
    export const PaintFaceMarker: any;
    export const PaintsUtil: any;
    // Original Name: S
    export class PaintsUtil {
        getPaintInfo(module: any): any;
        mirrorPaint(module: any, exports: any): any;
        getCustomizedModelFromWall(module: any, exports: any, require: any): any;
        isCustomizedBackgroundWallOnFace(module: any, exports: any, require: any): any;
        _isStructureOnFace(module: any, exports: any): any;
        getCustomizedModelFromWallFace(module: any, exports: any, require: any, i: any): any;
        getOpeningTopPath(module: any, exports: any): any;
        getTgFaceGeometry2D(module: any): any;
        getFaceGeometry2DRelative(module: any): any;
        getFaceGeometry2D(module: any, exports: any): any;
        getCustomizedModelFacePaintInfo(module: any, exports: any, require: any, i: any): any;
        constructor(...args: any[]);
    }
    export const points: any;
    export const bbx: any;
    export const x: any;
    export const width: any;
    export const y: any;
    export const height: any;
    export const grid: any;
    export const waistline: any;
    export const boundaries: any;
    export const wallCorners: any;
    export const wallPolygons: any;
    export const path: any;
    export const originPoints: any;
    export const hole: any;
    export const pavingOption: any;
    export const point: any;
    export const rotation: any;
    export const sliderOffsetX: any;
    export const sliderOffsetY: any;
    export const z: any;
    export const height3d: any;
    export const length: any;
    export const XLength: any;
    export const PI: any;
    export const holes: any;
    export const convert3dMatrix: any;
    export const curMixPaintFaceInfo: any;
    export const top: any;
    export const outer: any;
    export const left: any;
    export const anchorPointIndex: any;
    export const key: any;
    export const absoluteMass: any;
    export const localId: any;
    export const seamMaterial: any;
    export const seamColor: any;
    export const color: any;
    export const colorMode: any;
    export const pathsByProduct: any;
    export const material: any;
    export const textureURI: any;
    export const iconSmallURI: any;
    export const brickData: any;
    export const seamData: any;
    export const leftTop: any;
    export const const: any;
    export const : any;
    export const isSingleWoodBlock: any;
    export const originalMaterial: any;
    export const isUnbroken: any;
    export const defaultOffsetX: any;
    export const defaultOffsetY: any;
    export const metadata: any;
    export const seekId: any;
    export const refSubSeekId: any;
    export const refSubTextureURI: any;
    export const refSeekId: any;
    export const tileSize_x: any;
    export const tileSize_y: any;
    export const innerLoops: any;
    export const pavingOptions: any;
    export const patternBlocks: any;
    export const pattern: any;
    export const right: any;
    export const bottom: any;
    export const offsetX: any;
    export const offsetY: any;
    export const defaultoffsetX: any;
    export const defaultoffsetY: any;
    export const isValid: any;
    export const paintData: any;
    export const faceGroupId: any;
    export const faceGroupBoundMap: any;
    export const mixpaint: any;
    export const faceId: any;
    export const rotationAngle: any;
    export const localPavingPoint: any;
    export const free: any;
    export const freePatternBlocks: any;
    export const entityPaintStatusById: any;
    export const geometryChangedFaces: any;
    export const eventHooks: any;
    export const type: any;
    export const Geometry: any;
}

declare module "62888" {
    export const length: any;
    export const Region_IO: any;
    export const Region: any;
    // Original Name: p
    export class Region extends import("57027").Shape {
        constructor(module: any, exports: any, ...args: any[]);
        createRegion(module: any, exports: any): any;
        getIO(): any;
        isBackground(): any;
        getClonedDumpData(): any;
        clone(): any;
        getPath(): any;
        getAllHoles(): any;
        getDiscretePath(): any;
        getGeomPolygons(): any;
        getDiscretePoints(): any;
        verify(): any;
        _getGeomPolygons(): any;
        _setGeomPolygons(module: any): any;
        _setGrid(module: any): any;
        _setBoundaries(module: any): any;
        addBoundary(module: any, exports: any): any;
        removeBoundary(module: any): any;
        getBoundaryWidth(): any;
        getInnerBoundaryPoints(): any;
        getInnerBoundaryPointsIndex(module: any): any;
        toInnerPolygon(): any;
        updateBoundaries(module: any): any;
        containsGrid(): any;
        containsBoundary(): any;
        containsParamTemplate(): any;
        updateMixGrid(): any;
        getAllChildRegions(): any;
        removeChildRegion(module: any): any;
        updateLayout(): any;
        onGeometryChanged(): any;
        clear(module: any): any;
        onChildDirty(module: any, exports: any): any;
        onPatternDirty(module: any): any;
        onPatternReset(module: any): any;
        onPatternResetOverride(module: any): any;
        _onPatternChanged(): any;
        copyStyleFromOtherRegion(module: any): any;
        fitToLayout(module: any): any;
        updateRegion(module: any): any;
        checkClonedResult(module: any): any;
        destroy(): any;
    }
    export const __layout: any;
    export const layout: any;
    export const __boundaries: any;
    export const __geomPolygons: any;
    export const geomPolygons: any;
    export const pattern: any;
    export const grid: any;
    export const outer: any;
    export const holes: any;
    export const __grid: any;
    export const _flag: any;
    export const boundaries: any;
    export const needUpdate: any;
    export const type: any;
    export const Material: any;
    export const material: any;
    export const _disposed: any;
    // Original Name: f
    export class Region_IO extends import("57027").Shape_IO {
        instance(): any;
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const _Region_IO_instance: any;
    export const invalidIds: any;
}

declare module "62947" {
    export const ConcealedWork: any;
    // Original Name: r
    export class ConcealedWork extends import("75312").BaseObject {
        onInit(): any;
        clearTubeMeshCreator(): any;
    }
}

declare module "63079" {
    export const Geom: any;
}

declare module "63267" {
    export const lastIndex: any;
    export const exec: any;
    export const groups: any;
}

declare module "6328" {
    export const ArcCurve_IO: any;
    export const ArcCurve: any;
    // Original Name: n
    export class ArcCurve_IO extends import("11732").Curve_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const cx: any;
    export const cy: any;
    export const clockwise: any;
    // Original Name: a
    export class ArcCurve extends import("11732").Curve {
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

declare module "63372" {
    export const Molding: any;
    export const GeometryMolding: any;
    // Original Name: s
    export class GeometryMolding {
        constructor(module: any, exports: any, ...args: any[]);
        clear(): any;
        update(module: any, exports: any, require: any): any;
        updateRoomCustomAttrs(): any;
        _dealGraphicsData(module: any, exports: any): any;
        toGraphicsData(module: any): any;
        toGraphicsDataAsync(module: any, exports: any): any;
        _getPocketMaterial(module: any): any;
    }
    export const owner: any;
    export const _webCadDocument: any;
    export const seekIds: any;
    export const meshDefs: any;
    export const objects: any;
    export const moldingMaterialRotation: any;
    export const customData: any;
    export const diffuseMapUvTransform: any;
    export const normalMapUvTransform: any;
    export const entityId: any;
    export const metadata: any;
    // Original Name: l
    export class Molding extends import("75312").BaseObject {
        constructor(module: any, exports: any, require: any, i: any, ...args: any[]);
        onUpdate(): any;
        needGenerateHighResolutionData(): any;
        toGraphicsData(): any;
        toGraphicsDataAsync(module: any): any;
    }
    export const _goemtryModeling: any;
    export const entity: any;
}

declare module "63417" {
    export const NCustomizedFeatureModel: any;
    export const ParametricModelArray: any;
    export const NCustomizedModelFace: any;
    // Original Name: S
    export class NCustomizedModelFace {
        constructor(module: any, exports: any, ...args: any[]);
        _getFgiMeshDefWithUvTransform(module: any, exports: any, require: any): any;
        meshToGraphicDatas(module: any, exports: any, require: any, i: any, n: any): any;
        toGraphicsData(module: any): any;
        _handleMeshDef(module: any, exports: any): any;
        _updateFaceInfo(module: any): any;
    }
    export const faceInfo: any;
    export const entity: any;
    export const compositeFaceTag: any;
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
    export const indexCount: any;
    export class P extends import("75312").BaseObject {
        getChildFace(module: any): any;
        _entityDirtied(module: any): any;
    }
    export class E extends import("75312").BaseObject {
        getChildFace(module: any): any;
        _entityDirtied(module: any): any;
    }
    export class M extends import("75312").BaseObject {
        _entityDirtied(module: any): any;
    }
    // Original Name: v
    export class ParametricModelArray extends import("75312").BaseObject {
        getChildFace(module: any): any;
        _entityDirtied(module: any): any;
        needGenerateHighResolutionData(): any;
    }
    // Original Name: b
    export class NCustomizedFeatureModel extends import("81634").CustomizedModel {
        onInit(): any;
        toGraphicsData(): any;
        toGraphicsDataAsync(module: any): any;
        isMoldingData(module: any): any;
        _meshTypeConverter(module: any): any;
        _dealGraphicsData(module: any, exports: any): any;
    }
    export const faces: any;
    export const edges: any;
    export const sketchModelData: any;
    export const graphicsData: any;
    export const docId: any;
    export const _cacheLightBandData: any;
    export const textureURI: any;
    export const colorMode: any;
    export const mesh: any;
    export const material: any;
    export const indices: any;
    export const vertexNormals: any;
    export const vertexPositions: any;
    export const vertexUVs: any;
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
    export const clipMeshes: any;
    export const cutPlanes: any;
    export const childNodes: any;
    export const geometryDirty: any;
    export const _clipAidCSGs: any;
    export const type: any;
    export const options: any;
    export const Geometry: any;
    export const srcModel: any;
    export const matrixes: any;
    export const length: any;
    export const _fgiDecorator: any;
}

declare module "635589" {
    export const HSRender: any;
    export const HSPaveSDK: any;
    export const HSCore: any;
    export const HSConstants: any;
    export const HSCatalog: any;
}

declare module "63675" {
    export const exports: any;
}

declare module "6368" {
    export const exports: any;
}

declare module "63715" {
    export const WallRegion: any;
    // Original Name: u
    export class WallRegion extends import("99827").Region {
        constructor(...args: any[]);
        create(module: any, exports: any, require: any): any;
        extrudeBody(module: any, exports: any, require: any): any;
    }
    export const linkInfo: any;
    export const coEdgePath: any;
    export const linkWallIds: any;
    export const Wall: any;
    export const wallId: any;
    export const region: any;
    export const coEdge: any;
    export const length: any;
    export const isAux: any;
}

declare module "63855" {
    export const exports: any;
}

declare module "63905" {
    export const ExtraordinaryLine2d: any;
    // Original Name: a
    export class ExtraordinaryLine2d extends import("35656").ExtraordinaryCurve2d {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any, exports: any): any;
        setFrom(module: any): any;
        setTo(module: any): any;
        split(module: any): any;
        toMathCurve(): any;
    }
    export const _from: any;
    export const _to: any;
}

declare module "63961" {
    export const MoldingUtil: any;
    export const metadata: any;
}

declare module "64082" {
    export const Tesselator: any;
    export const DEFAULT_OPTIONS: any;
    export const GLU_TESS_WINDING_ABS_GEQ_TWO: any;
    export const GLU_TESS_WINDING_NEGATIVE: any;
    export const GLU_TESS_WINDING_POSITIVE: any;
    export const GLU_TESS_WINDING_NONZERO: any;
    export const GLU_TESS_WINDING_ODD: any;
    export const GL_TRIANGLE_FAN: any;
    export const GL_TRIANGLE_STRIP: any;
    export const GL_TRIANGLES: any;
    export const GL_LINE_LOOP: any;
    export const enumerable: any;
    export const configurable: any;
    export const writable: any;
    export const length: any;
    export const run: any;
    export const __proto__: any;
    export const _vsize: any;
    export const _current: any;
    export const _out: any;
    export const _primitiveType: any;
    export const prototype: any;
    export const constructor: any;
    export const iterator: any;
}

declare module "64144" {
    export const ContentUtil: any;
    export const x: any;
    export const y: any;
    export const contentType: any;
    export const isClipped: any;
    export const clippedXLength: any;
    export const clippedYLength: any;
    export const clippedZLength: any;
    export const clippedXOffset: any;
    export const XSize: any;
    export const length: any;
    export const localId: any;
    export const XRotation: any;
    export const YRotation: any;
    export const ZRotation: any;
    export const XLength: any;
    export const YLength: any;
    export const curve: any;
}

declare module "64239" {
    export const exports: any;
}

declare module "64375" {
    export const TransactionStateEnum: any;
    export const default: any;
    export const undo: any;
    export const redo: any;
}

declare module "64498" {
    export const CornerFlatWindow: any;
    // Original Name: c
    export class CornerFlatWindow extends import("77889").CornerWindow {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any): any;
        buildPartsInfo(module: any, exports: any): any;
        isValidHost(module: any): any;
        getTopProjection(): any;
        getSideRangeData(): any;
        createChildModels(module: any): any;
        _changeSide(): any;
        _isOutlineWithHostAbsolutePosition(): any;
    }
    export const partsInfo: any;
    export const showPocket: any;
    export const sideB: any;
    export const sideC: any;
    export const B: any;
    export const PI: any;
    export const C: any;
    export const elevation: any;
    export const Sill: any;
    export const length: any;
    export const openingB: any;
    export const openingC: any;
    export const height: any;
    export const z: any;
    export const Pocket: any;
    export const boundings: any;
    export const parameters: any;
    export const _boundDirty: any;
    export const __ZLength: any;
    export const __XLength: any;
    export const __YLength: any;
    export const outPath: any;
    export const innerPath: any;
    export const middle1Path: any;
    export const middle2Path: any;
}

declare module "64530" {
    export const NCPBackgroundWallUnit: any;
    export const NCPBackgroundWallUnit_IO: any;
    // Original Name: d
    export class NCPBackgroundWallUnit_IO extends import("46973").NCPBackgroundWallBase_IO {
    }
    // Original Name: h
    export class NCPBackgroundWallUnit extends import("46973").NCPBackgroundWallBase {
        constructor(module: any, exports: any, ...args: any[]);
        getOpenDocumentExtra(module: any, exports: any): any;
        updateModelFromData(module: any, exports: any): any;
        generateSelfMolding(module: any, exports: any): any;
        calcSelfMoldingSweepPath(module: any): any;
        clearSelfMoldingByType(module: any): any;
        findSelfMoldingByType(module: any): any;
        updateSelfMoldingPosition(): any;
        getOutlineIncludeMolding(): any;
        getLoopOnWallFace(): any;
        getIO(): any;
        getBaseboardCutterInfo(module: any): any;
        _setHost(module: any): any;
        _listenSignalOnHost(module: any): any;
        mirror(module: any): any;
    }
    export const selfHostCosmeticMoldings: any;
    export const _singleHooKOnHost: any;
    export const useMinMax: any;
    export const XLength: any;
    export const YLength: any;
    export const ZLength: any;
    export const XScale: any;
    export const YScale: any;
    export const ZScale: any;
    export const meta: any;
    export const moldingId: any;
    export const parameters: any;
    export const coord: any;
    export const relyerId: any;
    export const pathCoedge3dsTags: any;
    export const faceTag: any;
    export const seekId: any;
    export const profile: any;
    export const previewProfile: any;
    export const profileHeight: any;
    export const profileWidth: any;
    export const materialData: any;