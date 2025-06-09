"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

export function SelectLanguage() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const [language, setLanguage] = React.useState("All");
  console.log("Selected language:", language);

  React.useEffect(() => {
    if (language) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "language",
        value: language,
      });
      router.push(newUrl);
    } else {
      if (pathName === "/companions") {
        const newUrl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["language"],
        });
        router.push(newUrl);
      }
    }
  }, [language, router, searchParams, pathName]);

  return (
    <div className="w-full">
      <Select onValueChange={(value) => setLanguage(value)} value={language}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Language</SelectLabel>
            <SelectItem value="All">all</SelectItem>
            <SelectItem value="en">english</SelectItem>
            <SelectItem value="id">indonesia</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
