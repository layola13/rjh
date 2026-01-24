/**
 * Module: CircleArc2d
 * 
 * This module provides property bar configuration for CircleArc2d entities.
 * It defines when the property bar should appear and what actions are available
 * for CircleArc2d geometry objects in the 2D drawing context.
 */

import { HSCore } from '../path/to/HSCore';
import { SvgMap } from '../path/to/SvgMap';

/**
 * Configuration context for property bar items
 */
interface PropertyBarContext {
  /** Array of selected entities */
  entities: HSCore.Model.CircleArc2d[];
  /** Application instance */
  app: HSApp.App;
}

/**
 * Property bar control types enumeration
 */
declare enum PropertyBarControlTypeEnum {
  imageButton = 'imageButton',
  // ... other types
}

/**
 * Property bar item configuration
 */
interface PropertyBarItem {
  /** Unique identifier for the item */
  id: string;
  /** Control type (button, dropdown, etc.) */
  type: PropertyBarControlTypeEnum;
  /** Display order in the property bar */
  order: number;
  /** UI modes where this item should be visible */
  uiMode: string[];
  /** Icon source path or SVG reference */
  src: string;
  /** Localized label text */
  label: string;
  /** Click event handler */
  onClick: () => void;
}

/**
 * Property bar configuration interface
 */
interface PropertyBarConfig {
  /** Name of the property bar configuration */
  name: string;
  
  /**
   * Determines if this property bar should be applied to the given entities
   * @param entities - Array of selected entities
   * @returns True if any entity is a CircleArc2d instance
   */
  isApplied: (entities: unknown[]) => boolean;
  
  /**
   * Retrieves the property bar items for the selected CircleArc2d entities
   * @param context - Context containing entities and app instance
   * @returns Array of property bar items to display
   */
  getItems: (context: PropertyBarContext) => PropertyBarItem[];
}

/**
 * CircleArc2d Property Bar Configuration
 * 
 * Defines the property bar behavior for 2D circular arc entities.
 * Provides actions like delete and duplicate (in customized environments).
 */
export const CircleArc2d: PropertyBarConfig = {
  name: 'CircleArc2d',

  /**
   * Checks if any of the selected entities is a CircleArc2d
   * @param entities - Array of entities to check
   * @returns True if at least one entity is a CircleArc2d
   */
  isApplied: (entities: unknown[]): boolean => {
    return entities.some((entity: unknown) => {
      return entity instanceof HSCore.Model.CircleArc2d;
    });
  },

  /**
   * Builds the property bar items for CircleArc2d entities
   * @param context - Context with selected entities and app reference
   * @returns Array of property bar action items
   */
  getItems: (context: PropertyBarContext): PropertyBarItem[] => {
    const { entities, app } = context;
    const items: PropertyBarItem[] = [];
    const firstEntity = entities[0];

    // Get left menu plugin to access common items like delete
    const leftMenuPlugin = HSApp.App.getApp()
      .pluginManager
      .getPlugin(HSFPConstants.PluginType.LeftMenu);

    // Add delete action if entity is not a background element
    if (leftMenuPlugin?.commonItems) {
      const deleteItem = leftMenuPlugin.commonItems.getDeleteItem;
      if (!firstEntity.isbackground) {
        items.push(deleteItem(context));
      }
    }

    // Add duplicate action in customized environments (single entity selection only)
    const isCustomizedEnvironment = HSApp.Util.NCustomizedFeatureModel.isNCustomizedEnv();
    const isSingleSelection = entities.length === 1;

    if (isCustomizedEnvironment && isSingleSelection) {
      items.push({
        id: 'sectionandelevationcopy',
        type: PropertyBarControlTypeEnum.imageButton,
        order: 151,
        uiMode: [HSFPConstants.UIMode.layoutDesignMode],
        src: SvgMap.duplicate,
        label: ResourceManager.getString('content_contextmenu_duplicate_title'),
        onClick: (): void => {
          const commandManager = app.cmdManager;
          const duplicateCommand = commandManager.createCommand(
            HSFPConstants.CommandType.NCustomizedFeatureModel.CmdSectionAndElevationCopy,
            [firstEntity]
          );
          commandManager.execute(duplicateCommand);
        }
      });
    }

    return items;
  }
};