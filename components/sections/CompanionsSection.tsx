import React from "react";
import CompanionCard from "../ui/CompanionCard";
import Link from "next/link";
import { getAllCompanions } from "@/lib/actions/companion.action";
import { getSubjectColor } from "@/lib/utils";



const CompanionsSection = async() => {
  const companions = await getAllCompanions({ limit: 3, page: 1 });
  return (
    <div className="container flex flex-col mx-auto px-5 py-3 gap-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl max-sm:text-xl font-bold pb-3">
          Popular companions
        </h1>

        <Link href="/companions" className=" hover:underline text-center">
          View all
        </Link>
      </div>

      <div className="flex justify-between items-center flex-wrap max-md:flex-col gap-2 ">
        {companions.map((companion) => (
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
    </div>
  );
};

export default CompanionsSection;
