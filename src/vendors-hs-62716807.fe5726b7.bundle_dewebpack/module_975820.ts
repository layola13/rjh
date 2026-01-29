import React, { useContext, ReactNode, MouseEvent, CSSProperties } from 'react';
import classNames from 'classnames';
import Button from '../button';
import RcDialog from 'rc-dialog';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { getConfirmLocale } from '../locale/utils';
import { convertLegacyProps } from '../button/buttonHelpers';
import { ConfigContext } from '../config-provider/context';
import useModal from './useModal';

interface ButtonProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
  [key: string]: any;
}

interface ModalProps {
  prefixCls?: string;
  footer?: ReactNode;
  visible?: boolean;
  wrapClassName?: string;
  centered?: boolean;
  getContainer?: HTMLElement | (() => HTMLElement) | false;
  closeIcon?: ReactNode;
  focusTriggerAfterClose?: boolean;
  onCancel?: (e: MouseEvent<HTMLButtonElement>) => void;
  onOk?: (e: MouseEvent<HTMLButtonElement>) => void;
  okText?: ReactNode;
  okType?: 'primary' | 'default' | 'dashed' | 'text' | 'link';
  cancelText?: ReactNode;
  confirmLoading?: boolean;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  width?: number | string;
  transitionName?: string;
  maskTransitionName?: string;
  [key: string]: any;
}

interface MousePosition {
  x: number;
  y: number;
}

interface LocaleData {
  okText: string;
  cancelText: string;
}

interface ModalComponent extends React.FC<ModalProps> {
  useModal: typeof useModal;
  defaultProps?: Partial<ModalProps>;
}

export const destroyFns: Array<() => void> = [];

let mousePosition: MousePosition | null = null;

if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
  document.documentElement.addEventListener(
    'click',
    (event: MouseEvent) => {
      mousePosition = {
        x: event.pageX,
        y: event.pageY
      };
      setTimeout(() => {
        mousePosition = null;
      }, 100);
    },
    true
  );
}

const Modal: ModalComponent = (props: ModalProps) => {
  const {
    getPopupContainer,
    getPrefixCls,
    direction
  } = useContext(ConfigContext);

  const handleCancel = (event: MouseEvent<HTMLButtonElement>): void => {
    const { onCancel } = props;
    onCancel?.(event);
  };

  const handleOk = (event: MouseEvent<HTMLButtonElement>): void => {
    const { onOk } = props;
    onOk?.(event);
  };

  const renderFooter = (locale: LocaleData): ReactNode => {
    const {
      okText,
      okType,
      cancelText,
      confirmLoading,
      cancelButtonProps,
      okButtonProps
    } = props;

    return (
      <React.Fragment>
        <Button
          onClick={handleCancel}
          {...cancelButtonProps}
        >
          {cancelText || locale.cancelText}
        </Button>
        <Button
          {...convertLegacyProps(okType)}
          loading={confirmLoading}
          onClick={handleOk}
          {...okButtonProps}
        >
          {okText || locale.okText}
        </Button>
      </React.Fragment>
    );
  };

  const {
    prefixCls: customizePrefixCls,
    footer,
    visible,
    wrapClassName,
    centered,
    getContainer,
    closeIcon,
    focusTriggerAfterClose = true,
    ...restProps
  } = props;

  const prefixCls = getPrefixCls('modal', customizePrefixCls);

  const footerNode = (
    <LocaleReceiver
      componentName="Modal"
      defaultLocale={getConfirmLocale()}
    >
      {renderFooter}
    </LocaleReceiver>
  );

  const closeIconNode = (
    <span className={`${prefixCls}-close-x`}>
      {closeIcon || <CloseOutlined className={`${prefixCls}-close-icon`} />}
    </span>
  );

  const wrapClassNameMerged = classNames(wrapClassName, {
    [`${prefixCls}-centered`]: !!centered,
    [`${prefixCls}-wrap-rtl`]: direction === 'rtl'
  });

  return (
    <RcDialog
      {...restProps}
      getContainer={getContainer === undefined ? getPopupContainer : getContainer}
      prefixCls={prefixCls}
      wrapClassName={wrapClassNameMerged}
      footer={footer === undefined ? footerNode : footer}
      visible={visible}
      mousePosition={mousePosition}
      onClose={handleCancel}
      closeIcon={closeIconNode}
      focusTriggerAfterClose={focusTriggerAfterClose}
    />
  );
};

Modal.useModal = useModal;

Modal.defaultProps = {
  width: 520,
  transitionName: 'zoom',
  maskTransitionName: 'fade',
  confirmLoading: false,
  visible: false,
  okType: 'primary'
};

export default Modal;