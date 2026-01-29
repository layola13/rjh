interface RawPath {
  outer: unknown;
  holes: unknown[];
}

interface SurfaceObj {
  surface: unknown;
  sameDirWithSurface: boolean;
}

interface Face {
  rawPath: RawPath;
  surfaceObj: SurfaceObj;
}

interface BaseInfo {
  outerPath: unknown;
  innerPaths: unknown[];
  surface: unknown;
  sameDirWithSurface: boolean;
}

export class FaceInfo {
  private face: Face;

  constructor(face: Face) {
    this.face = face;
  }

  get prev(): unknown {
    return undefined;
  }

  get next(): unknown {
    return undefined;
  }

  get baseInfo(): BaseInfo {
    const rawPath = this.face.rawPath;
    return {
      outerPath: rawPath.outer,
      innerPaths: rawPath.holes,
      surface: this.face.surfaceObj.surface,
      sameDirWithSurface: this.face.surfaceObj.sameDirWithSurface
    };
  }
}