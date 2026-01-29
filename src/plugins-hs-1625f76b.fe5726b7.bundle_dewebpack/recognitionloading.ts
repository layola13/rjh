import { useState, useEffect, ReactElement } from 'react';
import { Progress } from './Progress';
import { Button } from './Button';
import './ReCognitionLoading.css';

interface ReCognitionLoadingProps {
  onCancel: () => void;
}

interface ResourceManager {
  getString(key: string): string;
}

declare const ResourceManager: ResourceManager;

const PROGRESS_UPDATE_INTERVAL_MS = 100;
const TOTAL_DURATION_MS = 7000;
const INCREMENT_PER_INTERVAL = (PROGRESS_UPDATE_INTERVAL_MS / TOTAL_DURATION_MS) * 100;
const MAX_PROGRESS_THRESHOLD = 100 - (100 / TOTAL_DURATION_MS) * PROGRESS_UPDATE_INTERVAL_MS;
const FINAL_PROGRESS_VALUE = 99;

export function ReCognitionLoading(props: ReCognitionLoadingProps): ReactElement {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let currentProgress = 0;
    
    const timer = setInterval(() => {
      currentProgress += INCREMENT_PER_INTERVAL;
      setProgress(Math.floor(currentProgress));
      
      if (currentProgress > MAX_PROGRESS_THRESHOLD) {
        setProgress(FINAL_PROGRESS_VALUE);
        clearInterval(timer);
      }
    }, PROGRESS_UPDATE_INTERVAL_MS);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="aigc-image-search-page-loading">
      <Progress percent={progress} />
      <div className="loading-text">
        {ResourceManager.getString('inspiration_image_search_recognize_wait')}
      </div>
      <Button className="cancel-button" onClick={props.onCancel}>
        {ResourceManager.getString('messageBox_btn_cancel')}
      </Button>
    </div>
  );
}