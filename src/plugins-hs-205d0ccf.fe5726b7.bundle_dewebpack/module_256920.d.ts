/**
 * Selection command module for handling entity selection in the HSApp application.
 * Manages selection, multi-selection, and deselection of various model entities.
 * 
 * @module SelectionCommand
 */

/**
 * Represents a selectable entity that can be selected in the application.
 * Base interface for all selectable model objects.
 */
interface ISelectableEntity {
  /**
   * Determines if this entity can be selected.
   * @returns {boolean} True if the entity can be selected
   */
  canSelect(): boolean;

  /**
   * Flag to ignore selection behavior.
   */
  ignoreSel?: boolean;
}

/**
 * Selection filter that can filter entities during selection operations.
 */
interface ISelectionFilter {
  /**
   * Filters an entity based on custom logic.
   * @param {ISelectableEntity} entity - The entity to filter
   * @param {any} context - Additional context for filtering
   * @returns {ISelectableEntity} The filtered entity or modified entity
   */
  filter(entity: ISelectableEntity, context: any): ISelectableEntity;
}

/**
 * Selection Manager interface for managing entity selections.
 * Provides methods for selecting, unselecting, and querying selected entities.
 */
interface ISelectionManager {
  /**
   * Gets the currently selected entities.
   * @returns {ISelectableEntity[]} Array of selected entities
   */
  selected(): ISelectableEntity[];

  /**
   * Checks if an entity is currently selected.
   * @param {ISelectableEntity} entity - The entity to check
   * @returns {boolean} True if the entity is selected
   */
  hasSelected(entity: ISelectableEntity): boolean;

  /**
   * Selects an entity.
   * @param {ISelectableEntity} entity - The entity to select
   * @param {any} [context] - Optional context for selection
   */
  select(entity: ISelectableEntity, context?: any): void;

  /**
   * Unselects a specific entity.
   * @param {ISelectableEntity} entity - The entity to unselect
   */
  unselect(entity: ISelectableEntity): void;

  /**
   * Unselects all currently selected entities.
   */
  unselectAll(): void;

  /**
   * Gets the current selection filter.
   * @returns {ISelectionFilter | null} The current filter or null
   */
  getCurrentFilter(): ISelectionFilter | null;
}

/**
 * Command Manager interface for managing command execution lifecycle.
 */
interface ICommandManager {
  /**
   * Marks the command as completed.
   */
  complete(): void;
}

/**
 * Selection Command class that handles entity selection operations.
 * Extends the base Command class and implements selection logic for various entity types.
 * 
 * Supports:
 * - Single selection
 * - Multi-selection with modifier keys
 * - Selection filtering
 * - Special handling for parametric models, structures, beams, and background walls
 * 
 * @extends {HSApp.Cmd.Command}
 */
declare class SelectionCommand extends HSApp.Cmd.Command {
  /**
   * Reference to the application's Selection Manager.
   * @private
   */
  private _selectionMgr: ISelectionManager;

  /**
   * Creates a new SelectionCommand instance.
   */
  constructor();

  /**
   * Executes the selection command.
   * 
   * @param {ISelectableEntity} entity - The entity to select
   * @param {boolean} isMultiSelect - Whether this is a multi-select operation (e.g., Ctrl+Click)
   * @param {any} context - Additional context for the selection operation
   * @returns {boolean | void} False if selection was aborted, void otherwise
   * 
   * @remarks
   * This method handles:
   * - Mix Paint environment special cases
   * - Selection filtering through the current filter
   * - Parent resolution for parametric content and subparts
   * - Face selection validation
   * - Multi-select toggle behavior
   * - Position updates for structures and beams
   */
  onExecute(entity: ISelectableEntity, isMultiSelect: boolean, context: any): boolean | void;

  /**
   * Cleanup method called after command execution.
   * Currently performs no operations.
   */
  onCleanup(): void;

  /**
   * Determines if this command supports undo/redo operations.
   * 
   * @returns {boolean} Always returns false - selection operations are not undoable
   */
  canUndoRedo(): boolean;

  /**
   * Gets a human-readable description of this command.
   * 
   * @returns {string} The localized description "选择操作" (Selection Operation)
   */
  getDescription(): string;

  /**
   * Reference to the command manager.
   * @protected
   */
  protected mgr: ICommandManager;
}

/**
 * Default export of the SelectionCommand class.
 */
export default SelectionCommand;

/**
 * Global namespace declarations for HSApp ecosystem.
 */
declare global {
  namespace HSApp {
    namespace Selection {
      /**
       * Global Selection Manager instance.
       */
      const Manager: ISelectionManager;
    }

    namespace Cmd {
      /**
       * Base Command class that all commands extend.
       */
      class Command {
        protected mgr: ICommandManager;
      }
    }

    namespace App {
      /**
       * Gets the main application instance.
       */
      function getApp(): {
        /**
         * ID of the currently active environment.
         */
        activeEnvironmentId: string;
      };
    }

    namespace PaintPluginHelper {
      namespace Kernel {
        /**
         * Handler for Mix Paint plugin operations.
         */
        const MixPaintPluginHandler: {
          environment: {
            paintMode: {
              current: string;
            };
          };
        } | null;
      }
    }

    namespace View {
      namespace Util {
        /**
         * Gets the parent entity of a specific type from the entity hierarchy.
         * @param {any} entity - The starting entity
         * @param {string | string[]} entityTypes - The entity type(s) to search for
         * @returns {any | null} The parent entity or null
         */
        function getParentByEntityType(entity: any, entityTypes: string | string[]): any | null;
      }
    }

    namespace Util {
      namespace Selection {
        /**
         * Determines if an entity supports multi-selection.
         * @param {ISelectableEntity} entity - The entity to check
         * @returns {boolean} True if the entity can be multi-selected
         */
        function canMultiSelect(entity: ISelectableEntity): boolean;
      }
    }
  }

  namespace HSCore {
    namespace Model {
      /**
       * Represents a face in the 3D model.
       */
      class Face implements ISelectableEntity {
        canSelect(): boolean;
        /**
         * Gets the master entity that owns this face.
         */
        getMaster(): ISelectableEntity | null;
      }

      /**
       * Base class for customized structures.
       */
      class NCustomizedStructure implements ISelectableEntity {
        canSelect(): boolean;
        /**
         * Marks the position as dirty for recalculation.
         */
        dirtyPosition(): void;
      }

      /**
       * Represents a customized beam element.
       */
      class NCustomizedBeam implements ISelectableEntity {
        canSelect(): boolean;
        /**
         * Marks the position as dirty for recalculation.
         */
        dirtyPosition(): void;
      }

      /**
       * Represents a parametric opening in the model.
       */
      class ParametricOpening implements ISelectableEntity {
        canSelect(): boolean;
      }

      /**
       * Represents a subpart of parametric content.
       */
      class ParametricContentSubpart implements ISelectableEntity {
        canSelect(): boolean;
      }

      /**
       * Represents parametric model content.
       */
      class ParametricModelContent implements ISelectableEntity {
        canSelect(): boolean;
      }

      /**
       * Represents an array of parametric models.
       */
      class ParametricModelArray implements ISelectableEntity {
        canSelect(): boolean;
      }

      /**
       * Represents a background wall unit.
       */
      class NCPBackgroundWallUnit implements ISelectableEntity {
        canSelect(): boolean;
      }

      /**
       * Represents a customized parametric background wall.
       */
      class NCustomizedParametricBackgroundWall implements ISelectableEntity {
        canSelect(): boolean;
      }

      /**
       * Base class for background wall models.
       */
      class NCPBackgroundWallBase implements ISelectableEntity {
        canSelect(): boolean;
      }

      /**
       * Represents a customized model molding.
       */
      class NCustomizedModelMolding implements ISelectableEntity {
        canSelect(): boolean;
        contentType: {
          /**
           * Checks if the content type matches a specific type.
           */
          isTypeOf(type: string): boolean;
        };
        /**
         * Gets the unique parent entity.
         */
        getUniqueParent(): ISelectableEntity | null;
      }

      /**
       * Represents a light slot model.
       */
      class NCustomizedModelLightSlot implements ISelectableEntity {
        canSelect(): boolean;
        getUniqueParent(): ISelectableEntity | null;
      }

      /**
       * Represents a light band model.
       */
      class NCustomizedModelLightBand implements ISelectableEntity {
        canSelect(): boolean;
        getUniqueParent(): ISelectableEntity | null;
      }

      /**
       * Represents a parametric curtain model.
       */
      class ParametricCurtain implements ISelectableEntity {
        canSelect(): boolean;
      }

      /**
       * Represents a parametric bathroom cabinet.
       */
      class ParametricBathroomCabinet implements ISelectableEntity {
        canSelect(): boolean;
      }
    }

    namespace Util {
      namespace Content {
        /**
         * Gets the root content entity from a given entity.
         * @param {any} entity - The entity to get root content from
         * @returns {any} The root content entity
         */
        function getRootContent(entity: any): any;
      }
    }
  }

  namespace HSFPConstants {
    /**
     * Environment constants.
     */
    namespace Environment {
      /**
       * Mix Paint environment identifier.
       */
      const MixPaint: string;
    }
  }

  namespace HSConstants {
    /**
     * Model class type constants.
     */
    namespace ModelClass {
      const NCPBackgroundWallUnit: string;
      const NCustomizedParametricBackgroundWall: string;
      const ParametricCurtain: string;
      const ParametricBathroomCabinet: string;
    }
  }
}