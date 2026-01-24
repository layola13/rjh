/**
 * Wall transaction request type constants
 * Defines all available wall-related transaction request types in the HSW system
 * @module WallTransactionTypes
 */

/**
 * Wall transaction request type enumeration
 * Contains string constants for identifying different wall operation requests
 */
export interface WallTransactionTypes {
  /** Move a non-geometric wall request */
  readonly MoveNGWall: "hsw.transaction.wall.MoveNGWallRequest";
  
  /** Move a topology/geometric wall request */
  readonly MoveTGWall: "hsw.transaction.wall.MoveTGWallRequest";
  
  /** Move a topology/geometric wall point request */
  readonly MoveTGWallPoint: "hsw.transaction.wall.MoveTGWallPointRequest";
  
  /** Delete a non-geometric wall request */
  readonly DeleteNGWall: "hsw.transaction.wall.DeleteNGWallRequest";
  
  /** Delete a topology/geometric wall request */
  readonly DeleteTGWall: "hsw.transaction.wall.DeleteTGWallRequest";
  
  /** Delete multiple topology/geometric walls request */
  readonly DeleteTGWalls: "hsw.transaction.wall.DeleteTGWallsRequest";
  
  /** Delete multiple non-geometric walls request */
  readonly DeleteNGWalls: "hsw.transaction.wall.DeleteNGWallsRequest";
  
  /** Move a non-geometric wall point request */
  readonly MoveNGWallPoint: "hsw.transaction.wall.MoveNGWallPointRequest";
  
  /** Create rectangular walls request */
  readonly CreateRectWalls: "hsw.transaction.wall.CreateRectWallsRequest";
  
  /** Create freeform non-geometric wall request */
  readonly CreateFreeformNGWall: "hsw.transaction.wall.CreateFreeformNGWallRequest";
  
  /** Create topology/geometric wall request */
  readonly CreateTgWall: "hsw.transaction.wall.CreateTgWallRequest";
  
  /** Split a non-geometric wall request */
  readonly SplitNGWall: "hsw.transaction.wall.SplitNGWallRequest";
  
  /** Free cut wall request */
  readonly FreeCutWall: "hsw.transaction.wall.FreeCutWallRequest";
  
  /** Cut wall request */
  readonly CutWall: "hsw.transaction.wall.CutWallRequest";
  
  /** Merge wall on a specific point request */
  readonly MergeWallOnPoint: "hsw.transaction.wall.MergeWallOnPointRequest";
  
  /** Merge wall request */
  readonly MergeWall: "hsw.transaction.wall.MergeWallRequest";
  
  /** Change wall type request */
  readonly ChangeWallType: "hsw.transcation.wall.ChangeWallTypeRequest";
  
  /** Change topology/geometric wall type request */
  readonly ChangeTGWallType: "hsw.transcation.wall.ChangeTGWallTypeRequest";
  
  /** Change to arc wall request */
  readonly ChangeToArcWall: "hsw.transaction.wall.ChangeToArcWallRequest";
  
  /** Switch arc wall request */
  readonly SwitchArcWall: "hsw.transaction.wall.SwitchArcWall";
  
  /** Change wall sagitta (arc depth) request */
  readonly ChangeWallSagitta: "hsw.transaction.wall.ChangeWallSagitta";
  
  /** Change topology/geometric wall curve request */
  readonly ChangeTgWallCurve: "hsw.transaction.wall.ChangeTgWallCurve";
  
  /** Change wall curve request */
  readonly ChangeWallCurve: "hsw.transaction.wall.ChangeWallCurve";
  
  /** Resize multiple walls request */
  readonly ResizeWalls: "hsw.request.wall.ResizeWalls";
  
  /** Resize multiple topology/geometric walls request */
  readonly ResizeTgWalls: "hsw.request.wall.ResizeTgWalls";
  
  /** Change walls width request */
  readonly ChangeWallsWidth: "hsw.request.wall.ChangeWallsWidthRequest";
  
  /** Change wall auto-connect behavior request */
  readonly ChangeWallAutoConnect: "hsw.request.wall.ChangeWallAutoConnect";
}

/**
 * Frozen object containing all wall transaction request type constants
 * This object is immutable and serves as a type-safe enum
 */
declare const WallTransactionTypes: Readonly<WallTransactionTypes>;

export default WallTransactionTypes;