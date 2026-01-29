import { FaceInfo } from './path/to/FaceInfo';

/**
 * Represents face information for a beam element.
 * Extends FaceInfo with beam-specific properties and behavior.
 */
export declare class BeamFaceInfo extends FaceInfo {
  /**
   * Indicates whether this is an auxiliary face.
   */
  readonly isAux: boolean;

  /**
   * The curve associated with the linked beam.
   */
  readonly curve: unknown;

  /**
   * Creates a new BeamFaceInfo instance.
   * @param face - The face object associated with this beam face info
   * @param isAux - Whether this is an auxiliary face
   */
  constructor(face: unknown, isAux: boolean);

  /**
   * Gets the beam object that owns this face.
   * @returns The master beam object from the face
   */
  get linkBeam(): unknown;
}