export class ModuleSet {
    private __value: unknown;

    set value(e: unknown) {
        this.__value = e;
        this.compute();
    }

    get value(): unknown {
        return this.__value;
    }

    compute(): void {
        // Placeholder for compute logic
    }
}