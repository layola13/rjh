/**
 * ShopRank组件的数据接口
 */
interface ShopRankData {
  /** 店铺Logo图片URL */
  logo: string;
  /** 店铺名称 */
  shopName: string;
}

/**
 * ShopRank组件的属性接口
 */
interface ShopRankProps {
  /** 店铺排名数据 */
  data: ShopRankData;
  /** 排名索引（从0开始） */
  index: number;
  /** 点击店铺时的回调函数 */
  onClick: () => void;
}

/**
 * 店铺排名展示组件
 * 
 * 用于显示店铺的排名信息，包括店铺Logo、名称和排名编号
 * 
 * @param props - 组件属性
 * @returns React元素
 * 
 * @example
 *