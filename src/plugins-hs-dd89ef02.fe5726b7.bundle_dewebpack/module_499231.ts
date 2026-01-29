export async function loadJSON(data: UniversalDesignData, furnishingData?: FurnishingData): Promise<void> {
    await loadUniversalDesignJson(data, furnishingData);
    
    if (!furnishingData) {
        return;
    }
    
    const extensionData: ExtensionData = {
        customData: {
            furnishingData
        }
    };
    
    const app = HSApp.App.getApp();
    const persistencePlugin = app?.pluginManager?.getPlugin("hsw.plugin.persistence.Plugin") as PersistencePlugin | undefined;
    
    await persistencePlugin?.openDumpServicesData?.call(persistencePlugin, {
        ext: extensionData
    });
}

export async function loadDesignData(data: UniversalDesignData, extensionData?: ExtensionData): Promise<void> {
    if (extensionData) {
        const app = HSApp.App.getApp();
        const persistencePlugin = app?.pluginManager?.getPlugin("hsw.plugin.persistence.Plugin") as PersistencePlugin | undefined;
        
        await persistencePlugin?.dumpServicesBeforeOpenDocument?.call(persistencePlugin, {
            ext: extensionData
        });
    }
    
    await loadUniversalDesignJson(data, undefined);
    
    if (extensionData) {
        const app = HSApp.App.getApp();
        const persistencePlugin = app?.pluginManager?.getPlugin("hsw.plugin.persistence.Plugin") as PersistencePlugin | undefined;
        
        await persistencePlugin?.openDumpServicesData?.call(persistencePlugin, {
            ext: extensionData
        });
    }
}

export async function loadUniversalDesignJson(data: UniversalDesignData, furnishingData?: FurnishingData): Promise<void> {
    const app = HSApp.App.getApp();
    const meta = data.meta;
    
    if (furnishingData) {
        const extensionData: ExtensionData = {
            customData: {
                furnishingData
            }
        };
        
        const persistencePlugin = app?.pluginManager?.getPlugin("hsw.plugin.persistence.Plugin") as PersistencePlugin | undefined;
        
        await persistencePlugin?.dumpServicesBeforeOpenDocument?.call(persistencePlugin, {
            ext: extensionData
        });
    }
    
    if (!meta) {
        await app.openDocument(data);
        return;
    }
    
    const magic = meta.magic;
    
    const MAGIC_LEGACY = "3614ec83716a";
    const MAGIC_CABINET = "cabinetteamrocks";
    const MAGIC_CABINET_NB = "cabinetteamnb";
    
    if (magic === MAGIC_LEGACY) {
        const migrationPlugin = app.pluginManager.getPlugin("hsw.plugin.migrationService.Plugin") as MigrationPlugin | undefined;
        
        if (migrationPlugin) {
            app.createEmptyFloorplan();
            migrationPlugin.migrateToV2(data).then(async (migratedData?: UniversalDesignData) => {
                if (migratedData) {
                    await app.openDocument(migratedData);
                }
            });
        }
    } else if (magic === HSCore.Doc.FloorplanMeta.magic) {
        await app.openDocument(data);
    } else if (magic === MAGIC_CABINET) {
        loadCabinetDesign(data);
    } else if (magic === MAGIC_CABINET_NB) {
        loadCabinetNBDesign(data);
    } else {
        loadAssemblyDesign(data);
    }
}

function loadAssemblyDesign(data: AssemblyDesignData): void {
    const app = HSApp.App.getApp();
    const { cmdManager, catalogManager } = app;
    
    const CM_TO_METER = 0.01;
    
    const productData: ProductData = {
        id: "local",
        unit: "cm",
        productType: HSCatalog.ProductTypeEnum.Assembly,
        contentType: new HSCatalog.ContentType(),
        XLength: data.boundingBox.xLen,
        YLength: data.boundingBox.yLen,
        ZLength: data.boundingBox.zLen,
        products: data.Products.map((product: Product) => {
            product.position.x *= CM_TO_METER;
            product.position.y *= CM_TO_METER;
            product.position.z *= CM_TO_METER;
            return product;
        })
    };
    
    const productIds = productData.products.map((product: Product) => product.id);
    
    catalogManager.getProductsBySeekIds(productIds).then((productDataById: ProductDataMap) => {
        productData.productDataById = productDataById;
        const command = cmdManager.createCommand(HSFPConstants.CommandType.AddProduct, [productData]);
        cmdManager.execute(command);
    });
}

function loadCabinetDesign(data: CabinetDesignData): void {
    const productData: ProductData = {
        id: "local",
        unit: "cm",
        productType: HSCatalog.ProductTypeEnum.PAssembly,
        contentType: new HSCatalog.ContentType(data.meta.contentType),
        XLength: 2,
        YLength: 2,
        ZLength: 2,
        userFreeData: data
    };
    
    let seekIds = data.children
        .filter((child: ModelChild) => child.type === HSCore.Model.PModelTypes.eContent)
        .map((child: ModelChild) => child.seekId);
    
    seekIds = seekIds.concat(data.resources);
    
    const app = HSApp.App.getApp();
    const { cmdManager, catalogManager } = app;
    
    catalogManager.getProductsBySeekIds(seekIds).then((productDataById: ProductDataMap) => {
        productData.productDataById = productDataById;
        const command = cmdManager.createCommand(HSFPConstants.CommandType.AddProduct, [productData]);
        cmdManager.execute(command);
    });
}

function loadCabinetNBDesign(data: CabinetNBDesignData): void {
    const productData: ProductData = {
        id: "local",
        unit: "cm",
        productType: HSCatalog.ProductTypeEnum.PAssemblyPackage,
        contentType: new HSCatalog.ContentType(data.meta.contentType),
        XLength: 2,
        YLength: 2,
        ZLength: 2,
        userFreeData: data
    };
    
    let seekIds: string[] = [];
    
    data.assemblies.forEach((assembly: Assembly) => {
        const json = assembly.json;
        
        assembly.defaultValues?.forEach((defaultValue: DefaultValue) => {
            if (defaultValue.material) {
                seekIds.push(defaultValue.material);
            }
        });
        
        const contentSeekIds = json.children
            .filter((child: ModelChild) => child.type === HSCore.Model.PModelTypes.eContent)
            .map((child: ModelChild) => child.seekId);
        
        seekIds = seekIds.concat(contentSeekIds);
        seekIds = seekIds.concat(json.resources);
    });
    
    const app = HSApp.App.getApp();
    const { cmdManager, catalogManager } = app;
    
    catalogManager.getProductsBySeekIds(seekIds).then((productDataById: ProductDataMap) => {
        productData.productDataById = productDataById;
        const command = cmdManager.createCommand(HSFPConstants.CommandType.AddProduct, [productData]);
        cmdManager.execute(command);
    });
}

// Type definitions
interface Position {
    x: number;
    y: number;
    z: number;
}

interface BoundingBox {
    xLen: number;
    yLen: number;
    zLen: number;
}

interface Product {
    id: string;
    position: Position;
}

interface ModelChild {
    type: string;
    seekId: string;
}

interface DefaultValue {
    material?: string;
}

interface Assembly {
    json: {
        children: ModelChild[];
        resources: string[];
    };
    defaultValues?: DefaultValue[];
}

interface DesignMeta {
    magic: string;
    contentType?: string;
}

interface UniversalDesignData {
    meta: DesignMeta;
}

interface AssemblyDesignData extends UniversalDesignData {
    boundingBox: BoundingBox;
    Products: Product[];
}

interface CabinetDesignData extends UniversalDesignData {
    children: ModelChild[];
    resources: string[];
}

interface CabinetNBDesignData extends UniversalDesignData {
    assemblies: Assembly[];
}

interface ProductData {
    id: string;
    unit: string;
    productType: string;
    contentType: HSCatalog.ContentType;
    XLength: number;
    YLength: number;
    ZLength: number;
    products?: Product[];
    userFreeData?: unknown;
    productDataById?: ProductDataMap;
}

interface ProductDataMap {
    [key: string]: unknown;
}

interface FurnishingData {
    [key: string]: unknown;
}

interface ExtensionData {
    customData: {
        furnishingData: FurnishingData;
    };
}

interface PersistencePlugin {
    openDumpServicesData?(params: { ext: ExtensionData }): Promise<void>;
    dumpServicesBeforeOpenDocument?(params: { ext: ExtensionData }): Promise<void>;
}

interface MigrationPlugin {
    migrateToV2(data: UniversalDesignData): Promise<UniversalDesignData | undefined>;
}