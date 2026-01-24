/**
 * Module: CustomizedPMDwgUtil
 * Utility class for handling customized PM (Parametric Model) DWG data operations.
 * Provides methods to extract and transform DWG data from brep models with pave information.
 */

import { Matrix4, Vector3 } from 'some-geometry-library';
import { MixPaveApi, MixPaveDwgDecorator } from 'some-pave-library';

/**
 * Face pave information structure containing outer boundary and holes
 */
interface FacePaveInfo {
  /** Outer boundary of the face */
  outer: unknown;
  /** Array of holes within the face */
  holes: unknown[];
}

/**
 * Pave boundary data for DWG generation
 */
interface PaveBoundaryData {
  /** Outer boundary contour */
  outer: unknown;
  /** Array of hole contours */
  holes: unknown[];
}

/**
 * Result containing DWG data and its world transformation
 */
interface DwgDataResult {
  /** Generated pave DWG data */
  paveDwgData: unknown;
  /** World transformation matrix for the DWG data */
  worldTransform: Matrix4;
}

/**
 * Brep model with pave information
 */
interface BrepWithPave {
  /** Mapping from face tag to serialized mix pave data */
  faceTagToMixPave: Map<string, string>;
  /** Shell geometry containing faces */
  shell: {
    /** Retrieves a face by its tag identifier */
    getFaceByTag(tag: string): unknown;
  };
  /** Optional transformation matrix for the brep */
  matrix?: Matrix4;
}

/**
 * Model interface with brep and pave information
 */
interface ModelWithBreps {
  /** Retrieves all breps that have pave information */
  getBrepsWithPave(): BrepWithPave[] | undefined;
}

/**
 * Utility class for customized PM DWG operations.
 * Handles extraction and transformation of DWG data from parametric models.
 */
export class CustomizedPMDwgUtil {
  /** Scale factor for converting units (1mm = 0.001m) */
  private static readonly UNIT_SCALE_FACTOR = 0.001;

  /**
   * Extracts DWG data for a specific face from a model.
   * 
   * @param model - The model containing brep data with pave information
   * @param faceTag - Unique identifier for the target face
   * @param options - Configuration options for DWG generation
   * @returns DWG data with world transformation, or undefined if extraction fails
   * 
   * @remarks
   * This method performs the following steps:
   * 1. Retrieves breps with pave information from the model
   * 2. Locates the face and its associated mix pave data using the face tag
   * 3. Deserializes and loads the mix pave data
   * 4. Generates DWG data with appropriate transformations
   * 5. Applies unit scaling and world transformations
   */
  static getDwgData(
    model: ModelWithBreps,
    faceTag: string,
    options: unknown
  ): DwgDataResult | undefined {
    // Retrieve all breps that contain pave information
    const brepsWithPave = model.getBrepsWithPave();
    if (!brepsWithPave) {
      return undefined;
    }

    let targetFace: unknown;
    let mixPaveDataJson: string | undefined;

    // Find the brep containing the target face and its pave data
    const targetBrep = brepsWithPave.find((brep) => {
      mixPaveDataJson = brep.faceTagToMixPave.get(faceTag);
      if (mixPaveDataJson) {
        targetFace = brep.shell.getFaceByTag(faceTag);
      }
      return !!mixPaveDataJson;
    });

    // Validate that all required data was found
    if (!targetBrep || !targetFace || !mixPaveDataJson) {
      return undefined;
    }

    let paveDwgData: unknown;
    let paveToWorldTransform: Matrix4;

    // Parse the serialized mix pave data
    const mixPaveObject = JSON.parse(mixPaveDataJson);
    if (!mixPaveObject) {
      return undefined;
    }

    // Load the mix pave data using the API
    const mixPave = new MixPaveApi().loadMixPave(mixPaveObject);

    // Extract face pave information (boundaries and holes)
    const facePaveInfo: FacePaveInfo = DiySdk.PaveInfoUtil.getFacePaveInfo([targetFace]);

    // Prepare boundary data for DWG generation
    const paveBoundary: PaveBoundaryData = {
      outer: facePaveInfo.outer,
      holes: facePaveInfo.holes
    };

    // Generate DWG data from the mix pave and boundaries
    const dwgDecorator = new MixPaveDwgDecorator(mixPave, options);
    paveDwgData = dwgDecorator.getDwgData([paveBoundary]);

    // Get the pave-to-3D transformation matrix
    paveToWorldTransform = facePaveInfo.paveTo3dMatrix;

    // Apply brep transformation if it exists
    if (targetBrep.matrix) {
      paveToWorldTransform.preMultiply(targetBrep.matrix);
    }

    // Apply unit scale transformation (mm to m)
    const scaleMatrix = Matrix4.makeScale(
      Vector3.O(),
      CustomizedPMDwgUtil.UNIT_SCALE_FACTOR
    );
    paveToWorldTransform.preMultiply(scaleMatrix);

    // Return the result if all data is valid
    if (paveDwgData && paveToWorldTransform) {
      return {
        paveDwgData,
        worldTransform: paveToWorldTransform
      };
    }

    return undefined;
  }
}