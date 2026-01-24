# Homestyler 2D/3D核心系统完整架构分析（第三部分）

> 本文档是架构分析的第三部分，涵盖缩放、属性面板、参数化、模型加载等核心系统

---

## 4.3 ResizeContent - 缩放操作

**文件**: `dist/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/resizecontent.js:222-632`

### 核心类结构

```javascript
class ResizeContent extends GizmoBaseAgent {
    constructor(context, fuzzyGizmo, contents, showBoxGizmo = true) {
        super(context, new FuzzyGizmo(directions), contents);
        
        this.contents = Array.isArray(contents) ? contents : [contents];
        this._showBoxGizmo = showBoxGizmo;
        this.hideFromCameraChanging = false;
        
        // Gizmo插件
        this.gizmoPlugin = HSApp.App.getApp().pluginManager
            .getPlugin(PluginType.Gizmo);
        
        // 缩放方向
        this._scaleDirection = "";
        
        // 尺寸标注（LinearDimension）
        this.lineDimensions = new Map();
        this.initLineDimensions(context, contents, contents);
        
        this.init();
    }
    
    // 初始化尺寸标注
    initLineDimensions(context, layer, entity) {
        ['width', 'depth', 'height'].forEach(type => {
            const dimension = this.gizmoPlugin.createLinearDimension(
                context, layer, entity, `size_mark_${type}`, true
            );
            this.lineDimensions.set(type, dimension);
            this.addChildGizmo(dimension);
        });
    }
    
    // 初始化Gizmo
    init() {
        // 1. 设置箱形Gizmo颜色
        this.fuzzyGizmo.boxGizmo.color = this.fuzzyGizmo.cssColorToNumber("rgb(0, 0, 255)");
        this.fuzzyGizmo.boxGizmo.opacity = 1;
        
        // 2. 设置SVG方向箭头样式
        this.fuzzyGizmo.svgGizmos.forEach(gizmo => {
            gizmo.color = style.arrow.color.normal[gizmo.name];
            gizmo.fillColor = style.arrow.color.normal[gizmo.name];
            gizmo.strokeColor = style.arrow.color.normal[gizmo.name];
            gizmo.opacity = style.arrow.opacity.normal[gizmo.name];
        });
        
        // 3. 设置面Gizmo样式
        this.fuzzyGizmo.faceGizmos.forEach(gizmo => {
            gizmo.color = style.face.color.normal[gizmo.name];
            gizmo.opacity = style.face.opacity.normal[gizmo.name];
            gizmo.hide();  // 默认隐藏
        });
        
        // 4. 绑定事件处理器
        this.fuzzyGizmo.svgGizmos.forEach(gizmo => {
            gizmo.mousemove = this.onGizmoMouseMove.bind(this);
            gizmo.mouseout = this.onGizmoMouseOut.bind(this);
            gizmo.ondragstart = this.ondragstart.bind(this);
            gizmo.ondragend = this.ondragend.bind(this);
            gizmo.composedragmoveparam = this.composedragmoveparam.bind(this);
            gizmo.composedragendparam = this.composedragendparam.bind(this);
        });
        
        // 5. 设置相机
        this.fuzzyGizmo.camera = HSApp.App.getApp().floorplan.active_camera;
        
        this.refreshCore();
    }
}
```

### 缩放样式配置

```javascript
const style = {
    arrow: {
        color: {
            normal: {
                left: 0xF1D8DD,    // 左箭头：浅粉色
                right: 0xF1D8DD,   // 右箭头：浅粉色
                bottom: 0x367AB3,  // 下箭头：蓝色
                top: 0x367AB3,     // 上箭头：蓝色
                front: 0x63DA9A,   // 前箭头：绿色
                back: 0x63DA9A     // 后箭头：绿色
            },
            hover: {
                left: 0xF1D8DD,
                right: 0xF1D8DD,
                bottom: 0x367AB3,
                top: 0x367AB3,
                front: 0x63DA9A,
                back: 0x63DA9A
            }
        },
        opacity: {
            normal: {
                left: 0.65, right: 0.65,
                bottom: 0.65, top: 0.65,
                front: 0.65, back: 0.65
            },
            hover: {
                left: 1.0, right: 1.0,
                bottom: 1.0, top: 1.0,
                front: 1.0, back: 1.0
            }
        }
    },
    face: {
        color: {
            normal: {
                left: 0x327FFF,    // 面颜色：蓝色
                right: 0x327FFF,
                bottom: 0x327FFF,
                top: 0x327FFF,
                front: 0x327FFF,
                back: 0x327FFF
            },
            hover: {
                left: 0x005DFF,    // hover颜色：深蓝色
                right: 0x005DFF,
                bottom: 0x005DFF,
                top: 0x005DFF,
                front: 0x005DFF,
                back: 0x005DFF
            }
        },
        opacity: {
            normal: {
                left: 0, right: 0,    // 默认透明
                bottom: 0, top: 0,
                front: 0, back: 0
            },
            hover: {
                left: 0.3, right: 0.3,  // hover半透明
                bottom: 0.3, top: 0.3,
                front: 0.3, back: 0.3
            }
        }
    }
};
```

### 缩放方向枚举

```javascript
const FuzzyDirection = {
    LEFT: 'left',      // X轴负方向
    RIGHT: 'right',    // X轴正方向
    FRONT: 'front',    // Y轴负方向
    BACK: 'back',      // Y轴正方向
    BOTTOM: 'bottom',  // Z轴负方向
    TOP: 'top'         // Z轴正方向
};
```

### 碰撞检测与尺寸限制

```javascript
class ResizeContent {
    refreshCore() {
        // ... 计算transform和尺寸 ...
        
        // 背景墙特殊处理：尺寸限制和碰撞检测
        if (this.contents[0] instanceof HSCore.Model.NCPBackgroundWallBase) {
            const bgWall = this.contents[0];
            const size = {
                W: 1000 * bgWall.XSize,  // 转换为毫米
                H: 1000 * bgWall.ZSize,
                D: 1000 * bgWall.YSize
            };
            
            const outOfRange = !bgWall.isSizeInRange(size);
            const sizeLimitUnlocked = HSApp.App.getApp().designMetadata
                .get("sizeLimitUnlock");
            
            // 尺寸超限或碰撞 → 红色警告
            if ((!sizeLimitUnlocked && outOfRange) || bgWall.isCollision()) {
                this.fuzzyGizmo.boxGizmo.color = 
                    this.fuzzyGizmo.cssColorToNumber("rgb(255, 0, 0)");
            } else {
                // 正常 → 蓝色
                this.fuzzyGizmo.boxGizmo.color = 
                    this.fuzzyGizmo.cssColorToNumber("rgb(0, 0, 255)");
            }
        }
        
        // 显示/隐藏Gizmo
        if (this.couldShow()) {
            this.fuzzyGizmo.show();
            this._showBoxGizmo ? this.fuzzyGizmo.boxGizmo.show() 
                               : this.fuzzyGizmo.boxGizmo.hide();
            this.fuzzyGizmo.svgGizmos.forEach(g => g.show());
        } else {
            this.fuzzyGizmo.hide();
        }
        
        // 显示尺寸标注
        if (this.couldShowDimension()) {
            this.updateDimensionData();
            this.lineDimensions.forEach((dimension, type) => {
                if (type === this._getScaleType(this._scaleDirection)) {
                    dimension.onContentFieldChange();
                    dimension.show();
                } else {
                    dimension.hide();
                }
            });
        } else {
            this.lineDimensions.forEach(d => d.hide());
        }
    }
    
    // 获取缩放类型
    _getScaleType(direction) {
        switch (direction) {
            case FuzzyDirection.LEFT:
            case FuzzyDirection.RIGHT:
                return 'width';
            case FuzzyDirection.FRONT:
            case FuzzyDirection.BACK:
                return 'depth';
            case FuzzyDirection.TOP:
            case FuzzyDirection.BOTTOM:
                return 'height';
            default:
                return '';
        }
    }
}
```

---

## 5. 属性激活与面板系统

### 5.1 PropertyBar架构

**文件**: `dist/plugins-hs-dd89ef02.fe5726b7.bundle_dewebpack/propertybarhandler.js`

#### 属性面板层级结构

```javascript
const PropertyBarType = {
    PropertyBar: 'PropertyBar',           // 根节点
    FirstLevelNode: 'FirstLevelNode',     // 一级节点
    SecondLevelNode: 'SecondLevelNode',   // 二级节点
    ThirdLevelNode: 'ThirdLevelNode',     // 三级节点
    FloatItem: 'FloatItem',               // 浮动项
    
    // 控件类型
    LengthInput: 'LengthInput',           // 长度输入
    SliderInput: 'SliderInput',           // 滑块输入
    DropdownList: 'DropdownList',         // 下拉列表
    DropdownInput: 'DropdownInput',       // 下拉输入
    RadioButton: 'RadioButton',           // 单选按钮
    CheckBox: 'CheckBox',                 // 复选框
    Switch: 'Switch',                     // 开关
    Button: 'Button',                     // 按钮
    ImageButton: 'ImageButton',           // 图片按钮
    MultiSelectButton: 'MultiSelectButton' // 多选按钮
};
```

#### 属性面板项示例

```javascript
class PropertyBarHandler {
    getNcpBgwPropertyBarItems() {
        return {
            id: "wallboard-property-bar",
            type: PropertyBarType.PropertyBar,
            label: ResourceManager.getString("plugin_wallface_assembly_wallboard"),
            items: [
                // 一级节点：参数设置
                {
                    id: "parameter-setting",
                    label: ResourceManager.getString("plugin_propertybar_parameter_setting"),
                    type: PropertyBarType.FirstLevelNode,
                    items: [
                        // 二级节点：基础属性
                        {
                            id: "base-property",
                            label: ResourceManager.getString("plugin_wallproperty_base_property"),
                            type: PropertyBarType.SecondLevelNode,
                            order: 1,
                            items: [
                                // 三级节点：尺寸设置
                                {
                                    id: "size-setting",
                                    parentId: "base-property",
                                    type: PropertyBarType.ThirdLevelNode,
                                    order: 3,
                                    items: [
                                        // 长度输入控件
                                        {
                                            id: "length-input",
                                            type: PropertyBarType.SliderInput,
                                            data: {
                                                prompt: "长度",
                                                value: entity.XSize,
                                                min: 0.1,
                                                max: 10.0,
                                                step: 0.01,
                                                unit: "m",
                                                onChange: (value) => {
                                                    this.updateEntitySize(entity, 'XSize', value);
                                                }
                                            }
                                        },
                                        // 宽度输入控件
                                        {
                                            id: "width-input",
                                            type: PropertyBarType.SliderInput,
                                            data: {
                                                prompt: "宽度",
                                                value: entity.YSize,
                                                min: 0.1,
                                                max: 10.0,
                                                step: 0.01,
                                                unit: "m",
                                                onChange: (value) => {
                                                    this.updateEntitySize(entity, 'YSize', value);
                                                }
                                            }
                                        },
                                        // 高度输入控件
                                        {
                                            id: "height-input",
                                            type: PropertyBarType.SliderInput,
                                            data: {
                                                prompt: "高度",
                                                value: entity.ZSize,
                                                min: 0.1,
                                                max: 3.0,
                                                step: 0.01,
                                                unit: "m",
                                                onChange: (value) => {
                                                    this.updateEntitySize(entity, 'ZSize', value);
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                // 一级节点：样式设置
                {
                    id: "style-setting",
                    label: ResourceManager.getString("plugin_propertybar_style_setting"),
                    type: PropertyBarType.FirstLevelNode,
                    items: [
                        // 二级节点：基础样式
                        {
                            id: "base-style",
                            label: ResourceManager.getString("plugin_propertybar_base_style"),
                            type: PropertyBarType.SecondLevelNode,
                            items: [
                                // 三级节点：材质
                                {
                                    id: "material-button-con",
                                    parentId: "base-style",
                                    type: PropertyBarType.ThirdLevelNode,
                                    label: ResourceManager.getString("plugin_right_propertybar_material"),
                                    items: [
                                        {
                                            id: "material-button",
                                            type: PropertyBarType.ImageButton,
                                            parentId: "material-button-con",
                                            order: 1,
                                            data: {
                                                seekId: entity.materialSeekId,
                                                onClick: () => {
                                                    this.openMaterialSelector(entity);
                                                },
                                                disableIcon: false,
                                                icon: "hs_shuxingmianban_xuanzhuan45",
                                                onIconClick: () => {
                                                    this.rotateMaterial(entity);
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }
}
```

### 5.2 属性面板刷新机制

```javascript
class PropertyBarPlugin {
    constructor(app) {
        this.app = app;
        this.signalPopulatePropertyBar = new Signal();  // 填充属性面板信号
        
        // 监听刷新信号
        this.app.signalPropertyBarRefresh.listen(this.update.bind(this));
    }
    
    // 更新属性面板
    update() {
        const selection = this.app.selectionManager.getSelection();
        
        if (selection.length === 0) {
            this.hide();
            return;
        }
        
        // 触发填充信号，收集所有插件的属性面板项
        const items = [];
        this.signalPopulatePropertyBar.dispatch({
            entities: selection,
            items: items
        });
        
        // 渲染属性面板
        this.render(items);
    }
    
    // 渲染属性面板
    render(items) {
        