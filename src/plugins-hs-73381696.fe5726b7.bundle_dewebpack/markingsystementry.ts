interface MarkingScore {
  module: string;
  score: number;
}

interface MarkingSystemEntryProps {
  onSubmit?: (scores: MarkingScore[]) => void;
  onClose?: () => void;
}

interface MarkingSystemEntryState {
  show: boolean;
  disabled: boolean;
}

interface MarkingHistoryItem {
  module: string;
  [key: string]: unknown;
}

export class MarkingSystemEntry extends React.Component<MarkingSystemEntryProps, MarkingSystemEntryState> {
  private scores: MarkingScore[];
  private randomArray: number[];
  private refs: {
    bodymsg: HTMLTextAreaElement;
  };

  constructor(props: MarkingSystemEntryProps) {
    super(props);
    
    this.scores = [];
    this.randomArray = [];
    this.state = {
      show: false,
      disabled: true
    };

    this.showPopup = this.showPopup.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
    this.submitMarking = this.submitMarking.bind(this);
    this.getMarkingItems = this.getMarkingItems.bind(this);
    this.changeMarkingScores = this.changeMarkingScores.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  UNSAFE_componentWillReceiveProps(): void {
    this.showPopup();
    this.scores = [];
    this.setState({
      disabled: true
    });

    const historyLength = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.MarkingSystem).getMarkingHistory().length;
    const itemCount = historyLength < 4 ? historyLength : 4;
    this.randomArray = this.getRandomItems(historyLength, itemCount);
  }

  showPopup(): void {
    const markingHistory = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.MarkingSystem).getMarkingHistory();
    
    if (markingHistory.length >= 1 && HSApp.Config.TENANT === "fp") {
      return;
    }

    this.setState({
      show: true
    });
  }

  hidePopup(): void {
    this.setState({
      show: false
    });
  }

  submitMarking(): void {
    const userId = adskUser.memberId;
    const apiUrl = `${HSApp.PartnerConfig.EZHOME_SSJ_API_SERVER}aggregation/api/feedback/v1/users/${userId}/feedback`;
    const comment = ReactDOM.findDOMNode(this.refs.bodymsg).value;
    const feedbackData = {
      scores: this.scores,
      comment: comment,
      tag: "v2"
    };

    this.props.onSubmit?.(this.scores);
    NWTK.ajax.post(apiUrl, feedbackData);
    this.hidePopup();

    const storage = new HSApp.Util.Storage(HSFPConstants.PluginType.MarkingSystem);
    const nextMarkingTime = new Date(Date.now() + 7776e6).toISOString();
    storage.set("Last_Marking_Time", nextMarkingTime);
  }

  handleCloseClick(): void {
    const storage = new HSApp.Util.Storage(HSFPConstants.PluginType.MarkingSystem);
    const snoozeUntil = new Date(Date.now() + 6048e5).toISOString();
    storage.set("Last_Marking_Time", snoozeUntil);
    
    this.props.onClose?.();
    this.hidePopup();
  }

  getMarkingItems(): React.ReactElement[] {
    const items: React.ReactElement[] = [];
    const markingHistory = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.MarkingSystem).getMarkingHistory();

    if (markingHistory.length < 1) {
      return items;
    }

    this.randomArray.forEach((index) => {
      items.push(
        React.createElement(d.StarMarking, {
          data: markingHistory[index],
          changeMarkingScores: this.changeMarkingScores
        })
      );
    });

    return items;
  }

  changeMarkingScores(score: MarkingScore): void {
    if (!score) {
      return;
    }

    this.scores.forEach((existingScore, index) => {
      if (existingScore.module === score.module) {
        this.scores.splice(index, 1);
      }
    });

    this.scores.push(score);

    if (this.state.disabled === true) {
      this.setState({
        disabled: false
      });
    }
  }

  getRandomItems(totalCount: number, itemCount: number): number[] {
    const randomItems: number[] = [];

    if (totalCount < 1) {
      return randomItems;
    }

    const generateRandom = (min: number, max: number): void => {
      let randomValue = Math.random() * (max - min) + min;
      randomValue = Math.floor(randomValue);

      if (randomItems.length < itemCount) {
        let isUnique = true;
        for (let i = 0; i <= randomItems.length; i++) {
          if (randomValue === randomItems[i]) {
            isUnique = false;
            break;
          }
          if (i === randomItems.length && isUnique) {
            randomItems.push(randomValue);
            break;
          }
        }
        generateRandom(min, max);
      }
    };

    generateRandom(0, totalCount);
    return randomItems;
  }

  render(): React.ReactElement | boolean {
    const markingItems = this.getMarkingItems();

    return this.state.show && React.createElement("div", {
      className: "markingsystem"
    }, React.createElement("div", {
      className: "popup"
    }, React.createElement("div", {
      className: "header"
    }, React.createElement("label", null, ResourceManager.getString("marking_system_marking_system_title")), React.createElement("span", {
      className: "closeBtn",
      onClick: this.handleCloseClick
    }, React.createElement("img", {
      src: c.default,
      alt: "closeButton"
    }))), React.createElement(u.Scroll, {
      className: "content"
    }, React.createElement("div", {
      className: "markingcontainer"
    }, markingItems || null), React.createElement("div", {
      className: "commentcontainer"
    }, React.createElement("div", {
      className: "functionname"
    }, ResourceManager.getString("marking_system_other_feedback")), React.createElement("div", {
      className: "textcontainer"
    }, React.createElement("textarea", {
      ref: "bodymsg",
      placeholder: ResourceManager.getString("marking_system_content_placeholder")
    })))), React.createElement("div", {
      className: "footer"
    }, React.createElement("input", {
      type: "submit",
      value: ResourceManager.getString("marking_system_marking_submit"),
      disabled: this.state.disabled,
      onClick: this.submitMarking
    }))));
  }
}