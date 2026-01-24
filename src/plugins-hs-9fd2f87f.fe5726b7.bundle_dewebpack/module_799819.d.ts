/**
 * 自定义建模插件 - 用户引导教程模块
 * 提供初次使用的视频引导流程和帮助文档
 */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// ==================== 类型定义 ====================

/**
 * 引导步骤数据项
 */
interface GuideStepData {
  /** 视频资源路径 */
  icon: string;
  /** 提示文本的国际化key */
  tip: string;
  /** 提示文本颜色 */
  tipColor: string;
  /** 可选的外部帮助链接 */
  getMoreLink?: string;
}

/**
 * 教程轮播组件的Props
 */
interface TutorialCarouselProps {
  /** 点击"知道了"按钮的回调 */
  next: () => void;
}

/**
 * 教程轮播组件的State
 */
interface TutorialCarouselState {
  /** 当前显示的引导步骤索引 */
  currentGuideIndex: number;
}

/**
 * 教程弹窗组件的Props
 */
interface TutorialPopupProps {
  /** 用户完成教程后的回调 */
  callback?: () => void;
}

/**
 * 教程管理器接口
 */
interface ITutorialManager {
  /**
   * 显示帮助教程
   * @param forceShow 是否强制显示（忽略cookie记录）
   */
  showHelp(forceShow?: boolean): void;
}

// ==================== 常量定义 ====================

/** 记录用户已查看教程的Cookie键名 */
const TUTORIAL_COOKIE_KEY = 'plugin_customizedModeling_tutorial_cookie';

/** 视频容器宽度（像素） */
const VIDEO_WIDTH = 636;

/** 视频容器高度（像素） */
const VIDEO_HEIGHT = 358;

// ==================== 教程轮播组件 ====================

/**
 * 教程视频轮播组件
 * 展示一系列引导视频，支持前后翻页和进度指示
 */
const TutorialCarousel = React.createClass<TutorialCarouselProps, TutorialCarouselState>({
  propTypes: {
    next: PropTypes.func.isRequired,
  },

  /**
   * 初始化组件状态和引导数据
   */
  getInitialState(): TutorialCarouselState {
    // 定义引导步骤数据
    this.guideSteps = [
      {
        icon: 'userguide/res/video/tutorial_welcome.mp4',
        tip: 'plugin_customizedModeling_userguide_welcome',
        tipColor: 'white',
      },
      {
        icon: 'userguide/res/video/tutorial_workflow.mp4',
        tip: 'plugin_customizedModeling_userguide_workflow',
        tipColor: '#555555',
      },
      {
        icon: 'userguide/res/video/tutorial_lightband.mp4',
        tip: 'plugin_customizedModeling_userguide_lightband',
        tipColor: '#555555',
      },
      {
        icon: 'userguide/res/video/tutorial_material.mp4',
        tip: 'plugin_customizedModeling_userguide_material',
        tipColor: '#555555',
      },
      {
        icon: 'userguide/res/video/tutorial_trymore.mp4',
        tip: 'plugin_customizedModeling_userguide_trymore',
        tipColor: '#555555',
        getMoreLink: HSApp.PartnerConfig.EZHOME_HELP_CENTER,
      },
    ] as GuideStepData[];

    return {
      currentGuideIndex: 0,
    };
  },

  /**
   * 切换到上一个引导步骤
   */
  pageUp(): void {
    if (this.state.currentGuideIndex > 0) {
      this.setState({
        currentGuideIndex: this.state.currentGuideIndex - 1,
      });
    }
  },

  /**
   * 切换到下一个引导步骤
   */
  pageDown(): void {
    if (this.state.currentGuideIndex < this.guideSteps.length - 1) {
      this.setState({
        currentGuideIndex: this.state.currentGuideIndex + 1,
      });
    }
  },

  /**
   * 渲染组件UI
   */
  render(): JSX.Element {
    const isFirstStep = this.state.currentGuideIndex <= 0;
    const isLastStep = this.state.currentGuideIndex >= this.guideSteps.length - 1;
    const currentStep = this.guideSteps[this.state.currentGuideIndex];

    // 获取资源基础路径
    const resourceBasePath =
      HSApp.PartnerConfig.RES_BASEPATH ??
      HSApp.Config.RES_BASEPATH ??
      '';

    return (
      <div className="userguide">
        <div className="guideContainer">
          {/* 渲染当前视频 */}
          {this.guideSteps.map((step, index) => {
            if (index === this.state.currentGuideIndex) {
              return (
                <div key={`video-${index}`} className="pageitem videoctn">
                  <video
                    width={`${VIDEO_WIDTH}px`}
                    height={`${VIDEO_HEIGHT}px`}
                    poster={require('./defaultPoster.png')} // 默认封面图
                    autoPlay
                    loop
                    className="pvideo"
                  >
                    <source
                      src={resourceBasePath + step.icon}
                      type="video/mp4"
                    />
                  </video>
                </div>
              );
            }
            return null;
          })}

          {/* 左箭头按钮 */}
          <div
            className="arrowLeft"
            style={{
              backgroundImage: `url("${require('./arrowLeft.png')}")`,
            }}
            onClick={this.pageUp}
            aria-disabled={isFirstStep}
          />

          {/* 右箭头按钮 */}
          <div
            className="arrowRight"
            style={{
              backgroundImage: `url("${require('./arrowRight.png')}")`,
            }}
            onClick={this.pageDown}
            aria-disabled={isLastStep}
          />

          {/* 进度指示器 */}
          <div className="guide stateGroupContainer" ref="guide">
            <ul className="stateGroup">
              {this.guideSteps.map((_, index) => {
                const activeClass =
                  index === this.state.currentGuideIndex ? 'active' : '';
                return <li key={index} className={activeClass} />;
              })}
            </ul>
          </div>
        </div>

        {/* 提示文本区域 */}
        <div className="guideTipContainer">
          <div
            className="tip"
            style={{ color: currentStep.tipColor }}
          >
            {ResourceManager.getString(currentStep.tip)}
          </div>
          {currentStep.getMoreLink && (
            <a href={currentStep.getMoreLink} target="_blank" rel="noopener noreferrer">
              {ResourceManager.getString('toolBar_evr_message_conncat')}
            </a>
          )}
        </div>

        {/* 底部操作按钮 */}
        <div className="footer">
          <button
            type="button"
            onClick={this.props.next}
            className="btn btn-primary actionButton"
          >
            {ResourceManager.getString('userStrings_gotittext')}
          </button>
        </div>
      </div>
    );
  },
});

// ==================== 教程弹窗组件 ====================

/**
 * 教程弹窗容器组件
 * 封装轮播组件并提供弹窗交互逻辑
 */
const TutorialPopup = React.createClass<TutorialPopupProps, {}>({
  propTypes: {
    callback: PropTypes.func,
  },

  /**
   * 取消操作：聚焦编辑框架
   */
  cancel(): void {
    const plugin = HSApp.Util.Core.define('hsw.plugin.customizedmodeling');
    plugin.UI.focusEditFrame();
  },

  /**
   * 关闭弹窗
   */
  close(): void {
    this.refs.root.handleCancelClick();
    this.cancel();
  },

  /**
   * 用户确认已阅读教程
   */
  onReadComplete(): void {
    this.props.callback?.();
    this.close();
  },

  /**
   * 渲染弹窗
   */
  render(): JSX.Element {
    const content = <TutorialCarousel next={this.onReadComplete} />;

    return (
      <PopupWindow
        ref="root"
        windowname="createtutorialwishlist"
        class="createtutorialwishlist"
        headername={ResourceManager.getString('plugin_customizedModeling_tutorial_title')}
        contents={content}
        winwidth={VIDEO_WIDTH}
        submitcall={this.close}
        cancelcall={this.cancel}
      />
    );
  },
});

// ==================== 教程管理器 ====================

/**
 * 教程管理器类
 * 负责控制教程的显示逻辑和状态持久化
 */
class TutorialManager implements ITutorialManager {
  /**
   * 显示帮助教程弹窗
   * @param forceShow 是否强制显示（默认false，会检查cookie）
   */
  showHelp(forceShow: boolean = false): void {
    this.renderTutorialIfNeeded(forceShow);
  }

  /**
   * 根据条件渲染教程弹窗
   * @param forceShow 是否强制显示
   */
  private renderTutorialIfNeeded(forceShow: boolean): void {
    const hasViewedTutorial = $.cookie(TUTORIAL_COOKIE_KEY);

    // 如果未查看过或强制显示，则渲染教程
    if (!hasViewedTutorial || forceShow) {
      const tutorialElement = (
        <TutorialPopup
          callback={() => {
            // 标记用户已查看教程
            $.cookie(TUTORIAL_COOKIE_KEY, 'true');
          }}
        />
      );

      const container = document.querySelector('.popupcontainer');
      if (container) {
        ReactDOM.render(tutorialElement, container);
      }
    }
  }
}

// ==================== 模块导出 ====================

// 注册到全局命名空间
const customizedModelingPlugin = HSApp.Util.Core.define('hsw.plugin.customizedmodeling');
customizedModelingPlugin.Tutorial = TutorialManager;

export type { ITutorialManager, GuideStepData, TutorialCarouselProps };
export { TutorialManager, TUTORIAL_COOKIE_KEY };