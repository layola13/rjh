import React from 'react';
import ReactDOM from 'react-dom';
import { WelcomeFrame } from './WelcomeFrame';

interface WelcomeFrameProps {
  videoCourse?: unknown;
  isLogin: boolean;
  onlyShowOpen: boolean;
  hasUpdateNotice: boolean;
  hasWelcomeAsset: boolean;
  hasVideoCourse: boolean;
  updateNotice?: unknown;
  welcomeAsset?: unknown;
  actionOpenMyDesigns: () => void;
  actionLogin: () => void;
  actionNewDesign: () => void;
  actionOpenFPCollection: () => void;
  actionUploadUnderlay: () => void;
  actionOnClosed: () => void;
  hideNotices: boolean;
  hasDesign: boolean;
}

interface RenderContext {
  handler: {
    isShowing: boolean;
  };
}

function renderWelcomeFrame(this: RenderContext, props: WelcomeFrameProps): void {
  ReactDOM.render(
    React.createElement(WelcomeFrame, {
      videoCourse: props.videoCourse,
      isLogin: props.isLogin,
      onlyShowOpen: props.onlyShowOpen,
      hasUpdateNotice: props.hasUpdateNotice,
      hasWelcomeAsset: props.hasWelcomeAsset,
      hasVideoCourse: props.hasVideoCourse,
      updateNotice: props.updateNotice,
      welcomeAsset: props.welcomeAsset,
      actionOpenMyDesigns: props.actionOpenMyDesigns,
      actionLogin: props.actionLogin,
      actionNewDesign: props.actionNewDesign,
      actionOpenFPCollection: props.actionOpenFPCollection,
      actionUploadUnderlay: props.actionUploadUnderlay,
      actionOnClosed: props.actionOnClosed,
      hideNotices: props.hideNotices,
      hasDesign: props.hasDesign,
    }),
    document.querySelector('.welcomecontainer')
  );

  this.handler.isShowing = true;
}

export { renderWelcomeFrame, WelcomeFrameProps, RenderContext };