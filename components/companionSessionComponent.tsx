"use client";
import { cn, configureAssistant } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import React, { Suspense, useEffect, useRef, useState } from "react";
import soundwaves from "@/lib/constants/soundwaves.json";
import { Button } from "./ui/button";
import {
  getUserCallUsage,
  updateUserCallUsage,
} from "@/lib/actions/companion.action";
import LoadingComponent from "./loader/LoadingComponent";

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
  voice: "male" | "female";
  style: string;
  language: "id" | "en";
}

const CompanionSessionComponent = ({
  companionId,
  subject,
  topic,
  language,
  name,
  userName,
  userImage,
  voice,
  style,
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const startTimeRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const initialTimeRef = useRef<number | null>(null); // waktu awal

  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking, lottieRef]);

  useEffect(() => {
    const onCallStart = async () => {
      setCallStatus(CallStatus.ACTIVE);
      startTimeRef.current = Date.now();
      console.log("Call started at", startTimeRef.current);

      const remaining = await getUserCallUsage(); // Panggil di sini!
      // console.log("Setting timeout for", remaining, "seconds");

      setRemainingTime(remaining);
      initialTimeRef.current = remaining; // <- simpan misalnya 25 detik

      intervalRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(intervalRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      timeoutRef.current = setTimeout(async () => {
        vapi.stop();

        await updateUserCallUsage(0); // Set remaining time to 0
      }, remaining * 1000);
    };

    const onCallEnd = async () => {
      setCallStatus(CallStatus.FINISHED);

      if (startTimeRef.current && remainingTime !== null) {
        const now = Date.now();
        let duration = Math.floor((now - startTimeRef.current) / 1000);
        if (duration <= 0) duration = 0;

        const shouldSetZero = duration >= remainingTime;
        const newRemainingTime = shouldSetZero ? 0 : remainingTime - duration;

        console.log("Call duration in seconds:", duration);
        console.log("Updating remaining time to:", newRemainingTime);

        try {
          // Kirim sisa waktu yang BENAR ke DB
          await updateUserCallUsage(newRemainingTime);
        } catch (err) {
          console.error("Gagal update ke database", err);
        }
      }

      // Bersihkan interval dan timeout
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      setRemainingTime(null);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [newMessage, ...prev]);
      }
    };
    const onError = (error: Error) => {
      console.log("Error in companion session:", error);
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
    const remaining = await getUserCallUsage();
    if (remaining <= 0) {
      alert("You have no remaining time for this session.");
      return;
    }
    setCallStatus(CallStatus.CONNECTING);

    const asisstantOverrides = {
      variableValues: {
        subject,
        topic,
        userName,
        name,
      },
      clientMessages: ["transcript"],
      serverMessages: [],
    };
    //ts-expect-error

    vapi.start(configureAssistant(language, voice), asisstantOverrides);
  };
  const handleDisconect = async () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();

    if (startTimeRef.current && initialTimeRef.current !== null) {
      const now = Date.now();
      const duration = Math.floor((now - startTimeRef.current) / 1000);
      const totalTime = initialTimeRef.current;
      const newRemainingTime = Math.max(totalTime - duration, 0);

      console.log("Call manual end, duration:", duration);
      console.log("Updating remaining time to:", newRemainingTime);

      try {
        await updateUserCallUsage(newRemainingTime);
      } catch (err) {
        console.error("Gagal update usage saat disconnect:", err);
      }
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setRemainingTime(null);
  };

  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <Suspense fallback={<LoadingComponent/>}>
      <div className="pt-5 min-w-7xl flex flex-col justify-between items-center mx-5 py-5">
        <div className=" w-full relative flex flex-col p-4 gap-4 justify-center items-center min-h-96 rounded-2xl border-2 border-gray-400">
          {remainingTime !== null && (
            <p className="absolute top-3 right-4">
              Time left: {Math.floor(remainingTime / 60)}:
              {(remainingTime % 60).toString().padStart(2, "0")}
            </p>
          )}
          <div className="w-36 h-36 bg-amber-500 rounded-full flex justify-center items-center relative">
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.FINISHED ||
                  callStatus === CallStatus.INACTIVE
                  ? "opacity-100"
                  : "opacity-0",
                callStatus === CallStatus.CONNECTING &&
                  "opacity-100 animate-ping"
              )}>
              <div className=" w-fit h-fit"></div>
            </div>
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0",
                callStatus === CallStatus.CONNECTING &&
                  "opacity-100 animate-pulse"
              )}>
              <Lottie
                lottieRef={lottieRef}
                animationData={soundwaves}
                autoplay={true}
                className="w-[300px]"
              />
            </div>
          </div>
          <section className="max-w-[100%] max-sm:max-w-[100%] p-5 overflow-hidden rounded-md">
            <div className="relative flex flex-col-reverse gap-2 p-5 max-h-[400px] max-sm:max-h-[200px] overflow-y-auto bg-gray-50 no-scrollbar">
              {messages.map((message, index) => {
                const isAssistant = message.role === "assistant";

                return (
                  <div
                    key={index}
                    className={`flex ${
                      isAssistant ? "justify-start" : "justify-end"
                    }`}>
                    <div
                      className={`
              max-sm:text-sm
              p-3
              rounded-lg
              max-w-[70%]
              whitespace-pre-wrap
              my-4 
              max-sm:my-1
              ${
                isAssistant
                  ? "bg-blue-500 text-white"
                  : "bg-green-500 text-white"
              }
            `}>
                      <p>{message.content}</p>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} className="h-2 absolute bottom-1"></div>
            </div>
          </section>
        </div>

        <Button
          onClick={
            callStatus === CallStatus.ACTIVE ? handleDisconect : handleCall
          }
          className={cn(
            "mt-7 rounded-lg py-2 bg-red-500 ",
            callStatus === CallStatus.CONNECTING && "animate-pulse",
            callStatus === CallStatus.ACTIVE ? "bg-red-500" : "bg-black"
          )}>
          {callStatus === CallStatus.ACTIVE
            ? "End session"
            : callStatus === CallStatus.CONNECTING
            ? "Connecting..."
            : "Start Session"}
        </Button>
      </div>
    </Suspense>
  );
};

export default CompanionSessionComponent;
