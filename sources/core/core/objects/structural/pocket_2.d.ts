/**
 * Pocket module - Defines pocket modeling components for architectural elements
 * Handles pocket geometry, sizing, and material properties for doors and windows
 */

import { Molding_IO, Molding } from './molding-module';
import { Entity } from './entity-module';
import { Material } from './material-module';
import { EntityField } from './entity-field-decorator';
import { PocketSideType } from './pocket-side-type';

/**
 * Serialization handler for Pocket entities
 * Manages saving and loading pocket data including side configuration and dimensions
 */
export class Pocket_IO extends Molding_IO {
  /**
   * Serializes a Pocket entity to a portable format
   * @param entity - The pocket entity to serialize
   * @param callback - Optional callback for post-processing the dumped data
   * @param includeGeometry - Whether to include geometric data
   * @param options - Additional serialization options
   * @returns Array of serialized data objects
   */
  dump(
    entity: Pocket,
    callback?: (data: any[], entity: Pocket) => void,
    includeGeometry: boolean = true,
    options: Record<string, any> = {}
  ): any[] {
    const serializedData = super.dump(entity, undefined, includeGeometry, options);
    const primaryData = serializedData[0];

    primaryData.side = entity.side;
    primaryData.outerXSize = entity.outerThickness;
    primaryData.outerYSize = entity.outerHeight;

    if (callback) {
      callback(serializedData, entity);
    }

    return serializedData;
  }

  /**
   * Deserializes data into a Pocket entity
   * @param entity - Target entity to populate
   * @param data - Serialized data to load from
   * @param context - Loading context
   */
  load(entity: Pocket, data: any, context?: any): void {
    super.load(entity, data, context);

    const pocketEntity = entity as Pocket;
    pocketEntity.side = data.side;
    pocketEntity.outerThickness = data.outerXSize ?? data.XSize;
    pocketEntity.outerHeight = data.outerYSize ?? data.YSize;
  }
}

/**
 * Represents a pocket element in architectural modeling
 * Pockets are recessed areas typically found in walls for doors/windows
 */
export class Pocket extends Molding {
  private __outerXSize?: number;
  private __outerYSize?: number;
  private __side?: PocketSideType;

  constructor(name: string = "", parent?: any) {
    super(name, parent);
  }

  /**
   * Factory method to create a Pocket instance
   * @param metadata - Optional initialization metadata
   * @returns New Pocket instance
   */
  static create(metadata?: any): Pocket {
    const pocket = new Pocket();

    if (metadata) {
      pocket.initByMeta(metadata);
      pocket.outerThickness = pocket.XSize;
      pocket.outerHeight = pocket.YSize;
    }

    return pocket;
  }

  /**
   * Outer thickness of the pocket (X dimension)
   */
  @EntityField({
    get(this: Pocket): number | undefined {
      return this.__outerXSize;
    },
    partialSet(this: Pocket, value: number): void {
      this.__outerXSize = value;
      this.dirtyGeometry();
    }
  })
  outerThickness!: number;

  /**
   * Outer height of the pocket (Y dimension)
   */
  @EntityField({
    get(this: Pocket): number | undefined {
      return this.__outerYSize;
    },
    partialSet(this: Pocket, value: number): void {
      this.__outerYSize = value;
      this.dirtyGeometry();
    }
  })
  outerHeight!: number;

  /**
   * Side configuration (inner, outer, or both sides of wall)
   */
  @EntityField({
    get(this: Pocket): PocketSideType {
      if (!this.__side) {
        this.__side = this.getDefaultSide();
      }
      return this.__side;
    },
    partialSet(this: Pocket, value: PocketSideType): void {
      if (this.__side !== value) {
        this.__side = value;
        this.dirtyGeometry();
      }
    }
  })
  side!: PocketSideType;

  /**
   * Inner thickness of the pocket
   */
  get thickness(): number {
    return this.XSize;
  }

  set thickness(value: number) {
    this.XSize = value;
  }

  /**
   * Inner height of the pocket
   */
  get height(): number {
    return this.YSize;
  }

  set height(value: number) {
    this.YSize = value;
  }

  /**
   * Default thickness value
   */
  get defaultThickness(): number {
    return this.XLength;
  }

  /**
   * Default height value
   */
  get defaultHeight(): number {
    return this.YLength;
  }

  /**
   * Validates pocket configuration and ensures required properties are set
   * @returns True if validation passes
   */
  verify(): boolean {
    if (!this.material) {
      log.error(`${this.tag}'s material is missing.`, 'HSCore.Verify.Error');
      this.material = Material.create(HSConstants.Constants.DEFAULT_POCKET_MATERIAL);
    }
    return true;
  }

  /**
   * Determines default side type based on parent element context
   * @returns Appropriate PocketSideType for the current context
   */
  getDefaultSide(): PocketSideType {
    let sideType = PocketSideType.Both;

    const parent = this.getFirstParentOfNonTypes([HSCore.Model.Layer]);

    if (parent instanceof HSCore.Model.Door || parent instanceof HSCore.Model.Window) {
      if (parent.contentType.isTypeOf(HSCatalog.ContentTypeEnum.BayWindow)) {
        sideType = PocketSideType.Inner;
      } else if (parent.getHost() instanceof HSCore.Model.Wall) {
        const wallInfo = HSCore.Doc.getDocManager().geometryManager.getWallInfo(parent.getHost());

        if (wallInfo && !wallInfo.shared && wallInfo.outerWallSide) {
          sideType = PocketSideType.Inner;
        }
      }
    }

    return sideType;
  }

  /**
   * Handles property change notifications
   * @param fieldName - Name of the changed field
   * @param newValue - New value
   * @param oldValue - Previous value
   */
  protected onFieldChanged(fieldName: string, newValue: any, oldValue: any): void {
    super.onFieldChanged(fieldName, newValue, oldValue);

    if (fieldName === 'XSize' || fieldName === 'YSize') {
      this.onSizeChanged();
    }
  }

  /**
   * Notifies parent element when pocket size changes
   */
  protected onSizeChanged(): void {
    const parent = this.getUniqueParent();

    if (parent?.onPocketSizeChanged) {
      parent.onPocketSizeChanged();
    }
  }

  /**
   * Returns the IO handler for serialization
   * @returns Pocket_IO singleton instance
   */
  getIO(): Pocket_IO {
    return Pocket_IO.instance();
  }
}

// Register the Pocket class with the entity system
Entity.registerClass(HSConstants.ModelClass.NgPocket, Pocket);