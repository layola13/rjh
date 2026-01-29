export interface ShopRankData {
  logo: string;
  shopName: string;
}

export interface ShopRankProps {
  data: ShopRankData;
  index: number;
  onClick: () => void;
}

export const ShopRank: React.FC<ShopRankProps> = ({ data, index, onClick }) => {
  const displayNumber = index >= 9 ? index : `0${index + 1}`;

  return (
    <div className="hsc-shop-rank">
      <div className="merchant" onClick={onClick}>
        <div className="left">
          <img className="logo" src={data.logo} alt={data.shopName} />
          <span className="name">{data.shopName}</span>
        </div>
        <div className="right">
          <span className="number">
            <span className="number-pre">TOP/</span>
            <span className="number-value">{displayNumber}</span>
          </span>
        </div>
      </div>
    </div>
  );
};