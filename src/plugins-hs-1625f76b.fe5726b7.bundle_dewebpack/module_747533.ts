import React from 'react';
import ReactDOM from 'react-dom';

interface DragIconProps {
  dataSrc: string;
  classes?: string;
  clickhandle?: (event: React.MouseEvent<HTMLDivElement>) => void;
  mousedownhandle?: (event: React.MouseEvent<HTMLDivElement>) => void;
  mouseenterhandle?: (event: React.MouseEvent<HTMLDivElement>) => void;
  mouseleavehandle?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

interface CommandManager {
  receive(command: string, payload: DragEventPayload | ClickEventPayload): void;
}

interface HSApplication {
  cmdManager: CommandManager;
}

interface DragEventPayload {
  event: MouseEvent | React.MouseEvent<HTMLDivElement>;
  icon: string;
}

interface ClickEventPayload {
  event: MouseEvent;
  icon: string;
}

declare global {
  namespace HSApp {
    class App {
      static getApp(): HSApplication;
    }
  }
}

class DragIcon extends React.Component<DragIconProps> {
  private mouseMove?: (event: MouseEvent) => void;
  private mouseUp?: (event: MouseEvent) => void;

  constructor(props: DragIconProps) {
    super(props);
    this.onMouseDown = this.onMouseDown.bind(this);
  }

  componentWillUnmount(): void {
    if (this.mouseMove) {
      document.removeEventListener('mousemove', this.mouseMove);
    }
    if (this.mouseUp) {
      document.removeEventListener('mouseup', this.mouseUp);
    }
  }

  domNode(): Element | Text | null {
    return ReactDOM.findDOMNode(this);
  }

  onMouseDown(event: React.MouseEvent<HTMLDivElement>): void {
    const { mousedownhandle, dataSrc } = this.props;
    const app = HSApp.App.getApp();

    mousedownhandle?.(event);

    let hasMoved = false;

    app.cmdManager.receive('dragStart', {
      event,
      icon: dataSrc
    });

    this.mouseMove = (moveEvent: MouseEvent): void => {
      hasMoved = true;
      app.cmdManager.receive('dragMove', {
        event: moveEvent,
        icon: dataSrc
      });
    };

    this.mouseUp = (upEvent: MouseEvent): void => {
      if (this.mouseMove) {
        document.removeEventListener('mousemove', this.mouseMove);
      }
      if (this.mouseUp) {
        document.removeEventListener('mouseup', this.mouseUp);
      }

      if (hasMoved) {
        app.cmdManager.receive('dragEnd', {
          event: upEvent,
          icon: dataSrc
        });
      } else {
        app.cmdManager.receive('mouseClick', {
          event: upEvent,
          icon: dataSrc
        });
      }
    };

    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
  }

  render(): React.ReactElement {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          cursor: 'pointer',
          position: 'absolute'
        }}
        onClick={this.props.clickhandle}
        onMouseDown={this.onMouseDown}
        onMouseEnter={this.props.mouseenterhandle}
        onMouseLeave={this.props.mouseleavehandle}
      >
        <img
          className={this.props.classes}
          src={this.props.dataSrc}
          alt=""
          draggable={false}
        />
      </div>
    );
  }
}

export default DragIcon;