import Link from "next/link";
import React from "react";
import ClickSpark from "../blocks/Animations/ClickSpark/ClickSpark";

const HomeSection = () => {
  return (
    <div className="container mx-auto flex justify-center items-center h-96 gap-5 flex-col px-4 py-8 ">
      <h1 className="text-7xl max-sm:text-4xl font-semibold">Learn Smarter. Talk Freely.</h1>
      <h1 className="text-2xl max-sm:text-xl lg:text-center">
        voice-based AI powered by{" "}
        <Link className="font-semibold" href={"https://vapi.ai/"}>
          Vapi
        </Link>
        . Talk to it like you would to a real teacher. <br /> No typing, just
        natural conversation.
      </h1>
    
      <Link href="/companions">
        <button className="bg-black text-white px-6 py-3 max-sm:px-3 rounded-lg hover:bg-gray-800 transition-colors">
          Explore Companions
        </button>
      </Link>
        <p>“Say It. Hear It. Learn It.”</p>
    </div>
  );
};

export default HomeSection;
