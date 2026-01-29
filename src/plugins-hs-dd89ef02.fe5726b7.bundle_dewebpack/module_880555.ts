interface RenderItem {
  getRenderItem(): JSX.Element;
}

class LoginStatusModule implements RenderItem {
  order: number;

  constructor() {
    this.order = 1000;
  }

  getRenderItem(): JSX.Element {
    return React.createElement(LoginStatusComp, null);
  }
}

export default LoginStatusModule;