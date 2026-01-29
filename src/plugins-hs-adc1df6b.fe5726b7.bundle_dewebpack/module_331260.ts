interface BottomlineProps {
  visible: boolean;
}

export default function Bottomline(props: BottomlineProps): JSX.Element {
  let className = "bottomline";
  
  if (!props.visible) {
    className += " hidden";
  }
  
  return React.createElement("li", {
    className: className
  });
}