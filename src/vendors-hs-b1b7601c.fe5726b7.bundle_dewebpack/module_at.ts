function at<T>(e: T, t: number): T {
    return t < 1 ? this.value : this.destination;
}