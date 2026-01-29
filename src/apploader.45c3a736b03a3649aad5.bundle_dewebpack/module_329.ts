interface CreateNetworkMessageOptions {
  message: string;
  isAnimated: boolean;
}

export default function createNetworkMessage(message: string, isAnimated: boolean): void {
  const body = document.querySelector<HTMLElement>("body");
  const existingBox = document.querySelector<HTMLElement>(".wrapper_check_internal_network_box");
  
  existingBox?.remove();

  const wrapper = document.createElement("div");
  wrapper.className = `wrapper_check_internal_network_box ${isAnimated ? "" : "fix_tips"}`;
  wrapper.style.left = "50%";

  const messageContent = document.createElement("div");
  messageContent.className = `message_content ${isAnimated ? "animation" : ""}`;
  wrapper.appendChild(messageContent);

  if (!isAnimated) {
    const leftArrow = document.createElement("div");
    leftArrow.id = "msg_content_internalnet_left";
    leftArrow.innerText = "<";
    messageContent.appendChild(leftArrow);
  }

  const tipContent = document.createElement("div");
  tipContent.className = "msg_content_tip";
  messageContent.appendChild(tipContent);
  tipContent.innerText = message;

  if (!isAnimated) {
    const rightArrow = document.createElement("div");
    rightArrow.id = "msg_content_internalnet_right";
    rightArrow.innerText = ">";
    messageContent.appendChild(rightArrow);
  }

  body?.appendChild(wrapper);

  if (!isAnimated) {
    const POSITION_STEP = 10;
    const MIN_POSITION = 10;
    const MAX_POSITION = 90;

    const leftButton = document.getElementById("msg_content_internalnet_left");
    if (leftButton) {
      leftButton.onclick = function(): void {
        const boxes = document.getElementsByClassName("wrapper_check_internal_network_box");
        if (boxes.length > 0) {
          const box = boxes[0] as HTMLElement;
          const currentPosition = parseInt(box.style.left.split("%")[0]);
          if (currentPosition > MIN_POSITION) {
            box.style.left = `${currentPosition - POSITION_STEP}%`;
          }
        }
      };
    }

    const rightButton = document.getElementById("msg_content_internalnet_right");
    if (rightButton) {
      rightButton.onclick = function(): void {
        const boxes = document.getElementsByClassName("wrapper_check_internal_network_box");
        if (boxes.length > 0) {
          const box = boxes[0] as HTMLElement;
          const currentPosition = parseInt(box.style.left.split("%")[0]);
          if (currentPosition < MAX_POSITION) {
            box.style.left = `${currentPosition + POSITION_STEP}%`;
          }
        }
      };
    }
  }
}