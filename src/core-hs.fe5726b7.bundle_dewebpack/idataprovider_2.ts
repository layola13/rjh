export class IDataProvider {
  constructor() {}

  getFacePath(geometry: any, faceId: any): any {
    return geometry.rawGeometry.outer;
  }

  getFacesPath(face: any): Record<string, never> {
    return {};
  }

  getFaceHoles(face: any): Record<string, never> {
    return {};
  }

  getCustomizedModelsOnFace(face: any): any[] {
    return [];
  }
}