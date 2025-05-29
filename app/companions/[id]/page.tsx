import CompanionSessionComponent from "@/components/companionSessionComponent";
import { getCompanionById } from "@/lib/actions/companion.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

interface companionSession {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: companionSession) => {
  const { id } = await params;
  const user = await currentUser();
  const companion = await getCompanionById(id);
  const {name,topic,duration, subject} = companion

  if (!companion) {
    redirect(`/companions`);
  }
  if(companion.length === 0){
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <h1 className="text-2xl font-semibold">Companion not found</h1>
      </div>
    );
  }
  if (!user) {
    redirect(`/sign-in`);
  }

  return (
    <div className="flex flex-col w-full min-h-svh  relative overflow-hidden">
      <div className="mx-auto w-[90rem] max-sm:w-full ">
        
        <article className="p-5 mt-24 flex flex-col items-start border-2 rounded-lg border-gray-400 mx-5">
          <h1 className="text-2xl font-bold">{companion.name}</h1>
          <h2>{companion.topic}</h2>
        </article>
        <CompanionSessionComponent {...companion} companionId={id} userName={user?.firstName} userAvatar={user?.imageUrl}/>
      </div>
    </div>
  );
};

export default Page;
