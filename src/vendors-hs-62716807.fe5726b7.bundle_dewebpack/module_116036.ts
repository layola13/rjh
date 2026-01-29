import React from 'react';
import Empty from './Empty';
import { ConfigConsumer } from './ConfigContext';

type ComponentType = 'Table' | 'List' | 'Select' | 'TreeSelect' | 'Cascader' | 'Transfer' | 'Mentions';

const renderEmpty = (componentType?: ComponentType): React.ReactElement => {
  return React.createElement(ConfigConsumer, null, (config) => {
    const prefixCls = config.getPrefixCls('empty');

    switch (componentType) {
      case 'Table':
      case 'List':
        return React.createElement(Empty, {
          image: Empty.PRESENTED_IMAGE_SIMPLE
        });

      case 'Select':
      case 'TreeSelect':
      case 'Cascader':
      case 'Transfer':
      case 'Mentions':
        return React.createElement(Empty, {
          image: Empty.PRESENTED_IMAGE_SIMPLE,
          className: `${prefixCls}-small`
        });

      default:
        return React.createElement(Empty, null);
    }
  });
};

export default renderEmpty;