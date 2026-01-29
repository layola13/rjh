import React, { useContext, useEffect, ReactNode, CSSProperties } from 'react';
import CheckCircleFilled from './CheckCircleFilled';
import ExclamationCircleFilled from './ExclamationCircleFilled';
import CloseCircleFilled from './CloseCircleFilled';
import LoadingOutlined from './LoadingOutlined';
import Col from './Col';
import ErrorList from './ErrorList';
import { FormContext, FormItemPrefixContext } from './context';

type ValidateStatus = 'success' | 'warning' | 'error' | 'validating';

interface ColProps {
  className?: string;
  span?: number;
  offset?: number;
  style?: CSSProperties;
}

interface InternalItemRender {
  mark?: string;
  render?: (props: FormItemControlProps, nodes: { input: ReactNode; errorList: ReactNode; extra: ReactNode }) => ReactNode;
}

interface FormItemControlProps {
  prefixCls: string;
  status?: string;
  wrapperCol?: ColProps;
  children?: ReactNode;
  help?: ReactNode;
  errors?: ReactNode[];
  onDomErrorVisibleChange: (visible: boolean) => void;
  hasFeedback?: boolean;
  _internalItemRender?: InternalItemRender;
  validateStatus?: ValidateStatus;
  extra?: ReactNode;
}

const STATUS_ICON_MAP: Record<ValidateStatus, React.ComponentType> = {
  success: CheckCircleFilled,
  warning: ExclamationCircleFilled,
  error: CloseCircleFilled,
  validating: LoadingOutlined,
};

const FormItemControl: React.FC<FormItemControlProps> = (props) => {
  const {
    prefixCls,
    status,
    wrapperCol,
    children,
    help,
    errors,
    onDomErrorVisibleChange,
    hasFeedback,
    _internalItemRender,
    validateStatus,
    extra,
  } = props;

  const itemClassName = `${prefixCls}-item`;
  const formContext = useContext(FormContext);
  const mergedWrapperCol = wrapperCol || formContext.wrapperCol || {};
  const controlClassName = `${itemClassName}-control ${mergedWrapperCol.className || ''}`.trim();

  useEffect(() => {
    return () => {
      onDomErrorVisibleChange(false);
    };
  }, []);

  const StatusIcon = validateStatus ? STATUS_ICON_MAP[validateStatus] : null;
  const iconNode = hasFeedback && StatusIcon ? (
    <span className={`${itemClassName}-children-icon`}>
      <StatusIcon />
    </span>
  ) : null;

  const contextValue = { ...formContext };
  delete contextValue.labelCol;
  delete contextValue.wrapperCol;

  const inputNode = (
    <div className={`${itemClassName}-control-input`}>
      <div className={`${itemClassName}-control-input-content`}>
        {children}
      </div>
      {iconNode}
    </div>
  );

  const errorListNode = (
    <FormItemPrefixContext.Provider value={{ prefixCls, status }}>
      <ErrorList
        errors={errors}
        help={help}
        onDomErrorVisibleChange={onDomErrorVisibleChange}
      />
    </FormItemPrefixContext.Provider>
  );

  const extraNode = extra ? (
    <div className={`${itemClassName}-extra`}>
      {extra}
    </div>
  ) : null;

  const contentNode =
    _internalItemRender?.mark === 'pro_table_render' && _internalItemRender.render
      ? _internalItemRender.render(props, {
          input: inputNode,
          errorList: errorListNode,
          extra: extraNode,
        })
      : (
          <>
            {inputNode}
            {errorListNode}
            {extraNode}
          </>
        );

  return (
    <FormContext.Provider value={contextValue}>
      <Col {...mergedWrapperCol} className={controlClassName}>
        {contentNode}
      </Col>
    </FormContext.Provider>
  );
};

export default FormItemControl;