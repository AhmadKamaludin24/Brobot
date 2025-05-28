// app/callback/page.tsx
'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {  initUserCallUsage } from "@/lib/actions/companion.action";


export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    initUserCallUsage()
      .then(() => {
        router.push("/"); // redirect ke halaman utama
      })
      .catch((err) => {
        console.error(err);
        router.push("/sign-in"); // kalau gagal
      });
  }, []);

  return <p>Loading...</p>;
}
