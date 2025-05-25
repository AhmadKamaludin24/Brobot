"use client";
import { cn, configureAssistant } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import React, { useEffect, useRef, useState } from "react";
import soundwaves from "@/lib/constants/soundwaves.json";
import { Button } from "./ui/button";

enum CallStatus {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  CONNECTING = "CONNECTING",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

interface CompanionComponentProps {
  companionId: string;
  subject: string;
  topic: string;
  name: string;
  userName: string;
  userImage: string;
  voice: string;
  style: string;
}

const CompanionSessionComponent = ({
  companionId,
  subject,
  topic,
  name,
  userName,
  userImage,
  voice,
  style,
}: CompanionComponentProps) => {
  console.log(userImage);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
   const [messages, setMessages] = useState<SavedMessage[]>([]);

  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef){
        if (isSpeaking) {
            lottieRef.current?.play();
        } else {
            lottieRef.current?.stop();
        }
    }
  },[isSpeaking, lottieRef])

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

    const onMessage = (message: Message) => {
        if(message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage= { role: message.role, content: message.transcript}
                setMessages((prev) => [newMessage, ...prev])
            }
    };
    const onError = (error: Error) => {
      console.error("Error in companion session:", error);
      setCallStatus(CallStatus.INACTIVE);
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, []);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    const asisstantOverrides = {
        variableValues: {
            subject, topic, style
        },
        clientMessages : ['transcript'],
        serverMessages: [],

    }
    //ts-expect-error
    vapi.start(configureAssistant("Male", "Casual"), asisstantOverrides)
  }

    const handleDisconect = async () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
    };
  return (
    <div className="pt-5 flex flex-col justify-between items-center mx-5">
      <div className=" w-full flex flex-col gap-6 justify-center items-center h-[28rem] rounded-2xl border-2 border-black">
        <div className="w-36 h-36 bg-amber-500 rounded-full flex justify-center items-center relative">
          <div
            className={cn(
              "absolute transition-opacity duration-1000",
              callStatus === CallStatus.FINISHED ||
                callStatus === CallStatus.INACTIVE
                ? "opacity-100"
                : "opacity-0",
              callStatus === CallStatus.CONNECTING &&
                "opacoty-100 animate-pulse"
            )}>
            <div className=" w-fit h-fit"></div>
          </div>
          <div
            className={cn(
              "absolute transition-opacity duration-1000",
              callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
            )}>
                <Lottie lottieRef={lottieRef} animationData={soundwaves} autoplay={true} className="w-[300px]"/>
            </div>
        </div>
        {/* <section className="w-full h-12 overflow-hidden">
            <div className="transcript-messages no-scollbar">
                 {messages.map((message, index) => {
                        if(message.role === 'assistant') {
                            return (
                                <p key={index} className="max-sm:text-sm">
                                    {
                                        name
                                            .split(' ')[0]
                                            .replace('/[.,]/g, ','')
                                    }: {message.content}
                                </p>
                            )
                        } else {
                           return <p key={index} className="text-primary max-sm:text-sm">
                                {userName}: {message.content}
                            </p>
                        }
                    })}
                <div className="transcript-fade"/>
            </div>
        </section> */}
      </div>
      
      
        <Button onClick={callStatus === CallStatus.ACTIVE ? handleDisconect : handleCall} className={cn("mt-7 rounded-lg py-2 ", callStatus === CallStatus.CONNECTING && "animate-pulse")}>{callStatus === CallStatus.ACTIVE ? "End session" : "Start Session"}</Button>
      
    </div>
  );
};

export default CompanionSessionComponent;
