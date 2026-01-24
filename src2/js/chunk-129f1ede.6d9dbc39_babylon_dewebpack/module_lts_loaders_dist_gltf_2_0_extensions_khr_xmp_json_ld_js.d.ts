/**
 * KHR_xmp_json_ld glTF Extension
 * Handles XMP metadata embedded in glTF assets according to the KHR_xmp_json_ld specification.
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_xmp_json_ld
 */

import { GLTFLoader } from '@babylonjs/loaders/glTF/2.0/glTFLoader';
import { IDisposable } from '@babylonjs/core/scene';

/** Extension name constant */
export declare const EXTENSION_NAME = "KHR_xmp_json_ld";

/**
 * glTF root-level extension structure for KHR_xmp_json_ld
 */
export interface IKHR_xmp_json_ld_Root {
  /** Array of XMP metadata packets */
  packets?: unknown[];
}

/**
 * Asset-level extension structure referencing an XMP packet
 */
export interface IKHR_xmp_json_ld_Asset {
  /** Index reference to a packet in the root extension's packets array */
  packet: number | string;
}

/**
 * glTF Loader Extension: KHR_xmp_json_ld
 * 
 * This extension allows embedding XMP (Extensible Metadata Platform) metadata
 * into glTF assets. The metadata is stored in JSON-LD format and can be attached
 * to the root asset.
 * 
 * @remarks
 * The extension reads XMP packets from the glTF root extensions and attaches
 * the referenced packet to the root Babylon mesh metadata during loading.
 */
export declare class KHR_xmp_json_ld implements IDisposable {
  /**
   * The name of this extension.
   */
  readonly name: string;

  /**
   * Defines the order of this extension during loading.
   * Higher values load later.
   */
  readonly order: number;

  /**
   * Defines whether this extension is enabled.
   * Extension is enabled if it's listed in the glTF's extensionsUsed.
   */
  enabled: boolean;

  /**
   * Reference to the glTF loader instance.
   */
  private _loader: GLTFLoader | null;

  /**
   * Creates an instance of KHR_xmp_json_ld extension.
   * @param loader - The glTF loader instance
   */
  constructor(loader: GLTFLoader);

  /**
   * Disposes the extension and releases resources.
   */
  dispose(): void;

  /**
   * Called during the loading phase to process XMP metadata.
   * 
   * @remarks
   * This method reads the XMP packet reference from the asset extensions,
   * retrieves the corresponding packet from the root extensions,
   * and attaches it to the root Babylon mesh metadata under the 'xmp' property.
   */
  onLoading(): void;
}