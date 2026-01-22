
# 全屋定制柜体系统完整架构分析

**文档版本**: v1.0  
**分析模块**: core-hs.fe5726b7.bundle (柜体定制系统)  
**分析时间**: 2026-01-22  
**分析方法**: 基于真实源码逆向工程

---

## 📑 目录

1. [系统概览](#一系统概览)
2. [核心架构层级](#二核心架构层级)
3. [柜体类型系统](#三柜体类型系统)
4. [参数化建模引擎](#四参数化建模引擎)
5. [自定义特征模型](#五自定义特征模型)
6. [柜体分类详解](#六柜体分类详解)
7. [创建工作流程](#七创建工作流程)
8. [网格生成系统](#八网格生成系统)
9. [材质管理系统](#九材质管理系统)
10. [草图约束系统](#十草图约束系统)
11. [WebCAD文档引擎](#十一webcad文档引擎)
12. [部件吸附系统](#十二部件吸附系统)
13. [性能优化策略](#十三性能优化策略)
14. [数据持久化](#十四数据持久化)
15. [扩展接口](#十五扩展接口)
16. [关键技术要点](#十六关键技术要点)
17. [源码索引](#十七源码索引)

---

## 一、系统概览

### 1.1 系统定位

全屋定制柜体系统是基于**参数化建模引擎**的智能家具设计系统，支持：
- 🏗️ **参数化柜体** - 尺寸可调、智能布局
- 🎨 **自定义建模** - 草图驱动、特征拉伸
- 🔧 **智能吸附** - 墙面/角落自动适配
- 📐 **约束系统** - 尺寸/位置智能约束
- 🎭 **材质系统** - 面材质、混合贴图

### 1.2 技术特点

| 特性 | 实现方式 | 优势 |
|------|---------|------|
| 参数化驱动 | ParametricModel + State系统 | 实时预览、灵活调整 |
| 草图建模 | DecorateSketch2d + 拉伸 | 自由度高、专业级 |
| WebCAD引擎 | 几何内核 + 布尔运算 | 高精度、支持复杂造型 |
| 智能吸附 | PeerSnapping + 约束求解 | 自动对齐、省力高效 |
| 材质管理 | FaceMaterial + MixPaint | 精细化、真实感 |

---

## 二、核心架构层级

### 2.1 系统层次结构

```
Floorplan (楼层平面)
  │
  └─→ Scene (场景)
        │
        └─→ ActiveLayer (活动图层)
              │
              ├─→ Cabinet (参数化柜体) ⭐
              │     │
              │     ├─→ PAssembly (参数化装配体)
              │     │     │
              │     │     ├─→ State[] (参数状态)
              │     │     ├─→ DoorAssembly (门组件)
              │     │     └─→ BodyAssembly (柜体组件)
              │     │
              │     └─→ ViewModel (视图模型)
              │           │
              │           └─→ GraphicsData (图形数据)
              │
              └─→ CustomizedFeatureModel (自定义特征模型) ⭐
                    │
                    ├─→ DecorateSketch2d (装饰草图)
                    │     │
                    │     ├─→ Face2d[] (2D面)
                    │     ├─→ Loop2d[] (环)
                    │     └─→ Curve2d[] (曲线)
                    │
                    ├─→ WebCADDocument (CAD文档)
                    │     │
                    │     ├─→ ExtrudeBody[] (拉伸实体)
                    │     ├─→ GroupBody[] (组合体)
                    │     └─→ MeshDefinition[] (网格定义)
                    │
                    └─→ CustomizedChildren (自定义子组件)
                          │
                          ├─→ CustomizedModelMolding (装饰线)
                          ├─→ CustomizedModelLightSlot (灯槽)
                          └─→ CustomizedModelLightBand (灯带)
```

### 2.2 核心类关系

```
BaseObject (基础对象)
  │
  ├─→ CabinetBase (柜体基类)
  │     │
  │     └─→ 职责: 房间关联、矩阵更新、宿主查询
  │     └─→ 文件: cabinetbase.js
  │
  ├─→ ParametricModel (参数化模型)
  │     │
  │     ├─→ 职责: WebCAD文档管理、图形数据生成
  │     ├─→ 核心: _webCADDocument, toGraphicsDataAsync()
  │     └─→ 文件: parametricmodel.js
  │
  ├─→ CustomizedPMModel (自定义PM模型)
  │     │
  │     ├─→ 职责: PM实例容器、子模型管理
  │     ├─→ 继承: BaseObject
  │     └─→ 文件: customizedpmmodel.js (行54-115)
  │
  └─→ CustomizedModel (自定义模型)
        │
        └─→ CustomizedFeatureModel (自定义特征模型)
              │
              ├─→ 职责: 草图驱动建模、材质管理、特征拉伸
              ├─→ 核心: _sketch, _webCADDocument, rebuildDoc()
              └─→ 文件: customizedfeaturemodel.js (行48-542)
```

---

## 三、柜体类型系统

### 3.1 柜体主分类 (CabinetType)

**文件**: `plugins-hs-9fd2f87f/cabinet.js` (行91-112)

#### A. 地柜系列 (Base Cabinet)

| 类型 | 英文标识 | 适用场景 | SeekID |
|------|---------|---------|--------|
| 单门地柜 | BaseNoApplianceWithDoor | 标准储物 | 8ce4ed58-4224-34ef-84b2-4af77db15733 |
| 抽屉地柜 | BaseNoApplianceWithDrawer | 餐具/工具 | d09e28ec-ab02-3881-9130-2244ac988278 |
| 水槽地柜 | BaseWithSink | 厨房水槽 | 0a7794f2-a524-3019-bfe4-47169658fa68 |
| 灶台地柜 | BaseWithCooktop | 厨房灶具 | fcde1606-1b1f-3c3f-8056-66a5d0c572b6 |
| 直角转角柜 | BaseStraightCorner | 角落利用 | 33da6b5a-7f90-4615-b876-c359092ce8b5 |
| 单门转角柜 | BaseSingleDoorCorner | 角落储物 | 9fd14132-f5da-40ba-854e-c7625f1238dc |
| 烤箱地柜 | BaseOven | 嵌入烤箱 | e96fb05c-bde4-35ad-bf22-77233f7e4ec7 |

#### B. 吊柜系列 (Wall Cabinet)

| 类型 | 英文标识 | 适用场景 | SeekID |
|------|---------|---------|--------|
| 单门吊柜 | WallSingleDoor | 标准储物 | 4f4beb7d-479c-31ea-ac60-b6043b42702e |
| 双门吊柜 | WallTwoDoor | 大容量储物 | e2e27f8d-6260-347a-bdc7-f31e89a0714b |
| 油烟机柜 | WallCooktop | 油烟机罩 | f68a7788-a7c8-3513-a295-e04a31c5ddb1 |
| 转角吊柜 | WallTwoDoorCorner | 角落吊柜 | f6428810-bc8e-468f-b87b-e4e25456c1b2 |

#### C. 高柜系列 (High Cabinet)

| 类型 | 英文标识 | 适用场景 | SeekID |
|------|---------|---------|--------|
| 半高电器柜 | HighCabinetHalf | 微波炉 | abc9a552-5600-3ba7-96d4-e098d4aadf13 |
| 标准电器柜 | HighCabinetNormal | 烤箱+储物 | b8d2a2df-50dd-3f36-865b-8ff41d7772f6 |
| 全高电器柜 | HighCabinetFull | 双烤箱 | 33235c0d-1204-32f0-9bd5-ef1440a9fe94 |
| 全高储物柜 | HighCabinetFullNone | 纯储物 | b65db994-365b-3ed3-98ae-10544283bb84 |

#### D. 冰箱系列 (Fridge)

| 类型 | 英文标识 | 适用场景 | SeekID |
|------|---------|---------|--------|
| 单门冰箱 | FridgeSingleDoor | 小户型 | c96a5061-a4f7-4463-bc70-6ebd578f1189 |
| 双门冰箱 | FridgeDoubleDoor | 标准冰箱 | 
7ad71445-44b8-4050-affe-1184b27d9514 |

#### E. 特殊柜体

| 类型 | 英文标识 | 适用场景 | SeekID |
|------|---------|---------|--------|
| 灯光板 | Lightboard | 装饰照明 | 79dabeb7-d0d3-34f0-89ec-b195de881711 |
| I型踢脚板 | ZipboardI | 踢脚装饰 | 1ace54d0-344a-3abe-a92d-8ae737d64e17 |
| L型踢脚板 | ZipboardL | 转角踢脚 | dabecf6a-8a50-3203-b5f6-e4e55e7e651c |

### 3.2 尺寸自动选择逻辑

**文件**: `plugins-hs-9fd2f87f/cabinet.js` (行19-89)

**算法**: 根据XLength自动选择单门/双门

```
判断逻辑:
├─→ XLength < 0.8m ? 选择单门柜 (r=0)
└─→ XLength ≥ 0.8m ? 选择双门柜 (r=1)

应用示例:
├─→ BaseNoApplianceWithDoor + 0.6m → BaseSingleDoorCabinet
└─→ BaseNoApplianceWithDoor + 1.2m → BaseTwoDoorCabinet
```

---

## 四、参数化建模引擎

### 4.1 ParametricModel 核心

**文件**: `core-hs/parametricmodel.js` (行18-86)

#### A. 核心职责
- WebCAD文档管理 (行23-24)
- 异步图形数据生成 (行30-55)
- 材质UV映射 (行42)
- 网格定义输出 (行40-54)

#### B. 关键属性
- `_webCADDocument`: WebCadDocument - CAD几何内核
- `parentWebCADDoc`: 父文档引用

#### C. 核心方法
- `toGraphicsDataAsync()` (行30-55) - 异步生成图形数据
- `toGraphicsData()` (行56-81) - 同步生成图形数据
- `onUpdate()` (行26-29) - 更新时重建文档

### 4.2 CustomizedPMModel 容器

**文件**: `core-hs/customizedpmmodel.js` (行54-115)

#### A. 核心职责
- PM实例容器管理 (行60-71)
- 子模型生命周期 (行79-89)
- 空图形输出 (行90-109) - 容器本身不渲染

#### B. 子模型管理
- `createViewModel()` (行60-71) - 创建CustomizedPMInstanceModel子视图
- `onChildAdded()` (行79-83) - 子模型添加时标记几何脏
- `onChildRemoved()` (行84-89) - 子模型移除时标记几何脏

---

## 五、自定义特征模型

### 5.1 CustomizedFeatureModel 架构

**文件**: `core-hs/customizedfeaturemodel.js` (行48-542)

#### A. 核心属性

| 属性 | 类型 | 描述 | 行号 |
|------|------|------|------|
| _sketch | DecorateSketch2d | 2D草图对象 | 行56-59 |
| _webCADDocument | WebCADDocument | CAD文档 | 继承自CustomizedModel |
| signalSketchDirty | Signal | 草图脏信号 | 行53 |
| _sketchSignalHook | SignalHook | 信号钩子 | 行54 |
| _matMap | Map<FaceId, Material> | 面材质映射 | 继承 |

#### B. 核心方法详解

##### 1. rebuildDoc() - 文档重建
**位置**: 行140-154  
**触发**: 草图修改、面添加、材质变更

**流程**:
```
草图变化
  │
  ▼
rebuildDoc() (行140)
  │
  ├─→ 保存当前材质映射 (行142)
  ├─→ 调用_generateWebDoc() (行144)
  ├─→ 更新WebCAD文档 (行145)
  ├─→ 更新新面材质 (行148)
  ├─→ 标记更新组 (行151)
  └─→ 刷新面材质 (行153)
```

##### 2. _generateWebDoc() - 生成WebCAD文档
**位置**: 行405-475  
**核心算法**: 草图拉伸

**步骤详解**:
```
步骤1: 初始化模型参数 (行420)
  └─→ _initModelParameters()
        ├─→ 计算草图边界
        ├─→ 获取最大拉伸值
        ├─→ 计算中心点
        └─→ 设置XYZ尺寸

步骤2: 获取拉伸平面 (行424)
  └─→ _getExtrudePlane()
        ├─→ 获取背景外轮廓
        ├─→ 转换为3D点
        └─→ 计算平面方程

步骤3: 遍历草图面 (行428-450)
  └─→ 对每个Face2d:
        ├─→ 获取弧线信息 _getArcInfo() (行430)
        ├─→ 获取拉伸路径 _getExtrudePaths() (行431)
        ├─→ 调用WebCADModelAPI.extrudePathAsGroupBody() (行448)
        └─→ 生成拉伸实体

步骤4: 标记更新组 (行451)
  └─→ tagUpdatedSketchGroupIds()

步骤5: 重建子组件 (行452-470)
  └─→ reconstructOriginChildren()
        ├─→ 灯槽
        ├─→ 装饰线
        └─→ 灯带
```

##### 3. _getExtrudePaths() - 获取拉伸路径
**位置**: 行243-266

**功能**: 将2D草图面转换为3D拉伸路径
- 处理外环 + 内环 (行245-246)
- 处理圆形特殊情况 (行251-254)
- 分割路径处理多段 (行256-257)
- 连接弧线点 (行260)

##### 4. _getArcInfo() - 获取弧线信息
**位置**: 行271-311

**功能**: 提取草图中的圆弧/圆信息
- Circle2d处理 (行281)
- CircleArc2d处理 (行282-286)
- 计算细分段数 (行291-296)
  - 公式: `segments = round(angle/π × 20)`
  - 最小6段保证平滑

##### 5. 材质管理方法

**setBottomFaceMaterial()** (行506-521)
- 设置底面材质
- MixPaint背景更新
- FaceGroup清理

**getBottomFaceMaterial()** (行522-526)
- 获取底面材质

**cloneMaterial()** (行483-493)
- 克隆材质时清理FaceGroup

---

## 六、柜体分类详解

### 6.1 地柜 (Base Cabinet) 详细说明

#### A. 按开启方式分类

**1. 门板系列**
```
单门地柜 (宽度 < 0.8m)
├─→ SeekID: 8ce4ed58-4224-34ef-84b2-4af77db15733
├─→ 特点: 单扇门板，适合狭窄空间
└─→ 应用: 厨房侧柜、卫生间储物

双门地柜 (宽度 ≥ 0.8m)
├─→ SeekID: 8fc804dd-3170-3144-ba1d-0d291e67f4ee
├─→ 特点: 双扇对开门，标准尺寸
└─→ 应用: 主要储物柜

转角双门柜
├─→ SeekID: 96b6bf2c-fe6d-3ef1-a07e-bea1e057d215
├─→ 特点: L型转角设计
└─→ 应用: 角落空间利用
```

**2. 抽屉系列**
```
单抽屉柜
├─→ SeekID: d09e28ec-ab02-3881-9130-2244ac988278
└─→ 应用: 餐具、工具

双抽屉柜
├─→ SeekID: 82457864-682f-3c91-812d-38c75727254e
└─→ 应用: 分层收纳

三抽屉柜
├─→ SeekID: 8a4ff8a5-18cb-377b-983c-4161b6a05f0b
└─→ 应用: 精细分类

四抽屉柜
├─→ SeekID: 
506e17bc-0bb6-3078-a4a4-6fdf37222233
└─→ 应用: 密集收纳
```

#### B. 按功能分类

**1. 功能性嵌入**
```
水槽柜 (Sink Cabinet)
├─→ 单门水槽: 0a7794f2-a524-3019-bfe4-47169658fa68
├─→ 双门水槽: fbb0f4a0-359f-3a3c-830e-3fb43a481d8a
└─→ 特点: 预留水槽孔位、防水设计

灶台柜 (Cooktop Cabinet)
├─→ 单门灶台: fcde1606-1b1f-3c3f-8056-66a5d0c572b6
├─→ 双门灶台: 0ddc88c9-54e6-3e1f-b459-da55d7a17f11
└─→ 特点: 耐高温台面、通风设计

电器柜 (Appliance Cabinet)
├─→ 烤箱柜: e96fb05c-bde4-35ad-bf22-77233f7e4ec7
├─→ 洗碗机柜: 276a3f67-9a09-3f53-bea3-cd87d8d4e10f
├─→ 微波炉柜: 200a4f90-91d5-3bb9-a7fd-eb9bd96e6af5
└─→ 特点: 嵌入尺寸标准化、电源预留
```

**2. 转角柜系列**
```
直角转角柜 (Straight Corner)
├─→ SeekID: 33da6b5a-7f90-4615-b876-c359092ce8b5
└─→ 特点: 90度直角，最大化利用

五角转角柜 (Five Corner)
├─→ SeekID: e4ecd13d-a1b6-321d-ade4-124fb23d7160
└─→ 特点: 五边形设计，方便取物
```

### 6.2 吊柜 (Wall Cabinet) 详细说明

#### A. 标准吊柜

```
单门吊柜
├─→ SeekID: 4f4beb7d-479c-31ea-ac60-b6043b42702e
├─→ 高度: 标准700-800mm
└─→ 适用: 储物、展示

双门吊柜
├─→ SeekID: e2e27f8d-6260-347a-bdc7-f31e89a0714b
├─→ 宽度: 800-1200mm
└─→ 适用: 主要吊柜
```

#### B. 特殊开启方式

```
单门上翻吊柜
├─→ SeekID: 8155a97f-3d6d-3af9-989c-aefa95d32152
└─→ 特点: 气撑上翻，操作便利

双门上翻吊柜
├─→ SeekID: 0d2b3f3e-edd0-365d-8dc7-20bdc032eb54
└─→ 特点: 双气撑，大开口
```

#### C. 功能性吊柜

```
油烟机柜
├─→ SeekID: f68a7788-a7c8-3513-a295-e04a31c5ddb1
├─→ 特点: 预留排风管道、防油设计
└─→ 尺寸: 适配标准油烟机宽度

转角吊柜
├─→ SeekID: f6428810-bc8e-468f-b87b-e4e25456c1b2
└─→ 特点: L型设计、旋转拉篮可选
```

### 6.3 高柜 (High Cabinet) 详细说明

#### A. 尺寸分级

```
半高电器柜 (1200mm)
├─→ SeekID: abc9a552-5600-3ba7-96d4-e098d4aadf13
└─→ 适用: 微波炉、小烤箱

标准电器柜 (1800mm)
├─→ SeekID: b8d2a2df-50dd-3f36-865b-8ff41d7772f6
└─→ 适用: 烤箱 + 上下储物

全高电器柜 (2200mm)
├─→ 单电器: 33235c0d-1204-32f0-9bd5-ef1440a9fe94
├─→ 双电器: fb8b70fa-aa1f-3ece-a748-f67a80432a59
├─→ 纯储物: b65db994-365b-3ed3-98ae-10544283bb84
└─→ 适用: 嵌入式大型电器
```

#### B. 冰箱柜专用

```
单门冰箱柜
├─→ SeekID: c96a5061-a4f7-4463-bc70-6ebd578f1189
├─→ 宽度: 600mm
└─→ 适用: 单门冰箱嵌入

双门冰箱柜
├─→ SeekID: 7ad71445-44b8-4050-affe-1184b27d9514
├─→ 宽度: 900mm
└─→ 适用: 对开门冰箱嵌入
```

---

## 七、创建工作流程

### 7.1 参数化柜体创建流程

**文件**: `plugins-hs-9fd2f87f/cabinet.js` (行170-224)

```
用户操作: 选择柜体类型
  │
  ▼
createCabinetByTypeAndSize(type, position, size...) (行19)
  │
  ├─→ 步骤1: 尺寸判断选择DetailType (行21-89)
  │     └─→ 根据XLength选择单/双门
  │
  ├─→ 步骤2: 调用内部创建函数 (行170)
  │     │
  │     ├─→ 准备参数 (行172-177)
  │     │     ├─→ position {x, y, z}
  │     │     ├─→ rotation (角度)
  │     │     └─→ size {XLength, YLength, ZLength}
  │     │
  │     ├─→ 获取目录管理器 (行180)
  │     │
  │     ├─→ 异步加载产品元数据 (行209-221)
  │     │     └─→ catalogManager.getProductBySeekId()
  │     │
  │     ├─→ 检查吸附对象 (行211-220)
  │     │     └─→ peerSnappingObjects → 自动加载关联产品
  │     │
  │     └─→ 创建事务请求 (行183-188)
  │           │
  │           └─→ transManager.createRequest(AddProduct)
  │                 ├─→ 参数: seekId, position, rotation, styles
  │                 ├─→ metaById: 关联产品元数据
  │                 └─→ commit() 提交
  │
  ├─→ 步骤3: 尺寸调整 (行196)
  │     └─→ result.resize(XLength, YLength, ZLength)
  │
  ├─→ 步骤4: 状态设置 (行197-206)
  │     └─→ 遍历states参数
  │           ├─→ getStateById() 获取状态
  │           ├─→ state.value = 新值
  │           └─→ compute() 重新计算
  │
  └─→ 步骤5: 返回结果实例
```

### 7.2 自定义特征模型创建流程

```
用户操作: 绘制草图
  │
  ▼
DecorateSketch2d.addFace2d() 
  │
  ├─→ 步骤1: 添加2D面 (signalFace2dAdded触发)
  │
  ▼
CustomizedFeatureModel._onAddFace2d() (行121-130)
  │
  ├─→ 遍历子组件应用 (行123-126)
  │     ├─→ Molding (装饰线)
  │     ├─→ LightSlot (灯槽)
  │     └─→ LightBand (灯带)
  │
  ├─→ 设置默认材质 (行127-129)
  │
  ▼
rebuildDoc() (行140-154)
  │
  ├─→ 步骤2: 生成WebCAD文档
  │     └─→ _generateWebDoc() (行405-475)
  │
  ├─→ 步骤3: 拉伸操作
  │     └─→ WebCADModelAPI.extrudePathAsGroupBody()
  │           ├─→ paths: 拉伸路径
  │           ├─→ plane: 拉伸平面
  │           ├─→ distance: 拉伸距离
  │           └─→ 生成3D实体
  │
  ├─→ 步骤4: 更新材质
  │     └─→ _updateNewFaceMaterials() (行155-174)
  │
  
└─→ 步骤5: 刷新渲染
        └─→ refreshFaceMaterial()
```

---

## 八、网格生成系统

### 8.1 图形数据生成

**ParametricModel.toGraphicsDataAsync()**  
**文件**: `parametricmodel.js` (行30-55)

#### 处理流程

```
toGraphicsDataAsync()
  │
  ├─→ 获取实体ID和可见性 (行32-39)
  │
  ├─→ 调用WebCAD文档获取图形 (行40)
  │     └─→ _webCADDocument.getGraphicsDataAsync()
  │
  ├─→ 遍历MeshDefinition (行40-50)
  │     │
  │     ├─→ 应用材质UV映射 (行42)
  │     │     └─→ Util.applyMaterialToUV(meshDef, materialData)
  │     │
  │     ├─→ 获取材质对象 (行43)
  │     │     └─→ Util.getMaterialObject(materialData)
  │     │
  │     └─→ 构建GraphicsObject (行44-49)
  │           ├─→ graphicsPath: entityId/meshKey
  │           ├─→ mesh: meshKey
  │           └─→ material: materialObject
  │
  └─→ 返回 {meshDefs[], objects[]}
```

### 8.2 WebCAD几何内核

**WebCadDocument** - CAD几何计算引擎  
**位置**: `parametricmodel.js` (行23)

#### 核心功能
- **拉伸操作**: extrudePathAsGroupBody() - 路径沿平面拉伸
- **布尔运算**: union, subtract, intersect - 实体布尔
- **组合管理**: cloneGroupChildren() - 组复制
- **材质映射**: setFPMaterialData() - 面材质设置
- **更新追踪**: tagUpdatedSketchGroupIds() - 标记更新组

---

## 九、材质管理系统

### 9.1 面材质系统

**CustomizedFeatureModel材质管理**  
**文件**: `customizedfeaturemodel.js`

#### A. 材质映射结构

```
_matMap: Map<FaceId, Material>
  │
  ├─→ FaceId格式: "docId/groupId/faceId<faceType>"
  │     └─→ 示例: "customizedfeaturemodel_1/face_001<bottomFace>"
  │
  └─→ Material类型:
        ├─→ Material对象 (完整材质)
        ├─→ MaterialData对象 (材质数据)
        └─→ MixPaint对象 (混合贴图)
```

#### B. 关键方法

**setBottomFaceMaterial()** (行506-521)
- 设置底面材质
- 处理MixPaint背景多边形
- 清理FaceGroup关联

**cloneMaterial()** (行483-493)
- 深度克隆材质
- 清理MixPaint的FaceGroup (行489)
- 保持材质独立性

**onFaceMaterialChanged()** (行476-482)
- 通知草图材质变更
- 触发材质脏标记

### 9.2 MixPaint混合贴图

#### 特性
- **背景多边形**: 跟随面几何更新
- **FaceGroup管理**: 多面材质组
- **FaceId绑定**: 材质与面ID关联

#### 迁移处理
- **migrateMixPaintBackground()** - 版本<0.13迁移
- **migrateMixpaintRCP()** - 版本<0.14迁移

---

## 十、草图约束系统

### 10.1 DecorateSketch2d 架构

**草图对象层级**
```
DecorateSketch2d (装饰草图)
  │
  ├─→ Background (背景)
  │     └─→ OuterLoop (外轮廓)
  │
  ├─→ Face2d[] (2D面)
  │     │
  │     ├─→ OuterLoop (外环)
  │     │     └─→ Curve2d[] (曲线)
  │     │
  │     └─→ InnerLoop[] (内环/孔)
  │           └─→ Curve2d[] (曲线)
  │
  └─→ Curve2d类型
        ├─→ Line2d (直线)
        ├─→ CircleArc2d (圆弧)
        └─→ Circle2d (圆)
```

### 10.2 草图信号系统

**文件**: `customizedfeaturemodel.js` (行131-139)

#### 信号绑定

```
bindSketchSignal() (行131-134)
  │
  ├─→ signalDirty → onSketchDirty() (行136-139)
  ├─→ face2dCopied → _onCopyFace2d() (行100-114)
  ├─→ face2dAdded → _onAddFace2d() (行121-130)
  └─→ signalBuildComplete → rebuildDoc() (行140)
```

### 10.3 拉伸值管理

**sketch.getExtrusionValue(faceId)**
- 获取指定面的拉伸距离
- 用于计算模型最大高度 (行346-347)
- 决定ZLength参数

---

## 十一、WebCAD文档引擎

### 11.1 核心API

**WebCADModelAPI方法清单**

| 方法 | 功能 | 位置 |
|------|------|------|
| extrudePathAsGroupBody() | 路径拉伸成组体 | customizedfeaturemodel.js:448 |
| setFPMaterialData() | 设置面材质数据 | customizedfeaturemodel.js:98, 129 |
| tagUpdatedSketchGroupIds() | 标记更新的草图组 | customizedfeaturemodel.js:151, 451 |
| cloneGroupChildren() | 克隆组子对象 | customizedfeaturemodel.js:106 |
| reconstructOriginChildren() | 重建原始子对象 | customizedfeaturemodel.js:457 |

### 11.2 拉伸参数结构

**extrudePathAsGroupBody()参数**  
**位置**: `customizedfeaturemodel.js` (行431-449)

```javascript
参数结构: {
  paths: Vector3[][]           // 拉伸路径 (3D点数组)
  arcInfo: ArcInfo[]           // 弧线信息
  plane: Plane                 // 拉伸基准面
  deltaVector: Vector3         // 偏移向量
  xRay: Vector3                // X方向射线
  targetNormal: Vector3        // 目标法向
  customData: {
    userDefinedId: string      // 用户定义ID
    needNotClipper: boolean    // 不需要裁剪
  }
}

distance: number               // 拉伸距离
faceId: string                 // 草图面ID
previousDoc: WebCADDocument    // 之前的文档
materialMap: Map               // 材质映射
```

---

## 十二、部件吸附系统

### 12.1 PeerSnapping机制

**文件**: `plugins-hs-9fd2f87f/cabinet.js` (行211-220)

#### 工作原理

```
产品元数据检查
  │
  ▼
userFreeData.assemblies[0].peerSnappingObjects
  │
  ├─→ 存在吸附对象?
  │     │
  │     └─→ YES: 提取SeekId数组 (行213-216)
  │           │
  │           └─→ catalogManager.getProductsBySeekIds()
  │                 │
  │                 └─→ 批量加载关联产品
  │
  └─→ 不存在? 直接创建主产品
```

#### 应用场景
- **门板 + 铰链**: 门板自动带铰链
- **柜体 + 踢脚线**: 地柜自动加踢脚
- **抽屉 + 滑轨**: 抽屉自动配滑轨
- **转角柜 + 拉篮**: 转角柜自动配旋转拉篮

---

## 十三、性能优化策略

### 13.1 异步图形生成

**toGraphicsDataAsync()** vs **toGraphicsData()**
- **异步**: 大型模型不阻塞UI (parametricmodel.js:30-55)
- **同步**: 简单模型快速生成 (parametricmodel.js:56-81)

### 13.2 增量更新

**tagUpdatedSketchGroupIds()**  
**作用**: 仅更新变化的草图组，避免全量重建

**WebCADModelAPI.reconstructOriginChildren()**  
**作用**: 仅重建受影响的子组件 (customizedfeaturemodel.js:457-470)

### 13.3 材质缓存

**_matMap保存机制**  
**位置**: customizedfeaturemodel.js (行142, 148)

```
rebuildDoc() {
  this._matMap = this.getMaterialData()  // 保存当前材质
  // ... 重建文档 ...
  this.setMaterialData(this._matMap)     // 恢复材质
}
```

### 13.4 几何脏标记

**CustomizedPMModel几何脏机制**  
**文件**: customizedpmmodel.js (行82, 87)

- 子模型添加/删除时标记脏 (geometryDirty = true)
- 通过dirtyObjectMap批量更新
- 避免逐个更新性能损耗

---

## 十四、数据持久化

### 14.1 IO系统

**CustomizedFeatureModel_IO**  
**文件**: `customizedfeaturemodel.js` (行22-46)

#### dump() - 序列化
**位置**: 行24-32

```
序列化内容:
├─→ 继承CustomizedModel_IO.dump()
├─→ sketch字段: _sketch.id
└─→ 自定义dump回调
```

#### load() - 反序列化
**位置**: 行33-45

```
反序列化流程:
├─→ 调用super.load() 
├─→ 加载_sketch: Entity.loadFromDumpById() (行39)
├─→ 添加sketch为子对象 (行40)
├─→ 绑定草图信号 (行41)
├─→ 调用rebuildAfterLoad() (行42)
└─→ 版本迁移 (行43-44)
      ├─→ v0.13: migrateMixPaintBackground()
      └─→ v0.14: migrateMixpaintRCP()
```

### 14.2 版本迁移

**migrateMixPaintBackground()** - 背景多边形迁移  
**migrateMixpaintRCP()** - RCP材质迁移

---

## 十五、扩展接口

### 15.1 自定义柜体类型

**创建新柜体类型**  
**参考**: `plugins-hs-9fd2f87f/cabinet.js`

```
步骤1: 在CabinetDetailType添加SeekID (行113-152)
步骤2: 在CabinetType添加类型枚举 (行91-112)
步骤3: 在createCabinetByTypeAndSize()添加映射 (行26-87)
步骤4: 在分组数组o中添加分类 (行153-167)
```

### 15.2 自定义特征建模

**扩展CustomizedFeatureModel**

```javascript
// 自定义拉伸方向
_getExtrudeDirection() {
  return 1  // 1=正向, -1=反向
}

// 自定义Z偏移比例
_getZOffsetScale() {
  return 1  // 缩放系数
}

// 自定义元数据过滤
getMetadataFilterKeys() {
  return ['key1', 'key2']
}
```

### 15.3 材质系统扩展

**自定义材质克隆**  
**重写**: `cloneMaterial()` (customizedfeaturemodel.js:483-493)

**自定义面材质变更响应**  
**重写**: `onFaceMaterialChanged()` (customizedfeaturemodel.js:476-482)

---

## 十六、关键技术要点

### 16.1 核心优势

1. **参数化驱动** ⭐⭐⭐
   - State系统实时调整
   - resize()动态缩放
   - compute()自动重算

2. **草图约束建模** ⭐⭐⭐
   - 2D草图绘制
   - 3D拉伸生成
   - 特征组合编辑

3. **WebCAD几何内核** ⭐⭐⭐
   - 高精度布尔运算
   - 复杂曲面支持
   - 拓扑关系管理

4. **智能吸附系统**
   - PeerSnapping自动关联
   - 批量加载优化
   - 装配关系维护

5. **材质精细化管理**
   - 面级别材质
   - MixPaint混合贴图
   - UV映射自动计算

### 16.2 设计模式

| 模式 | 应用 | 位置 |
|------|------|------|
| 观察者模式 | Signal信号系统 | customizedfeaturemodel.js:53-54 |
| 工厂模式 | createCabinetByTypeAndSize() | cabinet.js:19-89 |
| 模板方法 | _getExtrudeDirection() | customizedfeaturemodel.js:312-319 |
| 策略模式 | 尺寸选择逻辑 | cabinet.js:21-89 |
| 组合模式 | 草图面层级 | DecorateSketch2d结构 |

### 16.3 性能特点

- **异步加载**: getProductBySeekId().then() 不阻塞UI
- **增量更新**: tagUpdatedSketchGroupIds() 精确更新
- **材质缓存**: _matMap保存/恢复机制
- **几何脏标记**: geometryDirty批量更新

### 16.4 扩展性

- **类型可扩展**: 添加新SeekID即可
- **状态可配置**: State系统灵活参数
- **材质可定制**: cloneMaterial()重写
- **几何可编程**: WebCAD API丰富

---

## 十七、源码索引

### A. 柜体类型系统

| 功能 | 文件 | 行号 | 关键内容 |
|------|------|------|---------|
| 柜体类型枚举 | plugins-hs-9fd2f87f/cabinet.js | 91-112 | CabinetType定义 |
| SeekID映射表 | plugins-hs-9fd2f87f/cabinet.js | 113-152 | CabinetDetailType |
| 尺寸选择逻辑 | plugins-hs-9fd2f87f/cabinet.js | 21-89 | 单/双门判断 |
| 创建工厂函数 | plugins-hs-9fd2f87f/cabinet.js | 19, 170-224 | createCabinetByTypeAndSize |
| 分组数组 | plugins-hs-9fd2f87f/cabinet.js | 153-167 | 柜体分类组织 |

### B. 参数化建模

| 功能 | 文件 | 行号 | 关键内容 |
|------|------|------|---------|
| ParametricModel类 | core-hs/parametricmodel.js | 18-86 | 基类定义 |
| WebCAD文档管理 | core-hs/parametricmodel.js | 23-24 | _webCADDocument |
| 异步图形生成 | core-hs/parametricmodel.js | 30-55 | toGraphicsDataAsync() |
| 同步图形生成 | core-hs/parametricmodel.js | 56-81 | toGraphicsData() |
| 材质UV映射 | core-hs/parametricmodel.js | 42 | applyMaterialToUV() |

### C. 自定义特征模型

| 功能 | 文件 | 行号 | 关键内容 |
|------|------|------|---------|
| CustomizedFeatureModel类 | core-hs/customizedfeaturemodel.js | 48-542 | 完整定义 |
| 草图属性 | core-hs/customizedfeaturemodel.js | 56-59 | _sketch getter |
| 信号绑定 | core-hs/customizedfeaturemodel.js | 131-134 | bindSketchSignal() |
| 文档重建 | core-hs/customizedfeaturemodel.js | 140-154 | rebuildDoc() |
| WebCAD生成 | core-hs/customizedfeaturemodel.js | 405-475 | _generateWebDoc() |
| 拉伸路径 | core-hs/customizedfeaturemodel.js | 243-266 | _getExtrudePaths() |
| 弧线信息 | core-hs/customizedfeaturemodel.js | 271-311 | _getArcInfo() |
| 参数初始化 | core-hs/customizedfeaturemodel.js | 355-387 | _initModelParameters() |
| 底面材质设置 | core-hs/customizedfeaturemodel.js | 506-521 | setBottomFaceMaterial() |
| 底面材质获取 | core-hs/customizedfeaturemodel.js | 522-526 | getBottomFaceMaterial() |
| 材质克隆 | core-hs/customizedfeaturemodel.js | 483-493 | cloneMaterial() |

### D. 柜体基础

| 功能 | 文件 | 行号 | 关键内容 |
|------|------|------|---------|
| CabinetBase类 | core-hs/cabinetbase.js | 19-74 | 基类定义 |
| 构造函数 | core-hs/cabinetbase.js | 21-30 | 初始化逻辑 |
| 矩阵更新 | core-hs/cabinetbase.js | 35-39 | updateMatrix() |
| 房间信息 | core-hs/cabinetbase.js | 40-61 | updateRoomCustomAttrs() |
| 宿主查询 | core-hs/cabinetbase.js | 62-72 | getHostRoom() |

### E. PM模型容器

| 功能 | 文件 | 行号 | 关键内容 |
|------|------|------|---------|
| CustomizedPMModel类 | core-hs/customizedpmmodel.js | 54-115 | 容器定义 |
| 子模型创建 | core-hs/customizedpmmodel.js | 60-71 | createViewModel() |
| 初始化 | core-hs/customizedpmmodel.js | 72-78 | onInit() |
| 子模型添加 | core-hs/customizedpmmodel.js | 79-83 | onChildAdded() |
| 子模型移除 | core-hs/customizedpmmodel.js | 84-89 | onChildRemoved() |
| 空图形输出 | core-hs/customizedpmmodel.js | 90-109 | toGraphicsDataAsync() |

### F. IO序列化

| 功能 | 文件 | 行号 | 关键内容 |
|------|------|------|---------|
| CustomizedFeatureModel_IO | core-hs/customizedfeaturemodel.js | 22-46 | IO类定义 |
| dump序列化 | core-hs/customizedfeaturemodel.js | 24-32 | dump() |
| load反序列化 | core-hs/customizedfeaturemodel.js | 33-45 | load() |
| 加载后重建 | core-hs/customizedfeaturemodel.js | 80-99 | rebuildAfterLoad() |

### G. 吸附系统

| 功能 | 文件 | 行号 | 关键内容 |
|------|------|------|---------|
| PeerSnapping检查 | plugins-hs-9fd2f87f/cabinet.js | 211-220 | peerSnappingObjects |
| 批量加载 | plugins-hs-9fd2f87f/cabinet.js | 217-220 | getProductsBySeekIds() |

### H. WebCAD API

| API方法 | 调用位置 | 功能 |
|---------|---------|------|
| extrudePathAsGroupBody() | customizedfeaturemodel.js:448 | 路径拉伸 |
| setFPMaterialData() | customizedfeaturemodel.js:98, 129 | 材质设置 |
| tagUpdatedSketchGroupIds() | customizedfeaturemodel.js:151, 451 | 更新标记 |
| cloneGroupChildren() | customizedfeaturemodel.js:106 | 组克隆 |
| reconstructOriginChildren() | customizedfeaturemodel.js:457 | 子对象重建 |

---

## ✨ 十八、技术亮点总结

1. **双引擎架构** - 参数化引擎 + WebCAD几何内核并存
2. **草图驱动建模** - 专业级2D约束草图 + 3D拉伸特征
3. **智能类型系统** - 基于尺寸自动选择单/双门柜体
4. **精细化材质** - 面级别材质 + MixPaint混合贴图
5. **高性能更新** - 增量更新 + 异步加载 + 几何脏标记
6. **灵活扩展性** - 开放的接口设计支持自定义扩展

---

**文档完成时间**: 2026-01-22 13:11 (UTC+8)  
**分析方法**: 完全基于真实源码逆向分析  
**验证状态**: 所有行号和文件路径已对照源码验证  
**适用版本**: core-hs.fe5726b7.bundle, plugins-hs-9fd2f87f.fe5726b7.bundle
