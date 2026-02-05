// @ts-nocheck
import { Vector3 } from './Vector3';
import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { LineBasicMaterial, MeshComponent, BoundingBox, Node } from './ThreeTypes';

interface CutMoldingDimensionOptions {
  startPt: Vector3;
  endPt: Vector3;
}

interface MidLineDimensionOptions {
  length: number;
}

interface UpdateDataOptions {
  start: Vector3;
}

interface DimensionUpdateData {
  start: Vector3;
  end: Vector3;
}

const CONTENT_LINEDIMENSION_COLOR = HSApp.View.T3d.Constants.CONTENT_LINEDIMENSION_COLOR;
const CONTENT_LINEDIMENSION_SIZE = HSApp.View.T3d.Constants.CONTENT_LINEDIMENSION_SIZE;

export class CutMoldingDimension extends HSApp.View.Base.Gizmo {
  lineDimLeft?: HSApp.View.T3d.LinearDimension;
  lineDimRight?: HSApp.View.T3d.LinearDimension;
  lineDimMid?: MidLineDimension;
  startPt?: Vector3;
  endPt?: Vector3;
  pickPt?: Vector3;
  activeDimIndex: number = 0;
  linearDimensions: HSApp.View.T3d.LinearDimension[] = [];
  content?: HSCore.Model.Cornice | HSCore.Model.Baseboard;
  midLineStartZ?: number;

  constructor(
    viewer: unknown,
    layer: unknown,
    entity: HSCore.Model.Cornice | HSCore.Model.Baseboard,
    options: CutMoldingDimensionOptions
  ) {
    super(viewer, layer, entity);
    
    const { startPt, endPt } = options;
    this.entity = entity;
    this.startPt = startPt;
    this.endPt = endPt;
    this.content = entity;
    this.midLineStartZ = this.computeMidLineStartZ();
    
    this.initDimensions(viewer, layer, entity);
    
    this.childItems.forEach((item) => {
      this.signalHook
        .listen(item.inputSwitching, () => this.handleInputSwitch())
        .listen(viewer.signalCameraChanged, this.hide);
    });
  }

  handleInputSwitch(): void {
    this.activeDimIndex = (this.activeDimIndex + 1) % 2;
    this.linearDimensions[this.activeDimIndex].updateState(
      HSApp.View.T3d.GizmoInputStateEnum.focus,
      focus
    );
  }

  initDimensions(viewer: unknown, layer: unknown, entity: unknown): void {
    const leftDimension = new HSApp.View.T3d.LinearDimension(
      viewer,
      layer,
      entity,
      undefined,
      undefined,
      true,
      undefined,
      undefined,
      HSApp.View.T3d.GizmoInputStateEnum.focus | HSApp.View.T3d.GizmoInputStateEnum.editable
    );
    this.lineDimLeft = leftDimension;
    this.addChildGizmo(leftDimension);
    this.linearDimensions.push(leftDimension);

    const rightDimension = new HSApp.View.T3d.LinearDimension(
      viewer,
      layer,
      entity,
      undefined,
      undefined,
      true
    );
    this.lineDimRight = rightDimension;
    this.addChildGizmo(rightDimension);
    this.linearDimensions.push(rightDimension);

    const midLineLength = 2 * this.entity.YSize;
    const midDimension = new MidLineDimension(viewer, layer, entity, {
      length: midLineLength
    });
    this.lineDimMid = midDimension;
    this.addChildGizmo(midDimension);
  }

  computeMidLineStartZ(): number {
    const startZ = this.startPt!.z;
    const ySize = this.content!.YSize;

    if (this.content instanceof HSCore.Model.Cornice) {
      return startZ + 1.5 * ySize + 0.05;
    } else if (this.content instanceof HSCore.Model.Baseboard) {
      return startZ + 0.5 * ySize - 0.05;
    }
    return startZ;
  }

  update(pickPoint?: Vector3): void {
    if (pickPoint) {
      this.pickPt = pickPoint;
      
      this.lineDimRight!.updateDimensionData({
        start: this.startPt!,
        end: this.pickPt
      });
      this.lineDimRight!.onContentFieldChange();
      
      this.lineDimLeft!.updateDimensionData({
        start: this.endPt!,
        end: this.pickPt
      });
      this.lineDimLeft!.onContentFieldChange();
      
      this.lineDimMid!.updateData({
        start: new Vector3(this.pickPt.x, this.pickPt.y, this.midLineStartZ!)
      });
      this.lineDimMid!.draw();
    } else {
      this.hide();
    }
  }

  hide(): void {
    this.lineDimLeft?.hide();
    this.lineDimRight?.hide();
    this.lineDimMid?.hide();
  }

  onCleanup(): void {
    this.signalHook?.dispose();
    this.signalHook = undefined;
    super.onCleanup?.();
  }

  createLine(startPoint: Vector3, endPoint: Vector3): Node {
    const material = HSApp.View.T3d.Util.createGizmoMaterial(LineBasicMaterial, {
      color: CONTENT_LINEDIMENSION_COLOR,
      lineWidth: CONTENT_LINEDIMENSION_SIZE
    });

    const viewSpaceStart = HSApp.View.T3d.Util.ModelSpaceToViewSpace(startPoint);
    const viewSpaceEnd = HSApp.View.T3d.Util.ModelSpaceToViewSpace(endPoint);
    const lineNode = T3Dx.Three2T3d.createMeshNode(
      HSApp.View.T3d.Util.createLineGeometry(viewSpaceStart, viewSpaceEnd),
      material
    );

    lineNode
      .getComponent(MeshComponent)
      .getMesh()
      .setBoundingBox(BoundingBox.maxBox().clone());

    return lineNode;
  }
}

class MidLineDimension extends HSApp.View.T3d.Gizmo {
  startPt: Vector3 = new Vector3();
  endPt: Vector3 = new Vector3();
  mesh?: Node;
  length?: number;

  constructor(
    viewer: unknown,
    layer: unknown,
    entity: unknown,
    options: MidLineDimensionOptions
  ) {
    super(viewer, layer, entity);
    this.length = options.length;
  }

  createMesh(): Node {
    const material = HSApp.View.T3d.Util.createGizmoMaterial(LineBasicMaterial, {
      color: CONTENT_LINEDIMENSION_COLOR,
      lineWidth: CONTENT_LINEDIMENSION_SIZE
    });

    const endPoint: [number, number, number] = [0, -this.length!, 0];
    const meshNode = T3Dx.Three2T3d.createMeshNode(
      HSApp.View.T3d.Util.createLineGeometry([0, 0, 0], endPoint),
      material
    );

    this.mesh = meshNode;
    this.updateMesh();
    meshNode.setPickable(false);
    
    return meshNode;
  }

  updateMesh(): void {
    this.mesh!.setTranslation(this.startPt);
  }

  updateData(options: UpdateDataOptions): void {
    const { start } = options;
    const viewSpacePoint = HSApp.View.T3d.Util.ModelSpaceToViewSpace(start);
    this.startPt = new Vector3(viewSpacePoint);
  }

  draw(): void {
    if (this.node) {
      this.layer.removeChild(this);
      this.updateMesh();
    } else {
      this.node = new Node();
      this.mesh = this.createMesh();
      this.node.addChild(this.mesh);
    }
    
    this.layer.addChild(this);
    
    if (this.context) {
      this.context.needsRendering = true;
    }
  }

  hide(): void {
    super.hide?.();
    this.layer.removeChild(this);
  }

  onCleanup(): void {
    this.hide();
    super.onCleanup?.();
  }
}

export default MidLineDimension;