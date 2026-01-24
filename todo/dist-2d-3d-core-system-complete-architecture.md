# Homestyler 2D/3D核心系统完整架构分析

> **文档版本**: v2.0  
> **最后更新**: 2026-01-24  
> **分析范围**: dist/目录源码深度分析  
> **分析重点**: 2D/3D初始化、视图切换、操作系统、属性面板、参数化、模型加载、界面布局

---

## 📋 目录

1. [系统概览](#1-系统概览)
2. [2D/3D初始化系统](#2-2d3d初始化系统)
3. [视图切换系统](#3-视图切换系统)
4. [操作系统（移动/旋转/缩放）](#4-操作系统)
5. [属性激活与面板系统](#5-属性激活与面板系统)
6. [参数化调整系统](#6-参数化调整系统)
7. [模型加载与保存系统](#7-模型加载与保存系统)
8. [界面设计与布局系统](#8-界面设计与布局系统)
9. [核心发现与创新点](#9-核心发现与创新点)
10. [架构图表](#10-架构图表)

---

## 1. 系统概览

### 1.1 技术栈

```
前端引擎: Ali T3D.js (封装Three.js) + WebGL2
几何引擎: GeLib (几何计算库) + DRACO压缩
纹理压缩: BASIS Universal
原生加速: T3DNATIVE (WebAssembly)
UI框架: React + 自定义组件系统
状态管理: 命令模式 + 信号系统
```

### 1.2 核心模块结构

```
dist/
├── core-hs.fe5726b7.bundle/          # 核心引擎
│   ├── geometrymanager_2.js          # 几何管理器
│   ├── mixpaintupdaterv3.js          # 材质更新系统
│   └── ncustomizedplatform_io.js     # 定制平台IO
├── plugins-hs-*.bundle/              # 插件系统
│   ├── contentmovement.js            # 移动操作
│   ├── contentrotation.js            # 旋转操作
│   ├── resizecontent.js              # 缩放操作
│   ├── propertybarhandler.js         # 属性面板处理器
│   └── constrainthelper.js           # 约束辅助
└── app-hs.fe5726b7.bundle/           # 应用层
    ├── module_970561.js              # Bootloader启动器
    └── originalmetacreatortype.js    # 模型元数据创建器
```

---

## 2. 2D/3D初始化系统

### 2.1 Bootloader启动流程

**文件**: `dist/hs.fe5726b7.bundle_dewebpack/module_970561.js:729`

#### 12步初始化任务链

```javascript
// 启动任务序列
const bootloaderTasks = [
    // 1. 加载配置
    { name: "config", handler: loadConfig },
    
    // 2. 初始化Mtop（API通信层）
    { name: "initMtop", handler: initMtop },
    
    // 3. 加载3D默认资源
    { name: "3dDefaultResource", handler: load3DResources },
    
    // 4. 加载WebAssembly模块
    { name: "wasmModules", handler: loadWasmModules },
    
    // 5. 初始化T3D引擎
    { name: "t3dEngine", handler: initT3DEngine },
    
    // 6. 创建几何管理器
    { name: "geometryManager", handler: createGeometryManager },
    
    // 7. 初始化Canvas控制器
    { name: "canvasControllers", handler: initCanvasControllers },
    
    // 8. 加载场景数据
    { name: "sceneData", handler: loadSceneData },
    
    // 9. 初始化插件系统
    { name: "plugins", handler: initPlugins },
    
    // 10. 初始化UI层
    { name: "ui", handler: initUI },
    
    // 11. 加载用户数据
    { name: "userData", handler: loadUserData },
    
    // 12. 完成启动
    { name: "complete", handler: completeBootstrap }
];
```

### 2.2 WebAssembly模块加载

**关键模块**:

1. **BASIS纹理压缩** (Basis Universal)
   - 用途: GPU纹理压缩和解压
   - 格式: .basis → GPU原生格式
   - 性能: ~10倍压缩比，实时解压

2. **DRACO几何压缩** (Google Draco)
   - 用途: 3D网格压缩
   - 压缩: 顶点、法线、UV等数据
   - 性能: ~90%压缩率

3. **T3DNATIVE原生引擎**
   - 用途: 高性能几何计算
   - 加速: 射线检测、碰撞检测、空间查询

### 2.3 GeometryManager几何管理器

**文件**: `dist/core-hs.fe5726b7.bundle_dewebpack/geometrymanager_2.js:70-91`

```javascript
class GeometryManager {
    constructor(context) {
        // 1. 创建3D上下文
        this.context3D = context.create3DContext({
            antialias: true,
            preserveDrawingBuffer: false,
            powerPreference: "high-performance"
        });
        
        // 2. 初始化FGI场景 (Feature Geometry Instance)
        this.fgiScene = new FGIScene(this.context3D);
        
        // 3. 创建几何体缓存系统
        this.geometryCache = {
            entityId2GeomObject: new Map(),      // 实体→几何对象
            dirtyObjectMap: new Map(),           // 脏对象追踪
            wallCachedData: new Map(),           // 墙体缓存
            faceCachedData: new Map(),           // 面数据缓存
            customizedModelCacheMap: new Map()   // 定制模型缓存
        };
        
        // 4. 初始化高分辨率图形数据
        this.highResGraphicsData = null;
        
        // 5. 注册几何更新监听器
        this.registerGeometryUpdateListeners();
    }
    
    // 设置高分辨率图形数据
    setHighResolutionGraphicsData(data) {
        this.highResGraphicsData = data;
        this.updateAllGeometries();
    }
}
```

### 2.4 Canvas控制器初始化

**文件**: `dist/plugins-hs-205d0ccf.fe5726b7.bundle_dewebpack/module_727711.js:234-235`

```javascript
// 双Canvas控制器架构
class CanvasControllerManager {
    constructor() {
        // 2D平面视图控制器
        this.twoDCanvasController = new TwoDCanvasController({
            element: $('#canvas-2d'),
            handlers: {
                pan: this.handlePan,
                zoom: this.handleZoom,
                wheel: this.handleMouseWheel
            }
        });
        
        // 3D视图控制器
        this.threeDCanvasController = new ThreeDCanvasController({
            element: $('#canvas-3d'),
            context3D: geometryManager.context3D,
            handlers: {
                rotate: this.handleRotate,
                move: this.handleMove,
                domEvent: this.forwardDOMEvent
            }
        });
        
        // 初始状态：显示2D控制器
        this.twoDCanvasController.show();
        this.threeDCanvasController.hide();
    }
}
```

---

## 3. 视图切换系统

### 3.1 视图模式枚举

**文件**: `dist/plugins-hs-205d0ccf.fe5726b7.bundle_dewebpack/module_727711.js:227-236`

```javascript
// 6种视图模式
const ViewModeEnum = {
    Plane: 0,        // 平面视图（俯视图）
    RCP: 1,          // 天花板反射平面图 (Reflected Ceiling Plan)
    Elevation: 2,    // 立面视图
    OrbitView: 3,    // 轨道视图（3D自由旋转）
    FirstPerson: 4,  // 第一人称视图（漫游）
    OrthView: 5      // 正交视图（工程视图）
};
```

### 3.2 视图切换核心逻辑

**文件**: `dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/viewsetting.js:72,120,230`

```javascript
class ViewSwitcher {
    switchView(newMode) {
        const oldMode = this.currentMode;
        
        // 1. 切换Canvas控制器
        if (this.is2DMode(newMode)) {
            this.threeDCanvasController.hide();
            this.twoDCanvasController.show();
        } else {
            this.twoDCanvasController.hide();
            this.threeDCanvasController.show();
        }
        
        // 2. 更新相机
        this.updateCamera(newMode);
        
        // 3. 更新渲染层
        this.updateRenderLayers(newMode);
        
        // 4. 触发视图变更事件
        this.app.signalViewChanged.dispatch({
            from: oldMode,
            to: newMode
        });
        
        // 5. 刷新UI
        this.refreshUI(newMode);
    }
    
    is2DMode(mode) {
        return mode === ViewModeEnum.Plane || 
               mode === ViewModeEnum.RCP;
    }
}
```

### 3.3 快捷键映射

**文件**: `dist/plugins-hs-73381696.fe5726b7.bundle_dewebpack/module_635483.js:54`

```javascript
// 视图切换快捷键
const viewShortcuts = {
    '1': ViewModeEnum.Plane,       // 平面视图
    '2': ViewModeEnum.RCP,         // 天花视图
    '3': ViewModeEnum.OrbitView,   // 轨道视图
    '4': ViewModeEnum.FirstPerson, // 第一人称
    '5': ViewModeEnum.Elevation    // 立面视图
};

// 快捷键监听器
document.addEventListener('keydown', (e) => {
    if (viewShortcuts[e.key]) {
        viewSwitcher.switchView(viewShortcuts[e.key]);
    }
});
```

### 3.4 自动视图切换触发器

**文件**: `dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/handler_5.js:88,99,157,163`

```javascript
// 自动触发视图切换的场景
const autoViewSwitchTriggers = {
    // 触发3D视图
    onMaterialBrushActivate() {
        // 材质刷工具激活 → 自动切换到3D
        viewSwitcher.switchView(ViewModeEnum.OrbitView);
    },
    
    onRenderStart() {
        // 渲染开始 → 自动切换到第一人称
        viewSwitcher.switchView(ViewModeEnum.FirstPerson);
    },
    
    // 触发2D视图
    onCADGenerationStart() {
        // CAD生成开始 → 自动切换到平面视图
        viewSwitcher.switchView(ViewModeEnum.Plane);
    },
    
    onWallDrawingStart() {
        // 绘制墙体 → 自动切换到平面视图
        viewSwitcher.switchView(ViewModeEnum.Plane);
    }
};
```

---

## 4. 操作系统

### 4.1 ContentMovement - 移动操作

**文件**: `dist/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/contentmovement.js:49-414`

#### 核心类结构

```javascript
class ContentMovement extends HSApp.View.T3d.Gizmo {
    constructor(context, layer, content, rotation, boundingLength, 
                controller, activeType, activeContext) {
        super(context, layer, content, controller);
        
        // 移动方向向量
        this.frontDirectionVector = { x: 0, y: 1, z: 0 };
        
        // 内容引用
        this.content = content;
        this.rotation = rotation;
        this.activeType = activeType;  // 'left', 'right', 'near', 'far'
        this.activeContext = activeContext;
        
        // Gizmo缩放参数
        this.contentBoundingLength = boundingLength;
        this.scaleX = Constants.CONTENT_ROTATION_INDICATOR_SIZE * boundingLength / 3;
        this.scaleY = Constants.CONTENT_ROTATION_INDICATOR_SIZE * boundingLength / 2;
        
        // 初始化移动手柄Gizmo
        this._initMesh(context);
        
        // 监听事件
        this.signalHook.listen(this.content.signalFieldChanged, 
                               this._onContentFieldChange);
        this.signalHook.listen(HSApp.App.getApp().cmdManager.signalCommandTerminated, 
                               this._onContentFieldChange);
    }
    
    // 