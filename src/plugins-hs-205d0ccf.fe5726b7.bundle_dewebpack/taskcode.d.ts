/**
 * 任务代码枚举
 * 定义系统中各类高级功能任务的唯一标识符
 */
export enum TaskCode {
  /**
   * 导入户型图任务
   * 用于Web端高级功能中的户型图导入操作
   */
  importfloorplan = "WEB_ADVANCE_IMPORT_FLOOR_PLANNER",

  /**
   * 全景渲染任务
   * 用于Web端高级功能中的全景图渲染操作
   */
  panoramarender = "WEB_ADVANCE_PANORAMA_RENDER",

  /**
   * 灵感库应用任务
   * 用于Web端高级功能中的模板应用操作
   */
  inspirationlibraryapply = "WEB_ADVANCE_TEMPLATE_APPLY"
}