import { HSCore, HSConstants } from './635589';

/**
 * Request handler for editing customized model molding properties
 */
export class EditNCustomizedModelMoldingRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _molding: any[];

  constructor(molding: any[]) {
    super();
    this._molding = molding;
  }

  /**
   * Handle incoming events and delegate to appropriate handlers
   */
  onReceive(eventName: string, data: any): void {
    switch (eventName) {
      case "onParametersChange":
      case "onParametersChangeEnd":
        this.changeProfileData(data);
        break;
      case "onPositionChange":
      case "onPositionChangeEnd":
        this.onChangePosition(data);
        break;
      case "onAlignDataChange":
        this.onAlignDataChange(data);
        break;
      case "onPositionReset":
        this.onPositionReset(data);
        break;
      case "onChangeColorMode":
        this.onChangeColorMode(data);
        break;
      case "onChangeBlendColor":
        this.onChangeBlendColor(data);
        break;
      case "onScaleChange":
      case "onScaleChangeEnd":
      case "onScaleReset":
        this.onScaleChange(data);
        break;
      case "onPictureChange":
        this.onPictureChange(data);
        break;
      case "onPictureFlipChange":
        this.onPictureFlipChange(data);
        break;
      case "applyAllMoldings":
        this.applyAllMoldings(data);
    }
    
    super.onReceive(eventName, data);
  }

  onCommit(): void {
    super.onCommit();
  }

  canTransactField(): boolean {
    return true;
  }

  /**
   * Update profile parameters for all moldings
   */
  private changeProfileData(data: Record<string, any> | undefined): void {
    if (!data) return;

    for (const molding of this._molding) {
      if (!molding.parameters) return;
      
      const clonedParameters = _.cloneDeep(molding.parameters);
      Object.assign(clonedParameters, data);
      molding.parameters = clonedParameters;
      molding.dirtyGeometry();
    }
  }

  /**
   * Update position (rotation, offsetX, offsetY) for all moldings
   */
  private onChangePosition(data: { rotation?: number; offsetX?: number; offsetY?: number } | undefined): void {
    if (!data) return;

    for (const molding of this._molding) {
      const materialData = molding.getMaterialData()?.clone();
      if (!materialData) continue;

      if (data.rotation !== undefined) {
        materialData.rotation = data.rotation;
      }
      if (data.offsetX !== undefined) {
        materialData.offsetX = data.offsetX;
      }
      if (data.offsetY !== undefined) {
        materialData.offsetY = data.offsetY;
      }

      molding.materialData = materialData;
      molding.dirtyGeometry();
    }
  }

  /**
   * Apply alignment to material based on alignment type
   */
  private onAlignDataChange(data: { alignType?: string } | undefined): void {
    if (!data?.alignType) return;

    for (const molding of this._molding) {
      const materialData = molding.getMaterialData()?.clone();
      if (!materialData) continue;

      const displayItem = HSApp.App.getApp().getActive3DView().displayList[molding.id];
      if (!displayItem) return;

      const mesh = displayItem.allMeshes[0];
      const boundingBox = HSApp.View.T3d.Util.getMeshGeometryBoundingBox(mesh);

      let width = 0;
      let height = 0;

      if (HSCore.Util.Math.nearlyEquals(boundingBox.max.x, boundingBox.min.x)) {
        width = Math.abs(boundingBox.max.y - boundingBox.min.y);
        height = Math.abs(boundingBox.max.z - boundingBox.min.z);
      } else if (HSCore.Util.Math.nearlyEquals(boundingBox.max.y, boundingBox.min.y)) {
        width = Math.abs(boundingBox.max.x - boundingBox.min.x);
        height = Math.abs(boundingBox.max.z - boundingBox.min.z);
      } else if (HSCore.Util.Math.nearlyEquals(boundingBox.max.z, boundingBox.min.z)) {
        width = Math.abs(boundingBox.max.x - boundingBox.min.x);
        height = Math.abs(boundingBox.max.y - boundingBox.min.y);
      }

      if (width <= 0 || height <= 0) continue;

      if (materialData.isCustomized) {
        this.applyCustomizedAlignment(materialData, data.alignType, width, height);
      } else {
        const alignedMaterial = HSCore.Material.Util.quickAlignMaterialForDiy(
          materialData,
          {
            min: { x: 0, y: 0 },
            max: { x: width, y: height }
          },
          data.alignType
        );
        Object.assign(materialData, alignedMaterial);
      }

      molding.materialData = materialData;
      molding.dirtyGeometry();
    }
  }

  /**
   * Apply alignment for customized materials
   */
  private applyCustomizedAlignment(
    materialData: any,
    alignType: string,
    width: number,
    height: number
  ): void {
    switch (alignType) {
      case HSConstants.Position.TopLeft:
        if (materialData.tileSize_y) {
          materialData.offsetY = 1 - 100 * (height - materialData.tileSize_y) / 2 / height / 100;
        }
        if (materialData.tileSize_x) {
          materialData.offsetX = 100 * (width - materialData.tileSize_x) / 2 / width / 100;
        }
        break;
      case HSConstants.Position.TopRight:
        if (materialData.tileSize_y) {
          materialData.offsetY = 1 - 100 * (height - materialData.tileSize_y) / 2 / height / 100;
        }
        if (materialData.tileSize_x) {
          materialData.offsetX = 1 - 100 * (width - materialData.tileSize_x) / 2 / width / 100;
        }
        break;
      case HSConstants.Position.BottomLeft:
        if (materialData.tileSize_y) {
          materialData.offsetY = 100 * (height - materialData.tileSize_y) / 2 / height / 100;
        }
        if (materialData.tileSize_x) {
          materialData.offsetX = 100 * (width - materialData.tileSize_x) / 2 / width / 100;
        }
        break;
      case HSConstants.Position.BottomRight:
        if (materialData.tileSize_y) {
          materialData.offsetY = 100 * (height - materialData.tileSize_y) / 2 / height / 100;
        }
        if (materialData.tileSize_x) {
          materialData.offsetX = 1 - 100 * (width - materialData.tileSize_x) / 2 / width / 100;
        }
        break;
      case HSConstants.Position.TopCenter:
        if (materialData.tileSize_y) {
          materialData.offsetY = 1 - 100 * (height - materialData.tileSize_y) / 2 / height / 100;
        }
        materialData.offsetX = 0;
        break;
      case HSConstants.Position.BottomCenter:
        if (materialData.tileSize_y) {
          materialData.offsetY = 100 * (height - materialData.tileSize_y) / 2 / height / 100;
        }
        materialData.offsetX = 0;
        break;
      case HSConstants.Position.LeftMiddle:
        if (materialData.tileSize_x) {
          materialData.offsetX = 100 * (width - materialData.tileSize_x) / 2 / width / 100;
        }
        materialData.offsetY = 0;
        break;
      case HSConstants.Position.RightMiddle:
        if (materialData.tileSize_x) {
          materialData.offsetX = 1 - 100 * (width - materialData.tileSize_x) / 2 / width / 100;
        }
        materialData.offsetY = 0;
        break;
      case HSConstants.Position.CenterMiddle:
        materialData.offsetX = 0;
        materialData.offsetY = 0;
        break;
    }
  }

  /**
   * Reset position to default values
   */
  private onPositionReset(data: { rotation: number; offsetX: number; offsetY: number } | undefined): void {
    if (!data) return;

    for (const molding of this._molding) {
      const materialData = molding.getMaterialData()?.clone();
      if (!materialData) continue;

      materialData.rotation = data.rotation;
      materialData.offsetX = data.offsetX;
      materialData.offsetY = data.offsetY;

      molding.materialData = materialData;
      molding.dirtyGeometry();
    }
  }

  /**
   * Change color mode for all moldings
   */
  private onChangeColorMode(data: { colorMode?: string } | undefined): void {
    if (!data) return;

    for (const molding of this._molding) {
      const materialData = molding.getMaterialData()?.clone();
      if (!materialData) continue;

      if (data.colorMode) {
        materialData.colorMode = data.colorMode;
      }

      molding.materialData = materialData;
      molding.dirtyGeometry();
    }
  }

  /**
   * Change blend color and color mode
   */
  private onChangeBlendColor(data: { colorMode?: string; blendColor?: string } | undefined): void {
    if (!data) return;

    for (const molding of this._molding) {
      const materialData = molding.getMaterialData()?.clone();
      if (!materialData) continue;

      if (data.colorMode) {
        materialData.colorMode = data.colorMode;
      }
      if (data.blendColor) {
        materialData.blendColor = data.blendColor;
      }

      molding.materialData = materialData;
      molding.dirtyGeometry();
    }
  }

  /**
   * Update scale parameters (tile size)
   */
  private onScaleChange(data: { scaleParams: { tileSize_x?: number; tileSize_y?: number } } | undefined): void {
    if (!data) return;

    for (const molding of this._molding) {
      const materialData = molding.getMaterialData()?.clone();
      if (!materialData) continue;

      if (data.scaleParams.tileSize_x) {
        materialData.tileSize_x = data.scaleParams.tileSize_x;
      }
      if (data.scaleParams.tileSize_y) {
        materialData.tileSize_y = data.scaleParams.tileSize_y;
      }

      molding.materialData = materialData;
      molding.dirtyGeometry();
    }
  }

  /**
   * Update picture tile size
   */
  private onPictureChange(data: { pictureParams: { tileSize_x?: number; tileSize_y?: number } } | undefined): void {
    if (!data) return;

    for (const molding of this._molding) {
      const materialData = molding.getMaterialData()?.clone();
      if (!materialData) continue;

      if (data.pictureParams.tileSize_x) {
        materialData.tileSize_x = data.pictureParams.tileSize_x;
      }
      if (data.pictureParams.tileSize_y) {
        materialData.tileSize_y = data.pictureParams.tileSize_y;
      }

      molding.materialData = materialData;
      molding.dirtyGeometry();
    }
  }

  /**
   * Toggle flip state for picture
   */
  private onPictureFlipChange(data: { flipX?: boolean; flipY?: boolean } | undefined): void {
    if (!data) return;

    for (const molding of this._molding) {
      const materialData = molding.getMaterialData()?.clone();
      if (!materialData) continue;

      if (data.flipX !== undefined) {
        materialData.flipX = data.flipX;
      } else if (data.flipY !== undefined) {
        materialData.flipY = data.flipY;
      }

      molding.materialData = materialData;
      molding.dirtyGeometry();
    }
  }

  /**
   * Apply material from first molding to all other moldings
   */
  private applyAllMoldings(data: { allMoldings?: any[] } | undefined): void {
    if (!data?.allMoldings) return;

    const sourceMaterialData = this._molding[0].getMaterialData()?.clone();
    if (!sourceMaterialData) return;

    for (const targetMolding of data.allMoldings) {
      targetMolding.materialData = sourceMaterialData;
      targetMolding.dirtyGeometry();
    }
  }
}