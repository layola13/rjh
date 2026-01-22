#  rjh模块功能详细分析文档

## 概述
rjh 是家居设计软件的项目，dist/目录包含解包后的Webpack捆绑包。以下详细分析主要模块的功能和联系，重点涵盖核心模块、面板、全屋装修、暗装工程、水电工程、地板、天花、衣柜等功能。

## 核心模块 (core-hs.fe5726b7.bundle_dewebpack/)

核心模块提供几何建模和建筑元素的基础API，是整个系统的底层支撑。

### 主要功能模块
- **几何基础**:
  - `circle2d.js`, `line2d_io.js`: 2D几何形状处理
  - `curve.js`, `arc2d.js`: 曲线和弧线建模
  - `polygon2d.js`, `continuouscurve2d.js`: 多边形和连续曲线

- **建筑元素**:
  - `slab.js`, `slabutil.js`: 板材（地板、天花板、墙板）建模
  - `wall.js`, `wallutil.js`: 墙体建模和工具
  - `door.js`, `window.js`: 门窗元素
  - `opening.js`, `hole.js`: 开口和孔洞

- **材质和渲染**:
  - `material.js`, `materialutil.js`: 材质管理
  - `mixpaint.js`, `paintutil.js`: 涂装和纹理
  - `light.js`, `spotlight.js`: 灯光系统

- **约束和参数**:
  - `constraint.js`, `positionconstraint.js`: 位置约束
  - `params.js`: 参数化建模

- **辅助工具**:
  - `sketch2dutil.js`, `sketch2dbuilder.js`: 2D草图工具
  - `context.js`: 上下文管理
  - `api.js`: 核心API接口

### 联系
核心模块导出几何、材质、灯光等基础功能，被其他模块依赖。如插件模块使用slab和wall来构建房间结构，供应商模块依赖材质系统进行渲染。

## 供应商模块 (vendors-hs-*.bundle_dewebpack/)

供应商模块包含第三方UI库和工具，主要用于界面交互和可视化。

### 主要功能
- **颜色和样式工具**:
  - `photoshoppicker.js`, `sliderswatch.js`: 颜色选择器
  - `alphapicker.js`, `hue.js`: 透明度和色调调节
  - `chromepicker.js`: Chrome风格颜色选择

- **UI组件**:
  - `panel.js`, `menuitem.js`: 面板和菜单
  - `sliderpointer.js`: 滑块控件
  - `formprovider.js`: 表单提供者

- **数据处理**:
  - `collectioncontext.js`: 数据集合上下文
  - `wrappedcomponent.js`: 包装组件
  - `motionentity.js`: 动画实体

### 联系
供应商模块提供UI基础，其他模块使用这些组件构建用户界面。如核心模块的材质编辑器使用颜色选择器。

## 插件模块 (plugins-hs-*.bundle_dewebpack/)

插件模块扩展业务功能，实现具体设计任务。

### 全屋装修功能
- **房间管理**:
  - `b3room.js`, `b2room.js`: 3D/2D房间建模
  - `roomentity.js`, `roomlistboard.js`: 房间实体和列表

- **实体管理**:
  - `b3entity.js`, `designentity.js`: 设计实体
  - `contententity.js`: 内容实体

- **定制策略**:
  - `customizecontentstrategy.js`: 内容定制策略
  - `customizationentity.js`: 定制实体

### 暗装工程
- **暗装系统**:
  - `concealedworktube.js`, `cwtubeentity.js`: 暗装管道
  - `concealedworkcircuit.js`, `cwcircuitentity.js`: 暗装电路
  - `concealedworkpowersystem.js`, `cwpowersystementity.js`: 暗装电力系统

### 水电工程
- **水电组件**:
  - `coldwatercomp.js`, `hotwatercomp.js`: 冷热水组件
  - `strongeleccomp.js`, `weakeleccomp.js`: 强弱电组件
  - `junctionbox.js`: 接线盒

### 地板、天花、衣柜
- **地板**:
  - `b3pave.js`, `paveentity.js`: 铺装实体（地板砖、地板）
  - `floormixpaintutil.js`: 地板涂装工具

- **天花**:
  - `ceiling.js`, `ceilingutil.js`: 天花板工具
  - `ceilingstrategy.js`: 天花策略

- **衣柜**:
  - `cabinetbase.js`: 柜体基础
  - `b3pocket.js`, `pocketentity.js`: 衣柜门和抽屉

### 其他插件功能
- **辅助设计**:
  - `createauxiliarylinegizmo.js`, `createauxiliarylinerequest.js`: 辅助线创建
  - `diycollector.js`: DIY收集器

- **BOM和清单**:
  - `bomdialog.js`: BOM对话框
  - `cornermoldingbom.js`: 角线BOM

### 联系
插件模块依赖核心模块的几何基础，使用供应商模块的UI组件，实现业务逻辑。如全屋装修使用房间实体，水电工程集成暗装系统。

## 主应用模块 (hs.fe5726b7.bundle_dewebpack/)

主应用模块整合所有功能，提供用户界面和应用逻辑。

### 主要功能
- **UI管理**:
  - `propertybar.js`: 属性栏
  - `nameroompopup.js`: 命名房间弹窗
  - `operationtip.js`: 操作提示

- **权限和用户管理**:
  - `permissionsmanager.js`: 权限管理
  - `membermanager.js`: 成员管理
  - `benefitsmanager.js`: 权益管理

- **性能和渲染**:
  - `rendererstats.js`: 渲染统计
  - `texture2dinstance.js`: 纹理实例
  - `ninepatch.js`: 九宫格渲染

- **数据处理**:
  - `t3dbinaryobjloader.js`: 3D对象加载器
  - `batchingcomponent.js`: 批处理组件

### 联系
主应用模块调用核心、供应商、插件模块的功能，提供统一的界面。如使用插件的房间管理构建设计界面。

## 模块间依赖关系

```
主应用模块
├── 插件模块 (业务逻辑)
│   ├── 全屋装修 (房间、实体)
│   ├── 暗装工程 (管道、电路)
│   ├── 水电工程 (组件)
│   ├── 地板/天花/衣柜 (定制)
│   └── ...
├── 供应商模块 (UI工具)
└── 核心模块 (几何基础)
```

核心模块提供底层API，插件模块实现具体功能，供应商模块支持界面，主应用模块整合使用。

## 总结
shejijia采用模块化架构，核心模块处理几何建模，插件模块扩展业务功能，供应商模块提供UI支持，主应用模块统一管理。这样的设计支持灵活扩展和维护。