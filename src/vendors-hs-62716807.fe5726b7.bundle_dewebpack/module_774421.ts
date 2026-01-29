import React from 'react';
import classNames from 'classnames';
import { ConfigConsumer } from './ConfigContext';

interface CardMetaProps {
  prefixCls?: string;
  className?: string;
  avatar?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: any;
}

interface ConfigConsumerProps {
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => string;
}

const CardMeta: React.FC<CardMetaProps> = (props) => {
  return (
    <ConfigConsumer>
      {(config: ConfigConsumerProps) => {
        const { getPrefixCls } = config;
        const {
          prefixCls: customizePrefixCls,
          className,
          avatar,
          title,
          description,
          ...restProps
        } = props;

        const prefixCls = getPrefixCls('card', customizePrefixCls);
        const metaClassName = classNames(`${prefixCls}-meta`, className);

        const avatarElement = avatar ? (
          <div className={`${prefixCls}-meta-avatar`}>{avatar}</div>
        ) : null;

        const titleElement = title ? (
          <div className={`${prefixCls}-meta-title`}>{title}</div>
        ) : null;

        const descriptionElement = description ? (
          <div className={`${prefixCls}-meta-description`}>{description}</div>
        ) : null;

        const detailElement = titleElement || descriptionElement ? (
          <div className={`${prefixCls}-meta-detail`}>
            {titleElement}
            {descriptionElement}
          </div>
        ) : null;

        return (
          <div {...restProps} className={metaClassName}>
            {avatarElement}
            {detailElement}
          </div>
        );
      }}
    </ConfigConsumer>
  );
};

export default CardMeta;