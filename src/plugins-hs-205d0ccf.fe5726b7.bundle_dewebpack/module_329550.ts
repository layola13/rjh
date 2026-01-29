const cssContent = `.task-view-panel {
  display: flex;
  width: 100%;
  height: calc(100% - 56px);
  overflow: hidden;
}

.task-view-panel .task-list {
  width: 274px;
  padding-left: 8px;
}

.task-view-panel .task-list .empty-status {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  right: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.task-view-panel .task-list .empty-status .img {
  width: 100px;
  margin-bottom: 10px;
}

.task-view-panel .task-list .empty-status .tips {
  margin-bottom: 10px;
}

.task-view-panel .task-list .task-total {
  position: absolute;
  top: 5px;
  color: rgba(255, 255, 255, 0.96);
}

.task-view-panel .task-list .task-total .number {
  color: white;
  font-weight: bold;
}

.task-view-panel .task-list .task {
  padding-left: 12px;
}

.task-view-panel .task-list .homestyler-scroll.homestyler-ui-components .homestyler-scroll-y-tip {
  background: linear-gradient(0deg, black, transparent);
}

.task-view-panel .image-list {
  width: calc(100% - 274px);
  background-color: #222222;
  padding: 12px 24px;
  border: 1px solid #3b3b3b;
  border-radius: 10px;
}

.task-view-panel .image-list .header {
  display: flex;
  justify-content: space-between;
  height: 30px;
  margin-bottom: 14px;
  align-items: center;
}

.task-view-panel .image-list .header .left {
  display: flex;
  align-items: center;
  height: 24px;
  opacity: 0.86;
  border-radius: 4px;
}

.task-view-panel .image-list .header .left.disabled {
  opacity: 0.4;
  pointer-events: none;
}

.task-view-panel .image-list .header .left:hover {
  background-color: rgba(255, 255, 255, 0.07);
  opacity: 1;
}

.task-view-panel .image-list .header .left .rename {
  display: flex;
  align-items: center;
  padding: 0 6px;
  border-radius: 4px;
}

.task-view-panel .image-list .header .left .rename .name {
  margin-right: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.task-view-panel .image-list .header .right {
  display: flex;
  align-items: center;
}

.task-view-panel .image-list .header .right .icon {
  position: relative;
  margin-right: 20px;
  cursor: pointer;
  opacity: 0.86;
}

.task-view-panel .image-list .header .right .icon.disabled.repaint {
  background: rgba(255, 255, 255, 0.24);
  color: rgba(255, 255, 255, 0.4);
}

.task-view-panel .image-list .header .right .icon.disabled .hs-iconfont-view {
  opacity: 0.4;
}

.task-view-panel .image-list .header .right .icon.disabled .tag .hs-iconfont-view {
  opacity: 1;
}

.task-view-panel .image-list .header .right .icon.disabled:hover.repaint {
  background: rgba(255, 255, 255, 0.24);
  color: rgba(255, 255, 255, 0.4);
}

.task-view-panel .image-list .header .right .icon.disabled:hover .hs-iconfont-view {
  opacity: 0.4;
}

.task-view-panel .image-list .header .right .icon.disabled:hover .tag .hs-iconfont-view {
  opacity: 1;
}

.task-view-panel .image-list .header .right .icon:hover {
  opacity: 1;
}

.task-view-panel .image-list .header .right .icon.repaint {
  display: flex;
  align-items: center;
  height: 30px;
  background: rgba(255, 255, 255, 0.24);
  border-radius: 15px;
  padding: 8px;
}

.task-view-panel .image-list .header .right .icon.repaint .hs-iconfont-view {
  margin-right: 4px;
}

.task-view-panel .image-list .header .right .icon .loading {
  background-size: 18px 18px;
  background-repeat: no-repeat;
  width: 18px;
  height: 18px;
  display: inline-block;
  vertical-align: bottom;
  animation: rotateit 1.5s linear infinite;
}

.task-view-panel .image-list .header .right .icon .tag {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  color: black;
  line-height: 18px;
  font-size: 12px;
  right: 0;
  top: -12px;
  width: fit-content;
  padding: 0 6px;
  height: 18px;
  border-top-left-radius: 9px;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 9px;
  border-bottom-left-radius: 2px;
  background-image: linear-gradient(to right, #FEDE9D, #81ADFF);
}

.task-view-panel .image-list .header .right .icon .tag .hs-iconfont-view {
  margin-right: 2px;
}

.task-view-panel .image-list .content {
  display: flex;
  width: 100%;
  height: calc(100% - 44px);
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-wrap: wrap;
}

.task-view-panel .image-list .content .empty-status {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.task-view-panel .image-list .content .empty-status .img {
  width: 100px;
  margin-bottom: 10px;
}

.task-view-panel .image-list .content .empty-status .tips {
  margin-bottom: 10px;
}

.task-view-panel .image-list .content .empty-status .create-image {
  color: #396EFE;
  cursor: pointer;
}

.task-view-panel .image-list .content .empty-status .create-image .arrow {
  position: relative;
  border-radius: 9px;
  background-color: #000;
}

.task-view-panel .image-list .content .empty-status .create-image .arrow:after {
  position: absolute;
  content: '';
  width: 8px;
  height: 8px;
  border-top: 2px solid #396EFE;
  border-right: 2px solid #396EFE;
  border-bottom: 2px solid transparent;
  border-left: 2px solid transparent;
  transform: rotate(45deg);
  left: 3px;
  top: 5px;
}

.task-view-panel .image-list .content .empty-status .scrollbar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.task-view-panel .image-list .content .image-list-scroll {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.task-view-panel .homestyler-scroll.homestyler-ui-components .homestyler-scroll-y-tip {
  height: 40px;
  background: linear-gradient(0deg, #222222, transparent);
}

.task-view-panel .homestyler-scroll.homestyler-ui-components .homestyler-scroll-y-tip-icon {
  color: white;
  font-size: 20px;
}

.task-view-panel .ps .ps__rail-y:hover {
  background: unset;
}

@keyframes rotateit {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}`;

export default cssContent;