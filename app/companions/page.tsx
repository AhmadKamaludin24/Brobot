import React from "react";
import { Input } from "@/components/ui/input";
import CompanionCard from "@/components/ui/CompanionCard";
import { getAllCompanions } from "@/lib/actions/companion.action";
import SearchInput from "@/components/ui/SearchInput";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Page = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters.subject || "";
  const topic = filters.topic || "";
  const data = await getAllCompanions({ subject, topic });
  console.log("Companions Data:", data);

  return (
    <main className="pt-24 text-black w-full min-h-screen relative overflow-hidden">
      <div className="container flex flex-col mx-auto px-5 py-5 gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold ">Companion Liblary</h1>
          <SearchInput />
        </div>

        <div className="flex justify-between items-center flex-wrap max-sm:flex-col gap-4">
          {data.map((companion) => (
            <CompanionCard
              key={companion.id}
              id={companion.id}
              name={companion.name}
              topic={companion.topic}
              subject={companion.subject}
              duration={companion.duration}
              color="#ffda6e" // You can customize the color based on companion data
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Page;
