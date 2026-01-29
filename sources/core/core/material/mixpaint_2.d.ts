/**
 * MixPaint entity class for handling mixed paint operations.
 * Extends MixPaintV3 to provide cloning, loading, and migration capabilities.
 * 
 * @module MixPaint
 * @since 0.28
 */

import { Entity } from './Entity';
import { MixPaintV3 } from './MixPaintV3';
import { MixPaintUpdaterProxy } from './MixPaintUpdaterProxy';

/**
 * Version information for paint data migration.
 */
interface VersionInfo {
  /** Semantic version string (e.g., "0.28.0") */
  version: string;
}

/**
 * Serialized paint dump data structure.
 */
interface PaintDumpData {
  // Add specific properties based on your paint data structure
  [key: string]: unknown;
}

/**
 * Legacy migration paint data structure.
 */
interface PaintMigrationData {
  // Add specific properties based on your migration data structure
  [key: string]: unknown;
}

/**
 * MixPaint class representing a composite paint entity.
 * Supports versioned data loading and automatic migration from legacy formats.
 * 
 * @extends MixPaintV3
 */
export class MixPaint extends MixPaintV3 {
  /**
   * Creates a new MixPaint instance.
   * 
   * @param id - Unique identifier for the paint entity (default: empty string)
   * @param options - Additional configuration options
   */
  constructor(id: string = "", options?: unknown) {
    super(id, options);
  }

  /**
   * Creates a deep clone of this MixPaint instance.
   * Clears the face group in the cloned instance.
   * 
   * @returns A new MixPaint instance with copied properties
   */
  clone(): MixPaint {
    const cloned = new MixPaint();
    cloned.copyFrom(this);
    cloned._faceGroup.clear();
    return cloned;
  }

  /**
   * Loads paint data from a dump, with automatic version migration.
   * Uses legacy updater for versions earlier than 0.28, otherwise uses standard IO.
   * 
   * @param data - Serialized paint dump data
   * @param versionInfo - Version metadata for migration detection
   */
  load(data: PaintDumpData, versionInfo: VersionInfo): void {
    if (HSCore.Util.Version.isEarlierThan(versionInfo.version, "0.28")) {
      // Legacy data migration path for versions < 0.28
      MixPaint.getUpdater().updateFromDump(this, data, versionInfo);
    } else {
      // Standard loading path for current versions
      this.getIO().load(this, data, versionInfo);
    }
  }

  /**
   * Loads paint data from legacy migration format.
   * Used for importing data from older application versions.
   * 
   * @param migrationData - Legacy paint data structure
   * @param versionInfo - Source version information
   */
  loadMigrationData(migrationData: PaintMigrationData, versionInfo: VersionInfo): void {
    MixPaint.getUpdater().updateFromPaintData(this, migrationData, versionInfo);
  }

  /**
   * Gets the singleton updater instance for paint data migration.
   * 
   * @returns The MixPaintUpdaterProxy singleton
   */
  private static getUpdater(): MixPaintUpdaterProxy {
    return MixPaintUpdaterProxy.getInstance();
  }
}

// Register the MixPaint class with the entity system
Entity.registerClass(HSConstants.ModelClass.MixPaint, MixPaint);