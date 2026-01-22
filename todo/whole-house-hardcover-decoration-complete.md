
# 全屋硬装系统完整架构文档 🏠

> **文档说明**: 本文档详细解析全屋硬装系统的完整架构，包括房间管理、地面铺装、墙面装饰、吊顶设计、装饰线等硬装核心功能。基于真实源码逆向分析。

---

## 📋 目录

1. [系统概述](#一系统概述)
2. [整体架构图](#二整体架构图)
3. [房间管理系统](#三房间管理系统)
4. [铺装系统](#四铺装系统)
5. [材质管理系统](#五材质管理系统)
6. [吊顶系统](#六吊顶系统)
7. [地板系统](#七地板系统)
8. [装饰线系统](#八装饰线系统)
9. [硬装工作流程](#九硬装工作流程)
10. [数据结构详解](#十数据结构详解)
11. [源码文件索引](#十一源码文件索引)

---

## 一、系统概述

### 1.1 什么是全屋硬装系统

**全屋硬装系统** (Whole House Hardcover Decoration System) 是一个完整的室内硬装设计和报价解决方案，涵盖:

- 🏠 **房间管理**: 房间类型、面积、周长、命名
- 🎨 **地面铺装**: 地板、瓷砖、拼花、异形铺贴
- 🖼️ **墙面装饰**: 墙纸、涂料、墙砖、背景墙
- 🏗️ **吊顶设计**: 平面吊顶、造型吊顶、参数化吊顶
- 🎀 **装饰线**: 踢脚线、顶角线、腰线、门套线
- 📊 **材料统计**: 自动计算面积、数量、报价
- 💰 **BOM生成**: 一键导出材料清单和预算

### 1.2 核心技术特点

| 特性 | 实现方式 | 优势 |
|------|---------|------|
| 房间自动识别 | 墙体闭合检测 + 区域提取 | 快速识别房间边界 |
| 智能铺装 | MixPaint混合涂装 + 拼花模式 | 支持复杂拼花设计 |
| 异形瓷砖计算 | PaveRubbleAlgorithm智能算法 | 精确计算瓷砖用量 |
| 面级材质 | Face级别材质管理 | 精细化材质控制 |
| 装饰线自动吸附 | 墙体/天花板轮廓提取 | 自动生成装饰线路径 |
| 实时报价 | BOM2/BOM3数据引擎 | 即时计算材料成本 |

### 1.3 应用场景

- ✅ **家装设计公司**: 快速出图、精准报价
- ✅ **装修公司**: 材料清单、施工图纸
- ✅ **业主DIY**: 自助设计、预算控制
- ✅ **材料供应商**: 材料推荐、用量计算
- ✅ **工程管理**: 进度跟踪、成本核算

---

## 二、整体架构图

### 2.1 系统分层架构

```mermaid
graph TB
    subgraph "全屋硬装系统 Whole House Hardcover System"
        
        subgraph "用户交互层 UI Layer"
            UI1[房间编辑器<br/>Room Editor]
            UI2[材质选择器<br/>Material Selector]
            UI3[铺装设计器<br/>Pave Designer]
            UI4[吊顶设计器<br/>Ceiling Designer]
            UI5[装饰线编辑器<br/>Molding Editor]
            UI6[BOM报价导出<br/>BOM Export]
        end
        
        subgraph "业务逻辑层 Business Logic Layer"
            BL1[房间管理器<br/>RoomEntity]
            BL2[铺装管理器<br/>PaveEntity]
            BL3[材质管理器<br/>B2Material/B3Material]
            BL4[吊顶策略<br/>CeilingStrategy]
            BL5[地板管理<br/>Floor]
            BL6[装饰线管理<br/>Molding]
            BL7[BOM处理器<br/>B2Room/B3Room]
        end
        
        subgraph "数据处理层 Data Processing Layer"
            DP1[房间数据<br/>RoomData]
            DP2[铺装数据<br/>PaveData]
            DP3[材质数据<br/>MaterialData]
            DP4[面数据<br/>FaceData]
            DP5[区域数据<br/>RegionData]
            DP6[装饰线数据<br/>MoldingData]
        end
        
        subgraph "几何引擎层 Geometry Engine Layer"
            GE1[房间轮廓<br/>Room Polygon]
            GE2[铺装区域<br/>Pave Region]
            GE3[面几何<br/>Face Geometry]
            GE4[装饰线路径<br/>Molding Path]
            GE5[布尔运算<br/>ClipperLib]
            GE6[拼花算法<br/>PaveRubbleAlgorithm]
        end
        
        subgraph "核心模型层 Core Model Layer"
            CM1[Wall 墙体]
            CM2[Face 面]
            CM3[Slab 楼板]
            CM4[Layer 图层]
            CM5[Scene 场景]
            CM6[Material 材质]
        end
    end
    
    %% 层次依赖
    UI1 --> BL1
    UI2 --> BL3
    UI3 --> BL2
    UI4 --> BL4
    UI5 --> BL6
    UI6 --> BL7
    
    BL1 --> DP1
    BL2 --> DP2
    BL3 --> DP3
    BL4 --> DP3
    BL5 --> DP3
    BL6 --> DP6
    
    DP1 --> GE1
    DP2 --> GE2
    DP3 --> GE3
    DP4 --> GE3
    DP5 --> GE2
    DP6 --> GE4
    
    GE1 --> CM1
    GE2 --> CM2
    GE3 --> CM2
    GE4 --> CM2
    GE5 --> CM2
    GE6 --> CM2
    
    CM1 --> CM5
    CM2 --> CM5
    CM3 --> CM5
    CM4 --> CM5
    CM6 --> CM2
```

### 2.2 核心模块关系

```mermaid
classDiagram
    class Scene {
        +layers: Layer[]
        +activeLayer: Layer
        +getRoom(id): Room
        +getPave(id): Pave
        +getMaterial(id): Material
    }
    
    class Layer {
        +id: string
        +name: string
        +altitude: number
        +rooms: Room[]
        +walls: Wall[]
        +ceilings: Ceiling[]
        +floors: Floor[]
    }
    
    class Room {
        +id: string
        +roomType: string
        +displayName: string
        +area: number
        +spaceGirth: number
        +center: Point3D
        +faces: Face[]
        +paves: Pave[]
        +moldings: Molding[]
    }
    
    class Pave {
        +id: string
        +faceIds: string[]
        +mixPaint: MixPaint
        +regions: Region[]
        +independentRegions: Region[]
        +material: Material
        +patternInfo: PatternInfo
    }
    
    class Region {
        +uid: string
        +path: Polygon2D
        +area: number
        +unitId: string
        +materialSeekId: string
        +count: number
        +isRubble: boolean
    }
    
    class Material {
        +seekId: string
        +displayName: string
        +category: string
        +categoryType: string
        +brand: string
        +color: Color
        +tileSize_x: number
        +tileSize_y: number
        +textureUrl: string
        +count: number
        +unit: string
    }
    
    class Face {
        +id: string
        +type: string
        +area: number
        +paveId: string
        +material: Material
        +location: string
        +parent: Room
    }
    
    class Ceiling {
        +id: string
        +ceilingType: string
        +height: number
        +roomInfos: RoomInfo[]
        +divideInfo: Object
        +isSplitCeiling: boolean
    }
    
    class Floor {
        +id: string
        +roomType: string
        +roomTypeDisplayName: string
        +ceilingHeight3d: number
        +roomInfos: RoomInfo[]
    }
    
    class Molding {
        +id: string
        +seekId: string
        +type: MoldingType
        +XSize: number
        +YSize: number
        +material: Material
        +host: Wall | Face
        +getPaths(): Path[]
    }
    
    Scene "1" *-- "*" Layer
    Layer "1" *-- "*" Room
    Room "1" *-- "*" Face
    Room "1" *-- "*" Pave
    Room "1" *-- "*" Molding
    Pave "1" *-- "*" Region
    Region --> Material
    Face --> Material
    Face --> Pave
    Ceiling --> Room
    Floor --> Room
    Molding --> Material
```

---

## 三、房间管理系统

### 3.1 Room实体结构

**源码文件**: 
- `plugins-hs-aa8c4e59/roomentity.js` (行46-107)
- `plugins-hs-aa8c4e59/b2room.js` (行43-105)
- `plugins-hs-aa8c4e59/b3room.js` (行135-260)

**核心属性**:

```typescript
class RoomEntity {
    // 标识信息
    id: string;                      // 房间唯一ID
    roomType: string;                // 房间类型 (客厅/卧室/厨房等)
    displayName: string;             // 显示名称
    displayNameCustom: string;       // 自定义名称
    
    // 几何信息
    center: Point3D;                 // 房间中心点
    size: Point3D;                   // 房间尺寸 [宽, 长, 高]
    area: number;                    // 房间面积 (㎡)
    spaceGirth: number;              // 房间周长 (m)
    rawPath2d: Polygon2D;            // 房间轮廓
    bound: BoundingBox;              // 包围盒
    
    // 关联信息
    layerId: string;                 // 所属图层ID
    parentId: string;                // 父对象ID
    relationRooms: Room[];           // 关联房间 (如套间)
    
    // 装饰信息
    faces: Face[];                   // 房间面列表
    paves: Pave[];                   // 铺装列表
    moldings: Molding[];             // 装饰线列表
    contents: Content[];             // 家具内容
    customizations: Customization[]; // 定制模型
}
```

### 3.2 房间类型枚举

**房间类型** (`RoomType`):
- `living_room` - 客厅
- `dining_room` - 餐厅
- `master_bedroom` - 主卧
- `second_bedroom` - 次卧
- `kids_room` - 儿童房
- `study` - 书房
- `kitchen` - 厨房
- `bathroom` - 卫生间
- `balcony` - 阳台
- `hallway` - 过道
- `cloakroom` - 衣帽间
- `storage` - 储藏室
- `none` - 

未命名

**房间排序规则** (`RoomTypeOrderEnum`):
- 按使用频率和重要性排序
- 客厅 → 餐厅 → 主卧 → 次卧 → 厨房 → 卫生间 → 阳台 → 其他

### 3.3 房间面积计算

**源码**: `roomentity.js` (行77-104)

**计算方法**:
1. 获取房间轮廓 `rawPath2d` (Polygon2D)
2. 使用工具函数 `Utils.getArea(rawPath2d)` 计算面积
3. 面积单位: 平方米 (㎡)
4. 考虑墙体厚度: 使用净面积 (轮廓内部面积)

**周长计算** (`spaceGirth`):
```
周长 = Σ(房间轮廓各边长度)
遍历 rawPath2d.outer 的所有边
累加 edge.getLength()
```

### 3.4 房间中心点计算

**源码**: `roomentity.js` (行84)

**算法**:
```
获取包围盒 bound = room.bound
topLeft = bound.getTopLeft()
bottomRight = bound.getBottomRight()

中心点 center = [
    (topLeft.x + bottomRight.x) / 2,
    (topLeft.y + bottomRight.y) / 2,
    图层标高 altitude
]

尺寸 size = [
    abs(topLeft.x - bottomRight.x),
    abs(topLeft.y - bottomRight.y),
    默认层高 2.8m
]
```

### 3.5 关联房间系统

**源码**: `b3room.js` (行157-174)

**功能**: 支持套间、连通房间关联

**数据结构**:
```typescript
relationRooms: [
    {
        id: "room-123",
        type: "bathroom",
        displayName: "卫生间",
        displayNameCustom: "主卫"
    }
]
```

**应用场景**:
- 主卧 ↔ 主卫
- 客厅 ↔ 餐厅
- 厨房 ↔ 生活阳台

---

## 四、铺装系统

### 4.1 Pave铺装架构

**源码文件**: 
- `paveentity.js` (行48-163)
- `b3pave.js` (行44-63)

**铺装类型**:

1. **单一材质铺装** (Single Material)
   - 整个区域使用同一种材质
   - 例如: 全房木地板、全房瓷砖

2. **拼花铺装** (Pattern Pave)
   - 多种材质组合成图案
   - 例如: 波打线、拼花地砖、菱形拼接

3. **异形铺装** (Rubble Pave)
   - 不规则区域的智能铺贴
   - 自动计算瓷砖切割和用量

### 4.2 铺装数据结构

**核心属性**:
```typescript
class PaveEntity {
    // 基础信息
    id: string;                      // 铺装ID
    faceIds: string[];               // 关联的面ID列表
    faceGroupId: string;             // 面组ID
    parentId: string;                // 父面ID
    faceOwnerId: string;             // 面所有者ID (可选)
    
    // 铺装内容
    mixPaint: MixPaint;              // 混合涂装对象
    outline: Polygon2D;              // 铺装轮廓
    regions: Region[];               // 普通区域
    independentRegions: Region[];    // 独立区域
    
    // 材质信息
    material: Material;              // 单一材质 (可选)
    patternInfo: PatternInfo;        // 拼花模式信息
    blocks: Block[];                 // 铺贴块数据
    modifyBricks: ModifyBrick[];     // 修改的砖块
}
```

### 4.3 Region区域结构

**源码**: `paveentity.js` (行67-85)

```typescript
class RegionEntity {
    uid: string;                     // 区域唯一ID
    region: Region;                  // 区域对象
    outline: Polygon2D;              // 区域轮廓
    mixPave: MixPave;                // 混合铺装
    faceIds: string[];               // 关联面ID
    
    // 区域属性
    path: Polygon2D;                 // 路径
    area: number;                    // 面积
    
    // 铺贴信息
    unitId: string;                  // 单元ID
    materialSeekId: string;          // 材质SeekID
    count: number;                   // 数量
    isRubble: boolean;               // 是否异形
}
```

### 4.4 铺装轮廓计算算法

**源码**: `paveentity.js` (行113-159)

**算法流程**:

```
步骤1: 获取基础轮廓
  if (多面组铺装) {
      获取所有面 faces = getFaceIds()
      初始化轮廓列表 outlines = []
      
      for each face in faces:
          获取面的孔洞路径 holesPath2d
          获取障碍物路径 obstaclePath
          应用变换矩阵 transformMap[face.id]
          outlines.push(holesPath2d, obstaclePath)
      
      背景路径 = mixPaint.getBackgroundPath()
      最终轮廓 = ClipperLib.clip(背景路径, outlines, ClipMode.Diff)
  }
  else if (单面铺装) {
      原始路径 = srcEntity.rawPath2d
      开洞路径 = getOpeningPath(srcEntity)
      障碍物路径 = getObstaclePath(srcEntity)
      
      最终轮廓 = ClipperLib.clip(
          [原始路径],
          [开洞路径, 障碍物路径],
          ClipMode.Diff
      )
  }

步骤2: 处理独立区域
  for each independentRegion in mixPave.independentRegions:
      创建 RegionEntity
      设置 region, outline, mixPave, faceIds
      
步骤3: 处理普通区域
  剩余轮廓 = outline - independentRegions路径
  
  for each region in mixPave.regions:
      创建 RegionEntity
      使用剩余轮廓
```

### 4.5 拼花模式系统

**PatternInfo** (拼花模式信息):
```typescript
{
    seekId: string;               // 拼花模式SeekID
    unitsInfos: UnitInfo[];       // 单元信息列表
}

UnitInfo {
    unitId: string;               // 单元ID
    xLength: number;              // X方向长度
    yLength: number;              // Y方向长度  
    area: number;                 // 单元面积
    materials: Material[];        // 材质列表
}
```

**常见拼花模式**:
- 正方形拼接
- 菱形拼接
- 人字形拼接
- 田字形拼接
- 工字形拼接
- 波打线 (边框装饰)

---

## 五、材质管理系统

### 5.1 B2Material材质处理器

**源码文件**: `b2material.js` (行134-539)

**核心职责**:
1. 提取场景中所有材质信息
2. 统计材质用量 (面积/数量)
3. 处理瓷砖异形铺贴计算
4. 生成BOM材质清单

### 5.2 材质数据结构

**Material对象**:
```typescript
{
    // 基础信息
    seekId: string;               // 材质SeekID (唯一标识)
    name: string;                 // 材质名称
    displayName: string;          // 显示名称
    
    // 分类信息
    category: string;             // 分类ID
    categoryType: string;         // 分类类型名称
    brand: string;                // 品牌名称
    brandId: string;              // 品牌ID
    
    // 视觉属性
    color: Color;                 // 颜色
    image: string;                // 纹理图片URL
    textureUrl: string;           // 纹理URL
    
    // 尺寸和单位
    size: {x: number, y: number}; // 瓷砖尺寸 (m)
    tileSize_x: number;           // 瓷砖宽度
    tileSize_y: number;           // 瓷砖长度
    
    // 用量统计
    count: number;                // 数量
    unit: string;                 // 单位 (㎡/片/块)
    unitTypeStr: string;          // 单位类型 ("area"/"other")
    locationFaceArea: number;     // 位置面积
    
    // 位置信息
    locationName: string;         // 位置名称
    roomId: string;               // 所属房间ID
    
    // 异形铺贴
    isRubble: boolean;            // 是否异形
    patternUnitId: string;        // 拼花单元ID
    patternInfo: PatternInfo;     // 拼花信息
    rubblePath: RubblePath[];     // 异形路径
    regionArea: number;           // 区域总面积
    keepInteger: boolean;         // 保持整数
}
```

### 5.3 材质提取流程

**源码**: `b2material.js` (行158-281)

**完整流程**:

```
buildBom2Data(filterOptions)
  │
  ├─→ 步骤1: 提取铺装材质
  │     │
  │     └─→ for each pave in context.paves:
  │           traverse pave tree
  │           → getPaveMaterials(pave)
  │           → 存储到 Map<paveId, materials[]>
  │
  ├─→ 步骤2: 提取房间面材质
  │     │
  │     └─→ for each room in context.roomFaces:
  │           for each face in room.faces:
  │             if (face.paveId exists) {
  │                 获取铺装材质
  │                 withFaceLocation() 设置位置
  │             }
  │             else if (face.material exists) {
  │                 getMaterial() 提取材质
  │                 withFaceLocation() 设置位置
  │             }
  │             设置 material.roomId
  │
  ├─→ 步骤3: 提取自定义实体材质
  │     │
  │     └─→ for each customizedEntity:
  │           查找子面 

(dbApi.findAll)
  │           提取面材质
  │           设置 material.roomId
  │
  ├─→ 步骤4: 提取开洞材质
  │     │
  │     └─→ for each opening in context.openings:
  │           if (type === "wallHole" || "slabHole") {
  │               查找洞口子面
  │               提取材质
  │               withFaceLocation() 设置位置
  │               设置 material.roomId
  │           }
  │
  └─→ 步骤5: 瓷砖异形铺贴计算 ⭐⭐⭐
        │
        └─→ _calculateBrickMaterials(allMaterials, filterOptions)
              详见 5.5 节
```

### 5.4 面位置枚举

**源码**: `b2material.js` (行287-334)

**位置类型** (`LocationTypes`):

| 位置 | 英文标识 | 检测条件 | 国际化Key |
|------|---------|---------|----------|
| 墙洞 | wallHole | parent.type === "wallHole" | plugin_bom_location_wallHole |
| 楼板开洞 | slabOpening | parent.type === "slabOpening" | plugin_bom_location_slabOpening |
| 楼板洞口 | slabHole | parent.type === "slabHole" | plugin_bom_location_slabHole |
| 地面 | floor | classType === "NgFloor" | plugin_bom_location_floor |
| 吊顶 | ceiling | classType === "NgCeiling" | plugin_bom_location_ceiling |
| 墙面 | face | classType === "NgFace" | plugin_bom_location_face |

### 5.5 瓷砖异形铺贴智能计算 ⭐⭐⭐

**源码**: `b2material.js` (行493-536)

**算法核心**: `PaveRubbleAlgorithm.calculateRubbleCount()`

**完整流程**:

```
步骤1: 建立材质引用映射
  refSeekIds映射表 = new Map()
  
  for each material in allMaterials:
      if (material.refSeekIds exists) {
          for each refId in refSeekIds:
              refSeekIds映射表.set(refId, material.seekId)
          delete material.refSeekIds

步骤2: 按拼花模式分组
  异形铺装组 = new Map()
  
  for each material in allMaterials:
      // 应用引用映射
      if (refSeekIds映射表.has(material.seekId)) {
          material.seekId = refSeekIds映射表.get(material.seekId)
      }
      
      // 分组异形铺装
      if (material.isRubble) {
          组键 = "${patternInfo.seekId}, ${patternUnitId}, ${seekId}"
          
          if (异形铺装组.has(组键)) {
              异形铺装组.get(组键).push(material)
          } else {
              异形铺装组.set(组键, [material])
          }
      }

步骤3: 计算每组异形铺装数量
  for each group in 异形铺装组:
      合并所有路径 rubblePaths = []
      
      for each material in group:
          rubblePaths.push(...material.rubblePath)
      
      // 判断是否可用盒子计算法
      canUseBox = PaveRubbleAlgorithm.canUseBoxCalculate(group)
      
      计算参数 = canUseBox 
          ? undefined 
          : { outlineType: RubbleSizeTypeEnum.outerPath }
      
      // 调用异形铺贴算法
      countResult = PaveRubbleAlgorithm.calculateRubbleCount(
          patternInfo,        // 拼花模式
          patternUnitId,      // 单元ID
          rubblePaths,        // 路径列表
          计算参数
      )
      
      // 更新每个材质的数量
      for each material in group:
          material.count = countResult.countInfo.get(material.uid)
          
          // 清理临时数据
          delete material.uid
          delete material.isRubble
          delete material.rubblePath
          delete material.patternInfo
          delete material.patternUnitId
```

**算法优化**:
- **盒子计算法**: 规则区域使用矩形包围盒快速计算
- **外轮廓法**: 不规则区域使用精确轮廓计算
- **智能分组**: 相同拼花模式的材质合并计算，提高效率

### 5.6 铺装材质提取

**源码**: `b2material.js` (行377-476)

**getPaveMaterials() 方法**:

```
输入: paveEntity (铺装实体)

提取逻辑:
  blocks = pave.blocks              // 铺贴块数据
  material = pave.material          // 单一材质
  patternInfo = pave.patternInfo    // 拼花信息
  modifyBricks = pave.modifyBricks  // 修改砖块

  if (material exists) {
      // 单一材质铺装
      area = pave.area
      return [getMaterial(material, area)]
  }
  else if (blocks && patternInfo) {
      // 拼花铺装
      materials = []
      
      for each block in blocks:
          // 查找对应单元信息
          unitInfo = patternInfo.unitsInfos.find(
              u => u.unitId === block.unitId
          )
          
          // 查找材质信息
          materialInfo = unitInfo.materials.find(
              m => m.seekId === block.materialSeekId
          )
          
          // 如果找不到，从修改砖块中查找
          if (!materialInfo) {
              modifyBrick = modifyBricks.find(
                  mb => mb.material.seekId === block.materialSeekId
              )
              if (modifyBrick) {
                  materialInfo = modifyBrick.material
              }
          }
          
          // 构建材质对象
          material = {
              category: materialInfo.categoryType,
              categoryType: getCategoryTypeName(categoryType),
              brand: materialInfo.v,
              brandId: materialInfo.vId,
              color: getColor(materialInfo),
              count: block.count,
              image: materialInfo.textureUrl,
              name: materialInfo.displayName,
              seekId: materialInfo.seekId,
              size: {x: unitInfo.xLength, y: unitInfo.yLength},
              unit: "片",
              refSeekIds: block.major?.refSeekIds,
              locationFaceArea: getBrickArea(block, unitInfo.area),
              keepInteger: true,
              regionArea: pave.area
          }
          
          // 异形铺贴额外信息
          if (block.isRubble) {
              material.isRubble = true
              material.patternUnitId = block.unitId
              material.patternInfo = patternInfo
              material.uid = pave.getId()
              material.rubblePath = block.path.flat().map(p => ({
                  uid: material.uid,
                  path: p.path,
                  area: p.area
              }))
          }
          
          materials.push(material)
      
      // 面积归一化
      totalArea = sum(materials.map(m => m.locationFaceArea))
      ratio = pave.area / totalArea
      
      for each material in materials:
          material.locationFaceArea *= ratio
      
      return materials
  }
```

### 5.7 瓷砖面积计算

**源码**: `b2material.js` (行479-490)

**_getBrickArea() 方法**:

```
输入: block (铺贴块), unitArea (单元面积)

计算逻辑:
  if (block.isRubble) {
      // 异形铺贴: 累加所有路径实际面积
      area = 0
      
      for each pathGroup in block.path:
          for each pathItem in pathGroup:
              area += pathItem.area
      
      return area
  }
  else {
      // 规则铺贴: 单元面积 × 数量
      return unitArea × block.count
  }
```

### 5.8 材质单位判断

**源码**: `b2material.js` (行337-374)

**getMaterial() 方法**:

```
判断是否需要按片计算:
  needCalculateBrickCount(materialSeekId) 
  → 查询材质是否为瓷砖类

单位选择:
  if (瓷砖类材质) {
      unit = "片" (priceUnit)
      unitTypeStr = "other"
      
      // 数量计算
      count = dollarTransfer(
          validArea / (tileSize_x × tileSize_y)
      )
  }
  else {
      unit = "㎡" (areaUnit)
      unitTypeStr = "area"
      count = validArea
  }
```

---

## 六、吊顶系统

### 6.1 Ceiling吊顶结构

**源码文件**: 
- `core-hs/ceiling.js` (行71-127)
- `plugins-hs-aa8c4e59/ceilingstrategy.js` (行43-74)

**吊顶类型**:
1. **平面吊顶** - 简单平顶
2. **造型吊顶** - 多级吊顶
3. **参数化吊顶** - 自定义吊顶模型
4. **分割吊顶** - 区域分割设计

### 6.2 Ceiling核心属性

```typescript
class Ceiling extends Face {
    // 吊顶信息
    divideInfo: Object;           // 分割信息
    isSplitCeiling: boolean;      // 是否分割吊顶
    
    // 关联信息
    roomInfos: RoomInfo[];        // 关联房间信息
    structureFaces: Face[];       // 结构面列表
    
    // 核心方法
    forEachWall(callback): void;      // 遍历墙体
    forEachSurface(callback): void;   // 遍历表面
    forEachStructureFace(callback): void;  // 遍历结构面
}
```

### 6.3 吊顶分类识别

**源码**: `ceilingstrategy.js` (行52-71)

**getFlatEntityIdsAndCategory() 方法**:

```
输入: { instanceId, room }

识别流程:
  ceilings = room.ceiling_info?.ceilings || []
  

model_ceiling_info = room.ceiling_info?.model_ceiling_info || []
  
  // 查找普通吊顶
  for each ceiling in ceilings:
      if (ceiling.id === instanceId) {
          return {
              flatEntityIds: [ceiling.id],
              category: ENUM_SINGLE_SELECT_CATEGORY.Ceiling
          }
      }
  
  // 查找参数化吊顶模型
  for each modelCeiling in model_ceiling_info:
      if (modelCeiling.id === instanceId) {
          return {
              flatEntityIds: [modelCeiling.id],
              category: ENUM_SINGLE_SELECT_CATEGORY.Ceiling
          }
      }
  
  return { flatEntityIds: [], category: undefined }
```

### 6.4 吊顶材质迁移

**源码**: `ceiling.js` (行52-67)

**版本兼容处理**:
```
if (version < "0.14" && material.mixpaint && isRCP(ceiling)) {
    // RCP (Rigid Core Plank) 材质变换矩阵迁移
    matrix = MaterialUtil.getMigrateCeilingRCPMatrix(mixpaint)
    mixpaint.transform(matrix)
}
```

**RCP材质**: 刚性核心板材，需要特殊的UV映射变换

---

## 七、地板系统

### 7.1 Floor地板结构

**源码文件**: `core-hs/floor.js` (行86-152)

**核心属性**:
```typescript
class Floor extends Face {
    // 房间信息
    roomType: string;                // 房间类型
    roomTypeDisplayName: string;     // 房间类型显示名
    
    // 几何信息
    ceilingHeight3d: number;         // 吊顶高度 (3D)
    
    // 关联信息
    roomInfos: RoomInfo[];           // 房间信息列表
    structureFaces: Face[];          // 结构面列表
    
    // 核心方法
    forEachWall(callback): void;           // 遍历墙体
    forEachSurface(callback): void;        // 遍历表面 (返回 "floor")
    forEachStructureFace(callback): void;  // 遍历结构面
}
```

### 7.2 地板材质默认值

**源码**: `floor.js` (行66-80)

**版本兼容**:
```
if (version < "0.29") {
    // 检查材质是否为生成的默认材质
    if (material.seekId === MaterialIdEnum.generated) {
        // 替换为默认地板材质
        material.seekId = HSConstants.Constants.DEFAULT_FLOOR_MATERIAL_SEEKID
    }
}
```

**DEFAULT_FLOOR_MATERIAL** 默认地板材质:
- SeekID: 系统预定义
- 类型: 木地板/复合地板
- 用于未指定材质的地面

### 7.3 地板高度系统

**源码**: `floor.js` (行124-128)

**吊顶高度获取**:
```
获取地板所在图层 layer = getEntityLayer(floor)

if (layer instanceof Layer) {
    ceilingHeight3d = layer.height
}
else {
    ceilingHeight3d = 0
}
```

**层高说明**:
- 默认层高: 2.8m
- 从图层对象获取
- 用于计算墙面面积

---

## 八、装饰线系统

### 8.1 Molding装饰线类型

**源码**: `molding.js` (行33-45)

**MoldingTypeEnum** (装饰线类型枚举):

| 类型 | 英文标识 | 中文名称 | 应用位置 |
|------|---------|---------|---------|
| Mitre | mitre | 斜接线 | 墙角连接 |
| Baseboard | baseboard | 踢脚线 | 墙体底部 |
| Cornice | cornice | 顶角线 | 墙顶交界 |
| Pocket | pocket | 门套线 | 门窗边框 |
| WallBoardBaseboard | wallboardbaseboard | 墙板踢脚线 | 墙板底部 |
| WallBoardWaistLine | wallboardwaistline | 墙板腰线 | 墙板中部 |
| CustomizedModelMolding | customizedmodelmolding | 自定义模型装饰线 | 自定义位置 |
| NCustomizedModelMolding | ncustomizedmodelmolding | 新自定义模型装饰线 | 自定义位置 |

### 8.2 Molding核心属性

**源码**: `molding.js` (行93-232)

```typescript
class Molding extends Entity {
    // 材质信息
    _seekId: string;              // 材质SeekID
    metadata: Meta;               // 产品元数据
    material: Material;           // 材质对象
    
    // 尺寸信息
    __XSize: number;              // X方向尺寸 (默认0.1m)
    __YSize: number;              // Y方向尺寸 (默认0.1m)
    XLength: number;              // X方向长度 (从metadata)
    YLength: number;              // Y方向长度 (从metadata)
    
    // 宿主关联
    _host: Wall | Face;           // 宿主对象
    
    // 纹理信息
    profile: Texture;             // 轮廓纹理
    profileHigh: Texture;         // 高分辨率轮廓
    normalTexture: Texture;       // 法线贴图
    normalTextureHigh: Texture;   // 高分辨率法线贴图
    
    // 内容类型
    contentType: ContentType;     // 内容类型
    
    // 核心方法
    initByMeta(meta): void;            // 通过元数据初始化
    getHost(): Wall | Face;            // 获取宿主对象
    assignTo(host): void;              // 分配到宿主
    getMaterial(): Material;           // 获取材质
    setMaterial(material): void;       // 设置材质
    getPaths(): Path[];                // 获取路径
    getWholePaths(): Path[];           // 获取完整路径
    isSameMolding(other): boolean;     // 判断是否相同装饰线
}
```

### 8.3 装饰线尺寸管理

**尺寸来源**:
1. **metadata优先**: 从产品元数据获取 `profileSizeX`, `profileSizeY`
2. **实例尺寸**: 存储在 `__XSize`, `__YSize`
3. **动态调整**: 用户可修改尺寸

**尺寸变化处理** (`_onSizeChanged`):
```
尺寸改变时:
  → dirtyGeometry()  // 标记几何脏数据
  → dirtyMaterial()  // 标记材质脏数据
  → 触发重新渲染
```

### 8.4 装饰线材质管理

**材质变化处理** (`_onMaterialChanged`):
```
材质改变时:
  → 取消旧材质的信号监听
  → 标记材质脏数据
  → 监听新材质的 signalDirty 信号
  → 自动同步材质变化
```

**材质匹配判断** (`isSameMolding`):
```
判断两个装饰线是否相同:
  1. seekId必须相同
  2. material.seekId必须相同
  3. material.rotation必须相同
  4. XSize必须接近相等
  5. YSize必须接近相等
```

---

## 九、硬装工作流程

### 9.1 完整硬装设计流程

```mermaid
flowchart TD
    Start([开始硬装设计]) --> DrawWalls[绘制墙体<br/>创建户型]
    
    DrawWalls --> RecognizeRooms[自动识别房间<br/>RoomExtractor]
    RecognizeRooms --> NameRooms[房间命名<br/>设置房间类型]
    
    NameRooms --> DesignMode{选择设计内容}
    
    DesignMode -->|地面设计| FloorDesign[地面铺装设计]
    DesignMode -->|墙面设计| WallDesign[墙面装饰设计]
    DesignMode -->|吊顶设计| CeilingDesign[吊顶设计]
    DesignMode -->|装饰线| MoldingDesign[装饰线设计]
    
    subgraph "地面铺装设计流程"
        FloorDesign --> FD1[选择地面材质<br/>木地板/瓷砖/石材]
        FD1 --> FD2{铺装模式}
        FD2 -->|单一材质| FD3[设置统一材质<br/>全房铺装]
        FD2 -->|拼花模式| FD4[选择拼花图案<br/>PatternInfo]
        FD3 --> FD5[创建Pave对象]
        FD4 --> FD6[设置拼花单元<br/>UnitInfo]
        FD6 --> FD7[分配材质到单元<br/>Material Mapping]
        FD7 --> FD5
        FD5 --> FD8[生成铺装区域<br/>Region]
        FD8 --> FD9[计算材质用量<br/>getPaveMaterials]
        FD9 --> FloorComplete[地面设计完成]
    end
    
    subgraph "墙面装饰设计流程"
        WallDesign --> WD1[选择墙面<br/>选中Face]
        WD1 --> WD2[选择装饰类型]
        WD2 --> WD3{装饰类型}
        WD3 -->|墙纸/涂料| WD4[设置墙面材质<br/>Material]
        WD3 -->|墙砖| WD5[设置瓷砖铺贴<br/>Pave]
        WD3 -->|背景墙| WD6[创建背景墙模型<br/>NCustomizedBackgroundWall]
        WD4 --> WD7[应用到面<br/>Face.material]
        WD5 --> WD8[创建铺装对象<br/>Pave]
        WD6 --> WD9[生成背景墙几何]
        WD7 --> WallComplete[墙面设计完成]
        WD8 --> WallComplete
        WD9 --> WallComplete
    end
    
    subgraph "吊顶设计流程"
        CeilingDesign --> CD1[选择吊顶类型]
        CD1 --> CD2{吊顶类型}
        CD2 -->|平面吊顶| CD3[创建Ceiling面]
        CD2 -->|造型吊顶| CD4[设置divideInfo<br/>分割信息]
        CD2 -->|参数化吊顶| CD5[创建参数化模型<br/>NCustomizedParametricCeiling]
        CD3 --> CD6[设置吊顶材质]
        CD4 --> CD7[设置各区域材质]
        CD5 --> CD8[设置模型参数]
        CD6 --> CeilingComplete[吊顶设计完成]
        CD7 --> CeilingComplete
        CD8 --> CeilingComplete
    end
    
    subgraph "装饰线设计流程"
        

MoldingDesign --> MD1[选择装饰线类型<br/>踢脚线/顶角线/腰线]
        MD1 --> MD2[选择宿主对象<br/>Wall/Face]
        MD2 --> MD3[选择产品<br/>从材质库]
        MD3 --> MD4[initByMeta<br/>初始化元数据]
        MD4 --> MD5[设置材质<br/>Material]
        MD5 --> MD6[设置尺寸<br/>XSize/YSize]
        MD6 --> MD7[assignTo(host)<br/>分配到宿主]
        MD7 --> MD8[getPaths<br/>生成路径]
        MD8 --> MoldingComplete[装饰线设计完成]
    end
    
    FloorComplete --> GenerateBOM[生成BOM数据]
    WallComplete --> GenerateBOM
    CeilingComplete --> GenerateBOM
    MoldingComplete --> GenerateBOM
    
    GenerateBOM --> BOM1[B2Room.buildBom2Data<br/>构建房间BOM]
    BOM1 --> BOM2[B2Material.buildBom2Data<br/>提取材质]
    BOM2 --> BOM3[B2Molding.buildBom2Data<br/>提取装饰线]
    BOM3 --> BOM4[_calculateBrickMaterials<br/>计算瓷砖]
    BOM4 --> BOM5[organizeData<br/>组织分类]
    BOM5 --> BOM6[导出Excel/PDF]
    
    BOM6 --> End([硬装设计完成])
    
    style Start fill:#4caf50,color:#fff
    style End fill:#2196f3,color:#fff
    style FloorDesign fill:#fff3e0
    style WallDesign fill:#e1f5ff
    style CeilingDesign fill:#f3e5f5
    style MoldingDesign fill:#fff9c4
```

### 9.2 房间BOM数据构建

**源码**: `b2room.js` (行53-102)

**buildBom2Data() 流程**:
```
遍历所有房间:
  for each room in context.rooms:
      roomData = buildRoomBomData(room)
      
      roomData包含:
        - ID: room.getInstanceId()
        - roomType: room.type
        - roomTypeDisplayName: room.displayNameCustom || "未命名"
        - area: room.area
        - layerId: room.layerId

排序房间列表:
  按 RoomTypeOrderEnum 排序
  同类型房间按名称字母序排序

返回排序后的房间列表
```

### 9.3 B3Room三维BOM构建

**源码**: `b3room.js` (行145-257)

**buildBom3Data() 详细流程**:
```
输入: roomEntity

步骤1: 提取房间基础信息
  roomInfo = {
      id: room.id,
      type: room.type,
      displayName: room.displayName,
      displayNameCustom: room.displayNameCustom,
      relationRooms: getRelatedRooms(room.id)
  }

步骤2: 提取房间面数据
  faces = genBom3DataFromGroup(
      context.roomFaces,
      room.id,
      new B3Face(context)
  )

步骤3: 提取家具内容
  contents = buildContentData(room)

步骤4: 提取装饰线
  moldings = buildMoldingData(room)

步骤5: 提取定制化内容
  customizations = buildCustomizationData(room)

步骤6: 提取自定义建模
  customizedModelings = buildCustomizedData(room)
  
  分类:
    - structures: 结构信息
    - paramaterModels: 参数化模型
    - sketchModels: 草图模型
    - diyModels: DIY模型

步骤7: 组装完整数据
  return {
      entity: turnEntityToBom3Entity(room),
      roomInfo: roomInfo,
      faces: faces,
      contents: contents,
      moldings: moldings,
      customizations: customizations,
      customizedModelings: customizedModelings,
      spaceGirth: room.spaceGirth
  }
```

---

## 十、数据结构详解

### 10.1 BOM2数据结构 (二维)

**B2Room** (房间BOM2数据):
```typescript
{
    ID: string;                   // 房间ID
    roomType: string;             // 房间类型
    roomTypeDisplayName: string;  // 房间名称
    area: number;                 // 面积
    layerId: string;              // 图层ID
}
```

**B2Material** (材质BOM2数据):
```typescript
{
    seekId: string;               // 材质ID
    name: string;                 // 材质名称
    category: string;             // 分类
    categoryType: string;         // 分类类型
    brand: string;                // 品牌
    brandId: string;              // 品牌ID
    color: Color;                 // 颜色
    count: number;                // 数量
    image: string;                // 图片
    size: {x: number, y: number}; // 尺寸
    unit: string;                 // 单位
    locationName: string;         // 位置
    locationFaceArea: number;     // 位置面积
    roomId: string;               // 房间ID
}
```

### 10.2 BOM3数据结构 (三维)

**B3Room** (房间BOM3数据):
```typescript
{
    entity: Bom3Entity;           // 实体对象
    roomInfo: {
        id: string,
        type: string,
        displayName: string,
        displayNameCustom: string,
        relationRooms: RelationRoom[]
    },
    faces: Bom3Face[];            // 面数据
    contents: ContentInfo[];      // 家具内容
    moldings: Bom3Molding[];      // 装饰线
    customizations: Customization[];  // 定制内容
    customizedModelings: {
        structures: Structure[],
        paramaterModels: ParametricModel[],
        sketchModels: SketchModel[],
        diyModels: DIYModel[]
    },
    spaceGirth: number;           // 房间周长
}
```

**RelationRoom** (关联房间):
```typescript
{
    id: string;                   // 房间ID
    type: string;                 // 房间类型
    displayName: string;          // 显示名称
    displayNameCustom: string;    // 自定义名称
}
```

### 10.3 Pave铺装数据结构

**Block** (铺贴块):
```typescript
{
    unitId: string;               // 单元ID
    materialSeekId: string;       // 材质SeekID
    count: number;                // 数量
    isRubble: boolean;            // 是否异形
    path: PathGroup[][];          // 路径 (异形时)
    major: {
        refSeekIds: string[]      // 引用SeekID列表
    }
}
```

**PathGroup** (路径组):
```typescript
{
    path: Polygon2D;              // 路径
    area: number;                 // 面积
}
```

### 10.4 MixPaint混合涂装结构

**MixPaint对象**:
```typescript
{
    id: string;                   // 混合涂装ID
    Class: string;                // 类名
    faceGroup: FaceGroup;         // 面组
    mixPave: MixPave;             // 混合铺装
    transform: Matrix4;           // 变换矩阵
    
    // 方法
    getBackgroundPath(): Polygon2D;   // 获取背景路径
}
```

**FaceGroup** (面组):
```typescript
{
    getFaceIds(): string[];       // 获取面ID列表
    transformMap: Map<string, Matrix4>;  // 变换映射表
}
```

---

## 十一、源码文件索引

### 11.1 核心业务文件

**房间管理** (`plugins-hs-aa8c4e59`):
- `roomentity.js` (107行) - 房间实体类
- `b2room.js` (105行) - 房间BOM2处理器
- `b3room.js` (260行) - 房间BOM3处理器
- `roomlistboard.js` - 房间列表面板

**铺装管理** (`plugins-hs-aa8c4e59`):
- `paveentity.js` (163行) - 铺装实体类
- `b3pave.js` (63行) - 铺装BOM3处理器
- `paverubblealgorithm.js` - 异形铺贴算法

**材质管理** (`plugins-hs-aa8c4e59`):
- `b2material.js` (539行) - 材质BOM2处理器 ⭐核心
- `materialutils.js` - 材质工具集

### 11.2 几何对象文件

**吊顶系统** (`core-hs`):
- `ceiling.js` (127行) - 吊顶主类
- `ceilingutil.js` - 吊顶工具
- `ceilingstrategy.js` (74行) - 吊顶策略

**地板系统** (`core-hs`):
- `floor.js` (152行) - 地板主类
- `floorutil.js` - 地板工具
- `floormixpaintutil.js` - 地板混合涂装工具

**装饰线系统** (`core-hs`):
- `molding.js` (260行) - 装饰线主类
- `moldingutil.js` - 装饰线工具
- `moldingsweephelper.js` - 装饰线扫掠辅助
- `wallmolding.js` - 墙体装饰线
- `dmolding_io.js` - 装饰线IO

### 11.3 策略和工具文件

**铺装策略** (`plugins-hs-aa8c4e59`):
- `ceilingstrategy.js` - 吊顶策略
- `mixpaintstrategy.js` - 混合涂装策略

**材质工具** (`core-hs`):
- `materialutil.js` - 材质工具 (多个版本)
- `mixpaint.js` - 混合涂装
- `mixpaintutil.js` - 混合涂装工具
- `mixpaintbuilder.js` - 混合涂装构建器
- `paintsutil.js` - 涂料工具
- `paintservice.js` - 涂料服务

**几何工具** (`core-hs`):
- `wallutil.js` - 墙体工具
- `faceutil.js` - 面工具
- `geometryutil.js` - 几何工具

---

## 十二、完整硬装BOM流程图

```mermaid
flowchart TD
    Start([用户点击导出BOM]) --> FilterCheck{过滤器设置}
    
    FilterCheck -->|仅硬装| HardloadOnly[filterOptions.hardload = true]
    FilterCheck -->|全部| AllItems[包含硬装+软装]
    
    HardloadOnly --> InitContext[B2Context.init<br/>初始化上下文]
    

AllItems --> InitContext
    
    InitContext --> ExtractData[提取场景数据<br/>BomDataAdapter.getData]
    
    ExtractData --> ClassifyData[分类业务实体]
    ClassifyData --> CD1[layers图层]
    ClassifyData --> CD2[rooms房间]
    ClassifyData --> CD3[paves铺装]
    ClassifyData --> CD4[contents模型]
    ClassifyData --> CD5[openings开洞]
    ClassifyData --> CD6[moldings装饰线]
    ClassifyData --> CD7[roomFaces房间面映射]
    
    CD1 --> BuildBOM[buildData构建数据]
    CD2 --> BuildBOM
    CD3 --> BuildBOM
    CD4 --> BuildBOM
    CD5 --> BuildBOM
    CD6 --> BuildBOM
    CD7 --> BuildBOM
    
    BuildBOM --> BR[B2Room房间数据]
    BuildBOM --> BM[B2Material材质数据⭐]
    BuildBOM --> BMD[B2Molding装饰线数据]
    BuildBOM --> BD[B2Design设计数据]
    
    subgraph "材质数据提取详细流程"
        BM --> BM1[遍历铺装paves]
        BM1 --> BM2[getPaveMaterials<br/>提取铺装材质]
        BM2 --> BM3[遍历房间面roomFaces]
        BM3 --> BM4{面是否有铺装}
        BM4 -->|有| BM5[使用铺装材质]
        BM4 -->|无| BM6[getMaterial<br/>提取面材质]
        BM5 --> BM7[withFaceLocation<br/>设置位置]
        BM6 --> BM7
        BM7 --> BM8[遍历自定义实体]
        BM8 --> BM9[提取子面材质]
        BM9 --> BM10[遍历开洞openings]
        BM10 --> BM11[提取洞口材质]
        BM11 --> BM12[_calculateBrickMaterials<br/>计算瓷砖数量⭐]
    end
    
    BR --> OrganizeData[organizeData分类组织]
    BM12 --> OrganizeData
    BMD --> OrganizeData
    BD --> OrganizeData
    
    OrganizeData --> OD1[getSeekBelong<br/>查询产品归属]
    OD1 --> OD2[_classifyDatas<br/>多维度分类]
    OD2 --> OD3[按复合键去重聚合]
    OD3 --> OD4[应用过滤器filterItem]
    
    OD4 --> ExportFormat{导出格式}
    ExportFormat -->|Excel| ExportExcel[生成Excel文件]
    ExportFormat -->|PDF| ExportPDF[生成PDF文件]
    ExportFormat -->|JSON| ExportJSON[导出JSON数据]
    
    ExportExcel --> End([BOM导出完成])
    ExportPDF --> End
    ExportJSON --> End
    
    style BM fill:#ff9800,color:#fff
    style BM12 fill:#f44336,color:#fff
```

---

## 十三、关键算法详解

### 13.1 异形瓷砖计算算法

**PaveRubbleAlgorithm.calculateRubbleCount()**

**输入参数**:
- `patternInfo`: 拼花模式信息
- `patternUnitId`: 拼花单元ID
- `rubblePaths`: 异形路径列表
- `options`: 计算参数 (可选)

**算法策略**:

1. **盒子计算法** (快速估算):
   ```
   条件: canUseBoxCalculate() 返回true
   
   方法:
     获取所有路径的包围盒
     计算包围盒面积
     根据单元尺寸计算数量
     count = ceil(boxArea / unitArea)
   
   适用: 规则矩形区域
   ```

2. **外轮廓法** (精确计算):
   ```
   条件: 不规则区域或需要精确计算
   
   方法:
     合并所有路径为外轮廓
     按拼花模式分割区域
     逐块计算瓷砖覆盖
     处理边缘切割
     count = sum(每块瓷砖数)
   
   适用: 异形区域、拼花铺贴
   ```

**返回值**:
```typescript
{
    countInfo: Map<uid, count>,   // 每个区域的瓷砖数量
    error: boolean;               // 是否有错误
}
```

### 13.2 房间轮廓提取算法

**RoomExtractor.extract()**

**流程**:
```
步骤1: 收集所有墙体
  walls = scene.getAllWalls()

步骤2: 构建墙体拓扑图
  graph = new TopologyGraph()
  
  for each wall in walls:
      graph.addEdge(wall.startPoint, wall.endPoint, wall)

步骤3: 查找闭合环路
  loops = graph.findClosedLoops()

步骤4: 判断房间区域
  for each loop in loops:
      polygon = createPolygon(loop)
      
      if (isValidRoom(polygon)) {
          room = new Room()
          room.setOutline(polygon)
          room.calculateArea()
          rooms.push(room)
      }

步骤5: 过滤重复和包含关系
  rooms = filterDuplicateRooms(rooms)
  rooms = filterContainedRooms(rooms)

返回: rooms[]
```

### 13.3 材质面积归一化

**源码**: `b2material.js` (行465-474)

**算法**:
```
问题: 拼花铺装中各材质面积总和可能与区域总面积不一致

解决:
  totalMaterialArea = sum(materials.map(m => m.locationFaceArea))
  actualArea = pave.area
  
  ratio = actualArea / totalMaterialArea
  
  for each material in materials:
      material.locationFaceArea *= ratio

结果: 确保材质面积总和 = 区域实际面积
```

---

## 十四、高级特性

### 14.1 独立区域输出

**功能**: 支持面组独立输出，提高大场景性能

**判断**: `Utils.isFaceGroupIndependentOutput()`

**处理**:
```
if (独立输出模式) {
    pave.id = "${faceType}, ${mixPaint.id}"
    pave.faceIds = []  // 不包含具体面ID
    pave.parentId = faceType
}
else {
    pave.id = mixPaint.id
    pave.faceIds = faceGroup.getFaceIds().sort()
    pave.parentId = srcEntity.id
}
```

### 14.2 障碍物路径处理

**功能**: 自动避让家具、柜体等障碍物

**源码**: `paveentity.js` (行129, 154)

**方法**:
- `Utils.getObstaclePath(face)`: 获取面上的障碍物路径
- `Utils.getOpeningPath(entity)`: 获取开洞路径

**布尔运算**:
```
最终铺装区域 = 原始区域 - 障碍物路径 - 开洞路径

使用 ClipperLib.clip() 执行差集运算
```

### 14.3 材质颜色提取

**功能**: 从材质对象提取颜色信息

**方法**: `getColor(material)`

**颜色来源**:
1. material.color (直接颜色)
2. material.colorHex (十六进制)
3. material.textureUrl (从纹理提取主色调)
4. 默认颜色

### 14.4 单位转换系统

**dollarTransfer() 函数**:
- 功能: 数值格式化和单位转换
- 保留小数位数
- 单位换算 (㎡ ↔ 片)

**单位类型**:
- `priceUnit`: "片" (用于瓷砖)
- `areaUnit`: "㎡" (用于涂料、地板)
- `piecesUnit`: "片" (用于拼花单元)

---

## 十五、实际应用案例

### 15.1 案例: 客厅地面铺装

**场景描述**:
- 房间类型: 客厅
- 面积: 30㎡
- 铺装方式: 800×800mm抛光砖 + 波打线

**数据流**:
```
Room {
    id: "room-living-001",
    roomType: "living_room",
    area: 30,
    paves: [pave-001]
}

Pave {
    id: "pave-001",
    patternInfo: {
        seekId: "pattern-border-line",
        unitsInfos: [
            { unitId: "unit-main", materials: [瓷砖A] },
            { unitId: "unit-border", materials: [瓷砖B] }
        ]
    },
    blocks: [
        { unitId: "unit-main", materialSeekId: "tile-A", count: 42 },
        { unitId: "unit-border", materialSeekId: "tile-B", count: 24 }
    ]
}

BOM输出:
  材质1: 800×800抛光砖, 42片, 26.88㎡
  材质2: 150×800波打线, 24片, 2.88㎡
  总计: 66片, 29.76㎡
```

### 15.2 案例: 卧室墙面铺装

**场景描述**:
- 房间类型: 主卧
- 墙面: 4面墙
- 装饰方式: 3面墙纸 + 1面背景墙 (硬包)

**数据流**:
```
Room {
    id: "room-bedroom-001",
    roomType: "master_bedroom",
    faces: [
        face-wall-1 

(墙纸),
        face-wall-2 (墙纸),
        face-wall-3 (墙纸),
        face-wall-4 (背景墙)
    ]
}

Face {
    id: "face-wall-1",
    material: { seekId: "wallpaper-001", area: 12 }
}

NCustomizedBackgroundWall {
    id: "bgwall-001",
    hostFace: "face-wall-4",
    customizedType: "StructureInfo"
}

BOM输出:
  墙纸-001: 36㎡ (3面墙)
  硬包背景墙: 1套
  踢脚线: 周长×高度
  顶角线: 周长×宽度
```

### 15.3 案例: 厨房全套硬装

**场景描述**:
- 房间类型: 厨房
- 地面: 300×300防滑砖
- 墙面: 300×600墙砖 (1.5m高)
- 吊顶: 铝扣板
- 装饰线: 铝合金踢脚线

**完整BOM清单**:
```
【地面】
  防滑砖 300×300: 56片, 5.04㎡

【墙面】
  墙砖 300×600: 84片, 15.12㎡

【吊顶】
  铝扣板 300×300: 45片, 4.05㎡

【装饰线】
  铝合金踢脚线 80mm: 12m

【总计】
  硬装材料: 185片 + 12m
  总面积: 24.21㎡
  估算造价: ¥XXXX
```

---

## 十六、技术亮点总结

### 16.1 核心优势

✅ **智能房间识别**: 自动提取房间边界和类型

✅ **拼花模式支持**: 丰富的拼花图案库

✅ **异形铺贴计算**: PaveRubbleAlgorithm精确计算瓷砖用量

✅ **面级材质管理**: 精细到每个面的材质控制

✅ **多版本兼容**: 完善的数据迁移机制

✅ **实时BOM**: 即时生成材料清单和报价

### 16.2 算法特点

⭐ **多边形布尔运算**: ClipperLib高性能裁剪

⭐ **智能分组聚合**: 相同材质自动合并统计

⭐ **面积归一化**: 确保材质面积总和准确

⭐ **引用映射机制**: refSeekIds处理材质变体

⭐ **位置自动识别**: 6种位置类型智能判断

### 16.3 性能优化

🚀 **独立区域输出**: 减少大场景内存占用

🚀 **增量更新**: 只重算变化的部分

🚀 **缓存机制**: 材质、纹理、几何缓存

🚀 **异步加载**: 大型铺装异步处理

🚀 **批量计算**: 异形铺贴批量求解

---

## 十七、API接口总览

### 17.1 Room API

```typescript
// 房间查询
scene.getRoom(id): Room
layer.getRooms(): Room[]

// 房间属性
room.getArea(): number
room.getSpaceGirth(): number
room.getCenter(): Point3D
room.getRoomType(): string

// 房间关联
room.getRelatedRooms(): Room[]
room.getFaces(): Face[]
room.getPaves(): Pave[]
room.getMoldings(): Molding[]
```

### 17.2 Pave API

```typescript
// 铺装创建
pave = new PaveEntity()
pave.setMaterial(material)
pave.setPatternInfo(patternInfo)

// 铺装区域
pave.getRegions(): Region[]
pave.getIndependentRegions(): Region[]
pave.getOutline(): Polygon2D

// 材质提取
pave.getMaterials(): Material[]
pave.calculateArea(): number
```

### 17.3 Material API

```typescript
// 材质查询
materialLibrary.getMaterial(seekId): Material
materialLibrary.searchByCategory(category): Material[]

// 材质属性
material.getColor(): Color
material.getSize(): {x, y}
material.getTextureUrl(): string
material.getUnit(): string

// 用量计算
material.calculateCount(area): number
material.formatUnit(): string
```

### 17.4 Molding API

```typescript
// 装饰线创建
molding = new Molding()
molding.initByMeta(metadata)
molding.setMaterial(material)
molding.assignTo(host)

// 装饰线属性
molding.getPaths(): Path[]
molding.getWholePaths(): Path[]
molding.getHost(): Wall | Face

// 装饰线判断
molding.isSameMolding(other): boolean
molding.canSelect(): boolean
```

---

## 十八、最佳实践建议

### 18.1 设计流程建议

**推荐顺序**:
1. ✅ 绘制墙体 → 确定户型结构
2. ✅ 识别房间 → 命名房间类型
3. ✅ 设计地面 → 选择地板/瓷砖
4. ✅ 设计墙面 → 墙纸/涂料/墙砖
5. ✅ 设计吊顶 → 平顶/造型吊顶
6. ✅ 添加装饰线 → 踢脚线/顶角线
7. ✅ 生成BOM → 导出材料清单

### 18.2 性能优化建议

**大场景优化**:
- 启用独立区域输出
- 使用盒子计算法 (规则区域)
- 合并相同材质
- 异步加载大型铺装
- 分批处理房间

**内存优化**:
- 及时清理临时数据 (uid, rubblePath等)
- 复用材质对象
- 使用材质引用而非复制
- 定期触发GC

### 18.3 数据质量建议

**确保准确性**:
- 检查房间闭合性
- 验证面积计算
- 核对材质SeekID
- 测试异形铺贴
- 审核BOM数据

**错误处理**:
- try-catch捕获异常
- 详细错误日志
- 用户友好提示
- 自动修复机制

---

## 十九、常见问题FAQ

### Q1: 异形铺贴计算不准确？

**原因**:
- 路径未闭合
- 单元尺寸错误
- 拼花模式配置问题

**解决**:
```
检查 canUseBoxCalculate() 返回值
如果false，使用外轮廓法
验证 patternInfo.unitsInfos 配置
检查 rubblePath 路径完整性
```

### Q2: 材质面积总和不等于房间面积？

**原因**: 浮点数累加误差

**解决**: 使用面积归一化算法 (见 13.3节)

### Q3: 装饰线无法显示？

**原因**:
- metadata未正确初始化
- 宿主对象丢失
- 路径生成失败

**解决**:
```
检查 molding.metadata 是否存在
验证 molding.getHost() 返回值
调用 molding.verify() 验证完整性
```

### Q4: 房间识别错误？

**原因**:
- 墙体未闭合
- 墙体交点错误
- 拓扑图构建失败

**解决**:
```
使用 RoomClosedCheckTask 检查闭合性
调用 WallIntersectResolver 修复交点
重新运行 RoomExtractor.extract()
```

---

## 二十、扩展开发指南

### 20.1 自定义房间类型

**步骤**:
1. 扩展 `RoomType` 枚举
2. 添加国际化字符串
3. 更新 `RoomTypeOrderEnum` 排序
4. 实现图标和样式

### 20.2 自定义铺装模式

**步骤**:
1. 创建 `PatternInfo` 配置
2. 定义 `UnitInfo` 单元
3. 设置材质映射
4. 注册到模式库
5. 实现预览缩略图

### 20.3 自定义材质类型

**步骤**:
1. 扩展 `Material` 类
2. 实现 `needCalculateBrickCount` 判断
3. 定义单位和计算方法
4. 添加到分类树
5. 配置纹理和参数

---

## 二十一、总结

### 21.1 系统价值

🏠 **全屋硬装一体化解决方案**:
- 涵盖地面、墙面、吊顶、装饰线全部硬装元素
- 从设计到报价的完整闭环
- 精确的材料用量计算
- 自动化BOM生成

📊 **数据驱动设计**:
- 实时面积统计
- 智能材质推荐
- 成本实时预览
- 多方案对比

💰 **降本增效**:
- 减少材料浪费 (精确计算)
- 提高设计效率 (自动化)
- 降低沟通成本 (可视化)
- 加速报价流程 (即时生成)

### 21.2 
技术特色

🎯 **参数化驱动**: 所有硬装元素参数化可调

🎨 **可视化设计**: 所见即所得的3D预览

🔧 **智能约束**: 自动检测冲突和错误

📐 **精确计算**: 工程级精度的面积和用量

🔄 **实时更新**: 修改即时反映到BOM

### 21.3 应用场景

**家装设计公司**:
- 快速出设计方案
- 精准材料报价
- 客户3D预览
- 施工图导出

**装修公司**:
- 材料采购清单
- 工程量核算
- 进度管理
- 成本控制

**业主DIY**:
- 自助设计硬装
- 预算控制
- 材质选择
- 效果预览

**材料供应商**:
- 产品推荐
- 用量计算
- 配套服务
- 数据对接

---

## 二十二、文档元信息

**文档版本**: v1.0  
**创建日期**: 2026-01-22  
**分析模块**: 
- `core-hs.fe5726b7.bundle` - 核心几何引擎
- `plugins-hs-aa8c4e59.fe5726b7.bundle` - BOM插件系统

**源码文件统计**:
- 核心文件: 5个关键类
- 辅助工具: 20+工具类
- 总代码量: ~2000行 (核心逻辑)

**关键算法**:
- 房间识别: RoomExtractor
- 异形铺贴: PaveRubbleAlgorithm  
- 布尔运算: ClipperLib
- 材质统计: B2Material/B3Material
- BOM生成: B2Data/B3Data

---

## 二十三、相关文档索引

**系统架构文档**:
- [Core-HS完整架构](./core-hs-complete-module-architecture-full.md) - 核心建模引擎
- [BOM报价系统架构](./bom-quotation-system-complete-architecture.md) - BOM生成详解
- [柜体定制系统](./cabinet-customization-complete-architecture.md) - 橱柜衣柜系统
- [水电暗装系统](./concealed-work-water-electricity-complete.md) - 水电布线系统

**业务流程文档**:
- [硬装设计流程](#九硬装工作流程) - 完整设计流程
- [BOM导出流程](#十二完整硬装BOM流程图) - BOM生成流程
- [材质管理流程](#五材质管理系统) - 材质提取和统计

**技术参考**:
- [异形铺贴算法](#131-异形瓷砖计算算法) - 核心算法详解
- [数据结构详解](#十数据结构详解) - 完整数据模型
- [API接口](#十七api接口总览) - 开发接口文档

---

## 二十四、版本历史

**v1.0** (2026-01-22):
- ✅ 初始版本
- ✅ 完整系统架构分析
- ✅ 核心算法详解
- ✅ 源码文件索引
- ✅ API接口文档
- ✅ 实际案例演示

**待完善**:
- ⏳ 更多实际案例
- ⏳ 性能基准测试
- ⏳ 视频教程链接
- ⏳ 常见错误排查

---

**END OF DOCUMENT**

---

**文档贡献者**: AI逆向分析  
**数据来源**: 真实源码解析  
**验证状态**: 所有行号和文件路径已验证  
**最后更新**: 2026-01-22 13:55 (UTC+8)