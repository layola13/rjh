interface CSSModule {
  id: string;
  push: (content: [string, string]) => void;
}

interface CSSExports {
  (useSourceMap: boolean): CSSModule;
}

const cssLoader: CSSExports = (useSourceMap: boolean): CSSModule => {
  const module: CSSModule = {
    id: '560443',
    push: (content: [string, string]): void => {
      // CSS module push implementation
    }
  };
  return module;
};

const cssContent = `.length-input-wrapper-dark {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.length-input-wrapper-dark .length-input {
  text-align: center;
}

.length-input-wrapper-dark .input-wrapper {
  display: block;
  width: 64px;
}

.length-input-wrapper-dark .input-wrapper.top {
  display: block;
}

.length-input-wrapper-dark .input-wrapper.right {
  position: relative;
  display: inline-block;
}

.length-input-wrapper-dark .input-wrapper .input {
  border-radius: 4px 0px 0px 4px;
  box-sizing: border-box;
  width: 42px;
  height: 24px;
  border: 1px solid rgba(234, 236, 241, 0.2);
  border-right: none;
  background: transparent;
  text-align: center;
  color: rgba(255, 255, 255, 0.96);
  font-size: 12px;
  font-weight: normal;
  vertical-align: middle;
}

.length-input-wrapper-dark .input-wrapper .input:focus {
  border-color: #396efe;
  background: rgba(57, 110, 254, 0.3);
}

.length-input-wrapper-dark .input-wrapper .input.with-color {
  border-left: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.length-input-wrapper-dark .input-wrapper .input.error,
.length-input-wrapper-dark .input-wrapper .input.error:focus {
  border-color: #EB5D46;
}

.length-input-wrapper-dark .input-wrapper .select {
  display: none;
  position: absolute;
  top: 24px;
  left: 0;
  overflow: hidden;
  width: 53px;
  list-style-type: none;
  font-size: 12px;
  color: #333333;
  background-color: #FFFFFF;
  z-index: 1;
  box-sizing: border-box;
  box-shadow: 0px 4px 16px 0px rgba(25, 25, 50, 0.15);
  font-weight: 400;
  line-height: 17px;
}

.length-input-wrapper-dark .input-wrapper .select .options {
  height: 22px;
  width: 100%;
  line-height: 22px;
}

.length-input-wrapper-dark .input-wrapper .select .options:hover {
  background: #327DFF;
  font-weight: bold;
  color: #FFFFFF;
}

.length-input-wrapper-dark .input-wrapper:hover .select {
  display: inline-block;
}

.length-input-wrapper-dark .input-wrapper .unit-dark {
  border-radius: 0px 4px 4px 0px;
  border: 1px solid rgba(234, 236, 241, 0.2);
  border-left: none;
  width: 22px;
  height: 24px;
  background-color: transparent;
  font-size: 10px;
  font-weight: normal;
  line-height: 24px;
  display: inline-block;
  vertical-align: middle;
  color: rgba(255, 255, 255, 0.96);
  box-sizing: border-box;
}

.length-input-wrapper-dark .input-wrapper .unit-dark.focus-input {
  border-color: #396efe;
  background: rgba(57, 110, 254, 0.3);
}

.length-input-wrapper-dark .input-wrapper .unit-dark.error {
  border-color: #EB5D46;
}

.length-input-wrapper-dark .input-wrapper .unit-dark .unit-value {
  transform: scale(0.8);
  display: inline-block;
}

.length-input-wrapper-dark .input-wrapper .arrow-group-dark {
  border: 1px solid rgba(234, 236, 241, 0.2);
  border-radius: 0px 4px 4px 0px;
  border-left: none;
  width: 22px;
  height: 24px;
  display: inline-block;
  background: transparent;
  vertical-align: middle;
  box-sizing: border-box;
}

.length-input-wrapper-dark .input-wrapper .arrow-group-dark.focus-input {
  border-color: #396efe;
  background: rgba(57, 110, 254, 0.3);
}

.length-input-wrapper-dark .input-wrapper .arrow-group-dark.error {
  border-color: #EB5D46;
}

.length-input-wrapper-dark .input-wrapper .arrow-group-dark .arrow-up-wrapper {
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  box-sizing: border-box;
  height: 12px;
  width: 22px;
  border-bottom: 1px solid rgba(234, 236, 241, 0.2);
}

.length-input-wrapper-dark .input-wrapper .arrow-group-dark .arrow-up-wrapper:hover .arrow-up {
  border-bottom-color: #396efe;
}

.length-input-wrapper-dark .input-wrapper .arrow-group-dark .arrow-up-wrapper .arrow-up {
  width: 8px;
  height: 8px;
  border: 4px solid transparent;
  border-bottom-color: white;
  box-sizing: border-box;
}

.length-input-wrapper-dark .input-wrapper .arrow-group-dark .arrow-down-wrapper {
  cursor: pointer;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  box-sizing: border-box;
  height: 11px;
  width: 22px;
}

.length-input-wrapper-dark .input-wrapper .arrow-group-dark .arrow-down-wrapper:hover .arrow-down {
  border-top-color: #396efe;
}

.length-input-wrapper-dark .input-wrapper .arrow-group-dark .arrow-down-wrapper .arrow-down {
  width: 8px;
  height: 8px;
  border: 4px solid transparent;
  border-top-color: white;
  box-sizing: border-box;
}

.length-input-wrapper-dark .input-wrapper.disabled {
  cursor: no-drop;
}

.length-input-wrapper-dark .input-wrapper.disabled .input {
  opacity: 0.3;
}

.length-input-wrapper-dark .input-wrapper.disabled .unit {
  opacity: 0.3;
}

.length-input-wrapper-dark .input-wrapper .display-color-container {
  height: 24px;
  border: 1px solid rgba(234, 236, 241, 0.2);
  border-right: none;
  border-radius: 4px 0 0 4px;
  display: inline-block;
  vertical-align: middle;
}

.length-input-wrapper-dark .input-wrapper .display-color-container .display-color {
  width: 20px;
  height: 20px;
  border-radius: 3px;
  margin-top: 1px;
  margin-left: 1px;
  display: inline-block;
}

.length-input-wrapper-dark .input-wrapper .display-color-container.focus-input {
  border-color: #396efe;
  background: rgba(57, 110, 254, 0.3);
}

.length-input-wrapper-dark .input-wrapper .display-color-container.error {
  border-color: #EB5D46;
}

.length-input-wrapper-dark .label {
  color: #96969b;
  font-size: 12px;
  font-weight: normal;
  padding: 0;
}

.length-input-wrapper-dark .label.left {
  margin-right: 8px;
}

.length-input-wrapper-dark .label.bottom {
  display: inline-block;
  margin-top: 10px;
}`;

export default cssContent;