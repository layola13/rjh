interface TouchObject {
  startX: number;
  startY: number;
  curX: number;
  curY: number;
}

interface TrackStyle {
  [key: string]: string | number;
}

interface SliderState {
  animating: boolean;
  autoplaying: number | null;
  currentDirection: number;
  currentLeft: number | null;
  currentSlide: number;
  direction: number;
  dragging: boolean;
  edgeDragged: boolean;
  initialized: boolean;
  lazyLoadedList: number[];
  listHeight: number | null;
  listWidth: number | null;
  scrolling: boolean;
  slideCount: number | null;
  slideHeight: number | null;
  slideWidth: number | null;
  swipeLeft: number | null;
  swiped: boolean;
  swiping: boolean;
  touchObject: TouchObject;
  trackStyle: TrackStyle;
  trackWidth: number;
  targetSlide: number;
}

const defaultSliderState: SliderState = {
  animating: false,
  autoplaying: null,
  currentDirection: 0,
  currentLeft: null,
  currentSlide: 0,
  direction: 1,
  dragging: false,
  edgeDragged: false,
  initialized: false,
  lazyLoadedList: [],
  listHeight: null,
  listWidth: null,
  scrolling: false,
  slideCount: null,
  slideHeight: null,
  slideWidth: null,
  swipeLeft: null,
  swiped: false,
  swiping: false,
  touchObject: {
    startX: 0,
    startY: 0,
    curX: 0,
    curY: 0
  },
  trackStyle: {},
  trackWidth: 0,
  targetSlide: 0
};

export default defaultSliderState;