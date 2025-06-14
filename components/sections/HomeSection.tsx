import Link from "next/link";
import React from "react";
import ClickSpark from "../blocks/Animations/ClickSpark/ClickSpark";
import SplitText from "../blocks/TextAnimations/SplitText/SplitText";
import RotatingText from "../blocks/TextAnimations/RotatingText/RotatingText";

const text = [
  'Knowledge.',
  'Understanding.',
  'Exploration.',
  'Empowerment.',
  'Imagination.',
  'Confidence.',
  'Possibility.',
]


const HomeSection = () => {
  return (
    <div className="container  rounded-xl min-h-[30rem] max-sm:min-h-[20rem] mx-auto flex justify-center items-center gap-5 max-sm:gap-2 flex-col px-4 py-5 ">
       <SplitText text={`"Say It. Hear It. Learn It."`}/>
      <div className="text-7xl items-center flex-wrap justify-center flex gap-4 max-sm:gap-2 max-sm:text-3xl text-center  font-semibold font-inter "><h1>Voice Meets </h1><RotatingText texts={text} className="bg-yellow-400 p-2 rounded-lg"/></div>
     
      <h2 className="text-2xl max-sm:text-[13px] text-center w-full max-w-[45rem] leading-tight line-clamp-3 font-inter">
        voice-based AI powered by{" "}
        <Link className="font-semibold" href={"https://vapi.ai/"}>
          Vapi
        </Link>
        . Talk to it like you would to a real teacher. No typing, just
        natural conversation.
      </h2>
    
      <div className="flex justify-start items-center max-sm:w-[80%] w-1/2 gap-4">
      
      
      <Link href={"/companions"} className="w-full">
        <button className="bg-black w-full text-white px-6 py-3 max-sm:px-2 text-[20px] max-sm:text-[10px] rounded-lg hover:bg-gray-800 transition-colors">
          Discover Companions
        </button>
      </Link>

      <Link href={"/sign-in"} className="w-full">
      <button className=" text-blact border-2 w-full border-black px-6 py-3 max-sm:px-2 text-[20px] max-sm:text-[10px] rounded-lg transition-colors">
          Get Started
        </button>
      </Link>
      
        
      </div>
     
       
    </div>
  );
};

export default HomeSection;
