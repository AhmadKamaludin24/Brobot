import CompanionsSection from "@/components/sections/CompanionsSection";
import HomeSection from "@/components/sections/HomeSection";
import { Button } from "@/components/ui/button";
import CompanionCard from "@/components/ui/CompanionCard";
import Image from "next/image";

export default function Home() {
  return (
    <main className="pt-24 text-black w-full min-h-screen relative overflow-hidden">
      <HomeSection/>
      <CompanionsSection searchInput={false}/>
      
    </main>
  );
}
