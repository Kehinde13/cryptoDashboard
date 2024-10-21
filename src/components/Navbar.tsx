import Image from "next/image";
import React from "react";
import logo from "@/assets/Logo (1).png";
import profile from '@/assets/profile.jpg'
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import { EllipsisVertical } from "lucide-react";

function Navbar() {
  return (
    <div className="p-2 flex justify-between w-[100%] shadow-lg">
      <div className="flex gap-2 items-center md:hidden">
        <Image src={logo} alt="logo" className="w-12" />
        <h1 className="font-semibold md:text-xl">
          <span className="text-blue-400">Zoom</span>Trade
        </h1>
      </div>
      <div className="md:flex w-full max-w-sm items-center space-x-2 hidden ml-10 mt-2">
        <Input type="text" placeholder="Search...." className="w-full"/>
        <Button type="submit" className="bg-blue-400">Search</Button>
      </div>
      <div className="hidden mr-5 bg-blue-300 rounded-full py-2 px-4 lg:flex items-center gap-5 mt-2">
        <Image src={profile} alt="user" className="rounded-full w-[30px]" />
        <div className="text-xs">
          <h1 className="font-semibold">Kehinde Balogun</h1>
          <p>balogunkehinde3@gmail.com</p>
        </div>
        <EllipsisVertical />
      </div>
      
      <SidebarTrigger className="md:hidden absolute right-0 top-1" />
    </div>
  );
}

export default Navbar;
