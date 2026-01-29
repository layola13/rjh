import { useState, useEffect } from 'react';
import { DraggableModal, MenuItem, Menu, Icons } from './UIComponents';

interface ProcessFilters {
  (data: unknown): unknown;
}

interface BuildProduct {
  (data: unknown): unknown;
}

interface ProductItem {
  uuid: string;
  id: string;
  [key: string]: unknown;
}

interface ProductListState {
  items: ProductItem[];
}

interface ProductQueryParams {
  modelIdList: string[];
  limit?: number;
}

interface MaterialPickUpPageProps {
  data: Array<[string, string[]]>;
  title?: string;
  name?: string;
  area?: string;
  copyright?: string;
  coverImage?: string;
  isWholeHouse?: boolean;
  hideDesignInfo?: boolean;
  buildProduct: BuildProduct;
  processFilters: ProcessFilters;
}

interface LayoutManager {
  register(name: string, element: Element | null, flag: boolean, config: LayoutConfig): void;
  activeModal(name: string): void;
  deactiveModal(name: string, data?: unknown): void;
}

interface LayoutConfig {
  type: string;
  component: unknown;
}

interface PluginManager {
  getPlugin(type: string): CatalogPlugin;
}

interface CatalogPlugin {
  BaseApiManager: {
    dataManager: {
      getContentsInfoByIds(ids: string[]): Promise<unknown>;
    };
  };
}

interface HSCatalogLib {
  ProductDatabase: {
    getProducts(
      params: ProductQueryParams,
      fetchContent: (ids: string[]) => Promise<unknown>,
      buildProduct: BuildProduct,
      processFilters: ProcessFilters
    ): Promise<ProductListState>;
  };
  ProductItemContainer: React.ComponentType<{
    key: string;
    item: ProductItem;
    trackUseModel: () => void;
  }>;
}

interface AppInstance {
  layoutMgr: LayoutManager;
  pluginManager: PluginManager;
}

interface EventTracker {
  track(group: string, eventName: string, data: Record<string, unknown>): void;
  instance(): EventTracker;
}

interface DragEvent {
  [key: string]: unknown;
}

interface DraggableModalProps {
  ref: (ref: unknown) => void;
  style: React.CSSProperties;
  initialWidth: number;
  initialHeight: number;
  className: string;
  draggable: {
    onStart: () => void;
    onStop: (event: DragEvent, data: unknown) => void;
  };
  titleSetting: {
    title: string;
    enableCloseBtn: boolean;
    customizedTitleContent: string;
  };
  enableXScroll: boolean;
  enableYScroll: boolean;
  setClickModalZIndex: (active: boolean) => void;
  children: React.ReactNode;
}

declare const HSApp: {
  Catalog: {
    Manager: {
      getHSCatalogLib(): HSCatalogLib;
    };
  };
  App: {
    getApp(): AppInstance;
  };
  Util: {
    EventTrack: EventTracker;
    EventGroupEnum: {
      Catalog: string;
    };
  };
};

declare const HSFPConstants: {
  PluginType: {
    Catalog: string;
  };
};

declare const ResourceManager: {
  getString(key: string): string;
};

const MODAL_NAME = 'MaterialPickUpPage';
const MODAL_Z_INDEX = 110;
const MODAL_TOP_POSITION = 101;
const MODAL_LEFT_POSITION = 110;
const INITIAL_MODAL_WIDTH = 280;

const MaterialPickUpPage: React.FC<MaterialPickUpPageProps> = (props) => {
  let modalRef: unknown = null;

  const catalogLib = HSApp.Catalog.Manager.getHSCatalogLib();
  const app = HSApp.App.getApp();
  const { buildProduct, processFilters } = props;

  const [selectedRoomIndex, setSelectedRoomIndex] = useState<number>(0);

  const defaultQueryParams: ProductQueryParams = {
    modelIdList: [],
  };

  const [productList, setProductList] = useState<ProductListState>({
    items: [],
  });

  const { items: products } = productList;

  useEffect(() => {
    const containerElement = document.querySelector('.hsc-material-pick-up-page-wrapper');
    app.layoutMgr.register(MODAL_NAME, containerElement, false, {
      type: 'modal',
      component: modalRef,
    });
  }, []);

  useEffect(() => {
    if (props.data.length > 0) {
      const initialModelIdList = props.data[0][1];
      fetchProducts({
        ...defaultQueryParams,
        modelIdList: initialModelIdList,
      }).then((result) => {
        setProductList({
          items: result.items,
        });
      });
      setSelectedRoomIndex(0);
    }
  }, [props.data]);

  const getContentsInfoByIds = (ids: string[]): Promise<unknown> => {
    return app.pluginManager
      .getPlugin(HSFPConstants.PluginType.Catalog)
      .BaseApiManager.dataManager.getContentsInfoByIds(ids);
  };

  const fetchProducts = (params: ProductQueryParams): Promise<ProductListState> => {
    const queryParams = { ...defaultQueryParams, ...params };
    queryParams.limit = queryParams.modelIdList.length;
    return catalogLib.ProductDatabase.getProducts(
      queryParams,
      getContentsInfoByIds,
      buildProduct,
      processFilters
    );
  };

  const modalConfig: DraggableModalProps = {
    ref: (ref) => (modalRef = ref),
    style: {
      zIndex: MODAL_Z_INDEX,
      top: MODAL_TOP_POSITION,
      left: MODAL_LEFT_POSITION,
    },
    initialWidth: INITIAL_MODAL_WIDTH,
    initialHeight: document.documentElement.clientHeight - 52,
    className: 'hsc-material-pick-up-page-wrapper',
    draggable: {
      onStart: () => {
        app.layoutMgr.activeModal(MODAL_NAME);
      },
      onStop: (event: DragEvent, data: unknown) => {
        app.layoutMgr.deactiveModal(MODAL_NAME, data);
      },
    },
    titleSetting: {
      title: props.title ?? ResourceManager.getString('auto_styler_material_pick_up'),
      enableCloseBtn: true,
      customizedTitleContent: '',
    },
    enableXScroll: false,
    enableYScroll: false,
    setClickModalZIndex: (shouldActivate: boolean) => {
      if (shouldActivate) {
        app.layoutMgr.activeModal(MODAL_NAME);
      }
    },
    children: null,
  };

  const designTypeLabel = props.isWholeHouse
    ? `(${ResourceManager.getString('catalog_product_item_wholehouse_name')})`
    : `(${ResourceManager.getString('catalog_product_item_single_house_name')})`;

  const designNameClassName = props.isWholeHouse
    ? 'design-name'
    : 'design-name design-name-max-3-chinese-words';

  const eventTracker = HSApp.Util.EventTrack.instance();

  const trackModelUsage = (item: ProductItem): void => {
    eventTracker.track(HSApp.Util.EventGroupEnum.Catalog, 'catalog_use_material_pick_up_model_event', {
      sModelID: item.id,
    });
  };

  const renderRoomSelector = (): React.ReactNode => {
    const roomData = props.data;
    const roomCount = roomData.length;

    if (roomCount === 0) {
      return null;
    }

    if (roomCount === 1) {
      return <div className="room-type">{roomData[0][0]}</div>;
    }

    const menuItems = roomData.map((room, index) => (
      <MenuItem
        key={index}
        onClick={() => {
          if (index !== selectedRoomIndex) {
            fetchProducts({
              modelIdList: room[1],
            }).then((result) => {
              setSelectedRoomIndex(index);
              setProductList({
                items: result.items,
              });
            });
          }
        }}
      >
        {room[0]}
      </MenuItem>
    ));

    const currentRoomName =
      (roomData[selectedRoomIndex]?.[0]) ?? ResourceManager.getString('auto_styler_all');

    return (
      <Menu
        key="1"
        subItems={menuItems}
        trigger="click"
        placement="bottomRight"
        className="room-type-menu"
        popupOffset={{ left: 18 }}
      >
        <div className="room-type-menu-container">
          <span className="text">{currentRoomName}</span>
          <Icons
            className="icon arrow-icon"
            type="hs_xiao_danjiantou_xia"
            style={{ fontSize: '12px' }}
          />
        </div>
      </Menu>
    );
  };

  if (props.data.length === 0) {
    return null;
  }

  return (
    <DraggableModal {...modalConfig}>
      <div className="hsc-material-pick-up-page-container">
        {!props.hideDesignInfo && (
          <div className="design-info">
            <div className="design-first">
              <div className={designNameClassName}>{props.name}</div>
              <div className="import-design-type">{designTypeLabel}</div>
            </div>
            <div className="design-second">
              <div className="design-area-and-designer">
                {props.area} | {props.copyright}
              </div>
            </div>
          </div>
        )}

        {props.coverImage && (
          <div
            className="hsc-material-pick-cover-image"
            style={{
              backgroundImage: `url(${props.coverImage})`,
            }}
          />
        )}

        <div className="hsc-material-pick-up-page-middle">
          <div className="hsc-material-pick-up-page-not-applied-model-list">
            {ResourceManager.getString('auto_styler_material_pick_up_not_applied')}
          </div>
          <div className="hsc-material-pick-up-page-select-container">
            {renderRoomSelector()}
          </div>
        </div>

        <div className="material-pick-up-page-content">
          <div className="material-pick-up-page-product-container">
            <div className="material-pick-up-page-product-list">
              {products.map((item) => (
                <catalogLib.ProductItemContainer
                  key={item.uuid}
                  item={item}
                  trackUseModel={() => trackModelUsage(item)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DraggableModal>
  );
};

export default MaterialPickUpPage;