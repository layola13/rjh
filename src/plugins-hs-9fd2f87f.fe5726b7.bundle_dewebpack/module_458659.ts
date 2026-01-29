enum ContentTypeEnum {
  NewDIYCustomizedFeaturewall = "NewDIYCustomizedFeaturewall",
  NewDIYCustomizedCeiling = "NewDIYCustomizedCeiling"
}

interface ContextMenuItem {
  id: string;
  name: string;
  icon: string;
  onclick: (element: MetaElement, additionalParam?: MetaElement) => void;
}

interface ContextMenu {
  name: string;
  items: ContextMenuItem[];
}

interface ModelInfo {
  unit?: string;
  XLength: number;
  YLength: number;
  ZLength: number;
}

interface Dimensions {
  XLength: number;
  YLength: number;
  ZLength: number;
}

interface MaterialMap {
  [key: string]: unknown;
}

interface UserFreeData {
  modelInfo?: ModelInfo;
  model3d?: string;
  materialMap?: MaterialMap;
  parameters?: Record<string, unknown>;
}

interface ContentType {
  isTypeOf: (types: ContentTypeEnum[]) => boolean;
}

interface MetaElement {
  contentType: ContentType;
  contextmenu?: ContextMenu;
  userFreeData?: UserFreeData;
  customizedProductUrl?: string;
  unit?: string;
  XLength?: number;
  YLength?: number;
  ZLength?: number;
  webCADDocument?: string;
  materialMap?: MaterialMap;
  parameters?: Record<string, unknown>;
  isScalable?: boolean;
}

interface CatalogNode {
  isUserUpload: boolean;
}

declare const ResourceManager: {
  getString: (key: string) => string;
};

declare const NSMeta: {
  action: {
    edit: (element: MetaElement, param: MetaElement) => void;
    delete: (element: MetaElement, contentType: ContentType) => void;
  };
};

declare const HSCatalog: {
  ContentTypeEnum: typeof ContentTypeEnum;
  Util: {
    getAttribute: (node: CatalogNode, attributeName: string) => string[] | undefined;
  };
};

declare const HSCore: {
  Util: {
    Unit: {
      ConvertToMeter: (unit: string, value: number) => number;
    };
  };
  Model: {
    CustomizedModel: {
      migrateMetaMaterialMap: (element: MetaElement) => void;
    };
  };
};

const CUSTOMIZED_CONTENT_TYPES: ContentTypeEnum[] = [
  HSCatalog.ContentTypeEnum.NewDIYCustomizedFeaturewall,
  HSCatalog.ContentTypeEnum.NewDIYCustomizedCeiling
];

export function metaMiniProcess(element: MetaElement, node: CatalogNode): void {
  if (!element.contentType.isTypeOf(CUSTOMIZED_CONTENT_TYPES)) return;
  if (!node.isUserUpload) return;

  const editLabel = ResourceManager.getString("catalog_menu_edit");
  const renameLabel = ResourceManager.getString("catalog_menu_rename");
  const deleteLabel = ResourceManager.getString("catalog_menu_delete");

  element.contextmenu = {
    name: editLabel,
    items: [
      {
        id: "rename",
        name: renameLabel,
        icon: "res/svgs/tiles_modify.svg",
        onclick: (el: MetaElement, param: MetaElement) => {
          NSMeta.action.edit(el, param);
        }
      },
      {
        id: "delete",
        name: deleteLabel,
        icon: "res/svgs/tiles_delete.svg",
        onclick: (el: MetaElement) => {
          NSMeta.action.delete(el, element.contentType);
        }
      }
    ]
  };
}

export function metaProcess(element: MetaElement, node: CatalogNode): MetaElement {
  if (!element.contentType.isTypeOf(CUSTOMIZED_CONTENT_TYPES)) return element;

  const userFreeData = element.userFreeData;
  delete element.userFreeData;

  const customizedProductTagUrl = HSCatalog.Util.getAttribute(node, "CustomizedProductTagUrl");

  if (customizedProductTagUrl?.length === 1) {
    element.customizedProductUrl = customizedProductTagUrl[0];
  } else if (userFreeData?.modelInfo && userFreeData.model3d) {
    const modelInfo = userFreeData.modelInfo;
    element.unit = modelInfo.unit ?? "m";

    const dimensions: Dimensions = {
      XLength: HSCore.Util.Unit.ConvertToMeter(element.unit, modelInfo.XLength),
      YLength: HSCore.Util.Unit.ConvertToMeter(element.unit, modelInfo.YLength),
      ZLength: HSCore.Util.Unit.ConvertToMeter(element.unit, modelInfo.ZLength)
    };

    Object.assign(element, dimensions);
    element.webCADDocument = userFreeData.model3d;

    if (userFreeData.materialMap) {
      element.materialMap = userFreeData.materialMap;
      HSCore.Model.CustomizedModel.migrateMetaMaterialMap(element);
    }
  } else if (userFreeData?.parameters) {
    element.parameters = userFreeData.parameters;
  }

  element.isScalable = true;

  const editLabel = ResourceManager.getString("catalog_menu_edit");
  const deleteLabel = ResourceManager.getString("catalog_menu_delete");

  if (node.isUserUpload) {
    element.contextmenu = {
      name: editLabel,
      items: [
        {
          id: "delete",
          name: deleteLabel,
          icon: "res/svgs/tiles_delete.svg",
          onclick: (el: MetaElement) => {
            NSMeta.action.delete(el, element.contentType);
          }
        }
      ]
    };
  }

  return element;
}