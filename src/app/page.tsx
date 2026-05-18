import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex w-full items-center justify-between p-4">
      <h2>Welcome to the UIUX Mockup Generator</h2>
      <UserButton />
    </div>
  );
}
