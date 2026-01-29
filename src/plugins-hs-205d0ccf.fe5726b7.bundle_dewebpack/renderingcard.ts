import React from 'react';
import { Progress } from 'antd';
import { CardTooltip } from './CardTooltip';

interface RenderingItem {
  resolutionRatio: string;
  imageName: string;
}

interface TooltipItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface RenderingCardProps {
  item: RenderingItem;
  src: string;
  processSchedule: number;
  processRemainingDuration: number;
  tooltipItems: TooltipItem[];
}

const SECONDS_PER_MINUTE = 60;
const PROGRESS_STROKE_WIDTH = 5;
const PROGRESS_WIDTH = 120;

/**
 * RenderingCard component displays a card showing the rendering progress of an image
 * @param props - The component props
 * @returns React element representing the rendering card
 */
export const RenderingCard: React.FC<RenderingCardProps> = (props) => {
  const { item, src, processSchedule, processRemainingDuration, tooltipItems } = props;

  const getRemainingTimeText = (durationInSeconds: number): string => {
    if (durationInSeconds < SECONDS_PER_MINUTE) {
      const seconds = Math.floor(durationInSeconds);
      return ResourceManager.getString("plugin_render_waiting_seconds").replace("#SECOND#", String(seconds));
    }
    
    const minutes = Math.floor(durationInSeconds / SECONDS_PER_MINUTE);
    return ResourceManager.getString("plugin_render_waiting_minutes").replace("#MINUTE#", String(minutes));
  };

  const remainingTimeText = getRemainingTimeText(processRemainingDuration);

  return (
    <div className="grid-viewer-card album-rendering-card">
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
          {ResourceManager.getString("plugin_spark_pic_generating")}...
        </p>

        <div className="process-info">
          <div className="process-label">
            <div className="process-percent">
              {processSchedule}%
            </div>
            <div className="preocess-remain-duration">
              {remainingTimeText ?? ResourceManager.getString("plugin_render_waiting_times_calculate")}
            </div>
          </div>

          <Progress
            percent={processSchedule}
            showInfo={false}
            width={PROGRESS_WIDTH}
            strokeWidth={PROGRESS_STROKE_WIDTH}
          />
        </div>

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