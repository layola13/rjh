import React, { Component, createRef, RefObject, CSSProperties } from 'react';

interface Label {
  labelName: string;
  labelCode: string;
  labelId: string;
}

interface Article {
  id: string;
  period: string;
  [key: string]: unknown;
}

interface PeriodData {
  period: string;
  articles: Article[];
}

interface HomePageProps {
  data?: {
    module?: string;
    userGuide?: {
      userGuideCallback?: () => void;
    };
  };
  push: (config: { Page: React.ComponentType; data?: unknown }) => void;
  close: () => void;
}

interface HomePageState {
  topLeftNode: React.ReactNode;
  loading: boolean;
  selectLabel: string;
  hiddenPeriod: boolean;
  pageCurrent: number;
  articlesTotal: number;
  pageSize: number;
  showTopSelect: boolean;
  showContentSelect: boolean;
  period?: PeriodData;
  labelArticles?: Article[];
  labels?: Label[];
  defaultSelectLabel?: string;
}

interface LabelSelectProps {
  labels?: Label[];
  defaultModule: string;
  style?: CSSProperties;
  onChange: (value: string) => void;
}

interface LabelOption {
  label: string;
  value: string;
}

interface QueryArticleParams {
  offset: number;
  limit: number;
}

interface QueryLabelParams {
  labelId: string;
  offset: number;
  limit: number;
}

interface QueryArticleResponse {
  items: Article[];
  total: number;
}

const PAGE_SIZE = 10;

async function fetchLatestPeriodArticles(): Promise<PeriodData | undefined> {
  const response = await queryArticleByPeriod({
    offset: 0,
    limit: 5
  });

  const items = response.items;
  if (items?.length) {
    const latestPeriod = items[0].period;
    const articlesInPeriod = items.reduce((acc: Article[], article: Article) => {
      if (article.period === latestPeriod) {
        acc.push(article);
      }
      return acc;
    }, []);

    return {
      period: latestPeriod,
      articles: articlesInPeriod
    };
  }

  return undefined;
}

function LabelSelect(props: LabelSelectProps): JSX.Element {
  const { labels, defaultModule, style, onChange } = props;

  const options: LabelOption[] = React.useMemo(() => {
    return labels ? labels.map((label) => ({
      label: label.labelName,
      value: label.labelCode
    })) : [];
  }, [labels]);

  const icon = React.useMemo(() => {
    return React.createElement(Icons, {
      type: "hs_xian_leimuming",
      className: "leimuming-icon"
    });
  }, []);

  return React.createElement(SelectComponent, {
    value: defaultModule,
    icon,
    options,
    style,
    onChange
  });
}

export class HomePage extends Component<HomePageProps, HomePageState> {
  static pageInfo = {
    name: "HomePage",
    text: "首页"
  };

  static contextType = ThemeContext;

  private selectRef: RefObject<HTMLDivElement>;
  private selectRect?: DOMRect;
  private LabelSelectNode?: React.ReactNode;
  private container?: HTMLElement;

  constructor(props: HomePageProps) {
    super(props);

    const title = ResourceManager.getString("plugin_teaching_ability_title");

    this.state = {
      topLeftNode: React.createElement(ThemeContext.Consumer, null, (theme) => {
        return React.createElement("div", {
          className: `teaching-homepage-top-title ${theme}`
        }, title);
      }),
      loading: false,
      selectLabel: props.data?.module || "default",
      hiddenPeriod: true,
      pageCurrent: 1,
      articlesTotal: 0,
      pageSize: PAGE_SIZE,
      showTopSelect: false,
      showContentSelect: false
    };

    this.selectRef = createRef<HTMLDivElement>();
  }

  componentDidMount(): void {
    this.init({
      selectLabelCode: this.props.data?.module || "default"
    });
  }

  private async init(params: { selectLabelCode: string }): Promise<void> {
    const { selectLabelCode } = params;

    this.setState({ loading: true });

    try {
      const { pageCurrent, pageSize } = this.state;

      const labels = await queryLabelList();
      const selectedLabel = labels.find((label) => label.labelCode === selectLabelCode)
        || labels.find((label) => label.labelCode === "default")
        || labels[0];

      const labelArticlesResponse = await this.getLabelArticles(
        selectedLabel.labelId,
        pageCurrent,
        pageSize
      );

      let periodData: PeriodData | undefined;
      if (selectedLabel.labelCode === "default") {
        periodData = await fetchLatestPeriodArticles();
      }

      this.setState({
        period: periodData,
        articlesTotal: labelArticlesResponse.total,
        labelArticles: labelArticlesResponse.items,
        labels,
        defaultSelectLabel: selectedLabel.labelCode,
        selectLabel: selectedLabel.labelCode,
        hiddenPeriod: selectedLabel.labelCode !== "default",
        loading: false
      }, () => {
        this.computerSelectLocation();
      });
    } catch (error) {
      LiveHint.show(
        ResourceManager.getString("plugin_teaching_ability_query_error"),
        3000,
        null,
        { status: LiveHint.statusEnum.warning }
      );
      this.setState({ loading: false });
    }
  }

  private getLabelArticles(labelId: string, page: number, limit: number): Promise<QueryArticleResponse> {
    return queryArticleByLabel({
      labelId,
      offset: page,
      limit
    });
  }

  private toSearch(): void {
    if (this.state.loading) return;

    const labelId = this.state.labels?.find(
      (label) => label.labelCode === this.state.selectLabel
    )?.labelId;

    this.props.push({
      Page: SearchPage,
      data: { labelId }
    });
  }

  private toPeriod(): void {
    this.props.push({
      Page: PeriodPage,
      data: { data: this.props.data }
    });
  }

  private computerSelectLocation(): void {
    const { pageCurrent, defaultSelectLabel } = this.state;

    if (pageCurrent > 1) {
      this.setState({
        showTopSelect: true,
        showContentSelect: false
      });
    } else if (defaultSelectLabel === "default") {
      const container = this.container;
      const selectElement = this.selectRef.current;

      if (container && selectElement) {
        const shouldShowTopSelect = container.scrollTop > (selectElement.offsetTop + selectElement.offsetHeight);
        this.setState({
          showTopSelect: shouldShowTopSelect,
          showContentSelect: true
        });
      } else {
        this.setState({
          showTopSelect: false,
          showContentSelect: true
        });
      }
    } else {
      this.setState({
        showTopSelect: true,
        showContentSelect: false
      });
    }
  }

  private async onSelectModuleChange(selectedLabelCode: string): Promise<void> {
    this.setState({ loading: true });

    const { pageSize, labels, period } = this.state;
    const labelId = labels?.find((label) => label.labelCode === selectedLabelCode)?.labelId;

    if (!labelId) {
      this.setState({ loading: false });
      return;
    }

    let periodData = period;
    if (selectedLabelCode === "default" && !periodData) {
      periodData = await fetchLatestPeriodArticles();
    }

    this.getLabelArticles(labelId, 1, pageSize)
      .then((response) => {
        this.setState({
          period: periodData,
          selectLabel: selectedLabelCode,
          pageCurrent: 1,
          articlesTotal: response.total,
          labelArticles: response.items
        }, () => {
          this.computerSelectLocation();
        });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  private paginationChange(page: number): void {
    this.setState({ loading: true });

    const { selectLabel, pageSize, labels } = this.state;
    const labelId = labels?.find((label) => label.labelCode === selectLabel)?.labelId;

    if (labelId) {
      this.getLabelArticles(labelId, page, pageSize)
        .then((response) => {
          this.setState({
            hiddenPeriod: page !== 1,
            pageCurrent: page,
            articlesTotal: response.total,
            labelArticles: response.items
          }, () => {
            this.computerSelectLocation();
          });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    } else {
      this.setState({ loading: false });
    }
  }

  private onContentScrollDown(element: HTMLElement): void {
    this.container = element;
    this.computerSelectLocation();
  }

  private onContentScrollUp(element: HTMLElement): void {
    this.container = element;
    this.computerSelectLocation();
  }

  private jumpToDesignCurose = (): void => {
    const queryParams = HSApp.Util.Url.getQueryStrings();
    const helpCenterUrl = HSApp.PartnerConfig.EZHOME_HELP_CENTER_VIDEOS;
    const passportUrl = HSApp.PartnerConfig.IPASSPORT_PAGE_URL;

    let targetUrl = helpCenterUrl;

    if (HSApp.Config.VERSION === "ea" && passportUrl && queryParams.env) {
      targetUrl = `${passportUrl}?domain=${queryParams.env}&uri=${encodeURIComponent(helpCenterUrl)}`;
    }

    if (targetUrl) {
      window.open(targetUrl, "_blank", "noopener=yes, noreferrer=yes");
    }
  };

  render(): JSX.Element {
    const {
      topLeftNode,
      loading,
      selectLabel,
      period,
      labels,
      labelArticles,
      pageCurrent,
      pageSize,
      hiddenPeriod,
      articlesTotal,
      defaultSelectLabel,
      showTopSelect,
      showContentSelect
    } = this.state;

    const userGuide = this.props.data?.userGuide;
    const isFpTenant = HSApp.Config.TENANT === "fp";

    let showUserGuide = true;
    if (!HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.Guide)) {
      showUserGuide = false;
    }

    const selectComponent = React.createElement(LabelSelect, {
      defaultModule: selectLabel,
      labels,
      style: {
        width: isFpTenant ? "100%" : 154,
        height: 32
      },
      onChange: this.onSelectModuleChange.bind(this)
    });

    const topLeft = React.createElement("div", {
      className: "home-page-top-left"
    }, !showTopSelect && topLeftNode, React.createElement("div", {
      className: `top-select ${showTopSelect ? "" : "top-select-hidden"}`,
      style: { marginLeft: 8 }
    }, selectComponent));

    const contentSelect = defaultSelectLabel === "default" && React.createElement("div", {
      ref: this.selectRef,
      className: `select-container ${showContentSelect ? "" : "select-container-hidden"}`
    }, selectComponent);

    const header = React.createElement(Header, {
      left: topLeft,
      close: this.props.close,
      searchBtnClick: this.toSearch.bind(this),
      curoseBtnClick: this.jumpToDesignCurose
    });

    return React.createElement(PageLayout, {
      top: header,
      loading,
      showPagination: articlesTotal !== 0,
      onContentScrollDown: this.onContentScrollDown.bind(this),
      onContentScrollUp: this.onContentScrollUp.bind(this),
      paginationProps: {
        pageSize,
        current: pageCurrent,
        total: articlesTotal,
        onChange: this.paginationChange.bind(this)
      }
    }, React.createElement("div", {
      className: "home-page-wrapper"
    }, showUserGuide && React.createElement(UserGuide, {
      className: "home-page-wrapper-userguide",
      userGuideCallback: userGuide?.userGuideCallback
    }), React.createElement("div", {
      className: `period-wrapper ${hiddenPeriod ? "hidden-period-wrapper" : ""} ${this.context} `
    }, defaultSelectLabel === "default" && React.createElement(PeriodCard, {
      period: period?.period || "",
      articles: period?.articles || [],
      isNew: true,
      showMore: true,
      onMoreClick: this.toPeriod.bind(this),
      from: {
        id: period?.period || "",
        name: period?.period || ""
      }
    })), contentSelect, React.createElement("div", null, labelArticles?.map((article) => {
      return React.createElement(ArticleCard, {
        from: {
          id: "plugin.tutorial.home.module.article",
          name: "首页模块"
        },
        key: article.id,
        ...article
      });
    }))));
  }
}