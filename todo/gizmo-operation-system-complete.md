# Homestyler Gizmo操作系统完整架构

## 🎯 核心概述

Homestyler的Gizmo系统是一个**统一的3D交互操作框架**，负责处理所有模型的：
- ✅ **移动 (Move)** - 平面移动、垂直升降
- ✅ **旋转 (Rotate)** - 三轴旋转控制
- ✅ **缩放 (Scale)** - 三维尺寸调整
- ✅ **可视化辅助** - 坐标轴、边界框、尺寸标注

---

## 📁 源码证据

### 1️⃣ **GizmoSelectionType - 操作类型枚举**

**文件**: [`wfaselection.js:60-64`](dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/wfaselection.js:60)

```javascript
var l = d.HSApp.View.GizmoSelectionType,
    s = l.Scale,      // 缩放
    c = l.Rotate,     // 旋转
    u = l.Move,       // 移动
    g = l.Reset;      // 重置
```

**支持的操作类型**：
- `Scale` - 缩放操作
- `Rotate` - 旋转操作  
- `Move` - 移动操作
- `Select` - 选择操作
- `Reset` - 重置状态
- `RotateAndMove` - 旋转+移动组合

---

### 2️⃣ **Gizmo组件架构**

#### A. 缩放Gizmo (ScaleGizmo)

**文件**: [`module_209886.js:114-117`](dist/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/module_209886.js:114)

```javascript
key: "_addScaleGizmo",
value: function(e, t, n) {
    this.addChildGizmo(new m.ResizeContent(e, t, n))
}
```

**功能**：
- 显示8个角点控制手柄
- 支持等比缩放和自由缩放
- 实时更新模型尺寸

---

#### B. 旋转Gizmo (RotateGizmo)

**文件**: [`module_209886.js:121-132`](dist/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/module_209886.js:121)

```javascript
key: "_addRotateGizmo",
value: function(e, t, n, i) {
    var o = this;
    i = i || new c.ActiveContext;
    var a = Math.max(n.XSize, n.YSize, n.ZSize),
        r = Math.min(Math.max(1, a), 1);
    // 三个旋转环
    [c.ActiveType.xy, c.ActiveType.xz, c.ActiveType.yz].forEach((function(a) {
        o.addChildGizmo(new u.ContentRotation(e, t, n, r, void 0, a, i))
    }))
}
```

**三轴旋转环**：
- `xy` - 绕Z轴旋转（水平旋转）
- `xz` - 绕Y轴旋转（俯仰旋转）
- `yz` - 绕X轴旋转（侧倾旋转）

**快捷键**：
- `Space` - 旋转45度
- `Alt+R` - 切换旋转/缩放模式

---

#### C. 移动Gizmo (MoveGizmo)

**文件**: [`module_209886.js:135-146`](dist/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/module_209886.js:135)

```javascript
key: "_addMoveGizmo",
value: function(e, t, n, i) {
    var o = this;
    i = i || new c.ActiveContext;
    var a = Math.max(n.XSize, n.YSize, n.ZSize),
        r = Math.min(Math.max(1, a), 1);
    
    // 垂直升降箭头
    this.addChildGizmo(new c.ContentLift(e, t, n, n.ZLength, r, void 0, c.ActiveType.top, i));
    
    // 四个方向移动箭头
    [0, .5 * Math.PI, Math.PI, -.5 * Math.PI].forEach((function(e) {
        // near(0°), left(180°), far(90°), right(270°)
    }))
}
```

**移动方向**：
- `top` - 垂直升降
- `near/far/left/right` - 四个水平方向

---

#### D. 坐标轴Gizmo

**文件**: [`module_209886.js:149-153`](dist/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/module_209886.js:149)

```javascript
key: "_addCoordinateAxisGizmo",
value: function(e, t, n, i) {
    i = i || new c.ActiveContext;
    this.addChildGizmo(new g.CoordinateAxis(this.context, t, n, i))
}
```

**功能**：
- 显示XYZ坐标轴
- 可交互拖拽沿轴移动
- 辅助空间定位

---

#### E. 边界框Gizmo

**文件**: [`module_209886.js:107-111`](dist/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/module_209886.js:107)

```javascript
key: "_addBoundingBox",
value: function(e, t, n) {
    this.addChildGizmo(new y.ContentBox(e, t, n))
}
```

**功能**：
- 显示模型包围盒
- 高亮选中状态
- 碰撞检测辅助

---

### 3️⃣ **Gizmo管理器 (GizmoManager)**

**文件**: [`wfaselection.js:59`](dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/wfaselection.js:59)

```javascript
var r = e.hscanvas.gizmoManager.getSelectionType() || 0;
```

**核心功能**：
- `getSelectionType()` - 获取当前操作类型
- `setSelectionType(type)` - 设置操作类型
- `addGizmo(gizmo)` - 添加Gizmo组件
- `removeGizmo(gizmo)` - 移除Gizmo组件
- `getTypeGizmo(type)` - 获取特定类型的Gizmo

---

### 4️⃣ **动态Gizmo组合逻辑**

**文件**: [`wfaselection.js:71-74`](dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/wfaselection.js:71)

```javascript
h(s) && !h(g) && i && o._addScaleGizmo(e, n, i, m, f),      // 缩放模式
h(u | g) && o._addMoveGizmo(e, n, i, m, f),                 // 移动模式
(h(c | g) || h(u | g)) && o._addCoordinateAxisGizmo(e, n, i, m, f),  // 坐标轴
o._addBoundingBox(e, n, i, m, f),                           // 边界框
```

**组合策略**：
- **仅缩放**：显示缩放手柄 + 边界框
- **仅移动**：显示移动箭头 + 坐标轴 + 边界框
- **旋转+移动**：显示旋转环 + 移动箭头 + 坐标轴 + 边界框
- **重置状态**：显示全部操作手柄

---

### 5️⃣ **快捷键系统**

**文件**: [`module_209886.js:180-188`](dist/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/module_209886.js:180)

```javascript
key: "_registerHotkey",
value: function() {
    HSApp.App.getApp().hotkey.registerHotkey("space", this.onRotate45Deg, {
        description: "旋转模型",
        group: HSFPConstants.LogGroupTypes.ContentOperation
    })
}
```

**快捷键列表**：
- `Space` - 旋转45度
- `Alt+R` - 切换缩放/旋转模式
- `Backspace` - 删除选中对象（在墙体编辑时禁用）

---

### 6️⃣ **旋转45度实现**

**文件**: [`module_209886.js:198-207`](dist/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/module_209886.js:198)

```javascript
key: "onRotate45Deg",
value: function() {
    var e = this.app.cmdManager,
        t = e.createCommand(HSFPConstants.CommandType.RotateContent, [this.content, "xy", !1]);
    e.execute(t);
    e.receive("hotkey", { delta: 45 });
    e.receive("hotkeyend");
    e.complete()
}
```

**流程**：
1. 创建旋转命令 (`RotateContent`)
2. 指定旋转平面 (`xy` - 水平旋转)
3. 传递旋转角度 (`delta: 45`)
4. 完成并记录到历史

---

## 🏗️ Gizmo系统架构图

```
┌─────────────────────────────────────────────────────────────┐
│                    GizmoManager                              │
│  (管理所有Gizmo的生命周期和交互)                              │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐│
│  │  ScaleGizmo    │  │  RotateGizmo   │  │  MoveGizmo     ││
│  │  (缩放手柄)    │  │  (旋转环)      │  │  (移动箭头)    ││
│  ├────────────────┤  ├────────────────┤  ├────────────────┤│
│  │ 8个角点控制    │  │ XY/XZ/YZ 三轴  │  │ 4方向+垂直     ││
│  │ 实时尺寸更新   │  │ Space 快捷键   │  │ 吸附对齐       ││
│  │ 等比/自由缩放  │  │ 45度增量旋转   │  │ 碰撞检测       ││
│  └────────────────┘  └────────────────┘  └────────────────┘│
│                                                               │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐│
│  │ CoordinateAxis │  │  BoundingBox   │  │  Dimension     ││
│  │  (坐标轴)      │  │  (边界框)      │  │  (尺寸标注)    ││
│  ├────────────────┤  ├────────────────┤  ├────────────────┤│
│  │ XYZ轴可拖拽    │  │ 选中高亮       │  │ 实时测量       ││
│  │ 辅助定位       │  │ 视觉反馈       │  │ 精确数值       ││
│  └────────────────┘  └────────────────┘  └────────────────┘│
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                     ActiveContext                            │
│  (激活状态管理，处理Gizmo显示/隐藏逻辑)                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 操作流程

### 1. 选中模型触发Gizmo

```javascript
// 用户点击模型
app.selectionManager.select(content)
  ↓
// 系统检查GizmoSelectionType
gizmoManager.getSelectionType()
  ↓
// 根据类型创建对应Gizmo
_addScaleGizmo() / _addRotateGizmo() / _addMoveGizmo()
  ↓
// 渲染到3D场景
gizmoManager.addGizmo(gizmo)
```

### 2. 用户拖拽操作

```javascript
// 检测鼠标在Gizmo上
gizmo.onMouseDown(event)
  ↓
// 创建TransformCommand
cmdManager.createCommand(CommandType.Move/Rotate/Scale)
  ↓
// 持续更新
cmdManager.receive("mousemove", { delta })
  ↓
// 完成操作
cmdManager.complete()
  ↓
// 记录到历史栈
transManager.commit()
```

### 3. 模式切换 (Alt+R)

```javascript
// 用户按下Alt+R
hotkey.trigger("alt+r")
  ↓
// 检查当前类型
currentType = gizmoManager.getSelectionType()
  ↓
// 切换
if (currentType & Scale)
    setSelectionType(RotateAndMove)
else
    setSelectionType(Scale)
  ↓
// 重建Gizmo
destroyOldGizmos() + createNewGizmos()
```

---

## 🎨 视觉反馈

### 缩放手柄颜色
- **正常**: 白色半透明
- **悬停**: 黄色高亮
- **拖拽**: 橙色激活

### 旋转环颜色
- **XY平面**: 蓝色
- **XZ平面**: 绿色
- **YZ平面**: 红色

### 移动箭头颜色
- 