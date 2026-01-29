interface DropdownOption {
  id: string;
  label: string;
  icon: string;
  documentStatus: number;
}

type ChangeCallback = (status: number) => void;

class SettingDropdown {
  private container: JQuery;
  private onChangeCallback: ChangeCallback | null;
  private options: DropdownOption[] | null;
  private privacyMouseUpHandler: ((event: MouseEvent) => void) | null;

  constructor(container: JQuery, onChangeCallback?: ChangeCallback) {
    this.container = container;
    this.onChangeCallback = onChangeCallback ?? null;
    this.options = null;
    this.privacyMouseUpHandler = null;
  }

  static create(
    container: JQuery,
    defaultStatus: number,
    customOptions: DropdownOption[] | null,
    callback?: ChangeCallback
  ): SettingDropdown {
    const dropdown = new SettingDropdown(container, callback);
    dropdown.setOptions(customOptions);
    dropdown.buildHtml();
    dropdown.setDefaultStatus(defaultStatus);
    dropdown.bindEvents();
    return dropdown;
  }

  static getOptionsFromPartner(): DropdownOption[] | null {
    return null;
  }

  setOptions(customOptions: DropdownOption[] | null): void {
    this.options = customOptions;
    
    if (!this.options) {
      this.options = [
        {
          id: "public",
          label: ResourceManager.getString("privacy_public") + 
                 (HSApp.Config.TENANT === "fp" ? "[Beta]" : ""),
          icon: "res/svgs/editable.svg",
          documentStatus: HSCore.Doc.DocumentStatus.Public
        },
        {
          id: "private",
          label: ResourceManager.getString("privacy_private"),
          icon: "res/svgs/private.svg",
          documentStatus: HSCore.Doc.DocumentStatus.Private
        }
      ];
    }
  }

  buildHtml(): void {
    this.container.append($("<ul class='dropdownwrapper'><li class='current-option'></li></ul>"));

    this.options?.forEach((option) => {
      let iconHtml = "<span class='optionicon'><img class='injecticon' src='iconsrc'></img></span>";
      iconHtml = iconHtml
        .replace("optionicon", `icon ${option.id}`)
        .replace("iconsrc", option.icon);

      const currentOption = this.container.find(".dropdownwrapper").find(".current-option");
      currentOption.append($(iconHtml));
      
      const iconElement = currentOption.find(`.icon.${option.id}`).find(".injecticon")[0];
      ResourceManager.injectSVGImage(iconElement);

      let optionHtml = "<li class='option dropdownitem' data='itemid'><span class='icon'><img class='injecticon' src='iconsrc'></img></span><span class='text'></span></li>";
      optionHtml = optionHtml
        .replace("dropdownitem", `${option.id}-option`)
        .replace("itemid", option.id)
        .replace("iconsrc", option.icon);

      this.container.find(".dropdownwrapper").append($(optionHtml));
      
      const optionElement = this.container.find(".dropdownwrapper").find(`.${option.id}-option`);
      optionElement.find(".text").html(option.label);
      
      const optionIconElement = optionElement.find(".icon").find(".injecticon")[0];
      ResourceManager.injectSVGImage(optionIconElement);
      
      optionElement.hide();
    });

    const currentOption = this.container.find(".dropdownwrapper").find(".current-option");
    currentOption.append($("<span class='text'></span><span class='dropDownArrow'><span class='injecticon' data-src='res/svgs/arrow.svg'></span></span>"));
    
    const arrowElement = currentOption.find(".dropDownArrow").find(".injecticon")[0];
    ResourceManager.injectSVGImage(arrowElement);
  }

  getOptionByStatus(status: number): DropdownOption | null {
    if (!this.options) return null;

    for (const option of this.options) {
      if (option.documentStatus === status) {
        return option;
      }
    }
    return null;
  }

  getOptionByKey(key: string): DropdownOption | null {
    if (!this.options) return null;

    for (const option of this.options) {
      if (option.id === key) {
        return option;
      }
    }
    return null;
  }

  setDefaultStatus(status: number): void {
    const currentOption = this.container.find(".dropdownwrapper").find(".current-option");

    this.options?.forEach((option) => {
      const optionElement = this.container.find(".dropdownwrapper").find(`.${option.id}-option`);
      optionElement.hide();

      if (option.documentStatus === status) {
        currentOption.find(`.icon.${option.id}`).show();
        currentOption.find(".text").html(option.label);
        currentOption.removeClass("border");
        currentOption.find(".dropDownArrow").removeClass("flipV");
        currentOption.find(".dropDownArrow").removeClass("show");
      } else {
        currentOption.find(`.icon.${option.id}`).hide();
      }
    });

    this.hideDropdown();
  }

  bindEvents(): void {
    const currentOption = this.container.find(".dropdownwrapper").find(".current-option");
    
    currentOption.on("click", (event) => {
      event.preventDefault();

      const firstOption = this.options?.[0];
      if (!firstOption) return;

      const firstOptionElement = this.container.find(".dropdownwrapper").find(`.${firstOption.id}-option`);
      const displayStatus = firstOptionElement.css("display");
      const currentOptionElement = this.container.find(".dropdownwrapper").find(".current-option");
      const arrowElement = currentOptionElement.find(".dropDownArrow");

      if (displayStatus === "none") {
        currentOptionElement.addClass("border");
        arrowElement.addClass("show");
        arrowElement.addClass("flipV");
        this.addPrivacyMouseUpHandler();
        this.showDropdown();
      } else {
        currentOptionElement.removeClass("border");
        arrowElement.removeClass("flipV");
        arrowElement.removeClass("show");
        this.hideDropdown();
        this.removePrivacyMouseUpHandler();
      }
    });

    this.options?.forEach((option) => {
      const optionElement = this.container.find(".dropdownwrapper").find(`.${option.id}-option`);
      
      optionElement.on("click", (event) => {
        event.preventDefault();

        const optionId = $(event.currentTarget).attr("data");
        if (!optionId) return;

        const selectedOption = this.getOptionByKey(optionId);
        if (!selectedOption) return;

        this.setDefaultStatus(selectedOption.documentStatus);
        this.onChangeCallback?.(selectedOption.documentStatus);
      });
    });

    this.container.find(".dropdownwrapper li").hover(
      function() {
        $(this).addClass("hover");
      },
      function() {
        $(this).removeClass("hover");
      }
    );

    currentOption.hover(
      () => {
        this.container.find(".dropdownwrapper").find(".current-option").find(".dropDownArrow").addClass("hover");
      },
      () => {
        this.container.find(".dropdownwrapper").find(".current-option").find(".dropDownArrow").removeClass("hover");
      }
    );
  }

  hideDropdown(): void {
    this.options?.forEach((option) => {
      this.container.find(".dropdownwrapper").find(`.${option.id}-option`).hide();
    });
  }

  showDropdown(): void {
    this.options?.forEach((option) => {
      this.container.find(".dropdownwrapper").find(`.${option.id}-option`).show();
    });
  }

  addPrivacyMouseUpHandler(): void {
    if (!this.privacyMouseUpHandler) {
      this.privacyMouseUpHandler = (event: MouseEvent) => {
        const dropdownWrapper = this.container.find(".dropdownwrapper");
        const target = event.target as HTMLElement;

        if (!dropdownWrapper.is(target) && dropdownWrapper.has(target).length === 0) {
          dropdownWrapper.find(".current-option").removeClass("border");
          dropdownWrapper.find(".current-option").find(".dropDownArrow").removeClass("flipV");
          dropdownWrapper.find(".current-option").find(".dropDownArrow").removeClass("show");
          this.hideDropdown();
          this.removePrivacyMouseUpHandler();
        }
      };

      document.documentElement.addEventListener("mouseup", this.privacyMouseUpHandler, false);
    }
  }

  removePrivacyMouseUpHandler(): void {
    if (this.privacyMouseUpHandler) {
      document.documentElement.removeEventListener("mouseup", this.privacyMouseUpHandler, false);
      this.privacyMouseUpHandler = null;
    }
  }

  onContainerShow(): void {
    this.addPrivacyMouseUpHandler();
  }

  onContainerHide(): void {
    this.removePrivacyMouseUpHandler();
  }

  onRemoved(): void {
    this.removePrivacyMouseUpHandler();
  }
}

declare global {
  interface Window {
    SettingDropdown: typeof SettingDropdown;
  }
}

window.SettingDropdown = SettingDropdown;