import { HSCore } from './path/to/HSCore';

interface MaterialData {
  [key: string]: unknown;
}

interface Entity {
  getMaterial(componentName: string): Material | null | undefined;
}

interface Material {
  getMaterialData(): MaterialData;
  set(data: MaterialData): void;
}

/**
 * Material change transaction request for undo/redo operations
 */
export default class MaterialChangeRequest extends HSCore.Transaction.Request {
  private entity: Entity;
  private componentName: string;
  private materialData: MaterialData;

  constructor(entity: Entity, componentName: string, materialData: MaterialData) {
    super();
    this.entity = entity;
    this.componentName = componentName;
    this.materialData = materialData;
  }

  private changeData(): void {
    const material = this.entity.getMaterial(this.componentName);
    
    if (material) {
      const currentMaterialData = material.getMaterialData();
      material.set(this.materialData);
      this.materialData = currentMaterialData;
    }
  }

  public onCommit(): void {
    this.changeData();
  }

  public onUndo(): void {
    this.changeData();
  }

  public onRedo(): void {
    this.changeData();
  }
}