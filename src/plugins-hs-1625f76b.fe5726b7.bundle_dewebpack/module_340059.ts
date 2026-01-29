const cssContent = `@keyframes hoverAnimation {
  100% {
    transform: scale(1.01);
    border-bottom: none;
    box-shadow: 0px 4px 16px 0px rgba(25, 25, 50, 0.24);
  }
}
.ceiling-imagebutton-wrapper {
  position: relative;
  display: flex;
  flex-wrap: wrap;
}
.ceiling-imagebutton-wrapper .ceiling-imagebutton-content {
  font-size: 12px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  float: left;
  width: 120px;
  height: 120px;
  margin-right: 8px;
  margin-bottom: 8px;
}
.ceiling-imagebutton-wrapper .ceiling-imagebutton-content .ceiling-imagebutton-img {
  margin-top: 0px;
  width: 120px;
  height: 120px;
}
.ceiling-imagebutton-wrapper.ceiling-imagebutton-hover .ceiling-imagebutton-content {
  background-color: white;
  border-radius: 4px;
  animation: hoverAnimation 0.3s forwards;
}
.ceiling-imagebutton-wrapper .ceiling-largeview-icon {
  position: absolute;
  cursor: pointer;
  right: 17px;
  top: 6px;
}`;

export default cssContent;