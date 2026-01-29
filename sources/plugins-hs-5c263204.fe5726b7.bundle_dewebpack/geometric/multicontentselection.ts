interface ProxyObject {
  getDoor(element: unknown): unknown[] | null | undefined;
}

interface ContentElement {
  getProxyObject(): ProxyObject | null | undefined;
}

interface GizmoConstructor {
  new (
    element: unknown,
    type: unknown,
    contents: ContentElement[],
    options: unknown,
    doors: unknown[]
  ): unknown;
}

declare const HSApp: {
  View: {
    Base: {
      Gizmo: new (...args: unknown[]) => MultiContentselectionBase;
    };
  };
};

interface MultiContentselectionBase {
  addChildGizmo(gizmo: unknown): void;
}

export class MultiContentselection extends HSApp.View.Base.Gizmo {
  constructor(
    element: unknown,
    type: unknown,
    contents: ContentElement[],
    options: unknown
  ) {
    super(element, type, contents);
    this._addDimension(element, type, contents, options);
  }

  private _addDimension(
    element: unknown,
    type: unknown,
    contents: ContentElement[],
    options: unknown
  ): void {
    const doors: unknown[] = [];

    contents.forEach((content) => {
      const proxyObject = content.getProxyObject();
      const doorList = proxyObject?.getDoor(content);

      if (doorList != null && doorList.length) {
        doors.push(...doorList);
      }
    });

    this.addChildGizmo(
      new (u as unknown as GizmoConstructor)(element, type, contents, options, doors)
    );
  }
}

declare const u: GizmoConstructor;