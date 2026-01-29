import React from 'react';
import { ProgressContainer, ProgressModeEnum } from './ProgressContainer';

enum TaskBizStatusCode {
  DISPATCHED = 'DISPATCHED',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  SUCCESS = 'SUCCESS'
}

interface ImageResult {
  url: string;
  [key: string]: unknown;
}

interface TaskData {
  bizStatus: TaskBizStatusCode;
  imageResultList: ImageResult[];
  coverImageUrl: string;
  processSchedule: number;
}

interface TaskCardProps {
  data: TaskData;
  selected?: boolean;
}

interface TaskCardContainerProps extends TaskCardProps {
  children: React.ReactNode;
}

interface TaskStatusComponentProps {
  data: TaskData;
}

/**
 * Main TaskCard component that renders different states based on task status
 */
export const TaskCard: React.FC<TaskCardProps> = (props) => {
  switch (props.data.bizStatus) {
    case TaskBizStatusCode.DISPATCHED:
      return <TaskCardContainer {...props}><DispatchedStatus {...props} /></TaskCardContainer>;
    case TaskBizStatusCode.PENDING:
      return <TaskCardContainer {...props}><PendingStatus {...props} /></TaskCardContainer>;
    case TaskBizStatusCode.FAILED:
      return <TaskCardContainer {...props}><FailedStatus {...props} /></TaskCardContainer>;
    case TaskBizStatusCode.SUCCESS:
    default:
      return <TaskCardContainer {...props}><SuccessStatus {...props} /></TaskCardContainer>;
  }
};

/**
 * Container component for task card with layered shadow effect
 */
const TaskCardContainer: React.FC<TaskCardContainerProps> = ({ data, selected, children }) => {
  const imageCount = data.imageResultList.length;

  const renderShadowLayers = (count: number): React.ReactNode[] => {
    const maxShadowLayers = 2;
    const shadowCount = count - 1 >= maxShadowLayers ? maxShadowLayers : count - 1;
    const layers: React.ReactNode[] = [];

    for (let i = 0; i < shadowCount; i++) {
      layers.unshift(
        <div key={`shadow-${i}`} className={`box shadow index-${i}`} />
      );
    }

    return layers;
  };

  return (
    <div className={`task-card ${selected ? 'selected' : ''}`}>
      <>
        {renderShadowLayers(imageCount)}
        <div className="box image-container">
          {children}
          <div className="img-num">
            {imageCount}
            {ResourceManager.getString('plugin_render_total_extend')}
          </div>
        </div>
      </>
    </div>
  );
};

/**
 * Success status - displays cover image
 */
const SuccessStatus: React.FC<TaskStatusComponentProps> = ({ data }) => {
  const { coverImageUrl } = data;
  return <img className="img" src={coverImageUrl} alt="Task cover" />;
};

/**
 * Dispatched status - shows progress bar
 */
const DispatchedStatus: React.FC<TaskStatusComponentProps> = ({ data }) => {
  const { processSchedule } = data;
  return (
    <ProgressContainer
      customClassName="progress-area"
      mode={ProgressModeEnum.Simple}
      processSchedule={processSchedule}
    />
  );
};

/**
 * Pending status - displays pending message
 */
const PendingStatus: React.FC<TaskStatusComponentProps> = () => {
  return <div>{ResourceManager.getString('project_render_pendding')}</div>;
};

/**
 * Failed status - displays failure message
 */
const FailedStatus: React.FC<TaskStatusComponentProps> = () => {
  return <div>{ResourceManager.getString('project_render_failed')}</div>;
};