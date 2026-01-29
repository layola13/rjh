import React, { CSSProperties, ReactNode, useContext } from 'react';
import { ConfigContext } from './ConfigContext';
import classNames from 'classnames';
import DefaultImage from './DefaultImage';
import SimpleImage from './SimpleImage';
import LocaleReceiver from './LocaleReceiver';

interface EmptyProps {
  className?: string;
  prefixCls?: string;
  image?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  imageStyle?: CSSProperties;
  [key: string]: unknown;
}

interface LocaleData {
  description?: string;
}

const PRESENTED_IMAGE_DEFAULT = React.createElement(DefaultImage, null);
const PRESENTED_IMAGE_SIMPLE = React.createElement(SimpleImage, null);

const Empty: React.FC<EmptyProps> & {
  PRESENTED_IMAGE_DEFAULT: ReactNode;
  PRESENTED_IMAGE_SIMPLE: ReactNode;
} = (props) => {
  const {
    className,
    prefixCls,
    image = PRESENTED_IMAGE_DEFAULT,
    description,
    children,
    imageStyle,
    ...restProps
  } = props;

  const { getPrefixCls, direction } = useContext(ConfigContext);

  return React.createElement(
    LocaleReceiver,
    { componentName: 'Empty' },
    (locale: LocaleData) => {
      const emptyPrefixCls = getPrefixCls('empty', prefixCls);
      const descriptionContent = description !== undefined ? description : locale.description;
      const altText = typeof descriptionContent === 'string' ? descriptionContent : 'empty';

      let imageNode: ReactNode = null;
      if (typeof image === 'string') {
        imageNode = React.createElement('img', {
          alt: altText,
          src: image,
        });
      } else {
        imageNode = image;
      }

      const emptyClassName = classNames(
        emptyPrefixCls,
        {
          [`${emptyPrefixCls}-normal`]: image === PRESENTED_IMAGE_SIMPLE,
          [`${emptyPrefixCls}-rtl`]: direction === 'rtl',
        },
        className
      );

      return React.createElement(
        'div',
        { className: emptyClassName, ...restProps },
        React.createElement(
          'div',
          { className: `${emptyPrefixCls}-image`, style: imageStyle },
          imageNode
        ),
        descriptionContent &&
          React.createElement(
            'div',
            { className: `${emptyPrefixCls}-description` },
            descriptionContent
          ),
        children &&
          React.createElement(
            'div',
            { className: `${emptyPrefixCls}-footer` },
            children
          )
      );
    }
  );
};

Empty.PRESENTED_IMAGE_DEFAULT = PRESENTED_IMAGE_DEFAULT;
Empty.PRESENTED_IMAGE_SIMPLE = PRESENTED_IMAGE_SIMPLE;

export default Empty;