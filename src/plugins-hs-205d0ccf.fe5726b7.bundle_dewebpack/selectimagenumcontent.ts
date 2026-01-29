import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { AuthorizeManager } from './AuthorizeManager';

interface CouponNumResponse {
  totalNum: number;
  imgCountList: number[];
  imgCountAuthList: number[];
}

interface SelectImageNumContentProps {
  defaultNum?: number;
  onClick: (count: number) => void;
  getCouponNum: () => Promise<CouponNumResponse>;
}

export const SelectImageNumContent: React.FC<SelectImageNumContentProps> = ({
  defaultNum = 1,
  onClick,
  getCouponNum
}) => {
  const [selectedCount, setSelectedCount] = useState<number>(defaultNum);
  const [totalNum, setTotalNum] = useState<number>(0);
  const [imgCountList, setImgCountList] = useState<number[]>([]);
  const [imgCountAuthList, setImgCountAuthList] = useState<number[]>([]);

  const authorizeManager = new AuthorizeManager();

  const handleClick = (count: number, needsAuth: boolean): void => {
    if (needsAuth) {
      authorizeManager.authorize('count');
    } else {
      setSelectedCount(count);
      onClick(count);
    }
  };

  useEffect(() => {
    getCouponNum().then((response: CouponNumResponse) => {
      setTotalNum(response.totalNum);
      setImgCountList(response.imgCountList);
      setImgCountAuthList(response.imgCountAuthList);
    });
  }, [getCouponNum]);

  return (
    <div className="select-image-num-content">
      <span
        dangerouslySetInnerHTML={{
          __html: ResourceManager.getString('plugin_spark_pic_coupon_left').replace('{num}', String(totalNum))
        }}
      />
      <div className="btns">
        {imgCountList.map((count: number) => {
          const needsAuth = !imgCountAuthList.includes(count);
          return (
            <div key={count} className="select-image-count">
              <Button
                className={count === selectedCount ? 'select-image-count-active' : undefined}
                onClick={() => handleClick(count, needsAuth)}
                type="default"
              >
                {count}
              </Button>
              {needsAuth && (
                <img
                  className="benefit_img"
                  src={require('./assets/benefit-icon.png')}
                  alt="benefit"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};