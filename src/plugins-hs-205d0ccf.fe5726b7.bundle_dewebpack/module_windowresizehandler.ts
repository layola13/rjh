interface LayoutData {
  w: number;
  h: number;
  l: number;
  t: number;
  ratio: number;
  updateUIByData(): void;
}

interface ResizeEventData {
  target: Window | HTMLElement;
}

interface ResizeEvent {
  data: ResizeEventData;
}

function handleWindowResize(event: ResizeEvent, layoutData: LayoutData): void {
  const target = event.data.target;
  
  if ($.isWindow(target)) {
    const windowWidth = $(target).width() ?? 0;
    const windowHeight = $(target).height() ?? 0;
    
    const INVALID_RATIO = -1;
    
    // Handle width adjustment
    if (layoutData.w + layoutData.l >= windowWidth) {
      if (layoutData.w + layoutData.l >= windowWidth && layoutData.w < windowWidth) {
        layoutData.l = windowWidth - layoutData.w;
      } else if (layoutData.w >= windowWidth) {
        layoutData.l = 0;
        layoutData.w = windowWidth;
        
        if (layoutData.ratio !== INVALID_RATIO) {
          layoutData.h = layoutData.w / layoutData.ratio;
        }
      }
    }
    
    // Handle height adjustment
    if (layoutData.h + layoutData.t >= windowHeight) {
      if (layoutData.h + layoutData.t >= windowHeight && layoutData.h < windowHeight) {
        layoutData.t = windowHeight - layoutData.h;
      } else if (layoutData.h >= windowHeight) {
        layoutData.t = 0;
        layoutData.h = windowHeight;
        
        if (layoutData.ratio !== INVALID_RATIO) {
          layoutData.w = layoutData.h * layoutData.ratio;
        }
      }
    }
  }
  
  layoutData.updateUIByData();
}