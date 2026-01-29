interface PaintData {
  mixpaint?: unknown;
}

interface MaterialMeta {
  version: string;
}

interface Material {
  paintData?: PaintData;
  mixpaint?: unknown;
}

interface Floorplan {
  getMeta(): MaterialMeta;
  forEachMaterial(callback: (material: Material) => void): void;
  load(data: unknown, options: unknown): void;
  loadMigrationData(data: unknown, options: unknown): void;
}

declare namespace HSCore.Util.Version {
  function isEarlierThan(version: string, targetVersion: string): boolean;
}

namespace MaterialUtil {
  export function migrateMaterial(material: Material): Material;
  export function migrateMaterialWithMixPaintEntity(material: Material): Material;
  export function fixMaterialWithSamePatternIssue(material: Material, processedSet: Set<unknown>): void;
  export function migrateSeamMaterial(material: Material): void;
}

export class MixPaintUpdaterV2 {
  updateFromPaintData(floorplan: Floorplan, paintData: unknown, options: unknown): void {
    floorplan.loadMigrationData(paintData, options);
  }

  updateFromDump(floorplan: Floorplan, dumpData: unknown, options: unknown): void {
    floorplan.load(dumpData, options);
  }

  postUpdateFloorplan(floorplan: Floorplan): void {
    this._migrateMaterial(floorplan);
  }

  private _migrateMaterial(floorplan: Floorplan): void {
    if (HSCore.Util.Version.isEarlierThan(floorplan.getMeta().version, "0.4")) {
      floorplan.forEachMaterial((material: Material) => {
        material = MaterialUtil.migrateMaterial(material);
      });
    }

    const processedMaterials = new Set<unknown>();

    floorplan.forEachMaterial((material: Material) => {
      if (material.paintData?.mixpaint) {
        material = MaterialUtil.migrateMaterialWithMixPaintEntity(material);
      } else if (material.mixpaint) {
        MaterialUtil.fixMaterialWithSamePatternIssue(material, processedMaterials);
      }
    });

    floorplan.forEachMaterial((material: Material) => {
      MaterialUtil.migrateSeamMaterial(material);
    });
  }
}