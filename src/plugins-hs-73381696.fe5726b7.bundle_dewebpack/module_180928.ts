import React, { Component, ReactNode, PointerEvent } from 'react';

interface DragDropListProps {
  className?: string;
  nodeSelector: string;
  handleSelector?: string;
  ignoreSelector?: string;
  enableScroll?: boolean;
  scrollSpeed: number;
  children?: ReactNode;
  onDragEnd?: (fromIndex: number, toIndex: number) => void;
}

interface DragDropListState {
  fromIndex: number;
  toIndex: number;
}

enum ScrollDirection {
  None = 0,
  Up = 1,
  Down = 3,
}

const PIXELS_UNIT = 'px';

function getClosest(
  element: EventTarget | null,
  selector: string,
  container: HTMLElement | null
): HTMLElement | null {
  let current = element as HTMLElement | null;
  while (current && current !== container) {
    if (current.matches && current.matches(selector)) {
      return current;
    }
    current = current.parentElement;
  }
  return null;
}

function getDomIndex(element: HTMLElement, ignoreSelector: string): number {
  let index = 0;
  let sibling = element.previousElementSibling;
  while (sibling) {
    if (!ignoreSelector || !sibling.matches(ignoreSelector)) {
      index++;
    }
    sibling = sibling.previousElementSibling;
  }
  return index;
}

function getScrollElement(element: HTMLElement | null): HTMLElement | null {
  let current = element;
  while (current) {
    const overflowY = window.getComputedStyle(current).overflowY;
    if (overflowY === 'auto' || overflowY === 'scroll') {
      return current;
    }
    current = current.parentElement;
  }
  return null;
}

class DragDropList extends Component<DragDropListProps, DragDropListState> {
  private scrollElement: HTMLElement | null = null;
  private scrollTimerId: number = -1;
  private autoScrollDirection: ScrollDirection = ScrollDirection.Down;
  private dropPositionIndicator: HTMLDivElement | null = null;
  private cacheDragTarget: HTMLElement | null = null;
  private dragList: HTMLDivElement | null = null;

  constructor(props: DragDropListProps) {
    super(props);
    
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.autoScroll = this.autoScroll.bind(this);
    
    this.state = {
      fromIndex: -1,
      toIndex: -1,
    };
  }

  componentWillUnmount(): void {
    if (this.dropPositionIndicator?.parentNode) {
      this.dropPositionIndicator.parentNode.removeChild(this.dropPositionIndicator);
      this.dropPositionIndicator = null;
      this.cacheDragTarget = null;
    }
  }

  onMouseDown(event: PointerEvent<HTMLDivElement>): void {
    this.startDrag(event);
  }

  onMouseUp(event: PointerEvent<HTMLDivElement>): void {
    const dragNode = this.getDragNode(event.target);
    if (dragNode) {
      dragNode.removeAttribute('draggable');
      dragNode.ondragstart = null;
      dragNode.ondragend = null;
      dragNode.classList.add('hover-able');
      
      if (dragNode.parentNode instanceof HTMLElement) {
        dragNode.parentNode.ondragenter = null;
        dragNode.parentNode.ondragover = null;
      }
    }
    this.hideDragLine();
  }

  onDragStart(event: DragEvent): void {
    const dragNode = this.getDragNode(event.target);
    if (!dragNode || !event.dataTransfer) {
      return;
    }

    const parentNode = dragNode.parentNode;
    event.dataTransfer.effectAllowed = 'move';
    dragNode.classList.remove('hover-able');

    if (parentNode instanceof HTMLElement) {
      parentNode.ondragenter = this.onDragEnter;
      parentNode.ondragover = (e: DragEvent) => {
        e.preventDefault();
        return true;
      };
    }

    const index = getDomIndex(dragNode, this.props.ignoreSelector ?? '');
    this.setState({
      fromIndex: index,
      toIndex: index,
    });
    this.scrollElement = getScrollElement(parentNode as HTMLElement);
  }

  onDragEnter(event: DragEvent): void {
    const dragNode = this.getDragNode(event.target);
    let toIndex: number;

    if (dragNode) {
      toIndex = getDomIndex(dragNode, this.props.ignoreSelector ?? '');
      if (this.props.enableScroll) {
        this.resolveAutoScroll(event, dragNode);
      }
    } else {
      toIndex = -1;
      this.stopAutoScroll();
    }

    this.cacheDragTarget = dragNode;
    this.setState({ toIndex });
    this.fixDragLine(dragNode);
  }

  onDragEnd(event: DragEvent): void {
    const dragNode = this.getDragNode(event.target);
    this.stopAutoScroll();

    if (dragNode) {
      dragNode.removeAttribute('draggable');
      dragNode.ondragstart = null;
      dragNode.ondragend = null;
      dragNode.classList.add('hoverable');

      if (dragNode.parentNode instanceof HTMLElement) {
        dragNode.parentNode.ondragenter = null;
        dragNode.parentNode.ondragover = null;
      }

      if (
        this.state.fromIndex >= 0 &&
        this.state.fromIndex !== this.state.toIndex &&
        this.props.onDragEnd
      ) {
        this.props.onDragEnd(this.state.fromIndex, this.state.toIndex);
      }
    }

    this.hideDragLine();
    this.setState({
      fromIndex: -1,
      toIndex: -1,
    });
  }

  getDragNode(target: EventTarget | null): HTMLElement | null {
    return getClosest(target, this.props.nodeSelector, this.dragList);
  }

  getHandleNode(target: EventTarget | null): HTMLElement | null {
    return getClosest(
      target,
      this.props.handleSelector ?? this.props.nodeSelector,
      this.dragList
    );
  }

  getDragLine(): HTMLDivElement {
    if (!this.dropPositionIndicator) {
      this.dropPositionIndicator = window.document.createElement('div');
      this.dragList?.appendChild(this.dropPositionIndicator);
      this.dropPositionIndicator.className = 'drag-drop-indicator';
    }
    return this.dropPositionIndicator;
  }

  startDrag(event: PointerEvent<HTMLDivElement>): void {
    const handleNode = this.getHandleNode(event.target);
    if (!handleNode) {
      return;
    }

    const dragNode =
      this.props.handleSelector && this.props.handleSelector !== this.props.nodeSelector
        ? this.getDragNode(handleNode)
        : handleNode;

    if (dragNode) {
      handleNode.setAttribute('draggable', 'false');
      dragNode.setAttribute('draggable', 'true');
      dragNode.ondragstart = this.onDragStart;
      dragNode.ondragend = this.onDragEnd;
    }
  }

  resolveAutoScroll(event: DragEvent, targetNode: HTMLElement): void {
    if (!this.scrollElement) {
      return;
    }

    const { top, height } = this.scrollElement.getBoundingClientRect();
    const nodeHeight = targetNode.offsetHeight;
    const mouseY = event.pageY;
    const threshold = nodeHeight;

    this.autoScrollDirection = ScrollDirection.None;

    if (mouseY > top + height - threshold) {
      this.autoScrollDirection = ScrollDirection.Down;
    } else if (mouseY < top + threshold) {
      this.autoScrollDirection = ScrollDirection.Up;
    }

    if (this.autoScrollDirection !== ScrollDirection.None) {
      if (this.scrollTimerId < 0) {
        this.scrollTimerId = window.setInterval(this.autoScroll, 20);
      }
    } else {
      this.stopAutoScroll();
    }
  }

  stopAutoScroll(): void {
    clearInterval(this.scrollTimerId);
    this.scrollTimerId = -1;
    this.fixDragLine(this.cacheDragTarget);
  }

  autoScroll(): void {
    if (!this.scrollElement) {
      return;
    }

    const currentScrollTop = this.scrollElement.scrollTop;

    if (this.autoScrollDirection === ScrollDirection.Down) {
      this.scrollElement.scrollTop = currentScrollTop + this.props.scrollSpeed;
      if (currentScrollTop === this.scrollElement.scrollTop) {
        this.stopAutoScroll();
      }
    } else if (this.autoScrollDirection === ScrollDirection.Up) {
      this.scrollElement.scrollTop = currentScrollTop - this.props.scrollSpeed;
      if (this.scrollElement.scrollTop <= 0) {
        this.stopAutoScroll();
      }
    } else {
      this.stopAutoScroll();
    }
  }

  hideDragLine(): void {
    if (this.dropPositionIndicator) {
      this.dropPositionIndicator.style.display = 'none';
    }
  }

  fixDragLine(targetNode: HTMLElement | null): void {
    const dragLine = this.getDragLine();

    if (
      !targetNode ||
      this.state.fromIndex < 0 ||
      this.state.fromIndex === this.state.toIndex
    ) {
      this.hideDragLine();
      return;
    }

    const { left, top, width, height } = targetNode.getBoundingClientRect();
    let lineTop = this.state.toIndex < this.state.fromIndex ? top : top + height;

    if (this.props.enableScroll && this.scrollElement) {
      const { height: scrollHeight, top: scrollTop } =
        this.scrollElement.getBoundingClientRect();

      if (lineTop < scrollTop - 2 || lineTop > scrollTop + scrollHeight + 2) {
        this.hideDragLine();
        return;
      }
    }

    dragLine.style.left = left + PIXELS_UNIT;
    dragLine.style.width = width + PIXELS_UNIT;
    dragLine.style.top = lineTop + PIXELS_UNIT;
    dragLine.style.display = 'block';
  }

  render(): ReactNode {
    return (
      <div
        role="presentation"
        className={this.props.className}
        onPointerDown={this.onMouseDown}
        onPointerUp={this.onMouseUp}
        ref={(element) => {
          this.dragList = element;
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default DragDropList;