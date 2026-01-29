import React, { useState, useEffect, useContext, useImperativeHandle, forwardRef } from 'react';
import classNames from 'classnames';
import CSSMotionList, { CSSMotion } from 'rc-motion';
import { ConfigContext } from '../config-provider';
import { isValidElement, cloneElement } from 'react';
import Button from '../button';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import PaperClipOutlined from '@ant-design/icons/PaperClipOutlined';
import PictureOutlined from '@ant-design/icons/PictureOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import { previewImage, isImageUrl as defaultIsImageUrl } from '../utils';
import useForceUpdate from '../hooks/useForceUpdate';
import ListItem from './ListItem';

type ListType = 'text' | 'picture' | 'picture-card';

interface UploadFile {
  uid: string;
  name?: string;
  status?: 'uploading' | 'done' | 'error' | 'removed';
  url?: string;
  thumbUrl?: string;
  originFileObj?: File | Blob;
  [key: string]: unknown;
}

interface ProgressProps {
  strokeWidth?: number;
  showInfo?: boolean;
  [key: string]: unknown;
}

interface UploadListProps {
  listType?: ListType;
  previewFile?: (file: File | Blob) => Promise<string>;
  onPreview?: (file: UploadFile) => void;
  onDownload?: (file: UploadFile) => void;
  onRemove?: (file: UploadFile) => void;
  locale?: Record<string, string>;
  iconRender?: (file: UploadFile, listType?: ListType) => React.ReactNode;
  isImageUrl?: (file: UploadFile) => boolean;
  prefixCls?: string;
  items?: UploadFile[];
  showPreviewIcon?: boolean;
  showRemoveIcon?: boolean;
  showDownloadIcon?: boolean;
  removeIcon?: React.ReactNode;
  downloadIcon?: React.ReactNode;
  progress?: ProgressProps;
  appendAction?: React.ReactElement;
  itemRender?: (
    originNode: React.ReactElement,
    file: UploadFile,
    fileList: UploadFile[],
    actions: { download: () => void; preview: () => void; remove: () => void }
  ) => React.ReactNode;
}

interface UploadListRef {
  handlePreview: (file: UploadFile, event: React.MouseEvent) => void;
  handleDownload: (file: UploadFile) => void;
}

const MOTION_CONFIG = {
  motionDeadline: 2000,
  motionName: 'fade',
  removeOnLeave: true,
  leavedClassName: 'hidden'
};

const UploadList = forwardRef<UploadListRef, UploadListProps>((props, ref) => {
  const {
    listType = 'text',
    previewFile,
    onPreview,
    onDownload,
    onRemove,
    locale = {},
    iconRender,
    isImageUrl: isImageUrlProp,
    prefixCls: customPrefixCls,
    items = [],
    showPreviewIcon = true,
    showRemoveIcon = true,
    showDownloadIcon = false,
    removeIcon,
    downloadIcon,
    progress = { strokeWidth: 2, showInfo: false },
    appendAction,
    itemRender
  } = props;

  const forceUpdate = useForceUpdate();
  const [motionAppear, setMotionAppear] = useState<boolean>(false);

  useEffect(() => {
    if (listType !== 'picture' && listType !== 'picture-card') {
      return;
    }

    (items || []).forEach((file) => {
      if (
        typeof document !== 'undefined' &&
        typeof window !== 'undefined' &&
        window.FileReader &&
        window.File &&
        (file.originFileObj instanceof File || file.originFileObj instanceof Blob) &&
        file.thumbUrl === undefined
      ) {
        file.thumbUrl = '';
        if (previewFile) {
          previewFile(file.originFileObj).then((thumbUrl) => {
            file.thumbUrl = thumbUrl || '';
            forceUpdate();
          });
        }
      }
    });
  }, [listType, items, previewFile]);

  useEffect(() => {
    setMotionAppear(true);
  }, []);

  const handlePreview = (file: UploadFile, event: React.MouseEvent): void => {
    if (!onPreview) {
      return;
    }
    event.preventDefault();
    onPreview(file);
  };

  const handleDownload = (file: UploadFile): void => {
    if (typeof onDownload === 'function') {
      onDownload(file);
    } else if (file.url) {
      window.open(file.url);
    }
  };

  const handleClose = (file: UploadFile): void => {
    if (onRemove) {
      onRemove(file);
    }
  };

  const renderIcon = (file: UploadFile): React.ReactNode => {
    if (iconRender) {
      return iconRender(file, listType);
    }

    const isUploading = file.status === 'uploading';
    const isImageFile = isImageUrlProp && isImageUrlProp(file);
    const defaultIcon = isImageFile ? <PictureOutlined /> : <PaperClipOutlined />;
    const uploadingIcon = <LoadingOutlined />;

    if (listType === 'picture') {
      return isUploading ? <LoadingOutlined /> : defaultIcon;
    }

    if (listType === 'picture-card') {
      return isUploading ? locale.uploading : defaultIcon;
    }

    return isUploading ? uploadingIcon : <PaperClipOutlined />;
  };

  const renderActionIcon = (
    icon: React.ReactNode,
    callback: () => void,
    prefixCls: string,
    title: string
  ): React.ReactElement => {
    const buttonProps = {
      type: 'text' as const,
      size: 'small' as const,
      title,
      onClick: (event: React.MouseEvent) => {
        callback();
        if (isValidElement(icon) && icon.props.onClick) {
          icon.props.onClick(event);
        }
      },
      className: `${prefixCls}-list-item-card-actions-btn`
    };

    if (isValidElement(icon)) {
      const clonedIcon = cloneElement(icon, {
        ...icon.props,
        onClick: () => {}
      });
      return <Button {...buttonProps} icon={clonedIcon} />;
    }

    return (
      <Button {...buttonProps}>
        <span>{icon}</span>
      </Button>
    );
  };

  useImperativeHandle(ref, () => ({
    handlePreview,
    handleDownload
  }));

  const { getPrefixCls, direction } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('upload', customPrefixCls);

  const listClassNames = classNames({
    [`${prefixCls}-list`]: true,
    [`${prefixCls}-list-${listType}`]: true,
    [`${prefixCls}-list-rtl`]: direction === 'rtl'
  });

  const motionKeys = items.map((file) => ({
    key: file.uid,
    file
  }));

  const animationType = listType === 'picture-card' ? 'animate-inline' : 'animate';

  let motionConfig: Record<string, unknown> = {
    motionName: `${prefixCls}-${animationType}`,
    keys: motionKeys,
    motionAppear
  };

  if (listType !== 'picture-card') {
    motionConfig = {
      ...MOTION_CONFIG,
      ...motionConfig
    };
  }

  return (
    <div className={listClassNames}>
      <CSSMotionList {...motionConfig} component={false}>
        {({ key, file, className, style }) => (
          <ListItem
            key={key}
            locale={locale}
            prefixCls={prefixCls}
            className={className}
            style={style}
            file={file}
            items={items}
            progress={progress}
            listType={listType}
            isImgUrl={isImageUrlProp}
            showPreviewIcon={showPreviewIcon}
            showRemoveIcon={showRemoveIcon}
            showDownloadIcon={showDownloadIcon}
            removeIcon={removeIcon}
            downloadIcon={downloadIcon}
            iconRender={renderIcon}
            actionIconRender={renderActionIcon}
            itemRender={itemRender}
            onPreview={handlePreview}
            onDownload={handleDownload}
            onClose={handleClose}
          />
        )}
      </CSSMotionList>
      {appendAction && (
        <CSSMotion {...motionConfig}>
          {({ className, style }) =>
            cloneElement(appendAction, {
              className: classNames(appendAction.props.className, className),
              style: {
                ...style,
                ...appendAction.props.style
              }
            })
          }
        </CSSMotion>
      )}
    </div>
  );
});

UploadList.displayName = 'UploadList';

export default UploadList;