import React from 'react';
import ReactDOM from 'react-dom';
import { Progress } from 'antd';
import loadingIcon from './assets/loading-icon.png';
import loadingIconAlt from './assets/loading-icon-alt.png';

interface SimpleLoadingProps {
  text: string;
}

function SimpleLoadingComponent({ text }: SimpleLoadingProps): JSX.Element {
  return (
    <div className="fullScreenLoading">
      <div>
        <img className="loadingIcon" src={loadingIcon} />
      </div>
      <div className="loadingText">{text}</div>
    </div>
  );
}

interface ProgressLoadingProps {
  text: string;
  extraText?: string;
  stageNum?: number;
  barNum?: number;
}

function ProgressLoadingComponent({
  text,
  extraText,
  stageNum,
  barNum = 3
}: ProgressLoadingProps): JSX.Element {
  const percentages: number[] = [];
  let hasReachedStage = false;

  for (let index = 1; index < barNum + 1; index++) {
    if (index === stageNum) {
      percentages.push(70);
      hasReachedStage = true;
    } else if (hasReachedStage) {
      percentages.push(0);
    } else {
      percentages.push(100);
    }
  }

  const progressBars = percentages.map((percent) => {
    const randomKey = percent === 100 ? Math.round(Math.random() * 10000) : 0;
    return (
      <div className="loading-progress" key={randomKey}>
        <Progress
          percent={percent}
          strokeWidth={6}
          strokeColor="black"
          showInfo={false}
        />
      </div>
    );
  });

  return (
    <div className="fullScreenLoading">
      <div className="container">
        <div className="info">
          <div className="main">{text}</div>
          <div className="extra">{extraText || ''}</div>
          <div className="loading-bar">{progressBars}</div>
        </div>
        <div className="icon">
          <img className="loading-Icon" src={loadingIconAlt} />
        </div>
      </div>
    </div>
  );
}

enum LoadingType {
  Simple = 1,
  Progress = 2
}

export class FullScreenLoading {
  private static _isShowing: boolean = false;
  private static _domNode: HTMLDivElement | undefined;

  static show(
    text?: string,
    loadingType?: LoadingType,
    extraText?: string,
    stageNum?: number,
    barNum?: number
  ): Promise<void> {
    return new Promise((resolve) => {
      if (!FullScreenLoading._isShowing || loadingType === LoadingType.Progress) {
        FullScreenLoading.loadDomNode();
        FullScreenLoading._isShowing = true;
        FullScreenLoading._domNode!.focus();

        const defaultText = ResourceManager.getString('background_processing');
        let component: JSX.Element = (
          <SimpleLoadingComponent text={text || defaultText} />
        );

        if (loadingType === LoadingType.Progress) {
          component = (
            <ProgressLoadingComponent
              text={text || defaultText}
              extraText={extraText}
              stageNum={stageNum}
              barNum={barNum}
            />
          );
        }

        ReactDOM.render(component, FullScreenLoading._domNode!, () => {
          setTimeout(() => {
            resolve();
          });
        });
      }
    });
  }

  private static loadDomNode(): void {
    if (!FullScreenLoading._domNode) {
      const containerDiv = document.createElement('div');
      document.body.appendChild(containerDiv);

      const stopPropagation = (event: Event): void => {
        event.stopPropagation();
      };

      containerDiv.addEventListener('click', stopPropagation, true);
      containerDiv.addEventListener('dblclick', stopPropagation, true);
      containerDiv.addEventListener('mousedown', stopPropagation, true);
      containerDiv.addEventListener('mouseup', stopPropagation, true);
      containerDiv.addEventListener('mousemove', stopPropagation, true);
      containerDiv.addEventListener('mouseover', stopPropagation, true);
      containerDiv.addEventListener('mouseout', stopPropagation, true);
      containerDiv.addEventListener('keypress', stopPropagation, true);
      containerDiv.addEventListener('keyup', stopPropagation, true);

      FullScreenLoading._domNode = containerDiv;
      FullScreenLoading._isShowing = false;
    }
  }

  static hide(): void {
    if (FullScreenLoading._domNode && FullScreenLoading._isShowing) {
      FullScreenLoading._domNode.blur();
      ReactDOM.unmountComponentAtNode(FullScreenLoading._domNode);
      FullScreenLoading._isShowing = false;
    }
  }

  static isShowing(): boolean {
    return FullScreenLoading._isShowing;
  }
}