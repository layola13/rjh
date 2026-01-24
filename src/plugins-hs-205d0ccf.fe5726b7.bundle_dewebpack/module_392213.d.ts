/**
 * 工具栏标识符常量集合
 * 定义了系统中所有可用的工具栏ID类型
 */
interface ToolbarIds {
  /** 默认工具栏标识符 */
  readonly DEFAULT_TOOLBAR_ID: "default";
  
  /** 平面视图工具栏标识符 */
  readonly PLANE_TOOLBAR_ID: "plane";
  
  /** RCP工具栏标识符 */
  readonly RCP_TOOLBAR_ID: "rcp";
  
  /** 混合绘制工具栏标识符 */
  readonly MIXPAINT_TOOLBAR_ID: "mixpaint";
  
  /** 隐蔽工程V2工具栏标识符 */
  readonly CONCEALEDWORKV2_TOOLBAR_ID: "concealedworkv2";
  
  /** 第一人称3D视图工具栏标识符 */
  readonly FIRST_PERSON_3D_TOOLBAR_ID: "firstperson3d";
  
  /** 轨道3D视图工具栏标识符 */
  readonly ORBIT_VIEW_3D_TOOLBAR_ID: "orbitview3d";
  
  /** 正交3D视图工具栏标识符 */
  readonly ORTH_VIEW_3D_TOOLBAR_ID: "orthview3d";
  
  /** 隐蔽工程V2第一人称3D工具栏标识符 */
  readonly CONCEALEDWORKV2_FIRST_PERSON_3D_TOOLBAR_ID: "concealedworkfp3dv2";
  
  /** 隐蔽工程V2轨道3D视图工具栏标识符 */
  readonly CONCEALEDWORKV2_ORBIT_VIEW_3D_TOOLBAR_ID: "concealedworkov3dv2";
  
  /** 隐蔽工程V2正交3D视图工具栏标识符 */
  readonly CONCEALEDWORKV2_ORTH_VIEW_3D_TOOLBAR_ID: "concealedworkorth3dv2";
  
  /** TPZZ(iHome编辑器)工具栏标识符 */
  readonly TPZZ_TOOLBAR_ID: "iHomeEditor";
}

/**
 * 工具栏ID字符串字面量联合类型
 */
type ToolbarIdValue = ToolbarIds[keyof ToolbarIds];

/**
 * 导出的工具栏常量对象
 */
declare const toolbarIds: ToolbarIds;

export default toolbarIds;
export type { ToolbarIds, ToolbarIdValue };