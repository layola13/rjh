/**
 * Module: Line2d
 * 
 * Provides context menu functionality for 2D line entities in the HSCore application.
 * This module determines which actions are available when a Line2d entity is selected
 * and generates the corresponding menu items.
 */

import { HSCore } from './HSCore';
import { SvgMap } from './SvgMap';

/**
 * Configuration for a property bar menu item
 */
interface PropertyBarItem {
  /** Unique identifier for the menu item */
  id: string;
  /** Control type enum value */
  type: PropertyBarControlTypeEnum;
  /** Display order in the menu */
  order: number;
  /** UI modes where this item should be visible */
  uiMode: HSFPConstants.UIMode[];
  /** Whether the item is disabled */
  disable?: boolean;
  /** SVG icon source */
  src?: string;
  /** Localized label text */
  label: string;
  /** Click handler function */
  onClick: () => void;
}

/**
 * Context object passed to menu item generation functions
 */
interface MenuContext {
  /** Selected entities */
  entities: HSCore.Model.Entity[];
  /** Application instance */
  app: HSApp.App;
}

/**
 * Line2d menu item provider
 * 
 * Responsible for generating context menu items specific to 2D line entities.
 * Supports operations like delete, duplicate, and line-to-arc conversion.
 */
export const Line2d = {
  /** Module name identifier */
  name: "Line2d" as const,

  /**
   * Checks if this menu provider applies to the given entities
   * 
   * @param entities - Array of selected entities to check
   * @returns True if at least one entity is a Line2d instance
   */
  isApplied(entities: HSCore.Model.Entity[]): boolean {
    return entities.some((entity) => entity instanceof HSCore.Model.Line2d);
  },

  /**
   * Generates menu items for Line2d entities
   * 
   * @param context - Menu context containing entities and app instance
   * @returns Array of property bar items to display
   */
  getItems(context: MenuContext): PropertyBarItem[] {
    const { entities, app } = context;
    const items: PropertyBarItem[] = [];
    const firstEntity = entities[0] as HSCore.Model.Line2d;
    const eventTracker = HSApp.Util.EventTrack.instance();
    const activeEnvId = app.activeEnvironmentId;
    const isWallCeilingPlatform = app.environmentManager.isWallCeilingPlatformEnv();
    const leftMenuPlugin = HSApp.App.getApp().pluginManager.getPlugin(
      HSFPConstants.PluginType.LeftMenu
    );

    // Add delete item if available and entity is not a background element
    if (leftMenuPlugin?.commonItems) {
      const deleteItemFactory = leftMenuPlugin.commonItems.getDeleteItem;
      if (!firstEntity.isbackground) {
        items.push(deleteItemFactory(context));
      }
    }

    // Add duplicate item for customized feature environments
    if (HSApp.Util.NCustomizedFeatureModel.isNCustomizedEnv() && entities.length === 1) {
      items.push({
        id: "sectionandelevationcopy",
        type: PropertyBarControlTypeEnum.imageButton,
        order: 151,
        uiMode: [HSFPConstants.UIMode.layoutDesignMode],
        disable: false,
        src: SvgMap.duplicate,
        label: ResourceManager.getString("content_contextmenu_duplicate_title"),
        onClick: () => {
          const cmdManager = app.cmdManager;
          const duplicateCommand = cmdManager.createCommand(
            HSFPConstants.CommandType.NCustomizedFeatureModel.CmdSectionAndElevationCopy,
            [firstEntity]
          );
          cmdManager.execute(duplicateCommand);
        }
      });
    }

    // Add line-to-arc conversion for single Line2d entities in wall/ceiling/platform environments
    if (
      firstEntity instanceof HSCore.Model.Line2d &&
      isWallCeilingPlatform &&
      !firstEntity.isbackground &&
      entities.length === 1
    ) {
      items.push({
        id: "linetoArc",
        type: PropertyBarControlTypeEnum.imageButton,
        order: 150,
        uiMode: [HSFPConstants.UIMode.layoutDesignMode],
        src: SvgMap.linetoArc,
        label: ResourceManager.getString("content_contextmenu_line2arc"),
        onClick: () => {
          const cmdManager = app.cmdManager;
          const selectedEntities = app.selectionManager.selected();

          if (selectedEntities.length < 1) {
            return;
          }

          const selectedEntity = selectedEntities[0];
          if (
            !(selectedEntity instanceof HSCore.Model.Line2d) ||
            selectedEntity.isBackground()
          ) {
            return;
          }

          // Track analytics event
          eventTracker.track(
            HSApp.Util.EventGroupEnum.Rightmenu,
            "2Dsketch_line_to_arc_event",
            {
              IF_env: activeEnvId
            }
          );

          // Calculate arc radius as 10% of line length
          const lineLength = HSCore.Util.Math.Vec2.distance(
            selectedEntity.from,
            selectedEntity.to
          );
          const arcRadius = lineLength / 10;

          const convertCommand = cmdManager.createCommand(
            HSFPConstants.CommandType.Sketch2d.ConvertLineToArc,
            [selectedEntity, arcRadius]
          );
          cmdManager.execute(convertCommand);
        }
      });
    }

    return items;
  }
};