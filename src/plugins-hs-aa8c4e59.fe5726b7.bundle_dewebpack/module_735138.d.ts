/**
 * Analytics event definitions for tracking user interactions across the application.
 * Each event contains a topic identifier and a list of required parameters.
 * @module AnalyticsEventDefinitions
 */

/**
 * Represents a single analytics event configuration
 */
export interface AnalyticsEvent {
  /** The event topic/category identifier */
  topic: string;
  /** List of required parameter names for this event */
  params: string[];
}

/**
 * Complete catalog of all analytics events in the application.
 * This object is frozen to prevent runtime modifications.
 */
export interface AnalyticsEventCatalog {
  /** Triggered when a model is dragged in the catalog */
  catalog_catalog_drag_model_event: AnalyticsEvent;
  
  /** Triggered when a recommended model is used from the right property bar */
  recommendation_plugin_right_propertybar_use_model_event: AnalyticsEvent;
  
  /** Triggered when model recommendations are displayed in the right property bar */
  recommendation_plugin_right_propertybar_model_event: AnalyticsEvent;
  
  /** Triggered when a category is requested in the right property bar */
  recommendation_plugin_right_propertybar_category_event: AnalyticsEvent;
  
  /** Triggered when a recommended category is selected in the right property bar */
  recommendation_plugin_right_propertybar_recommandcategory_event: AnalyticsEvent;
  
  /** Triggered when a catalog search is performed */
  catalog_catalog_search_event: AnalyticsEvent;
  
  /** Triggered when a catalog page is exposed/viewed */
  catalog_exposure_page_event: AnalyticsEvent;
  
  /** Triggered when a product is dragged from the catalog */
  catalog_catalog_darg_product_event: AnalyticsEvent;
  
  /** Triggered when search suggestions are requested */
  catalog_search_suggestion_request_event: AnalyticsEvent;
  
  /** Triggered when a search suggestion hint is selected */
  catalog_search_suggestion_hint_event: AnalyticsEvent;
  
  /** Triggered when a styler template is imported from catalog */
  catalog_import_styler_template_event: AnalyticsEvent;
  
  /** Triggered on each step of the new user guide */
  newuserguide_current_step_event: AnalyticsEvent;
  
  /** Triggered when user exits a step in the new user guide */
  newuserguide_exit_step_event: AnalyticsEvent;
  
  /** Triggered when user completes guide and starts a new design */
  newuserguide_end_guide_start_new_design_event: AnalyticsEvent;
  
  /** Triggered when user completes guide and views rendered image */
  newuserguide_end_guide_view_rendered_image_event: AnalyticsEvent;
  
  /** Triggered when the original layout is saved from toolbar */
  toolbar_toolbar_save_origin_layout: AnalyticsEvent;
  
  /** Triggered when a CAD file is created for export */
  dwgexport_dwgexport_create_cad_event: AnalyticsEvent;
  
  /** Triggered when a CAD file is edited during export */
  dwgexport_dwgexport_edit_cad_event: AnalyticsEvent;
  
  /** Triggered with the result of a CAD export operation */
  dwgexport_dwgexport_export_cad_result_event: AnalyticsEvent;
  
  /** Triggered when exporting construction CAD drawings */
  dwgexport_dwgexport_export_construction_cad: AnalyticsEvent;
  
  /** Triggered when a CAD file upload is initiated */
  dwgimport_dwgimport_upload_cad_file_event: AnalyticsEvent;
  
  /** Triggered with the result of a CAD file upload */
  dwgimport_dwgimport_upload_cad_result_event: AnalyticsEvent;
  
  /** Triggered when a wall is deleted during CAD import */
  dwgimport_dwgimport_delete_wall_event: AnalyticsEvent;
  
  /** Triggered when a model is deleted via command */
  command_command_delete_model_event: AnalyticsEvent;
}

/**
 * Frozen catalog of all analytics events.
 * This ensures the event definitions cannot be modified at runtime.
 */
declare const analyticsEventCatalog: Readonly<AnalyticsEventCatalog>;

export default analyticsEventCatalog;