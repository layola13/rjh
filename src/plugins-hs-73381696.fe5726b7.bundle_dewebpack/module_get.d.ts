/**
 * Command handler map for layer operations
 * Maps command types to their respective handler functions
 */
interface LayerCommandHandlerMap {
  /** Handler for inserting a layer at a specific position */
  [HSFPConstants.CommandType.InsertLayer]: () => void;
  
  /** Handler for adding a new layer */
  [HSFPConstants.CommandType.AddNewLayer]: () => void;
  
  /** Handler for deleting a layer */
  [HSFPConstants.CommandType.DeleteLayer]: () => void;
  
  /** Handler for changing 3D visibility state of a layer */
  [HSFPConstants.CommandType.ChangeLayerVisibility3d]: () => void;
  
  /** Handler for activating/selecting a layer */
  [HSFPConstants.CommandType.ActiveLayer]: () => void;
  
  /** Handler for renaming a layer */
  [HSFPConstants.CommandType.RenameLayer]: () => void;
  
  /** Handler for resetting layer index/order */
  [HSFPConstants.CommandType.ResetLayerIndex]: () => void;
  
  /** Handler for toggling ceiling visibility */
  ToggleCeiling: () => void;
}

/**
 * Creates and returns a map of command handlers for layer operations
 * @returns A dictionary mapping command types to bound handler methods
 */
declare function getLayerCommandHandlers(this: LayerCommandContext): LayerCommandHandlerMap;

/**
 * Context interface for layer command handlers
 * Defines the methods that handlers are bound to
 */
interface LayerCommandContext {
  /** Internal handler for layer insertion */
  _onInsertLayer(): void;
  
  /** Internal handler for adding new layer */
  _onAddNewLayer(): void;
  
  /** Internal handler for layer deletion */
  _onDeleteLayer(): void;
  
  /** Internal handler for 3D visibility changes */
  _onChangeLayerVisibility3d(): void;
  
  /** Public handler for layer activation */
  onActivateLayer(): void;
  
  /** Internal handler for layer name changes */
  _onLayerNameChange(): void;
  
  /** Internal handler for layer index reset */
  _onLayerIndexReset(): void;
  
  /** Internal handler for ceiling toggle */
  _onToggleCeiling(): void;
}