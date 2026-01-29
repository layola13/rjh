enum PaintCmdMessageEnum {
  material = 'material',
  rotation = 'rotation',
  backgroundMaterial = 'backgroundMaterial',
  editMaterial = 'editMaterial',
  clearMaterial = 'clearMaterial',
  colorMode = 'colorMode',
  blendColor = 'blendColor',
  resetPavingPoint = 'resetPavingPoint',
  offset = 'offset'
}

enum EditDoorStoneMessageEnum {
  resetDoorStone = 'resetDoorStone'
}

interface MaterialData {
  seekId?: string;
  textureURI?: string;
  textureURIDefault?: string;
  textureURIClip?: string;
  color?: number;
  tileSize_x?: number;
  tileSize_y?: number;
  tileSize?: number;
  rotation?: number;
  seamColor?: string;
  seamWidth?: number;
  flipX?: boolean;
  flipY?: boolean;
  colorMode?: any;
  blendColor?: any;
  offsetX?: number;
  offsetY?: number;
}

interface MixPaintData {
  paints: Array<{
    material: MaterialData;
    pavingOption?: PavingOption;
  }>;
  backgroundMaterial: MaterialData;
}

interface PavingOption {
  rotation: number;
  point: { x: number; y: number };
  originPoint: { x: number; y: number };
  clone(options: { rotation: number }): PavingOption;
}

interface EditMaterialOptions {
  msg?: string;
  data?: any;
  signalTextureLoadSuccess?: any;
}

interface BoundingBox {
  min: { x: number; y: number };
  max: { x: number; y: number };
}

interface PaintBoundingSize {
  width: number;
  height: number;
}

interface MaterialMeta {
  contentType: any;
  productType?: string;
  id?: string;
  textureUrl?: string;
  color?: number;
  tileSize_x?: number;
  tileSize_y?: number;
  rotation?: number;
}

type OffsetType = 'right' | 'left' | 'up' | 'down' | 'sliderHor' | 'sliderVer';

interface OffsetData {
  type: OffsetType;
  x: number;
  y: number;
}

export class EditMaterialRequest extends HSCore.Transaction.Common.StateRequest {
  entity: any;
  faceType: string;
  options: EditMaterialOptions;
  PaintCmdMessageEnum: typeof PaintCmdMessageEnum;
  PaintService: any;
  signalTextureLoadSuccess?: any;
  
  private _material: any;
  private _materialData?: MaterialData;
  private _mixPaintData?: MixPaintData;
  private _linkMaterial: Set<any>;
  private _materialMeta?: MaterialMeta;

  constructor(entity: any, faceType: string, options: EditMaterialOptions) {
    super();
    
    this.entity = entity;
    this.faceType = faceType;
    this.options = options;
    
    this._material = HSCore.Material.Util.getEntityMaterial(this.entity, this.faceType);
    this.PaintCmdMessageEnum = HSApp.PaintPluginHelper.Enum.PaintCmdMessageEnum;
    this.PaintService = HSApp.PaintPluginHelper.Util.PaintService;
    
    this._materialData = this.PaintService.getNormalPaintData(entity, { face: faceType });
    this._mixPaintData = this.PaintService.getMixPaintData(entity, { face: faceType });
    this.signalTextureLoadSuccess = options.signalTextureLoadSuccess;
    
    this._linkMaterial = new Set([this._material]);
    
    if (this.entity instanceof HSCore.Model.CustomizedModel) {
      HSApp.PaintPluginHelper.Util.MixPaintUtil.collectCustomizedModelGroupFaceIds(
        this.entity,
        [this.faceType]
      ).forEach((faceId: string) => {
        this._linkMaterial.add(this.entity.getFaceMaterial(faceId));
      });
    }
  }

  onCommit(): void {
    if (this.options.msg) {
      const { msg, data } = this.options;
      
      switch (msg) {
        case this.PaintCmdMessageEnum.material:
          this.applyMaterial(data);
          break;
        case this.PaintCmdMessageEnum.rotation:
          this.applyMaterialRotation(data);
          break;
        case this.PaintCmdMessageEnum.backgroundMaterial:
          this.applySeamParams(data);
          break;
        case this.PaintCmdMessageEnum.editMaterial:
          this.applyPictureMaterial(data);
          break;
        case this.PaintCmdMessageEnum.clearMaterial:
          this.clearMaterial();
          break;
        case EditDoorStoneMessageEnum.resetDoorStone:
          this.resetDoorStone(data);
          break;
        case this.PaintCmdMessageEnum.colorMode:
          this.applyColorInfo({ colorMode: data });
          break;
        case this.PaintCmdMessageEnum.blendColor:
          this.applyColorInfo(data);
          break;
        case this.PaintCmdMessageEnum.resetPavingPoint:
        case this.PaintCmdMessageEnum.offset:
          console.error("this.PaintCmdMessageEnum.resetPavingPoint invalid");
          break;
      }
    }
    
    if (this.entity) {
      this.entity.dirtyMaterial();
    }
    
    this._linkMaterial.forEach((material) => material.dirty());
    
    super.onCommit?.();
  }

  isValidNewMaterial(material?: MaterialData): boolean {
    if (!material || !material.seekId) {
      return false;
    }
    
    if (!this._materialData) {
      return true;
    }
    
    return (
      material.textureURI !== this._materialData.textureURI ||
      material.color !== this._materialData.color ||
      (!!this._mixPaintData || material.seekId !== this._materialData.seekId)
    );
  }

  firstLoadUpdateMaterial(entity: any, materialData: MaterialData, faceType: string): void {
    if (entity === undefined || materialData === undefined || faceType === undefined) {
      return;
    }

    let width: number;
    let height: number;

    if (entity instanceof HSCore.Model.Face) {
      const box = MathService.ins.getBoxFromPath(entity.rawPath2d);
      width = box.max.x - box.min.x;
      height = box.max.y - box.min.y;
    } else {
      const parent = entity.getUniqueParent();
      
      if (entity instanceof HSCore.Model.Floor || entity instanceof HSCore.Model.Ceiling) {
        width = parent.bound.width;
        height = parent.bound.height;
      } else {
        width = parent.length - parent.width;
        height = parent.height3d;
      }
    }

    if (materialData.tileSize_x !== undefined && materialData.tileSize_y !== undefined) {
      const aspectRatio = materialData.tileSize_x / materialData.tileSize_y;
      const widthBasedHeight = width / aspectRatio;
      const heightBasedWidth = height * aspectRatio;

      if (widthBasedHeight > height || widthBasedHeight === height) {
        materialData.tileSize_x = width;
        materialData.tileSize_y = widthBasedHeight;
      } else {
        materialData.tileSize_x = heightBasedWidth;
        materialData.tileSize_y = height;
      }
    }
  }

  applyMaterial(material?: MaterialMeta): void {
    if (!material) {
      return;
    }

    const materialData = HSCore.Material.Util.getMaterialData(material);
    
    if (!this.isValidNewMaterial(materialData)) {
      return;
    }

    if (material?.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Paint)) {
      this.entity.material.colorMode = HSCore.Material.ColorModeEnum.color;
    }

    this._materialMeta = material;
    this._materialData = materialData;

    if (material?.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Wallwrap)) {
      this.firstLoadUpdateMaterial(this.entity, materialData, this.faceType);
    }

    materialData.textureURIDefault = materialData.textureURI;
    this.PaintService.normalPaint(this.entity, materialData, { face: this.faceType });
    HSApp.App.getApp().signalContextualtoolRefresh.dispatch();
  }

  applyMaterialRotation(rotation: number): void {
    if (this._materialData) {
      this._materialData.rotation = rotation;
      this.PaintService.normalPaint(this.entity, this._materialData, { face: this.faceType });
    } else if (this._mixPaintData?.paints[0].pavingOption) {
      this._applyMaterialPavingRotation(rotation);
      this.PaintService.amendPaintData(this._mixPaintData);
      this.PaintService.mixPaint(this.entity, this._mixPaintData, { face: this.faceType });
    }
  }

  applySeamParams(seamParams: Partial<MaterialData>): void {
    if (this.PaintService.isMixPainted(this.entity, this.faceType) && this._mixPaintData) {
      this._mixPaintData.paints[0].material.seamColor = seamParams.seamColor;
      this._mixPaintData.paints[0].material.seamWidth = seamParams.seamWidth;
      this._mixPaintData.paints[0].material.textureURIClip = seamParams.textureURIClip;
      this._mixPaintData.backgroundMaterial.seamColor = seamParams.seamColor;
      this._mixPaintData.backgroundMaterial.seamWidth = seamParams.seamWidth;
      this._mixPaintData.backgroundMaterial.textureURIClip = seamParams.textureURIClip;
      this._mixPaintData.backgroundMaterial.textureURI = seamParams.textureURI;
      this._mixPaintData.paints[0].material.textureURI = this._mixPaintData.backgroundMaterial.textureURI;
      
      this.PaintService.amendPaintData(this._mixPaintData);
      this.PaintService.mixPaint(this.entity, this._mixPaintData, { face: this.faceType });
    } else {
      this._materialData = { ...this._materialData, ...seamParams };
      this.PaintService.normalPaint(this.entity, this._materialData, { face: this.faceType });
    }
  }

  resetDoorStone(doorStoneParams: Partial<MaterialData>): void {
    this._materialData = { ...this._materialData, ...doorStoneParams };
    this.PaintService.normalPaint(this.entity, this._materialData, { face: this.faceType });
  }

  applyPictureMaterial(pictureParams: Partial<MaterialData>): void {
    const polygon = this._material.getUniquePolygon();
    
    if (!polygon) {
      return;
    }

    if (pictureParams.tileSize_x !== undefined) {
      polygon.material.tileSize_x = pictureParams.tileSize_x;
    }
    
    if (pictureParams.tileSize_y !== undefined) {
      polygon.material.tileSize_y = pictureParams.tileSize_y;
    }
    
    if (pictureParams.flipX !== undefined) {
      polygon.material.flipX = pictureParams.flipX;
    }
    
    if (pictureParams.flipY !== undefined) {
      polygon.material.flipY = pictureParams.flipY;
    }

    this._material.dirty();
  }

  applyColorInfo(colorInfo: { colorMode?: any; blendColor?: any }): void {
    const materialData = !this._materialData && this._material.mixpaint.polygons.length > 0
      ? this._material.mixpaint.polygons[0].material
      : this._materialData;

    if (!materialData) {
      return;
    }

    if (colorInfo.colorMode) {
      materialData.colorMode = colorInfo.colorMode;
    }
    
    if (colorInfo.blendColor !== undefined) {
      materialData.blendColor = colorInfo.blendColor;
    }

    let material = this._material;
    if (!material) {
      material = HSCore.Paint.PaintsUtil.getMaterial(this.entity, this.faceType);
    }
    
    if (material) {
      material.set(materialData);
      this.entity.dirtyMaterial();
    }
  }

  clearMaterial(): void {
    const createDefaultMaterial = (defaultMat: MaterialData): MaterialMeta => ({
      contentType: new HSCatalog.ContentType(HSCatalog.ContentTypeEnum.Material),
      productType: HSCatalog.ProductTypeEnum.Material,
      id: defaultMat.id || defaultMat.seekId || "local",
      textureUrl: defaultMat.textureURI || "",
      color: defaultMat.color === undefined ? 16777215 : defaultMat.color,
      tileSize_x: defaultMat.tileSize_x || defaultMat.tileSize || 1,
      tileSize_y: defaultMat.tileSize_y || defaultMat.tileSize || 1,
      rotation: defaultMat.rotation || 0
    });

    let defaultMaterial = createDefaultMaterial(HSConstants.Constants.DEFAULT_WALL_INNER_MATERIAL);

    if (this.entity instanceof HSCore.Model.Floor && this.faceType === "top") {
      defaultMaterial = createDefaultMaterial(HSConstants.Constants.DEFAULT_FLOOR_MATERIAL);
      
      if (this.entity.getUniqueParent() === HSCore.Util.Layer.getOutdoorLayer()) {
        defaultMaterial = createDefaultMaterial(HSConstants.Constants.DEFAULT_OUTDOORFLOOR_MATERIAL);
      }
    } else if (this.entity instanceof HSCore.Model.Ceiling && this.faceType === "bottom") {
      defaultMaterial = createDefaultMaterial(HSConstants.Constants.DEFAULT_CEILING_MATERIAL);
    }

    this.applyMaterial(defaultMaterial);
  }

  private _applyMaterialPavingRotation(rotation: number): void {
    if (!this._mixPaintData) {
      return;
    }

    let normalizedRotation = rotation;
    if (normalizedRotation >= 360) {
      normalizedRotation -= 360;
    }

    this._mixPaintData.paints[0].pavingOption = this._mixPaintData.paints[0].pavingOption!.clone({
      rotation: normalizedRotation
    });
  }

  private _applyMaterialPavingOffset(offsetData: OffsetData): void {
    if (!this._mixPaintData?.paints[0].pavingOption) {
      return;
    }

    switch (offsetData.type) {
      case "right":
      case "left":
        this._mixPaintData.paints[0].pavingOption.point.x -= offsetData.x;
        break;
      case "up":
      case "down":
        this._mixPaintData.paints[0].pavingOption.point.y += offsetData.y;
        break;
      case "sliderHor":
        this._mixPaintData.paints[0].pavingOption.point.x =
          this._mixPaintData.paints[0].pavingOption.originPoint.x + offsetData.x;
        break;
      case "sliderVer":
        this._mixPaintData.paints[0].pavingOption.point.y =
          this._mixPaintData.paints[0].pavingOption.originPoint.y + offsetData.y;
        break;
    }
  }

  private _applyMaterialPavingAlign(alignment: string): void {
    if (!this._mixPaintData) {
      return;
    }

    const boundingSize = this.PaintService.getPaintBoundingSize(this.entity);
    const clonedMaterial = this._mixPaintData.backgroundMaterial.clone();

    HSCore.Material.Util.quickAlignMaterial(
      clonedMaterial,
      {
        min: { x: 0, y: 0 },
        max: { x: boundingSize.width, y: boundingSize.height }
      },
      alignment
    );

    this._mixPaintData.paints[0].pavingOption!.point.x = clonedMaterial.offsetX!;
    this._mixPaintData.paints[0].pavingOption!.point.y = clonedMaterial.offsetY!;
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return "编辑材质";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.FaceOperation;
  }
}