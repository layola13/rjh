import React, { useState, useRef, useContext, forwardRef } from 'react';
import RcMentions from 'rc-mentions';
import classNames from 'classnames';
import Spin from '../spin';
import { ConfigContext } from '../config-provider';
import { composeRef } from '../_util/ref';

const { Option: RcOption } = RcMentions;

export const Option = RcOption;

interface MentionEntity {
  prefix: string;
  value: string;
}

interface GetMentionsConfig {
  prefix?: string | string[];
  split?: string;
}

export interface MentionsProps {
  prefixCls?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  filterOption?: boolean | ((input: string, option: any) => boolean);
  children?: React.ReactNode;
  notFoundContent?: React.ReactNode;
  direction?: 'ltr' | 'rtl';
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  [key: string]: any;
}

function defaultFilterOption(): boolean {
  return true;
}

const InternalMentions = (props: MentionsProps, ref: React.Ref<any>) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    disabled,
    loading,
    filterOption,
    children,
    notFoundContent,
    ...restProps
  } = props;

  const [focused, setFocused] = useState<boolean>(false);
  const mentionsRef = useRef<any>();
  const mergedRef = composeRef(ref, mentionsRef);

  const { getPrefixCls, renderEmpty, direction } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('mentions', customizePrefixCls);

  const mergedClassName = classNames(
    {
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-focused`]: focused,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className
  );

  const handleFocus: React.FocusEventHandler<HTMLTextAreaElement> = (...args) => {
    if (restProps.onFocus) {
      restProps.onFocus(...args);
    }
    setFocused(true);
  };

  const handleBlur: React.FocusEventHandler<HTMLTextAreaElement> = (...args) => {
    if (restProps.onBlur) {
      restProps.onBlur(...args);
    }
    setFocused(false);
  };

  const mergedNotFoundContent = notFoundContent !== undefined 
    ? notFoundContent 
    : renderEmpty('Select');

  const mergedFilterOption = loading ? defaultFilterOption : filterOption;

  return (
    <RcMentions
      prefixCls={prefixCls}
      notFoundContent={mergedNotFoundContent}
      className={mergedClassName}
      disabled={disabled}
      direction={direction}
      {...restProps}
      filterOption={mergedFilterOption}
      onFocus={handleFocus}
      onBlur={handleBlur}
      ref={mergedRef}
    >
      {loading ? (
        <Option value="ANTD_SEARCHING" disabled>
          <Spin size="small" />
        </Option>
      ) : (
        children
      )}
    </RcMentions>
  );
};

const Mentions = forwardRef<any, MentionsProps>(InternalMentions);

Mentions.displayName = 'Mentions';
Mentions.Option = Option;

Mentions.getMentions = (
  value: string = '',
  config: GetMentionsConfig = {}
): MentionEntity[] => {
  const { prefix = '@', split = ' ' } = config;
  const prefixList = Array.isArray(prefix) ? prefix : [prefix];

  return value
    .split(split)
    .map((segment: string = '') => {
      let detectedPrefix: string | null = null;

      prefixList.some((prefixItem) => {
        if (segment.slice(0, prefixItem.length) === prefixItem) {
          detectedPrefix = prefixItem;
          return true;
        }
        return false;
      });

      if (detectedPrefix !== null) {
        return {
          prefix: detectedPrefix,
          value: segment.slice(detectedPrefix.length),
        };
      }

      return null;
    })
    .filter((entity): entity is MentionEntity => !!entity && !!entity.value);
};

export default Mentions;