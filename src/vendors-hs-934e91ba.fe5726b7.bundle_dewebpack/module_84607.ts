export const nativeFinalizationRegistry: FinalizationRegistry<{ isDeleted: () => boolean; delete: () => void }> | undefined =
  typeof FinalizationRegistry === "undefined"
    ? undefined
    : new FinalizationRegistry((target) => {
        if (!target.isDeleted()) {
          target.delete();
        }
      });