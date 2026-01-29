interface CommandHandlers {
  [key: string]: () => void;
}

function getCommandHandlers(this: any): CommandHandlers {
  const handlers: CommandHandlers = {};
  
  handlers[HSFPConstants.CommandType.InsertLayer] = this._onInsertLayer.bind(this);
  handlers[HSFPConstants.CommandType.AddNewLayer] = this._onAddNewLayer.bind(this);
  handlers[HSFPConstants.CommandType.DeleteLayer] = this._onDeleteLayer.bind(this);
  handlers[HSFPConstants.CommandType.ChangeLayerVisibility3d] = this._onChangeLayerVisibility3d.bind(this);
  handlers[HSFPConstants.CommandType.ActiveLayer] = this.onActivateLayer.bind(this);
  handlers[HSFPConstants.CommandType.RenameLayer] = this._onLayerNameChange.bind(this);
  handlers[HSFPConstants.CommandType.ResetLayerIndex] = this._onLayerIndexReset.bind(this);
  handlers.ToggleCeiling = this._onToggleCeiling.bind(this);
  
  return handlers;
}