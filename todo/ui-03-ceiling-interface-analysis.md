# Homestyler 吊顶界面完整分析

## 1. 界面概述 🎯

**界面名称**: Ceiling Customization Interface (吊顶定制界面)

**界面用途**: 
- 设计和定制天花板造型
- 添加吊顶灯槽、灯带
- 配置吊顶材质和纹理
- 集成吊顶照明设备

**技术实现**: 3D建模 + 参数化设计

---

## 2. 界面布局 🎨

```
┌──────────────────────────────────────────────────────────────────────┐
│ PageHeader: [文件] [吊顶工具▼] [材质] [灯具] [完成]      [用户]     │
├────────┬─────────────────────────────────────────────────┬───────────┤
│        │                                                 │           │
│ Left   │       3D Canvas (吊顶设计区)                     │  Right    │
│ Catalog│                                                 │ Property  │
│        │   ╔═══════════════════════════════╗             │   Bar     │
│吊顶样式│   ║                               ║ 顶视图     │           │
│        │   ║     ┌─────────────┐           ║             │ 吊顶参数: │
│[平顶]  │   ║     │  灯槽       │           ║             │           │
│[跌级]  │   ║     │   ╭─╮       │           ║             │ - 高度    │
│[造型]  │   ║     └───┴─┴───────┘           ║             │ - 厚度    │
│[灯槽]  │   ║                               ║             │ - 边距    │
│        │   ╚═══════════════════════════════╝             │           │
│灯具    │                                                 │ 灯槽设置: │
│[筒灯]  │   立面视图:                                     │           │
│[吸顶灯]│   ┌─────────────────────────────┐               │ - 宽度    │
│[灯带]  │   │ ═══════════════════════════ │ 天花板       │ - 深度    │
│[射灯]  │   │ ╱╲                         │               │ - 位置    │
│        │   │    灯槽                     │               │           │
│材质库  │   └─────────────────────────────┘               │ 材质:     │
│[石膏板]│                                                 │ [选择]    │
│[木质]  │                                                 │           │
│[金属]  │                                                 │ [应用]    │
│        │                                                 │ [重置]    │
├────────┴─────────────────────────────────────────────────┴───────────┤
│ StatusBar: [3D视图] [网格显示] [照明预览]  [高度: 2800mm]           │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 3. 吊顶类型系统 🏗️

### 3.1 吊顶类型枚举

**来源**: `dist/app-hs.fe5726b7.bundle_dewebpack/originalmetacreatortype.js`

```javascript
// 吊顶相关类型
Ceiling: "ceiling"
CeilingTile: "ceilingtile"
CeilingAppliance: "ceiling appliance"
CeilingLight: "ceiling light"
CeilingMolding: "ceiling molding"
CeilingDecoration: "ceiling decoration"

// 定制吊顶类型
CustomizedCeiling: "customized ceiling"
CustomizedPMCeiling: "customizedpm ceiling"
SmartCustomizedCeiling: "smart customized ceiling"
SmartCustomizedPMCeiling: "smart customized pm ceiling"

// 挤压造型吊顶
ExtrusionCustomizedCeilingModel: "extrusion customized ceiling model"
ExtrusionCustomizedPMCeilingModel: "extrusion customized pm ceiling model"

// 石膏吊顶
GypsumCeiling: "gypsum ceiling"

// 厨房吊顶
KitchenCeiling: /kitchen ceiling/
KitchenCeiling2d: "kitchen ceiling"
KitchenCeiling3d: "3d kitchen ceiling"
```

### 3.2 吊顶分类

**ext_Ceiling** 扩展类型:
```javascript
ext_Ceiling: [
    h.CustomizedCeiling,              // 定制吊顶
    h.CustomizedPMCeiling,            // 参数化吊顶
    h.CustomizedPMInstanceCeiling,    // 实例化吊顶
    h.GypsumCeiling,                  // 石膏吊顶
    h.SmartCustomizedCeiling,         // 智能定制吊顶
    h.SmartCustomizedPMCeiling,       // 智能参数化吊顶
    h.CeilingMolding,                 // 吊顶线条
    h.ExtrusionCustomizedCeilingModel,    // 挤压造型
    h.ExtrusionCustomizedPMCeilingModel   // 参数化挤压造型
]
```

---

## 4. 吊顶灯具系统 💡

### 4.1 吊顶照明类型

**ext_CeilingAttachedLighting** (吊顶附着照明):
```javascript
ext_CeilingAttachedLighting: [
    h.BathroomHeaterWithLight,        // 浴霸带灯
    h.CeilingLight,                   // 吸顶灯
    h.Downlight,                      // 筒灯
    h.PendantLight,                   // 吊灯
    h.SingleSpotlightCeilingAttached, // 单个射灯
    h.Skylight,                       // 天窗
    h.TrackMountedSpotlightCeilingAttached, // 轨道射灯
    h.Chandelier,                     // 吊灯
    h.AccessoryCeilingAttached,       // 吊顶附件
    h.JiaoHua,                        // 角花
    h.GeneralAttachToCeiling,         // 通用吊顶附件
    h.CeilingDecoration               // 吊顶装饰
]
```

### 4.2 吊顶电器

**ext_ElectricalCeilingAppliances** (吊顶电器):
```javascript
ext_ElectricalCeilingAppliances: [
    h.ApplianceCeilingAttached,       // 吊顶电器
    h.BathroomHeaterWithLight,        // 浴霸
    h.CeilingLight,                   // 吸顶灯
    h.AirConditionerVent              // 空调出风口
]
```

### 4.3 吊顶面板附件

**ext_CeilingPanelAttached** (吊顶面板附件):
```javascript
ext_CeilingPanelAttached: [
    h.BathroomHeater,                 // 浴霸
    h.BathroomHeaterWithLight,        // 浴霸带灯
    h.CeilingLight,                   // 吸顶灯
    h.SingleSpotlightCeilingAttached, // 射灯
    h.Downlight,                      // 筒灯
    h.AirConditionerVent,             // 空调风口
    h.ApplianceCeilingAttached        // 吊顶电器
]
```

---

## 5. 吊顶材质系统 🎨

### 5.1 吊顶材质类型

**ext_ceiling_material** (吊顶材质):
```javascript
ext_ceiling_material: [
    s.SC_Ceiling                      // 吊顶专用材质分类
]
```

### 5.2 厨房吊顶特殊处理

```javascript
// 厨房吊顶3D视图特殊属性
e.contentType.isTypeOf(g.KitchenCeiling3d) && (
    s.attrBaseline = t.baseline && Number.parseInt(t.baseline),
    t.model && t.model.iso3dCeilingView && (
        s.textureUrl = t.model.iso3dCeilingView
    ),
    s.tileSize_x = e.XLength,
    s.tileSize_y = e.YLength
);
```

---

## 6. 吊顶造型组件 🔨

### 6.1 定制吊顶灯槽

**文件**: `dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/cmdflipncustomizedlightslot.js`

```javascript
// 翻转定制灯槽命令
CmdFlipNCustomizedLightSlot

// 创建灯槽模型
this.previewMolding = HSCore.Util.CustomizedModel.createNCustomizedModelMolding()
```

**灯槽类型**:
```javascript
CustomizedModelLightSlot: "customized model light slot"
CustomizedModelLightBand: "customized model light band"
```

### 6.2 吊顶边框线条

```javascript
CeilingMolding: "ceiling molding"
```

**功能**:
- 装饰性边框
- 灯槽边缘
- 造型线条
- 分区界线

---

## 7. 吊顶附着物管理 📦

### 7.1 吊顶附着物分类

**ext_CeilingAttached** (完整吊顶附着物列表):
```javascript
ext_CeilingAttached: [
    h.GeneralAttachToCeiling,         // 通用附着物
    h.AccessoryCeilingAttached,       // 配件
    h.ApplianceCeilingAttached,       // 电器
    h.BathroomAccessoryCeilingAttached, // 浴室配件
    h.BathroomHeater,                 // 浴霸
    h.Beam,                           // 梁
    h.CeilingAttachedShowerHead,      // 吊顶花洒
    h.CeilingAttachedStorageUnit,     // 吊柜
    h.Cornice,                        // 檐口
    h.GypsumCeiling,                  // 石膏吊顶
    h.CustomizedCeiling,              // 定制吊顶
    h.SmartCustomizedCeiling,         // 智能定制吊顶
    h.CustomizedPMCeiling,            // 参数化吊顶
    h.SmartCustomizedPMCeiling,       // 智能参数化吊顶
    h.KitchenCeiling,                 // 厨房吊顶
    h.ToyCeilingAttached,             // 玩具（吊顶）
    d.ext_CeilingAttachedLighting,    // 照明设备
    h.CeilingFixHole,                 // 吊顶固定孔
    h.CeilingMolding,                 // 吊顶线条
    h.AirConditionerVent,             // 空调风口
    h.CeilingDecoration,              // 吊顶装饰
    h.ExtrusionCustomizedCeilingModel,     // 挤压造型
    h.ExtrusionCustomizedPMCeilingModel    // 参数化挤压造型
]
```

### 7.2 吊顶通风系统

```javascript
ext_kitchenVentilation: [
    h.VentilationWallAttached,        // 墙装通风
    h.VentilationCeilingAttached      // 吊顶通风
]
```

---

## 8. 吊顶设计工作流 🔄

### 8.1 设计流程

```
进入吊顶模式
    ↓
选择吊顶类型
    ├─ 平顶 → 设置高度 → 选择材质
    ├─ 跌级吊顶 → 设计层级 → 设置高度差
    ├─ 造型吊顶 → 绘制轮廓 → 挤压成型
    └─ 灯槽吊顶 → 设计灯槽路径 → 设置灯槽参数
    ↓
添加照明设备
    ├─ 筒灯 → 布置位置
    ├─ 灯带 → 沿灯槽布置
    └─ 吸顶灯 → 选择位置
    ↓
调整材质和颜色
    ↓
预览效果
    ↓
完成设计
```

### 8.2 编辑模式

**1. 顶视图模式**:
- 查看吊顶平面布局
- 规划灯具位置
- 设计灯槽路径

**2. 立面视图**:
- 查看吊顶剖面
- 调整高度和厚度
- 设计跌级效果

**3. 3D预览模式**:
- 实时查看效果
- 照明模拟
- 材质渲染

---

## 9. 吊顶参数设置 ⚙️

### 9.1 基础参数

| 参数名称 | 说明 | 默认值 |
|---------|------|--------|
| 高度 (Height) | 吊顶离地高度 | 2800mm |
| 厚度 (Thickness) | 吊顶板厚度 | 50-200mm |
| 边距 (Margin) | 距墙边距离 | 100mm |

### 9.2 灯槽参数

| 参数名称 | 说明 | 默认值 |
