import Link from "next/link";
import React from "react";
import ClickSpark from "../blocks/Animations/ClickSpark/ClickSpark";
import SplitText from "../blocks/TextAnimations/SplitText/SplitText";

const HomeSection = () => {
  return (
    <div className="container min-h-[30rem] mx-auto flex justify-center items-center gap-5 max-sm:gap-2 flex-col px-4 py-5 ">
       <SplitText text={`"Say It. Hear It. Learn It."`}/>
      <h1 className="text-7xl max-sm:text-4xl lg:text-center  font-semibold font-inter ">Learn Smarter. Talk Freely.</h1>
      <h2 className="text-2xl max-sm:text-[13px] lg:text-center w-full max-w-[45rem] leading-tight line-clamp-3 font-inter">
        voice-based AI powered by{" "}
        <Link className="font-semibold" href={"https://vapi.ai/"}>
          Vapi
        </Link>
        . Talk to it like you would to a real teacher. No typing, just
        natural conversation.
      </h2>
    
      <div className="flex justify-start items-center max-sm:w-full w-1/3 gap-4">
      
      
      <Link href={"/companions"} className="w-full">
        <button className="bg-black w-full text-white px-6 py-3 max-sm:px-2 text-[10px] rounded-lg hover:bg-gray-800 transition-colors">
          Explore Companions
        </button>
      </Link>

      <Link href={"/sign-in"} className="w-full">
      <button className=" text-blact border-2 w-full border-black px-6 py-3 max-sm:px-2 text-[10px] rounded-lg transition-colors">
          Sign Up
        </button>
      </Link>
      
        
      </div>
     
       
    </div>
  );
};

export default HomeSection;
