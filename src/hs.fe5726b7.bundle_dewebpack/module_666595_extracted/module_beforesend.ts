interface BeforeLoadData {
  jqXHR: JQueryXHR;
  ajaxSettings: JQueryAjaxSettings;
}

function beforeSend(
  jqXHR: JQueryXHR,
  ajaxSettings: JQueryAjaxSettings
): boolean | void {
  const eventData: BeforeLoadData = {
    jqXHR,
    ajaxSettings,
    ...additionalData
  };

  return instance._trigger("beforeLoad", event, eventData);
}