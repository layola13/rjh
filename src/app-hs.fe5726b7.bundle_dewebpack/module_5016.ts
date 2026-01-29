import { Vector3, BoundingBox, MeshComponent, MeshBasicMaterial, LineBasicMaterial } from '@ali/t3d-js';
import { HSCatalog, HSConstants, HSCore } from '@ali/homestyler-tools-core';
import { BoxBufferGeometry, EdgesGeometry } from 'three';

interface Content {
  ID: string;
  seekId: string;
  contentType?: {
    isTypeOf(type: unknown): boolean;
  };
  XLength: number;
  YLength: number;
  ZLength: number;
  XSize: number;
  ZSize: number;
  ZScale: number;
  metadata: {
    scaleRule?: {
      data: ScaleRule;
    };
  };
  isFlagOn(flag: unknown): boolean;
}

interface ScaleRule {
  meshes: Record<string, MeshProperty>;
}

interface MeshProperty {
  ovrd_mtl?: string;
  self_locate?: boolean;
  dependencies?: string[];
  width: string;
  height: string;
  x: string;
  y: string;
  z: string;
}

interface MeshNode {
  getName(): string;
  setName(name: string): void;
  setScale(scale: Vector3): void;
  setTranslation(translation: Vector3): void;
  getTranslation(): Vector3;
  addChild(child: MeshNode): void;
  findNode(name: string, recursive: boolean): MeshNode | null;
  getComponent(component: typeof MeshComponent): {
    getBoundingBox(): BoundingBox;
    getMaterial(): {
      setOpacity(opacity: number): void;
    };
  };
}

interface DisplayListItem {
  dirty?: boolean;
  node: MeshNode;
  meshes?: {
    all: MeshNode[];
  };
  mouseOver?: boolean;
}

interface SelfLocateMeshResult {
  name: string;
  width: number;
  height: number;
  x: number;
  y: number;
  z: number;
}

interface Size {
  x: number;
  y: number;
  z: number;
}

const VIRTUAL_CONTENT_MESH_NAME = 'virtualcontent_mesh';
const VIRTUAL_CONTENT_LINE_NAME = 'virtualcontent_line';
const VIRTUAL_CONTENT_COLOR = 10411214;
const CABINET_BODY_MATERIAL = 'cbnt_body';
const CABINET_GLASS_MATERIAL = 'cbnt_glass';

export function isCabinetDecoPanel(content: Content): boolean {
  return content.contentType?.isTypeOf(HSCatalog.ContentTypeEnum.CabinetDecoPanel) ?? false;
}

export class Handler {
  private static BoundingBoxData: Map<string, BoundingBox> = new Map();

  private content: Content;
  private scaleRule: ScaleRule;
  private meshesMap: Map<string, MeshNode>;
  private boundingSize?: Size;

  constructor(content: Content) {
    this.content = content;
    this.scaleRule = content.metadata.scaleRule?.data ?? { meshes: {} };
    this.meshesMap = new Map();
  }

  updateVirtualContent = (displayItem: DisplayListItem): void => {
    if (!isCabinetDecoPanel(this.content)) return;

    const content = this.content;
    const depth = HSConstants.Constants.CABINET_VIRTUAL_PATH_DEFAULT_DEPTH;
    
    let meshNode = displayItem.node.findNode(VIRTUAL_CONTENT_MESH_NAME, true);
    let lineNode = displayItem.node.findNode(VIRTUAL_CONTENT_LINE_NAME, true);

    if (meshNode) {
      meshNode.setScale(new Vector3(1, content.ZScale, 1));
      lineNode?.setScale(new Vector3(1, content.ZScale, 1));
    } else {
      const boxGeometry = new BoxBufferGeometry(content.XLength, content.ZLength, depth);
      const meshMaterial = new MeshBasicMaterial({
        color: VIRTUAL_CONTENT_COLOR,
        opacity: 0,
        transparent: true
      });

      meshNode = T3Dx.Three2T3d.createMeshNode(
        T3Dx.Three2T3d.convertBufferGeometryToStreamingMesh(boxGeometry),
        meshMaterial,
        false
      );
      meshNode.setName(VIRTUAL_CONTENT_MESH_NAME);
      meshNode.setTranslation(new Vector3(0, content.ZLength / 2, -content.YLength / 2 - depth / 2));
      displayItem.node.addChild(meshNode);

      const edgesGeometry = new EdgesGeometry(boxGeometry, 1);
      lineNode = T3Dx.Three2T3d.createMeshNode(
        T3Dx.Three2T3d.convertLineBufferGeometryToStreamingMesh(edgesGeometry),
        new LineBasicMaterial({
          color: VIRTUAL_CONTENT_COLOR,
          opacity: 0,
          transparent: true
        })
      );
      lineNode.setName(VIRTUAL_CONTENT_LINE_NAME);
      lineNode.setTranslation(meshNode.getTranslation());
      displayItem.node.addChild(lineNode);
    }

    const isHighlighted = content.isFlagOn(HSCore.Model.EntityFlagEnum.selected) || displayItem.mouseOver;
    const opacity = isHighlighted ? 0.5 : 0;
    
    meshNode.getComponent(MeshComponent).getMaterial().setOpacity(opacity);
    lineNode?.getComponent(MeshComponent).getMaterial().setOpacity(opacity);
  };

  getSelfLocateMeshResults = (meshes: MeshNode[]): Map<string, SelfLocateMeshResult> => {
    const selfLocateMeshes = meshes.filter(
      mesh => this.scaleRule.meshes[mesh.getName()]?.self_locate
    );

    const dependenciesMap = new Map<string, string[]>();
    selfLocateMeshes.forEach(mesh => dependenciesMap.set(mesh.getName(), []));
    selfLocateMeshes.forEach(mesh => {
      const meshName = mesh.getName();
      const dependencies = this.scaleRule.meshes[meshName].dependencies;
      if (dependencies) {
        dependencies.forEach(dep => dependenciesMap.get(meshName)?.push(dep));
      }
    });

    const sortedMeshNames: string[] = [];
    while (dependenciesMap.size > 0) {
      let hasNoDependency = false;
      dependenciesMap.forEach((dependencies, meshName) => {
        if (dependencies.length === 0) {
          hasNoDependency = true;
          sortedMeshNames.push(meshName);
          dependenciesMap.delete(meshName);
          dependenciesMap.forEach(deps => {
            const index = deps.findIndex(dep => dep === meshName);
            if (index !== -1) {
              deps.splice(index, 1);
            }
          });
        }
      });
      if (!hasNoDependency) break;
    }

    const resultsMap = new Map<string, SelfLocateMeshResult>();
    sortedMeshNames.forEach(meshName => {
      const dependencyResults: SelfLocateMeshResult[] = [];
      const dependencies = this.scaleRule.meshes[meshName].dependencies;
      if (dependencies) {
        dependencies.forEach(dep => {
          const depResult = resultsMap.get(dep);
          if (depResult) {
            dependencyResults.push(depResult);
          }
        });
      }
      const mesh = this.meshesMap.get(meshName);
      if (mesh) {
        const result = this.getSelfLocateMeshResult(mesh, dependencyResults);
        resultsMap.set(meshName, result);
      }
    });

    return resultsMap;
  };

  getObjectNames(): string[] {
    const objectNames: string[] = [];
    const targetMaterials = [
      HSCore.Model.CustomizedCabinetComponentEnum.Body,
      CABINET_GLASS_MATERIAL
    ];

    targetMaterials.forEach(material => {
      for (const meshName in this.scaleRule.meshes) {
        if (this.scaleRule.meshes[meshName].ovrd_mtl === material) {
          objectNames.push(material);
          break;
        }
      }
    });

    return objectNames;
  }

  setDirty(displayItem?: DisplayListItem): void {
    if (displayItem && isCabinetDecoPanel(this.content)) {
      displayItem.dirty = true;
    }
  }

  private _isBodyMesh(mesh: MeshNode): boolean {
    const property = this.scaleRule.meshes[mesh.getName()];
    return property?.ovrd_mtl === CABINET_BODY_MATERIAL;
  }

  updateMaterialData(): void {
    // Implementation placeholder
  }

  toGraphicsData(): void {
    // Implementation placeholder
  }

  updateGraphicsData(): void {
    const displayItem = HSApp.App.getApp().getActive3DView().displayList[this.content.ID];
    
    if (this.meshesMap.size === 0 && displayItem.meshes?.all && displayItem.meshes.all.length > 0) {
      const allMeshes = displayItem.meshes.all;
      const scaleRuleMeshNames = Object.keys(this.scaleRule.meshes);
      
      if (allMeshes.length === 1 && scaleRuleMeshNames.length === 1) {
        allMeshes[0].setName(scaleRuleMeshNames[0]);
      }
      
      this.boundingSize = this.getMeshesBounding(allMeshes).getSize();
      allMeshes.forEach(mesh => this.meshesMap.set(mesh.getName(), mesh));
    }
  }

  getMeshesBounding(meshes: MeshNode[]): BoundingBox {
    const boundingBox = new BoundingBox();
    meshes.forEach(mesh => {
      const meshBounding = this.getMeshBounding(mesh);
      boundingBox.merge(meshBounding);
    });
    return boundingBox;
  }

  getMeshBounding(mesh: MeshNode): BoundingBox {
    const cacheKey = `${this.content.seekId}_${mesh.getName()}`;
    
    if (!Handler.BoundingBoxData.has(cacheKey)) {
      const boundingBox = mesh.getComponent(MeshComponent).getBoundingBox().clone();
      Handler.BoundingBoxData.set(cacheKey, boundingBox);
    }
    
    return Handler.BoundingBoxData.get(cacheKey)!;
  }

  getBoundingSize(mesh: MeshNode): Size {
    const boundingBox = mesh.getComponent(MeshComponent).getBoundingBox();
    const size = boundingBox.getSize();

    if (HSCore.Util.Math.nearlyEquals(size.x, 0)) {
      size.x = 2 * boundingBox.max.x;
    }
    if (HSCore.Util.Math.nearlyEquals(size.y, 0)) {
      size.y = 2 * boundingBox.max.y;
    }
    if (HSCore.Util.Math.nearlyEquals(size.z, 0)) {
      size.z = 2 * boundingBox.max.z;
    }

    return size;
  }

  getSelfLocateMeshResult(mesh: MeshNode, dependencies: SelfLocateMeshResult[]): SelfLocateMeshResult {
    const meshName = mesh.getName();
    const bounding = this.getMeshBounding(mesh);
    const property = this.scaleRule.meshes[meshName];
    const size = bounding.getSize();

    if (!this.boundingSize) {
      throw new Error('Bounding size not initialized');
    }

    const leftOffset = bounding.min.x - (-this.boundingSize.x / 2);
    const rightOffset = this.boundingSize.x / 2 - bounding.max.x;
    const bottomOffset = bounding.min.y - (-this.boundingSize.y / 2);
    const topOffset = this.boundingSize.y / 2 - bounding.max.y;

    let dependencyVariables = '';
    if (dependencies && dependencies.length > 0) {
      dependencies.forEach(dep => {
        dependencyVariables += `var ${dep.name} = {width:${dep.width}, height:${dep.height}, x:${dep.x}, y:${dep.y}, z:${dep.z}};`;
      });
    }

    const meshVariables = `var mesh = {width:${size.x}, height:${size.y}};`;
    const modelVariables = `var model = {width: ${this.boundingSize.x}, height: ${this.boundingSize.y}};`;
    const offsetVariables = `var leftOffset = ${leftOffset}, rightOffset = ${rightOffset}, bottomOffset = ${bottomOffset}, topOffset = ${topOffset};`;
    const contentVariables = `var content = {width: ${this.content.XSize}, height: ${this.content.ZSize}};`;

    const baseContext = dependencyVariables + meshVariables + modelVariables + offsetVariables + contentVariables;

    const width = eval(baseContext + property.width) as number;
    const height = eval(baseContext + property.height) as number;
    
    const sizeVariables = `var width = ${width}, height = ${height};`;
    const fullContext = baseContext + sizeVariables;

    const x = eval(fullContext + property.x) as number;
    const y = eval(fullContext + property.y) as number;
    const z = eval(fullContext + property.z) as number;

    return { name: meshName, width, height, x, y, z };
  }

  updateSelfLocateMeshes(meshes: MeshNode[]): void {
    this.getSelfLocateMeshResults(meshes).forEach(result => {
      const mesh = this.meshesMap.get(result.name);
      if (!mesh) return;

      const originalSize = this.getMeshBounding(mesh).getSize();
      mesh.setScale(new Vector3(result.width / originalSize.x, result.height / originalSize.y, 1));

      const modelSpacePosition = { x: result.x, y: result.y, z: result.z };
      const viewSpacePosition = HSApp.View.T3d.Util.ModelSpaceToViewSpace(modelSpacePosition);
      mesh.setTranslation(new Vector3(viewSpacePosition.x, viewSpacePosition.y, viewSpacePosition.z));
    });
  }

  computeScaleFactor(content: Content, size: Size): number {
    let scaleFactor = 1;

    if (isCabinetDecoPanel(content)) {
      if (!HSCore.Util.Math.isZero(size.x)) {
        scaleFactor = content.XLength / size.x;
      }
    } else {
      if (HSCore.Util.Math.isZero(size.y)) {
        if (HSCore.Util.Math.isZero(size.x)) {
          if (!HSCore.Util.Math.isZero(size.z)) {
            scaleFactor = content.YLength / size.z;
          }
        } else {
          scaleFactor = content.XLength / size.x;
        }
      } else {
        scaleFactor = content.ZLength / size.y;
      }
    }

    return scaleFactor;
  }
}