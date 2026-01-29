function setAgent(agent: unknown): void {
    this._agent = agent;
    this.forEachChild((child: any) => {
        child._agent = agent;
    });
}