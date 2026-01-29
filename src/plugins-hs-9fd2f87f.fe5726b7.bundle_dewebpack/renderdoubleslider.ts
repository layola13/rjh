import createDoubleSliderWrapper from './createDoubleSliderWrapper';
import PositiveSliderComponent from './PositiveSliderComponent';
import StandardSliderComponent from './StandardSliderComponent';

interface SliderDetail {
  value: number;
}

interface SliderEvent {
  detail: SliderDetail;
}

/**
 * Default double slider component that only accepts positive values.
 * Extracts value from event detail and defaults to 0 if not present.
 */
export default createDoubleSliderWrapper({
  positiveOnly: true,
  reciveData: (event: SliderEvent): number => {
    return event?.detail?.value ?? 0;
  }
})(PositiveSliderComponent);

/**
 * Double slider component that accepts both positive and negative values.
 */
export const RenderDoubleSlider = createDoubleSliderWrapper({
  positiveOnly: false
})(StandardSliderComponent);