/**
 * Command for toggling entity visibility
 * Handles show/hide operations with undo/redo support
 */
export default class ToggleVisibilityCommand extends HSApp.Cmd.Command {
  private content: HSCore.Model.Entity;
  private show: boolean;

  /**
   * Creates a new visibility toggle command
   * @param content - The entity whose visibility will be toggled
   */
  constructor(content: HSCore.Model.Entity) {
    super();
    this.content = content;
  }

  /**
   * Executes the visibility toggle operation
   * @param show - True to show the entity, false to hide it
   */
  onExecute(show: boolean): void {
    const isCurrentlyVisible = this.content.isFlagOff(HSCore.Model.EntityFlagEnum.hidden);
    
    if (isCurrentlyVisible === show) {
      this.mgr.cancel(this);
      return;
    }
    
    this.show = show;
    this._switchFlag(show);
    this.mgr.complete(this);
  }

  /**
   * Undoes the visibility change
   */
  onUndo(): void {
    this._switchFlag(!this.show);
  }

  /**
   * Redoes the visibility change
   */
  onRedo(): void {
    this._switchFlag(this.show);
  }

  /**
   * Internal method to toggle the hidden flag
   * @param show - True to show (remove hidden flag), false to hide (add hidden flag)
   */
  private _switchFlag(show: boolean): void {
    const entity = this.content;
    
    if (show) {
      entity.setFlagOff(HSCore.Model.EntityFlagEnum.hidden);
    } else {
      entity.setFlagOn(HSCore.Model.EntityFlagEnum.hidden);
      
      // Unselect the entity if it's not part of a group
      if (!entity.group) {
        HSApp.Selection.Manager.unselect(entity);
      }
    }
  }

  /**
   * Gets the human-readable description of this command
   * @returns The command description
   */
  getDescription(): string {
    return "隐藏物品";
  }

  /**
   * Gets the category/type of this command for logging purposes
   * @returns The log group type
   */
  getCategory(): HSFPConstants.LogGroupType {
    return HSFPConstants.LogGroupTypes.ViewOperation;
  }
}