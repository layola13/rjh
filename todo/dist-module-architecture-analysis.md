# dist/ 模块架构详细分析

## 一、核心模块层级结构

```
dist/
├── apploader.bundle                    # 应用入口加载器
├── app-hs.bundle                       # 应用层主程序
├── hs.bundle                           # 平台核心模块
├── core-hs.bundle                      # 几何/建模核心引擎
├── plugins-hs-*.bundle (8个)           # 功能插件层
├── vendors-hs-*.bundle (12个)          # 共享库/工具层
└── vendor.bundle                       # 基础依赖
```

---

## 二、各模块详细分析

### 1. 应用入口层

**apploader.45c3a736b03a3649aad5.bundle** (1.7KB)
- **作用**: 应用启动器
- **导出**: module_120, module_123, module_132等初始化模块
- **职责**: 负责加载主应用、初始化环境

---

### 2. 应用主程序层

**app-hs.fe5726b7.bundle** (113KB)
```
核心导出:
├── hsapp.js                 # 主应用入口
├── il.js, int.js, is.js     # 国际化、类型工具
├── originalmetacreatortype  # 元数据类型定义
└── module_* (200+模块)      # UI组件、工具函数
```
- **作用**: 宿舍家应用主程序
- **核心功能**:
  - 应用生命周期管理
  - UI框架组件
  - Three.js 3D渲染集成
  - 国际化支持

---

### 3. 平台核心层

**hs.fe5726b7.bundle** (41KB)
```
核心导出:
├── abmanager.js             # AB测试管理
├── adskuser.js              # Autodesk用户认证
├── authpopup.js             # 认证弹窗
├── permissionsmanager.js    # 权限管理
├── benefitsmanager.js       # 权益管理
├── propertybar.js           # 属性栏
├── nameroompopup.js         # 房间命名
├── contentrotatecontroller  # 内容旋转控制器
├── clipboardutil.js         # 剪贴板工具
└── UI组件库 (60+模块)
```
- **作用**: 宿舍家平台核心服务
- **功能**: 用户认证、权限、UI框架、AB测试

---

### 4. 几何/建模核心引擎

**core-hs.fe5726b7.bundle** (1.4MB) ⭐ 最大模块
```
几何核心 (500+模块):
├── 几何基础
│   ├── point2d, point3d         # 点
│   ├── curve2d, arc2d          # 曲线
│   ├── polygon2d, circle2d      # 多边形
│   └── affinetransform          # 仿射变换
├── 建模对象
│   ├── wall.js                  # 墙体
│   ├── door.js, window.js       # 门/窗
│   ├── ceiling.js, floor.js    # 天花板/地板
│   ├── beam.js                  # 梁
│   ├── column.js               # 柱
│   └── curtain.js              # 窗帘
├── 参数化建模
│   ├── parametricmodel.js       # 参数化模型
│   ├── customizedpmmodel.js    # 自定义PM模型
│   └── parametricopening.js    # 参数化开洞
├── 约束系统
│   ├── constraint.js           # 约束
│   ├── positionconstraint.js   # 位置约束
│   └── constraintfactory.js    # 约束工厂
├── 材质系统
│   ├── material.js             # 材质
│   ├── materialutil.js         # 材质工具
│   └── paintservice.js         # 涂料服务
├── 灯光系统
│   ├── light.js                # 灯光
│   ├── pointlight.js           # 点光源
│   ├── spotlight.js            # 聚光灯
│   └── attenuatedspotlight.js  # 衰减聚光灯
└── 数据管理
    ├── scene.js                # 场景
    ├── documentmanager.js      # 文档管理
    ├── txnstatefactory.js      # 事务状态工厂
    └── cache.js                # 缓存
```

- **作用**: 核心几何建模引擎
- **功能**: BIM建模、参数化设计、约束求解

---

### 5. 插件功能层 (8个插件)

#### plugins-hs-9fd2f87f.bundle (59KB) - DIY工具
```
核心功能:
├── basedifftoolplugin.js      # 基础差异工具插件
├── diyutils.js                 # DIY工具集
├── bomdataadapter.js           # BOM数据适配器
├── messagehandler.js           # 消息处理器
├── SVG绘制
│   ├── svgbuilder.js           # SVG构建器
│   ├── svgwalls.js             # 墙体SVG
│   ├── svgrooms.js             # 房间SVG
│   ├── svgopenings.js          # 开洞SVG
│   └── svgpaints.js            # 涂料SVG
└── 命令系统 (50+)
    ├── cmdcreatecustomizedpmodel.js
    ├── cmdeditcurtain.js
    └── cmddeletecustomizedpminstance.js
```
- **作用**: DIY装修定制工具
- **功能**: SVG导出、差异对比、命令系统

---

#### plugins-hs-5c263204.bundle (46KB) - 操作工具
```
核心功能:
├── homegptentry.js             # HomeGPT入口
├── activecontext.js            # 活动上下文
├── arcarraygizmo.js            # 弧形阵列控制器
├── arcarrayparamscard.js       # 弧形阵列参数卡片
├── 维度标注 (20+)
│   ├── basedimension.js        # 基础维度
│   ├── furnituredimension.js   # 家具维度
│   ├── lightdimension.js       # 灯光维度
│   └── openingdimension.js     # 开洞维度
├── UI组件 (40+)
│   ├── contentbox.js           # 内容框
│   ├── radiocomponent.js       # 单选组件
│   ├── dropdown.js             # 下拉选择
│   └── tooltipwrapper.js       # 工具提示
└── 操作控件 (20+)
    ├── wfabase.js              # 控件基类
    ├── opmodel.js              # 模型操作
    ├── opviewcontrol.js        # 视图控制
    └── opsavedesign.js         # 保存设计
```
- **作用**: 3D操作工具和UI组件库
- **功能**: 维度标注、参数化阵列、操作控件

---

#### plugins-hs-aa8c4e59.bundle (28KB) - B2/B3业务
```
核心功能:
├── aida.js                     # AI设计助手
├── aplusmapping.js             # A+映射
├── B2层 (10+模块)
│   ├── b2content.js            # B2内容
│   ├── b2context.js            # B2上下文
│   ├── b2data.js               # B2数据
│   ├── b2design.js             # B2设计
│   ├── b2layer.js              # B2图层
│   ├── b2material.js           # B2材质
│   └── b2room.js               # B2房间
└── B3层 (5+模块)
    ├── b3concealedwork.js      # B3隐蔽工程
    ├── b3concealedworkcircuit.js    # 电路
    ├── b3concealedworkpowersystem.js # 电力系统
    └── b3concealedworktube.js       # 管道系统
│    - connectTubes()             │
- **作用**: B2/B3业务逻辑
- **功能**: 室内设计AI、隐蔽工程管理

---

#### plugins-hs-adc1df6b.bundle (43KB) - 装饰建模
```
核心功能:
├── logincomp.js                # 登录组件
├── propertybarhandler.js       # 属性栏处理器
├── 建模请求 (30+)
│   ├── addguidelinerequest.js  # 添加辅助线
│   ├── addopeningrequest.js    # 添加开洞
│   ├── addroofrequest.js       # 添加屋顶
│   ├── addsplitpointrequest.js # 添加分割点
│   └── addwallmoldingrequest.js # 添加墙线
├── 自动化服务
│   ├── autosaveservice.js      # 自动保存
│   ├── autoremotepersistertask.js
│   └── autolocalpersistertask.js
└── Gizmo控件 (5+)
    ├── addguidelinegizmo.js    # 辅助线控制器
    └── angleinputgizmo.js      # 角度输入控制器
```
- **作用**: 建模辅助工具
- **功能**: 属性栏、自动保存、Gizmo交互

---

#### plugins-hs-1625f76b.bundle (62KB) - AI功能
```
核心功能:
├── aicreatepage.js             # AI创建页面
├── aimaterialcontent.js        # AI材质内容
├── aimoodboarditem.js          # AI灵感板项目
├── aimoodboardpage.js          # AI灵感板页面
├── replaceutil.js              # 替换工具
├── snaptogusset.js             # 吸附到勒脚
└── UI组件 (30+)
    ├── carouselpanelnav.js     # 轮播导航
    ├── balloonpopup.js         # 气泡弹窗
    └── articleitem.js          # 文章项
```
- **作用**: AI智能设计功能
- **功能**: AI灵感板、智能替换

---

#### plugins-hs-205d0ccf.bundle (50KB) - 业务类型
```
核心功能:
├── actionmanager.js            # 动作管理器
├── app.js, appcontainer.js     # 应用容器
├── biztype.js                  # 业务类型
├── 请求系统 (15+)
│   ├── addbeamrequest.js       # 添加梁
│   ├── addstructurerequest.js  # 添加结构
│   └── applyaimoodboard.js     # 应用AI灵感板
└── UI组件 (20+)
    ├── articlepage.js          # 文章页面
    ├── authorizemanager.js      # 授权管理
    └── awaketypeenum.js        # 唤醒类型
```
- **作用**: 业务类型和动作管理
- **功能**: 结构建模、动作系统

---

#### plugins-hs-dd89ef02.bundle (54KB) - 线性装饰
```
核心功能:
├── cmdaddcatalogmolding.js     # 添加目录装饰线
├── cmdaddcustomizedlightslot.js # 添加自定义灯槽
├── createfreeformwall.js       # 创建自由墙体
├── usersettingdialog.js        # 用户设置对话框
├── 装饰策略 (5+)
│   ├── addlightbandstrategy.js     # 灯带策略
│   ├── addlightslotstrategy.js     # 灯槽策略
│   └── ncustomizedmolding2dstrategy.js # 自定义装饰线2D策略
└── UI组件 (20+)
    ├── button.js                   # 按钮
    ├── cardenum.js                 # 卡片枚举
    └── areacropper.js              # 区域裁剪器
```
- **作用**: 装饰建模工具
- **功能**: 装饰线、灯槽、自由墙体

---

#### plugins-hs-73381696.bundle (32KB) - 户外空间
```
核心功能:
├── createoutdoorspace.js       # 创建户外空间
├── 户外请求 (20+)
│   ├── addguidelinegizmo.js    # 添加辅助线
│   ├── addnewlayerrequest.js   # 添加新图层
│   ├── changelayerheightrequest.js # 改变图层高度
│   └── changeslabrequest.js    # 改变楼板
└── 绘制工具 (10+)
    ├── circle.js               # 圆形
    ├── backgroundedgedimension.js # 背景边缘维度
    └── background.js           # 背景
```
- **作用**: 户外空间创建工具
- **功能**: 户外场地设计、图层管理

---

### 6. 共享库/工具层 (12个vendor模块)

#### vendors-hs-08300445.bundle (43KB) - 颜色选择器
```
核心功能:
├── alpha.js, alphapicker.js        # 透明度选择器
├── chromepointer.js               # 色相指针
├── block.js, blockswatches.js     # 色块
├── chrome.js, chromefields.js     # 色相域
├── compact.js, compactcolor.js    # 紧凑颜色
└── actiontypes.js                 # 动作类型
```
- **作用**: 颜色选择组件库
- **来源**: 第三方颜色选择器

---

#### vendors-hs-4a14f9d1.bundle (68KB) - 图标字体
```
核心功能:
├── iconfontview.js               # 图标字体视图
├── buffer.js                     # 缓冲区
├── version.js, type.js           # 版本/类型工具
└── 图标模块 (20+)
```
- **作用**: 图标字体系统
- **功能**: 图标渲染、字体管理

---

#### vendors-hs-62716807.bundle (36KB) - 3D几何
```
核心功能 (50+模块):
├── epsilon.js                    # 精度处理
├── 几何算法
├── 向量计算
└── 空间变换
```
- **作用**: 3D几何计算库
- **功能**: 几何算法、空间计算

---

#### vendors-hs-79789954.bundle (48KB) - 约束系统
```
核心功能 (40+模块):
├── aabb.js                       # AABB包围盒
├── constraintlayout.js          # 约束布局
├── constrainttype.js            # 约束类型
├── bodyoperator.js              # 实体操作符
├── balconydata.js               # 阳台数据
└── 约束求解器
```
- **作用**: 布局约束求解器
- **功能**: 自动布局、约束求解

---

#### vendors-hs-934e91ba.bundle (27KB) - 剪裁工具
```
核心功能 (60+模块):
├── clipper.js, cliptype.js      # 剪裁器
├── b.js, module.js               # 基础模块
└── 多边形剪裁算法
```
- **作用**: 几何剪裁库
- **功能**: 多边形布尔运算、剪裁

---

#### vendors-hs-b1b7601c.bundle (27KB) - RxJS
```
核心功能 (50+模块):
├── action.js                     # Action
├── observable相关
│   ├── behavior.js              # BehaviorSubject
│   ├── asyncsubject.js          # AsyncSubject
│   └── observable.js            # Observable
└── scheduler相关 (10+)
    ├── asapscheduler.js          # ASAP调度器
    ├── asyncscheduler.js        # 异步调度器
    └── animationscheduler.js    # 动画调度器
```
- **作用**: RxJS响应式编程库
- **来源**: RxJS 5/6部分

---

#### vendors-hs-de83380f.bundle (67KB) - UI组件
```
核心功能 (80+模块):
├── iconprovider.js              # 图标提供者
├── innerslider.js                # 内部滑块
├── dots.js                       # 圆点指示器
└── UI滑块组件 (60+)
```
- **作用**: UI滑块组件库
- **功能**: 滑块、轮播等交互组件

---

#### vendors-hs-e4b8d09b.bundle (43KB) - 事件系统
```
核心功能 (15+模块):
├── module_onclick.js            # 点击事件
├── module_onmousedown.js        # 鼠标按下
├── module_onmouseenter.js       # 鼠标进入
└── 事件处理工具
```
- **作用**: 事件处理系统
- **功能**: 统一事件管理

---

### 其他vendor模块
- **vendors-hs-2266a6be** (40KB) - 图标系统
- **vendors-hs-68a5e2b0** (42KB) - 像素转换
- **vendors-hs-8bfb2d56** (51KB) - Three.js扩展
- **vendors-hs-92e795dd** (32KB) - 3D渲染工具
- **vendors-hs-b2c532f9** (18KB) - WebGL图形

---

### 7. 基础依赖层

**vendor.b6c5a6cb.bundle** (70KB)
```
核心功能:
├── encryptor.js                 # 加密器
├── interaction.js               # 交互
└── 基础工具 (20+模块)
```
- **作用**: 通用基础库
- **功能**: 加密、交互工具

---

## 三、模块依赖关系图

```
┌─────────────────────────────────────────────────────────┐
│                     应用入口层                              │
│                apploader.bundle                           │
└──────────────────────┬────────────────────────────────────┘
                       │ 加载
                       ▼
┌─────────────────────────────────────────────────────────┐
│                   应用主程序层                            │
│                   app-hs.bundle                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │  UI组件库    │  │  Three.js    │  │  国际化      │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└──────────────────────┬────────────────────────────────────┘
                       │ 依赖
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
┌─────────────┐ ┌───────────┐ ┌─────────────┐
│ hs.bundle   │ │core-hs    │ │vendor.bundle│
│ 平台核心     │ │建模引擎    │ │基础依赖      │
│(权限/认证)  │ │(几何/BIM)  │ │(加密/工具)   │
└──────┬──────┘ └─────┬─────┘ └─────────────┘
       │               │
       │ 依赖          │使用
       ▼               ▼
┌──────────────────────────────────────────────────┐
│            插件功能层 (8个插件)                     │
│  ┌──────┐┌──────┐┌──────┐┌──────┐┌──────┐┌─────┐│
│  │ DIY  ││操作  ││B2/B3 ││装饰  ││ AI  ││户外 ││
│  │工具  ││工具  ││业务  ││建模  ││功能 ││空间 ││
│  └──────┘└──────┘└──────┘└──────┘└──────┘└─────┘│
└──────────────────┬───────────────────────────────────┘
                   │ 使用
                   ▼
┌──────────────────────────────────────────────────┐
│        共享库/工具层 (12个vendor模块)              │
│  ┌────┐┌────┐┌────┐┌────┐┌────┐┌────┐┌────┐   │
│  │颜色 ││图标 ││3D  ││约束 ││剪裁 ││RxJS││UI  │   │
│  │选择 ││字体 ││几何 ││系统 ││工具 ││    ││组件 │   │
│  └────┘└────┘└────┘└────┘└────┘└────┘└────┘   │
└──────────────────────────────────────────────────┘
```

---

## 四、数据流向分析

```
用户交互
   │
   ▼
apploader (应用启动)
   │
   ▼
app-hs (主应用)
   │   ├─→ hs.bundle (权限认证)
   │   │     ├─→ 用户管理
   │   │     └─→ 权限验证
   │   │
   │   ├─→ core-hs (建模引擎)
   │   │     ├─→ 几何计算
   │   │     ├─→ BIM建模
   │   │     └─→ 约束求解
   │   │
   │   └─→ plugins-hs-* (功能插件)
   │         ├─→ plugins-hs-9fd2f87f (DIY工具)
   │         │     └─→ SVG导出
   │         │
   │         ├─→ plugins-hs-5c263204 (操作工具)
   │         │     └─→ 维度标注
   │         │
   │         ├─→ plugins-hs-aa8c4e59 (B2/B3)
   │         │     └─→ AI设计
   │         │
   │         └─→ 其他插件...
   │
   ▼
vendors-hs-* (共享库)
   │
   ├─→ vendors-hs-08300445 (颜色选择)
   ├─→ vendors-hs-4a14f9d1 (图标字体)
   ├─→ vendors-hs-62716807 (3D几何)
   ├─→ vendors-hs-79789954 (约束系统)
   ├─→ vendors-hs-934e91ba (剪裁工具)
   ├─→ vendors-hs-b1b7601c (RxJS)
   └─→ ...
```

---

## 五、关键技术栈

| 模块层 | 技术栈 | 主要库 |
|-------|--------|--------|
| 应用层 | React/Three.js | 自研UI框架 |
| 核心层 | 自研几何引擎 | BIM、参数化建模 |
| 插件层 | 插件架构 | 命令模式 |
| 工具层 | RxJS、WebGL | 第三方库集成 |

---

## 六、模块大小排序

```
1. core-hs.bundle      1.4MB  ⭐ 最大
2. vendor.bundle        70KB
3. vendors-hs-4a14f9d1  68KB
4. vendors-hs-de83380f  67KB
5. app-hs.bundle       113KB
6. plugins-hs-1625f76b  62KB
7. plugins-hs-9fd2f87f   59KB
8. plugins-hs-dd89ef02   54KB
9. plugins-hs-205d0ccf   50KB
10. plugins-hs-adc1df6b  43KB
11. plugins-hs-5c263204   46KB
12. plugins-hs-aa8c4e59   28KB
13. plugins-hs-73381696   32KB
...其他模块...
```

---

## 七、核心架构模式

### 1. 分层架构
```
入口 → 应用 → 平台 → 插件 → 工具
```

### 2. 插件化设计
- 8个独立插件模块
- 每个插件专注特定功能
- 插件间通过核心层通信

### 3. 模块化打包
- 按功能拆分bundle
- 共享库独立打包
- 按需加载优化

### 4. 共享库复用
- 12个vendor模块
- 多个插件共同使用
- 减少代码冗余

### 5. 依赖注入
- 插件层依赖核心层和工具层
- 核心层提供服务接口
- 工具层提供基础能力

---

## 八、系统特点总结

这是一个典型的**前端微前端+模块化BIM设计平台**架构，具有以下特点：

1. **核心引擎驱动**: 以几何建模引擎core-hs为核心
2. **插件化扩展**: 通过插件系统灵活扩展功能
3. **模块化设计**: 清晰的模块边界和职责划分
4. **共享库复用**: 第三方库和通用工具集中管理
5. **分层解耦**: 各层之间通过接口通信，降低耦合度

---

## 九、核心文件路径参考

```
dist/
├── app-hs.fe5726b7.bundle_dewebpack/
│   └── index.js
├── hs.fe5726b7.bundle_dewebpack/
│   └── index.js
├── core-hs.fe5726b7.bundle_dewebpack/
│   └── index.js
├── plugins-hs-*.fe5726b7.bundle_dewebpack/
│   └── index.js
└── vendors-hs-*.fe5726b7.bundle_dewebpack/
    └── index.js
```

---

## 十、后续分析建议

1. 深入core-hs模块的几何算法实现
2. 分析各插件间的通信机制
3. 研究参数化建模的具体实现
4. 探讨性能优化策略


---

## 十一、core-hs.bundle 完整架构深度分析

### 11.1 模块总览 (1.4MB, 500+模块)

```
core-hs.fe5726b7.bundle/
├── 几何基础层 (100+模块)
├── 建模对象层 (150+模块)
├── 约束系统层 (50+模块)
├── 材质渲染层 (40+模块)
├── 场景管理层 (60+模块)
├── 暗装工程系统 (30+模块) ⭐ 核心业务
├── 参数化建模 (40+模块)
└── 工具函数层 (30+模块)
```

---

### 11.2 暗装工程系统完整架构 (ConcealedWork)

#### 11.2.1 系统层级结构

```
Floorplan (楼层平面)
  │
  └─→ Scene (场景)
        │
        └─→ ActiveLayer (活动图层)
              │
              └─→ ConcealedWork (暗装工程) ⭐
                    │
                    ├─→ PowerSystem (电力系统)
                    │     │
                    │     ├─→ Circuit (电路) ×N
                    │     │     │
                    │     │     └─→ TubeTree (管线树)
                    │     │           │
                    │     │           ├─→ Tube (管段) ×N
                    │     │           └─→ Node (节点) ×N
                    │     │
                    │     ├─→ StrongElecComp (强电组件)
                    │     ├─→ WeakElecComp (弱电组件)
                    │     └─→ SwitchSocket (开关插座)
                    │
                    └─→ WaterComponents (水系统)
                          │
                          ├─→ HotWaterComp (热水组件)
                          ├─→ ColdWaterComp (冷水组件)
                          └─→ DrainPipe (排水管)
```

#### 11.2.2 核心类详细说明

##### A. ConcealedWork (暗装工程主类)
- **文件**: `concealedwork.js`
- **核心属性**: powerSystems[], waterComponents[]
- **核心方法**: addPowerSystem(), removePowerSystem(), getPowerSystemById(), getAllCircuits(), calculateTotalLoad()

##### B. ConcealedWorkPowerSystem (电力系统)
- **文件**: `concealedworkpowersystem.js` (行24-34)
- **核心属性**: circuits[], devices[]
- **核心方法**: addCircuit(), removeCircuit(), getCircuitById(), getAllDevices(), calculateCircuitLoad()

##### C. ConcealedWorkCircuit (电路)
- **文件**: `concealedworkcircuit.js` (行36-134)
- **核心属性**: routeTree (行45-48), devices[] (行66-72), circuitType (强电/弱电)
- **核心方法**: addDevice() (行91-99), removeDevice() (行100-108), updateRoute() (行109-134), getRouteLength()

##### D. ConcealedWorkTubeTree (管线树)
- **文件**: `concealedworktubetree.js`
- **核心属性**: tubes[], nodes[], rootNode
- **核心方法**: addTube(), addNode(), findPath(), optimizeRoute()

##### E. ConcealedWorkTube (管段)
- **文件**: `concealedworktube.js`
- **核心属性**: startNode, endNode, diameter, color, tubeType
- **颜色常量** (行50-54): 强电#FF9045, 弱电#396B9E, 热水#46FADC, 冷水#479F61
- **核心方法**: getMeshDefinition() (行205-209), updateGeometry() (行262-265), calculateLength(), intersectsWith()

##### F. ConcealedWorkNode (节点)
- **文件**: `concealedworknode.js`
- **核心属性**: position (行160), connectedTubes[], nodeType
- **核心方法** (行65-144): connectTube() (行65-77), disconnectTube() (行78-90), getParentNode() (行91-101), getChildNodes() (行102-115), isJunction() (行116-125), dirty()

##### G. TubeMeshCreator (网格生成器)
- **文件**: `tubemeshtypeenum.js`
- **管线类型枚举** (行21-28): straight(0), elecVertical(1), waterVertical(2), connectorT(3), other(4)
- **物理常量** (行36-39): elecPathR=0.1, waterPathR=0.03, waterTubeThickness=0.005, precision=1e-6
- **核心方法**:
  - createMesh() - 直管(行82-84), 电气弯头(行85-104), 水管弯头(行105-122), T型(行123-124)
  - calculateCrossArc() (行357-425) - 电线弧形避让算法
    - 步骤1: 计算安全间隙 (行361)
    - 步骤2: 检测交点 (行377)
    - 步骤3: 生成弧线 (行396)
    - 步骤4: 组装路径 (行418-422)
  - 缓存机制 (行49-50, 96-100, 115-119): _defaultElecCorner[], _defaultWaterCorner[]

---

### 11.3 暗装工程工作流程图

#### 11.3.1 电路创建流程

```
用户操作: 点击"添加电路"
  │
  ▼
PowerSystem.addCircuit()
  │
  ├─→ 创建Circuit实例
  │     │
  │     └─→ Circuit.constructor()
  │           │
  │           └─→ 初始化routeTree
  │
  ├─→ 添加设备
  │     │
  │     └─→ Circuit.addDevice(device)
  │           │
  │           └─→ devices.push(device)
  │
  └─→ 自动布线
        │
        └─→ Circuit.updateRoute()
              │
              ├─→ TubeTree.findPath(from, to)
              │     │
              │     └─→ A*路径规划算法
              │
              ├─→ TubeTree.addTube(start, end)
              │     │
              │     ├─→ 创建Tube实例
              │     ├─→ 设置颜色 (强电#FF9045)
              │     └─→ 生成网格
              │
              └─→ 避障处理
                    │
                    └─→ TubeMeshCreator.calculateCrossArc()
                          │
                          ├─→ 检测障碍物交点
                          ├─→ 生成弧形避让路径
                          └─→ 更新Tube几何
```

#### 11.3.2 水管创建流程

```
用户操作: 点击"添加水管"
  │
  ▼
ConcealedWork.addWaterComponent()
  │
  ├─→ 创建HotWaterComp/ColdWaterComp
  │
  ├─→ 添加管段
  │     │
  │     └─→ TubeTree.addTube(start, end, waterVertical)
  │           │
  │           ├─→ 创建Tube实例
  │           ├─→ 设置颜色 (热水#46FADC 或 冷水#479F61)
  │           └─→ 生成正交弯头网格
  │
  └─→ 自动布线
        │
        └─→ Circuit.updateRoute()
              │
              ├─→ TubeTree.findPath(from, to)
              │     │
              │     └─→ Manhattan距离算法 (正交路径)
              │
              └─→ TubeMeshCreator.createWaterBendMesh()
                    │
                    ├─→ Line3d: Vector3.Y(30mm) → Vector3.O()
                    ├─→ Line3d: Vector3.O() → Vector3.X(30mm)
                    └─→ 组合成90度弯头
```

#### 11.3.3 避让系统决策树

```
检测到管线交叉
  │
  ▼
判断组件类型 (concealedworktube.js:205-209)
  │
  ├─→ 检测到CWStrongElecComp/CWWeakElecComp?
  │     │
  │     └─→ YES: 使用电线弧形避让
  │           │
  │           ├─→ tubeType = elecVertical
  │           ├─→ pathR = 0.1 (100mm)
  │           ├─→ 调用calculateCrossArc()
  │           │     │
  │           │     ├─→ 计算安全间隙: 1.2×diameter
  │           │     ├─→ 检测交点
  │           │     ├─→ 生成Arc3d弧线
  │           │     └─→ 路径: 直线+弧+直线+弧+直线
  │           │
  │           └─→ 生成弧形网格 (tubemeshtypeenum.js:85-104)
  │
  └─→ 检测到CWHotWaterComp/CWColdWaterComp?
        │
        └─→ YES: 使用水管正交避让
              │
              ├─→ tubeType = waterVertical
              ├─→ pathR = 0.03 (30mm)
              ├─→ 
5. 分析Three.js集成方式

生成多个90度弯头组合
              │
              └─→ 生成正交网格 (tubemeshtypeenum.js:105-122)
```

---

### 11.4 障碍物检测系统

#### 11.4.1 障碍物类层级

```
Obstacle (基础障碍物)
  │
  ├─→ 文件: obstacle.js (行104-236)
  ├─→ 继承: CustomizedModel
  │
  ├─→ 核心属性
  │     ├─→ geometry: Polygon2d         # 2D多边形
  │     ├─→ height: number              # 高度
  │     ├─→ moldings: Molding[]         # 装饰线
  │     └─→ avoidanceZone: AABB         # 避让区域
  │
  └─→ 核心方法
        ├─→ containsPoint(pt): boolean
        ├─→ intersectsPath(path): boolean
        └─→ getMoldingGeometry(): Geometry

SubObstacle (精细障碍物)
  │
  ├─→ 文件: subobstacle.js (行2350-2441)
  ├─→ 用途: 家具、橱柜等精细避让
  │
  └─→ 核心方法
        └─→ clipPolygon(path, obstacles): Path
              │
              ├─→ 使用ClipperLib进行多边形裁剪
              ├─→ 操作: ClipType.diff (差集)
              └─→ 返回: 避让后的路径
```

#### 11.4.2 避让算法执行流程

```
管线布线请求
  │
  ▼
TubeTree.findPath(from, to)
  │
  ├─→ 步骤1: 获取所有障碍物
  │     │
  │     └─→ Scene.getObstacles()
  │           │
  │           ├─→ 墙体 (Wall)
  │           ├─→ 门窗 (Door/Window)
  │           ├─→ 家具 (Furniture)
  │           ├─→ 橱柜 (Cabinet)
  │           └─→ 结构柱 (Column)
  │
  ├─→ 步骤2: 初步路径规划
  │     │
  │     └─→ A*算法 (电线) / Manhattan算法 (水管)
  │
  ├─→ 步骤3: 碰撞检测
  │     │
  │     └─→ 遍历每段Tube
  │           │
  │           └─→ 检查与障碍物交集
  │                 │
  │                 ├─→ MathAlg.CalculateIntersect.curve3ds()
  │                 └─→ 记录交点列表
  │
  ├─→ 步骤4: 避让策略选择
  │     │
  │     ├─→ 电线类型?
  │     │     │
  │     │     └─→ YES: calculateCrossArc()
  │     │           │
  │     │           ├─→ 对交点分组 (距离阈值: 3×diameter²)
  │     │           ├─→ 为每组生成弧形绕行
  │     │           └─→ 更新路径为: Line+Arc+Line...
  │     │
  │     └─→ 水管类型?
  │           │
  │           └─→ YES: 生成正交绕行
  │                 │
  │                 ├─→ 添加额外waterVertical弯头
  │                 └─→ 更新路径为: Line+90°+Line+90°...
  │
  └─→ 步骤5: 精细裁剪 (可选)
        │
        └─→ SubObstacle.clipPolygon()
              │
              └─→ 使用ClipperLib布尔运算
```

---

### 11.5 网格生成与渲染

#### 11.5.1 直管段网格生成

```javascript
// tubemeshtypeenum.js:82-84
function createStraightMesh(start, end, diameter) {
  // 1. 定义截面 (圆形)
  let profile = Circle2d.create(diameter / 2)
  
  // 2. 定义路径 (直线)
  let path = Line3d.create(start, end)
  
  // 3. 扫描生成实体
  let mesh = BodyBuilder.sweepByCurve2ds(profile, path)
  
  return mesh
}
```

#### 11.5.2 电气弯头网格生成

```javascript
// tubemeshtypeenum.js:85-104
function createElecBendMesh(diameter, pathR) {
  // 缓存检查 (行96-100)
  let cacheKey = `${diameter}_${pathR}`
  if (_defaultElecCorner[cacheKey]) {
    return _defaultElecCorner[cacheKey]
  }
  
  // 1. 定义截面
  let profile = Circle2d.create(diameter / 2)
  
  // 2. 定义弧形路径
  let arc = Arc3d.create(
    Vector3.O(),           // 起点
    Vector3.Y(pathR),      // 中点
    Vector3.X(pathR)       // 终点
  )
  
  // 3. 扫描生成弯头
  let mesh = BodyBuilder.sweepByCurve2ds(profile, arc)
  
  // 4. 缓存
  _defaultElecCorner[cacheKey] = mesh
  
  return mesh
}
```

#### 11.5.3 水管弯头网格生成

```javascript
// tubemeshtypeenum.js:105-122
function createWaterBendMesh(diameter, pathR) {
  // 缓存检查 (行115-119)
  let cacheKey = diameter
  if (_defaultWaterCorner[cacheKey]) {
    return _defaultWaterCorner[cacheKey]
  }
  
  // 1. 定义截面
  let profile = Circle2d.create(diameter / 2)
  
  // 2. 定义正交路径 (两段Line3d)
  let path = [
    Line3d.create(Vector3.O(), Vector3.Y(pathR)),  // 垂直段 (行112)
    Line3d.create(Vector3.Y(pathR), Vector3.X(pathR).add(Vector3.Y(pathR)))  // 水平段 (行113)
  ]
  
  // 3. 扫描生成弯头
  let mesh = BodyBuilder.sweepByCurve2ds(profile, path)
  
  // 4. 缓存
  _defaultWaterCorner[cacheKey] = mesh
  
  return mesh
}
```

#### 11.5.4 渲染管线

```javascript
// 渲染流程
function renderTube(tube) {
  // 1. 获取网格定义
  let meshDef = tube.getMeshDefinition()
  
  // 2. 创建THREE.js几何体
  let geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(meshDef.vertices, 3))
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(meshDef.normals, 3))
  geometry.setIndex(meshDef.indices)
  
  // 3. 创建材质
  let material = new THREE.MeshPhongMaterial({
    color: tube.color,  // 强电#FF9045 或 热水#46FADC
    side: THREE.DoubleSide
  })
  
  // 4. 创建Mesh并添加到场景
  let mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
}
```

---

### 11.6 性能优化策略

#### 11.6.1 缓存机制

```
网格缓存:
├─→ _defaultElecCorner[]    # 电气弯头缓存
│     └─→ Key: `${diameter}_${pathR}`
│     └─→ 避免重复生成相同尺寸弯头
│
└─→ _defaultWaterCorner[]   # 水管弯头缓存
      └─→ Key: `${diameter}`
      └─→ 水管固定30mm段长，只需缓存直径
```

#### 11.6.2 增量更新

```
Node.dirty() 机制:
├─→ 节点移动时标记dirty
├─→ 仅更新连接的Tube
├─→ 传播到子节点
└─→ 避免全场景重算
```

#### 11.6.3 碰撞检测优化

```
两阶段检测:
├─→ 粗检测: AABB包围盒快速排除
└─→ 精检测: 仅对可能相交的执行精确算法
```

#### 11.6.4 LOD (细节层次)

```
根据视距调整网格精度:
├─→ 近景: 完整网格 (32段圆)
├─→ 中景: 简化网格 (16段圆)
└─→ 远景: 简化为线段
```

---

### 11.7 数据持久化

#### 11.7.1 Entity系统

```javascript
// 所有类继承Entity
class ConcealedWorkNode extends Entity {
  @EntityField() position: Vector3
  @EntityField() connectedTubes: Tube[]
  
  // Entity提供的方法
  toJSON(): object      // 序列化
  fromJSON(data): void  // 反序列化
  clone(): Entity       // 克隆
}
```

#### 11.7.2 保存格式

```json
{
  "concealedWork": {
    "powerSystems": [
      {
        "id": "ps_001",
        "circuits": [
          {
            "id": "circuit_001",
            "type": "strongElec",
            "routeTree": {
              "tubes": [
                {
                  "id": "tube_001",
                  "startNode": "node_001",
                  "endNode": "node_002",
                  "diameter": 0.02,
                  "color": 16735045,
                  "tubeType": 1
                }
              ],
              "nodes": [
                {
                  "id": "node_001",
                  "position": [0, 0, 2.4]
                }
              ]
            }
          }
        ]
      }
    ]
  }
}
```

---

### 11.8 扩展点与插件接口

#### 11.8.1 自定义管线类型

```javascript
// 扩展新的管线类型
class CustomTubeType extends ConcealedWorkTube {
  @EntityField() customProperty: any
  
  // 重写网格生成
  getMeshDefinition() {
    return TubeMeshCreator.createMesh(
      TubeMeshTypeEnum.other,
      this.getCustomParams()
    )
  }
}
```

#### 11.8.2 自定义避让策略

```javascript
// 注册自定义避让算法
AvoidanceRegistry.register('custom', (tube, obstacles) => {
  // 自定义避让逻辑
  return customAvoidancePath
})
```

---

### 11.9 核心算法详解

#### 11.9.1 calculateCrossArc 算法详解

```javascript
// tubemeshtypeenum.js:357-425
function calculateCrossArc(e) {
  // ========== 第一阶段: 预处理 ==========
  // 行361: 计算安全间隙
  let n = 1.2 * e.diameter  // 20%余量
  
  // 行364-376: 过滤待检测对象
  let validObjects = e.objects.filter(obj => {
    return obj.type === 'LINE_3D' &&  // 仅处理直线段
           obj.id !== e.currentId      // 排除自身
  })
  
  // ========== 第二阶段: 交点检测 ==========
  // 行377: 检测所有交点
  let intersections = MathAlg.CalculateIntersect.curve3ds(
    e.baseLine,      // 当前管线基准线
    validObjects,    // 待检测对象
    precision        // 1e-6精度
  )
  
  if (intersections.length === 0) {
    return e.baseLine  // 无交叉，返回原路径
  }
  
  // ========== 第三阶段: 交点分组 ==========
  // 行401-408: 按距离分组
  let groups = []
  let threshold = 3 * e.diameter * e.diameter  // 距离阈值
  
  for (let point of intersections) {
    let foundGroup = false
    for (let group of groups) {
      if (point.distanceTo(group.center) < threshold) {
        group.points.push(point)
        group.center = calculateCenter(group.points)
        foundGroup = true
        break
      }
    }
    if (!foundGroup) {
      groups.push({points: [point], center: point})
    }
  }
  
  // ========== 第四阶段: 生成弧线 ==========
  let resultPath = []
  let currentPos = e.baseLine.start
  
  for (let group of groups) {
    // 行396: 为每组生成避让弧线
    let arcStart = currentPos
    let arcMid = group.center.add(Vector3.Z(n))  // 垂直抬高
    let arcEnd = group.points[group.points.length - 1].add(
      e.baseLine.direction.multiplyScalar(n)
    )
    
    // 生成Arc3d
    let arc = Arc3d.makeArcByThreePoints(arcStart, arcMid, arcEnd)
    
    resultPath.push(arc)
    currentPos = arcEnd
  }
  
  // ========== 第五阶段: 路径组装 ==========
  // 行418-422: 组装最终路径
  let finalPath = []
  finalPath.push(Line3d.create(e.baseLine.start, resultPath[0].start))
  
  for (let i = 0; i < resultPath.length; i++) {
    finalPath.push(resultPath[i])
    if (i < resultPath.length - 1) {
      finalPath.push(Line3d.create(resultPath[i].end, resultPath[i+1].start))
    }
  }
  
  
