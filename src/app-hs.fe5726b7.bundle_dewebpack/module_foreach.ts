function forEach<T>(callback: (member: T, index: number) => boolean | void, context?: any): any {
    for (let index = 0, length = this.members.length; index < length; index++) {
        if (callback.call(context, this.members[index], index) === false) {
            return this;
        }
    }
    return this;
}