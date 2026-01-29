interface InlineEditOptions {
  name: string;
  type: string;
  eventname: string;
}

interface InlineEditEventParameter {
  element: JQuery;
  value: string;
}

interface InlineEditEvent extends JQuery.Event {
  parameter: InlineEditEventParameter;
}

declare global {
  interface JQuery {
    inlineEdit(options?: Partial<InlineEditOptions>): JQuery;
  }
}

const KEYCODE_ESCAPE = 27;
const KEYCODE_ENTER = 13;

(($: JQueryStatic): void => {
  $.fn.inlineEdit = function(options?: Partial<InlineEditOptions>): JQuery {
    const settings: InlineEditOptions = $.extend(
      {},
      {
        name: "temp",
        type: "text",
        eventname: "savedata"
      },
      options ?? {}
    );

    const inputHtml = `<input name="${settings.name}" type="${settings.type}"/>`;

    $(this).hover(
      function(): void {
        $(this).addClass("hover");
      },
      function(): void {
        $(this).removeClass("hover");
      }
    );

    $(this).on("click", function(event: JQuery.Event): void {
      const element = $(this);
      const originalValue = $(this).attr("title") ?? "";

      element.html(inputHtml);

      const input = element.find(`input[name=${settings.name}]`);
      input.val(originalValue);
      input.addClass("focus");
      input.focus();
      input.select();

      input
        .on("click", (clickEvent: JQuery.Event): boolean => {
          clickEvent.preventDefault();
          return false;
        })
        .on("blur", function(blurEvent: JQuery.Event): void {
          const newValue = $(this).val() as string;
          $(this).remove();

          if (newValue !== "") {
            element.text(newValue);
            element.attr("title", newValue);
            element.trigger({
              type: settings.eventname,
              parameter: {
                element: element,
                value: newValue
              }
            } as InlineEditEvent);
          }
        })
        .on("keyup", function(keyEvent: JQuery.KeyUpEvent): void {
          if (keyEvent.keyCode === KEYCODE_ESCAPE) {
            $(this).remove();
            element.text(originalValue);
          } else if (keyEvent.keyCode === KEYCODE_ENTER) {
            const newValue = $(this).val() as string;

            if (newValue !== "") {
              $(this).remove();
              element.text(newValue);
              element.attr("title", newValue);
              element.trigger({
                type: settings.eventname,
                parameter: {
                  element: element,
                  value: newValue
                }
              } as InlineEditEvent);
            }
          }
        });
    });

    return this;
  };
})(jQuery);