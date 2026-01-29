import React, { useState, useEffect, useRef } from 'react';

interface ImageData {
  subTaskId: string;
  imageUrl: string;
  imageName: string;
  picWight: number;
  picHeight: number;
  proportionWidth: number;
  proportionHeight: number;
  roomTypeName: string;
  styleTypeName: string;
  includeWatermark: boolean;
  processStatus: number;
  processSchedule: number;
  processRemainingDuration: number;
}

interface TaskData {
  id: string;
  [key: string]: unknown;
}

interface ImageDetailProps {
  data: ImageData | null;
  dataList: ImageData[];
  task?: TaskData;
  handleClose: (shouldRefresh?: boolean, taskData?: TaskData) => void;
  handleDelete: (data: ImageData) => void;
  handleViewed?: (data: ImageData) => void;
}

interface ProcessState {
  processStatus: number;
  processSchedule: number;
  processRemainingDuration: number;
}

interface ActionItem {
  name: string;
  icon: string;
  handleClick: () => void;
  disable?: boolean;
  showVip?: boolean;
  toolTipCom?: () => React.ReactElement;
  unable?: boolean;
}

interface ParamItem {
  name: string;
  value: string;
}

enum RenderJobStatusCode {
  PENDING = 0,
  DISPATCHED = 1,
  FAILED = 2,
  SUCCESS = 3
}

enum ResponseCode {
  Success = 0
}

const INITIAL_PROCESS_STATE: ProcessState = {
  processStatus: 0,
  processSchedule: 0,
  processRemainingDuration: 10
};

const TENANT_FP = 'fp';
const SIDEBAR_WIDTH_FP = 500;
const SIDEBAR_WIDTH_DEFAULT = 650;
const SUCCESS_HINT_DURATION = 2000;
const WARNING_HINT_DURATION = 3000;
const REFRESH_INTERVAL = 1000;

export const ImageDetail: React.FC<ImageDetailProps> = ({
  data,
  dataList,
  task,
  handleClose,
  handleDelete,
  handleViewed
}) => {
  const [imageList, setImageList] = useState<ImageData[]>(
    dataList.filter((item) => !!item.imageUrl)
  );
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [hasRemovedWatermark, setHasRemovedWatermark] = useState<boolean>(false);

  const totalImages = imageList.length;

  if (totalImages <= 0 || !data) {
    return <div />;
  }

  const currentIndexRef = useRef<number>(
    imageList.findIndex((item) => item.subTaskId === data.subTaskId)
  );

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [processState, setProcessState] = useState<ProcessState>(INITIAL_PROCESS_STATE);
  const [currentImage, setCurrentImage] = useState<ImageData>(data);

  const {
    imageName,
    imageUrl,
    picWight,
    picHeight,
    proportionWidth,
    proportionHeight,
    roomTypeName,
    styleTypeName
  } = currentImage;

  const paramsList: ParamItem[] = [
    {
      name: ResourceManager.getString('plugin_render_optionprompt_size'),
      value: `${picWight} * ${picHeight}`
    },
    {
      name: ResourceManager.getString('plugin_render_aspect_ratio'),
      value: `${proportionWidth} : ${proportionHeight}`
    },
    {
      name: ResourceManager.getString('plugin_spark_pic_room_type'),
      value: roomTypeName
    },
    {
      name: ResourceManager.getString('save_genre'),
      value: styleTypeName
    }
  ];

  const hasWatermarkBenefit = adskUser.benefits?.noWatermark?.useful ?? false;
  const isMember = Action.isMemberGrade();

  const handleGenerateByImage = (imageData: ImageData): void => {
    Action.submitByImage(imageData, task, () => {
      handleClose(true);
    });
  };

  const handleRemoveWatermark = (): void => {
    if (!hasWatermarkBenefit) {
      return;
    }

    if (currentImage.includeWatermark) {
      Action.removeWatermark([currentImage], 'sparkpic_detail_watermark').then((response) => {
        if (response?.code === ResponseCode.Success) {
          const app = HSApp.App.getApp();
          const marketingBadgePlugin = app.pluginManager.getPlugin(
            HSFPConstants.PluginType.MarketingBadge
          );
          marketingBadgePlugin?.refreshBenefits();

          currentImage.processStatus = RenderJobStatusCode.PENDING;
          startPollingJobs([currentImage], true);
          setHasRemovedWatermark(true);
        }

        LiveHint.show(
          ResourceManager.getString(response?.msg),
          SUCCESS_HINT_DURATION,
          null,
          {
            status: LiveHint.statusEnum.completed,
            canclose: true
          }
        );
      });
    } else {
      LiveHint.show(
        ResourceManager.getString('plugin_spark_pic_img_no_watermark'),
        WARNING_HINT_DURATION,
        null,
        {
          status: LiveHint.statusEnum.completed,
          canclose: true
        }
      );
    }
  };

  const handleDeleteImage = (imageData: ImageData): void => {
    Action.deleteRender(imageData, () => {
      const remainingImages = imageList.filter(
        (item) => item.subTaskId !== currentImage.subTaskId
      );

      handleDelete(imageData);

      if (remainingImages.length) {
        setImageList(remainingImages);
        const nextIndex = Math.min(currentIndexRef.current, remainingImages.length - 1);
        setCurrentImage(remainingImages[nextIndex]);
      } else {
        closeModal();
      }
    });
  };

  const startPollingJobs = (jobs: ImageData[], isWatermarkRemoval = false): void => {
    intervalRef.current = setInterval(() => {
      Action.refreshJobs(jobs)
        .then((updatedJobs) => {
          updateJobStatus(updatedJobs[0], isWatermarkRemoval);
        })
        .catch(() => {
          stopPollingJobs();
        });
    }, REFRESH_INTERVAL);
  };

  const updateJobStatus = (job: ImageData, isWatermarkRemoval = false): void => {
    const { processStatus, processSchedule, processRemainingDuration } = job;

    if (
      processStatus !== RenderJobStatusCode.DISPATCHED &&
      processStatus !== RenderJobStatusCode.PENDING
    ) {
      stopPollingJobs();

      let updatedList = [job];
      if (isWatermarkRemoval) {
        updatedList = [...imageList];
        updatedList[currentIndexRef.current] = job;
      }

      setImageList(updatedList);
      setCurrentImage(job);

      if (processStatus === RenderJobStatusCode.FAILED) {
        LiveHint.show(
          ResourceManager.getString('plugin_spark_pic_image_upgrade_faild'),
          WARNING_HINT_DURATION,
          null,
          {
            status: LiveHint.statusEnum.warning,
            canclose: true
          }
        );
      }
    } else {
      setProcessState({
        processStatus,
        processSchedule,
        processRemainingDuration
      });
    }
  };

  const stopPollingJobs = (): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsProcessing(false);
    setProcessState(INITIAL_PROCESS_STATE);
  };

  useEffect(() => {
    return () => {
      stopPollingJobs();
    };
  }, []);

  const isFpTenant = HSApp.Config.TENANT === TENANT_FP;
  const sidebarWidth = isFpTenant ? SIDEBAR_WIDTH_FP : SIDEBAR_WIDTH_DEFAULT;
  const maxNameWidth = window.innerWidth - sidebarWidth;

  const closeModal = (): void => {
    handleClose(hasSubmitted || hasRemovedWatermark, hasSubmitted ? undefined : hasRemovedWatermark ? task : undefined);
  };

  const navigateImage = (direction: 'prev' | 'next'): void => {
    const offset = direction === 'prev' ? -1 : 1;
    const nextIndex = (currentIndexRef.current + offset + totalImages) % totalImages;
    currentIndexRef.current = nextIndex;

    const nextImage = imageList[nextIndex];
    setCurrentImage(nextImage);
    Action.viewedImage(nextImage.subTaskId);
    handleViewed?.(nextImage);
  };

  const actionList: ActionItem[] = [
    {
      name: ResourceManager.getString('plugin_spark_pic_image_generate'),
      icon: 'hs_xian_lingtuji',
      handleClick: () => handleGenerateByImage(currentImage),
      disable: true
    },
    {
      name: ResourceManager.getString('plugin_spark_pic_remove_watermark_tip'),
      icon: 'hs_mian_qushuiyin',
      handleClick: handleRemoveWatermark,
      showVip: !isMember,
      toolTipCom: () => (
        <BuyMemberContainer hasBenefit={isMember} sourcePage="sparkpic_detail_watermark" />
      ),
      unable: !hasWatermarkBenefit,
      disable: !isFpTenant
    },
    {
      name: ResourceManager.getString('plugin_export2d_download_title'),
      icon: 'hs_mian_xiazai',
      handleClick: () => Action.downloadImage(currentImage)
    },
    {
      name: ResourceManager.getString('share_event'),
      icon: 'hs_mian_fenxiang',
      handleClick: () => Action.showShareModal(currentImage)
    },
    {
      name: ResourceManager.getString('project_dnstool_delete_event'),
      icon: 'hs_mian_shanchu',
      handleClick: () => handleDeleteImage(currentImage)
    },
    {
      name: ResourceManager.getString('plugin_spark_pic_image_Feed_back'),
      icon: 'hs_mian_moxingmanyidu',
      handleClick: () => Action.showFeedBackEntry(currentImage),
      disable: adskUser.hideFeedback
    }
  ];

  return (
    <div className="spark-pic-image-detail">
      <div className="mask" />
      <PinchZoomPan
        customClassName={isProcessing ? 'zoom_disable' : ''}
        minScale="auto"
        maxScale={4}
        position="center"
        initialScale="auto"
        zoomButtons={true}
        doubleTapBehavior="reset"
        initialLeft={0}
        initialTop={0}
        imageUrl={imageUrl}
      >
        <img src={imageUrl} alt="loaded" />
      </PinchZoomPan>

      {isProcessing &&
        (processState.processStatus === RenderJobStatusCode.PENDING ? (
          <div className="queue-card-tip">
            {ResourceManager.getString('project_render_pendding')}...
          </div>
        ) : (
          <ProgressContainer
            customClassName="process_area"
            processRemainingDuration={processState.processRemainingDuration}
            processSchedule={processState.processSchedule}
          />
        ))}

      <div className="icons">
        <div className="header">
          <div className="left">
            <div className="name" style={{ maxWidth: `${maxNameWidth}px` }}>
              {imageName}
            </div>
            <div className="ai-params">
              <div className="text">{ResourceManager.getString('AI_params')}</div>
              <span className="expand-arrow" />
              <div className="detail-container-wrap">
                {paramsList.map((param) => (
                  <div className="item" key={param.name}>
                    <div className="key">{param.name}: </div>
                    <div className="value">{param.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="right" onClick={closeModal}>
            <IconfontView customStyle={{ color: 'white' }} showType="hs_xian_guanbi" />
          </div>
        </div>

        <div className={`arrow ${isProcessing ? 'arrow_disable' : ''}`}>
          <div className="icon-container left" onClick={() => navigateImage('prev')}>
            <IconfontView
              showType="hs_icon_tucejiantouzuo"
              customStyle={{ fontSize: '40px', color: '#fff' }}
            />
          </div>
          <div className="icon-container right" onClick={() => navigateImage('next')}>
            <IconfontView
              showType="hs_icon_tucejiantouzuo"
              customStyle={{ fontSize: '40px', color: '#fff' }}
            />
          </div>
        </div>

        <div className={`bottom ${isProcessing ? 'bottom_disable' : ''}`}>
          <ActionContainer actionList={actionList} />
        </div>
      </div>
    </div>
  );
};