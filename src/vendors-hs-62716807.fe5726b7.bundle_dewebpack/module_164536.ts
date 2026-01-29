import type { UploadProps, UploadFile, UploadListType, UploadChangeParam, RcFile, ShowUploadListInterface, UploadLocale, ItemRender } from './interface';
import type { ProgressProps } from '../progress';
import { useState, useEffect, useRef, useContext, useImperativeHandle, forwardRef, createElement as h, type ForwardRefRenderFunction, type RefObject } from 'react';
import classNames from 'classnames';
import RcUpload from 'rc-upload';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import Dragger from './Dragger';
import UploadList from './UploadList';
import { fileToObject, getFileItem, removeFileItem, T as defaultBeforeUpload } from './utils';
import { ConfigContext } from '../config-provider';
import useForceUpdate from '../_util/hooks/useForceUpdate';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale/default';
import warning from '../_util/warning';

type DragState = 'drop' | 'dragover' | 'dragleave';

export interface InternalUploadProps extends UploadProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface UploadRef {
  onStart: (file: RcFile) => void;
  onSuccess: (response: unknown, file: RcFile, xhr?: XMLHttpRequest) => void;
  onProgress: (event: { percent: number }, file: RcFile) => void;
  onError: (error: Error, response: unknown, file: RcFile) => void;
  fileList: UploadFile[];
  upload: RefObject<any>;
  forceUpdate: () => void;
}

const InternalUpload: ForwardRefRenderFunction<UploadRef, InternalUploadProps> = (props, ref) => {
  const {
    fileList,
    defaultFileList,
    onRemove,
    showUploadList,
    listType,
    onPreview,
    onDownload,
    onChange,
    previewFile,
    disabled,
    locale,
    iconRender,
    isImageUrl,
    progress,
    prefixCls: customizePrefixCls,
    className,
    type,
    children,
    style,
    itemRender,
    maxCount,
  } = props;

  const [dragState, setDragState] = useState<DragState>('drop');
  const forceUpdate = useForceUpdate();
  const [mergedFileList, setMergedFileList] = useMergedState<UploadFile[]>(
    fileList || defaultFileList || [],
    fileList
  );
  const uploadRef = useRef<any>();

  useEffect(() => {
    warning(
      'fileList' in props || !('value' in props),
      'Upload',
      '`value` is not a valid prop, do you mean `fileList`?'
    );
    warning(
      !('transformFile' in props),
      'Upload',
      '`transformFile` is deprecated. Please use `beforeUpload` directly.'
    );
  }, []);

  useEffect(() => {
    const timestamp = Date.now();
    (fileList || []).forEach((file, index) => {
      file.uid = file.uid ?? `__AUTO__${timestamp}_${index}__`;
    });
  }, [fileList]);

  const triggerChange = (changeParam: UploadChangeParam) => {
    let clonedFileList = [...changeParam.fileList];
    if (maxCount === 1) {
      clonedFileList = clonedFileList.slice(-1);
    } else if (maxCount) {
      clonedFileList = clonedFileList.slice(0, maxCount);
    }
    setMergedFileList(clonedFileList);
    onChange?.({
      ...changeParam,
      fileList: clonedFileList,
    });
  };

  const onStart = (file: RcFile): void => {
    const targetItem = fileToObject(file);
    targetItem.status = 'uploading';

    const nextFileList = [...mergedFileList];
    const fileIndex = nextFileList.findIndex(({ uid }) => uid === targetItem.uid);

    if (fileIndex === -1) {
      nextFileList.push(targetItem);
    } else {
      nextFileList[fileIndex] = targetItem;
    }

    triggerChange({
      file: targetItem,
      fileList: nextFileList,
    });
  };

  const onSuccess = (response: unknown, file: RcFile, xhr?: XMLHttpRequest): void => {
    let parsedResponse = response;
    try {
      if (typeof response === 'string') {
        parsedResponse = JSON.parse(response);
      }
    } catch (error) {
      // ignore parse error
    }

    const targetItem = getFileItem(file, mergedFileList);
    if (targetItem) {
      targetItem.status = 'done';
      targetItem.response = parsedResponse;
      targetItem.xhr = xhr;

      triggerChange({
        file: { ...targetItem },
        fileList: [...mergedFileList],
      });
    }
  };

  const onProgress = (event: { percent: number }, file: RcFile): void => {
    const targetItem = getFileItem(file, mergedFileList);
    if (targetItem) {
      targetItem.percent = event.percent;
      triggerChange({
        event,
        file: { ...targetItem },
        fileList: [...mergedFileList],
      });
    }
  };

  const onError = (error: Error, response: unknown, file: RcFile): void => {
    const targetItem = getFileItem(file, mergedFileList);
    if (targetItem) {
      targetItem.error = error;
      targetItem.response = response;
      targetItem.status = 'error';

      triggerChange({
        file: { ...targetItem },
        fileList: [...mergedFileList],
      });
    }
  };

  const handleRemove = (file: UploadFile): void => {
    let removedFile: UploadFile | undefined;

    Promise.resolve(typeof onRemove === 'function' ? onRemove(file) : onRemove).then(
      (shouldRemove) => {
        if (shouldRemove === false) {
          return;
        }

        const currentFileList = [...mergedFileList];
        const removedFileList = removeFileItem(file, currentFileList);

        if (removedFileList) {
          removedFile = {
            ...file,
            status: 'removed',
          };

          currentFileList.forEach((item) => {
            const key = removedFile!.uid !== undefined ? 'uid' : 'name';
            if (item[key] === removedFile![key]) {
              item.status = 'removed';
            }
          });

          uploadRef.current?.abort(removedFile);

          triggerChange({
            file: removedFile,
            fileList: removedFileList,
          });
        }
      }
    );
  };

  const onFileDrop = (event: React.DragEvent): void => {
    setDragState(event.type as DragState);
  };

  useImperativeHandle(ref, () => ({
    onStart,
    onSuccess,
    onProgress,
    onError,
    fileList: mergedFileList,
    upload: uploadRef.current,
    forceUpdate,
  }));

  const { getPrefixCls, direction } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('upload', customizePrefixCls);

  const rcUploadProps = {
    ...props,
    prefixCls,
    onStart,
    onError,
    onProgress,
    onSuccess,
    beforeUpload: (file: RcFile, fileListParam: RcFile[]) => {
      const { beforeUpload } = props;
      if (!beforeUpload) {
        return true;
      }

      const result = beforeUpload(file, fileListParam);

      if (result === false) {
        const uniqueList: UploadFile[] = [];
        [...mergedFileList, ...fileListParam.map(fileToObject)].forEach((item) => {
          if (uniqueList.every((uniqueFile) => uniqueFile.uid !== item.uid)) {
            uniqueList.push(item);
          }
        });

        triggerChange({
          file,
          fileList: uniqueList,
        });
        return false;
      }

      return !result || !result.then ? result : result;
    },
    onChange: undefined,
  };

  delete rcUploadProps.className;
  delete rcUploadProps.style;

  if (children && !disabled) {
    // keep id for accessibility
  } else {
    delete rcUploadProps.id;
  }

  const renderUploadList = (button?: React.ReactNode): React.ReactNode => {
    if (!showUploadList) {
      return button;
    }

    return h(LocaleReceiver, {
      componentName: 'Upload',
      defaultLocale: defaultLocale.Upload,
    }, (uploadLocale: UploadLocale) => {
      const listProps = typeof showUploadList === 'boolean' ? {} : showUploadList;
      const {
        showRemoveIcon,
        showPreviewIcon,
        showDownloadIcon,
        removeIcon,
        downloadIcon,
      } = listProps as ShowUploadListInterface;

      return h(UploadList, {
        listType,
        items: mergedFileList,
        previewFile,
        onPreview,
        onDownload,
        onRemove: handleRemove,
        showRemoveIcon: !disabled && showRemoveIcon,
        showPreviewIcon,
        showDownloadIcon,
        removeIcon,
        downloadIcon,
        iconRender,
        locale: { ...uploadLocale, ...locale },
        isImageUrl,
        progress,
        appendAction: button,
        itemRender,
      });
    });
  };

  if (type === 'drag') {
    const dragCls = classNames(
      prefixCls,
      {
        [`${prefixCls}-drag`]: true,
        [`${prefixCls}-drag-uploading`]: mergedFileList.some((file) => file.status === 'uploading'),
        [`${prefixCls}-drag-hover`]: dragState === 'dragover',
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-rtl`]: direction === 'rtl',
      },
      className
    );

    return h('span', null,
      h('div', {
        className: dragCls,
        onDrop: onFileDrop,
        onDragOver: onFileDrop,
        onDragLeave: onFileDrop,
        style,
      },
        h(RcUpload, {
          ...rcUploadProps,
          ref: uploadRef,
          className: `${prefixCls}-btn`,
        },
          h('div', { className: `${prefixCls}-drag-container` }, children)
        )
      ),
      renderUploadList()
    );
  }

  const uploadButtonCls = classNames(prefixCls, {
    [`${prefixCls}-select`]: true,
    [`${prefixCls}-select-${listType}`]: true,
    [`${prefixCls}-disabled`]: disabled,
    [`${prefixCls}-rtl`]: direction === 'rtl',
  });

  const uploadButton = h('div', {
    className: uploadButtonCls,
    style: children ? undefined : { display: 'none' },
  },
    h(RcUpload, {
      ...rcUploadProps,
      ref: uploadRef,
    })
  );

  if (listType === 'picture-card') {
    return h('span', {
      className: classNames(`${prefixCls}-picture-card-wrapper`, className),
    }, renderUploadList(uploadButton));
  }

  return h('span', { className },
    uploadButton,
    renderUploadList()
  );
};

const Upload = forwardRef<UploadRef, InternalUploadProps>(InternalUpload);

Upload.displayName = 'Upload';

type CompoundedComponent = typeof Upload & {
  Dragger: typeof Dragger;
  defaultProps?: Partial<UploadProps>;
};

(Upload as CompoundedComponent).Dragger = Dragger;

(Upload as CompoundedComponent).defaultProps = {
  type: 'select',
  multiple: false,
  action: '',
  data: {},
  accept: '',
  beforeUpload: defaultBeforeUpload,
  showUploadList: true,
  listType: 'text',
  className: '',
  disabled: false,
  supportServerRender: true,
};

export default Upload as CompoundedComponent;