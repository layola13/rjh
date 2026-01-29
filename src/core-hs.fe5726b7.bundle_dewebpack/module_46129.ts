export class StateUtil {
  static pathsToArrayStates(paths: number[][][]): HSCore.State.ArrayState[] {
    const arrayStates: HSCore.State.ArrayState[] = [];
    
    paths.forEach((path) => {
      const arrayState = new HSCore.State.ArrayState();
      
      path.forEach((point) => {
        const pointState = new HSCore.State.PointState();
        const axes = ["x", "y", "z"] as const;
        
        axes.forEach((axis) => {
          const state = new HSCore.State.State();
          state.init({ value: point[axis] });
          pointState[`__${axis}`] = state;
        });
        
        arrayState.addPoint(pointState);
      });
      
      arrayStates.push(arrayState);
    });
    
    return arrayStates;
  }

  static collectStates(
    element: any,
    callback: (state: any) => void,
    context?: any
  ): void {
    Object.values(element).forEach((value) => {
      if (value instanceof HSCore.State.ArrayState) {
        value.children.forEach((child) => {
          let axes = ["x", "y", "z"];
          
          if (child instanceof HSCore.State.Point2DState) {
            axes = ["x", "y"];
          }
          
          if (child instanceof HSCore.State.Arc2DState) {
            axes = ["x", "y", "centerAngle"];
          }
          
          axes.forEach((axis) => {
            const state = child[`__${axis}`];
            callback.call(context, state);
          });
          
          callback.call(context, child);
        });
        
        callback.call(context, value);
      } else if (value instanceof HSCore.State.PointState) {
        ["x", "y", "z"].forEach((axis) => {
          const state = value[`__${axis}`];
          callback.call(context, state);
        });
        
        callback.call(context, value);
      } else if (value instanceof HSCore.State.Point2DState) {
        ["x", "y"].forEach((axis) => {
          const state = value[`__${axis}`];
          callback.call(context, state);
        });
        
        callback.call(context, value);
      } else if (value instanceof HSCore.State.Arc2DState) {
        ["x", "y", "centerAngle"].forEach((axis) => {
          const state = value[`__${axis}`];
          callback.call(context, state);
        });
        
        callback.call(context, value);
      } else if (value instanceof HSCore.State.State && value.__persistable) {
        callback.call(context, value);
      } else if (Array.isArray(value) && value.length > 0) {
        value.forEach((item) => {
          if (item instanceof HSCore.State.ArrayState) {
            item.children.forEach((child) => {
              let axes = ["x", "y", "z"];
              
              if (child instanceof HSCore.State.Point2DState) {
                axes = ["x", "y"];
              }
              
              if (child instanceof HSCore.State.Arc2DState) {
                axes = ["x", "y", "centerAngle"];
              }
              
              axes.forEach((axis) => {
                const state = child[`__${axis}`];
                callback.call(context, state);
              });
              
              callback.call(context, child);
            });
            
            callback.call(context, item);
          }
        });
      }
    });

    element.forEachChild((child: any) => {
      StateUtil.collectStates.call(context, child, callback);
    });

    if (
      element.instanceOf(HSConstants.ModelClass.NgPAssembly) ||
      element.instanceOf(HSConstants.ModelClass.NgPattern)
    ) {
      element.forEachState((state: any) => callback.call(context, state));
    }
  }

  static forEachState(
    callback: (state: any) => void,
    context?: any
  ): void {
    const document = context || HSCore.Doc.getDocManager().activeDocument;
    
    document.forEachContent((content: any) => {
      StateUtil.collectStates.call(context, content, callback);
    });
    
    document.forEachPattern((pattern: any) => {
      StateUtil.collectStates.call(context, pattern, callback);
    });
  }
}