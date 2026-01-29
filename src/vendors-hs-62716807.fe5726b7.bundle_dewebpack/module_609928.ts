import React from 'react';
import classNames from 'classnames';
import { ConfigConsumer } from './ConfigContext';
import SkeletonButton from './Button';
import SkeletonAvatar from './Avatar';
import SkeletonInput from './Input';
import SkeletonImage from './Image';
import SkeletonTitle from './Title';
import SkeletonParagraph from './Paragraph';

interface AvatarProps {
  prefixCls?: string;
  size?: 'large' | 'small' | 'default' | number;
  shape?: 'circle' | 'square';
  active?: boolean;
}

interface TitleProps {
  prefixCls?: string;
  width?: string | number;
}

interface ParagraphProps {
  prefixCls?: string;
  rows?: number;
  width?: string | number | Array<string | number>;
}

interface SkeletonProps {
  prefixCls?: string;
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
  avatar?: boolean | AvatarProps;
  title?: boolean | TitleProps;
  paragraph?: boolean | ParagraphProps;
  active?: boolean;
  round?: boolean;
}

interface ConfigConsumerProps {
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => string;
  direction?: 'ltr' | 'rtl';
}

function normalizeProps<T>(value: boolean | T): T {
  return value && typeof value === 'object' ? value : ({} as T);
}

function getAvatarConfig(hasTitle: boolean, hasParagraph: boolean): Partial<AvatarProps> {
  if (hasTitle && !hasParagraph) {
    return {
      size: 'large',
      shape: 'square',
    };
  }
  return {
    size: 'large',
    shape: 'circle',
  };
}

function getTitleConfig(hasAvatar: boolean, hasParagraph: boolean): Partial<TitleProps> {
  if (!hasAvatar && hasParagraph) {
    return { width: '38%' };
  }
  if (hasAvatar && hasParagraph) {
    return { width: '50%' };
  }
  return {};
}

function getParagraphConfig(hasAvatar: boolean, hasTitle: boolean): Partial<ParagraphProps> {
  const config: Partial<ParagraphProps> = {};
  
  if (!hasAvatar || !hasTitle) {
    config.width = '61%';
  }
  
  config.rows = !hasAvatar && hasTitle ? 3 : 2;
  
  return config;
}

const Skeleton: React.FC<SkeletonProps> & {
  Button: typeof SkeletonButton;
  Avatar: typeof SkeletonAvatar;
  Input: typeof SkeletonInput;
  Image: typeof SkeletonImage;
} = (props) => {
  const renderSkeleton = (config: ConfigConsumerProps): React.ReactElement | React.ReactNode => {
    const { getPrefixCls, direction } = config;
    const {
      prefixCls: customizePrefixCls,
      loading,
      className,
      children,
      avatar,
      title,
      paragraph,
      active,
      round,
    } = props;

    const prefixCls = getPrefixCls('skeleton', customizePrefixCls);

    if (loading || !('loading' in props)) {
      const hasAvatar = !!avatar;
      const hasTitle = !!title;
      const hasParagraph = !!paragraph;

      let avatarNode: React.ReactNode;
      let contentNode: React.ReactNode;
      let titleNode: React.ReactNode;
      let paragraphNode: React.ReactNode;

      if (hasAvatar) {
        const avatarProps: AvatarProps = {
          prefixCls: `${prefixCls}-avatar`,
          ...getAvatarConfig(hasTitle, hasParagraph),
          ...normalizeProps<AvatarProps>(avatar),
        };
        avatarNode = (
          <div className={`${prefixCls}-header`}>
            <SkeletonAvatar {...avatarProps} />
          </div>
        );
      }

      if (hasTitle || hasParagraph) {
        if (hasTitle) {
          const titleProps: TitleProps = {
            prefixCls: `${prefixCls}-title`,
            ...getTitleConfig(hasAvatar, hasParagraph),
            ...normalizeProps<TitleProps>(title),
          };
          titleNode = <SkeletonTitle {...titleProps} />;
        }

        if (hasParagraph) {
          const paragraphProps: ParagraphProps = {
            prefixCls: `${prefixCls}-paragraph`,
            ...getParagraphConfig(hasAvatar, hasTitle),
            ...normalizeProps<ParagraphProps>(paragraph),
          };
          paragraphNode = <SkeletonParagraph {...paragraphProps} />;
        }

        contentNode = (
          <div className={`${prefixCls}-content`}>
            {titleNode}
            {paragraphNode}
          </div>
        );
      }

      const skeletonClassName = classNames(
        prefixCls,
        {
          [`${prefixCls}-with-avatar`]: hasAvatar,
          [`${prefixCls}-active`]: active,
          [`${prefixCls}-rtl`]: direction === 'rtl',
          [`${prefixCls}-round`]: round,
        },
        className
      );

      return (
        <div className={skeletonClassName}>
          {avatarNode}
          {contentNode}
        </div>
      );
    }

    return children;
  };

  return <ConfigConsumer>{renderSkeleton}</ConfigConsumer>;
};

Skeleton.defaultProps = {
  avatar: false,
  title: true,
  paragraph: true,
};

Skeleton.Button = SkeletonButton;
Skeleton.Avatar = SkeletonAvatar;
Skeleton.Input = SkeletonInput;
Skeleton.Image = SkeletonImage;

export default Skeleton;