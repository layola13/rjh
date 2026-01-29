import React from 'react';
import { PageComponent } from './PageComponent';
import { PageSize } from './constants';
import { queryArticleByKeyword } from './api';
import { ThemeContext } from './ThemeContext';
import Header from './Header';
import PageLayout from './PageLayout';
import ArticleItem from './ArticleItem';
import noneSearchIcon from './assets/none-search-icon.png';

interface Article {
  id: string;
  title: string;
  content: string;
  [key: string]: unknown;
}

interface PaginationProps {
  pageSize: number;
  current: number;
  total: number;
  onChange: (page: number) => void;
}

interface SearchPageProps {
  backIcon?: React.ReactNode;
  close?: () => void;
  data?: {
    labelId?: string;
  };
}

interface SearchPageState {
  loading: boolean;
  keyword: string;
  articles: Article[];
  isNone: boolean;
  paginationProps: PaginationProps;
}

interface QueryArticleParams {
  offset: number;
  limit: number;
  keyword: string;
  labelId?: string;
}

interface QueryArticleResponse {
  total: number;
  items: Article[];
}

export default class SearchPage extends PageComponent<SearchPageProps, SearchPageState> {
  static pageInfo = {
    name: 'SearchPage',
    text: '搜索页面'
  };

  static contextType = ThemeContext;
  declare context: React.ContextType<typeof ThemeContext>;

  constructor(props: SearchPageProps) {
    super(props);
    
    this.onPaginationChange = this.onPaginationChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    
    this.state = {
      loading: false,
      keyword: '',
      articles: [],
      isNone: false,
      paginationProps: {
        pageSize: PageSize,
        current: 1,
        total: 0,
        onChange: this.onPaginationChange
      }
    };
  }

  fetch(page: number, keyword: string): void {
    const { pageSize = PageSize } = this.state.paginationProps;
    
    this.setState({ loading: true });
    
    queryArticleByKeyword({
      offset: page,
      limit: pageSize,
      keyword,
      labelId: this.props.data?.labelId
    } as QueryArticleParams)
      .then((response: QueryArticleResponse) => {
        this.setState((prevState) => ({
          paginationProps: {
            ...prevState.paginationProps,
            current: page,
            total: response.total
          },
          articles: response.items,
          keyword,
          isNone: !response.items?.length
        }));
      })
      .finally(() => {
        this.setState({ loading: false });
      });
    
    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.TeachingAbility,
      'query_tutorial_event',
      { query: encodeURIComponent(keyword) }
    );
  }

  onPaginationChange(page: number): void {
    const { keyword } = this.state;
    this.fetch(page, keyword);
  }

  onSearch(searchKeyword: string): void {
    if (searchKeyword && !searchKeyword.match(/^[ ]*$/)) {
      const { current = 1 } = this.state.paginationProps;
      this.fetch(current, searchKeyword);
    } else {
      this.setState((prevState) => ({
        isNone: true,
        paginationProps: {
          ...prevState.paginationProps,
          current: 1,
          total: 0
        },
        articles: [],
        keyword: searchKeyword
      }));
    }
  }

  render(): React.ReactElement {
    const { loading, paginationProps, articles, isNone } = this.state;
    
    const header = React.createElement(Header, {
      left: this.props.backIcon,
      inSearch: true,
      onSearch: this.onSearch,
      close: this.props.close
    });

    return React.createElement(
      PageLayout,
      {
        top: header,
        loading,
        showPagination: paginationProps.total !== 0,
        paginationProps
      },
      articles?.map((article) =>
        React.createElement(ArticleItem, {
          ...article,
          from: {
            id: 'plugin.tutorial.search.article',
            name: '搜索'
          }
        })
      ),
      isNone && React.createElement(
        'div',
        { className: `none-search-wrapper ${this.context}` },
        React.createElement('img', {
          className: 'none-search-icon',
          width: 80,
          height: 80,
          src: noneSearchIcon
        }),
        React.createElement(
          'span',
          { className: 'none-search-text' },
          ResourceManager.getString('plugin_teaching_ability_search_none')
        )
      )
    );
  }
}