import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeContext } from './theme-context';
import HotkeyModalComponent from './hotkey-modal-component';

interface Theme {
  [key: string]: unknown;
}

type CategoryType = string | number | undefined;

class HotkeyModalManager {
  private containerDom?: HTMLDivElement;

  constructor() {
    this.showModel = this.showModel.bind(this);
    this.closeModel = this.closeModel.bind(this);
  }

  init(): void {
    const pluginContainer = document.querySelector<HTMLElement>("#plugin-container");
    const modalContainer = document.createElement("div");
    modalContainer.className = "hotkey-modal-container";
    this.containerDom = modalContainer;
    pluginContainer?.appendChild(modalContainer);
  }

  showModel(theme: Theme, selectedCategory: CategoryType): void {
    if (!this.containerDom) return;

    ReactDOM.render(
      React.createElement(
        ThemeContext.Provider,
        { value: theme },
        React.createElement(HotkeyModalComponent, {
          close: this.closeModel,
          theme: theme,
          selectedCategory: selectedCategory
        })
      ),
      this.containerDom
    );
  }

  closeModel(): void {
    if (this.containerDom) {
      ReactDOM.unmountComponentAtNode(this.containerDom);
    }
  }
}

export default new HotkeyModalManager();