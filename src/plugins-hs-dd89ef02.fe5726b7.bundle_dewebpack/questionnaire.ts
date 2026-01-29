import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface QuestionnaireProps {
  close: () => void;
}

interface QuestionnaireState {
  loading: boolean;
}

interface MessageEventData {
  eType?: string;
}

declare global {
  interface Window {
    HSApp: {
      Config: {
        EZHOME_HOST: string;
      };
    };
  }
}

const LOADING_TIMEOUT_MS = 2000;
const LOADING_ICON_SIZE = 48;

const loadingIndicator = React.createElement(LoadingOutlined, {
  style: {
    fontSize: LOADING_ICON_SIZE
  },
  spin: true
});

export class Questionnaire extends React.Component<QuestionnaireProps, QuestionnaireState> {
  constructor(props: QuestionnaireProps) {
    super(props);
    this.state = {
      loading: true
    };
    this.onLoad = this.onLoad.bind(this);
    this.messageListener = this.messageListener.bind(this);
  }

  componentDidMount(): void {
    window.addEventListener('message', this.messageListener, false);
    setTimeout(() => {
      this.onLoad();
    }, LOADING_TIMEOUT_MS);
  }

  componentWillUnmount(): void {
    window.removeEventListener('message', this.messageListener, false);
  }

  onLoad(): void {
    this.setState({
      loading: false
    });
  }

  messageListener(event: MessageEvent<MessageEventData>): void {
    if (event.data?.eType === 'closeIframe') {
      this.props.close();
    }
  }

  render(): React.ReactNode {
    const { loading } = this.state;
    const questionnaireUrl = `https://${window.HSApp.Config.EZHOME_HOST}/questionnaire`;

    return React.createElement('div', {
      className: 'questionnaire-iframe-wrapper full'
    },
      loading && React.createElement('div', {
        className: 'questionnaire-loading-wrapper'
      }, React.createElement(Spin, {
        size: 'large',
        indicator: loadingIndicator,
        spinning: loading
      })),
      React.createElement('div', {
        className: 'beginner-guide-new-close',
        onClick: () => {
          this.props.close();
        }
      }),
      React.createElement('iframe', {
        className: 'questionnaire-iframe',
        src: questionnaireUrl,
        onError: this.onLoad,
        onLoad: this.onLoad
      })
    );
  }
}