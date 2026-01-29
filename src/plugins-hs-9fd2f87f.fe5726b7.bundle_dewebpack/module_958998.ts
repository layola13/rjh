const styles = `.pointer-tool-tip-label {
  background-color: #fff;
  color: #333;
  border: 1px solid #888;
  font-size: 12px;
  padding: 3px 5px;
  border-radius: 3px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  display: none;
}
.show-tip {
  display: block;
}
.pointer-tool-tip-animation {
  animation: 0.2s mini-tip-animation;
}
@keyframes mini-tip-animation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
`;

export default styles;