export class ConstraintUtil {
  static collectConstraints<T>(
    element: IConstraintElement,
    callback: (constraint: T) => void,
    context?: unknown
  ): void {
    element.forEachChild((child: IConstraintElement) => {
      ConstraintUtil.collectConstraints(child, callback, context);
    });

    if (element.forEachConstraint) {
      element.forEachConstraint((constraint: T) => {
        callback.call(context, constraint);
      });
    }
  }
}

interface IConstraintElement {
  forEachChild(callback: (child: IConstraintElement) => void): void;
  forEachConstraint?<T>(callback: (constraint: T) => void): void;
}