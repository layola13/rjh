import React from 'react';
import ReactDOM from 'react-dom';
import { Spin } from 'antd';

interface ShowLoadingOptions {
  className?: string;
  show: boolean;
}

export const Loading: React.FC = () => {
  return (
    <div className="full-screen-loading-mask">
      <div className="full-screen-loading">
        <Spin size="large" />
      </div>
    </div>
  );
};

export const showLoading = (options: ShowLoadingOptions): void => {
  const containerClassName = options.className || "full-screen-loading-container";
  let containerElement = document.querySelector<HTMLDivElement>(`.${containerClassName}`);
  
  if (!containerElement) {
    const newContainer = document.createElement("div");
    newContainer.className = containerClassName;
    document.body.appendChild(newContainer);
    containerElement = newContainer;
  }
  
  if (!options.show && containerElement) {
    ReactDOM.unmountComponentAtNode(containerElement);
  } else {
    ReactDOM.render(<Loading />, containerElement);
  }
};