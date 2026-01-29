interface NinePatchProps {
  index: number;
  tooltip?: string;
  onSelectionChanged?: (index: number) => void;
}

interface NinePatchData {
  index: number;
  tooltip?: string;
  onSelectionChanged?: (index: number) => void;
}

const createNinePatchBlocks = (
  rowIndex: number,
  activeIndex: number,
  _reserved: number,
  onSelectionChanged: (index: number) => void
): JSX.Element[] => {
  const blocks: JSX.Element[] = [];

  for (let colIndex = 0; colIndex < 3; colIndex++) {
    const blockIndex = 3 * rowIndex + colIndex;
    const className = `nine-patch-block${blockIndex === activeIndex ? " active" : ""}`;
    
    blocks.push(
      React.createElement("span", {
        className,
        key: colIndex,
        onClick: () => onSelectionChanged(blockIndex)
      })
    );
  }

  return blocks;
};

export const NinePatch = ({
  index,
  tooltip = "",
  onSelectionChanged = () => {}
}: NinePatchProps): JSX.Element => {
  const rows: JSX.Element[] = [];

  for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
    rows.push(
      React.createElement("div", {
        key: rowIndex,
        className: "nine-patch-row"
      }, createNinePatchBlocks(rowIndex, index, 0, onSelectionChanged))
    );
  }

  return React.createElement("div", {
    className: "nine-patch-container"
  }, React.createElement("div", {
    className: "nine-patch"
  }, rows));
};

export class NinePatchWidget {
  private _containerElement: HTMLElement;
  private _data: NinePatchData;

  constructor(data: NinePatchData, containerElement: HTMLElement) {
    this._containerElement = containerElement;
    this._data = data;
    this._render(data, containerElement);
  }

  static create(data: NinePatchData, containerElement: HTMLElement): NinePatchWidget {
    return new NinePatchWidget(data, containerElement);
  }

  update(data: Partial<NinePatchData>): void {
    Object.assign(this._data, data);
    this._render(this._data, this._containerElement);
  }

  destroy(): void {
    ReactDOM.unmountComponentAtNode(this._containerElement);
  }

  /**
   * @deprecated Use destroy instead
   */
  destory(): void {
    console.warn("deprecated, use destroy instead!");
    this.destroy();
  }

  private _render(data: NinePatchData, containerElement: HTMLElement): void {
    ReactDOM.render(
      React.createElement(NinePatch, {
        index: data.index,
        tooltip: data.tooltip,
        onSelectionChanged: data.onSelectionChanged
      }),
      containerElement
    );
  }
}