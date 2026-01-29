import React from 'react';
import imageSrc from './457184';

interface NoListViewProps {}

interface NoListViewState {}

export default class NoListView extends React.Component<NoListViewProps, NoListViewState> {
  constructor(props: NoListViewProps) {
    super(props);
  }

  render(): React.ReactElement {
    return (
      <div id="nolistview">
        <img src={imageSrc} alt="" />
        <div>{ResourceManager.getString("no_historical_version")}</div>
      </div>
    );
  }
}