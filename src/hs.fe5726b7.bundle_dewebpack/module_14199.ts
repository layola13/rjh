class SignalValueManager {
  public singalValueChanged: HSCore.Util.Signal<SignalValueManager>;

  constructor() {
    this.singalValueChanged = new HSCore.Util.Signal(this);
  }
}

export default SignalValueManager;