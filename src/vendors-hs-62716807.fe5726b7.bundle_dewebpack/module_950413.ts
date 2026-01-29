import React, { useContext, CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import InfoCircleFilled from '@ant-design/icons/InfoCircleFilled';
import WarningFilled from '@ant-design/icons/WarningFilled';
import Image403 from './images/403';
import Image404 from './images/404';
import Image500 from './images/500';
import { ConfigContext } from '../config-provider';
import warning from '../_util/warning';

type StatusType = 'success' | 'error' | 'info' | 'warning' | '404' | '500' | '403';
type ExceptionStatusType = '404' | '500' | '403';

export const IconMap = {
  success: CheckCircleFilled,
  error: CloseCircleFilled,
  info: InfoCircleFilled,
  warning: WarningFilled,
};

export const ExceptionMap = {
  '404': Image404,
  '500': Image500,
  '403': Image403,
};

const exceptionStatusKeys = Object.keys(ExceptionMap) as ExceptionStatusType[];

interface ResultProps {
  prefixCls?: string;
  className?: string;
  subTitle?: ReactNode;
  title?: ReactNode;
  style?: CSSProperties;
  children?: ReactNode;
  status?: StatusType;
  icon?: ReactNode;
  extra?: ReactNode;
}

function renderIcon(
  prefixCls: string,
  props: { status: StatusType; icon?: ReactNode }
): ReactNode {
  const { status, icon } = props;
  const iconClassName = classNames(`${prefixCls}-icon`);

  warning(
    !(typeof icon === 'string' && icon.length > 2),
    'Result',
    `\`icon\` is using ReactNode instead of string naming in v4. Please check \`${icon}\` at https://ant.design/components/icon`
  );

  if (exceptionStatusKeys.includes(status as ExceptionStatusType)) {
    const ExceptionComponent = ExceptionMap[status as ExceptionStatusType];
    return (
      <div className={`${iconClassName} ${prefixCls}-image`}>
        <ExceptionComponent />
      </div>
    );
  }

  const IconComponent = IconMap[status as keyof typeof IconMap];
  const defaultIcon = <IconComponent />;

  return <div className={iconClassName}>{icon ?? defaultIcon}</div>;
}

function renderExtra(prefixCls: string, props: { extra?: ReactNode }): ReactNode {
  const { extra } = props;
  return extra ? <div className={`${prefixCls}-extra`}>{extra}</div> : null;
}

const Result: React.FC<ResultProps> & {
  PRESENTED_IMAGE_403: React.ComponentType;
  PRESENTED_IMAGE_404: React.ComponentType;
  PRESENTED_IMAGE_500: React.ComponentType;
} = (props) => {
  const {
    prefixCls: customPrefixCls,
    className,
    subTitle,
    title,
    style,
    children,
    status = 'info',
    icon,
    extra,
  } = props;

  const { getPrefixCls, direction } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('result', customPrefixCls);

  const resultClassName = classNames(
    prefixCls,
    `${prefixCls}-${status}`,
    className,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    }
  );

  return (
    <div className={resultClassName} style={style}>
      {renderIcon(prefixCls, { status, icon })}
      <div className={`${prefixCls}-title`}>{title}</div>
      {subTitle && <div className={`${prefixCls}-subtitle`}>{subTitle}</div>}
      {renderExtra(prefixCls, { extra })}
      {children && <div className={`${prefixCls}-content`}>{children}</div>}
    </div>
  );
};

Result.PRESENTED_IMAGE_403 = ExceptionMap['403'];
Result.PRESENTED_IMAGE_404 = ExceptionMap['404'];
Result.PRESENTED_IMAGE_500 = ExceptionMap['500'];

export default Result;