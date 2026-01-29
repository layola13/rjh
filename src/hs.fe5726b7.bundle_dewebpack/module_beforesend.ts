interface BeforeLoadEventData {
  jqXHR: JQueryXHR;
  ajaxSettings: JQueryAjaxSettings;
}

function beforeSend(
  jqXHR: JQueryXHR,
  ajaxSettings: JQueryAjaxSettings
): boolean | void {
  const eventData: BeforeLoadEventData = {
    jqXHR,
    ajaxSettings,
    ...additionalData
  };

  return observer._trigger("beforeLoad", namespace, eventData);
}