import { Molding_IO, Molding } from './Molding';
import { Entity } from './Entity';
import { Material } from './Material';
import { EntityField } from './EntityField';
import { PocketSideType } from './PocketSideType';

interface PocketSerializedData {
  side: PocketSideType;
  outerXSize: number;
  outerYSize: number;
  XSize: number;
  YSize: number;
}

interface DumpOptions {
  [key: string]: unknown;
}

type DumpCallback = (serialized: unknown[], entity: Pocket) => void;

class Pocket_IO extends Molding_IO {
  dump(
    entity: Pocket,
    callback?: DumpCallback,
    includeGeometry: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    const serialized = super.dump(entity, undefined, includeGeometry, options);
    const data = serialized[0] as PocketSerializedData;
    data.side = entity.side;
    data.outerXSize = entity.outerThickness;
    data.outerYSize = entity.outerHeight;
    
    if (callback) {
      callback(serialized, entity);
    }
    
    return serialized;
  }

  load(entity: unknown, data: PocketSerializedData, context: unknown): void {
    super.load(entity, data, context);
    const pocket = entity as Pocket;
    pocket.side = data.side;
    pocket.outerThickness = data.outerXSize || data.XSize;
    pocket.outerHeight = data.outerYSize || data.YSize;
  }
}

class Pocket extends Molding {
  private __outerXSize!: number;
  private __outerYSize!: number;
  private __side?: PocketSideType;

  constructor(name: string = "", parent?: unknown) {
    super(name, parent);
  }

  static create(metadata?: unknown): Pocket {
    const pocket = new Pocket();
    if (metadata) {
      pocket.initByMeta(metadata);
      pocket.outerThickness = pocket.XSize;
      pocket.outerHeight = pocket.YSize;
    }
    return pocket;
  }

  @EntityField({
    get(this: Pocket): number {
      return this.__outerXSize;
    },
    partialSet(this: Pocket, value: number): void {
      this.__outerXSize = value;
      this.dirtyGeometry();
    }
  })
  outerThickness!: number;

  @EntityField({
    get(this: Pocket): number {
      return this.__outerYSize;
    },
    partialSet(this: Pocket, value: number): void {
      this.__outerYSize = value;
      this.dirtyGeometry();
    }
  })
  outerHeight!: number;

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

  get thickness(): number {
    return this.XSize;
  }

  set thickness(value: number) {
    this.XSize = value;
  }

  get height(): number {
    return this.YSize;
  }

  set height(value: number) {
    this.YSize = value;
  }

  get defaultThickness(): number {
    return this.XLength;
  }

  get defaultHeight(): number {
    return this.YLength;
  }

  verify(): boolean {
    if (!this.material) {
      log.error(`${this.tag}'s material is missing.`, "HSCore.Verify.Error");
      this.material = Material.create(HSConstants.Constants.DEFAULT_POCKET_MATERIAL);
    }
    return true;
  }

  getDefaultSide(): PocketSideType {
    let sideType: PocketSideType = PocketSideType.Both;
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

  onFieldChanged(fieldName: string, newValue: unknown, oldValue: unknown): void {
    super.onFieldChanged(fieldName, newValue, oldValue);
    if (fieldName === "XSize" || fieldName === "YSize") {
      this.onSizeChanged();
    }
  }

  onSizeChanged(): void {
    const parent = this.getUniqueParent();
    if (parent?.onPocketSizeChanged) {
      parent.onPocketSizeChanged();
    }
  }

  getIO(): Pocket_IO {
    return Pocket_IO.instance();
  }
}

Entity.registerClass(HSConstants.ModelClass.NgPocket, Pocket);

export { Pocket_IO, Pocket };