import { MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial } from './module_367441';

interface TextureWithTransform {
  setTransformToMaterial?(material: MaterialType): void;
}

type MaterialType = MeshBasicMaterial | MeshLambertMaterial | MeshPhongMaterial;

const materials: Array<typeof MeshBasicMaterial | typeof MeshLambertMaterial | typeof MeshPhongMaterial> = [
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhongMaterial
];

materials.forEach((MaterialClass) => {
  const originalSetDiffuseTexture = MaterialClass.prototype.setDiffuseTexture;
  
  MaterialClass.prototype.setDiffuseTexture = function(texture: TextureWithTransform): void {
    originalSetDiffuseTexture.call(this, texture);
    
    if (texture?.setTransformToMaterial) {
      texture.setTransformToMaterial(this);
    }
  };
});