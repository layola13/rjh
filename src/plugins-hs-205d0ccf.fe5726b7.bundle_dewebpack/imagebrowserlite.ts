import React, { useRef, useState, useEffect, Fragment } from 'react';
import { Badge } from './Badge';
import { IconfontView } from './IconfontView';
import { Action } from './Action';
import { PreviewCard } from './PreviewCard';

interface TaskImage {
  taskId: string;
  viewState: number;
}

interface ImageBrowserState {
  showTip: boolean;
  showList: boolean;
}

interface ImageBrowserLiteProps {
  handleClick: () => void;
  mockImage?: unknown;
}

interface FetchTaskImageParams {
  offset: number;
  limit: number;
}

interface FetchTaskImageResponse {
  taskList?: TaskImage[];
}

const REFRESH_INTERVAL = 2000;
const HOVER_ENTER_DELAY = 200;
const HOVER_LEAVE_DELAY = 200;
const TASK_FETCH_LIMIT = 200;
const ICON_FONT_SIZE = '20px';
const ICON_COLOR = 'rgba(255, 255, 255, 0.86)';

export const ImageBrowserLite: React.FC<ImageBrowserLiteProps> = ({ 
  handleClick, 
  mockImage 
}) => {
  const refreshIntervalRef = useRef<NodeJS.Timeout>();
  const mouseLeaveTimeoutRef = useRef<NodeJS.Timeout>();
  const mouseEnterTimeoutRef = useRef<NodeJS.Timeout>();

  const [state, setState] = useState<ImageBrowserState>({
    showTip: false,
    showList: false
  });

  const [taskList, setTaskList] = useState<TaskImage[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    fetchAndStartRefresh();

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [mockImage]);

  const fetchAndStartRefresh = async (): Promise<void> => {
    try {
      const response = await Action.fetchAllTaskImage({
        offset: 1,
        limit: TASK_FETCH_LIMIT
      });

      const tasks = response.taskList ?? [];
      setTaskList(tasks);

      startRefreshPolling(tasks);
    } catch (error) {
      console.error('Failed to fetch task images:', error);
    }
  };

  const startRefreshPolling = (tasks: TaskImage[]): void => {
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
    }

    refreshIntervalRef.current = setInterval(async () => {
      try {
        const updatedTasks = await Action.refreshTasks(tasks);

        if (updatedTasks.length > 0) {
          setIsRefreshing(true);
          setTaskList(updatedTasks);
        } else {
          setIsRefreshing(false);
          if (refreshIntervalRef.current) {
            clearInterval(refreshIntervalRef.current);
          }
        }
      } catch (error) {
        setIsRefreshing(false);
        if (refreshIntervalRef.current) {
          clearInterval(refreshIntervalRef.current);
        }
      }
    }, REFRESH_INTERVAL);
  };

  const handleMouseEnter = (): void => {
    if (mouseLeaveTimeoutRef.current) {
      clearTimeout(mouseLeaveTimeoutRef.current);
    }

    mouseEnterTimeoutRef.current = setTimeout(() => {
      const taskCount = taskList.length;
      setState({
        showTip: taskCount === 0,
        showList: taskCount !== 0
      });
    }, HOVER_ENTER_DELAY);
  };

  const handleMouseLeave = (): void => {
    if (mouseEnterTimeoutRef.current) {
      clearTimeout(mouseEnterTimeoutRef.current);
    }

    mouseLeaveTimeoutRef.current = setTimeout(() => {
      setState({
        showTip: false,
        showList: false
      });
    }, HOVER_LEAVE_DELAY);
  };

  const { showTip, showList } = state;
  const allTasksViewed = taskList.every(task => task.viewState === 1);

  return (
    <Fragment>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={showTip ? { position: 'relative' } : {}}
      >
        <div className="image-browser-icon">
          <Badge dot={!allTasksViewed}>
            <IconfontView
              iconOnclick={handleClick}
              showType="hs_xian_lingtuji"
              customClass="browser-icon"
              customStyle={{
                fontSize: ICON_FONT_SIZE,
                color: ICON_COLOR
              }}
            />
          </Badge>
          {isRefreshing && (
            <span
              className={`${
                allTasksViewed
                  ? 'ribp-btn-badge-doing'
                  : 'ribp-btn-badge-doing doing-icon-move-down'
              }`}
            />
          )}
        </div>

        {showTip && (
          <div className="image-browser-tip">
            {ResourceManager.getString('toolbar_view_render_results')}
          </div>
        )}

        <div className={`spark-pic-image-container ${showList ? '' : 'hide'}`}>
          <div
            className="card-container"
            style={{ background: '#2B2C2E' }}
          >
            {taskList.map(task => (
              <div className="task" key={task.taskId}>
                <PreviewCard
                  data={task}
                  isNew={task?.viewState === 0}
                  refresh={fetchAndStartRefresh}
                  onClick={handleClick}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};