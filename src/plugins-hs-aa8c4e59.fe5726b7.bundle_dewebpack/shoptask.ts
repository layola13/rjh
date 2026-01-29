import React, { useState, useEffect, useRef } from 'react';
import { SelectChanel } from './SelectChanel';
import { getShopProductList, submitShopProductTask } from './api';

interface ShopItem {
  skuId: string;
  channelCode: string;
  price: number;
}

interface Shop {
  items: ShopItem[];
}

interface ProductMeta {
  thumbnail: string;
  seekId: string;
}

interface ShopTaskItem {
  id: string;
  shop: Shop;
  meta: ProductMeta;
}

interface ChannelMap {
  [key: string]: string;
}

interface TaskChange {
  jid: string;
  channelCode?: string;
  skuId?: string;
}

interface ShopTaskProps {
  shops: ShopTaskItem[];
  defaultSelectChanelMap: ChannelMap;
  onChange?: (tasks: TaskChange[]) => void;
  unit?: string;
}

interface BomContent {
  seekId?: string;
}

interface BomConfig {
  id: string;
}

interface BomResult {
  config: BomConfig[];
  contentInfo: Record<string, BomContent[]>;
}

interface Product {
  seekId: string;
}

interface ShopProduct {
  jid: string;
  items: ShopItem[];
}

interface GetShopInfoResult {
  shops: ShopTaskItem[];
  selectChanelMap: ChannelMap;
}

export function ShopTask(props: ShopTaskProps): JSX.Element {
  const { shops, defaultSelectChanelMap, onChange, unit = '$' } = props;
  const [selectedChannelMap, setSelectedChannelMap] = useState<ChannelMap>(defaultSelectChanelMap);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const taskChanges = shops.map((shop) => {
      const selectedItem = shop.shop.items.find((item) => item.skuId === selectedChannelMap[shop.id]);
      
      return {
        jid: shop.id,
        channelCode: selectedItem?.channelCode,
        skuId: selectedItem?.skuId
      };
    });

    onChange?.(taskChanges);
  }, [shops, selectedChannelMap]);

  const handleChannelSelected = (shopId: string, skuId: string): void => {
    setSelectedChannelMap((prevMap) => ({
      ...prevMap,
      [shopId]: skuId
    }));
  };

  return (
    <div className="shop-task-wrapper">
      <div className="shop-task" ref={containerRef}>
        {shops?.map((shop) => (
          <div key={shop.id} className="shop-task-item">
            <img 
              src={shop.meta.thumbnail} 
              className="shop-task-item-image" 
              alt="shop thumbnail"
            />
            <SelectChanel
              unit={unit}
              className="shop-task-item-select"
              item={shop.shop}
              selctChanelSkuId={selectedChannelMap[shop.id]}
              onSlected={(skuId: string) => handleChannelSelected(shop.id, skuId)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function extractBomContents(bomResult: BomResult): BomContent[] {
  const contents: BomContent[] = [];
  
  bomResult.config.forEach((configItem) => {
    const itemContents = bomResult.contentInfo[configItem.id];
    if (itemContents) {
      contents.push(...itemContents);
    }
  });

  return contents;
}

function findCheapestItem(items: ShopItem[]): ShopItem {
  return items.reduce((cheapest, current) => {
    return cheapest.price > current.price ? current : cheapest;
  }, items[0]);
}

function removeDuplicates<T>(array: T[], key: keyof T): T[] {
  return array.reduce((unique: T[], item: T) => {
    const isDuplicate = unique.some((uniqueItem) => uniqueItem[key] === item[key]);
    if (!isDuplicate) {
      unique.push(item);
    }
    return unique;
  }, []);
}

export async function getShopInfo(): Promise<GetShopInfoResult> {
  const app = HSApp.App.getApp();
  const bomService = app.pluginManager.getPlugin(HSFPConstants.PluginType.BomService);
  
  const bomResult = await bomService.processBom2({ noJointRet: true });
  const contents = extractBomContents(bomResult);
  
  const contentsWithSeekId = contents.filter((content) => !!content.seekId);
  
  const seekIds = contentsWithSeekId.map((content) => content.seekId!);
  const productsMap = await HSCatalog.Manager.instance().getProductsBySeekIds(seekIds);
  const products = Object.values(productsMap) as Product[];
  
  const validSeekIds = products.map((product) => product.seekId);
  
  if (!validSeekIds?.length) {
    return {
      shops: [],
      selectChanelMap: {}
    };
  }

  const uniqueSeekIds = Array.from(new Set(validSeekIds));
  const shopProducts = await getShopProductList(uniqueSeekIds);
  
  const shopTaskItems = shopProducts.map((shopProduct) => ({
    id: shopProduct.jid,
    shop: shopProduct,
    meta: productsMap[shopProduct.jid] as ProductMeta
  }));

  const uniqueShops = removeDuplicates(shopTaskItems, 'id');
  
  const defaultSelectionMap = uniqueShops.reduce((map, shop) => {
    const cheapestItem = findCheapestItem(shop.shop.items);
    map[shop.id] = cheapestItem.skuId;
    return map;
  }, {} as ChannelMap);

  return {
    shops: uniqueShops,
    selectChanelMap: defaultSelectionMap
  };
}

export async function submitShopTask(tasks: TaskChange[]): Promise<unknown> {
  return submitShopProductTask(tasks);
}