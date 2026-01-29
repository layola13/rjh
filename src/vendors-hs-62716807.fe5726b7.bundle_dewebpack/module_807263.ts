export default function removeClass(element: Element, className: string): void {
  if (element.classList) {
    element.classList.remove(className);
  } else if (typeof (element as HTMLElement).className === "string") {
    (element as HTMLElement).className = removeClassNameFromString(
      (element as HTMLElement).className,
      className
    );
  } else {
    const currentClass =
      ((element as HTMLElement).className &&
        (element as SVGElement).className.baseVal) ??
      "";
    element.setAttribute("class", removeClassNameFromString(currentClass, className));
  }
}

function removeClassNameFromString(classString: string, classToRemove: string): string {
  return classString
    .replace(new RegExp(`(^|\\s)${classToRemove}(?:\\s|$)`, "g"), "$1")
    .replace(/\s+/g, " ")
    .replace(/^\s*|\s*$/g, "");
}