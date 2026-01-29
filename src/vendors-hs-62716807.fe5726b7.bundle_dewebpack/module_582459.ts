class Cancel {
  public readonly message: string;
  public readonly __CANCEL__ = true;

  constructor(message: string) {
    this.message = message;
  }

  public toString(): string {
    return "Cancel" + (this.message ? ": " + this.message : "");
  }
}

export default Cancel;