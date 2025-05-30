import React from "react";
import CompanionCard from "@/components/ui/CompanionCard";
import { getAllCompanions } from "@/lib/actions/companion.action";
import SearchInput from "@/components/ui/SearchInput";
import { getSubjectColor } from "@/lib/utils";
import { SelectLanguage } from "@/components/ui/SelectLanguage";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Page = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters.subject || "";
  const topic = filters.topic || "";
  const language = filters.language || "";
  const data = await getAllCompanions({ subject, topic, language, });


  return (
    <main className="pt-24 text-black w-full min-h-screen relative overflow-hidden">
      <div className="container flex flex-col mx-auto px-5 py-5 gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold ">Companion Liblary</h1>
          <div className="flex justify-between max-sm:flex-col items-center gap-2">
            <SearchInput />
            <SelectLanguage />
          </div>
        </div>

        {data.length < 0 ? (
          <div className="text-center text-gray-500">
            No companions found for the selected filters.
          </div>
        ) : (
          <div className="flex justify-start items-center flex-wrap max-sm:flex-col gap-2">
            {data.map((companion) => (
              <CompanionCard
                key={companion.id}
                id={companion.id}
                name={companion.name}
                topic={companion.topic}
                subject={companion.subject}
                duration={companion.duration}
                color={getSubjectColor(companion.subject)} // You can customize the color based on companion data
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;
