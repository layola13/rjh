interface BoundingBox {
  xLen: number;
  yLen: number;
  zLen: number;
}

interface Product {
  id: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  seekId?: string;
}

interface AssemblyData {
  boundingBox: BoundingBox;
  Products: Product[];
}

interface PModelChild {
  type: string;
  seekId: string;
}

interface PAssemblyMeta {
  contentType: string;
}

interface PAssemblyData {
  meta: PAssemblyMeta;
  children: PModelChild[];
  resources: string[];
}

interface DefaultValue {
  material?: string;
}

interface AssemblyItem {
  json: PAssemblyData;
  defaultValues?: DefaultValue[];
}

interface PAssemblyPackageData {
  meta: PAssemblyMeta;
  assemblies: AssemblyItem[];
}

interface ProductConfig {
  id: string;
  unit: string;
  productType: string;
  contentType: any;
  XLength: number;
  YLength: number;
  ZLength: number;
  products?: Product[];
  productDataById?: any;
  userFreeData?: any;
}

interface DocumentMeta {
  version?: string;
  magic?: string;
  contentType?: string;
}

interface DocumentData {
  meta?: DocumentMeta;
  [key: string]: any;
}

const PASSEMBLY_MAGIC = "cabinetteamrocks";
const PASSEMBLY_PACKAGE_MAGIC = "cabinetteamnb";

export default class DragDropHandler {
  constructor() {
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  /**
   * Import assembly data into the application
   */
  importAssembly(assemblyData: AssemblyData): void {
    const app = HSApp.App.getApp();
    const { cmdManager, catalogManager } = app;

    const productConfig: ProductConfig = {
      id: "local",
      unit: "cm",
      productType: HSCatalog.ProductTypeEnum.Assembly,
      contentType: new HSCatalog.ContentType(),
      XLength: assemblyData.boundingBox.xLen,
      YLength: assemblyData.boundingBox.yLen,
      ZLength: assemblyData.boundingBox.zLen,
      products: assemblyData.Products.map((product) => {
        product.position.x *= 0.01;
        product.position.y *= 0.01;
        product.position.z *= 0.01;
        return product;
      })
    };

    const productIds = productConfig.products!.map((product) => product.id);

    catalogManager.getProductsBySeekIds(productIds).then((productData: any) => {
      productConfig.productDataById = productData;
      const command = cmdManager.createCommand(HSFPConstants.CommandType.AddProduct, [productConfig]);
      cmdManager.execute(command);
    });
  }

  /**
   * Import PAssembly data into the application
   */
  importPAssembly(passemblyData: PAssemblyData): void {
    const productConfig: ProductConfig = {
      id: "local",
      unit: "cm",
      productType: HSCatalog.ProductTypeEnum.PAssembly,
      contentType: new HSCatalog.ContentType(passemblyData.meta.contentType),
      XLength: 2,
      YLength: 2,
      ZLength: 2,
      userFreeData: passemblyData
    };

    let seekIds = passemblyData.children
      .filter((child) => child.type === HSCore.Model.PModelTypes.eContent)
      .map((child) => child.seekId);
    
    seekIds = seekIds.concat(passemblyData.resources);

    const app = HSApp.App.getApp();
    const { cmdManager, catalogManager } = app;

    catalogManager.getProductsBySeekIds(seekIds).then((productData: any) => {
      productConfig.productDataById = productData;
      const command = cmdManager.createCommand(HSFPConstants.CommandType.AddProduct, [productConfig]);
      cmdManager.execute(command);
    });
  }

  /**
   * Import PAssembly package data into the application
   */
  importPAssemblyPackage(packageData: PAssemblyPackageData): void {
    const productConfig: ProductConfig = {
      id: "local",
      unit: "cm",
      productType: HSCatalog.ProductTypeEnum.PAssemblyPackage,
      contentType: new HSCatalog.ContentType(packageData.meta.contentType),
      XLength: 2,
      YLength: 2,
      ZLength: 2,
      userFreeData: packageData
    };

    let seekIds: string[] = [];

    packageData.assemblies.forEach((assembly) => {
      const json = assembly.json;
      
      if (assembly.defaultValues) {
        assembly.defaultValues.forEach((defaultValue) => {
          if (defaultValue.material) {
            seekIds.push(defaultValue.material);
          }
        });
      }

      seekIds.concat(
        json.children
          .filter((child) => child.type === HSCore.Model.PModelTypes.eContent)
          .map((child) => child.seekId)
      );
      
      seekIds = seekIds.concat(json.resources);
    });

    const app = HSApp.App.getApp();
    const { cmdManager, catalogManager } = app;

    catalogManager.getProductsBySeekIds(seekIds).then((productData: any) => {
      productConfig.productDataById = productData;
      const command = cmdManager.createCommand(HSFPConstants.CommandType.AddProduct, [productConfig]);
      cmdManager.execute(command);
    });
  }

  /**
   * Load and parse JSON file
   */
  loadJSON(file: File): void {
    const reader = new FileReader();
    
    reader.onload = async (event: ProgressEvent<FileReader>) => {
      try {
        const result = event.target?.result as string;
        const documentData: DocumentData = JSON.parse(result);
        const app = HSApp.App.getApp();
        const meta = documentData.meta;

        if (!meta) {
          await app.openDocument(documentData);
          return;
        }

        if (meta.version === "0.50") {
          meta.version = "1.0";
          meta.magic = "u6tklt3u60yg";
        }

        const magic = meta.magic;

        if (magic === "3614ec83716a") {
          const migrationPlugin = app.pluginManager.getPlugin("hsw.plugin.migrationService.Plugin");
          if (migrationPlugin) {
            app.createEmptyFloorplan();
            migrationPlugin.migrateToV2(documentData).then(async (migratedData: any) => {
              if (migratedData) {
                await app.openDocument(migratedData);
              }
            });
          }
        } else if (magic === HSCore.Doc.FloorplanMeta.magic || magic === "61cd47b78148") {
          app.pluginManager.getPlugin(HSFPConstants.PluginType.Persistence).OpenDesignHandler.emptyUrlPath();
          await app.openDocument(documentData);
        } else if (magic === PASSEMBLY_MAGIC) {
          this.importPAssembly(documentData as PAssemblyData);
        } else if (magic === PASSEMBLY_PACKAGE_MAGIC) {
          this.importPAssemblyPackage(documentData as PAssemblyPackageData);
        } else {
          this.importAssembly(documentData as AssemblyData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    reader.readAsText(file);
  }

  /**
   * Register drag and drop event listeners
   */
  register(): void {
    const body = document.body;
    body.addEventListener("dragover", this.onDragOver);
    body.addEventListener("dragleave", this.onDragLeave);
    body.addEventListener("drop", this.onDrop, false);
  }

  /**
   * Unregister drag and drop event listeners
   */
  unregister(): void {
    const body = document.body;
    body.removeEventListener("dragover", this.onDragOver);
    body.removeEventListener("dragleave", this.onDragLeave);
    body.removeEventListener("drop", this.onDrop, false);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    const files = event.dataTransfer?.files;
    const file = files?.[0];
    
    if (file) {
      event.preventDefault();
      this.loadJSON(file);
    }
  }
}