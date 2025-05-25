import React from "react";
import CompanionCard from "../ui/CompanionCard";
import Link from "next/link";
import { Input } from "../ui/input";

interface CompanionCardProps {
  searchInput: boolean;
}

const CompanionsSection = ({ searchInput }: CompanionCardProps) => {
  return (
    <div className="container flex flex-col mx-auto px-5 py-5 gap-4">
      <div className="flex justify-between items-center">
        {searchInput ? (
          <Input placeholder="search companion" className="w-1/4" />
        ) : (
          <h1 className="text-2xl font-bold pb-5">Popular companions</h1>
        )}

        <Link href="/companions" className=" hover:underline">
          View all
        </Link>
      </div>

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
          id="coding-01"
          name="Codey the Dev Bot"
          topic="Intro to HTML and Web Basics"
          subject="Computer Science"
          duration={60}
          color="#A0D2EB"
        />
        <CompanionCard
          id="math-01"
          name="Algeo the Math Wizard"
          topic="Mastering Algebraic Expressions"
          subject="Mathematics"
          duration={40}
          color="#FFD6E0"
        />
      </div>
    </div>
  );
};

export default CompanionsSection;
