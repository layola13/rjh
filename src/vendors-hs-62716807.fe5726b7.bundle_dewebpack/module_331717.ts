import React, { CSSProperties, ReactNode, useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from './ConfigContext';
import LocaleReceiver from './LocaleReceiver';
import DefaultEmptyImage from './DefaultEmptyImage';
import SimpleEmptyImage from './SimpleEmptyImage';

interface EmptyProps {
  className?: string;
  prefixCls?: string;
  image?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  imageStyle?: CSSProperties;
  [key: string]: unknown;
}

interface EmptyLocale {
  description?: string;
}

const DEFAULT_IMAGE = React.createElement(DefaultEmptyImage, null);
const SIMPLE_IMAGE = React.createElement(SimpleEmptyImage, null);

const Empty: React.FC<EmptyProps> & {
  PRESENTED_IMAGE_DEFAULT: ReactNode;
  PRESENTED_IMAGE_SIMPLE: ReactNode;
} = (props) => {
  const {
    className,
    prefixCls,
    image = DEFAULT_IMAGE,
    description,
    children,
    imageStyle,
    ...restProps
  } = props;

  const { getPrefixCls, direction } = useContext(ConfigContext);

  return (
    <LocaleReceiver componentName="Empty">
      {(locale: EmptyLocale) => {
        const prefixClsValue = getPrefixCls('empty', prefixCls);
        const descriptionValue = description !== undefined ? description : locale.description;
        const altText = typeof descriptionValue === 'string' ? descriptionValue : 'empty';

        let imageNode: ReactNode = null;
        if (typeof image === 'string') {
          imageNode = <img alt={altText} src={image} />;
        } else {
          imageNode = image;
        }

        const emptyClassNames = classNames(
          prefixClsValue,
          {
            [`${prefixClsValue}-normal`]: image === SIMPLE_IMAGE,
            [`${prefixClsValue}-rtl`]: direction === 'rtl',
          },
          className
        );

        return (
          <div className={emptyClassNames} {...restProps}>
            <div className={`${prefixClsValue}-image`} style={imageStyle}>
              {imageNode}
            </div>
            {descriptionValue && (
              <div className={`${prefixClsValue}-description`}>
                {descriptionValue}
              </div>
            )}
            {children && (
              <div className={`${prefixClsValue}-footer`}>
                {children}
              </div>
            )}
          </div>
        );
      }}
    </LocaleReceiver>
  );
};

Empty.PRESENTED_IMAGE_DEFAULT = DEFAULT_IMAGE;
Empty.PRESENTED_IMAGE_SIMPLE = SIMPLE_IMAGE;

export default Empty;