export class Collecter {
  public readonly logName: string;
  public readonly isCollecter: boolean = true;

  constructor(logName: string) {
    this.logName = logName;
  }
}

export default Collecter;