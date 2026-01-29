import React from 'react';
import { Tooltip } from 'antd';
import { IconfontView } from './IconfontView';

interface ZoomButtonsProps {
  currentScale: number;
  minScale: number;
  maxScale: number;
  onZoomInClick: () => void;
  onZoomOutClick: () => void;
  onScaleTo: (scale: number) => void;
  onRestoreClick: () => void;
  scaleRadio: number;
}

/**
 * ZoomButtons component for controlling zoom operations
 * Provides zoom in, zoom out, and restore default size functionality
 */
export const ZoomButtons: React.FC<ZoomButtonsProps> = ({
  currentScale,
  minScale,
  maxScale,
  onZoomInClick,
  onZoomOutClick,
  onRestoreClick,
  scaleRadio
}) => {
  const PERCENTAGE_MULTIPLIER = 100;
  
  const displayPercentage = parseInt(`${PERCENTAGE_MULTIPLIER * currentScale}`);
  const isMinScaleReached = displayPercentage <= parseInt(`${PERCENTAGE_MULTIPLIER * minScale}`);
  const isMaxScaleReached = displayPercentage >= parseInt(`${PERCENTAGE_MULTIPLIER * maxScale}`);
  const finalPercentage = parseInt(`${PERCENTAGE_MULTIPLIER * currentScale * scaleRadio}`);

  return (
    <div className="enlarge">
      <div className="enlarge-control">
        <Tooltip
          placement="bottom"
          title={ResourceManager.getString("plugin_render_zoomOut")}
        >
          <div
            className={`enlarge-jian ${isMinScaleReached ? "enlarge-jian-disable" : ""}`}
            onClick={onZoomOutClick}
          >
            <IconfontView
              showType="hs_mian_suoxiao"
              customStyle={{ fontSize: "16px" }}
            />
          </div>
        </Tooltip>

        <span className="enlarge-text">
          {`${finalPercentage}%`}
        </span>

        <Tooltip
          placement="bottom"
          title={ResourceManager.getString("plugin_render_zoomIn")}
        >
          <div
            className={`enlarge-jia ${isMaxScaleReached ? "enlarge-jia-disable" : ""}`}
            onClick={onZoomInClick}
          >
            <IconfontView
              showType="hs_mian_fangda"
              customStyle={{ fontSize: "16px" }}
            />
          </div>
        </Tooltip>
      </div>

      <div className="enlarge-origin" onClick={onRestoreClick}>
        <IconfontView showType="hs_toolbar_huanyuanmoxing" />
        {ResourceManager.getString("plugin_render_restore_default_size")}
      </div>
    </div>
  );
};