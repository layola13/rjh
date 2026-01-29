interface FavFolderParams {
  type: number;
  pageNum: number;
  pageSize: number;
  sourceId?: string;
  whetherDefault: number;
  scopeId?: string;
}

interface FavFolderItem {
  name: string;
  favoritesId?: string;
  [key: string]: unknown;
}

interface FavFoldersResponse {
  items: FavFolderItem[];
  total: number;
}

interface MtopResponse<T> {
  ret: string[];
  data: T;
}

const DEFAULT_PAGE_SIZE = 1000;
const DEFAULT_WHETHER_DEFAULT = 3;
const FAVORITE_TYPE_GROUP = 2;
const FAVORITE_TYPE_TOPIC = 4;
const IMAGE_EXTENSIONS_REGEX = /\.(gif|jpg|jpeg|png|svg|SVG|GIF|JPG|PNG)$/;
const TPZZ_ENVIRONMENT_ID = "tpzz";

const FavoriteUtil = {
  signalHiddenGroupPanel: new HSCore.Util.Signal(this),
  signalAddGroup: new HSCore.Util.Signal(this),

  parseURL(url: string): string {
    let result = `res/${url}`;
    if (IMAGE_EXTENSIONS_REGEX.test(url)) {
      result = `res/img/${url}`;
    }
    return ResourceManager.parseURL(result, "./plugin/favorite/");
  },

  getEACustomScopeId(): string {
    let scopeId = "";
    const activeEnvironmentId = HSApp.App.getApp().environmentManager.activeEnvironmentId;
    
    if (activeEnvironmentId === TPZZ_ENVIRONMENT_ID) {
      const plugin = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.CustomizedProducts);
      scopeId = plugin?.getLibraryId() ?? "";
    }
    
    return scopeId;
  },

  getLimitedFavFolders(
    type: number,
    pageNum: number,
    pageSize: number,
    sourceId?: string
  ): Promise<FavFoldersResponse> {
    const scopeId = this.getEACustomScopeId();
    let params: FavFolderParams = {
      type,
      pageNum,
      pageSize,
      sourceId,
      whetherDefault: DEFAULT_WHETHER_DEFAULT
    };

    if (scopeId) {
      params = { ...params, scopeId };
    }

    return NWTK.mtop.Catalog.getFavFolders({ data: params })
      .then((response: MtopResponse<FavFoldersResponse>) => {
        const data = response.data;
        if (response?.ret[0]?.includes("SUCCESS") && data?.items && data?.total) {
          return data;
        }
        return Promise.reject(data);
      })
      .catch((error: unknown) => Promise.reject(error));
  },

  async requestAllGroupItems(sourceId?: string): Promise<FavFolderItem[]> {
    const pageSize = DEFAULT_PAGE_SIZE;
    const firstPage = await this.getLimitedFavFolders(FAVORITE_TYPE_GROUP, 1, pageSize, sourceId);
    
    let allItems = firstPage.items;
    const total = firstPage.total;

    if (total > pageSize) {
      const totalPages = Math.ceil(total / pageSize);
      
      for (let currentPage = 2; currentPage <= totalPages; currentPage++) {
        try {
          const pageData = await this.getLimitedFavFolders(FAVORITE_TYPE_GROUP, currentPage, pageSize);
          allItems = allItems.concat(pageData.items);
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }

    return allItems;
  },

  addGroupItem(name: string): Promise<unknown> {
    return NWTK.mtop.Catalog.addFavFolder({
      data: {
        name,
        type: FAVORITE_TYPE_GROUP
      }
    })
      .then((response: MtopResponse<unknown>) => {
        const data = response.data;
        if (response?.ret[0]?.includes("SUCCESS") && data) {
          return data;
        }
        return Promise.reject(data);
      })
      .catch((error: unknown) => Promise.reject(error));
  },

  deleteGroup(favoritesId: string): Promise<unknown> {
    return NWTK.mtop.Catalog.deleteFavFolder({
      data: { favoritesId }
    })
      .then((response: MtopResponse<unknown>) => {
        const data = response.data;
        if (response?.ret[0]?.includes("SUCCESS") && data) {
          return data;
        }
        return Promise.reject(data);
      })
      .catch((error: unknown) => Promise.reject(error));
  },

  updateGroup(favoritesId: string, name: string): Promise<unknown> {
    return NWTK.mtop.Catalog.updateFavFolder({
      data: {
        favoritesId,
        name
      }
    })
      .then((response: MtopResponse<unknown>) => {
        const data = response.data;
        if (response?.ret[0]?.includes("SUCCESS") && data) {
          return data;
        }
        return Promise.reject(data);
      })
      .catch((error: unknown) => Promise.reject(error));
  },

  isDuplicateInName(items: FavFolderItem[], targetName: string, excludeName?: string): boolean {
    return items.some((item) => {
      const itemName = item.name;
      const allGroupName = ResourceManager.getString("favorite_all_group");
      return (targetName === itemName || targetName === allGroupName) && targetName !== excludeName;
    });
  },

  addFavoriteTopic(sourceId: string): Promise<Record<string, unknown>> {
    return NWTK.mtop.Catalog.addFavoriteTopic({
      data: {
        sourceId,
        favoritesType: FAVORITE_TYPE_TOPIC
      }
    })
      .then((response: MtopResponse<unknown>) => {
        const data = response.data;
        if (response?.ret[0]?.includes("SUCCESS") && data) {
          return (data as Record<string, unknown>) || {};
        }
        return Promise.reject();
      })
      .catch((error: unknown) => Promise.reject(error));
  },

  dataURLtoFile(dataURL: string, filename: string = "file"): File {
    const parts = dataURL.split(", ");
    const mimeMatch = parts[0].match(/:(.*?);/);
    
    if (!mimeMatch) {
      throw new Error("Invalid data URL format");
    }

    const mimeType = mimeMatch[1];
    const extension = mimeType.split("/")[1];
    const base64Data = atob(parts[1]);
    const dataLength = base64Data.length;
    const uint8Array = new Uint8Array(dataLength);

    for (let i = 0; i < dataLength; i++) {
      uint8Array[i] = base64Data.charCodeAt(i);
    }

    return new File([uint8Array], `${filename}.${extension}`, { type: mimeType });
  }
};

export default FavoriteUtil;