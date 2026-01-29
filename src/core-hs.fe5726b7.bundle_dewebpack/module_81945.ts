function isDModel(model: any): model is HSCore.Model.DAssembly | HSCore.Model.DContent | HSCore.Model.DExtruding | HSCore.Model.DMolding | HSCore.Model.DSweep {
    return model instanceof HSCore.Model.DAssembly || 
           model instanceof HSCore.Model.DContent || 
           model instanceof HSCore.Model.DExtruding || 
           model instanceof HSCore.Model.DMolding || 
           model instanceof HSCore.Model.DSweep;
}

function isFlagOnTraceParents(model: any, flag: string): boolean {
    if (!model || !isDModel(model)) {
        return false;
    }

    if (model.isFlagOn(flag)) {
        return true;
    }

    return model.getParentsInPath().some((parent: any) => parent.isFlagOn(flag));
}

function isFlagOnTraceComponentParents(model: any, flag: string): boolean {
    if (!model || !isDModel(model)) {
        return false;
    }

    if (model.isFlagOn(flag)) {
        return true;
    }

    const parentsInPath = model.getParentsInPath();
    const dModelIndex = parentsInPath.findIndex((parent: any) => isDModel(parent));
    
    return parentsInPath.slice(dModelIndex + 1).some((parent: any) => parent.isFlagOn(flag));
}

function getDHolesOfDModel(model: any): HSCore.Model.DHole[] {
    if (model && model instanceof HSCore.Model.DAssembly) {
        return Object.values(model.children).filter(
            (child: any) => child instanceof HSCore.Model.DHole
        ) as HSCore.Model.DHole[];
    }
    return [];
}

function isAlloyDoorWindow(model: any): boolean {
    if (model instanceof HSCore.Model.DAssembly) {
        return model.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedProductsAlloyDoorWindow);
    }
    return false;
}

export { isDModel, isFlagOnTraceParents, isFlagOnTraceComponentParents, getDHolesOfDModel, isAlloyDoorWindow };