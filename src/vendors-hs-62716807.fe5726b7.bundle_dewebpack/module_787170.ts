import React, { useContext, cloneElement, CSSProperties, ReactElement } from 'react';
import { ConfigContext } from './ConfigContext';
import classNames from 'classnames';
import toArray from './toArray';
import Avatar from './Avatar';
import Popover from './Popover';
import { SizeContextProvider } from './SizeContext';

type AvatarSize = 'large' | 'small' | 'default' | number;

type PopoverPlacement = 
  | 'top' 
  | 'left' 
  | 'right' 
  | 'bottom' 
  | 'topLeft' 
  | 'topRight' 
  | 'bottomLeft' 
  | 'bottomRight' 
  | 'leftTop' 
  | 'leftBottom' 
  | 'rightTop' 
  | 'rightBottom';

interface AvatarGroupProps {
  prefixCls?: string;
  className?: string;
  maxCount?: number;
  maxStyle?: CSSProperties;
  size?: AvatarSize;
  children?: React.ReactNode;
  maxPopoverPlacement?: PopoverPlacement;
  style?: CSSProperties;
}

export default function AvatarGroup(props: AvatarGroupProps): ReactElement {
  const { getPrefixCls, direction } = useContext(ConfigContext);
  
  const {
    prefixCls,
    className = '',
    maxCount,
    maxStyle,
    size,
    maxPopoverPlacement = 'top',
    children,
    style
  } = props;

  const prefixClsGroup = getPrefixCls('avatar-group', prefixCls);
  
  const groupClassName = classNames(
    prefixClsGroup,
    {
      [`${prefixClsGroup}-rtl`]: direction === 'rtl'
    },
    className
  );

  const childrenArray = toArray(children).map((child, index) => 
    cloneElement(child, {
      key: `avatar-key-${index}`
    })
  );

  const childrenCount = childrenArray.length;

  if (maxCount && maxCount < childrenCount) {
    const visibleAvatars = childrenArray.slice(0, maxCount);
    const hiddenAvatars = childrenArray.slice(maxCount, childrenCount);
    
    visibleAvatars.push(
      <Popover
        key="avatar-popover-key"
        content={hiddenAvatars}
        trigger="hover"
        placement={maxPopoverPlacement}
        overlayClassName={`${prefixClsGroup}-popover`}
      >
        <Avatar style={maxStyle}>
          +{childrenCount - maxCount}
        </Avatar>
      </Popover>
    );

    return (
      <SizeContextProvider size={size}>
        <div className={groupClassName} style={style}>
          {visibleAvatars}
        </div>
      </SizeContextProvider>
    );
  }

  return (
    <SizeContextProvider size={size}>
      <div className={groupClassName} style={style}>
        {childrenArray}
      </div>
    </SizeContextProvider>
  );
}