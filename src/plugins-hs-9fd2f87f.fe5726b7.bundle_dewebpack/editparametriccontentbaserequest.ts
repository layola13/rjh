import { HSCore } from './HSCore';
import { MaterialApi, PavingOptionApi } from './MaterialApi';
import { EN_PROPERTY_PANEL_CONTENT_TYPE, EN_PROPERTY_PANEL_WIN_SUB_PART_TYPE } from './PropertyPanelConstants';

interface ParameterNode {
  eId?: string;
  name: string;
  type?: string;
  children?: ParameterNode[];
  onRightTitleClick?: (node: ParameterNode) => void;
  onEnter?: (node: ParameterNode, value: unknown) => void;
}

interface PropertyTree {
  children?: ParameterNode[];
}

interface Parameters {
  propertytree: PropertyTree;
}

interface ReceiveMessage {
  node?: ParameterNode;
  eId?: string;
  newValue: unknown;
  faceTags?: FaceTagInfo[];
  lockRatio?: boolean;
}

interface FaceTagInfo {
  faceTag: string;
  entity: FaceEntity;
  isFaceSupportPaintMaterial: boolean;
}

interface FaceEntity {
  facematerialmap: Map<string, { material: unknown }>;
  defaultmaterialmap: Map<string, { material: unknown }>;
  setFaceMaterialByTag(faceTag: string, material: unknown): void;
  setMaterialData(faceTag: string, materialData: unknown): void;
}

interface Size {
  width: number;
  height: number;
  depth: number;
}

interface Vector2D {
  x: number;
  y: number;
}

interface MaterialScaleOptions {
  scaleX?: number;
  scaleY?: number;
  lockRatio?: boolean;
}

interface PavingOptions {
  rotation?: number;
  sliderOffsetX?: number;
  sliderOffsetY?: number;
}

interface ParsedMessage {
  msg: string;
  param: ReceiveMessage;
}

export class EditParametricContentBaseRequest extends HSCore.Transaction.Common.StateRequest {
  private _content: HSCore.Model.ParametricContentBase;

  constructor(content: HSCore.Model.ParametricContentBase) {
    super();
    this._content = content;
  }

  onReceive(eventType: string, data: ReceiveMessage): void {
    switch (eventType) {
      case "onValueChange":
      case "onValueChangeEnd":
        if (data.node) {
          this.onParamsChangedCallback(data.node, data.newValue);
        } else {
          const node = this._getNodeById(data.eId!);
          if (!node) return;
          this.onParamsChangedCallback(node, data.newValue);
        }
        break;

      case "onElevationValueChange":
      case "onElevationValueChangeEnd":
        this._content.z = data.newValue as number;
        break;

      case "onRedAxisValueChange":
      case "onRedAxisValueChangeEnd":
        this._content.XRotation = data.newValue as number;
        break;

      case "onBlueAxisValueChange":
      case "onBlueAxisValueChangeEnd":
        this._content.ZRotation = data.newValue as number;
        break;

      case "onGreenAxisValueChange":
      case "onGreenAxisValueChangeEnd":
        this._content.YRotation = data.newValue as number;
        break;

      case "onReset":
        if (data.faceTags && data.faceTags.length > 0) {
          this._resetMaterial(data.faceTags);
        }
        if (data.node?.onRightTitleClick) {
          data.node.onRightTitleClick(data.node);
        } else {
          const node = this._getNodeById(data.node!.eId!);
          if (!node?.onRightTitleClick) return;
          node.onRightTitleClick(node);
        }
        break;

      case "onBasicPropertyReset":
        const originSize = this._content.getOriginSize();
        this._content.initParametricContentDocument(originSize);
        const host = this._content.host instanceof HSCore.Model.Face 
          ? this._content.host.getMaster?.() || this._content.host
          : this._content.host;
        
        if (host instanceof HSCore.Model.Wall) {
          const decorator = new HSCore.Model.ParametricModelDecorator(this._content);
          const moveVec = decorator.getMinMoveVecToWall(host);
          this._content.x += moveVec.x;
          this._content.y += moveVec.y;
        }
        break;

      case "onBoolInputDataChange":
        if (data.node?.onEnter) {
          data.node.onEnter(data.node, data.newValue);
        }
        break;

      case "onMaterialRotateChange":
        this._setMaterialPavingOption(data.faceTags!, { rotation: data.newValue as number });
        break;

      case "onMaterialHorizontalOffsetChange":
        this._setMaterialPavingOption(data.faceTags!, { sliderOffsetX: data.newValue as number });
        break;

      case "onMaterialVerticalOffsetChange":
        this._setMaterialPavingOption(data.faceTags!, { sliderOffsetY: data.newValue as number });
        break;

      case "onMaterialScaleXChange":
        this._setMaterialScale(data.faceTags!, { 
          scaleX: data.newValue as number, 
          lockRatio: data.lockRatio 
        });
        break;

      case "onMaterialScaleYChange":
        this._setMaterialScale(data.faceTags!, { 
          scaleY: data.newValue as number, 
          lockRatio: data.lockRatio 
        });
        break;

      case "onMaterialPositionReset":
        if (data.faceTags && data.faceTags.length > 0) {
          this._resetMaterialPosition(data.faceTags);
        }
        break;

      case "onMaterialScaleReset":
        if (data.faceTags && data.faceTags.length > 0) {
          this._resetMaterialScale(data.faceTags);
        }
        break;
    }

    super.onReceive(eventType, data);
  }

  onParamsChangedCallback(node: ParameterNode, value: unknown): void {
    const params: Record<string, unknown> = {};
    params[node.name] = value;
    HSCore.Util.NCustomizedParametricModel.onParamsChangedCallback(
      this._content.seekId,
      this._content.id,
      params
    );
  }

  private _setMaterialScale(faceTags: FaceTagInfo[], options: MaterialScaleOptions): void {
    for (const faceTagInfo of faceTags) {
      if (faceTagInfo.isFaceSupportPaintMaterial) {
        const materialInfo = faceTagInfo.entity.facematerialmap.get(faceTagInfo.faceTag);
        const material = materialInfo?.material;
        
        if (material) {
          const clonedMaterial = (material as any).clone();
          if (clonedMaterial instanceof HSCore.Material.Material && clonedMaterial.mixpaint) {
            const region = clonedMaterial.mixpaint.mixPave.getUniqueRegion();
            MaterialApi.editScale(region.pattern.patternUnits[0].materials[0], options);
            region.dirtyMaterial();
          }
          faceTagInfo.entity.setFaceMaterialByTag(faceTagInfo.faceTag, clonedMaterial);
        }
      } else {
        const materialInfo = faceTagInfo.entity.defaultmaterialmap.get(faceTagInfo.faceTag);
        const materialData = materialInfo?.material;
        
        if (materialData) {
          const clonedMaterialData = (materialData as any).clone();
          if (clonedMaterialData instanceof HSCore.Material.MaterialData) {
            const paveMaterial = new (HSPaveSDK as any).Material().setFrom({
              scaleX: clonedMaterialData.tileSize_x / clonedMaterialData.initTileSize_x,
              scaleY: clonedMaterialData.tileSize_y / clonedMaterialData.initTileSize_y
            });

            if (options.scaleX) {
              (HSPaveSDK as any).MaterialApi.editScale(paveMaterial, {
                lockRatio: options.lockRatio,
                scaleX: options.scaleX
              });
            } else if (options.scaleY) {
              (HSPaveSDK as any).MaterialApi.editScale(paveMaterial, {
                lockRatio: options.lockRatio,
                scaleY: options.scaleY
              });
            }

            clonedMaterialData.tileSize_x = clonedMaterialData.initTileSize_x * paveMaterial.scaleX;
            clonedMaterialData.tileSize_y = clonedMaterialData.initTileSize_y * paveMaterial.scaleY;
          }
          faceTagInfo.entity.setMaterialData(faceTagInfo.faceTag, clonedMaterialData);
        }
      }
    }

    this._content.dirtyGeometry();
    this._content.dirtyChildModels(true, true);
  }

  private _setMaterialPavingOption(faceTags: FaceTagInfo[], options: PavingOptions): void {
    const pavingApi = new PavingOptionApi();

    for (const faceTagInfo of faceTags) {
      if (faceTagInfo.isFaceSupportPaintMaterial) {
        const materialInfo = faceTagInfo.entity.facematerialmap.get(faceTagInfo.faceTag);
        const material = materialInfo?.material;
        
        if (material) {
          const clonedMaterial = (material as any).clone();
          if (clonedMaterial?.mixpaint) {
            const region = clonedMaterial.mixpaint.mixPave.getUniqueRegion();
            pavingApi.setPavingOptionParams(region, options);
          }
          faceTagInfo.entity.setFaceMaterialByTag(faceTagInfo.faceTag, clonedMaterial);
        }
      } else {
        const materialInfo = faceTagInfo.entity.defaultmaterialmap.get(faceTagInfo.faceTag);
        const materialData = materialInfo?.material;
        
        if (materialData) {
          const clonedMaterialData = (materialData as any).clone();
          if (clonedMaterialData instanceof HSCore.Material.MaterialData) {
            if (options.rotation !== undefined) {
              clonedMaterialData.rotation = options.rotation;
            } else if (options.sliderOffsetX !== undefined) {
              clonedMaterialData.offsetX = -options.sliderOffsetX;
            } else if (options.sliderOffsetY !== undefined) {
              clonedMaterialData.offsetY = options.sliderOffsetY;
            }
          }
          faceTagInfo.entity.setMaterialData(faceTagInfo.faceTag, clonedMaterialData);
        }
      }
    }

    this._content.dirtyGeometry();
    this._content.dirtyChildModels(true, true);
  }

  onUndo(): void {
    super.onUndo();
    this._contentUpdate();
  }

  onRedo(): void {
    super.onRedo();
    this._contentUpdate();
  }

  private _contentUpdate(): void {
    this._content.constructBrep();
    this._content.dirtyChildModels(true);
  }

  canTransactField(): boolean {
    return true;
  }

  private _getNodeById(elementId: string): ParameterNode | undefined {
    let foundNode: ParameterNode | undefined;

    const searchNodes = (nodes: ParameterNode[]): void => {
      for (const node of nodes) {
        if (foundNode) return;
        
        if (node.eId && node.eId === elementId) {
          foundNode = node;
          return;
        }
        
        if (node.children && Array.isArray(node.children) && node.children.length > 0) {
          searchNodes(node.children);
        }
      }
    };

    const propertyTree = this._content.parameters.propertytree;
    if (propertyTree?.children) {
      searchNodes(propertyTree.children);
    }

    return foundNode;
  }

  private _resetMaterial(faceTags: FaceTagInfo[]): void {
    this._resetMaterialPosition(faceTags);
    this._resetMaterialScale(faceTags);
  }

  private _resetMaterialPosition(faceTags: FaceTagInfo[]): void {
    const pavingApi = new PavingOptionApi();
    const resetOptions: PavingOptions = {
      rotation: 0,
      sliderOffsetX: 0,
      sliderOffsetY: 0
    };

    for (const faceTagInfo of faceTags) {
      if (faceTagInfo.isFaceSupportPaintMaterial) {
        const materialInfo = faceTagInfo.entity.facematerialmap.get(faceTagInfo.faceTag);
        const material = materialInfo?.material;
        
        if (material) {
          const clonedMaterial = (material as any).clone();
          if (clonedMaterial?.mixpaint) {
            const region = clonedMaterial.mixpaint.mixPave.getUniqueRegion();
            pavingApi.setPavingOptionParams(region, resetOptions);
          }
          faceTagInfo.entity.setFaceMaterialByTag(faceTagInfo.faceTag, clonedMaterial);
        }
      } else {
        const materialInfo = faceTagInfo.entity.defaultmaterialmap.get(faceTagInfo.faceTag);
        const materialData = materialInfo?.material;
        
        if (materialData) {
          const clonedMaterialData = (materialData as any).clone();
          if (clonedMaterialData instanceof HSCore.Material.MaterialData) {
            clonedMaterialData.rotation = 0;
            clonedMaterialData.offsetX = 0;
            clonedMaterialData.offsetY = 0;
          }
          faceTagInfo.entity.setMaterialData(faceTagInfo.faceTag, clonedMaterialData);
        }
      }
    }

    this._content.dirtyGeometry();
    this._content.dirtyChildModels(true);
  }

  private _resetMaterialScale(faceTags: FaceTagInfo[]): void {
    const resetScale: MaterialScaleOptions = {
      scaleX: 1,
      scaleY: 1
    };

    for (const faceTagInfo of faceTags) {
      if (faceTagInfo.isFaceSupportPaintMaterial) {
        const materialInfo = faceTagInfo.entity.facematerialmap.get(faceTagInfo.faceTag);
        const material = materialInfo?.material;
        
        if (material) {
          const clonedMaterial = (material as any).clone();
          if (clonedMaterial?.mixpaint) {
            const region = clonedMaterial.mixpaint.mixPave.getUniqueRegion();
            MaterialApi.editScale(region.pattern.patternUnits[0].materials[0], resetScale);
            region.dirtyMaterial();
          }
          faceTagInfo.entity.setFaceMaterialByTag(faceTagInfo.faceTag, clonedMaterial);
        }
      } else {
        const materialInfo = faceTagInfo.entity.defaultmaterialmap.get(faceTagInfo.faceTag);
        const materialData = materialInfo?.material;
        
        if (materialData) {
          const clonedMaterialData = (materialData as any).clone();
          if (clonedMaterialData instanceof HSCore.Material.MaterialData) {
            const paveMaterial = new (HSPaveSDK as any).Material().setFrom({
              scaleX: clonedMaterialData.tileSize_x / clonedMaterialData.initTileSize_x,
              scaleY: clonedMaterialData.tileSize_y / clonedMaterialData.initTileSize_y
            });

            (HSPaveSDK as any).MaterialApi.editScale(paveMaterial, {
              lockRatio: false,
              scaleX: resetScale.scaleX,
              scaleY: resetScale.scaleY
            });

            clonedMaterialData.tileSize_x = clonedMaterialData.initTileSize_x * paveMaterial.scaleX;
            clonedMaterialData.tileSize_y = clonedMaterialData.initTileSize_y * paveMaterial.scaleY;
          }
          faceTagInfo.entity.setMaterialData(faceTagInfo.faceTag, clonedMaterialData);
        }
      }
    }

    this._content.dirtyGeometry();
    this._content.dirtyChildModels(true);
  }

  getCategory(): string {
    if (this._content instanceof HSCore.Model.ParametricCurtain) {
      return (HSFPConstants as any).LogGroupTypes.ParametricCurtain;
    } else if (this._content instanceof HSCore.Model.ParametricBathroomCabinet) {
      return (HSFPConstants as any).LogGroupTypes.ParametricBathroomCabinet;
    }
    return (HSFPConstants as any).LogGroupTypes.ParametricContentBase;
  }

  getDescription(): string {
    if (this._content instanceof HSCore.Model.ParametricCurtain) {
      return "编辑参数化窗帘";
    } else if (this._content instanceof HSCore.Model.ParametricBathroomCabinet) {
      return "编辑参数化浴室柜";
    }
    return "编辑参数化软装";
  }

  static async parseReceiveMsgsAsync(messages: string[]): Promise<void> {
    if (!messages) return;
    if (!Array.isArray(messages) || messages.length === 0) return;

    const parsed: ParsedMessage = JSON.parse(messages[0]);
    const { msg, param } = parsed;

    if (msg === "onValueChange") {
      const nodeType = param.node?.type;
      
      if (nodeType === "MATERIIAL" || nodeType === EN_PROPERTY_PANEL_CONTENT_TYPE) {
        await (HSApp as any).App.getApp().catalogManager.getProductBySeekId(param.newValue);
      } else if (nodeType === EN_PROPERTY_PANEL_WIN_SUB_PART_TYPE) {
        await (HSApp as any).Util.NCustomizedFeatureModel.loadMetaRecursively(param.newValue);
      }
    }
  }
}