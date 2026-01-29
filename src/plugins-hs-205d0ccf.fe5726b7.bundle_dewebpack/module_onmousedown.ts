function onMouseDown(event: MouseEvent): void {
  this.setState({
    currentSelectedTab: "view"
  });
  
  this.props.onSwitch3DView(HSApp.View.ViewModeEnum.OrbitView);
}