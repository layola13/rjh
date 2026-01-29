type Processor = unknown;

export const PAssemblyProcessor = {
  _prevprocessors: [] as Processor[],

  addPrevProcessor(processor: Processor): void {
    this._prevprocessors.push(processor);
  },

  removePrevProcessor(processor: Processor): Processor[] {
    return this._prevprocessors.splice(this._prevprocessors.indexOf(processor), 1);
  },

  getPrevProcessors(): Processor[] {
    return PAssemblyProcessor._prevprocessors;
  },

  _metabuilders: [] as Processor[],

  addMetaBuilder(builder: Processor): void {
    this._metabuilders.push(builder);
  },

  removeMetaBuilder(builder: Processor): Processor[] {
    return this._metabuilders.splice(this._metabuilders.indexOf(builder), 1);
  },

  getMetaBuilders(): Processor[] {
    return PAssemblyProcessor._metabuilders;
  },

  _postprocessors: [] as Processor[],

  addPostProcessor(processor: Processor): void {
    this._postprocessors.push(processor);
  },

  removePostProcessor(processor: Processor): Processor[] {
    return this._postprocessors.splice(this._postprocessors.indexOf(processor), 1);
  },

  getPostProcessors(): Processor[] {
    return PAssemblyProcessor._postprocessors;
  },

  _prevprocessorsForNewDataModel: [] as Processor[],

  addPrevProcessorForNewDataModel(processor: Processor): void {
    PAssemblyProcessor._prevprocessorsForNewDataModel.push(processor);
  },

  removePrevProcessorForNewDataModel(processor: Processor): void {
    PAssemblyProcessor._prevprocessorsForNewDataModel.splice(
      PAssemblyProcessor._prevprocessorsForNewDataModel.indexOf(processor),
      1
    );
  },

  getPrevProcessorsForNewDataModel(): Processor[] {
    return PAssemblyProcessor._prevprocessorsForNewDataModel;
  },

  _postprocessorsForNewDataModel: [] as Processor[],

  addPostProcessorForNewDataModel(processor: Processor): void {
    PAssemblyProcessor._postprocessorsForNewDataModel.push(processor);
  },

  removePostProcessorForNewDataModel(processor: Processor): void {
    PAssemblyProcessor._postprocessorsForNewDataModel.splice(
      PAssemblyProcessor._postprocessorsForNewDataModel.indexOf(processor),
      1
    );
  },

  getPostProcessorsForNewDataModel(): Processor[] {
    return PAssemblyProcessor._postprocessorsForNewDataModel;
  }
};