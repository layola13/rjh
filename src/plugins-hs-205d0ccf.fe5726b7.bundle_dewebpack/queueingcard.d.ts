/**
 * QueueingCard component for displaying queued rendering items in a grid viewer.
 * @module QueueingCard
 */

import React from 'react';
import { CardTooltip, TooltipItem } from './CardTooltip';

/**
 * Rendering item data structure
 */
export interface RenderItem {
  /** Resolution ratio key for localization (e.g., "1080p", "4k") */
  resolutionRatio: string;
  
  /** Name of the image/project being rendered */
  imageName: string;
  
  /** Additional item properties */
  [key: string]: unknown;
}

/**
 * Props for the QueueingCard component
 */
export interface QueueingCardProps {
  /** The rendering item data */
  item: RenderItem;
  
  /** Source URL for the preview thumbnail image */
  src: string;
  
  /** Tooltip items to display on hover */
  tooltipItems: TooltipItem[];
}

/**
 * QueueingCard component displays a card for items waiting in the render queue.
 * Shows a thumbnail preview, resolution ratio badge, pending status, and item name.
 * 
 * @param props - Component properties
 * @returns React element representing a queued render item card
 */
export const QueueingCard: React.FC<QueueingCardProps> = (props) => {
  const { item, src, tooltipItems } = props;

  return (
    <div className="grid-viewer-card queueing-card">
      <div className="card-wrapper">
        {/* Thumbnail with background image */}
        <div 
          className="card-img" 
          style={{ backgroundImage: `url(${src})` }}
        >
          {/* Resolution ratio badge in corner */}
          <div className="card-corner-sign">
            {ResourceManager.getString(item.resolutionRatio)}
          </div>
        </div>

        {/* Pending status label */}
        <p className="card-label">
          {ResourceManager.getString('project_render_pendding')}...
        </p>

        {/* Item name at bottom */}
        <div className="card-bottom">
          <div className="card-name">
            {item.imageName}
          </div>
        </div>

        {/* Hover overlay effect */}
        <div className="hover-mask" />
      </div>

      {/* Tooltip displayed on hover */}
      <CardTooltip tooltipItems={tooltipItems} />
    </div>
  );
};

/**
 * Global ResourceManager for internationalization
 * Note: This should be properly typed based on your actual ResourceManager implementation
 */
declare global {
  const ResourceManager: {
    getString(key: string): string;
  };
}