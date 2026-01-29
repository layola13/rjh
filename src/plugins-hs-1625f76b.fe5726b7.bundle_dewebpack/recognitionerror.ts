import React from 'react';
import { Icons, Button } from './UIComponents';

interface ReCognitionErrorProps {
  onRetry: () => void;
}

export const ReCognitionError: React.FC<ReCognitionErrorProps> = ({ onRetry }) => {
  return (
    <div className="aigc-image-search-page-error">
      <div className="error-text-container">
        <Icons
          className="error-icon"
          type="hs_shuxingmianban_xiangqing_jingshi"
        />
        <div className="error-text">
          {ResourceManager.getString("inspiration_image_search_recognize_failed")}
        </div>
      </div>
      <Button
        className="retry-button"
        onClick={onRetry}
      >
        {ResourceManager.getString("inspiration_image_search_retry")}
      </Button>
    </div>
  );
};