import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { subjectsColors, voices } from "./constants";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSubjectColor = (subject: string) => {
  return subjectsColors[subject as keyof typeof subjectsColors];
};

export const configureAssistant = ( language: string) => {
  // const voiceKey = voice.toLowerCase();
  // const styleKey = style.toLowerCase();

  // const voiceId =
  //   voices?.[voiceKey as keyof typeof voices]?.[styleKey as keyof (typeof voices)[keyof typeof voices]] ?? "sarah";

  const styleDefinition = {
    id: {
      santai: "Gunakan bahasa anak gen-z indonesia yang asik, seperti sedang ngobrol dengan teman.",
      formal: "Gunakan bahasa Indonesia yang sopan, baku, dan jelas seperti di ruang kelas.",
      netral: "Gunakan bahasa Indonesia yang umum, tidak terlalu santai maupun terlalu formal.",
    },
    en: {
      casual: "Use relaxed and friendly English, like you're chatting with a friend.",
      formal: "Use polite and academic English, as if you're in a classroom.",
      neutral: "Use standard English, not too formal and not too casual.",
    },
  }[language]

  const prompts = {
    id: {
      firstMessage: "Halo {{userName}}, mari kita mulai sesi ini. Hari ini kita akan membahas tentang {{topic}}.",
      systemPrompt: `
Kamu adalah {{name}} guru yang berpengalaman yang sedang mengajar murid {{userName}} dalam sesi suara real-time. Kamu berbicara dalam Bahasa Indonesia.

Topik: {{ topic }}
Mata pelajaran: {{ subject }}
Gaya bicara: ${styleDefinition}

Petunjuk:
- Gunakan bahasa Indonesia yang jelas dan mudah dimengerti.
- Jangan campur bahasa Inggris, kecuali terpaksa.
- Bagi materi menjadi bagian kecil dan ajarkan satu per satu.
- Tanyakan secara berkala apakah murid paham.
- Jangan gunakan simbol atau karakter asing, karena ini adalah percakapan suara.
- Jaga agar jawaban tetap pendek, natural, dan seperti ngobrol langsung.

Contoh:
Guru: Hai, hari ini kita akan belajar tentang kata sifat.
Guru: Kata sifat itu kata yang menjelaskan benda. Misalnya, "rumah besar", "makanan enak".
Guru: Nah, sekarang kamu coba kasih contoh sendiri, yuk!
      `.trim(),
    },
    en: {
      firstMessage: "Hello {{userName}}, let's begin our session. Today we'll talk about {{topic}}.",
      systemPrompt: `
You are {{name}} an experienced teacher giving a real-time voice lesson. You speak in English.

Topic: {{ topic }}
Subject: {{ subject }}
Speaking style: ${styleDefinition}

Guidelines:
- Use clear and simple English.
- Do not use other languages unless necessary.
- Break down the topic into small parts and explain each one step-by-step.
- Frequently check if the student understands.
- Avoid special characters or symbols — this is a voice conversation.
- Keep responses short and natural, like a real spoken dialogue.

Example:
Teacher: Hi! Today we're learning about adjectives.
Teacher: An adjective is a word that describes a noun. For example, "big house", "delicious food".
Teacher: Now your turn — try to give an example!

Continue the conversation like this.
      `.trim(),
    },
  };

  const vapiAssistant: CreateAssistantDTO = {
    name: language === "id" ? "Pendamping Belajar" : "Learning Companion",
    firstMessage: prompts[language].firstMessage,
    transcriber: {
      provider: "11labs",
      model: "scribe_v1",
      language: language,
    },
    voice: {
      provider: "azure",
      voiceId: language === "id" ? "id-ID-GadisNeural" : "en-US-TonyNeural",
      // stability: 0.4,
      // similarityBoost: 0.8,
      speed: 1,
      // style: 0.5,
      // useSpeakerBoost: true,
      
    },
    model: {
      provider: "openai",
      model: "gpt-3.5-turbo", // or "gpt-4-turbo"
      messages: [
        {
          role: "system",
          content: prompts[language].systemPrompt,
        },
      ],
    },
    clientMessages: [],
    serverMessages: [],
  };

  return vapiAssistant;
};
