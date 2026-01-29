import { Entity, Entity_IO } from './Entity';
import { SignalHook } from './SignalHook';
import { nearlyEquals } from './MathUtils';
import { EntityField } from './EntityField';
import { Meta } from './Meta';
import { Logger } from './Logger';

export enum MoldingTypeEnum {
    Mitre = "mitre",
    Baseboard = "baseboard",
    Cornice = "cornice",
    Pocket = "pocket",
    WallBoardBaseboard = "wallboardbaseboard",
    WallBoardWaistLine = "wallboardwaistline",
    CustomizedModelMolding = "customizedmodelmolding",
    NCustomizedModelMolding = "ncustomizedmodelmolding"
}

interface DumpOptions {
    productsMap?: Map<string, Meta>;
    [key: string]: unknown;
}

interface LoadOptions {
    productsMap?: Map<string, Meta>;
    [key: string]: unknown;
}

interface DumpedMoldingData {
    seekId: string;
    XSize: number;
    YSize: number;
    material?: string;
    [key: string]: unknown;
}

interface Material {
    id: string;
    seekId: string;
    rotation: number;
    dump(callback?: DumpCallback, deep?: boolean, options?: DumpOptions): unknown[];
    clone(): Material;
    signalDirty: unknown;
}

interface MoldingMetadata {
    id: string;
    seekId: string;
    contentType: HSCatalog.ContentType;
    profile: unknown;
    profileHigh?: unknown;
    profileSizeX: number;
    profileSizeY: number;
    normalTexture: unknown;
    normalTextureHigh?: unknown;
}

type DumpCallback = (result: unknown[], entity: unknown) => void;

export class Molding_IO extends Entity_IO {
    dump(
        entity: Molding,
        callback?: DumpCallback,
        deep: boolean = true,
        options: DumpOptions = {}
    ): unknown[] {
        let result = super.dump(entity, undefined, deep, options);
        const dumpedData = result[0] as DumpedMoldingData;
        const metadata = entity.metadata;

        if (options.productsMap && metadata && metadata.id) {
            const product = metadata instanceof Meta 
                ? metadata 
                : HSCatalog.Manager.instance().getProductBySeekIdSync(metadata.seekId, { data: metadata });
            
            if (product) {
                options.productsMap.set(product.id, product);
            }
        }

        dumpedData.seekId = entity.seekId;
        dumpedData.XSize = entity.XSize;
        dumpedData.YSize = entity.YSize;

        if (entity.material) {
            dumpedData.material = entity.material.id;
            if (deep || this.mustDeepClone(entity.material.id)) {
                result = result.concat(entity.material.dump(callback, deep, options));
            }
        }

        if (callback) {
            callback(result, entity);
        }

        return result;
    }

    load(entity: Molding, data: DumpedMoldingData, options: LoadOptions): void {
        super.load(entity, data, options);

        entity._seekId = data.seekId;

        if (options.productsMap && data.seekId) {
            const product = options.productsMap.get(data.seekId);
            if (product) {
                entity.initByMeta(product);
            } else {
                log.error(
                    `${entity.tag}: failed to load metadata with seek id '${entity.seekId}'`,
                    "HSCore.Load.Error"
                );
            }
        }

        if (data.XSize) {
            entity.__XSize = data.XSize;
        }

        if (data.YSize) {
            entity.__YSize = data.YSize;
        }

        if (data.material) {
            const material = Entity.loadFromDumpById(data.material, options) as Material | null;
            if (material) {
                entity.material = material;
            } else {
                log.error(`${entity.tag}: failed to load material.`, "HSCore.Load.Error");
            }
        }

        HSCore.Util.PaintMaterial.migrateMaterialColor(options, entity.material);
    }
}

export class Molding extends Entity {
    _seekId: string = "";
    
    @EntityField({ prefix: "_" })
    host: unknown | null = null;

    __XSize: number = 0.1;
    __YSize: number = 0.1;

    @EntityField({
        postSet(this: Molding, oldValue: Material, newValue: Material) {
            this._onMaterialChanged(oldValue, newValue);
        }
    })
    material?: Material;

    @EntityField({
        postSet(this: Molding, oldValue: number, newValue: number) {
            this._onSizeChanged(oldValue, newValue);
        }
    })
    XSize!: number;

    @EntityField({
        postSet(this: Molding, oldValue: number, newValue: number) {
            this._onSizeChanged(oldValue, newValue);
        }
    })
    YSize!: number;

    private _materialSignalHook: SignalHook;

    constructor(name: string = "", parent?: unknown) {
        super(name, parent);
        this._materialSignalHook = new SignalHook(this);
    }

    get seekId(): string {
        return this._seekId;
    }

    set seekId(value: string) {
        this._seekId = value;
    }

    get contentType(): HSCatalog.ContentType {
        return this.metadata ? this.metadata.contentType : new HSCatalog.ContentType("");
    }

    get normalTexture(): unknown {
        return this.metadata && this.metadata.normalTexture;
    }

    get normalTextureHigh(): unknown {
        return this.metadata && this.metadata.normalTextureHigh;
    }

    get profile(): unknown {
        Logger.console.assert(this.metadata, `${this.tag}.profile: invalid metadata!`);
        return this.metadata && this.metadata.profile;
    }

    get profileHigh(): unknown {
        Logger.console.assert(this.metadata, `${this.tag}.profileHigh: invalid metadata!`);
        return this.metadata && this.metadata.profileHigh;
    }

    get XLength(): number {
        return this.metadata ? this.metadata.profileSizeX : 0;
    }

    get YLength(): number {
        return this.metadata ? this.metadata.profileSizeY : 0;
    }

    initByMeta(metadata: MoldingMetadata): void {
        Logger.console.assert(metadata, `${this.tag}.initByMeta: invalid metadata!`);
        this.metadata = metadata;
        this._seekId = metadata ? metadata.id : "";
        this.__XSize = metadata ? metadata.profileSizeX : 0;
        this.__YSize = metadata ? metadata.profileSizeY : 0;
    }

    getMetadataFilterKeys(): Set<string> {
        return new Set([
            "id",
            "contentType",
            "profile",
            "profileSizeX",
            "profileSizeY",
            "normalTexture"
        ]);
    }

    getHost(): unknown | null {
        return this.host;
    }

    assignTo(host: unknown): void {
        this.host = host;
    }

    getMaterial(): Material | undefined {
        return this.material;
    }

    setMaterial(material: Material): void {
        this.material = material;
    }

    protected _onSizeChanged(oldValue: number, newValue: number): void {
        this.dirtyGeometry();
        this.dirtyMaterial();
    }

    protected _onMaterialChanged(oldValue: Material, newValue: Material): void {
        this._materialSignalHook.unlistenAll();
        this.dirtyMaterial();
        if (newValue) {
            this._materialSignalHook.listen(newValue.signalDirty, this.dirtyMaterial);
        }
    }

    getPaths(): unknown[] {
        return [];
    }

    getWholePaths(): unknown[] {
        return this.getPaths();
    }

    getIO(): Molding_IO {
        return Molding_IO.instance() as Molding_IO;
    }

    refreshBoundInternal(): void {
        // Implementation placeholder
    }

    protected _copyFrom(source: Molding): void {
        this.initByMeta(source.metadata);
        if (source.material) {
            this.material = source.material.clone();
        }
        this.__XSize = source.XSize;
        this.__YSize = source.YSize;
    }

    isSameMolding(other: Molding): boolean {
        if (!other || this.seekId !== other.seekId) {
            return false;
        }

        const thisMaterial = this.material;
        const otherMaterial = other.material;

        const getMaterialSeekId = (material?: Material): string => {
            return material ? material.seekId : "";
        };

        return (
            getMaterialSeekId(thisMaterial) === getMaterialSeekId(otherMaterial) &&
            thisMaterial?.rotation === otherMaterial?.rotation &&
            nearlyEquals(this.XSize, other.XSize) &&
            nearlyEquals(this.YSize, other.YSize)
        );
    }

    verify(): boolean {
        return !!this.metadata && super.verify();
    }

    destroy(): void {
        if (!this._disposed) {
            this._materialSignalHook.dispose();
            (this._materialSignalHook as unknown) = undefined;
            super.destroy();
        }
    }

    canSelect(): boolean {
        return (
            this.isFlagOff(HSCore.Model.EntityFlagEnum.removed) &&
            this.isFlagOff(HSCore.Model.EntityFlagEnum.unselectable)
        );
    }
}

Entity.registerClass(HSConstants.ModelClass.NgMolding, Molding);