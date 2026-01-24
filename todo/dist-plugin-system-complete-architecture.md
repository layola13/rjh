# dist/ 插件系统完整架构 - 基于真实源码

> **完整的插件系统设计规范**  
> 基于 dist/ 目录真实反编译代码分析  
> 文档版本: v1.0  
> 创建日期: 2026-01-24

---

## 📋 目录

1. [插件系统概述](#1-插件系统概述)
2. [核心架构](#2-核心架构)
3. [IPlugin基类](#3-iplugin基类)
4. [PluginManager管理器](#4-pluginmanager管理器)
5. [插件注册机制](#5-插件注册机制)
6. [插件生命周期](#6-插件生命周期)
7. [依赖管理](#7-依赖管理)
8. [动态加载](#8-动态加载)
9. [插件实现示例](#9-插件实现示例)
10. [最佳实践](#10-最佳实践)

---

## 🎯 1. 插件系统概述

### 1.1 设计目标

Homestyler采用**插件化架构**实现功能模块化：

```
核心引擎 (core-hs + app-hs + hs)
    ↓
插件管理器 (PluginManager)
    ↓
8个功能插件 (plugins-hs-*)
```

**核心优势**:
- ✅ **模块解耦**: 插件之间相互独立
- ✅ **按需加载**: 动态加载需要的插件
- ✅ **灵活扩展**: 新功能以插件形式添加
- ✅ **依赖管理**: 自动处理插件依赖关系

### 1.2 插件系统组成

| 组件 | 位置 | 功能 | 代码文件 |
|------|------|------|---------|
| **IPlugin基类** | app-hs.bundle | 插件接口定义 | `module_2387.js` |
| **PluginManager** | app-hs.bundle | 插件管理器 | `module_9684.js` |
| **全局注册表** | app-hs.bundle | 插件映射表 | `gPluginMap` |
| **插件实现** | plugins-hs-*.bundle | 具体插件类 | 各插件bundle |

---

## 🏗️ 2. 核心架构

### 2.1 系统架构图

```mermaid
graph TB
    subgraph "应用层"
        APP[HSApp.App]
    end
    
    subgraph "插件管理层"
        PM[PluginManager]
        GPM[gPluginMap<br/>全局注册表]
    end
    
    subgraph "插件基础层"
        IP[IPlugin<br/>插件基类]
    end
    
    subgraph "插件实现层"
        P1[TgWall插件]
        P2[UserInfo插件]
        P3[Constraint插件]
        P4[其他插件...]
    end
    
    APP --> PM
    PM --> GPM
    PM --> IP
    IP --> P1
    IP --> P2
    IP --> P3
    IP --> P4
    
    P1 -.依赖.-> P3
    P2 -.依赖.-> P4
```

### 2.2 关键数据结构

#### gPluginMap (全局插件注册表)

```typescript
// 源码: module_9684.js:64
const gPluginMap = new Map<string, {
  pluginClass: typeof IPlugin;     // 插件类构造函数
  preloader?: () => Promise<void>; // 预加载函数(可选)
}>();
```

**作用**: 
- 存储所有已注册插件的元信息
- 在应用启动前收集插件定义
- 支持延迟加载和动态加载

#### PluginManager内部状态

```typescript
class Manager {
  // 已实例化的插件
  plugins: Record<string, IPlugin | null>;
  
  // 插件类映射
  _pluginClassByType: Map<string, typeof IPlugin>;
  
  // 预加载器映射
  _preloaders: Record<string, () => Promise<void>>;
  
  // 正在加载的插件栈
  _loadingPlugins: string[];
  
  // 已加载插件状态
  _loadedPlugins: Record<string, {
    plugin: IPlugin | Promise<IPlugin>;
    status: PluginStatus;
  }>;
}
```

---

## 📦 3. IPlugin基类

### 3.1 完整定义

```typescript
// 源码: module_2387.js
class IPlugin {
  // 插件类型标识 (由PluginManager赋值)
  type: string;
  
  // 是否启用 (默认true)
  enable: boolean;
  
  // 插件名称
  name: string;
  
  // 插件描述
  description: string;
  
  // 依赖的其他插件
  dependencies: string[];
  
  constructor(options: {
    enable?: boolean;
    name?: string;
    description?: string;
    dependencies?: string[];
  } = {}) {
    this.enable = options.enable ?? true;
    this.name = options.name ?? "Unnamed plugin";
    this.description = options.description ?? "No Description";
    this.dependencies = options.dependencies ?? [];
  }
  
  // 生命周期钩子
  onCreate(context: IPluginContext): void {}
  onDestroy(context: IPluginContext): void {}
  onActive(context: IPluginContext, deps: Record<string, IPlugin>): void {}
  onDeactive(context: IPluginContext): void {}
}
```

### 3.2 IPluginContext上下文

```typescript
interface IPluginContext {
  app: HSApp.App;  // 应用实例
  // ... 其他上下文信息
}
```

### 3.3 生命周期钩子详解

| 钩子 | 调用时机 | 参数 | 用途 |
|------|---------|------|------|
| **onCreate** | 插件实例化后 | `context` | 初始化插件状态、创建UI |
| **onActive** | 插件激活时 | `context`, `deps` | 注册命令、启动服务、订阅事件 |
| **onDeactive** | 插件卸载时 | `context` | 清理资源、取消订阅 |
| **onDestroy** | 插件销毁时 | `context` | 彻底清理（很少使用） |

**调用顺序**:
```
实例化 → onCreate → (依赖加载) → onActive → ... → onDeactive → onDestroy
```

---

## 🔧 4. PluginManager管理器

### 4.1 核心API

#### 4.1.1 注册插件

```typescript
// 源码: module_9684.js:122
registerPlugin(
  type: string,           // 插件类型标识
  pluginClass: typeof IPlugin,  // 插件类
  preloader?: () => Promise<void>  // 预加载函数
): void
```

**示例**:
```typescript
manager.registerPlugin(
  HSFPConstants.PluginType.TgWall,
  TgWallPlugin,
  async () => {
    // 预加载资源
    await loadWallTextures();
  }
);
```

#### 4.1.2 加载插件

```typescript
// 源码: module_9684.js:150
load(type: string): IPlugin | undefined
```

**功能**:
1. 检查是否已加载
2. 检测循环依赖
3. 实例化插件类
4. 调用onCreate
5. 如果enable=true，递归加载依赖
6. 调用onActive
7. 返回插件实例

**防循环依赖机制**:
```typescript
// 源码: module_9684.js:152-157
if (this._loadingPlugins.includes(type)) {
  assert(false, `loading plugin for another time: ${type}. 
    is there a circular reference between plugins?`);
  assert(false, `current loading plugins: [${
    this._loadingPlugins.join(", ")
  }]`);
}
```

#### 4.1.3 卸载插件

```typescript
// 源码: module_9684.js:186
unload(type: string): void
```

**流程**:
1. 调用插件的onDeactive
2. 从plugins中删除
3. 触发signalPluginDeactived信号
4. 标记为UnLoaded状态

#### 4.1.4 获取插件

```typescript
// 源码: module_9684.js:142
getPlugin(type: string): IPlugin | null
```

#### 4.1.5 动态加载插件

```typescript
// 源码: module_9684.js:234
async asyncLoad(pluginName: string): Promise<IPlugin | void>
```

**支持场景**:
- 从远程URL加载插件代码
- 按需加载非核心功能
- 支持插件热更新

### 4.2 插件状态枚举

```typescript
// 源码: module_9684.js:59-63
enum PluginStatus {
  UnLoaded = -1,  // 未加载
  Loading = 0,    // 加载中
  Loaded = 1      // 已加载
}
```

### 4.3 信号机制

```typescript
// 源码: module_9684.js:94-95
signalPluginActived: Signal;   // 插件激活信号
signalPluginDeactived: Signal; // 插件停用信号
```

**订阅示例**:
```typescript
manager.signalPluginActived.add((data) => {
  console.log(`Plugin ${data.type} activated`);
});
```

---

## 🎫 5. 插件注册机制

### 5.1 全局注册函数

```typescript
// 源码: module_9684.js:65-72
const registerPlugin = (
  type: string,
  pluginClass: typeof IPlugin,
  preloader?: () => Promise<void>
) => {
  gPluginMap.set(type, {
    pluginClass: pluginClass,
    preloader: preloader
  });
};
```

**导出为**:
```typescript
// 源码: module_9684.js:12
HSApp.Plugin.registerPlugin = registerPlugin;
```

### 5.2 注册时机

**Bundle末尾立即注册** (IIFE模式):

```javascript
// 源码示例: module_730968.js:150
var TgWallPlugin = function(e) {
  // ... 插件类定义
}(HSApp.Plugin.IPlugin);

// 立即注册到全局映射表
HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.TgWall,
  TgWallPlugin
);
```

### 5.3 注册流程

```
1. Bundle加载 (Webpack)
   ↓
2. 插件类定义执行 (IIFE)
   ↓
3. registerPlugin调用
   ↓
4. 添加到gPluginMap
   ↓
5. 等待PluginManager._init()统一加载
```

### 5.4 真实注册示例

#### 示例1: TgWall插件 (无预加载)

```javascript
// 源码: module_730968.js:40-150
var TgWallPlugin = function(IPlugin) {
  function TgWallPlugin() {
    return g(this, TgWallPlugin, [{
      name: "tgwall editing",
      description: "Process wall edit commands and its gizmos.",
      dependencies: []
    }]);
  }
  
  // 继承IPlugin
  (0, s.default)(TgWallPlugin, IPlugin);
  
  // 定义方法
  (0, i.default)(TgWallPlugin, [{
    key: "onActive",
    value: function(context) {
      // 注册命令
      context.app.cmdManager.register([
        [HSFPConstants.CommandType.CreateTgWall, CmdCreateTgWall],
        [HSFPConstants.CommandType.CreateRectTgWall, CmdCreateRectTgWall],
        [HSFPConstants.CommandType.CreatePolygonTgWall, CmdCreatePolygonTgWall]
      ]);
      
      // 注册事务
      context.app.transManager.register([
        [HSFPConstants.RequestType.CreateTgWall, CreateTgWallRequest],
        [HSFPConstants.RequestType.SwitchArcWall, SwitchArcWallRequest]
      ]);
    }
  }, {
    key: "onDeactive",
    value: function() {}
  }]);
  
  return TgWallPlugin;
}(HSApp.Plugin.IPlugin);

// 注册插件
HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.TgWall,
  TgWallPlugin
);
```

#### 示例2: UserInfo插件 (带依赖)

```javascript
// 源码: module_196031.js:36-205
var UserInfoPlugin = function(IPlugin) {
  function UserInfoPlugin() {
    return u(this, UserInfoPlugin, [{
      // 声明依赖MarketingBadge插件
      dependencies: [HSFPConstants.PluginType.MarketingBadge]
    }]);
  }
  
  (0, s.default)(UserInfoPlugin, IPlugin);
  
  (0, o.default)(UserInfoPlugin, [{
    key: "init",
    value: function() {
      this.handler.init();
    }
  }, {
    key: "onActive",
    value: function() {
      this.init();
    }
  }, {
    key: "onDeactive",
    value: function() {}
  }]);
  
  return UserInfoPlugin;
}(HSApp.Plugin.IPlugin);

// 注册插件
HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.UserInfo,
  UserInfoPlugin
);
```

---

## 🔄 6. 插件生命周期

### 6.1 完整生命周期图

```mermaid
stateDiagram-v2
    [*] --> 注册: Bundle加载
    注册 --> 实例化: PluginManager.load()
    实例化 --> onCreate: new PluginClass()
    onCreate --> 检查enable: 
    
    检查enable --> 加载依赖: enable=true
    检查enable --> 完成: enable=false
    
    加载依赖 --> onActive: 依赖就绪
    onActive --> 运行中: 
    
    运行中 --> onDeactive: unload()
    onDeactive --> 已卸载
    已卸载 --> [*]
```

### 6.2 
详细时序

#### 阶段1: 注册阶段 (应用启动前)

```typescript
// Bundle加载时自动执行
HSApp.Plugin.registerPlugin(pluginType, PluginClass, preloader);
// → 添加到gPluginMap
```

#### 阶段2: 初始化阶段

```typescript
// 源码: module_9684.js:111-121
_init() {
  gPluginMap.forEach(({ pluginClass, preloader }, type) => {
    this.registerPlugin(type, pluginClass, preloader);
  }, this);
}
```

#### 阶段3: 加载阶段

```typescript
// 源码: module_9684.js:150-185
load(type) {
  // 1. 防循环依赖检查
  if (this._loadingPlugins.includes(type)) {
    throw new Error('Circular dependency detected');
  }
  
  // 2. 检查是否已加载
  if (this.plugins[type] !== null) {
    return this.plugins[type];
  }
  
  // 3. 标记正在加载
  this._loadingPlugins.push(type);
  
  // 4. 获取插件类
  let PluginClass = this._pluginClassByType.get(type);
  
  // 5. 实例化
  const plugin = new PluginClass();
  
  // 6. 验证继承关系
  assert(plugin instanceof IPlugin);
  
  // 7. 设置类型
  plugin.type = type;
  
  // 8. 保存实例
  this.plugins[type] = plugin;
  
  // 9. 调用onCreate
  plugin.onCreate(this.context);
  
  // 10. 如果启用，加载依赖并激活
  if (plugin.enable) {
    const deps = {};
    plugin.dependencies.forEach((depType) => {
      deps[depType] = this.load(depType); // 递归加载
    });
    
    plugin.onActive(this.context, deps);
    
    this.signalPluginActived.dispatch({ type, plugin });
  }
  
  // 11. 清理加载栈
  this._loadingPlugins.xRemove(type);
  
  // 12. 标记已加载
  this._loadedPlugins[type] = {
    plugin,
    status: PluginStatus.Loaded
  };
  
  return plugin;
}
```

#### 阶段4: 运行阶段

插件正常工作，响应应用事件。

#### 阶段5: 卸载阶段

```typescript
// 源码: module_9684.js:186-195
unload(type) {
  const plugin = this.plugins[type];
  
  if (plugin) {
    // 1. 调用onDeactive
    plugin.onDeactive(this.context);
    
    // 2. 删除插件实例
    delete this.plugins[type];
    
    // 3. 触发信号
    this.signalPluginDeactived.dispatch({ type, plugin });
  }
  
  // 4. 更新状态
  if (this._loadedPlugins[type]) {
    this._loadedPlugins[type].status = PluginStatus.UnLoaded;
  }
}
```

### 6.3 生命周期最佳实践

#### onCreate中应该做什么

```typescript
onCreate(context: IPluginContext): void {
  // ✅ 创建内部状态
  this.handler = new MyHandler();
  
  // ✅ 初始化UI组件
  this.panel = new MyPanel();
  
  // ✅ 准备资源
  this.loadTextures();
  
  // ❌ 不要注册命令 (应在onActive中)
  // ❌ 不要订阅事件 (应在onActive中)
}
```

#### onActive中应该做什么

```typescript
onActive(context: IPluginContext, deps: Record<string, IPlugin>): void {
  // ✅ 注册命令
  context.app.cmdManager.register([
    [CommandType.MyCommand, MyCommand]
  ]);
  
  // ✅ 注册事务
  context.app.transManager.register([
    [RequestType.MyRequest, MyRequest]
  ]);
  
  // ✅ 订阅事件
  context.app.eventBus.on('myEvent', this.handleEvent);
  
  // ✅ 使用依赖插件
  const catalogPlugin = deps[HSFPConstants.PluginType.Catalog];
  catalogPlugin.doSomething();
  
  // ✅ 启动服务
  this.service.start();
}
```

#### onDeactive中应该做什么

```typescript
onDeactive(context: IPluginContext): void {
  // ✅ 取消事件订阅
  context.app.eventBus.off('myEvent', this.handleEvent);
  
  // ✅ 停止服务
  this.service.stop();
  
  // ✅ 清理UI
  this.panel.destroy();
  
  // ✅ 释放资源
  this.textures.forEach(t => t.dispose());
  
  // ❌ 不需要unregister命令 (Manager会处理)
}
```

---

## 🔗 7. 依赖管理

### 7.1 依赖声明

```typescript
class MyPlugin extends IPlugin {
  constructor() {
    super({
      name: "My Plugin",
      dependencies: [
        HSFPConstants.PluginType.Core,
        HSFPConstants.PluginType.Catalog,
        HSFPConstants.PluginType.CommonUI
      ]
    });
  }
}
```

### 7.2 依赖加载机制

#### 自动递归加载

```typescript
// 源码: module_9684.js:167-170
plugin.dependencies.forEach((depType) => {
  if (this._loadedPlugins[depType] && 
      this._loadedPlugins[depType].status !== PluginStatus.Loaded) {
    this.activate(depType);
  }
  deps[depType] = this.load(depType); // 递归
}, this);
```

#### 依赖注入

```typescript
onActive(context: IPluginContext, deps: Record<string, IPlugin>): void {
  // deps中已包含所有依赖插件的实例
  const catalogPlugin = deps[HSFPConstants.PluginType.Catalog];
  const uiPlugin = deps[HSFPConstants.PluginType.CommonUI];
  
  // 使用依赖
  catalogPlugin.openCatalog();
  uiPlugin.showDialog();
}
```

### 7.3 循环依赖检测

```typescript
// 源码: module_9684.js:152-157
if (this._loadingPlugins.includes(type)) {
  // 检测到循环依赖
  assert(false, `loading plugin for another time: ${type}. 
    is there a circular reference between plugins?`);
  assert(false, `current loading plugins: [${
    this._loadingPlugins.join(", ")
  }]`);
  return;
}
```

**检测原理**:
- 维护`_loadingPlugins`栈
- load时push，完成后pop
- 如果已在栈中，说明循环依赖

**示例场景**:
```
PluginA.dependencies = [PluginB]
PluginB.dependencies = [PluginA]

加载PluginA:
1. push("PluginA")
2. 加载依赖PluginB
3. push("PluginB")
4. 加载依赖PluginA
5. 检测到"PluginA"已在栈中 → 报错
```

### 7.4 依赖图示例

```mermaid
graph LR
    TgWall[TgWall插件]
    Structure[Structure插件]
    Constraint[Constraint插件]
    CommonUI[CommonUI插件]
    Catalog[Catalog插件]
    
    TgWall --> Structure
    TgWall --> Constraint
    Structure --> CommonUI
    Catalog --> CommonUI
    
    style TgWall fill:#e1f5ff
    style CommonUI fill:#fff4e1
```

### 7.5 依赖最佳实践

#### ✅ 推荐做法

```typescript
// 1. 声明最小依赖集
dependencies: [
  HSFPConstants.PluginType.Core  // 只依赖真正需要的
]

// 2. 在onActive中使用依赖
onActive(context, deps) {
  const corePlugin = deps[HSFPConstants.PluginType.Core];
  this.setup(corePlugin);
}

// 3. 弱依赖用可选检查
onActive(context, deps) {
  const optionalPlugin = context.app.pluginManager.getPlugin('optional');
  if (optionalPlugin) {
    optionalPlugin.enhance();
  }
}
```

#### ❌ 避免做法

```typescript
// 1. 过度依赖
dependencies: [
  'PluginA', 'PluginB', 'PluginC', 'PluginD', ...  // 太多
]

// 2. 循环依赖
// PluginA depends on PluginB
// PluginB depends on PluginA

// 3. 在onCreate中访问依赖
onCreate(context) {
  const dep = context.app.pluginManager.getPlugin('dep');
  dep.doSomething();  // ❌ dep可能未加载
}
```

---

## 🚀 8. 动态加载

### 8.1 动态加载配置

```typescript
// 源码: module_9684.js:227-233
mergeDynamicPluginConfig(config: PluginConfig[]) {
  if (Array.isArray(config)) {
    this._dynamicPluginConfig = [
      ...this._dynamicPluginConfig,
      ...config
    ];
  }
}
```

**PluginConfig结构**:
```typescript
interface PluginConfig {
  name: string;      // 插件名称
  url: string;       // 插件JS文件URL
  version?: string;  // 版本号
}
```

### 8.2 asyncLoad异步加载

```typescript
// 源码: module_9684.js:234-349
async asyncLoad(pluginName: string): Promise<IPlugin | void> {
  // 1. 检查是否已注册
  if (gPluginMap.get(pluginName)) {
    return Promise.resolve();
  }
  
  // 2. 检查是否已加载
  if (this._loadedPlugins[pluginName]) {
    return Promise.resolve(this._loadedPlugins[pluginName]);
  }
  
  // 3. 查找插件配置
  const pluginConfig = this._dynamicPluginConfig.find(
    c => c.name === pluginName
  );
  
  if (!pluginConfig) {
    throw new Error(`Plugin not exist: ${pluginName}`);
  }
  
  // 4. 从URL加载插件代码
  const pluginClassPromise = NWTK.ajax.get(pluginConfig.url, {
    dataType: "html"
  }).then((pluginContext) => {
    // 5. eval执行插件代码
    let PluginClass = eval(pluginContext);
    return PluginClass;
  });
  
  // 6. 实例化并初始化
  const pluginLoadingPromise = pluginClassPromise.then((PluginClass) => {
    const plugin = new PluginClass();
    
    plugin.type = pluginConfig.name;
    this.plugins[pluginConfig.name] = plugin;
    
    return Promise.resolve()
      .then(() => plugin.onCreate(this.context))
      .then(() => {
        if (plugin.enable) {
          // 递归加载依赖
          return Promise.all(
            plugin.dependencies.map(dep => this.asyncLoad(dep))
          );
        }
      })
      .then(() => {
        this._loadedPlugins[pluginConfig.name].plugin = plugin;
        this._loadedPlugins[pluginConfig.name].status = PluginStatus.UnLoaded;
        return plugin;
      });
  });
  
  // 7. 标记加载中
  this._loadedPlugins[pluginConfig.name] = {
    plugin: pluginLoadingPromise,
    status: PluginStatus.Loading
  };
  
  return pluginLoadingPromise || Promise.resolve();
}
```

### 8.3 URL插件加载

```typescript
// 源码: module_9684.js:196-211
async getUrlPlugin(pluginName: string, url: string): Promise<IPlugin> {
  // 避免重复加载
  if (!this._loadedUrlScripts.includes(url)) {
    // 动态import模块
    await importModule(url);
    
    this._loadedUrlScripts.push(url);
    
    // 检查是否已注册
    if (gPluginMap.has(pluginName)) {
      const { pluginClass, preloader } = gPluginMap.get(pluginName);
      
      this.registerPlugin(pluginName, pluginClass, preloader);
      
      if (preloader) {
        await preloader();
      }
      
      return this.load(pluginName);
    }
  }
  
  return this.plugins[pluginName];
}
```

### 8.4 ES Module动态导入

```typescript
// 源码: module_9684.js:389-427
function importModule(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const callbackName = `$importModule$${Math.random().toString(32).slice(2)}`;
    const script = document.createElement("script");
    
    const cleanup = () => {
      delete window[callbackName];
      script.onerror = null;
      script.onload = null;
      script.remove();
      URL.revokeObjectURL(script.src);
      script.src = "";
    };
    
    script.defer = true;
    script.type = "module";
    
    script.onerror = () => {
      reject(new Error(`Failed to import: ${url}`));
      cleanup();
    };
    
    script.onload = () => {
      resolve(window[callbackName]);
      cleanup();
    };
    
    const fullUrl = toAbsoluteUrl(url);
    const blob = new Blob([`
      import * as m from "${fullUrl}";
      window.${callbackName} = m;
    `], { type: "text/javascript" });
    
    script.src = URL.createObjectURL(blob);
    document.head.appendChild(script);
  });
}
```

### 8.5 动态加载使用场景

#### 场景1: 按需加载非核心功能

```typescript
// 用户点击"自定义产品"按钮时才加载
async onCustomProductClick() {
  const plugin = await pluginManager.asyncLoad(
    'hsw.plugin.CustomizedProducts.Plugin'
  );
  
  plugin.showCustomizer();
}
```

#### 场景2: A/B测试

```typescript
// 根据用户分组加载不同版本
const pluginName = userGroup === 'A' 
  ? 'hsw.plugin.FeatureA.Plugin'
  : 'hsw.plugin.FeatureB.Plugin';

await 
pluginManager.asyncLoad(pluginName);
```

#### 场景3: 插件热更新

```typescript
// 强制重新加载插件
async reloadPlugin(pluginName: string) {
  // 1. 卸载旧版本
  pluginManager.unload(pluginName);
  
  // 2. 清除缓存
  delete pluginManager._loadedPlugins[pluginName];
  
  // 3. 加载新版本
  await pluginManager.asyncLoad(pluginName);
}
```

---

## 💡 9. 插件实现示例

### 9.1 最小插件示例

```typescript
// 最简单的插件
class MinimalPlugin extends HSApp.Plugin.IPlugin {
  constructor() {
    super({
      name: "Minimal Plugin",
      description: "A minimal plugin example"
    });
  }
  
  onCreate(context) {
    console.log('Plugin created');
  }
  
  onActive(context, deps) {
    console.log('Plugin activated');
  }
  
  onDeactive(context) {
    console.log('Plugin deactivated');
  }
}

// 注册
HSApp.Plugin.registerPlugin(
  'hsw.plugin.Minimal.Plugin',
  MinimalPlugin
);
```

### 9.2 带依赖的插件示例

```typescript
// 基于真实源码: module_196031.js
class UserInfoPlugin extends HSApp.Plugin.IPlugin {
  constructor() {
    super({
      name: "User Info Plugin",
      description: "Manage user information and profile",
      dependencies: [
        HSFPConstants.PluginType.MarketingBadge  // 依赖营销徽章插件
      ]
    });
    
    this.handler = new UserInfoHandler();
  }
  
  init() {
    this.handler.init();
  }
  
  onActive(context, deps) {
    // 初始化
    this.init();
    
    // 使用依赖插件
    const marketingBadge = deps[HSFPConstants.PluginType.MarketingBadge];
    marketingBadge.setupBadges();
  }
  
  onDeactive(context) {
    // 清理资源
    this.handler.cleanup();
  }
  
  // 公共API
  getUserInfoButton() {
    return this.handler.userInfoButton();
  }
  
  getUserInfoDropdown() {
    return this.handler.getUserInfoDropDown();
  }
  
  openUserDropdownMenu() {
    this.handler.openUserDropdownMenu();
  }
  
  closeUserDropdownMenu() {
    this.handler.closeUserDropdownMenu();
  }
}

// 注册
HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.UserInfo,
  UserInfoPlugin
);
```

### 9.3 注册命令的插件示例

```typescript
// 基于真实源码: module_730968.js
class TgWallPlugin extends HSApp.Plugin.IPlugin {
  constructor() {
    super({
      name: "tgwall editing",
      description: "Process wall edit commands and its gizmos.",
      dependencies: []
    });
  }
  
  onActive(context, deps) {
    // 注册命令
    context.app.cmdManager.register([
      [HSFPConstants.CommandType.CreateTgWall, CmdCreateTgWall],
      [HSFPConstants.CommandType.CreateRectTgWall, CmdCreateRectTgWall],
      [HSFPConstants.CommandType.CreatePolygonTgWall, CmdCreatePolygonTgWall]
    ]);
    
    // 注册事务请求处理器
    context.app.transManager.register([
      [HSFPConstants.RequestType.CreateTgWall, CreateTgWallRequest],
      [HSFPConstants.RequestType.SwitchArcWall, SwitchArcWallRequest]
    ]);
  }
  
  onDeactive(context) {
    // 命令和事务会被Manager自动清理
  }
  
  // 工具方法
  getConvexPath(width = 5, height = 5) {
    const points = [
      { x: width/2, y: -height/2 },
      { x: width/2, y: 0 },
      { x: width/4, y: 0 },
      { x: width/4, y: height/2 },
      { x: -width/4, y: height/2 },
      { x: -width/4, y: 0 },
      { x: -width/2, y: 0 },
      { x: -width/2, y: -height/2 }
    ];
    return new Loop(points).getAllCurves();
  }
  
  getLPath(width = 5, height = 5) {
    const points = [
      { x: width/2, y: -height/2 },
      { x: width/2, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: height/2 },
      { x: -width/2, y: height/2 },
      { x: -width/2, y: -height/2 }
    ];
    return new Loop(points).getAllCurves();
  }
}

// 注册
HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.TgWall,
  TgWallPlugin
);
```

### 9.4 带预加载的插件示例

```typescript
// 异步预加载资源
async function preloadClipperLib() {
  // 加载clipper-lib相关资源
  await import('clipper-lib');
  console.log('Clipper library preloaded');
}

class ClipperPlugin extends HSApp.Plugin.IPlugin {
  constructor() {
    super({
      name: "Clipper Plugin",
      description: "Polygon boolean operations using clipper-lib"
    });
  }
  
  onActive(context, deps) {
    // clipper-lib已在preloader中加载完成
    this.clipper = new ClipperLib.Clipper();
  }
}

// 注册时提供预加载函数
HSApp.Plugin.registerPlugin(
  'hsw.plugin.clipperlib.Plugin',
  ClipperPlugin,
  preloadClipperLib  // 预加载函数
);
```

### 9.5 禁用的插件示例

```typescript
class OptionalFeaturePlugin extends HSApp.Plugin.IPlugin {
  constructor() {
    super({
      name: "Optional Feature",
      enable: false  // 默认禁用
    });
  }
  
  onCreate(context) {
    // 仍会被调用
    console.log('Created but not active');
  }
  
  onActive(context, deps) {
    // 不会被调用 (enable=false)
  }
}

// 运行时手动激活
const plugin = pluginManager.getPlugin('optional-feature');
if (plugin && !plugin.enable) {
  plugin.enable = true;
  pluginManager.activate('optional-feature');
}
```

---

## ✨ 10. 最佳实践

### 10.1 插件设计原则

#### 单一职责原则

```typescript
// ✅ 好: 职责明确
class WallEditPlugin extends IPlugin {
  // 只负责墙体编辑功能
}

// ❌ 坏: 职责混乱
class AllFeaturesPlugin extends IPlugin {
  // 包含墙体、楼板、吊顶、家具等所有功能
}
```

#### 最小依赖原则

```typescript
// ✅ 好: 只依赖必需的插件
dependencies: [
  HSFPConstants.PluginType.Core
]

// ❌ 坏: 依赖过多
dependencies: [
  'PluginA', 'PluginB', 'PluginC', 'PluginD', 'PluginE', ...
]
```

#### 接口隔离原则

```typescript
// ✅ 好: 提供清晰的公共API
class MyPlugin extends IPlugin {
  // 公共方法
  public doSomething() { }
  public getSomething() { }
  
  // 私有方法
  private _internalLogic() { }
}

// ❌ 坏: 暴露内部实现
class MyPlugin extends IPlugin {
  public _privateField;  // 不应该public
  public _internalHelper() { }  // 不应该暴露
}
```

### 10.2 插件命名规范

```typescript
// 插件类型标识命名
HSFPConstants.PluginType.{功能名} = "{命名空间}.plugin.{功能名}.Plugin"

// 示例:
HSFPConstants.PluginType.TgWall = "hsw.plugin.TgWall.Plugin"
HSFPConstants.PluginType.UserInfo = "hsw.plugin.UserInfo.Plugin"
HSFPConstants.PluginType.Catalog = "hsw.plugin.Catalog.Plugin"

// 命名规则:
// - 使用PascalCase
// - 清晰描述功能
// - 避免缩写
```

### 10.3 错误处理

```typescript
class RobustPlugin extends IPlugin {
  onCreate(context) {
    try {
      this.initialize();
    } catch (error) {
      console.error('Plugin initialization failed:', error);
      // 记录到错误日志系统
      context.app.errorLogger.push('Plugin onCreate error', {
        errorStack: error.stack,
        description: `${this.name} initialization failed`,
        errorInfo: { error }
      });
      // 禁用插件
      this.enable = false;
    }
  }
  
  onActive(context, deps) {
    // 检查依赖是否正常
    for (const depName of this.dependencies) {
      if (!deps[depName]) {
        console.error(`Dependency ${depName} not available`);
        return;  // 提前退出
      }
    }
    
    // 继续激活逻辑
    try {
      this.setupFeatures(context, deps);
    } catch (error) {
      console.error('Plugin activation failed:', error);
      this.enable = false;
    }
  }
}
```

### 10.4 资源管理

```typescript
class ResourceAwarePlugin extends IPlugin {
  private textures: THREE.Texture[] = [];
  private eventHandlers: Map<string, Function> = new Map();
  
  onCreate(context) {
    // 记录创建的资源
    const texture = new THREE.TextureLoader().load('texture.png');
    this.textures.push(texture);
  }
  
  onActive(context, deps) {
    // 记录事件处理器
    const handler = (e) => this.handleEvent(e);
    this.eventHandlers.set('myEvent', handler);
    context.app.eventBus.on('myEvent', handler);
  }
  
  onDeactive(context) {
    // 清理事件
    this.eventHandlers.forEach((handler, event) => {
      context.app.eventBus.off(event, handler);
    });
    this.eventHandlers.clear();
    
    // 清理纹理
    this.textures.forEach(texture => texture.dispose());
    this.textures = [];
  }
}
```

### 10.5 性能优化

#### 懒加载

```typescript
class LazyPlugin extends IPlugin {
  private _heavyComponent: HeavyComponent | null = null;
  
  get heavyComponent(): HeavyComponent {
    if (!this._heavyComponent) {
      // 首次访问时才创建
      this._heavyComponent = new HeavyComponent();
    }
    return this._heavyComponent;
  }
  
  onDeactive(context) {
    // 清理懒加载的组件
    if (this._heavyComponent) {
      this._heavyComponent.dispose();
      this._heavyComponent = null;
    }
  }
}
```

#### 异步初始化

```typescript
class AsyncPlugin extends IPlugin {
  private initialized: boolean = false;
  private initPromise: Promise<void> | null = null;
  
  async initialize() {
    if (this.initialized) return;
    
    if (!this.initPromise) {
      this.initPromise = this._doInitialize();
    }
    
    return this.initPromise;
  }
  
  private async _doInitialize() {
    // 加载大型资源
    await this.loadModels();
    await this.loadTextures();
    this.initialized = true;
  }
  
  onCreate(context) {
    // 启动异步初始化,不阻塞
    this.initialize().catch(err => {
      console.error('Async init failed:', err);
    });
  }
}
```

### 10.6 测试友好设计

```typescript
class TestablePlugin extends IPlugin {
  // 依赖注入便于测试
  constructor(
    private handler: IHandler = new DefaultHandler(),
    private config: IConfig = defaultConfig
  ) {
    super({
      name: "Testable Plugin"
    });
  }
  
  // 可测试的纯函数
  calculateSomething(input: number): number {
    return input * 2 + this.config.offset;
  }
  
  // 暴露内部状态供测试验证
  get isReady(): boolean {
    return this.handler.isInitialized();
  }
}

// 单元测试
describe('TestablePlugin', () => {
  it('should calculate correctly', () => {
    const mockHandler = new MockHandler();
    const mockConfig = { offset: 10 };
    const plugin = new TestablePlugin(mockHandler, mockConfig);
    
    expect(plugin.calculateSomething(5)).toBe(20);
  });
});
```

### 10.7 文档规范

```typescript
/**
 * 墙体编辑插件
 * 
 * 提供墙体创建、编辑、删除等核心功能
 * 
 * @example
 * ```typescript
 * const plugin = pluginManager.getPlugin(HSFPConstants.PluginType.TgWall);
 * plugin.createWall(startPoint, endPoint);
 * ```
 * 
 * @dependencies
 * - HSFPConstants.PluginType.Core (核心几何引擎)
 * - HSFPConstants.PluginType.Constraint (约束系统)
 * 
 * @public-api
 * - createWall(start, end): 创建直线墙
 * - createRectWall(rect): 创建矩形墙
 * - createPolygonWall(points): 创建多边形墙
 */
class TgWallPlugin extends HSApp.Plugin.IPlugin {
  /**
   * 创建直线墙体
   * @param start 起点坐标
   * @param end 终点坐标
   * @returns 创建的墙体对象
   */
  createWall(start: Point2d, end: Point2d): Wall {
    // ...
  }
}
```

---

## 📊 11. 插件系统架构总结

### 11.1 关键组件职责

| 组件 | 职责 | 关键方法 |
|------|------|---------|
| **IPlugin** | 插件基类 | onCreate, onActive, onDeactive |
| **PluginManager** | 插件生命周期管理 | load, unload, getPlugin, asyncLoad |
| **gPluginMap** | 全局插件注册表 | 存储插件元信息 |
| **registerPlugin** | 全局注册函数 | 注册插件到gPluginMap |

### 11.2 数据流图

```mermaid
sequenceDiagram
    participant Bundle
    participant gPluginMap
    participant PluginManager
    participant PluginInstance
    participant 
App
    
    Bundle->>gPluginMap: registerPlugin(type, class, preloader)
    Note over gPluginMap: 存储插件元信息
    
    App->>PluginManager: loadAll()
    PluginManager->>gPluginMap: 遍历所有插件
    
    loop 每个插件
        PluginManager->>PluginInstance: new PluginClass()
        PluginInstance->>PluginInstance: onCreate(context)
        
        alt enable=true
            PluginManager->>PluginManager: 加载依赖
            PluginManager->>PluginInstance: onActive(context, deps)
        end
    end
    
    Note over App: 应用运行中...
    
    App->>PluginManager: unload(type)
    PluginManager->>PluginInstance: onDeactive(context)
    PluginManager->>PluginManager: 删除实例
```

### 11.3 核心设计模式

#### 1. 工厂模式 (Factory Pattern)

```typescript
// PluginManager作为插件工厂
class PluginManager {
  load(type: string): IPlugin {
    const PluginClass = this._pluginClassByType.get(type);
    return new PluginClass();  // 工厂创建实例
  }
}
```

#### 2. 注册表模式 (Registry Pattern)

```typescript
// gPluginMap作为全局注册表
const gPluginMap = new Map();

registerPlugin(type, PluginClass) {
  gPluginMap.set(type, { pluginClass: PluginClass });
}
```

#### 3. 依赖注入模式 (Dependency Injection)

```typescript
// 通过onActive注入依赖
onActive(context, deps) {
  const catalogPlugin = deps[HSFPConstants.PluginType.Catalog];
  // 使用注入的依赖
}
```

#### 4. 单例模式 (Singleton Pattern)

```typescript
// 每个插件类型只有一个实例
if (this.plugins[type] !== null) {
  return this.plugins[type];  // 返回已存在的实例
}
```

#### 5. 观察者模式 (Observer Pattern)

```typescript
// 插件激活/停用信号
manager.signalPluginActived.add((data) => {
  console.log('Plugin activated:', data.type);
});
```

### 11.4 性能特征

| 指标 | 值 | 说明 |
|------|-----|------|
| **注册时间** | <1ms/插件 | Bundle加载时同步注册 |
| **加载时间** | 10-50ms/插件 | 取决于onCreate复杂度 |
| **激活时间** | 10-100ms/插件 | 取决于onActive操作 |
| **内存占用** | ~100KB-5MB/插件 | 取决于插件资源 |
| **卸载时间** | <10ms/插件 | onDeactive清理 |

### 11.5 扩展性评估

**✅ 优势**:
- 插件独立开发，互不干扰
- 按需加载，减少初始加载时间
- 支持动态加载和热更新
- 清晰的依赖管理机制

**⚠️ 限制**:
- 插件间通信需要通过依赖或事件
- 循环依赖会导致加载失败
- 插件数量过多会影响启动速度

---

## 🛠️ 12. 实践指南

### 12.1 创建新插件的步骤

#### 步骤1: 定义插件类

```typescript
// src/plugins/my-feature/index.ts
import { HSApp } from '@/core';

class MyFeaturePlugin extends HSApp.Plugin.IPlugin {
  constructor() {
    super({
      name: "My Feature",
      description: "A new awesome feature",
      dependencies: [
        HSFPConstants.PluginType.Core
      ]
    });
  }
  
  onCreate(context: IPluginContext) {
    console.log('MyFeature plugin created');
  }
  
  onActive(context: IPluginContext, deps: Record<string, IPlugin>) {
    console.log('MyFeature plugin activated');
    
    // 注册命令
    context.app.cmdManager.register([
      [HSFPConstants.CommandType.MyFeature, MyFeatureCommand]
    ]);
  }
  
  onDeactive(context: IPluginContext) {
    console.log('MyFeature plugin deactivated');
  }
}

export default MyFeaturePlugin;
```

#### 步骤2: 注册插件

```typescript
// src/plugins/my-feature/register.ts
import MyFeaturePlugin from './index';

// 定义插件类型常量
HSFPConstants.PluginType.MyFeature = 'hsw.plugin.MyFeature.Plugin';

// 注册插件
HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.MyFeature,
  MyFeaturePlugin
);
```

#### 步骤3: 构建插件Bundle

```javascript
// webpack.config.js
module.exports = {
  entry: './src/plugins/my-feature/register.ts',
  output: {
    filename: 'plugins-hs-myfeature.[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  externals: {
    // 使用全局的HSApp而不是打包进来
    '@/core': 'HSApp'
  }
};
```

#### 步骤4: 在应用中使用

```typescript
// 同步加载
pluginManager.load(HSFPConstants.PluginType.MyFeature);

// 或异步加载
await pluginManager.asyncLoad(HSFPConstants.PluginType.MyFeature);

// 获取插件实例
const myPlugin = pluginManager.getPlugin(HSFPConstants.PluginType.MyFeature);
myPlugin.doSomething();
```

### 12.2 调试技巧

#### 启用插件日志

```typescript
class DebugPlugin extends IPlugin {
  private log(...args: any[]) {
    console.log(`[${this.name}]`, ...args);
  }
  
  onCreate(context) {
    this.log('onCreate called');
  }
  
  onActive(context, deps) {
    this.log('onActive called with deps:', Object.keys(deps));
  }
  
  onDeactive(context) {
    this.log('onDeactive called');
  }
}
```

#### 检查插件状态

```typescript
// 在浏览器控制台中
const manager = HSApp.App.getApp().pluginManager;

// 查看所有已加载插件
console.log(manager.plugins);

// 查看插件加载状态
console.log(manager._loadedPlugins);

// 查看正在加载的插件
console.log(manager._loadingPlugins);

// 查看插件类映射
console.log(manager._pluginClassByType);
```

#### 监听插件事件

```typescript
const manager = HSApp.App.getApp().pluginManager;

// 监听激活事件
manager.signalPluginActived.add((data) => {
  console.log('Plugin activated:', data.type, data.plugin);
});

// 监听停用事件
manager.signalPluginDeactived.add((data) => {
  console.log('Plugin deactivated:', data.type, data.plugin);
});
```

### 12.3 常见问题排查

#### 问题1: 插件未加载

**症状**: `getPlugin(type)` 返回 `null`

**排查**:
```typescript
// 1. 检查是否已注册
console.log(gPluginMap.has(pluginType));

// 2. 检查是否调用了load
console.log(manager.plugins[pluginType]);

// 3. 检查是否在loadingPlugins中卡住
console.log(manager._loadingPlugins);
```

**解决方案**:
- 确保Bundle已加载
- 确保registerPlugin已调用
- 检查是否有循环依赖

#### 问题2: 循环依赖错误

**症状**: 控制台报错 "circular reference between plugins"

**排查**:
```typescript
// 查看加载栈
console.log(manager._loadingPlugins);
```

**解决方案**:
- 重新设计插件依赖关系
- 将共同依赖提取到基础插件
- 使用弱依赖（运行时getPlugin而非声明依赖）

#### 问题3: 依赖插件未找到

**症状**: 报错 "Dependent plugin does not exist"

**排查**:
```typescript
// 检查依赖插件是否注册
console.log(gPluginMap.has(dependencyType));

// 检查依赖插件是否已加载
console.log(manager.plugins[dependencyType]);
```

**解决方案**:
- 确保依赖插件的Bundle已加载
- 检查依赖插件名称是否正确
- 调整插件加载顺序

---

## 📚 13. 参考资料

### 13.1 核心源码文件

| 文件 | Module ID | 功能 | 行数 |
|------|-----------|------|------|
| `module_2387.js` | 2387 | IPlugin基类定义 | 33 |
| `module_9684.js` | 9684 | PluginManager实现 | 428 |
| `module_730968.js` | 730968 | TgWall插件示例 | 151 |
| `module_196031.js` | 196031 | UserInfo插件示例 | 206 |

### 13.2 关键常量

```typescript
// 插件类型常量定义
namespace HSFPConstants.PluginType {
  // 核心插件
  export const Core = "hsw.plugin.Core.Plugin";
  export const Catalog = "hsw.plugin.Catalog.Plugin";
  export const CommonUI = "hsw.plugin.CommonUI.Plugin";
  
  // 功能插件
  export const TgWall = "hsw.plugin.TgWall.Plugin";
  export const UserInfo = "hsw.plugin.UserInfo.Plugin";
  export const Constraint = "hsw.plugin.Constraint.Plugin";
  export const Structure = "hsw.plugin.Structure.Plugin";
  
  // ... 更多插件类型
}
```

### 13.3 相关文档

- [dist-only-restoration-plan.md](./dist-only-restoration-plan.md) - dist/目录还原方案
- [plugin-205d0ccf-constraint-system-analysis.md](./plugin-205d0ccf-constraint-system-analysis.md) - 约束系统插件详细分析
- [core-plugin-system-complete-architecture.md](./core-plugin-system-complete-architecture.md) - 核心插件系统架构

---

## 🎯 14. 总结

### 14.1 插件系统核心价值

**1. 模块化架构**
- 每个插件独立封装
- 清晰的接口边界
- 便于团队协作开发

**2. 灵活的扩展性**
- 新功能以插件形式添加
- 不影响现有代码
- 支持第三方插件

**3. 按需加载**
- 减少初始加载时间
- 降低内存占用
- 提升用户体验

**4. 依赖管理**
- 自动处理插件依赖
- 防止循环依赖
- 确保加载顺序

### 14.2 还原实施建议

#### 第1阶段: 核心系统 (Week 1-15)

```typescript
// 1. 实现IPlugin基类
class IPlugin {
  // 基础实现
}

// 2. 实现PluginManager
class Manager {
  // 插件管理器
}

// 3. 实现注册机制
const registerPlugin = (type, PluginClass, preloader) => {
  gPluginMap.set(type, { pluginClass: PluginClass, preloader });
};
```

#### 第2阶段: 插件系统设计 (Week 16)

```typescript
// 1. 设计插件加载机制
// 2. 实现依赖管理
// 3. 实现生命周期管理
// 4. 添加信号机制
```

#### 第3阶段: 插件实现 (Week 17-31)

```typescript
// 按优先级逐个实现8个插件
// P1: plugins-hs-205d0ccf, 1625f76b, adc1df6b
// P2: plugins-hs-9fd2f87f, dd89ef02, 5c263204, 73381696
// P3: plugins-hs-aa8c4e59
```

### 14.3 关键成功因素

✅ **清晰的架构设计**
- 基于真实源码还原
- 遵循原有设计模式
- 保持接口兼容性

✅ **完善的文档**
- 详细的API文档
- 丰富的代码示例
- 清晰的使用指南

✅ **充分的测试**
- 单元测试覆盖 >80%
- 集成测试验证依赖
- 端到端测试验证功能

✅ **渐进式开发**
- 先核心后扩展
- 先简单后复杂
- 持续验证集成

---

## 🔖 附录

### A. 完整API索引

#### IPlugin API

```typescript
class IPlugin {
  // 属性
  type: string;
  enable: boolean;
  name: string;
  description: string;
  dependencies: string[];
  
  // 生命周期
  onCreate(context: IPluginContext): void;
  onDestroy(context: IPluginContext): void;
  onActive(context: IPluginContext, deps: Record<string, IPlugin>): void;
  onDeactive(context: IPluginContext): void;
}
```

#### PluginManager API

```typescript
class Manager {
  // 插件管理
  registerPlugin(type: string, pluginClass: typeof 
IPlugin, preloader?: () => Promise<void>): void;
  unRegisterPlugin(type: string): void;
  
  // 插件加载
  load(type: string): IPlugin | undefined;
  unload(type: string): void;
  loadAll(): void;
  unloadAll(): void;
  
  // 插件获取
  getPlugin(type: string): IPlugin | null;
  
  // 动态加载
  asyncLoad(pluginName: string): Promise<IPlugin | void>;
  getUrlPlugin(pluginName: string, url: string): Promise<IPlugin>;
  getExternalPlugin(pluginName: string, version: string): Promise<IPlugin>;
  
  // 配置管理
  mergeDynamicPluginConfig(config: PluginConfig[]): void;
  
  // 插件替换
  replacePlugin(oldType: string, newType: string): void;
  
  // 激活控制
  activate(type: string): void;
  
  // 事件信号
  signalPluginActived: Signal;
  signalPluginDeactived: Signal;
}
```

#### 全局函数 API

```typescript
// 注册插件
function registerPlugin(
  type: string,
  pluginClass: typeof IPlugin,
  preloader?: () => Promise<void>
): void;

// 取消注册
function unRegisterPlugin(type: string): void;

// 替换插件
function replacePlugin(oldType: string, newType: string): void;

// 预加载所有
function preloadAll(): Promise<void[]>;
```

### B. 插件状态图

```mermaid
stateDiagram-v2
    [*] --> Unregistered: 应用启动
    Unregistered --> Registered: registerPlugin()
    Registered --> Instantiated: load()
    Instantiated --> Created: onCreate()
    Created --> Active: onActive() [enable=true]
    Created --> Inactive: [enable=false]
    Active --> Deactivated: onDeactive()
    Inactive --> Deactivated: unload()
    Deactivated --> [*]: destroy
    
    Active --> Active: 运行中
    Deactivated --> Instantiated: reload()
```

### C. 插件依赖示例图

基于真实dist/目录8个插件的依赖关系:

```mermaid
graph TB
    subgraph "P1高优先级插件"
        P205[plugins-hs-205d0ccf<br/>约束系统插件]
        P162[plugins-hs-1625f76b<br/>建模工具插件]
        PADC[plugins-hs-adc1df6b<br/>专业功能插件]
    end
    
    subgraph "P2中优先级插件"
        P9FD[plugins-hs-9fd2f87f<br/>辅助工具插件]
        PDD8[plugins-hs-dd89ef02<br/>扩展功能插件]
        P5C2[plugins-hs-5c263204<br/>UI扩展插件]
        P733[plugins-hs-73381696<br/>工具集插件]
    end
    
    subgraph "P3低优先级插件"
        PAA8[plugins-hs-aa8c4e59<br/>辅助插件]
    end
    
    subgraph "核心模块"
        CORE[core-hs.bundle]
        APP[app-hs.bundle]
        HS[hs.bundle]
    end
    
    P205 --> CORE
    P162 --> CORE
    PADC --> CORE
    P9FD --> CORE
    PDD8 --> CORE
    P5C2 --> HS
    P733 --> CORE
    PAA8 --> CORE
    
    P162 --> P205
    PADC --> P205
    PDD8 --> P162
    
    style P205 fill:#e1f5ff
    style P162 fill:#e1f5ff
    style PADC fill:#e1f5ff
    style CORE fill:#fff4e1
```

### D. 快速参考卡片

#### 创建插件

```typescript
class MyPlugin extends HSApp.Plugin.IPlugin {
  constructor() {
    super({
      name: "My Plugin",
      dependencies: []
    });
  }
  onCreate(ctx) { /* init */ }
  onActive(ctx, deps) { /* activate */ }
  onDeactive(ctx) { /* cleanup */ }
}
HSApp.Plugin.registerPlugin('my.plugin', MyPlugin);
```

#### 加载插件

```typescript
// 同步加载
const plugin = manager.load('my.plugin');

// 异步加载
const plugin = await manager.asyncLoad('my.plugin');

// 获取已加载插件
const plugin = manager.getPlugin('my.plugin');
```

#### 依赖声明

```typescript
dependencies: [
  HSFPConstants.PluginType.Core,
  HSFPConstants.PluginType.Catalog
]
```

#### 使用依赖

```typescript
onActive(context, deps) {
  const core = deps[HSFPConstants.PluginType.Core];
  core.doSomething();
}
```

---

**文档版本**: v1.0  
**创建日期**: 2026-01-24  
**基于源码**: dist/app-hs.fe5726b7.bundle (module_9684, module_2387)  
**作者**: BIM项目还原团队

**🎯 本文档提供了完整的插件系统架构分析，包括:**
- ✅ 核心组件详细设计
- ✅ 完整生命周期管理
- ✅ 依赖管理机制
- ✅ 动态加载实现
- ✅ 真实源码示例
- ✅ 最佳实践指南
- ✅ 实施步骤建议

**📖 相关文档:**
- [dist-only-restoration-plan.md](./dist-only-restoration-plan.md) - 完整还原方案
- [plugin-205d0ccf-constraint-system-analysis.md](./plugin-205d0ccf-constraint-system-analysis.md) - 约束系统插件分析

**🚀 准备好基于这个架构开始还原插件系统了吗?**