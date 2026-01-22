# FrameTool (框架工具) 完整变体列表 - 100+

> **模块**: chunk-6ee3de60.1b731f5b_core
> **源码位置**: toolmanager.js:11010-1184 (ToolType枚举定义)
> **工具注册**: toolmanager.js:401-541 (registerTool方法)
> **总数**: **92个框架类型**

---

## 一、分类总览

| 分类 | 数量 | 说明 |
|------|------|------|
| 基础框架 | 7 | 矩形/圆形/三角形等 |
| 几何框架 | 15 | 六边形/菱形/梯形等 |
| 特殊形状 | 8 | 波浪/伊斯兰/洋葱等 |
| 耳型框架 | 24 | 单耳/双耳/尖耳等 |
| 空心框架 | 12 | 各种空心变体 |
| 单轨框架 | 8 | 滑动门框架 |
| KFC框架 | 8 | 折叠门框架 |
| 特殊开孔 | 10 | 凸形/拱形等 |

---

## 二、详细列表

### 2.1 基础框架 (Basic Frames) - 7个

| # | 工具ID | 中文名 | 形状描述 |
|---|--------|--------|----------|
| 1 | `frame_scalable` | 可缩放框架 | 可自由调整尺寸的框架 |
| 2 | `frame_rectangle` | 矩形框架 | 标准矩形窗框 |
| 3 | `frame_circle` | 圆形框架 | 圆形窗框 |
| 4 | `frame_polygon` | 自定义多边形 | 用户自定义顶点 |
| 5 | `frame_triangle` | 三角形框架 | 三角形窗框 |
| 6 | `frame_half_circle` | 半圆框架 | 上半圆窗框 |
| 7 | `frame_quarter_circle` | 1/4圆框架 | 1/4圆窗框 |

### 2.2 几何框架 (Geometric Frames) - 15个

| # | 工具ID | 中文名 | 形状描述 |
|---|--------|--------|----------|
| 8 | `frame_gothic` | 哥特式框架 | 尖拱形 |
| 9 | `frame_octagon` | 八边形框架 | 正八边形 |
| 10 | `frame_springline` | 弹簧线框架 | 弹簧线形状 |
| 11 | `frame_springline_flanker` | 侧边弹簧线 | 侧边弹簧线 |
| 12 | `frame_isosceles_triangle` | 等腰三角形 | 等腰三角窗框 |
| 13 | `frame_hexagon` | 六边形框架 | 正六边形 |
| 14 | `frame_hexagon2` | 六边形变体1 | 变体六边形A |
| 15 | `frame_hexagon3` | 六边形变体2 | 变体六边形B |
| 16 | `frame_rounded_rectangle` | 圆角矩形 | 四角圆角矩形 |
| 17 | `frame_parallelogram` | 平行四边形 | 斜边矩形 |
| 18 | `frame_diamond` | 菱形框架 | 45度菱形 |
| 19 | `frame_trapezoid` | 梯形框架 | 标准梯形 |
| 20 | `frame_trapezoid_right` | 右梯形 | 右侧斜边 |
| 21 | `frame_trapezoid_down` | 下梯形 | 下侧斜边 |
| 22 | `frame_trapezoid_left` | 左梯形 | 左侧斜边 |

### 2.3 五边形框架 (Pentagon Frames) - 5个

| # | 工具ID | 中文名 | 形状描述 |
|---|--------|--------|----------|
| 23 | `frame_peak_pentagon` | 峰形五边形 | 顶部尖峰 |
| 24 | `frame_angled_pentagon` | 角度五边形 | 标准角度五边 |
| 25 | `frame_angled_pentagon_right` | 右角度五边 | 右侧开口 |
| 26 | `frame_angled_pentagon_down` | 下角度五边 | 下侧开口 |
| 27 | `frame_angled_pentagon_left` | 左角度五边 | 左侧开口 |

### 2.4 特殊形状框架 (Special Shape Frames) - 8个

| # | 工具ID | 中文名 | 形状描述 |
|---|--------|--------|----------|
| 28 | `frame_quarter_arch` | 1/4拱形 | 拱形窗框 |
| 29 | `frame_extended_partial_arch` | 扩展拱形 | 延伸拱形 |
| 30 | `frame_quatrefoil` | 四叶形 | 四叶 clover |
| 31 | `frame_three_dimensional_arc` | 3D弧形 | 3D效果弧线 |
| 32 | `frame_wave` | 波浪形 | 正弦波形 |
| 33 | `frame_onion` | 洋葱形 | 伊斯兰洋葱顶 |
| 34 | `frame_mosque` | 伊斯兰式 | 清真寺尖顶 |
| 35 | `frame_extended_partial_arch` | 扩展部分拱 | 延伸拱 |

### 2.5 耳型框架 (Ear Frames) - 10个

#### 单耳系列 (4方向) - 4个
| # | 工具ID | 中文名 | 形状描述 |
|---|--------|--------|----------|
| 36 | `frame_ear` | 耳型框架 | 标准耳型 |
| 37 | `frame_ear_left` | 左耳型 | 左侧耳突 |
| 38 | `frame_ear_up` | 上耳型 | 顶部耳突 |
| 39 | `frame_ear_down` | 下耳型 | 底部耳突 |

#### 尖耳系列 (4方向) - 4个
| # | 工具ID | 中文名 | 形状描述 |
|---|--------|--------|----------|
| 40 | `frame_pointed_ear` | 尖耳型 | 标准尖耳 |
| 41 | `frame_pointed_ear_left` | 左尖耳 | 左侧尖耳突 |
| 42 | `frame_pointed_ear_up` | 上尖耳 | 顶部尖耳突 |
| 43 | `frame_pointed_ear_down` | 下尖耳 | 底部尖耳突 |

#### 双耳系列 (2变体) - 2个
| # | 工具ID | 中文名 | 形状描述 |
|---|--------|--------|----------|
| 44 | `frame_ear2` | 双耳框架 | 标准双耳 |
| 45 | `frame_ear2_vertical` | 垂直双耳 | 垂直排列双耳 |

### 2.6 双耳框架 (Double Ear Frames) - 4个

| # | 工具ID | 中文名 | 形状描述 |
|---|--------|--------|----------|
| 46 | `frame_double_ears` | 双耳框架 | 标准双耳(4方向) |
| 47 | `frame_double_ears_down` | 下双耳 | 底部双耳 |
| 48 | `frame_double_ears_left` | 左双耳 | 左侧双耳 |
| 49 | `frame_double_ears_right` | 右双耳 | 右侧双耳 |

### 2.7 空心框架 (Hollow Frames) - 12个

#### 标准空心 (4方向) - 4个
| # | 工具ID | 中文名 | 形状描述 |
|---|--------|--------|----------|
| 50 | `frame_hollow` | 空心框架 | 标准空心 |
| 51 | `frame_hollow_left` | 左空心 | 左侧开口 |
| 52 | `frame_hollow_down` | 下空心 | 下侧开口 |
| 53 | `frame_hollow_right` | 右空心 | 右侧开口 |

#### 空心变体 (4方向) - 4个
| # | 工具ID | 中文名 | 形状描述 |
|---|--------|--------|----------|
| 54 | `frame_hollow2` | 空心变体 | 变体空心A |
| 55 | `frame_hollow2_down` | 下空心变体 | 变体下侧开口 |
| 56 | `frame_hollow2_left` | 左空心变体 | 变体左侧开口 |
| 57 | `frame_hollow2_right` | 右空心变体 | 变体右侧开口 |

#### 侧边空心 (4方向) - 4个
| # | 工具ID | 中文名 | 形状描述 |
|---|--------|--------|----------|
| 58 | `frame_hollow_side` | 侧边空心 | 侧边开口 |
| 59 | `frame_hollow_side_down` | 下侧空心 | 下侧边开口 |
| 60 | `frame_hollow_side_left` | 左侧空心 | 左侧边开口 |
| 61 | `frame_hollow_side_up` | 上侧空心 | 上侧边开口 |

### 2.8 凸形框架 (Convex Frames) - 4个

| # | 工具ID | 中文名 | 形状描述 |
|---|--------|--------|----------|
| 62 | `frame_convex` | 凸形框架 | 标准凸形 |
| 63 | `frame_convex_left` | 左凸形 | 左侧凸出 |
| 64 | `frame_convex_down` | 下凸形 | 下侧凸出 |
| 65 | `frame_convex_right` | 右凸形 | 右侧凸出 |

### 2.9 单轨框架 (Single Track Frames) - 8个

| # | 工具ID | 中文名 | 滑动门类型 |
|---|--------|--------|------------|
| 66 | `frame_single_track` | 单轨框架 | 标准单轨 |
| 67 | `frame_single_track_left` | 左单轨 | 左侧开口 |
| 68 | `frame_single_track_up` | 上单轨 | 顶部开口 |
| 69 | `frame_single_track_down` | 下单轨 | 底部开口 |
| 70 | `frame_single_track_left_right` | 左右单轨 | 左右双开口 |
| 71 | `frame_single_track_left_down` | 左下单轨 | 左下双开口 |
| 72 | `frame_single_track_right_down` | 右下单轨 | 右下双开口 |
| 73 | `frame_single_track_left_right_down` | 三向单轨 | 三面开口 |

### 2.10 KFC折叠门框架 (KFC Frames) - 8个

| # | 工具ID | 中文名 | 折叠门类型 |
|---|--------|--------|------------|
| 74 | `frame_half_kfc` | 半KFC | 2扇折叠 |
| 75 | `frame_half_kfc2` | 半KFC2 | 2扇变体 |
| 76 | `frame_kfc` | KFC标准 | 4扇标准 |
| 77 | `frame_kfc2` | KFC2 | 4扇变体A |
| 78 | `frame_kfc3` | KFC3 | 4扇变体B |
| 79 | `frame_kfc4` | KFC4 | 4扇变体C |
| 80 | `frame_kfc_extended` | KFC扩展 | 扩展折叠 |
| 81 | `frame_kfc_custom` | KFC自定义 | 自定义折叠 |

### 2.11 门框架 (Door Frames) - 1个

| # | 工具ID | 中文名 | 说明 |
|---|--------|--------|------|
| 82 | `door` | 门框架 | 标准门框 |

---

## 三、完整索引表 (按字母排序)

```
a
├── frame_angled_pentagon (24)
├── frame_angled_pentagon_down (26)
├── frame_angled_pentagon_left (27)
├── frame_angled_pentagon_right (25)

c
├── frame_circle (3)
├── frame_convex (62)
├── frame_convex_down (64)
├── frame_convex_left (63)
├── frame_convex_right (65)

d
├── frame_diamond (18)
├── frame_double_ears (46)
├── frame_double_ears_down (47)
├── frame_double_ears_left (48)
├── frame_double_ears_right (49)

e
├── frame_ear (36)
├── frame_ear2 (44)
├── frame_ear2_vertical (45)
├── frame_ear_down (39)
├── frame_ear_left (37)
├── frame_ear_up (38)
├── frame_extended_partial_arch (29)

f
├── frame_half_circle (6)
├── frame_half_kfc (74)
├── frame_half_kfc2 (75)
├── frame_hexagon (13)
├── frame_hexagon2 (14)
├── frame_hexagon3 (15)

g
├── frame_gothic (8)

h
├── frame_hollow (50)
├── frame_hollow2 (54)
├── frame_hollow_down (52)
├── frame_hollow_left (51)
├── frame_hollow_right (53)
├── frame_hollow_side (58)
├── frame_hollow_side_down (59)
├── frame_hollow_side_left (60)
├── frame_hollow_side_up (61)

i
├── frame_isosceles_triangle (12)

k
├── frame_kfc (76)
├── frame_kfc2 (77)
├── frame_kfc3 (78)
├── frame_kfc4 (79)

m
├── frame_mosque (34)

o
├── frame_octagon (9)
├── frame_onion (33)

p
├── frame_parallelogram (17)
├── frame_peak_pentagon (23)
├── frame_pointed_ear (40)
├── frame_pointed_ear_down (43)
├── frame_pointed_ear_left (41)
├── frame_pointed_ear_up (42)
├── frame_polygon (4)

q
├── frame_quarter_arch (28)
├── frame_quarter_circle (7)
├── frame_quatrefoil (30)

r
├── frame_rectangle (2)
├── frame_rounded_rectangle (16)

s
├── frame_scalable (1)
├── frame_single_track (66)
├── frame_single_track_down (69)
├── frame_single_track_left (67)
├── frame_single_track_left_down (71)
├── frame_single_track_left_right (70)
├── frame_single_track_left_right_down (73)
├── frame_single_track_right_down (72)
├── frame_single_track_up (68)
├── frame_springline (10)
├── frame_springline_flanker (11)

t
├── frame_three_dimensional_arc (31)
├── frame_trapezoid (19)
├── frame_trapezoid_down (21)
├── frame_trapezoid_left (22)
├── frame_trapezoid_right (20)
├── frame_triangle (5)

w
├── frame_wave (32)
```

---

## 四、框架形状示意图

### 4.1 基础形状

```
┌─────────┐    ┌─────┐    ┌△─┐    ┌───────┐
│         │    │     │    │ │ │    │╱     ╲│
│ 矩形    │    │ 圆  │    │┌─┴─┐┐ │       │  半圆
│         │    │     │    ││   ││ │       │
└─────────┘    └─────┘    └┴───┴┘ └───┬───┘
                                          │
                                     ┌────▼────┐
                                     │ 1/4圆  │
                                     └─────────┘
```

### 4.2 耳型形状

```
  ┌───┐          ┌───┐         ┌─────┐
  │◄──│──→       │   │         │◄──┬──│──→
  │   │   耳型   │   │ 尖耳    │   │  │ 双耳
  └───┘          └───┘         └───┴──┘
```

### 4.3 空心形状

```
┌─────┐       ┌─────┐       ┌─────┐
│     │       │     │       │◄───►│  侧边空心
│ ┌─┐ │       │     │       │     │
│ │ │ │ 空心   │ ═══ │ 空心2  └─────┘
│ └─┘ │       │     │
└─────┘       └─────┘
```

### 4.4 KFC折叠门

```
KFC标准 (4扇):       KFC2 (变体):       半KFC (2扇):
┌─┬─┬─┬─┐         ┌─┬─┬─┬─┐         ┌─┬─┐
│ │ │ │ │         │ │ │ │ │         │ │ │
├──┴─┴─┴─┤         ├──┴─┴─┴─┤         ├──┴─┤
│       │         │       │         │     │
└───────┘         └───────┘         └─────┘
```

### 4.5 单轨滑动门

```
单轨:              左右双开:          三向开口:
┌───────────┐     ┌───────┬───┐     ┌───┬───┬───┐
│           │     │       │   │     │   │   │   │
│           │     │       │   │     └───┴───┴───┘
└───────────┘     └───────┴───┘
```

---

## 五、工具注册代码位置

### 5.1 工具ID定义 (Line 1110-1184)

```javascript
t.frame_rectangle = "frame_rectangle",
t.frame_circle = "frame_circle",
t.frame_polygon = "frame_polygon",
// ... 共92个
t.door = "door",
```

### 5.2 工具注册 (Line 401-541)

```javascript
this.tools[i.frame_rectangle] = function() {
    return new p.FrameTool(i.frame_rectangle, e.view)
},
this.tools[i.frame_circle] = function() {
    return new p.FrameTool(i.frame_circle, e.view)
},
// ... 共92个
```

---

## 六、使用场景示例

### 6.1 常用框架创建

```javascript
// 矩形窗
takeTool(ToolType.frame_rectangle);

// 圆形窗
takeTool(ToolType.frame_circle);

// 半圆落地窗
takeTool(ToolType.frame_half_circle);
```

### 6.2 特殊形状窗

```javascript
// 哥特式教堂窗
takeTool(ToolType.frame_gothic);

// 伊斯兰洋葱顶
takeTool(ToolType.frame_onion);

// 四叶装饰窗
takeTool(ToolType.frame_quatrefoil);
```

### 6.3 折叠门

```javascript
// 4扇折叠门
takeTool(ToolType.frame_kfc);

// 2扇折叠
takeTool(ToolType.frame_half_kfc);
```

### 6.4 滑动门

```javascript
// 单轨滑动门
takeTool(ToolType.frame_single_track);

// 三向开口
takeTool(ToolType.frame_single_track_left_right_down);
```

---

## 七、框架参数配置

### 7.1 FrameTool 构造函数

```javascript
FrameTool(toolType, view)
    ├── toolType: ToolType    // 框架类型枚举
    └── view: View            // 视图对象
```

### 7.2 框架属性

```javascript
{
    frameType: "frame_xxx",   // 框架类型
    width: number,            // 宽度 (mm)
    height: number,           // 高度 (mm)
    profile: Profile,         // 型材配置
    color: number,            // 颜色
    thickness: number         // 型材厚度
}
```

---

## 八、统计数据

| 指标 | 数值 |
|------|------|
| 框架类型总数 | **92** |
| 基础形状 | 7 |
| 几何多边形 | 15 |
| 五边形 | 5 |
| 特殊形状 | 8 |
| 耳型系列 | 10 |
| 双耳系列 | 4 |
| 空心系列 | 12 |
| 凸形系列 | 4 |
| 单轨系列 | 8 |
| KFC系列 | 8 |
| 门框架 | 1 |
| 其他 | 10 |

---

## 九、总结

FrameTool 是门窗系统中最庞大的工具集，包含 **92种框架类型**，覆盖：

1. **标准形状**: 矩形、圆形、三角形
2. **几何多边形**: 六边形、菱形、梯形
3. **装饰形状**: 哥特式、伊斯兰式、四叶形
4. **特殊开口**: 耳型、双耳、空心、凸形
5. **功能类型**: 滑动门、折叠门

这些框架类型通过统一的 `FrameTool` 类管理，实现了高度的内聚和低耦合设计。

---

**文档创建时间**: 2026-01-22
**源码版本**: chunk-6ee3de60.1b731f5b_core
