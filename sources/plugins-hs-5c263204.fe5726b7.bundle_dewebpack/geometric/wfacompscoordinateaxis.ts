import { Node, Vector3, Quaternion } from './367441';
import { Vector3 as DVector3, Quaternion as DQuaternion } from './815362';
import { HSCore } from './635589';
import { ActiveType } from './289659';
import { WFABase } from './122206';
import { createGizmoLineMaterial } from './941587';
import { AxisColorEnum, AxisScaleFactor } from './44182';

export class WFACompsCoordinateAxis extends WFABase {
    private _linex: Node | undefined;
    private _lineY: Node | undefined;
    private _lineZ: Node | undefined;

    constructor(
        param1: unknown,
        param2: unknown,
        param3: unknown,
        param4: unknown,
        param5: unknown
    ) {
        super(param1, param2, param3, "", param4, param5);
        this.init();
    }

    init(): void {
        this.node = new Node();

        const origin = DVector3.readonlyO();
        
        this._linex = this._createLine(
            origin,
            DVector3.readonlyX().multiplied(0.5),
            AxisColorEnum.AxisXColor
        );
        
        this._lineY = this._createLine(
            origin,
            DVector3.Z(-1).multiplied(0.5),
            AxisColorEnum.AxisZColor
        );
        
        this._lineZ = this._createLine(
            origin,
            DVector3.readonlyY().multiplied(0.5),
            AxisColorEnum.AxisYColor
        );

        this.node.addChild(this._linex);
        this.node.addChild(this._lineY);
        this.node.addChild(this._lineZ);
        this.layer.addChild(this);
    }

    _onContentFieldChange(): void {
        this.dirty = true;
    }

    _onActiveChange(): void {
        const isVisible = !this._activeContext.active;
        this.node.setVisible(isVisible);
        this.context.needsRendering = true;
    }

    _createLine(start: DVector3, end: DVector3, color: number): Node {
        const material = createGizmoLineMaterial(color, 2, {
            polygonOffsetFactor: -2
        });

        const positions: number[] = [];
        [start, end].forEach((point) => {
            positions.push(...point.data);
        });

        return T3Dx.Three2T3d.createMeshNode(
            T3Dx.Line2Mesh.setFromPositions(positions, [], "CoordinateAxis"),
            material
        );
    }

    _updateNodeTransform(): void {
        const scale = this._getGizmoScale();
        const position = this.getBottomCenterPos();
        const rotation = this._getCoordRotation();

        this.node.setTranslation(new Vector3(position.x, position.z, -position.y));
        this.node.setScale(new Vector3(scale.x, scale.z, scale.y));
        this.node.setRotation(new Quaternion(rotation.x, rotation.z, -rotation.y, rotation.w));
        
        this._updateAxisRotation();
    }

    _updateAxisRotation(): void {
        const activeCamera = HSApp.App.getApp().floorplan.active_camera;
        const bottomCenter = this.getBottomCenterPos();
        const cameraDirection = new DVector3(activeCamera).subtracted(bottomCenter);

        const updateAxisRotation = (
            axisNode: Node,
            direction: DVector3,
            activeType: ActiveType
        ): void => {
            const { zeroDir, normal, basicNormal } = this._getDirection(activeType);
            const angle = this._getAngle(direction, zeroDir, normal);
            const rotationAngle = (angle < 0.5 * Math.PI || angle > 1.5 * Math.PI) ? 0 : Math.PI;
            const quaternion = new DQuaternion().setFromAxisAngle(basicNormal, rotationAngle);
            
            axisNode.setRotation(new Quaternion(quaternion.x, quaternion.z, -quaternion.y, quaternion.w));
        };

        updateAxisRotation(this._linex!, cameraDirection, ActiveType.right);
        updateAxisRotation(this._lineY!, cameraDirection, ActiveType.far);
        updateAxisRotation(this._lineZ!, cameraDirection, ActiveType.top);
    }

    _getGizmoScale(): DVector3 {
        const bottomCenter = this.getBottomCenterPos();
        const activeCamera = HSApp.App.getApp().floorplan.active_camera;
        const distance = new DVector3(bottomCenter.x, bottomCenter.y, bottomCenter.z)
            .distanceTo(new DVector3(activeCamera));

        let scaleFactor: number;

        switch (activeCamera.type) {
            case HSCore.Model.CameraTypeEnum.OrbitView:
                scaleFactor = distance * AxisScaleFactor.OrbitScale;
                break;
            case HSCore.Model.CameraTypeEnum.OrthView:
                scaleFactor = distance * AxisScaleFactor.OrthScale;
                break;
            case HSCore.Model.CameraTypeEnum.FirstPerson:
            default:
                scaleFactor = distance * AxisScaleFactor.FPScale;
        }

        return new DVector3(scaleFactor, scaleFactor, scaleFactor);
    }

    _getDirection(activeType: ActiveType): {
        zeroDir: DVector3;
        normal: DVector3;
        basicNormal: DVector3;
    } {
        let zeroDir: DVector3;
        let normal: DVector3;
        let basicNormal: DVector3;

        switch (activeType) {
            case ActiveType.near:
                zeroDir = this._coord.getDy().multiply(-1);
                normal = this._coord.getDx();
                basicNormal = DVector3.readonlyX();
                break;
            case ActiveType.far:
                zeroDir = this._coord.getDy();
                normal = this._coord.getDx();
                basicNormal = DVector3.readonlyX();
                break;
            case ActiveType.bottom:
                zeroDir = this._coord.getDz().multiplied(-1);
                normal = this._coord.getDy();
                basicNormal = DVector3.readonlyY();
                break;
            case ActiveType.top:
                zeroDir = this._coord.getDz();
                normal = this._coord.getDy();
                basicNormal = DVector3.readonlyY();
                break;
            case ActiveType.left:
                zeroDir = this._coord.getDx().multiplied(-1);
                normal = this._coord.getDz();
                basicNormal = DVector3.readonlyZ();
                break;
            case ActiveType.right:
            default:
                zeroDir = this._coord.getDx();
                normal = this._coord.getDz();
                basicNormal = DVector3.readonlyZ();
        }

        return { zeroDir, normal, basicNormal };
    }
}