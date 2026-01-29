import { useRef } from 'react';
import React from 'react';
import { AiMoodboardPage } from './AiMoodboardPage';
import './styles.css';

interface PreConfig {
  queryType: string;
  sceneType: number;
}

interface MoodboardPageProps {
  getContainerHeight: () => number;
  getPreConfig: () => Promise<PreConfig>;
}

export function EnterPriseAiMoodBoardPage(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  const getPreConfig = async (): Promise<PreConfig> => {
    return {
      queryType: 'team',
      sceneType: 6
    };
  };

  const getContainerHeight = (): number => {
    if (containerRef?.current) {
      return containerRef.current.getBoundingClientRect().height;
    }
    return 0;
  };

  return (
    <div ref={containerRef} className="enterprise-ai-moodboard-page">
      <AiMoodboardPage
        getContainerHeight={getContainerHeight}
        getPreConfig={getPreConfig}
      />
    </div>
  );
}