export interface FacePath {
  // Define according to actual return structure
}

export interface FacesPathMap {
  [key: string]: FacePath[];
}

export interface FaceHolesMap {
  [key: string]: unknown;
}

export interface CustomizedModel {
  // Define according to actual model structure
}

export class IDataProvider {
  constructor() {}

  getFacePath(faceId: string, pathType: string): FacePath[] {
    return [];
  }

  getFacesPath(faceIds: string[]): FacesPathMap {
    return {};
  }

  getFaceHoles(faceId: string): FaceHolesMap {
    return {};
  }

  getCustomizedModelsOnFace(faceId: string): CustomizedModel[] {
    return [];
  }
}