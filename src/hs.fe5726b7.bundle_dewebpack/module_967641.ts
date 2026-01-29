interface CanvasManager {
  resizeCanvas(): void;
  init(): void;
  signalWindowResizeEnd?: any;
}

const canvasManager: CanvasManager = {
  resizeCanvas() {
    const windowWidth = $(window).width();
    const headerHeight = $("#header>header").height();
    const statusBarHeight = $(".statusBar").height();
    const editorHeight = $(window).height() - headerHeight - statusBarHeight;
    
    $("#editor")
      .css("width", `${windowWidth}px`)
      .css("height", `${editorHeight}px`);
  },

  init() {
    this.signalWindowResizeEnd = new HSCore.Util.Signal(this);
    this.resizeCanvas();
    
    let resizeTimeout: number | undefined;
    const self = this;
    
    this.signalWindowResizeEnd.listen(function(event: any) {
      const eventData = event.data;
      if ($.isWindow(eventData.target)) {
        this.resizeCanvas();
      }
    }, this);
    
    $(window).resize((event: JQuery.ResizeEvent) => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        self.signalWindowResizeEnd.dispatch(event);
        resizeTimeout = undefined;
      }, 200);
    });
  }
};

export default canvasManager;