interface MotionState {
  height: number;
  opacity: number;
}

interface MotionElement extends HTMLElement {
  scrollHeight: number;
  offsetHeight: number;
}

interface MotionEvent {
  propertyName: string;
}

interface CollapseMotionConfig {
  motionName: string;
  onAppearStart: () => MotionState;
  onEnterStart: () => MotionState;
  onAppearActive: (element: MotionElement) => MotionState;
  onEnterActive: (element: MotionElement) => MotionState;
  onLeaveStart: (element: MotionElement) => Partial<MotionState>;
  onLeaveActive: () => MotionState;
  onAppearEnd: (element: MotionElement, event: MotionEvent) => boolean;
  onEnterEnd: (element: MotionElement, event: MotionEvent) => boolean;
  onLeaveEnd: (element: MotionElement, event: MotionEvent) => boolean;
  motionDeadline: number;
}

const getInitialState = (): MotionState => {
  return {
    height: 0,
    opacity: 0
  };
};

const getActiveState = (element: MotionElement): MotionState => {
  return {
    height: element.scrollHeight,
    opacity: 1
  };
};

const isHeightTransition = (element: MotionElement, event: MotionEvent): boolean => {
  return event.propertyName === "height";
};

const collapseMotion: CollapseMotionConfig = {
  motionName: "ant-motion-collapse",
  onAppearStart: getInitialState,
  onEnterStart: getInitialState,
  onAppearActive: getActiveState,
  onEnterActive: getActiveState,
  onLeaveStart: (element: MotionElement): Partial<MotionState> => {
    return {
      height: element.offsetHeight
    };
  },
  onLeaveActive: getInitialState,
  onAppearEnd: isHeightTransition,
  onEnterEnd: isHeightTransition,
  onLeaveEnd: isHeightTransition,
  motionDeadline: 500
};

export default collapseMotion;