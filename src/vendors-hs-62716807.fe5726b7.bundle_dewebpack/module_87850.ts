import React from 'react';
import RcImage from 'rc-image';
import RotateLeftIcon from './RotateLeftIcon';
import RotateRightIcon from './RotateRightIcon';
import ZoomInIcon from './ZoomInIcon';
import ZoomOutIcon from './ZoomOutIcon';
import CloseIcon from './CloseIcon';
import LeftIcon from './LeftIcon';
import RightIcon from './RightIcon';
import { ConfigContext } from '../config-provider/context';

interface PreviewGroupProps {
  previewPrefixCls?: string;
  [key: string]: unknown;
}

export const icons = {
  rotateLeft: React.createElement(RotateLeftIcon),
  rotateRight: React.createElement(RotateRightIcon),
  zoomIn: React.createElement(ZoomInIcon),
  zoomOut: React.createElement(ZoomOutIcon),
  close: React.createElement(CloseIcon),
  left: React.createElement(LeftIcon),
  right: React.createElement(RightIcon)
};

export default function PreviewGroup(props: PreviewGroupProps): React.ReactElement {
  const { previewPrefixCls, ...restProps } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('image-preview', previewPrefixCls);

  return React.createElement(RcImage.PreviewGroup, {
    previewPrefixCls: prefixCls,
    icons,
    ...restProps
  });
}