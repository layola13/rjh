import { BatchingComponent } from './BatchingComponent';
import { Node, RasterizerCullMode, Pass } from './CoreEngine';

interface MaterialBatchingHint {
  dirty: boolean;
  materialName: string;
  color: unknown;
  cullMode: RasterizerCullMode;
  normalURI: string;
  textureURI: string;
  opacity: number;
  shininess: number;
  specular: unknown;
  polygonOffsetFactor: number;
  polygonOffsetUnits: number;
  transparent: boolean;
  isNormalMapPhong: boolean;
  isDoubleUvPhong?: boolean;
  transform0?: TransformMatrix;
  transform1?: TransformMatrix;
  normalTransform0?: TransformMatrix;
  normalTransform1?: TransformMatrix;
  radian?: number;
  diffuseTileSizeX?: number;
  diffuseTileSizeY?: number;
  normalTileSizeX?: number;
  normalTileSizeY?: number;
  flipNormalGreen?: boolean;
  useNormalMap?: boolean;
}

interface TransformMatrix {
  equalsWithEpsilon(other: TransformMatrix): boolean;
}

interface Material {
  _batchingHint?: MaterialBatchingHint;
  getCullMode?(): RasterizerCullMode;
  getTechniques(): Technique[];
}

interface Technique {
  getPassCount(): number;
  getPass(index: number): Pass | unknown;
}

interface MeshComponent {
  getMaterial(): Material | null;
}

export function clearMaterialDirtyForBatching(material: Material): void {
  if (material._batchingHint) {
    material._batchingHint.dirty = false;
  } else {
    console.warn("no batching hint to clear");
  }
}

export function createBatchingNode(name: string = "", maxVertexCount: number = 300): Node {
  const node = new Node(name);
  const batchingComponent = new BatchingComponent({
    isSameMaterial: isSameMaterial,
    maxVertexCount: maxVertexCount
  });
  node.addComponent(batchingComponent);
  return node;
}

export function enableNodeBatching(node: Node, enabled: boolean): void {
  const batchingComponent = node.getComponent(BatchingComponent);
  if (batchingComponent) {
    batchingComponent.setEnableMerge(enabled);
  }
}

export function fastGetCullMode(meshComponent: MeshComponent): RasterizerCullMode | null {
  const material = meshComponent.getMaterial();
  if (material) {
    if (material.getCullMode) {
      return material.getCullMode();
    }
    return getCullModeFromTechniques(material);
  }
  return null;
}

function getCullModeFromTechniques(material: Material): RasterizerCullMode {
  let cullMode = RasterizerCullMode.CM_CW;
  material.getTechniques().some((technique) => {
    const passCount = technique.getPassCount();
    for (let passIndex = 0; passIndex < passCount; passIndex++) {
      const pass = technique.getPass(passIndex);
      if (pass instanceof Pass) {
        cullMode = pass.getCullMode();
        return true;
      }
    }
    return false;
  });
  return cullMode;
}

export function isMaterialDirtyForBatching(material: Material): boolean {
  return material._batchingHint?.dirty ?? false;
}

function areBatchingHintsEqual(hint1: MaterialBatchingHint, hint2: MaterialBatchingHint): boolean {
  if (hint1.materialName !== hint2.materialName ||
      hint1.color !== hint2.color ||
      hint1.cullMode !== hint2.cullMode ||
      hint1.normalURI !== hint2.normalURI ||
      hint1.textureURI !== hint2.textureURI ||
      hint1.opacity !== hint2.opacity ||
      hint1.shininess !== hint2.shininess ||
      hint1.specular !== hint2.specular ||
      hint1.polygonOffsetFactor !== hint2.polygonOffsetFactor ||
      hint1.polygonOffsetUnits !== hint2.polygonOffsetUnits ||
      hint1.transparent !== hint2.transparent ||
      hint1.isNormalMapPhong !== hint2.isNormalMapPhong) {
    return false;
  }

  if (hint1.transform0 !== undefined && hint2.transform0 !== undefined) {
    if (!hint1.transform0.equalsWithEpsilon(hint2.transform0) ||
        !hint1.transform1!.equalsWithEpsilon(hint2.transform1!)) {
      return false;
    }
  } else if (hint1.transform0 !== hint2.transform0) {
    return false;
  }

  if (hint1.isNormalMapPhong && hint2.isNormalMapPhong) {
    if (hint1.radian !== hint2.radian ||
        hint1.diffuseTileSizeX !== hint2.diffuseTileSizeX ||
        hint1.diffuseTileSizeY !== hint2.diffuseTileSizeY ||
        hint1.normalTileSizeX !== hint2.normalTileSizeX ||
        hint1.normalTileSizeY !== hint2.normalTileSizeY ||
        hint1.flipNormalGreen !== hint2.flipNormalGreen ||
        hint1.useNormalMap !== hint2.useNormalMap) {
      return false;
    }
  }

  if (hint1.isDoubleUvPhong && hint2.isDoubleUvPhong) {
    if (hint1.normalTransform0 !== undefined && hint2.normalTransform0 !== undefined) {
      if (!hint1.normalTransform0.equalsWithEpsilon(hint2.normalTransform0) ||
          !hint1.normalTransform1!.equalsWithEpsilon(hint2.normalTransform1!)) {
        return false;
      }
    } else if (hint1.normalTransform0 !== hint2.normalTransform0) {
      return false;
    }
  }

  return true;
}

function isSameMaterial(material1: Material, material2: Material): boolean {
  if (material1 === material2) {
    return true;
  }

  if (material1 != null && material2 != null) {
    const hint1 = material1._batchingHint;
    const hint2 = material2._batchingHint;
    if (!hint1 || !hint2) {
      return false;
    }
    return hint1 === hint2 || areBatchingHintsEqual(hint1, hint2);
  }

  return false;
}