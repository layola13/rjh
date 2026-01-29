import React from 'react';
import { CardTooltip } from './CardTooltip';

interface QueueingItem {
  resolutionRatio: string;
  imageName: string;
}

interface TooltipItem {
  label: string;
  value: string;
}

interface QueueingCardProps {
  item: QueueingItem;
  src: string;
  tooltipItems: TooltipItem[];
}

declare const ResourceManager: {
  getString(key: string): string;
};

export const QueueingCard: React.FC<QueueingCardProps> = ({ item, src, tooltipItems }) => {
  return (
    <div className="grid-viewer-card queueing-card">
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
          {ResourceManager.getString("project_render_pendding")}...
        </p>
        <div className="card-bottom">
          <div className="card-name">
            {item.imageName}
          </div>
        </div>
        <div className="hover-mask" />
      </div>
      <CardTooltip tooltipItems={tooltipItems} />
    </div>
  );
};