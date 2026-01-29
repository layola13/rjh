import React from 'react';

enum RenderJobStatusCode {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  DISPATCHED = 'DISPATCHED',
  PENDING = 'PENDING'
}

enum ActionKey {
  Generate = 'Generate',
  Download = 'Download',
  Share = 'Share',
  Delete = 'Delete',
  FeedBack = 'FeedBack'
}

interface ImageData {
  imageUrl: string;
  processStatus: RenderJobStatusCode;
  processSchedule?: number;
  processRemainingDuration?: number;
  upgradeResolutionTag?: string;
}

interface TooltipItem {
  key: ActionKey;
  icon: string;
  title: string;
  callback: () => void;
  disable?: boolean;
}

interface ImageCardProps {
  data: ImageData;
  style?: React.CSSProperties;
  handleDelete: (data: ImageData) => void;
  handleUpdateResolution?: (data: ImageData) => void;
  viewDetail: (data: ImageData) => void;
  rePaint: () => void;
}

interface ButtonProps {
  type?: string;
  className?: string;
  children?: React.ReactNode;
}

interface IconfontViewProps {
  showType: string;
  customClass?: string;
  customStyle?: React.CSSProperties;
}

interface ProgressContainerProps {
  customClassName?: string;
  processSchedule?: number;
  processRemainingDuration?: number;
}

interface CardTooltipProps {
  tooltipItems: TooltipItem[];
}

declare const Button: React.FC<ButtonProps>;
declare const IconfontView: React.FC<IconfontViewProps>;
declare const ProgressContainer: React.FC<ProgressContainerProps>;
declare const CardTooltip: React.FC<CardTooltipProps>;
declare const ResourceManager: { getString: (key: string) => string };
declare const adskUser: { hideFeedback?: boolean };

namespace Action {
  export function downloadImage(data: ImageData): void;
  export function showShareModal(data: ImageData): void;
  export function showFeedBackEntry(data: ImageData): void;
}

const CompletedImageCard: React.FC<ImageCardProps> = (props) => {
  const { data, style, handleDelete, viewDetail, rePaint } = props;
  const { imageUrl } = data;

  const tooltipItems: TooltipItem[] = [
    {
      key: ActionKey.Generate,
      icon: 'hs_xian_lingtuji',
      title: 'plugin_spark_pic_image_generate',
      callback: rePaint,
      disable: true
    },
    {
      key: ActionKey.Download,
      icon: 'hs_mian_xiazai',
      title: 'project_dnstool_download',
      callback: () => Action.downloadImage(data)
    },
    {
      key: ActionKey.Share,
      icon: 'hs_mian_fenxiang',
      title: 'project_dnstool_share',
      callback: () => Action.showShareModal(data)
    },
    {
      key: ActionKey.Delete,
      icon: 'hs_mian_shanchu',
      title: 'project_dnstool_delete',
      callback: () => handleDelete(data)
    }
  ];

  if (!adskUser.hideFeedback) {
    tooltipItems.push({
      key: ActionKey.FeedBack,
      icon: 'hs_mian_moxingmanyidu',
      title: 'plugin_spark_pic_image_Feed_back',
      callback: () => Action.showFeedBackEntry(data)
    });
  }

  return (
    <div className="image-card completed" style={style} onClick={() => viewDetail(data)}>
      <img className="img" src={imageUrl} />
      <Button type="primary" className="check-more">
        {ResourceManager.getString('plugin_render_view_detail')}
      </Button>
      <CardTooltip tooltipItems={tooltipItems} />
    </div>
  );
};

const FailedImageCard: React.FC<ImageCardProps> = (props) => {
  const { data, style, handleDelete } = props;

  const tooltipItems: TooltipItem[] = [
    {
      key: ActionKey.Delete,
      icon: 'hs_mian_shanchu',
      title: 'project_dnstool_delete',
      callback: () => handleDelete(data)
    }
  ];

  return (
    <div className="image-card failed" style={style}>
      <IconfontView
        showType="hs_mian_liebiaoxiangqing"
        customClass="failed-icon"
        customStyle={{ fontSize: '14px' }}
      />
      {ResourceManager.getString('project_render_failed')}
      <CardTooltip tooltipItems={tooltipItems} />
    </div>
  );
};

const RenderingImageCard: React.FC<ImageCardProps> = (props) => {
  const { style, data } = props;
  const { processSchedule, processRemainingDuration } = data;

  return (
    <div className="image-card rendering" style={style}>
      <div>{ResourceManager.getString('slab_edit_sketch_applying')}</div>
      <ProgressContainer
        customClassName="progress-area"
        processSchedule={processSchedule}
        processRemainingDuration={processRemainingDuration}
      />
    </div>
  );
};

const QueueingImageCard: React.FC<ImageCardProps> = (props) => {
  const { style } = props;

  return (
    <div className="image-card queueing" style={style}>
      {ResourceManager.getString('project_render_pendding')}
    </div>
  );
};

export const ImageCard: React.FC<ImageCardProps> = (props) => {
  switch (props.data.processStatus) {
    case RenderJobStatusCode.FAILED:
      return <FailedImageCard {...props} />;
    case RenderJobStatusCode.DISPATCHED:
      return <RenderingImageCard {...props} />;
    case RenderJobStatusCode.PENDING:
      return <QueueingImageCard {...props} />;
    case RenderJobStatusCode.SUCCESS:
    default:
      return <CompletedImageCard {...props} />;
  }
};