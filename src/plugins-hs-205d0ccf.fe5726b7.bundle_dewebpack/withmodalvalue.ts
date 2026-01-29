import React, { createRef, Component, RefObject } from 'react';
import ReactDOM from 'react-dom';
import { DraggableModal, IconfontView } from './500992';
import { modalContext } from './573714';
import { ThemeContext } from './806794';

interface ModalData {
  [key: string]: unknown;
}

interface ZoomableConfig {
  used?: boolean;
  onZoomStart?: () => void;
  onZoomEnd?: () => void;
}

interface DraggableConfig {
  handle: string;
  onStart: () => void;
  onStop: () => void;
}

interface DraggableModalRef {
  current: {
    state: {
      positionX: number;
    };
    setModalSize?: (width: number, height: number) => void;
    getModalSize: () => { width: number; height: number };
    changePosition: (x: number) => void;
  } | null;
}

interface WithModalValueProps {
  width?: number;
  height?: number;
  zoomAble?: Partial<ZoomableConfig>;
  close: () => void;
  defaultPositionX?: number;
  defaultPositionY?: number;
  data: ModalData;
}

interface TeachingModalState {
  width: number;
  height: number;
  zoomable: ZoomableConfig;
}

interface IframeEventRecord {
  dom: HTMLElement;
  pointerEvents: string;
}

interface ModalContextValue {
  setSize: (width: number, height: number, align?: 'left' | 'right') => void;
  setZoomable: (config: Partial<ZoomableConfig>) => void;
  modalData: ModalData;
}

const IFRAME_SELECTORS = ['#newwebcadFrame'];

export function WithModalValue<P extends object>(
  WrappedComponent: React.ComponentType<P & ModalContextValue>
): React.ComponentType<P> {
  return function (props: P) {
    return (
      <modalContext.Consumer>
        {(contextValue: ModalContextValue | null) =>
          contextValue && <WrappedComponent {...contextValue} {...props} />
        }
      </modalContext.Consumer>
    );
  };
}

class TeachingModal extends Component<WithModalValueProps, TeachingModalState> {
  static contextType = ThemeContext;
  declare context: React.ContextType<typeof ThemeContext>;

  private readonly defaultZoomable: Pick<ZoomableConfig, 'onZoomStart' | 'onZoomEnd'>;
  private draggableModal: RefObject<DraggableModalRef['current']>;
  private cancelEventIframes?: IframeEventRecord[];

  constructor(props: WithModalValueProps) {
    super(props);

    this.defaultZoomable = {
      onZoomStart: this.startMoveOrZoom,
      onZoomEnd: this.endMoveOrZoom,
    };

    this.state = {
      width: props.width || 300,
      height: props.height || 470,
      zoomable: {
        used: false,
        ...props.zoomAble,
        ...this.defaultZoomable,
      },
    };

    this.draggableModal = createRef();
    window.addEventListener('click', this.clearCancelIframeEvents);
  }

  componentWillUnmount(): void {
    this.clearCancelIframeEvents();
    window.removeEventListener('click', this.clearCancelIframeEvents);
  }

  private startMoveOrZoom = (): void => {
    this.clearCancelIframeEvents();
    this.cancelIframeEvents();
  };

  private endMoveOrZoom = (): void => {
    this.clearCancelIframeEvents();
  };

  private setSize = (
    width: number,
    height: number,
    align: 'left' | 'right' = 'left'
  ): void => {
    const currentPositionX = this.draggableModal.current?.state.positionX ?? 0;
    const currentSize = this.draggableModal.current?.getModalSize();

    if (align === 'left') {
      this.draggableModal.current?.setModalSize?.(width, height);
      
      if (currentPositionX + width > window.innerWidth) {
        this.draggableModal.current?.changePosition(window.innerWidth - width - 10);
      }
    } else {
      this.draggableModal.current?.setModalSize?.(width, height);
      
      const newPositionX = Math.max(
        currentPositionX - width + (currentSize?.width ?? 0),
        0
      );
      this.draggableModal.current?.changePosition(newPositionX);
    }
  };

  private setZoomable = (config: Partial<ZoomableConfig>): void => {
    this.setState({
      zoomable: {
        ...this.defaultZoomable,
        ...config,
      },
    });
  };

  private getDraggableModalContextValue(): ModalContextValue {
    return {
      setSize: this.setSize,
      setZoomable: this.setZoomable,
      modalData: this.props.data,
    };
  }

  private cancelIframeEvents(): IframeEventRecord[] {
    const records: IframeEventRecord[] = [];

    IFRAME_SELECTORS.forEach((selector) => {
      const element = document.querySelector<HTMLElement>(selector);
      if (element) {
        records.push({
          dom: element,
          pointerEvents: element.style.pointerEvents,
        });
        element.style.pointerEvents = 'none';
      }
    });

    const rootNode = ReactDOM.findDOMNode(this);
    if (rootNode instanceof Element) {
      const iframes = rootNode.querySelectorAll<HTMLIFrameElement>('iframe');
      for (let i = 0; i < iframes.length; i++) {
        const iframe = iframes[i];
        if (iframe) {
          records.push({
            dom: iframe,
            pointerEvents: iframe.style.pointerEvents,
          });
          iframe.style.pointerEvents = 'none';
        }
      }
    }

    this.cancelEventIframes = records;
    return records;
  }

  private clearCancelIframeEvents = (): void => {
    if (this.cancelEventIframes?.length) {
      this.recoveryIframeEvents(this.cancelEventIframes);
      this.cancelEventIframes = undefined;
    }
  };

  private recoveryIframeEvents(records: IframeEventRecord[]): void {
    records?.forEach((record) => {
      if (record?.dom) {
        record.dom.style.pointerEvents = record.pointerEvents;
      }
    });
  }

  render(): React.ReactNode {
    const { width, height, zoomable } = this.state;
    const { close, defaultPositionX, defaultPositionY, data } = this.props;

    const draggableConfig: DraggableConfig = {
      handle: 'drag-title',
      onStart: this.startMoveOrZoom,
      onStop: this.endMoveOrZoom,
    };

    return (
      <DraggableModal
        ref={this.draggableModal}
        className={`teaching-modal ${this.context}`}
        initialWidth={width}
        initialHeight={height}
        defaultPositionX={defaultPositionX}
        defaultPositionY={defaultPositionY}
        draggable={draggableConfig}
        zoomable={zoomable}
      >
        <modalContext.Provider value={this.getDraggableModalContextValue()}>
          <ModalContent close={close} data={data} />
          <div className="drag-title">
            <IconfontView
              showType="hs_motaihua_tuozhuai"
              customStyle={{
                color: '#D8D8D8',
                fontSize: '10px',
              }}
              bgExtendSize={0}
            />
          </div>
        </modalContext.Provider>
      </DraggableModal>
    );
  }
}

export default TeachingModal;