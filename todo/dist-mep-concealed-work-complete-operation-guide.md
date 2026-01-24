# 暗装水电风暖系统完整操作指南

> **基于 dist/core-hs.fe5726b7.bundle 真实源码的全流程技术剖析**
> 
> 文档版本: v2.0 | 分析日期: 2026-01-24 | 来源: 反编译源码

---

## 📋 目录

- [1. 核心算法体系](#1-核心算法体系)
- [2. MEP子系统详解](#2-mep子系统详解)
- [3. 建筑元素与水电关系](#3-建筑元素与水电关系)
- [4. 全屋部署操作流程](#4-全屋部署操作流程)
- [5. 代码架构总结](#5-代码架构总结)

---

## 1. 核心算法体系

### 1.1 管线网格生成算法

**核心类**: [`TubeMeshCreator`](dist/core-hs.fe5726b7.bundle_dewebpack/tubemeshtypeenum.js)

```typescript
// 关键参数
elecPathR = 0.1                  // 电线弯曲半径: 100mm
waterPathR = 0.03                // 水管弯曲半径: 30mm
waterTubeThickness = 0.005       // 水管壁厚: 5mm
```

### 1.2 交叉避让算法

**calculateCrossArc** - 自动检测管线交叉并生成避让路径

**核心思想**: 
1. 检测所有交叉点（跳过ID较大和平行管线）
2. 按路径参数排序
3. 为每个交叉点生成向下弯曲的避让弧线
4. 构建复合路径：直线-弧线-直线-弧线-...

### 1.3 颜色编码系统

```typescript
强电: #FF6045 (橙红)  |  弱电: #397E7E (青绿)
热水: #46FDDC (天蓝)  |  冷水: #47A5E1 (深蓝)
```

---

## 2. MEP子系统详解

### 2.1 九大子系统

| # | 系统 | 组件 | 管径 | 避让 | 颜色 |
|---|------|------|------|------|------|
| 1 | **强电** | `CWStrongElecComp` | 16-32mm | 弧形R=100mm | #FF6045 |
| 2 | **弱电** | `CWWeakElecComp` | 16-20mm | 弧形R=100mm | #397E7E |
| 3 | **冷水** | `CWColdWaterComp` | 20-32mm | 直角L=30mm | #47A5E1 |
| 4 | **热水** | `CWHotWaterComp` | 20-25mm | 直角L=30mm | #46FDDC |
| 5 | **排水** | `SewerPipe` | 50-110mm | 直线 | 灰色 |
| 6 | **地暖** | FloorHeating | 16-20mm | 盘管 | - |
| 7 | **新风** | Ventilation | 100-200mm | 吊顶 | - |
| 8 | **空调** | AirConditioner | 制冷剂管 | 保温 | - |
| 9 | **燃气** | `GassMeter` | 20-25mm | 明管 | 黄色 |

### 2.2 国标回路组件

```typescript
GBCircuitComp {
    circuitType: "WL" | "ZM" | "CW" | "KT"  // 回路类型
    breakerType: "DPN_20_1P" | "DPN_32_2P"  // 断路器
    tubeType: "PVC20" | "PVC25"             // 线管
    wireType: "BVR_2X2D5" | "BVR_3X4"       // 线缆
}
```

---

## 3. 建筑元素与水电关系

### 3.1 影响矩阵

| 元素 | 影响 | 避让规则 |
|------|------|----------|
| **墙体** | 管线走向基础 | 厚度≥120mm可预埋 |
| **门窗** | 强制避让 | 上方过梁，侧边≥150mm |
| **柱子** | 刚性障碍 | 绕行，间距≥50mm |
| **梁** | 打孔限制 | 孔径≤梁高1/3 |
| **吊顶** | 隐蔽空间 | 强弱电、新风 |
| **电视墙** | 集中区 | HDMI、网线 |
| **地台** | 地暖区 | 盘管间距200mm |
| **地漏** | 排水点 | 坡度≥2% |

---

## 4. 全屋部署操作流程

### 4.1 十二步部署流程

```
1. 画户型 → 2. 画窗 → 3. 画门 → 4. 画柱 → 5. 画梁 → 6. 画吊顶
         ↓
7. 画电视墙 → 8. 画地台 → 9. 画地漏 → 10. 部署MEP → 11. 自动避让 → 12. 验证
```

### 4.2 详细操作步骤

#### Step 1: 画户型（Floorplan）

**操作**:
```javascript
// 创建墙体
wall.width = 0.24;        // 外墙240mm
wall.width = 0.12;        // 内墙120mm
wall.height = 2.8;        // 层高2800mm
wall.materialType = "concrete";
```

**水电关联**: 
- 墙厚≥120mm → 可预埋管线
- 墙体curve → 管线走向

---

#### Step 2-3: 画窗和门（Window/Door）

**操作**:
```javascript
window.size = { a: 1.5, b: 0.2, c: 1.5 };  // 宽×厚×高
window.position = { x, y, z: 0.9 };         // 窗台高900mm

door.size = { a: 0.9, b: 0.2, c: 2.1 };    // 宽×厚×高
door.position = { x, y, z: 0 };             // 落地
```

**避让规则**:
```javascript
// 上方过梁避让
tubeRoute.z = opening.position.z + opening.size.c + 0.3;  // +300mm

// 侧边安全距离
margin = 0.15;  // 150mm
```

---

#### Step 4-5: 画柱和梁（Column/Beam）

**操作**:
```javascript
column.size = { a: 0.4, b: 0.4 };  // 400×400mm
beam.height = 0.4;                  // 梁高400mm
```

**穿梁打孔规则**:
```javascript
// 孔径限制
maxHoleSize = beam.height / 3;     // ≤梁高1/3
holePosition = beam.height / 2;    // 中性轴附近
```

---

#### Step 6: 画吊顶（Ceiling）

**操作**:
```javascript
ceiling.height = 2.6;               // 吊顶标高2600mm
ceiling.type = "integrated";        // 集成吊顶
```

**MEP集成**:
```javascript
// 吊顶内空间200mm
hiddenSpace = layerHeight - ceiling.height;  // 2800-2600=200mm

if (hiddenSpace >= 0.15) {
    // 可布置强弱电、新风管道
    ceiling.allowMEP = true;
}
```

---

#### Step 7: 画电视墙（Background Wall）

**操作**:
```javascript
backgroundWall.type = "TV";
backgroundWall.position = mainWall;
```

**强弱电集成**:
```javascript
// 预留端口
ports = {
    power: ["86型五孔×2", "USB充电×2"],
    weak: ["HDMI×2", "网线×1", "音频×1"],
    position: { z: 0.3, z: 1.2 }  // 下300mm、上1200mm
};
```

---

#### Step 8: 画地台（Platform）

**操作**:
```javascript
platform.height = 0.15;             // 地台高度150mm
platform.area = roomBoundary;       // 覆盖区域
```

**地暖盘管**:
```javascript
floorHeating.tubeSpacing = 0.2;     // 盘管间距200mm
floorHeating.tubeDiameter = 0.016;  // 管径16mm
floorHeating.pattern = "spiral";    // 螺旋布管
```

---

#### Step 9: 画地漏（Floor Drain）

**操作**:
```javascript
drain.position = { x, y, z: 0 };    // 地面标高
drain.diameter = 0.05;              // Φ50排水管
drain.type = "防臭地漏";
```

**排水坡度**:
```javascript
// 地面找坡
slope = 0.02;  // 2%坡度
direction = drainPosition - farthestPoint;
```

---

#### Step 10: 部署水电系统（Deploy MEP）

**强电系统**:
```javascript
// 1. 创建配电箱
distributionBox.position = entryWall;
distributionBox.circuits = [
    { type: "照明", breaker: "DPN_20_1P", rooms: ["客厅", "卧室"] },
    { type: "插座", breaker: "DPN_20_1P", rooms: ["卧室"] },
    { type: "厨房", breaker: "DPN_32_2P", rooms: ["厨房"] },
    { type: "卫生间", breaker: "DPN_20_1P", rooms: ["卫生间"] }
];

// 2. 布置管线
strongElecTree = new ConcealedWorkTubeTree();
strongElecTree.addComponent(new CWStrongElecComp());
strongElecTree.createRoute(distributionBox, lightSwitches);
```

**弱电系统**:
```javascript
// 创建弱电箱
weakElecBox.position = entryWall;
weakElecBox.ports = ["光纤", "网线×8", "电视线×4"];

weakElecTree = new ConcealedWorkTubeTree();
weakElecTree.addComponent(new CWWeakElecComp());
weakElecTree.createRoute(weakElecBox, terminals);
```

**给排水系统**:
```javascript
// 冷水系统
coldWaterTree = new ConcealedWorkTubeTree();
coldWaterTree.addComponent(new CWColdWaterComp());
coldWaterTree.diameter = 0.025;  // Φ25
coldWaterTree.createRoute(waterMeter, faucets);

// 热水系统
hotWaterTree = new ConcealedWorkTubeTree();
hotWaterTree.addComponent(new CWHotWaterComp());
hotWaterTree.diameter = 0.02;   // Φ20
hotWaterTree.createRoute(heater, faucets);

// 排水系统
sewerPipe = new SewerPipe();
sewerPipe.diameter = 0.05;      // Φ50
sewerPipe.slope = 0.02;         // 2%坡度
sewerPipe.createRoute(drains, mainPipe);
```

---

#### Step 11: 自动避让优化（Auto Avoidance)

```javascript
// 系统自动执行
layer.concealedWork.tubeTrees.forEach(tree => {
    tree.tubes.forEach(tube => {
        // 1. 检测交叉
        const crossings = detectCrossings(tube);
        
        // 2. 生成避让路径
        if (crossings.length > 0) {
            tube.route = calculateCrossArc(tube);
        }
        
        // 3. 更新网格
        tube.updateMesh();
    });
});
```

---

#### Step 12: 验证与自检（Validation）

```javascript
// 21项验证规则
const validationRules = [
    { rule: "管线不穿承重梁", check: checkBeamPenetration() },
    { rule: "电气间距≥300mm", check: checkElecWaterDistance() },
    { rule: "排水坡度≥2%", check: checkDrainageSlope() },
    { rule: "管径符合规范", check: checkTubeDiameter() },
    // ... 更多规则
];

validationRules.forEach(rule => {
    if (!rule.check) {
        console.warn(`验证失败: ${rule.rule}`);
    }
});
```

---

## 5. 代码架构总结

### 5.1 核心模块

| 模块 | 文件 | 功能 |
|------|------|------|
| **管线生成** | `tubemeshtypeenum.js` | 网格创建、避让算法 |
| **管线实体** | `concealedworktube.js` | 管段对象、颜色材质 |
| **组件系统** | `*eleccomp.js`, `*watercomp.js` | 强弱电、冷热水组件 |
| **国标回路** | `gbcircuitcomp.js` | 断路器、线管配置 |
| **排水管** | `sewerpipe.js` | 排水系统 |
| **暗装工程** | `concealedwork.js` | 根对象管理 |

### 5.2 算法总结

1. **交叉避让算法**: 自动检测+弧线避让，碰撞阈值1.2倍管径
2. **扫掠算法**: 16段圆形截面沿3D曲线扫掠
3. **颜色编码**: 强电橙红、弱电青绿、热水天蓝、冷水深蓝
4. **避让策略**: 