import React from 'react';
import { IconfontView } from './IconfontView';
import { CardTooltip } from './CardTooltip';

interface FailedCardItem {
  resolutionRatio: string;
  [key: string]: unknown;
}

interface TooltipItem {
  [key: string]: unknown;
}

interface FailedCardProps {
  item: FailedCardItem;
  src: string;
  tooltipItems: TooltipItem[];
}

export const FailedCard: React.FC<FailedCardProps> = ({ item, src, tooltipItems }) => {
  return (
    <div className="grid-viewer-card failed-card">
      <div className="card-wrapper">
        <div 
          className="card-img" 
          style={{ backgroundImage: `url(${src})` }}
        >
          <div className="card-corner-sign">
            {ResourceManager.getString(item.resolutionRatio)}
          </div>
        </div>
        <p className="card-label">
          <IconfontView
            showType="hs_mian_liebiaoxiangqing"
            customStyle={{ fontSize: "14px" }}
          />
          {ResourceManager.getString("project_render_failed")}
        </p>
        <div className="hover-mask" />
      </div>
      <CardTooltip tooltipItems={tooltipItems} />
    </div>
  );
};