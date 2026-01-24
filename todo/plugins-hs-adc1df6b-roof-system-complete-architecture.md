# plugins-hs-adc1df6b 屋顶系统完整架构分析

> **文档版本**: v1.0  
> **最后更新**: 2026-01-24  
> **Bundle**: `dist/plugins-hs-adc1df6b.fe5726b7.bundle`  
> **模块数量**: 162+  
> **核心功能**: 参数化屋顶设计、绘图、编辑、材质管理

---

## 📋 目录

1. [系统概述](#1-系统概述)
2. [核心架构](#2-核心架构)
3. [屋顶绘图系统](#3-屋顶绘图系统)
4. [参数化屋顶](#4-参数化屋顶)
5. [屋顶编辑命令](#5-屋顶编辑命令)
6. [材质与面管理](#6-材质与面管理)
7. [室外绘图环境](#7-室外绘图环境)
8. [保存与导出](#8-保存与导出)
9. [UI组件](#9-ui组件)

---

## 1. 系统概述

### 1.1 功能定位

**plugins-hs-adc1df6b** 是Homestyler的**屋顶设计与编辑插件**，提供：
- 🏠 **参数化屋顶设计** - 支持多种屋顶类型
- ✏️ **交互式绘图工具** - 矩形/圆形/多边形/圆角绘制
- 🎨 **材质管理** - 屋顶面材质设置与刷子工具
- 📐 **尺寸标注** - 2D平面尺寸显示
- 🔧 **参数楼梯** - 参数化楼梯集成

### 1.2 Bundle统计

```
总模块数: 162+ modules
核心文件: 
- roofsdrawing.js (主绘图系统)
- parametricroof.js (参数化屋顶)
- roofpropertybarhandler.js (属性栏)
- outdoordrawingenvironment.js (室外环境)
- saveservice.js (保存服务)
```

---

## 2. 核心架构

### 2.1 主要枚举类型

#### `enparamrooftype` - 参数化屋顶类型
```typescript
// dist/plugins-hs-adc1df6b.fe5726b7.bundle_dewebpack/enparamrooftype.js
enum EnParamRoofType {
  GABLE_ROOF = 0,        // 双坡屋顶
  HIP_ROOF = 1,          // 四坡屋顶
  FLAT_ROOF = 2,         // 平屋顶
  SHED_ROOF = 3,         // 单坡屋顶
  GAMBREL_ROOF = 4,      // 复折屋顶
  MANSARD_ROOF = 5       // 孟莎屋顶
}
```

#### `parametricopeingcommandtype` - 开口命令类型
```typescript
// dist/plugins-hs-adc1df6b.fe5726b7.bundle_dewebpack/parametricopeingcommandtype.js
enum ParametricOpeningCommandType {
  ADD_OPENING = "AddOpening",
  MOVE_OPENING = "MoveOpening",
  ROTATE_HOLE = "RotateHole",
  DELETE_OPENING = "DeleteOpening",
  CHANGE_POCKET_SIDE = "ChangePocketSide"
}
```

#### `savestageenum` - 保存阶段枚举
```typescript
// dist/plugins-hs-adc1df6b.fe5726b7.bundle_dewebpack/savestageenum.js
enum SaveStageEnum {
  CHECK = "check",           // 检查阶段
  GET_DATA = "getData",      // 获取数据
  POST_DATA = "postData",    // 提交数据
  HAS_TASK = "hasTask"       // 任务阶段
}
```

---

## 3. 屋顶绘图系统

### 3.1 主绘图环境

#### `roofsdrawing` - 屋顶绘图主类
```typescript
// dist/plugins-hs-adc1df6b.fe5726b7.bundle_dewebpack/roofsdrawing.js
class RoofsDrawing {
  // 核心属性
  private environment: RoofsDrawingEnvironment
  private transaction: RoofsDrawingTransaction
  private sketch: Sketch
  private toolbar: Toolbar
  
  // 初始化
  initialize() {
    this.setupEnvironment()
    this.setupTransaction()
    this.setupGizmos()
  }
  
  // 绘图模式
  startDrawMode(mode: DrawMode) {
    switch(mode) {
      case "rectangle": return this.drawRectangle()
      case "circle": return this.drawCircle()
      case "polygon": return this.drawPolygon()
      case "fillet": return this.drawFillet()
    }
  }
}
```

### 3.2 绘图Gizmo工具

#### 矩形绘制
```typescript
// dist/plugins-hs-adc1df6b.fe5726b7.bundle_dewebpack/drawrectanglegizmo.js
class DrawRectangleGizmo {
  startPoint: Point
  endPoint: Point
  
  onMouseDown(point: Point) {
    this.startPoint = point
  }
  
  onMouseMove(point: Point) {
    this.endPoint = point
    this.previewRectangle()
  }
  
  onMouseUp() {
    this.createRectangleRoof()
  }
}
```

#### 圆形绘制
```typescript
// dist/plugins-hs-adc1df6b.fe5726b7.bundle_dewebpack/drawcirclegizmo.js
class DrawCircleGizmo {
  center: Point
  radius: number
  
  onMouseDown(point: Point) {
    this.center = point
  }
  
  onMouseDrag(point: Point) {
    this.radius = this.center.distanceTo(point)
    this.previewCircle()
  }
}
```

#### 圆角绘制
```typescript
// dist/plugins-hs-adc1df6b.fe5726b7.bundle_dewebpack/drawfilletgizmo.js
class DrawFilletGizmo {
  edge1: Edge
  edge2: Edge
  radius: number
  
  selectEdges() {
    // 选择两条边
  }
  
  applyFillet() {
    // 创建圆角
  }
}
```

### 3.3 绘图命令

```typescript
// Command模式实现
class CmdDrawRectangle implements ICommand {
  execute() {
    const request = new DrawRectangleRequest(startPoint, endPoint)
    return this.roofService.drawRectangle(request)
  }
  
  undo() {
    return this.roofService.deleteRoof(this.createdRoofId)
  }
}

class CmdDrawCircle implements ICommand { /* ... */ }
class CmdDrawPolygons implements ICommand { /* ... */ }
class CmdDrawRegularPolygon implements ICommand { /* ... */ }
class CmdDrawFillet implements ICommand { /* ... */ }
```

---

## 4. 参数化屋顶

### 4.1 参数化楼梯系统

```typescript
// dist/plugins-hs-adc1df6b.fe5726b7.bundle_dewebpack/changeparametricstairpropertycmd.js
class ChangeParametricStairPropertyCmd implements ICommand {
  execute(request: ChangeParametricStairPropertyRequest) {
    const stair = this.getStair(request.stairId)
    
    // 更新属性
    stair.width = request.width
    stair.height = request.height
    stair.steps = request.steps
    stair.riserHeight = request.riserHeight
    stair.treadDepth = request.treadDepth
    
    // 重新生成几何
    this.regenerateStairGeometry(stair)
  }
}
```

### 4.2 参数化开口（Parametric Opening）

```typescript
// 开口管理
interface ParametricOpening {
  id: string
  type: "window" | "door" | "skylight"
  position: Point3D
  dimensions: {
    width: number
    height: number
    depth: number
  }
  pocketSide: "left" | "right" | "top" | "bottom"
}

// 开口请求
class AddOpeningRequest {
  roofId: string
  opening: ParametricOpening
}

class MoveOpeningRequest {
  openingId: string
  newPosition: Point3D
}

class RotateHoleRequest {
  holeId: string
  angle: number
  center: Point3D
}
```

---

## 5. 屋顶编辑命令

### 5.1 屋顶操作命令

#### 基础CRUD
```typescript
// 添加屋顶
class CmdAddRoofByDrawing implements ICommand {
  execute(request: AddRoofRequest) {
    const roof = this.createRoof(request.geometry)
    this.scene.addRoof(roof)
    return roof.id
  }
}

// 删除屋顶
class CmdDeleteRoof implements ICommand {
  execute(request: DeleteRoofRequest) {
    this.scene.removeRoof(request.roofId)
  }
}

// 替换屋顶
class CmdReplaceRoof implements ICommand {
  execute(request: ReplaceRoofRequest) {
    const oldRoof = this.scene.getRoof(request.oldRoofId)
    const newRoof = this.createRoof(request.newGeometry)
    this.scene.replaceRoof(oldRoof, newRoof)
  }
}
```

#### 屋顶面操作
```typescript
// 移动屋顶面
class CmdMoveFaces implements ICommand {
  execute(faceIds: string[], offset: Vector3D) {
    for (const faceId of faceIds) {
      const face = this.getFace(faceId)
      face.translate(offset)
    }
    this.updateRoofGeometry()
  }
}

// 设置屋顶面材质
class SetRoofFaceMaterialRequest {
  faceId: string
  materialId: string
}

class ClearRoofFaceMaterialRequest {
  faceIds: string[]
}

class ResetRoofFaceMaterialRequest {
  faceIds: string[]
}
```

### 5.2 曲线与点编辑

```typescript
// 移动曲线
class CmdMoveCurve implements ICommand {
  execute(request: MoveCurveRequest) {
    const curve = this.getCurve(request.curveId)
    curve.translate(request.offset)
    this.updateDependentRoofs(curve)
  }
}

// 移动点
class CmdMovePoint implements ICommand {
  execute(request: MovePointRequest) {
    const point = this.getPoint(request.pointId)
    point.moveTo(request.newPosition)
    this.updateConnectedCurves(point)
  }
}

// 旋转孔洞
class CmdRotateHole implements ICommand {
  execute(request: RotateHoleRequest) {
    const hole = this.getHole(request.holeId)
    hole.rotate(request.angle, request.center)
  }
}
```

### 5.3 引导线系统

```typescript
// 添加引导线
class CmdAddGuidelines implements ICommand {
  execute(request: AddGuidelineRequest) {
    const guideline = this.createGuideline(request.startPoint, request.endPoint)
    this.scene.addGuideline(guideline)
  }
}

// 删除引导线
class CmdDeleteGuideline implements ICommand {
  execute(request: DeleteGuidelineRequest) {
    this.scene.removeGuideline(request.guidelineId)
  }
}

// 清除所有引导线
class CmdClearGuidelines implements ICommand {
  execute() {
    this.scene.clearAllGuidelines()
  }
}
```

---

## 6. 材质与面管理

### 6.1 材质刷工具

```typescript
// dist/plugins-hs-adc1df6b.fe5726b7.bundle_dewebpack/cmdmaterialbrush.js
class CmdMaterialBrush implements ICommand {
  private selectedMaterial: Material
  
  activate() {
    this.cursor = "brush"
    this.listenToFaceClick()
  }
  
  onFaceClick(face: Face) {
    this.applyMaterialToFace(face, this.selectedMaterial)
  }
  
  applyMaterialToFace(face: Face, material: Material) {
    face.material = material
    face.updateTexCoords()
    this.render()
  }
}
```

### 6.2 屋顶面属性

```typescript
// dist/plugins-hs-adc1df6b.fe5726b7.bundle_dewebpack/rooffacepropertybarhandler.js
class RoofFacePropertyBarHandler {
  private selectedFaces: Face[]
  
  showProperties(faces: Face[]) {
    this.selectedFaces = faces
    this.propertyBar.show({
      material: this.getMaterialInfo(faces[0]),
      area: this.calculateTotalArea(faces),
      slope: this.calculateSlope(faces[0]),
      thickness: faces[0].thickness
    })
  }
  
  onMaterialChange(newMaterial: Material) {
    for (const face of this.selectedFaces) {
      face.material = newMaterial
    }
  }
  
  onThicknessChange(newThickness: number) {
    for (const face of this.selectedFaces) {
      face.thickness = newThickness
    }
  }
}
```

### 6.3 装饰线（Molding）系统

```typescript
// 添加装饰线
class CmdAddWallMolding implements ICommand {
  execute(request: AddWallMoldingRequest) {
    const molding = this.createMolding(request.profile, 