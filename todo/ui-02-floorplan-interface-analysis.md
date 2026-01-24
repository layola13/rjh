# Homestyler 建筑户型界面完整分析

## 1. 界面概述 🎯

**界面名称**: FloorPlan Editor (户型编辑器)

**界面用途**:
- 绘制和编辑房屋平面图（户型图）
- 创建墙体、房间、门窗等建筑元素
- 进行尺寸标注和空间规划
- 作为室内设计的基础框架

**技术实现**: 2D SVG画布 + WebGL 3D预览

---

## 2. 界面布局 🎨

```
┌────────────────────────────────────────────────────────────────────┐
│ PageHeader: [文件] [户型工具▼] [视图] [帮助] [保存]    [用户]    │
├───────┬────────────────────────────────────────────────┬───────────┤
│       │                                                │           │
│ Left  │         2D Canvas (户型绘制区)                  │  Right    │
│ Menu  │                                                │ Property  │
│       │  ┌──────────┐                                  │   Bar     │
│ 墙体  │  │ 房间1    │  ┌────┐                         │           │
│ 工具  │  │          │  │房2 │                         │ - 墙体厚度│
│       │  │          ├──┤    │                         │ - 墙体高度│
│ [直线]│  │          │  └────┘                         │ - 材质选择│
│ [矩形]│  └──────────┘                                  │ - 颜色    │
│ [自由]│                                                │           │
│       │  [标尺刻度] [网格] [捕捉点]                     │ [应用]    │
│ CAD   │                                                │ [重置]    │
│ [导入]│                                                │           │
│ [图片]│                                                │           │
│       │                                                │           │
├───────┴────────────────────────────────────────────────┴───────────┤
│ StatusBar: [2D/3D切换] [缩放: 100%] [坐标:x,y] [提示信息]        │
└────────────────────────────────────────────────────────────────────┘

工具栏浮动区:
┌──────────────────────────────────┐
│ [矩形墙体] [直线墙体] [曲线墙体]  │
│ [添加门] [添加窗] [添加柱子]     │
│ [房间标注] [尺寸标注] [文字]     │
└──────────────────────────────────┘
```

---

## 2. 核心功能模块 📐

### 2.1 墙体绘制工具

#### 2.1.1 矩形墙体绘制 (CreateRectWalls)

**文件**: `dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/cmdcreaterectwalls.js`

```javascript
// 矩形墙体绘制命令
CmdCreateRectWalls

// 关键组件引用
this._catalogNode = document.querySelector(".catalog_mainframe")
this._editor3dContainerNode = document.querySelector(".editor3dContainer")
this._rightpropertybarNode = document.querySelector(".rightpropertybar")
this._toolbarcontainerNode = document.querySelector(".toolbarcontainer")
```

**功能特点**:
- 通过鼠标拖拽创建矩形房间
- 自动生成四面墙体
- 支持实时预览
- 画布边界检测

**坐标转换**:
```javascript
// 画布坐标 → 模型坐标
HSApp.View.SVG.Util.CanvasPointToModel(e)

// 创建顶点
HSCore.Model.Vertex.create(t.x, t.y)
```

#### 2.1.2 自由墙体绘制 (CreateFreeFormWall)

**文件**: `dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/cmdcreatefreeformngwall.js`

```javascript
// 自由形状墙体绘制
CmdCreateFreeFormNGWall
```

**功能特点**:
- 点击绘制墙体路径
- 支持任意角度
- 智能捕捉对齐
- CAD点捕捉支持

**绘制流程**:
```
点击起点 → 移动鼠标 → 显示预览线 → 点击下一点 → ... → 双击完成
```

---

## 3. 画布系统 🖼️

### 3.1 双画布架构

**SVG 2D画布**:
```javascript
this.svgCanvas = !0  // 2D编辑画布
```
- 用于户型图绘制
- 矢量图形渲染
- 精确测量和标注

**WebGL 3D画布**:
```javascript
this.webglCanvas = !0  // 3D预览画布
```
- 3D效果预览
- 实时渲染
- 材质贴图显示

### 3.2 坐标转换系统

```javascript
// 屏幕坐标 → 画布坐标
HSApp.View.SVG.Util.ScreenPointToCanvas([x, y], context)

// 画布坐标 → 屏幕坐标
HSApp.View.SVG.Util.CanvasPointToScreen([x, y], context)

// 画布坐标 → 模型坐标
HSApp.View.SVG.Util.CanvasPointToModel(canvasPoint)

// 模型坐标 → 画布坐标
HSApp.View.SVG.Util.ModelPointToCanvas(modelPoint)
```

### 3.3 画布控制

**边界检测**:
```javascript
var t = HSApp.View.SVG.Util.getCanvasBoundaryStatus()
// 返回: { left: bool, right: bool, top: bool, bottom: bool }
```

**画布移动**:
```javascript
HSApp.View.SVG.Util.moveCanvas(direction)
// direction: "left", "right", "up", "down"
```

**自动移动逻辑**:
```javascript
// 鼠标接近边缘时自动移动画布
this.setDirection = function(e) {
    if (!leftMenu.isLeftMenuShowed()) {
        var boundary = HSApp.View.SVG.Util.getCanvasBoundaryStatus();
        // 检测方向并移动
        HSApp.View.SVG.Util.moveCanvas(direction)
    }
}
```

---

## 4. CAD导入功能 📥

### 4.1 CAD文件上传

**事件追踪**:
```javascript
// dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/module_28093.js
P.HSApp.Util.EventTrack.instance().track(
    P.HSApp.Util.EventGroupEnum.Toolbar, 
    "toolbar_upload_cad_event"
)

// 显示CAD文件选择器
D.UI.guideReaded() ? 
    D.UI.showCADFileSelector() : 
    D.UI.showImportCADNewUserGuide()
```

### 4.2 户型图片导入

**上传流程**:
```javascript
// 上传房间图片
P.HSApp.Util.EventTrack.instance().track(
    P.HSApp.Util.EventGroupEnum.Toolbar, 
    "toolbar_upload_room_picture_event"
)

$("#underLayImageWindow #underlayImg").click()
```

### 4.3 图片校准系统 (Ruler)

**文件**: `dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/ruler.js`

```javascript
// 标尺控件用于图片尺寸校准
updateCanvasData(canvasWidth, canvasTranslate)

// 图片长度转画布长度
imgLength2Canvas(length) {
    // 根据校准比例转换
}
```

**校准流程**:
```
1. 上传户型图片
2. 在图片上标记已知长度的线段
3. 输入实际长度值
4. 系统计算比例
5. 应用到整个平面图
```

**核心方法**:
```javascript
// 更新画布数据
updateCanvasData: function(e, t) {
    this.canvasWidth = e;
    this.canvasTranslate = t;
}

// 画布坐标转换
var n = HSApp.View.SVG.Util.CanvasPointToScreen(
    this.canvasTranslate, 
    context
);
var i = this.canvasWidth * context.getScaleFactor();
```

---

## 5. 绘图辅助功能 🎨

### 5.1 捕捉系统

**点捕捉**:
```javascript
// dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/module_799429.js

// CAD点捕捉
this.inference._snapCADPoints

// 捕捉位置更新
_updateSnapPosition(point) {
    var t = HSApp.View.SVG.Util.ModelPointToCanvas([e.x, e.y]);
    this.snapPosition = new HSCore.Util.Math.Vec2(t[0], t[1]);
}
```

**线捕捉**:
```javascript
// 最近线段捕捉
var closestPoint = GeLib.LineUtils.getClosestPointOfSegment(
    line, 
    wallInfo.point
);
```

**捕捉指示器**:
```javascript
// 自由选点圆形指示器
this.freePickCircleIndicator.attr({
    cx: this.cursorInCanvas.x,
    cy: this.cursorInCanvas.y
});
this.freePickCircleIndicator.show();
```

### 5.2 智能推理

**追踪模式**:
```javascript
// 跟踪绘制状态
this.tracingPosition = HSApp.View.SVG.Util.CanvasPointToModel(
    this.snapPosition
);

// 延迟确认捕捉
this._tracingTimer = setTimeout(function() {
    var t = HSApp.View.SVG.Util.CanvasPointToModel(u.snapPosition);
    if (HSCore.Util.Math.isSamePoint(u.tracingPosition, t, .001)) {
        u.snapSelected = !0;
        u.snappedLines = c.linesInfo;
        u._showSnapIndicator();
    }
}, 500);
```

---

## 6. 墙体编辑功能 🔧

### 6.1 墙体类型修改

**文件**: `dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/changewalltyperequest.js`

```javascript
// 更改墙体类型请求
ChangeWallTypeRequest

// 更新关联墙体
var t = HSCore.Util.Wall.getWallsAssociatedByWall(e);
t.push(e);
HSCore.Util.Wall.updateWallsFaces(t);

// 更新吊顶板
e.getUniqueParent().forEachCeilingSlab(function(e) {
    // 更新吊顶逻辑
});
```

### 6.2 墙体属性编辑

**插件依赖**:
```javascript
dependencies: [
    HSFPConstants.PluginType.ContextualTools,
    HSFPConstants.PluginType.LeftMenu,
    HSFPConstants.PluginType.RightMenu
]
```

**属性栏显示**:
- 墙体厚度
- 墙体高度
- 墙体材质
- 墙体类型（承重墙/非承重墙）

### 6.3 墙面装饰

**插件**: `dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/walldecorationhandler.js`

```javascript
// 墙面装饰处理器
WallDecorationHandler

// 关键插件引用
this.contextualToolsPlugin  // 上下文工具
this.catalogPlugin          // 素材目录
this.leftmenuPlugin         // 左侧菜单
this.RightPropertybarPlugin // 右侧属性栏
```

**功能包括**:
- 墙纸选择
- 踢脚线添加
- 腰线装饰
- 墙面材质

---

## 7. 墙面组件系统 🧱

### 7.1 墙面装配 (WallFaceAssembly)

**创建命令**: `dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/cmdcreatewallfaceassembly.js`

```javascript
// 创建墙面装配命令
CmdCreateWallFaceAssembly

// 进入立面模式
this._enterElevationMode();

// 左侧菜单控制
this._leftMenuPlugin.showLeftMenuBar({...});
this._leftMenuPlugin.hideLeftMenu();
```

**应用墙面装配**:
```javascript
// dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/cmdapplywallfaceassembly.js
CmdApplyWallFaceAssembly

// 迷你预览控件
this._miniImagePreviewCtrl.render(options)
```

### 7.2 立面编辑模式

**特点**:
- 切换到墙面正视图
- 显示墙面装配选项
- 隐藏无关实体
- 冻结其他墙体

**控制方法**:
```javascript
_enterElevationMode() {
    // 进入立面编辑模式
    // 隐藏其他实体
    // 