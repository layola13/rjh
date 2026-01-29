function setStateAsync<T>(newState: T): Promise<void> {
    return new Promise<void>((resolve) => {
        this.setState(newState, resolve);
    });
}