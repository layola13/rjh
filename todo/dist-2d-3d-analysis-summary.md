# Homestyler 2D/3D核心系统分析总结

> **分析完成时间**: 2026-01-24  
> **源码范围**: dist/目录完整源码  
> **文档结构**: 主文档 + 2个续篇（part2, part3）

---

## 📊 分析成果概览

### ✅ 已完成的7大核心分析

1. ✅ **2D/3D初始化系统** - Bootloader 12步启动流程 + WebAssembly模块加载
2. ✅ **视图切换系统** - 6种视图模式 + 快捷键映射 + 自动切换触发器
3. ✅ **操作系统** - ContentMovement/ContentRotation/ResizeContent三大操作类
4. ✅ **属性激活与面板** - PropertyBar层级结构 + 动态刷新机制
5. ✅ **参数化调整** - 滑块输入 + 实时更新 + 约束验证
6. ✅ **模型加载与保存** - NWTK.api.catalog API + seekId模型标识系统
7. ✅ **界面设计与布局** - 工具栏/菜单/属性面板/状态栏组件系统

---

## 🎯 核心技术发现

### 1. 渲染引擎架构

```
T3D.js (Ali自研)
  ↓
Three.js (封装层)
  ↓
WebGL2 (底层渲染)
  ↓
GPU硬件加速
```

**关键优化**:
- BASIS Universal纹理压缩（~10倍压缩比）
- DRACO几何压缩（~90%压缩率）
- T3DNATIVE WebAssembly加速（高性能计算）

### 2. 双Canvas控制器架构

```javascript
// 分离的2D和3D控制器
twoDCanvasController  → 平面视图（Plane/RCP）
  - 平移(pan)
  - 缩放(zoom)
  - 鼠标滚轮

threeDCanvasController → 3D视图（OrbitView/FirstPerson/Elevation）
  - 旋转(rotate)
  - 移动(move)
  - DOM事件转发
```

**切换逻辑**:
- 2D视图 → hide(3D) + show(2D)
- 3D视图 → hide(2D) + show(3D)
- 快捷键: 1-5键直接切换视图

### 3. Gizmo操作系统

**三大操作类**:

| 操作类 | 功能 | Gizmo类型 | 文件位置 |
|-------|------|----------|---------|
| ContentMovement | 移动 | SVG箭头手柄 | contentmovement.js:49-414 |
| ContentRotation | 旋转 | SVG圆环手柄 | contentrotation.js:57-469 |
| ResizeContent | 缩放 | FuzzyGizmo箱形+箭头 | resizecontent.js:222-632 |

**共同特征**:
- 继承自`HSApp.View.T3d.Gizmo`基类
- 支持拖拽操作（ondragstart/ondragmove/ondragend）
- 实时视觉反馈（颜色/透明度变化）
- 约束系统（房间约束/吸附/碰撞检测）

### 4. 属性面板系统

**层级结构**:
```
PropertyBar (根)
  ├─ FirstLevelNode (一级节点：参数设置/样式设置)
  │   ├─ SecondLevelNode (二级节点：基础属性/基础样式)
  │   │   ├─ ThirdLevelNode (三级节点：尺寸设置/材质)
  │   │   │   ├─ LengthInput (长度输入控件)
  │   │   │   ├─ SliderInput (滑块控件)
  │   │   │   ├─ ImageButton (图片按钮)
  │   │   │   └─ ... (其他控件)
```

**刷新机制**:
```javascript
// 信号驱动刷新
app.signalPropertyBarRefresh.dispatch()
  ↓
propertyBarPlugin.update()
  ↓
signalPopulatePropertyBar.dispatch({ entities, items })
  ↓
各插件填充items
  ↓
render(items) → 渲染UI
```

### 5. 命令模式架构

**核心类**:
```javascript
class CommandManager {
    // 创建命令
    createCommand(type, args) {
        return CommandFactory.create(type, args);
    }
    
    // 执行命令
    execute(cmd) {
        cmd.execute();
        this.history.push(cmd);
    }
    
    // 接收事件
    receive(event, data) {
        this.current.receive(event, data);
    }
    
    // 完成命令
    complete(cmd) {
        cmd.complete();
        this.signalCommandTerminated.dispatch({ cmd });
    }
    
    // 撤销/重做
    undo() { this.history.undo(); }
    redo() { this.history.redo(); }
}
```

**命令类型**:
- `MoveContent` - 移动内容
- `RotateContent` - 旋转内容
- `Resize3DContent` - 缩放3D内容
- `ChangeParametricModelParameters` - 修改参数化模型参数
- `ChangeMaterialData` - 修改材质数据

### 6. 模型加载系统

**API架构**:
```javascript
NWTK.api.catalog = {
    // 通过ID获取产品
    getProductById(id) → Promise<Product>,
    
    // 批量获取产品
    getProductsByIds(ids) → Promise<Product[]>,
    
    // 获取定制产品
    getCustomizedProduct(id) → Promise<CustomizedProduct>,
    
    // 获取分类树
    getCategoryTree(category) → Promise<Tree>,
    
    // 获取产品变体
    getProductVariation(id) → Promise<Variation>,
    
    // 获取默认产品
    getDefaultProducts() → Promise<Product[]>,
    
    // 获取属性
    getAttributes() → Promise<Attributes>
};
```

**模型标识系统**:
- `seekId` - 模型唯一标识符
- `jid` - 家具/产品ID
- `metadata` - 模型元数据（尺寸/材质/参数等）

### 7. 几何缓存系统

**多层次缓存**:
```javascript
geometryCache = {
    // 实体映射
    entityId2GeomObject: Map<EntityID, GeomObject>,
    
    // 脏对象追踪
    dirtyObjectMap: Map<EntityID, DirtyFlag>,
    
    // 专用缓存
    wallCachedData: Map<WallID, WallData>,
    faceCachedData: Map<FaceID, FaceData>,
    customizedModelCacheMap: Map<ModelID, ModelData>,
    
    // 高分辨率图形数据
    highResolutionGraphicsData: HighResData
};
```

**更新策略**:
- 懒更新：标记为dirty，等待下一帧更新
- 批量更新：收集所有dirty对象，一次性更新
- 增量更新：只更新变化的部分

---

## 🔍 额外发现的重要功能

### 1. 单房间模式 (Single Room Mode)
- 用途：专注单个房间设计
- 触发：特定场景下自动启用
- 效果：隐藏其他房间，性能优化

### 2. FGI场景系统 (Feature Geometry Instance)
- 用途：实例化渲染优化
- 原理：共享几何体，减少内存占用
- 应用：大量重复模型（如瓷砖、灯具）

### 3. Paint Service材质服务
- 功能：材质刷工具
- 特性：一键应用材质到多个面
- 实现：材质数据共享 + 批量更新

### 4. Constraint Helper约束辅助系统
- 功能：智能吸附和对齐
- 约束类型：
  - 房间约束（constraintInRoom）
  - 墙面吸附
  - 网格吸附
  - 角度吸附（45°/90°）

### 5. 正交模式 (Ortho Mode)
- 功能：强制水平/垂直绘制
- 快捷键：动态切换
- 应用：精确CAD绘图

---

## 📁 关键文件索引

### 核心引擎
- `dist/hs.fe5726b7.bundle_dewebpack/module_970561.js:729` - Bootloader启动器
- `dist/core-hs.fe5726b7.bundle_dewebpack/geometrymanager_2.js:70-91` - 几何管理器
- `dist/core-hs.fe5726b7.bundle_dewebpack/mixpaintupdaterv3.js` - 材质更新系统

### 视图系统
- `dist/plugins-hs-205d0ccf.fe5726b7.bundle_dewebpack/module_727711.js:227-236` - 视图切换
- `dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/viewsetting.js` - 视图设置
- `dist/plugins-hs-73381696.fe5726b7.bundle_dewebpack/module_635483.js:54` - 快捷键映射

### 操作系统
- `dist/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/contentmovement.js` - 移动操作
- `dist/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/contentrotation.js` - 旋转操作
- `dist/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/resizecontent.js` - 缩放操作

### UI系统
- `dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/propertybarhandler.js` - 属性面板处理器
- `dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/module_277017.js` - 属性栏控件
- `dist/app-hs.fe5726b7.bundle_dewebpack/module_3901.js` - 应用设置

### 模型系统
- `dist/app-hs.fe5726b7.bundle_dewebpack/originalmetacreatortype.js` - 模型元数据创建器
- `dist/core-hs.fe5726b7.bundle_dewebpack/ncustomizedplatform_io.js` - 定制平台IO

---

## 🎨 架构设计模式

### 1. 插件架构模式
```
PluginManager
  ├─ Core Plugins (核心插件)
  │   ├─ Catalog (目录)
  │   ├─ PropertyBar (属性栏)
  │   ├─ ContextualTools (上下文工具)
  │   └─ ContentManipulation (内容操作)
  └─ Extension Plugins (扩展插件)
      ├─ WallMolding (墙面装饰)
      ├─ Window (窗户)
      ├─ CustomizedFurniture (定制家具)
      └─ ...
```

### 2. 信号-槽模式
```javascript
// 发布者
class Entity {
    