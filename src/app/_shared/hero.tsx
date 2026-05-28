"use client";
import React, { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, LoaderIcon, Send } from "lucide-react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { suggestions } from "@/data/constant";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { randomUUID } from "crypto";
import { set } from "date-fns";
import { useRouter } from "next/navigation";

const Hero = () => {
  const [userInput, setUserInput] = useState<string>();
  const [device, setDevice] = useState<string>("website");
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onCreateProject = async () => {
    if(!user){
      router.push('/sign-in')
      return;
    }

    setLoading(true);

    const projectId = crypto.randomUUID()
    const result = await axios.post('/api/project', {
      userInput,
      device,
      projectId: projectId
    })

    console.log(result.data)
    setLoading(false);
    router.push(`/project/${projectId}`)
  }

  return (
    <div className="p-10 md:px-24 lg:px-48 xl:px-60 mt-12">
      <div className="flex justify-center items-center w-full mb-5">
        <div className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
          <span
            className={cn(
              "animate-gradient absolute inset-0 block h-full w-full rounded-[inherit] bg-linear-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]",
            )}
            style={{
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "destination-out",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "subtract",
              WebkitClipPath: "padding-box",
            }}
          />
          🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
          <AnimatedGradientText className="text-sm font-medium">
            Introducing Magic UI
          </AnimatedGradientText>
          <ChevronRight className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </div>
      </div>

      <h2 className="text-5xl font-bold text-center">
        Design High Quality{" "}
        <span className="text-primary">Website and Mobile App</span> Designs
      </h2>
      <p className="text-center text-gray-600 text-lg mt-3">
        Imagine your idea and turn into reality
      </p>
      <div className="flex mt-5 w-full  gap-6 items-center justify-center">
        <InputGroup className="max-w-xl bg-white z-10 rounded-2xl">
          <InputGroupTextarea
            value={userInput}
            data-slot="input-group-control"
            className="flex field-sizing-content min-h-24 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
            placeholder="Enter what design you want to create..."
            onChange={(e) => setUserInput(e.target?.value)}
          />
          <InputGroupAddon align="block-end">
            <Select
              defaultValue="website"
              onValueChange={(value) => setDevice(value)}
            >
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <InputGroupButton disabled={loading} className="ml-auto" size="sm" variant="default" onClick={() => onCreateProject()}>
                {loading ? <LoaderIcon className="animate-spin" /> : <Send className="h-4 w-4" />}              
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="flex gap-5 mt-4 justify-center flex-wrap ">
        {suggestions.map((suggestion, index) => (
          <div
            className="p-2 border rounded-2xl flex flex-col items-center bg-white z-10 cursor-pointer"
            key={index}
            onClick={() => setUserInput(suggestion?.description)}
          >
            <h2 className="text-lg">{suggestion?.icon}</h2>
            <h2 className="text-center line-clamp-2 text-sm ">
              {suggestion?.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
