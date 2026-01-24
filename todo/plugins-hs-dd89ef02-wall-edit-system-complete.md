# plugins-hs-dd89ef02 墙体编辑系统完整架构

> **文档版本**: v1.0  
> **最后更新**: 2026-01-24  
> **Bundle**: `dist/plugins-hs-dd89ef02.fe5726b7.bundle`  
> **模块数量**: 509+  
> **核心功能**: 墙体绘制编辑、装饰线条、墙纸材质、WFA系统、Welcome界面

---

## 📋 目录

1. [系统概述](#1-系统概述)
2. [核心架构](#2-核心架构)
3. [墙体创建与编辑](#3-墙体创建与编辑)
4. [装饰线条系统](#4-装饰线条系统)
5. [墙面材质系统](#5-墙面材质系统)
6. [WFA墙面装配系统](#6-wfa墙面装配系统)
7. [灯带与灯槽系统](#7-灯带与灯槽系统)
8. [Welcome欢迎系统](#8-welcome欢迎系统)
9. [墙体属性管理](#9-墙体属性管理)

---

## 1. 系统概述

### 1.1 功能定位

**plugins-hs-dd89ef02** 是Homestyler的**墙体编辑核心插件**，提供：
- 🧱 **墙体绘制** - 矩形/自由形状墙体创建
- ✏️ **墙体编辑** - 移动/分割/合并/切割墙体
- 🎨 **装饰线条** - NCustomizedMolding装饰线系统
- 💡 **灯带灯槽** - 定制化灯带、灯槽设计
- 🖼️ **墙面材质** - 墙纸、面板材质应用
- 🪟 **门窗系统** - 窗台、缩进管理
- 👋 **Welcome界面** - 用户欢迎与引导

### 1.2 Bundle统计

```
总模块数: 509+ modules
核心系统:
- 墙体命令: 40+ commands
- 装饰线条: 25+ modules
- 材质系统: 20+ modules
- 灯带灯槽: 15+ modules
- UI组件: 80+ components
```

---

## 2. 核心架构

### 2.1 主要枚举类型

#### `cardenum` - 卡片类型
```typescript
// dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/cardenum.js
enum CardEnum {
  TOGGLE_BUTTON = "toggleButton",
  DROPDOWN = "dropdown",
  INPUT = "input",
  ITEM_SELECT = "itemSelect",
  IMAGE_CHECK = "imageCheck",
  EDIT_INPUT = "editInput"
}
```

#### `mousestateenum` - 鼠标状态
```typescript
// dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/mousestateenum.js
enum MouseStateEnum {
  IDLE = 0,
  HOVER = 1,
  PRESSED = 2,
  DRAGGING = 3
}
```

#### `linecolinetype` - 线共线类型
```typescript
// dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/linecolinetype.js
enum LineColineType {
  NOT_COLINE = 0,       // 不共线
  SAME_LINE = 1,        // 同一直线
  PARALLEL = 2,         // 平行
  PERPENDICULAR = 3     // 垂直
}
```

#### `continueaddtypeenum` - 连续添加类型
```typescript
// dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/continueaddtypeenum.js
enum ContinueAddTypeEnum {
  NONE = 0,
  HORIZONTAL = 1,    // 水平连续
  VERTICAL = 2,      // 垂直连续
  ALIGNED = 3        // 对齐连续
}
```

---

## 3. 墙体创建与编辑

### 3.1 墙体创建命令

#### `cmdcreaterectwalls` - 创建矩形墙体
```typescript
// dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/cmdcreaterectwalls.js
class CmdCreateRectWalls implements ICommand {
  execute(request: CreateRectWallsRequest) {
    const { width, height, wallThickness, position } = request
    
    // 创建四面墙
    const walls = [
      this.createWall(position, new Vector2(width, 0), wallThickness),           // 下墙
      this.createWall(new Vector2(position.x + width, position.y), new Vector2(0, height), wallThickness), // 右墙
      this.createWall(new Vector2(position.x, position.y + height), new Vector2(width, 0), wallThickness), // 上墙
      this.createWall(position, new Vector2(0, height), wallThickness)           // 左墙
    ]
    
    // 连接墙体端点
    this.connectWalls(walls)
    
    return walls.map(w => w.id)
  }
  
  createWall(start: Vector2, direction: Vector2, thickness: number) {
    const wall = new NGWall({
      startPoint: start,
      endPoint: start.clone().add(direction),
      thickness: thickness
    })
    this.scene.addWall(wall)
    return wall
  }
}
```

#### `cmdcreatefreeformngwall` - 创建自由形状墙体
```typescript
// dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/cmdcreatefreeformngwall.js
class CmdCreateFreeFormNGWall implements ICommand {
  execute(request: CreateFreeFormNGWallRequest) {
    const points = request.points
    
    // 根据点列创建墙体
    const walls: NGWall[] = []
    for (let i = 0; i < points.length - 1; i++) {
      const wall = this.createWall(points[i], points[i + 1], request.thickness)
      walls.push(wall)
    }
    
    // 如果是闭合路径
    if (request.closed) {
      const closingWall = this.createWall(
        points[points.length - 1],
        points[0],
        request.thickness
      )
      walls.push(closingWall)
    }
    
    return walls.map(w => w.id)
  }
}
```

### 3.2 墙体编辑命令

#### `cmdmovengwall` - 移动墙体
```typescript
// dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/cmdmovengwall.js
class CmdMoveNGWall implements ICommand {
  execute(request: MoveNGWallRequest) {
    const wall = this.getWall(request.wallId)
    
    this.oldStartPoint = wall.startPoint.clone()
    this.oldEndPoint = wall.endPoint.clone()
    
    wall.startPoint.add(request.offset)
    wall.endPoint.add(request.offset)
    
    // 更新连接的墙体
    this.updateConnectedWalls(wall)
    
    wall.updateGeometry()
  }
}
```

#### `cmdmovengwallpoint` - 移动墙体端点
```typescript
// dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/cmdmovengwallpoint.js
class CmdMoveNGWallPoint implements ICommand {
  execute(request: MoveNGWallPointRequest) {
    const wall = this.getWall(request.wallId)
    const isStartPoint = request.isStartPoint
    
    const point = isStartPoint ? wall.startPoint : wall.endPoint
    this.oldPosition = point.clone()
    
    point.copy(request.newPosition)
    
    // 更新相邻墙体
    this.updateAdjacentWalls(wall, isStartPoint)
    
    wall.updateGeometry()
  }
}
```

#### `cmdsplitngwall` - 分割墙体
```typescript
// dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/cmdsplitngwall.js
class CmdSplitNGWall implements ICommand {
  execute(request: SplitNGWallRequest) {
    const wall = this.getWall(request.wallId)
    const splitPoint = request.splitPoint
    
    // 创建两段新墙
    const wall1 = this.createWall(wall.startPoint, splitPoint, wall.thickness)
    const wall2 = this.createWall(splitPoint, wall.endPoint, wall.thickness)
    
    // 复制属性
    wall1.material = wall.material
    wall2.material = wall.material
    wall1.height = wall.height
    wall2.height = wall.height
    
    // 删除原墙体
    this.scene.removeWall(wall)
    
    return [wall1.id, wall2.id]
  }
}
```

#### `cmdmergewall` - 合并墙体
```typescript
// dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/cmdmergewall.js
class CmdMergeWall implements ICommand {
  execute(request: MergeWallRequest) {
    const wall1 = this.getWall(request.wall1Id)
    const wall2 = this.getWall(request.wall2Id)
    
    // 检查是否共线
    if (!this.areColinear(wall1, wall2)) {
      throw new Error("Walls must be colinear to merge")
    }
    
    // 找出最远的两个端点
    const [start, end] = this.getExtremPoints([
      wall1.startPoint, wall1.endPoint,
      wall2.startPoint, wall2.endPoint
    ])
    
    // 创建新墙体
    const mergedWall = this.createWall(start, end, wall1.thickness)
    mergedWall.material = wall1.material
    
    // 删除原墙体
    this.scene.removeWall(wall1)
    this.scene.removeWall(wall2)
    
    return mergedWall.id
  }
}
```

#### `cmdcutwall` - 切割墙体
```typescript
// dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/cmdcutwall.js
class CmdCutWall implements ICommand {
  execute(request: CutWallRequest) {
    const wall = this.getWall(request.wallId)
    const cutLine = request.cutLine
    
    // 计算交点
    const intersection = this.calculateIntersection(wall, cutLine)
    
    if (!intersection) {
      throw new Error("Cut line does not intersect wall")
    }
    
    // 分割墙体
    return this.splitWall(wall, intersection)
  }
}
```

### 3.3 墙体属性修改

#### `cmdchangewallswidth` - 修改墙体宽度
```typescript
// dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/cmdchangewallswidth.js
class CmdChangeWallsWidth implements ICommand {
  execute(request: ChangeWallsWidthRequest) {
    const walls = request.wallIds.map(id => this.getWall(id))
    
    for (const wall of walls) {
      this.oldThickness.set(wall.id, wall.thickness)
      wall.thickness = request.newWidth
      wall.updateGeometry()
    }
    
    this.updateConnectedWalls(walls)
  }
}
```

#### `cmdresizewalls` - 调整墙体尺寸
```typescript
// dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/cmdresizewalls.js
class CmdResizeWalls implements ICommand {
  execute(request: ResizeWallsRequest) {
    for (const wallResize of request.wallResizes) {
      const wall = this.getWall(wallResize.wallId)
      
      if (wallResize.newLength) {
        this.resizeWallLength(wall, wallResize.newLength)
      }
      
      if (wallResize.newHeight) {
        wall.height = wallResize.newHeight
        wall.updateGeometry()
      }
    }
  }
}
```

---

## 4. 装饰线条系统

### 4.1 NCustomizedMolding 核心

#### 装饰线条策略接口
```typescript
// dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/ncustomizedmoldingstrategy.js
interface INCustomizedMoldingStrategy {
  create(params: MoldingParams): NCustomizedMolding
  edit(molding: NCustomizedMolding, params: MoldingParams): void
  delete(molding: NCustomizedMolding): void
  preview(params: MoldingParams): void
}

class NCustomizedMoldingStrategy implements INCustomizedMoldingStrategy {
  create(params: MoldingParams) {
    const molding = new NCustomizedMolding({
      profile: params.profile,
      path: params.path,
      material: params.material
    })
    
    molding.generate3DGeometry()
    return molding
  }
}
```

#### 2D装饰线策略
```typescript
// dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/ncustomizedmolding2dstrategy.js
class NCustomizedMolding2DStrategy {
  draw2D(molding: NCustomizedMolding, context: CanvasRenderingContext2D) {
    const path = molding.path
    const width = molding.profile.width
    
    context.strokeStyle = "#000000"
    context.lineWidth = width * this.scale
    
    context.beginPath()
    context.moveTo(path[0].x, path[0].y)
    
    for (let i = 1; i < path.length; i++) {
      context.lineTo(path[i].x, path[i].y)
    }
    
    context.stroke()
  }
}
```

### 4.2 装饰线命令

#### `cmdaddcatalogmolding` - 添加目录装饰线
```typescript
// dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/cmdaddcatalogmolding.js
class CmdAddCatalogMolding implements ICommand {
  execute(request: AddNCCustomizedMoldingRequest) {
    const molding = this.moldingStrategy.create({
      catalogId: request.catalogId,
      wall: request.wall,
      position: request.position,
      height: request.height
    })
    
    this.scene.addMolding(molding)
    return molding.id
  }
}
```

#### `cmdeditncustomizedmolding` - 编辑装饰线
```typescript
// dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/cmdeditncustomizedmolding.js
class CmdEditNCustomizedMolding implements ICommand {
  execute(request: EditNCustomizedModelMoldingRequest) {
    const molding = this.getMolding(request.moldingId)
    
    if (request.newProfile) {
      molding.profile = request.newProfile
    }
    
    if (request.newPath) {
      molding.path = request.newPath
    }
    
    if (request.newMaterial) {
      molding.material = request.newMaterial
    }
    
    molding.regenerateGeometry()
  }
}
```

#### `cmddeletencustomizedmodelmolding` - 删除装饰线
```typescript
// dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/cmddeletencustomizedmodelmolding.js
class CmdDeleteNCustomizedModelMolding implements ICommand {
  execute(request: DeleteNCustomizedModelMoldingRequest) {
    const molding = this.getMolding(request.moldingId)
    
    // 保存用于undo
    this.deletedMoldingData = molding.serialize()
    
    this.scene.removeMolding(molding)
  }
  
  undo() {
    const molding = this.deserializeMolding(this.deletedMoldingData)
    this.scene.addMolding(molding)
  }
}
```

#### `cmdflipncustomizedmolding` - 翻转装饰线
```typescript
// dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/cmdflipncustomizedmolding.js
class CmdFlipNCustomizedMolding implements ICommand {
  execute(request: FlipNCustomizedModelMoldingRequest) {
    const molding = this.getMolding(request.moldingId)
    
    // 翻转装饰线方向
    molding.path.reverse()
    molding.profile.flip()
    
    molding.regenerateGeometry()
  }
}
```

#### `cmdcopymolding` - 复制装饰线
```typescript
// dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/cmdcopymolding.js
class CmdCopyMolding implements ICommand {
  execute(request: any) {
    const 