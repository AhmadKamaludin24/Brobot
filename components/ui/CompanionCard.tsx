import React from "react";
import { Button } from "./button";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
}

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
}: CompanionCardProps) => {
  return (
    <div
      style={{ backgroundColor: color }}
      className={` border-2 relative border-black rounded-lg p-4 flex flex-col  w-[32%] max-sm:w-full h-64`}>
      <div className="w-full flex justify-between items-center">
        <h1 className="text-[1rem] text-ellipsis font-semibold text-white bg-black p-1 rounded-md">
          {subject}
        </h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
          />
        </svg>
      </div>
      <h1 className="pt-4 text-xl text-ellipsis">{name}</h1>
      <h1 className="text-2xl font-semibold text-clip pb-12">{topic}</h1>

      <Button className="w-full">start lessons</Button>
      <p className="pt-2">{duration} min</p>
    </div>
  );
};

export default CompanionCard;
