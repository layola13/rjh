import React from 'react';
import classNames from 'classnames';
import Modal from './Modal';
import Button from './Button';
import { ConfigConsumer } from './ConfigProvider';
import { warning } from './utils';

interface ButtonProps {
  [key: string]: unknown;
}

interface ConfirmDialogProps {
  icon?: React.ReactNode;
  onCancel?: () => void;
  onOk?: () => void;
  close: (options: { triggerCancel?: boolean }) => void;
  zIndex?: number;
  afterClose?: () => void;
  visible?: boolean;
  keyboard?: boolean;
  centered?: boolean;
  getContainer?: false | HTMLElement | (() => HTMLElement);
  maskStyle?: React.CSSProperties;
  okText?: React.ReactNode;
  okButtonProps?: ButtonProps;
  cancelText?: React.ReactNode;
  cancelButtonProps?: ButtonProps;
  direction?: 'ltr' | 'rtl';
  prefixCls: string;
  rootPrefixCls?: string;
  bodyStyle?: React.CSSProperties;
  closable?: boolean;
  closeIcon?: React.ReactNode;
  modalRender?: (node: React.ReactNode) => React.ReactNode;
  focusTriggerAfterClose?: boolean;
  type?: 'info' | 'success' | 'error' | 'warn' | 'warning' | 'confirm';
  okType?: 'primary' | 'default' | 'dashed' | 'danger' | 'link' | 'text';
  okCancel?: boolean;
  width?: number | string;
  style?: React.CSSProperties;
  mask?: boolean;
  maskClosable?: boolean;
  autoFocusButton?: null | 'ok' | 'cancel';
  transitionName?: string;
  maskTransitionName?: string;
  className?: string;
  title?: React.ReactNode;
  content?: React.ReactNode;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
  const {
    icon,
    onCancel,
    onOk,
    close,
    zIndex,
    afterClose,
    visible,
    keyboard,
    centered,
    getContainer,
    maskStyle,
    okText,
    okButtonProps,
    cancelText,
    cancelButtonProps,
    direction,
    prefixCls,
    rootPrefixCls,
    bodyStyle,
    closable = false,
    closeIcon,
    modalRender,
    focusTriggerAfterClose,
    type,
    okType = 'primary',
    okCancel,
    width,
    style,
    mask,
    maskClosable,
    autoFocusButton,
    transitionName,
    maskTransitionName,
    className,
    title,
    content,
  } = props;

  warning(
    !(typeof icon === 'string' && icon.length > 2),
    'Modal',
    `\`icon\` is using ReactNode instead of string naming in v4. Please check \`${icon}\` at https://ant.design/components/icon`
  );

  const confirmPrefixCls = `${prefixCls}-confirm`;
  const shouldShowCancel = !('okCancel' in props) || okCancel;
  const modalWidth = width ?? 416;
  const modalStyle = style ?? {};
  const showMask = mask ?? true;
  const allowMaskClose = maskClosable ?? false;
  const focusButton = autoFocusButton ?? 'ok';
  const modalTransitionName = transitionName ?? 'zoom';
  const modalMaskTransitionName = maskTransitionName ?? 'fade';

  const modalClassNames = classNames(
    confirmPrefixCls,
    `${confirmPrefixCls}-${type}`,
    {
      [`${confirmPrefixCls}-rtl`]: direction === 'rtl',
    },
    className
  );

  const wrapClassNames = classNames({
    [`${confirmPrefixCls}-centered`]: !!centered,
  });

  const cancelButton = shouldShowCancel ? (
    <Button
      actionFn={onCancel}
      closeModal={close}
      autoFocus={focusButton === 'cancel'}
      buttonProps={cancelButtonProps}
      prefixCls={`${rootPrefixCls}-btn`}
    >
      {cancelText}
    </Button>
  ) : null;

  const handleCancel = () => {
    close({ triggerCancel: true });
  };

  return (
    <Modal
      prefixCls={prefixCls}
      className={modalClassNames}
      wrapClassName={wrapClassNames}
      onCancel={handleCancel}
      visible={visible}
      title=""
      transitionName={modalTransitionName}
      footer=""
      maskTransitionName={modalMaskTransitionName}
      mask={showMask}
      maskClosable={allowMaskClose}
      maskStyle={maskStyle}
      style={modalStyle}
      width={modalWidth}
      zIndex={zIndex}
      afterClose={afterClose}
      keyboard={keyboard}
      centered={centered}
      getContainer={getContainer}
      closable={closable}
      closeIcon={closeIcon}
      modalRender={modalRender}
      focusTriggerAfterClose={focusTriggerAfterClose}
    >
      <div className={`${confirmPrefixCls}-body-wrapper`}>
        <ConfigConsumer prefixCls={rootPrefixCls}>
          <div className={`${confirmPrefixCls}-body`} style={bodyStyle}>
            {icon}
            {title !== undefined ? (
              <span className={`${confirmPrefixCls}-title`}>{title}</span>
            ) : null}
            <div className={`${confirmPrefixCls}-content`}>{content}</div>
          </div>
        </ConfigConsumer>
        <div className={`${confirmPrefixCls}-btns`}>
          {cancelButton}
          <Button
            type={okType}
            actionFn={onOk}
            closeModal={close}
            autoFocus={focusButton === 'ok'}
            buttonProps={okButtonProps}
            prefixCls={`${rootPrefixCls}-btn`}
          >
            {okText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;