# Homestyler 背景墙界面完整分析

## 1. 界面概述 🎯

**界面名称**: Background Wall Customization Interface (背景墙定制界面)

**界面用途**: 
- 设计电视背景墙、沙发背景墙等特色墙面
- 创建立体造型、装饰面板
- 配置背景墙材质、灯光效果
- 组合背景墙单元和造型元素

**技术实现**: 3D参数化建模 + 单元化组合系统

---

## 2. 界面布局 🎨

```
┌──────────────────────────────────────────────────────────────────────┐
│ PageHeader: [文件] [背景墙▼] [造型] [材质] [完成]        [用户]     │
├────────┬─────────────────────────────────────────────────┬───────────┤
│        │                                                 │           │
│ Left   │       3D Canvas (背景墙设计区)                   │  Right    │
│ Catalog│                                                 │ Property  │
│        │   ╔════════════════════════╗                    │   Bar     │
│背景墙  │   ║  ┌──┬──┬──┐           ║ 正视图            │           │
│样式    │   ║  │  │  │  │ 装饰板    ║                    │ 背景墙:   │
│        │   ║  ├──┼──┼──┤           ║                    │           │
│[简约]  │   ║  │  │💡│  │ 灯带      ║                    │ - 宽度    │
│[现代]  │   ║  ├──┼──┼──┤           ║                    │ - 高度    │
│[欧式]  │   ║  │  │  │  │           ║                    │ - 厚度    │
│[中式]  │   ║  └──┴──┴──┘           ║                    │ - 距墙距离│
│        │   ╚════════════════════════╝                    │           │
│单元库  │                                                 │ 造型参数: │
│[面板]  │   侧视图:                                       │           │
│[格栅]  │   ┌─────────────────┐                          │ - 凸出深度│
│[灯槽]  │   │ ════════════════ │ 墙面                    │ - 分割数量│
│[收纳]  │   │ ╱╲  单元  ╱╲   │                          │ - 间距    │
│        │   │               │                          │           │
│材质    │   └───────────────┘                          │ 材质设置: │
│[木饰面]│                                                 │           │
│[石材]  │                                                 │ [主材质]  │
│[软包]  │                                                 │ [装饰材质]│
│[金属]  │                                                 │           │
│        │                                                 │ [应用]    │
│灯光    │                                                 │ [重置]    │
│[灯带]  │                                                 │           │
│[射灯]  │                                                 │           │
├────────┴─────────────────────────────────────────────────┴───────────┤
│ StatusBar: [3D视图] [单元编辑] [材质预览] [尺寸: 3000x2400mm]       │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 3. 背景墙类型系统 🏗️

### 3.1 背景墙类型枚举

**来源**: `dist/app-hs.fe5726b7.bundle_dewebpack/originalmetacreatortype.js`

```javascript
// 背景墙相关类型
BackgroundWall: "background wall"

// 智能定制背景墙
SmartCustomizedBackgroundWall: "customized background wall"

// 参数化背景墙
ParamBackgroundWall: "param background wall"

// 背景墙单元和子部件
BackgroundWallUnit: "unit"
BackgroundWallSubpart: "styling"

// 挤压造型背景墙
ExtrusionCustomizedBackgroundWall: "extrusion customized background wall"
ExtrusionCustomizedPMBackgroundWall: "extrusion customized pm background wall"
```

### 3.2 背景墙分类

**墙面附着物分类** (ext_WallAttached):
```javascript
h.BackgroundWall,                      // 基础背景墙
h.ExtrusionCustomizedBackgroundWall,   // 挤压造型背景墙
h.ExtrusionCustomizedPMBackgroundWall, // 参数化挤压背景墙
h.SmartCustomizedBackgroundWall,       // 智能定制背景墙
h.BackgroundWallUnit,                  // 背景墙单元
h.ParamBackgroundWall,                 // 参数化背景墙
```

---

## 4. 单元化组合系统 🧩

### 4.1 背景墙单元 (BackgroundWallUnit)

**单元类型**:
- **装饰面板单元**: 木饰面、石材、软包面板
- **格栅单元**: 垂直/水平格栅、镂空造型
- **灯槽单元**: 内嵌灯带、发光槽
- **收纳单元**: 隐藏式储物柜
- **展示单元**: 展示架、陈列格

**单元组合规则**:
```
背景墙 = 基础层 + 装饰单元组合 + 灯光效果

示例组合:
┌────────────────────────┐
│  [面板] [面板] [面板]  │ 第一排单元
│  [灯槽──────────]      │ 灯光层
│  [格栅] [收纳] [格栅]  │ 第二排单元
└────────────────────────┘
```

### 4.2 造型元素 (BackgroundWallSubpart)

**造型类型**:
- **边框造型**: 装饰边框、线条
- **立体凸起**: 3D几何造型
- **凹槽设计**: 内凹装饰
- **分割线**: 区域分隔线条

---

## 5. 参数化背景墙系统 ⚙️

### 5.1 参数化背景墙 (ParamBackgroundWall)

**核心参数**:
```javascript
// 尺寸参数
width: Number,          // 宽度 (mm)
height: Number,         // 高度 (mm)
depth: Number,          // 厚度/深度 (mm)
offsetFromWall: Number, // 距墙距离 (mm)

// 分割参数
horizontalDivisions: Number,  // 水平分割数
verticalDivisions: Number,    // 垂直分割数
gapWidth: Number,             // 间隙宽度 (mm)

// 造型参数
protrusionDepth: Number,      // 凸出深度 (mm)
grooveDepth: Number,          // 凹槽深度 (mm)
cornerRadius: Number,         // 圆角半径 (mm)
```

### 5.2 智能定制背景墙 (SmartCustomizedBackgroundWall)

**智能特性**:
- 自动适配墙面尺寸
- 智能单元布局优化
- 自动生成对称造型
- 智能灯光布置

**工作流程**:
```
选择背景墙风格
    ↓
输入墙面尺寸
    ↓
系统自动生成布局方案
    ↓
用户调整细节
    ↓
应用到场景
```

---

## 6. 挤压造型系统 🎨

### 6.1 挤压背景墙

**类型**:
```javascript
// 标准挤压造型
ExtrusionCustomizedBackgroundWall

// 参数化挤压造型
ExtrusionCustomizedPMBackgroundWall
```

**挤压工艺**:
```
绘制2D轮廓
    ↓
设置挤压深度
    ↓
应用倒角/圆角
    ↓
添加材质
    ↓
生成3D背景墙
```

### 6.2 造型路径编辑

**路径类型**:
- 直线路径
- 曲线路径
- 自由形状路径
- 参数化曲线

---

## 7. 材质系统 🖌️

### 7.1 背景墙材质分类

**木质材料**:
- 实木饰面
- 木纹板
- 竹木纤维
- 护墙板

**石材材料**:
- 大理石
- 花岗岩
- 人造石
- 岩板

**软装材料**:
- 软包面料
- 皮革
- 布艺

**金属材料**:
- 不锈钢
- 铝板
- 铜板
- 金属拉丝

**其他材料**:
- 石膏板
- 玻璃
- 镜面
- 涂料

### 7.2 材质贴图

```javascript
// 材质纹理配置
{
    textureUrl: String,        // 贴图URL
    tileSize_x: Number,        // X方向平铺尺寸
    tileSize_y: Number,        // Y方向平铺尺寸
    normalTexture: String,     // 法线贴图
    roughness: Number,         // 粗糙度
    metalness: Number          // 金属度
}
```

---

## 8. 灯光集成 💡

### 8.1 背景墙照明

**灯光类型**:
- **灯带**: 隐藏式LED灯带
- **射灯**: 重点照明
- **洗墙灯**: 均匀照明
- **氛围灯**: 装饰性灯光

### 8.2 灯槽设计

**灯槽位置**:
- 顶部灯槽: 向下照明
- 底部灯槽: 向上照明
- 侧边灯槽: 侧面照明
- 内嵌灯槽: 内部发光

**灯槽参数**:
```javascript
{
    width: 50-100mm,       // 灯槽宽度
    depth: 30-80mm,        // 灯槽深度
    lightType: String,     // 灯光类型
    colorTemperature: Number, // 色温 (K)
    brightness: Number     // 亮度 (%)
}
```

---

## 9. 编辑工作流 🔄

### 9.1 创建流程

```
进入背景墙模式
    ↓
选择墙面位置
    ↓
选择背景墙类型
    ├─ 预设样式 → 选择模板 → 调整参数
    ├─ 单元组合 → 添加单元 → 排列布局
    ├─ 参数化 → 设置参数 → 生成造型
    └─ 自由造型 → 绘制轮廓 → 挤压成型
    ↓
添加装饰元素
    ↓
配置材质
    ↓
添加灯光
    ↓
预览效果
    ↓
应用到场景
```

### 9.2 编辑模式

**1. 整体编辑模式**:
- 调整背景墙整体尺寸
- 修改位置和角度
- 更换整体材质

**2. 单元编辑模式**:
- 添加/删除单元
- 调整单元大小和位置
- 修改单元材质

**3. 造型编辑模式**:
- 编辑轮廓路径
- 调整挤压深度
- 修改倒角参数

**4. 材质编辑模式**:
- 更换材质
- 调整贴图
- 设置反射属性

---

## 10. 约束系统 🔒

### 10.1 尺寸约束

```javascript
// 背景墙尺寸限制
minWidth: 500mm,
maxWidth: 6000mm,
minHeight: 500mm,
maxHeight: 3000mm,
minDepth: 10mm,
maxDepth: 300mm
```

### 10.2 位置约束

- 必须附着在墙面上
- 不能与门窗重叠
- 保持与墙面的垂直关系
- 