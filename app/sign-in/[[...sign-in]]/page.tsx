import { SignIn } from '@clerk/nextjs'
import React from 'react'

const Page = async() => {

 
  return (
    <div className='flex items-center justify-center w-full min-h-screen bg-gray-100'>
      <SignIn/>
    </div>
  )
}

export default Page
