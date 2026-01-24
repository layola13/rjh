# plugins-hs-5c263204 操作、Gizmo与尺寸标注系统完整架构

> **文档版本**: v1.0  
> **最后更新**: 2026-01-24  
> **Bundle**: `dist/plugins-hs-5c263204.fe5726b7.bundle`  
> **模块数量**: 497+  
> **核心功能**: 交互式操作、Gizmo工具、尺寸标注、用户引导、材质应用

---

## 📋 目录

1. [系统概述](#1-系统概述)
2. [核心架构](#2-核心架构)
3. [Gizmo操作系统](#3-gizmo操作系统)
4. [尺寸标注系统](#4-尺寸标注系统)
5. [WFA组件系统](#5-wfa组件系统)
6. [用户引导系统](#6-用户引导系统)
7. [反馈系统](#7-反馈系统)
8. [HomeGPT集成](#8-homegpt集成)
9. [材质与镜像命令](#9-材质与镜像命令)

---

## 1. 系统概述

### 1.1 功能定位

**plugins-hs-5c263204** 是Homestyler的**交互操作核心插件**，提供：
- 🎯 **Gizmo工具集** - 移动/旋转/缩放/坐标轴操作
- 📏 **智能尺寸标注** - 家具/开口/灯光/暗装工程多类型尺寸
- 🧩 **WFA组件** - Wall Furniture Assembly（墙面家具装配）
- 🎓 **用户引导** - 新手教程、帮助系统
- 💬 **反馈系统** - 用户反馈收集与处理
- 🤖 **HomeGPT** - AI助手集成

### 1.2 Bundle统计

```
总模块数: 497+ modules
核心文件数量: 
- Dimension相关: 18个尺寸标注类
- WFA组件: 10个操作组件
- Feedback系统: 15个反馈组件
- UI控件: 50+ 个控件
```

---

## 2. 核心架构

### 2.1 主要枚举类型

#### `axiscolorenum` - 坐标轴颜色
```typescript
// dist/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/axiscolorenum.js
enum AxisColorEnum {
  X_AXIS = 0xFF0000,  // 红色 - X轴
  Y_AXIS = 0x00FF00,  // 绿色 - Y轴
  Z_AXIS = 0x0000FF   // 蓝色 - Z轴
}
```

#### `editmodeenum` - 编辑模式
```typescript
enum EditModeEnum {
  NONE = 0,
  MOVE = 1,
  ROTATE = 2,
  SCALE = 3,
  RESIZE = 4
}
```

#### `applytypeenum` - 应用类型
```typescript
enum ApplyTypeEnum {
  SINGLE = "single",              // 单个对象
  WHOLE_WALL = "wholeWall",      // 整面墙
  ENTIRE_ROOM = "entireRoom",    // 整个房间
  ALL_ROOMS = "allRooms"         // 所有房间
}
```

#### `svgdimensiontype` - SVG尺寸类型
```typescript
enum SVGDimensionType {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
  ALIGNED = "aligned",
  ANGULAR = "angular"
}
```

---

## 3. Gizmo操作系统

### 3.1 WFA组件核心

#### `wfabase` - WFA基类
```typescript
// dist/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/wfabase.js
abstract class WFABase {
  protected target: Object3D
  protected scene: Scene
  protected camera: Camera
  
  abstract activate(): void
  abstract deactivate(): void
  abstract update(): void
  
  protected raycasting(mousePos: Vector2): Intersection[] {
    this.raycaster.setFromCamera(mousePos, this.camera)
    return this.raycaster.intersectObjects(this.scene.children)
  }
}
```

#### `wfacompsmovement` - 移动组件
```typescript
// dist/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/wfacompsmovement.js
class WFACompsMovement extends WFABase {
  private dragStart: Vector3
  private dragCurrent: Vector3
  private constraintAxis: "x" | "y" | "z" | null
  
  activate() {
    this.addEventListener("mousedown", this.onMouseDown)
    this.addEventListener("mousemove", this.onMouseMove)
    this.addEventListener("mouseup", this.onMouseUp)
  }
  
  onMouseDown(event: MouseEvent) {
    this.dragStart = this.getIntersectionPoint(event)
    this.detectConstraintAxis()
  }
  
  onMouseMove(event: MouseEvent) {
    this.dragCurrent = this.getIntersectionPoint(event)
    const offset = this.dragCurrent.sub(this.dragStart)
    
    if (this.constraintAxis) {
      offset = this.projectToAxis(offset, this.constraintAxis)
    }
    
    this.target.position.add(offset)
    this.dragStart = this.dragCurrent
  }
}
```

#### `wfacompsrotation` - 旋转组件
```typescript
// dist/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/wfacompsrotation.js
class WFACompsRotation extends WFABase {
  private rotationStart: number
  private rotationAxis: Vector3
  
  activate() {
    this.showRotationGizmo()
  }
  
  rotate(angle: number, axis: Vector3) {
    const quaternion = new Quaternion()
    quaternion.setFromAxisAngle(axis, angle)
    this.target.quaternion.multiply(quaternion)
  }
  
  private showRotationGizmo() {
    // 显示三个旋转圆环（X/Y/Z轴）
    this.createRotationCircle("x", AxisColorEnum.X_AXIS)
    this.createRotationCircle("y", AxisColorEnum.Y_AXIS)
    this.createRotationCircle("z", AxisColorEnum.Z_AXIS)
  }
}
```

#### `wfacompsresize` - 缩放组件
```typescript
// dist/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/wfacompsresize.js
class WFACompsResize extends WFABase {
  private scaleHandles: ScaleHandle[]
  private uniformScale: boolean = false
  
  activate() {
    this.createScaleHandles()
  }
  
  createScaleHandles() {
    // 创建8个角点 + 6个面中心的缩放句柄
    this.scaleHandles = [
      new ScaleHandle("corner", [1, 1, 1]),   // 右上前
      new ScaleHandle("corner", [-1, 1, 1]),  // 左上前
      // ... 其他6个角
      new ScaleHandle("face", [1, 0, 0]),     // X正面
      new ScaleHandle("face", [0, 1, 0]),     // Y正面
      new ScaleHandle("face", [0, 0, 1])      // Z正面
    ]
  }
  
  onHandleDrag(handle: ScaleHandle, offset: Vector3) {
    if (this.uniformScale) {
      this.target.scale.multiplyScalar(offset.length())
    } else {
      this.target.scale.multiply(handle.scaleVector)
    }
  }
}
```

#### `wfacompscoordinateaxis` - 坐标轴组件
```typescript
// dist/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/wfacompscoordinateaxis.js
class WFACompsCoordinateAxis extends WFABase {
  private xAxis: ArrowHelper
  private yAxis: ArrowHelper
  private zAxis: ArrowHelper
  
  activate() {
    this.createAxisArrows()
  }
  
  createAxisArrows() {
    this.xAxis = new ArrowHelper(
      new Vector3(1, 0, 0),
      this.target.position,
      100,
      AxisColorEnum.X_AXIS
    )
    this.yAxis = new ArrowHelper(
      new Vector3(0, 1, 0),
      this.target.position,
      100,
      AxisColorEnum.Y_AXIS
    )
    this.zAxis = new ArrowHelper(
      new Vector3(0, 0, 1),
      this.target.position,
      100,
      AxisColorEnum.Z_AXIS
    )
    
    this.scene.add(this.xAxis, this.yAxis, this.zAxis)
  }
}
```

### 3.2 交互式操作

#### `contentmovement` - 内容移动
```typescript
// dist/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/contentmovement.js
class ContentMovement {
  private snapToGrid: boolean = true
  private gridSize: number = 10 // mm
  
  move(object: Object3D, offset: Vector3) {
    if (this.snapToGrid) {
      offset.x = Math.round(offset.x / this.gridSize) * this.gridSize
      offset.y = Math.round(offset.y / this.gridSize) * this.gridSize
      offset.z = Math.round(offset.z / this.gridSize) * this.gridSize
    }
    
    object.position.add(offset)
    this.checkCollisions(object)
  }
  
  checkCollisions(object: Object3D): boolean {
    // 碰撞检测逻辑
    return false
  }
}
```

#### `contentrotation` - 内容旋转
```typescript
// dist/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/contentrotation.js
class ContentRotation {
  private snapAngle: number = 15 // 度
  
  rotate(object: Object3D, angle: number, axis: Vector3) {
    if (this.snapAngle > 0) {
      angle = Math.round(angle / this.snapAngle) * this.snapAngle
    }
    
    const rad = angle * Math.PI / 180
    const quaternion = new Quaternion()
    quaternion.setFromAxisAngle(axis, rad)
    object.quaternion.multiply(quaternion)
  }
}
```

#### `resizecontent` - 内容缩放
```typescript
// dist/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/resizecontent.js
class ResizeContent {
  resize(object: Object3D, scale: Vector3, pivot: Vector3) {
    // 相对于pivot点缩放
    const offset = object.position.clone().sub(pivot)
    offset.multiply(scale)
    object.position.copy(pivot).add(offset)
    object.scale.multiply(scale)
  }
}
```

---

## 4. 尺寸标注系统

### 4.1 基础尺寸类

#### `basedimension` - 尺寸基类
```typescript
// dist/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/basedimension.js
abstract class BaseDimension {
  protected startPoint: Vector3
  protected endPoint: Vector3
  protected textOffset: number = 20 // px
  protected precision: number = 0   // 小数位数
  
  abstract draw(): void
  abstract update(): void
  
  protected calculateDistance(): number {
    return this.startPoint.distanceTo(this.endPoint)
  }
  
  protected formatValue(value: number): string {
    const mm = Math.round(value)
    return `${mm}mm`
  }
  
  protected drawLine(start: Vector3, end: Vector3, color: number) {
    const geometry = new BufferGeometry()
    geometry.setFromPoints([start, end])
    const material = new LineBasicMaterial({ color })
    return new Line(geometry, material)
  }
  
  protected drawText(text: string, position: Vector3) {
    // 绘制尺寸文本
  }
}
```

### 4.2 专业尺寸标注

#### `furnituredimension` - 家具尺寸
```typescript
// dist/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/furnituredimension.js
class FurnitureDimension extends BaseDimension {
  private furniture: Object3D
  
  draw() {
    const bbox = new Box3().setFromObject(this.furniture)
    const size = bbox.getSize(new Vector3())
    
    // 绘制宽度尺寸
    this.drawWidthDimension(size.x)
    // 绘制深度尺寸
    this.drawDepthDimension(size.z)
    // 绘制高度尺寸
    this.drawHeightDimension(size.y)
  }
  
  drawWidthDimension(width: number) {
    // X轴尺寸标注
    this.drawLine(...)
    this.drawText(`W: ${this.formatValue(width)}`, ...)
  }
}
```

#### `newfurnituredimension` - 新家具尺寸
```typescript
// dist/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/newfurnituredimension.js
class NewFurnitureDimension extends BaseDimension {
  private showDetailedDims: boolean = true
  
  draw() {
    if (this.showDetailedDims) {
      this.drawDetailedDimensions()
    } else {
      this.drawSimpleDimensions()
    }
  }
  
  drawDetailedDimensions() {
    // 详细尺寸：包括子部件尺寸
  }
}
```

#### `openingdimension` - 开口尺寸
```typescript
// dist/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/openingdimension.js
class OpeningDimension extends BaseDimension {
  private opening: Opening
  
  draw() {
    // 门窗开口尺寸标注
    this.drawOpeningWidth()
    this.drawOpeningHeight()
    this.drawFromFloorHeight()
  }
  
  drawFromFloorHeight() {
    // 距地高度
    const height = this.opening.position.z
    this.drawText(`H: ${this.formatValue(height)}`, ...)
  }
}
```

#### `parametricopeningdimension` - 参数化开口尺寸
```typescript
// dist/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/parametricopeningdimension.js
class ParametricOpeningDimension extends BaseDimension {
  private parametricOpening: ParametricOpening
  
  draw() {
    // 参数化开口的动态尺寸
    this.drawParametricDimensions()
  }
}
```

#### `openingcalculateddimension` - 开口计算尺寸
```typescript
// dist/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/openingcalculateddimension.js
class OpeningCalculatedDimension extends BaseDimension {
  calculateClearance(): number {
    // 计算净空尺寸
  }
  
  calculateRoughOpening(): number {
    // 计算毛坯开口尺寸
  }
}
```

#### `lightdimension` - 灯光尺寸
```typescript
// dist/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/lightdimension.js
class LightDimension extends BaseDimension {
  private light: Light
  
  draw() {
    this.drawLightPosition()
    this.drawLightCoverage()
  }
  
  drawLightCoverage() {
    // 灯光覆盖范围
    if (this.light.type === "SpotLight") {
      const spotLight = this.light as SpotLight
      this.drawCone(spotLight.angle, spotLight.distance)
    }
  }
}
```

#### 