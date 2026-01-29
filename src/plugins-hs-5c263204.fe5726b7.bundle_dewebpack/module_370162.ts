const cssContent = `.input-body {
  position: relative;
  color: #D4D7E1;
}

.input-body .favorite-input {
  height: 36px;
  margin-bottom: 4px;
  font-size: 12px;
  width: 100% !important;
  padding: 4px 50px 4px 18px;
  border-radius: 18px;
  border-color: #EAECF1;
}

.input-body .favorite-input:focus {
  background: #ECF1FF;
  border: 1px solid #396efe;
  box-shadow: unset;
}

.input-body .favorite-input::-webkit-input-placeholder {
  color: #CDCFD5;
}

.input-body .iconWrapper {
  display: inline-block;
  position: absolute;
  right: 0px;
  width: 44px;
  height: 36px;
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
}

.input-body .iconWrapper .icon {
  position: relative;
  top: 9px;
  left: 14px;
}

.input-body .icon-clear {
  display: none;
  position: absolute;
  right: 18px;
  top: 10px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #e1e1e6;
  align-items: center;
  justify-content: center;
}

.input-body .icon-clear:hover {
  background: #396efe;
}

.input-body .icon-clear:hover .anticon {
  color: white !important;
}

.input-body .icon-clear::before {
  content: "";
}

.input-body.success .iconWrapper {
  background: #396efe;
  cursor: pointer;
}

.input-body.success .iconWrapper:hover {
  background: #305DD7;
}

.input-body.success .iconWrapper .icon .anticon {
  color: white !important;
}

.input-body.failed .favorite-input {
  background: white;
  border: 1px solid #eb5d46;
}

.input-body.failed .favorite-input:focus {
  box-shadow: unset;
}

.input-body.failed .iconWrapper {
  display: none;
}

.input-body.failed .icon-clear {
  display: flex;
}

.input-body.failed .error-tips {
  color: #EB5D46;
}

.input-body.small {
  width: 100%;
}

.input-body.small .favorite-input {
  height: 24px;
  margin-bottom: 0;
  padding: 4px 30px 4px 8px;
  border-radius: 4px;
}

.input-body.small .iconWrapper {
  width: 24px;
  height: 24px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.input-body.small .iconWrapper .icon {
  top: 6px;
  left: 7px;
}

.input-body.small .iconWrapper .icon .anticon {
  font-size: 12px !important;
}

.input-body.small .icon-clear {
  right: 6px;
  top: 6px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
}

.input-body.small .icon-clear .hsc-iconfont-view {
  margin-right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-body.small .error-tips {
  margin-top: 4px;
}`;

export default cssContent;