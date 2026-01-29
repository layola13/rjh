import React, { Component, MouseEvent } from 'react';
import ResourceManager from './ResourceManager';
import URLParser from './URLParser';
import ErrorPageComponent from './ErrorPageComponent';
import ErrorIcon from './ErrorIcon';

interface UploadFailComponentProps {
  show: boolean;
  errMsg: string;
  loadAgain: (event: MouseEvent<HTMLAnchorElement>) => void;
  question: (event: MouseEvent<HTMLSpanElement>) => void;
}

export default class UploadFailComponent extends Component<UploadFailComponentProps> {
  constructor(props: UploadFailComponentProps) {
    super(props);
  }

  render(): JSX.Element {
    const hintContent = (
      <div>
        <span>{ResourceManager.getString("plugin_catalog_diytiles_uploadfail-1")}</span>
        <a onClick={this.props.loadAgain}>
          {ResourceManager.getString("plugin_catalog_diytiles_uploadfail-2")}
        </a>
        <span
          className="questionIcon"
          style={{
            backgroundImage: `url(${URLParser.parseURL("question_mark.svg")})`
          }}
          title={ResourceManager.getString("plugin_catalog_diytiles_guide_title")}
          onClick={this.props.question}
        />
        <br />
        <span>{this.props.errMsg}</span>
      </div>
    );

    return (
      <ErrorPageComponent
        className="errorPage"
        show={this.props.show}
        icon={ErrorIcon}
        hint={hintContent}
      />
    );
  }
}