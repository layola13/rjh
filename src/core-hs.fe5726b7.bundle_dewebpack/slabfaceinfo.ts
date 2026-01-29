import { FaceInfo } from './FaceInfo';

export class SlabFaceInfo extends FaceInfo {
  public readonly isAux: boolean;

  constructor(face: unknown, isAux: boolean) {
    super(face);
    this.isAux = isAux;
  }

  get linkStructureFaces(): unknown[] {
    const parent = this.face.getUniqueParent();
    return parent ? parent.slabBuilder.getSlabFaceLinkedStructFaces(this.face) : [];
  }
}