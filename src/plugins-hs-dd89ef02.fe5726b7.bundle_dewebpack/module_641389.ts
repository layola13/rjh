import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import React from 'react';

interface Position {
  top: number;
  left: number;
}

interface Size {
  width: number;
  height: number;
}

interface TargetSize extends Size, Position {
  right: number;
  bottom: number;
}

interface TargetOffset extends Size, Position {
  style: {
    marginTop: number;
    marginLeft: number;
    marginBottom: number;
    marginRight: number;
  };
}

interface Step {
  target: string | HTMLElement | HTMLElement[];
  title: string;
  skip?: string;
  btntext?: string;
  contents: React.ReactNode;
}

interface WorkflowViewerProps {
  steps: Step[];
  keytype: string;
  baseurl: string;
}

interface WorkflowViewerState {
  currentIndex: number;
}

interface CardViewerRef {
  setState: (state: { position: Position }) => void;
  close: () => void;
  refs: {
    scrollbar: HTMLElement;
  };
}

interface UtilityModule {
  getTargetPoint: (target: TargetSize, container: Size) => Position;
  getOffset: (element: HTMLElement) => Position;
}

declare const UtilityFunctions: UtilityModule;
declare const CardViewer: React.ComponentClass<any>;

class WorkflowViewer extends React.Component<WorkflowViewerProps, WorkflowViewerState> {
  static propTypes = {
    steps: PropTypes.array,
    keytype: PropTypes.string,
    baseurl: PropTypes.string
  };

  static defaultProps: Partial<WorkflowViewerProps> = {};

  private itemNum: number = 0;
  private refs: {
    cardviewer: CardViewerRef;
    cardcontainer: HTMLElement;
  };

  constructor(props: WorkflowViewerProps) {
    super(props);
    this.state = {
      currentIndex: 0
    };
  }

  componentDidMount(): void {
    this.updatePosition();
  }

  componentDidUpdate(): void {
    this.updatePosition();
  }

  componentWillUnmount(): void {}

  /**
   * Updates the position of the card viewer based on the current target element
   */
  updatePosition(): void {
    const targetSize = this.computeTargetSize();
    if (!targetSize) return;

    const cardViewerNode = ReactDOM.findDOMNode(this.refs.cardviewer) as HTMLElement;
    const containerSize: Size = {
      width: $(cardViewerNode).outerWidth() ?? 0,
      height: $(cardViewerNode).outerHeight() ?? 0
    };

    const position = UtilityFunctions.getTargetPoint(
      {
        width: targetSize.width,
        height: targetSize.height,
        top: targetSize.top,
        left: targetSize.left,
        right: targetSize.right,
        bottom: targetSize.bottom
      },
      containerSize
    );

    this.refs.cardviewer.setState({ position });
  }

  /**
   * Handles action calls to navigate between steps
   */
  actionCall(stepIndex: string | number): void {
    const nextIndex = isNaN(parseInt(String(stepIndex), 10))
      ? this.state.currentIndex + 1
      : Number(stepIndex);

    this.updatePosition();

    if (nextIndex < this.itemNum) {
      this.setState({ currentIndex: nextIndex });
      $(this.refs.cardviewer.refs.scrollbar).scrollTop(0);
    } else {
      this.refs.cardviewer.close();
    }
  }

  /**
   * Computes the size and position of the target element(s)
   */
  computeTargetSize(): TargetSize | null {
    const target = this.props.steps[this.state.currentIndex].target;
    let targetElements: HTMLElement[] = [];

    if (typeof target === 'string') {
      const nodeList = document.querySelectorAll<HTMLElement>(target);
      for (let i = 0, length = nodeList.length; i < length; i++) {
        const element = nodeList.item(i);
        if (element?.offsetParent !== null) {
          targetElements.push(element);
        }
      }
    } else {
      targetElements = Array.isArray(target) ? target : [target];
    }

    const offsets: TargetOffset[] = [];

    for (let i = 0, length = targetElements.length; i < length; i++) {
      const element = targetElements[i];
      const offset = UtilityFunctions.getOffset(element);
      const computedStyle = element.currentStyle || window.getComputedStyle(element);

      offsets.push({
        width: element.offsetWidth,
        height: element.offsetHeight,
        top: offset.top < 0 ? 0 : offset.top,
        left: offset.left < 0 ? 0 : offset.left,
        style: {
          marginTop: parseInt(computedStyle.marginTop, 10) || 0,
          marginLeft: parseInt(computedStyle.marginLeft, 10) || 0,
          marginBottom: parseInt(computedStyle.marginBottom, 10) || 0,
          marginRight: parseInt(computedStyle.marginRight, 10) || 0
        }
      });
    }

    const mergedOffset =
      offsets.length > 1
        ? offsets.reduce((acc, current) => {
            if (acc.top === current.top) {
              return {
                height: acc.height,
                width: acc.width + current.width + acc.style.marginRight + current.style.marginLeft,
                top: acc.top,
                left: acc.left > current.left ? current.left : acc.left,
                style: acc.style
              };
            } else if (acc.left === current.left) {
              return {
                height: acc.height + current.height + acc.style.marginTop + current.style.marginBottom,
                width: acc.width,
                top: acc.top > current.top ? current.top : acc.top,
                left: acc.left,
                style: acc.style
              };
            }
            return acc;
          })
        : offsets[0];

    if (!mergedOffset) return null;

    return {
      width: mergedOffset.width,
      height: mergedOffset.height,
      top: mergedOffset.top,
      left: mergedOffset.left,
      bottom: $(window).height()! - mergedOffset.top - mergedOffset.height,
      right: $(window).width()! - mergedOffset.left - mergedOffset.width
    };
  }

  render(): React.ReactNode {
    const { steps, keytype, baseurl } = this.props;
    this.itemNum = steps.length;

    const currentStep = steps[this.state.currentIndex];
    const targetSize = this.computeTargetSize();

    if (!targetSize) return null;

    const highlightStyle: React.CSSProperties = {
      width: targetSize.width,
      height: targetSize.height
    };

    const overlayStyle: React.CSSProperties = {
      width: targetSize.width,
      height: targetSize.height,
      borderTopWidth: targetSize.top,
      borderRightWidth: targetSize.right,
      borderBottomWidth: targetSize.bottom,
      borderLeftWidth: targetSize.left
    };

    const cardViewerElement = React.createElement(CardViewer, {
      ref: 'cardviewer',
      viewertitle: currentStep.title,
      skipmsg: currentStep.skip,
      btntext: currentStep.btntext,
      keytype,
      actioncall: this.actionCall.bind(this),
      contents: currentStep.contents,
      baseurl
    });

    let pagination: React.ReactElement | string = '';

    if (steps?.length) {
      const paginationItems: React.ReactElement[] = [];

      for (let i = 0, length = steps.length; i < length; i++) {
        const activeClass = this.state.currentIndex === i ? 'actived' : '';

        paginationItems.push(
          React.createElement(
            'li',
            {
              key: i,
              onClick: this.actionCall.bind(this, i),
              className: 'pageitem'
            },
            React.createElement('a', {
              className: `pageinationitem ${activeClass}`
            }, ' ')
          )
        );
      }

      pagination = React.createElement('ul', { className: 'paginationlist' }, paginationItems);
    }

    return React.createElement(
      'div',
      { className: 'workflowviewer' },
      React.createElement(
        'div',
        { className: 'overlayer', style: overlayStyle },
        React.createElement('div', {
          className: 'targetctn highlightcontainer',
          style: highlightStyle
        })
      ),
      React.createElement('div', { className: 'paginationgroup hidden' }, pagination),
      React.createElement('div', { ref: 'cardcontainer', className: 'cardcontainer' }, cardViewerElement)
    );
  }
}

export default WorkflowViewer;