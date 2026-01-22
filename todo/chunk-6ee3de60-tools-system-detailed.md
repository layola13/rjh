# 门窗系统编辑工具详细分析 (80+ Tools System)

> **模块**: chunk-6ee3de60.1b731f5b_core
> **核心文件**: toolmanager.js (32.5KB, 1292行)
> **工具总数**: 150+ 工具类型

---

## 一、工具系统架构概览

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ToolManager (工具管理器)                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    事件处理系统 (Event System)                       │   │
│  │  - mouse: mousedown, mousemove, mouseup, click, dblclick           │   │
│  │  - touch: touchstart, touchmove, touchend, touchwheel              │   │
│  │  - keyboard: keydown, keyup (del, undo, 快捷键)                    │   │
│  │  - wheel: 缩放控制                                                   │   │
│  │  - drag: 拖拽事件 (dragstart, dragmove, dragend)                   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                          │
│                                    ▼                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                  工具注册系统 (Tool Registry)                        │   │
│  │  - registerTool(): 注册所有工具                                      │   │
│  │  - switchTool(): 切换工具                                            │   │
│  │  - takeTool(): 使用工具                                              │   │
│  │  - releaseTool(): 释放工具                                           │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                          │
│                                    ▼                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     150+ 工具类型 (ToolType Enum)                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
```

---

## 二、工具分类体系 (8大类)

### 2.1 基础工具 (Basic Tools) - 5个

| 工具名 | 类型 | 功能描述 |
|--------|------|----------|
| **pan** | 基础 | 平移视图 (默认工具) |
| **squareSelect** | 基础 | 框选工具 |
| **wall** | 基础 | 墙体工具 |
| **none** | 基础 | 无工具/空状态 |
| **frame_scalable** | 基础 | 可缩放框架 |

---

### 2.2 框架创建工具 (Frame Creation) - 100+个

#### 2.2.1 基础框架 (Basic Frames) - 7个

| 工具名 | 对应类 | 功能 |
|--------|--------|------|
| `frame_rectangle` | FrameTool | 矩形框架 |
| `frame_circle` | FrameTool | 圆形框架 |
| `frame_triangle` | FrameTool | 三角形框架 |
| `frame_polygon` | CustomPolygonTool | 自定义多边形 |
| `frame_half_circle` | FrameTool | 半圆框架 |
| `frame_quarter_circle` | FrameTool | 1/4圆框架 |
| `frame_gothic` | FrameTool | 哥特式框架 |

#### 2.2.2 几何框架 (Geometric Frames) - 15个

```
八边形系:
├── frame_octagon              // 八边形
├── frame_hexagon              // 六边形
├── frame_hexagon2             // 六边形变体1
├── frame_hexagon3             // 六边形变体2

特殊多边形:
├── frame_diamond              // 菱形
├── frame_isosceles_triangle   // 等腰三角形
├── frame_parallelogram        // 平行四边形
├── frame_rounded_rectangle    // 圆角矩形
├── frame_trapezoid            // 梯形
├── frame_trapezoid_right      // 右梯形
├── frame_trapezoid_down       // 下梯形
├── frame_trapezoid_left       // 左梯形
├── frame_peak_pentagon        // 峰形五边形
├── frame_angled_pentagon      // 角度五边形 (4变体)
```

#### 2.2.3 特殊形状框架 (Special Shape Frames) - 20个

```
装饰性框架:
├── frame_quatrefoil           // 四叶形
├── frame_wave                 // 波浪形
├── frame_mosque               // 伊斯兰式
├── frame_onion                // 洋葱形
├── frame_springline           // 弹簧线形
├── frame_springline_flanker   // 弹簧线侧边
├── frame_three_dimensional_arc // 3D弧形
```

#### 2.2.4 耳型框架 (Ear Frames) - 20个

```
单耳系:
├── frame_ear                  // 耳型 (4方向)
├── frame_ear_left
├── frame_ear_up
├── frame_ear_down
├── frame_pointed_ear          // 尖耳 (4方向)
├── frame_pointed_ear_left
├── frame_pointed_ear_up
├── frame_pointed_ear_down
├── frame_ear2                 // 双耳 (2变体)
├── frame_ear2_vertical
```

#### 2.2.5 双耳框架 (Double Ear Frames) - 4个

```
├── frame_double_ears          // 双耳 (4方向)
├── frame_double_ears_down
├── frame_double_ears_left
├── frame_double_ears_right
```

#### 2.2.6 空心框架 (Hollow Frames) - 12个

```
空心多边形:
├── frame_hollow               // 空心 (4方向)
├── frame_hollow_left
├── frame_hollow_down
├── frame_holhollow_right
├── frame_hollow2              // 空心变体 (4方向)
├── frame_hollow_side          // 侧边空心 (4方向)
├── frame_hollow_side_up
├── frame_hollow_side_down
├── frame_hollow_side_left
├── frame_convex               // 凸形 (4方向)
├── frame_convex_left
├── frame_convex_down
├── frame_convex_right
```

#### 2.2.7 单轨框架 (Single Track Frames) - 8个

```
滑动门框架:
├── frame_single_track         // 单轨 (5变体)
├── frame_single_track_left
├── frame_single_track_up
├── frame_single_track_down
├── frame_single_track_left_right
├── frame_single_track_left_down
├── frame_single_track_right_down
├── frame_single_track_left_right_down
```

#### 2.2.8 KFC折叠门框架 (KFC Frames) - 8个

```
折叠门框架:
├── frame_kfc                  // KFC折叠门 (4型号)
├── frame_kfc2
├── frame_kfc3
├── frame_kfc4
├── frame_half_kfc             // 半KFC (2变体)
├── frame_half_kfc2
├── frame_quarter_arch         // 1/4拱形
├── frame_extended_partial_arch // 扩展部分拱形
```

#### 2.2.9 特殊开孔框架 (Special Opening Frames) - 10个

```
├── frame_convex_left          // 左凸形
├── frame_convex_down          // 下凸形
├── frame_convex_right         // 右凸形
├── frame_quarter_arch         // 1/4拱
├── frame_extended_partial_arch // 扩展部分拱
└── 各种空心侧边变体...
```

---

### 2.3 中挺创建工具 (Mullion Creation) - 30+个

#### 2.3.1 基本中挺 (Basic Mullions) - 4个

| 工具名 | 对应类 | 功能 |
|--------|--------|------|
| `mullion_horizontal` | LineTool | 水平中挺 (Vector 0,1) |
| `mullion_vertical` | LineTool | 垂直中挺 (Vector -1,0) |
| `mullion_diagnoal` | LineTool | 对角中挺 (Vector -1,-1) |
| `mullion_counterdiagnoal` | LineTool | 反对角中挺 (Vector -1,1) |

#### 2.3.2 交叉中挺 (Cross Line Mullions) - 4个

```
├── mullion_cross_line           // 交叉线
├── mullion_cross_line_equal_two  // 等分2份
├── mullion_cross_line_equal_three // 等分3份
├── mullion_cross_line_equal_four // 等分4份
```

#### 2.3.3 弧形中挺 (Arc Mullions) - 5个

```
├── mullion_half_wheel           // 半轮形
├── mullion_semi_arc             // 半圆弧
├── mullion_semi_arc_pro         // 专业半圆弧
├── mullion_semi_arc_pro2        // 专业半圆弧2
├── mullion_semi_segment_pro     // 专业半段
```

#### 2.3.4 复合线条中挺 (Compound Line Mullions) - 10个

```
├── mullion_compound_square      // 复合方形
├── mullion_compound_diamond     // 复合菱形
├── mullion_compound_circle      // 复合圆形
├── mullion_compound_hexagon     // 复合六边形
├── mullion_compound_x_square    // 复合X方形
├── mullion_compound_rectangle_single  // 复合单矩形
├── mullion_compound_rectangle_double  // 复合双矩形
├── mullion_compound_long_octagon      // 复合长八边形
├── mullion_compound_double_octagon    // 复合双八边形
```

#### 2.3.5 简单线条中挺 (Simple Line Mullions) - 3个

```
├── mullion_wave                 // 波浪线
├── mullion_inner_arc            // 内弧线
├── mullion_half_hexagon         // 半六边形
├── mullion_spin                 // 纺锤线
```

---

### 2.4 窗扇创建工具 (Sash Creation) - 20+个

#### 2.4.1 标准窗扇 (Standard Sashes) - 5个

| 工具名 | 对应类 | 功能 |
|--------|--------|------|
| `sash` | SashTool | 标准窗扇 |
| `guardSash` | SashTool | 护窗 |
| `commercialSash` | SashTool | 商用窗扇 (带商业把手+端点铰链) |
| `door` | FrameTool | 门 |
| `screen` | SashTool | 纱窗 |

#### 2.4.2 双开窗扇 (Double Sashes) - 4个

```
├── doubleSash                  // 双开窗扇
├── doubleCommercialSash        // 双开商用窗扇
├── doubleScreen                // 双开纱窗
├── doubleKfcSash               // 双开KFC折叠门
```

#### 2.4.3 滑动窗扇 (Slide Sashes) - 3个

```
├── slide                       // 滑动窗扇
├── shadeSlide                  // 遮阳滑动
├── downWithSlideSash           // 下悬滑动窗扇
```

#### 2.4.4 折叠窗扇 (Fold Sashes) - 3个

```
├── foldSash                    // 折叠窗扇
├── foldScreen                  // 折叠纱窗
├── foldShade                   // 折叠遮阳
```

#### 2.4.5 特殊窗扇 (Special Sashes) - 4个

```
├── innerSashAndScreen          // 内开窗+纱窗
├── shadePushSash               // 遮阳推拉窗
├── doubleShadePushSash         // 双遮阳推拉窗
└── antiTheft (ShutterTool)     // 防盗百叶窗
```

---

### 2.5 连接件工具 (Connector Tools) - 8个

| 工具名 | 对应类 | 功能 |
|--------|--------|------|
| `connector` | ConnectorTool | 连接件 |
| `connerJoiner` | CornerJoinerTool | 角部连接件 |
| `wallCornerJoiner` | CornerJoinerTool | 墙角连接件 |
| `panoramicCornerJoiner` | CornerJoinerTool | 全景角部连接件 |
| `editConnector` | EditConnector | 编辑连接件 |
| `editConnectorRobot` | EditConnectorRobot | 连接件机器人 |
| `editCornerRobot` | EditCornerRobot | 角部机器人 |
| `editCornerJoiner` | EditCornerJoiner | 编辑角部连接件 |

---

### 2.6 编辑工具 (Edit Tools) - 30+个

#### 2.6.1 拖拽编辑 (Drag Editing) - 8个

```
├── editDragRobot               // 拖拽机器人
├── editWallDragRobot           // 墙体拖拽机器人
├── editTopViewDragRobot        // 顶视图拖拽机器人
├── editEdgeRobot               // 边机器人
├── editWallEdgeRobot           // 墙边机器人
├── editMullionRobot            // 中挺机器人
├── editCornerRobot             // 角部机器人
└── editInnerSplitter           // 内部分隔编辑
```

#### 2.6.2 分割编辑 (Split Editing) - 2个

```
├── editSplitter                // 分割杆编辑
├── editDoubleSashSpliterRobot  // 双开窗分割机器人
```

#### 2.6.3 五金件编辑 (Hardware Editing) - 10个

```
├── editSash                    // 编辑窗扇
├── editHinge                   // 编辑铰链
├── editHandle                  // 编辑把手
├── editCommercialHandle        // 编辑商业把手
├── editCrossHandle             // 编辑十字把手
├── editHardware                // 编辑五金件
├── editHardwareOnFrame         // 编辑框架上五金件
├── editHardwareOnMullion       // 编辑中挺上五金件
├── editCornerJoinerProfileSizeTextTool  // 编辑角部连接件文本
└── editGlassHole               // 编辑玻璃孔
```

#### 2.6.4 标注编辑 (Dimension Editing) - 5个

```
├── editDim                     // 编辑尺寸标注
├── editDimension               // 编辑尺寸
├── editExtraDim                // 编辑扩展标注
├── editLabel                   // 编辑标签
├── editNote                    // 编辑注释
```

#### 2.6.5 特殊编辑 (Special Editing) - 5个

```
├── editSkewText                // 编辑倾斜文本
├── editThreedArcText           // 编辑3D弧形文本
├── editGlassHoleDim            // 编辑玻璃孔标注
└── editExtraPersonImage        // 编辑人物图片
└── editExtraPersonImage (2变体: 男/女)
```

---

### 2.7 标注工具 (Dimension Tools) - 10+个

#### 2.7.1 标准标注 (Standard Dimensions) - 1个

| 工具名 | 对应类 | 功能 |
|--------|--------|------|
| `dim` | - | 标准尺寸标注 |

#### 2.7.2 扩展标注 (Extra Dimensions) - 6个

```
├── extraDimArbitrary           // 任意标注
├── extraDimHorizontal          // 水平标注
├── extraDimVertical            // 垂直标注
├── extraDimRadius              // 半径标注
├── extraDimAngle               // 角度标注
└── extraManImage / extraWomenImage  // 人物图片标注
```

---

### 2.8 装饰工具 (Decoration Tools) - 8个

| 工具名 | 对应类 | 功能 |
|--------|--------|------|
| `decoration_bar_semi_arc` | DecorationBarTool | 半圆装饰线 |
| `decoration_bar_chinese` | DecorationBarTool | 中式装饰线 (4变体) |
| `decoration_bar_prairie` | DecorationBarTool | 草原装饰线 |
| `decoration_bar_colonial` | DecorationBarTool | 殖民地装饰线 |
| `decoration_bar_diamond` | DecorationBarTool | 菱形装饰线 |

---

### 2.9 填充工具 (Filler Tools) - 6个

```
├── fillerGlass                 // 玻璃填充
├── fillerPanel                 // 面板填充
├── fillerEmpty                 // 空填充
├── fillerShade                 // 遮阳填充
├── fillerScreen                // 纱窗填充
└── glassHole                   // 玻璃孔
```

---

## 三、工具工作流程

### 3.1 工具切换流程

```
用户点击工具栏
        │
        ▼
ToolManager.takeTool(toolType)
        │
        ├─► view.keys.ca(e)           // 记录快捷键
        ├─► tool.cleanup()            // 清理当前工具
        ├─► switchTool(toolType)      // 切换工具
        │       │
        │       └─► tools[toolType]() // 实例化工具
        │               └─► tool.initialTool()
        │
        └─► keyHelper.syncCounter(e)  // 同步计数器
```

### 3.2 事件处理流程

```
用户交互
    │
    ├─► mouse: mousedown → tool.mousedown()
    │       mousemove → tool.mousemove()
    │       mouseup → tool.mouseup()
    │       click → tool.getPosition()
    │       dblclick → tool.dbclick()
    │
    ├─► touch: touchstart → tool.mousedown()
    │       touchmove → tool.mousemove()
    │       touchend → tool.touchend()
    │       touchwheel → tool.touchwheel()
    │
    ├─► keyboard: del → view.shapeManager.remove()
    │       undo → view.mometoManager.undo()
    │       其他键 → takeTool(key)
    │
    ├─► wheel: tool.mousewheel() (缩放)
    │
    └─► drag: dragstart → tool.dragstart()
            dragmove → tool.dragmove()
            dragend → tool.mousedone()
```

### 3.3 快捷键映射

| 快捷键 | 功能 |
|--------|------|
| `Del` | 删除选中对象 |
| `Undo` | 撤销 |
| `其他键` | 切换到对应工具 |

---

## 四、工具继承结构

```
Tool (基类)
├── PanTool                    // 平移工具
├── SquareSelectTool           // 框选工具
├── WallTool                   // 墙体工具
├── ScalableFrame              // 可缩放框架
├── FrameTool (框架工具基类)     // 100+ 变体
│   └── CustomPolygonTool      // 自定义多边形
├── LineTool                   // 线条工具
│   └── MullionCrossLine       // 交叉线
│   └── MullionCrossLineEqual  // 等分交叉线
├── SemiArcTool                // 弧形工具
├── SimpleLineTool             // 简单线条
├── CompoundLineTool           // 复合线条
├── SpinLineTool               // 纺锤线
├── SashTool (窗扇工具基类)     // 多种窗扇
├── DoubleSashTool             // 双开窗扇
├── SlideTool                  // 滑动工具
├── FoldTool                   // 折叠工具
├── ConnectorTool              // 连接件工具
├── CornerJoinerTool           // 角部连接件
├── DragDrawTool               // 拖拽绘制
├── Edit*Tool (编辑工具组)      // 30+ 编辑工具
├── DecorationBarTool          // 装饰线工具
├── Filler*Tool (填充工具组)    // 6个填充工具
├── DimensionTool              // 标注工具
├── ExtraDim*Tool              // 扩展标注
├── NoteTool                   // 注释工具
├── GlassHoleTool              // 玻璃孔工具
└── ProfileStructTool          // 型材结构工具
```

---

## 五、工具功能详细说明

### 5.1 框架工具 (FrameTool) 参数说明

```javascript
FrameTool(frameType, view)
    │
    ├─ frameType: ToolType  // 框架类型枚举
    ├─ view: View           // 视图对象
    │
    └─ methods:
        ├─ mousedown(evt)   // 鼠标按下
        ├─ mousemove(evt)   // 鼠标移动
        ├─ mouseup(evt)     // 鼠标抬起
        ├─ getPosition()    // 获取位置
        └─ initialTool()    // 初始化工具
```

### 5.2 窗扇工具 (SashTool) 参数说明

```javascript
SashTool(sashType, view, hardwareShape?, hingeType?)
    │
    ├─ sashType: ToolType       // 窗扇类型
    ├─ view: View               // 视图
    ├─ hardwareShape: HardwareShape (可选)  // 五金件形状
    ├─ hingeType: HardwareShape (可选)      // 铰链类型
    │
    └─ 示例:
        SashTool(doubleSash, view)
        SashTool(commercialSash, view, 
                 HardwareShape.CommercialHandle2, 
                 HardwareShape.EndpointHinge)
```

### 5.3 编辑工具通用接口

```javascript
EditTool(view)
    │
    ├─ mousedown(evt)     // 开始编辑
    ├─ mousemove(evt)     // 编辑中
    ├─ mouseup(evt)       // 结束编辑
    ├─ dragstart(evt)     // 开始拖拽
    ├─ dragmove(evt)      // 拖拽中
    ├─ dragend(evt)       // 结束拖拽
    ├─ getPosition()      // 获取位置
    ├─ cleanup()          // 清理资源
    └─ initialTool()      // 初始化
```

---

## 六、工具使用场景

### 6.1 门窗设计流程

```
1. 选择框架形状
   └─ frame_rectangle (矩形) → FrameTool
   
2. 添加中挺
   └─ mullion_vertical (竖中挺) → LineTool
   
3. 添加窗扇
   └─ doubleSash (双开) → DoubleSashTool
   
4. 编辑五金件
   └─ editHinge (铰链) → EditHingeTool
   
5. 添加标注
   └─ dim (尺寸) → DimensionTool
```

### 6.2 高级编辑流程

```
1. 选择编辑对象
   └─ 点击选中
   
2. 拖拽编辑
   └─ editDragRobot → 拖拽移动
   
3. 分割编辑
   └─ editSplitter → 分割杆件
   
4. 参数编辑
   └─ 打开属性面板修改参数
```

---

## 七、工具系统核心代码

### 7.1 工具注册

```javascript
// Line 159-1066: registerTool()
ToolManager.prototype.registerTool = function() {
    // 工具注册逻辑
    this.tools[toolType] = function() {
        return new ToolClass(view);
    };
};
```

### 7.2 工具切换

```javascript
// Line 1068-1082: switchTool() & takeTool()
ToolManager.prototype.switchTool = function(e) {
    this.tool = this.tools[e]();
    this.tool.initialTool();
    this.curTool = e;
};

ToolManager.prototype.takeTool = function(e, t) {
    this.view.keys.ca(e);
    this.tool.cleanup();
    this.switchTool(e);
};
```

### 7.3 事件钩子

```javascript
// Line 32-141: hookEvent()
ToolManager.prototype.hookEvent = function() {
    // 绑定所有事件到当前工具
    this.view.canvas.on("mousedown", (e) => {
        this.tool.mousedown(e.evt);
    });
    // ... 其他事件
};
```

---

## 八、工具统计汇总

| 分类 | 数量 | 占比 |
|------|------|------|
| 基础工具 | 5 | 3% |
| 框架创建工具 | 100+ | 67% |
| 中挺创建工具 | 30+ | 20% |
| 窗扇创建工具 | 20+ | 13% |
| 连接件工具 | 8 | 5% |
| 编辑工具 | 30+ | 20% |
| 标注工具 | 10+ | 7% |
| 装饰工具 | 8 | 5% |
| 填充工具 | 6 | 4% |
| **总计** | **150+** | **100%** |

---

## 九、工具设计模式

### 9.1 工厂模式
```javascript
// 工具通过工厂方法创建
this.tools[toolType] = function() {
    return new ToolClass(view);
};
```

### 9.2 策略模式
```javascript
// 不同工具实现不同策略
tool.mousedown(evt);  // 不同工具有不同实现
tool.mousemove(evt);
tool.mouseup(evt);
```

### 9.3 观察者模式
```javascript
// 事件绑定到工具
this.view.canvas.on("mousedown", (e) => {
    this.tool.mousedown(e.evt);
});
```

### 9.4 状态模式
```javascript
// 工具状态切换
switchTool(e) {
    this.tool.cleanup();      // 清理旧状态
    this.tool = new Tool();   // 新状态
    this.tool.initialTool();  // 初始化新状态
}
```

---

## 十、总结

### 10.1 工具系统特点

1. **数量庞大**: 150+ 工具类型，覆盖门窗设计全流程
2. **分类清晰**: 8大类工具，层次分明
3. **高度复用**: 基类+变体模式，减少代码重复
4. **事件驱动**: 完善的鼠标/触摸/键盘事件处理
5. **快捷键支持**: 键盘快捷键快速切换工具

### 10.2 核心类依赖

```
ToolManager (32.5KB)
    │
    ├── Tool (基类)
    │   ├── FrameTool (100+ 变体)
    │   ├── SashTool (20+ 变体)
    │   ├── Edit*Tool (30+)
    │   └── ...
    │
    └── Event System
        ├── Mouse Events
        ├── Touch Events
        ├── Keyboard Events
        └── Drag Events
```

---

**文档创建时间**: 2026-01-22  
**基于源码**: toolmanager.js (Line 1-1292)
