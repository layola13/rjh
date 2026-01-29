const styles = `.position-tooltip-wrapper {
  position: absolute;
  z-index: 1001;
  transform: scale(0.1);
  box-shadow: 0 5px 50px 0 rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: opacity, transform, top;
  transition-timing-function: ease-in-out;
}
.position-tooltip-wrapper.show {
  transform: scale(1);
}
.position-tooltip-wrapper .position-tooltip-arrow {
  position: absolute;
  transform: translate(0, -50%) rotate(-45deg);
  background: linear-gradient(45deg, transparent 45%, currentColor 0%);
  border-top-right-radius: 3px;
}`;

export default styles;