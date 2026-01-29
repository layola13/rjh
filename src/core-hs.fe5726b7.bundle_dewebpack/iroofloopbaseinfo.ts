export interface IRoofLoopBaseInfo {
  // Define specific properties based on your domain requirements
}

export interface IRoofLoop {
  // Define specific properties based on your domain requirements
}

export enum EnRoofLoopType {
  // Define enum values based on your domain requirements
}

export enum EnRoofLoopPositionType {
  // Define enum values based on your domain requirements
}

export { MaterialUtil as PaintMaterial } from './MaterialUtil';
export { PaintsUtil as Paints } from './PaintsUtil';
export { AffineTransform } from './AffineTransform';
export { ArrayUtil as Array } from './ArrayUtil';
export { Bound } from './Bound';
export { BrepBound } from './BrepBound';
export { Cryptojs as CryptoJS } from './Cryptojs';
export { Flag } from './Flag';
export { IDGenerator } from './IDGenerator';
export { IDGeneratorType } from './IDGeneratorType';
export { JSONDecycle } from './JSONDecycle';
export { JSONRetrocycle } from './JSONRetrocycle';
export { MathUtil as Math } from './MathUtil';
export { ProfileParser } from './ProfileParser';
export { Signal } from './Signal';
export { SignalHook } from './SignalHook';
export { SignalEvent } from './SignalEvent';
export { SVGUtil } from './SVGUtil';
export { Unit } from './Unit';
export { Url } from './Url';
export { Version } from './Version';
export { String } from './String';
export { BackgroundPathUtil as BackgroundPath } from './BackgroundPathUtil';
export { BoundaryUtil } from './BoundaryUtil';
export { CeilingUtil as Ceiling } from './CeilingUtil';
export { ConstraintUtil as Constraint } from './ConstraintUtil';
export { ContentUtil as Content } from './ContentUtil';
export { Curve2dUtil as Curve2d } from './Curve2dUtil';
export { CurveInfoUtil as CurveInfo } from './CurveInfoUtil';
export { CustomizedFeatureModelUtil as CustomizedFeatureModel } from './CustomizedFeatureModelUtil';
export { NCustomizedFeatureModelUtil as NCustomizedFeatureModel } from './NCustomizedFeatureModelUtil';
export { NCPBackgroundWallBaseUtil as NCPBackgroundWallBase } from './NCPBackgroundWallBaseUtil';
export { NCParametricModelMaterialUtil as NCParametricModelMaterial } from './NCParametricModelMaterialUtil';
export { NCustomizedParametricModelUtil as NCustomizedParametricModel } from './NCustomizedParametricModelUtil';
export * as CustomizedModel from './CustomizedModel';
export { CustomizedTileUtil as CustomizedTile } from './CustomizedTileUtil';
export * as DEntityUtils from './DEntityUtils';
export { DocCrypto } from './DocCrypto';
export { MetaUtil as Meta } from './MetaUtil';
export { EdgeUtil as Edge } from './EdgeUtil';
export { EntityUtil as Entity } from './EntityUtil';
export { FaceUtil as Face } from './FaceUtil';
export { SameLineFaceUtil as SameLineFace } from './SameLineFaceUtil';
export { FloorUtil as Floor } from './FloorUtil';
export { GeometryUtil as Geometry } from './GeometryUtil';
export { LayerUtil as Layer } from './LayerUtil';
export { LoopUtil as Loop } from './LoopUtil';
export { Matrix3DHandler } from './Matrix3DHandler';
export { GridUtil as Grid } from './GridUtil';
export { FloorMixpaintUtil as FloorMixpaint } from './FloorMixpaintUtil';
export { DoorStoneMixpaintUtil as DoorStoneMixpaint } from './DoorStoneMixpaintUtil';
export { SplitSpaceMixpaintUtil as SplitSpaceMixpaint } from './SplitSpaceMixpaintUtil';
export { MoldingUtil as Molding } from './MoldingUtil';
export * as Object from './Object';
export { ObjectPool } from './ObjectPool';
export { OpeningUtil as Opening } from './OpeningUtil';
export * as ParametricCeilingHelper from './ParametricCeilingHelper';
export * as ParametricDIYMaterial from './ParametricDIYMaterial';
export { PAssemblyBody } from './PAssemblyBody';
export { PAssemblyPath } from './PAssemblyPath';
export { PAssemblyRotation } from './PAssemblyRotation';
export { PAssemblyUtil as PAssembly } from './PAssemblyUtil';
export { PatternUtil as Pattern } from './PatternUtil';
export { PointUtil as Point } from './PointUtil';
export { PolygonUtil as Polygon } from './PolygonUtil';
export { RoomUtil as Room } from './RoomUtil';
export { RoomInfo, RoomInfoManager } from './RoomInfo';
export { Sketch2dUtil as Sketch2d } from './Sketch2dUtil';
export { ExtraordinarySketch2d, SnapPoint } from './ExtraordinarySketch2d';
export { Skybox } from './Skybox';
export { SlabUtil as Slab } from './SlabUtil';
export { StateUtil as State } from './StateUtil';
export { Transaction } from './Transaction';
export { TransUtil as Transform } from './TransUtil';
export { WallUtil as Wall } from './WallUtil';
export { TgWallUtil as TgWall } from './TgWallUtil';
export { TgSlabUtil as TgSlab } from './TgSlabUtil';
export { JointUtil as Joint } from './JointUtil';
export { WallIntersectResolver } from './WallIntersectResolver';
export { WallPathResolver } from './WallPathResolver';
export * as RetryUtil from './RetryUtil';
export { IFaceDwgData, INCustomizedDwgData } from './DwgData';
export { FaceDwgUtil as FaceDwg } from './FaceDwgUtil';
export { NCustomizedDwgUtil as NCustomizedDwg } from './NCustomizedDwgUtil';
export { CustomizedPMDwgUtil as CustomizedPMDwg } from './CustomizedPMDwgUtil';
export { FaceGroupUtil as FaceGroup } from './FaceGroupUtil';
export { NCustomizedFaceGroupUtil as NCustomizedFaceGroup } from './NCustomizedFaceGroupUtil';
export { NCustomizedFaceGroupLightSlotUtil as NCustomizedFaceGroupLightSlot } from './NCustomizedFaceGroupLightSlotUtil';
export { CWContentUtil } from './CWContentUtil';
export { MaterialUtil as Material } from './MaterialUtil';
export { INCPClipTask, TaskManagerState as NCPClipTaskManagerState, NCPClipTaskManager } from './NCPClipTaskManager';
export { MeshTransformUtil as MeshTransform } from './MeshTransformUtil';
export { OpeningSnapHelper } from './OpeningSnapHelper';
export { FaceMoldingFitHelper } from './FaceMoldingFitHelper';
export { RoofUtil as Roof, IRoofLoopBaseInfo, IRoofLoop, EnRoofLoopType, EnRoofLoopPositionType } from './RoofUtil';