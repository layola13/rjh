import ReactDOM from 'react-dom';
import { WelcomeFrame } from './WelcomeFrame';
import { Walkthrough } from './Walkthrough';
import { Questionnaire } from './Questionnaire';
import React from 'react';

interface WelcomeUIHandler {
  isShowing: boolean;
}

interface WelcomeRenderOptions {
  videoCourse: unknown;
  isLogin: boolean;
  onlyShowOpen: boolean;
  hasUpdateNotice: boolean;
  hasWelcomeAsset: boolean;
  hasVideoCourse: boolean;
  updateNotice: unknown;
  welcomeAsset: unknown;
  actionOpenMyDesigns: () => void;
  actionLogin: () => void;
  actionNewDesign: () => void;
  actionOpenFPCollection: () => void;
  actionUploadUnderlay: () => void;
  actionOnClosed: () => void;
  hideNotices: boolean;
  hasDesign: boolean;
}

interface WalkthroughData {
  [key: string]: unknown;
}

export class WelcomeUI {
  private handler: WelcomeUIHandler;

  constructor(handler: WelcomeUIHandler) {
    this.handler = handler;
  }

  render(options: WelcomeRenderOptions): void {
    const container = document.querySelector('.welcomecontainer');
    
    ReactDOM.render(
      React.createElement(WelcomeFrame, {
        videoCourse: options.videoCourse,
        isLogin: options.isLogin,
        onlyShowOpen: options.onlyShowOpen,
        hasUpdateNotice: options.hasUpdateNotice,
        hasWelcomeAsset: options.hasWelcomeAsset,
        hasVideoCourse: options.hasVideoCourse,
        updateNotice: options.updateNotice,
        welcomeAsset: options.welcomeAsset,
        actionOpenMyDesigns: options.actionOpenMyDesigns,
        actionLogin: options.actionLogin,
        actionNewDesign: options.actionNewDesign,
        actionOpenFPCollection: options.actionOpenFPCollection,
        actionUploadUnderlay: options.actionUploadUnderlay,
        actionOnClosed: options.actionOnClosed,
        hideNotices: options.hideNotices,
        hasDesign: options.hasDesign
      }),
      container
    );
    
    this.handler.isShowing = true;
  }

  close(): void {
    const container = document.querySelector('.welcomecontainer');
    if (container) {
      ReactDOM.unmountComponentAtNode(container);
    }
  }

  showWalkthrough(data: WalkthroughData): void {
    let walkthroughContainer = document.querySelector('.walkthrough-container') as HTMLElement | null;
    
    if (walkthroughContainer) {
      walkthroughContainer.classList.remove('hide-walkthrough');
      walkthroughContainer.classList.remove('animate-hide');
    } else {
      const uiContainer = document.querySelector('#ui-container');
      if (uiContainer) {
        const newContainer = document.createElement('div');
        newContainer.className = 'walkthrough-container';
        walkthroughContainer = uiContainer.appendChild(newContainer);
      }
    }

    const welcomeDiv = document.querySelector('#welcomediv');
    if (welcomeDiv) {
      welcomeDiv.classList.add('show-walkthrough');
    }

    if (walkthroughContainer) {
      ReactDOM.render(
        React.createElement(Walkthrough, { data }),
        walkthroughContainer
      );
    }
  }

  showQuestionnaire(): void {
    let questionnaireContainer = document.querySelector('.questionnaire-container') as HTMLElement | null;
    
    if (!questionnaireContainer) {
      const uiContainer = document.querySelector('#ui-container');
      if (uiContainer) {
        const newContainer = document.createElement('div');
        newContainer.className = 'questionnaire-container';
        questionnaireContainer = uiContainer.appendChild(newContainer);
      }
    }

    if (questionnaireContainer) {
      ReactDOM.render(
        React.createElement(Questionnaire, {
          close: this.closeQuestionnaire
        }),
        questionnaireContainer
      );
    }
  }

  closeQuestionnaire(): void {
    const container = document.querySelector('.questionnaire-container');
    if (container) {
      ReactDOM.unmountComponentAtNode(container);
    }
  }
}