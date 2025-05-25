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
  if (!user) {
    redirect(`/sign-in`);
  }

  return (
    <div className="flex flex-col w-full relative overflow-hidden">
      <div className="mx-auto container min-h-svh">
        <article className="p-5 mt-24 flex  flex-col items-start border-2 rounded-lg border-black mx-5">
          <h1 className="text-2xl font-bold">{companion.name}</h1>
          <h2>{companion.topic}</h2>
        </article>
        <CompanionSessionComponent {...companion} companionId={id} userName={user.username!} userAvatar={user.imageUrl!}/>
      </div>
    </div>
  );
};

export default Page;
