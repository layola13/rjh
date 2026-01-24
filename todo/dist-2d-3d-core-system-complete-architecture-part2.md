# Homestyler 2D/3D核心系统完整架构分析（续）

> 本文档是 `dist-2d-3d-core-system-complete-architecture.md` 的续篇

---

## 4. 操作系统（续）

### 4.1 ContentMovement - 移动操作（续）

```javascript
// 获取移动方向
getDirection() {
    const direction = this._getBaseRotation()
        .transformVector(new Vector3().copyFrom(this.frontDirectionVector));
    this.controller.setDirection(direction);
    return direction;
}

// 更新Gizmo位置
_getPosition() {
    const offset = (this.contentBoundingLength + 0.1) * this.scaleRadius;
    const direction = this.getDirection().scaleInPlace(offset);
    const pos = this.contentPosition;
    const z = pos.z + HSApp.App.getApp().floorplan.scene
        .getLayerAltitude(this.content.getUniqueParent());
    
    return new Vector3(
        pos.x + direction.x,
        z + direction.y + Constants.CONTENT_MOVEMENT_INDICATOR_HEIGHT_OFFSET,
        -pos.y + direction.z
    );
}
```

#### ContentMovementController控制器

**文件**: `dist/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/contentmovement.js:417-504`

```javascript
class ContentMovementController extends DisplayController {
    constructor(entity, context, defaultController, activeType, activeContext) {
        super(entity, context);
        this.direction = new THREE.Vector3();
        this.activeType = activeType;
        this.activeContext = activeContext;
        
        // 默认控制器（实际执行移动的控制器）
        this.defaultController = entity instanceof CustomizedPMInstanceModel
            ? new CustomizedPMInstanceModelController(entity, context, "move")
            : new ContentController(entity, context);
    }
    
    // 拖拽开始
    ondragstart(e) {
        // 设置约束
        if (this.context.document.active_camera.type === CameraTypeEnum.FirstPerson) {
            e.constraintInRoom = true;  // 第一人称：约束在房间内
        } else {
            e.constraintInRoom = false;
        }
        
        e.moveby = "contentmovement";
        e.moveDir = {
            x: this.direction.x,
            y: -this.direction.z,
            z: this.direction.y
        };
        
        // 激活当前移动轴
        this.activeContext.setActive(this.activeType);
        
        // 委托给默认控制器
        return this.defaultController.ondragstart(e);
    }
    
    // 拖拽移动
    composedragmoveparam(e) {
        const direction = this.direction;
        e.linearMove = true;  // 线性移动
        
        if (e.offset) {
            // 投影到移动方向
            const projected = new THREE.Vector3(e.offset[0], e.offset[1], e.offset[2])
                .projectOnVector(direction);
            
            e.offset[0] = projected.x;
            e.offset[1] = -projected.z;
            e.offset[2] = projected.y;
            e.moveDir = new THREE.Vector3(direction.x, -direction.z, direction.y);
        }
        
        return e;
    }
    
    // 拖拽结束
    ondragend() {
        this.activeContext.setActive(undefined);
        
        // 事件追踪（如果是照明环境）
        const envId = HSApp.App.getApp().activeEnvironmentId;
        if (envId === Environment.ManualLighting || envId === Environment.Render) {
            const lightType = HSApp.Util.Light.getLightTypeNameInCHN(this.entity);
            if (lightType) {
                let eventName = "plugin_render_lighting_blue_axis_drag";
                if (this.activeType === ActiveType.left || 
                    this.activeType === ActiveType.near) {
                    eventName = "plugin_render_lighting_green_axis_drag";
                } else if (this.activeType === ActiveType.far || 
                           this.activeType === ActiveType.right) {
                    eventName = "plugin_render_lighting_red_axis_drag";
                }
                
                HSApp.Util.EventTrack.instance().track(
                    EventGroupEnum.Render, 
                    eventName, 
                    { sLightName: lightType }
                );
            }
        }
        
        return true;
    }
}
```

### 4.2 ContentRotation - 旋转操作

**文件**: `dist/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/contentrotation.js:57-469`

#### 核心类结构

```javascript
class ContentRotation extends HSApp.View.T3d.Gizmo {
    constructor(context, layer, content, boundingLength, 
                controller, activeType, activeContext) {
        super(context, layer, content, controller);
        
        // 旋转轴类型
        this.activeType = activeType;  // 'xy', 'xz', 'yz'
        this.activeContext = activeContext;
        
        // 旋转数据
        this.content_start_rotation = undefined;
        this.rotation = 0;
        this.view_rotation = 0;
        this.start_angle = 0;
        
        // Gizmo网格
        this.rotationMesh = undefined;  // 旋转手柄
        this.fullMesh = undefined;      // 完整网格
        this.fillMesh = undefined;      // 填充网格
        this.strokeMesh = undefined;    // 描边网格
        this.ring = undefined;          // 圆环
        
        // 旋转吸附
        this._enableRotationSnap = !(content instanceof HSCore.Model.Light);
        
        // 颜色设置
        this.defaultColor = this.checkIsRotateable() ? 0x327FFF : 0x96959B;
        this.activeColor = 0x005DFF;
        
        // 初始化Gizmo
        this._initMesh();
        
        // 设置默认颜色和透明度
        this._setMeshColor(this.rotationMesh, this.defaultColor);
        this._setMeshOpacity(this.rotationMesh, this.isMainRotate() ? 0.75 : 0.5);
    }
    
    // 初始化起始旋转角度
    initStartRotation() {
        if (this.activeType === ActiveType.xy) {
            this.content_start_rotation = this.entity.ZRotation;
        } else if (this.activeType === ActiveType.xz) {
            this.content_start_rotation = this.entity.YRotation;
        } else if (this.activeType === ActiveType.yz) {
            this.content_start_rotation = this.entity.XRotation;
        }
    }
    
    // 旋转事件（带吸附）
    onRotate(e, angleDelta) {
        const degrees = THREE.Math.radToDeg(angleDelta);
        let snappedDegrees = degrees;
        
        // 旋转吸附逻辑
        if (this._enableRotationSnap && (!e.event || !e.event.ctrlKey)) {
            const startRotation = this.content_start_rotation;
            const currentRotation = startRotation + degrees;
            
            // 45°吸附
            const snap45 = Math.round(degrees / 45);
            const diff45 = Math.abs(45 * snap45 - degrees);
            
            // 90°吸附（仅在XRotation=0 && YRotation=0时）
            const snap90 = Math.round(currentRotation / 90);
            let diff90 = Math.abs(90 * snap90 - currentRotation);
            
            if (this.content.XRotation !== 0 || this.content.YRotation !== 0) {
                diff90 = Number.MAX_VALUE;  // 禁用90°吸附
            }
            
            // 选择最近的吸附角度（阈值7°）
            if (diff45 < 7) {
                snappedDegrees = 45 * snap45;
            } else if (diff90 < 7) {
                snappedDegrees = 90 * snap90 - startRotation;
            }
        }
        
        // 归一化到[0, 360)
        snappedDegrees = (snappedDegrees + 360) % 360;
        const radians = THREE.Math.degToRad(snappedDegrees);
        
        // 更新视图旋转
        this.view_rotation = radians;
        
        // 显示鼠标提示
        if (e.event) {
            const displayDegrees = Math.round(THREE.Math.radToDeg(radians));
            updateMouseTips(`${displayDegrees}°`, {
                x: e.event.clientX,
                y: e.event.clientY
            });
        }
        
        this.rotation = this.start_angle + radians;
        this.dirty = true;
        
        return radians;
    }
    
    // 检查是否可旋转
    checkIsRotateable() {
        return this.activeType === 'xy' || this.is1080;
    }
    
    // 检查是否是主旋转轴
    isMainRotate() {
        return this.activeType === 'xy';
    }
}
```

#### ContentRotationController控制器

```javascript
class ContentRotationController extends DisplayController {
    constructor(entity, context, opType, defaultController, activeType, activeContext) {
        super(entity, context);
        
        this.view_rotation = 0;
        this._opType = opType || CommandType.RotateContent;
        this.activeType = activeType;
        this.activeContext = activeContext;
        
        // 朝向吸附（仅灯光）
        this._enableOrientationSnap = entity instanceof HSCore.Model.Light;
        
        // 默认控制器
        if (entity instanceof CustomizedPMInstanceModel) {
            this.defaultController = new CustomizedPMInstanceModelController(
                entity, context, "rotate"
            );
            this._opType = CommandType.RotateCustomizedPMInstanceModel;
        } else {
            this.defaultController = defaultController || new ContentController(entity, context);
        }
    }
    
    // 拖拽开始
    ondragstart(e) {
        if (!this.entity.canEdit()) return false;
        
        const cmd = this._cmdMgr.current;
        if (!cmd || cmd.type === CommandType.SmartReplaceContent) {
            if (this._listener.checkIsRotateable(e)) {
                // 创建旋转命令
                const rotateCmd = this._cmdMgr.createCommand(
                    this._opType,
                    [this.entity, this.activeType, this._enableOrientationSnap]
                );
                this._cmdMgr.execute(rotateCmd);
                this._cmd = rotateCmd;
                
                // 记录基准点
                this._basePoint = this.get3DPos(
                    e.modelPos,
                    new THREE.Vector3(this.entity.x, this.entity.y, 
                                     this.entity.z + this.layerHeight)
                );
                
                this.view_rotation = 0;
                this.activeContext.setActive(this.activeType);
                this._onTrackEvent();
                
                return true;
            } else {
                // 如果不可旋转，降级为移动
                e.constraintInRoom = this.context.document.active_camera.type === 
                                     CameraTypeEnum.FirstPerson;
                e.ignoreSnapOffset = true;
                e.lightingMatrixArrangedEnable = false;
                
                if (this.entity instanceof HSCore.Model.PAssembly) {
                    e.forceKeepZAxis = true;
                }
                
                this._opType = CommandType.MoveContent;
                const moveCmd = this._cmdMgr.createCommand(this._opType, 
                                                          [this.entity, undefined, e]);
                this._cmdMgr.execute(moveCmd);
                this._cmdMgr.receive("dragstart", e);
                this._cmd = moveCmd;
                
                return true;
            }
        }
        
        return false;
    }
    
    // 计算旋转增量
    _calculateRotateDelta(e) {
        const entityPos = new THREE.Vector3(
            this.entity.x, 
            this.entity.y, 
            this.entity.z + this.layerHeight
        );
        
        // 根据旋转轴类型设置法线
        let normal, baseDir;
        if (this.activeType === ActiveType.xy) {
            baseDir = new THREE.Vector3(
                this._basePoint.x - entityPos.x,
                this._basePoint.y - entityPos.y,
                this._basePoint.z - entityPos.z
            ).normalize();
            normal = new THREE.Vector3(0, 0, -1);
        } else if (this.activeType === ActiveType.xz) {
            baseDir = new THREE.Vector3(
                this._basePoint.x - entityPos.x,
                this._basePoint.y - entityPos.y,
                this._basePoint.z - entityPos.z
            ).normalize();
            normal = new THREE.Vector3(-1, 0, 0);
        } else if (this.activeType === ActiveType.yz) {
            baseDir = new THREE.Vector3(
                this._basePoint.x - entityPos.x,
                this._basePoint.y - entityPos.y,
                this._basePoint.z - entityPos.z
            ).normalize();
            normal = new THREE.Vector3(0, -1, 0);
        }
        
        // 当前方向
        const currentPos = this.get3DPos(e.modelPos, entityPos);
        const currentDir = new THREE.Vector3(
            currentPos.x - entityPos.x,
            currentPos.y - entityPos.y,
            currentPos.z - entityPos.z
        ).normalize();
        
        // 