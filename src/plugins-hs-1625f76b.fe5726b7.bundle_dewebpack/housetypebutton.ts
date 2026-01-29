import React from 'react';
import { SmartText } from './SmartText';
import { IconfontView } from './IconfontView';

interface HouseTypeButtonProps {
  id?: string;
  iconfontType: string;
  text: string;
  btnClick?: () => void;
  houseTypeTip?: string;
  showNew?: boolean;
  className?: string;
  showDot?: boolean;
}

export const HouseTypeButton: React.FC<HouseTypeButtonProps> = (props) => {
  const {
    id,
    iconfontType,
    text,
    btnClick,
    houseTypeTip,
    showNew = false,
    className = '',
    showDot = false
  } = props;

  const buttonClassName = className 
    ? `house-type-button ${className}` 
    : 'house-type-button';

  return (
    <div id={id} className={buttonClassName} onClick={btnClick}>
      <div className="content">
        <div className="content-text">
          <SmartText className="content-text-smart">
            {text}
          </SmartText>
        </div>
        <IconfontView
          customClass="more-arrow"
          showType="hs_xiao_danjiantou_you"
          customStyle={{ fontSize: '14px' }}
        />
      </div>
      <div className="house-type-tip">{houseTypeTip}</div>
      {showNew && (
        <span className="house-type-new">
          {ResourceManager.getString('catalog_recommend_new')}
        </span>
      )}
      {showDot && <span className="house-type-dot" />}
      <img src={iconfontType} className="house-type-img" />
    </div>
  );
};