import LoadingComponent from "@/components/loader/LoadingComponent";
import CompanionsSection from "@/components/sections/CompanionsSection";
import HomeSection from "@/components/sections/HomeSection";
import { Button } from "@/components/ui/button";
import CompanionCard from "@/components/ui/CompanionCard";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="pt-24 text-black w-full min-h-screen relative overflow-hidden">
      <Suspense fallback={<LoadingComponent/>}>
        <HomeSection />
        <CompanionsSection />
      </Suspense>
    </main>
  );
}
