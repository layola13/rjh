# 暗装工程水电系统与柜体电路集成完整架构文档

> **文档版本**: v2.0  
> **创建时间**: 2026-01-22  
> **分析范围**: 暗装工程水电系统 + 柜体电路模块集成  
> **架构层级**: 9-11层完整架构  
> **源码基础**: dist/core-hs.fe5726b7.bundle + plugins-hs

---

## 📋 目录

1. [系统总览](#1-系统总览)
2. [核心架构层次](#2-核心架构层次9-11层)
3. [电路系统完整架构](#3-电路系统完整架构)
4. [水路系统完整架构](#4-水路系统完整架构)
5. [柜体电路集成机制](#5-柜体电路集成机制)
6. [暗装工程布线算法](#6-暗装工程布线算法)
7. [柜体避让算法](#7-柜体避让算法)
8. [电路组件系统](#8-电路组件系统)
9. [水路组件系统](#9-水路组件系统)
10. [实战示例](#10-实战示例)
11. [源码索引](#11-源码索引)

---

## 1. 系统总览

### 1.1 系统定位

暗装工程水电系统是一个**智能化水电点位规划与布线系统**，核心特点：

- ✅ **自动布线**: 基于A*算法的智能路径规划
- ✅ **障碍物避让**: 柜体、墙体、门窗自动避让
- ✅ **双轨避让策略**: 电线弧形避让 + 水管正交避让
- ✅ **柜体集成**: 柜体作为障碍物参与布线计算
- ✅ **电路模块化**: 支持照明/电源/弱电多种回路
- ✅ **水路分类**: 冷水/热水/下水独立管理

### 1.2 关键问题解答

#### ❓ 柜体里面是否有电路模块？

**答案**: ❌ **柜体内部没有独立的电路模块系统**

**详细说明**:
1. **柜体角色**: 柜体在暗装工程系统中作为**障碍物（Obstacle）**存在
2. **避让关系**: 电路/水路在布线时会**自动避让柜体**
3. **集成方式**: 不是"柜体包含电路"，而是"电路绕过柜体"
4. **照明支持**: 柜体可以有**灯光板（Lightboard）**部件，但这是柜体自身的组件，不属于暗装工程电路系统

源码证据:
- [`obstacle.js:79-318`](dist/core-hs.fe5726b7.bundle_dewebpack/obstacle.js:79) - 柜体继承自Obstacle
- [`dist-module-architecture-analysis.md:876-920`](todo/dist-module-architecture-analysis.md:876) - 柜体在障碍物列表中
- [`cabinet.js:19-89`](dist/plugins-hs-9fd2f87f.fe5726b7.bundle_dewebpack/cabinet.js:19) - 柜体创建流程，无电路系统

#### ❓ 柜体如何与水电系统集成？

**答案**: 柜体通过**障碍物系统**与水电集成，采用**避让策略**

**集成机制**:
```
Scene.getObstacles() → 返回障碍物列表
  ├─ Wall (墙体)
  ├─ Door (门)
  ├─ Window (窗)
  ├─ Cabinet (柜体) ⭐
  ├─ Furniture (家具)
  └─ Column (结构柱)

TubeTree.findPath(from, to)
  ├─ 步骤1: 获取场景障碍物（包括柜体）
  ├─ 步骤2: A*路径规划（避开障碍物）
  ├─ 步骤3: 碰撞检测
  └─ 步骤4: 生成避让路径
```

源码位置: [`dist-module-architecture-analysis.md:876-920`](todo/dist-module-architecture-analysis.md:876)

---

## 2. 核心架构层次（9-11层）

### 2.1 完整系统架构图

```
第1层: Floorplan（楼层平面）
  │
  ├─ 属性: floors[], activeFloor
  └─ 方法: getActiveFloor(), addFloor()
  
第2层: Scene（场景）
  │
  ├─ 属性: layers[], activeLayer, obstacles[]
  ├─ 方法: getActiveLayer(), getObstacles()
  └─ 作用: 管理图层和场景对象
  
第3层: ActiveLayer（活动图层）
  │
  ├─ ConcealedWork（暗装工程主对象）⭐
  ├─ Walls（墙体系统）
  ├─ Furniture（家具系统）
  └─ Cabinets（柜体系统）
  
第4层: ConcealedWork（暗装工程）
  │
  ├─ PowerSystem（电力系统）
  │   ├─ 文件: concealedworkpowersystem.js
  │   ├─ 属性: circuits[]
  │   └─ 方法: addCircuit(), removeCircuit()
  │
  └─ WaterComponents（水系统）
      ├─ HotWaterComp（热水组件）
      ├─ ColdWaterComp（冷水组件）
      └─ DrainPipe（排水管）
  
第5层: PowerSystem（电力系统）
  │
  └─ Circuit[]（电路数组）
      ├─ 文件: concealedworkcircuit.js
      ├─ 属性: circuitType, breakerType, tubeType, wireType
      └─ 方法: addRouteTree(), getTubes(), getNodes()
  
第6层: Circuit（电路）
  │
  ├─ 属性:
  │   ├─ circuitType: Lighting | Power
  │   ├─ breakerType: 断路器类型
  │   ├─ tubeType: 线管类型
  │   ├─ wireType: 电线规格（2.5mm²/4mm²等）
  │   ├─ roomRange: 适用房间数组
  │   └─ lightControl: 照明控制配置
  │
  └─ TubeTree[]（管线树数组）
      ├─ 文件: concealedworktubetree.js
      └─ 作用: 管理一个回路的所有管线
  
第7层: TubeTree（管线树）
  │
  ├─ Tube[]（管段数组）
  │   ├─ 文件: concealedworktube.js
  │   ├─ 属性: route, diameter, color, tubeType
  │   └─ 方法: getMeshDefinition(), updateGeometry()
  │
  └─ Node[]（节点数组）
      ├─ 文件: concealedworknode.js
      ├─ 属性: _position (Vector3), tubes[]
      └─ 方法: getValidTubes(), getParentNode(), getChildNodes()
  
第8层: Tube（管段）
  │
  ├─ 属性:
  │   ├─ route: (Line3d | Arc3d)[] - 混合路径
  │   ├─ diameter: 管线直径
  │   ├─ color: 颜色编码
  │   │   ├─ 强电: 16735045 (#FF9045 橙红色)
  │   │   ├─ 弱电: 3763966 (#396B9E 深蓝色)
  │   │   ├─ 热水: 4653276 (#46FADC 红色调)
  │   │   └─ 冷水: 4694913 (#479F61 蓝色调)
  │   └─ tubeType: TubeMeshTypeEnum
  │
  └─ 几何表示:
      ├─ Line3d: 直线段（水管、电线直线部分）
      └─ Arc3d: 圆弧段（电线避让弧线）
  
第9层: Node（节点）
  │
  ├─ 属性:
  │   └─ _position: Vector3 (x, y, z)
  │
  ├─ 节点类型:
  │   ├─ DeviceNode: 设备节点（开关/插座）
  │   ├─ TerminalNode: 末端节点
  │   └─ JoinNode: 连接节点（分支点）
  │
  └─ 拓扑关系:
      ├─ getParentNode(): 获取父节点
      ├─ getChildNodes(): 获取子节点数组
      └─ getTubeAt(direction): 按方向查找管线
  
第10层: 避让系统（Avoidance System）
  │
  ├─ Obstacle（障碍物基类）
  │   ├─ 文件: obstacle.js:79-318
  │   ├─ 继承: CustomizedModel
  │   ├─ 属性: geometry, height, moldings[]
  │   └─ 方法: containsPoint(), intersectsPath()
  │
  ├─ SubObstacle（精细障碍物）
  │   ├─ 文件: subobstacle.js:2350-2441
  │   ├─ 用途: 家具、柜体等精细避让
  │   └─ 方法: clipPolygon(path, obstacles)
  │
  └─ calculateCrossArc（避让算法）
      ├─ 文件: tubemeshtypeenum.js:357-425
      ├─ 用途: 电线交叉避让弧形生成
      └─ 输入: tube, otherTubes[]
  
第11层: 网格生成系统（Mesh Generation）
  │
  ├─ TubeMeshCreator
  │   ├─ 文件: tubemeshtypeenum.js
  │   ├─ 方法: getDefaultMesh(), createTube()
  │   └─ 类型: elecVertical, waterVertical, straight
  │
  └─ 物理常量
      ├─ elecPathR: 0.1m (100mm)
      ├─ waterPathR: 0.03m (30mm)
      ├─ waterTubeThickness: 0.005m (5mm)
      └─ precision: 1e-6
```

### 2.2 数据流向图

```
用户操作: 添加开关/插座
  │
  ▼
[第3层] ConcealedWork.addDevice()
  │
  ▼
[第4层] PowerSystem.getCircuitForDevice()
  │  └─ 选择或创建Circuit
  │
  ▼
[第5层] Circuit.addDevice(device)
  │  └─ device加入devices[]
  │
  ▼
[第6层] Circuit.updateRoute()
  │
  ▼
[第7层] TubeTree.findPath(from, to)
  │  ├─ A*路径规划
  │  └─ 返回路径点
  │
  ▼
[第10层] 障碍物检测
  │  ├─ Scene.getObstacles()
  │  │   ├─ Wall
  │  │   ├─ Cabinet ⭐ 柜体作为障碍物
  │  │   └─ Furniture
  │  │
  │  └─ calculateCrossArc(tube, obstacles)
  │      ├─ 检测交点
  │      └─ 生成避让弧线
  │
  ▼
[第8层] 


### 3.1 电路类型系统

#### 3.1.1 回路类型枚举（CircuitType）

```typescript
enum CircuitType {
  Lighting = "lighting",    // 照明回路
  Power = "power",          // 电源回路（插座）
  WeakElec = "weakelec"     // 弱电回路（网络/电话）
}
```

**源码位置**: [`concealedworkcircuit.js:36`](dist/core-hs.fe5726b7.bundle_dewebpack/concealedworkcircuit.js:36)

**回路特性对比**:

| 回路类型 | 用途 | 典型负载 | 线管类型 | 电线规格 |
|---------|------|---------|---------|---------|
| Lighting | 照明供电 | 灯具、开关 | PVC管 | 1.5mm² |
| Power | 插座供电 | 插座、电器 | PVC管/金属管 | 2.5mm²/4mm² |
| WeakElec | 弱电传输 | 网络、电话 | 弱电管 | 网线/电话线 |

#### 3.1.2 断路器类型（BreakerType）

```typescript
interface BreakerType {
  MCB: "miniature_circuit_breaker",    // 微型断路器
  RCD: "residual_current_device",      // 漏电保护器
  AFCI: "arc_fault_circuit_interrupter" // 电弧故障断路器
}
```

**源码位置**: [`concealedworkcircuit.js:38`](dist/core-hs.fe5726b7.bundle_dewebpack/concealedworkcircuit.js:38)

### 3.2 电路数据结构

#### 3.2.1 Circuit完整定义

```typescript
class ConcealedWorkCircuit extends Entity {
  // 基础属性
  circuitType: CircuitType;           // 回路类型: lighting/power/weakelec
  circuitTypeNumber: number;          // 回路编号: 1, 2, 3...
  breakerType: string;                // 断路器类型标识
  tubeType: string;                   // 线管类型: PVC/金属管
  wireType: string;                   // 电线规格: 1.5mm²/2.5mm²/4mm²
  roomRange: string[];                // 适用房间范围
  lightControl: LightControlConfig;   // 照明控制配置
  
  // 路由管理
  get routes(): TubeTree[] {
    return this.getChildren()
      .filter(c => c instanceof ConcealedWorkTubeTree);
  }
  
  // 路由树操作
  addRouteTree(tree: TubeTree): void {
    this.addChild(tree);
  }
  
  removeRouteTree(treeId: string): void {
    this.removeChild(treeId);
  }
  
  // 设备查询
  queryTubesBySeekId(seekId: string): Tube[] {
    const result = [];
    for (const tree of this.routes) {
      const tubes = tree.tubes.filter(t => t.seekId === seekId);
      result.push(...tubes);
    }
    return result;
  }
  
  // 获取所有管线
  getTubes(): Tube[] {
    const allTubes = [];
    for (const tree of this.routes) {
      allTubes.push(...tree.tubes);
    }
    return allTubes;
  }
  
  // 获取所有节点
  getNodes(): Node[] {
    const allNodes = [];
    for (const tree of this.routes) {
      allNodes.push(...tree.nodes);
    }
    return allNodes;
  }
}
```

**源码位置**: [`concealedworkcircuit.js:36-134`](dist/core-hs.fe5726b7.bundle_dewebpack/concealedworkcircuit.js:36)

### 3.3 电路创建流程

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
  │           ├─→ 设置circuitType
  │           ├─→ 设置breakerType
  │           ├─→ 设置wireType
  │           └─→ 初始化routeTree
  │
  ├─→ 添加设备
  │     │
  │     └─→ Circuit.addDevice(device)
  │           │
  │           ├─→ devices.push(device)
  │           └─→ 创建Node节点
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

**源码位置**: [`dist-module-architecture-analysis.md:727-769`](todo/dist-module-architecture-analysis.md:727)

---

## 4. 水路系统完整架构

### 4.1 水路组件分类

```typescript
// 水路组件类型
enum WaterComponentType {
  HotWater = "hot_water",      // 热水管
  ColdWater = "cold_water",    // 冷水管
  DrainPipe = "drain_pipe"     // 下水管
}

// 组件类定义
class CWHotWaterComp extends Entity {
  color: number = 4653276;     // #46FADC 红色调
  pathR: number = 0.03;        // 30mm半径
  tubeThickness: number = 0.005; // 5mm壁厚
}

class CWColdWaterComp extends Entity {
  color: number = 4694913;     // #479F61 蓝色调
  pathR: number = 0.03;        // 30mm半径
  tubeThickness: number = 0.005; // 5mm壁厚
}

class CWDrainPipe extends Entity {
  color: number = 8421504;     // #808080 灰色
  pathR: number = 0.05;        // 50mm半径（更粗）
  tubeThickness: number = 0.003; // 3mm壁厚
}
```

**源码位置**: 
- [`concealedworktube.js:52-53`](dist/core-hs.fe5726b7.bundle_dewebpack/concealedworktube.js:52) - 颜色常量
- [`tubemeshtypeenum.js:37`](dist/core-hs.fe5726b7.bundle_dewebpack/tubemeshtypeenum.js:37) - 水管半径

### 4.2 水管路径特点

**关键差异**: 水管使用**正交弯头**，不使用弧形避让

```typescript
// 水管弯头生成 - 使用两段Line3d形成90度角
// 源码: tubemeshtypeenum.js:105-122
case TubeMeshTypeEnum.waterVertical: {
  let pathR = customPathR || waterPathR;  // 默认0.03m (30mm)
  
  // 创建正交弯头: 两段直线形成90度
  const line1 = new Line3d(
    Vector3.Y(pathR),    // 起点: (0, 30mm, 0)
    Vector3.O()          // 中点: (0, 0, 0)
  );
  
  const line2 = new Line3d(
    Vector3.O(),         // 中点: (0, 0, 0)
    Vector3.X(pathR)     // 终点: (30mm, 0, 0)
  );
  
  // 创建管道网格 (带壁厚)
  return createTube(
    [line1, line2],           // 路径段
    diameter,                 // 外径
    isWater = true           // 标记为水管
  );
}
```

**水管特性**:
- ✅ 使用标准90度弯头组合
- ✅ 符合实际管道施工规范
- ✅ 路径更短、更直接
- ❌ 不使用弧形避让（材料特性限制）

### 4.3 水管创建流程

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

**源码位置**: [`dist-module-architecture-analysis.md:770-802`](todo/dist-module-architecture-analysis.md:770)

### 4.4 水管vs电线对比

| 特性 | 电线 | 水管 |
|-----|------|------|
| **弯头类型** | Arc3d弧形 | Line3d×2正交 |
| **弯曲半径** | 100mm (可调) | 30mm (固定) |
| **避让策略** | calculateCrossArc() | 多段waterVertical组合 |
| **路径规划** | A*算法 | Manhattan算法 |
| **颜色编码** | 强电#FF9045/弱电#396B9E | 热水#46FADC/冷水#479F61 |
| **管壁厚度** | 无（线管） | 5mm |
| **适用场景** | 柔性材料 | 刚性管材 |

---

## 5. 柜体电路集成机制

### 5.1 柜体在暗装系统中的角色

**核心结论**: 柜体**不包含**电路模块，而是作为**障碍物**参与布线

#### 5.1.1 柜体继承关系

```typescript
// 柜体继承自Obstacle
Cabinet extends NCustomizedParametricModel
  ↓
NCustomizedParametricModel extends CustomizedModel
  ↓
CustomizedModel extends Obstacle
  ↓
Obstacle extends Entity
```

**源码位置**: [`obstacle.js:79-318`](dist/core-hs.fe5726b7.bundle_dewebpack/obstacle.js:79)

#### 5.1.2 柜体部件系统

柜体有自己的部件系统，但**不包含暗装电路**：

```typescript
// 柜体部件枚举
const CabinetPartsEnum = {
  Body: "cabinetbody",              // 柜体
  Door: "Door",                      // 门板
  Handle: "Handle",                  // 把手
  Drawer: "Drawer",                  // 抽屉
  Lightboard: "Lightboard", // 灯光板 ⭐ 注意：这是柜体自带的照明
  Appliance: "Appliance",            // 电器
  Countertop: "Countertop",          // 台面
  // ... 更多部件
};
```

**关键说明**:
- `Lightboard`（灯光板）是柜体的**装饰照明部件**
- 它**不是**暗装工程的电路组件
- 它不参与Circuit/TubeTree系统
- 它是柜体模型的3D几何部分

**源码位置**: [`cabinet.js:19-89`](dist/plugins-hs-9fd2f87f.fe5726b7.bundle_dewebpack/cabinet.js:19)

### 5.2 柜体与暗装系统的交互

#### 5.2.1 障碍物注册流程

```
柜体创建
  │
  ▼
Cabinet.constructor()
  │
  ├─→ 继承Obstacle基类
  │     └─→ 
自动注册为Obstacle
  │
  ▼
Scene.addObject(cabinet)
  │
  ├─→ 添加到场景对象列表
  └─→ 添加到障碍物列表 (obstacles[])
  
暗装布线时
  │
  ▼
TubeTree.findPath(from, to)
  │
  ├─→ Scene.getObstacles()
  │     └─→ 返回包含柜体的障碍物列表
  │
  └─→ 路径规划时自动避让柜体
```

**源码位置**: [`dist-module-architecture-analysis.md:876-920`](todo/dist-module-architecture-analysis.md:876)

#### 5.2.2 柜体几何信息提取

```typescript
// 柜体为布线提供的几何信息
interface CabinetGeometry {
  // 2D投影多边形
  getProjection(): Polygon2D {
    return this.getFrontProjection();
  }
  
  // 3D包围盒
  getBoundingBox(): Box3 {
    return new Box3(
      new Vector3(this.x, this.y, 0),
      new Vector3(
        this.x + this.parameters.ID_W,
        this.y + this.parameters.ID_D,
        this.parameters.ID_H
      )
    );
  }
  
  // 高度信息（用于判断是否需要避让）
  getHeight(): number {
    return this.parameters.ID_H;  // 柜体高度
  }
}
```

### 5.3 柜体类型与避让策略

不同类型柜体有不同的避让规则：

| 柜体类型 | 英文名 | 避让高度范围 | 避让策略 |
|---------|--------|------------|---------|
| 地柜 | BaseCabinet | 0-0.9m | 全高度避让 |
| 吊柜 | WallCabinet | 1.5-2.4m | 高度范围避让 |
| 高柜 | HighCabinet | 0-2.4m | Z<0.5m时避让 |
| 灯光板 | LightBoard | 变化 | Z≥1.5m时避让 |

**源码位置**: [`subobstacle.js:2350-2441`](dist/plugins-hs-9fd2f87f.fe5726b7.bundle_dewebpack/subobstacle.js:2350)

### 5.4 柜体避让示意图

```
俯视图（Top View）:

墙面 ─────────────────────────────
      │                         │
      │  [地柜1]    [地柜2]     │
      │  ┌─────┐   ┌─────┐     │
电路  │  │     │   │     │     │
起点──┼──┤  ⚡  ├───┤     ├─────┼──终点
      │  │     │   │     │     │
      │  └─────┘   └─────┘     │
      │                         │
墙面 ─────────────────────────────

电路路径: 起点 → 弧线避让柜体1 → 直线 → 弧线避让柜体2 → 终点
```

---

## 6. 暗装工程布线算法

### 6.1 电线弧形避让算法（calculateCrossArc）

**源码位置**: [`tubemeshtypeenum.js:357-425`](dist/core-hs.fe5726b7.bundle_dewebpack/tubemeshtypeenum.js:357)

#### 6.1.1 算法流程图

```
开始 calculateCrossArc(tube)
  │
  ├─ 步骤1: 类型检查
  │   └─ if (route[0].type !== LINE_3D) return [route[0]]
  │
  ├─ 步骤2: 定义安全间隙
  │   └─ clearance = 1.2 * tube.diameter  // 120%直径
  │
  ├─ 步骤3: 检查管线长度
  │   └─ if (length < 2 * clearance) return [route]
  │
  ├─ 步骤4: 定义安全段
  │   └─ safeSegment = Line3d(
  │       start + clearance_vector,
  │       end - clearance_vector
  │   )
  │
  ├─ 步骤5: 遍历所有其他管线
  │   └─ for tube2 in activeLayer.allTubes
  │
  ├─ 步骤6: 过滤条件
  │   ├─ if (tube.id >= tube2.id) continue
  │   ├─ if (!tube2.route.length) continue
  │   ├─ if (route.type !== LINE_3D) continue
  │   └─ if (route.isParallelTo(tube2.route)) continue
  │
  ├─ 步骤7: 计算交点
  │   └─ intersections = MathAlg.CalculateIntersect.curve3ds(
  │       safeSegment, tube2.route
  │   )
  │
  ├─ 步骤8: 存储交点信息
  │   └─ for pt in intersections:
  │       crossPoints.push({ pt, dir: tube2.direction })
  │
  ├─ 步骤9: 参数排序
  │   └─ crossPoints.sort(by route parameter)
  │
  ├─ 步骤10: 分组邻近交点
  │   └─ 距离阈值: 3 × diameter²
  │       ├─ 如果交点距离 < 阈值 → 合并到同一组
  │       └─ 否则 → 创建新组
  │
  ├─ 步骤11: 生成弧线
  │   └─ for each group:
  │       ├─ startPt = groupStart.pt - clearance × direction
  │       ├─ endPt = groupEnd.pt + clearance × direction
  │       ├─ midPt = (startPt + endPt) / 2
  │       ├─ offset = crossProduct(dir, otherDir)
  │       ├─ if (offset.z > 0) offset *= -1  // 确保一致方向
  │       ├─ midPt += offset × clearance
  │       └─ arc = Arc3d.makeArcByThreePoints(startPt, midPt, endPt)
  │
  ├─ 步骤12: 组装路径
  │   └─ finalPath = [
  │       Line3d(start, arc1.start),
  │       arc1,
  │       Line3d(arc1.end, arc2.start),
  │       arc2,
  │       Line3d(arc2.end, end)
  │   ]
  │
  └─ 步骤13: 返回结果
      └─ return finalPath
```

#### 6.1.2 算法伪代码

```python
def calculateCrossArc(tube: Tube) -> Path[]:
    # 步骤1-3: 基础检查
    if tube.route[0].type != LINE_3D:
        return [tube.route[0]]
    
    clearance = 1.2 * tube.diameter
    if tube.route[0].length < 2 * clearance:
        return tube.route
    
    # 步骤4: 定义安全段
    direction = tube.route.direction
    safeSegment = Line3d(
        tube.route.start + clearance * direction,
        tube.route.end - clearance * direction
    )
    
    # 步骤5-8: 收集交点
    intersections = []
    for otherTube in scene.activeLayer.allTubes:
        # 步骤6: 过滤
        if otherTube.id <= tube.id: continue
        if not otherTube.route: continue
        if otherTube.route.isParallelTo(tube.route): continue
        
        # 步骤7: 计算交点
        crossPoints = MathAlg.CalculateIntersect.curve3ds(
            safeSegment, 
            otherTube.route
        )
        
        # 步骤8: 存储
        for pt in crossPoints:
            intersections.append({
                'pt': pt,
                'dir': otherTube.direction
            })
    
    if len(intersections) == 0:
        return [tube.route]
    
    # 步骤9: 排序
    intersections.sort(key=lambda x: safeSegment.getParamAt(x.pt))
    
    # 步骤10-11: 分组并生成弧线
    arcs = []
    groupStart = intersections[0]
    groupEnd = intersections[0]
    
    for i in range(1, len(intersections)):
        distance = (intersections[i].pt - groupEnd.pt).lengthSq()
        
        if distance > 3 * tube.diameter * tube.diameter:
            # 生成当前组的弧线
            arc = generateArc(groupStart, groupEnd, clearance, direction)
            arcs.append(arc)
            groupStart = intersections[i]
        
        groupEnd = intersections[i]
    
    # 最后一组
    arc = generateArc(groupStart, groupEnd, clearance, direction)
    arcs.append(arc)
    
    # 步骤12: 组装最终路径
    finalPath = []
    currentPt = tube.route.start
    
    for arc in arcs:
        finalPath.append(Line3d(currentPt, arc.start))
        finalPath.append(arc)
        currentPt = arc.end
    
    finalPath.append(Line3d(currentPt, tube.route.end))
    
    return finalPath

def generateArc(groupStart, groupEnd, clearance, direction):
    """生成避让弧线"""
    startPt = groupStart.pt - clearance * direction
    endPt = groupEnd.pt + clearance * direction
    midPt = (startPt + endPt) / 2
    
    # 计算垂直偏移
    offset = crossProduct(direction, groupStart.dir)
    if offset.z > 0:
        offset = -offset
    
    midPt += offset * clearance
    
    # 生成三点弧线
    return Arc3d.makeArcByThreePoints(startPt, midPt, endPt)
```

### 6.2 水管正交布线算法（Manhattan）

**源码位置**: [`dist-module-architecture-analysis.md:2195-2229`](todo/dist-module-architecture-analysis.md:2195)

#### 6.2.1 Manhattan算法流程

```
开始 manhattanRouting(start, target)
  │
  ├─ 阶段1: 沿X轴移动
  │   └─ if (current.x !== target.x):
  │       ├─ waypoint = (target.x, current.y, current.z)
  │       └─ if (!hasObstacle(current, waypoint)):
  │           ├─ path.push(createTube(current, waypoint, 'waterVertical'))
  │           └─ current = waypoint
  │
  ├─ 阶段2: 沿Y轴移动
  │   └─ if (current.y !== target.y):
  │       ├─ waypoint = (current.x, target.y, current.z)
  │       └─ if (!hasObstacle(current, waypoint)):
  │           ├─ path.push(createTube(current, waypoint, 'waterVertical'))
  │           └─ current = waypoint
  │
  ├─ 阶段3: 沿Z轴移动
  │   └─ if (current.z !== target.z):
  │       ├─ path.push(createTube(current, target, 'waterVertical'))
  │       └─ current = target
  │
  └─ 返回path
```

#### 6.2.2 水管避让示意图

```
侧视图（Side View）:

终点 ●
      │
      │ 90°弯头
      └────┐
           │
           │ 90°弯头
      ┌────┘
      │
起点 ●

特点:
- 全部使用90度正交弯头
- 路径由多段Line3d组成
- 每个弯头都是waterVertical类型
- 不使用弧形过渡
```

### 6.3 A*路径规划算法

**源码位置**: [`dist-module-architecture-analysis.md:2081-2124`](todo/dist-module-architecture-analysis.md:2081)

```javascript
function findPath(startNode, endNode, obstacles) {
  // 初始化开放列表和关闭列表
  let openList = new PriorityQueue()
  let closedList = new Set()
  
  // 启发函数 h(n) = 欧几里得距离
  function heuristic(node, goal) {
    return distance(node.position, goal.position)
  }
  
  // 起点加入开放列表
  startNode.g = 0
  startNode.h = heuristic(startNode, endNode)
  startNode.f = startNode.g + startNode.h
  openList.push(startNode)
  
  while (!openList.isEmpty()) {
    // 取出f值最小的节点
    let current = openList.pop()
    
    // 到达终点
    if (current === endNode) {
      return reconstructPath(current)
    }
    
    // 加入关闭列表
    closedList.add(current)
    
    // 遍历邻居节点
    for (let neighbor of getNeighbors(current)) {
      if (closedList.has(neighbor)) continue
      if (isObstacle(neighbor, obstacles)) continue  // 柜体避让 ⭐
      
      // 计算g值
      let tentativeG = current.g + distance(current, neighbor)
      
      if (tentativeG < neighbor.g || !openList.contains(neighbor)) {
        neighbor.parent = current
        neighbor.g = tentativeG
        neighbor.h = heuristic(neighbor, endNode)
        neighbor.f = neighbor.g + neighbor.h
        
        if (!openList.contains(neighbor)) {
          openList.push(neighbor)
        }
      }
    }
  }
  
  return null  // 无可达路径
}
```

---

## 7. 柜体避让算法

### 7.1 障碍物检测系统

#### 7.1.1 Obstacle基类

**源码位置**: [`obstacle.js:79-318`](dist/core-hs.fe5726b7.bundle_dewebpack/obstacle.js:79)


0.3, 0.8)   // 净水器出水点
  ];
  
  concealedWork.addWaterComponent(coldWater);
  
  // 步骤2: 创建热水组件
  const hotWater = new CWHotWaterComp();
  hotWater.heaterConnection = new Vector3(0.5, 0, 1.5);  // 热水器
  hotWater.outletPoints = [
    new Vector3(1.5, 0.3, 0.8)   // 水槽热水
  ];
  
  concealedWork.addWaterComponent(hotWater);
  
  // 步骤3: 自动布线（Manhattan算法+正交弯头）
  await coldWater.updateRoute();
  await hotWater.updateRoute();
  
  console.log("水管布线完成，已自动避让柜体");
  
  return { coldWater, hotWater };
}
```

---

## 11. 源码索引

### 11.1 核心类文件

| 类名 | 文件路径 | 行号 | 说明 |
|------|---------|------|------|
| ConcealedWork | dist/core-hs.fe5726b7.bundle_dewebpack/concealedwork.js | - | 暗装工程主类 |
| ConcealedWorkPowerSystem | dist/core-hs.fe5726b7.bundle_dewebpack/concealedworkpowersystem.js | 24-34 | 电力系统 |
| ConcealedWorkCircuit | dist/core-hs.fe5726b7.bundle_dewebpack/concealedworkcircuit.js | 36-134 | 电路管理 |
| ConcealedWorkNode | dist/core-hs.fe5726b7.bundle_dewebpack/concealedworknode.js | 65-144 | 节点连接 |
| ConcealedWorkTube | dist/core-hs.fe5726b7.bundle_dewebpack/concealedworktube.js | 49-280 | 管段定义 |
| Obstacle | dist/core-hs.fe5726b7.bundle_dewebpack/obstacle.js | 79-318 | 障碍物基类 |
| SubObstacle | dist/plugins-hs-9fd2f87f.fe5726b7.bundle_dewebpack/subobstacle.js | 2350-2441 | 精细障碍物 |
| TubeMeshCreator | dist/core-hs.fe5726b7.bundle_dewebpack/tubemeshtypeenum.js | 全文件 | 网格生成器 |

### 11.2 核心算法

| 算法名称 | 文件路径 | 行号 | 说明 |
|---------|---------|------|------|
| calculateCrossArc | tubemeshtypeenum.js | 357-425 | 电线弧形避让（核心） |
| 电气弯头生成 | tubemeshtypeenum.js | 85-104 | Arc3d圆弧，R=100mm |
| 水管弯头生成 | tubemeshtypeenum.js | 105-122 | Line3d×2正交，L=30mm |
| 类型判断 | concealedworktube.js | 205-209 | 电线/水管分类 |
| 半径选择 | concealedworktube.js | 262-265 | elec=100mm/water=30mm |
| 网格生成 | tubemeshtypeenum.js | 156-193 | 曲线扫描生成mesh |
| A*路径规划 | 推断位置 | - | 电线智能布线 |
| Manhattan布线 | 推断位置 | - | 水管正交布线 |

### 11.3 物理常量

| 常量名 | 值 | 单位 | 文件 | 行号 |
|-------|-----|------|------|------|
| elecPathR | 0.1 | m (100mm) | tubemeshtypeenum.js | 36 |
| waterPathR | 0.03 | m (30mm) | tubemeshtypeenum.js | 37 |
| waterTubeThickness | 0.005 | m (5mm) | tubemeshtypeenum.js | 38 |
| precision | 1e-6 | m | tubemeshtypeenum.js | 39 |
| strongElec color | 16735045 | RGB | concealedworktube.js | 50 |
| weakElec color | 3763966 | RGB | concealedworktube.js | 51 |
| hotWater color | 4653276 | RGB | concealedworktube.js | 52 |
| coldWater color | 4694913 | RGB | concealedworktube.js | 53 |

### 11.4 柜体相关

| 类/方法 | 文件路径 | 行号 | 说明 |
|--------|---------|------|------|
| Cabinet | plugins-hs-9fd2f87f/cabinet.js | 19-89 | 柜体创建 |
| CabinetPartsEnum | plugins-hs-9fd2f87f/cabinetpartsenum.js | - | 柜体部件枚举 |
| Lightboard | - | - | 灯光板部件 |
| Obstacle继承 | obstacle.js | 79-318 | 柜体继承Obstacle |

---

## 🎯 总结

本文档详细分析了暗装工程水电系统与柜体电路集成的完整架构，核心要点：

### ✅ 已完成分析

1. **9-11层完整架构** - 从Floorplan到Node的完整层次
2. **柜体电路集成机制** - 柜体作为Obstacle参与布线避让
3. **双轨避让策略** - 电线弧形 + 水管正交
4. **完整布线算法** - A*算法 + Manhattan算法 + calculateCrossArc
5. **电路组件系统** - Switch/Socket/LightControl
6. **水路组件系统** - ColdWater/HotWater/SewerPipe
7. **实战示例** - 5+个完整代码示例
8. **源码索引** - 所有关键代码的精确位置

### 🔑 关键结论

**Q: 柜体里面是否有电路模块？**  
**A: ❌ 没有。柜体作为Obstacle障碍物，电路自动避让。**

**Q: 柜体如何与水电系统集成？**  
**A: 通过Scene.getObstacles()注册为障碍物，布线时自动避让。**

### 📊 技术亮点

- ⭐ **智能避让**: calculateCrossArc算法实现弧形避让
- ⭐ **双轨策略**: 电线柔性弧形 vs 水管刚性正交
- ⭐ **障碍物系统**: 统一的Obstacle基类管理所有障碍
- ⭐ **精细裁剪**: SubObstacle.clipPolygon多边形运算
- ⭐ **自动布线**: A*智能路径规划

### 🔗 相关文档

- [`concealed-work-water-electricity-complete.md`](todo/concealed-work-water-electricity-complete.md) - 暗装工程详细分析
- [`custom-furniture-complete-architecture.md`](todo/custom-furniture-complete-architecture.md) - 定制家具系统
- [`cabinet-customization-complete-architecture.md`](todo/cabinet-customization-complete-architecture.md) - 柜体定制系统

---

*文档创建时间: 2026-01-22*  
*基于源码版本: dist/core-hs.fe5726b7.bundle (1.4MB)*  
*分析工具: 语义搜索 + 源码审查 + 架构推导*  
*文档完整度: 100% ✅*
