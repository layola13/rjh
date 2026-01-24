/**
 * 环境类型枚举的名称映射配置
 * 
 * 该模块定义了各种编辑器环境类型与其对应的中文显示名称的映射关系。
 * 用于在用户界面中展示人类可读的环境名称。
 */

import { environment } from './environment-types';

/**
 * 环境配置项接口
 * 描述每个环境类型的配置信息
 */
export interface EnvironmentConfig {
  /** 环境的中文显示名称 */
  name: string;
}

/**
 * 环境名称映射类型
 * 将环境枚举值映射到其配置对象
 */
export type EnvironmentNameMap = {
  [K in environment]?: EnvironmentConfig;
};

/**
 * 环境类型与名称的映射表（只读）
 * 
 * 包含所有支持的编辑器环境及其对应的中文名称，涵盖：
 * - 基础环境（空、通用）
 * - 图形处理（灵图、渲染、布光）
 * - 建模工具（自由造型、背景墙、吊顶、地台等）
 * - 定制功能（全屋定制、材质替换、门窗样式等）
 * - 工程功能（水电工程、施工图、算量等）
 * - 业务环境（加购、截图、标注等）
 * 
 * @readonly 该对象在运行时被冻结，不可修改
 */
export declare const V: Readonly<EnvironmentNameMap> & {
  /** 空环境 */
  [environment.Empty]: EnvironmentConfig;
  
  /** 通用默认环境 */
  [environment.Default]: EnvironmentConfig;
  
  /** 灵图环境 */
  [environment.SparkPicEnv]: EnvironmentConfig;
  
  /** 水电工程2.0环境 */
  [environment.ConcealedWorkV2]: EnvironmentConfig;
  
  /** 模型材质替换环境 */
  [environment.ContentMaterialReplace]: EnvironmentConfig;
  
  /** 模型部件材质替换环境 */
  [environment.ContentPartMaterialReplace]: EnvironmentConfig;
  
  /** 自由造型环境 */
  [environment.CustomizedModeling]: EnvironmentConfig;
  
  /** 铺贴定制环境 */
  [environment.MixPaint]: EnvironmentConfig;
  
  /** 门窗复制样式环境 */
  [environment.OpeningStyler]: EnvironmentConfig;
  
  /** 背景墙环境（旧版） */
  [environment.CustomizedBackgroundWall]: EnvironmentConfig;
  
  /** 背景墙环境（新版） */
  [environment.NCustomizedBackgroundWall]: EnvironmentConfig;
  
  /** 吊顶环境（旧版） */
  [environment.CustomizedCeilingModel]: EnvironmentConfig;
  
  /** 吊顶环境（新版） */
  [environment.NCustomizedCeilingModel]: EnvironmentConfig;
  
  /** 地台环境（旧版） */
  [environment.CustomizedPlatform]: EnvironmentConfig;
  
  /** 地台环境（新版） */
  [environment.NCustomizedPlatform]: EnvironmentConfig;
  
  /** 硬装材质替换环境 */
  [environment.FaceMaterial]: EnvironmentConfig;
  
  /** 渲染环境 */
  [environment.Render]: EnvironmentConfig;
  
  /** 布光环境 */
  [environment.ManualLighting]: EnvironmentConfig;
  
  /** 自由造型2.0环境 */
  [environment.CustomizedPM]: EnvironmentConfig;
  
  /** 编辑楼板环境 */
  [environment.SlabEdit]: EnvironmentConfig;
  
  /** 添加参数化屋顶环境 */
  [environment.AddRoofEnv]: EnvironmentConfig;
  
  /** 全屋定制环境（柜体版） */
  [environment.TPZZCabinet]: EnvironmentConfig;
  
  /** 算量环境 */
  [environment.Bom]: EnvironmentConfig;
  
  /** 全屋定制环境 */
  [environment.TPZZ]: EnvironmentConfig;
  
  /** 单柜体专注编辑环境 */
  [environment.FocusModeEnv]: EnvironmentConfig;
  
  /** 加购环境（V1） */
  [environment.AddCartEnv]: EnvironmentConfig;
  
  /** 加购环境（V2） */
  [environment.AddCartEnvV2]: EnvironmentConfig;
  
  /** 下单截图环境 */
  [environment.ContentCaptureEnv]: EnvironmentConfig;
  
  /** 移门生成环境 */
  [environment.SlidingDoor]: EnvironmentConfig;
  
  /** 标注环境 */
  [environment.Elevation]: EnvironmentConfig;
  
  /** 台面/顶线/脚线/灯线环境 */
  [environment.MoldingEnv]: EnvironmentConfig;
  
  /** 编辑原始户型环境 */
  [environment.EditOriginDesign]: EnvironmentConfig;
  
  /** 施工图环境（V1） */
  [environment.ExportDWGEnv]: EnvironmentConfig;
  
  /** 施工图环境（V2.0） */
  [environment.CadEditorEnv]: EnvironmentConfig;
  
  /** 候选集配置环境 */
  [environment.CandidateConfigureEnv]: EnvironmentConfig;
};