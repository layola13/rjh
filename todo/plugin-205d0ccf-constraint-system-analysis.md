
# plugins-hs-205d0ccf 约束系统插件 - 完整分析

> **插件ID**: plugins-hs-205d0ccf.fe5726b7.bundle  
> **文件数**: 778个  
> **核心功能**: 约束系统、墙体绘制、结构编辑、捕捉辅助  
> **分析日期**: 2026-01-24

---

## 📊 1. 插件规模统计

### 1.1 总体概况

| 指标 | 数值 | 说明 |
|------|------|------|
| **总文件数** | 778 | plugins-hs系列中最大的插件 |
| **代码行数(估)** | ~31,000行 | 基于文件数估算 |
| **命令类** | 22个 | Cmd开头的命令类 |
| **Gizmo交互类** | 4个 | 2D交互图形控制器 |
| **辅助工具类** | 5个 | Helper/Util工具类 |
| **UI组件** | 17个 | React组件(Container/Panel/Bar) |
| **React组件总数** | 84个 | 包含所有React.createElement的文件 |
| **样式/配置模块** | 576个 | module_*.js文件 |
| **其他文件** | 70个 | 枚举、接口、工具等 |

### 1.2 功能模块分类

```
plugins-hs-205d0ccf/ (778文件)
├── 命令系统 (22文件, 2.8%)
│   ├── 墙体绘制命令 (3个)
│   ├── 结构操作命令 (10个)
│   ├── 其他命令 (9个)
├── Gizmo交互 (4文件, 0.5%)
│   └── 2D绘图交互控制器
├── 辅助工具 (5文件, 0.6%)
│   ├── 约束辅助 (ConstraintHelper)
│   ├── 捕捉辅助 (SnapHelper)
│   └── 几何辅助
├── UI组件 (84文件, 10.8%)
│   ├── 容器组件 (17个)
│   ├── React功能组件 (67个)
└── 配置/样式 (576文件, 74.0%)
    └── Webpack模块化样式和配置
```

---

## 🎯 2. 核心功能分析

### 2.1 约束系统 (ConstraintHelper)

#### 功能定位
**文件**: [`constrainthelper.js`](dist/plugins-hs-205d0ccf.fe5726b7.bundle_dewebpack/constrainthelper.js:128)  
**Module ID**: 223024

#### 核心类定义
```typescript
class ConstraintHelper {
  // 单例模式
  private static _instance: ConstraintHelper;
  
  static getInstance(): ConstraintHelper {
    if (!this._instance) {
      this._instance = new ConstraintHelper();
    }
    return this._instance;
  }
  
  // 获取相关约束
  getRelatedConstraint(snapResult, constraints): Constraint {
    // 从约束列表中找出与捕捉结果相关的唯一约束
    // 处理共线约束的特殊情况
  }
  
  // 执行约束
  execute(constraint, offset): JSON {
    // 将约束转换为JSON格式并合并偏移量
    // 返回包含 dx, dy, drotation, center 的对象
  }
  
  // 检查约束唯一性
  private _isUnique(constraint1, constraint2): boolean {
    // 检查两个约束是否冲突
    // 基于位移(dx, dy)和旋转(drotation)的容差判断
  }
}
```

#### 依赖关系
```
ConstraintHelper
├── 依赖 → SnapResultType (捕捉结果类型)
├── 依赖 → Tolerance (几何容差)
├── 使用 → 几何对象 (Line2d, Arc2d等)
└── 被使用 ← 墙体绘制命令
```

### 2.2 捕捉几何系统 (SnapGeometry)

#### 功能定位
**文件**: [`arcsnapgeometry.js`](dist/plugins-hs-205d0ccf.fe5726b7.bundle_dewebpack/arcsnapgeometry.js:163)  
**Module ID**: 835775

#### 类继承体系
```typescript
// 基类
abstract class SnapGeometry {
  from: Entity;              // 来源实体
  type: SnapGeomType;        // 捕捉类型
  relatedGeometries: [];     // 关联几何
  
  getID(): string;
  setupRelationShip(geometries): void;
}

// 派生类
class PointSnapGeometry extends SnapGeometry {
  geo: Point2d;
  getRelatedLineGeometry(): LineSnapGeometry[];
}

class LineSnapGeometry extends SnapGeometry {
  geo: Line2d;
}

class CircleSnapGeometry extends SnapGeometry {
  geo: Circle2d;
}

class ArcSnapGeometry extends SnapGeometry {
  geo: Arc2d;
}
```

#### 捕捉类型枚举
```typescript
enum SnapGeomType {
  CenterPoint = 1,    // 中心点
  CornerPoint = 2,    // 角点
  CenterLine = 3,     // 中心线
  LineEdge = 4,       // 线边缘
  CircleEdge = 5,     // 圆边缘
  ArcEdge = 6         // 圆弧边缘
}
```

#### 几何提取工厂 (SnapGeomHelper)
```typescript
class SnapGeomHelper {
  private static _instance: SnapGeomHelper;
  
  // 从场景提取所有捕捉几何
  extract(scene): SnapGeometry[] {
    // 从墙体/结构/梁/孔/房间提取捕捉点和线
  }
  
  // 从墙体提取
  extractFromWall(wall): SnapGeometry[] {
    // 提取角点、中心点、边线、中心线
    // 处理直墙和弧墙的不同情况
  }
  
  // 从结构提取
  extractFromStructure(structure): SnapGeometry[] {
    // 支持方柱、圆柱、烟道、立管、插座
  }
  
  // 从梁提取
  extractFromBeam(beam): SnapGeometry[];
  
  // 从孔洞提取
  extractFromHole(hole): SnapGeometry[];
  
  // 从房间提取
  extractFromRoom(room, options): SnapGeometry[];
}
```

### 2.3 尺寸标注系统 (Dimension)

#### 功能定位
**文件**: [`dimension.js`](dist/plugins-hs-205d0ccf.fe5726b7.bundle_dewebpack/dimension.js:70)  
**Module ID**: 302716

#### 核心类定义
```typescript
class Dimension {
  // 默认设置
  static defaultSetting = {
    offset: 24,           // 标注偏移距离
    offsetByScreen: true  // 按屏幕坐标偏移
  };
  
  // 属性
  private _context: Context;
  private _props: DimensionProps;
  private _pathItem: PathItem;           // 标注线
  private _pathShadowItem: PathItem;     // 阴影线
  private _inputObj: InputWrapper;       // 输入框/文本
  private _curve: Curve2d;               // 标注曲线
  private _setting: DimensionSetting;
  private _inputPosition: Vector2;
  private _isShow: boolean;
  
  // 方法
  updateData(data: {curve, offset, max}): void;
  updateProps(props): void;
  setInvalid(invalid: boolean): void;
  
  focus(): void;
  blur(): void;
  show(): void;
  hide(): void;
  
  // 静态方法
  static sort(dimensions: Dimension[]): void;
  static getNextDimension(dimensions, current): Dimension;
}
```

#### 输入框包装器
```typescript
class InputWrapper {
  inputComponent: InputBoxComp;   // 可编辑输入框
  textItem: TextItem;             // 只读文本
  private _editable: boolean;
  
  setEditable(editable, visible): void;
  show(): void;
  hide(): void;
}
```

---

## 🏗️ 3. 命令系统详细分析

### 3.1 墙体绘制命令 (3个)

#### CmdCreateTgWall - 单段墙绘制
**文件**: [`cmdcreatetgwall.js`](dist/plugins-hs-205d0ccf.fe5726b7.bundle_dewebpack/cmdcreatetgwall.js)

```typescript
class CmdCreateTgWall extends Command {
  // 绘制单段墙体(直线或圆弧)
  
  private _gizmo: CreateTgWallGizmo;
  private _snapHelper: SnapHelper;
  private _pos: Point2d;           // 当前鼠标位置
  private _start: Point2d;         // 起点
  private _end: Point2d;           // 终点
  
  // 核心方法
  onExecute(): void;               // 初始化命令
  onReceive(event, data): boolean; // 处理鼠标/键盘事件
  doRequest(curves): void;         // 提交墙体创建请求
  updateSetting(settings): void;   // 更新墙体设置
  
  getDescription(): string { return "画墙"; }
}
```

**功能特点**:
- ✅ 支持直线墙和圆弧墙
- ✅ 实时预览
- ✅ 捕捉辅助 (SnapHelper)
- ✅ 尺寸标注 (Dimension)
- ✅ 墙体模式切换 (内侧/中线/外侧)
- ✅ 快捷键支持 (SPACE切换模式, ESC取消)

#### CmdCreateRectTgWall - 矩形房间绘制
**文件**: [`cmdcreaterecttgwall.js`](dist/plugins-hs-205d0ccf.fe5726b7.bundle_dewebpack/cmdcreaterecttgwall.js:52)  
**Module ID**: 271945

```typescript
class CmdCreateRectTgWall extends Command {
  // 绘制矩形房间 (4段墙)
  
  private _gizmo: CreateRectTgWallGizmo;
  private _snapHelper: SnapHelper;
  private _pos: Point2d;
  private _start: Point2d;
  private _end: Point2d;
  private _posItem: EndPointItem;      // 当前点显示
  private _startItem: EndPointItem;    // 起点显示
  private _noActionItem: EndPointItem; // 无动作提示
  private 
_activeDimension: Dimension;
  
  // 核心方法
  onExecute(): void;
  onMouseMove(event): void;
  onClick(event): void;
  
  private _setPos(point, type, event): void;
  private _setStart(point): void;
  private _setEnd(point): void;
  private _next(point): void;        // 下一步
  private _back(): void;             // 返回上一步
  private _finish(point): void;      // 完成绘制
  private _commit(curves): void;     // 提交创建请求
  
  getDescription(): string { return "画房间"; }
}
```

**功能特点**:
- ✅ 两点确定矩形房间
- ✅ 实时尺寸标注 (顶部+左侧)
- ✅ Tab键切换焦点尺寸
- ✅ Enter键确认输入
- ✅ 支持精确数值输入
- ✅ 自动捕捉对齐

#### CmdCreatePolygonTgWall - 多边形房间绘制
**文件**: [`cmdcreatepolygontgwall.js`](dist/plugins-hs-205d0ccf.fe5726b7.bundle_dewebpack/cmdcreatepolygontgwall.js:52)  
**Module ID**: 573727

```typescript
class CmdCreatePolygonTgWall extends Command {
  // 绘制任意多边形房间
  
  polygon: Polygon;
  private _gizmo: CreatePolygonTgWallGizmo;
  
  // 核心方法
  onExecute(): void;
  onReceive(event, data): boolean;
  doRequest(curves): void;
  createGizmo(): void;
  updateSetting(settings): void;
  
  getDescription(): string { return "画多边形房间"; }
}
```

**功能特点**:
- ✅ 多点绘制多边形
- ✅ 自动闭合
- ✅ Space键旋转
- ✅ 支持内/中/外墙模式

### 3.2 结构操作命令 (10个)

#### 结构添加/删除
| 命令类 | 文件 | 功能 | 操作对象 |
|--------|------|------|---------|
| **CmdAddStructure** | cmdaddstructure.js | 添加结构 | 柱/烟道/立管 |
| **CmdDeleteStructure** | cmddeletestructure.js | 删除结构 | 结构实体 |
| **CmdDeleteBeam** | cmddeletebeam.js | 删除梁 | 梁实体 |

#### 结构变换
| 命令类 | 文件 | 功能 | 变换类型 |
|--------|------|------|---------|
| **CmdMoveStructure** | cmdmovestructure.js | 移动结构 | 平移 |
| **CmdMoveBeam** | cmdmovebeam.js | 移动梁 | 平移 |
| **CmdRotateStructure** | cmdrotatestructure.js | 旋转结构 | 旋转 |
| **CmdRotateBeam** | cmdrotatebeam.js | 旋转梁 | 旋转 |
| **CmdResizeStructure** | cmdresizestructure.js | 调整结构大小 | 缩放 |
| **CmdResizeBeam** | cmdresizebeam.js | 调整梁大小 | 缩放 |

#### CmdMoveStructure 代码示例
```typescript
class CmdMoveStructure extends Command {
  structure: Structure;
  targetPosition: Point2d;
  mouseBeginPoint: Point2d;
  private _request: Request;
  
  onExecute(): void {
    // 开始拖拽，设置拖拽标志
    this.structure.setFlagOn(StructureFlagEnum.dragOn, true);
    
    // 创建移动请求
    this._request = this.transMgr.createRequest(
      RequestType.MoveStructure,
      [this.structure, this.mouseBeginPoint]
    );
    
    // 如果有目标位置，直接移动
    if (this.targetPosition) {
      this.onReceive("moveto", { position: this.targetPosition });
    }
  }
  
  onReceive(event, data): boolean {
    if (event === "moveto") {
      // 更新结构位置
      // 提交事务
    }
  }
}
```

#### 结构模式切换
| 命令类 | 文件 | 功能 |
|--------|------|------|
| **CmdChangeStructureMode** | cmdchangestructuremode.js | 切换结构编辑模式 |
| **CmdChangeBeamType** | cmdchangebeamtype.js | 切换梁类型 |

#### 复制粘贴
| 命令类 | 文件 | 功能 |
|--------|------|------|
| **CmdCopyPasteStructure** | cmdcopypastestructure.js | 复制粘贴结构 |
| **CmdCopyPasteBeam** | cmdcopypastebeam.js | 复制粘贴梁 |

### 3.3 其他命令 (9个)

| 命令类 | 文件 | 功能 | 用途 |
|--------|------|------|------|
| **CmdSelectSingleRoom** | cmdselectsingleroom.js | 选择单个房间 | 房间选择 |
| **CmdToggleCeilingVisibility** | cmdtoggleceilingvisibility.js | 切换天花可见性 | 视图控制 |
| **CmdElevationSelect** | cmdelevationselect.js | 立面选择 | 立面视图 |
| **CmdInspirationAction** | cmdinspirationaction.js | 灵感图操作 | AI设计 |
| **CmdSaveOriginDesign** | cmdsaveorigindesign.js | 保存原始设计 | 设计保存 |

---

## 🎮 4. Gizmo交互系统

### 4.1 Gizmo类继承体系

```
Gizmo (基类, 来自core-hs)
├── CreateTgWallGizmo          # 单段墙绘制交互
├── CreateRectTgWallGizmo      # 矩形房间绘制交互
├── CreatePolygonTgWallGizmo   # 多边形房间绘制交互
└── GizmoFactory               # Gizmo工厂类
```

### 4.2 CreateRectTgWallGizmo

**文件**: [`createrecttgwallgizmo.js`](dist/plugins-hs-205d0ccf.fe5726b7.bundle_dewebpack/createrecttgwallgizmo.js)

```typescript
class CreateRectTgWallGizmo extends Gizmo {
  // 矩形墙体绘制的2D交互控制器
  
  topDimension: Dimension;      // 顶部尺寸标注
  leftDimension: Dimension;     // 左侧尺寸标注
  pointData: {start, end};      // 起点和终点数据
  
  signal: Signal;               // 事件信号
  
  // 核心方法
  draw(): void;                 // 绘制矩形预览
  onWallSettingChanged(): void; // 墙体设置变化
  dirtyGraph(): void;           // 标记需要重绘
  getModeCurves(mode, end): Curve2d[]; // 获取指定模式的曲线
  
  // 尺寸更新
  private _updateDimensions(start, end): void;
}
```

**交互流程**:
```
1. 用户点击起点 → _setStart()
2. 移动鼠标 → onMouseMove()
   ↓
3. 实时更新 → pointData = {start, end}
   ↓
4. Gizmo绘制矩形预览
   ↓
5. 更新尺寸标注 (topDimension, leftDimension)
   ↓
6. 用户点击终点 → _finish()
   ↓
7. 计算墙体曲线 → getModeCurves()
   ↓
8. 提交创建请求 → _commit(curves)
```

### 4.3 CreateTgWallGizmo

**文件**: [`createtgwallgizmo.js`](dist/plugins-hs-205d0ccf.fe5726b7.bundle_dewebpack/createtgwallgizmo.js)

```typescript
class CreateTgWallGizmo extends Gizmo {
  // 单段墙绘制的2D交互控制器
  
  lineDimension: Dimension;       // 直线尺寸
  curveDimension: Dimension;      // 曲线长度
  archHeightDimension: Dimension; // 弧高尺寸
  
  wallWidth: number;
  
  // 支持直线墙和圆弧墙
  draw(): void;
  rotate(): void;                 // 旋转墙体方向
  onWallSettingChanged(): void;
}
```

**支持的墙体类型**:
- 直线墙: 显示lineDimension
- 圆弧墙: 显示curveDimension + archHeightDimension

### 4.4 CreatePolygonTgWallGizmo

**文件**: [`createpolygontgwallgizmo.js`](dist/plugins-hs-205d0ccf.fe5726b7.bundle_dewebpack/createpolygontgwallgizmo.js)

```typescript
class CreatePolygonTgWallGizmo extends Gizmo {
  // 多边形房间绘制的2D交互控制器
  
  points: Point2d[];           // 多边形顶点列表
  curves: Curve2d[];           // 边线列表
  
  // 核心方法
  addPoint(point): void;       // 添加顶点
  removeLastPoint(): void;     // 删除最后一个顶点
  complete(): void;            // 完成绘制
  rotate(): void;              // 旋转整个多边形
  
  // 信号
  signal.dispatch({curves});   // 发送绘制完成信号
}
```

### 4.5 GizmoFactory

**文件**: [`gizmofactory.js`](dist/plugins-hs-205d0ccf.fe5726b7.bundle_dewebpack/gizmofactory.js)

```typescript
class GizmoFactory {
  // Gizmo创建工厂
  
  static createWallGizmo(context, layer, cmd): CreateTgWallGizmo;
  static createRectWallGizmo(context, layer, cmd): CreateRectTgWallGizmo;
  static createPolygonWallGizmo(context, layer, cmd): CreatePolygonTgWallGizmo;
}
```

---

## 🔧 5. 辅助工具系统

### 5.1 SnapHelper - 捕捉辅助

**文件**: [`snaphelper.js`](dist/plugins-hs-205d0ccf.fe5726b7.bundle_dewebpack/snaphelper.js)

```typescript
class SnapHelper {
  // 智能捕捉辅助系统
  
  prePoint: Point2d;           // 前一个点(用于捕捉参考)
  dimensions: Dimension[];     // 捕捉尺寸标注
  signal: Signal;              // 捕捉事件信号
  
  // 核心方法
  snap(point, step): SnapResult;
  // 捕捉到最近的几何特征(点/线/角度)
  // 返回捕捉结果(类型、偏移量、约束)
  
  refreshForMovePoint(walls): void;
  // 刷新捕捉几何数据
  
  show(): void;
  hide(): void;
  clearFirstData(): void;
}
```

**捕捉类型**:
- 端点捕捉 (EndPoint)
- 中点捕捉 (MidPoint)
- 垂直捕捉 (Perpendicular)
- 平行捕捉 (Parallel)
- 相切捕捉 (Tangent)
- 共线捕捉 (Collinear)
- 角度捕捉 (Angle: 0°, 45°, 90°等)

### 5.2 
DrawPolygonRoomSnapHelper

**文件**: [`drawpolygonroomsnaphelper.js`](dist/plugins-hs-205d0ccf.fe5726b7.bundle_dewebpack/drawpolygonroomsnaphelper.js)

```typescript
class DrawPolygonRoomSnapHelper {
  // 多边形房间绘制的捕捉辅助
  
  _snap(point, options): SnapResult;
  // 专门为多边形绘制优化的捕捉算法
}
```

### 5.3 SubLineHelper - 子线辅助

**文件**: [`sublinehelper.js`](dist/plugins-hs-205d0ccf.fe5726b7.bundle_dewebpack/sublinehelper.js)

```typescript
class SubLineHelper {
  // 墙体子线段辅助工具
  
  getSubLines(wall): Line2d[];
  // 获取墙体的所有子线段
  // 用于精确捕捉和编辑
}
```

### 5.4 SmartLayoutUtil - 智能布局工具

**文件**: [`smartlayoututil.js`](dist/plugins-hs-205d0ccf.fe5726b7.bundle_dewebpack/smartlayoututil.js)

```typescript
class SmartLayoutUtil {
  // 智能布局辅助
  
  static optimizeLayout(elements): Layout;
  // 自动优化元素布局
}
```

---

## 🎨 6. UI组件系统

### 6.1 主要容器组件 (17个)

#### 核心容器

| 组件名 | 文件 | 功能 | 技术栈 |
|--------|------|------|--------|
| **AppContainer** | appcontainer.js | 应用主容器 | React |
| **LeftPanelContainer** | leftpanelcontainer.js | 左侧面板 | React |
| **GridViewerContainer** | gridviewercontainer.js | 网格视图容器 | React+Ant Design |
| **ActionContainer** | actioncontainer.js | 操作按钮容器 | React |

#### 特殊功能容器

| 组件名 | 文件 | 功能 |
|--------|------|------|
| **BuyMemberContainer** | buymembercontainer.js | 会员购买提示 |
| **ProgressContainer** | progresscontainer.js | 进度条显示 |
| **RecommendListContainer** | recommendlistcontainer.js | 推荐列表 |

#### 面板组件

| 组件名 | 文件 | 功能 |
|--------|------|------|
| **RightPanel** | rightpanel.js | 右侧属性面板 |
| **TaskViewPanel** | taskviewpanel.js | 任务视图面板 |
| **FilterPanel** | filterpanel.js | 过滤面板 |

#### 工具栏组件

| 组件名 | 文件 | 功能 |
|--------|------|------|
| **DefaultToolbar** | defaulttoolbar.js | 默认工具栏 |
| **CameraBar** | camerabar.js | 相机控制栏 |
| **ValidAreaBar** | validareabar.js | 有效区域栏 |
| **ZoomButtons** | zoombuttons.js | 缩放按钮组 |

#### 通用组件

| 组件名 | 文件 | 功能 |
|--------|------|------|
| **DropButton** | dropbutton.js | 下拉按钮 |
| **TeachingAbilityButton** | teachingabilitybutton.js | 教学功能按钮 |

### 6.2 GridViewerContainer 详细分析

**文件**: [`gridviewercontainer.js`](dist/plugins-hs-205d0ccf.fe5726b7.bundle_dewebpack/gridviewercontainer.js)

```typescript
function GridViewerContainer(props) {
  // 图片浏览器主容器
  
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [filterOptions, setFilterOptions] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  
  // 功能
  - 图片网格展示
  - 多选/全选
  - 过滤器 (房间类型/风格)
  - 分页
  - 批量操作 (下载/删除/去水印)
  - AI渲染状态显示
  
  // 卡片类型
  - RenderingCard  // 渲染中
  - QueueingCard   // 排队中
  - CompleteCard   // 已完成
  - FailedCard     // 失败
}
```

**集成功能**:
- ✅ Ant Design组件 (Checkbox, Pagination)
- ✅ 图片详情查看
- ✅ 用户行为追踪
- ✅ 会员权限控制

### 6.3 HomePage - 灵感首页

**文件**: [`homepage.js`](dist/plugins-hs-205d0ccf.fe5726b7.bundle_dewebpack/homepage.js)

```typescript
class HomePage extends Component {
  // AI灵感图推荐首页
  
  state = {
    articles: [],         // 文章列表
    selectedLabel: null,  // 选中的标签
    currentPage: 1,
    loading: false
  };
  
  // 核心方法
  async init(params): void {
    // 初始化，查询文章
    const result = await queryArticleByPeriod(params);
  }
  
  onLabelChange(labelCode): void {
    // 标签切换，重新查询
    await queryArticleByLabel({labelCode});
  }
  
  onArticleClick(article): void {
    // 点击文章，跳转详情
    this.props.push({route, data});
  }
  
  onScroll(event): void {
    // 滚动加载更多
  }
}
```

### 6.4 ImageDetail - 图片详情

**文件**: [`imagedetail.js`](dist/plugins-hs-205d0ccf.fe5726b7.bundle_dewebpack/imagedetail.js)

```typescript
function ImageDetail(props) {
  // 图片详情展示组件
  
  const {images, currentIndex} = props;
  const [currentImage, setCurrentImage] = useState(images[currentIndex]);
  
  // 功能
  - 图片预览 (支持缩放拖拽 - PinchZoomPan)
  - 左右切换
  - 下载/删除/去水印
  - AI参数显示
  - 渲染状态显示 (进行中/成功/失败)
  
  // 操作
  - 上一张/下一张
  - 关闭详情
  - 批量操作
}
```

---

## 📐 7. 插件架构设计

### 7.1 插件接口定义

```typescript
// plugin.json (推测)
{
  "id": "plugins-hs-205d0ccf",
  "name": "ConstraintSystemPlugin",
  "version": "1.0.0",
  "description": "约束系统、墙体绘制、结构编辑插件",
  
  "dependencies": {
    "core-hs": "^1.0.0",      // 核心引擎
    "app-hs": "^1.0.0",       // 应用框架
    "hs": "^1.0.0"            // UI框架
  },
  
  "provides": {
    "commands": [
      "CmdCreateTgWall",
      "CmdCreateRectTgWall",
      "CmdCreatePolygonTgWall",
      "CmdMoveStructure",
      "CmdRotateStructure",
      "CmdResizeStructure",
      // ... 22个命令
    ],
    "gizmos": [
      "CreateTgWallGizmo",
      "CreateRectTgWallGizmo",
      "CreatePolygonTgWallGizmo"
    ],
    "helpers": [
      "ConstraintHelper",
      "SnapHelper",
      "SnapGeomHelper"
    ],
    "ui": [
      "GridViewerContainer",
      "HomePage",
      "ImageDetail",
      // ... UI组件
    ]
  },
  
  "extensions": {
    "commandRegistry": "registerCommands",
    "gizmoRegistry": "registerGizmos",
    "uiRegistry": "registerUI"
  }
}
```

### 7.2 插件入口文件

```typescript
// src/plugins/plugin-205d0ccf/index.ts

import { IPlugin, IPluginContext } from '@/core/plugin';

// 命令导入
import { CmdCreateTgWall } from './commands/cmdcreatetgwall';
import { CmdCreateRectTgWall } from './commands/cmdcreaterecttgwall';
import { CmdMoveStructure } from './commands/cmdmovestructure';
// ... 其他命令

// Gizmo导入
import { CreateTgWallGizmo } from './gizmos/createtgwallgizmo';
import { CreateRectTgWallGizmo } from './gizmos/createrecttgwallgizmo';

// 辅助类导入
import { ConstraintHelper } from './helpers/constrainthelper';
import { SnapHelper } from './helpers/snaphelper';

// UI组件导入
import { GridViewerContainer } from './ui/gridviewercontainer';
import { HomePage } from './ui/homepage';

export default class ConstraintSystemPlugin implements IPlugin {
  id = 'plugins-hs-205d0ccf';
  name = 'ConstraintSystemPlugin';
  version = '1.0.0';
  
  private context: IPluginContext;
  
  initialize(context: IPluginContext): void {
    this.context = context;
    
    // 注册命令
    this.registerCommands();
    
    // 注册Gizmo
    this.registerGizmos();
    
    // 注册UI组件
    this.registerUI();
    
    // 初始化辅助工具
    this.initHelpers();
  }
  
  private registerCommands(): void {
    const cmdRegistry = this.context.getCommandRegistry();
    
    // 注册墙体绘制命令
    cmdRegistry.register('CreateTgWall', CmdCreateTgWall);
    cmdRegistry.register('CreateRectTgWall', CmdCreateRectTgWall);
    cmdRegistry.register('CreatePolygonTgWall', CmdCreatePolygonTgWall);
    
    // 注册结构操作命令
    cmdRegistry.register('MoveStructure', CmdMoveStructure);
    cmdRegistry.register('RotateStructure', CmdRotateStructure);
    cmdRegistry.register('ResizeStructure', CmdResizeStructure);
    // ... 其他命令
  }
  
  private registerGizmos(): void {
    const gizmoRegistry = this.context.getGizmoRegistry();
    
    gizmoRegistry.register('CreateTgWallGizmo', CreateTgWallGizmo);
    gizmoRegistry.register('CreateRectTgWallGizmo', CreateRectTgWallGizmo);
    gizmoRegistry.register('CreatePolygonTgWallGizmo', CreatePolygonTgWallGizmo);
  }
  
  private registerUI(): void {
    const uiRegistry = this.context.getUIRegistry();
    
    uiRegistry.register('GridViewer', GridViewerContainer);
    uiRegistry.register('HomePage', HomePage);
    uiRegistry.register('ImageDetail', ImageDetail);
  }
  
  private initHelpers(): void {
    // 初始化单例辅助工具
    ConstraintHelper.getInstance();
    SnapGeomHelper.getInstance();
  }
  
  dispose(): void {
    // 清理资源
  }
}
```

---

## 🔗 8. 依赖关系分析

### 8.1 对core-hs的依赖

```
plugins-hs-205d0ccf
├── 几何类依赖
│   ├── Point2d, Vector2d
│   ├── Line2d, Arc2d, Circle2d
│   ├── Polygon2d, Loop
│   └── Matrix3, Matrix4
│
├── 约束类依赖
│   ├── Constraint (基类)
│   ├── PositionConstraint
│   └── ConstraintSolver
│
├── 实体类依赖
│   ├── Wall, Opening
│   ├── Structure (Column, Flue, Riser, 
Outlet)
│   ├── Beam
│   └── Room
│
├── 文档类依赖
│   ├── WebCadDocument
│   ├── Scene, Layer
│   └── TransactionManager
│
└── 工具类依赖
    ├── MathUtil, MathAlg
    ├── Tolerance
    └── Keyboard (KeyCodes)
```

### 8.2 对app-hs的依赖

```
plugins-hs-205d0ccf
├── 命令框架
│   └── HSApp.Cmd.Command (所有Cmd类继承)
│
├── 视图系统
│   ├── HSApp.View.SVG.Util
│   ├── Canvas2D, GizmoManager
│   └── DisplayLayers
│
├── 应用管理
│   ├── HSApp.App.getApp()
│   ├── SelectionManager
│   ├── PluginManager
│   └── TransactionManager
│
└── 配置系统
    └── HSApp.Config (TENANT配置)
```

### 8.3 对hs的依赖

```
plugins-hs-205d0ccf
├── UI组件
│   ├── Tooltip, Badge, Checkbox
│   ├── IconfontView (图标)
│   └── Pagination (分页)
│
└── SVG绘图
    ├── PathItem, TextItem
    ├── MarkerItem
    └── InputBoxComp
```

### 8.4 第三方库依赖

```json
{
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "antd": "^4.18.0"
  }
}
```

---

## 📁 9. 目录结构设计

### 9.1 推荐的源码结构

```
src/plugins/plugin-205d0ccf/
├── index.ts                          # 插件入口
├── plugin.json                       # 插件元数据
│
├── commands/                         # 命令系统 (22文件)
│   ├── wall/
│   │   ├── cmdcreatetgwall.ts
│   │   ├── cmdcreaterecttgwall.ts
│   │   └── cmdcreatepolygontgwall.ts
│   ├── structure/
│   │   ├── cmdaddstructure.ts
│   │   ├── cmddeletestructure.ts
│   │   ├── cmdmovestructure.ts
│   │   ├── cmdrotatestructure.ts
│   │   └── cmdresizestructure.ts
│   ├── beam/
│   │   ├── cmddeletebeam.ts
│   │   ├── cmdmovebeam.ts
│   │   ├── cmdrotatebeam.ts
│   │   ├── cmdresizebeam.ts
│   │   ├── cmdcopypastebeam.ts
│   │   └── cmdchangebeamtype.ts
│   └── misc/
│       ├── cmdselectsingleroom.ts
│       ├── cmdtoggleceilingvisibility.ts
│       ├── cmdelevationselect.ts
│       └── cmdinspirationaction.ts
│
├── gizmos/                           # Gizmo交互 (4文件)
│   ├── createtgwallgizmo.ts
│   ├── createrecttgwallgizmo.ts
│   ├── createpolygontgwallgizmo.ts
│   └── gizmofactory.ts
│
├── helpers/                          # 辅助工具 (5文件)
│   ├── constrainthelper.ts
│   ├── snaphelper.ts
│   ├── snapgeomhelper.ts
│   ├── drawpolygonroomsnaphelper.ts
│   └── sublinehelper.ts
│
├── geometry/                         # 几何扩展 (10+文件)
│   ├── arcsnapgeometry.ts
│   ├── linesnapgeometry.ts
│   ├── pointsnapgeometry.ts
│   └── snapgeomtype.ts
│
├── ui/                               # UI组件 (84文件)
│   ├── containers/
│   │   ├── appcontainer.tsx
│   │   ├── gridviewercontainer.tsx
│   │   ├── leftpanelcontainer.tsx
│   │   └── ... (17个容器)
│   ├── components/
│   │   ├── homepage.tsx
│   │   ├── imagedetail.tsx
│   │   ├── completecard.tsx
│   │   ├── dropbutton.tsx
│   │   └── ... (60+组件)
│   └── styles/
│       └── ... (576个样式模块)
│
├── requests/                         # 事务请求 (5文件)
│   ├── createtgwallrequest.ts
│   └── ...
│
├── items/                            # SVG绘图元素 (10文件)
│   ├── dimension.ts
│   ├── imarkertype.ts
│   └── item_flag.ts
│
├── utils/                            # 工具类 (10文件)
│   ├── smartlayoututil.ts
│   └── ...
│
└── types/                            # 类型定义 (10文件)
    ├── awaketypeenum.ts
    └── ...
```

**文件数统计**:
- 命令: 22
- Gizmo: 4
- 辅助类: 15
- UI组件: 84
- 样式/配置: 576
- 其他: 77
- **总计**: 778

---

## ⏱️ 10. 还原时间估算

### 10.1 分模块工时

| 模块 | 文件数 | 复杂度 | 人天 | 说明 |
|------|--------|--------|------|------|
| **命令系统** | 22 | 高 | 22 | 每个命令1人天 |
| **Gizmo交互** | 4 | 高 | 8 | 交互逻辑复杂,2人天/个 |
| **辅助工具** | 15 | 中 | 10 | 算法类,需仔细还原 |
| **UI组件** | 84 | 中 | 20 | React组件,相对简单 |
| **样式配置** | 576 | 低 | 5 | CSS/配置,批量处理 |
| **其他** | 77 | 低 | 5 | 枚举、类型定义 |
| **集成测试** | - | - | 10 | 功能联调 |
| **总计** | **778** | - | **80人天** | **16周÷2人=8周** |

### 10.2 分阶段实施计划

#### Week 1-2: 基础设施 (2周)

```
✅ 任务清单:
1. 创建插件目录结构
2. 定义插件接口 (plugin.json, index.ts)
3. 还原辅助工具类 (5个Helper)
   - ConstraintHelper
   - SnapHelper
   - SnapGeomHelper
   - DrawPolygonRoomSnapHelper
   - SubLineHelper
4. 还原几何扩展类 (SnapGeometry系列)
5. 编写单元测试

验证: Helper类可用,捕捉算法正确
```

#### Week 3-4: Gizmo交互系统 (2周)

```
✅ 任务清单:
1. 还原CreateTgWallGizmo (单段墙)
2. 还原CreateRectTgWallGizmo (矩形墙)
3. 还原CreatePolygonTgWallGizmo (多边形墙)
4. 还原GizmoFactory
5. 还原Dimension标注系统
6. 编写交互测试

验证: 可在2D画布中绘制预览
```

#### Week 5-7: 命令系统 (3周)

```
✅ 任务清单:
1. 还原墙体绘制命令 (3个) - Week 5
   - CmdCreateTgWall
   - CmdCreateRectTgWall
   - CmdCreatePolygonTgWall

2. 还原结构操作命令 (10个) - Week 6-7
   - 添加/删除 (2个)
   - 移动/旋转/缩放 (6个)
   - 复制粘贴/类型切换 (2个)

3. 还原其他命令 (9个) - Week 7
   - 房间选择、视图控制等

验证: 所有命令可执行,操作正确
```

#### Week 8: UI组件系统 (1周)

```
✅ 任务清单:
1. 还原容器组件 (17个)
   - GridViewerContainer (图片浏览器)
   - HomePage (灵感首页)
   - 各类Panel/Bar

2. 还原功能组件 (60+个)
   - ImageDetail, CompleteCard等
   - DropButton, ZoomButtons等

3. 还原样式模块 (576个)
   - 批量处理CSS模块

验证: UI界面可渲染,交互正常
```

---

## ✅ 11. 验证清单

### 11.1 功能验证

```markdown
## 插件功能验证清单

### 约束系统
- [ ] ConstraintHelper单例可用
- [ ] 约束获取算法正确
- [ ] 约束执行返回正确JSON
- [ ] 容差判断逻辑正确

### 捕捉系统
- [ ] SnapGeometry类可实例化
- [ ] 从墙体提取捕捉点正确
- [ ] 从结构提取捕捉点正确
- [ ] 从梁/孔/房间提取正确
- [ ] 捕捉关系建立正确

### 尺寸标注
- [ ] Dimension可创建显示
- [ ] 尺寸值计算正确
- [ ] 输入框编辑正常
- [ ] Tab/Enter键功能正常
- [ ] 尺寸焦点切换正常

### 墙体绘制命令
- [ ] CmdCreateTgWall可绘制单段墙
- [ ] CmdCreateRectTgWall可绘制矩形房间
- [ ] CmdCreatePolygonTgWall可绘制多边形
- [ ] 墙体模式切换正常 (内/中/外)
- [ ] 墙宽设置生效
- [ ] 捕捉辅助工作正常

### 结构操作命令
- [ ] 移动/旋转/缩放功能正常
- [ ] 复制粘贴功能正常
- [ ] 添加/删除功能正常
- [ ] Undo/Redo正常

### Gizmo交互
- [ ] 墙体绘制Gizmo显示正常
- [ ] 鼠标交互响应正常
- [ ] 实时预览准确
- [ ] 尺寸标注同步更新

### UI组件
- [ ] 图片浏览器可显示
- [ ] 灵感首页可加载
- [ ] 图片详情可查看
- [ ] 
批量操作正常
- [ ] 过滤器功能正常
```

### 11.2 集成验证

```markdown
## 与核心系统集成验证

### 与core-hs集成
- [ ] 几何类正确导入
- [ ] 约束系统正常工作
- [ ] 实体类操作正常
- [ ] 文档管理集成正确

### 与app-hs集成
- [ ] 命令注册成功
- [ ] Gizmo显示正常
- [ ] 视图系统集成正常
- [ ] 事务管理正常

### 与hs集成
- [ ] UI组件渲染正常
- [ ] SVG绘图正常
- [ ] 事件系统正常
```

### 11.3 性能验证

| 性能指标 | 目标值 | 测试场景 |
|---------|--------|---------|
| 命令执行 | <50ms | 绘制单段墙 |
| Gizmo渲染 | <16ms (60fps) | 鼠标移动时 |
| 捕捉计算 | <10ms | 100个捕捉点 |
| UI组件渲染 | <100ms | 图片网格100张 |
| 插件加载 | <500ms | 插件初始化 |

---

## 🔧 12. 还原步骤详解

### 12.1 Phase 1: 辅助工具层 (Week 1-2)

#### Day 1-3: ConstraintHelper

```typescript
// src/plugins/plugin-205d0ccf/helpers/constrainthelper.ts

import { Constraint } from '@/core/constraint';
import { SnapResult, SnapResultType } from './snaphelper';
import { Tolerance } from '@/core/utils';

export class ConstraintHelper {
  private static _instance: ConstraintHelper;
  
  static getInstance(): ConstraintHelper {
    if (!this._instance) {
      this._instance = new ConstraintHelper();
    }
    return this._instance;
  }
  
  getRelatedConstraint(
    snapResult: SnapResult, 
    constraints: Constraint[]
  ): Constraint | undefined {
    const uniqueConstraints = [];
    
    for (const constraint of constraints) {
      if (this._isUnique(snapResult, constraint)) {
        uniqueConstraints.push(constraint);
      }
    }
    
    if (uniqueConstraints.length === 0) return undefined;
    
    // 处理共线约束特殊情况
    if (snapResult.type === SnapResultType.Colline) {
      // 过滤非平行约束
      // 选择最佳匹配
    }
    
    return uniqueConstraints[0];
  }
  
  execute(constraint: Constraint, offset?: any): any {
    if (!constraint) return null;
    
    let result = constraint.getJSON();
    
    if (offset) {
      // 合并dx, dy, drotation, center
      if (offset.dx && (!result.dx || Math.abs(result.dx) < 1e-6)) {
        result.dx = offset.dx;
      }
      // ... 其他字段
    }
    
    return result;
  }
  
  private _isUnique(c1: any, c2: any): boolean {
    // 检查dx冲突
    if (c1.dx && Math.abs(c1.dx) > 1e-4 && 
        c2.dx && Math.abs(c2.dx) > 1e-4 &&
        Math.abs(c1.dx - c2.dx) > Tolerance.EDGE_LENGTH_EPS) {
      return false;
    }
    
    // 检查dy冲突
    // 检查drotation冲突
    
    return true;
  }
}
```

**测试用例**:
```typescript
describe('ConstraintHelper', () => {
  it('should get related constraint', () => {
    const helper = ConstraintHelper.getInstance();
    const snapResult = { type: SnapResultType.EndPoint, ... };
    const constraints = [ ... ];
    const result = helper.getRelatedConstraint(snapResult, constraints);
    expect(result).toBeDefined();
  });
  
  it('should execute constraint', () => {
    const constraint = new PositionConstraint(...);
    const offset = { dx: 10, dy: 20 };
    const result = helper.execute(constraint, offset);
    expect(result.dx).toBe(10);
  });
});
```

#### Day 4-7: SnapGeometry系列

```typescript
// src/plugins/plugin-205d0ccf/geometry/snapgeometry.ts

export enum SnapGeomType {
  CenterPoint = 1,
  CornerPoint = 2,
  CenterLine = 3,
  LineEdge = 4,
  CircleEdge = 5,
  ArcEdge = 6
}

export abstract class SnapGeometry {
  from: Entity;
  type: SnapGeomType;
  protected _userID: string = '';
  relatedGeometries?: SnapGeometry[];
  
  constructor(from: Entity, type: SnapGeomType) {
    this.from = from;
    this.type = type;
  }
  
  getID(): string {
    return `${this.from.tag}:${this.type}:${this.userID}`;
  }
  
  get userID(): string { return this._userID; }
  set userID(value: string) { this._userID = value; }
  
  setupRelationShip(geometries: SnapGeometry[]): void {
    this.relatedGeometries = geometries;
  }
}

export class PointSnapGeometry extends SnapGeometry {
  geo: Point2d;
  
  constructor(geo: Point2d, from: Entity, type: SnapGeomType) {
    super(from, type);
    this.geo = geo;
  }
  
  getRelatedLineGeometry(): LineSnapGeometry[] {
    // 获取与此点相关的线
  }
}

// LineSnapGeometry, CircleSnapGeometry, ArcSnapGeometry 类似
```

#### Day 8-10: SnapGeomHelper

```typescript
// src/plugins/plugin-205d0ccf/helpers/snapgeomhelper.ts

export class SnapGeomHelper {
  private static _instance: SnapGeomHelper;
  
  static getInstance(): SnapGeomHelper {
    if (!this._instance) {
      this._instance = new SnapGeomHelper();
    }
    return this._instance;
  }
  
  extract(scene: Scene): SnapGeometry[] {
    const geometries: SnapGeometry[] = [];
    
    // 从墙体提取
    for (const wall of scene.walls) {
      geometries.push(...this.extractFromWall(wall));
    }
    
    // 从结构提取
    for (const structure of scene.structures) {
      geometries.push(...this.extractFromStructure(structure));
    }
    
    // 从梁提取
    // 从孔洞提取
    // 从房间提取
    
    return geometries;
  }
  
  extractFromWall(wall: Wall): SnapGeometry[] {
    const result: SnapGeometry[] = [];
    
    // 1. 提取角点
    for (const point of wall.geometry) {
      result.push(new PointSnapGeometry(point, wall, SnapGeomType.CornerPoint));
    }
    
    // 2. 提取中心点
    const midPt = wall.curve.getMidPt();
    result.push(new PointSnapGeometry(midPt, wall, SnapGeomType.CenterPoint));
    
    // 3. 提取边线
    if (wall.isArcWall()) {
      result.push(new ArcSnapGeometry(wall.curve, wall, SnapGeomType.ArcEdge));
      // 添加中心线
    } else {
      result.push(new LineSnapGeometry(wall.curve, wall, SnapGeomType.LineEdge));
      // 添加中心线
    }
    
    // 4. 建立关系
    for (const geom of result) {
      geom.setupRelationShip(result);
    }
    
    return result;
  }
  
  // extractFromStructure, extractFromBeam等类似
}
```

### 12.2 Phase 2: Gizmo交互 (Week 3-4)

#### Dimension标注组件

```typescript
// src/plugins/plugin-205d0ccf/items/dimension.ts

import { PathItem, TextItem } from '@/ui/svg';
import { InputBoxComp, InputBoxType } from '@/ui/components';
import { Vector2, Curve2d } from '@/core/geometry';

export class Dimension {
  static defaultSetting = {
    offset: 24,
    offsetByScreen: true
  };
  
  private _context: Context;
  private _props: DimensionProps;
  private _pathItem: PathItem;
  private _pathShadowItem: PathItem;
  private _inputObj: InputWrapper;
  private _curve?: Curve2d;
  private _setting: DimensionSetting;
  private _inputPosition: Vector2 = Vector2.O();
  private _isShow: boolean = true;
  
  constructor(context: Context, props?: DimensionProps, setting?: DimensionSetting) {
    this._context = context;
    this._props = props || {};
    this._setting = setting || { ...Dimension.defaultSetting };
    
    // 创建阴影路径
    this._pathShadowItem = new PathItem(context).attr(DimensionShadowAttr);
    this._pathShadowItem.marker(new MarkerItem(context, IMarkerType.DimensionShadow).getNode());
    
    // 创建主路径
    this._pathItem = new PathItem(context).attr(DimensionAttr);
    this._pathItem.marker(new MarkerItem(context, IMarkerType.Dimension).getNode());
    
    // 创建输入框/文本
    const editable = this._props.editable || false;
    this._inputObj = new InputWrapper(
      new InputBoxComp(context, {
        type: this._props.type || InputBoxType.Number,
        value: this._props.value,
        onEnter: this._onEnter,
        onTab: this._onTab,
        show: editable
      }),
      new TextItem(context),
      editable
    );
    
    this.hide();
  }
  
  updateData(data: {curve?, offset?, max?}): void {
    if (data.offset !== undefined) {
      this._setting.offset = data.offset;
    }
    
    if (data.max !== undefined) {
      this._inputObj.inputComponent.updateData({
        config: { max: data.max }
      });
    }
    
    if (data.curve) {
      this._curve = data.curve;
      this.update();
    }
  }
  
  update(): void {
    if (!this._curve) return;
    
    const offset = this._setting.offset || Dimension.defaultSetting.offset;
    const extendedCurve = this._getExtendCurve(this._curve, offset);
    
    // 更新路径
    this._pathItem.path = extendedCurve;
    this._pathShadowItem.path = extendedCurve;
    
    // 更新输入框位置和值
    if (this._inputObj.editable) {
      this._updateInputItem(extendedCurve);
    } else {
      this._inputObj.textItem.setCurve(extendedCurve);
    }
  }
  
  show(): void {
    if (!this._isShow) {
      this._isShow = true;
      this._pathItem.show();
      this._pathShadowItem.show();
      this._inputObj.show();
    }
  }
  
  hide(): void {
    if (this._isShow) {
      this._isShow = false;
      this._pathItem.hide();
      this._pathShadowItem.hide();
      this._inputObj.hide();
    }
  }
  
  // Tab键切换到下一个Dimension
  static getNextDimension(dimensions: Dimension[], current?: Dimension): Dimension | undefined {
    const activeDimensions = dimensions.filter(d => d.supportActive());
    if (activeDimensions.length === 0) return undefined;
    
    Dimension.sort(activeDimensions);
    
    if (!current) return activeDimensions[0];
    
    const index = activeDimensions.findIndex(d => d === current);
    return index >= 0 ? activeDimensions[(index + 1) % activeDimensions.length] : activeDimensions[0];
  }
  
  static sort(dimensions: Dimension[]): void {
    dimensions.sort((a, b) => {
      // 
按Y坐标降序排序，Y相同则按X升序
      if (MathUtil.isNearlyEqual(a.inputPosition.y, b.inputPosition.y)) {
        return a.inputPosition.x - b.inputPosition.x;
      }
      return b.inputPosition.y - a.inputPosition.y;
    });
  }
}
```

**单元测试**:
```typescript
describe('Dimension', () => {
  it('should create dimension', () => {
    const dim = new Dimension(context, {type: InputBoxType.Number});
    expect(dim).toBeDefined();
  });
  
  it('should update curve', () => {
    dim.updateData({curve: new Line2d(...)});
    expect(dim.curve).toBeDefined();
  });
  
  it('should sort dimensions correctly', () => {
    const dims = [dim1, dim2, dim3];
    Dimension.sort(dims);
    // 验证排序结果
  });
});
```

### 12.3 Phase 3: 命令系统 (Week 5-7)

#### 命令基类继承

```typescript
// src/plugins/plugin-205d0ccf/commands/base/wallcommand.ts

import { Command } from '@/app/command';

export abstract class WallCommand extends Command {
  protected _gizmo: Gizmo;
  protected _snapHelper: SnapHelper;
  
  // 墙体设置
  get setting() {
    return appSettingsUtil; // 全局墙体设置
  }
  
  // 更新墙体设置
  updateSetting(settings: {
    wallWidth?: number,
    wallMode?: WallMode,
    wallIsBearing?: boolean
  }): void {
    if (settings.wallWidth !== undefined) {
      this.setting.wallWidth = settings.wallWidth;
    }
    if (settings.wallMode !== undefined) {
      this.setting.wallMode = settings.wallMode;
    }
    if (settings.wallIsBearing !== undefined) {
      this.setting.wallIsBearing = settings.wallIsBearing;
    }
    
    this.setting.save();
    
    // 通知属性面板更新
    const propertyBar = this.context.app.pluginManager.getPlugin(
      PluginType.PropertyBar
    );
    if (propertyBar) {
      propertyBar.update();
    }
  }
  
  // 获取2D画布
  protected getCanvas2d(): Canvas2D {
    const app = this.context.app;
    const env = app.activeEnvironment;
    return env && env.getCanvas2d ? env.getCanvas2d() : app.getActive2DView();
  }
}
```

---

## 📊 13. 完整功能清单

### 13.1 命令系统 (22个)

#### 墙体绘制 (3个)
1. ✅ CmdCreateTgWall - 单段墙
2. ✅ CmdCreateRectTgWall - 矩形房间
3. ✅ CmdCreatePolygonTgWall - 多边形房间

#### 结构操作 (10个)
4. ✅ CmdAddStructure - 添加结构
5. ✅ CmdDeleteStructure - 删除结构
6. ✅ CmdMoveStructure - 移动结构
7. ✅ CmdRotateStructure - 旋转结构
8. ✅ CmdResizeStructure - 调整结构
9. ✅ CmdCopyPasteStructure - 复制粘贴结构
10. ✅ CmdChangeStructureMode - 切换结构模式
11. ✅ CmdDeleteBeam - 删除梁
12. ✅ CmdMoveBeam - 移动梁
13. ✅ CmdRotateBeam - 旋转梁
14. ✅ CmdResizeBeam - 调整梁
15. ✅ CmdCopyPasteBeam - 复制粘贴梁
16. ✅ CmdChangeBeamType - 切换梁类型

#### 其他命令 (9个)
17. ✅ CmdSelectSingleRoom - 选择房间
18. ✅ CmdToggleCeilingVisibility - 天花显隐
19. ✅ CmdElevationSelect - 立面选择
20. ✅ CmdInspirationAction - 灵感图操作
21. ✅ CmdSaveOriginDesign - 保存设计
22. ✅ 其他辅助命令 (4个)

### 13.2 Gizmo交互 (4个)

1. ✅ CreateTgWallGizmo - 单段墙绘制交互
2. ✅ CreateRectTgWallGizmo - 矩形墙绘制交互
3. ✅ CreatePolygonTgWallGizmo - 多边形墙绘制交互
4. ✅ GizmoFactory - Gizmo工厂

### 13.3 辅助工具 (5个)

1. ✅ ConstraintHelper - 约束辅助
2. ✅ SnapHelper - 捕捉辅助
3. ✅ SnapGeomHelper - 几何捕捉辅助
4. ✅ DrawPolygonRoomSnapHelper - 多边形捕捉
5. ✅ SubLineHelper - 子线辅助

### 13.4 几何扩展 (5个)

1. ✅ SnapGeometry - 捕捉几何基类
2. ✅ PointSnapGeometry - 点捕捉
3. ✅ LineSnapGeometry - 线捕捉
4. ✅ CircleSnapGeometry - 圆捕捉
5. ✅ ArcSnapGeometry - 弧捕捉

### 13.5 UI组件 (84个)

#### 容器组件 (17个)
- AppContainer, LeftPanelContainer, GridViewerContainer
- ActionContainer, ProgressContainer, BuyMemberContainer
- ... 等

#### 功能组件 (67个)
- HomePage, ImageDetail, CompleteCard
- DropButton, ZoomButtons, FilterPanel
- ... 等

### 13.6 样式/配置 (576个)

- module_*.js - Webpack模块化CSS
- CSS-in-JS样式定义
- 主题配置、布局配置

---

## 🎯 14. 还原优先级

### 14.1 P0 - 核心功能 (必须优先, 4周)

```
Week 1-2: 辅助工具层
├── ConstraintHelper
├── SnapGeometry系列
└── SnapGeomHelper

Week 3-4: Gizmo交互层
├── Dimension标注
├── CreateTgWallGizmo
├── CreateRectTgWallGizmo
└── CreatePolygonTgWallGizmo
```

### 14.2 P1 - 主要功能 (3周)

```
Week 5-7: 命令系统
├── 墙体绘制命令 (3个) - 1周
├── 结构操作命令 (10个) - 2周
└── 集成测试 - 随时进行
```

### 14.3 P2 - 扩展功能 (1周)

```
Week 8: UI组件
├── 容器组件 (17个)
├── 功能组件 (67个)
└── 样式配置 (576个)
```

---

## 🚀 15. 快速启动

### 15.1 创建插件骨架

```bash
# 1. 创建目录
mkdir -p src/plugins/plugin-205d0ccf/{commands,gizmos,helpers,geometry,ui,items}

# 2. 创建插件入口
cat > src/plugins/plugin-205d0ccf/index.ts << 'EOF'
import { IPlugin, IPluginContext } from '@/core/plugin';

export default class ConstraintSystemPlugin implements IPlugin {
  id = 'plugins-hs-205d0ccf';
  name = 'ConstraintSystemPlugin';
  version = '1.0.0';
  
  initialize(context: IPluginContext): void {
    console.log('ConstraintSystemPlugin initialized');
  }
  
  dispose(): void {
    console.log('ConstraintSystemPlugin disposed');
  }
}
EOF

# 3. 创建plugin.json
cat > src/plugins/plugin-205d0ccf/plugin.json << 'EOF'
{
  "id": "plugins-hs-205d0ccf",
  "name": "ConstraintSystemPlugin",
  "version": "1.0.0",
  "dependencies": {
    "core-hs": "^1.0.0",
    "app-hs": "^1.0.0",
    "hs": "^1.0.0"
  }
}
EOF
```

### 15.2 第一周工作

```bash
# Day 1-3: ConstraintHelper
touch src/plugins/plugin-205d0ccf/helpers/constrainthelper.ts
# 参考 dist/plugins-hs-205d0ccf/constrainthelper.js 还原

# Day 4-7: SnapGeometry系列
touch src/plugins/plugin-205d0ccf/geometry/snapgeometry.ts
touch src/plugins/plugin-205d0ccf/helpers/snapgeomhelper.ts
# 参考 dist/plugins-hs-205d0ccf/arcsnapgeometry.js 还原

# 测试
npm run test -- plugin-205d0ccf
```

---

## 📚 16. 参考资料

### 16.1 相关分析文档

- `constraint-system-complete-analysis.md` - 约束系统完整分析
- `core-hs-complete-architecture.md` - 核心架构
- `dist-module-architecture-analysis.md` - 模块架构

### 16.2 技术栈

- **TypeScript** 4.7+
- **React** 17.0.2
- **Ant Design** 4.18.0
- **RxJS** 6.6.7 (事件流)

---

## 📈 17. 总结

### 17.1 插件关键指标

📊 **规模**:
- 文件数: 778个
- 代码行数: ~31,000行
- 命令: 22个
- Gizmo: 4个
- UI组件: 84个

⏱️ **时间**:
- 总工期: 8周
- 核心功能: 4周
- 命令系统: 3周
- UI组件: 1周

💰 **成本**:
- 总人天: 80人天
- 团队: 2人
- 预算: 约12.8万元 (按200元/小时)

### 17.2 核心功能

✅ **约束系统**:
- ConstraintHelper - 约束查找和执行
- 支持位置/旋转约束
- 容差控制精确

✅ **捕捉系统**:
- SnapGeometry - 6种捕捉类型
- SnapGeomHelper - 从实体提取捕捉几何
- SnapHelper - 智能捕捉算法

✅ **墙体绘制**:
- 单段墙 (直线/圆弧)
- 矩形房间 (4段墙)
- 多边形房间 (任意墙)
- 实时尺寸标注
- 
智能捕捉辅助

✅ **结构编辑**:
- 移动/旋转/缩放
- 添加/删除
- 复制粘贴
- 支持柱/梁/烟道等

✅ **AI功能**:
- 灵感图推荐
- AI渲染管理
- 图片浏览器

### 17.3 技术亮点

🌟 **单例模式**: ConstraintHelper, SnapGeomHelper  
🌟 **工厂模式**: GizmoFactory  
🌟 **命令模式**: 22个可撤销命令  
🌟 **观察者模式**: Signal事件系统  
🌟 **插件架构**: 完全独立可插拔

### 17.4 下一步行动

#### 本周
1. ✅ 创建插件目录结构
2. ✅ 定义插件接口
3. ✅ 还原ConstraintHelper
4. ✅ 编写第一批测试

#### 第1-2周
1. 🎯 完成辅助工具层
2. 🎯 完成SnapGeometry系列
3. 🎯 单元测试覆盖率 >80%

---

## 🔍 18. 代码示例速查

### 18.1 使用ConstraintHelper

```typescript
import { ConstraintHelper } from '@/plugins/plugin-205d0ccf/helpers';

// 获取单例
const helper = ConstraintHelper.getInstance();

// 获取相关约束
const snapResult = { type: SnapResultType.EndPoint, ... };
const constraints = [ ... ];
const constraint = helper.getRelatedConstraint(snapResult, constraints);

// 执行约束
const offset = { dx: 10, dy: 20 };
const result = helper.execute(constraint, offset);
console.log(result); // { dx: 10, dy: 20, ... }
```

### 18.2 使用SnapGeomHelper

```typescript
import { SnapGeomHelper } from '@/plugins/plugin-205d0ccf/helpers';

// 获取单例
const helper = SnapGeomHelper.getInstance();

// 从场景提取捕捉几何
const scene = app.floorplan.scene;
const snapGeometries = helper.extract(scene);

// 从单个墙体提取
const wall = scene.walls[0];
const wallGeoms = helper.extractFromWall(wall);

console.log(wallGeoms);
// [
//   PointSnapGeometry (角点1),
//   PointSnapGeometry (角点2),
//   PointSnapGeometry (中心点),
//   LineSnapGeometry (边线),
//   LineSnapGeometry (中心线)
// ]
```

### 18.3 使用Dimension

```typescript
import { Dimension } from '@/plugins/plugin-205d0ccf/items';

// 创建尺寸标注
const dimension = new Dimension(context, {
  type: InputBoxType.Number,
  value: 3000,
  editable: true,
  onEnter: (value) => {
    console.log('用户输入:', value);
  }
});

// 更新曲线
dimension.updateData({
  curve: new Line2d(p1, p2),
  offset: 30
});

// 显示
dimension.show();

// 聚焦输入
dimension.focus();
```

### 18.4 创建墙体命令

```typescript
import { CmdCreateRectTgWall } from '@/plugins/plugin-205d0ccf/commands';

// 创建命令
const cmd = new CmdCreateRectTgWall();

// 执行命令
app.commandManager.execute(cmd);

// 命令会:
// 1. 创建Gizmo交互控制器
// 2. 启用捕捉辅助
// 3. 显示尺寸标注
// 4. 监听鼠标/键盘事件
// 5. 提交墙体创建事务
```

---

## 🎓 19. 学习路径

### 19.1 新手开发者 (第1周)

```
Day 1-2: 理解插件架构
- 阅读 IPlugin 接口定义
- 了解插件生命周期
- 学习插件注册机制

Day 3-5: 熟悉核心类
- 学习 ConstraintHelper 用法
- 理解 SnapGeometry 体系
- 掌握 Dimension 使用

Day 6-7: 实践练习
- 修改现有命令
- 添加简单功能
- 编写单元测试
```

### 19.2 进阶开发者 (第2-3周)

```
Week 2: 命令开发
- 创建自定义墙体命令
- 实现Gizmo交互
- 集成捕捉系统

Week 3: UI组件开发
- 创建React组件
- 集成到插件
- 样式定制
```

---

## 📞 20. 附录

### 20.1 关键Module ID映射

| Module ID | 文件名 | 功能 |
|-----------|--------|------|
| 223024 | constrainthelper.js | 约束辅助 |
| 835775 | arcsnapgeometry.js | 捕捉几何 |
| 302716 | dimension.js | 尺寸标注 |
| 271945 | cmdcreaterecttgwall.js | 矩形墙命令 |
| 573727 | cmdcreatepolygontgwall.js | 多边形墙命令 |

### 20.2 完整文件列表

**参考**: `dist/plugins-hs-205d0ccf.fe5726b7.bundle_dewebpack/` 目录  
**文件总数**: 778个  
**查看方式**: `ls -la dist/plugins-hs-205d0ccf.fe5726b7.bundle_dewebpack/`

---

**文档版本**: v1.0  
**创建日期**: 2026-01-24  
**分析范围**: plugins-hs-205d0ccf 插件完整分析  
**预估还原时间**: 8周 (2人团队)

**🎯 准备好开始还原这个插件了吗?**