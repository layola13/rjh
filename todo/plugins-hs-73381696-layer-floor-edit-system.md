# plugins-hs-73381696 楼层编辑系统完整架构

> **文档版本**: v1.0  
> **最后更新**: 2026-01-24  
> **Bundle**: `dist/plugins-hs-73381696.fe5726b7.bundle`  
> **模块数量**: 286+  
> **核心功能**: 多楼层管理、板材编辑、空间分割、标注系统

---

## 📋 目录

1. [系统概述](#1-系统概述)
2. [核心架构](#2-核心架构)
3. [楼层管理系统](#3-楼层管理系统)
4. [板材编辑系统](#4-板材编辑系统)
5. [空间管理](#5-空间管理)
6. [绘图工具](#6-绘图工具)
7. [尺寸标注](#7-尺寸标注)
8. [户外空间系统](#8-户外空间系统)

---

## 1. 系统概述

### 1.1 功能定位

**plugins-hs-73381696** 是Homestyler的**楼层与空间编辑插件**，提供：
- 🏢 **多楼层管理** - 添加/删除/切换/重排楼层
- 🔧 **板材编辑** - Slab Profile编辑、厚度调整
- 📐 **空间分割** - 房间分割、合并、复制粘贴
- 🎨 **标注系统** - 墙体/楼板/边缘尺寸标注
- 🌳 **户外空间** - 室外空间创建与管理
- ⭐ **星标系统** - Star Marking标注系统

### 1.2 Bundle统计

```
总模块数: 286+ modules
核心系统:
- Layer管理: 20+ commands
- Slab编辑: 15+ modules
- Space管理: 10+ modules
- 绘图Gizmo: 8+ tools
```

---

## 2. 核心架构

### 2.1 主要枚举类型

#### `commandtypes` - 命令类型
```typescript
// dist/plugins-hs-73381696.fe5726b7.bundle_dewebpack/commandtypes.js
enum CommandTypes {
  // 楼层命令
  ADD_LAYER = "AddLayer",
  DELETE_LAYER = "DeleteLayer",
  INSERT_LAYER = "InsertLayer",
  ACTIVE_LAYER = "ActiveLayer",
  RENAME_LAYER = "RenameLayer",
  
  // 楼板命令
  CHANGE_SLAB_THICKNESS = "ChangeSlabThickness",
  MOVE_SLAB_PROFILE_VERTEX = "MoveSlabProfileVertex",
  MOVE_SLAB_PROFILE_EDGE = "MoveSlabProfileEdge",
  
  // 空间命令
  DIVIDE_SPACE = "DivideSpace",
  DELETE_SPACE = "DeleteSpace",
  CREATE_OUTDOOR_SPACE = "CreateOutdoorSpace"
}
```

#### `en_series_id` - 系列ID枚举
```typescript
// dist/plugins-hs-73381696.fe5726b7.bundle_dewebpack/en_series_id.js
enum SeriesId {
  RESIDENTIAL = 1,      // 住宅
  COMMERCIAL = 2,       // 商业
  OFFICE = 3,           // 办公
  HOSPITALITY = 4       // 酒店
}
```

---

## 3. 楼层管理系统

### 3.1 楼层基础操作

#### `cmdaddlayer` - 添加楼层
```typescript
// dist/plugins-hs-73381696.fe5726b7.bundle_dewebpack/cmdaddlayer.js
class CmdAddLayer implements ICommand {
  execute(request: AddNewLayerRequest) {
    const newLayer = this.createLayer({
      name: request.name || `Floor ${this.getLayerCount() + 1}`,
      height: request.height || 2800, // 默认2.8m
      thickness: request.thickness || 200, // 默认200mm
      index: this.getLayerCount()
    })
    
    this.scene.addLayer(newLayer)
    this.setActiveLayer(newLayer.id)
    
    return newLayer.id
  }
  
  undo() {
    this.scene.removeLayer(this.createdLayerId)
  }
}
```

#### `cmddeletelayer` - 删除楼层
```typescript
// dist/plugins-hs-73381696.fe5726b7.bundle_dewebpack/cmddeletelayer.js
class CmdDeleteLayer implements ICommand {
  execute(request: DeleteLayerRequest) {
    const layer = this.scene.getLayer(request.layerId)
    
    // 检查是否有内容
    if (layer.hasContent() && !request.force) {
      throw new Error("Layer has content. Use force=true to delete.")
    }
    
    // 保存用于undo
    this.deletedLayerData = layer.serialize()
    
    this.scene.removeLayer(request.layerId)
    
    // 如果删除的是活动层，切换到其他层
    if (this.isActiveLayer(request.layerId)) {
      this.activateNearestLayer()
    }
  }
  
  undo() {
    const layer = this.deserializeLayer(this.deletedLayerData)
    this.scene.addLayer(layer)
  }
}
```

#### `cmdinsertlayer` - 插入楼层
```typescript
// dist/plugins-hs-73381696.fe5726b7.bundle_dewebpack/cmdinsertlayer.js
class CmdInsertLayer implements ICommand {
  execute(request: InsertNewLayerRequest) {
    const newLayer = this.createLayer({
      name: request.name,
      height: request.height,
      thickness: request.thickness
    })
    
    // 在指定位置插入
    this.scene.insertLayerAt(newLayer, request.index)
    
    // 更新所有后续楼层的索引
    this.updateLayerIndices(request.index + 1)
    
    return newLayer.id
  }
}
```

#### `cmdrenamelayer` - 重命名楼层
```typescript
// dist/plugins-hs-73381696.fe5726b7.bundle_dewebpack/cmdrenamelayer.js
class CmdRenameLayer implements ICommand {
  execute(request: RenameLayerRequest) {
    const layer = this.scene.getLayer(request.layerId)
    this.oldName = layer.name
    layer.name = request.newName
    this.updateUI()
  }
  
  undo() {
    const layer = this.scene.getLayer(this.layerId)
    layer.name = this.oldName
    this.updateUI()
  }
}
```

### 3.2 楼层高度与厚度

#### `cmdchangelayerheight` - 修改楼层高度
```typescript
// dist/plugins-hs-73381696.fe5726b7.bundle_dewebpack/cmdchangelayerheight.js
class CmdChangeLayerHeight implements ICommand {
  execute(request: ChangeLayerHeightRequest) {
    const layer = this.scene.getLayer(request.layerId)
    this.oldHeight = layer.height
    
    layer.height = request.newHeight
    
    // 更新墙体高度
    this.updateWallHeights(layer)
    
    // 更新上方楼层位置
    this.updateUpperLayers(request.layerId)
  }
  
  updateWallHeights(layer: Layer) {
    for (const wall of layer.walls) {
      wall.height = layer.height
      wall.updateGeometry()
    }
  }
}
```

#### `cmdchangelayerthickness` - 修改楼层厚度
```typescript
// dist/plugins-hs-73381696.fe5726b7.bundle_dewebpack/cmdchangelayerthickness.js
class CmdChangeLayerThickness implements ICommand {
  execute(request: ChangeLayerThicknessRequest) {
    const layer = this.scene.getLayer(request.layerId)
    this.oldThickness = layer.slabThickness
    
    layer.slabThickness = request.newThickness
    
    // 更新板材几何
    this.updateSlabGeometry(layer)
  }
}
```

### 3.3 楼层可见性与激活

#### `cmdtogglelayervisibility` - 切换楼层可见性
```typescript
// dist/plugins-hs-73381696.fe5726b7.bundle_dewebpack/cmdtogglelayervisibility.js
class CmdToggleLayerVisibility implements ICommand {
  execute(request: ToggleLayerVisibilityRequest) {
    const layer = this.scene.getLayer(request.layerId)
    layer.visible = !layer.visible
    
    // 更新3D视图
    this.update3DView(layer)
  }
  
  update3DView(layer: Layer) {
    for (const object of layer.objects) {
      object.visible = layer.visible
    }
  }
}
```

#### `cmdactivelayer` - 激活楼层
```typescript
// dist/plugins-hs-73381696.fe5726b7.bundle_dewebpack/cmdactivelayer.js
class CmdActiveLayer implements ICommand {
  execute(request: ActiveLayerRequest) {
    const oldActiveLayer = this.scene.getActiveLayer()
    const newActiveLayer = this.scene.getLayer(request.layerId)
    
    oldActiveLayer.setActive(false)
    newActiveLayer.setActive(true)
    
    this.scene.setActiveLayer(newActiveLayer)
    
    // 更新编辑环境
    this.updateEditEnvironment(newActiveLayer)
  }
}
```

### 3.4 楼层对齐与重置

#### `cmdalignlayers` - 对齐楼层
```typescript
// dist/plugins-hs-73381696.fe5726b7.bundle_dewebpack/cmdalignlayers.js
class CmdAlignLayers implements ICommand {
  execute() {
    const layers = this.scene.getAllLayers()
    let currentZ = 0
    
    for (const layer of layers) {
      layer.position.z = currentZ
      currentZ += layer.height + layer.slabThickness
    }
    
    this.updateScene()
  }
}
```

#### `cmdresetlayerindex` - 重置楼层索引
```typescript
// dist/plugins-hs-73381696.fe5726b7.bundle_dewebpack/cmdresetlayerindex.js
class CmdResetLayerIndex implements ICommand {
  execute(request: ResetLayerIndexRequest) {
    const layers = this.scene.getAllLayers()
    
    // 按Z坐标排序
    layers.sort((a, b) => a.position.z - b.position.z)
    
    // 重新分配索引
    layers.forEach((layer, index) => {
      layer.index = index
    })
    
    this.updateLayerPanel()
  }
}
```

---

## 4. 板材编辑系统

### 4.1 板材轮廓编辑

#### Slab Profile 结构
```typescript
interface SlabProfile {
  vertices: Vector2[]      // 轮廓顶点
  edges: SlabEdge[]        // 轮廓边
  holes: SlabHole[]        // 孔洞
  thickness: number        // 厚度
  material: Material       // 材质
}

interface SlabEdge {
  startVertex: number
  endVertex: number
  type: "line" | "arc"
  arcCenter?: Vector2
  arcRadius?: number
}
```

#### `cmdmoveslabprofilevertex` - 移动板材顶点
```typescript
// dist/plugins-hs-73381696.fe5726b7.bundle_dewebpack/cmdmoveslabprofilevertex.js
class CmdMoveSlabProfileVertex implements ICommand {
  execute(request: MoveSlabProfileVertexRequest) {
    const slab = this.getSlab(request.slabId)
    const vertex = slab.profile.vertices[request.vertexIndex]
    
    this.oldPosition = vertex.clone()
    vertex.copy(request.newPosition)
    
    // 更新相关边
    this.updateConnectedEdges(request.vertexIndex)
    
    // 重新生成几何
    slab.regenerateGeometry()
  }
}
```

#### `cmdmoveslabprofileedge` - 移动板材边
```typescript
// dist/plugins-hs-73381696.fe5726b7.bundle_dewebpack/cmdmoveslabprofileedge.js
class CmdMoveSlabProfileEdge implements ICommand {
  execute(request: MoveSlabProfileEdgeRequest) {
    const slab = this.getSlab(request.slabId)
    const edge = slab.profile.edges[request.edgeIndex]
    
    // 平移整条边
    const offset = request.offset
    edge.startVertex.add(offset)
    edge.endVertex.add(offset)
    
    slab.regenerateGeometry()
  }
}
```

#### `splitslabprofileedgerequest` - 分割板材边
```typescript
// dist/plugins-hs-73381696.fe5726b7.bundle_dewebpack/splitslabprofileedgerequest.js
class SplitSlabProfileEdgeRequest {
  slabId: string
  edgeIndex: number
  splitPoint: Vector2
}

class CmdSplitSlabProfileEdge implements ICommand {
  execute(request: SplitSlabProfileEdgeRequest) {
    const slab = this.getSlab(request.slabId)
    const edge = slab.profile.edges[request.edgeIndex]
    
    // 在分割点添加新顶点
    const newVertexIndex = slab.profile.vertices.length
    slab.profile.vertices.push(request.splitPoint)
    
    // 分割边为两条
    const edge1 = {
      startVertex: edge.startVertex,
      endVertex: newVertexIndex,
      type: edge.type
    }
    const edge2 = {
      startVertex: newVertexIndex,
      endVertex: edge.endVertex,
      type: edge.type
    }
    
    slab.profile.edges.splice(request.edgeIndex, 1, edge1, edge2)
    slab.regenerateGeometry()
  }
}
```

### 4.2 板材厚度管理

#### `cmdchangeslabthickness` - 修改板材厚度
```typescript
// dist/plugins-hs-73381696.fe5726b7.bundle_dewebpack/cmdchangeslabthickness.js
class CmdChangeSlabThickness implements ICommand {
  execute(request: ChangeSlabThicknessRequest) {
    const slab = this.getSlab(request.slabId)
    this.oldThickness = slab.thickness
    
    slab.thickness = request.newThickness
    slab.regenerateGeometry()
    
    // 更新相关尺寸标注
    this.updateDimensions(slab)
  }
}
```

### 4.3 板材编辑环境

#### `slabeditenv` - 板材编辑环境
```typescript
// dist/plugins-hs-73381696.fe5726b7.bundle_dewebpack/slabeditenv.js
class SlabEditEnv {
  private currentSlab: Slab
  private editMode: "vertex" | "edge" | "face"
  private selectedElements: any[]
  
  enterEditMode(slab: Slab) {
    this.currentSlab = slab
    this.showEditGizmos()
    this.enableSnapping()
  }
  
  exitEditMode() {
    this.hideEditGizmos()
    this.disableSnapping()
    this.currentSlab = null
  }
  
  showEditGizmos() {
    // 显示顶点控制点
    for (const vertex of this.currentSlab.profile.vertices) {
      this.createVertexGizmo(vertex)
    }
    
    // 显示边控制点
    for (const edge of this.currentSlab.profile.edges) {
      this.createEdgeGizmo(edge)
    }
  }
}
```

---

## 5. 空间管理

### 5.1 空间分割

#### `cmddividespace` - 分割空间
```typescript
// dist/plugins-hs-73381696.fe5726b7.bundle_dewebpack/cmddividespace.js
class CmdDivideSpace implements ICommand {
  execute(request: SplitSpaceRequest) {
    const space = this.getSpace(request.spaceId)
    const splitLine = request.splitLine
    
    // 计算分割后的两个多边形
    const [polygon1, polygon2] = 