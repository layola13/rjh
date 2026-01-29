import { MathAlg, ObjParser } from './math-utils';

interface Face {
  discrete(): unknown;
}

interface Brep {
  getFaces(): Face[];
}

/**
 * Converts BREP (Boundary Representation) models to OBJ format
 */
export class OBJConverter {
  private static _instance: OBJConverter;

  /**
   * Converts a BREP model to OBJ format string
   * @param brep - The BREP model to convert
   * @returns OBJ format string representation of the model
   */
  brep2obj(brep: Brep): string {
    const faces = brep.getFaces();
    const flatMeshes: unknown[] = [];

    for (const face of faces) {
      const discreteMesh = face.discrete();
      const flatMesh = MathAlg.MeshUtil.toFlatMesh(discreteMesh);
      flatMeshes.push(flatMesh);
    }

    return ObjParser.exportMeshes(flatMeshes);
  }

  /**
   * Gets the singleton instance of OBJConverter
   * @returns The singleton instance
   */
  static getInstance(): OBJConverter {
    if (!this._instance) {
      this._instance = new OBJConverter();
    }
    return this._instance;
  }
}