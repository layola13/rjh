enum VoiceStatus {
  Recording = 1,
  Translate = 2,
  Done = 3
}

interface VoiceRecorderProps {
  onVoiceProcess: (status: VoiceStatus) => void;
  onVoiceDone: (message: string, success: boolean) => void;
}

interface UploadUrlResponse {
  ret: string[];
  data?: {
    url?: string;
    fileType?: string;
  };
}

interface ChatDialogueResponse {
  ret?: string[];
  data?: {
    message?: string;
    model?: {
      message?: string;
    };
  };
}

interface ParsedVoiceMessage {
  text?: string;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = (props) => {
  const audioChunks: Blob[] = [];
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const isRecordingActiveRef = useRef<boolean>(false);

  const startRecording = async (): Promise<void> => {
    try {
      props.onVoiceProcess(VoiceStatus.Recording);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        audioChunks.length = 0;

        props.onVoiceProcess(VoiceStatus.Translate);

        NWTK.mtop.Design.getDesignUploadUrl({
          data: {
            fileType: "wav",
            tenant: HSApp.Config.TENANT
          }
        }).then((response: UploadUrlResponse) => {
          const uploadData = response.data;

          if (response?.ret[0]?.includes("SUCCESS") && uploadData?.url) {
            NWTK.api.design.uploadFileToUrl(audioBlob, uploadData.url, {
              headers: {
                "x-oss-object-acl": "public-read",
                "Content-Type": "audio/wav"
              }
            }).then((uploadedUrl: string) => {
              if (!uploadedUrl) {
                props.onVoiceDone(ResourceManager.getString("homegpt_voice_error"), false);
                return;
              }

              NWTK.mtop.HomeGPT.chatDialogue({
                data: {
                  type: "AIDesignCopilotMini",
                  query: "",
                  inputs: {
                    speechToText: uploadedUrl,
                    lang: "简体中文"
                  }
                }
              }).then((chatResponse: ChatDialogueResponse) => {
                if (chatResponse?.ret?.[0]?.includes("SUCCESS")) {
                  try {
                    const rawMessage = chatResponse.data?.message ?? chatResponse.data?.model?.message;
                    const parsedMessage: ParsedVoiceMessage | null = rawMessage ? JSON.parse(rawMessage) : null;
                    const transcribedText = parsedMessage?.text;

                    if (transcribedText) {
                      props.onVoiceDone(transcribedText, true);
                    } else {
                      props.onVoiceDone(ResourceManager.getString("homegpt_voice_error"), false);
                    }
                  } catch (error) {
                    props.onVoiceDone(ResourceManager.getString("homegpt_voice_error"), false);
                  }
                } else {
                  props.onVoiceDone(ResourceManager.getString("homegpt_voice_error"), false);
                }
              });
            });
          } else {
            props.onVoiceDone(ResourceManager.getString("homegpt_voice_error"), false);
          }
        });
      };

      recorder.start();
      setIsRecording(true);
      isRecordingActiveRef.current = true;
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = (): void => {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current = null;

    mediaStreamRef.current?.getTracks().forEach((track: MediaStreamTrack) => track.stop());
    mediaStreamRef.current = null;

    setIsRecording(false);
    isRecordingActiveRef.current = false;
  };

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === "s" && !isRecordingActiveRef.current) {
      startRecording();
    } else if (event.key === "e" && isRecordingActiveRef.current) {
      stopRecording();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      stopRecording();
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleHoverChange = (hovered: boolean): void => {
    setIsHovered(hovered);
  };

  const getIconType = (): string => {
    if (isRecording) {
      return "hs_xian_maikefengtingzhi";
    }
    return isHovered ? "hs_xian_luyin_hover" : "hs_xian_luyin";
  };

  const handleIconClick = (): void => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div
      className={`voice-recorder ${isRecording || isHovered ? "voice-recorder-hover" : ""}`}
      onMouseEnter={() => handleHoverChange(true)}
      onMouseLeave={() => handleHoverChange(false)}
    >
      <IconfontView
        showType={getIconType()}
        iconOnclick={handleIconClick}
      />
    </div>
  );
};

export { VoiceStatus, VoiceRecorder };