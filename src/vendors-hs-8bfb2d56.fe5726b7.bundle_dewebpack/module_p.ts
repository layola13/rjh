function getModule(moduleId: string): unknown {
    const normalizedId = normalizeModuleId(moduleId);
    return resolveModule(modules[normalizedId]);
}

function normalizeModuleId(id: string): string {
    return id;
}

function resolveModule(module: unknown): unknown {
    return module;
}

const modules: Record<string, unknown> = {};