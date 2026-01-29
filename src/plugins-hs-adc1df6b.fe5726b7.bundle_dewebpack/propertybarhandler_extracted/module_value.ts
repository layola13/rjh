interface PropertyBarData {
  type: string;
  label: string;
  id?: string;
  items?: unknown[];
  order?: number;
  className?: string;
}

interface EventData {
  data: PropertyBarData[];
}

function handleCustomizedParametricStairs(event?: EventData): void {
  LiveHint.hide();

  const propertyBarData = event?.data;
  const selectedElement = this.app.selectionManager.selected()[0];

  if (selectedElement instanceof s.HSCore.Model.NCustomizedParametricStairs) {
    propertyBarData.push({
      type: HSFPConstants.PropertyBarType.PropertyBar,
      label: selectedElement.displayName
    });

    const PARAMETER_SETTING_ID = "parameter-setting-first-level";
    const parameterItems = this.getParameterSettingItems(
      selectedElement,
      PARAMETER_SETTING_ID
    );
    const styleItems = this.getStyleSettingItems(selectedElement);

    propertyBarData.push(
      {
        id: PARAMETER_SETTING_ID,
        label: ResourceManager.getString("plugin_propertybar_parameter_setting"),
        type: HSFPConstants.PropertyBarType.FirstLevelNode,
        items: parameterItems,
        order: 10,
        className: "parameter-setting-first-level"
      },
      {
        id: "customized-content-style-setting",
        label: ResourceManager.getString("plugin_propertybar_style_setting"),
        type: HSFPConstants.PropertyBarType.FirstLevelNode,
        items: styleItems,
        order: 20
      }
    );
  }
}