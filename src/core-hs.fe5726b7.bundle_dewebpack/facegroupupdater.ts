export enum FaceGroupConnectModeEnum {
  None = 'None',
  Manual = 'Manual',
  Auto = 'Auto'
}

interface MigrationContext {
  version: string;
  migrateSkipMixpaint?: boolean;
  migrateEntitiesMap?: Map<string, { id: string }>;
}

interface FaceGroupData {
  faceGroupId?: string;
  faceGroupBoundMap: Record<string, unknown>;
  cm?: FaceGroupConnectModeEnum;
}

interface VersionUtil {
  isEarlierThan(version: string, targetVersion: string): boolean;
}

declare global {
  const HSCore: {
    Util: {
      Version: VersionUtil;
    };
  };
}

export class FaceGroupUpdater {
  /**
   * Migrates face group ID and bound map based on version and migration context
   */
  static migrationFaceGroupIdMap(
    data: FaceGroupData,
    context: MigrationContext
  ): FaceGroupData {
    const isLegacyVersion = HSCore.Util.Version.isEarlierThan(context.version, '0.13');
    
    let faceGroupId = isLegacyVersion
      ? this.normalizeLegacyFaceGroupId(data.faceGroupId)
      : data.faceGroupId ?? '';

    let faceGroupBoundMap = data.faceGroupBoundMap;

    if (!context.migrateSkipMixpaint && faceGroupId) {
      const entityIds = faceGroupId.split(';');
      const migratedIds: string[] = [];
      const migratedBoundMap: Record<string, unknown> = {};

      entityIds.forEach((entityId) => {
        const migratedEntity = context.migrateEntitiesMap?.get(entityId);
        const newEntityId = migratedEntity?.id ?? entityId;
        
        migratedIds.push(newEntityId);
        migratedBoundMap[newEntityId] = faceGroupBoundMap[entityId];
      });

      faceGroupId = migratedIds.join(';');
      faceGroupBoundMap = migratedBoundMap;
    }

    data.faceGroupId = faceGroupId;
    data.faceGroupBoundMap = faceGroupBoundMap;

    return data;
  }

  /**
   * Migrates connect mode based on version and existing data
   */
  static migrationConnectMode(
    data: FaceGroupData,
    context: MigrationContext
  ): FaceGroupData {
    const isLegacyVersion = HSCore.Util.Version.isEarlierThan(context.version, '1.1');
    
    let connectMode: FaceGroupConnectModeEnum;

    if (isLegacyVersion && data.faceGroupId) {
      connectMode = FaceGroupConnectModeEnum.Manual;
    } else {
      connectMode = data.cm ?? FaceGroupConnectModeEnum.None;
    }

    data.cm = connectMode;

    return data;
  }

  /**
   * Normalizes legacy face group ID by replacing hyphens with semicolons
   */
  private static normalizeLegacyFaceGroupId(faceGroupId?: string): string {
    return faceGroupId?.replace(/-/gm, ';') ?? '';
  }
}