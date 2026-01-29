import React, { useContext, ReactNode } from 'react';
import classNames from 'classnames';
import { ConfigContext } from './ConfigContext';

interface CommentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  actions?: ReactNode[];
  author?: ReactNode;
  avatar?: ReactNode | string;
  children?: ReactNode;
  className?: string;
  content: ReactNode;
  prefixCls?: string;
  datetime?: ReactNode;
}

/**
 * Comment component for displaying user comments with avatar, author, content and actions
 */
const Comment: React.FC<CommentProps> = (props) => {
  const {
    actions,
    author,
    avatar,
    children,
    className,
    content,
    prefixCls,
    datetime,
    ...restProps
  } = props;

  const { getPrefixCls, direction } = useContext(ConfigContext);
  const prefixClass = getPrefixCls('comment', prefixCls);

  const renderAvatar = (): ReactNode | null => {
    if (!avatar) {
      return null;
    }

    return (
      <div className={`${prefixClass}-avatar`}>
        {typeof avatar === 'string' ? (
          <img src={avatar} alt="comment-avatar" />
        ) : (
          avatar
        )}
      </div>
    );
  };

  const renderActions = (): ReactNode | null => {
    if (!actions || actions.length === 0) {
      return null;
    }

    return (
      <ul className={`${prefixClass}-actions`}>
        {actions.map((action, index) => (
          <li key={`action-${index}`}>{action}</li>
        ))}
      </ul>
    );
  };

  const renderAuthorAndDatetime = (): ReactNode | null => {
    if (!author && !datetime) {
      return null;
    }

    return (
      <div className={`${prefixClass}-content-author`}>
        {author && (
          <span className={`${prefixClass}-content-author-name`}>
            {author}
          </span>
        )}
        {datetime && (
          <span className={`${prefixClass}-content-author-time`}>
            {datetime}
          </span>
        )}
      </div>
    );
  };

  const renderContent = (): ReactNode => {
    const authorSection = renderAuthorAndDatetime();
    const actionsList = renderActions();

    return (
      <div className={`${prefixClass}-content`}>
        {authorSection}
        <div className={`${prefixClass}-content-detail`}>{content}</div>
        {actionsList}
      </div>
    );
  };

  const renderNested = (nestedChildren: ReactNode): ReactNode => {
    return (
      <div className={classNames(`${prefixClass}-nested`)}>
        {nestedChildren}
      </div>
    );
  };

  const commentClassName = classNames(
    prefixClass,
    {
      [`${prefixClass}-rtl`]: direction === 'rtl',
    },
    className
  );

  const avatarElement = renderAvatar();
  const contentElement = renderContent();

  return (
    <div {...restProps} className={commentClassName}>
      <div className={`${prefixClass}-inner`}>
        {avatarElement}
        {contentElement}
      </div>
      {children ? renderNested(children) : null}
    </div>
  );
};

export default Comment;