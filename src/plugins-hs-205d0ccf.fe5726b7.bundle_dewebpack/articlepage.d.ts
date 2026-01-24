/**
 * Module: ArticlePage
 * Component for displaying article content in an iframe
 */

import React from 'react';
import { ThemeContext } from 'path/to/ThemeContext';
import PageLayout from 'path/to/PageLayout';
import NavBar from 'path/to/NavBar';
import IconButton from 'path/to/IconButton';

/**
 * Props for the ArticlePage component
 */
interface ArticlePageProps {
  /** Article data containing URL and title */
  data?: {
    /** URL of the article to display */
    url?: string;
    /** Title of the article */
    title?: string;
  };
  /** Index of the current page in navigation stack */
  index: number;
  /** Callback to navigate back */
  back: () => void;
  /** Callback to close the page */
  close: () => void;
}

/**
 * State for the ArticlePage component
 */
interface ArticlePageState {
  /** Whether the iframe content is still loading */
  loading: boolean;
}

/**
 * Page size configuration for drag model
 */
interface PageSizeConfig {
  width: number;
  height: number;
  positionX: string;
}

/**
 * Zoomable configuration for drag model
 */
interface ZoomableConfig {
  used: boolean;
  borderWidth: number;
  direction: string[];
}

/**
 * Drag model configuration
 */
interface DragModelConfig {
  pageSize: PageSizeConfig;
  zoomable: ZoomableConfig;
}

/**
 * Arguments for dragModel function
 */
interface DragModelArgs {
  fromPage: React.ComponentType<any>;
  modalData?: any;
}

/**
 * Page metadata information
 */
interface PageInfo {
  name: string;
  text: string;
}

/**
 * Timeout duration for automatic load completion (3 seconds)
 */
const AUTO_LOAD_TIMEOUT = 3000;

/**
 * ArticlePage component for displaying embedded article content
 * Supports iframe loading with fallback timeout and Yuque integration
 */
export class ArticlePage extends React.Component<ArticlePageProps, ArticlePageState> {
  /** Static page metadata */
  static pageInfo: PageInfo = {
    name: 'ArticlePage',
    text: '文章页面'
  };

  /** Theme context type */
  static contextType = ThemeContext;
  
  /** Theme context value */
  declare context: React.ContextType<typeof ThemeContext>;

  /** Reference to the iframe element */
  private iframeRef: React.RefObject<HTMLIFrameElement>;

  constructor(props: ArticlePageProps) {
    super(props);
    
    this.state = {
      loading: true
    };
    
    this.iframeRef = React.createRef<HTMLIFrameElement>();
    this.onLoad = this.onLoad.bind(this);
  }

  /**
   * Handle iframe load completion
   * Sets loading state to false
   */
  private onLoad(): void {
    this.setState({
      loading: false
    });
  }

  /**
   * Component lifecycle: Set up fallback timeout for load completion
   */
  componentDidMount(): void {
    setTimeout(() => {
      this.onLoad();
    }, AUTO_LOAD_TIMEOUT);
  }

  /**
   * Configure drag model behavior based on source page
   * @param args - Configuration arguments
   * @returns Drag model configuration or null if from same page
   */
  static dragModel(args: DragModelArgs): DragModelConfig | null {
    const { fromPage } = args;
    
    if (fromPage === ArticlePage) {
      return null;
    }
    
    return {
      pageSize: {
        width: 500,
        height: 480,
        positionX: 'right'
      },
      zoomable: {
        used: true,
        borderWidth: 13,
        direction: ['right-bottom', 'left-bottom']
      }
    };
  }

  /**
   * Render the article page with iframe content
   */
  render(): React.ReactElement {
    let url = this.props.data?.url;
    
    // Special handling for Yuque URLs: add embed parameters
    if (url?.includes('www.yuque.com')) {
      url = HSApp.Util.Url.addParams(url, {
        view: 'doc_embed',
        from: '3d.shejijia.com'
      });
    }
    
    const title = this.props.data?.title;
    const { loading } = this.state;
    
    // Show back button only if not the first page
    const leftButton = this.props.index > 0 
      ? React.createElement(IconButton, {
          onClick: this.props.back,
          type: 'hs_xian_fanhui'
        })
      : null;
    
    const navbar = React.createElement(NavBar, {
      title,
      left: leftButton,
      hiddenSearchBtn: true,
      inSearch: false,
      close: this.props.close
    });
    
    return React.createElement(
      PageLayout,
      {
        className: `article-page ${this.context}`,
        top: navbar,
        loading,
        showPagination: false
      },
      React.createElement(
        'div',
        { className: 'article-iframe-wrapper' },
        React.createElement('iframe', {
          ref: this.iframeRef,
          className: 'article-iframe',
          src: url,
          onError: this.onLoad,
          onLoad: this.onLoad
        })
      )
    );
  }
}

export default ArticlePage;