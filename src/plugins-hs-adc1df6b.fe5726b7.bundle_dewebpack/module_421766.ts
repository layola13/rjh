interface RoofConfig {
  order: number;
  isDefault?: boolean;
}

interface RoofConfigMap {
  [key: string]: RoofConfig;
}

interface RoofMeta {
  meta: CatalogItem;
  roofType: string;
  isRectMainPart: boolean;
  isNotSupprtArc: boolean;
  isConvexPoly: boolean;
  order?: number;
}

interface CatalogItem {
  id: string;
  userFreeData: {
    parametricMeta: string;
  };
}

interface ParametricMeta {
  roofType: string;
  isRectMainPart?: boolean;
  isNotSupprtArc?: boolean;
  isConvexPoly?: boolean;
  doc: string;
}

const ROOF_CONFIG_MAP: RoofConfigMap = {
  flatParamRoof: {
    order: 1,
    isDefault: true
  },
  shedParamRoof: {
    order: 2
  },
  gableParamRoof: {
    order: 3
  },
  hipParamRoof: {
    order: 4
  },
  saltBoxParamRoof: {
    order: 5
  },
  boxGableParamRoof: {
    order: 6
  },
  pyramidParamRoof: {
    order: 7
  }
};

class RoofMetaManager {
  defaultRoofMeta?: RoofMeta;
  roofMetaList: RoofMeta[] = [];
  private _retryTime: number = 0;

  init(): void {
    if (!this.defaultRoofMeta) {
      this._preload();
    }
  }

  private async _preload(): Promise<void> {
    try {
      const catalogItems = await HSApp.App.getApp().catalogManager.getDefaultItem();
      
      const roofKeys = Object.keys(catalogItems).filter(key => !!ROOF_CONFIG_MAP[key]);
      
      for (const key of roofKeys) {
        const catalogItem: CatalogItem = catalogItems[key];
        const parametricMetaStr = catalogItem.userFreeData.parametricMeta;
        const parametricMeta: ParametricMeta = JSON.parse(parametricMetaStr);
        
        const roofType = parametricMeta.roofType;
        const isRectMainPart = !!parametricMeta.isRectMainPart;
        const isNotSupprtArc = !!parametricMeta.isNotSupprtArc;
        const isConvexPoly = !!parametricMeta.isConvexPoly;
        const doc = JSON.parse(parametricMeta.doc);
        
        await HSApp.Util.NCustomizedFeatureModel.loadMetaRecursively(doc);
        
        const config = ROOF_CONFIG_MAP[key];
        const roofMeta: RoofMeta = {
          meta: catalogItem,
          roofType,
          isRectMainPart,
          isNotSupprtArc,
          isConvexPoly,
          order: config?.order
        };
        
        if (config?.isDefault) {
          this.defaultRoofMeta = roofMeta;
        }
        
        const exists = this.roofMetaList.find(item => item.meta.id === catalogItem.id);
        if (!exists) {
          this.roofMetaList.push(roofMeta);
          this.roofMetaList.sort((a, b) => {
            if (a.order === undefined) return -1;
            if (b.order === undefined) return 1;
            return a.order - b.order;
          });
        }
      }
    } catch (error) {
      if (this._retryTime < 3) {
        this._retryTime++;
        this.init();
      }
    }
  }
}

const roofMetaManager = new RoofMetaManager();

export default roofMetaManager;