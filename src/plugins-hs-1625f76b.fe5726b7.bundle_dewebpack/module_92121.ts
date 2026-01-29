import { HSCore } from './HSCore';
import { HSFPConstants } from './HSFPConstants';
import { HSCatalog } from './HSCatalog';

interface Size3D {
  x: number;
  y: number;
  z: number;
}

interface ResizeSpec {
  XSize: number;
  YSize: number;
  ZSize: number;
  x: number;
  y: number;
  z: number;
  archHeight?: number;
}

interface TransformSpec {
  xPos: number;
  yPos: number;
  xScale: number;
  yScale: number;
}

type ResizableContent = 
  | HSCore.Model.Opening
  | HSCore.Model.NCustomizedBeam
  | HSCore.Model.NCustomizedStructure
  | HSCore.Model.Content;

export default class ResizeContentRequest extends HSCore.Transaction.Common.StateRequest {
  private _content: ResizableContent;
  private _resizeSpec: ResizeSpec;
  private _targetSize: Size3D;
  private _offset: Size3D;
  private _slabOpeningAffectedWallFaces?: HSCore.Model.WallFace[];

  constructor(content: ResizableContent, targetSize?: Partial<Size3D>, offset?: Partial<Size3D>) {
    super();
    this._content = content;
    this._resizeSpec = this._getResizeSpec(content, targetSize, offset);
    this._targetSize = {
      x: content.XSize,
      y: content.YSize,
      z: content.ZSize,
      ...targetSize
    };
    this._offset = {
      x: 0,
      y: 0,
      z: 0,
      ...offset
    };
    this._slabOpeningAffectedWallFaces = undefined;
  }

  onCommit(): ResizableContent {
    this._applyResizeSpec(this._applyResizeSpecForContent.bind(this));
    
    if (HSCore.Util.Content.isSlabOpening(this._content)) {
      this._content.build();
    }
    
    if (
      this._content instanceof HSCore.Model.NCustomizedBeam ||
      this._content instanceof HSCore.Model.NCustomizedStructure
    ) {
      this._content.rebuild();
    }
    
    super.onCommit([]);
    return this._content;
  }

  onUndo(): void {
    super.onUndo([]);
  }

  onRedo(): void {
    super.onRedo([]);
  }

  onCompose(request: { type: string; data: unknown[] }): boolean {
    if (request.type !== HSFPConstants.RequestType.ResizeContent) {
      return false;
    }

    const data = request.data;
    const content = data[0] as ResizableContent;

    if (this._content !== content) {
      return false;
    }

    const targetSize = data[1] as Partial<Size3D>;
    const offset: Size3D = {
      x: 0,
      y: 0,
      z: 0,
      ...(data[2] as Partial<Size3D>)
    };

    this._targetSize.x = targetSize.x ?? this._targetSize.x;
    this._targetSize.y = targetSize.y ?? this._targetSize.y;
    this._targetSize.z = targetSize.z ?? this._targetSize.z;
    
    this._offset.x += offset.x;
    this._offset.y += offset.y;
    this._offset.z += offset.z;

    return true;
  }

  getComposeSpec(): [ResizableContent, Size3D, Size3D] {
    return [this._content, this._targetSize, this._offset];
  }

  private _getResizeSpec(
    content: ResizableContent,
    targetSize?: Partial<Size3D>,
    offset?: Partial<Size3D>
  ): ResizeSpec {
    const finalTargetSize: Size3D = {
      x: content.XSize,
      y: content.YSize,
      z: content.ZSize,
      ...targetSize
    };

    const finalOffset: Size3D = {
      x: 0,
      y: 0,
      z: 0,
      ...offset
    };

    const spec: ResizeSpec = {
      XSize: finalTargetSize.x,
      YSize: finalTargetSize.y,
      ZSize: finalTargetSize.z,
      x: content.x + finalOffset.x,
      y: content.y + finalOffset.y,
      z: content.z + finalOffset.z
    };

    if (content instanceof HSCore.Model.Opening && content.supportPM()) {
      spec.archHeight = content.archHeight;
    }

    return spec;
  }

  private _getRestoreSpec(content: ResizableContent): ResizeSpec {
    const spec: ResizeSpec = {
      XSize: content.XSize,
      YSize: content.YSize,
      ZSize: content.ZSize,
      x: content.x,
      y: content.y,
      z: content.z
    };

    if (content instanceof HSCore.Model.Opening && content.supportPM()) {
      spec.archHeight = content.archHeight;
    }

    return spec;
  }

  private _applyResizeSpec(
    applyFunc: (content: ResizableContent, spec: ResizeSpec) => ResizeSpec | void
  ): void {
    const result = applyFunc(this._content, this._resizeSpec);
    
    if (result) {
      this._resizeSpec = result;
    }

    if (this._content instanceof HSCore.Model.Opening) {
      this._content.refreshBothWallFaceGeometry();
    }
  }

  private _applyResizeSpecForContent(
    content: ResizableContent,
    spec: ResizeSpec
  ): ResizeSpec {
    const restoreSpec = this._getRestoreSpec(content);

    if (content.YSize !== spec.YSize) {
      content.roomSnapEnable = false;
    }

    content.x = spec.x;
    content.y = spec.y;
    content.z = spec.z;

    if (content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_Ceiling)) {
      const layer = HSCore.Util.Layer.getEntityLayer(content);
      console.assert(layer, `failed to retrieve layer for ${content.tag}`);
      const layerHeight = layer ? layer.height : content._floorplan.scene.activeLayer.height;
      content.z = layerHeight - spec.ZSize;
    }

    content.resize(spec.XSize, spec.YSize, spec.ZSize, spec.archHeight);

    return restoreSpec;
  }

  private _restoreResizeSpecForContent(
    content: ResizableContent,
    spec: ResizeSpec
  ): ResizeSpec {
    const restoreSpec = this._getRestoreSpec(content);

    content.resize(spec.XSize, spec.YSize, spec.ZSize, spec.archHeight);
    content.z = spec.z;
    content.y = spec.y;
    content.x = spec.x;

    return restoreSpec;
  }

  updateSlabHoleAffectedWalls(): void {
    if (!HSCore.Util.Content.isSlabOpening(this._content)) {
      return;
    }

    if (!this._slabOpeningAffectedWallFaces) {
      const restoreSpec = this._getRestoreSpec(this._content);
      const resizeSpec = this._resizeSpec;

      let oldTransform: TransformSpec | undefined;
      let newTransform: TransformSpec | undefined;

      if (restoreSpec) {
        oldTransform = {
          xPos: restoreSpec.x,
          yPos: restoreSpec.y,
          xScale: restoreSpec.XSize / this._content.XLength,
          yScale: restoreSpec.YSize / this._content.YLength
        };
      }

      if (resizeSpec) {
        newTransform = {
          xPos: resizeSpec.x,
          yPos: resizeSpec.y,
          xScale: resizeSpec.XSize / this._content.XLength,
          yScale: resizeSpec.YSize / this._content.YLength
        };
      }

      const oldAffectedFaces = HSCore.Util.Opening.getSlabHoleAffectedWallFaces(
        this._content,
        oldTransform
      );
      const newAffectedFaces = HSCore.Util.Opening.getSlabHoleAffectedWallFaces(
        this._content,
        newTransform
      );

      this._slabOpeningAffectedWallFaces = Array.from(
        new Set(oldAffectedFaces.concat(newAffectedFaces))
      );
    }

    this._slabOpeningAffectedWallFaces.forEach((face) => {
      face.dirtyGeometry();
    });
  }

  updateSlabHoleAffectedSlabs(): void {
    if (!HSCore.Util.Content.isSlabOpening(this._content)) {
      return;
    }

    const host = this._content.getHost();
    
    if (host) {
      host.forEachFace((face: HSCore.Model.Face) => {
        if (
          face instanceof HSCore.Model.Ceiling ||
          face instanceof HSCore.Model.Floor
        ) {
          face.dirtyGeometry();
          HSCore.Paint.PaintsUtil.updateFaceMixpaint(face);
        }
      });
    }
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return "修改模型大小";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}