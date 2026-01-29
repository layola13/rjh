/**
 * MixPaint entity class for handling mixed paint operations.
 * Extends MixPaintV3 to provide cloning, loading, and migration capabilities.
 */

import { Entity } from './Entity';
import { MixPaintV3 } from './MixPaintV3';
import { MixPaintUpdaterProxy } from './MixPaintUpdaterProxy';

/**
 * Represents version information for data migration.
 */
interface VersionInfo {
  /** Semantic version string (e.g., "0.28.0") */
  version: string;
}

/**
 * Serialized data dump for MixPaint restoration.
 */
interface MixPaintDump {
  [key: string]: unknown;
}

/**
 * Legacy paint data structure for migration purposes.
 */
interface PaintData {
  [key: string]: unknown;
}

/**
 * Face group collection interface.
 */
interface FaceGroup {
  /** Removes all faces from the group */
  clear(): void;
}

/**
 * IO handler for MixPaint serialization/deserialization.
 */
interface MixPaintIO {
  /**
   * Loads MixPaint data from a dump.
   * @param target - The MixPaint instance to populate
   * @param data - Serialized paint data
   * @param versionInfo - Version metadata
   */
  load(target: MixPaint, data: MixPaintDump, versionInfo: VersionInfo): void;
}

/**
 * MixPaint class for managing composite paint materials.
 * Supports cloning, versioned loading, and data migration from legacy formats.
 */
export class MixPaint extends MixPaintV3 {
  /** Internal face group collection */
  protected _faceGroup!: FaceGroup;

  /**
   * Creates a new MixPaint instance.
   * @param id - Optional unique identifier for the paint
   * @param config - Optional configuration object
   */
  constructor(id: string = "", config?: unknown) {
    super(id, config);
  }

  /**
   * Creates a deep copy of this MixPaint instance.
   * The cloned instance has its face group cleared.
   * @returns A new MixPaint instance with copied properties
   */
  clone(): MixPaint {
    const cloned = new MixPaint();
    cloned.copyFrom(this);
    cloned._faceGroup.clear();
    return cloned;
  }

  /**
   * Loads paint data from a dump with version-aware handling.
   * Uses legacy updater for versions earlier than 0.28, otherwise uses standard IO.
   * @param data - Serialized paint data
   * @param versionInfo - Version metadata for migration logic
   */
  load(data: MixPaintDump, versionInfo: VersionInfo): void {
    if (HSCore.Util.Version.isEarlierThan(versionInfo.version, "0.28")) {
      MixPaint.getUpdater().updateFromDump(this, data, versionInfo);
    } else {
      this.getIO().load(this, data, versionInfo);
    }
  }

  /**
   * Loads paint data from legacy PaintData format.
   * @param data - Legacy paint data structure
   * @param versionInfo - Version metadata for migration
   */
  loadMigrationData(data: PaintData, versionInfo: VersionInfo): void {
    MixPaint.getUpdater().updateFromPaintData(this, data, versionInfo);
  }

  /**
   * Retrieves the IO handler for serialization operations.
   * @returns IO handler instance
   */
  protected getIO(): MixPaintIO {
    // Implementation inherited from MixPaintV3
    return super.getIO() as MixPaintIO;
  }

  /**
   * Gets the singleton updater proxy for handling legacy data migrations.
   * @returns MixPaintUpdaterProxy singleton instance
   */
  static getUpdater(): MixPaintUpdaterProxy {
    return MixPaintUpdaterProxy.getInstance();
  }
}

// Register the MixPaint class with the entity system
Entity.registerClass(HSConstants.ModelClass.MixPaint, MixPaint);