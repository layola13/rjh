function getRenderItem<T>(e: { value: string }): T {
    return ResourceManager.t(e.value);
}