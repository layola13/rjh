import Slider from './Slider';
import Range from './Range';
import Handle from './Handle';
import createSliderWithTooltip from './createSliderWithTooltip';
import SliderTooltip from './SliderTooltip';

export { Handle, Range, SliderTooltip, createSliderWithTooltip };

const SliderWithExtensions = Slider;
SliderWithExtensions.Range = Range;
SliderWithExtensions.Handle = Handle;
SliderWithExtensions.createSliderWithTooltip = createSliderWithTooltip;

export default SliderWithExtensions;