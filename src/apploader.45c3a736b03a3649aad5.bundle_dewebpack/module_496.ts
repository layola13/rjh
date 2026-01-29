import './styles'; // 假设 t(120) 导入的是样式文件，根据实际情况调整路径

/**
 * 显示浏览器兼容性警告消息
 * @param message - 要显示的警告消息文本
 * @param additionalClassName - 可选的额外CSS类名
 */
export default function showBrowserWarning(
  message: string,
  additionalClassName?: string
): void {
  const loadingSvgElement = document.querySelector<HTMLElement>(".loadingsvg");
  
  if (!loadingSvgElement) {
    console.warn("Loading SVG container not found");
    return;
  }

  const wrapperBox = document.createElement("div");
  wrapperBox.className = `wrapper_check_browser_box ${additionalClassName ?? ""}`;

  const messageContent = document.createElement("div");
  messageContent.className = "message_content";
  wrapperBox.appendChild(messageContent);

  const iconWarning = document.createElement("div");
  iconWarning.className = "msg_icon_warning";
  messageContent.appendChild(iconWarning);

  const contentTip = document.createElement("div");
  contentTip.className = "msg_content_tip";
  messageContent.appendChild(contentTip);
  contentTip.innerText = message;

  loadingSvgElement.appendChild(wrapperBox);
}