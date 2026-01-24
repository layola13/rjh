import { Content } from './Content';
import { NodeComp, NodeCompEnum } from './NodeComp';
import { Vector3 } from './Vector3';
import { ComponentTypeDump } from './ComponentTypeDump';

/**
 * Component data structure for device dump/serialization
 */
export interface DeviceCompDumpData {
  /** Offset as 3-element array [x, y, z] */
  of: [number, number, number];
  /** Device entity ID */
  id?: string;
  /** Component type identifier */
  tp: ComponentTypeDump.Device;
}

/**
 * Device component that references a content entity and maintains spatial offset
 * 
 * @remarks
 * This component is used to attach device-related content to nodes in the scene graph.
 * It stores a reference ID to a Content entity and a 3D offset vector.
 */
export class DeviceComp extends NodeComp {
  /** 3D spatial offset vector */
  offset: Vector3;
  
  /** Reference ID of the associated device content entity */
  id?: string;
  
  /** Component type constant */
  static readonly Type: NodeCompEnum.Device;

  /**
   * Creates a new DeviceComp instance
   * @param id - Optional device content entity ID
   */
  constructor(id?: string);

  /**
   * Gets the component type identifier
   * @returns The device component type enum value
   */
  get type(): NodeCompEnum.Device;

  /**
   * Retrieves the referenced Content entity from the document
   * @returns The Content entity if found and valid, undefined otherwise
   */
  get content(): Content | undefined;

  /**
   * Creates a deep copy of this component
   * @returns A new DeviceComp instance with cloned properties
   */
  clone(): DeviceComp;

  /**
   * Serializes the component to a plain object for persistence
   * @returns Serialized component data
   */
  dump(): DeviceCompDumpData;

  /**
   * Deserializes component data and creates a DeviceComp instance
   * @param data - Serialized component data
   * @param referObject - Reference object to attach to the component
   * @returns Reconstructed DeviceComp instance
   */
  static load(data: DeviceCompDumpData, referObject: any): DeviceComp;
}