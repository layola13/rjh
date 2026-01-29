interface SearchHistoryProps {
  status: string;
  cityIdMap: Map<string, string>;
  handleClickSearchItem: (cityId: string, cityName: string, neighborName: string) => void;
}

interface SearchHistoryState {}

class SearchHistory extends React.Component<SearchHistoryProps, SearchHistoryState> {
  constructor(props: SearchHistoryProps) {
    super(props);
  }

  private getListFromLocalStorage(): string[] {
    if (localStorage.getItem("fpIndex0")) {
      const result: string[] = [];
      for (let i = 0; i < 10 && localStorage.getItem(`fpIndex${i}`); i++) {
        const item = localStorage.getItem(`fpIndex${i}`);
        if (item) {
          result.push(item);
        }
      }
      return result;
    }
    return [];
  }

  render(): React.ReactElement {
    const elements: React.ReactElement[] = [];
    const historyList = this.getListFromLocalStorage();

    if (historyList.length > 0) {
      elements.push(
        <div className="search-history-title" key="title">
          {ResourceManager.getString("plugin_fpCollection_search_history")}
        </div>
      );

      for (let index = historyList.length - 1; index >= 0; index--) {
        const item = historyList[index];
        const separatorIndex = item.indexOf("+");
        const cityName = item.slice(0, separatorIndex);
        const neighborName = item.slice(separatorIndex + 1);
        const cityId = this.props.cityIdMap.get(cityName);

        elements.push(
          <div
            className="search-history-item"
            key={index}
            onMouseDown={() => {
              if (cityId) {
                this.props.handleClickSearchItem(cityId, cityName, neighborName);
              }
            }}
          >
            <span className="city">{cityName}</span>
            {neighborName && <span className="neighborName">{neighborName}</span>}
          </div>
        );
      }
    }

    return (
      <div className={`search-history-container ${this.props.status}`}>
        {elements}
      </div>
    );
  }
}

export default SearchHistory;