import React, { useContext, useEffect, useState } from 'react';
import CSSMotion from './CSSMotion';
import { FormItemPrefixContext } from './FormItemContext';
import useForceUpdate from './useForceUpdate';
import useDebounce from './useDebounce';
import useMemo from './useMemo';
import classNames from 'classnames';

interface ErrorListProps {
  errors?: React.ReactNode[];
  help?: React.ReactNode;
  onDomErrorVisibleChange?: (visible: boolean) => void;
}

interface FormItemPrefixContextValue {
  prefixCls: string;
  status?: 'error' | 'warning' | 'success' | 'validating';
}

const DEFAULT_ERRORS: React.ReactNode[] = [];

const ErrorList: React.FC<ErrorListProps> = (props) => {
  const {
    errors = DEFAULT_ERRORS,
    help,
    onDomErrorVisibleChange,
  } = props;

  const forceUpdate = useForceUpdate();
  const { prefixCls, status } = useContext<FormItemPrefixContextValue>(FormItemPrefixContext);

  const debounceErrors = useDebounce(
    errors,
    (hasErrors: boolean) => {
      if (hasErrors) {
        Promise.resolve().then(() => {
          onDomErrorVisibleChange?.(true);
        });
      }
      forceUpdate();
    },
    !!help
  );

  const [memoErrors, setMemoErrors] = debounceErrors;

  const finalErrors = useMemo<React.ReactNode[]>(
    () => setMemoErrors,
    memoErrors,
    (_prev: React.ReactNode[], next: React.ReactNode[]) => next
  );

  const [prevStatus, setPrevStatus] = useState<FormItemPrefixContextValue['status']>(status);

  useEffect(() => {
    if (memoErrors && status) {
      setPrevStatus(status);
    }
  }, [memoErrors, status]);

  const errorClassName = `${prefixCls}-item-explain`;

  return (
    <CSSMotion
      motionDeadline={500}
      visible={memoErrors}
      motionName="show-help"
      onLeaveEnd={() => {
        onDomErrorVisibleChange?.(false);
      }}
      motionAppear={true}
      removeOnLeave={true}
    >
      {({ className: motionClassName }: { className?: string }) => (
        <div
          className={classNames(
            errorClassName,
            {
              [`${errorClassName}-${prevStatus}`]: prevStatus,
            },
            motionClassName
          )}
          key="help"
        >
          {finalErrors.map((error, index) => (
            <div key={index} role="alert">
              {error}
            </div>
          ))}
        </div>
      )}
    </CSSMotion>
  );
};

export default ErrorList;