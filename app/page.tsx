import { Button } from "@/components/ui/button";
import CompanionCard from "@/components/ui/CompanionCard";
import Image from "next/image";

export default function Home() {
  return (
    <main className="text-black w-full min-h-screen relative overflow-hidden">
      <div className="container flex flex-col mx-auto px-5 py-5 gap-4">
        <h1 className="text-2xl font-bold">Popular companions</h1>
        <div className="flex justify-between items-center flex-wrap max-sm:flex-col gap-4">
          <CompanionCard
            id="123"
            name="Neura The Brainly Exploler"
            topic="Neural Network Of The Brain"
            subject="science"
            duration={45}
            color="#ffda6e"
          />
          <CompanionCard
            id="123"
            name="Neura The Brainly Exploler"
            topic="Neural Network Of The Brain "
            subject="science"
            duration={45}
            color="#7F55B1"
          />
          <CompanionCard
            id="123"
            name="Neura The Brainly Exploler"
            topic="Neural Network Of The Brain"
            subject="science"
            duration={45}
            color="#F49BAB"
          />
        </div>
      </div>
    </main>
  );
}
