import { getCompanionById } from '@/lib/actions/companion.action';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

interface companionSession {
    params: Promise<{ id: string }>
}

const Page = async({params}: companionSession) => {

    const {id} = await params;
    const user = await currentUser();
    const companion = await getCompanionById(id);

    if (!companion) {
        redirect(`/companions`);
    }
    if (!user) {
        redirect(`/sign-in`);
    }

  return (
    <div className='pt-24'>
      <h1>{companion.id}</h1>
    </div>
  )
}

export default Page
