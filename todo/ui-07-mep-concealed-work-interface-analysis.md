# Homestyler 水电暗装界面完整分析

## 1. 界面概述 🎯

**界面名称**: MEP Concealed Work Interface (水电暗装界面)

**界面用途**: 
- 设计和布置水路、电路系统
- 配置插座、开关、灯具位置
- 规划强弱电线路走向
- 设置配电箱、水表、燃气表等设备

**技术实现**: 2D符号化布置 + 3D实体预览

**专业术语**: MEP = Mechanical, Electrical, Plumbing (机电管道)

---

## 2. 界面布局 🎨

```
┌──────────────────────────────────────────────────────────────────────┐
│ PageHeader: [文件] [水电工具▼] [布线] [验收] [完成]      [用户]     │
├────────┬─────────────────────────────────────────────────┬───────────┤
│        │                                                 │           │
│ Left   │       2D Canvas (水电布置平面图)                 │  Right    │
│ Catalog│                                                 │ Property  │
│        │   ╔════════════════════════════════╗            │   Bar     │
│电气    │   ║  ┌──────────────────┐          ║           │           │
│元件    │   ║  │  ⚡ ⚡    💡  🔌  │ 房间1  ║           │ 元件属性: │
│        │   ║  │                  │          ║           │           │
│[插座]  │   ║  │  🔌      ─┬─ 开关│          ║           │ - 类型    │
│ ├五孔  │   ║  └───────────│──────┘          ║           │ - 位置高度│
│ ├三孔  │   ║              │                 ║           │ - 功率    │
│ └USB   │   ║      ┌───────┴────┐            ║           │ - 回路    │
│        │   ║      │   💡  ⚡   │ 房间2     ║           │           │
│[开关]  │   ║      │            │            ║           │ 线路设置: │
│ ├单控  │   ║      └────────────┘            ║           │           │
│ ├双控  │   ╚════════════════════════════════╝            │ - 线径    │
│ └智能  │                                                 │ - 管径    │
│        │   线路走向示意:                                 │ - 走向    │
│[灯具]  │   ┌─────────────────────────────┐              │           │
│ ├筒灯  │   │ ⚡配电箱                     │              │ 配电设置: │
│ ├吸顶  │   │  │└──┬──┬──┬──┐           │              │           │
│ └射灯  │   │  │   │  │  │  │           │              │ - 回路数  │
│        │   │  ╰───┼──┼──┼──┤ 强电线路 │              │ - 总功率  │
│给排水  │   └──────┴──┴──┴──┴───────────┘              │ - 保护器  │
│        │                                                 │           │
│[给水]  │   给排水布置:                                   │ 水路参数: │
│ ├冷水  │   ┌─────────────────────┐                      │           │
│ ├热水  │   │ 💧→🚿  💧→🚽       │                      │ - 管径    │
│ └净水  │   │ 💧→🚰  💧→🧺       │                      │ - 压力    │
│        │   └─────────────────────┘                      │ - 材质    │
│[排水]  │                                                 │           │
│ ├污水  │                                                 │ [应用]    │
│ ├废水  │                                                 │ [重置]    │
│ └雨水  │                                                 │           │
├────────┴─────────────────────────────────────────────────┴───────────┤
│ StatusBar: [符号图例] [回路统计] [线缆统计] [用电负荷:8.5kW]       │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 3. 暗装元件类型系统 ⚡

### 3.1 暗装工程分类

**来源**: `dist/app-hs.fe5726b7.bundle_dewebpack/originalmetacreatortype.js`

```javascript
// 暗装工程总类
Electric: "electric"                  // 电气系统
Water: "water"                        // 水路系统

// 暗装工程范围
ext_ConcealedWork: [
    h.Electric,                       // 电气
    h.Water,                          // 水路
    h.FloorDrain,                     // 地漏
    h.RoomHeater,                     // 室内采暖
    h.WaterHeaterElectrical,          // 电热水器
    h.WaterHeaterGas,                 // 燃气热水器
    h.SewerPipeRound,                 // 下水管
    h.Lighting                        // 照明
]

// 符号化暗装元件
ext_ConcealedWorkSymboled: [
    h.Electric,                       // 电气符号
    h.Water                           // 水路符号
]
```

---

## 4. 电气系统 ⚡

### 4.1 插座类型

**强电插座**:
```javascript
// 五孔插座
SocketStrongFiveHoleSocket: "socket strong - five-hole-socket"

// 三孔插座  
SocketStrongThreeHoleSocket: "socket strong - three-hole-socket"
SocketStrongThreeHoleSocketWithSwitch: "socket strong-three-hole-socket (with switch )"

// 16A大功率插座
SocketStrong16AThreeHoleSocket: "socket strong-16A-three-hole-socket"
SocketStrong16AThreeHoleSocketWithSwitch: "socket strong-16A-three-hole-socket (with switch )"

// 防水插座
SocketStrongWaterproofSocket: "socket strong - waterproof socket"
SocketStrongWaterproofBox: "socket strong-waterproof-box"

// 地插
SocketStrongGroundSocket: /^socket strong ground/
SocketGroundSocket: [/^socket strong-ground/]
```

**弱电插座**:
```javascript
// 网络插座
SocketWeakNetworkSocket: "socket weak-network socket"

// 电话插座
SocketWeakTelephoneJack: "socket weak - telephone jack"

// 有线电视
SocketWeakCableSocket: "socket weak - cable socket"
```

**智能家居插座**:
```javascript
SmartHomeSocket: "smart home socket"
```

### 4.2 开关类型

```javascript
// 单控开关
SwitchSingleSwitch: "switch - single switch"

// 双控开关
SwitchDoubleSwitch: "switch - double switch"

// 三控开关
SwitchTripleSwitch: "switch - triple switch"

// 防水开关
SwitchWaterproofSwitch: "switch - waterproof switch"

// 浴霸开关
SwitchYubaSwitch: "switch - yuba switch"
```

### 4.3 配电设备

```javascript
// 配电箱
DistributionBox: "distribution box"

// 弱电箱
WeakBox: "weak box"

// 电表
Electric: "electric"

// 燃气表
GassMeter: "gas meter"
```

### 4.4 照明系统

**灯具类型**:
```javascript
Lighting: "lighting"
CeilingLight: "ceiling light"        // 吸顶灯
Downlight: "downlight"                // 筒灯
SpotLight: "spotlight"                // 射灯
PendantLight: "pendant light"         // 吊灯
WallLamp: "wall lamp"                 // 壁灯
```

---

## 5. 给排水系统 💧

### 5.1 给水类型

```javascript
Water: "water"

// 冷水
ColdWater: "cold water"
ColdWaterValve: "cold water valve"

// 热水
HotWater: "hot water"

// 冷热混合
ColdHotWater: "cold hot water"

// 智能水路
SmartHomeWater: "smart home water"
```

### 5.2 排水系统

```javascript
// 地漏
FloorDrain: "floordrain"

// 下水管
SewerPipeRound: "sewer pipe - round"

// 特定排水
ToiletHole: "toilet hole"              // 马桶排水孔
ToiletWallRow: "Toilet wall row"       // 马桶墙排
BasinWallRow: "Basin wall row"         // 洗手盆墙排
PlatformDrainage: "Platform drainage"  // 地台排水
```

### 5.3 供水设备

```javascript
// 电热水器
WaterHeaterElectrical: "water heater - electrical"

// 燃气热水器
WaterHeaterGas: "water heater - gas"

// 水表
WaterMeter: "water meter"

// 供水管
WaterSupply: "water supply"
```

---

## 6. 符号系统 🔣

### 6.1 SVG符号配置

**来源**: 代码分析

```javascript
// 符号文件配置
let svgFile = getAttribute(t, "svgFile");

// 默认符号资源
if (!svgFile && HSConstants.Resources) {
    if (contentType.isTypeOf(Switch)) {
        svgFile = HSConstants.Resources.svgs.default_switch_symbol;
    }
    else if (contentType.isTypeOf(Socket)) {
        svgFile = HSConstants.Resources.svgs.default_socket_symbol;
    }
    else if (contentType.isTypeOf(Water)) {
        svgFile = HSConstants.Resources.svgs.default_water_symbol;
    }
    else if (contentType.isTypeOf([WeakBox, DistributionBox])) {
        svgFile = HSConstants.Resources.svgs.default_elecbox_symbol;
    }
}
```

### 6.2 符号图例

**电气符号**:
```
⚡ = 配电箱
🔌 = 插座
─┬─ = 单控开关
─┬┬─ = 双控开关
💡 = 灯具
```

**水路符号**:
```
💧 = 冷水
🔥💧 = 热水
🚿 = 花洒
🚽 = 马桶
🚰 = 水龙头
```

---

## 7. 线路布置系统 📏

### 7.1 强电回路

**回路分类**:
- 照明回路
- 普通插座回路
- 厨房插座回路
- 卫生间插座回路
- 空调专用回路
- 电热水器回路

**线路参数**:
```javascript
{
    wireType: String,         // 线缆类型 (BV/BVR)
    wireDiameter: Number,     // 线径 (1.5/2.5/4/6 