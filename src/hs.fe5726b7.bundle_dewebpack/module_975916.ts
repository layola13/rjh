import publicIcon from './assets/public-icon';
import privateIcon from './assets/private-icon';

interface PrivacyOption {
  id: string;
  label: string;
  icon: string;
  documentStatus: number;
}

type ChangeCallback = (status: number) => void;

class PrivacyDropdown {
  private container: JQuery;
  private onChangeCallback: ChangeCallback | null;
  private options: PrivacyOption[] | null;
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
    changeCallback?: ChangeCallback
  ): PrivacyDropdown {
    const instance = new PrivacyDropdown(container, changeCallback);
    instance.setOptions();
    instance.buildHtml();
    instance.setDefaultStatus(defaultStatus);
    instance.bindEvents();
    return instance;
  }

  static getOptionsFromPartner(): PrivacyOption[] {
    const isFpTenant = HSApp.Config.TENANT === 'fp';
    const publicLabel = 
      ResourceManager.getString('privacy_public') + 
      (isFpTenant ? '[Beta]' : '');

    return [
      {
        id: 'public',
        label: publicLabel,
        icon: publicIcon,
        documentStatus: HSCore.Doc.DocumentStatus.Public
      },
      {
        id: 'private',
        label: ResourceManager.getString('privacy_private'),
        icon: privateIcon,
        documentStatus: HSCore.Doc.DocumentStatus.Private
      }
    ];
  }

  setOptions(): void {
    this.options = PrivacyDropdown.getOptionsFromPartner();

    if (!this.options) {
      this.options = [
        {
          id: 'public',
          label: ResourceManager.getString('privacy_public'),
          icon: 'res/svgs/editable.svg',
          documentStatus: HSCore.Doc.DocumentStatus.Public
        },
        {
          id: 'private',
          label: ResourceManager.getString('privacy_private'),
          icon: 'res/svgs/private.svg',
          documentStatus: HSCore.Doc.DocumentStatus.Private
        }
      ];
    }
  }

  buildHtml(): void {
    this.container.append(
      $("<ul class='privacywrapper dropdownwrapper'><li class='current-option'></li></ul>")
    );

    this.options?.forEach((option) => {
      const iconHtml = `<span class='icon ${option.id}'><img class='injecticon' src='${option.icon}'></img></span>`;
      const currentOption = this.container.find('.privacywrapper').find('.current-option');
      
      currentOption.append($(iconHtml));
      ResourceManager.injectSVGImage(
        currentOption.find(`.icon.${option.id}`).find('.injecticon')[0]
      );

      const dropdownItemHtml = `<li class='${option.id}-option' data='${option.id}'><span class='icon'><img class='injecticon' src='${option.icon}'></img></span><span class='text'></span></li>`;
      
      this.container.find('.privacywrapper').append($(dropdownItemHtml));
      this.container
        .find('.privacywrapper')
        .find(`.${option.id}-option`)
        .find('.text')
        .html(option.label);
      
      ResourceManager.injectSVGImage(
        this.container
          .find('.privacywrapper')
          .find(`.${option.id}-option`)
          .find('.icon')
          .find('.injecticon')[0]
      );

      this.container
        .find('.privacywrapper')
        .find(`.${option.id}-option`)
        .hide();
    });

    const currentOption = this.container.find('.privacywrapper').find('.current-option');
    currentOption.append(
      $("<span class='text'></span><span class='dropDownArrow'><span class='injecticon' data-src='res/svgs/arrow.svg'></span></span>")
    );
    ResourceManager.injectSVGImage(
      currentOption.find('.dropDownArrow').find('.injecticon')[0]
    );
  }

  getOptionByStatus(status: number): PrivacyOption | null {
    if (!this.options) return null;

    for (const option of this.options) {
      if (option.documentStatus === status) {
        return option;
      }
    }
    return null;
  }

  getOptionByKey(key: string): PrivacyOption | null {
    if (!this.options) return null;

    for (const option of this.options) {
      if (option.id === key) {
        return option;
      }
    }
    return null;
  }

  setDefaultStatus(status: number): void {
    const currentOption = this.container
      .find('.privacywrapper')
      .find('.current-option');

    this.options?.forEach((option) => {
      this.container
        .find('.privacywrapper')
        .find(`.${option.id}-option`)
        .hide();

      if (option.documentStatus === status) {
        currentOption.find(`.icon.${option.id}`).show();
        currentOption.find('.text').html(option.label);
        currentOption.removeClass('border');
        currentOption.find('.dropDownArrow').removeClass('flipV');
        currentOption.find('.dropDownArrow').removeClass('show');
      } else {
        currentOption.find(`.icon.${option.id}`).hide();
      }
    });

    this.hideDropdown();
  }

  bindEvents(): void {
    this.container
      .find('.privacywrapper')
      .find('.current-option')
      .on('click', (event) => {
        event.preventDefault();

        const firstOption = this.options?.[0];
        if (!firstOption) return;

        const displayStatus = this.container
          .find('.privacywrapper')
          .find(`.${firstOption.id}-option`)
          .css('display');

        const currentOption = this.container
          .find('.privacywrapper')
          .find('.current-option');
        
        const dropDownArrow = currentOption.find('.dropDownArrow');

        if (displayStatus === 'none') {
          currentOption.addClass('border');
          dropDownArrow.addClass('show');
          dropDownArrow.addClass('flipV');
          this.addPrivacyMouseUpHandler();
          this.showDropdown();
        } else {
          currentOption.removeClass('border');
          dropDownArrow.removeClass('flipV');
          dropDownArrow.removeClass('show');
          this.hideDropdown();
          this.removePrivacyMouseUpHandler();
        }
      });

    this.options?.forEach((option) => {
      this.container
        .find('.privacywrapper')
        .find(`.${option.id}-option`)
        .on('click', (event) => {
          event.preventDefault();

          const selectedKey = $(event.currentTarget).attr('data');
          if (!selectedKey) return;

          const selectedOption = this.getOptionByKey(selectedKey);
          if (!selectedOption) return;

          this.setDefaultStatus(selectedOption.documentStatus);
          this.onChangeCallback?.(selectedOption.documentStatus);
        });
    });

    this.container.find('.privacywrapper li').hover(
      function() {
        $(this).addClass('hover');
      },
      function() {
        $(this).removeClass('hover');
      }
    );

    this.container
      .find('.privacywrapper')
      .find('.current-option')
      .hover(
        () => {
          this.container
            .find('.privacywrapper')
            .find('.current-option')
            .find('.dropDownArrow')
            .addClass('hover');
        },
        () => {
          this.container
            .find('.privacywrapper')
            .find('.current-option')
            .find('.dropDownArrow')
            .removeClass('hover');
        }
      );
  }

  hideDropdown(): void {
    this.options?.forEach((option) => {
      this.container
        .find('.privacywrapper')
        .find(`.${option.id}-option`)
        .hide();
    });
  }

  showDropdown(): void {
    this.options?.forEach((option) => {
      this.container
        .find('.privacywrapper')
        .find(`.${option.id}-option`)
        .show();
    });
  }

  addPrivacyMouseUpHandler(): void {
    if (this.privacyMouseUpHandler) return;

    this.privacyMouseUpHandler = (event: MouseEvent) => {
      const wrapper = this.container.find('.privacywrapper');
      const target = event.target as HTMLElement;

      if (wrapper.is(target) || wrapper.has(target).length !== 0) {
        return;
      }

      wrapper.find('.current-option').removeClass('border');
      wrapper.find('.current-option').find('.dropDownArrow').removeClass('flipV');
      wrapper.find('.current-option').find('.dropDownArrow').removeClass('show');
      this.hideDropdown();
      this.removePrivacyMouseUpHandler();
    };

    document.documentElement.addEventListener('mouseup', this.privacyMouseUpHandler, false);
  }

  removePrivacyMouseUpHandler(): void {
    if (!this.privacyMouseUpHandler) return;

    document.documentElement.removeEventListener('mouseup', this.privacyMouseUpHandler, false);
    this.privacyMouseUpHandler = null;
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
    PrivacyDropdown: typeof PrivacyDropdown;
  }
}

window.PrivacyDropdown = PrivacyDropdown;

export default PrivacyDropdown;