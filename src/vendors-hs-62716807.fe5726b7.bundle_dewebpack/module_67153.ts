import React, { forwardRef, useEffect, ReactNode, ReactElement, ForwardedRef } from 'react';
import classNames from 'classnames';
import Select from 'antd/lib/select';
import { ConfigConsumer } from 'antd/lib/config-provider/context';
import omit from 'rc-util/lib/omit';
import toArray from 'rc-util/lib/Children/toArray';
import warning from 'antd/lib/_util/warning';
import { isValidElement } from 'react';

const { Option } = Select;

interface DataSourceItemObject {
  value: string;
  text: string;
}

type DataSourceItemType = string | DataSourceItemObject;

interface AutoCompleteProps {
  prefixCls?: string;
  className?: string;
  children?: ReactNode;
  dataSource?: DataSourceItemType[];
  size?: 'small' | 'middle' | 'large';
  [key: string]: unknown;
}

function isSelectOptionOrOptGroup(element: ReactElement): boolean {
  return element && element.type && (element.type.isSelectOption || element.type.isSelectOptGroup);
}

const InternalAutoComplete = (props: AutoCompleteProps, ref: ForwardedRef<unknown>) => {
  const { prefixCls, className, children, dataSource } = props;
  
  const childrenArray = toArray(children);
  
  let customizeInput: ReactElement | undefined;
  if (childrenArray.length === 1 && isValidElement(childrenArray[0]) && !isSelectOptionOrOptGroup(childrenArray[0])) {
    customizeInput = childrenArray[0];
  }
  
  const getInputElement = customizeInput ? () => customizeInput : undefined;
  
  let options: ReactNode;
  if (childrenArray.length && isSelectOptionOrOptGroup(childrenArray[0])) {
    options = children;
  } else if (dataSource) {
    options = dataSource.map((item: DataSourceItemType) => {
      if (isValidElement(item)) {
        return item;
      }
      
      if (typeof item === 'string') {
        return (
          <Option key={item} value={item}>
            {item}
          </Option>
        );
      }
      
      if (typeof item === 'object') {
        const { value, text } = item as DataSourceItemObject;
        return (
          <Option key={value} value={value}>
            {text}
          </Option>
        );
      }
      
      throw new Error('AutoComplete[dataSource] only supports type `string[] | Object[]`.');
    });
  } else {
    options = [];
  }
  
  useEffect(() => {
    warning(
      !('dataSource' in props),
      'AutoComplete',
      '`dataSource` is deprecated, please use `options` instead.'
    );
    
    warning(
      !customizeInput || !('size' in props),
      'AutoComplete',
      'You need to control style self instead of setting `size` when using customize input.'
    );
  }, []);
  
  return (
    <ConfigConsumer>
      {({ getPrefixCls }) => {
        const selectPrefixCls = getPrefixCls('select', prefixCls);
        
        return (
          <Select
            ref={ref}
            {...omit(props, ['dataSource'])}
            prefixCls={selectPrefixCls}
            className={classNames(`${selectPrefixCls}-auto-complete`, className)}
            mode={Select.SECRET_COMBOBOX_MODE_DO_NOT_USE}
            getInputElement={getInputElement}
          >
            {options}
          </Select>
        );
      }}
    </ConfigConsumer>
  );
};

const AutoComplete = forwardRef(InternalAutoComplete);

AutoComplete.Option = Option;

export default AutoComplete;