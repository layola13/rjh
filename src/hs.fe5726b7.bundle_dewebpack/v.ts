import { environment } from './environment';

interface EnvironmentConfig {
  name: string;
}

type EnvironmentMapping = {
  [key in environment]: EnvironmentConfig;
};

export const V: Readonly<EnvironmentMapping> = Object.freeze({
  [environment.Empty]: {
    name: "空"
  },
  [environment.Default]: {
    name: "通用"
  },
  [environment.SparkPicEnv]: {
    name: "灵图"
  },
  [environment.ConcealedWorkV2]: {
    name: "水电工程2.0"
  },
  [environment.ContentMaterialReplace]: {
    name: "模型材质替换"
  },
  [environment.ContentPartMaterialReplace]: {
    name: "模型部件材质替换"
  },
  [environment.CustomizedModeling]: {
    name: "自由造型"
  },
  [environment.MixPaint]: {
    name: "铺贴定制"
  },
  [environment.OpeningStyler]: {
    name: "门窗复制样式"
  },
  [environment.CustomizedBackgroundWall]: {
    name: "背景墙"
  },
  [environment.NCustomizedBackgroundWall]: {
    name: "背景墙"
  },
  [environment.CustomizedCeilingModel]: {
    name: "吊顶"
  },
  [environment.NCustomizedCeilingModel]: {
    name: "吊顶"
  },
  [environment.CustomizedPlatform]: {
    name: "地台"
  },
  [environment.NCustomizedPlatform]: {
    name: "地台"
  },
  [environment.FaceMaterial]: {
    name: "硬装材质替换"
  },
  [environment.Render]: {
    name: "渲染"
  },
  [environment.ManualLighting]: {
    name: "布光"
  },
  [environment.CustomizedPM]: {
    name: "自由造型2.0"
  },
  [environment.SlabEdit]: {
    name: "编辑楼板"
  },
  [environment.AddRoofEnv]: {
    name: "添加参数化屋顶"
  },
  [environment.TPZZCabinet]: {
    name: "全屋定制"
  },
  [environment.Bom]: {
    name: "算量"
  },
  [environment.TPZZ]: {
    name: "全屋定制"
  },
  [environment.FocusModeEnv]: {
    name: "单柜体专注编辑"
  },
  [environment.AddCartEnv]: {
    name: "加购环境"
  },
  [environment.AddCartEnvV2]: {
    name: "加购环境v2"
  },
  [environment.ContentCaptureEnv]: {
    name: "下单截图环境"
  },
  [environment.SlidingDoor]: {
    name: "移门生成环境"
  },
  [environment.Elevation]: {
    name: "标注环境"
  },
  [environment.MoldingEnv]: {
    name: "台面/顶线/脚线/灯线"
  },
  [environment.EditOriginDesign]: {
    name: "编辑原始户型"
  },
  [environment.ExportDWGEnv]: {
    name: "施工图环境"
  },
  [environment.CadEditorEnv]: {
    name: "施工图环境2.0"
  },
  [environment.CandidateConfigureEnv]: {
    name: "候选集配置环境"
  }
});