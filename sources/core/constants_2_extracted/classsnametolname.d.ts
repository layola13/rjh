/**
 * 模型类名映射模块
 * 提供短名称与长名称之间的双向转换功能
 */

/**
 * 模型类的完整命名空间路径（长名称）
 * 所有模型类的标准全限定名称定义
 */
export declare const ModelClass: Readonly<{
  readonly Association: "HSCore.Model.Association";
  readonly PointOnLineAssociation: "HSCore.Model.PointOnLineAssociation";
  readonly EdgeOnLineAssociation: "HSCore.Model.EdgeOnLineAssociation";
  readonly PointOnPointAssociation: "HSCore.Model.PointOnPointAssociation";
  readonly ArcCurve: "HSCore.Model.ArcCurve";
  readonly AuxiliaryLine: "HSCore.Model.AuxiliaryLine";
  readonly NgVertex: "HSCore.Model.Vertex";
  readonly NgWall: "HSCore.Model.Wall";
  readonly NgFloorplan: "HSCore.Model.Floorplan";
  readonly NgEntity: "HSCore.Model.Entity";
  readonly NgEdge: "HSCore.Model.Edge";
  readonly NgCoEdge: "HSCore.Model.CoEdge";
  readonly NgFace: "HSCore.Model.Face";
  readonly NgLoop: "HSCore.Model.Loop";
  readonly NgHole: "HSCore.Model.Hole";
  readonly NgDoor: "HSCore.Model.Door";
  readonly NgWindow: "HSCore.Model.Window";
  readonly NgOpening: "HSCore.Model.Opening";
  readonly NgContent: "HSCore.Model.Content";
  readonly NgSoftCloth: "HSCore.Model.SoftCloth";
  readonly NgCamera: "HSCore.Model.Camera";
  readonly Slab: "HSCore.Model.Slab";
  readonly SlabFace: "HSCore.Model.SlabFace";
  readonly BaseProfile: "HSCore.Model.BaseProfile";
  readonly SideFace: "HSCore.Model.SideFace";
  readonly Layer: "HSCore.Model.Layer";
  readonly Scene: "HSCore.Model.Scene";
  readonly NgPocket: "HSCore.Model.Pocket";
  readonly NgCustomizedModel: "HSCore.Model.CustomizedModel";
  readonly CustomizedModelMolding: "HSCore.Model.CustomizedModelMolding";
  readonly CustomizedModelLightSlot: "HSCore.Model.CustomizedModelLightSlot";
  readonly CustomizedModelLightBand: "HSCore.Model.CustomizedModelLightBand";
  readonly CustomizedPMModel: "HSCore.Model.CustomizedPMModel";
  readonly CustomizedPMInstanceModel: "HSCore.Model.CustomizedPMInstanceModel";
  readonly NCustomizedModelMolding: "HSCore.Model.NCustomizedModelMolding";
  readonly NCustomizedModelLightSlot: "HSCore.Model.NCustomizedModelLightSlot";
  readonly NCustomizedModelLightBand: "HSCore.Model.NCustomizedModelLightBand";
  readonly NCustomizedStructure: "HSCore.Model.NCustomizedStructure";
  readonly NCustomizedSquareColumn: "HSCore.Model.NCustomizedSquareColumn";
  readonly NCustomizedCircleColumn: "HSCore.Model.NCustomizedCircleColumn";
  readonly NCustomizedFlue: "HSCore.Model.NCustomizedFlue";
  readonly NCustomizedRiser: "HSCore.Model.NCustomizedRiser";
  readonly NCustomizedOutlet: "HSCore.Model.NCustomizedOutlet";
  readonly NCustomizedBeam: "HSCore.Model.NCustomizedBeam";
  readonly NgMolding: "HSCore.Model.Molding";
  readonly NgWallMolding: "HSCore.Model.WallMolding";
  readonly NgCornice: "HSCore.Model.Cornice";
  readonly NgBaseboard: "HSCore.Model.Baseboard";
  readonly Mitre: "HSCore.Model.Mitre";
  readonly NgFloor: "HSCore.Model.Floor";
  readonly NgCeiling: "HSCore.Model.Ceiling";
  readonly NgMaterial: "HSCore.Model.Material";
  readonly NgGroup: "HSCore.Model.Group";
  readonly NgPModel: "HSCore.Model.PModel";
  readonly NgPBox: "HSCore.Model.PBox";
  readonly NgPExtruding: "HSCore.Model.PExtruding";
  readonly NgPContent: "HSCore.Model.PContent";
  readonly NgPMolding: "HSCore.Model.PMolding";
  readonly DSweep: "HSCore.Model.DSweep";
  readonly NgPAssembly: "HSCore.Model.PAssembly";
  readonly NgPSegmentLoft: "HSCore.Model.PSegmentLoft";
  readonly NgPSlidingDoor: "HSCore.Model.PSlidingDoor";
  readonly NgPSlidingDoorLeaf: "HSCore.Model.PSlidingDoorLeaf";
  readonly NgCornerWindow: "HSCore.Model.CornerWindow";
  readonly NgBayWindow: "HSCore.Model.BayWindow";
  readonly NgCornerFlatWindow: "HSCore.Model.CornerFlatWindow";
  readonly NgPOrdinaryWindow: "HSCore.Model.POrdinaryWindow";
  readonly NgParametricModel: "HSCore.Model.ParametricModel";
  readonly NgParametricExtrudedBody: "HSCore.Model.Parametrization.ExtrudedBody";
  readonly NgParametricWall: "HSCore.Model.Parametrization.Wall";
  readonly NgParametricWindow: "HSCore.Model.Parametrization.Window";
  readonly NgParametricWindowCeiling: "HSCore.Model.Parametrization.WindowCeiling";
  readonly NgParametricWindowSill: "HSCore.Model.Parametrization.WindowSill";
  readonly NgParametricWindowHole: "HSCore.Model.Parametrization.WindowHole";
  readonly NgParametricWindowPocket: "HSCore.Model.Parametrization.WindowPocket";
  readonly NgBeam: "HSCore.Model.Beam";
  readonly NgObstacle: "HSCore.Model.Obstacle";
  readonly NgColumn: "HSCore.Model.Column";
  readonly NgFlue: "HSCore.Model.Flue";
  readonly NgCurtain: "HSCore.Model.Curtain";
  readonly NgLight: "HSCore.Model.Light";
  readonly NgGrid: "HSCore.Model.Grid";
  readonly NgDirectionLight: "HSCore.Model.DirectionLight";
  readonly NgVirtualAreaLight: "HSCore.Model.VirtualAreaLight";
  readonly NgFlatLight: "HSCore.Model.FlatLight";
  readonly NgEllipseLight: "HSCore.Model.EllipseLight";
  readonly NgPointLight: "HSCore.Model.PointLight";
  readonly NgSpotLight: "HSCore.Model.SpotLight";
  readonly NgAttenuatedSpotLight: "HSCore.Model.AttenuatedSpotLight";
  readonly NgMeshLight: "HSCore.Model.MeshLight";
  readonly NgPhysicalLight: "HSCore.Model.PhysicalLight";
  readonly NgAsmPhysicalLight: "HSCore.Model.AsmPhysicalLight";
  readonly NgSpotPhysicalLight: "HSCore.Model.SpotPhysicalLight";
  readonly NgLightSubGroup: "HSCore.Model.NgLightSubGroup";
  readonly NgAsmLightSubGroup: "HSCore.Model.NgAsmLightSubGroup";
  readonly NgLightGroup: "HSCore.Model.LightGroup";
  readonly NgSewerPipe: "HSCore.Model.SewerPipe";
  readonly NgUnderlay: "HSCore.Model.Underlay";
  readonly NgWallBoardBaseboard: "HSCore.Model.WallBoardBaseboard";
  readonly NgWallBoardWaistLine: "HSCore.Model.WallBoardWaistLine";
  readonly NgPattern: "HSCore.Model.Pattern";
  readonly NgBlock: "HSCore.Model.Block";
  readonly Point2D: "HSCore.Model.Point2D";
  readonly Curve2d: "HSCore.Model.Curve2d";
  readonly Line2d: "HSCore.Model.Line2d";
  readonly Face2d: "HSCore.Model.Face2d";
  readonly GuideLine2d: "HSCore.Model.GuideLine2d";
  readonly Sketch2d: "HSCore.Model.Sketch2d";
  readonly Circle2d: "HSCore.Model.Circle2d";
  readonly CircleArc2d: "HSCore.Model.CircleArc2d";
  readonly Shape: "HSCore.Model.Shape";
  readonly Region: "HSCore.Model.Region";
  readonly Waistline: "HSCore.Model.Waistline";
  readonly Polygon: "HSCore.Model.Polygon";
  readonly Wire: "HScore.Model.Wire";
  readonly MixPaint: "HSCore.Model.Mixpaint";
  readonly MixPaintDecorator: "HSCore.Model.MixPaintDecorator";
  readonly Boundary: "HSCore.Model.Boundary";
  readonly Grid: "HSCore.Model.Grid";
  readonly MixGrid: "HSCore.Model.MixGrid";
  readonly MixBlock: "HSCore.Model.MixBlock";
  readonly BoundaryBlock: "HSCore.Model.BoundaryBlock";
  readonly PatternGrid: "HSCore.Model.PatternGrid";
  readonly PatternBlock: "HSCore.Model.PatternBlock";
  readonly FreePatternGrid: "HSCore.Model.FreePatternGrid";
  readonly FreePatternBlock: "HSCore.Model.FreePatternBlock";
  readonly GussetBlock: "HSCore.Model.GussetBlock";
  readonly GussetSurface: "HSCore.Model.GussetSurface";
  readonly GussetGroup: "HSCore.Model.GussetGroup";
  readonly WaterJetTile: "HSCore.Model.WaterJetTile";
  readonly MixSketch2d: "HSCore.Model.MixSketch2d";
  readonly DecorateSketch2d: "HSCore.Model.DecorateSketch2d";
  readonly CustomizedFeatureModel: "HSCore.Model.CustomizedFeatureModel";
  readonly CustomizedCeilingModel: "HSCore.Model.CustomizedCeilingModel";
  readonly CustomizedBackgroundWall: "HSCore.Model.CustomizedBackgroundWall";
  readonly CustomizedPlatform: "HSCore.Model.CustomizedPlatform";
  readonly NCustomizedFeatureModel: "HSCore.Model.NCustomizedFeatureModel";
  readonly NCustomizedSketchModel: "HSCore.Model.NCustomizedSketchModel";
  readonly NCustomizedCeilingModel: "HSCore.Model.NCustomizedCeilingModel";
  readonly NCustomizedBackgroundWall: "HSCore.Model.NCustomizedBackgroundWall";
  readonly NCustomizedPlatform: "HSCore.Model.NCustomizedPlatform";
  readonly NCustomizedParametricModel: "HSCore.Model.NCustomizedParametricModel";
  readonly NCustomizedParametricCeiling: "HSCore.Model.NCustomizedParametricCeiling";
  readonly NCustomizedParametricRoof: "HSCore.Model.NCustomizedParametricRoof";
  readonly NCustomizedParametricStairs: "HSCore.Model.NCustomizedParametricStairs";
  readonly ParametricOpening: "HSCore.Model.ParametricOpening";
  readonly NCPBackgroundWallBase: "HSCore.Model.NCPBackgroundWallBase";
  readonly ParametricContentBase: "HSCore.Model.ParametricContentBase";
  readonly ParametricCurtain: "HSCore.Model.ParametricCurtain";
  readonly ParametricBathroomCabinet: "HSCore.Model.ParametricBathroomCabinet";
  readonly ParametricDoor: "HSCore.Model.ParametricDoor";
  readonly ParametricModelArray: "HSCore.Model.ParametricModelArray";
  readonly ParametricContentSubpart: "HSCore.Model.ParametricContentSubpart";
  readonly NCustomizedParametricBackgroundWall: "HSCore.Model.NCustomizedParametricBackgroundWall";
  readonly NCPBackgroundWallUnit: "HSCore.Model.NCPBackgroundWallUnit";
  readonly NCPBackgroundWallSubpart: "HSCore.Model.NCPBackgroundWallSubpart";
  readonly NCPBackgroundWallContent: "HSCore.Model.NCPBackgroundWallContent";
  readonly ParametricModelContent: "HSCore.Model.ParametricModelContent";
  readonly NCPBackgroundWallArray: "HSCore.Model.NCPBackgroundWallArray";
  readonly DAssembly: "HSCore.Model.DAssembly";
  readonly DOpening: "HSCore.Model.DOpening";
  readonly DExtruding: "HSCore.Model.DExtruding";
  readonly SpaceHole: "HSCore.Model.SpaceHole";
  readonly DMolding: "HSCore.Model.DMolding";
  readonly DContent: "HSCore.Model.DContent";
  readonly DHole: "HSCore.Model.DHole";
  readonly DWindow: "HSCore.Model.DWindow";
  readonly Skybox: "HSCore.Model.Skybox";
  readonly MaterialData: "HSCore.Material.MaterialData";
  readonly State: "HSCore.State";
  readonly PointState: "HSCore.State.PointState";
  readonly Point2DState: "HSCore.State.Point2DState";
  readonly ArrayState: "HSCore.State.ArrayState";
  readonly Arc2DState: "HSCore.State.Arc2DState";
  readonly Constraint: "HSCore.Constraint";
  readonly EquationConstraint: "HSCore.Constraint.EquationConstraint";
  readonly PositionConstraint: "HSCore.Constraint.PositionConstraint";
  readonly ConcealedWork: "HSCore.Model.ConcealedWork";
  readonly ConcealedWorkCompEntity: "HSCore.Model.ConcealedWorkCompEntity";
  readonly ConcealedWorkNode: "HSCore.Model.ConcealedWorkNode";
  readonly ConcealedWorkTree: "HSCore.Model.ConcealedWorkTree";
  readonly ConcealedWorkLightTree: "HSCore.Model.ConcealedWorkLightTree";
  readonly ConcealedWorkTubeTree: "HSCore.Model.ConcealedWorkTubeTree";
  readonly ConcealedWorkLightWire: "HSCore.Model.ConcealedWorkLightWire";
  readonly ConcealedWorkTube: "HSCore.Model.ConcealedWorkTube";
  readonly ConcealedWorkPowerSys: "HSCore.Model.ConcealedWorkPowerSys";
  readonly ConcealedWorkCircuit: "HSCore.Model.ConcealedWorkCircuit";
  readonly ConcealedWorkLightControlSys: "HSCore.Model.ConcealedWorkLightControlSys";
  readonly ConcealedWorkLightLogic: "HSCore.Model.ConcealedWorkLightLogic";
  readonly MeshContent: "HSCore.Model.MeshContent";
  readonly WallFaceAssembly: "HSCore.Model.WallFaceAssembly";
  readonly RoofsDrawing: "HSCore.Model.RoofsDrawing";
  readonly RoofDrawingRegion: "HSCore.Model.RoofDrawingRegion";
}>;

/**
 * 长名称到短名称的映射表
 * 用于将完整的命名空间路径转换为压缩的短名称（用于序列化优化）
 */
 * @example
 * ClassLNameToSName.get("HSCore.Model.Wall") // returns "Wall"
 */
export declare const ClassLNameToSName: Map<string, string>;

/**
 * 短名称到长名称的映射表
 * 用于将压缩的短名称还原为完整的命名空间路径（用于反序列化）
 */
 * @example
 * ClassSNameToLName.get("Wall") // returns "HSCore.Model.Wall"
 */
export declare const ClassSNameToLName: Map<string, string>;