import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Header from "./_shared/header";
import Hero from "./_shared/hero";

export default function Home() {
  return (
    <div className="relative h-screen overflow-x-hidden">
      <Header />
      <Hero />
      <div
        className="absolute -top-40 -left-40
          h-125 w-125 bg-purple-400/20 blur-[120px] rounded-full"
      />
      <div
        className="absolute top-20 -right-50
          h-125 w-125 bg-pink-400/20 blur-[120px] rounded-full"
      />
      <div
        className="absolute -bottom-50 left-1/3
          h-125 w-125 bg-blue-400/20 blur-[120px] rounded-full"
      />
      <div
        className="absolute top-50 left-1/2
          h-125 w-125 bg-sky-400/20 blur-[120px] rounded-full"
      />
    </div>
  );
}
