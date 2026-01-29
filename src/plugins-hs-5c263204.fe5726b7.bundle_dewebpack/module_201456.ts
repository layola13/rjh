const styles = `.mirror-pop-modal-hidden {
  display: none !important;
}

.mirror-pop-modal {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 10000;
  background-color: #00000080;
}

.mirror-pop-modal .mirror-area-modal {
  position: absolute;
  width: 520px;
  height: 173px;
  background-color: white;
  top: calc((100% - 173px) / 2);
  left: calc((100% - 520px)/2);
  border-radius: 12px;
  padding: 22px 30px 12px 30px;
  display: block;
  box-sizing: border-box;
}

.mirror-pop-modal .mirror-area-modal .mirror-area-title {
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.mirror-pop-modal .mirror-area-modal .mirror-area-title .mirror-area-title-txt {
  font-size: 20px;
  font-weight: bolder !important;
  font-family: 'Frutiger Next LT W1G', Calibri, Arial, Helvetica, sans-serif !important;
  color: #33353b;
}

.mirror-pop-modal .mirror-area-modal .mirror-area-title .mirror-area-tittle-close {
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background: unset;
  text-align: center;
  font-size: 22px;
  font-weight: 100;
}

.mirror-pop-modal .mirror-area-modal .mirror-area-title .mirror-area-tittle-close:hover {
  background-color: #e1e1e6;
}

.mirror-pop-modal .mirror-area-modal .mirror-area-lb-info {
  color: #898989;
  height: 21px;
  line-height: 21px;
  margin-bottom: 30px;
  margin-top: 10px;
  font-family: 'Frutiger Next LT W1G', Calibri, Arial, Helvetica, sans-serif !important;
  color: #33353b;
}

.mirror-pop-modal .mirror-area-modal .mirror-group-btn {
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  margin-bottom: 5px;
}

.mirror-pop-modal .mirror-area-modal .mirror-group-btn .mirror-btn-base {
  min-width: 70px;
  padding: 0 12px;
  font-size: 13px;
  font-weight: bolder !important;
  line-height: 36px;
  height: 36px;
  text-shadow: none;
  color: #33353b;
  border-radius: 36px;
  background: #f2f2f2;
  border: none;
  width: 50px;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.mirror-pop-modal .mirror-area-modal .mirror-group-btn .mirror-btn-confirm {
  width: auto;
  min-width: 110px;
  background: #396efe;
  color: #fff;
}

.mirror-pop-modal .mirror-area-modal .mirror-group-btn .mirror-btn-cancel {
  background: #e9e9e9;
  color: #396efe;
  margin-right: 20px;
}

.mirror-pop-modal .mirror-area-modal .mirror-group-btn .mirror-btn-confirm:hover {
  background-color: #305dd7;
  color: #fff;
}`;

export default styles;