"use client";
import React, { Suspense } from "react";
import { Button } from "./button";
import Link from "next/link";
import LoadingComponent from "../loader/LoadingComponent";

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
    <Suspense fallback={<LoadingComponent/>}>
      <div
        style={{ backgroundColor: color }}
        className={`  relative  rounded-xl p-4 flex flex-col justify-between flex-shrink-0 w-[32.6%] max-md:w-full h-64`}>
        <div className="w-full flex justify-between items-center">
          <h1 className="text-[1rem] text-ellipsis font-semibold text-white bg-black p-1 px-2 rounded-full">
            {subject}
          </h1>
          <div className="p-1 rounded-full bg-black text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#FFFFFF"
              className="size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>
          </div>
        </div>
        <h1 className="pt-4 text-xl text-ellipsis">{name}</h1>
        <h1 className="text-2xl font-semibold pb-12 max-sm:pb-7 w-full max-w-xs line-clamp-3 leading-tight">
          {topic}
        </h1>
        <Link href={`/companions/${id}`}>
          <Button className="w-full">Start Conversation</Button>
        </Link>
      </div>
    </Suspense>
  );
};

export default CompanionCard;
