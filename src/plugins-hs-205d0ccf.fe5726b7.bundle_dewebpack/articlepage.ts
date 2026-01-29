import React from 'react';
import { ThemeContext } from './ThemeContext';

interface ArticlePageProps {
  data?: {
    url?: string;
    title?: string;
  };
  index: number;
  back: () => void;
  close: () => void;
}

interface ArticlePageState {
  loading: boolean;
}

interface DragModelParams {
  fromPage: typeof ArticlePage;
  modalData?: unknown;
}

interface DragModelConfig {
  pageSize: {
    width: number;
    height: number;
    positionX: string;
  };
  zoomable: {
    used: boolean;
    borderWidth: number;
    direction: string[];
  };
}

interface PageInfo {
  name: string;
  text: string;
}

export class ArticlePage extends React.Component<ArticlePageProps, ArticlePageState> {
  static pageInfo: PageInfo = {
    name: 'ArticlePage',
    text: '文章页面',
  };

  static contextType = ThemeContext;

  static dragModel(params: DragModelParams): DragModelConfig | null {
    const { fromPage } = params;
    
    if (fromPage === ArticlePage) {
      return null;
    }
    
    return {
      pageSize: {
        width: 500,
        height: 480,
        positionX: 'right',
      },
      zoomable: {
        used: true,
        borderWidth: 13,
        direction: ['right-bottom', 'left-bottom'],
      },
    };
  }

  context!: React.ContextType<typeof ThemeContext>;
  
  private iframeRef: React.RefObject<HTMLIFrameElement>;

  constructor(props: ArticlePageProps) {
    super(props);
    
    this.state = {
      loading: true,
    };
    
    this.onLoad = this.onLoad.bind(this);
    this.iframeRef = React.createRef<HTMLIFrameElement>();
  }

  onLoad(): void {
    this.setState({
      loading: false,
    });
  }

  componentDidMount(): void {
    const LOADING_TIMEOUT = 3000;
    
    setTimeout(() => {
      this.onLoad();
    }, LOADING_TIMEOUT);
  }

  render(): React.ReactElement {
    let url = this.props.data?.url;
    
    if (url?.includes('www.yuque.com')) {
      url = HSApp.Util.Url.addParams(url, {
        view: 'doc_embed',
        from: '3d.shejijia.com',
      });
    }

    const title = this.props.data?.title;
    const { loading } = this.state;
    
    const leftButton = this.props.index > 0 
      ? React.createElement('IconComponent', {
          onClick: this.props.back,
          type: 'hs_xian_fanhui',
        })
      : null;

    const header = React.createElement('Header', {
      title,
      left: leftButton,
      hiddenSearchBtn: true,
      inSearch: false,
      close: this.props.close,
    });

    return React.createElement(
      'PageContainer',
      {
        className: `article-page ${this.context}`,
        top: header,
        loading,
        showPagination: false,
      },
      React.createElement(
        'div',
        { className: 'article-iframe-wrapper' },
        React.createElement('iframe', {
          ref: this.iframeRef,
          className: 'article-iframe',
          src: url,
          onError: this.onLoad,
          onLoad: this.onLoad,
        })
      )
    );
  }
}

export default ArticlePage;