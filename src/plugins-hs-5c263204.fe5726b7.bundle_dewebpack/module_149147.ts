const cssContent = `.feedback-radio-block .feedback-radio-block-radiogroup {
  font-size: 12px;
  display: flex;
  flex-wrap: wrap;
}

.feedback-radio-block .feedback-radio-block-radiogroup .radio-container {
  width: calc(100% / 6 - 1px);
  display: flex;
  align-items: center;
  margin-top: 18px;
}

.feedback-radio-block .feedback-radio-block-radiogroup .radio-container .radio {
  flex-shrink: 0;
}

.feedback-radio-block .feedback-radio-block-radiogroup .radio-container .radio + span {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.feedback-radio-block .feedback-radio-block-radiogroup .radio-container .homestyler-smart-text {
  width: 100%;
}

.feedback-radio-block.feedback-radio-inline {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.feedback-radio-block.feedback-radio-inline .feedback-radio-block-radiogroup {
  margin-top: 0;
}

.feedback-radio-block.feedback-radio-inline .feedback-radio-block-radiogroup .radio-container {
  margin-top: 0;
  width: auto;
  margin-left: 20px;
}

.feedback-radio-block.feedback-radio-inline .feedback-radio-block-radiogroup .radio-container .homestyler-smart-text {
  width: 100%;
}

.feedback-radio-block.feedback-black .feedback-radio-block-radiogroup .radio-container .radio + span {
  color: rgba(255, 255, 255, 0.86);
}`;

export default cssContent;