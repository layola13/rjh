/**
 * Property bar data item for customized parametric stairs
 */
interface PropertyBarItem {
  /** Unique identifier for the property bar item */
  id?: string;
  /** Property bar type identifier */
  type: HSFPConstants.PropertyBarType;
  /** Display label for the item */
  label: string;
  /** Child items for hierarchical structure */
  items?: PropertyBarItem[];
  /** Display order priority (lower values appear first) */
  order?: number;
  /** CSS class name for styling */
  className?: string;
}

/**
 * Event data structure containing property bar items
 */
interface PropertyBarEventData {
  /** Array of property bar items to be displayed */
  data: PropertyBarItem[];
}

/**
 * Selection manager interface for managing selected model elements
 */
interface SelectionManager {
  /**
   * Get currently selected model elements
   * @returns Array of selected model instances
   */
  selected(): HSCore.Model.BaseModel[];
}

/**
 * Application instance interface
 */
interface App {
  /** Selection manager instance */
  selectionManager: SelectionManager;
}

/**
 * Constants for property bar types and configurations
 */
declare namespace HSFPConstants {
  enum PropertyBarType {
    /** Root property bar container */
    PropertyBar = 'PropertyBar',
    /** First-level navigation node */
    FirstLevelNode = 'FirstLevelNode'
  }
}

/**
 * Core model namespace containing 3D model classes
 */
declare namespace HSCore.Model {
  /** Base class for all model elements */
  class BaseModel {
    /** Human-readable display name of the model element */
    displayName: string;
  }

  /** Customized parametric stairs model class */
  class NCustomizedParametricStairs extends BaseModel {}
}

/**
 * Resource manager for internationalization and localization
 */
declare namespace ResourceManager {
  /**
   * Retrieve localized string by key
   * @param key - Localization key identifier
   * @returns Localized string value
   */
  function getString(key: string): string;
}

/**
 * Live hint UI utility for showing/hiding tooltip hints
 */
declare namespace LiveHint {
  /** Hide the currently displayed live hint */
  function hide(): void;
}

/**
 * Property bar handler class for customized parametric stairs
 */
declare class CustomizedStairsPropertyBarHandler {
  /** Application instance reference */
  private readonly app: App;

  /**
   * Retrieve parameter setting configuration items
   * @param model - The customized parametric stairs model instance
   * @param categoryId - Category identifier for grouping parameters
   * @returns Array of parameter setting property bar items
   */
  private getParameterSettingItems(
    model: HSCore.Model.NCustomizedParametricStairs,
    categoryId: string
  ): PropertyBarItem[];

  /**
   * Retrieve style setting configuration items
   * @param model - The customized parametric stairs model instance
   * @returns Array of style setting property bar items
   */
  private getStyleSettingItems(
    model: HSCore.Model.NCustomizedParametricStairs
  ): PropertyBarItem[];

  /**
   * Handle property bar data population for customized parametric stairs
   * 
   * This method is invoked when a customized parametric stairs element is selected.
   * It populates the property bar with parameter settings and style settings organized
   * in a hierarchical structure.
   * 
   * @param event - Event object containing property bar data array
   */
  public handlePropertyBarData(event?: PropertyBarEventData): void;
}

/**
 * Implementation of the property bar data handler
 */
declare function handlePropertyBarData(this: CustomizedStairsPropertyBarHandler, event?: PropertyBarEventData): void {
  // Hide any active live hints
  LiveHint.hide();

  const propertyBarData = event?.data;
  const selectedElement = this.app.selectionManager.selected()[0];

  // Check if the selected element is a customized parametric stairs instance
  if (selectedElement instanceof HSCore.Model.NCustomizedParametricStairs) {
    // Add root property bar container with model display name
    propertyBarData.push({
      type: HSFPConstants.PropertyBarType.PropertyBar,
      label: selectedElement.displayName
    });

    // Define category ID for parameter settings
    const PARAMETER_CATEGORY_ID = 'parameter-setting-first-level';

    // Retrieve parameter and style setting items
    const parameterItems = this.getParameterSettingItems(
      selectedElement,
      PARAMETER_CATEGORY_ID
    );
    const styleItems = this.getStyleSettingItems(selectedElement);

    // Add parameter settings and style settings as first-level nodes
    propertyBarData.push(
      {
        id: PARAMETER_CATEGORY_ID,
        label: ResourceManager.getString('plugin_propertybar_parameter_setting'),
        type: HSFPConstants.PropertyBarType.FirstLevelNode,
        items: parameterItems,
        order: 10,
        className: 'parameter-setting-first-level'
      },
      {
        id: 'customized-content-style-setting',
        label: ResourceManager.getString('plugin_propertybar_style_setting'),
        type: HSFPConstants.PropertyBarType.FirstLevelNode,
        items: styleItems,
        order: 20
      }
    );
  }
}