/**
 * 命令请求类型映射表
 * 
 * 定义了系统中各种操作命令对应的请求类型字符串常量。
 * 这些常量用于标识不同模块（underlay、floorplan、customized modeling、PM、wall face assembly等）的操作请求。
 * 
 * @remarks
 * 该对象被冻结，不可修改，确保类型映射的稳定性。
 * 
 * @module CommandRequestTypes
 */

/**
 * 命令请求类型定义
 * 
 * @interface CommandRequestTypes
 * @readonly
 */
export interface CommandRequestTypes {
  /** 更新底图请求 */
  readonly UpdateUnderlay: "hsw.transaction.underlay.UpdateUnderlayRequest";
  
  /** 删除底图请求 */
  readonly DeleteUnderlay: "hsw.transaction.underlay.DeleteUnderlayRequest";
  
  /** 平面图镜像请求 */
  readonly FloorplanMirror: "hsw.plugin.floorplanmirror.NgmMirrorRequest";
  
  /** 添加自定义模型线脚请求 */
  readonly AddCustomizedModelMolding: "hsw.plugin.customizedmodeling.AddCustomizedModelMoldingRequest";
  
  /** 删除自定义模型线脚请求 */
  readonly DeleteCustomizedModelMolding: "hsw.plugin.customizedmodeling.DeleteCustomizedModelMoldingRequest";
  
  /** 添加自定义模型灯槽请求 */
  readonly AddCustomizedModelLightSlot: "hsw.plugin.customizedmodeling.AddCustomizedModelLightSlotRequest";
  
  /** 删除自定义模型灯槽请求 */
  readonly DeleteCustomizedModelLightSlot: "hsw.plugin.customizedmodeling.DeleteCustomizedModelLightSlotRequest";
  
  /** 删除自定义模型灯带请求 */
  readonly DeleteCustomizedModelLightBand: "hsw.plugin.customizedmodeling.DeleteCustomizedModelLightBandRequest";
  
  /** 编辑自定义模型灯槽请求 */
  readonly EditCustomizedModelLightSlot: "hsw.plugin.customizedmodeling.EditCustomizedModelLightSlotRequest";
  
  /** 添加自定义模型灯带请求 */
  readonly AddCustomizedModelLightBand: "hsw.plugin.customizedmodeling.AddCustomizedModelLightBandRequest";
  
  /** 编辑自定义模型灯带请求 */
  readonly EditCustomizedModelLightBand: "hsw.plugin.customizedmodeling.EditCustomizedModelLightBandRequest";
  
  /** 批量编辑自定义模型灯带请求 */
  readonly EditNCustomizedModelLightBand: "hsw.plugin.customizedmodeling.EditNCustomizedModelLightBandRequest";
  
  /** 批量编辑自定义模型灯槽请求 */
  readonly EditNCustomizedModelLightSlot: "hsw.plugin.customizedmodeling.EditNCustomizedModelLightSlotRequest";
  
  /** 切换自托管灯带请求 */
  readonly ToggleSelfHostLightBand: "hsw.plugin.customizedmodeling.CmdToggleSelfHostLightBandRequest";
  
  /** 删除自定义参数化模型实例请求 */
  readonly DeleteCustomizedPMInstanceModel: "hsw.plugin.customizedpm.DeleteCustomizedPMInstanceRequest";
  
  /** 移动自定义参数化模型实例请求 */
  readonly MoveCustomizedPMInstanceModel: "hsw.plugin.customizedpm.MoveCustomizedPMInstanceRequest";
  
  /** 旋转自定义参数化模型实例请求 */
  readonly RotateCustomizedPMInstanceModel: "hsw.plugin.customizedpm.RotateCustomizedPMInstanceRequest";
  
  /** 复制自定义参数化模型实例请求 */
  readonly CopyCustomizedPMInstanceModel: "hsw.plugin.customizedpm.CopyCustomizedPMInstanceRequest";
  
  /** 导入自定义参数化模型实例请求 */
  readonly ImportCustomizedPMInstanceModel: "hsw.plugin.customizedpm.ImportCustomizedPMInstanceRequest";
  
  /** 编辑自定义参数化模型请求 */
  readonly EditCustomizedPMModel: "hsw.plugin.customizedpm.EditCustomizedPMRequest";
  
  /** 变换自定义参数化模型请求 */
  readonly TransformCustomizedPMModel: "hsw.plugin.customizedpm.TransformCustomizedPMRequest";
  
  /** 编辑自定义参数化模型类型请求 */
  readonly EditCustomizedPMModelType: "hsw.plugin.customizedpm.EditCustomizedPMTypeRequest";
  
  /** 创建自定义参数化模型请求 */
  readonly CreateCustomizedPMModel: "hsw.plugin.customizedpm.CreateCustomizedPMRequest";
  
  /** 创建墙面组件请求 */
  readonly CreateWallFaceAssembly: "hsw.plugin.wallfaceassembly.CreateWallFaceAssemblyRequest";
  
  /** 移除墙面组件请求 */
  readonly RemoveWallFaceAssembly: "hsw.plugin.wallfaceassembly.RemoveWallFaceAssemblyRequest";
  
  /** 移动墙面组件开口请求 */
  readonly MoveWFAOpening: "hsw.plugin.wallfaceassembly.MoveWFAOpeningRequest";
  
  /** 更新墙面组件中的门窗请求 */
  readonly UpdateDoorWindowInWFA: "hsw.plugin.wallfaceassembly.UpdateDoorWindowInWFARequest";
  
  /** 在墙面组件中创建NCP背景墙请求 */
  readonly CreateNCPBgWallsInWFA: "hsw.plugin.wallfaceassembly.CreateNCPBgWallsInWFARequest";
  
  /** 编辑参数化开口请求 */
  readonly EditParametricOpening: "hsw.plugin.parametricopening.EditParametricOpening";
  
  /** 添加参数化开口请求 */
  readonly AddParametricOpening: "hsw.plugin.parametricopening.AddParametricOpeningRequest";
  
  /** 代理材质刷请求 */
  readonly ProxyMaterialBrushRequest: "hsw.plugin.materialbrush.ProxyMaterialBrushRequest";
  
  /** 创建辅助线请求 */
  readonly CreateAuxiliaryLine: "hsw.plugin.auxiliaryline.CreateAuxiliaryLineRequest";
  
  /** 移除辅助线请求 */
  readonly RemoveAuxiliaryLines: "hsw.plugin.auxiliaryline.RemoveAuxiliaryLinesRequest";
}

/**
 * 命令请求类型常量对象
 * 
 * @constant
 * @type {Readonly<CommandRequestTypes>}
 * @default
 */
declare const commandRequestTypes: Readonly<CommandRequestTypes>;

export default commandRequestTypes;