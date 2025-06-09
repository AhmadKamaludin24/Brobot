"use client";
import Lottie from "lottie-react";
import React from "react";
import loader from "@/lib/constants/loading.json";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LoadingComponent = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // opsional: untuk mencegah flicker

    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!loading) return null;
  return (
    <div className="flex items-center justify-center h-screen">
      <Lottie animationData={loader} loop={true} className="w-1/4" />
    </div>
  );
};

export default LoadingComponent;
