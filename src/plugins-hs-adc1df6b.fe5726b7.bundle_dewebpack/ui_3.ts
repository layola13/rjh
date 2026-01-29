import { initPropertyBarDataModel } from './propertyBarDataModel';
import ReactDOM from 'react-dom';
import React from 'react';
import PropertyBar from './PropertyBar';

interface Handler {
  signalPopulatePropertyBarTeminated: {
    dispatch: () => void;
  };
}

interface PropertyBarItem {
  [key: string]: unknown;
}

interface PropertyBarNode {
  rightViewModal: {
    toggleModalShow: (show: boolean) => void;
    showToggleModalBtn: (show: boolean) => void;
  };
}

export class UI {
  private handler: Handler;
  private propertyBarElement?: HTMLDivElement;
  private _isShow: boolean;
  private propertyBarNode?: PropertyBarNode;

  constructor(handler: Handler) {
    this.handler = handler;
    this._isShow = false;
  }

  /**
   * Initialize UI elements and append to plugin container
   */
  init(): void {
    const pluginContainer = document.querySelector<HTMLElement>('#plugin-container');
    if (!pluginContainer) {
      return;
    }

    const propertyBarContainer = document.createElement('div');
    propertyBarContainer.className = 'propertybar-container';
    this.propertyBarElement = propertyBarContainer;
    pluginContainer.appendChild(propertyBarContainer);

    const msgWrapper = document.createElement('div');
    msgWrapper.id = 'msg-wrapper';
    pluginContainer.appendChild(msgWrapper);
  }

  /**
   * Show property bar with given data
   * @param data - Property bar data
   * @param isReadonly - Whether the property bar is readonly
   */
  show(data: PropertyBarItem, isReadonly: boolean = false): void {
    if (!this.propertyBarElement) {
      return;
    }

    if (!this._isShow) {
      $('.propertybar-container').show();
      this._isShow = true;
    }

    const container = this.propertyBarElement;
    const propertyBarData = initPropertyBarDataModel(data);

    ReactDOM.render(
      React.createElement(PropertyBar, {
        ref: (node: PropertyBarNode) => {
          this.propertyBarNode = node;
        },
        isReadonly,
        item: propertyBarData
      }),
      container,
      () => {
        this.handler.signalPopulatePropertyBarTeminated.dispatch();
      }
    );
  }

  /**
   * Fold the property bar panel
   */
  foldPropertybar(): void {
    if (!this.propertyBarNode) {
      return;
    }

    this.propertyBarNode.rightViewModal.toggleModalShow(true);
    this.propertyBarNode.rightViewModal.showToggleModalBtn(true);
  }

  /**
   * Hide the property bar
   */
  hide(): void {
    if (this.propertyBarElement && this._isShow) {
      this._isShow = false;
      $('.propertybar-container').hide();
    }
  }
}