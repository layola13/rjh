import React from 'react';
import { VersionListModal, LIMIT } from './720239';

interface HistoricalVersionItem {
  versionId: string;
  [key: string]: unknown;
}

interface HistoricalVersionListResponse {
  list: HistoricalVersionItem[];
  total: number;
  [key: string]: unknown;
}

interface GetListDataParams {
  offset: number;
  limit: number;
  versionTypeList: string;
  saveType?: number;
}

interface HistoricalVersionFrameProps {
  getListData: (params: GetListDataParams) => Promise<HistoricalVersionListResponse>;
  onOpen: (versionId: string) => void;
  onCancel: () => void;
}

interface HistoricalVersionFrameState {
  list: HistoricalVersionItem[];
  newestVersionId: string | undefined;
  currentPage: number;
  showFilter: boolean;
  total: number;
  onlyManual: boolean;
  disableSubmit: boolean;
  selectedVersionId: string | undefined;
}

export class HistoricalVersionFrame extends React.Component<
  HistoricalVersionFrameProps,
  HistoricalVersionFrameState
> {
  constructor(props: HistoricalVersionFrameProps) {
    super(props);

    this.state = {
      list: [],
      newestVersionId: undefined,
      currentPage: 1,
      showFilter: false,
      total: 0,
      onlyManual: false,
      disableSubmit: true,
      selectedVersionId: undefined,
    };

    this.onPageChange = this.onPageChange.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onSelectVersion = this.onSelectVersion.bind(this);
    this.onOpen = this.onOpen.bind(this);
  }

  componentDidMount(): void {
    this.getListData(true);
  }

  getListData(isInitialLoad: boolean = false): Promise<void> {
    const { getListData } = this.props;
    const { currentPage, onlyManual } = this.state;

    const params: GetListDataParams = {
      offset: (currentPage - 1) * LIMIT,
      limit: LIMIT,
      versionTypeList: JSON.stringify([HSFPConstants.DesignVersionType.NormalVersionType]),
    };

    if (onlyManual) {
      params.saveType = 1;
    }

    return getListData(params)
      .then((response) => {
        const { list, total } = response;
        const newState: Partial<HistoricalVersionFrameState> = { ...response };

        if (isInitialLoad) {
          Object.assign(newState, {
            currentPage: 1,
            showFilter: total > 0,
            newestVersionId: list[0]?.versionId,
          });
        }

        this.setState(newState as HistoricalVersionFrameState);
      })
      .catch(() => {
        this.setState({ list: [] });
      });
  }

  onPageChange(page: number): void {
    this.setState({ currentPage: page }, () => this.getListData());
  }

  onFilterChange(onlyManual: boolean): void {
    this.setState(
      {
        onlyManual,
        currentPage: 1,
      },
      () => this.getListData()
    );
  }

  onSelectVersion(versionId: string): void {
    this.setState({
      selectedVersionId: versionId,
      disableSubmit: false,
    });
  }

  onOpen(versionId: string): void {
    const { onOpen } = this.props;
    onOpen(versionId);
  }

  render(): React.ReactElement {
    return (
      <VersionListModal
        {...this.state}
        onPageChange={this.onPageChange}
        onFilterChange={this.onFilterChange}
        onSelectVersion={this.onSelectVersion}
        onOpen={this.onOpen}
        onCancel={this.props.onCancel}
      />
    );
  }
}