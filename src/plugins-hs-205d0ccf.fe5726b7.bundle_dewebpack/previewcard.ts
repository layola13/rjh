import React from 'react';
import { TaskCard } from './TaskCard';
import { Badge } from './Badge';
import { IconfontView } from './IconfontView';
import { TaskBizStatusCode } from './TaskBizStatusCode';
import { Action } from './Action';

interface TaskData {
  bizStatus: TaskBizStatusCode;
  [key: string]: unknown;
}

interface PreviewCardProps {
  isNew: boolean;
  data: TaskData;
  refresh: () => void;
  onClick: (data: TaskData) => void;
}

export const PreviewCard: React.FC<PreviewCardProps> = (props) => {
  const { isNew, data, refresh, onClick } = props;
  
  const isCompletedOrFailed = 
    data.bizStatus !== TaskBizStatusCode.DISPATCHED && 
    data.bizStatus !== TaskBizStatusCode.PENDING;

  const handleViewDetail = (): void => {
    onClick(data);
  };

  const handleDelete = (): void => {
    Action.deleteTask(data, refresh);
  };

  return (
    <Badge dot={isNew}>
      <TaskCard data={data} selected={false} />
      {isCompletedOrFailed && (
        <>
          <div className="hover-mask" />
          {data.bizStatus === TaskBizStatusCode.SUCCESS && (
            <div className="click-view-more" onClick={handleViewDetail}>
              {ResourceManager.getString("plugin_spark_pic_view_detail")}
            </div>
          )}
          <div className="delete-btn" onClick={handleDelete}>
            <IconfontView
              showType="hs_mian_shanchu"
              customStyle={{ fontSize: "16px" }}
              hoverColor="#396efe"
            />
          </div>
        </>
      )}
    </Badge>
  );
};