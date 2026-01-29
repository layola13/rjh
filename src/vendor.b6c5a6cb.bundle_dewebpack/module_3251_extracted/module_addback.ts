function addBack<T>(filter?: string | ((index: number, element: T) => boolean)): any {
    return this.add(
        filter == null 
            ? this.prevObject 
            : this.prevObject.filter(filter)
    );
}