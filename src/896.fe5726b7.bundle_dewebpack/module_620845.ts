interface StyleTypeItem {
  id: string | number;
  name: string;
  [key: string]: unknown;
}

interface BindDataParams {
  roomStyle: string | number;
  [key: string]: unknown;
}

interface WriteResultParams {
  ezhomeRoomStyle: string | number;
  [key: string]: unknown;
}

interface StyleSelectViewProps {
  styleTypeId: string | number;
  styleTypeList: StyleTypeItem[];
  styleTypeChangedNotify: (newStyleId: string | number) => void;
}

declare const React: {
  createElement(
    component: unknown,
    props: StyleSelectViewProps
  ): React.ReactElement;
};

declare const ReactDOM: {
  render(element: React.ReactElement, container: HTMLElement): void;
  unmountComponentAtNode(container: HTMLElement): void;
};

declare namespace React {
  interface ReactElement {
    [key: string]: unknown;
  }
}

class StyleManager {
  private _styleTypeList: StyleTypeItem[];
  private _resultValue: string | number | undefined;
  private _originValue: string | number | undefined;
  private _styleSelectViewElem: React.ReactElement | undefined;
  private _savedDomNode: HTMLElement | undefined;

  constructor(styleTypeList: StyleTypeItem[]) {
    this._styleTypeList = styleTypeList;
    this._resultValue = undefined;
    this._originValue = undefined;
  }

  bindData(data: BindDataParams): void {
    this._resultValue = this._originValue = data.roomStyle;
    this._styleSelectViewElem = React.createElement(
      o.default as unknown,
      {
        styleTypeId: data.roomStyle,
        styleTypeList: this._styleTypeList,
        styleTypeChangedNotify: (newStyleId: string | number) => {
          if (this._resultValue !== newStyleId) {
            this._resultValue = newStyleId;
          }
        }
      }
    );
  }

  show(domNode: HTMLElement): void {
    this._savedDomNode = domNode;
    if (this._styleSelectViewElem) {
      ReactDOM.render(this._styleSelectViewElem, domNode);
    }
  }

  hide(): void {
    if (this._savedDomNode) {
      ReactDOM.unmountComponentAtNode(this._savedDomNode);
      this._savedDomNode = undefined;
    }
  }

  isChanged(): boolean {
    return this._resultValue !== this._originValue;
  }

  writeResult(result: WriteResultParams): void {
    result.ezhomeRoomStyle = this._resultValue;
  }

  needPostProcess(): boolean {
    return false;
  }
}

export default StyleManager;