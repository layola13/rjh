interface PropertyBarHintItem {
  id: string;
  type: PropertyBarControlTypeEnum;
  order: number;
  data: {
    text: string;
  };
}

interface SelectionTipResult {
  tip: string;
  preserved: boolean;
}

interface SelectionEvent {
  data?: {
    oldEntities?: any[];
    newEntities?: any[];
  };
}

interface HighlightEvent {
  data?: {
    oldEntity?: any;
    newEntity?: any;
  };
}

interface CommandTerminateEvent {
  data?: {
    cmd?: any;
  };
}

/**
 * Manages operation tips displayed in the property bar based on user selections and interactions
 */
export default class OperationTipManager {
  private _selectionMgr: any;
  private _operationTip: string;
  private _oldOperationTip: string;

  constructor() {
    const app = HSApp.App.getApp();
    this._selectionMgr = app.selectionManager;
    this._operationTip = "";
    this._oldOperationTip = "";
  }

  /**
   * Gets the help tips item for the property bar
   * @param customTip - Optional custom tip text to override current operation tip
   * @returns Property bar hint item configuration
   */
  getHelpTipsItem(customTip?: string): PropertyBarHintItem {
    const tipText = customTip ?? this._operationTip;
    return {
      id: "propertyBarHint",
      type: PropertyBarControlTypeEnum.label,
      order: 600,
      data: {
        text: tipText
      }
    };
  }

  /**
   * Sets the current operation tip
   * @param tip - The tip text to display
   * @param preserve - Whether to preserve this tip as the old operation tip
   */
  setTip(tip: string, preserve?: boolean): void {
    this._operationTip = tip ?? "";
    if (preserve) {
      this._oldOperationTip = tip;
    }
  }

  /**
   * Gets the current operation tip
   * @returns The current operation tip text
   */
  getTip(): string {
    return this._operationTip;
  }

  /**
   * Clears the current operation tip
   * @param restoreOld - Whether to restore the old operation tip
   */
  clearTip(restoreOld: boolean): void {
    if (restoreOld) {
      this.setTip(this._oldOperationTip, restoreOld);
    } else {
      this.setTip("", true);
    }
  }

  /**
   * Handles selection change events
   * @param event - The selection event containing old and new entities
   */
  handleSelection(event: SelectionEvent): void {
    const currentFilter = this._selectionMgr.getCurrentFilter();
    
    if (event?.data && currentFilter.constructor.name !== "CabinetComponentFilter") {
      const entities = event.data.oldEntities ?? event.data.newEntities;
      const firstEntity = entities && entities.length >= 1 ? entities[0] : null;
      const selectedEntities = this._selectionMgr.selected();

      if (selectedEntities && selectedEntities.length !== 0) {
        if (selectedEntities.length === 1) {
          const selectionTip = this._getSelectionTip(selectedEntities[0]);
          this.setTip(selectionTip.tip, selectionTip.preserved);
        }
      } else {
        const recoverable = this._getSelectionRecoverable(firstEntity);
        this.clearTip(recoverable);
      }
    }
  }

  /**
   * Handles highlight change events
   * @param event - The highlight event containing old and new entity
   */
  handleHighlight(event: HighlightEvent): void {
    if (event?.data) {
      const entity = event.data.oldEntity ?? event.data.newEntity;
      
      if (entity instanceof HSCore.Model.Vertex && HSCore.Util.Point.canMergeWall(entity)) {
        const highlightedEntity = HSApp.Selection.Manager.highlighted();
        
        if (highlightedEntity) {
          this.setTip(this._getSelectionTip(highlightedEntity).tip, false);
        } else {
          this.clearTip(true);
        }
      }
    }
  }

  /**
   * Handles command termination events
   * @param event - The command termination event
   */
  handleCmdTerminate(event: CommandTerminateEvent): void {
    if (event?.data?.cmd) {
      // Command termination logic placeholder
    }
  }

  /**
   * Determines if the selection tip should be recoverable based on entity type
   * @param entity - The entity to check
   * @returns Whether the tip should be recoverable
   */
  private _getSelectionRecoverable(entity: any): boolean {
    if (!entity) {
      return true;
    }

    if (entity instanceof HSCore.Model.FlatLight || entity instanceof HSCore.Model.SpotLight) {
      return true;
    }

    if ((entity instanceof HSCore.Model.Vertex && HSCore.Util.Point.canMergeWall(entity)) || 
        entity instanceof HSCore.Model.Group) {
      return false;
    }

    return true;
  }

  /**
   * Gets the appropriate tip text for a selected entity
   * @param entity - The selected entity
   * @returns Object containing tip text and preservation flag
   */
  private _getSelectionTip(entity: any): SelectionTipResult {
    let result: SelectionTipResult = {
      tip: "",
      preserved: false
    };

    if (entity instanceof HSCore.Model.FlatLight || entity instanceof HSCore.Model.SpotLight) {
      result = {
        tip: ResourceManager.getString("operation_tip_manuallighting_adjust_light_angle"),
        preserved: false
      };
    } else if (entity instanceof HSCore.Model.Vertex && HSCore.Util.Point.canMergeWall(entity)) {
      result = {
        tip: ResourceManager.getString("operation_tip_contextmenu_mergewalljoint_prompt"),
        preserved: true
      };
    } else if (entity instanceof HSCore.Model.Wall) {
      if (!HSApp.App.getApp().is3DViewActive()) {
        result = {
          tip: ResourceManager.getString("operation_tip_livehint_movewall"),
          preserved: true
        };
      }
    } else if (entity instanceof HSCore.Model.Group) {
      result = {
        tip: ResourceManager.getString("operation_tip_ungroup"),
        preserved: true
      };
    }

    if (entity instanceof HSCore.Model.Content) {
      if (entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.RangeCooktop)) {
        result = {
          tip: ResourceManager.getString("operation_tip_gas_stove"),
          preserved: false
        };
      }

      if (entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Sink)) {
        result = {
          tip: ResourceManager.getString("operation_tip_water_tank"),
          preserved: false
        };
      }

      if (entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.WaterHeaterElectrical)) {
        result = {
          tip: ResourceManager.getString("operation_tip_water_heater"),
          preserved: false
        };
      }

      if (entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.VentilationCeilingAttached)) {
        result = {
          tip: ResourceManager.getString("operation_tip_lampblack_machine"),
          preserved: false
        };
      }
    }

    return result;
  }
}