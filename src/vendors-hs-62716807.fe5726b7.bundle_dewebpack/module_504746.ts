import { useState, useContext, useImperativeHandle, forwardRef, ReactElement, ForwardRefRenderFunction } from 'react';
import ConfirmDialog from './ConfirmDialog';
import defaultLocale from './locale';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { ConfigContext } from '../config-provider/context';

interface ConfirmDialogConfig {
  onCancel?: () => void;
  okText?: string;
  okCancel?: boolean;
  cancelText?: string;
  [key: string]: any;
}

interface ConfirmProps {
  afterClose?: () => void;
  config: ConfirmDialogConfig;
}

interface ConfirmHandle {
  destroy: () => void;
  update: (newConfig: Partial<ConfirmDialogConfig>) => void;
}

interface CloseEventArgs {
  triggerCancel?: boolean;
}

interface LocaleData {
  okText: string;
  justOkText: string;
  cancelText: string;
}

const ConfirmDialogWrapper: ForwardRefRenderFunction<ConfirmHandle, ConfirmProps> = (props, ref) => {
  const { afterClose, config } = props;
  
  const [visible, setVisible] = useState<boolean>(true);
  const [dialogConfig, setDialogConfig] = useState<ConfirmDialogConfig>(config);
  
  const { direction, getPrefixCls } = useContext(ConfigContext);
  const modalPrefixCls = getPrefixCls('modal');
  const rootPrefixCls = getPrefixCls();

  function close(...args: CloseEventArgs[]): void {
    setVisible(false);
    
    const shouldTriggerCancel = args.some((arg) => arg?.triggerCancel);
    
    if (dialogConfig.onCancel && shouldTriggerCancel) {
      dialogConfig.onCancel();
    }
  }

  useImperativeHandle(ref, () => ({
    destroy: close,
    update: (newConfig: Partial<ConfirmDialogConfig>) => {
      setDialogConfig((prevConfig) => ({
        ...prevConfig,
        ...newConfig
      }));
    }
  }));

  return (
    <LocaleReceiver
      componentName="Modal"
      defaultLocale={defaultLocale.Modal}
    >
      {(locale: LocaleData): ReactElement => (
        <ConfirmDialog
          prefixCls={modalPrefixCls}
          rootPrefixCls={rootPrefixCls}
          {...dialogConfig}
          close={close}
          visible={visible}
          afterClose={afterClose}
          okText={dialogConfig.okText ?? (dialogConfig.okCancel ? locale.okText : locale.justOkText)}
          direction={direction}
          cancelText={dialogConfig.cancelText ?? locale.cancelText}
        />
      )}
    </LocaleReceiver>
  );
};

export default forwardRef(ConfirmDialogWrapper);