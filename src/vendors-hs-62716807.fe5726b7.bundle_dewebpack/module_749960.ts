import React, { forwardRef, useState, useEffect, useRef, ReactNode, CSSProperties } from 'react';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import Progress from '../progress';
import DeleteIcon from '../icons/DeleteIcon';
import DownloadIcon from '../icons/DownloadIcon';
import PreviewIcon from '../icons/PreviewIcon';
import Tooltip from '../tooltip';

interface UploadFile {
  uid: string;
  name: string;
  status?: 'uploading' | 'done' | 'error' | 'removed';
  url?: string;
  thumbUrl?: string;
  response?: unknown;
  error?: {
    statusText?: string;
    message?: string;
  };
  linkProps?: string | Record<string, unknown>;
  percent?: number;
  [key: string]: unknown;
}

interface UploadLocale {
  removeFile: string;
  downloadFile: string;
  uploadError: string;
  previewFile: string;
}

interface ProgressConfig {
  strokeWidth?: number;
  showInfo?: boolean;
  [key: string]: unknown;
}

type ListType = 'text' | 'picture' | 'picture-card';

interface UploadListItemProps {
  prefixCls: string;
  className?: string;
  style?: CSSProperties;
  locale: UploadLocale;
  listType: ListType;
  file: UploadFile;
  items: UploadFile[];
  progress?: ProgressConfig;
  iconRender: (file: UploadFile) => ReactNode;
  actionIconRender: (
    icon: ReactNode,
    onClick: () => void,
    prefixCls: string,
    title: string
  ) => ReactNode;
  itemRender?: (
    originNode: ReactNode,
    file: UploadFile,
    fileList: UploadFile[]
  ) => ReactNode;
  isImgUrl?: (file: UploadFile) => boolean;
  showPreviewIcon: boolean;
  showRemoveIcon: boolean;
  showDownloadIcon: boolean;
  removeIcon?: ReactNode | ((file: UploadFile) => ReactNode);
  downloadIcon?: ReactNode | ((file: UploadFile) => ReactNode);
  onPreview: (file: UploadFile, event: React.MouseEvent<HTMLElement>) => void;
  onDownload: (file: UploadFile) => void;
  onClose: (file: UploadFile) => void;
}

const UploadListItem = forwardRef<HTMLDivElement, UploadListItemProps>((props, ref) => {
  const {
    prefixCls,
    className,
    style,
    locale,
    listType,
    file,
    items,
    progress,
    iconRender,
    actionIconRender,
    itemRender,
    isImgUrl,
    showPreviewIcon,
    showRemoveIcon,
    showDownloadIcon,
    removeIcon,
    downloadIcon,
    onPreview,
    onDownload,
    onClose,
  } = props;

  const [showProgress, setShowProgress] = useState(false);
  const timeoutRef = useRef<number | undefined>();

  useEffect(() => {
    timeoutRef.current = window.setTimeout(() => {
      setShowProgress(true);
    }, 300);

    return () => {
      if (timeoutRef.current !== undefined) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const iconSpanClassName = `${prefixCls}-span`;
  const fileIcon = iconRender(file);
  let thumbnailNode: ReactNode = (
    <div className={`${prefixCls}-text-icon`}>{fileIcon}</div>
  );

  if (listType === 'picture' || listType === 'picture-card') {
    if (file.status === 'uploading' || (!file.thumbUrl && !file.url)) {
      const thumbnailClassName = classNames({
        [`${prefixCls}-list-item-thumbnail`]: true,
        [`${prefixCls}-list-item-file`]: file.status !== 'uploading',
      });
      thumbnailNode = <div className={thumbnailClassName}>{fileIcon}</div>;
    } else {
      const isImage = isImgUrl?.(file);
      const thumbnailContent = isImage ? (
        <img
          src={file.thumbUrl || file.url}
          alt={file.name}
          className={`${prefixCls}-list-item-image`}
        />
      ) : (
        fileIcon
      );

      const thumbnailClassName = classNames({
        [`${prefixCls}-list-item-thumbnail`]: true,
        [`${prefixCls}-list-item-file`]: isImgUrl && !isImage,
      });

      thumbnailNode = (
        <a
          className={thumbnailClassName}
          onClick={(event) => onPreview(file, event)}
          href={file.url || file.thumbUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {thumbnailContent}
        </a>
      );
    }
  }

  const itemClassName = classNames({
    [`${prefixCls}-list-item`]: true,
    [`${prefixCls}-list-item-${file.status}`]: true,
    [`${prefixCls}-list-item-list-type-${listType}`]: true,
  });

  const linkProps: Record<string, unknown> =
    typeof file.linkProps === 'string'
      ? JSON.parse(file.linkProps)
      : file.linkProps ?? {};

  const removeButton = showRemoveIcon
    ? actionIconRender(
        (typeof removeIcon === 'function' ? removeIcon(file) : removeIcon) ?? (
          <DeleteIcon />
        ),
        () => onClose(file),
        prefixCls,
        locale.removeFile
      )
    : null;

  const downloadButton =
    showDownloadIcon && file.status === 'done'
      ? actionIconRender(
          (typeof downloadIcon === 'function' ? downloadIcon(file) : downloadIcon) ?? (
            <DownloadIcon />
          ),
          () => onDownload(file),
          prefixCls,
          locale.downloadFile
        )
      : null;

  const cardActionsNode =
    listType !== 'picture-card' ? (
      <span
        key="download-delete"
        className={classNames(`${prefixCls}-list-item-card-actions`, {
          picture: listType === 'picture',
        })}
      >
        {downloadButton}
        {removeButton}
      </span>
    ) : null;

  const nameClassName = classNames(`${prefixCls}-list-item-name`);

  const nameNode = file.url
    ? [
        <a
          key="view"
          target="_blank"
          rel="noopener noreferrer"
          className={nameClassName}
          title={file.name}
          {...linkProps}
          href={file.url}
          onClick={(event) => onPreview(file, event)}
        >
          {file.name}
        </a>,
        cardActionsNode,
      ]
    : [
        <span
          key="view"
          className={nameClassName}
          onClick={(event) => onPreview(file, event)}
          title={file.name}
        >
          {file.name}
        </span>,
        cardActionsNode,
      ];

  const previewButton = showPreviewIcon ? (
    <a
      href={file.url || file.thumbUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={
        file.url || file.thumbUrl
          ? undefined
          : { pointerEvents: 'none', opacity: 0.5 }
      }
      onClick={(event) => onPreview(file, event)}
      title={locale.previewFile}
    >
      <PreviewIcon />
    </a>
  ) : null;

  const pictureCardActionsNode =
    listType === 'picture-card' && file.status !== 'uploading' ? (
      <span className={`${prefixCls}-list-item-actions`}>
        {previewButton}
        {file.status === 'done' && downloadButton}
        {removeButton}
      </span>
    ) : null;

  let errorMessage: string;
  if (file.response && typeof file.response === 'string') {
    errorMessage = file.response;
  } else {
    errorMessage =
      file.error?.statusText ?? file.error?.message ?? locale.uploadError;
  }

  const iconSpanNode = (
    <span className={iconSpanClassName}>
      {thumbnailNode}
      {nameNode}
    </span>
  );

  const itemContentNode = (
    <div className={itemClassName}>
      <div className={`${prefixCls}-list-item-info`}>{iconSpanNode}</div>
      {pictureCardActionsNode}
      {showProgress && (
        <CSSMotion motionName="fade" visible={file.status === 'uploading'}>
          {({ className: motionClassName }) => {
            const progressNode =
              'percent' in file ? (
                <Progress {...progress} type="line" percent={file.percent} />
              ) : null;

            return (
              <div
                className={classNames(
                  `${prefixCls}-list-item-progress`,
                  motionClassName
                )}
              >
                {progressNode}
              </div>
            );
          }}
        </CSSMotion>
      )}
    </div>
  );

  const containerClassName = classNames(
    `${prefixCls}-list-${listType}-container`,
    className
  );

  const contentNode =
    file.status === 'error' ? (
      <Tooltip
        title={errorMessage}
        getPopupContainer={(element) => element.parentNode as HTMLElement}
      >
        {itemContentNode}
      </Tooltip>
    ) : (
      itemContentNode
    );

  return (
    <div className={containerClassName} style={style} ref={ref}>
      {itemRender ? itemRender(contentNode, file, items) : contentNode}
    </div>
  );
});

export default UploadListItem;