interface EventConfig {
  topic: string;
  params: string[];
}

interface EventRegistry {
  catalog_catalog_drag_model_event: EventConfig;
  recommendation_plugin_right_propertybar_use_model_event: EventConfig;
  recommendation_plugin_right_propertybar_model_event: EventConfig;
  recommendation_plugin_right_propertybar_category_event: EventConfig;
  recommendation_plugin_right_propertybar_recommandcategory_event: EventConfig;
  catalog_catalog_search_event: EventConfig;
  catalog_exposure_page_event: EventConfig;
  catalog_catalog_darg_product_event: EventConfig;
  catalog_search_suggestion_request_event: EventConfig;
  catalog_search_suggestion_hint_event: EventConfig;
  catalog_import_styler_template_event: EventConfig;
  newuserguide_current_step_event: EventConfig;
  newuserguide_exit_step_event: EventConfig;
  newuserguide_end_guide_start_new_design_event: EventConfig;
  newuserguide_end_guide_view_rendered_image_event: EventConfig;
  toolbar_toolbar_save_origin_layout: EventConfig;
  dwgexport_dwgexport_create_cad_event: EventConfig;
  dwgexport_dwgexport_edit_cad_event: EventConfig;
  dwgexport_dwgexport_export_cad_result_event: EventConfig;
  dwgexport_dwgexport_export_construction_cad: EventConfig;
  dwgimport_dwgimport_upload_cad_file_event: EventConfig;
  dwgimport_dwgimport_upload_cad_result_event: EventConfig;
  dwgimport_dwgimport_delete_wall_event: EventConfig;
  command_command_delete_model_event: EventConfig;
}

const eventRegistry: Readonly<EventRegistry> = Object.freeze({
  catalog_catalog_drag_model_event: {
    topic: "catalog_statistic",
    params: ["GUID"]
  },
  recommendation_plugin_right_propertybar_use_model_event: {
    topic: "eUseModelRecommend",
    params: ["uid", "pid", "pos", "requestId", "env", "timestamp"]
  },
  recommendation_plugin_right_propertybar_model_event: {
    topic: "eModelRecommend",
    params: ["uid", "pageSize", "requestId", "productList", "env", "modelId", "timestamp"]
  },
  recommendation_plugin_right_propertybar_category_event: {
    topic: "eCategoryRequest",
    params: ["uid", "designID", "roomType", "resultListIDs", "resultListNames", "requestId", "env", "timestamp"]
  },
  recommendation_plugin_right_propertybar_recommandcategory_event: {
    topic: "eCategorySelect",
    params: ["uid", "designID", "selectedCateName", "roomType", "categoryName", "categoryID", "label", "requestId", "env", "timestamp"]
  },
  catalog_catalog_search_event: {
    topic: "eSearch",
    params: ["uid", "searchStr", "designID", "pageNum", "pageSize", "searchContext", "tid", "requestId", "categoriesIds", "productList", "filter", "env", "timestamp"]
  },
  catalog_exposure_page_event: {
    topic: "eCurrentPage",
    params: ["uid", "requestId", "currentPage", "timestamp"]
  },
  catalog_catalog_darg_product_event: {
    topic: "eUseModel",
    params: ["uid", "pid", "designID", "pageNum", "pos", "searchContext", "tid", "requestId", "env", "timestamp"]
  },
  catalog_search_suggestion_request_event: {
    topic: "eRequestHint",
    params: ["uid", "designID", "searchStr", "pageSize", "tid", "env", "timestamp"]
  },
  catalog_search_suggestion_hint_event: {
    topic: "eSelectHint",
    params: ["uid", "designID", "keyword", "pos", "tid", "env", "timestamp", "requestId"]
  },
  catalog_import_styler_template_event: {
    topic: "eImportStylerTemplate",
    params: ["designID", "roomType", "templateId", "env", "timestamp"]
  },
  newuserguide_current_step_event: {
    topic: "eNewUserGuideCurrentStep",
    params: ["userID", "env", "step", "hasUsedUserGuide"]
  },
  newuserguide_exit_step_event: {
    topic: "eNewUserGuideExitStep",
    params: ["userID", "env", "step", "hasUsedUserGuide"]
  },
  newuserguide_end_guide_start_new_design_event: {
    topic: "eNewUserGuideEndGuideStartNewDesignStep",
    params: ["userID", "env", "hasUsedUserGuide"]
  },
  newuserguide_end_guide_view_rendered_image_event: {
    topic: "eNewUserGuideEndGuideViewRenderedImageStep",
    params: ["userID", "env", "hasUsedUserGuide"]
  },
  toolbar_toolbar_save_origin_layout: {
    topic: "eSaveOriginLayout",
    params: ["designId"]
  },
  dwgexport_dwgexport_create_cad_event: {
    topic: "eExportCAD",
    params: ["CADType"]
  },
  dwgexport_dwgexport_edit_cad_event: {
    topic: "eEditCAD",
    params: ["CADType"]
  },
  dwgexport_dwgexport_export_cad_result_event: {
    topic: "eExportCADResult",
    params: ["designId", "jobId", "success", "errorType"]
  },
  dwgexport_dwgexport_export_construction_cad: {
    topic: "eExportConstructionCAD",
    params: ["designId", "CADType", "CADSpace", "CADFormat", "fileType"]
  },
  dwgimport_dwgimport_upload_cad_file_event: {
    topic: "eUploadCADFile",
    params: []
  },
  dwgimport_dwgimport_upload_cad_result_event: {
    topic: "eUploadCADResult",
    params: ["uploadCADUrl", "success", "errorType"]
  },
  dwgimport_dwgimport_delete_wall_event: {
    topic: "eUploadCADClear",
    params: ["uploadCADUrl"]
  },
  command_command_delete_model_event: {
    topic: "eModelDelete",
    params: ["designID", "roomId", "modelId", "env", "timestamp"]
  }
});

export default eventRegistry;