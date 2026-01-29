import TipComponent from './TipComponent';

interface StepTipConfig {
  tip: string;
  type: 'render';
  style: 'top';
  ele: HTMLElement;
  margin: number;
}

interface TipProps {
  showStepTip: boolean;
  stepTip: StepTipConfig;
  canClose: boolean;
}

const TIP_CONTAINER_CLASS = 'tip-container-in-body';
const GUIDE_GLOBAL_CLASS = 'guide-global';
const TEACHING_BUTTON_SELECTOR = '.teaching-ability-button-container .teaching-ability-button-wrapper';
const DEFAULT_MARGIN = 6;

function findVisibleTeachingButton(): HTMLElement | null {
  const buttons = document.querySelectorAll<HTMLElement>(TEACHING_BUTTON_SELECTOR);
  
  for (let i = 0; i < buttons.length; i++) {
    const rect = buttons[i].getBoundingClientRect();
    if (rect.width && rect.height) {
      return buttons[i];
    }
  }
  
  return null;
}

export function createTip(tipText: string, targetElement?: HTMLElement): void {
  let container = document.querySelector<HTMLElement>(`.${TIP_CONTAINER_CLASS}`);
  
  if (!container) {
    container = document.createElement('div');
    container.className = `${TIP_CONTAINER_CLASS} ${GUIDE_GLOBAL_CLASS}`;
    document.body.appendChild(container);
  }
  
  const element = targetElement ?? findVisibleTeachingButton();
  
  if (element) {
    const tipProps: TipProps = {
      showStepTip: true,
      stepTip: {
        tip: tipText,
        type: 'render',
        style: 'top',
        ele: element,
        margin: DEFAULT_MARGIN
      },
      canClose: true
    };
    
    ReactDOM.render(React.createElement(TipComponent, tipProps), container);
  }
}

export function unmountTip(): void {
  const container = document.querySelector(`.${TIP_CONTAINER_CLASS}`);
  
  if (container) {
    ReactDOM.unmountComponentAtNode(container);
  }
}

declare global {
  interface Window {
    createTip: typeof createTip;
  }
}

window.createTip = createTip;