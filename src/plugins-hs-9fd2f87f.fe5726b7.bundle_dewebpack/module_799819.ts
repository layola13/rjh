interface TutorialData {
  icon: string;
  tip: string;
  tipColor: string;
  getMoreLink?: string;
}

interface TutorialGuideState {
  currentGuideIndex: number;
}

interface TutorialGuideProps {
  next: () => void;
}

interface TutorialPopupProps {
  callback?: () => void;
}

interface PopupWindowProps {
  ref: string;
  windowname: string;
  class: string;
  headername: string;
  contents: React.ReactElement;
  winwidth: number;
  submitcall: () => void;
  cancelcall: () => void;
}

const TUTORIAL_COOKIE_KEY = "plugin_customizedModeling_tutorial_cookie";

const TutorialGuide = React.createClass<TutorialGuideProps, TutorialGuideState>({
  propTypes: {
    next: React.PropTypes.func.isRequired
  },

  data: [] as TutorialData[],

  getInitialState(): TutorialGuideState {
    this.data = [
      {
        icon: "userguide/res/video/tutorial_welcome.mp4",
        tip: "plugin_customizedModeling_userguide_welcome",
        tipColor: "white"
      },
      {
        icon: "userguide/res/video/tutorial_workflow.mp4",
        tip: "plugin_customizedModeling_userguide_workflow",
        tipColor: "#555555"
      },
      {
        icon: "userguide/res/video/tutorial_lightband.mp4",
        tip: "plugin_customizedModeling_userguide_lightband",
        tipColor: "#555555"
      },
      {
        icon: "userguide/res/video/tutorial_material.mp4",
        tip: "plugin_customizedModeling_userguide_material",
        tipColor: "#555555"
      },
      {
        icon: "userguide/res/video/tutorial_trymore.mp4",
        tip: "plugin_customizedModeling_userguide_trymore",
        tipColor: "#555555",
        getMoreLink: HSApp.PartnerConfig.EZHOME_HELP_CENTER
      }
    ];

    return {
      currentGuideIndex: 0
    };
  },

  pageUp(): void {
    if (this.state.currentGuideIndex > 0) {
      this.setState({
        currentGuideIndex: this.state.currentGuideIndex - 1
      });
    }
  },

  pageDown(): void {
    if (this.state.currentGuideIndex < this.data.length - 1) {
      this.setState({
        currentGuideIndex: this.state.currentGuideIndex + 1
      });
    }
  },

  render(): React.ReactElement {
    const isFirstPage = this.state.currentGuideIndex <= 0;
    const isLastPage = this.state.currentGuideIndex >= this.data.length - 1;
    const currentData = this.data[this.state.currentGuideIndex];
    const resourceBasePath = HSApp.PartnerConfig.RES_BASEPATH || HSApp.Config.RES_BASEPATH || "";

    return React.createElement("div", {
      className: "userguide"
    },
      React.createElement("div", {
        className: "guideContainer"
      },
        this.data.map((item: TutorialData, index: number) => {
          if (index === this.state.currentGuideIndex) {
            return React.createElement("div", {
              key: `video-${index}`,
              className: "pageitem videoctn"
            },
              React.createElement("video", {
                width: "636px",
                height: "358px",
                poster: "", // placeholder for default poster image
                autoPlay: "autoplay",
                loop: "loop",
                className: "pvideo"
              },
                React.createElement("source", {
                  src: resourceBasePath + item.icon,
                  type: "video/mp4"
                })
              )
            );
          }
          return null;
        }),
        React.createElement("div", {
          className: "arrowLeft",
          style: {
            backgroundImage: `url("")` // placeholder for left arrow image
          },
          onClick: this.pageUp,
          disabled: isFirstPage
        }),
        React.createElement("div", {
          className: "arrowRight",
          style: {
            backgroundImage: `url("")` // placeholder for right arrow image
          },
          onClick: this.pageDown,
          disabled: isLastPage
        }),
        React.createElement("div", {
          className: "guide stateGroupContainer",
          ref: "guide"
        },
          React.createElement("ul", {
            className: "stateGroup"
          },
            this.data.map((item: TutorialData, index: number) => {
              const activeClass = index === this.state.currentGuideIndex ? "active" : "";
              return React.createElement("li", {
                key: index,
                className: activeClass
              });
            })
          )
        )
      ),
      React.createElement("div", {
        className: "guideTipContainer"
      },
        React.createElement("div", {
          className: "tip",
          style: {
            color: currentData.tipColor
          }
        }, ResourceManager.getString(currentData.tip)),
        React.createElement("a", {
          href: currentData.getMoreLink,
          target: "_blank"
        }, currentData.getMoreLink ? ResourceManager.getString("toolBar_evr_message_conncat") : "")
      ),
      React.createElement("div", {
        className: "footer"
      },
        React.createElement("button", {
          type: "button",
          onClick: this.props.next,
          disabled: false,
          className: "btn btn-primary actionButton"
        }, ResourceManager.getString("userStrings_gotittext"))
      )
    );
  }
});

const TutorialPopup = React.createClass<TutorialPopupProps, {}>({
  propTypes: {
    callback: React.PropTypes.func
  },

  cancel(): void {
    HSApp.Util.Core.define("hsw.plugin.customizedmodeling").UI.focusEditFrame();
  },

  close(): void {
    (this.refs.root as any).handleCancelClick();
    this.cancel();
  },

  readed(): void {
    if (this.props.callback) {
      this.props.callback();
    }
    this.close();
  },

  render(): React.ReactElement {
    const guideElement = React.createElement(TutorialGuide, {
      next: this.readed
    });

    return React.createElement("div", { // PopupWindow placeholder
      ref: "root",
      className: "createtutorialwishlist"
    },
      React.createElement("div", {
        className: "popup-header"
      }, ResourceManager.getString("plugin_customizedModeling_tutorial_title")),
      React.createElement("div", {
        className: "popup-content"
      }, guideElement)
    );
  }
});

function showTutorialHelp(forceShow: boolean = false): void {
  const cookieValue = ($ as any).cookie(TUTORIAL_COOKIE_KEY);
  
  if (!cookieValue || forceShow) {
    const tutorialElement = React.createElement(TutorialPopup, {
      callback: () => {
        ($ as any).cookie(TUTORIAL_COOKIE_KEY, true);
      }
    });

    const container = document.querySelector(".popupcontainer");
    if (container) {
      ReactDOM.render(tutorialElement, container);
    }
  }
}

export class Tutorial {
  showHelp(forceShow?: boolean): void {
    showTutorialHelp(forceShow);
  }
}

const customizedModelingNamespace = HSApp.Util.Core.define("hsw.plugin.customizedmodeling");
customizedModelingNamespace.Tutorial = Tutorial;