import { Slab, SlabFaceType } from './Slab';
import { SlabProfile } from './SlabProfile';

interface Face {
  getUniqueParent(): unknown;
}

export class ProfileFactory {
  constructor() {}

  createFaceProfile(face: Face, profileData: unknown): SlabProfile | undefined {
    const uniqueParent = face.getUniqueParent();
    
    if (uniqueParent instanceof Slab) {
      switch (uniqueParent.getFaceType(face)) {
        case SlabFaceType.top:
        case SlabFaceType.bottom:
          return new SlabProfile(face, profileData);
        case SlabFaceType.side:
          return undefined;
      }
    }
    
    return undefined;
  }
}