/**
 * Transaction request for smart ceiling operations (molding, light slot modifications)
 * Handles undo/redo for parametric ceiling changes
 */
declare class SmartCeilingTransactionRequest extends HSCore.Transaction.Request {
  /**
   * Content entity being modified (typically a CustomizedModel)
   */
  private _content: HSCore.Model.CustomizedModel;

  /**
   * Operation type identifier
   * @example "ceilingchangeend" | "deletesmartmolding" | "deletesmartlightslot"
   */
  private _msg: string;

  /**
   * Operation-specific parameters
   */
  private _parameters: SmartCeilingParameters;

  /**
   * Profile type identifier for molding operations
   * @example "moldingProfileData" | "flippedMoldingProfileData"
   */
  private _profileType?: string;

  /**
   * Entity state snapshot before transaction
   */
  private _beforeData: Record<string, unknown>;

  /**
   * Entity state snapshot after transaction
   */
  private _afterData: Record<string, unknown>;

  /**
   * DIY face material state before transaction
   */
  private _diyBefores?: unknown;

  /**
   * DIY face material state after transaction
   */
  private _diyAfters?: unknown;

  /**
   * Entities involved in this transaction (content + lights + host)
   */
  private _transEntities: HSCore.Entity[];

  /**
   * Original WebCAD document reference
   */
  private originWebCADDoc?: unknown;

  /**
   * Original material map state
   */
  private originalMaterialMap: unknown;

  /**
   * Material brush utility instance
   */
  private MaterialBrushUtil: typeof HSApp.PaintPluginHelper.Util.MaterialBrushUtil;

  /**
   * @param content - The ceiling model to modify
   * @param msg - Operation type identifier
   * @param parameters - Operation parameters
   * @param profileType - Molding profile type (optional)
   * @param beforeData - Pre-transaction state (optional, auto-captured if not provided)
   * @param diyBefores - DIY material state (optional, auto-captured if not provided)
   */
  constructor(
    content: HSCore.Model.CustomizedModel,
    msg: string,
    parameters: SmartCeilingParameters,
    profileType?: string,
    beforeData?: Record<string, unknown>,
    diyBefores?: unknown
  );

  /**
   * Filters and collects all lighting entities from the auxiliary 2D view
   * @returns Array of lighting entities (Lighting, CeilingLight, PendantLight types)
   */
  private _lightsfilter(): HSCore.Entity[];

  /**
   * Synchronizes corner rectangle ceiling profile dimensions when profile type changes
   * Swaps X/Y dimensions between moldingProfileData and flippedMoldingProfileData
   * @param parameters - Ceiling parameters object
   * @param profileType - Active profile type to synchronize from
   */
  private _updateCornerRectCeilingParameters(
    parameters: SmartCeilingParameters,
    profileType?: string
  ): void;

  /**
   * Commits the transaction changes
   * - Updates ceiling parameters based on operation type
   * - Applies geometry changes
   * - Captures post-transaction state
   */
  onCommit(): void;

  /**
   * Reverts the transaction
   * - Restores entity state from _beforeData
   * - Restores DIY face materials
   * - Marks geometry as dirty
   */
  onUndo(): void;

  /**
   * Re-applies the transaction after undo
   * - Restores entity state from _afterData
   * - Restores DIY face materials
   * - Marks geometry as dirty
   */
  onRedo(): void;

  /**
   * Applies the ceiling geometry update
   * Triggers smart customized ceiling recalculation
   */
  private _apply(): void;
}

/**
 * Parameters for smart ceiling operations
 */
interface SmartCeilingParameters {
  /**
   * Molding profile data for primary orientation
   */
  moldingProfileData?: MoldingProfileData;

  /**
   * Molding profile data for flipped orientation
   */
  flippedMoldingProfileData?: MoldingProfileData;

  /**
   * Flag indicating material update is required
   */
  needUpdateMaterial?: boolean;

  /**
   * Identifier for molding element to delete
   */
  moldingId?: string;

  /**
   * Identifier for light slot to delete
   * @example "lightslot2" | "lightslot3" | "lightslot_path1"
   */
  lightSlotId?: string;

  /**
   * Type of parametric ceiling
   */
  parametricCeilingType?: HSCore.Util.ParametricCeilingHelper.ParametricCeilingTypeEnum;

  /**
   * Flag to enable level 2 light slot for cascade ceilings
   */
  addLightSlotLevel2?: boolean;

  /**
   * Flag to enable level 3 light slot for cascade ceilings
   */
  addLightSlotLevel3?: boolean;

  /**
   * Flag to enable inner light slot
   */
  addInnerLightSlot?: boolean;

  /**
   * Flag to enable standard light slot
   */
  addLightSlot?: boolean;

  /**
   * Additional parameters based on molding type
   */
  [key: string]: unknown;
}

/**
 * Molding profile dimensional data
 */
interface MoldingProfileData {
  /**
   * Profile size in X dimension
   */
  profileSizeX: number;

  /**
   * Profile size in Y dimension
   */
  profileSizeY: number;

  /**
   * Additional profile properties
   */
  [key: string]: unknown;
}

export default SmartCeilingTransactionRequest;